webpackJsonp([40],{

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

/***/ 1667:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_actions_AccountActions__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_stores_AccountStore__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_seerjs_es__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_translate_component__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_translate_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_translate_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_counterpart__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_counterpart___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_counterpart__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_alt_container__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_alt_container___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_alt_container__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }











var AccountNameInput = function (_React$Component) {
    _inherits(AccountNameInput, _React$Component);

    function AccountNameInput() {
        _classCallCheck(this, AccountNameInput);

        var _this = _possibleConstructorReturn(this, (AccountNameInput.__proto__ || Object.getPrototypeOf(AccountNameInput)).call(this));

        _this.state = {
            value: null,
            error: null,
            existing_account: false
        };

        _this.handleChange = _this.handleChange.bind(_this);
        _this.onKeyDown = _this.onKeyDown.bind(_this);
        return _this;
    }

    _createClass(AccountNameInput, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState) {
            return nextState.value !== this.state.value || nextState.error !== this.state.error || nextState.account_name !== this.state.account_name || nextState.existing_account !== this.state.existing_account || nextProps.searchAccounts !== this.props.searchAccounts;
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            if (this.props.onChange) this.props.onChange({ valid: !this.getError() });
        }
    }, {
        key: "getValue",
        value: function getValue() {
            return this.state.value;
        }
    }, {
        key: "setValue",
        value: function setValue(value) {
            this.setState({ value: value });
        }
    }, {
        key: "clear",
        value: function clear() {
            this.setState({ account_name: null, error: null, warning: null });
        }
    }, {
        key: "focus",
        value: function focus() {
            this.refs.input.focus();
        }
    }, {
        key: "valid",
        value: function valid() {
            return !this.getError();
        }
    }, {
        key: "getError",
        value: function getError() {
            var _this2 = this;

            if (this.state.value === null) return null;
            var error = null;
            if (this.state.error) {
                error = this.state.error;
            } else if (this.props.accountShouldExist || this.props.accountShouldNotExist) {
                var account = this.props.searchAccounts.find(function (a) {
                    return a === _this2.state.value;
                });
                if (this.props.accountShouldNotExist && account) {
                    error = __WEBPACK_IMPORTED_MODULE_6_counterpart___default.a.translate("account.name_input.name_is_taken");
                }
                if (this.props.accountShouldExist && !account) {
                    error = __WEBPACK_IMPORTED_MODULE_6_counterpart___default.a.translate("account.name_input.not_found");
                }
            }
            return error;
        }
    }, {
        key: "validateAccountName",
        value: function validateAccountName(value) {
            this.state.error = value === "" ? "Please enter valid account name" : __WEBPACK_IMPORTED_MODULE_4_seerjs_es__["d" /* ChainValidation */].is_account_name_error(value);

            this.state.warning = null;
            if (this.props.cheapNameOnly) {
                if (!this.state.error && !__WEBPACK_IMPORTED_MODULE_4_seerjs_es__["d" /* ChainValidation */].is_cheap_name(value)) this.state.error = __WEBPACK_IMPORTED_MODULE_6_counterpart___default.a.translate("account.name_input.premium_name_faucet");
            } else {
                if (!this.state.error && !__WEBPACK_IMPORTED_MODULE_4_seerjs_es__["d" /* ChainValidation */].is_cheap_name(value)) this.state.warning = __WEBPACK_IMPORTED_MODULE_6_counterpart___default.a.translate("account.name_input.premium_name_warning");
            }
            this.setState({ value: value, error: this.state.error, warning: this.state.warning });
            if (this.props.onChange) this.props.onChange({ value: value, valid: !this.getError() });
            if (this.props.accountShouldExist || this.props.accountShouldNotExist) __WEBPACK_IMPORTED_MODULE_2_actions_AccountActions__["a" /* default */].accountSearch(value);
        }
    }, {
        key: "handleChange",
        value: function handleChange(e) {
            e.preventDefault();
            e.stopPropagation();
            // Simplify the rules (prevent typing of invalid characters)
            var account_name = e.target.value.toLowerCase();
            account_name = account_name.match(/[a-z0-9\.-]+/);
            account_name = account_name ? account_name[0] : null;
            this.setState({ account_name: account_name });
            this.validateAccountName(account_name);
        }
    }, {
        key: "onKeyDown",
        value: function onKeyDown(e) {
            if (this.props.onEnter && event.keyCode === 13) this.props.onEnter(e);
        }
    }, {
        key: "render",
        value: function render() {
            var error = this.getError() || "";
            var class_name = __WEBPACK_IMPORTED_MODULE_1_classnames___default()("form-group", "account-name", { "has-error": false });
            var warning = this.state.warning;
            // let {noLabel} = this.props;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: class_name },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "section",
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", {
                        name: "username",
                        id: "username",
                        type: "text",
                        ref: "input",
                        autoComplete: "off",
                        placeholder: this.props.placeholder,
                        onChange: this.handleChange,
                        onKeyDown: this.onKeyDown,
                        value: this.state.account_name || this.props.initial_value
                    })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { style: { textAlign: "left" }, className: "facolor-error" },
                    error
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { style: { textAlign: "left" }, className: "facolor-warning" },
                    error ? null : warning
                )
            );
        }
    }]);

    return AccountNameInput;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

