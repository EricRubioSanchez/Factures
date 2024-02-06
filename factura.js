"use strict";


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
		//Agafa JSON
		jsonAsString = fileReader.result;
		let json = JSON.parse(jsonAsString);

		//Bucle per factura
		for (let index = 0; index < json.length; index++) {
			const objecte = json[index];
			let articles = [];

			//Bucle per Article
			for (let index = 0; index < objecte["productos"].length; index++) {
				const objecteArt = objecte["productos"][index];
				let article = new Articulo(objecteArt["codi"], objecteArt["article"], objecteArt["unidad"], objecteArt["preu"]);
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
	function afegirBoto(valor) {
		let button = document.createElement("button");
		let textNode = document.createTextNode(valor);
		button.appendChild(textNode);
		if(valor=="Eliminar"){button.setAttribute("class","eliminar")
		button.addEventListener("click",esborrar)
	}
		else if(valor=="Imprimir"){button.setAttribute("class","imprimir")
		button.addEventListener("click",imprimir)}

		else{button.setAttribute("class","editar")
		button.addEventListener("click",editar)
		}
		
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
	let subtotal = 0;
	for (let index = 0; index < factura["productos"].length; index++) {
		const article = factura["productos"][index];
		subtotal += (article["preu"] * article["unidad"]);
	}

	afegirTaula(new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(subtotal));
	//Descompte
	afegirTaula(new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(subtotal * (factura["dte"])));
	//BaseIMP
	let baseIMP = subtotal * (1 - factura["dte"]);
	afegirTaula(new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(baseIMP));
	//IVA
	afegirTaula(new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(baseIMP * (factura["iva"])));
	//Total
	afegirTaula(new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(baseIMP * (1 + factura["iva"])));
	//pagat
	let td = document.createElement("td");
	let checkbox = document.createElement("input");
	checkbox.setAttribute("type", "checkbox")
	checkbox.addEventListener("click",canviarPagat)
	if (factura["pagat"]) { checkbox.setAttribute("checked", "") }
	td.appendChild(checkbox);
	tr.appendChild(td);

	//Botons
	td = document.createElement("td");
	afegirBoto("Imprimir");
	afegirBoto("Editar");
	afegirBoto("Eliminar");
	
	tr.appendChild(td);

	taula.appendChild(tr);
}

function canviarPagat(event){
	let id = parseInt(event.target.parentElement.parentElement.firstChild.firstChild.wholeText)

	//Para eliminar la factura de la array
	for (let index = 0; index < Facturas.length; index++) {
		const factura = Facturas[index];
		if(factura["id"]==id){
			if(event.target.checked){
				factura.pagat=true;
			}else{factura.pagat=false;}
		}
	}
}

function download(filename, text) {
	// Crear un objecte similar a un arxiu format per bytes
	const file = new Blob([text], { type: 'text/plain' });

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
	productosDia.showModal();	
}

function afegirLinea(event){
	let form = document.getElementById("facturaForm")
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

	event.preventDefault()
	const productos = [];
	let lineas = event.target.parentElement.children[0].children[1].children;

	for (let i = 0; i < lineas.length; i++) {
		const linea = lineas[i];
		const articulo = new Articulo(linea.children[0].textContent, linea.children[1].textContent, linea.children[2].textContent, linea.children[3].textContent)
		productos.push(articulo);
	}

	let factura = new Factura(id, fecha, nif, cliente, tel, email, dte, iva, pagado, adreca, poblacio,productos)
	carregarTaula(factura)
	Facturas.push(factura)
	document.getElementById("articuloForm").reset()
	document.getElementById("facturaForm").reset()
	productosDia.close()
	facturaDia.close();
}
function afegirLineaFactura(){
	let tabla=document.getElementById("tablaArticulo")
	
	let id=tabla.children.length+1;
	let tr=document.createElement("tr")
	tr.setAttribute("id","linea"+id)
	tabla.appendChild(tr);
	
	let td1=document.createElement("td",id)
	td1.setAttribute("id","id"+id)
	td1.textContent=id;

	let td2=document.createElement("td")
	td2.setAttribute("id","article"+id)
	td2.contentEditable =true

	let td3=document.createElement("td",1)
	td3.setAttribute("id","unitats"+id)
	td3.contentEditable =true
	td3.textContent =1
	td3.addEventListener("input",()=>calcularPreu(id))

	let td4=document.createElement("td",0)
	td4.setAttribute("id","preu"+id)
	td4.contentEditable =true
	td4.textContent =0
	td4.addEventListener("input",()=>calcularPreu(id))

	let td5=document.createElement("td")
	td5.setAttribute("id","subtotal"+id)
	
	let td6=document.createElement("td")
	let boton=document.createElement("button")
	boton.setAttribute("id","eliminar"+id)
	boton.textContent="Esborrar";
	boton.addEventListener("click",(event)=>{
		event.preventDefault()
		event.target.parentElement.parentElement.remove()
	})
	td6.appendChild(boton)

	tr.appendChild(td1)
	tr.appendChild(td2)
	tr.appendChild(td3)
	tr.appendChild(td4)
	tr.appendChild(td5)
	tr.appendChild(td6)

}

function calcularPreu(id){
	let unitats=document.getElementById("unitats"+id)
	let preu=document.getElementById("preu"+id)
	let subtotal=document.getElementById("subtotal"+id)
	subtotal.textContent=parseInt(unitats.textContent)*parseFloat(preu.textContent)+" €"
	let total= document.getElementById("total")
	let totalNum=0;
	let tabla=document.getElementById("tablaArticulo").children
	for (let i = 0; i < tabla.length; i++) {
		const linea = tabla[i];
		totalNum+=parseInt(linea.children[4].textContent)
	}
	total.textContent=totalNum + " €"
}

function editar(event) {
	let id = parseInt(event.target.parentElement.parentElement.firstChild.firstChild.wholeText)
	let facturaSelec;
	//Para eliminar la factura de la array
	for (let index = 0; index < Facturas.length; index++) {
		const factura = Facturas[index];
		if(factura["id"]==id){
			facturaSelec=factura;
		}
	}
	productosDia.showModal()
	let tabla=document.getElementById("tablaArticulo")
	tabla.innerHTML=""
	for (let i = 0; i < facturaSelec.productos.length; i++) {
		const producto = facturaSelec.productos[i];

		let codi = producto.codi;
		let tr = document.createElement("tr")
		tr.setAttribute("id", "linea" + codi)
		tabla.appendChild(tr);

		let td1 = document.createElement("td", codi)
		td1.setAttribute("id", "id" + codi)
		td1.textContent = producto.codi;

		let td2 = document.createElement("td")
		td2.setAttribute("id", "article" + codi)
		td2.contentEditable = true
		td2.textContent= producto.article

		let td3 = document.createElement("td", 1)
		td3.setAttribute("id", "unitats" + codi)
		td3.contentEditable = true
		td3.textContent = producto.unidad
		td3.addEventListener("input", () => calcularPreu(codi))

		let td4 = document.createElement("td", 0)
		td4.setAttribute("id", "preu" + codi)
		td4.contentEditable = true
		td4.textContent = producto.preu
		td4.addEventListener("input", () => calcularPreu(codi))

		let td5 = document.createElement("td")
		td5.setAttribute("id", "subtotal" + codi)

		let td6 = document.createElement("td")
		let boton = document.createElement("button")
		boton.setAttribute("id", "eliminar" + codi)
		boton.textContent = "Esborrar";
		boton.addEventListener("click", (event) => {
			event.preventDefault()
			event.target.parentElement.parentElement.remove()
			calcularPreu(codi)
		})
		td6.appendChild(boton)

		tr.appendChild(td1)
		tr.appendChild(td2)
		tr.appendChild(td3)
		tr.appendChild(td4)
		tr.appendChild(td5)
		tr.appendChild(td6)
		calcularPreu(codi)
	}
}

function esborrar(event) {
	let id = parseInt(event.target.parentElement.parentElement.firstChild.firstChild.wholeText)

	//Para eliminar la factura de la array
	for (let index = 0; index < Facturas.length; index++) {
		const factura = Facturas[index];
		if(factura["id"]==id){
			Facturas.splice(index,1);

			//Para eliminar la factura de la tabla
			let tabla= document.getElementById("tabla");
			for (let index = 0; index < tabla.children.length; index++) {
				const idTabla = parseInt(tabla.children[index].firstChild.firstChild.wholeText);
				if(idTabla ==id){tabla.children[index].remove()}
			}
		}
	}
}

function setPrint() {
	const closePrint = () => {
	  document.body.removeChild(this);
	};
	this.contentWindow.onbeforeunload = closePrint;
	this.contentWindow.onafterprint = closePrint;
	this.contentWindow.print();
  }

function imprimir(event) {


	let id = parseInt(event.target.parentElement.parentElement.firstChild.firstChild.wholeText)

	//Para eliminar la factura de la array
	for (let index = 0; index < Facturas.length; index++) {
		const factura = Facturas[index];
		if(factura["id"]==id){
			
		const myJSON = JSON.stringify(factura);
		localStorage.setItem("testJSON", myJSON);

		const hideFrame = document.createElement("iframe");
		hideFrame.onload = setPrint;
		hideFrame.style.display = "none"; // hide iframe
		hideFrame.src = "factura.html";
		document.body.appendChild(hideFrame);

		}
	}
}
function abrirNuevaFactura() {
	facturaDia.showModal();
	let fecha = new Date();
	$("#id").val(Facturas.length + 1);
	//Arreglar mes dia por los 0
	$("#data").val(`${fecha.getFullYear()}-0${fecha.getMonth() + 1}-0${fecha.getDate()}`);
	$("#dte").val(0);
	$("#iva").val(21);
	document.getElementById("tablaArticulo").innerHTML=""
	afegirLineaFactura();
}

//Cargar documento JSON desde tu maquina
document.getElementById("recuperar").addEventListener("change", carregar);
//Descargar documento JSON
document.getElementById("guardar").addEventListener("click", guardar);
//Abrir dialog y añadir productos
document.getElementById("productos").addEventListener("click", mostrar);
//Abrir dialog y rellenar form
document.getElementById("nuevaFactura").addEventListener("click", abrirNuevaFactura);

document.getElementById("afegirArticles").addEventListener("click",afegirLinea);

document.getElementById("afegirProducte").addEventListener("click",(event)=>{
	event.preventDefault()
	afegirLineaFactura();
})
document.getElementById("cancelar").addEventListener("click",(event)=>{
	event.preventDefault();
	event.target.parentElement.parentElement.close();
})
document.getElementById("cancelar2").addEventListener("click",(event)=>{
	event.preventDefault();
	event.target.parentElement.parentElement.close();
})

$("#facturaForm").on("submit", afegir)


//asdas

$(document).ready(init);