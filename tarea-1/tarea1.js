/*
TAREA: Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs+labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad, la menor edad y el promedio del grupo 
familiar.

Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente, borrando los inputs ya creados (investigar cómo en MDN).
*/


const $ingresar_datos = document.querySelector('#ingresar-datos');
const $nodoPagina = document.querySelector('#edades');
const $calcularEdades = document.querySelector('#calcular');
const $buttonReiniciar = document.querySelector('#reiniciar');
const $resultadoEscondido = document.querySelector('#resultado');
let $promedioEdad = document.querySelector('#edad-promedio');
let $menorEdad = document.querySelector('#edad-menor');
let $mayorEdad = document.querySelector('#edad-mayor');


$ingresar_datos.onclick = function(){
    const miembrosFamiliar = Number(document.querySelector('#cantidad-miembros').value);
    borrarIntegrantes();
    limpiarResultadoDocumento();
    createNewInputLabel(miembrosFamiliar);
    $calcularEdades.hidden = false;
    return false
}

function createNewInputLabel(numeroDeMiembros){
    let numeroDeIntegrantes = 0;
    for (let i=1; i <= numeroDeMiembros; i++){
        numeroDeIntegrantes = i;

        const $nuevoInput = document.createElement('input');
        $nuevoInput.type = 'number';
        $nuevoInput.className = 'edades-miembros';
        const $nuevoLabel = document.createElement('label');
        $nuevoLabel.textContent = `Edad integrante: #${numeroDeIntegrantes}`;
        $nuevoLabel.className = 'texto-edades';
    
        $nodoPagina.appendChild($nuevoLabel);
        $nodoPagina.appendChild($nuevoInput);
    }
}

let arrayDeEdades = [];

$calcularEdades.onclick = function(){
    const $arrayDeEdades = document.querySelectorAll('.edades-miembros');
    for (let i = 0; i < $arrayDeEdades.length; i++) {
        arrayDeEdades.push(Number($arrayDeEdades[i].value));
    }

    $promedioEdad.textContent += edadPromedio(arrayDeEdades);
    $menorEdad.textContent += edadMenor(arrayDeEdades);
    $mayorEdad.textContent += edadMayor(arrayDeEdades);
    $resultadoEscondido.hidden = false;
    return false
}

$buttonReiniciar.onclick = function(){
    borrarIntegrantes();
    limpiarResultadoDocumento()

    $resultadoEscondido.hidden = true;
    $calcularEdades.hidden = true;
    return false
};
function borrarIntegrantes(){
    const edadesBorrar = document.querySelectorAll('.edades-miembros');
    const labelBorrar = document.querySelectorAll('.texto-edades');
    for (let i=0; i < edadesBorrar.length; i++){
        edadesBorrar[i].remove();
    }
    for (let i=0; i < labelBorrar.length; i++){
        labelBorrar[i].remove();
    }
}
function limpiarResultadoDocumento(){
    $promedioEdad.innerHTML = '';
    $menorEdad.innerHTML= '';
    $mayorEdad.innerHTML = '';
    arrayDeEdades = [];
}

function edadPromedio(arrayEdades){
    let sumaTotal = 0;
    for(let i=0; i<arrayEdades.length; i++){
        sumaTotal = sumaTotal + arrayEdades[i];
    }
    return sumaTotal / arrayEdades.length;
}

function edadMenor(arrayEdades){
    let edadmenor = Math.min(...arrayEdades);
    return edadmenor;
}

function edadMayor(arrayEdades){
    let edadMayor = Math.max(...arrayEdades);
    return edadMayor;
}
