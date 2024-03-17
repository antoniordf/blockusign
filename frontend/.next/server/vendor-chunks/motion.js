"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/motion";
exports.ids = ["vendor-chunks/motion"];
exports.modules = {

/***/ "(ssr)/./node_modules/motion/dist/animate.cjs.js":
/*!*************************************************!*\
  !*** ./node_modules/motion/dist/animate.cjs.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n\nvar dom = __webpack_require__(/*! @motionone/dom */ \"(ssr)/./node_modules/@motionone/dom/dist/index.cjs.js\");\nvar utils = __webpack_require__(/*! @motionone/utils */ \"(ssr)/./node_modules/@motionone/utils/dist/index.cjs.js\");\nvar animation = __webpack_require__(/*! @motionone/animation */ \"(ssr)/./node_modules/@motionone/animation/dist/index.cjs.js\");\n\nfunction animateProgress(target, options = {}) {\n    return dom.withControls([\n        () => {\n            const animation$1 = new animation.Animation(target, [0, 1], options);\n            animation$1.finished.catch(() => { });\n            return animation$1;\n        },\n    ], options, options.duration);\n}\nfunction animate(target, keyframesOrOptions, options) {\n    const factory = utils.isFunction(target) ? animateProgress : dom.animate;\n    return factory(target, keyframesOrOptions, options);\n}\n\nexports.animate = animate;\nexports.animateProgress = animateProgress;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbW90aW9uL2Rpc3QvYW5pbWF0ZS5janMuanMiLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWIsOENBQTZDLEVBQUUsYUFBYSxFQUFDOztBQUU3RCxVQUFVLG1CQUFPLENBQUMsNkVBQWdCO0FBQ2xDLFlBQVksbUJBQU8sQ0FBQyxpRkFBa0I7QUFDdEMsZ0JBQWdCLG1CQUFPLENBQUMseUZBQXNCOztBQUU5Qyw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxlQUFlO0FBQ2YsdUJBQXVCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXRoLWxvbmRvbi0yMDI0Ly4vbm9kZV9tb2R1bGVzL21vdGlvbi9kaXN0L2FuaW1hdGUuY2pzLmpzPzgxM2YiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG52YXIgZG9tID0gcmVxdWlyZSgnQG1vdGlvbm9uZS9kb20nKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJ0Btb3Rpb25vbmUvdXRpbHMnKTtcbnZhciBhbmltYXRpb24gPSByZXF1aXJlKCdAbW90aW9ub25lL2FuaW1hdGlvbicpO1xuXG5mdW5jdGlvbiBhbmltYXRlUHJvZ3Jlc3ModGFyZ2V0LCBvcHRpb25zID0ge30pIHtcbiAgICByZXR1cm4gZG9tLndpdGhDb250cm9scyhbXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFuaW1hdGlvbiQxID0gbmV3IGFuaW1hdGlvbi5BbmltYXRpb24odGFyZ2V0LCBbMCwgMV0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgYW5pbWF0aW9uJDEuZmluaXNoZWQuY2F0Y2goKCkgPT4geyB9KTtcbiAgICAgICAgICAgIHJldHVybiBhbmltYXRpb24kMTtcbiAgICAgICAgfSxcbiAgICBdLCBvcHRpb25zLCBvcHRpb25zLmR1cmF0aW9uKTtcbn1cbmZ1bmN0aW9uIGFuaW1hdGUodGFyZ2V0LCBrZXlmcmFtZXNPck9wdGlvbnMsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBmYWN0b3J5ID0gdXRpbHMuaXNGdW5jdGlvbih0YXJnZXQpID8gYW5pbWF0ZVByb2dyZXNzIDogZG9tLmFuaW1hdGU7XG4gICAgcmV0dXJuIGZhY3RvcnkodGFyZ2V0LCBrZXlmcmFtZXNPck9wdGlvbnMsIG9wdGlvbnMpO1xufVxuXG5leHBvcnRzLmFuaW1hdGUgPSBhbmltYXRlO1xuZXhwb3J0cy5hbmltYXRlUHJvZ3Jlc3MgPSBhbmltYXRlUHJvZ3Jlc3M7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/motion/dist/animate.cjs.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/motion/dist/main.cjs.js":
/*!**********************************************!*\
  !*** ./node_modules/motion/dist/main.cjs.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n\nvar dom = __webpack_require__(/*! @motionone/dom */ \"(ssr)/./node_modules/@motionone/dom/dist/index.cjs.js\");\nvar types = __webpack_require__(/*! @motionone/types */ \"(ssr)/./node_modules/@motionone/types/dist/index.cjs.js\");\nvar animate = __webpack_require__(/*! ./animate.cjs.js */ \"(ssr)/./node_modules/motion/dist/animate.cjs.js\");\n\n\n\nexports.animate = animate.animate;\nObject.keys(dom).forEach(function (k) {\n\tif (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {\n\t\tenumerable: true,\n\t\tget: function () { return dom[k]; }\n\t});\n});\nObject.keys(types).forEach(function (k) {\n\tif (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {\n\t\tenumerable: true,\n\t\tget: function () { return types[k]; }\n\t});\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbW90aW9uL2Rpc3QvbWFpbi5janMuanMiLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWIsOENBQTZDLEVBQUUsYUFBYSxFQUFDOztBQUU3RCxVQUFVLG1CQUFPLENBQUMsNkVBQWdCO0FBQ2xDLFlBQVksbUJBQU8sQ0FBQyxpRkFBa0I7QUFDdEMsY0FBYyxtQkFBTyxDQUFDLHlFQUFrQjs7OztBQUl4QyxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLEVBQUU7QUFDRixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLEVBQUU7QUFDRixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXRoLWxvbmRvbi0yMDI0Ly4vbm9kZV9tb2R1bGVzL21vdGlvbi9kaXN0L21haW4uY2pzLmpzPzU0YmQiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG52YXIgZG9tID0gcmVxdWlyZSgnQG1vdGlvbm9uZS9kb20nKTtcbnZhciB0eXBlcyA9IHJlcXVpcmUoJ0Btb3Rpb25vbmUvdHlwZXMnKTtcbnZhciBhbmltYXRlID0gcmVxdWlyZSgnLi9hbmltYXRlLmNqcy5qcycpO1xuXG5cblxuZXhwb3J0cy5hbmltYXRlID0gYW5pbWF0ZS5hbmltYXRlO1xuT2JqZWN0LmtleXMoZG9tKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XG5cdGlmIChrICE9PSAnZGVmYXVsdCcgJiYgIWV4cG9ydHMuaGFzT3duUHJvcGVydHkoaykpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrLCB7XG5cdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRvbVtrXTsgfVxuXHR9KTtcbn0pO1xuT2JqZWN0LmtleXModHlwZXMpLmZvckVhY2goZnVuY3Rpb24gKGspIHtcblx0aWYgKGsgIT09ICdkZWZhdWx0JyAmJiAhZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShrKSkgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGssIHtcblx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdHlwZXNba107IH1cblx0fSk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/motion/dist/main.cjs.js\n");

/***/ })

};
;