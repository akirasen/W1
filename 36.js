webpackJsonp([36,42],{

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

/***/ 1915:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/react/react.js
var react = __webpack_require__(1);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./app/stores/AccountStore.js
var AccountStore = __webpack_require__(49);

// EXTERNAL MODULE: ./node_modules/alt-container/lib/AltContainer.js
var AltContainer = __webpack_require__(108);
var AltContainer_default = /*#__PURE__*/__webpack_require__.n(AltContainer);

// EXTERNAL MODULE: ./node_modules/react-router/es/index.js + 32 modules
var es = __webpack_require__(34);

// EXTERNAL MODULE: ./node_modules/immutable/dist/immutable.js
var immutable = __webpack_require__(20);
var immutable_default = /*#__PURE__*/__webpack_require__.n(immutable);

// EXTERNAL MODULE: ./node_modules/react-translate-component/index.js
var react_translate_component = __webpack_require__(5);
var react_translate_component_default = /*#__PURE__*/__webpack_require__.n(react_translate_component);

// EXTERNAL MODULE: ./app/actions/AccountActions.js + 1 modules
var AccountActions = __webpack_require__(89);

// EXTERNAL MODULE: ./node_modules/lodash/index.js
var lodash = __webpack_require__(106);
var lodash_default = /*#__PURE__*/__webpack_require__.n(lodash);

// EXTERNAL MODULE: ./app/components/Utility/ChainTypes.js
var ChainTypes = __webpack_require__(33);

// EXTERNAL MODULE: ./app/components/Icon/Icon.jsx
var Icon = __webpack_require__(59);

// EXTERNAL MODULE: ./app/components/Utility/BindToChainState.jsx
var BindToChainState = __webpack_require__(32);

// EXTERNAL MODULE: ./app/components/Utility/BalanceComponent.jsx
var BalanceComponent = __webpack_require__(690);

// EXTERNAL MODULE: ./node_modules/alt-react/lib/index.js
var lib = __webpack_require__(29);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// CONCATENATED MODULE: ./app/components/Explorer/Accounts.jsx
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }















var Accounts_AccountRow = function (_React$Component) {
    _inherits(AccountRow, _React$Component);

    function AccountRow() {
        _classCallCheck(this, AccountRow);

        return _possibleConstructorReturn(this, (AccountRow.__proto__ || Object.getPrototypeOf(AccountRow)).apply(this, arguments));
    }

    _createClass(AccountRow, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps) {
            return nextProps.linkedAccounts !== this.props.linkedAccounts || nextProps.account !== this.props.account;
        }
    }, {
        key: "_onLinkAccount",
        value: function _onLinkAccount(account, e) {
            e.preventDefault();
            AccountActions["a" /* default */].linkAccount(account);
        }
    }, {
        key: "_onUnLinkAccount",
        value: function _onUnLinkAccount(account, e) {
            e.preventDefault();
            AccountActions["a" /* default */].unlinkAccount(account);
        }
    }, {
        key: "render",
        value: function render() {
            var _props = this.props,
                account = _props.account,
                linkedAccounts = _props.linkedAccounts;


            var balance = account.getIn(["balances", "1.3.0"]) || null;
            var accountName = account.get("name");

            return react_default.a.createElement(
                "tr",
                { key: account.get("id") },
                react_default.a.createElement(
                    "td",
                    null,
                    account.get("id")
                ),
                linkedAccounts.has(accountName) ? react_default.a.createElement(
                    "td",
                    { onClick: this._onUnLinkAccount.bind(this, accountName) },
                    react_default.a.createElement(Icon["a" /* default */], { name: "minus-circle" })
                ) : react_default.a.createElement(
                    "td",
                    { onClick: this._onLinkAccount.bind(this, accountName) },
                    react_default.a.createElement(Icon["a" /* default */], { name: "plus-circle" })
                ),
                react_default.a.createElement(
                    "td",
                    null,
                    react_default.a.createElement(
                        es["b" /* Link */],
                        { to: "/account/" + accountName + "/overview" },
                        accountName
                    )
                ),
                react_default.a.createElement(
                    "td",
                    null,
                    !balance ? "n/a" : react_default.a.createElement(BalanceComponent["a" /* default */], { balance: balance })
                ),
                react_default.a.createElement(
                    "td",
                    null,
                    !balance ? "n/a" : react_default.a.createElement(BalanceComponent["a" /* default */], { balance: balance, asPercentage: true })
                )
            );
        }
    }]);

    return AccountRow;
}(react_default.a.Component);

