class Factura {
	constructor() {
		// Inicialitzar valors
		this.xPos = 320; // Posició horitzontal de la nau
		this.yPos = 460; // Posició vertical de la nau

		// Moure la nau a la posició inicial
		this.nau = document.getElementById("nau");
		this.nau.setAttribute("transform", "translate(" + this.xPos + " " + this.yPos + ")");
	}
}

function carregar(){

}

function guardar(){

}

function init(){

}

function mostrar(){
    console.log(event.target);
}

function afegir(){

}

function editar(){

}

function esborrar(){

}

function imprimir(){
    
}

document.getElementById("carregar").addEventListener("click",carregar);
document.getElementById("guardar").addEventListener("click",guardar);
document.getElementById("mostrar").addEventListener("click",mostrar);
document.getElementById("afegir").addEventListener("click",afegir);
document.getElementById("editar").addEventListener("click",editar);
document.getElementById("esborrar").addEventListener("click",esborrar);
document.getElementById("imprimir").addEventListener("click",imprimir);

$(document).ready(init);