const data = new Date();
const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sabado'];
let codigos = [];
let total=0;
let produto ={
    nome: 'produto a cadastrar'
};

window.onload = function() {
    document.getElementById("input-txt").focus();
    document.getElementById("btn-del").disabled = true; //desabilita botão
    document.getElementById("btn-imp").disabled = true; 
};

document.addEventListener("keydown", function(e) {
    console.log("Tecla pressionada:", e.key);
    if (e.key ==='Enter' || e.code === "Space"){
        adcionar();
    } //função para captar teclas do mouse
});

function adcionar(){
    let codigo = document.getElementById("input-txt").value.trim();

    if (codigo === "") {
        alert("O campo está vazio! Adicione um código.");
        return;
    }
    for(let i in codigos){
        if (codigo === codigos[i]){
            alert("Esse código já foi inserido");
            document.getElementById('input-txt').value = '';
            document.getElementById("input-txt").focus();
            return;
        }
    }
    codigos.push(codigo);
    document.getElementById("relatorio").innerHTML += `<p>${codigo}</p>`;
    document.getElementById('input-txt').value = '';
    document.getElementById("input-txt").focus();
    document.getElementById("btn-del").disabled = false;
    document.getElementById("btn-imp").disabled = false;
    total++;
    console.log(codigos);
    return total;
}

function desfazer(){
    let paragrafos = document.querySelectorAll(".form-main p");
    if (paragrafos.length > 1){
        paragrafos[paragrafos.length -1].remove();
        codigos.pop();
        total--;
        console.log(codigos);
        if(paragrafos.length ==2) document.getElementById("btn-del").disabled = true;
    }
    return total;
}

function imprimir(){
    const dia = data.getDate();
    const ano = data.getFullYear();
    const mes = data.getMonth()+1;
    const diaSemana = diasDaSemana[data.getDay()];
    document.getElementById("fecho").innerHTML += `<hr>`;
    document.getElementById("fecho").innerHTML += `<p>Total de etiquetas: ${total}</p>`;
    document.getElementById("fecho").innerHTML += `<hr>`;
    document.getElementById("fecho").innerHTML += `<p>${dia}/${mes}/${ano} ass.:</p>`;
    document.getElementById("btn-add").disabled = true;
    document.getElementById("btn-del").disabled = true;
    document.getElementById("btn-imp").disabled = true;
    telaimprimir();
}

function telaimprimir(){
    let conteudo = document.querySelectorAll(".fundo-relatorio p");
    let rodape = document.querySelectorAll("#fecho p");
    let janelaImpressao = window.open("", "", `width=${screen.availWidth},height=${screen.availHeight},top=0,left=0`); // Abre uma nova janela

    console.log(rodape[1]);

    if(janelaImpressao){
    
        janelaImpressao.document.write("<html>"); 
        janelaImpressao.document.write(`<head><title>Impressão</title></head>`);
        janelaImpressao.document.write(`<style>
            body {
                    font-family: 'Arial', sans-serif;
                    padding: 40px;
                    margin: 0;
                    color: #333;
                }
                table{
                    padding: 50px;
                    color: #003366;
                    width: 100%;
                    margin: 2rem auto;
                    }
                table tr td{
                    padding: 20px;
                }

                h1, h2 {
                    color: #003366;
                }

                @media print {
                    button {
                        display: none;
                    }

                    body {
                        padding: 0;
                    }
                };</style>`);
        janelaImpressao.document.write("<body><h2>Relatório de envio</h2><table>");

        let j=1;
        
        while (j < conteudo.length){
            janelaImpressao.document.write("<tr>");
            for (let i=1; i <= 3; i++){
                if(typeof conteudo[j]!== "undefined"){
                    janelaImpressao.document.write(`<td>${conteudo[j].textContent}</td>`);
                    j++;
                }
            }
            janelaImpressao.document.write("</tr>");
        }
        janelaImpressao.document.write("</table>");
        janelaImpressao.document.write(`<hr><p>${rodape[0].textContent}</p>`);
        janelaImpressao.document.write(`<hr><p>${rodape[1].textContent}</p>`);
        janelaImpressao.document.write("</body></html>");
        janelaImpressao.document.close(); // Fecha o fluxo de escrita
    }
    janelaImpressao.print(); // Dispara a impressão 
}
