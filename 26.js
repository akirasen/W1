webpackJsonp([26],{

/***/ 1541:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Tabs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Tab; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_translate_component__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_translate_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_translate_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_alt_react__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_alt_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_alt_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_actions_SettingsActions__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_stores_SettingsStore__ = __webpack_require__(35);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








/**
 *  Renders a tab layout, handling switching and optionally persists the currently open tab using the SettingsStore
 *
 *  props:
 *     setting: unique name to be used to remember the active tab of this tabs layout,
 *     tabsClass: optional classes for the tabs container div
 *     contentClass: optional classes for the content container div
 *
 *  Usage:
 *
 *  <Tabs setting="mySetting">
 *      <Tab title="locale.string.title1">Tab 1 content</Tab>
 *      <Tab title="locale.string.title2">Tab 2 content</Tab>
 *  </Tabs>
 *
 */

var Tab = function (_React$Component) {
    _inherits(Tab, _React$Component);

    function Tab() {
        _classCallCheck(this, Tab);

        return _possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).apply(this, arguments));
    }

    _createClass(Tab, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                isActive = _props.isActive,
                index = _props.index,
                changeTab = _props.changeTab,
                title = _props.title,
                className = _props.className,
                disabled = _props.disabled;

            var c = __WEBPACK_IMPORTED_MODULE_2_classnames___default()({ "is-active": isActive }, className);

            if (this.props.collapsed) {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "option",
                    { value: index, "data-is-link-to": this.props.isLinkTo },
                    typeof title === "string" && title.indexOf(".") > 0 ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_translate_component___default.a, { className: "tab-title", content: title }) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "span",
                        { className: "tab-title" },
                        title
                    )
                );
            }
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "li",
                { className: c, onClick: !disabled ? changeTab.bind(this, index, this.props.isLinkTo) : null },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "a",
                    null,
                    typeof title === "string" && title.indexOf(".") > 0 ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_translate_component___default.a, { className: "tab-title", content: title }) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "span",
                        { className: "tab-title" },
                        title
                    ),
                    this.props.subText ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "tab-subtext" },
                        this.props.subText
                    ) : null
                )
            );
        }
    }]);

    return Tab;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Tab.propTypes = {
    changeTab: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func,
    isActive: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].bool.isRequired,
    index: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number.isRequired,
    className: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,
    isLinkTo: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string
};
Tab.defaultProps = {
    isActive: false,
    index: 0,
    className: "",
    isLinkTo: ""
};

var Tabs = function (_React$Component2) {
    _inherits(Tabs, _React$Component2);

    function Tabs(props) {
        _classCallCheck(this, Tabs);

        var _this2 = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this));

        _this2.state = {
            activeTab: props.setting ? props.viewSettings.get(props.setting, props.defaultActiveTab) : props.defaultActiveTab,
            width: window.innerWidth
        };

        _this2._setDimensions = _this2._setDimensions.bind(_this2);
        return _this2;
    }

    _createClass(Tabs, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this._setDimensions();
            window.addEventListener("resize", this._setDimensions, { capture: false, passive: true });
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            var nextSetting = nextProps.viewSettings.get(nextProps.setting);
            if (nextSetting !== this.props.viewSettings.get(this.props.setting)) {
                this.setState({
                    activeTab: nextSetting
                });
            }
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            window.removeEventListener("resize", this._setDimensions);
        }
    }, {
        key: "_setDimensions",
        value: function _setDimensions() {
            var width = window.innerWidth;

            if (width !== this.state.width) {
                this.setState({ width: width });
            }
        }
    }, {
        key: "_changeTab",
        value: function _changeTab(value, isLinkTo) {
            if (value === this.state.activeTab) return;
            // Persist current tab if desired

            if (isLinkTo !== "") {
                this.context.router.push(isLinkTo);
                return;
            }

            if (this.props.setting) {
                __WEBPACK_IMPORTED_MODULE_4_actions_SettingsActions__["a" /* default */].changeViewSetting(_defineProperty({}, this.props.setting, value));
            }
            this.setState({ activeTab: value });

            if (this.props.onChangeTab) this.props.onChangeTab(value);
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var _props2 = this.props,
                children = _props2.children,
                contentClass = _props2.contentClass,
                tabsClass = _props2.tabsClass,
                style = _props2.style,
                segmented = _props2.segmented;

            var collapseTabs = this.state.width < 900 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.Children.count(children) > 2;

            var activeContent = null;

            var tabIndex = [];
            var tabs = __WEBPACK_IMPORTED_MODULE_0_react___default.a.Children.map(children, function (child, index) {
                if (!child) {
                    return null;
                }
                if (collapseTabs && child.props.disabled) return null;
                var isActive = index === _this3.state.activeTab;
                if (isActive) {
                    activeContent = child.props.children;
                }

                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.cloneElement(child, { collapsed: collapseTabs, isActive: isActive, changeTab: _this3._changeTab.bind(_this3), index: index });
            }).filter(function (a) {
                if (a) {
                    tabIndex.push(a.props.index);
                }
                return a !== null;
            });

            if (!activeContent) {
                activeContent = tabs[0].props.children;
            }

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()(!!this.props.actionButtons ? "with-buttons" : "", this.props.className) },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "service-selector" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "ul",
                        { style: style, className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()("button-group no-margin", tabsClass, { segmented: segmented }) },
                        collapseTabs ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "li",
                            { style: { paddingLeft: 10, paddingRight: 10, minWidth: "15rem" } },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "select",
                                {
                                    value: this.state.activeTab,
                                    style: { marginTop: 10, marginBottom: 10 },
                                    className: "bts-select",
                                    onChange: function onChange(e) {
                                        var ind = parseInt(e.target.value, 10);_this3._changeTab(ind, e.target[ind].attributes["data-is-link-to"].value);
                                    }
                                },
                                tabs
                            )
                        ) : tabs,
                        this.props.actionButtons ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "li",
                            { className: "tabs-action-buttons" },
                            this.props.actionButtons
                        ) : null
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: contentClass + " tab-content" },
                    activeContent
                )
            );
        }
    }]);

    return Tabs;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Tabs.propTypes = {
    setting: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,
    defaultActiveTab: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number,
    segmented: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].bool
};
Tabs.defaultProps = {
    active: 0,
    defaultActiveTab: 0,
    segmented: true,
    contentClass: "",
    style: {}
};
Tabs.contextTypes = {
    router: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.object.isRequired
};


