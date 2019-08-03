webpackJsonp([37],{

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

/***/ 1595:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EquivalentValueComponent; });
/* unused harmony export BalanceValueComponent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FormattedAsset__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ChainTypes__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__BindToChainState__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_common_utils__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_alt_react__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_alt_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_alt_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_stores_MarketsStore__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_translate_component__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_translate_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_translate_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_counterpart__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_counterpart___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_counterpart__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react_tooltip__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_react_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Utility_EquivalentPrice__ = __webpack_require__(698);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }













/**
 *  Given an asset amount, displays the equivalent value in baseAsset if possible
 *
 *  Expects three properties
 *  -'toAsset' which should be a asset id
 *  -'fromAsset' which is the asset id of the original asset amount
 *  -'amount' which is the amount to convert
 *  -'fullPrecision' boolean to tell if the amount uses the full precision of the asset
 */

var ValueComponent = function (_MarketStatsCheck) {
    _inherits(ValueComponent, _MarketStatsCheck);

    function ValueComponent(props) {
        _classCallCheck(this, ValueComponent);

        return _possibleConstructorReturn(this, (ValueComponent.__proto__ || Object.getPrototypeOf(ValueComponent)).call(this, props));
    }

    _createClass(ValueComponent, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            __WEBPACK_IMPORTED_MODULE_9_react_tooltip___default.a.rebuild();
        }
    }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(np) {
            return _get(ValueComponent.prototype.__proto__ || Object.getPrototypeOf(ValueComponent.prototype), "shouldComponentUpdate", this).call(this, np) || np.toAsset !== this.props.toAsset || np.fromAsset !== this.props.fromAsset || np.amount !== this.props.amount;
        }
    }, {
        key: "getValue",
        value: function getValue() {
            var _props = this.props,
                amount = _props.amount,
                toAsset = _props.toAsset,
                fromAsset = _props.fromAsset,
                fullPrecision = _props.fullPrecision,
                marketStats = _props.marketStats,
                coreAsset = _props.coreAsset;

            var toStats = void 0,
                fromStats = void 0;

            var toID = toAsset.get("id");
            var toSymbol = toAsset.get("symbol");
            var fromID = fromAsset.get("id");
            var fromSymbol = fromAsset.get("symbol");

            if (!fullPrecision) {
                amount = __WEBPACK_IMPORTED_MODULE_4_common_utils__["a" /* default */].get_asset_amount(amount, fromAsset);
            }

            if (coreAsset && marketStats) {
                var coreSymbol = coreAsset.get("symbol");
                toStats = marketStats.get(toSymbol + "_" + coreSymbol);
                fromStats = marketStats.get(fromSymbol + "_" + coreSymbol);
            }

            var price = __WEBPACK_IMPORTED_MODULE_4_common_utils__["a" /* default */].convertPrice(fromStats && fromStats.close ? fromStats.close : fromID === "1.3.0" || fromAsset.has("bitasset") ? fromAsset : null, toStats && toStats.close ? toStats.close : toID === "1.3.0" || toAsset.has("bitasset") ? toAsset : null, fromID, toID);

            var eqValue = price ? __WEBPACK_IMPORTED_MODULE_4_common_utils__["a" /* default */].convertValue(price, amount, fromAsset, toAsset) : null;
            return eqValue;
        }
    }, {
        key: "render",
        value: function render() {
            var _props2 = this.props,
                amount = _props2.amount,
                toAsset = _props2.toAsset,
                fromAsset = _props2.fromAsset,
                fullPrecision = _props2.fullPrecision;


            var toID = toAsset.get("id");
            var toSymbol = toAsset.get("symbol");

            if (!fullPrecision) {
                amount = __WEBPACK_IMPORTED_MODULE_4_common_utils__["a" /* default */].get_asset_amount(amount, fromAsset);
            }

            var eqValue = this.getValue();

            if (!eqValue && eqValue !== 0) {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "tooltip inline-block", "data-place": "bottom", "data-tip": __WEBPACK_IMPORTED_MODULE_8_counterpart___default.a.translate("tooltip.no_price"), style: { fontSize: "0.9rem" } },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_translate_component___default.a, { content: "account.no_price" })
                );
            }

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__FormattedAsset__["a" /* default */], { hide_asset: this.props.hide_asset, noPrefix: true, amount: eqValue, asset: toID, decimalOffset: toSymbol.indexOf("BTC") !== -1 ? 4 : this.props.fullDecimals ? 0 : this.props.noDecimals ? toAsset.get("precision") : toAsset.get("precision") - 2 });
        }
    }]);

    return ValueComponent;
}(__WEBPACK_IMPORTED_MODULE_10__Utility_EquivalentPrice__["a" /* MarketStatsCheck */]);

