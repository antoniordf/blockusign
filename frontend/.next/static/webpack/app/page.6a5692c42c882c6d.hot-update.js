"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./src/components/DynamicTextFieldComponent/DynamicTextFieldComponent.tsx":
/*!********************************************************************************!*\
  !*** ./src/components/DynamicTextFieldComponent/DynamicTextFieldComponent.tsx ***!
  \********************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _barrel_optimize_names_Box_Button_TextField_mui_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! __barrel_optimize__?names=Box,Button,TextField!=!@mui/material */ \"(app-pages-browser)/./node_modules/@mui/material/Box/Box.js\");\n/* harmony import */ var _barrel_optimize_names_Box_Button_TextField_mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! __barrel_optimize__?names=Box,Button,TextField!=!@mui/material */ \"(app-pages-browser)/./node_modules/@mui/material/TextField/TextField.js\");\n/* harmony import */ var _barrel_optimize_names_Box_Button_TextField_mui_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! __barrel_optimize__?names=Box,Button,TextField!=!@mui/material */ \"(app-pages-browser)/./node_modules/@mui/material/Button/Button.js\");\n/* harmony import */ var _app_page_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../app/page.module.css */ \"(app-pages-browser)/./src/app/page.module.css\");\n/* harmony import */ var _app_page_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_app_page_module_css__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\nconst DynamicTextFieldComponent = (param)=>{\n    let { textFields, setTextFields, handleTextFieldChange, pkFields, setpkFields, handlepkFieldChange } = param;\n    const addTextField = ()=>{\n        setTextFields([\n            ...textFields,\n            {\n                value: \"\"\n            }\n        ]);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_TextField_mui_material__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                mt: 2,\n                children: textFields.map((textField, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_TextField_mui_material__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                        display: \"flex\",\n                        alignItems: \"center\",\n                        mt: 1,\n                        style: {\n                            gap: \"10px\"\n                        },\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_TextField_mui_material__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                                label: \"Public Key \".concat(index + 1),\n                                color: \"secondary\",\n                                value: textField.value,\n                                onChange: (e)=>handleTextFieldChange(index, e.target.value),\n                                fullWidth: true,\n                                InputProps: {\n                                    style: {\n                                        backgroundColor: \"white\"\n                                    }\n                                },\n                                variant: \"outlined\",\n                                margin: \"normal\"\n                            }, void 0, false, {\n                                fileName: \"/Users/antoniofurtado/projects/eth-global-london-2024/blockusign/frontend/src/components/DynamicTextFieldComponent/DynamicTextFieldComponent.tsx\",\n                                lineNumber: 41,\n                                columnNumber: 13\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_TextField_mui_material__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                                label: \"Signature \".concat(index + 1),\n                                // value={textField.value}\n                                onChange: (e)=>handleTextFieldChange(index, e.target.value),\n                                fullWidth: true,\n                                InputProps: {\n                                    style: {\n                                        backgroundColor: \"white\"\n                                    }\n                                },\n                                variant: \"outlined\",\n                                color: \"secondary\",\n                                margin: \"normal\"\n                            }, void 0, false, {\n                                fileName: \"/Users/antoniofurtado/projects/eth-global-london-2024/blockusign/frontend/src/components/DynamicTextFieldComponent/DynamicTextFieldComponent.tsx\",\n                                lineNumber: 51,\n                                columnNumber: 13\n                            }, undefined)\n                        ]\n                    }, index, true, {\n                        fileName: \"/Users/antoniofurtado/projects/eth-global-london-2024/blockusign/frontend/src/components/DynamicTextFieldComponent/DynamicTextFieldComponent.tsx\",\n                        lineNumber: 34,\n                        columnNumber: 11\n                    }, undefined))\n            }, void 0, false, {\n                fileName: \"/Users/antoniofurtado/projects/eth-global-london-2024/blockusign/frontend/src/components/DynamicTextFieldComponent/DynamicTextFieldComponent.tsx\",\n                lineNumber: 32,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_TextField_mui_material__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                variant: \"contained\",\n                onClick: addTextField,\n                className: (_app_page_module_css__WEBPACK_IMPORTED_MODULE_5___default().actionButton),\n                style: {\n                    marginBottom: \"10px\",\n                    marginTop: \"10px\",\n                    textTransform: \"capitalize\"\n                },\n                children: \"Add Signer\"\n            }, void 0, false, {\n                fileName: \"/Users/antoniofurtado/projects/eth-global-london-2024/blockusign/frontend/src/components/DynamicTextFieldComponent/DynamicTextFieldComponent.tsx\",\n                lineNumber: 64,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/antoniofurtado/projects/eth-global-london-2024/blockusign/frontend/src/components/DynamicTextFieldComponent/DynamicTextFieldComponent.tsx\",\n        lineNumber: 31,\n        columnNumber: 5\n    }, undefined);\n};\n_c = DynamicTextFieldComponent;\n/* harmony default export */ __webpack_exports__[\"default\"] = (DynamicTextFieldComponent);\nvar _c;\n$RefreshReg$(_c, \"DynamicTextFieldComponent\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL0R5bmFtaWNUZXh0RmllbGRDb21wb25lbnQvRHluYW1pY1RleHRGaWVsZENvbXBvbmVudC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUF3QztBQUMyQjtBQUNwQjtBQWUvQyxNQUFNSyw0QkFBNkM7UUFBQyxFQUNsREMsVUFBVSxFQUNWQyxhQUFhLEVBQ2JDLHFCQUFxQixFQUNyQkMsUUFBUSxFQUNSQyxXQUFXLEVBQ1hDLG1CQUFtQixFQUNwQjtJQUNDLE1BQU1DLGVBQWU7UUFDbkJMLGNBQWM7ZUFBSUQ7WUFBWTtnQkFBRU8sT0FBTztZQUFHO1NBQUU7SUFDOUM7SUFFQSxxQkFDRSw4REFBQ0M7OzBCQUNDLDhEQUFDWixnR0FBR0E7Z0JBQUNhLElBQUk7MEJBQ05ULFdBQVdVLEdBQUcsQ0FBQyxDQUFDQyxXQUFXQyxzQkFDMUIsOERBQUNoQixnR0FBR0E7d0JBRUZpQixTQUFRO3dCQUNSQyxZQUFXO3dCQUNYTCxJQUFJO3dCQUNKTSxPQUFPOzRCQUFFQyxLQUFLO3dCQUFPOzswQ0FFckIsOERBQUNuQixnR0FBU0E7Z0NBQ1JvQixPQUFPLGNBQXdCLE9BQVZMLFFBQVE7Z0NBQzdCTSxPQUFNO2dDQUNOWCxPQUFPSSxVQUFVSixLQUFLO2dDQUN0QlksVUFBVSxDQUFDQyxJQUFNbEIsc0JBQXNCVSxPQUFPUSxFQUFFQyxNQUFNLENBQUNkLEtBQUs7Z0NBQzVEZSxTQUFTO2dDQUNUQyxZQUFZO29DQUFFUixPQUFPO3dDQUFFUyxpQkFBaUI7b0NBQVE7Z0NBQUU7Z0NBQ2xEQyxTQUFRO2dDQUNSQyxRQUFPOzs7Ozs7MENBRVQsOERBQUM3QixnR0FBU0E7Z0NBQ1JvQixPQUFPLGFBQXVCLE9BQVZMLFFBQVE7Z0NBQzVCLDBCQUEwQjtnQ0FDMUJPLFVBQVUsQ0FBQ0MsSUFBTWxCLHNCQUFzQlUsT0FBT1EsRUFBRUMsTUFBTSxDQUFDZCxLQUFLO2dDQUM1RGUsU0FBUztnQ0FDVEMsWUFBWTtvQ0FBRVIsT0FBTzt3Q0FBRVMsaUJBQWlCO29DQUFRO2dDQUFFO2dDQUNsREMsU0FBUTtnQ0FDUlAsT0FBTTtnQ0FDTlEsUUFBTzs7Ozs7Ozt1QkF4QkpkOzs7Ozs7Ozs7OzBCQTZCWCw4REFBQ2pCLGdHQUFNQTtnQkFDTDhCLFNBQVE7Z0JBQ1JFLFNBQVNyQjtnQkFDVHNCLFdBQVc5QiwwRUFBbUI7Z0JBQzlCaUIsT0FBTztvQkFDTGUsY0FBYztvQkFDZEMsV0FBVztvQkFDWEMsZUFBZTtnQkFDakI7MEJBQ0Q7Ozs7Ozs7Ozs7OztBQUtQO0tBNURNakM7QUE4RE4sK0RBQWVBLHlCQUF5QkEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvY29tcG9uZW50cy9EeW5hbWljVGV4dEZpZWxkQ29tcG9uZW50L0R5bmFtaWNUZXh0RmllbGRDb21wb25lbnQudHN4PzE4YTgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBCdXR0b24sIEJveCwgVGV4dEZpZWxkLCBUeXBvZ3JhcGh5IH0gZnJvbSBcIkBtdWkvbWF0ZXJpYWxcIjtcbmltcG9ydCBzdHlsZXMgZnJvbSBcIi4uLy4uL2FwcC9wYWdlLm1vZHVsZS5jc3NcIjtcblxuaW50ZXJmYWNlIFByb3BzIHtcbiAgdGV4dEZpZWxkczogVGV4dEZpZWxkRGF0YVtdO1xuICBzZXRUZXh0RmllbGRzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxUZXh0RmllbGREYXRhW10+PjtcbiAgaGFuZGxlVGV4dEZpZWxkQ2hhbmdlOiAoaW5kZXg6IG51bWJlciwgdmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgcGtGaWVsZHM6IFRleHRGaWVsZERhdGFbXTtcbiAgc2V0cGtGaWVsZHM6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPFRleHRGaWVsZERhdGFbXT4+O1xuICBoYW5kbGVwa0ZpZWxkQ2hhbmdlOiAoaW5kZXg6IG51bWJlciwgdmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbn1cblxuaW50ZXJmYWNlIFRleHRGaWVsZERhdGEge1xuICB2YWx1ZTogc3RyaW5nO1xufVxuXG5jb25zdCBEeW5hbWljVGV4dEZpZWxkQ29tcG9uZW50OiBSZWFjdC5GQzxQcm9wcz4gPSAoe1xuICB0ZXh0RmllbGRzLFxuICBzZXRUZXh0RmllbGRzLFxuICBoYW5kbGVUZXh0RmllbGRDaGFuZ2UsXG4gIHBrRmllbGRzLFxuICBzZXRwa0ZpZWxkcyxcbiAgaGFuZGxlcGtGaWVsZENoYW5nZSxcbn0pID0+IHtcbiAgY29uc3QgYWRkVGV4dEZpZWxkID0gKCkgPT4ge1xuICAgIHNldFRleHRGaWVsZHMoWy4uLnRleHRGaWVsZHMsIHsgdmFsdWU6IFwiXCIgfV0pO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDxCb3ggbXQ9ezJ9PlxuICAgICAgICB7dGV4dEZpZWxkcy5tYXAoKHRleHRGaWVsZCwgaW5kZXgpID0+IChcbiAgICAgICAgICA8Qm94XG4gICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgZGlzcGxheT1cImZsZXhcIlxuICAgICAgICAgICAgYWxpZ25JdGVtcz1cImNlbnRlclwiXG4gICAgICAgICAgICBtdD17MX1cbiAgICAgICAgICAgIHN0eWxlPXt7IGdhcDogXCIxMHB4XCIgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8VGV4dEZpZWxkXG4gICAgICAgICAgICAgIGxhYmVsPXtgUHVibGljIEtleSAke2luZGV4ICsgMX1gfVxuICAgICAgICAgICAgICBjb2xvcj1cInNlY29uZGFyeVwiXG4gICAgICAgICAgICAgIHZhbHVlPXt0ZXh0RmllbGQudmFsdWV9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gaGFuZGxlVGV4dEZpZWxkQ2hhbmdlKGluZGV4LCBlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgIGZ1bGxXaWR0aFxuICAgICAgICAgICAgICBJbnB1dFByb3BzPXt7IHN0eWxlOiB7IGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiIH0gfX1cbiAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmVkXCJcbiAgICAgICAgICAgICAgbWFyZ2luPVwibm9ybWFsXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8VGV4dEZpZWxkXG4gICAgICAgICAgICAgIGxhYmVsPXtgU2lnbmF0dXJlICR7aW5kZXggKyAxfWB9XG4gICAgICAgICAgICAgIC8vIHZhbHVlPXt0ZXh0RmllbGQudmFsdWV9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gaGFuZGxlVGV4dEZpZWxkQ2hhbmdlKGluZGV4LCBlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgIGZ1bGxXaWR0aFxuICAgICAgICAgICAgICBJbnB1dFByb3BzPXt7IHN0eWxlOiB7IGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiIH0gfX1cbiAgICAgICAgICAgICAgdmFyaWFudD1cIm91dGxpbmVkXCJcbiAgICAgICAgICAgICAgY29sb3I9XCJzZWNvbmRhcnlcIlxuICAgICAgICAgICAgICBtYXJnaW49XCJub3JtYWxcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgKSl9XG4gICAgICA8L0JveD5cbiAgICAgIDxCdXR0b25cbiAgICAgICAgdmFyaWFudD1cImNvbnRhaW5lZFwiXG4gICAgICAgIG9uQ2xpY2s9e2FkZFRleHRGaWVsZH1cbiAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuYWN0aW9uQnV0dG9ufVxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIG1hcmdpbkJvdHRvbTogXCIxMHB4XCIsXG4gICAgICAgICAgbWFyZ2luVG9wOiBcIjEwcHhcIixcbiAgICAgICAgICB0ZXh0VHJhbnNmb3JtOiBcImNhcGl0YWxpemVcIixcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgQWRkIFNpZ25lclxuICAgICAgPC9CdXR0b24+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEeW5hbWljVGV4dEZpZWxkQ29tcG9uZW50O1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwiQnV0dG9uIiwiQm94IiwiVGV4dEZpZWxkIiwic3R5bGVzIiwiRHluYW1pY1RleHRGaWVsZENvbXBvbmVudCIsInRleHRGaWVsZHMiLCJzZXRUZXh0RmllbGRzIiwiaGFuZGxlVGV4dEZpZWxkQ2hhbmdlIiwicGtGaWVsZHMiLCJzZXRwa0ZpZWxkcyIsImhhbmRsZXBrRmllbGRDaGFuZ2UiLCJhZGRUZXh0RmllbGQiLCJ2YWx1ZSIsImRpdiIsIm10IiwibWFwIiwidGV4dEZpZWxkIiwiaW5kZXgiLCJkaXNwbGF5IiwiYWxpZ25JdGVtcyIsInN0eWxlIiwiZ2FwIiwibGFiZWwiLCJjb2xvciIsIm9uQ2hhbmdlIiwiZSIsInRhcmdldCIsImZ1bGxXaWR0aCIsIklucHV0UHJvcHMiLCJiYWNrZ3JvdW5kQ29sb3IiLCJ2YXJpYW50IiwibWFyZ2luIiwib25DbGljayIsImNsYXNzTmFtZSIsImFjdGlvbkJ1dHRvbiIsIm1hcmdpbkJvdHRvbSIsIm1hcmdpblRvcCIsInRleHRUcmFuc2Zvcm0iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/DynamicTextFieldComponent/DynamicTextFieldComponent.tsx\n"));

/***/ })

});