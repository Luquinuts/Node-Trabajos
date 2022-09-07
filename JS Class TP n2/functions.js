/* 
Escribir un programa que imprima la información 
(nombre, año de ingreso, salario, dirección) 
de tres empleados creando una clase llamada
'CEmpleado'. La salida debe ser la siguiente:

Name        Year of joining        Address

Robert        1994        64C- WallsStreat

Sam        2000        68D- WallsStreat

John        1999        26B- WallsStreat
*/

class Empleado{
    constructor(nombre, anio, direccion){
        this.nombre = nombre;
        this.anio = anio;
        this.direccion = direccion;
    }
}

let Empleados = [];
let i = 0;

function CrearEmpleado(nombre, anio, direccion){
    Empleados.push(new Empleado(nombre,anio, direccion));
    Empleados.forEach(function(nombre, anio, direccion) {
        console.log(nombre, anio, direccion);
        document.getElementById("tablaM").innerHTML =
        document.getElementById("tablaM").innerHTML + 
        ' <tr> <td width="25%"><label>' + Empleados[i].nombre + 
        '</label></td> <td width="25%"><label> ' + Empleados[i].anio + 
        '</label></td> <td width="50%"><label>' + Empleados[i].direccion + 
        '</label></td> </tr> '
        i++;
    })
}

function CustomEmpleado(){
    let c1 = document.getElementById("c1").value; 
    let c2 = document.getElementById("c2").value;
    let c3 = document.getElementById("c3").value;
    CrearEmpleado(c1,c2,c3);
}