ValueComponent.propTypes = {
    toAsset: __WEBPACK_IMPORTED_MODULE_2__ChainTypes__["a" /* default */].ChainAsset.isRequired,
    fromAsset: __WEBPACK_IMPORTED_MODULE_2__ChainTypes__["a" /* default */].ChainAsset.isRequired,
    coreAsset: __WEBPACK_IMPORTED_MODULE_2__ChainTypes__["a" /* default */].ChainAsset.isRequired
};
ValueComponent.defaultProps = {
    toAsset: "1.3.0",
    fullPrecision: true,
    noDecimals: false,
    fullDecimals: false,
    hide_asset: false,
    coreAsset: "1.3.0"
};

ValueComponent = Object(__WEBPACK_IMPORTED_MODULE_3__BindToChainState__["a" /* default */])(ValueComponent, { keep_updating: true });

var EquivalentValueComponent = function (_React$Component) {
    _inherits(EquivalentValueComponent, _React$Component);

    function EquivalentValueComponent() {
        _classCallCheck(this, EquivalentValueComponent);

        return _possibleConstructorReturn(this, (EquivalentValueComponent.__proto__ || Object.getPrototypeOf(EquivalentValueComponent)).apply(this, arguments));
    }

    _createClass(EquivalentValueComponent, [{
        key: "render",
        value: function render() {
            var _props3 = this.props,
                refCallback = _props3.refCallback,
                others = _objectWithoutProperties(_props3, ["refCallback"]);

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(ValueComponent, _extends({}, others, { ref: refCallback }));
        }
    }]);

    return EquivalentValueComponent;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

EquivalentValueComponent = Object(__WEBPACK_IMPORTED_MODULE_5_alt_react__["connect"])(EquivalentValueComponent, {
    listenTo: function listenTo() {
        return [__WEBPACK_IMPORTED_MODULE_6_stores_MarketsStore__["a" /* default */]];
    },
    getProps: function getProps() {
        return {
            marketStats: __WEBPACK_IMPORTED_MODULE_6_stores_MarketsStore__["a" /* default */].getState().allMarketStats
        };
    }
});

var BalanceValueComponent = function (_React$Component2) {
    _inherits(BalanceValueComponent, _React$Component2);

    function BalanceValueComponent() {
        _classCallCheck(this, BalanceValueComponent);

        return _possibleConstructorReturn(this, (BalanceValueComponent.__proto__ || Object.getPrototypeOf(BalanceValueComponent)).apply(this, arguments));
    }

    _createClass(BalanceValueComponent, [{
        key: "render",
        value: function render() {
            var balance = this.props.balance;

            var isBalanceObject = !!balance.getIn(["balance", "amount"]);

            var amount = Number(isBalanceObject ? balance.getIn(["balance", "amount"]) : balance.get("balance"));
            var fromAsset = isBalanceObject ? balance.getIn(["balance", "asset_id"]) : balance.get("asset_type");
            if (isNaN(amount)) return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "span",
                null,
                "--"
            );
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(EquivalentValueComponent, { refCallback: this.props.refCallback, hide_asset: this.props.hide_asset, amount: amount, fromAsset: fromAsset, noDecimals: true, toAsset: this.props.toAsset });
        }
    }]);

    return BalanceValueComponent;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

BalanceValueComponent.propTypes = {
    balance: __WEBPACK_IMPORTED_MODULE_2__ChainTypes__["a" /* default */].ChainObject.isRequired
};

BalanceValueComponent = Object(__WEBPACK_IMPORTED_MODULE_3__BindToChainState__["a" /* default */])(BalanceValueComponent, { keep_updating: true });


/***/ }),

/***/ 1940:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/react/react.js
var react = __webpack_require__(1);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/immutable/dist/immutable.js
var immutable = __webpack_require__(20);
var immutable_default = /*#__PURE__*/__webpack_require__.n(immutable);

// EXTERNAL MODULE: ./node_modules/react-translate-component/index.js
var react_translate_component = __webpack_require__(5);
var react_translate_component_default = /*#__PURE__*/__webpack_require__.n(react_translate_component);

// EXTERNAL MODULE: ./app/lib/common/account_utils.js
var account_utils = __webpack_require__(189);

// EXTERNAL MODULE: ./node_modules/seerjs/es/index.js + 7 modules
var es = __webpack_require__(6);

// EXTERNAL MODULE: ./app/components/Account/AccountSelector.jsx
var AccountSelector = __webpack_require__(281);

// EXTERNAL MODULE: ./app/components/Icon/Icon.jsx
var Icon = __webpack_require__(59);

