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
        
    // Simple array to match the pages <select>
    var ops = [ '+', '-', '*', '/' ];
    
    // Helper function
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    // Create a page object
    var page = {
        // Define the model
        model: {
            // Define model props and set initial values.
            // These will be cached in memory until the page is reloaded.
            results: [],
            currentOp: ops[getRandomInt(4)],
            currentX: getRandomInt(1000000),
            currentY: getRandomInt(1000000),
            
            // Calculator Functions
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

            // Button click event
            calculateResult: function() {                
                // Calculate
                // Model props [currentX, currentOp, currentY] are updated automatically
                // by using the [dataBind.js] plugin for Handlebars and using [v-model]
                // with Vue. Alternatively, the values could be read directly from DOM
                // using [document.querySelector(), etc].
                var item = {
                    x: parseFloat(this.currentX),
                    op: this.currentOp,
                    y: parseFloat(this.currentY),
                };
                item.z = this.calculate(item.x, item.op, item.y);
                item.hasError = isNaN(item.z);
                
                // Add to model property (front of the array)
                this.results.unshift(item);
                
                // Reset form to a new random value
                this.currentOp = ops[getRandomInt(4)];
                this.currentX = getRandomInt(1000000);
                this.currentY = getRandomInt(1000000);
                
                // Render HTML Controls to show updated model values.
                // This also triggers the [data-bind] plugin for Handlebars.
                // With the default demo code for Vue this only causes the
                // <footer> to update because Vue does not use HTML Controls
                // or other JS Plugins.
                app.refreshAllHtmlControls();
            },
            
            // Setup DOM events for the model when the HTML is rendered
            setupView: function() {
                // This files is shared for both the Handlebars and Vue demos.
                // With Vue standard Vue event handling from HTML is used:
                //     v-on:click="calculateResult"
                // However the following would also work with Vue if the [v-on]
                // event was not used.
                if (app.activeController.viewEngine !== 'Vue') {
                    document.querySelector('button').onclick = this.calculateResult.bind(this);
                }
            },
        },
        
        // Define the Controller [onRendered()] function.
        // This gets called each time the view is redrawn.
        onRendered: function() {
            this.setupView();
        },
    };

    // Add page to app
    app.addPage('calcPage', page);
})();