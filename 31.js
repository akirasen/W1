webpackJsonp([31,42],{

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

/***/ 1912:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/react/react.js
var react = __webpack_require__(1);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./app/components/Explorer/Explorer.jsx
var Explorer = __webpack_require__(50);

// EXTERNAL MODULE: ./app/stores/SettingsStore.js
var SettingsStore = __webpack_require__(35);

// EXTERNAL MODULE: ./node_modules/alt-container/lib/AltContainer.js
var AltContainer = __webpack_require__(108);
var AltContainer_default = /*#__PURE__*/__webpack_require__.n(AltContainer);

// EXTERNAL MODULE: ./node_modules/immutable/dist/immutable.js
var immutable = __webpack_require__(20);
var immutable_default = /*#__PURE__*/__webpack_require__.n(immutable);

// EXTERNAL MODULE: ./node_modules/counterpart/index.js
var counterpart = __webpack_require__(3);
var counterpart_default = /*#__PURE__*/__webpack_require__.n(counterpart);

// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(28);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./node_modules/react-translate-component/index.js
var react_translate_component = __webpack_require__(5);
var react_translate_component_default = /*#__PURE__*/__webpack_require__.n(react_translate_component);

// EXTERNAL MODULE: ./app/components/Utility/HelpContent.jsx
var HelpContent = __webpack_require__(691);

// EXTERNAL MODULE: ./app/components/Utility/ChainTypes.js
var ChainTypes = __webpack_require__(33);

// EXTERNAL MODULE: ./app/components/Utility/BindToChainState.jsx
var BindToChainState = __webpack_require__(32);

// EXTERNAL MODULE: ./app/components/Utility/FormattedAsset.jsx
var FormattedAsset = __webpack_require__(68);

// EXTERNAL MODULE: ./app/components/Utility/EquivalentValueComponent.jsx
var EquivalentValueComponent = __webpack_require__(1595);

// EXTERNAL MODULE: ./node_modules/seerjs/es/index.js + 7 modules
var es = __webpack_require__(6);

// CONCATENATED MODULE: ./app/components/Blockchain/Fees.jsx
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }












var operations = es["c" /* ChainTypes */].operations;

var ops = Object.keys(operations);

// Define groups and their corresponding operation ids
var fee_grouping = {
    general: [0, 22, 23, 24, 25, 29, 30, 33, 35, 36, 37, 39, 55],
    asset: [9, 10, 11, 12, 13, 34, 38, 62],
    market: [1, 2, 3],
    account: [4, 5, 6, 7, 8],
    business: [14, 15, 16, 17, 18, 19, 20, 21, 26, 27, 28, 31, 32, 56, 57, 58, 59, 60, 61],
    seer: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54]
};

// Operations that require LTM
var ltm_required = [4, 6, 14, 15];

