"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/process-warning";
exports.ids = ["vendor-chunks/process-warning"];
exports.modules = {

/***/ "(ssr)/./node_modules/process-warning/index.js":
/*!***********************************************!*\
  !*** ./node_modules/process-warning/index.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nconst { format } = __webpack_require__(/*! util */ \"util\")\n\nfunction build () {\n  const codes = {}\n  const emitted = new Map()\n\n  function create (name, code, message) {\n    if (!name) throw new Error('Warning name must not be empty')\n    if (!code) throw new Error('Warning code must not be empty')\n    if (!message) throw new Error('Warning message must not be empty')\n\n    code = code.toUpperCase()\n\n    if (codes[code] !== undefined) {\n      throw new Error(`The code '${code}' already exist`)\n    }\n\n    function buildWarnOpts (a, b, c) {\n      // more performant than spread (...) operator\n      let formatted\n      if (a && b && c) {\n        formatted = format(message, a, b, c)\n      } else if (a && b) {\n        formatted = format(message, a, b)\n      } else if (a) {\n        formatted = format(message, a)\n      } else {\n        formatted = message\n      }\n\n      return {\n        code,\n        name,\n        message: formatted\n      }\n    }\n\n    emitted.set(code, false)\n    codes[code] = buildWarnOpts\n\n    return codes[code]\n  }\n\n  function emit (code, a, b, c) {\n    if (codes[code] === undefined) throw new Error(`The code '${code}' does not exist`)\n    if (emitted.get(code) === true) return\n    emitted.set(code, true)\n\n    const warning = codes[code](a, b, c)\n    process.emitWarning(warning.message, warning.name, warning.code)\n  }\n\n  return {\n    create,\n    emit,\n    emitted\n  }\n}\n\nmodule.exports = build\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy13YXJuaW5nL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFZOztBQUVaLFFBQVEsU0FBUyxFQUFFLG1CQUFPLENBQUMsa0JBQU07O0FBRWpDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLG1DQUFtQyxLQUFLO0FBQ3hDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsZ0VBQWdFLEtBQUs7QUFDckU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXRoLWxvbmRvbi0yMDI0Ly4vbm9kZV9tb2R1bGVzL3Byb2Nlc3Mtd2FybmluZy9pbmRleC5qcz80ZDc5Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xuXG5jb25zdCB7IGZvcm1hdCB9ID0gcmVxdWlyZSgndXRpbCcpXG5cbmZ1bmN0aW9uIGJ1aWxkICgpIHtcbiAgY29uc3QgY29kZXMgPSB7fVxuICBjb25zdCBlbWl0dGVkID0gbmV3IE1hcCgpXG5cbiAgZnVuY3Rpb24gY3JlYXRlIChuYW1lLCBjb2RlLCBtZXNzYWdlKSB7XG4gICAgaWYgKCFuYW1lKSB0aHJvdyBuZXcgRXJyb3IoJ1dhcm5pbmcgbmFtZSBtdXN0IG5vdCBiZSBlbXB0eScpXG4gICAgaWYgKCFjb2RlKSB0aHJvdyBuZXcgRXJyb3IoJ1dhcm5pbmcgY29kZSBtdXN0IG5vdCBiZSBlbXB0eScpXG4gICAgaWYgKCFtZXNzYWdlKSB0aHJvdyBuZXcgRXJyb3IoJ1dhcm5pbmcgbWVzc2FnZSBtdXN0IG5vdCBiZSBlbXB0eScpXG5cbiAgICBjb2RlID0gY29kZS50b1VwcGVyQ2FzZSgpXG5cbiAgICBpZiAoY29kZXNbY29kZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgY29kZSAnJHtjb2RlfScgYWxyZWFkeSBleGlzdGApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYnVpbGRXYXJuT3B0cyAoYSwgYiwgYykge1xuICAgICAgLy8gbW9yZSBwZXJmb3JtYW50IHRoYW4gc3ByZWFkICguLi4pIG9wZXJhdG9yXG4gICAgICBsZXQgZm9ybWF0dGVkXG4gICAgICBpZiAoYSAmJiBiICYmIGMpIHtcbiAgICAgICAgZm9ybWF0dGVkID0gZm9ybWF0KG1lc3NhZ2UsIGEsIGIsIGMpXG4gICAgICB9IGVsc2UgaWYgKGEgJiYgYikge1xuICAgICAgICBmb3JtYXR0ZWQgPSBmb3JtYXQobWVzc2FnZSwgYSwgYilcbiAgICAgIH0gZWxzZSBpZiAoYSkge1xuICAgICAgICBmb3JtYXR0ZWQgPSBmb3JtYXQobWVzc2FnZSwgYSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvcm1hdHRlZCA9IG1lc3NhZ2VcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29kZSxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgbWVzc2FnZTogZm9ybWF0dGVkXG4gICAgICB9XG4gICAgfVxuXG4gICAgZW1pdHRlZC5zZXQoY29kZSwgZmFsc2UpXG4gICAgY29kZXNbY29kZV0gPSBidWlsZFdhcm5PcHRzXG5cbiAgICByZXR1cm4gY29kZXNbY29kZV1cbiAgfVxuXG4gIGZ1bmN0aW9uIGVtaXQgKGNvZGUsIGEsIGIsIGMpIHtcbiAgICBpZiAoY29kZXNbY29kZV0gPT09IHVuZGVmaW5lZCkgdGhyb3cgbmV3IEVycm9yKGBUaGUgY29kZSAnJHtjb2RlfScgZG9lcyBub3QgZXhpc3RgKVxuICAgIGlmIChlbWl0dGVkLmdldChjb2RlKSA9PT0gdHJ1ZSkgcmV0dXJuXG4gICAgZW1pdHRlZC5zZXQoY29kZSwgdHJ1ZSlcblxuICAgIGNvbnN0IHdhcm5pbmcgPSBjb2Rlc1tjb2RlXShhLCBiLCBjKVxuICAgIHByb2Nlc3MuZW1pdFdhcm5pbmcod2FybmluZy5tZXNzYWdlLCB3YXJuaW5nLm5hbWUsIHdhcm5pbmcuY29kZSlcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgY3JlYXRlLFxuICAgIGVtaXQsXG4gICAgZW1pdHRlZFxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnVpbGRcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/process-warning/index.js\n");

/***/ })

};
;