// EXTERNAL MODULE: ./app/components/Utility/ChainTypes.js
var ChainTypes = __webpack_require__(33);

// EXTERNAL MODULE: ./app/components/Utility/FormattedAsset.jsx
var FormattedAsset = __webpack_require__(68);

// EXTERNAL MODULE: ./app/components/Utility/BindToChainState.jsx
var BindToChainState = __webpack_require__(32);

// EXTERNAL MODULE: ./app/components/Utility/LinkToAccountById.jsx
var LinkToAccountById = __webpack_require__(147);

// EXTERNAL MODULE: ./node_modules/counterpart/index.js
var counterpart = __webpack_require__(3);
var counterpart_default = /*#__PURE__*/__webpack_require__.n(counterpart);

// CONCATENATED MODULE: ./app/components/Account/VotingAccountsList.jsx
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }












function getWitnessOrCommittee(type, acct) {
    var url = "",
        votes = 0,
        account = void 0;
    if (type === "witness") {
        account = es["b" /* ChainStore */].getWitnessById(acct.get("id"));
    } else if (type === "committee") {
        account = es["b" /* ChainStore */].getCommitteeMemberById(acct.get("id"));
    }

    url = account ? account.get("url") : url;
    votes = account ? account.get("total_votes") : votes;
    return {
        url: url,
        votes: votes,
        id: account.get("id")
    };
}

var VotingAccountsList_AccountItemRow = function (_React$Component) {
    _inherits(AccountItemRow, _React$Component);

    function AccountItemRow() {
        _classCallCheck(this, AccountItemRow);

        return _possibleConstructorReturn(this, (AccountItemRow.__proto__ || Object.getPrototypeOf(AccountItemRow)).apply(this, arguments));
    }

    _createClass(AccountItemRow, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps) {
            return nextProps.account !== this.props.account || nextProps.action !== this.props.action || nextProps.isActive !== this.props.isActive || nextProps.idx !== this.props.idx || nextProps.proxy !== this.props.proxy;
        }
    }, {
        key: "onAction",
        value: function onAction(item_id) {
            this.props.onAction(item_id);
        }
    }, {
        key: "render",
        value: function render() {
            var _props = this.props,
                account = _props.account,
                type = _props.type,
                action = _props.action,
                isActive = _props.isActive;

            var item_id = account.get("id");

            var _getWitnessOrCommitte = getWitnessOrCommittee(type, account),
                url = _getWitnessOrCommitte.url,
                votes = _getWitnessOrCommitte.votes;

            var link = url && url.length > 0 && url.indexOf("http") === -1 ? "http://" + url : url;
            var isSupported = action === "remove";
            return react_default.a.createElement(
                "tr",
                { className: isSupported ? "" : "unsupported" },
                react_default.a.createElement(
                    "td",
                    { style: { textAlign: "right" } },
                    this.props.idx + 1
                ),
                react_default.a.createElement(
                    "td",
                    { style: { textAlign: "left" } },
                    react_default.a.createElement(LinkToAccountById["a" /* default */], { account: account.get("id") })
                ),
                react_default.a.createElement(
                    "td",
                    null,
                    link && link.indexOf(".") !== -1 ? react_default.a.createElement(
                        "a",
                        { href: link, target: "_blank", rel: "noopener noreferrer" },
                        react_default.a.createElement(Icon["a" /* default */], { name: "share" })
                    ) : null
                ),
                react_default.a.createElement(
                    "td",
                    null,
                    react_default.a.createElement(FormattedAsset["a" /* default */], { amount: votes, asset: "1.3.0", decimalOffset: 5, hide_asset: true })
                ),
                react_default.a.createElement(
                    "td",
                    null,
                    react_default.a.createElement(react_translate_component_default.a, { content: "account.votes." + (isActive ? "active_short" : "inactive") })
                ),
                react_default.a.createElement(
                    "td",
                    { style: { textAlign: "center" } },
                    react_default.a.createElement(react_translate_component_default.a, { content: "settings." + (isSupported ? "yes" : "no") })
                ),
                react_default.a.createElement(
                    "td",
                    { className: this.props.proxy ? "" : "clickable", onClick: this.props.proxy ? function () {} : this.onAction.bind(this, item_id) },
                    !this.props.proxy ? react_default.a.createElement(Icon["a" /* default */], { name: isSupported ? "checkmark-circle" : "minus-circle" }) : react_default.a.createElement(Icon["a" /* default */], { name: "locked" })
                )
            );
        }
    }]);

    return AccountItemRow;
}(react_default.a.Component);

VotingAccountsList_AccountItemRow.propTypes = {
    account: react_default.a.PropTypes.object.isRequired,
    onAction: react_default.a.PropTypes.func.isRequired
};

