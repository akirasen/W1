webpackJsonp([39],{

/***/ 1661:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AccountImage__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Utility_ChainTypes__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Utility_BindToChainState__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_translate_component__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_translate_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_translate_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_qrcode_react__ = __webpack_require__(692);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_qrcode_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_qrcode_react__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var AccountInfo = function (_React$Component) {
    _inherits(AccountInfo, _React$Component);

    function AccountInfo() {
        _classCallCheck(this, AccountInfo);

        var _this = _possibleConstructorReturn(this, (AccountInfo.__proto__ || Object.getPrototypeOf(AccountInfo)).call(this));

        _this.state = {
            hover: false
        };
        return _this;
    }

    _createClass(AccountInfo, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                account = _props.account,
                image_size = _props.image_size;


            var isLTM = account.get("lifetime_referrer_name") === account.get("name");

            var QR = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "account-image" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_qrcode_react___default.a, { size: image_size.width, value: account.get("name") })
            );

            var qrState = !this.state.hover ? this.props.showQR : !this.props.showQR;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { style: { maxWidth: image_size.width }, className: "account-info" + (this.props.my_account ? " my-account" : "") },
                this.props.title ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "h4",
                    null,
                    this.props.title
                ) : null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    {
                        onMouseEnter: function onMouseEnter() {
                            _this2.setState({ hover: true });
                        },
                        onMouseLeave: function onMouseLeave() {
                            _this2.setState({ hover: false });
                        },
                        className: "clickable",
                        onClick: function onClick() {
                            _this2.setState({ hover: false });
                            _this2.props.toggleQR(!_this2.props.showQR);
                        }
                    },
                    qrState ? QR : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__AccountImage__["a" /* default */], { size: image_size, account: account.get("name"), custom_image: null })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "p",
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_translate_component___default.a, { content: "account.deposit_address" }),
                    "!"
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "p",
                    { className: this.props.titleClass },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "span",
                        { className: isLTM ? "lifetime" : "" },
                        account.get("name")
                    )
                )
            );
        }
    }]);

    return AccountInfo;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

AccountInfo.propTypes = {
    account: __WEBPACK_IMPORTED_MODULE_2__Utility_ChainTypes__["a" /* default */].ChainAccount.isRequired,
    title: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.string,
    image_size: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.object.isRequired,
    my_account: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.bool
};
AccountInfo.defaultProps = {
    title: null,
    image_size: { height: 120, width: 120 },
    showQR: false,
    titleClass: "account-title"
};


/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_3__Utility_BindToChainState__["a" /* default */])(AccountInfo));

/***/ }),

/***/ 1779:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(109);


/***/ }),

/***/ 1925:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Utility_FormattedAsset__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_actions_AccountActions__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Account_AccountSelector__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Account_AccountInfo__ = __webpack_require__(1661);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Utility_BalanceComponent__ = __webpack_require__(690);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_seerjs_es__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_actions_NotificationActions__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_stores_TransactionConfirmStore__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_lzma__ = __webpack_require__(713);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_lzma___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_lzma__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_common_base58__ = __webpack_require__(1779);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_common_base58___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_common_base58__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_common_utils__ = __webpack_require__(15);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }















// invoice example:
//{
//    "to" : "merchant_account_name",
//    "to_label" : "Merchant Name",
//    "currency": "TEST",
//    "memo" : "Invoice #1234",
//    "line_items" : [
//        { "label" : "Something to Buy", "quantity": 1, "price" : "1000.00" },
//        { "label" : "10 things to Buy", "quantity": 10, "price" : "1000.00" }
//    ],
//    "note" : "Something the merchant wants to say to the user",
//    "callback" : "https://merchant.org/complete"
//}
// http://localhost:8080/#/invoice/8Cv8ZjMa8XCazX37XgNhj4jNc4Z5WgZFM5jueMEs2eEvL3pEmELjAVCWZEJhj9tEG5RuinPCjY1Fi34ozb8Cg3H5YBemy9JoTRt89X1QaE76xnxWPZzLcUjvUd4QZPjCyqZNxvrpCN2mm1xVRY8FNSVsoxsrZwREMyygahYz8S23ErWPRVsfZXTwJNCCbqjWDTReL5yytTKzxyKhg4YrnntYG3jdyrBimDGBRLU7yRS9pQQLcAH4T7j8LXkTocS7w1Zj4amckBmpg5EJCMATTRhtH8RSycfiXWZConzqqzxitWCxZK846YHNh

