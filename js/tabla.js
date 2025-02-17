//función anonima que se dispara al escuchar el documento HTML
//cuando se carga
document.addEventListener('DOMContentLoaded', function () {

    const btnResolver = document.getElementById("btnResolver");
    btnResolver.addEventListener('click', resolverJuego);

    const btnReiniciar = document.getElementById("btnReiniciar");
    btnReiniciar.addEventListener('click', reiniciarJuego);

    const bodyTabla = document.getElementById("body-tabla");
    const cuadricula = 9;

    //bucle para las filas 
    for (let fila = 0; fila < cuadricula; fila++ ){
        const nuevaFila = document.createElement('tr');
 
        //bucle para las celdas
        for (let col = 0; col < cuadricula; col++ ){
            const celdas = document.createElement('td');
            const input = document.createElement('input');
            input.type = "number";
            input.className = "celda";
            input.id =  `celdas-${fila}-${col}`;  

            input.addEventListener('input', function(event){
                validarEntrada(event, fila, col);
            });
            
            celdas.appendChild(input);
            nuevaFila.appendChild(celdas);
        };  
        
        bodyTabla.appendChild(nuevaFila);
    };
});
//rgba(52, 236, 46, 0.836)
//rgba(52, 236, 46, 0.904)