AccountNameInput.propTypes = {
    id: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,
    placeholder: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,
    initial_value: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,
    onChange: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func,
    onEnter: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func,
    accountShouldExist: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].bool,
    accountShouldNotExist: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].bool,
    cheapNameOnly: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].bool,
    noLabel: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].bool
};
AccountNameInput.defaultProps = {
    noLabel: false
};

var StoreWrapper = function (_React$Component2) {
    _inherits(StoreWrapper, _React$Component2);

    function StoreWrapper() {
        _classCallCheck(this, StoreWrapper);

        return _possibleConstructorReturn(this, (StoreWrapper.__proto__ || Object.getPrototypeOf(StoreWrapper)).apply(this, arguments));
    }

    _createClass(StoreWrapper, [{
        key: "render",
        value: function render() {

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_7_alt_container___default.a,
                { stores: [__WEBPACK_IMPORTED_MODULE_3_stores_AccountStore__["a" /* default */]],
                    inject: {
                        searchAccounts: function searchAccounts() {
                            return __WEBPACK_IMPORTED_MODULE_3_stores_AccountStore__["a" /* default */].getState().searchAccounts;
                        }
                    }
                },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(AccountNameInput, _extends({
                    ref: "nameInput"
                }, this.props))
            );
        }
    }]);

    return StoreWrapper;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (StoreWrapper);

/***/ }),

/***/ 1930:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_alt_react__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_alt_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_alt_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_actions_AccountActions__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_stores_AccountStore__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Forms_AccountNameInput__ = __webpack_require__(1667);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Forms_PasswordInput__ = __webpack_require__(707);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_stores_WalletDb__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_actions_NotificationActions__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react_router_es__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Forms_AccountSelect__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_actions_WalletUnlockActions__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_stores_TransactionConfirmStore__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__LoadingIndicator__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_actions_WalletActions__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_react_translate_component__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_react_translate_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_react_translate_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_seerjs_es__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__Wallet_Backup__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_react_tooltip__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_react_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18_react_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_common_utils__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_actions_SettingsActions__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_counterpart__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_counterpart___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_21_counterpart__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__Utility_ChainTypes__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_immutable__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_23_immutable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__Utility_BindToChainState__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__AccountInfo__ = __webpack_require__(1661);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




























