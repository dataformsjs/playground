/*
	这是一个DataFormsJS页面对象(Plain JavaScript Object)

    在DataFormsJS中,页面对象同时代表控制器和模型,只有在使用时才能动态加载.

    此文件被Handlebars演示[app.htm]和the Vue Demo [app-vue.htm]所使用.

    在两个演示文件中[app.lazyLoad = {calcPage:'calcPage.js'}]
    用来定义文件的链接<script data-lazy-load="calcPage">
    用来在查看页面时下载文件.
*/

/*
    Validates with [jshint]
    在线编辑器页面包括JSHint,并在您输入代码时提供linting.
*/
/* global app */
/* jshint strict: true */

// ** 取消注释下面的行以查看会发生什么:
// 错误测试 错误测试

(function () {
    'use strict';

    // 匹配页面的简单数组<select>
    var ops = [ '+', '-', '*', '/' ];

    // 辅助函数
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    // 创建一个页面对象
    var page = {
        // 定义模型
        model: {
            // 定义模型道具并设置初始值.
            // 这些将被缓存在内存中，直到页面被重新加载.
            results: [],
            currentOp: ops[getRandomInt(4)],
            currentX: getRandomInt(1000000),
            currentY: getRandomInt(1000000),

            // 计算器函数
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

            // 按钮点击事件
            calculateResult: function() {
                // 计算
                // 自动更新模型道具[currentX, currentOp, currentY]
                // 通过为Handlebars使用[dataBind.js]插件和使用[v-model]
                // 使用Vue或者可以从DOM直接读取值
                // 使用 [document.querySelector()等].
                var item = {
                    x: parseFloat(this.currentX),
                    op: this.currentOp,
                    y: parseFloat(this.currentY),
                };
                item.z = this.calculate(item.x, item.op, item.y);
                item.hasError = isNaN(item.z);

                // 添加到模型属性(数组的前面)
                this.results.unshift(item);

                // 将表格重置为新的随机值
                this.currentOp = ops[getRandomInt(4)];
                this.currentX = getRandomInt(1000000);
                this.currentY = getRandomInt(1000000);

                // 渲染HTML控件以显示更新的模型值.
                // 这也触发了Handlebars的[data-bind]插件.
                // 使用Vue的默认演示代码,这只会导致
                // <footer>进行更新，因为Vue不使用HTML控件
                // 或其他JS插件.
                app.refreshAllHtmlControls();
            },

            // 在渲染HTML时为模型设置DOM事件
            setupView: function() {
                // 此文件是Handlebars和Vue演示共享的.
                // 对于Vue,使用HTML的Vue事件处理:
                //     v-on:click="calculateResult"
                // 但是,如果没有使用[v-on]事件,
                // 下面的方法也适用于Vue.
                if (app.activeController.viewEngine !== 'Vue') {
                    document.querySelector('button').onclick = this.calculateResult.bind(this);
                }
            },
        },

        // 定义控制器[onRendered()]函数.
        // 每次重绘视图时都会调用此方法.
        onRendered: function() {
            this.setupView();
        },
    };

    // 添加页面到应用
    app.addPage('calcPage', page);
})();