var VotingAccountsList_VotingAccountsList = function (_React$Component2) {
    _inherits(VotingAccountsList, _React$Component2);

    function VotingAccountsList(props) {
        _classCallCheck(this, VotingAccountsList);

        var _this2 = _possibleConstructorReturn(this, (VotingAccountsList.__proto__ || Object.getPrototypeOf(VotingAccountsList)).call(this, props));

        _this2.state = {
            selected_item: null,
            item_name_input: "",
            error: null
        };
        _this2.onItemChange = _this2.onItemChange.bind(_this2);
        _this2.onItemAccountChange = _this2.onItemAccountChange.bind(_this2);
        _this2.onAddItem = _this2.onAddItem.bind(_this2);
        return _this2;
    }

    _createClass(VotingAccountsList, [{
        key: "onItemChange",
        value: function onItemChange(item_name_input) {
            this.setState({ item_name_input: item_name_input });
        }
    }, {
        key: "onItemAccountChange",
        value: function onItemAccountChange(selected_item) {
            var _this3 = this;

            this.setState({ selected_item: selected_item, error: null });
            if (selected_item && this.props.validateAccount) {
                var res = this.props.validateAccount(selected_item);
                if (res === null) return;
                if (typeof res === "string") this.setState({ error: res });else res.then(function (error) {
                    return _this3.setState({ error: error });
                });
            }
        }
    }, {
        key: "onAddItem",
        value: function onAddItem(item) {
            if (!item) return;
            var next_state = {
                selected_item: null,
                item_name_input: "",
                error: null
            };
            this.setState(next_state);
            this.props.onAddItem(item.get("id"));
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            if (!this.props.items) return null;

            var item_rows = this.props.items.filter(function (i) {
                if (!i) return false;
                //if (this.state.item_name_input) return i.get("name").indexOf(this.state.item_name_input) !== -1;
                return true;
            }).sort(function (a, b) {
                var _getWitnessOrCommitte2 = getWitnessOrCommittee(_this4.props.type, a),
                    a_votes = _getWitnessOrCommitte2.votes;

                var _getWitnessOrCommitte3 = getWitnessOrCommittee(_this4.props.type, b),
                    b_votes = _getWitnessOrCommitte3.votes;

                if (a_votes !== b_votes) {
                    return b_votes - a_votes;
                } else if (a.get("name") > b.get("name")) {
                    return 1;
                } else if (a.get("name") < b.get("name")) {
                    return -1;
                } else {
                    return 0;
                }
            }).map(function (i, idx) {
                var action = _this4.props.supported && _this4.props.supported.includes(i.get("id")) ? "remove" : "add";
                var isActive = _this4.props.active.includes(getWitnessOrCommittee(_this4.props.type, i).id);
                return react_default.a.createElement(VotingAccountsList_AccountItemRow, {
                    idx: idx,
                    key: i.get("name"),
                    account: i,
                    type: _this4.props.type,
                    onAction: action === "add" ? _this4.props.onAddItem : _this4.props.onRemoveItem,
                    isSelected: _this4.props.items.indexOf(i) !== -1,
                    action: action,
                    isActive: isActive,
                    proxy: _this4.props.proxy
                });
            });

            var error = this.state.error;
            if (!error && this.state.selected_item && this.props.items.indexOf(this.state.selected_item) !== -1) {
                error = counterpart_default.a.translate("account.votes.already");
            }

            var cw = ["10%", "20%", "40%", "20%", "10%"];

            return react_default.a.createElement(
                "div",
                null,
                this.props.withSelector ? react_default.a.createElement(AccountSelector["a" /* default */], {
                    style: { maxWidth: "600px" },
                    label: this.props.label,
                    error: error,
                    placeholder: this.props.placeholder,
                    account: this.state.item_name_input,
                    accountName: this.state.item_name_input,
                    onChange: this.onItemChange,
                    onAccountChanged: this.onItemAccountChange,
                    onAction: this.onAddItem,
                    action_label: "account.votes.add_witness",
                    tabIndex: this.props.tabIndex
                }) : null,
                this.props.title && item_rows.length ? react_default.a.createElement(
                    "h4",
                    null,
                    this.props.title
                ) : null,
                item_rows.length ? react_default.a.createElement(
                    "table",
                    { className: "table dashboard-table table-hover" },
                    react_default.a.createElement(
                        "thead",
                        null,
                        react_default.a.createElement(
                            "tr",
                            null,
                            react_default.a.createElement(
                                "th",
                                { style: { textAlign: "right" } },
                                "#"
                            ),
                            react_default.a.createElement(
                                "th",
                                { style: { textAlign: "left", maxWidth: cw[1] } },
                                react_default.a.createElement(react_translate_component_default.a, { content: "account.votes.name" })
                            ),
                            react_default.a.createElement(
                                "th",
                                { style: { maxWidth: cw[2] } },
                                react_default.a.createElement(react_translate_component_default.a, { content: "account.votes.about" })
                            ),
                            react_default.a.createElement(
                                "th",
                                { style: { maxWidth: cw[3] } },
                                react_default.a.createElement(react_translate_component_default.a, { content: "account.votes.votes" })
                            ),
                            react_default.a.createElement(
                                "th",
                                { style: { maxWidth: cw[4] } },
                                react_default.a.createElement(react_translate_component_default.a, { content: "account.votes.status.title" })
                            ),
                            react_default.a.createElement(
                                "th",
                                { style: { maxWidth: cw[0] } },
                                react_default.a.createElement(react_translate_component_default.a, { content: "account.votes.supported" })
                            ),
                            react_default.a.createElement(
                                "th",
                                { style: { maxWidth: cw[5] } },
                                react_default.a.createElement(react_translate_component_default.a, { content: "account.votes.toggle" })
                            )
                        )
                    ),
                    react_default.a.createElement(
                        "tbody",
                        null,
                        item_rows
                    )
                ) : null
            );
        }
    }]);

    return VotingAccountsList;
}(react_default.a.Component);

