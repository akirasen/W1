webpackJsonp([52],{

/***/ 1954:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_alt_react__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_alt_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_alt_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_stores_BlockchainStore__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_stores_SettingsStore__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_translate_component__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_translate_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_translate_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Settings_WebsocketAddModal__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_actions_SettingsActions__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_seerjs_ws__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_seerjs_ws___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_seerjs_ws__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_counterpart__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_counterpart___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_counterpart__);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }











var InitError = function (_React$Component) {
    _inherits(InitError, _React$Component);

    function InitError() {
        _classCallCheck(this, InitError);

        return _possibleConstructorReturn(this, (InitError.__proto__ || Object.getPrototypeOf(InitError)).apply(this, arguments));
    }

    _createClass(InitError, [{
        key: "triggerModal",
        value: function triggerModal(e) {
            this.refs.ws_modal.show(e);
        }
    }, {
        key: "onChangeWS",
        value: function onChangeWS(e) {
            __WEBPACK_IMPORTED_MODULE_6_actions_SettingsActions__["a" /* default */].changeSetting({ setting: "apiServer", value: e.target.value });
            __WEBPACK_IMPORTED_MODULE_7_seerjs_ws__["Apis"].reset(e.target.value, true);
        }
    }, {
        key: "onReloadClick",
        value: function onReloadClick(e) {
            if (e) {
                e.preventDefault();
            }
            if (window.electron) {
                window.location.hash = "";
                window.remote.getCurrentWindow().reload();
            } else window.location.href = "/";
        }
    }, {
        key: "onReset",
        value: function onReset() {
            __WEBPACK_IMPORTED_MODULE_6_actions_SettingsActions__["a" /* default */].changeSetting({ setting: "apiServer", value: this.props.defaultConnection });
            __WEBPACK_IMPORTED_MODULE_6_actions_SettingsActions__["a" /* default */].clearSettings();
        }
    }, {
        key: "render",
        value: function render() {
            var options = this.props.apis.map(function (entry) {
                var onlyDescription = entry.url.indexOf("fake.automatic-selection") !== -1;
                var location = entry.location;

                if (location && (typeof location === "undefined" ? "undefined" : _typeof(location)) === "object" && "translate" in location) location = __WEBPACK_IMPORTED_MODULE_8_counterpart___default.a.translate(location.translate);

                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "option",
                    { key: entry.url, value: entry.url },
                    location || entry.url,
                    " ",
                    !onlyDescription && location ? "(" + entry.url + ")" : null
                );
            });

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "grid-block page-layout" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "grid-container" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "grid-content no-overflow" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_translate_component___default.a, { component: "h3", content: "init_error.title" }),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "section",
                            { className: "block-list" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "header",
                                null,
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_translate_component___default.a, { component: "span", content: "settings.apiServer" })
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "ul",
                                null,
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "li",
                                    { className: "with-dropdown" },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "select",
                                        { onChange: this.onChangeWS.bind(this), value: this.props.apiServer },
                                        options
                                    ),
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "div",
                                        { style: { paddingTop: 10 }, className: "button-group" },
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            "div",
                                            {
                                                onClick: this.triggerModal.bind(this),
                                                className: "button outline",
                                                id: "add"
                                            },
                                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_translate_component___default.a, { id: "add_text", content: "settings.add_api" })
                                        )
                                    )
                                ),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "li",
                                    { className: "key-value clearfix" },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "div",
                                        { className: "float-left" },
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_translate_component___default.a, { content: "init_error.ws_status" })
                                    ),
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "div",
                                        { className: "float-right" },
                                        this.props.rpc_connection_status === "open" ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            "span",
                                            { className: "txtlabel success" },
                                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_translate_component___default.a, { content: "init_error.connected" })
                                        ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            "span",
                                            { className: "txtlabel warning" },
                                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_translate_component___default.a, { content: "init_error.not_connected" })
                                        )
                                    )
                                )
                            )
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "button-group" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { className: "button outline", href: true, onClick: this.onReloadClick },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_translate_component___default.a, { content: "init_error.retry" })
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { onClick: this.onReset.bind(this), className: "button outline" },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_translate_component___default.a, { content: "settings.reset" })
                            )
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__Settings_WebsocketAddModal__["a" /* default */], { ref: "ws_modal", apis: this.props.apis })
                    )
                )
            );
        }
    }]);

    return InitError;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_1_alt_react__["connect"])(InitError, {
    listenTo: function listenTo() {
        return [__WEBPACK_IMPORTED_MODULE_2_stores_BlockchainStore__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3_stores_SettingsStore__["a" /* default */]];
    },
    getProps: function getProps() {
        return {
            rpc_connection_status: __WEBPACK_IMPORTED_MODULE_2_stores_BlockchainStore__["a" /* default */].getState().rpc_connection_status,
            apis: __WEBPACK_IMPORTED_MODULE_3_stores_SettingsStore__["a" /* default */].getState().defaults.apiServer,
            apiServer: __WEBPACK_IMPORTED_MODULE_3_stores_SettingsStore__["a" /* default */].getState().settings.get("apiServer"),
            defaultConnection: __WEBPACK_IMPORTED_MODULE_3_stores_SettingsStore__["a" /* default */].getState().defaultSettings.get("apiServer")
        };
    }
}));

/***/ })

});
//# sourceMappingURL=52.js.map