var Fees_FeeGroup = function (_React$Component) {
    _inherits(FeeGroup, _React$Component);

    function FeeGroup(props) {
        _classCallCheck(this, FeeGroup);

        return _possibleConstructorReturn(this, (FeeGroup.__proto__ || Object.getPrototypeOf(FeeGroup)).call(this, props));
    }

    _createClass(FeeGroup, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps) {
            return !immutable_default.a.is(nextProps.globalObject, this.props.globalObject);
        }
    }, {
        key: "render",
        value: function render() {
            var _props = this.props,
                globalObject = _props.globalObject,
                settings = _props.settings,
                opIds = _props.opIds,
                title = _props.title;

            globalObject = globalObject.toJSON();
            var core_asset = es["b" /* ChainStore */].getAsset("1.3.0");

            var current_fees = globalObject.parameters.current_fees;
            var scale = current_fees.scale;
            var feesRaw = current_fees.parameters;
            var preferredUnit = settings.get("unit") || core_asset.get("symbol");

            var trxTypes = counterpart_default.a.translate("transaction.trxTypes");

            var fees = opIds.map(function (feeIdx) {
                if (feeIdx >= feesRaw.length) {
                    console.warn("Asking for non-existing fee id %d! Check group settings in Fees.jsx", feeIdx);
                    return; // FIXME, if I ask for a fee that does not exist?
                }

                var feeStruct = feesRaw[feeIdx];

                var opId = feeStruct[0];
                var fee = feeStruct[1];
                var operation_name = ops[opId];
                var feename = trxTypes[operation_name];

                var feeRateForLTM = globalObject.parameters.network_percent_of_fee / 1e4;
                if (opId === 9) {
                    // Asset creation fee for LTM is 60% of standart user
                    // See https://github.com/bitshares/bitshares-ui/issues/996
                    feeRateForLTM = 0.5 + (1 - feeRateForLTM) / 2;
                }

                var rows = [];
                var headIncluded = false;
                var labelClass = classnames_default()("label", "info");

                for (var key in fee) {
                    var amount = fee[key] * scale / 1e4;
                    var amountForLTM = amount * feeRateForLTM;
                    var feeTypes = counterpart_default.a.translate("transaction.feeTypes");
                    var assetAmount = amount ? react_default.a.createElement(FormattedAsset["a" /* default */], { amount: amount, asset: "1.3.0" }) : feeTypes["_none"];
                    var equivalentAmount = amount ? react_default.a.createElement(EquivalentValueComponent["a" /* EquivalentValueComponent */], { fromAsset: "1.3.0", fullPrecision: true, amount: amount, toAsset: preferredUnit, fullDecimals: true }) : feeTypes["_none"];
                    var assetAmountLTM = amountForLTM ? react_default.a.createElement(FormattedAsset["a" /* default */], { amount: amountForLTM, asset: "1.3.0" }) : feeTypes["_none"];
                    var equivalentAmountLTM = amountForLTM ? react_default.a.createElement(EquivalentValueComponent["a" /* EquivalentValueComponent */], { fromAsset: "1.3.0", fullPrecision: true, amount: amountForLTM, toAsset: preferredUnit, fullDecimals: true }) : feeTypes["_none"];
                    var _title = null;

                    if (!headIncluded) {
                        headIncluded = true;
                        _title = react_default.a.createElement(
                            "td",
                            { rowSpan: "6", style: { width: "15em" } },
                            react_default.a.createElement(
                                "span",
                                { className: labelClass },
                                feename
                            )
                        );
                    }

                    if (ltm_required.indexOf(opId) < 0) {
                        rows.push(react_default.a.createElement(
                            "tr",
                            { key: opId.toString() + key, className: feeTypes[key] === "Annual Membership" ? "linethrough" : "" },
                            _title,
                            react_default.a.createElement(
                                "td",
                                null,
                                feeTypes[key]
                            ),
                            react_default.a.createElement(
                                "td",
                                { style: { textAlign: "right" } },
                                assetAmount,
                                amount !== 0 && preferredUnit !== "SEER" && [" / ", equivalentAmount]
                            ),
                            react_default.a.createElement(
                                "td",
                                { style: { textAlign: "right" } },
                                feeIdx !== 8 ? assetAmountLTM : null,
                                feeIdx !== 8 && amount !== 0 && preferredUnit !== "SEER" && [" / ", equivalentAmountLTM]
                            )
                        ));
                    } else {
                        rows.push(react_default.a.createElement(
                            "tr",
                            { key: opId.toString() + key },
                            _title,
                            react_default.a.createElement(
                                "td",
                                null,
                                feeTypes[key]
                            ),
                            react_default.a.createElement(
                                "td",
                                { style: { textAlign: "right" } },
                                "- ",
                                react_default.a.createElement(
                                    "sup",
                                    null,
                                    "*"
                                )
                            ),
                            react_default.a.createElement(
                                "td",
                                { style: { textAlign: "right" } },
                                assetAmountLTM,
                                amount !== 0 && preferredUnit !== "SEER" && [" / ", equivalentAmountLTM]
                            )
                        ));
                    }
                }
                return react_default.a.createElement(
                    "tbody",
                    { key: feeIdx },
                    rows
                );
            });

            return react_default.a.createElement(
                "div",
                { className: "asset-card" },
                react_default.a.createElement(
                    "div",
                    { className: "card-divider" },
                    this.props.title
                ),
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
                                react_default.a.createElement(react_translate_component_default.a, { content: "explorer.block.op" })
                            ),
                            react_default.a.createElement(
                                "th",
                                null,
                                react_default.a.createElement(react_translate_component_default.a, { content: "explorer.fees.type" })
                            ),
                            react_default.a.createElement(
                                "th",
                                { style: { textAlign: "right" } },
                                react_default.a.createElement(react_translate_component_default.a, { content: "explorer.fees.fee" })
                            ),
                            react_default.a.createElement(
                                "th",
                                { style: { textAlign: "right" } },
                                react_default.a.createElement(react_translate_component_default.a, { content: "explorer.fees.feeltm" })
                            )
                        )
                    ),
                    fees
                )
            );
        }
    }]);

    return FeeGroup;
}(react_default.a.Component);

