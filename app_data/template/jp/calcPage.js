/*
	This is a DataFormsJS Page Object (Plain JavaScript Object)

	In DataFormsJS a Page Object represents both the controller
    and the model and can be loaded dynamically only if used.
	
    This file is used by both the Handlebars Demo [app.htm]
    and the Vue Demo [app-vue.htm].
    
    In both demo files [app.lazyLoad = {calcPage:'calcPage.js'}]
    is used to define a link to the file and <script data-lazy-load="calcPage">
    is used to download the file when the page is viewed.
*/

/* 
    Validates with [jshint]
    The playground site includes JSHint and provides linting as you enter code.
*/
/* global app */
/* jshint strict: true */

// ** Uncomment the line below to see what happens:
// Error Test

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
                // This file is shared for both the Handlebars and Vue demos.
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