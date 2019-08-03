webpackJsonp([53],{

/***/ 1953:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_alt_react__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_alt_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_alt_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_api_ApplicationApi__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_stores_AccountStore__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_common_utils__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_actions_NotificationActions__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_translate_component__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_translate_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_translate_component__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var CreateWorker = function (_React$Component) {
    _inherits(CreateWorker, _React$Component);

    function CreateWorker() {
        _classCallCheck(this, CreateWorker);

        var _this = _possibleConstructorReturn(this, (CreateWorker.__proto__ || Object.getPrototypeOf(CreateWorker)).call(this));

        _this.state = {
            title: null,
            start: new Date(),
            end: null,
            pay: null,
            url: "http://",
            vesting: 7
        };
        return _this;
    }

    _createClass(CreateWorker, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(np, ns) {
            return np.currentAccount !== this.props.currentAccount, !__WEBPACK_IMPORTED_MODULE_4_common_utils__["a" /* default */].are_equal_shallow(ns, this.state);
        }
    }, {
        key: "onSubmit",
        value: function onSubmit() {
            __WEBPACK_IMPORTED_MODULE_2_api_ApplicationApi__["a" /* default */].createWorker(this.state, this.props.currentAccount).catch(function (error) {
                console.log("error", error);
                var error_msg = error.message && error.message.length && error.message.length > 0 ? error.message.split("stack")[0] : "unknown error";

                __WEBPACK_IMPORTED_MODULE_5_actions_NotificationActions__["a" /* default */].addNotification({
                    message: "Failed to create worker: " + error_msg,
                    level: "error",
                    autoDismiss: 10
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            console.log("state:", this.state);
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "grid-block", style: { paddingTop: 20 } },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "grid-content large-9 large-offset-3 small-12" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_react_translate_component___default.a, { content: "explorer.workers.create", component: "h3" }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "form",
                        { style: { maxWidth: 800 } },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_react_translate_component___default.a, { content: "explorer.workers.create_text_1", component: "p" }),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_react_translate_component___default.a, { content: "explorer.workers.create_text_2", component: "p" }),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "label",
                            null,
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_react_translate_component___default.a, { content: "explorer.workers.title" }),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { onChange: function onChange(e) {
                                    _this2.setState({ title: e.target.value });
                                }, type: "text" })
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_react_translate_component___default.a, { content: "explorer.workers.name_text", component: "p" }),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { style: { width: "50%", paddingRight: "2.5%", display: "inline-block" } },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "label",
                                null,
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_react_translate_component___default.a, { content: "account.votes.start" }),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { onChange: function onChange(e) {
                                        _this2.setState({ start: new Date(e.target.value) });
                                    }, type: "date" })
                            )
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { style: { width: "50%", paddingLeft: "2.5%", display: "inline-block" } },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "label",
                                null,
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_react_translate_component___default.a, { content: "account.votes.end" }),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { onChange: function onChange(e) {
                                        _this2.setState({ end: new Date(e.target.value) });
                                    }, type: "date" })
                            )
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_react_translate_component___default.a, { content: "explorer.workers.date_text", component: "p" }),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "label",
                            null,
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_react_translate_component___default.a, { content: "explorer.workers.daily_pay" }),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { onChange: function onChange(e) {
                                    _this2.setState({ pay: e.target.value });
                                }, type: "number" })
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_react_translate_component___default.a, { content: "explorer.workers.pay_text", component: "p" }),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "label",
                            null,
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_react_translate_component___default.a, { content: "explorer.workers.website" }),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { onChange: function onChange(e) {
                                    _this2.setState({ url: e.target.value });
                                }, type: "text" })
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_react_translate_component___default.a, { content: "explorer.workers.url_text", component: "p" }),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "label",
                            null,
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_react_translate_component___default.a, { content: "explorer.workers.vesting_pay" }),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { defaultValue: this.state.vesting, onChange: function onChange(e) {
                                    _this2.setState({ vesting: parseInt(e.target.value) });
                                }, type: "number" })
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_react_translate_component___default.a, { content: "explorer.workers.vesting_text", component: "p" }),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "button-group", onClick: this.onSubmit.bind(this) },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { className: "button", type: "submit" },
                                "Publish"
                            )
                        )
                    )
                )
            );
        }
    }]);

    return CreateWorker;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (CreateWorker = Object(__WEBPACK_IMPORTED_MODULE_1_alt_react__["connect"])(CreateWorker, {
    listenTo: function listenTo() {
        return [__WEBPACK_IMPORTED_MODULE_3_stores_AccountStore__["a" /* default */]];
    },
    getProps: function getProps() {
        return {
            currentAccount: __WEBPACK_IMPORTED_MODULE_3_stores_AccountStore__["a" /* default */].getState().currentAccount
        };
    }
}));

/***/ })

});
//# sourceMappingURL=53.js.map