Fees_FeeGroup.propTypes = {
    globalObject: ChainTypes["a" /* default */].ChainObject.isRequired
};
Fees_FeeGroup.defaultProps = {
    globalObject: "2.0.0"
};

Fees_FeeGroup = Object(BindToChainState["a" /* default */])(Fees_FeeGroup, { keep_updating: true });

var Fees_Fees = function (_React$Component2) {
    _inherits(Fees, _React$Component2);

    function Fees() {
        _classCallCheck(this, Fees);

        return _possibleConstructorReturn(this, (Fees.__proto__ || Object.getPrototypeOf(Fees)).apply(this, arguments));
    }

    _createClass(Fees, [{
        key: "render",
        value: function render() {

            var FeeGroupsTitle = counterpart_default.a.translate("transaction.feeGroups");
            var feeGroups = [];

            for (var groupName in fee_grouping) {
                var groupNameText = FeeGroupsTitle[groupName];
                var feeIds = fee_grouping[groupName];
                feeGroups.push(react_default.a.createElement(Fees_FeeGroup, { key: groupName, settings: this.props.settings, opIds: feeIds, title: groupNameText }));
            }

            return react_default.a.createElement(
                "div",
                { className: "grid-block vertical", style: { overflow: "visible" } },
                react_default.a.createElement(
                    "div",
                    { className: "grid-block small-12 shrink", style: { overflow: "visible" } },
                    react_default.a.createElement(HelpContent["a" /* default */], { path: "components/Fees" })
                ),
                react_default.a.createElement(
                    "div",
                    { className: "grid-block small-12 ", style: { overflow: "visible" } },
                    react_default.a.createElement(
                        "div",
                        { className: "grid-content" },
                        feeGroups
                    )
                )
            );
        }
    }]);

    return Fees;
}(react_default.a.Component);

/* harmony default export */ var Blockchain_Fees = (Fees_Fees);
// CONCATENATED MODULE: ./app/components/Blockchain/FeesContainer.jsx
var FeesContainer__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function FeesContainer__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function FeesContainer__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function FeesContainer__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var FeesContainer_FeesContainer = function (_React$Component) {
    FeesContainer__inherits(FeesContainer, _React$Component);

    function FeesContainer() {
        FeesContainer__classCallCheck(this, FeesContainer);

        return FeesContainer__possibleConstructorReturn(this, (FeesContainer.__proto__ || Object.getPrototypeOf(FeesContainer)).apply(this, arguments));
    }

    FeesContainer__createClass(FeesContainer, [{
        key: "render",
        value: function render() {
            return react_default.a.createElement(
                AltContainer_default.a,
                {
                    stores: [SettingsStore["a" /* default */]],
                    inject: {
                        settings: SettingsStore["a" /* default */].getState().settings
                    } },
                react_default.a.createElement(Blockchain_Fees, this.props)
            );
        }
    }]);

    return FeesContainer;
}(react_default.a.Component);

/* harmony default export */ var Blockchain_FeesContainer = (FeesContainer_FeesContainer);
// CONCATENATED MODULE: ./app/components/Explorer/FeesContainer.jsx
var Explorer_FeesContainer__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function Explorer_FeesContainer__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Explorer_FeesContainer__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Explorer_FeesContainer__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var Explorer_FeesContainer_FeesContainer = function (_React$Component) {
    Explorer_FeesContainer__inherits(FeesContainer, _React$Component);

    function FeesContainer() {
        Explorer_FeesContainer__classCallCheck(this, FeesContainer);

        return Explorer_FeesContainer__possibleConstructorReturn(this, (FeesContainer.__proto__ || Object.getPrototypeOf(FeesContainer)).apply(this, arguments));
    }

    Explorer_FeesContainer__createClass(FeesContainer, [{
        key: "render",
        value: function render() {

            var content = react_default.a.createElement(Blockchain_FeesContainer, null);

            return react_default.a.createElement(Explorer["default"], { tab: "fees", content: content });
        }
    }]);

    return FeesContainer;
}(react_default.a.Component);

/* harmony default export */ var Explorer_FeesContainer = __webpack_exports__["default"] = (Explorer_FeesContainer_FeesContainer);

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
//# sourceMappingURL=31.js.map