/*
	Este es un objeto de página DataFormsJS (objeto JavaScript simple)

    En DataFormsJS, un Objeto de página representa tanto el controlador
    como el modelo y solo se puede cargar dinámicamente si se usa.
	
    Este archivo es utilizado por la demostración de manillar
    [app.htm] y la demostración de Vue [app-vue.htm].
    
    En ambos archivos de demostración [app.lazyLoad = {calcPage:'calcPage.js'}]
    se usa para definir un enlace al archivo y <script data-lazy-load="calcPage">
    se usa para descargar el archivo cuando se ve la página.
*/

/* 
    Valida con [jshint]
    El sitio del patio de recreo incluye JSHint y proporciona linting a medida que ingresa el código.
*/
/* global app */
/* jshint strict: true */

// ** Descomente la línea a continuación para ver qué sucede:
// Prueba de error

(function () {
    'use strict';
        
    // Matriz simple para que coincida con las páginas <seleccionar>
    var ops = [ '+', '-', '*', '/' ];
    
    // Función auxiliar
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    // Crear un objeto de página
    var page = {
        // Define el modelo
        model: {
            // Definir accesorios de modelo y establecer valores iniciales.
            // Estos se almacenarán en la memoria caché hasta que se vuelva a cargar la página.
            results: [],
            currentOp: ops[getRandomInt(4)],
            currentX: getRandomInt(1000000),
            currentY: getRandomInt(1000000),
            
            // Funciones de calculadora
            add: function(x, y) { return x + y; },
            subtract: function(x, y) { return x - y; },
            multiply: function(x, y) { return x * y; },
            divide: function(x, y) { return x / y; },
            calculate: function(x, op, y) {
                switch (op) {
                    case '+':
                        return this.add(x, y);
                    case '-':
                        return this.subtract(x, y);
                    case '*':
                        return this.multiply(x, y);
                    case '/':
                        return this.divide(x, y);
                }
            },

            // Evento de clic de botón
            calculateResult: function() {                
                // Calcular
                // Los accesorios del modelo [currentX, currentOp, currentY] se actualizan
                // automáticamente usando el complemento [dataBind.js] para Handlebars y
                // usando [v-model] con Vue. Alternativamente, los valores podrían leerse
                // directamente desde DOM usando [document.querySelector (), etc.].
                var item = {
                    x: parseFloat(this.currentX),
                    op: this.currentOp,
                    y: parseFloat(this.currentY),
                };
                item.z = this.calculate(item.x, item.op, item.y);
                item.hasError = isNaN(item.z);
                
                // Agregar a la propiedad del modelo (frente de la matriz)
                this.results.unshift(item);
                
                // Restablecer formulario a un nuevo valor aleatorio
                this.currentOp = ops[getRandomInt(4)];
                this.currentX = getRandomInt(1000000);
                this.currentY = getRandomInt(1000000);
                
                // Renderiza controles HTML para mostrar valores de modelo actualizados.
                // Esto también activa el complemento [data-bind] para Handlebars.
                // Con el código de demostración predeterminado para Vue, esto solo
                // hace que el <footer> se actualice porque Vue no usa controles
                // HTML u otros complementos JS.
                app.refreshAllHtmlControls();
            },
            
            // Configurar eventos DOM para el modelo cuando se representa el HTML
            setupView: function() {
                // Este archivo se comparte para las demostraciones Handlebars y Vue.
                // Con el estándar Vue, se utiliza el manejo de eventos Vue desde HTML:
                //     v-on:click="calculateResult"
                // Sin embargo, lo siguiente también funcionaría con Vue si no se usara
                // el evento [v-on].
                if (app.activeController.viewEngine !== 'Vue') {
                    document.querySelector('button').onclick = this.calculateResult.bind(this);
                }
            },
        },
        
        // Defina la función Controlador [onRendered ()].
        // Esto se llama cada vez que se vuelve a dibujar la vista.
        onRendered: function() {
            this.setupView();
        },
    };

    // Agregar página a la aplicación
    app.addPage('calcPage', page);
})();