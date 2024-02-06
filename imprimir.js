// Retrieving data:
let text = localStorage.getItem("testJSON");
let obj = JSON.parse(text);
let table1=document.getElementById("1");
let table2=document.getElementById("2");
let table3=document.getElementById("3");
let table4=document.getElementById("4");
let table5=document.getElementById("5");
//Data
table1.children[0].children[0].children[1].appendChild(document.createTextNode(new Date(obj.data).toDateString()));
//ID
table1.children[0].children[0].children[3].appendChild(document.createTextNode(obj.id));
//Nif
table2.children[0].children[0].children[1].appendChild(document.createTextNode(obj.nif));
//Nom
table2.children[0].children[0].children[3].appendChild(document.createTextNode(obj.client));
//Adreça
table2.children[0].children[1].children[1].appendChild(document.createTextNode(obj.adreca));
//Poblacio
table2.children[0].children[1].children[3].appendChild(document.createTextNode(obj.poblacio));

let subtotal=0;
for (let index = 0; index < obj.productos.length; index++) {
    const producto = obj.productos[index];
    
    let tr= document.createElement("tr");
    //Codi
    let td= document.createElement("td");
    td.appendChild(document.createTextNode(producto.codi))
    tr.appendChild(td);
    //Article
    td= document.createElement("td");
    td.appendChild(document.createTextNode(producto.article))
    tr.appendChild(td);
    //unidad
    td= document.createElement("td");
    td.appendChild(document.createTextNode(producto.unidad))
    tr.appendChild(td);
    //preu
    td= document.createElement("td");
    td.appendChild(document.createTextNode(new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(producto.preu)))
    tr.appendChild(td);
    //subtotal
    td= document.createElement("td");
    td.appendChild(document.createTextNode(new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(producto.preu*producto.unidad)))
    tr.appendChild(td);
    subtotal+=producto.preu*producto.unidad
    table3.children[1].appendChild(tr)
    //<tr><th colspan="5">Total articles</th></tr>
}
let tr=document.createElement("tr");
let th=document.createElement("th");
let textNode=document.createTextNode("Total articles");
th.appendChild(textNode);
th.setAttribute("colspan","4");
tr.appendChild(th);
//Subtotal
th=document.createElement("th");
textNode=document.createTextNode(new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(subtotal));
th.appendChild(textNode);
tr.appendChild(th);
table3.children[1].appendChild(tr);
//DTE
table4.children[0].children[0].children[1].appendChild(document.createTextNode(obj.dte*100+" %"));
//Import DTE
table4.children[0].children[1].children[1].appendChild(document.createTextNode(new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(obj.dte*subtotal)));
//Base Imposada
let baseIMP=(1-obj.dte)*subtotal;
table4.children[0].children[2].children[1].appendChild(document.createTextNode(new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(baseIMP)));
//IVA
table5.children[0].children[0].children[1].appendChild(document.createTextNode(obj.iva*100+" %"));
//Import IVA
table5.children[0].children[1].children[1].appendChild(document.createTextNode(new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(obj.iva*subtotal)));
//Total
table5.children[0].children[2].children[1].appendChild(document.createTextNode(new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format((1+obj.iva)*baseIMP)));
//pagat?
let pagat=document.getElementById("pagada");
if(obj.pagat){pagat.appendChild(document.createTextNode("Pagada"))}
else{
    pagat.appendChild(document.createTextNode("No Pagada"))
}


