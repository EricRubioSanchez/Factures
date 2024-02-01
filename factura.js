"use strict";
const factura=document.getElementById("factura");
const productos=dcument.getElementById("productos");
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

//Cargar documento JSON desde tu maquina
document.getElementById("recuperar").addEventListener("click",carregar);
//Descargar documento JSON
document.getElementById("guardar").addEventListener("click",guardar);
//Abrir dialog y añadir productos
document.getElementById("productos").addEventListener("click",mostrar);
//Abrir dialog y rellenar form
document.getElementById("afegir").addEventListener("click",afegir);
//Abrir dialog y editar form ya rellenado con datos
document.getElementById("editar").addEventListener("click",editar);
//Borrar factura
document.getElementById("esborrar").addEventListener("click",esborrar);
//Imprimir factura
document.getElementById("imprimir").addEventListener("click",imprimir);
//asdas
$(document).ready(init);