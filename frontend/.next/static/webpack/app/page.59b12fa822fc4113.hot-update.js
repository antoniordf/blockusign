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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _barrel_optimize_names_Box_Button_TextField_mui_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! __barrel_optimize__?names=Box,Button,TextField!=!@mui/material */ \"(app-pages-browser)/./node_modules/@mui/material/Box/Box.js\");\n/* harmony import */ var _barrel_optimize_names_Box_Button_TextField_mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! __barrel_optimize__?names=Box,Button,TextField!=!@mui/material */ \"(app-pages-browser)/./node_modules/@mui/material/TextField/TextField.js\");\n/* harmony import */ var _barrel_optimize_names_Box_Button_TextField_mui_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! __barrel_optimize__?names=Box,Button,TextField!=!@mui/material */ \"(app-pages-browser)/./node_modules/@mui/material/Button/Button.js\");\n/* harmony import */ var _app_page_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../app/page.module.css */ \"(app-pages-browser)/./src/app/page.module.css\");\n/* harmony import */ var _app_page_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_app_page_module_css__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\nconst DynamicTextFieldComponent = (param)=>{\n    let { textFields, setTextFields, handleTextFieldChange, pkFields, setpkFields, handlepkFieldChange } = param;\n    const addTextField = ()=>{\n        setTextFields([\n            ...textFields,\n            {\n                value: \"\"\n            }\n        ]);\n        setpkFields([\n            ...pkFields,\n            {\n                value: \"\"\n            }\n        ]);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_TextField_mui_material__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                mt: 2,\n                children: textFields.map((textField, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_TextField_mui_material__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                        display: \"flex\",\n                        alignItems: \"center\",\n                        mt: 1,\n                        style: {\n                            gap: \"10px\"\n                        },\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_TextField_mui_material__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                                label: \"Public Key \".concat(index + 1),\n                                color: \"secondary\",\n                                value: textField.value,\n                                onChange: (e)=>handleTextFieldChange(index, e.target.value),\n                                fullWidth: true,\n                                InputProps: {\n                                    style: {\n                                        backgroundColor: \"white\"\n                                    }\n                                },\n                                variant: \"outlined\",\n                                margin: \"normal\"\n                            }, void 0, false, {\n                                fileName: \"/Users/antoniofurtado/projects/eth-global-london-2024/blockusign/frontend/src/components/DynamicTextFieldComponent/DynamicTextFieldComponent.tsx\",\n                                lineNumber: 42,\n                                columnNumber: 13\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_TextField_mui_material__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                                label: \"Signature \".concat(index + 1),\n                                value: pkFields[index].value,\n                                onChange: (e)=>handlepkFieldChange(index, e.target.value),\n                                fullWidth: true,\n                                InputProps: {\n                                    style: {\n                                        backgroundColor: \"white\"\n                                    }\n                                },\n                                variant: \"outlined\",\n                                color: \"secondary\",\n                                margin: \"normal\"\n                            }, void 0, false, {\n                                fileName: \"/Users/antoniofurtado/projects/eth-global-london-2024/blockusign/frontend/src/components/DynamicTextFieldComponent/DynamicTextFieldComponent.tsx\",\n                                lineNumber: 52,\n                                columnNumber: 13\n                            }, undefined)\n                        ]\n                    }, index, true, {\n                        fileName: \"/Users/antoniofurtado/projects/eth-global-london-2024/blockusign/frontend/src/components/DynamicTextFieldComponent/DynamicTextFieldComponent.tsx\",\n                        lineNumber: 35,\n                        columnNumber: 11\n                    }, undefined))\n            }, void 0, false, {\n                fileName: \"/Users/antoniofurtado/projects/eth-global-london-2024/blockusign/frontend/src/components/DynamicTextFieldComponent/DynamicTextFieldComponent.tsx\",\n                lineNumber: 33,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_TextField_mui_material__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                variant: \"contained\",\n                onClick: addTextField,\n                className: (_app_page_module_css__WEBPACK_IMPORTED_MODULE_5___default().actionButton),\n                style: {\n                    marginBottom: \"10px\",\n                    marginTop: \"10px\",\n                    textTransform: \"capitalize\"\n                },\n                children: \"Add Signer\"\n            }, void 0, false, {\n                fileName: \"/Users/antoniofurtado/projects/eth-global-london-2024/blockusign/frontend/src/components/DynamicTextFieldComponent/DynamicTextFieldComponent.tsx\",\n                lineNumber: 65,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/antoniofurtado/projects/eth-global-london-2024/blockusign/frontend/src/components/DynamicTextFieldComponent/DynamicTextFieldComponent.tsx\",\n        lineNumber: 32,\n        columnNumber: 5\n    }, undefined);\n};\n_c = DynamicTextFieldComponent;\n/* harmony default export */ __webpack_exports__[\"default\"] = (DynamicTextFieldComponent);\nvar _c;\n$RefreshReg$(_c, \"DynamicTextFieldComponent\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL0R5bmFtaWNUZXh0RmllbGRDb21wb25lbnQvRHluYW1pY1RleHRGaWVsZENvbXBvbmVudC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUF3QztBQUMyQjtBQUNwQjtBQWUvQyxNQUFNSyw0QkFBNkM7UUFBQyxFQUNsREMsVUFBVSxFQUNWQyxhQUFhLEVBQ2JDLHFCQUFxQixFQUNyQkMsUUFBUSxFQUNSQyxXQUFXLEVBQ1hDLG1CQUFtQixFQUNwQjtJQUNDLE1BQU1DLGVBQWU7UUFDbkJMLGNBQWM7ZUFBSUQ7WUFBWTtnQkFBRU8sT0FBTztZQUFHO1NBQUU7UUFDNUNILFlBQVk7ZUFBSUQ7WUFBVTtnQkFBRUksT0FBTztZQUFHO1NBQUU7SUFDMUM7SUFFQSxxQkFDRSw4REFBQ0M7OzBCQUNDLDhEQUFDWixnR0FBR0E7Z0JBQUNhLElBQUk7MEJBQ05ULFdBQVdVLEdBQUcsQ0FBQyxDQUFDQyxXQUFXQyxzQkFDMUIsOERBQUNoQixnR0FBR0E7d0JBRUZpQixTQUFRO3dCQUNSQyxZQUFXO3dCQUNYTCxJQUFJO3dCQUNKTSxPQUFPOzRCQUFFQyxLQUFLO3dCQUFPOzswQ0FFckIsOERBQUNuQixnR0FBU0E7Z0NBQ1JvQixPQUFPLGNBQXdCLE9BQVZMLFFBQVE7Z0NBQzdCTSxPQUFNO2dDQUNOWCxPQUFPSSxVQUFVSixLQUFLO2dDQUN0QlksVUFBVSxDQUFDQyxJQUFNbEIsc0JBQXNCVSxPQUFPUSxFQUFFQyxNQUFNLENBQUNkLEtBQUs7Z0NBQzVEZSxTQUFTO2dDQUNUQyxZQUFZO29DQUFFUixPQUFPO3dDQUFFUyxpQkFBaUI7b0NBQVE7Z0NBQUU7Z0NBQ2xEQyxTQUFRO2dDQUNSQyxRQUFPOzs7Ozs7MENBRVQsOERBQUM3QixnR0FBU0E7Z0NBQ1JvQixPQUFPLGFBQXVCLE9BQVZMLFFBQVE7Z0NBQzVCTCxPQUFPSixRQUFRLENBQUNTLE1BQU0sQ0FBQ0wsS0FBSztnQ0FDNUJZLFVBQVUsQ0FBQ0MsSUFBTWYsb0JBQW9CTyxPQUFPUSxFQUFFQyxNQUFNLENBQUNkLEtBQUs7Z0NBQzFEZSxTQUFTO2dDQUNUQyxZQUFZO29DQUFFUixPQUFPO3dDQUFFUyxpQkFBaUI7b0NBQVE7Z0NBQUU7Z0NBQ2xEQyxTQUFRO2dDQUNSUCxPQUFNO2dDQUNOUSxRQUFPOzs7Ozs7O3VCQXhCSmQ7Ozs7Ozs7Ozs7MEJBNkJYLDhEQUFDakIsZ0dBQU1BO2dCQUNMOEIsU0FBUTtnQkFDUkUsU0FBU3JCO2dCQUNUc0IsV0FBVzlCLDBFQUFtQjtnQkFDOUJpQixPQUFPO29CQUNMZSxjQUFjO29CQUNkQyxXQUFXO29CQUNYQyxlQUFlO2dCQUNqQjswQkFDRDs7Ozs7Ozs7Ozs7O0FBS1A7S0E3RE1qQztBQStETiwrREFBZUEseUJBQXlCQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL0R5bmFtaWNUZXh0RmllbGRDb21wb25lbnQvRHluYW1pY1RleHRGaWVsZENvbXBvbmVudC50c3g/MThhOCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEJ1dHRvbiwgQm94LCBUZXh0RmllbGQsIFR5cG9ncmFwaHkgfSBmcm9tIFwiQG11aS9tYXRlcmlhbFwiO1xuaW1wb3J0IHN0eWxlcyBmcm9tIFwiLi4vLi4vYXBwL3BhZ2UubW9kdWxlLmNzc1wiO1xuXG5pbnRlcmZhY2UgUHJvcHMge1xuICB0ZXh0RmllbGRzOiBUZXh0RmllbGREYXRhW107XG4gIHNldFRleHRGaWVsZHM6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPFRleHRGaWVsZERhdGFbXT4+O1xuICBoYW5kbGVUZXh0RmllbGRDaGFuZ2U6IChpbmRleDogbnVtYmVyLCB2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBwa0ZpZWxkczogVGV4dEZpZWxkRGF0YVtdO1xuICBzZXRwa0ZpZWxkczogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248VGV4dEZpZWxkRGF0YVtdPj47XG4gIGhhbmRsZXBrRmllbGRDaGFuZ2U6IChpbmRleDogbnVtYmVyLCB2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xufVxuXG5pbnRlcmZhY2UgVGV4dEZpZWxkRGF0YSB7XG4gIHZhbHVlOiBzdHJpbmc7XG59XG5cbmNvbnN0IER5bmFtaWNUZXh0RmllbGRDb21wb25lbnQ6IFJlYWN0LkZDPFByb3BzPiA9ICh7XG4gIHRleHRGaWVsZHMsXG4gIHNldFRleHRGaWVsZHMsXG4gIGhhbmRsZVRleHRGaWVsZENoYW5nZSxcbiAgcGtGaWVsZHMsXG4gIHNldHBrRmllbGRzLFxuICBoYW5kbGVwa0ZpZWxkQ2hhbmdlLFxufSkgPT4ge1xuICBjb25zdCBhZGRUZXh0RmllbGQgPSAoKSA9PiB7XG4gICAgc2V0VGV4dEZpZWxkcyhbLi4udGV4dEZpZWxkcywgeyB2YWx1ZTogXCJcIiB9XSk7XG4gICAgc2V0cGtGaWVsZHMoWy4uLnBrRmllbGRzLCB7IHZhbHVlOiBcIlwiIH1dKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8Qm94IG10PXsyfT5cbiAgICAgICAge3RleHRGaWVsZHMubWFwKCh0ZXh0RmllbGQsIGluZGV4KSA9PiAoXG4gICAgICAgICAgPEJveFxuICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgIGRpc3BsYXk9XCJmbGV4XCJcbiAgICAgICAgICAgIGFsaWduSXRlbXM9XCJjZW50ZXJcIlxuICAgICAgICAgICAgbXQ9ezF9XG4gICAgICAgICAgICBzdHlsZT17eyBnYXA6IFwiMTBweFwiIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFRleHRGaWVsZFxuICAgICAgICAgICAgICBsYWJlbD17YFB1YmxpYyBLZXkgJHtpbmRleCArIDF9YH1cbiAgICAgICAgICAgICAgY29sb3I9XCJzZWNvbmRhcnlcIlxuICAgICAgICAgICAgICB2YWx1ZT17dGV4dEZpZWxkLnZhbHVlfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IGhhbmRsZVRleHRGaWVsZENoYW5nZShpbmRleCwgZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICBmdWxsV2lkdGhcbiAgICAgICAgICAgICAgSW5wdXRQcm9wcz17eyBzdHlsZTogeyBiYWNrZ3JvdW5kQ29sb3I6IFwid2hpdGVcIiB9IH19XG4gICAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lZFwiXG4gICAgICAgICAgICAgIG1hcmdpbj1cIm5vcm1hbFwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPFRleHRGaWVsZFxuICAgICAgICAgICAgICBsYWJlbD17YFNpZ25hdHVyZSAke2luZGV4ICsgMX1gfVxuICAgICAgICAgICAgICB2YWx1ZT17cGtGaWVsZHNbaW5kZXhdLnZhbHVlfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IGhhbmRsZXBrRmllbGRDaGFuZ2UoaW5kZXgsIGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgZnVsbFdpZHRoXG4gICAgICAgICAgICAgIElucHV0UHJvcHM9e3sgc3R5bGU6IHsgYmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCIgfSB9fVxuICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZWRcIlxuICAgICAgICAgICAgICBjb2xvcj1cInNlY29uZGFyeVwiXG4gICAgICAgICAgICAgIG1hcmdpbj1cIm5vcm1hbFwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICApKX1cbiAgICAgIDwvQm94PlxuICAgICAgPEJ1dHRvblxuICAgICAgICB2YXJpYW50PVwiY29udGFpbmVkXCJcbiAgICAgICAgb25DbGljaz17YWRkVGV4dEZpZWxkfVxuICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5hY3Rpb25CdXR0b259XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgbWFyZ2luQm90dG9tOiBcIjEwcHhcIixcbiAgICAgICAgICBtYXJnaW5Ub3A6IFwiMTBweFwiLFxuICAgICAgICAgIHRleHRUcmFuc2Zvcm06IFwiY2FwaXRhbGl6ZVwiLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICBBZGQgU2lnbmVyXG4gICAgICA8L0J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IER5bmFtaWNUZXh0RmllbGRDb21wb25lbnQ7XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJCdXR0b24iLCJCb3giLCJUZXh0RmllbGQiLCJzdHlsZXMiLCJEeW5hbWljVGV4dEZpZWxkQ29tcG9uZW50IiwidGV4dEZpZWxkcyIsInNldFRleHRGaWVsZHMiLCJoYW5kbGVUZXh0RmllbGRDaGFuZ2UiLCJwa0ZpZWxkcyIsInNldHBrRmllbGRzIiwiaGFuZGxlcGtGaWVsZENoYW5nZSIsImFkZFRleHRGaWVsZCIsInZhbHVlIiwiZGl2IiwibXQiLCJtYXAiLCJ0ZXh0RmllbGQiLCJpbmRleCIsImRpc3BsYXkiLCJhbGlnbkl0ZW1zIiwic3R5bGUiLCJnYXAiLCJsYWJlbCIsImNvbG9yIiwib25DaGFuZ2UiLCJlIiwidGFyZ2V0IiwiZnVsbFdpZHRoIiwiSW5wdXRQcm9wcyIsImJhY2tncm91bmRDb2xvciIsInZhcmlhbnQiLCJtYXJnaW4iLCJvbkNsaWNrIiwiY2xhc3NOYW1lIiwiYWN0aW9uQnV0dG9uIiwibWFyZ2luQm90dG9tIiwibWFyZ2luVG9wIiwidGV4dFRyYW5zZm9ybSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/DynamicTextFieldComponent/DynamicTextFieldComponent.tsx\n"));

/***/ })

});