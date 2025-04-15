const array = [111, 22, 2, 111, 3, 3, 4, 4, 44, 4, 111];
console.log(array.indexOf(44));

let index = frutas.indexOf("banana");
if (index !== -1) {
    frutas.splice(index, 1); // remove 1 item na posição encontrada
}

function desfazer(){
    let paragrafos = document.querySelectorAll(".form-main p");
    if (paragrafos.length > 1){
        const removido = paragrafos[paragrafos.length -1];
        const valor = removido.textContent;
        removido.remove();
        remover(valor);
        total--;
        if(paragrafos.length ==2) document.getElementById("btn-del").disabled = true;
    }
    return total;
}

function remover(valor){
    let remover = valor;
    let index = codigos.indexOf(remover);
    if (index !== -1) {
        codigos.splice(index, 1); // remove 1 item na posição encontrada
    }
    console.log(codigos);
}