Tabs = Object(__WEBPACK_IMPORTED_MODULE_3_alt_react__["connect"])(Tabs, {
    listenTo: function listenTo() {
        return [__WEBPACK_IMPORTED_MODULE_5_stores_SettingsStore__["a" /* default */]];
    },
    getProps: function getProps() {
        return { viewSettings: __WEBPACK_IMPORTED_MODULE_5_stores_SettingsStore__["a" /* default */].getState().viewSettings };
    }
});



/***/ }),

/***/ 1646:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/react/react.js
var react = __webpack_require__(1);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./app/components/Modal/BaseModal.jsx
var BaseModal = __webpack_require__(105);

// EXTERNAL MODULE: ./node_modules/react-foundation-apps/src/utils/foundation-api.js
var foundation_api = __webpack_require__(41);
var foundation_api_default = /*#__PURE__*/__webpack_require__.n(foundation_api);

// EXTERNAL MODULE: ./app/actions/WalletUnlockActions.js
var WalletUnlockActions = __webpack_require__(69);

// EXTERNAL MODULE: ./app/stores/WalletDb.js
var WalletDb = __webpack_require__(26);

// EXTERNAL MODULE: ./node_modules/react-translate-component/index.js
var react_translate_component = __webpack_require__(5);
var react_translate_component_default = /*#__PURE__*/__webpack_require__.n(react_translate_component);

// EXTERNAL MODULE: ./app/stores/PrivateKeyStore.js
var PrivateKeyStore = __webpack_require__(82);

// EXTERNAL MODULE: ./node_modules/qrcode.react/lib/index.js
var lib = __webpack_require__(692);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// EXTERNAL MODULE: ./node_modules/seerjs/es/index.js + 7 modules
var es = __webpack_require__(6);

