webpackJsonp([47],{

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

/***/ 1941:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Utility_Tabs__ = __webpack_require__(1541);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chain_account_constants_js__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chain_account_constants_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_chain_account_constants_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Account_AccountSelector__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_immutable__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_immutable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_translate_component__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_translate_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_translate_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Utility_ChainTypes__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Utility_BindToChainState__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Utility_LinkToAccountById__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_api_WalletApi__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_stores_WalletDb_js__ = __webpack_require__(26);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }













var AccountRow = function (_React$Component) {
    _inherits(AccountRow, _React$Component);

    function AccountRow() {
        _classCallCheck(this, AccountRow);

        return _possibleConstructorReturn(this, (AccountRow.__proto__ || Object.getPrototypeOf(AccountRow)).apply(this, arguments));
    }

    _createClass(AccountRow, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                account = _props.account,
                onRemove = _props.onRemove;


            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "tr",
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "td",
                    null,
                    this.props.index
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "td",
                    null,
                    account.get("id")
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "td",
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__Utility_LinkToAccountById__["a" /* default */], { account: account.get("id") })
                ),
                onRemove ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "td",
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "button",
                        { onClick: onRemove.bind(this, account.get("id")), className: "button outline" },
                        "Remove"
                    )
                ) : null
            );
        }
    }]);

    return AccountRow;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

AccountRow.propTypes = {
    account: __WEBPACK_IMPORTED_MODULE_6__Utility_ChainTypes__["a" /* default */].ChainAccount.isRequired
};
AccountRow.defaultProps = {
    tempComponent: "tr"
};

AccountRow = Object(__WEBPACK_IMPORTED_MODULE_7__Utility_BindToChainState__["a" /* default */])(AccountRow);