VotingAccountsList_VotingAccountsList.propTypes = {
    items: ChainTypes["a" /* default */].ChainObjectsList,
    onAddItem: react_default.a.PropTypes.func.isRequired,
    onRemoveItem: react_default.a.PropTypes.func.isRequired,
    validateAccount: react_default.a.PropTypes.func,
    label: react_default.a.PropTypes.string.isRequired, // a translation key for the label,
    placeholder: react_default.a.PropTypes.string, // the placeholder text to be displayed when there is no user_input
    tabIndex: react_default.a.PropTypes.number, // tabindex property to be passed to input tag
    action: react_default.a.PropTypes.string,
    withSelector: react_default.a.PropTypes.bool
};
VotingAccountsList_VotingAccountsList.defaultProps = {
    action: "remove",
    withSelector: true,
    autosubscribe: false
};


/* harmony default export */ var Account_VotingAccountsList = (Object(BindToChainState["a" /* default */])(VotingAccountsList_VotingAccountsList, { keep_updating: true }));
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(28);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./app/components/Utility/Tabs.jsx
var Tabs = __webpack_require__(1541);

// EXTERNAL MODULE: ./node_modules/react-router/es/index.js + 32 modules
var react_router_es = __webpack_require__(34);

// EXTERNAL MODULE: ./app/api/ApplicationApi.js
var ApplicationApi = __webpack_require__(187);

// EXTERNAL MODULE: ./app/components/Utility/AssetName.jsx
var AssetName = __webpack_require__(124);

// EXTERNAL MODULE: ./app/components/Utility/EquivalentValueComponent.jsx
var EquivalentValueComponent = __webpack_require__(1595);

// EXTERNAL MODULE: ./app/stores/SettingsStore.js
var SettingsStore = __webpack_require__(35);

// CONCATENATED MODULE: ./app/components/Account/AccountVoting.jsx
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var AccountVoting__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function AccountVoting__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function AccountVoting__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function AccountVoting__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





















