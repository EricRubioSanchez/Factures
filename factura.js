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

	fileReader.onload = function(event) {
		//Agafa JSON
		jsonAsString=fileReader.result;
		let json=JSON.parse(jsonAsString);

		//Bucle per factura
		for (let index = 0; index < json.length; index++) {
			const objecte = json[index];
			let articles = [];

			//Bucle per Article
			for (let index = 0; index < objecte["productos"].length; index++) {
				const objecteArt = objecte["productos"][index];
				let article=new Articulo(objecteArt["codi"],objecteArt["article"],objecteArt["unidad"],objecteArt["preu"]);
				articles.push(article);	
			}
			let factura = new Factura(objecte["id"], 
										new Date(objecte["data"]), 
										objecte["nif"], 
										objecte["client"], 
										objecte["telefon"], 
										objecte["email"], 
										objecte["dte"], 
										objecte["iva"], 
										objecte["pagat"], 
										objecte["adreca"], 
										objecte["poblacio"], 
										articles
									);
			Facturas.push(factura);
			carregarTaula(factura);
			console.log(factura)
		}
	};
}

function carregarTaula(factura) {
	//Per afegir les dades
	function afegirTaula(valor) {
		let td = document.createElement("td");
		let textNode = document.createTextNode(valor);
		td.appendChild(textNode);
		tr.appendChild(td);
	}
	//Per afegir botons
	function afegirBoto(valor){
		let button = document.createElement("button");
		let textNode = document.createTextNode(valor);
		button.appendChild(textNode);
		td.appendChild(button);

	}
	let taula = document.getElementById("tabla");
	let tr = document.createElement("tr");

afegirTaula(factura["id"]);
afegirTaula(factura["data"].toDateString());
afegirTaula(factura["nif"]);
afegirTaula(factura["client"]);
afegirTaula(factura["telefon"]);
afegirTaula(factura["email"]);
//Calcular subtotal
let subtotal=0;
for (let index = 0; index < factura["productos"].length; index++) {
	const article = factura["productos"][index];
	subtotal+=(article["preu"]*article["unidad"]);
}

afegirTaula(new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(subtotal));
//Descompte
afegirTaula(new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(subtotal*(factura["dte"])));
//BaseIMP
let baseIMP=subtotal*(1-factura["dte"]);
afegirTaula(new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(baseIMP));
//IVA
afegirTaula(new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(baseIMP*(factura["iva"])));
//Total
afegirTaula(new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(baseIMP*(1+factura["iva"])));
//pagat
let td = document.createElement("td");
let checkbox = document.createElement("input");
checkbox.setAttribute("type","checkbox")
if(factura["pagat"]){ checkbox.setAttribute("checked","")}
td.appendChild(checkbox);
tr.appendChild(td);

//Botons
td = document.createElement("td");
afegirBoto("Imprimir");
afegirBoto("Eliminar");
tr.appendChild(td);

taula.appendChild(tr);
}

function download(filename, text) {
    // Crear un objecte similar a un arxiu format per bytes
    const file = new Blob([text], {type: 'text/plain'});

    // Crear un link "fantasma" (no s'afegirà realment al document)
    const a = document.createElement('a');

    // Crear una URL que representa l'arxiu a descarregar
    a.href = URL.createObjectURL(file);
    // Indicar el nom de l'arxiu que es descarregarà
    a.download = filename;
    // Simular un clic sobre l'enllaç
    a.click();
    // Eliminar el link "fantasma"
    URL.revokeObjectURL(a.href);
}

function guardar() {
	console.log(JSON.stringify(Facturas))
	download("factures.json", JSON.stringify(Facturas));
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
		eve.preventDefault()
		console.log(eve.target.parentElement.children[0].children[1])
	})
	let factura = new Factura(id, fecha, nif, cliente, tel, email, dte, iva, pagado, adreca, poblacio)
	console.log(factura)
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