var CreateAccount = function (_React$Component) {
    _inherits(CreateAccount, _React$Component);

    function CreateAccount() {
        _classCallCheck(this, CreateAccount);

        var _this = _possibleConstructorReturn(this, (CreateAccount.__proto__ || Object.getPrototypeOf(CreateAccount)).call(this));

        _this._onBackupDownload = function () {
            _this._setStep(4);
        };

        _this.state = {
            validAccountName: false,
            accountName: "",
            validPassword: false,
            registrar_account: null,
            loading: false,
            hide_refcode: true,
            show_identicon: false,
            agreeCheck: false,
            agreeAuxiliaries: false,
            step: 1
        };
        _this.onFinishConfirm = _this.onFinishConfirm.bind(_this);

        _this.accountNameInput = null;
        return _this;
    }

    _createClass(CreateAccount, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            __WEBPACK_IMPORTED_MODULE_20_actions_SettingsActions__["a" /* default */].changeSetting({
                setting: "passwordLogin",
                value: false
            });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            __WEBPACK_IMPORTED_MODULE_18_react_tooltip___default.a.rebuild();
        }
    }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState) {
            return !__WEBPACK_IMPORTED_MODULE_19_common_utils__["a" /* default */].are_equal_shallow(nextState, this.state);
        }
    }, {
        key: "_setStep",
        value: function _setStep(step) {
            __WEBPACK_IMPORTED_MODULE_3_actions_AccountActions__["a" /* default */].setRegisterStep(step);
            this.setState({
                step: step
            });
        }
    }, {
        key: "isValid",
        value: function isValid() {
            var firstAccount = __WEBPACK_IMPORTED_MODULE_4_stores_AccountStore__["a" /* default */].getMyAccounts().length === 0;
            var valid = this.state.validAccountName;
            if (!__WEBPACK_IMPORTED_MODULE_7_stores_WalletDb__["a" /* default */].getWallet()) {
                valid = valid && this.state.validPassword;
            }
            if (!firstAccount) {
                valid = valid && this.state.registrar_account;
            }
            return valid;
        }
    }, {
        key: "onAccountNameChange",
        value: function onAccountNameChange(e) {
            var state = {};
            if (e.valid !== undefined) state.validAccountName = e.valid;
            if (e.value !== undefined) state.accountName = e.value;
            if (!this.state.show_identicon) state.show_identicon = true;
            this.setState(state);
        }
    }, {
        key: "onPasswordChange",
        value: function onPasswordChange(e) {
            this.setState({ validPassword: e.valid });
        }
    }, {
        key: "onFinishConfirm",
        value: function onFinishConfirm(confirm_store_state) {
            var _this2 = this;

            if (confirm_store_state.included && confirm_store_state.broadcasted_transaction) {
                __WEBPACK_IMPORTED_MODULE_12_stores_TransactionConfirmStore__["a" /* default */].unlisten(this.onFinishConfirm);
                __WEBPACK_IMPORTED_MODULE_12_stores_TransactionConfirmStore__["a" /* default */].reset();

                Object(__WEBPACK_IMPORTED_MODULE_16_seerjs_es__["f" /* FetchChain */])("getAccount", this.state.accountName, undefined, _defineProperty({}, this.state.accountName, true)).then(function () {
                    console.log("onFinishConfirm");
                    _this2.props.router.push("/wallet/backup/create?newAccount=true");
                });
            }
        }
    }, {
        key: "createAccount",
        value: function createAccount(name) {
            var _this3 = this;

            var refcode = this.refs.refcode ? this.refs.refcode.value() : null;
            var referralAccount = __WEBPACK_IMPORTED_MODULE_4_stores_AccountStore__["a" /* default */].getState().referralAccount;
            __WEBPACK_IMPORTED_MODULE_11_actions_WalletUnlockActions__["a" /* default */].unlock().then(function () {
                _this3.setState({ loading: true });

                __WEBPACK_IMPORTED_MODULE_3_actions_AccountActions__["a" /* default */].createAccount(name, _this3.state.registrar_account, referralAccount || _this3.state.registrar_account, 0, refcode).then(function () {
                    // User registering his own account
                    if (_this3.state.registrar_account) {
                        Object(__WEBPACK_IMPORTED_MODULE_16_seerjs_es__["f" /* FetchChain */])("getAccount", name, undefined, _defineProperty({}, name, true)).then(function () {
                            _this3._setStep(2);
                            _this3.setState({
                                loading: false
                            });
                        });
                        __WEBPACK_IMPORTED_MODULE_12_stores_TransactionConfirmStore__["a" /* default */].listen(_this3.onFinishConfirm);
                    } else {
                        // Account registered by the faucet
                        Object(__WEBPACK_IMPORTED_MODULE_16_seerjs_es__["f" /* FetchChain */])("getAccount", name, undefined, _defineProperty({}, name, true)).then(function () {
                            _this3._setStep(2);
                            _this3.setState({
                                loading: false
                            });
                        });
                    }
                }).catch(function (error) {
                    console.log("ERROR AccountActions.createAccount", error);
                    var error_msg = error.base && error.base.length && error.base.length > 0 ? error.base[0] : "unknown error";
                    if (error.remote_ip) error_msg = error.remote_ip[0];
                    __WEBPACK_IMPORTED_MODULE_8_actions_NotificationActions__["a" /* default */].addNotification({
                        message: "Failed to create account: " + name + " - " + error_msg,
                        level: "error",
                        autoDismiss: 10
                    });
                    _this3.setState({ loading: false });
                });
            });
        }
    }, {
        key: "createWallet",
        value: function createWallet(password) {
            return __WEBPACK_IMPORTED_MODULE_14_actions_WalletActions__["a" /* default */].setWallet("default", //wallet name
            password).then(function () {
                console.log("Congratulations, your wallet was successfully created.");
            }).catch(function (err) {
                console.log("CreateWallet failed:", err);
                __WEBPACK_IMPORTED_MODULE_8_actions_NotificationActions__["a" /* default */].addNotification({
                    message: "Failed to create wallet: " + err,
                    level: "error",
                    autoDismiss: 10
                });
            });
        }
    }, {
        key: "onSubmit",
        value: function onSubmit(e) {
            var _this4 = this;

            e.preventDefault();
            if (!this.isValid()) return;
            var account_name = this.accountNameInput.getValue();
            if (__WEBPACK_IMPORTED_MODULE_7_stores_WalletDb__["a" /* default */].getWallet()) {
                this.createAccount(account_name);
            } else {
                var password = this.refs.password.value();
                this.createWallet(password).then(function () {
                    return _this4.createAccount(account_name);
                });
            }
        }
    }, {
        key: "onRegistrarAccountChange",
        value: function onRegistrarAccountChange(registrar_account) {
            this.setState({ registrar_account: registrar_account });
        }

        // showRefcodeInput(e) {
        //     e.preventDefault();
        //     this.setState({hide_refcode: false});
        // }

    }, {
        key: "_renderAccountCreateForm",
        value: function _renderAccountCreateForm() {
            var _this5 = this;

            var registrar_account = this.state.registrar_account;


            var my_accounts = __WEBPACK_IMPORTED_MODULE_4_stores_AccountStore__["a" /* default */].getMyAccounts();
            var firstAccount = my_accounts.length === 0;
            var hasWallet = __WEBPACK_IMPORTED_MODULE_7_stores_WalletDb__["a" /* default */].getWallet();
            var valid = this.isValid() && this.state.agreeCheck;
            var isLTM = false;
            var registrar = registrar_account ? __WEBPACK_IMPORTED_MODULE_16_seerjs_es__["b" /* ChainStore */].getAccount(registrar_account) : null;
            if (registrar) {
                if (registrar.get("lifetime_referrer") == registrar.get("id")) {
                    isLTM = true;
                }
            }

            var buttonClass = __WEBPACK_IMPORTED_MODULE_2_classnames___default()("submit-button button ", { disabled: !valid || registrar_account && !isLTM });

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "form",
                {
                    style: { maxWidth: "40rem" },
                    onSubmit: this.onSubmit.bind(this),
                    noValidate: true
                },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__Forms_AccountNameInput__["a" /* default */], {
                    ref: function ref(_ref) {
                        if (_ref) {
                            _this5.accountNameInput = _ref.refs.nameInput;
                        }
                    },
                    cheapNameOnly: !!firstAccount,
                    onChange: this.onAccountNameChange.bind(this),
                    accountShouldNotExist: true,
                    placeholder: __WEBPACK_IMPORTED_MODULE_21_counterpart___default.a.translate("wallet.account_public"),
                    noLabel: true
                }),
                hasWallet ? null : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__Forms_PasswordInput__["a" /* default */], {
                    ref: "password",
                    confirmation: true,
                    onChange: this.onPasswordChange.bind(this),
                    noLabel: true,
                    checkStrength: true
                }),
                firstAccount ? null : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "full-width-content form-group no-overflow" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "label",
                        null,
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15_react_translate_component___default.a, { content: "account.pay_from" })
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10__Forms_AccountSelect__["a" /* default */], {
                        account_names: my_accounts,
                        onChange: this.onRegistrarAccountChange.bind(this)

                    }),
                    registrar_account && !isLTM ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { style: { textAlign: "left" }, className: "facolor-error" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15_react_translate_component___default.a, { content: "wallet.must_be_ltm" })
                    ) : null
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "agree-check" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { className: "cbox", id: "ck_agree", type: "checkbox", onChange: function onChange(e) {
                            return _this5.setState({ agreeCheck: !_this5.state.agreeCheck });
                        } }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("label", { className: "checkbox-mask", htmlFor: "ck_agree" }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15_react_translate_component___default.a, { content: "account.agree_text" })
                ),
                this.state.loading ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_13__LoadingIndicator__["a" /* default */], { type: "three-bounce" }) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "button",
                    { style: { width: "100%" }, className: buttonClass },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15_react_translate_component___default.a, { content: "account.create_wallet_and_account" })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15_react_translate_component___default.a, { component: "div", content: "account.existing_accounts", style: { textAlign: "left", fontSize: "14px", color: "#666", paddingTop: "40px" } }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { style: { paddingTop: 20, textAlign: "left" } },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "label",
                        { style: { display: "inline" } },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            __WEBPACK_IMPORTED_MODULE_9_react_router_es__["b" /* Link */],
                            { onClick: function onClick() {
                                    _this5._setStep(9);
                                } },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15_react_translate_component___default.a, { content: "wallet.restore" })
                        )
                    ),
                    "\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0",
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "label",
                        { style: { display: "inline" } },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            __WEBPACK_IMPORTED_MODULE_9_react_router_es__["b" /* Link */],
                            { to: "/create-wallet-brainkey" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15_react_translate_component___default.a, { content: "settings.backup_brainkey" })
                        )
                    )
                ),
                !hasWallet || firstAccount ? null : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { style: { paddingTop: 20 } },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "label",
                        null,
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "a",
                            { onClick: function onClick() {
                                    _this5._setStep(4);
                                } },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15_react_translate_component___default.a, { content: "wallet.go_get_started" })
                        )
                    )
                )
            );
        }
    }, {
        key: "_renderAccountCreateText",
        value: function _renderAccountCreateText() {
            var hasWallet = __WEBPACK_IMPORTED_MODULE_7_stores_WalletDb__["a" /* default */].getWallet();
            var my_accounts = __WEBPACK_IMPORTED_MODULE_4_stores_AccountStore__["a" /* default */].getMyAccounts();
            var firstAccount = my_accounts.length === 0;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "confirm-checks" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "h6",
                    { style: { fontSize: "14px", color: "#666", paddingBottom: 15, marginTop: 0 } },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15_react_translate_component___default.a, { content: "wallet.wallet_browser" })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "p",
                    null,
                    !hasWallet ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15_react_translate_component___default.a, { content: "wallet.has_wallet" }) : null
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15_react_translate_component___default.a, { style: { textAlign: "left" }, component: "p", content: "wallet.create_account_text" }),
                firstAccount ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15_react_translate_component___default.a, { style: { textAlign: "left" }, component: "p", content: "wallet.first_account_paid" }) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15_react_translate_component___default.a, { style: { textAlign: "left" }, component: "p", content: "wallet.not_first_account" })
            );
        }
    }, {
        key: "_renderBackup",
        value: function _renderBackup() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "backup-submit" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_17__Wallet_Backup__["BackupCreate"], { inRegister: true, noText: true, downloadCb: this._onBackupDownload })
            );
        }
    }, {
        key: "_renderBackupText",
        value: function _renderBackupText() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", null);
        }
    }, {
        key: "_renderGetStarted",
        value: function _renderGetStarted() {

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "table",
                    { className: "table" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "tbody",
                        null,
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "tr",
                            null,
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "td",
                                null,
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15_react_translate_component___default.a, { content: "wallet.tips_dashboard" }),
                                ":"
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "td",
                                null,
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    __WEBPACK_IMPORTED_MODULE_9_react_router_es__["b" /* Link */],
                                    { to: "/dashboard" },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15_react_translate_component___default.a, { content: "header.dashboard" })
                                )
                            )
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "tr",
                            null,
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "td",
                                null,
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15_react_translate_component___default.a, { content: "wallet.tips_account" }),
                                ":"
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "td",
                                null,
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    __WEBPACK_IMPORTED_MODULE_9_react_router_es__["b" /* Link */],
                                    { to: "/account/" + this.state.accountName + "/overview" },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15_react_translate_component___default.a, { content: "wallet.link_account" })
                                )
                            )
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "tr",
                            null,
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "td",
                                null,
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15_react_translate_component___default.a, { content: "wallet.tips_transfer" }),
                                ":"
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "td",
                                null,
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    __WEBPACK_IMPORTED_MODULE_9_react_router_es__["b" /* Link */],
                                    { to: "/transfer" },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15_react_translate_component___default.a, { content: "wallet.link_transfer" })
                                )
                            )
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "tr",
                            null,
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "td",
                                null,
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15_react_translate_component___default.a, { content: "wallet.tips_settings" }),
                                ":"
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "td",
                                null,
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    __WEBPACK_IMPORTED_MODULE_9_react_router_es__["b" /* Link */],
                                    { to: "/settings" },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15_react_translate_component___default.a, { content: "header.settings" })
                                )
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: "_renderGetStartedText",
        value: function _renderGetStartedText() {

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "p",
                    { style: { fontWeight: "normal", fontFamily: "Roboto-Medium, arial, sans-serif", fontStyle: "normal" } },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15_react_translate_component___default.a, { content: "wallet.congrat" })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "p",
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15_react_translate_component___default.a, { content: "wallet.tips_explore" })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "p",
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15_react_translate_component___default.a, { content: "wallet.tips_header" })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "p",
                    { className: "txtlabel warning" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15_react_translate_component___default.a, { content: "wallet.tips_login" })
                )
            );
        }
    }, {
        key: "_renderAccountInfo",
        value: function _renderAccountInfo() {
            var _this6 = this;

            var className = "button" + (this.state.agreeAuxiliaries ? "" : " disabled");
            //accountName
            var account = __WEBPACK_IMPORTED_MODULE_4_stores_AccountStore__["a" /* default */].getState().currentAccount;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "account-info" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "account-names", style: { marginTop: "2em" } },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(AccountNames, { account: account })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15_react_translate_component___default.a, { unsafe: true, component: "p", content: "wallet.auxiliaries_text", style: { margin: "3em 0 1em 0" } }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "card" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "p",
                        { className: "card-content", style: { padding: "0.5em", lineHeight: "2em" } },
                        __WEBPACK_IMPORTED_MODULE_7_stores_WalletDb__["a" /* default */].getBrainKey()
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "agree-auxiliaries" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { className: "cbox", id: "ck_agree", type: "checkbox", onChange: function onChange(e) {
                            return _this6.setState({ agreeAuxiliaries: !_this6.state.agreeAuxiliaries });
                        } }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("label", { className: "checkbox-mask", htmlFor: "ck_agree", style: { width: "26px" } }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15_react_translate_component___default.a, { component: "p", content: "wallet.auxiliaries_agree_text", style: { display: "inline" } })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "button",
                    { className: className, style: { width: "100%", height: "3.13em", margin: "4em 0 12em 0" }, onClick: function onClick() {
                            _this6._setStep(3);
                        } },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15_react_translate_component___default.a, { content: "wallet.next_step", style: { display: "inline" } })
                )
            );
        }
    }, {
        key: "_renderResoteWallet",
        value: function _renderResoteWallet() {

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { style: { textAlign: "left" } },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_17__Wallet_Backup__["BackupRestore"], { inRegister: true })
            );
        }
    }, {
        key: "render",
        value: function render() {
            var step = __WEBPACK_IMPORTED_MODULE_4_stores_AccountStore__["a" /* default */].getState().registerStep;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "sub-content" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { style: { maxWidth: "95vw" } },
                    step !== 1 && step !== 2 && step !== 3 && step !== 9 ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "p",
                        { style: { fontWeight: "normal", fontFamily: "Roboto-Medium, arial, sans-serif", fontStyle: "normal" } },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15_react_translate_component___default.a, { content: "wallet.step_" + step })
                    ) : null,
                    step === 1 ? this._renderAccountCreateForm() : step === 2 ? this._renderAccountInfo() : step === 3 ? this._renderBackup() : step === 9 ? this._renderResoteWallet() : this._renderGetStarted()
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { style: { maxWidth: "95vw", paddingTop: "2rem" } },
                    step === 1 ? this._renderAccountCreateText() : step === 2 ? null : step === 3 ? this._renderBackupText() : step === 9 ? null : this._renderGetStartedText()
                )
            );
        }
    }]);

    return CreateAccount;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var AccountNames = function (_React$Component2) {
    _inherits(AccountNames, _React$Component2);

    function AccountNames() {
        _classCallCheck(this, AccountNames);

        return _possibleConstructorReturn(this, (AccountNames.__proto__ || Object.getPrototypeOf(AccountNames)).call(this));
    }

    _createClass(AccountNames, [{
        key: "render",
        value: function render() {
            var account = this.props.account;


            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    null,
                    "\u60A8\u7684SEER\u8D26\u53F7\uFF1A",
                    account.get("name")
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    null,
                    "\u60A8\u7684SEER\u6570\u5B57\u8D26\u53F7\uFF1A",
                    account.get("id")
                )
            );
        }
    }]);

    return AccountNames;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

AccountNames.propTypes = {
    account: __WEBPACK_IMPORTED_MODULE_22__Utility_ChainTypes__["a" /* default */].ChainAccount.isRequired
};


AccountNames = Object(__WEBPACK_IMPORTED_MODULE_24__Utility_BindToChainState__["a" /* default */])(AccountNames);

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_1_alt_react__["connect"])(CreateAccount, {
    listenTo: function listenTo() {
        return [__WEBPACK_IMPORTED_MODULE_4_stores_AccountStore__["a" /* default */]];
    },
    getProps: function getProps() {
        return {};
    }
}));

/***/ })

});
//# sourceMappingURL=40.js.map