const data = new Date();
const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sabado'];
let codigos = [];
let total=0;

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
        document.getElementById('input-txt').value = '';
        document.getElementById("input-txt").focus();
        return;
    }
    for(let i in codigos){
        if (codigo === codigos[i]){
            alert("Esse código já foi inserido.");
            document.getElementById('input-txt').value = '';
            document.getElementById("input-txt").focus();
            return;
        }
    }
    codigos.push(codigo);
    document.getElementById("relatorio").innerHTML += `<p>${codigo}</p>`;
    document.getElementById("input-txt").value = '';
    document.getElementById("input-txt").focus();
    document.getElementById("btn-del").disabled = false;
    document.getElementById("btn-imp").disabled = false;
    total++;
    document.getElementById("total").innerHTML = `Total de etiquetas: ${total}`;
    console.log("Todos itens atuais depois de adicionar:", codigos);
    return total;
}

function desfazer(){
    let paragrafos = document.querySelectorAll(".fundo-relatorio p");
    if (paragrafos.length > 1){
        paragrafos[paragrafos.length -1].remove();
        codigos.pop();
        total--;
        console.log("Todos itens atuais depois de remover:", codigos);
        if(paragrafos.length ==2){
            document.getElementById("btn-del").disabled = true;
            document.getElementById("btn-imp").disabled = true;
            document.getElementById("total").innerHTML = `Total de etiquetas: ${total}`;
            document.getElementById("input-txt").focus();
            return total;
        }
    }
    document.getElementById("btn-imp").disabled = false;
    document.getElementById("total").innerHTML = `Total de etiquetas: ${total}`;
    document.getElementById("input-txt").focus();
    return total;
}

function imprimir(){
    const dia = data.getDate();
    const ano = data.getFullYear();
    const mes = data.getMonth()+1;
    const diaSemana = diasDaSemana[data.getDay()];
    document.getElementById("btn-imp").disabled = true;
    telaimprimir();
}

function telaimprimir(){
    let conteudo = document.querySelectorAll(".fundo-relatorio p");
    let janelaImpressao = window.open("", "", `width=${screen.availWidth},height=${screen.availHeight},top=0,left=0`); // Abre uma nova janela

    if(janelaImpressao){
    
        janelaImpressao.document.write("<html>"); 
        janelaImpressao.document.write(`<head><title>Impressão</title></head>`);
        janelaImpressao.document.write(`<style>
            body{
                font-family: 'Arial', sans-serif;
                padding: 40px;
                margin: 10px;
                color: #003366;
            }
            table{
                padding: 20px;
                color: #003366;
                width: 100%;
                margin: 2rem auto;
                }
            table tr td{
                padding: 10px;
                text-align: center;
            }

            h2 {
            text-align: center;
            }
            @media print {
                button {
                    display: none;
                }

                body {
                    padding: 0;
                }
            };</style>`);
        janelaImpressao.document.write("<body><h2>Relatório de envio</h2><h3>Códigos:</h3><table>");
        
        let copiaarray =[];
        for(let i=1; i < conteudo.length; i++){
            copiaarray.push(conteudo[i].textContent);
        }
        copiaarray.sort((a, b) => a - b);
        
        let j=0;
        while (j < copiaarray.length){
            janelaImpressao.document.write("<tr>");
            for (let i=1; i <= 3; i++){
                if(typeof copiaarray[j]!== "undefined"){
                    janelaImpressao.document.write(`<td>${copiaarray[j]}</td>`);
                    j++;
                }
            }
            janelaImpressao.document.write("</tr>");
        }
        janelaImpressao.document.write("</table>");
        janelaImpressao.document.write(`<hr><p>Total de etiquetas: ${total}</p>`);
        janelaImpressao.document.write(`<hr><p>assinatura:</p>`);
        janelaImpressao.document.write("</body></html>");
        janelaImpressao.document.close(); // Fecha o fluxo de escrita
    }
    janelaImpressao.print(); // Dispara a impressão 
}