Accounts_AccountRow.propTypes = {
    account: ChainTypes["a" /* default */].ChainAccount.isRequired
};
Accounts_AccountRow.defaultProps = {
    tempComponent: "tr",
    autosubscribe: false
};

Accounts_AccountRow = Object(BindToChainState["a" /* default */])(Accounts_AccountRow);

var Accounts_AccountRowWrapper = function AccountRowWrapper(props) {
    return react_default.a.createElement(Accounts_AccountRow, props);
};

Accounts_AccountRowWrapper = Object(lib["connect"])(Accounts_AccountRowWrapper, {
    listenTo: function listenTo() {
        return [AccountStore["a" /* default */]];
    },
    getProps: function getProps() {
        return {
            linkedAccounts: AccountStore["a" /* default */].getState().linkedAccounts
        };
    }
});

var Accounts_Accounts = function (_React$Component2) {
    _inherits(Accounts, _React$Component2);

    function Accounts(props) {
        _classCallCheck(this, Accounts);

        var _this2 = _possibleConstructorReturn(this, (Accounts.__proto__ || Object.getPrototypeOf(Accounts)).call(this));

        _this2.state = {
            searchTerm: props.searchTerm
        };

        _this2._searchAccounts = Object(lodash["debounce"])(_this2._searchAccounts, 200);
        return _this2;
    }

    _createClass(Accounts, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState) {
            return !immutable_default.a.is(nextProps.searchAccounts, this.props.searchAccounts) || nextState.searchTerm !== this.state.searchTerm;
        }
    }, {
        key: "_onSearchChange",
        value: function _onSearchChange(e) {
            this.setState({ searchTerm: e.target.value.toLowerCase() });
            this._searchAccounts(e.target.value);
        }
    }, {
        key: "_searchAccounts",
        value: function _searchAccounts(searchTerm) {
            AccountActions["a" /* default */].accountSearch(searchTerm);
        }
    }, {
        key: "render",
        value: function render() {
            var searchAccounts = this.props.searchAccounts;
            var searchTerm = this.state.searchTerm;

            var accountRows = null;

            if (searchAccounts.size > 0 && searchTerm && searchTerm.length > 0) {
                accountRows = searchAccounts.filter(function (a) {
                    return a.indexOf(searchTerm) !== -1;
                }).sort(function (a, b) {
                    if (a > b) {
                        return 1;
                    } else if (a < b) {
                        return -1;
                    } else {
                        return 0;
                    }
                }).map(function (account, id) {
                    return react_default.a.createElement(Accounts_AccountRowWrapper, { key: id, account: account });
                }).toArray();
            }

            return react_default.a.createElement(
                "div",
                { className: "grid-block" },
                react_default.a.createElement(
                    "div",
                    { className: "grid-block vertical medium-6 medium-offset-3" },
                    react_default.a.createElement(
                        "div",
                        { className: "grid-content shrink" },
                        react_default.a.createElement(react_translate_component_default.a, { component: "h3", content: "explorer.accounts.title" }),
                        react_default.a.createElement("input", { type: "text", value: this.state.searchTerm, onChange: this._onSearchChange.bind(this) })
                    ),
                    react_default.a.createElement(
                        "div",
                        { className: "grid-content" },
                        react_default.a.createElement(
                            "table",
                            { className: "table" },
                            react_default.a.createElement(
                                "thead",
                                null,
                                react_default.a.createElement(
                                    "tr",
                                    null,
                                    react_default.a.createElement(
                                        "th",
                                        null,
                                        react_default.a.createElement(react_translate_component_default.a, { component: "span", content: "explorer.assets.id" })
                                    ),
                                    react_default.a.createElement(
                                        "th",
                                        null,
                                        react_default.a.createElement(Icon["a" /* default */], { name: "user" })
                                    ),
                                    react_default.a.createElement(
                                        "th",
                                        null,
                                        react_default.a.createElement(react_translate_component_default.a, { component: "span", content: "account.name" })
                                    ),
                                    react_default.a.createElement(
                                        "th",
                                        null,
                                        react_default.a.createElement(react_translate_component_default.a, { component: "span", content: "gateway.balance" })
                                    ),
                                    react_default.a.createElement(
                                        "th",
                                        null,
                                        react_default.a.createElement(react_translate_component_default.a, { component: "span", content: "account.percent" })
                                    )
                                )
                            ),
                            react_default.a.createElement(
                                "tbody",
                                null,
                                accountRows
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Accounts;
}(react_default.a.Component);

Accounts_Accounts.defaultProps = {
    searchAccounts: {}
};

Accounts_Accounts.propTypes = {
    searchAccounts: react["PropTypes"].object.isRequired
};

/* harmony default export */ var Explorer_Accounts = (Accounts_Accounts);
// EXTERNAL MODULE: ./app/components/Explorer/Explorer.jsx
var Explorer = __webpack_require__(50);

// CONCATENATED MODULE: ./app/components/Explorer/AccountsContainer.jsx
var AccountsContainer__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function AccountsContainer__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function AccountsContainer__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function AccountsContainer__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var AccountsContainer_AccountsContainer = function (_React$Component) {
    AccountsContainer__inherits(AccountsContainer, _React$Component);

    function AccountsContainer() {
        AccountsContainer__classCallCheck(this, AccountsContainer);

        return AccountsContainer__possibleConstructorReturn(this, (AccountsContainer.__proto__ || Object.getPrototypeOf(AccountsContainer)).apply(this, arguments));
    }

    AccountsContainer__createClass(AccountsContainer, [{
        key: "render",
        value: function render() {
            var content = react_default.a.createElement(
                AltContainer_default.a,
                {
                    stores: [AccountStore["a" /* default */]],
                    inject: {
                        searchAccounts: function searchAccounts() {
                            return AccountStore["a" /* default */].getState().searchAccounts;
                        },
                        searchTerm: function searchTerm() {
                            return AccountStore["a" /* default */].getState().searchTerm;
                        }
                    }
                },
                react_default.a.createElement(Explorer_Accounts, null)
            );

            return react_default.a.createElement(Explorer["default"], { tab: "accounts", content: content });
        }
    }]);

    return AccountsContainer;
}(react_default.a.Component);

/* harmony default export */ var Explorer_AccountsContainer = __webpack_exports__["default"] = (AccountsContainer_AccountsContainer);

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Utility_Tabs__ = __webpack_require__(1541);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var Explorer = function (_React$Component) {
    _inherits(Explorer, _React$Component);

    function Explorer(props) {
        _classCallCheck(this, Explorer);

        var _this = _possibleConstructorReturn(this, (Explorer.__proto__ || Object.getPrototypeOf(Explorer)).call(this, props));

        _this.state = {
            "tabs": [{ name: "blocks", link: "/explorer/blocks", "translate": "explorer.blocks.title" }, { name: "assets", link: "/explorer/assets", "translate": "explorer.assets.title" }, { name: "accounts", link: "/explorer/accounts", "translate": "explorer.accounts.title" }, { name: "witnesses", link: "/explorer/witnesses", "translate": "explorer.witnesses.title" }, { name: "committee_members", link: "/explorer/committee-members", "translate": "explorer.committee_members.title" }, { name: "markets", link: "/explorer/markets", "translate": "markets.title" }, { name: "fees", link: "/explorer/fees", "translate": "fees.title" }, { name: "oracles", link: "/explorer/oracles", "translate": "seer.oracle.title" }]
        };
        return _this;
    }

    _createClass(Explorer, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var defaultActiveTab = this.state.tabs.findIndex(function (t) {
                return t.name === _this2.props.tab;
            });

            var tabs = [];

            for (var i = 0; i < this.state.tabs.length; i++) {
                var currentTab = this.state.tabs[i];

                var tabContent = defaultActiveTab == i ? this.props.content : null;
                var isLinkTo = defaultActiveTab == i ? "" : currentTab.link;

                tabs.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_1__Utility_Tabs__["a" /* Tab */],
                    { key: i, title: currentTab.translate, isLinkTo: isLinkTo },
                    tabContent
                ));
            }

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_1__Utility_Tabs__["b" /* Tabs */],
                { defaultActiveTab: defaultActiveTab, segmented: false, setting: "explorerTab-{this.props.tab}", className: "account-tabs", tabsClass: "account-overview bordered-header content-block", contentClass: "tab-content padding" },
                tabs
            );
        }
    }]);

    return Explorer;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Explorer.propTypes = {
    tab: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.string,
    content: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.object
};
Explorer.defaultProps = {
    tab: "blocks",
    content: null
};


/* harmony default export */ __webpack_exports__["default"] = (Explorer);

/***/ })

});
//# sourceMappingURL=36.js.map