// CONCATENATED MODULE: ./app/components/Modal/QrcodeModal.jsx
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var QrcodeModal_QrcodeModal = function (_React$Component) {
    _inherits(QrcodeModal, _React$Component);

    function QrcodeModal(props) {
        _classCallCheck(this, QrcodeModal);

        var _this = _possibleConstructorReturn(this, (QrcodeModal.__proto__ || Object.getPrototypeOf(QrcodeModal)).call(this, props));

        _this.state = _this._getInitialState();
        _this.onPasswordEnter = _this.onPasswordEnter.bind(_this);
        _this.onKeyDown = _this.onKeyDown.bind(_this);
        _this.onCancel = _this.onCancel.bind(_this);
        _this.onClose = _this.onClose.bind(_this);
        return _this;
    }

    _createClass(QrcodeModal, [{
        key: "_getInitialState",
        value: function _getInitialState() {
            return {
                isShowQrcode: false,
                keyString: null
            };
        }
    }, {
        key: "show",
        value: function show() {
            foundation_api_default.a.publish(this.props.modalId, "open");
        }
    }, {
        key: "onCancel",
        value: function onCancel() {
            foundation_api_default.a.publish(this.props.modalId, "close");
            this.onClose();
        }
    }, {
        key: "onClose",
        value: function onClose() {
            if (this.refs.password_input) this.refs.password_input.value = "";
            this.setState(this._getInitialState());
        }
    }, {
        key: "onPasswordEnter",
        value: function onPasswordEnter(e) {
            e.preventDefault();
            var pwd = this.refs.password_input.value;
            var key = this.props.keyValue;
            if (pwd != null && pwd != "") {
                if (key !== undefined && key != null && key != "") {
                    var pwd_aes = es["a" /* Aes */].fromSeed(pwd);
                    var qrkey = pwd_aes.encryptToHex(key);
                    this.setState({ isShowQrcode: true, keyString: qrkey });
                }
            } else {
                //notify.error("You'd better enter a password to encrypt the qr code");
                this.setState({ isShowQrcode: true, keyString: key });
            }
        }
    }, {
        key: "onKeyDown",
        value: function onKeyDown(e) {
            if (e.keyCode === 13) this.onPasswordEnter(e);
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var pos = null;
            if (this.state.isShowQrcode) pos = { textAlign: "center" };
            return react_default.a.createElement(
                BaseModal["a" /* default */],
                { onClose: this.onClose, id: this.props.modalId, ref: "modal", overlay: true, overlayClose: false },
                react_default.a.createElement(
                    "div",
                    { className: "text-center" },
                    react_default.a.createElement(
                        "div",
                        { style: { margin: "1.5rem 0" } },
                        react_default.a.createElement(react_translate_component_default.a, { component: "h4", content: "modal.qrcode.title" })
                    ),
                    react_default.a.createElement(
                        "form",
                        { className: "full-width", style: { margin: "0 3.5rem" }, onSubmit: this.onPasswordEnter, noValidate: true },
                        react_default.a.createElement(
                            "div",
                            { className: "form-group" },
                            this.state.isShowQrcode ? react_default.a.createElement(
                                "section",
                                { style: pos },
                                react_default.a.createElement(
                                    "span",
                                    { style: { background: "#fff", padding: ".75rem", display: "inline-block" } },
                                    react_default.a.createElement(lib_default.a, { size: 256, value: this.state.keyString })
                                )
                            ) : react_default.a.createElement(
                                "section",
                                null,
                                react_default.a.createElement(
                                    "label",
                                    { className: "left-label" },
                                    react_default.a.createElement(react_translate_component_default.a, { unsafe: true, content: "modal.qrcode.input_message" })
                                ),
                                react_default.a.createElement("input", {
                                    name: "password",
                                    type: "text",
                                    onFocus: function onFocus() {
                                        _this2.refs.password_input.setAttribute("type", "password");
                                    },
                                    ref: "password_input",
                                    autoComplete: "off",
                                    onKeyDown: this.onKeyDown
                                })
                            )
                        ),
                        react_default.a.createElement(
                            "div",
                            { style: pos },
                            react_default.a.createElement(
                                "div",
                                { className: "button-group" },
                                this.state.isShowQrcode == false ? react_default.a.createElement(
                                    "button",
                                    { className: "button", "data-place": "bottom", "data-html": true, onClick: this.onPasswordEnter },
                                    react_default.a.createElement(react_translate_component_default.a, { content: "modal.ok" })
                                ) : null,
                                react_default.a.createElement(
                                    "button",
                                    { className: "button", "data-place": "bottom", "data-html": true, onClick: this.onCancel },
                                    react_default.a.createElement(react_translate_component_default.a, { content: "cancel" })
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return QrcodeModal;
}(react_default.a.Component);

QrcodeModal_QrcodeModal.propTypes = {
    modalId: react["PropTypes"].string.isRequired,
    keyValue: react["PropTypes"].string
};
QrcodeModal_QrcodeModal.defaultProps = {
    modalId: "qr_code_password_modal"
};
/* harmony default export */ var Modal_QrcodeModal = (QrcodeModal_QrcodeModal);
// CONCATENATED MODULE: ./app/components/PrivateKeyView.jsx
var PrivateKeyView__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function PrivateKeyView__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function PrivateKeyView__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function PrivateKeyView__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var PrivateKeyView_PrivateKeyView = function (_Component) {
    PrivateKeyView__inherits(PrivateKeyView, _Component);

    function PrivateKeyView() {
        PrivateKeyView__classCallCheck(this, PrivateKeyView);

        var _this = PrivateKeyView__possibleConstructorReturn(this, (PrivateKeyView.__proto__ || Object.getPrototypeOf(PrivateKeyView)).call(this));

        _this.state = _this._getInitialState();
        return _this;
    }

    PrivateKeyView__createClass(PrivateKeyView, [{
        key: "_getInitialState",
        value: function _getInitialState() {
            return { wif: null };
        }
    }, {
        key: "reset",
        value: function reset() {
            this.setState(this._getInitialState());
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            var modalId = "key_view_modal" + this.props.pubkey;
            foundation_api_default.a.subscribe(modalId, function (name, msg) {
                if (name !== modalId) return;
                if (msg === "close") _this2.reset();
            });
        }
    }, {
        key: "render",
        value: function render() {
            var modalId = "key_view_modal" + this.props.pubkey;
            var keys = PrivateKeyStore["a" /* default */].getState().keys;

            var has_private = keys.has(this.props.pubkey);
            if (!has_private) return react_default.a.createElement(
                "span",
                null,
                this.props.children
            );
            var key = keys.get(this.props.pubkey);
            return react_default.a.createElement(
                "span",
                null,
                react_default.a.createElement(
                    "a",
                    { onClick: this.onOpen.bind(this) },
                    this.props.children
                ),
                react_default.a.createElement(
                    BaseModal["a" /* default */],
                    { ref: modalId, id: modalId, overlay: true, overlayClose: false },
                    react_default.a.createElement(
                        "h3",
                        null,
                        react_default.a.createElement(react_translate_component_default.a, { content: "account.perm.key_viewer" })
                    ),
                    react_default.a.createElement(
                        "div",
                        { className: "grid-block vertical" },
                        react_default.a.createElement(
                            "div",
                            { className: "content-block" },
                            react_default.a.createElement(
                                "div",
                                { className: "grid-content" },
                                react_default.a.createElement(
                                    "label",
                                    null,
                                    react_default.a.createElement(react_translate_component_default.a, { content: "account.perm.public" })
                                ),
                                this.props.pubkey
                            ),
                            react_default.a.createElement("br", null),
                            react_default.a.createElement(
                                "div",
                                { className: "grid-block grid-content" },
                                react_default.a.createElement(
                                    "label",
                                    null,
                                    react_default.a.createElement(react_translate_component_default.a, { content: "account.perm.private" })
                                ),
                                react_default.a.createElement(
                                    "div",
                                    null,
                                    this.state.wif ? react_default.a.createElement(
                                        "span",
                                        null,
                                        react_default.a.createElement(
                                            "p",
                                            { style: { fontWeight: 600 } },
                                            this.state.wif
                                        ),
                                        react_default.a.createElement(
                                            "div",
                                            { className: "button-group" },
                                            react_default.a.createElement(
                                                "div",
                                                { className: "button", onClick: this.onHide.bind(this) },
                                                "hide"
                                            ),
                                            react_default.a.createElement(
                                                "div",
                                                { className: "clickable", onClick: this.showQrCode.bind(this) },
                                                react_default.a.createElement("img", { style: { height: 50 }, src: __webpack_require__(1668) })
                                            )
                                        )
                                    ) : react_default.a.createElement(
                                        "span",
                                        null,
                                        react_default.a.createElement(
                                            "div",
                                            { className: "button", onClick: this.onShow.bind(this) },
                                            react_default.a.createElement(react_translate_component_default.a, { content: "account.perm.show" })
                                        )
                                    )
                                )
                            ),
                            react_default.a.createElement("br", null),
                            react_default.a.createElement(
                                "div",
                                { className: "grid-block grid-content" },
                                react_default.a.createElement(
                                    "label",
                                    null,
                                    react_default.a.createElement(react_translate_component_default.a, { content: "account.perm.brain" })
                                ),
                                key.brainkey_sequence == null ? "Non-deterministic" : key.brainkey_sequence
                            ),
                            react_default.a.createElement("br", null),
                            key.import_account_names && key.import_account_names.length ? react_default.a.createElement(
                                "div",
                                { className: "grid-block grid-content" },
                                react_default.a.createElement(
                                    "label",
                                    null,
                                    react_default.a.createElement(react_translate_component_default.a, { content: "account.perm.from" })
                                ),
                                key.import_account_names.join(", "),
                                react_default.a.createElement("br", null)
                            ) : null
                        )
                    ),
                    react_default.a.createElement(
                        "div",
                        { className: "button-group" },
                        react_default.a.createElement(
                            "div",
                            { onClick: this.onClose.bind(this), className: " button" },
                            react_default.a.createElement(react_translate_component_default.a, { content: "transfer.close" })
                        )
                    )
                ),
                react_default.a.createElement(Modal_QrcodeModal, { ref: "qrmodal", keyValue: this.state.wif })
            );
        }
    }, {
        key: "onOpen",
        value: function onOpen() {
            var modalId = "key_view_modal" + this.props.pubkey;
            foundation_api_default.a.publish(modalId, "open");
        }
    }, {
        key: "onClose",
        value: function onClose() {
            this.reset();
            var modalId = "key_view_modal" + this.props.pubkey;
            foundation_api_default.a.publish(modalId, "close");
        }
    }, {
        key: "onShow",
        value: function onShow() {
            var _this3 = this;

            WalletUnlockActions["a" /* default */].unlock().then(function () {
                var private_key = WalletDb["a" /* default */].getPrivateKey(_this3.props.pubkey);
                _this3.setState({ wif: private_key.toWif() });
            });
        }
    }, {
        key: "onHide",
        value: function onHide() {
            this.setState({ wif: null });
        }
    }, {
        key: "showQrCode",
        value: function showQrCode() {
            this.refs.qrmodal.show();
        }
    }]);

    return PrivateKeyView;
}(react["Component"]);

PrivateKeyView_PrivateKeyView.propTypes = {
    pubkey: react_default.a.PropTypes.string.isRequired
};
/* harmony default export */ var components_PrivateKeyView = __webpack_exports__["a"] = (PrivateKeyView_PrivateKeyView);

/***/ }),

/***/ 1668:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 1669:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_translate_component__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_translate_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_translate_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_components_PrivateKeyView__ = __webpack_require__(1646);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_seerjs_es__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Icon_Icon__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_stores_PrivateKeyStore__ = __webpack_require__(82);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









/**
 * @brief Allows the user to enter a public key
 */

var PubKeyInput = function (_React$Component) {
    _inherits(PubKeyInput, _React$Component);

    function PubKeyInput(props) {
        _classCallCheck(this, PubKeyInput);

        return _possibleConstructorReturn(this, (PubKeyInput.__proto__ || Object.getPrototypeOf(PubKeyInput)).call(this, props));
    }

    _createClass(PubKeyInput, [{
        key: "isValidPubKey",
        value: function isValidPubKey(value) {
            return !!__WEBPACK_IMPORTED_MODULE_4_seerjs_es__["i" /* PublicKey */].fromPublicKeyString(value);
        }
    }, {
        key: "onInputChanged",
        value: function onInputChanged(event) {
            var value = event.target.value.trim();
            this.props.onChange(value);
        }
    }, {
        key: "onKeyDown",
        value: function onKeyDown(event) {
            if (event.keyCode === 13) this.onAction(event);
        }
    }, {
        key: "onAction",
        value: function onAction(event) {
            event.preventDefault();
            if (this.props.onAction && this.state.valid && !this.props.disableActionButton) {
                this.props.onAction(event);
            }
        }
    }, {
        key: "render",
        value: function render() {
            var error = this.props.error;
            if (!error && this.props.value && !this.isValidPubKey(this.props.value)) error = "Not a valid public key";
            var action_class = __WEBPACK_IMPORTED_MODULE_1_classnames___default()("button", { "disabled": error || this.props.disableActionButton });
            var keys = __WEBPACK_IMPORTED_MODULE_6_stores_PrivateKeyStore__["a" /* default */].getState().keys;
            var has_private = this.isValidPubKey(this.props.value) && keys.has(this.props.value);

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "pubkey-input no-overflow" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "content-area" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "header-area" },
                        !error && this.props.value && this.isValidPubKey(this.props.value) ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "label",
                            { className: "right-label" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_translate_component___default.a, { content: "account.perm.valid_pub" })
                        ) : null,
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_translate_component___default.a, { className: "left-label", component: "label", content: this.props.label })
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "input-area" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "span",
                            { className: "inline-label" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { className: "account-image" },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    __WEBPACK_IMPORTED_MODULE_3_components_PrivateKeyView__["a" /* default */],
                                    { pubkey: this.props.value },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__Icon_Icon__["a" /* default */], { name: "key", size: "4x" })
                                )
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "text",
                                className: has_private ? "my-key" : "",
                                value: this.props.value,
                                placeholder: this.props.placeholder || counterpart.translate("account.public_key"),
                                ref: "user_input",
                                onChange: this.onInputChanged.bind(this),
                                onKeyDown: this.onKeyDown.bind(this),
                                tabIndex: this.props.tabIndex
                            }),
                            this.props.onAction ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "button",
                                { className: action_class,
                                    onClick: this.onAction.bind(this) },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_translate_component___default.a, { content: this.props.action_label })
                            ) : null
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "error-area has-error" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "span",
                            null,
                            error
                        )
                    )
                )
            );
        }
    }]);

    return PubKeyInput;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

