document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const pantalla = document.querySelector('.pantalla');
    const botones = document.querySelector('.botones');

    // Variables de estado
    let valorActual = '0';
    let parentesisAbiertos = 0;
    let ultimoResultado = '';

    // Objeto con frases burlonas categorizadas
    const frasesBurlonas = {
        simple: [
            "¡Wow, eres un genio! Sumando dos números como un profesional.",
            "¿Te costó mucho sumar eso? Seguro usaste una calculadora para estar seguro.",
            "¡Felicidades! Acabas de resolver algo que un niño de primer grado haría en segundos.",
            "No sé cómo lo lograste, pero aquí está tu respuesta. Bravo.",
            "Con habilidades matemáticas así, estás listo para sumar el cambio en el súper.",
        ],
        intermedio: [
            "¡Ahí vamos! Multiplicar ya es todo un desafío, ¿eh?",
            "Esto ya parece cálculo avanzado... de tercer grado.",
            "¡Wow! Dividiendo como si fueras Einstein en sus ratos libres.",
            "¡Bravo! No pensé que llegarías tan lejos, pero aquí estamos.",
            "Multiplicar no es para cualquiera. Menos mal tienes esta calculadora.",
        ],
        avanzado: [
            "¡Detengan las rotativas! Este cálculo casi hace que mi procesador explote.",
            "Ahora sí que estamos hablando, aunque esto sigue siendo pan comido para mí.",
            "¿Resolver esto te llevó tiempo? Tranquilo, no todos nacen con mi velocidad.",
            "¡Te pasaste! Esto ya parece un problema del examen de admisión a la NASA.",
            "Vaya, vaya, alguien está jugando con fuego haciendo cálculos combinados.",
        ],
        general: [
            "Wow, resolviste eso. Seguro ahora el mundo es un lugar mejor, ¿no?",
            "¿Sabías que con ese cálculo acabas de ahorrar 0 segundos de tu vida? ¡Impresionante!",
            "Esto me hace cuestionar mis prioridades. ¿Por qué estoy ayudándote con esto, de nuevo?",
            "Espero que este cálculo te dé la validación que necesitas. Todos la buscamos, ¿no?",
            "Guarda este momento en tu diario, porque hoy hiciste algo que nadie recordará.",
        ]
    };

    /**
     * Muestra un mensaje burlesco en la pantalla
     * @param {string} tipo - Tipo de cálculo (simple, intermedio, avanzado)
     */
    function mostrarMensaje(tipo) {
        const mensajeElement = document.createElement('div');
        mensajeElement.classList.add('mensaje-burlesco', 'aparecer');
        
        // Selecciona aleatoriamente entre frases generales o específicas
        let frasesSeleccionadas;
        if (Math.random() < 0.2) {
            frasesSeleccionadas = frasesBurlonas.general;
        } else {
            frasesSeleccionadas = frasesBurlonas[tipo];
        }
        
        const mensaje = frasesSeleccionadas[Math.floor(Math.random() * frasesSeleccionadas.length)];
        
        mensajeElement.textContent = mensaje;
        document.body.appendChild(mensajeElement);
        
        // Elimina el mensaje después de un tiempo
        setTimeout(() => {
            mensajeElement.classList.remove('aparecer');
            mensajeElement.classList.add('desaparecer');
            setTimeout(() => {
                mensajeElement.remove();
            }, 500);
        }, 3500);
    }

    /**
     * Maneja la entrada de usuario y actualiza la pantalla
     * @param {string} valor - Valor ingresado por el usuario
     */
    function manejarInput(valor) {
        const operadores = ['+', '-', '*', '/', '^'];
        const funciones = ['sin', 'cos', 'tan', 'log', 'ln', 'exp', 'sqrt'];
        
        if (!isNaN(valor) || valor === '.') {
            // Si hay un resultado previo y se ingresa un número, comenzar una nueva operación
            if (ultimoResultado !== '') {
                valorActual = valor;
                ultimoResultado = '';
            } else if (valorActual === '0' && valor !== '.') {
                valorActual = valor;
            } else {
                valorActual += valor;
            }
        } else {
            // Manejo de operadores y funciones
            switch (valor) {
                case 'limpiar':
                    valorActual = '0';
                    parentesisAbiertos = 0;
                    ultimoResultado = '';
                    break;
                case 'borrar':
                    if (valorActual.length > 1) {
                        valorActual = valorActual.slice(0, -1);
                    } else {
                        valorActual = '0';
                    }
                    break;
                case 'parentesis':
                    if (parentesisAbiertos > 0 && valorActual.slice(-1) !== '(') {
                        valorActual += ')';
                        parentesisAbiertos--;
                    } else {
                        valorActual += '(';
                        parentesisAbiertos++;
                    }
                    break;
                case 'porcentaje':
                    valorActual += '/100';
                    break;
                case 'dividir':
                    valorActual += '/';
                    break;
                case 'multiplicar':
                    valorActual += '*';
                    break;
                case 'restar':
                    valorActual += '-';
                    break;
                case 'sumar':
                    valorActual += '+';
                    break;
                case 'potencia':
                    valorActual += '^';
                    break;
                case 'igual':
                    try {
                        let resultado = math.evaluate(valorActual);
                        if (isNaN(resultado) || !isFinite(resultado)) {
                            throw new Error('Resultado no válido');
                        }
                        resultado = Number(resultado.toFixed(10));
                        
                        // Determinar el tipo de cálculo para el mensaje burlón
                        let tipoCalculo = 'simple';
                        if (valorActual.includes('sin') || valorActual.includes('cos') || valorActual.includes('tan') ||
                            valorActual.includes('log') || valorActual.includes('ln') || valorActual.includes('sqrt')) {
                            tipoCalculo = 'avanzado';
                        } else if (valorActual.includes('*') || valorActual.includes('/') || valorActual.includes('^')) {
                            tipoCalculo = 'intermedio';
                        }
                        
                        // Mostrar solo el resultado y guardarlo como último resultado
                        valorActual = resultado.toString();
                        ultimoResultado = valorActual;
                        mostrarMensaje(tipoCalculo);
                    } catch (error) {
                        valorActual = 'Error: ' + error.message;
                        ultimoResultado = '';
                    }
                    break;
                case 'sin':
                case 'cos':
                case 'tan':
                case 'log':
                case 'ln':
                case 'exp':
                    valorActual += `${valor}(`;
                    parentesisAbiertos++;
                    break;
                case 'raiz':
                    valorActual += 'sqrt(';
                    parentesisAbiertos++;
                    break;
                case 'factorial':
                    valorActual += '!';
                    break;
                case 'pi':
                    valorActual += 'pi';
                    break;
                case 'e':
                    valorActual += 'e';
                    break;
            }
        }
        pantalla.textContent = valorActual;
    }

    // Evento delegado para los clics en los botones
    botones.addEventListener('click', (e) => {
        if (e.target.matches('button')) {
            const boton = e.target;
            const accion = boton.dataset.accion || boton.textContent;
            manejarInput(accion);
        }
    });

    // Manejo de entrada por teclado
    document.addEventListener('keydown', (e) => {
        const tecla = e.key;
        if (/^[0-9.]$/.test(tecla) || '+-*/()^'.includes(tecla)) {
            e.preventDefault();
            manejarInput(tecla);
        } else if (tecla === 'Enter') {
            e.preventDefault();
            manejarInput('igual');
        } else if (tecla === 'Backspace') {
            e.preventDefault();
            manejarInput('borrar');
        } else if (tecla === 'Escape') {
            e.preventDefault();
            manejarInput('limpiar');
        } else if (tecla === '+') {
            e.preventDefault();
            manejarInput('sumar');
        } else if (tecla === '-') {
            e.preventDefault();
            manejarInput('restar');
        } else if (tecla === '*') {
            e.preventDefault();
            manejarInput('multiplicar');
        } else if (tecla === '/') {
            e.preventDefault();
            manejarInput('dividir');
        }
    });
});
