webpackJsonp([5],{

/***/ 1932:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExistingAccount", function() { return ExistingAccount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExistingAccountOptions", function() { return ExistingAccountOptions; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_es__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_alt_react__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_alt_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_alt_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_stores_WalletManagerStore__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_components_Wallet_BalanceClaimActive__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_translate_component__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_translate_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_translate_component__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var connectObject = {
    listenTo: function listenTo() {
        return [__WEBPACK_IMPORTED_MODULE_3_stores_WalletManagerStore__["a" /* default */]];
    },
    getProps: function getProps() {
        var wallet = __WEBPACK_IMPORTED_MODULE_3_stores_WalletManagerStore__["a" /* default */].getState();
        return { wallet: wallet };
    }
};

var ExistingAccount = function (_Component) {
    _inherits(ExistingAccount, _Component);

    function ExistingAccount() {
        _classCallCheck(this, ExistingAccount);

        return _possibleConstructorReturn(this, (ExistingAccount.__proto__ || Object.getPrototypeOf(ExistingAccount)).apply(this, arguments));
    }

    _createClass(ExistingAccount, [{
        key: "render",
        value: function render() {
            var has_wallet = this.props.wallet.wallet_names.count() != 0;
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "grid-container" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "grid-content" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "content-block center-content" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "page-header" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "h1",
                                null,
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_translate_component___default.a, { content: "account.welcome" })
                            ),
                            !has_wallet ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "h3",
                                null,
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_translate_component___default.a, { content: "wallet.create_wallet_backup" })
                            ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "h3",
                                null,
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_translate_component___default.a, { content: "wallet.setup_wallet" })
                            )
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "content-block" },
                            this.props.children
                        )
                    )
                )
            );
        }
    }]);

    return ExistingAccount;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

ExistingAccount = Object(__WEBPACK_IMPORTED_MODULE_2_alt_react__["connect"])(ExistingAccount, connectObject);

var ExistingAccountOptions = function (_Component2) {
    _inherits(ExistingAccountOptions, _Component2);

    function ExistingAccountOptions() {
        _classCallCheck(this, ExistingAccountOptions);

        return _possibleConstructorReturn(this, (ExistingAccountOptions.__proto__ || Object.getPrototypeOf(ExistingAccountOptions)).apply(this, arguments));
    }

    _createClass(ExistingAccountOptions, [{
        key: "render",
        value: function render() {
            var has_wallet = this.props.wallet.wallet_names.count() != 0;
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "span",
                null,
                !has_wallet ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_1_react_router_es__["b" /* Link */],
                        { to: "existing-account/import-backup" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_translate_component___default.a, { content: "wallet.import_backup" })
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_1_react_router_es__["b" /* Link */],
                        { to: "existing-account/import-keys" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_translate_component___default.a, { content: "wallet.import_bts1" })
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_1_react_router_es__["b" /* Link */],
                        { to: "existing-account/import-keys" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_translate_component___default.a, { content: "wallet.create_wallet" })
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("hr", null)
                ) : null,
                !has_wallet ? null : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_components_Wallet_BalanceClaimActive__["default"], null),
                has_wallet ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "span",
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_1_react_router_es__["b" /* Link */],
                        { to: "dashboard" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "button outline" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_translate_component___default.a, { component: "span", content: "header.dashboard" })
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_1_react_router_es__["b" /* Link */],
                        { to: "wallet" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "button outline" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_translate_component___default.a, { content: "settings.wallets" })
                        )
                    )
                ) : null
            );
        }
    }]);

    return ExistingAccountOptions;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

ExistingAccountOptions = Object(__WEBPACK_IMPORTED_MODULE_2_alt_react__["connect"])(ExistingAccountOptions, connectObject);



/***/ })

});
//# sourceMappingURL=5.js.map