PubKeyInput.propTypes = {
    label: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.string.isRequired, // a translation key for the label
    value: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.string, // current value
    error: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.string, // the error message override
    placeholder: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.string, // the placeholder text to be displayed when there is no user_input
    onChange: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.func, // a method to be called any time user input changes
    onAction: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.func, // a method called when Add button is clicked
    tabIndex: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.number, // tabindex property to be passed to input tag
    disableActionButton: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.bool // use it if you need to disable action button
};

/* harmony default export */ __webpack_exports__["a"] = (PubKeyInput);

/***/ }),

/***/ 1942:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/react/react.js
var react = __webpack_require__(1);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-translate-component/index.js
var react_translate_component = __webpack_require__(5);
var react_translate_component_default = /*#__PURE__*/__webpack_require__.n(react_translate_component);

// EXTERNAL MODULE: ./app/components/Forms/PubKeyInput.jsx
var PubKeyInput = __webpack_require__(1669);

// EXTERNAL MODULE: ./app/components/Utility/ChainTypes.js
var ChainTypes = __webpack_require__(33);

// EXTERNAL MODULE: ./app/components/Utility/BindToChainState.jsx
var BindToChainState = __webpack_require__(32);

// EXTERNAL MODULE: ./app/components/Utility/Tabs.jsx
var Tabs = __webpack_require__(1541);

// EXTERNAL MODULE: ./node_modules/counterpart/index.js
var counterpart = __webpack_require__(3);
var counterpart_default = /*#__PURE__*/__webpack_require__.n(counterpart);

// EXTERNAL MODULE: ./app/alt-instance.js
var alt_instance = __webpack_require__(9);

// EXTERNAL MODULE: ./node_modules/seerjs/es/index.js + 7 modules
var es = __webpack_require__(6);

// EXTERNAL MODULE: ./app/actions/WalletUnlockActions.js
var WalletUnlockActions = __webpack_require__(69);

// EXTERNAL MODULE: ./app/stores/WalletDb.js
var WalletDb = __webpack_require__(26);

// CONCATENATED MODULE: ./app/actions/SignedMessageAction.js
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }







var MSG_HEAD = "-----BEGIN BITSHARES SIGNED MESSAGE-----";
var MSG_META = "-----BEGIN META-----";
var MSG_SIGNATURE = "-----BEGIN SIGNATURE-----";
var MSG_FOOT = "-----END BITSHARES SIGNED MESSAGE-----";
var MSG_SENDER = "account";
var MSG_PUBLICKEY = "memokey";
var MSG_BLOCK = "block";
var MSG_DATE = "timestamp";

/** This action provides following functionalities:
 *    - Sign a message
 *    - Verify a given message
 *
 *  The message format that is underlying is as follows:
 *  -----BEGIN BITSHARES SIGNED MESSAGE-----
 *  <message from the account>
 *  -----BEGIN META-----
 *  account=<account name>
 *  memokey=<account memo public key>
 *  block=<last irreversible block>
 *  timestamp=<current time>
 *  -----BEGIN SIGNATURE-----
 *  <signature>
 *  -----END BITSHARES SIGNED MESSAGE-----
 *
 *    @author Stefan Schiessl <stefan.schiessl@blockchainprojectsbv.com>
 */

