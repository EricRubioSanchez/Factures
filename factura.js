"use strict";

//Dialogo
const facturaDia=document.getElementById("factura");
const productosDia=document.getElementById("productos");

//Arrays
const Facturas=[];

class Factura {
	constructor(id, data, nif, client, telefon, email, dte, iva, pagat,adreca,poblacio,productos) {
		this.id= id;
		this.data= data;
		this.nif= nif;
		this.client= client;
		this.telefon= telefon;
		this.email= email;
		this.productos=productos;
		this.dte= dte;
		this.iva= iva;
		this.pagat=pagat;
		this.adreca=adreca;
		this.poblacio=poblacio;
	}

}

function carregar(event){
	let fileReader = new FileReader();
	fileReader.readAsText(event.target.files[0]);
	let jsonAsString;
	fileReader.onload = function(event) {
		jsonAsString=fileReader.result;
		let json=JSON.parse(jsonAsString);
		for (let index = 0; index < json.length; index++) {
			const objecte = json[index];
			let factura = new Factura(objecte["num"],new Date(objecte["data"]),objecte["NIF"],objecte["client"],objecte["telefon"],objecte["email"],objecte["descompte"],objecte["IVA"],objecte["pagada"],objecte["adreca"],objecte["poblacio"],objecte["articles"]);
			Facturas.push(factura);
		}
	};			
}

function guardar(){
	
}

function init(){

}

function mostrar(){
    console.log(event.target);
}

function afegir(event){
	console.log(event)
	let form=event.target;
	event.preventDefault();
	let id=form[0].value;
	let fecha=new Date(form[1].value);
	let pagado=form[2].value=="on"? true : false;
	let cliente=form[3].value;
	let nif=form[4].value;
	let email=form[5].value;
	let tel=form[6].value;
	let adreca=form[7].value;
	let poblacio=form[8].value;
	let dte=parseFloat(form[9].value/100);
	let iva=parseFloat(form[10].value/100);
	productosDia.showModal();
	
	let factura=new Factura(id,fecha,nif,cliente,tel,email,dte,iva,pagado,adreca,poblacio)
	console.log(factura)
}

function editar(){

}

function esborrar(){

}

function imprimir(){

}
function abrirNuevaFactura(){
	facturaDia.showModal();
	let fecha=new Date();
	$("#id").val(Facturas.length+1);
	//Arreglar mes dia por los 0
	$("#data").val(`${fecha.getFullYear()}-0${fecha.getMonth()+1}-0${fecha.getDate()}`);
	$("#dte").val(0);
	$("#iva").val(21);
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
//document.getElementById("editar").addEventListener("click",editar);
//Borrar factura
//document.getElementById("esborrar").addEventListener("click",esborrar);
//Imprimir factura
//document.getElementById("imprimir").addEventListener("click",imprimir);

$("#facturaForm").on("submit",afegir)


//asdas
*/
$(document).ready(init);