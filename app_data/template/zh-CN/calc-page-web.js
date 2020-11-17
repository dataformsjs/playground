/**
 * JavaScript for the Web Component Calculator Demo from [app-web.htm].
 *
 * DataFormsJS Web Components are customized through mostly basic
 * JavaScript functions so most code is script used standard DOM
 * and very little DataFormsJS API is needed.
 * 
 * The code block at `window.usingWebComponentsPolyfill` uses
 * DataFormsJS API while the rest is plain JavaScript.
 */

/* Validates with [jshint] */
/* global app */
/* exported setupCalcPage */
/* jshint strict: global */
/* jshint browser: true */

'use strict';

// Save Calculator Results to a plain JavaScript Object.
// This will be cached in memory until the page is reloaded.
var calculator = {
    // Save results to an array
    results: [],
    currentOp: null,
    currentX: null,
    currentY: null,

    // Simple array to match the pages <select>
    ops: [ '+', '-', '*', '/' ],

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
    getRandomInt: function(max) {
  		return Math.floor(Math.random() * Math.floor(max));
	},
    setNewRandomValues: function() {
        calculator.currentOp = this.ops[this.getRandomInt(this.ops.length)];
        calculator.currentX = this.getRandomInt(1000000);
        calculator.currentY = this.getRandomInt(1000000);
    },
};

function setupCalcPage() {
    // Get User Input Elements
    var currentX = document.querySelector('#current-x');
    var currentOp = document.querySelector('#current-op');
    var currentY = document.querySelector('#current-y');
    var calcResult = document.querySelector('.calc-result');
    var dataList = document.querySelector('data-list');

    // Private function to update screen
    function updateForm() {
        // Define initial values or new random values
        if (calculator.currentOp === null) {
            calculator.setNewRandomValues();
        }
        currentOp.value = calculator.currentOp;
        currentX.value = calculator.currentX;
        currentY.value = calculator.currentY;

        // This will be hidden until the user clicks
        // the [Calculate] button at least once.
        calcResult.style.display = (calculator.results.length === 0 ? 'none' : '');

        // Update the <data-list>
        if (window.usingWebComponentsPolyfill) {
            // For older browsers or if [polyfill.js] is used the list will
            // need to be refreshed using the DataFormsJS Framework API for
            // the <data-list> JavaScript Control. Typically <data-list>
            // would be set inside of a <json-data> control and use [data-bind]
            // so for most apps code using this much API is rarely needed.
            app.activeModel.results = calculator.results;
            dataList.setAttribute('data-bind', 'results');
            app.loadJsControl(dataList);
        } else {
            // Set Property and call function from the <data-list> Web Component
            dataList.value = calculator.results;
            dataList.renderList();
        }
    }
    updateForm();

    // Handle Button Click Event
    document.querySelector('button').onclick = function () {
        // Calculate
        var item = {
            x: parseFloat(currentX.value),
            op: currentOp.value,
            y: parseFloat(currentY.value),
        };
        item.z = calculator.calculate(item.x, item.op, item.y);
        item.hasError = isNaN(item.z);

        // Add to list (front of the array) and reset form
        calculator.results.unshift(item);
        calculator.setNewRandomValues();
        updateForm();
    };
}