var SignedMessageAction_SignedMessageAction = function () {
    function SignedMessageAction() {
        _classCallCheck(this, SignedMessageAction);
    }

    _createClass(SignedMessageAction, [{
        key: "parseMessage",


        /**
         * Parses the given raw string to a processing friendly dictionary
         *
         * @param message Message as raw string, properly formatted with head/meta/signature/footer
         *
         * @returns {*} parsed message as dictionary with the following fields:
         *              content : User message of the message
         *              meta : Dictionary with the meta data
         *                      account : Account name of the signer
         *                      key : Memo public key of the signer
         *                      block : Current last irreversible block of the bitShares blockchain
         *                      timestamp : Time the message was signed in UTC format
         *              signed : Seperate string that contains all data that will be signed (content + meta)
         *              signature : Signature of the signed data
         */
        value: function parseMessage(message) {
            var messageContent = void 0,
                messageMeta = void 0,
                messageSignature = void 0,
                messageSignedContent = void 0;
            try {
                // cut the sections
                messageContent = message.split(MSG_HEAD)[1]; // everything before the head is ignored
                messageMeta = messageContent.split(MSG_META);
                messageContent = messageMeta[0].replace(/^\n|\n$/g, "");
                messageSignature = messageMeta[1].split(MSG_SIGNATURE);
                messageMeta = messageSignature[0].trim();
                messageSignature = messageSignature[1].split(MSG_FOOT)[0].trim(); // everything after footer is ignored

                // how the signed content it built is crucial, consider encapsulating
                messageSignedContent = messageContent + "\n" + messageMeta;
            } catch (err) {
                throw new Error(counterpart_default.a.translate("account.signedmessages.invalidformat"));
            }

            var messageMetaAccount = void 0,
                messageMetaKey = void 0,
                messageMetaBlock = void 0,
                messageMetaTimestamp = void 0;
            if (messageMeta) {
                try {
                    // process meta
                    // ... sender
                    messageMetaAccount = messageMeta.split(MSG_SENDER + "=");
                    messageMetaAccount = messageMetaAccount[1].split("\n")[0].trim();

                    // ... and its public key
                    messageMetaKey = messageMeta.split(MSG_PUBLICKEY + "=");
                    messageMetaKey = messageMetaKey[1].split("\n")[0].trim();

                    // ... block number
                    messageMetaBlock = messageMeta.split(MSG_BLOCK + "=");
                    messageMetaBlock = messageMetaBlock[1].split("\n")[0].trim();

                    // ... time stamp
                    messageMetaTimestamp = messageMeta.split(MSG_DATE + "=");
                    messageMetaTimestamp = messageMetaTimestamp[1].split("\n")[0].trim();
                } catch (err) {
                    throw new Error(counterpart_default.a.translate("account.signedmessages.invalidformat"));
                }
            }

            return { content: messageContent,
                meta: { account: messageMetaAccount, key: messageMetaKey, block: messageMetaBlock, timestamp: messageMetaTimestamp },
                signed: messageSignedContent,
                signature: messageSignature
            };
        }

        /**
         * The given string message is parsed and then its signature verified. A positive verification return the parsed
         * message, anything else throws an exeption.
         *
         * @param message Message as raw string, properly formatted with head/meta/signature/footer, or already parsed message
         *
         * @returns parsed message, see parseMessage
         */

    }, {
        key: "verifyMemo",
        value: function verifyMemo(message) {
            var message_signed = void 0;
            if (typeof message === "string" || message instanceof String) {
                message_signed = this.parseMessage(message);
            } else {
                // assume its a dictionary
                message_signed = message;
            }

            // validate account and key
            var storedAccount = es["b" /* ChainStore */].getAccount(message_signed.meta.account);
            if (storedAccount == null) {
                throw new Error(counterpart_default.a.translate("account.signedmessages.invaliduser"));
            }

            // verify message signed
            var verified = false;
            try {
                verified = es["k" /* Signature */].fromHex(message_signed.signature).verifyBuffer(message_signed.signed, es["i" /* PublicKey */].fromPublicKeyString(message_signed.meta.key));
            } catch (err) {
                // wrap message that could be raised from Signature
                throw new Error(counterpart_default.a.translate("account.signedmessages.errorverifying"));
            }
            if (!verified) {
                throw new Error(counterpart_default.a.translate("account.signedmessages.invalidsignature"));
            }
            return message_signed;
        }

        /**
         * Given an account and the message text
         * @param account Account that writes the message
         * @param messageText String text of the message
         * @returns {Promise}
         */

    }, {
        key: "signMessage",
        value: function signMessage(account, messageText) {
            return new Promise(function (resolve, reject) {
                // make sure wallet is unlocked (we need private key)
                Promise.resolve(WalletUnlockActions["a" /* default */].unlock()).then(function () {
                    try {
                        // obtain all necessary keys
                        var memo_from_public = account.get("options").get("memo_key");
                        // The 1s are base58 for all zeros (null)
                        if (/111111111111111111111/.test(memo_from_public)) {
                            memo_from_public = null;
                        }
                        var memo_from_privkey = void 0;
                        if (messageText && memo_from_public) {
                            memo_from_privkey = WalletDb["a" /* default */].getPrivateKey(memo_from_public);
                            if (!memo_from_privkey) {
                                throw new Error(counterpart_default.a.translate("account.signedmessages.invalidkey"));
                            }
                        }
                        // get other meta data
                        var irr_block = es["b" /* ChainStore */].getObject("2.1.0").get("last_irreversible_block_num");
                        var now = new Date();

                        var meta = MSG_SENDER + "=" + account.get("name") + "\n" + MSG_PUBLICKEY + "=" + memo_from_public + "\n" + MSG_BLOCK + "=" + irr_block + "\n" + MSG_DATE + "=" + now.toUTCString();

                        var messageContentToBeSigned = messageText + "\n" + meta;

                        setTimeout(function () {
                            // do not block gui
                            try {
                                var memo_signature = es["k" /* Signature */].signBuffer(messageContentToBeSigned, memo_from_privkey, memo_from_public);
                                var memo_formatted = MSG_HEAD + "\n" + messageText + "\n" + MSG_META + "\n" + meta + "\n" + MSG_SIGNATURE + "\n" + memo_signature.toHex() + "\n" + MSG_FOOT;
                                resolve(memo_formatted);
                            } catch (err) {
                                reject(err);
                            }
                        }, 0);
                    } catch (err) {
                        reject(err);
                    }
                });
            });
        }
    }]);

    return SignedMessageAction;
}();