var AccountList = function (_React$Component2) {
    _inherits(AccountList, _React$Component2);

    function AccountList() {
        _classCallCheck(this, AccountList);

        return _possibleConstructorReturn(this, (AccountList.__proto__ || Object.getPrototypeOf(AccountList)).apply(this, arguments));
    }

    _createClass(AccountList, [{
        key: "_onRemove",
        value: function _onRemove(listing, account, e) {
            if (account) {
                var currentState = this.props.getCurrentState(account);
                var tr = __WEBPACK_IMPORTED_MODULE_9_api_WalletApi__["a" /* default */].new_transaction();
                tr.add_type_operation("account_whitelist", {
                    "fee": {
                        "amount": 0,
                        "asset_id": "1.3.0"
                    },
                    "authorizing_account": this.props.account.get("id"),
                    "account_to_list": account,
                    "new_listing": currentState - __WEBPACK_IMPORTED_MODULE_2_chain_account_constants_js___default.a.account_listing[listing]
                });
                __WEBPACK_IMPORTED_MODULE_10_stores_WalletDb_js__["a" /* default */].process_transaction(tr, null, true);
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var _props2 = this.props,
                removeButton = _props2.removeButton,
                white = _props2.white,
                list = _props2.list;


            var rows = list.map(function (account, index) {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(AccountRow, {
                    key: account,
                    onRemove: removeButton ? _this3._onRemove.bind(_this3, white ? "white_listed" : "black_listed") : null,
                    account: account,
                    index: index + 1
                });
            }).toArray();

            var showHeaders = true;
            if (!rows.length) {
                showHeaders = false;
                rows.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "tr",
                    { key: "empty" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "td",
                        { style: { padding: "1rem 0" }, colSpan: removeButton ? 4 : 3 },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_translate_component___default.a, { content: this.props.emptyText, account: this.props.account.get("name") })
                    )
                ));
            }

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "table",
                { className: "table compact dashboard-table" },
                showHeaders ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "thead",
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "tr",
                        null,
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "th",
                            null,
                            "#"
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "th",
                            null,
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_translate_component___default.a, { content: "account.id" })
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "th",
                            null,
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_translate_component___default.a, { content: "account.name" })
                        ),
                        removeButton ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("th", null) : null
                    )
                ) : null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "tbody",
                    null,
                    rows
                )
            );
        }
    }]);

    return AccountList;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var AccountWhitelist = function (_React$Component3) {
    _inherits(AccountWhitelist, _React$Component3);

    function AccountWhitelist() {
        _classCallCheck(this, AccountWhitelist);

        var _this4 = _possibleConstructorReturn(this, (AccountWhitelist.__proto__ || Object.getPrototypeOf(AccountWhitelist)).call(this));

        _this4.state = {
            accountName: "",
            accountToList: null
        };
        return _this4;
    }

    _createClass(AccountWhitelist, [{
        key: "_getCurrentState",
        value: function _getCurrentState(id) {
            var account = this.props.account;

            var white = account.get("whitelisted_accounts") || __WEBPACK_IMPORTED_MODULE_4_immutable___default.a.List();
            var black = account.get("blacklisted_accounts") || __WEBPACK_IMPORTED_MODULE_4_immutable___default.a.List();
            var current = __WEBPACK_IMPORTED_MODULE_2_chain_account_constants_js___default.a.account_listing.no_listing;

            if (white.includes(id)) {
                current += __WEBPACK_IMPORTED_MODULE_2_chain_account_constants_js___default.a.account_listing.white_listed;
            }

            if (black.includes(id)) {
                current += __WEBPACK_IMPORTED_MODULE_2_chain_account_constants_js___default.a.account_listing.black_listed;
            }

            return current;
        }
    }, {
        key: "_onAdd",
        value: function _onAdd(listing, e) {
            var accountToList = this.state.accountToList;
            var account = this.props.account;


            var currentState = this._getCurrentState(accountToList);

            if (accountToList) {
                var tr = __WEBPACK_IMPORTED_MODULE_9_api_WalletApi__["a" /* default */].new_transaction();
                tr.add_type_operation("account_whitelist", {
                    "fee": {
                        "amount": 0,
                        "asset_id": "1.3.0"
                    },
                    "authorizing_account": account.get("id"),
                    "account_to_list": accountToList,
                    "new_listing": currentState + __WEBPACK_IMPORTED_MODULE_2_chain_account_constants_js___default.a.account_listing[listing]
                });
                __WEBPACK_IMPORTED_MODULE_10_stores_WalletDb_js__["a" /* default */].process_transaction(tr, null, true);
            }
        }
    }, {
        key: "_onAccountFound",
        value: function _onAccountFound(account) {
            console.log("accountFound:", account);
            this.setState({
                accountName: account ? account.get("name") : null,
                accountToList: account ? account.get("id") : null
            });
        }
    }, {
        key: "_onAccountChanged",
        value: function _onAccountChanged(account) {
            console.log("account changed:", account);
            this.setState({
                accountName: account,
                accountToList: null
            });
        }
    }, {
        key: "render",
        value: function render() {
            var account = this.props.account;
            var accountName = this.state.accountName;


            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "grid-content app-tables no-padding", ref: "appTables" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "content-block small-12" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "tabs-container generic-bordered-box" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            __WEBPACK_IMPORTED_MODULE_1__Utility_Tabs__["b" /* Tabs */],
                            {
                                className: "account-tabs",
                                tabsClass: "account-overview no-padding bordered-header content-block",
                                setting: "whitelistTab",
                                contentClass: "grid-content shrink small-vertical medium-horizontal no-padding",
                                segmented: false
                            },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                __WEBPACK_IMPORTED_MODULE_1__Utility_Tabs__["a" /* Tab */],
                                { title: "account.whitelist.title" },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { style: { paddingBottom: "1rem" }, className: "small-12" },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "div",
                                        null,
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(AccountList, {
                                            emptyText: "account.whitelist.empty",
                                            account: account,
                                            getCurrentState: this._getCurrentState.bind(this),
                                            list: account.get("whitelisted_accounts") || __WEBPACK_IMPORTED_MODULE_4_immutable___default.a.List(),
                                            removeButton: true,
                                            white: true
                                        })
                                    ),
                                    !account.get("whitelisted_accounts") ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "p",
                                        { className: "has-error" },
                                        "Please note, whitelisting is not working yet due to unresolved backend issue."
                                    ) : null,
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "div",
                                        { style: { padding: "2rem 0" } },
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__Account_AccountSelector__["a" /* default */], {
                                            label: "account.whitelist.add",
                                            accountName: accountName,
                                            onAccountChanged: this._onAccountFound.bind(this),
                                            onChange: this._onAccountChanged.bind(this),
                                            account: accountName,
                                            tabIndex: 2,
                                            onAction: this._onAdd.bind(this, "white_listed"),
                                            action_label: "account.perm.confirm_add",
                                            white: false
                                        })
                                    )
                                )
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                __WEBPACK_IMPORTED_MODULE_1__Utility_Tabs__["a" /* Tab */],
                                { title: "account.whitelist.black" },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { style: { paddingBottom: "1rem" }, className: "small-12" },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "div",
                                        null,
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(AccountList, {
                                            emptyText: "account.whitelist.empty_black",
                                            account: account,
                                            getCurrentState: this._getCurrentState.bind(this),
                                            list: account.get("blacklisted_accounts"),
                                            removeButton: true
                                        })
                                    ),
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "div",
                                        { style: { padding: "2rem 1rem" } },
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__Account_AccountSelector__["a" /* default */], {
                                            label: "account.whitelist.add_black",
                                            accountName: accountName,
                                            onAccountChanged: this._onAccountFound.bind(this),
                                            onChange: this._onAccountChanged.bind(this),
                                            account: accountName,
                                            tabIndex: 2,
                                            onAction: this._onAdd.bind(this, "black_listed"),
                                            action_label: "account.perm.confirm_add"
                                        })
                                    )
                                )
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                __WEBPACK_IMPORTED_MODULE_1__Utility_Tabs__["a" /* Tab */],
                                { title: "account.whitelist.white_by" },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { style: { paddingBottom: "1rem" }, className: "small-12" },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "div",
                                        null,
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(AccountList, {
                                            emptyText: "account.whitelist.empty_white_by",
                                            account: account,
                                            list: account.get("whitelisting_accounts")
                                        })
                                    )
                                )
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                __WEBPACK_IMPORTED_MODULE_1__Utility_Tabs__["a" /* Tab */],
                                { title: "account.whitelist.black_by" },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { style: { paddingBottom: "1rem" }, className: "small-12" },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "div",
                                        null,
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(AccountList, {
                                            emptyText: "account.whitelist.empty_black_by",
                                            account: account,
                                            list: account.get("blacklisting_accounts")
                                        })
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return AccountWhitelist;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (AccountWhitelist);

/***/ })

});
//# sourceMappingURL=47.js.map