var AccountVoting_AccountVoting = function (_React$Component) {
    AccountVoting__inherits(AccountVoting, _React$Component);

    function AccountVoting(props) {
        AccountVoting__classCallCheck(this, AccountVoting);

        var _this = AccountVoting__possibleConstructorReturn(this, (AccountVoting.__proto__ || Object.getPrototypeOf(AccountVoting)).call(this, props));

        var proxyId = props.proxy.get("id");
        var proxyName = props.proxy.get("name");
        _this.state = {
            proxy_account_id: proxyId === "1.2.5" ? "" : proxyId, //"1.2.16",
            prev_proxy_account_id: proxyId === "1.2.5" ? "" : proxyId,
            current_proxy_input: proxyId === "1.2.5" ? "" : proxyName,
            committee: null,
            vote_ids: immutable_default.a.Set(),
            proxy_vote_ids: immutable_default.a.Set(),
            all_committee: immutable_default.a.List()
        };
        _this.onProxyAccountFound = _this.onProxyAccountFound.bind(_this);
        _this.onPublish = _this.onPublish.bind(_this);
        _this.onReset = _this.onReset.bind(_this);
        _this._getVoteObjects = _this._getVoteObjects.bind(_this);
        return _this;
    }

    AccountVoting__createClass(AccountVoting, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            account_utils["a" /* default */].getFinalFeeAsset(this.props.account, "account_update");
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.updateAccountData(this.props);
            this._getVoteObjects();
            this._getVoteObjects("committee");
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(np) {
            if (np.account !== this.props.account) {
                var proxyId = np.proxy.get("id");
                var newState = {
                    proxy_account_id: proxyId === "1.2.5" ? "" : proxyId
                };
                this.setState({ prev_proxy_account_id: newState.proxy_account_id });
                this.updateAccountData(np, newState);
            }
        }
    }, {
        key: "updateAccountData",
        value: function updateAccountData(_ref) {
            var _this2 = this;

            var account = _ref.account;
            var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state;
            var proxy_account_id = state.proxy_account_id;

            var proxy = es["b" /* ChainStore */].getAccount(proxy_account_id);
            var options = account.get("options");
            var proxyOptions = proxy ? proxy.get("options") : null;
            // let proxy_account_id = proxy ? proxy.get("id") : "1.2.5";
            var current_proxy_input = proxy ? proxy.get("name") : "";
            if (proxy_account_id === "1.2.5") {
                proxy_account_id = "";
                current_proxy_input = "";
            }

            var votes = options.get("votes");
            var vote_ids = votes.toArray();
            var vids = immutable_default.a.Set(vote_ids);
            // ChainStore.getObjectsByVoteIds(vote_ids);

            var proxyPromise = null,
                proxy_vids = immutable_default.a.Set([]);
            var hasProxy = proxy_account_id !== "1.2.5";
            if (hasProxy && proxyOptions) {
                var proxy_votes = proxyOptions.get("votes");
                var proxy_vote_ids = proxy_votes.toArray();
                proxy_vids = immutable_default.a.Set(proxy_vote_ids);
                proxyPromise = Object(es["g" /* FetchChainObjects */])(es["b" /* ChainStore */].getObjectByVoteID, proxy_vote_ids, 5000);
            }

            Promise.all([Object(es["g" /* FetchChainObjects */])(es["b" /* ChainStore */].getObjectByVoteID, vote_ids, 5000), proxyPromise]).then(function (res) {
                var _res = _slicedToArray(res, 2),
                    vote_objs = _res[0],
                    proxy_vote_objs = _res[1];

                function sortVoteObjects(objects) {
                    var committee = new immutable_default.a.List();
                    objects.forEach(function (obj) {
                        var account_id = obj.get("committee_member_account");
                        if (account_id) {
                            committee = committee.push(account_id);
                        }
                    });

                    return { committee: committee };
                }

                var _sortVoteObjects = sortVoteObjects(vote_objs),
                    committee = _sortVoteObjects.committee;

                var _sortVoteObjects2 = sortVoteObjects(proxy_vote_objs || []),
                    proxy_committee = _sortVoteObjects2.committee;

                var state = {
                    proxy_account_id: proxy_account_id,
                    current_proxy_input: current_proxy_input,
                    committee: committee,
                    proxy_committee: proxy_committee,
                    vote_ids: vids,
                    proxy_vote_ids: proxy_vids,
                    prev_committee: committee,
                    prev_vote_ids: vids
                };
                _this2.setState(state);
            });
        }
    }, {
        key: "isChanged",
        value: function isChanged() {
            var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state;

            return s.proxy_account_id !== s.prev_proxy_account_id || s.committee !== s.prev_committee || !immutable_default.a.is(s.vote_ids, s.prev_vote_ids);
        }
    }, {
        key: "_getVoteObjects",
        value: function _getVoteObjects() {
            var _this3 = this;

            var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "committee";
            var vote_ids = arguments[1];

            var current = this.state["all_" + type];
            var lastIdx = void 0;
            if (!vote_ids) {
                vote_ids = [];
                var active = this.props.globalObject.get("active_committee_members");
                var lastActive = active.last() || "1.4.0";
                lastIdx = parseInt(lastActive.split(".")[2], 10);
                for (var i = 0; i <= lastIdx + 10; i++) {
                    vote_ids.push("1.4." + i);
                }
            } else {
                lastIdx = parseInt(vote_ids[vote_ids.length - 1].split(".")[2], 10);
            }
            Object(es["g" /* FetchChainObjects */])(es["b" /* ChainStore */].getObject, vote_ids, 5000, {}).then(function (vote_objs) {
                _this3.state["all_" + type] = current.concat(immutable_default.a.List(vote_objs.filter(function (a) {
                    return !!a;
                }).map(function (a) {
                    return a.get("committee_member_account");
                })));
                if (!!vote_objs[vote_objs.length - 1]) {
                    // there are more valid vote objs, fetch more
                    vote_ids = [];
                    for (var i = lastIdx + 11; i <= lastIdx + 20; i++) {
                        vote_ids.push("1.4." + i);
                    }
                    return _this3._getVoteObjects(type, vote_ids);
                }
                _this3.forceUpdate();
            });
        }
    }, {
        key: "onPublish",
        value: function onPublish() {
            var updated_account = this.props.account.toJS();
            var updateObject = { account: updated_account.id };
            var new_options = { memo_key: updated_account.options.memo_key };
            // updated_account.new_options = updated_account.options;
            var new_proxy_id = this.state.proxy_account_id;
            new_options.voting_account = new_proxy_id ? new_proxy_id : "1.2.5";
            new_options.num_committee = this.state.committee.size;
            new_options.num_authenticator = 0;
            new_options.num_supervisor = 0;

            updateObject.new_options = new_options;
            // Set fee asset
            updateObject.fee = {
                amount: 0,
                asset_id: account_utils["a" /* default */].getFinalFeeAsset(updated_account.id, "account_update")
            };

            var vote_ids = this.state.vote_ids;

            var now = new Date();

            function removeVote(list, vote) {
                if (list.includes(vote)) {
                    list = list.delete(vote);
                }
                return list;
            }

            // Submit votes
            Object(es["g" /* FetchChainObjects */])(es["b" /* ChainStore */].getCommitteeMemberById, this.state.committee.toArray(), 4000).then(function (res) {
                var committee_vote_ids = res.map(function (o) {
                    return o.get("vote_id");
                });
                return Promise.resolve(committee_vote_ids);
            }).then(function (res) {
                updateObject.new_options.votes = res.sort(function (a, b) {
                    var a_split = a.split(":");
                    var b_split = b.split(":");

                    return parseInt(a_split[1], 10) - parseInt(b_split[1], 10);
                });
                ApplicationApi["a" /* default */].updateAccount(updateObject);
            });
        }
    }, {
        key: "onReset",
        value: function onReset() {
            var _this4 = this;

            var s = this.state;
            if (this.refs.voting_proxy && this.refs.voting_proxy.refs.bound_component) this.refs.voting_proxy.refs.bound_component.onResetProxy();
            this.setState({
                proxy_account_id: s.prev_proxy_account_id,
                current_proxy_input: s.prev_proxy_input,
                committee: s.prev_committee,
                vote_ids: s.prev_vote_ids
            }, function () {
                _this4.updateAccountData(_this4.props);
            });
        }
    }, {
        key: "onAddItem",
        value: function onAddItem(collection, item_id) {
            var state = {};
            state[collection] = this.state[collection].push(item_id);
            this.setState(state);
        }
    }, {
        key: "onRemoveItem",
        value: function onRemoveItem(collection, item_id) {
            var state = {};
            state[collection] = this.state[collection].filter(function (i) {
                return i !== item_id;
            });
            this.setState(state);
        }
    }, {
        key: "onChangeVotes",
        value: function onChangeVotes(addVotes, removeVotes) {
            var state = {};
            state.vote_ids = this.state.vote_ids;
            if (addVotes.length) {
                addVotes.forEach(function (vote) {
                    state.vote_ids = state.vote_ids.add(vote);
                });
            }
            if (removeVotes) {
                removeVotes.forEach(function (vote) {
                    state.vote_ids = state.vote_ids.delete(vote);
                });
            }

            this.setState(state);
        }
    }, {
        key: "validateAccount",
        value: function validateAccount(collection, account) {
            console.log(account);
            if (!account) return null;
            if (collection === "committee") {
                return Object(es["g" /* FetchChainObjects */])(es["b" /* ChainStore */].getCommitteeMemberById, [account.get("id")], 3000).then(function (res) {
                    return res[0] ? null : "Not a committee member";
                });
            }
            return null;
        }
    }, {
        key: "onProxyChange",
        value: function onProxyChange(current_proxy_input) {
            var proxyAccount = es["b" /* ChainStore */].getAccount(current_proxy_input);
            if (!proxyAccount || proxyAccount && proxyAccount.get("id") !== this.state.proxy_account_id) {
                this.setState({
                    proxy_account_id: "",
                    proxy_committee: immutable_default.a.Set()
                });
            }
            this.setState({ current_proxy_input: current_proxy_input });
        }
    }, {
        key: "onProxyAccountFound",
        value: function onProxyAccountFound(proxy_account) {
            var _this5 = this;

            this.setState({
                proxy_account_id: proxy_account ? proxy_account.get("id") : ""
            }, function () {
                _this5.updateAccountData(_this5.props);
            });
        }
    }, {
        key: "onClearProxy",
        value: function onClearProxy() {
            this.setState({
                proxy_account_id: ""
            });
        }
    }, {
        key: "render",
        value: function render() {
            var preferredUnit = this.props.settings.get("unit") || "1.3.0";
            var hasProxy = !!this.state.proxy_account_id; // this.props.account.getIn(["options", "voting_account"]) !== "1.2.5";
            var publish_buttons_class = classnames_default()("button", { disabled: !this.isChanged() });
            var globalObject = this.props.globalObject;


            var now = new Date();

            var voteThreshold = 0;

            var actionButtons = react_default.a.createElement(
                "span",
                null,
                react_default.a.createElement(
                    "button",
                    { className: classnames_default()(publish_buttons_class, { success: this.isChanged() }), onClick: this.onPublish, tabIndex: 4 },
                    react_default.a.createElement(react_translate_component_default.a, { content: "account.votes.publish" })
                ),
                react_default.a.createElement(
                    "button",
                    { className: "button " + publish_buttons_class, onClick: this.onReset, tabIndex: 8 },
                    react_default.a.createElement(react_translate_component_default.a, { content: "account.perm.reset" })
                )
            );

            var proxyInput = react_default.a.createElement(
                AccountSelector["a" /* default */],
                {
                    hideImage: true,
                    style: { width: "50%", maxWidth: 250 },
                    account: this.state.current_proxy_input,
                    accountName: this.state.current_proxy_input,
                    onChange: this.onProxyChange.bind(this),
                    onAccountChanged: this.onProxyAccountFound,
                    tabIndex: 1,
                    placeholder: "Proxy not set"
                },
                react_default.a.createElement(
                    "span",
                    { style: { paddingLeft: 5, position: "relative", top: -1, display: hasProxy ? "" : "none" } },
                    react_default.a.createElement(Icon["a" /* default */], { name: "locked", size: "1x" })
                ),
                react_default.a.createElement(
                    "span",
                    { style: { paddingLeft: 5, position: "relative", top: 9, display: !hasProxy ? "" : "none" } },
                    react_default.a.createElement(
                        react_router_es["b" /* Link */],
                        { to: "/help/voting" },
                        react_default.a.createElement(Icon["a" /* default */], { name: "question-circle", size: "1x" })
                    )
                )
            );

            var saveText = react_default.a.createElement(
                "div",
                { className: "inline-block", style: { float: "right", visibility: this.isChanged() ? "visible" : "hidden", color: "red", padding: "0.85rem", fontSize: "0.9rem" } },
                react_default.a.createElement(react_translate_component_default.a, { content: "account.votes.save_finish" })
            );

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
                                setting: "votingTab",
                                className: "account-tabs",
                                defaultActiveTab: 0,
                                segmented: false,
                                actionButtons: saveText,
                                tabsClass: "account-overview no-padding bordered-header content-block"
                            },
                            react_default.a.createElement(
                                Tabs["a" /* Tab */],
                                { title: "explorer.committee_members.title" },
                                react_default.a.createElement(
                                    "div",
                                    { className: classnames_default()("content-block") },
                                    react_default.a.createElement(
                                        "div",
                                        { className: "header-selector" },
                                        proxyInput,
                                        react_default.a.createElement(
                                            "div",
                                            { style: { float: "right", marginTop: "-2.5rem" } },
                                            actionButtons
                                        )
                                    ),
                                    react_default.a.createElement(Account_VotingAccountsList, {
                                        type: "committee",
                                        label: "account.votes.add_committee_label",
                                        items: this.state.all_committee,
                                        validateAccount: this.validateAccount.bind(this, "committee"),
                                        onAddItem: this.onAddItem.bind(this, "committee"),
                                        onRemoveItem: this.onRemoveItem.bind(this, "committee"),
                                        tabIndex: hasProxy ? -1 : 3,
                                        supported: this.state[hasProxy ? "proxy_committee" : "committee"],
                                        withSelector: false,
                                        active: globalObject.get("active_committee_members"),
                                        proxy: this.state.proxy_account_id
                                    })
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return AccountVoting;
}(react_default.a.Component);

AccountVoting_AccountVoting.propTypes = {
    globalObject: ChainTypes["a" /* default */].ChainObject.isRequired,
    proxy: ChainTypes["a" /* default */].ChainAccount.isRequired
};
AccountVoting_AccountVoting.defaultProps = {
    globalObject: "2.0.0"
};

AccountVoting_AccountVoting = Object(BindToChainState["a" /* default */])(AccountVoting_AccountVoting);

var AccountVoting_BudgetObjectWrapper = function BudgetObjectWrapper(props) {
    return react_default.a.createElement(AccountVoting_AccountVoting, props);
};

/* harmony default export */ var Account_AccountVoting = __webpack_exports__["default"] = (AccountVoting_BudgetObjectWrapper);

/***/ })

});
//# sourceMappingURL=37.js.map