/* Escribir un programa en JS para imprimir el área de dos rectángulos 
que tenga lados (4,5) y (5,8) respectivamente creando
una clase llamada 'CRectángulo' con una función llamada 'CalclarArea' que devuelve el área. 
La longitud y la altura se pasan como parámetros a su constructor. */

class CRectangulo{
    constructor(base, altura){
        this.base = base;
        this.altura = altura;
    }
    CalcularArea(){
        return this.base * this.altura;
    }
}

function areaRect(b, a){
    let rect = new CRectangulo(b,a);
    document.getElementById("answer").innerHTML = rect.CalcularArea();
}

function newRect(){
    let c1 = document.getElementById("c1").value; 
    let c2 = document.getElementById("c2").value;
    areaRect(c1,c2);
}
