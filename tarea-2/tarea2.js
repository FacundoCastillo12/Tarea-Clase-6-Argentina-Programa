/*
TAREA:
Crear una interfaz que permita agregar ó quitar (botones agregar y quitar) inputs+labels para completar el salario anual de cada integrante de la familia que trabaje.
Al hacer click en "calcular", mostrar en un elemento pre-existente el mayor salario anual, menor salario anual, salario anual promedio y salario mensual promedio.

Punto bonus: si hay inputs vacíos, ignorarlos en el cálculo (no contarlos como 0).
*/

const $añadirIntegrante = document.querySelector('#añadir-integrante');
const $quitarIntegrante = document.querySelector('#quitar-integrante');
const $listaMiembro = document.querySelector('#miembros');
const $calcularIngreso = document.querySelector('#calcular');
const $resultadoHidden = document.querySelector('#resultado');
const $buttonReiniciar = document.querySelector('#reinciar');
let $mayorSalarioAnual = document.querySelector('#mayor-ingreso-anual');
let $menorSalarioAnual = document.querySelector('#menor-ingreso-anual');
let $promedioSalarioAnual = document.querySelector('#promedio-ingreso-anual');
let $salarioMensualPromedio = document.querySelector('#mensual-promedio-ingreso');
let arrayDeIngreso = [];

let integrante = 0;
$añadirIntegrante.onclick = function(){
    integrante++;
    
    eliminarResultadoIngreso();

    const $nuevoInput = document.createElement('input');
    $nuevoInput.type = 'number';
    $nuevoInput.id = `ingreso-familiar${integrante}`;
    $nuevoInput.className = 'ingreso-De-Familia';
    const $nuevoLabel = document.createElement('label');
    $nuevoLabel.textContent = `Ingresar el salario del integrante familiar: #${integrante}`;
    $nuevoLabel.id = `label-texto${integrante}`;
    $nuevoLabel.className = 'text-label';

    $listaMiembro.appendChild($nuevoLabel);
    $listaMiembro.appendChild($nuevoInput);
    $calcularIngreso.hidden = false;
    return false;
}

$quitarIntegrante.onclick = function(){

    const $ingresoBorrar = document.querySelectorAll(`#ingreso-familiar${integrante}`);
    const $labelBorrar = document.querySelectorAll(`#ingreso-texto${integrante}`);
    eliminarResultadoIngreso();

    if ($listaMiembro.hasChildNodes() === true) {
        removeLastChild($ingresoBorrar);
        removeLastChild($labelBorrar);
    } else {
        alert ('Necesita añadir integrante');
        integrante = 1;
    }
    integrante --;
    return false
}

$calcularIngreso.onclick = function(){
    const $arrayDeingreso= document.querySelectorAll('.ingreso-De-Familia');
    for (let i = 0; i < $arrayDeingreso.length; i++) {
        if ($arrayDeingreso[i].value == ''){
            continue;
        } else {
            arrayDeIngreso.push(Number($arrayDeingreso[i].value));
        }
    }

    $mayorSalarioAnual.textContent += ingresoMayor(arrayDeIngreso);
    $menorSalarioAnual.textContent += ingresoMenor(arrayDeIngreso);
    $promedioSalarioAnual.textContent += ingresoPromedio(arrayDeIngreso);
    $salarioMensualPromedio.textContent += ingresoMensualPromedio($promedioSalarioAnual.textContent);

    $resultadoHidden.hidden = false;

    return false
}

$buttonReiniciar.onclick = function(){

    eliminarIntegrante();
    eliminarResultadoIngreso();
    integrante = 0;
    $resultadoHidden.hidden = true;
    $calcularIngreso.hidden = true;

    
    return false
}

function eliminarIntegrante(){
    const ingresoDeFamilia = document.querySelectorAll('.ingreso-De-Familia');
    const labelBorrar = document.querySelectorAll('.text-label');
    for (let i=0; i < ingresoDeFamilia.length; i++){
        ingresoDeFamilia[i].remove();
    }
    for (let i=0; i < labelBorrar.length; i++){
        labelBorrar[i].remove();
    }
}

function eliminarResultadoIngreso(){
    $mayorSalarioAnual.innerHTML = '';
    $menorSalarioAnual.innerHTML = '';
    $promedioSalarioAnual.innerHTML = '';
    $salarioMensualPromedio.innerHTML = '';
    arrayDeIngreso = [];
}

function removeLastChild() {
    const $listaEliminar = document.querySelector('#miembros');
    $listaEliminar.removeChild($listaEliminar.lastChild);
}

function ingresoPromedio(arrayIngreso){
    let sumaTotal = 0;
    for(let i=0; i<arrayIngreso.length; i++){
        sumaTotal = sumaTotal + arrayIngreso[i];
    }
    return sumaTotal / arrayIngreso.length;
}

function ingresoMenor(arrayIngreso){
    let ingresoMenor = Math.min(...arrayIngreso);
    return ingresoMenor;
}

function ingresoMayor(arrayIngreso){
    let ingresoMayor = Math.max(...arrayIngreso);
    return ingresoMayor;
}
function ingresoMensualPromedio(ingresoAnual){
    let ingresoPromedio = ingresoAnual / 12;
    return ingresoPromedio;
}