/* harmony default export */ var actions_SignedMessageAction = (alt_instance["a" /* default */].createActions(SignedMessageAction_SignedMessageAction));
// CONCATENATED MODULE: ./app/components/Account/SignedMessage.jsx
var SignedMessage__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function SignedMessage__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







/** This component allows to display and verify a signed message
 *
 *  See SignedMessageAction for details on message format.
 *
 *    @author Stefan Schiessl <stefan.schiessl@blockchainprojectsbv.com>
 */

var SignedMessage_SignedMessage = function (_React$Component) {
    _inherits(SignedMessage, _React$Component);

    function SignedMessage(props) {
        SignedMessage__classCallCheck(this, SignedMessage);

        var _this = _possibleConstructorReturn(this, (SignedMessage.__proto__ || Object.getPrototypeOf(SignedMessage)).call(this, props));

        _this.state = {
            message: _this.props.message,
            messageParsed: null,
            showRawMessage: false,
            //
            noVerification: _this.props.noVerification,
            //
            verified: null,
            //
            notification: null
        };
        return _this;
    }

    // static propTypes = {
    //     signedMessage: PropTypes.string.isRequired
    //    noVerification
    // };

    SignedMessage__createClass(SignedMessage, [{
        key: "_verifyMessage",
        value: function _verifyMessage(signedMessage) {
            var _this2 = this;

            this.setState({
                message: signedMessage,
                messageParsed: null,
                verified: null
            });
            var messageParsed = null;
            try {
                messageParsed = actions_SignedMessageAction.parseMessage(signedMessage);
                this.setState({
                    verified: null,
                    messageParsed: messageParsed
                });

                if (!this.state.noVerification) {
                    this.setState({
                        verified: null,
                        notification: counterpart_default.a.translate("account.signedmessages.verifying")
                    });
                    setTimeout(function () {
                        // do not block gui
                        try {
                            actions_SignedMessageAction.verifyMemo(messageParsed);
                            _this2.setState({
                                verified: true,
                                notification: "" // clear popup
                            });
                        } catch (err) {
                            _this2._warning(err.message);
                            _this2.setState({
                                verified: false
                            });
                        }
                    }, 0);
                }
            } catch (err) {
                this._warning(err.message);
            }
        }
    }, {
        key: "componentWillMount",
        value: function componentWillMount() {
            this._verifyMessage(this.state.message);
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            var signedMessage = nextProps.message;
            if (signedMessage != undefined && signedMessage != null && signedMessage == this.state.message) {
                // already done
                return;
            }
            this._verifyMessage(signedMessage);
        }
    }, {
        key: "_warning",
        value: function _warning(message) {
            this.setState({
                notification: message
            });
        }
    }, {
        key: "_toggleRawMessage",
        value: function _toggleRawMessage() {
            this.setState({
                showRawMessage: !this.state.showRawMessage
            });
        }
    }, {
        key: "render",
        value: function render() {
            var legendMessage = void 0;
            var borderColor = void 0;
            if (this.state.messageParsed != null) {
                if (this.state.verified == null) {
                    borderColor = "#FFF";
                    legendMessage = "Unverified message from " + this.state.messageParsed.meta.account;
                } else if (this.state.verified) {
                    borderColor = "#FFF";
                    legendMessage = "Verified message from " + this.state.messageParsed.meta.account;
                } else {
                    borderColor = "#F00";
                    legendMessage = "Refuted message, indicated sender " + this.state.messageParsed.meta.account;
                }
            }
            var messageGiven = this.props.message != null && this.props.message != "";
            var notificationGiven = this.state.notification && this.state.notification != "";
            return react_default.a.createElement(
                "div",
                { style: { color: "gray", margin: "10px 10px" } },
                this.state.messageParsed != null && react_default.a.createElement(
                    "fieldset",
                    { style: { borderColor: borderColor } },
                    react_default.a.createElement(
                        "legend",
                        { style: { color: "white", weight: "bold" } },
                        legendMessage
                    ),
                    react_default.a.createElement(
                        "pre",
                        { style: { position: "relative", width: "100%", display: "table" } },
                        this.state.messageParsed.content,
                        notificationGiven && react_default.a.createElement(
                            "div",
                            { style: {
                                    textAlign: "center",
                                    display: "table-cell",
                                    verticalAlign: "middle",
                                    position: "absolute",
                                    width: "calc(100% - 30px)",
                                    height: "calc(100% + 15px)",
                                    top: "0px",
                                    right: "30px",
                                    backgroundColor: "rgba(50,50,50,0.5)"
                                }, id: "overlay" },
                            this.state.notification
                        )
                    ),
                    react_default.a.createElement(
                        "span",
                        { style: {
                                fontSize: "small",
                                float: "right"
                            } },
                        "Signed on ",
                        this.state.messageParsed.meta.timestamp,
                        " \xA0",
                        react_default.a.createElement(
                            "button",
                            { className: "button", type: "button", style: {
                                    fontSize: "small",
                                    float: "right",
                                    padding: "0px 0px",
                                    background: "#777"
                                }, onClick: this._toggleRawMessage.bind(this) },
                            "\uD83D\uDD0D"
                        )
                    ),
                    this.state.showRawMessage && react_default.a.createElement("br", null),
                    this.state.showRawMessage && react_default.a.createElement("br", null),
                    this.state.showRawMessage && react_default.a.createElement(
                        "div",
                        { style: { overflow: "auto", width: "calc(100%)", maxWidth: "1000px" } },
                        react_default.a.createElement(
                            "pre",
                            null,
                            this.state.message
                        )
                    )
                ),
                messageGiven && this.state.messageParsed == null && react_default.a.createElement(
                    "fieldset",
                    { style: { borderColor: "#F00" } },
                    react_default.a.createElement(
                        "legend",
                        { style: { color: "red", weight: "bold" }, className: "error" },
                        "Error while parsing message, please check syntax from message below"
                    ),
                    react_default.a.createElement(
                        "pre",
                        null,
                        this.props.message
                    )
                )
            );
        }
    }]);

    return SignedMessage;
}(react_default.a.Component);

SignedMessage_SignedMessage.defaultProps = {
    noVerification: false
};


/* harmony default export */ var Account_SignedMessage = (SignedMessage_SignedMessage);
// CONCATENATED MODULE: ./app/components/Account/AccountSignedMessages.jsx
var AccountSignedMessages__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function AccountSignedMessages__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function AccountSignedMessages__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function AccountSignedMessages__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }











/** This component gives a user interface for signing and verifying messages with the bitShares memo key.
 *  It consists of two tabs:
 *    - Sign message tab (code prefix: tabSM)
 *    - Verify message tab (code prefix: tabVM)
 *
 *  See SignedMessageAction for details on message format.
 *
 *    @author Stefan Schiessl <stefan.schiessl@blockchainprojectsbv.com>
 */

var AccountSignedMessages_AccountSignedMessages = function (_React$Component) {
    AccountSignedMessages__inherits(AccountSignedMessages, _React$Component);

    function AccountSignedMessages(props) {
        AccountSignedMessages__classCallCheck(this, AccountSignedMessages);

        // initialize state (do not use setState method!)
        var _this = AccountSignedMessages__possibleConstructorReturn(this, (AccountSignedMessages.__proto__ || Object.getPrototypeOf(AccountSignedMessages)).call(this, props));

        _this.state = {
            tabsm_memo_key: _this.props.account.get("options").get("memo_key"),
            tabsm_popup: "",
            tabsm_message_text: null,
            tabsm_message_signed: null,
            tabvm_popup: "",
            tabvm_message_signed: null,
            tabvm_verified: null,
            tabvm_message_signed_and_verified: null,
            tabvm_flag_verifyonchange: false
        };
        return _this;
    }

    /**
     * Event when user pushes sign button. Memo message and meta will be signed and displayed
     * in the bottom textarea
     *
     * @param event
     */


    AccountSignedMessages__createClass(AccountSignedMessages, [{
        key: "_tabSMSignAction",
        value: function _tabSMSignAction(event) {
            var _this2 = this;

            event.preventDefault();

            try {
                // validate keys are still the same. Better: make public memokey field uneditable
                var storedKey = this.props.account.get("options").get("memo_key");
                if (this.state.tabsm_memo_key !== storedKey) {
                    throw Error(counterpart_default.a.translate("account.signedmessages.keymismatch"));
                }

                // there should be a message entered
                if (this.state.tabsm_message_text) {
                    this._tabSMPopMessage(counterpart_default.a.translate("account.signedmessages.signing"), 0);
                    actions_SignedMessageAction.signMessage(this.props.account, this.state.tabsm_message_text).then(function (res) {
                        _this2.setState({
                            tabsm_message_signed: res,
                            tabsm_popup: "" // clear loading message
                        });
                    }).catch(function (err) {
                        _this2._tabSMPopMessage(err.message);
                        _this2.setState({
                            tabsm_message_signed: null
                        });
                    });
                }
            } catch (err) {
                this._tabSMPopMessage(err.message);
                this.setState({
                    tabsm_message_signed: null
                });
            }
        }
    }, {
        key: "_tabSMHandleChange",
        value: function _tabSMHandleChange(event) {
            // event for textarea
            this.setState({ tabsm_message_text: event.target.value });
        }
    }, {
        key: "_tabSMHandleChangeKey",
        value: function _tabSMHandleChangeKey(value) {
            // event for textfield of public key
            this.setState({ tabsm_memo_key: value });
        }
    }, {
        key: "_tabSMCopyToClipBoard",
        value: function _tabSMCopyToClipBoard(event) {
            // event when user clicks into the signed message textarea
            if (event.target.value !== "") {
                event.target.focus();
                event.target.select();

                try {
                    var successful = document.execCommand("copy");
                    this._tabSMPopMessage(successful ? counterpart_default.a.translate("account.signedmessages.copysuccessful") : counterpart_default.a.translate("account.signedmessages.copyunsuccessful"));
                } catch (err) {
                    this._tabSMPopMessage(counterpart_default.a.translate("account.signedmessages.copyunsuccessful"));
                }
            }
        }

        /**
         * Displays an information to the user that disappears over time
         *
         * @param message
         * @param timeout
         */

    }, {
        key: "_tabSMPopMessage",
        value: function _tabSMPopMessage(message) {
            var _this3 = this;

            var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;

            this.setState({
                tabsm_popup: message
            });

            if (message !== "" && timeout > 0) {
                setTimeout(function () {
                    _this3.setState({
                        tabsm_popup: ""
                    });
                }, timeout);
            }
        }

        /**
         * Event when the user tries to verify a message, either manual through the button or onChange of the textarea.
         * The message is parsed and verified, the user gets the message restated in the bottom part of the site
         *
         * @param event
         */

    }, {
        key: "_tabVMAction",
        value: function _tabVMAction(event) {
            var _this4 = this;

            event.preventDefault();

            // reset to unverified state
            this.setState({
                tabvm_message_signed_and_verified: null,
                tabvm_verified: false
            });

            // attempt verifying
            if (this.state.tabvm_message_signed) {
                this._tabVMPopMessage(counterpart_default.a.translate("account.signedmessages.verifying"), 0);

                setTimeout(function () {
                    // do not block gui
                    try {
                        var message_signed_and_verified = actions_SignedMessageAction.verifyMemo(_this4.state.tabvm_message_signed);
                        _this4.setState({
                            tabvm_message_signed_and_verified: message_signed_and_verified,
                            tabvm_verified: true,
                            tabvm_popup: "" // clear verifying message
                        });
                    } catch (err) {
                        _this4._tabVMPopMessage(err.message);
                        _this4.setState({
                            tabvm_message_signed_and_verified: null,
                            tabvm_verified: false
                        });
                    }
                }, 0);
            }
        }
    }, {
        key: "_tabVMHandleChange",
        value: function _tabVMHandleChange(event) {
            // onchange event of the input textarea
            this.setState({
                tabvm_message_signed: event.target.value,
                tabvm_verified: false,
                tabvm_message_signed_and_verified: null
            });
            if (this.state.tabvm_flag_verifyonchange) {
                this._tabVMAction(event);
            }
        }

        /**
         * Displays an information to the user that disappears over time
         *
         * @param message
         * @param timeout
         */

    }, {
        key: "_tabVMPopMessage",
        value: function _tabVMPopMessage(message) {
            var _this5 = this;

            var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;

            this.setState({
                tabvm_popup: message
            });

            if (message !== "" && timeout > 0) {
                setTimeout(function () {
                    _this5.setState({
                        tabvm_popup: ""
                    });
                }, timeout);
            }
        }
    }, {
        key: "_tabVMToggleVerifyOnChange",
        value: function _tabVMToggleVerifyOnChange() {
            // event when the user enables / disables verifying while typing
            this.setState({
                tabvm_flag_verifyonchange: !this.state.tabvm_flag_verifyonchange
            });
        }
    }, {
        key: "render",
        value: function render() {
            return react_default.a.createElement(
                "div",
                { className: "grid-content app-tables no-padding", ref: "appTables" },
                react_default.a.createElement(
                    "div",
                    { className: "content-block small-12" },
                    react_default.a.createElement(
                        "div",
                        { className: "tabs-container generic-bordered-box" },
                        react_default.a.createElement(
                            Tabs["b" /* Tabs */],
                            {
                                className: "account-tabs",
                                tabsClass: "account-overview no-padding bordered-header content-block",
                                setting: "accountSignedMessagesTab",
                                contentClass: "grid-content shrink small-vertical medium-horizontal padding",
                                segmented: false
                            },
                            react_default.a.createElement(
                                Tabs["a" /* Tab */],
                                { title: "account.signedmessages.signmessage" },
                                react_default.a.createElement(
                                    "div",
                                    { className: "grid-content", style: { overflowX: "hidden" } },
                                    react_default.a.createElement(
                                        "div",
                                        { className: "content-block no-margin" },
                                        react_default.a.createElement(
                                            "h3",
                                            null,
                                            react_default.a.createElement(react_translate_component_default.a, { content: "account.signedmessages.signmessage" })
                                        )
                                    ),
                                    react_default.a.createElement(PubKeyInput["a" /* default */], {
                                        ref: "memo_key",
                                        value: this.state.tabsm_memo_key,
                                        label: "account.perm.memo_public_key",
                                        placeholder: "Public Key",
                                        tabIndex: 7,
                                        onChange: this._tabSMHandleChangeKey.bind(this),
                                        disableActionButton: true
                                    }),
                                    react_default.a.createElement("br", null),
                                    react_default.a.createElement("textarea", { rows: "10", value: this.state.tabsm_message_text, onChange: this._tabSMHandleChange.bind(this), placeholder: counterpart_default.a.translate("account.signedmessages.entermessage") }),
                                    react_default.a.createElement(
                                        "span",
                                        null,
                                        react_default.a.createElement(
                                            "button",
                                            { className: "button", onClick: this._tabSMSignAction.bind(this) },
                                            react_default.a.createElement(react_translate_component_default.a, { content: "account.signedmessages.sign" })
                                        ),
                                        react_default.a.createElement(
                                            "text",
                                            { style: { color: "gray" } },
                                            this.state.tabsm_popup
                                        )
                                    ),
                                    react_default.a.createElement("br", null),
                                    react_default.a.createElement("br", null),
                                    react_default.a.createElement("textarea", { rows: "14",
                                        value: this.state.tabsm_message_signed,
                                        style: { editable: false },
                                        placeholder: counterpart_default.a.translate("account.signedmessages.automaticcreation"),
                                        onClick: this._tabSMCopyToClipBoard.bind(this) })
                                )
                            ),
                            react_default.a.createElement(
                                Tabs["a" /* Tab */],
                                { title: "account.signedmessages.verifymessage" },
                                react_default.a.createElement(
                                    "div",
                                    { className: "grid-content", style: { overflowX: "hidden" } },
                                    react_default.a.createElement(
                                        "div",
                                        { className: "content-block no-margin" },
                                        react_default.a.createElement(
                                            "h3",
                                            null,
                                            react_default.a.createElement(react_translate_component_default.a, { content: "account.signedmessages.verifymessage" })
                                        ),
                                        react_default.a.createElement(
                                            "div",
                                            { style: { float: "right", marginTop: "0.1em", marginBottom: "0.5em" } },
                                            react_default.a.createElement(
                                                "table",
                                                null,
                                                react_default.a.createElement(
                                                    "tr",
                                                    null,
                                                    react_default.a.createElement(
                                                        "td",
                                                        null,
                                                        react_default.a.createElement(
                                                            "label",
                                                            null,
                                                            react_default.a.createElement(react_translate_component_default.a, { content: "account.signedmessages.verifyonchange" })
                                                        )
                                                    ),
                                                    react_default.a.createElement(
                                                        "td",
                                                        null,
                                                        react_default.a.createElement(
                                                            "div",
                                                            { className: "switch", onClick: this._tabVMToggleVerifyOnChange.bind(this) },
                                                            react_default.a.createElement("input", { type: "checkbox", checked: this.state.tabvm_flag_verifyonchange, value: counterpart_default.a.translate("account.signedmessages.verifyonchange") }),
                                                            react_default.a.createElement("label", null)
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                    ),
                                    react_default.a.createElement("textarea", { rows: "10", value: this.state.tabvm_message_signed, onChange: this._tabVMHandleChange.bind(this), placeholder: counterpart_default.a.translate("account.signedmessages.entermessage") }),
                                    react_default.a.createElement(
                                        "span",
                                        null,
                                        react_default.a.createElement(
                                            "button",
                                            { className: "button", onClick: this._tabVMAction.bind(this) },
                                            react_default.a.createElement(react_translate_component_default.a, { content: "account.signedmessages.verify" })
                                        ),
                                        react_default.a.createElement(
                                            "text",
                                            { style: { color: "gray" } },
                                            this.state.tabvm_popup
                                        ),
                                        this.state.tabvm_verified !== null && react_default.a.createElement(
                                            "div",
                                            { style: { float: "right" } },
                                            "Message is:",
                                            react_default.a.createElement(
                                                "div",
                                                {
                                                    style: { backgroundColor: this.state.tabvm_verified ? "green" : "red" } },
                                                react_default.a.createElement(
                                                    "label",
                                                    null,
                                                    this.state.tabvm_verified ? "verified" : "not verified"
                                                )
                                            )
                                        ),
                                        (this.state.tabvm_verified && this.state.tabvm_message_signed_and_verified !== null || this.state.tabvm_flag_verifyonchange) && react_default.a.createElement(
                                            "div",
                                            null,
                                            react_default.a.createElement("br", null),
                                            react_default.a.createElement(Account_SignedMessage, { message: this.state.tabvm_message_signed })
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return AccountSignedMessages;
}(react_default.a.Component);

AccountSignedMessages_AccountSignedMessages.propTypes = {
    account: ChainTypes["a" /* default */].ChainAccount.isRequired
};

AccountSignedMessages_AccountSignedMessages = Object(BindToChainState["a" /* default */])(AccountSignedMessages_AccountSignedMessages);

/* harmony default export */ var Account_AccountSignedMessages = __webpack_exports__["default"] = (AccountSignedMessages_AccountSignedMessages);

/***/ })

});
//# sourceMappingURL=26.js.map