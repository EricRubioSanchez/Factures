"use strict";
import { canviarCelda, crearTable, crearTable2, moureTaula, omplirDades, crearBotonsTaula } from "./table.js";
import { crearElement, modificarElement, moureElement } from "./Exercici.js";


//Dialogo
const facturaDia = document.getElementById("factura");
const productosDia = document.getElementById("productos");

//Arrays
const Facturas = [];

class Factura {
	constructor(id, data, nif, client, telefon, email, dte, iva, pagat, adreca, poblacio, productos) {
		this.id = id;
		this.data = data;
		this.nif = nif;
		this.client = client;
		this.telefon = telefon;
		this.email = email;
		this.productos = productos;
		this.dte = dte;
		this.iva = iva;
		this.pagat = pagat;
		this.adreca = adreca;
		this.poblacio = poblacio;
	}
}
class Articulo {
	constructor(codi, article, unidad, preu) {
		this.codi = codi;
		this.article = article;
		this.unidad = unidad;
		this.preu = preu;
	}
}

function carregar(event) {
	let fileReader = new FileReader();
	fileReader.readAsText(event.target.files[0]);
	let jsonAsString;
	fileReader.onload = function (event) {
		jsonAsString = fileReader.result;
		let json = JSON.parse(jsonAsString);
		for (let index = 0; index < json.length; index++) {
			const objecte = json[index];
			let factura = new Factura(objecte["num"], 
										new Date(objecte["data"]), 
										objecte["NIF"], 
										objecte["client"], 
										objecte["telefon"], 
										objecte["email"], 
										objecte["descompte"], 
										objecte["IVA"], 
										objecte["pagada"], 
										objecte["adreca"], 
										objecte["poblacio"], 
										objecte["articles"]
									);
			Facturas.push(factura);
			carregarTaula(factura);
		}
	};
}

function carregarTaula(factura) {
	function afegirTaula(valor) {
		let td = document.createElement("td");
		let textNode = document.createTextNode(valor);
		td.appendChild(textNode);
		tr.appendChild(td);
	}
	let taula = document.getElementById("tabla");
	let tr = document.createElement("tr");

	afegirTaula(factura["id"]);
	afegirTaula(factura["data"].toDateString());
	afegirTaula(factura["nif"]);
	afegirTaula(factura["client"]);
	afegirTaula(factura["telefon"]);
	afegirTaula(factura["email"]);


	taula.appendChild(tr);
}

function guardar() {

}

function init() {

}

function mostrar() {

}

function afegir(event) {
	event.preventDefault();
	let form = event.target;
	let id = form[0].value;
	let fecha = new Date(form[1].value);
	let pagado = form[2].value == "on" ? true : false;
	let cliente = form[3].value;
	let nif = form[4].value;
	let email = form[5].value;
	let tel = form[6].value;
	let adreca = form[7].value;
	let poblacio = form[8].value;
	let dte = parseFloat(form[9].value / 100);
	let iva = parseFloat(form[10].value / 100);
	productosDia.showModal();
	
	const productos = [];
	$("#afegirArticles").on("click", (eve) => {
		eve.preventDefault();
		
	})
	if(productos.length!=0){
		let factura = new Factura(id, fecha, nif, cliente, tel, email, dte, iva, pagado, adreca, poblacio)
		carregarTaula(factura)
	}
}
function afegirLinea(){
	const tabla=document.getElementById("tablaArtiuclo");
	const tr= document.createElement("tr");
	tr.appendChild(document.createElement("td").setAttribute("id","codi"))
	tabla.appendChild()
}
function editar() {

}

function esborrar() {

}

function imprimir() {

}
function abrirNuevaFactura() {
	facturaDia.showModal();
	let fecha = new Date();
	$("#id").val(Facturas.length + 1);
	//Arreglar mes dia por los 0
	$("#data").val(`${fecha.getFullYear()}-0${fecha.getMonth() + 1}-0${fecha.getDate()}`);
	$("#dte").val(0);
	$("#iva").val(21);
}

//Cargar documento JSON desde tu maquina
document.getElementById("recuperar").addEventListener("change", carregar);
//Descargar documento JSON
document.getElementById("guardar").addEventListener("click", guardar);
//Abrir dialog y añadir productos
document.getElementById("productos").addEventListener("click", mostrar);
//Abrir dialog y rellenar form
document.getElementById("nuevaFactura").addEventListener("click", abrirNuevaFactura);

//Abrir dialog y editar form ya rellenado con datos
//document.getElementById("editar").addEventListener("click",editar);
//Borrar factura
//document.getElementById("esborrar").addEventListener("click",esborrar);
//Imprimir factura
//document.getElementById("imprimir").addEventListener("click",imprimir);

$("#facturaForm").on("submit", afegir)


//asdas

$(document).ready(init);