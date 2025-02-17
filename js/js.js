const medidaCuadricula = 9;
const listaSoduku = [];

async function resolverJuego(){
    //llenamos los tableros con valores 
    for (let fila = 0; fila < medidaCuadricula; fila++){
        listaSoduku[fila] = [];
        for (let col = 0; col < medidaCuadricula; col++){
            const idCelda = `celdas-${fila}-${col}`;
            const valorCelda = document.getElementById(idCelda).value;
            listaSoduku[fila][col] = valorCelda !== ""? parseInt(valorCelda): 0; 
           
        };  
    };

    //se identifican las celdas que ingresa el usuario y se marcan
    for (let fila = 0; fila < medidaCuadricula; fila++){ 
        for (let col = 0; col < medidaCuadricula; col++){
            const idCelda = `celdas-${fila}-${col}`;
            const celda = document.getElementById(idCelda);

            if(listaSoduku[fila][col] !== 0){
                celda.classList.add("entradaUsu")
            };
            
        };  
    };

    //solución

    if (sudoku(listaSoduku)){
        for (let fila = 0; fila < medidaCuadricula; fila ++){
            for (let col = 0; col < medidaCuadricula; col ++){
                const idCelda = `celdas-${fila}-${col}`;
                const celda = document.getElementById(idCelda);

                if (!celda.classList.contains("entradaUsu")){
                    celda.value = listaSoduku [fila][col];
                    celda.classList.add("efecto");
                    await efectoRetraso(20);
                };
            }
        };
    } else{
        alert ("no hay solución juego")
    }

};

function sudoku(tablero){
    for (let fila = 0; fila < medidaCuadricula; fila ++){
        for (let col = 0; col < medidaCuadricula; col ++){
            if (tablero[fila][col] === 0){
                for (let num = 1; num <= 9; num ++){
                    if(evitarConflictos(tablero,fila,col,num)){
                        tablero[fila][col] = num;

                        if (sudoku(tablero)){
                            return true;
                        };

                        tablero[fila][col] = 0;
                    };
                };
                return false;
            };
        }
    };
    return true;
};

function evitarConflictos(tablero,fila,col,num){
    //verificamos la fila y la columna
    for (let i = 0; i < medidaCuadricula; i ++){
        if(tablero[fila][i] === num || tablero[i][col] === num ){
            return false;
        };
    };
    
    //verificamos la subcuadricula de 3 x 3
    //para saber en que subcuadricula esta la celda 
    const filaInicio = Math.floor (fila / 3)*3;
    const colInicio = Math.floor (col / 3)*3;

    for (let i = filaInicio; i < filaInicio + 3; i ++){
        for (let j = colInicio; j < colInicio + 3; j ++){
            if (tablero[i][j] === num){
                return false;
            };
        };
    };
    return true;
} ;

//función para efecto al llenar el tablero
function efectoRetraso(ms){
    return new Promise(sudoku => setTimeout(sudoku, ms));
};

function reiniciarJuego(){
    for (let fila = 0; fila < medidaCuadricula; fila ++){
        for (let col = 0; col < medidaCuadricula; col ++){
            const idCelda = `celdas-${fila}-${col}`;
            const celdas = document.getElementById(idCelda);
            celdas.value = "";
            celdas.classList.remove("entradaUsu", "efecto");
        };
    };
};