var Invoice = function (_React$Component) {
    _inherits(Invoice, _React$Component);

    function Invoice(props) {
        _classCallCheck(this, Invoice);

        var _this = _possibleConstructorReturn(this, (Invoice.__proto__ || Object.getPrototypeOf(Invoice)).call(this, props));

        _this.state = {
            invoice: null,
            pay_from_name: null,
            pay_from_account: null,
            error: null
        };
        _this.onBroadcastAndConfirm = _this.onBroadcastAndConfirm.bind(_this);
        return _this;
    }

    _createClass(Invoice, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            var compressed_data = __WEBPACK_IMPORTED_MODULE_11_common_base58___default.a.decode(this.props.params.data);
            try {
                Object(__WEBPACK_IMPORTED_MODULE_10_lzma__["decompress"])(compressed_data, function (result) {
                    var invoice = JSON.parse(result);
                    Object(__WEBPACK_IMPORTED_MODULE_7_seerjs_es__["g" /* FetchChainObjects */])(__WEBPACK_IMPORTED_MODULE_7_seerjs_es__["b" /* ChainStore */].getAsset, [invoice.currency]).then(function (assets_array) {
                        _this2.setState({ invoice: invoice, asset: assets_array[0] });
                    });
                });
            } catch (error) {
                console.dir(error);
                this.setState({ error: error.message });
            }
        }
    }, {
        key: "parsePrice",
        value: function parsePrice(price) {
            var m = price.match(/([\d\,\.\s]+)/);
            if (!m || m.length < 2) 0.0;
            return parseFloat(m[1].replace(/[\,\s]/g, ""));
        }
    }, {
        key: "getTotal",
        value: function getTotal(items) {
            var _this3 = this;

            if (!items || items.length === 0) return 0.0;
            var total_amount = items.reduce(function (total, item) {
                var price = _this3.parsePrice(item.price);
                if (!price) return total;
                return total + item.quantity * price;
            }, 0.0);
            return total_amount;
        }
    }, {
        key: "onBroadcastAndConfirm",
        value: function onBroadcastAndConfirm(confirm_store_state) {
            if (confirm_store_state.included && confirm_store_state.broadcasted_transaction) {
                __WEBPACK_IMPORTED_MODULE_9_stores_TransactionConfirmStore__["a" /* default */].unlisten(this.onBroadcastAndConfirm);
                __WEBPACK_IMPORTED_MODULE_9_stores_TransactionConfirmStore__["a" /* default */].reset();
                if (this.state.invoice.callback) {
                    var trx = confirm_store_state.broadcasted_transaction;
                    var url = this.state.invoice.callback + "?block=" + trx.ref_block_num + "&trx=" + trx.id();
                    window.location.href = url;
                }
            }
        }
    }, {
        key: "onPayClick",
        value: function onPayClick(e) {
            var _this4 = this;

            e.preventDefault();
            var asset = this.state.asset;
            var precision = __WEBPACK_IMPORTED_MODULE_12_common_utils__["a" /* default */].get_asset_precision(asset.get("precision"));
            var amount = this.getTotal(this.state.invoice.line_items);
            var to_account = __WEBPACK_IMPORTED_MODULE_7_seerjs_es__["b" /* ChainStore */].getAccount(this.state.invoice.to);
            if (!to_account) {
                __WEBPACK_IMPORTED_MODULE_8_actions_NotificationActions__["a" /* default */].error("Account " + this.state.invoice.to + " not found");
                return;
            }
            __WEBPACK_IMPORTED_MODULE_3_actions_AccountActions__["a" /* default */].transfer(this.state.pay_from_account.get("id"), to_account.get("id"), parseInt(amount * precision, 10), asset.get("id"), this.state.invoice.memo).then(function () {
                __WEBPACK_IMPORTED_MODULE_9_stores_TransactionConfirmStore__["a" /* default */].listen(_this4.onBroadcastAndConfirm);
            }).catch(function (e) {
                console.log("error: ", e);
            });
        }
    }, {
        key: "fromChanged",
        value: function fromChanged(pay_from_name) {
            this.setState({ pay_from_name: pay_from_name });
        }
    }, {
        key: "onFromAccountChanged",
        value: function onFromAccountChanged(pay_from_account) {
            this.setState({ pay_from_account: pay_from_account });
        }
    }, {
        key: "render",
        value: function render() {
            var _this5 = this;

            console.log("-- Invoice.render -->", this.state.invoice);
            if (this.state.error) return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "h4",
                    { className: "has-error text-center" },
                    this.state.error
                )
            );
            if (!this.state.invoice) return null;
            if (!this.state.asset) return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "h4",
                    { className: "has-error text-center" },
                    "Asset ",
                    this.state.invoice.currency,
                    " is not supported by this blockchain."
                )
            );

            var invoice = this.state.invoice;
            var total_amount = this.getTotal(invoice.line_items);
            var asset = this.state.invoice.currency;
            var balance = null;
            if (this.state.pay_from_account) {
                var balances = this.state.pay_from_account.get("balances");
                console.log("-- Invoice.render balances -->", balances.get(this.state.asset.get("id")));
                balance = balances.get(this.state.asset.get("id"));
            }
            var items = invoice.line_items.map(function (i) {
                var price = _this5.parsePrice(i.price);
                var amount = i.quantity * price;
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "tr",
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "td",
                        null,
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "item-name" },
                            i.label
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "item-description" },
                            i.quantity,
                            " x ",
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Utility_FormattedAsset__["a" /* default */], { amount: i.price, asset: asset, exact_amount: true })
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "td",
                        null,
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Utility_FormattedAsset__["a" /* default */], { amount: amount, asset: asset, exact_amount: true })
                    )
                );
            });
            var payButtonClass = __WEBPACK_IMPORTED_MODULE_1_classnames___default()("button", { disabled: !this.state.pay_from_account });
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "grid-block vertical" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "grid-content" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "content-block invoice" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "h3",
                            null,
                            "Pay Invoice"
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "h4",
                            null,
                            invoice.memo
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            null,
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__Account_AccountInfo__["a" /* default */], { title: invoice.to_label, account: invoice.to, image_size: { height: 80, width: 80 } }),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "table",
                                { className: "table" },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "thead",
                                    null,
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "tr",
                                        null,
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            "th",
                                            null,
                                            "Items"
                                        ),
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            "th",
                                            null,
                                            "Amount"
                                        )
                                    )
                                ),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "tbody",
                                    null,
                                    items,
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "tr",
                                        null,
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            "td",
                                            { className: "text-right" },
                                            "Total:"
                                        ),
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            "td",
                                            null,
                                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Utility_FormattedAsset__["a" /* default */], { amount: total_amount, asset: asset, exact_amount: true })
                                        )
                                    )
                                )
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "form",
                                null,
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { className: "grid-block" },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "div",
                                        { className: "grid-content medium-4" },
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__Account_AccountSelector__["a" /* default */], { label: "transfer.pay_from",
                                            accountName: this.state.pay_from_name,
                                            onChange: this.fromChanged.bind(this),
                                            onAccountChanged: this.onFromAccountChanged.bind(this),
                                            account: this.state.pay_from_name })
                                    ),
                                    this.state.pay_from_account ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "div",
                                        { className: "grid-content medium-1" },
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            "label",
                                            null,
                                            "Balance"
                                        ),
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__Utility_BalanceComponent__["a" /* default */], { balance: balance })
                                    ) : null
                                ),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "a",
                                    { href: true, className: payButtonClass, onClick: this.onPayClick.bind(this) },
                                    "Pay ",
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Utility_FormattedAsset__["a" /* default */], { amount: total_amount, asset: asset, exact_amount: true }),
                                    " to ",
                                    invoice.to
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Invoice;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Invoice);

/***/ })

});
//# sourceMappingURL=39.js.map