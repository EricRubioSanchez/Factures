export function crearElement(tag, texto, atributos) {
    let nodetext = document.createTextNode(texto);
    let element = document.createElement(tag);
    element.appendChild(nodetext);
    if (atributos) {
        for (const [key, value] of atributos) {
            element.setAttribute(key, value);
        }
    }
    return element;
}
export function modificarElement(element, atributs) {
    for (let index = 0; index < Object.keys(atributs).length; index++) {
        element.setAttribute(Object.keys(atributs)[index], Object.values(atributs)[index]);
    }
    return element;
}
export function moureElement(posicio, moviment, elementPare) {
    switch (moviment) {
        case "abans":
            elementPare.insertBefore(elementPare.children[posicio], elementPare.children[posicio - 1]);
            break;
        case "despres":
            elementPare.children[posicio + 1].insertAdjacentElement("afterend", elementPare.children[posicio]);
            break;
        case "primer":
            elementPare.insertBefore(elementPare.children[posicio], elementPare.children[0]);
            break;
        case "ultim":
            elementPare.appendChild(elementPare.children[posicio]);
            break;
        default:
            break;
    }
}
