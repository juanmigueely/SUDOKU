const medidaCuadricula = 9;
const listaSoduku = [];

async function resolverJuego() {
    //llenamos los tableros con valores 
    for (let fila = 0; fila < medidaCuadricula; fila++) {
        listaSoduku[fila] = [];
        for (let col = 0; col < medidaCuadricula; col++) {
            const idCelda = `celdas-${fila}-${col}`;
            const valorCelda = document.getElementById(idCelda).value;
            listaSoduku[fila][col] = valorCelda !== "" ? parseInt(valorCelda) : 0;

        };
    };

    //se identifican las celdas que ingresa el usuario y se marcan
    for (let fila = 0; fila < medidaCuadricula; fila++) {
        for (let col = 0; col < medidaCuadricula; col++) {
            const idCelda = `celdas-${fila}-${col}`;
            const celda = document.getElementById(idCelda);

            if (listaSoduku[fila][col] !== 0) {
                celda.classList.add("entradaUsu")
            };

        };
    };

    //resolver sudoku y mostrar la solucion en las celdas del tablero
    if (sudoku(listaSoduku)) { //verifica si el sudoku tiene solución
        for (let fila = 0; fila < medidaCuadricula; fila++) {
            for (let col = 0; col < medidaCuadricula; col++) {
                const idCelda = `celdas-${fila}-${col}`;
                const celda = document.getElementById(idCelda);

                if (!celda.classList.contains("entradaUsu")) {
                    celda.value = listaSoduku[fila][col];
                    celda.classList.add("efecto");
                    await efectoRetraso(30);
                };
            }
        };
    } else {
        alert("no hay solución juego")
    }

};

function sudoku(tablero) {
    for (let fila = 0; fila < medidaCuadricula; fila++) {
        for (let col = 0; col < medidaCuadricula; col++) {
            if (tablero[fila][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (evitarConflictos(tablero, fila, col, num)) {
                        tablero[fila][col] = num;

                        if (sudoku(tablero)) {
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

function evitarConflictos(tablero, fila, col, num) {
    //verificamos la fila y la columna
    for (let i = 0; i < medidaCuadricula; i++) {
        if (tablero[fila][i] === num || tablero[i][col] === num) {
            return false;
        };
    };

    //verificamos la subcuadricula de 3 x 3
    //para saber en que subcuadricula esta la celda 
    const filaInicio = Math.floor(fila / 3) * 3;
    const colInicio = Math.floor(col / 3) * 3;

    for (let i = filaInicio; i < filaInicio + 3; i++) {
        for (let j = colInicio; j < colInicio + 3; j++) {
            if (tablero[i][j] === num) {
                return false;
            };
        };
    };
    return true;
};

//función para efecto al llenar el tablero
function efectoRetraso(ms) {
    return new Promise(sudoku => setTimeout(sudoku, ms));
};

function reiniciarJuego() {
    for (let fila = 0; fila < medidaCuadricula; fila++) {
        for (let col = 0; col < medidaCuadricula; col++) {
            const idCelda = `celdas-${fila}-${col}`;
            const celdas = document.getElementById(idCelda);
            celdas.value = "";
            celdas.classList.remove("entradaUsu", "efecto");
        };
    };
};



function validarEntrada(event, fila, col) {
    
    const idCelda = `celdas-${fila}-${col}`
    const celdas = document.getElementById(idCelda);
    const valor = celdas.value;

    if (!/^[1-9]$/.test(valor)) {
        Swal.fire({
            title: "El numero " +valor+ " no es valido",
            text: "Ingresa un numero del 1 - 9",
            showConfirmButton: false,
            background: "rgba(0, 0, 0, 0.637)",
            color: "white",
            padding: "2em" 
        });
        celdas.value = "";
        return;
    };

    const numeroIngresado = parseInt(valor);

    for ( let i = 0; i < 9; i ++ ) {
        if ( i != col && document.getElementById(`celdas-${fila}-${i}`).value == numeroIngresado ) {
            Swal.fire({
                title: "El numero " +numeroIngresado+ " ya esta en la fila",
                showConfirmButton: false,
                background: "rgba(0, 0, 0, 0.637)",
                color: "white",
                padding: "3em" 
            });
            celdas.value = "";
            return;
        };
    };

    for ( let i = 0; i < 9; i ++ ) {
        if ( i != fila && document.getElementById(`celdas-${i}-${col}`).value == numeroIngresado ) {
            Swal.fire({
                title: "El numero " +numeroIngresado+ " ya esta en la columna",
                showConfirmButton: false,
                background: "rgba(0, 0, 0, 0.637)",
                color: "white",
                padding: "3em" 
            });
            celdas.value = "";
            return;
        };
    };

    const subcuadriculaFila = Math.floor( fila / 3 ) *3;
    const subcuadriculaCol = Math.floor( col / 3 ) *3;

    for ( let i = subcuadriculaFila; i < subcuadriculaFila + 3; i ++ ) {
        for ( let j = subcuadriculaCol; j < subcuadriculaCol + 3; j ++ ) {
            if ( i !== fila & j !== col & document.getElementById(`celdas-${i}-${j}`).value == numeroIngresado ) {
                Swal.fire({
                    title: "El numero " +numeroIngresado+ " ya se encuentra en la subcuadricula",
                    showConfirmButton: false,
                    background: "rgba(0, 0, 0, 0.637)",
                    color: "white",
                    padding: "3em" 
                });
                celdas.value = "";
                return;
            };
        };  
    };

};


