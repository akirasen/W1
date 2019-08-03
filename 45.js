webpackJsonp([45],{

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

/***/ 1931:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_stores_WalletDb__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_actions_NotificationActions__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_router_es__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Forms_AccountSelect__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_stores_TransactionConfirmStore__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__LoadingIndicator__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_react_translate_component__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_react_translate_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_react_translate_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_counterpart__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_counterpart___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_counterpart__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_seerjs_es__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_react_tooltip__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_react_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_react_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_common_utils__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_actions_SettingsActions__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_actions_WalletUnlockActions__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__Icon_Icon__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__Utility_CopyButton__ = __webpack_require__(697);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }























var CreateAccountPassword = function (_React$Component) {
    _inherits(CreateAccountPassword, _React$Component);

    function CreateAccountPassword() {
        _classCallCheck(this, CreateAccountPassword);

        var _this = _possibleConstructorReturn(this, (CreateAccountPassword.__proto__ || Object.getPrototypeOf(CreateAccountPassword)).call(this));

        _this.state = {
            validAccountName: false,
            accountName: "",
            validPassword: false,
            registrar_account: null,
            loading: false,
            hide_refcode: true,
            show_identicon: false,
            step: 1,
            showPass: false,
            generatedPassword: ("P" + __WEBPACK_IMPORTED_MODULE_14_seerjs_es__["o" /* key */].get_random_key().toWif()).substr(0, 45),
            confirm_password: "",
            understand_1: false,
            understand_2: false,
            understand_3: false
        };
        _this.onFinishConfirm = _this.onFinishConfirm.bind(_this);

        _this.accountNameInput = null;
        return _this;
    }

    _createClass(CreateAccountPassword, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            if (!__WEBPACK_IMPORTED_MODULE_6_stores_WalletDb__["a" /* default */].getWallet()) {
                __WEBPACK_IMPORTED_MODULE_17_actions_SettingsActions__["a" /* default */].changeSetting({
                    setting: "passwordLogin",
                    value: true
                });
            }
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            __WEBPACK_IMPORTED_MODULE_15_react_tooltip___default.a.rebuild();
        }
    }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState) {
            return !__WEBPACK_IMPORTED_MODULE_16_common_utils__["a" /* default */].are_equal_shallow(nextState, this.state);
        }
    }, {
        key: "isValid",
        value: function isValid() {
            var firstAccount = __WEBPACK_IMPORTED_MODULE_4_stores_AccountStore__["a" /* default */].getMyAccounts().length === 0;
            var valid = this.state.validAccountName;
            if (!__WEBPACK_IMPORTED_MODULE_6_stores_WalletDb__["a" /* default */].getWallet()) {
                valid = valid && this.state.validPassword;
            }
            if (!firstAccount) {
                valid = valid && this.state.registrar_account;
            }
            return valid && this.state.understand_1 && this.state.understand_2;
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
        key: "onFinishConfirm",
        value: function onFinishConfirm(confirm_store_state) {
            var _this2 = this;

            if (confirm_store_state.included && confirm_store_state.broadcasted_transaction) {
                __WEBPACK_IMPORTED_MODULE_10_stores_TransactionConfirmStore__["a" /* default */].unlisten(this.onFinishConfirm);
                __WEBPACK_IMPORTED_MODULE_10_stores_TransactionConfirmStore__["a" /* default */].reset();

                Object(__WEBPACK_IMPORTED_MODULE_14_seerjs_es__["f" /* FetchChain */])("getAccount", this.state.accountName, undefined, _defineProperty({}, this.state.accountName, true)).then(function () {
                    _this2.props.router.push("/wallet/backup/create?newAccount=true");
                });
            }
        }
    }, {
        key: "_unlockAccount",
        value: function _unlockAccount(name, password) {

            __WEBPACK_IMPORTED_MODULE_17_actions_SettingsActions__["a" /* default */].changeSetting({
                setting: "passwordLogin",
                value: true
            });

            __WEBPACK_IMPORTED_MODULE_6_stores_WalletDb__["a" /* default */].validatePassword(password, true, name);
            __WEBPACK_IMPORTED_MODULE_18_actions_WalletUnlockActions__["a" /* default */].checkLock.defer();
        }
    }, {
        key: "createAccount",
        value: function createAccount(name, password) {
            var _this3 = this;

            var refcode = this.refs.refcode ? this.refs.refcode.value() : null;
            var referralAccount = __WEBPACK_IMPORTED_MODULE_4_stores_AccountStore__["a" /* default */].getState().referralAccount;
            this.setState({ loading: true });

            __WEBPACK_IMPORTED_MODULE_3_actions_AccountActions__["a" /* default */].createAccountWithPassword(name, password, this.state.registrar_account, referralAccount || this.state.registrar_account, 0, refcode).then(function () {
                __WEBPACK_IMPORTED_MODULE_3_actions_AccountActions__["a" /* default */].setPasswordAccount(name);
                // User registering his own account
                if (_this3.state.registrar_account) {
                    Object(__WEBPACK_IMPORTED_MODULE_14_seerjs_es__["f" /* FetchChain */])("getAccount", name, undefined, _defineProperty({}, name, true)).then(function () {
                        _this3.setState({
                            step: 2,
                            loading: false
                        });
                        _this3._unlockAccount(name, password);
                    });
                    __WEBPACK_IMPORTED_MODULE_10_stores_TransactionConfirmStore__["a" /* default */].listen(_this3.onFinishConfirm);
                } else {
                    // Account registered by the faucet
                    Object(__WEBPACK_IMPORTED_MODULE_14_seerjs_es__["f" /* FetchChain */])("getAccount", name, undefined, _defineProperty({}, name, true)).then(function () {
                        _this3.setState({
                            step: 2
                        });
                        _this3._unlockAccount(name, password);
                    });
                }
            }).catch(function (error) {
                console.log("ERROR AccountActions.createAccount", error);
                var error_msg = error.base && error.base.length && error.base.length > 0 ? error.base[0] : "unknown error";
                if (error.remote_ip) error_msg = error.remote_ip[0];
                __WEBPACK_IMPORTED_MODULE_7_actions_NotificationActions__["a" /* default */].addNotification({
                    message: "Failed to create account: " + name + " - " + error_msg,
                    level: "error",
                    autoDismiss: 10
                });
                _this3.setState({ loading: false });
            });
        }
    }, {
        key: "onSubmit",
        value: function onSubmit(e) {
            e.preventDefault();
            if (!this.isValid()) return;
            var account_name = this.accountNameInput.getValue();
            // if (WalletDb.getWallet()) {
            //     this.createAccount(account_name);
            // } else {
            var password = this.state.generatedPassword;
            this.createAccount(account_name, password);
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
        key: "_onInput",
        value: function _onInput(value, e) {
            var _setState;

            this.setState((_setState = {}, _defineProperty(_setState, value, value === "confirm_password" ? e.target.value : !this.state[value]), _defineProperty(_setState, "validPassword", value === "confirm_password" ? e.target.value === this.state.generatedPassword : this.state.validPassword), _setState));
        }
    }, {
        key: "_renderAccountCreateForm",
        value: function _renderAccountCreateForm() {
            var _this4 = this;

            var registrar_account = this.state.registrar_account;


            var my_accounts = __WEBPACK_IMPORTED_MODULE_4_stores_AccountStore__["a" /* default */].getMyAccounts();
            var firstAccount = my_accounts.length === 0;
            var valid = this.isValid();
            var isLTM = false;
            var registrar = registrar_account ? __WEBPACK_IMPORTED_MODULE_14_seerjs_es__["b" /* ChainStore */].getAccount(registrar_account) : null;
            if (registrar) {
                if (registrar.get("lifetime_referrer") == registrar.get("id")) {
                    isLTM = true;
                }
            }

            var buttonClass = __WEBPACK_IMPORTED_MODULE_2_classnames___default()("submit-button button no-margin", { disabled: !valid || registrar_account && !isLTM });

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { style: { textAlign: "left" } },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "form",
                    {
                        style: { maxWidth: "60rem" },
                        onSubmit: this.onSubmit.bind(this),
                        noValidate: true
                    },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__Forms_AccountNameInput__["a" /* default */], {
                        ref: function ref(_ref) {
                            if (_ref) {
                                _this4.accountNameInput = _ref.refs.nameInput;
                            }
                        },
                        cheapNameOnly: !!firstAccount,
                        onChange: this.onAccountNameChange.bind(this),
                        accountShouldNotExist: true,
                        placeholder: __WEBPACK_IMPORTED_MODULE_13_counterpart___default.a.translate("wallet.account_public"),
                        noLabel: true
                    }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "section",
                        { className: "form-group" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "label",
                            { className: "left-label" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_translate_component___default.a, { content: "wallet.generated" }),
                            "\xA0\xA0",
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "span",
                                { className: "tooltip", "data-html": true, "data-tip": __WEBPACK_IMPORTED_MODULE_13_counterpart___default.a.translate("tooltip.generate") },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_19__Icon_Icon__["a" /* default */], { name: "question-circle" })
                            )
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { style: { paddingBottom: "0.5rem" } },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "span",
                                { className: "inline-label" },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { style: { maxWidth: "calc(30rem - 48px)", fontSize: "80%" }, disabled: true, value: this.state.generatedPassword, type: "text", className: "input-button" }),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_20__Utility_CopyButton__["a" /* default */], {
                                    text: this.state.generatedPassword,
                                    tip: "tooltip.copy_password",
                                    dataPlace: "top"
                                })
                            )
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "section",
                        null,
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "label",
                            { className: "left-label" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_translate_component___default.a, { content: "wallet.confirm_password" })
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "password", name: "password", id: "password", value: this.state.confirm_password, onChange: this._onInput.bind(this, "confirm_password") }),
                        this.state.confirm_password && this.state.confirm_password !== this.state.generatedPassword ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "has-error" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_translate_component___default.a, { content: "wallet.confirm_error" })
                        ) : null
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "confirm-checks", onClick: this._onInput.bind(this, "understand_3") },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "label",
                            { htmlFor: "checkbox-1", style: { position: "relative" } },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "checkbox", id: "checkbox-1", onChange: function onChange() {}, checked: this.state.understand_3, style: { position: "absolute", top: "-5px", left: "0" } }),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { style: { paddingLeft: "30px" } },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_translate_component___default.a, { content: "wallet.understand_3" })
                            )
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "confirm-checks", onClick: this._onInput.bind(this, "understand_1") },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "label",
                            { htmlFor: "checkbox-2", style: { position: "relative" } },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "checkbox", id: "checkbox-2", onChange: function onChange() {}, checked: this.state.understand_1, style: { position: "absolute", top: "-5px", left: "0" } }),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { style: { paddingLeft: "30px" } },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_translate_component___default.a, { content: "wallet.understand_1" })
                            )
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "confirm-checks", style: { paddingBottom: "1.5rem" }, onClick: this._onInput.bind(this, "understand_2") },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "label",
                            { htmlFor: "checkbox-3", style: { position: "relative" } },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "checkbox", id: "checkbox-3", onChange: function onChange() {}, checked: this.state.understand_2, style: { position: "absolute", top: "-5px", left: "0" } }),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { style: { paddingLeft: "30px" } },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_translate_component___default.a, { content: "wallet.understand_2" })
                            )
                        )
                    ),
                    firstAccount ? null : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "full-width-content form-group no-overflow", style: { paddingTop: 30 } },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "label",
                            null,
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_translate_component___default.a, { content: "account.pay_from" })
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9__Forms_AccountSelect__["a" /* default */], {
                            account_names: my_accounts,
                            onChange: this.onRegistrarAccountChange.bind(this)
                        }),
                        registrar_account && !isLTM ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { style: { textAlign: "left" }, className: "facolor-error" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_translate_component___default.a, { content: "wallet.must_be_ltm" })
                        ) : null
                    ),
                    this.state.loading ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11__LoadingIndicator__["a" /* default */], { type: "three-bounce" }) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "button",
                        { style: { width: "100%" }, className: buttonClass },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_translate_component___default.a, { content: "account.create_account" })
                    )
                )
            );
        }
    }, {
        key: "_renderAccountCreateText",
        value: function _renderAccountCreateText() {
            var my_accounts = __WEBPACK_IMPORTED_MODULE_4_stores_AccountStore__["a" /* default */].getMyAccounts();
            var firstAccount = my_accounts.length === 0;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "h4",
                    { style: { fontWeight: "normal", fontFamily: "Roboto-Medium, arial, sans-serif", fontStyle: "normal", paddingBottom: 15 } },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_translate_component___default.a, { content: "wallet.wallet_password" })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_translate_component___default.a, { style: { textAlign: "left" }, unsafe: true, component: "p", content: "wallet.create_account_password_text" }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_translate_component___default.a, { style: { textAlign: "left" }, component: "p", content: "wallet.create_account_text" }),
                firstAccount ? null : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_translate_component___default.a, { style: { textAlign: "left" }, component: "p", content: "wallet.not_first_account" })
            );
        }
    }, {
        key: "_renderBackup",
        value: function _renderBackup() {
            var _this5 = this;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "backup-submit" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "p",
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_translate_component___default.a, { unsafe: true, content: "wallet.password_crucial" })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    null,
                    !this.state.showPass ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { onClick: function onClick() {
                                _this5.setState({ showPass: true });
                            }, className: "button" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_translate_component___default.a, { content: "wallet.password_show" })
                    ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        null,
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "h5",
                            null,
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_translate_component___default.a, { content: "settings.password" }),
                            ":"
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "p",
                            { style: { fontWeight: "normal", fontFamily: "Roboto-Medium, arial, sans-serif", fontStyle: "normal", textAlign: "center" } },
                            this.state.generatedPassword
                        )
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { className: "divider" }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "p",
                    { className: "txtlabel warning" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_translate_component___default.a, { unsafe: true, content: "wallet.password_lose_warning" })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { style: { width: "100%" }, onClick: function onClick() {
                            _this5.context.router.push("/dashboard");;
                        }, className: "button" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_translate_component___default.a, { content: "wallet.ok_done" })
                )
            );
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
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_translate_component___default.a, { content: "wallet.tips_dashboard" }),
                                ":"
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "td",
                                null,
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    __WEBPACK_IMPORTED_MODULE_8_react_router_es__["b" /* Link */],
                                    { to: "/dashboard" },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_translate_component___default.a, { content: "header.dashboard" })
                                )
                            )
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "tr",
                            null,
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "td",
                                null,
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_translate_component___default.a, { content: "wallet.tips_account" }),
                                ":"
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "td",
                                null,
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    __WEBPACK_IMPORTED_MODULE_8_react_router_es__["b" /* Link */],
                                    { to: "/account/" + this.state.accountName + "/overview" },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_translate_component___default.a, { content: "wallet.link_account" })
                                )
                            )
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "tr",
                            null,
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "td",
                                null,
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_translate_component___default.a, { content: "wallet.tips_deposit" }),
                                ":"
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "td",
                                null,
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    __WEBPACK_IMPORTED_MODULE_8_react_router_es__["b" /* Link */],
                                    { to: "/deposit-withdraw" },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_translate_component___default.a, { content: "wallet.link_deposit" })
                                )
                            )
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "tr",
                            null,
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "td",
                                null,
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_translate_component___default.a, { content: "wallet.tips_transfer" }),
                                ":"
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "td",
                                null,
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    __WEBPACK_IMPORTED_MODULE_8_react_router_es__["b" /* Link */],
                                    { to: "/transfer" },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_translate_component___default.a, { content: "wallet.link_transfer" })
                                )
                            )
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "tr",
                            null,
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "td",
                                null,
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_translate_component___default.a, { content: "wallet.tips_settings" }),
                                ":"
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "td",
                                null,
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    __WEBPACK_IMPORTED_MODULE_8_react_router_es__["b" /* Link */],
                                    { to: "/settings" },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_translate_component___default.a, { content: "header.settings" })
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
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_translate_component___default.a, { content: "wallet.congrat" })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "p",
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_translate_component___default.a, { content: "wallet.tips_explore_pass" })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "p",
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_translate_component___default.a, { content: "wallet.tips_header" })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "p",
                    { className: "txtlabel warning" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_translate_component___default.a, { content: "wallet.tips_login" })
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            var step = this.state.step;
            // let my_accounts = AccountStore.getMyAccounts();
            // let firstAccount = my_accounts.length === 0;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "sub-content" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    null,
                    step === 2 ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "p",
                        { style: { fontWeight: "normal", fontFamily: "Roboto-Medium, arial, sans-serif", fontStyle: "normal" } },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12_react_translate_component___default.a, { content: "wallet.step_" + step })
                    ) : null,
                    step === 3 ? this._renderGetStartedText() : null,
                    step === 1 ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        null,
                        this._renderAccountCreateForm()
                    ) : step === 2 ? this._renderBackup() : this._renderGetStarted()
                )
            );
        }
    }]);

    return CreateAccountPassword;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

CreateAccountPassword.contextTypes = {
    router: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.object.isRequired
};


/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_1_alt_react__["connect"])(CreateAccountPassword, {
    listenTo: function listenTo() {
        return [__WEBPACK_IMPORTED_MODULE_4_stores_AccountStore__["a" /* default */]];
    },
    getProps: function getProps() {
        return {};
    }
}));

/***/ })

});
//# sourceMappingURL=45.js.map