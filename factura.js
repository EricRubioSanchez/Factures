"use strict";

//Dialogo
const factura=document.getElementById("factura");
const productos=document.getElementById("productos");
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

function carregar(event){
	let fileReader = new FileReader();
	fileReader.readAsText(event.target.files[0]);
	let jsonAsString;
	fileReader.onload = function(event) {
		jsonAsString=fileReader.result;
		console.log(JSON.parse(jsonAsString))
	};			
}

function guardar(){

}

function init(){

}

function mostrar(){
    console.log(event.target);
}

function afegir(){
	factura.showModal();
}

function editar(){

}

function esborrar(){

}

function imprimir(){

}

//Cargar documento JSON desde tu maquina
document.getElementById("recuperar").addEventListener("change",carregar);
//Descargar documento JSON
document.getElementById("guardar").addEventListener("click",guardar);
//Abrir dialog y añadir productos
document.getElementById("productos").addEventListener("click",mostrar);
//Abrir dialog y rellenar form
document.getElementById("nuevaFactura").addEventListener("click",afegir);
/*
//Abrir dialog y editar form ya rellenado con datos
document.getElementById("editar").addEventListener("click",editar);
//Borrar factura
document.getElementById("esborrar").addEventListener("click",esborrar);
//Imprimir factura
document.getElementById("imprimir").addEventListener("click",imprimir);
//asdas
*/
$(document).ready(init);