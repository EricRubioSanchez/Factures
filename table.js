import {crearElement,modificarElement,moureElement} from "./Exercici.js";

export function crearTable(objetos, idTable) {
    let Tabla = document.getElementById(idTable);
    if (!Tabla) {
        throw new Error("No es troba la taula.");
    }
    /*
    let Thead = document.createElement("thead");
    Tabla.appendChild(Thead);
    */
    let tr = document.createElement("tr");
    Tabla.appendChild(tr);
    Object.keys(objetos[0]).forEach((key) => {
        let nodetext = document.createTextNode(key);
        let element = document.createElement("td");
        element.appendChild(nodetext);
        tr.appendChild(element);
    });
    /*
    let Tbody = document.createElement("tbody");
    Tabla.appendChild(Tbody);
    */
    for (let index = 0; index < objetos.length; index++) {
        const objeto = objetos[index];
        let tr = document.createElement("tr");
        Tabla.appendChild(tr);
        Object.values(objeto).forEach((value) => {
            let nodetext = document.createTextNode(value + "");
            let element = document.createElement("td");
            element.appendChild(nodetext);
            tr.appendChild(element);
        });
    }
    /*
    let nodetext = document.createTextNode(texto);
    let element = document.createElement(tag);
    element.appendChild(nodetext);
    */
}

export function omplirDades(array,taula){
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        let tr=taula.getElementsByTagName("tr")[index]
        for (let y = 0; y < element.length; y++) {
            try{
                const valor = element[y];
                if (valor){
                    let td= tr.getElementsByTagName("td")[y];
                    td=modificarElement(td,valor);
                    }
            }
            catch(err){
                return console.log("Mides diferents en la taula amb la array")
            }
        }
    }
    console.log(taula);
return taula;

}

/*
    <input type="button" id="Adalt" value="Adalt">
    <input type="button" id="Abaix" value="Abaix">
    <input type="button" id="Dreta" value="Dreta">
    <input type="button" id="Esquerra" value="Esquerra">
*/
//"","","","","","","",""
export function crearBotonsTaula(taula){
    function crearBoton(id,value){
        let boton = document.createElement("input");
        boton.setAttribute('id', id);
        boton.setAttribute('type', "button");
        boton.setAttribute("value", value);
        taula.insertAdjacentElement("afterend", boton); 
    }
    crearBoton("Adalt","↑");
    crearBoton("Abaix","↓");
    crearBoton("Dreta","→");
    crearBoton("Esquerra","←");
    crearBoton("AdaltEsquerra","↖");
    crearBoton("AdaltDreta","↗");
    crearBoton("AbaixEsquerra","↙");
    crearBoton("AbaixDreta","↘");
    crearBoton("copy","copy")
}

export function crearTable2(col, row) {
    let table = document.createElement("table");
    for (let i = 0; i < row; i++) {
        let tr = document.createElement("tr");
        table.appendChild(tr);
        for (let y = 0; y < col; y++) {
            let td = document.createElement("td");
            tr.appendChild(td);
        }
    }
    console.log(table);
    return table;
}
export function canviarCelda(col, row, value, idTable) {
    let table = document.getElementById(idTable);
    if (!table) {
        throw new Error("No es troba la taula.");
    }
    table.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].innerHTML = value;
}
function moureDreta(taula) {
    for (let i = 0; i < taula.getElementsByTagName("tr").length; i++) {
        let td = taula.getElementsByTagName("tr")[i].lastElementChild;
        taula.getElementsByTagName("tr")[i].insertBefore(td, taula.getElementsByTagName("tr")[i].firstElementChild);
    }
}
function moureEsquerra(taula) {
    for (let i = 0; i < taula.getElementsByTagName("tr").length; i++) {
        let td = taula.getElementsByTagName("tr")[i].getElementsByTagName("td")[0];
        taula.getElementsByTagName("tr")[i].appendChild(td);
    }
}
function moureAdalt(taula) {
    let tr = taula.getElementsByTagName("tr")[0];
    taula.appendChild(tr);
}
function moureAbaix(taula) {
    let tr = taula.rows[taula.rows.length - 1];
    taula.insertBefore(tr, taula.firstChild);
}
export function moureTaula(posicion, idTable) {
    let table = document.getElementById(idTable);
    switch (posicion) {
        case "Adalt":
            moureAdalt(table);
            break;
        case "AdaltEsquerra":
            moureAdalt(table);
            moureEsquerra(table);
            break;
        case "AdaltDreta":
            moureAdalt(table);
            moureDreta(table);
            break;
        case "Abaix":
            moureAbaix(table);
            break;
        case "AbaixEsquerra":
            moureAbaix(table);
            moureEsquerra(table);
            break;
        case "AbaixDreta":
            moureAbaix(table);
            moureDreta(table);
            break;
        case "Dreta":
            moureDreta(table);
            break;
        case "Esquerra":
            moureEsquerra(table);
            break;
        default:
            throw new Error("Les posicions nomes poden ser Adalt, Abaix, Dreta i Esquerra.");
            break;
    }
}
