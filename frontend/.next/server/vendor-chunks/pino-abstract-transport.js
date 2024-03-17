"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/pino-abstract-transport";
exports.ids = ["vendor-chunks/pino-abstract-transport"];
exports.modules = {

/***/ "(ssr)/./node_modules/pino-abstract-transport/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/pino-abstract-transport/index.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nconst metadata = Symbol.for('pino.metadata')\nconst split = __webpack_require__(/*! split2 */ \"(ssr)/./node_modules/split2/index.js\")\nconst { Duplex } = __webpack_require__(/*! readable-stream */ \"(ssr)/./node_modules/readable-stream/lib/ours/index.js\")\n\nmodule.exports = function build (fn, opts = {}) {\n  const parseLines = opts.parse === 'lines'\n  const parseLine = typeof opts.parseLine === 'function' ? opts.parseLine : JSON.parse\n  const close = opts.close || defaultClose\n  const stream = split(function (line) {\n    let value\n\n    try {\n      value = parseLine(line)\n    } catch (error) {\n      this.emit('unknown', line, error)\n      return\n    }\n\n    if (value === null) {\n      this.emit('unknown', line, 'Null value ignored')\n      return\n    }\n\n    if (typeof value !== 'object') {\n      value = {\n        data: value,\n        time: Date.now()\n      }\n    }\n\n    if (stream[metadata]) {\n      stream.lastTime = value.time\n      stream.lastLevel = value.level\n      stream.lastObj = value\n    }\n\n    if (parseLines) {\n      return line\n    }\n\n    return value\n  }, { autoDestroy: true })\n\n  stream._destroy = function (err, cb) {\n    const promise = close(err, cb)\n    if (promise && typeof promise.then === 'function') {\n      promise.then(cb, cb)\n    }\n  }\n\n  if (opts.metadata !== false) {\n    stream[metadata] = true\n    stream.lastTime = 0\n    stream.lastLevel = 0\n    stream.lastObj = null\n  }\n\n  let res = fn(stream)\n\n  if (res && typeof res.catch === 'function') {\n    res.catch((err) => {\n      stream.destroy(err)\n    })\n\n    // set it to null to not retain a reference to the promise\n    res = null\n  } else if (opts.enablePipelining && res) {\n    return Duplex.from({ writable: stream, readable: res, objectMode: true })\n  }\n\n  return stream\n}\n\nfunction defaultClose (err, cb) {\n  process.nextTick(cb, err)\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcGluby1hYnN0cmFjdC10cmFuc3BvcnQvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQVk7O0FBRVo7QUFDQSxjQUFjLG1CQUFPLENBQUMsb0RBQVE7QUFDOUIsUUFBUSxTQUFTLEVBQUUsbUJBQU8sQ0FBQywrRUFBaUI7O0FBRTVDLDhDQUE4QztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUcsSUFBSSxtQkFBbUI7O0FBRTFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsSUFBSTtBQUNKLHlCQUF5QixtREFBbUQ7QUFDNUU7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ldGgtbG9uZG9uLTIwMjQvLi9ub2RlX21vZHVsZXMvcGluby1hYnN0cmFjdC10cmFuc3BvcnQvaW5kZXguanM/MzU0NiJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxuY29uc3QgbWV0YWRhdGEgPSBTeW1ib2wuZm9yKCdwaW5vLm1ldGFkYXRhJylcbmNvbnN0IHNwbGl0ID0gcmVxdWlyZSgnc3BsaXQyJylcbmNvbnN0IHsgRHVwbGV4IH0gPSByZXF1aXJlKCdyZWFkYWJsZS1zdHJlYW0nKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkIChmbiwgb3B0cyA9IHt9KSB7XG4gIGNvbnN0IHBhcnNlTGluZXMgPSBvcHRzLnBhcnNlID09PSAnbGluZXMnXG4gIGNvbnN0IHBhcnNlTGluZSA9IHR5cGVvZiBvcHRzLnBhcnNlTGluZSA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMucGFyc2VMaW5lIDogSlNPTi5wYXJzZVxuICBjb25zdCBjbG9zZSA9IG9wdHMuY2xvc2UgfHwgZGVmYXVsdENsb3NlXG4gIGNvbnN0IHN0cmVhbSA9IHNwbGl0KGZ1bmN0aW9uIChsaW5lKSB7XG4gICAgbGV0IHZhbHVlXG5cbiAgICB0cnkge1xuICAgICAgdmFsdWUgPSBwYXJzZUxpbmUobGluZSlcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhpcy5lbWl0KCd1bmtub3duJywgbGluZSwgZXJyb3IpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuZW1pdCgndW5rbm93bicsIGxpbmUsICdOdWxsIHZhbHVlIGlnbm9yZWQnKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHZhbHVlID0ge1xuICAgICAgICBkYXRhOiB2YWx1ZSxcbiAgICAgICAgdGltZTogRGF0ZS5ub3coKVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdHJlYW1bbWV0YWRhdGFdKSB7XG4gICAgICBzdHJlYW0ubGFzdFRpbWUgPSB2YWx1ZS50aW1lXG4gICAgICBzdHJlYW0ubGFzdExldmVsID0gdmFsdWUubGV2ZWxcbiAgICAgIHN0cmVhbS5sYXN0T2JqID0gdmFsdWVcbiAgICB9XG5cbiAgICBpZiAocGFyc2VMaW5lcykge1xuICAgICAgcmV0dXJuIGxpbmVcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVcbiAgfSwgeyBhdXRvRGVzdHJveTogdHJ1ZSB9KVxuXG4gIHN0cmVhbS5fZGVzdHJveSA9IGZ1bmN0aW9uIChlcnIsIGNiKSB7XG4gICAgY29uc3QgcHJvbWlzZSA9IGNsb3NlKGVyciwgY2IpXG4gICAgaWYgKHByb21pc2UgJiYgdHlwZW9mIHByb21pc2UudGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcHJvbWlzZS50aGVuKGNiLCBjYilcbiAgICB9XG4gIH1cblxuICBpZiAob3B0cy5tZXRhZGF0YSAhPT0gZmFsc2UpIHtcbiAgICBzdHJlYW1bbWV0YWRhdGFdID0gdHJ1ZVxuICAgIHN0cmVhbS5sYXN0VGltZSA9IDBcbiAgICBzdHJlYW0ubGFzdExldmVsID0gMFxuICAgIHN0cmVhbS5sYXN0T2JqID0gbnVsbFxuICB9XG5cbiAgbGV0IHJlcyA9IGZuKHN0cmVhbSlcblxuICBpZiAocmVzICYmIHR5cGVvZiByZXMuY2F0Y2ggPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXMuY2F0Y2goKGVycikgPT4ge1xuICAgICAgc3RyZWFtLmRlc3Ryb3koZXJyKVxuICAgIH0pXG5cbiAgICAvLyBzZXQgaXQgdG8gbnVsbCB0byBub3QgcmV0YWluIGEgcmVmZXJlbmNlIHRvIHRoZSBwcm9taXNlXG4gICAgcmVzID0gbnVsbFxuICB9IGVsc2UgaWYgKG9wdHMuZW5hYmxlUGlwZWxpbmluZyAmJiByZXMpIHtcbiAgICByZXR1cm4gRHVwbGV4LmZyb20oeyB3cml0YWJsZTogc3RyZWFtLCByZWFkYWJsZTogcmVzLCBvYmplY3RNb2RlOiB0cnVlIH0pXG4gIH1cblxuICByZXR1cm4gc3RyZWFtXG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRDbG9zZSAoZXJyLCBjYikge1xuICBwcm9jZXNzLm5leHRUaWNrKGNiLCBlcnIpXG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/pino-abstract-transport/index.js\n");

/***/ })

};
;