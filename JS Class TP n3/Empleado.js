class Empleado{
    constructor(nombreC, categoria1, categoria2, categoria3, antiguedad, idioma, hijosG, presentismo, km, funcion, sindicato, jubilacion, obraSocial, adicional){
        this.nombreC = nombreC;
        this.categoria1 = categoria1;
        this.categoria2 = categoria2;
        this.categoria3 = categoria3;
        this.antiguedad = antiguedad;
        this.idioma = idioma;
        this.hijosG = hijosG;
        this.presentismo = presentismo;
        this.km = km;
        this.funcion = funcion;
        this.sindicato = sindicato;
        this.jubilacion = jubilacion;
        this.obraSocial = obraSocial;
        this.adicional = adicional;
    }
    FunctionSueldoBasico(){
        let sueldoBasico = 0;
        if(this.categoria = 'B-2')
            if(this.categoria3 = 'Junior') sueldoBasico = 91181,57;
            else if(this.categoria3 = 'Semi-Senior') sueldoBasico =  99508,87;
            else if(this.categoria3 = 'Senior') sueldoBasico = 107836,17;
        else if(this.categoria = 'B-10')
            if(this.categoria3 = 'Junior') sueldoBasico = 86522,94;
            else if(this.categoria3 = 'Semi-Senior') sueldoBasico = 94384,37;
            else if(this.categoria3 = 'Senior') sueldoBasico =  102245,81;
        else if(this.categoria = 'B-11')
            if(this.categoria3 = 'Junior') sueldoBasico =  84892,41;
            else if(this.categoria3 = 'Semi-Senior') sueldoBasico = 92590,80;
            else if(this.categoria3 = 'Senior') sueldoBasico = 100289,19;

        return sueldoBasico;
    }
    FunctionSueldoBruto(){
        let sIdioma = 0, sFuncion = 0, sPresentismo = 0, sTitulo = 0, sAdicionales = 0, sObjetivos = 0;
        //--Sueldo Basico------------------------------
        let sBasico = this.FunctionSueldoBasico();
        //--Antiguedad------------------------------
        let sAntiguedad = sBasico / 100 * this.antiguedad;
        //--Idiomas------------------------------
        if (this.idioma != 'Español') { sIdioma = sBasico/100*8; }
        //--Titulo de Grado------------------------------

        //--Presentismo------------------------------
        if(this.presentismo = true) { sPresentismo = sBasico/100*2; }
        //--Funcion------------------------------
        if(this.funcion = 'Coordinador Grupo') { sFuncion = sBasico/100*10; }
        else if(this.funcion = 'Lider de Equipo') { sFuncion = sBasico/100*20; }

        //--Calculo Final----------------------------------------------------------------------------------
        let sBruto = sBasico + sAntiguedad + sIdioma + sTitulo + sPresentismo + sFuncion + sAdicionales * sObjetivos + this.adicional;
        
        return sBruto;
    }
    FunctionRetenciones(){
        let retencionTotal=0;
        if(this.jubilacion==true)
            retencionTotal=retencionTotal + (this.FunctionSueldoBasico()/100*11);
        if(this.obraSocial==true)
            retencionTotal=retencionTotal + (this.FunctionSueldoBasico()/100*3);
        if(this.sindicato==true)
            retencionTotal=retencionTotal + (this.FunctionSueldoBasico()/100*1);
        return retencionTotal;
    }
    FunctionSueldoNeto(){ 
        return this.FunctionSueldoBruto() - this.FunctionRetenciones();
    }
}

class Liquidacion{
    constructor(sueldoBruto, Retenciones, SueldoNeto){
        this.sueldoBruto = sueldoBruto;
        this.Retenciones = Retenciones;
        this.SueldoNeto = SueldoNeto;
    }
}

let Empleado1 = new Empleado('Alvarado Lucas', 'B-11', 'Desarrollador Web', 'Semi-Senior', 5, 'Ingles', 2, true, 250, 'Coordinador Grupo', false, false, false, 0);
let Empleado2 = new Empleado('Artigas Juan Luis', 'B-10', 'Desarrollador Mobile', 'Junior', 2, 'Ingles', 0, true, 100, undefined, false, false, false, 7500);
let Empleado3 = new Empleado('Kevin Casas', 'B-2', 'Analista en Sistemas', 'Senior', 20, 'Ingles', 1, true, 350, 'Lider de Equipo', true, false, false, 0);


let Liquidacion1 = new Liquidacion(Empleado1.FunctionSueldoBruto(), Empleado1.FunctionRetenciones(), Empleado1.FunctionSueldoNeto());
let Liquidacion2 = new Liquidacion(Empleado2.FunctionSueldoBruto(), Empleado2.FunctionRetenciones(), Empleado2.FunctionSueldoNeto());
let Liquidacion3 = new Liquidacion(Empleado3.FunctionSueldoBruto(), Empleado3.FunctionRetenciones(), Empleado3.FunctionSueldoNeto());

function Show(Empleado, Liquidacion){
    let EmpleadoS = Empleado;
    let LiquidacionS = Liquidacion;
    document.getElementById("tablaM").innerHTML =
    document.getElementById("tablaM").innerHTML +
    ' <tr> <td><label>' + EmpleadoS.nombreC +
    '</label></td> <td><label> ' + EmpleadoS.categoria1 +
    '</label></td> <td><label> ' + EmpleadoS.categoria2 + 
    '</label></td> <td><label> ' + EmpleadoS.categoria3 +
    '</label></td> <td><label> ' + EmpleadoS.antiguedad +
    '</label></td> <td><label> ' + EmpleadoS.idioma +
    '</label></td> <td><label> ' + EmpleadoS.hijosG +
    '</label></td> <td><label> ' + EmpleadoS.presentismo +
    '</label></td> <td><label> ' + EmpleadoS.km + 'KM' +
    '</label></td> <td><label> ' + EmpleadoS.funcion +
    '</label></td> <td><label> ' + EmpleadoS.sindicato +
    '</label></td> <td><label> ' + EmpleadoS.jubilacion +
    '</label></td> <td><label> ' + EmpleadoS.obraSocial +
    '</label></td> <td><label> ' + EmpleadoS.adicional +
    '</label></td> <td><label> ' + LiquidacionS.SueldoNeto +
    '</label></td> </tr> ' 
}