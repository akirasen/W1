webpackJsonp([44],{

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

/***/ 1929:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/react/react.js
var react = __webpack_require__(1);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-router/es/index.js + 32 modules
var es = __webpack_require__(34);

// EXTERNAL MODULE: ./node_modules/react-translate-component/index.js
var react_translate_component = __webpack_require__(5);
var react_translate_component_default = /*#__PURE__*/__webpack_require__.n(react_translate_component);

// EXTERNAL MODULE: ./app/components/Utility/LinkToAccountById.jsx
var LinkToAccountById = __webpack_require__(147);

// EXTERNAL MODULE: ./app/components/Utility/ChainTypes.js
var ChainTypes = __webpack_require__(33);

// EXTERNAL MODULE: ./app/components/Utility/BindToChainState.jsx
var BindToChainState = __webpack_require__(32);

// EXTERNAL MODULE: ./app/components/Utility/FormattedAsset.jsx
var FormattedAsset = __webpack_require__(68);

// EXTERNAL MODULE: ./app/components/Utility/FormattedPrice.jsx
var FormattedPrice = __webpack_require__(149);

// EXTERNAL MODULE: ./app/components/Utility/AssetName.jsx
var AssetName = __webpack_require__(124);

// EXTERNAL MODULE: ./app/components/Utility/TimeAgo.jsx
var TimeAgo = __webpack_require__(694);

// EXTERNAL MODULE: ./app/components/Utility/HelpContent.jsx
var HelpContent = __webpack_require__(691);

// EXTERNAL MODULE: ./app/components/Icon/Icon.jsx
var Icon = __webpack_require__(59);

// EXTERNAL MODULE: ./app/lib/common/asset_utils.js
var asset_utils = __webpack_require__(285);

// EXTERNAL MODULE: ./app/lib/common/utils.js
var utils = __webpack_require__(15);

// CONCATENATED MODULE: ./app/components/Utility/FormattedTime.jsx
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



// a class to display time nicely when given seconds 
// for example, display 

// expects the number of seconds as a property

var FormattedTime_FormattedTime = function (_React$Component) {
    _inherits(FormattedTime, _React$Component);

    function FormattedTime(props) {
        _classCallCheck(this, FormattedTime);

        var _this = _possibleConstructorReturn(this, (FormattedTime.__proto__ || Object.getPrototypeOf(FormattedTime)).call(this, props));

        _this.state = { time: props.time };
        return _this;
    }

    // given an integer seconds as an argument, 
    // return the number of hours


    _createClass(FormattedTime, [{
        key: "getHours",
        value: function getHours(secs) {
            console.log("get hours called with: " + secs);
            return secs / 3600;
        }
    }, {
        key: "render",
        value: function render() {
            return react_default.a.createElement(
                "div",
                null,
                this.getHours(this.state.time),
                "h"
            );
        }
    }]);

    return FormattedTime;
}(react_default.a.Component);

/* harmony default export */ var Utility_FormattedTime = (FormattedTime_FormattedTime);
// EXTERNAL MODULE: ./node_modules/seerjs/es/index.js + 7 modules
var seerjs_es = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/seerjs-ws/cjs/index.js
var cjs = __webpack_require__(8);
var cjs_default = /*#__PURE__*/__webpack_require__.n(cjs);

// EXTERNAL MODULE: ./app/components/Utility/Tabs.jsx
var Tabs = __webpack_require__(1541);

// EXTERNAL MODULE: ./app/lib/common/MarketClasses.js
var MarketClasses = __webpack_require__(145);

// CONCATENATED MODULE: ./app/components/Blockchain/Asset.jsx
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var Asset__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function Asset__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Asset__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Asset__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





















var Asset_AssetFlag = function (_React$Component) {
    Asset__inherits(AssetFlag, _React$Component);

    function AssetFlag() {
        Asset__classCallCheck(this, AssetFlag);

        return Asset__possibleConstructorReturn(this, (AssetFlag.__proto__ || Object.getPrototypeOf(AssetFlag)).apply(this, arguments));
    }

    Asset__createClass(AssetFlag, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                isSet = _props.isSet,
                name = _props.name;

            if (!isSet) {
                return react_default.a.createElement("span", null);
            }

            return react_default.a.createElement(
                "span",
                { className: "asset-flag" },
                react_default.a.createElement(
                    "span",
                    { className: "label info" },
                    react_default.a.createElement(react_translate_component_default.a, { content: "account.user_issued_assets." + name })
                )
            );
        }
    }]);

    return AssetFlag;
}(react_default.a.Component);

//-------------------------------------------------------------


var Asset_AssetPermission = function (_React$Component2) {
    Asset__inherits(AssetPermission, _React$Component2);

    function AssetPermission() {
        Asset__classCallCheck(this, AssetPermission);

        return Asset__possibleConstructorReturn(this, (AssetPermission.__proto__ || Object.getPrototypeOf(AssetPermission)).apply(this, arguments));
    }

    Asset__createClass(AssetPermission, [{
        key: "render",
        value: function render() {
            var _props2 = this.props,
                isSet = _props2.isSet,
                name = _props2.name;


            if (!isSet) {
                return react_default.a.createElement("span", null);
            }

            return react_default.a.createElement(
                "span",
                { className: "asset-flag" },
                react_default.a.createElement(
                    "span",
                    { className: "label info" },
                    react_default.a.createElement(react_translate_component_default.a, { content: "account.user_issued_assets." + name })
                )
            );
        }
    }]);

    return AssetPermission;
}(react_default.a.Component);

var Asset_Asset = function (_React$Component3) {
    Asset__inherits(Asset, _React$Component3);

    function Asset(props) {
        Asset__classCallCheck(this, Asset);

        var _this3 = Asset__possibleConstructorReturn(this, (Asset.__proto__ || Object.getPrototypeOf(Asset)).call(this, props));

        _this3.state = {
            callOrders: [],
            marginTableSort: "price",
            sortDirection: true
        };
        return _this3;
    }

    Asset__createClass(Asset, [{
        key: "componentWillMount",
        value: function componentWillMount() {}
    }, {
        key: "_toggleSortOrder",
        value: function _toggleSortOrder(type) {
            if (type !== this.state.marginTableSort) {
                this.setState({
                    marginTableSort: type
                });
            } else {
                this.setState({ sortDirection: !this.state.sortDirection });
            }
        }
    }, {
        key: "_assetType",
        value: function _assetType(asset) {
            return 'Simple';
        }
    }, {
        key: "renderFlagIndicators",
        value: function renderFlagIndicators(flags, names) {
            return react_default.a.createElement(
                "div",
                null,
                names.map(function (name) {
                    return react_default.a.createElement(Asset_AssetFlag, { key: "flag_" + name, name: name, isSet: flags[name] });
                })
            );
        }
    }, {
        key: "renderPermissionIndicators",
        value: function renderPermissionIndicators(permissions, names) {
            return react_default.a.createElement(
                "div",
                null,
                names.map(function (name) {
                    return react_default.a.createElement(Asset_AssetPermission, { key: "perm_" + name, name: name, isSet: permissions[name] });
                })
            );
        }
    }, {
        key: "formattedPrice",
        value: function formattedPrice(price) {
            var hide_symbols = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var hide_value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            var base = price.base;
            var quote = price.quote;
            return react_default.a.createElement(FormattedPrice["a" /* default */], {
                base_amount: base.amount,
                base_asset: base.asset_id,
                quote_amount: quote.amount,
                quote_asset: quote.asset_id,
                hide_value: hide_value,
                hide_symbols: hide_symbols
            });
        }
    }, {
        key: "renderAuthorityList",
        value: function renderAuthorityList(authorities) {
            return authorities.map(function (authority) {
                return react_default.a.createElement(
                    "span",
                    null,
                    ' ',
                    react_default.a.createElement(LinkToAccountById["a" /* default */], { account: authority })
                );
            });
        }
    }, {
        key: "renderMarketList",
        value: function renderMarketList(asset, markets) {
            var symbol = asset.symbol;
            return markets.map(function (market) {
                if (market == symbol) return null;
                var marketID = market + '_' + symbol;
                var marketName = market + '/' + symbol;
                return react_default.a.createElement(
                    "span",
                    null,
                    react_default.a.createElement(
                        es["b" /* Link */],
                        { to: "/market/" + marketID },
                        marketName
                    ),
                    " \xA0"
                );
            }.bind(this));
        }
    }, {
        key: "renderAboutBox",
        value: function renderAboutBox(asset) {
            var issuer = seerjs_es["b" /* ChainStore */].getObject(asset.issuer, false, false);
            var issuerName = issuer ? issuer.get('name') : '';

            var icon = react_default.a.createElement(Icon["a" /* default */], { name: "asset", className: "asset", size: "4x" });

            // Add <a to any links included in the description

            var description = asset_utils["a" /* default */].parseDescription(asset.options.description);
            var desc = description.main;
            var short_name = description.short_name ? description.short_name : null;

            var urlTest = /(http?):\/\/(www\.)?[a-z0-9\.:].*?(?=\s)/g;

            // Regexp needs a whitespace after a url, so add one to make sure
            desc = desc && desc.length > 0 ? desc + " " : desc;
            var urls = desc.match(urlTest);

            // Add market link
            var core_asset = seerjs_es["b" /* ChainStore */].getAsset("1.3.0");
            var preferredMarket = description.market ? description.market : core_asset ? core_asset.get("symbol") : "SEER";

            if (urls && urls.length) {
                urls.forEach(function (url) {
                    var markdownUrl = "<a target=\"_blank\" rel=\"noopener noreferrer\" href=\"" + url + "\">" + url + "</a>";
                    desc = desc.replace(url, markdownUrl);
                });
            }

            var _utils$replaceName = utils["a" /* default */].replaceName(asset.symbol, "bitasset" in asset && !asset.bitasset.is_prediction_market && asset.issuer === "1.2.0"),
                name = _utils$replaceName.name,
                prefix = _utils$replaceName.prefix;

            return react_default.a.createElement(
                "div",
                { style: { overflow: "visible" } },
                react_default.a.createElement(HelpContent["a" /* default */], {
                    path: "assets/" + asset.symbol,
                    alt_path: "assets/Asset",
                    section: "summary",
                    symbol: (prefix || "") + name,
                    description: desc,
                    issuer: issuerName,
                    hide_issuer: "true"
                }),
                short_name ? react_default.a.createElement(
                    "p",
                    null,
                    short_name
                ) : null,
                react_default.a.createElement(
                    "a",
                    { style: { textTransform: "uppercase" }, className: "button market-button", href: ( false ? "#" : "") + "/market/" + asset.symbol + "_" + preferredMarket },
                    react_default.a.createElement(react_translate_component_default.a, { content: "exchange.market" })
                )
            );
        }
    }, {
        key: "renderSummary",
        value: function renderSummary(asset) {
            // TODO: confidential_supply: 0 USD   [IF NOT ZERO OR NOT DISABLE CONFIDENTIAL]
            var options = asset.options;

            var flagBooleans = asset_utils["a" /* default */].getFlagBooleans(asset.options.flags);

            var bitNames = Object.keys(flagBooleans);
            var dynamic = seerjs_es["b" /* ChainStore */].getObject(asset.dynamic_asset_data_id, false, false);
            var current_supply = dynamic ? parseInt(dynamic.get("current_supply")) : 0;
            var confidential_supply = dynamic ? parseInt(dynamic.get("confidential_supply")) : 0;

            var currentSupply = dynamic ? react_default.a.createElement(
                "tr",
                null,
                react_default.a.createElement(
                    "td",
                    null,
                    " ",
                    react_default.a.createElement(react_translate_component_default.a, { content: "explorer.asset.summary.current_supply" }),
                    " "
                ),
                react_default.a.createElement(
                    "td",
                    null,
                    " ",
                    react_default.a.createElement(FormattedAsset["a" /* default */], { amount: current_supply, asset: asset.id }),
                    " "
                )
            ) : null;

            var stealthSupply = dynamic ? react_default.a.createElement(
                "tr",
                null,
                react_default.a.createElement(
                    "td",
                    null,
                    " ",
                    react_default.a.createElement(react_translate_component_default.a, { content: "explorer.asset.summary.stealth_supply" }),
                    " "
                ),
                react_default.a.createElement(
                    "td",
                    null,
                    " ",
                    react_default.a.createElement(FormattedAsset["a" /* default */], { amount: confidential_supply, asset: asset.id }),
                    " "
                )
            ) : null;

            var marketFee = flagBooleans["charge_market_fee"] ? react_default.a.createElement(
                "tr",
                null,
                react_default.a.createElement(
                    "td",
                    null,
                    " ",
                    react_default.a.createElement(react_translate_component_default.a, { content: "explorer.asset.summary.market_fee" }),
                    " "
                ),
                react_default.a.createElement(
                    "td",
                    null,
                    " ",
                    options.market_fee_percent / 100.0,
                    " % "
                )
            ) : null;

            // options.max_market_fee initially a string
            var maxMarketFee = flagBooleans["charge_market_fee"] ? react_default.a.createElement(
                "tr",
                null,
                react_default.a.createElement(
                    "td",
                    null,
                    " ",
                    react_default.a.createElement(react_translate_component_default.a, { content: "explorer.asset.summary.max_market_fee" }),
                    " "
                ),
                react_default.a.createElement(
                    "td",
                    null,
                    " ",
                    react_default.a.createElement(FormattedAsset["a" /* default */], { amount: +options.max_market_fee, asset: asset.id }),
                    " "
                )
            ) : null;

            return react_default.a.createElement(
                "div",
                { className: "asset-card no-padding" },
                react_default.a.createElement(
                    "div",
                    { className: "card-divider" },
                    react_default.a.createElement(AssetName["a" /* default */], { name: asset.symbol })
                ),
                react_default.a.createElement(
                    "table",
                    { className: "table key-value-table table-hover" },
                    react_default.a.createElement(
                        "tbody",
                        null,
                        react_default.a.createElement(
                            "tr",
                            null,
                            react_default.a.createElement(
                                "td",
                                null,
                                " ",
                                react_default.a.createElement(react_translate_component_default.a, { content: "explorer.asset.summary.asset_type" }),
                                " "
                            ),
                            react_default.a.createElement(
                                "td",
                                null,
                                " ",
                                this._assetType(asset),
                                " "
                            )
                        ),
                        react_default.a.createElement(
                            "tr",
                            null,
                            react_default.a.createElement(
                                "td",
                                null,
                                " ",
                                react_default.a.createElement(react_translate_component_default.a, { content: "explorer.asset.summary.issuer" }),
                                " "
                            ),
                            react_default.a.createElement(
                                "td",
                                null,
                                " ",
                                react_default.a.createElement(LinkToAccountById["a" /* default */], { account: asset.issuer }),
                                " "
                            )
                        ),
                        react_default.a.createElement(
                            "tr",
                            null,
                            react_default.a.createElement(
                                "td",
                                null,
                                " ",
                                react_default.a.createElement(react_translate_component_default.a, { content: "explorer.assets.precision" }),
                                " "
                            ),
                            react_default.a.createElement(
                                "td",
                                null,
                                " ",
                                asset.precision,
                                " "
                            )
                        ),
                        currentSupply,
                        stealthSupply,
                        marketFee,
                        maxMarketFee
                    )
                ),
                react_default.a.createElement("br", null),
                this.renderFlagIndicators(flagBooleans, bitNames)
            );
        }
    }, {
        key: "renderFeePool",
        value: function renderFeePool(asset) {
            var dynamic = asset.dynamic;
            var options = asset.options;
            return react_default.a.createElement(
                "div",
                { className: "asset-card no-padding" },
                react_default.a.createElement(
                    "div",
                    { className: "card-divider" },
                    react_default.a.createElement(react_translate_component_default.a, { content: "explorer.asset.fee_pool.title" })
                ),
                react_default.a.createElement(
                    "table",
                    { className: "table key-value-table", style: { padding: "1.2rem" } },
                    react_default.a.createElement(
                        "tbody",
                        null,
                        react_default.a.createElement(
                            "tr",
                            null,
                            react_default.a.createElement(
                                "td",
                                null,
                                " ",
                                react_default.a.createElement(react_translate_component_default.a, { content: "explorer.asset.fee_pool.core_exchange_rate" }),
                                " "
                            ),
                            react_default.a.createElement(
                                "td",
                                null,
                                " ",
                                this.formattedPrice(options.core_exchange_rate),
                                " "
                            )
                        ),
                        react_default.a.createElement(
                            "tr",
                            null,
                            react_default.a.createElement(
                                "td",
                                null,
                                " ",
                                react_default.a.createElement(react_translate_component_default.a, { content: "explorer.asset.fee_pool.pool_balance" }),
                                " "
                            ),
                            react_default.a.createElement(
                                "td",
                                null,
                                " ",
                                dynamic ? react_default.a.createElement(FormattedAsset["a" /* default */], { asset: "1.3.0", amount: dynamic.fee_pool }) : null,
                                " "
                            )
                        ),
                        react_default.a.createElement(
                            "tr",
                            null,
                            react_default.a.createElement(
                                "td",
                                null,
                                " ",
                                react_default.a.createElement(react_translate_component_default.a, { content: "explorer.asset.fee_pool.unclaimed_issuer_income" }),
                                " "
                            ),
                            react_default.a.createElement(
                                "td",
                                null,
                                " ",
                                dynamic ? react_default.a.createElement(FormattedAsset["a" /* default */], { asset: asset.id, amount: dynamic.accumulated_fees }) : null,
                                " "
                            )
                        )
                    )
                )
            );
        }

        // TODO: Blacklist Authorities: <Account list like Voting>
        // TODO: Blacklist Market: Base/Market, Base/Market

    }, {
        key: "renderPermissions",
        value: function renderPermissions(asset) {
            //var dynamic = asset.dynamic;

            var options = asset.options;

            var permissionBooleans = asset_utils["a" /* default */].getFlagBooleans(asset.options.issuer_permissions);

            var bitNames = Object.keys(permissionBooleans);

            // options.blacklist_authorities = ["1.2.3", "1.2.4"];
            // options.whitelist_authorities = ["1.2.1", "1.2.2"];
            // options.blacklist_markets = ["JPY", "RUB"];
            // options.whitelist_markets = ["USD", "EUR", "GOLD"];

            // options.max_market_fee initially a string
            var maxMarketFee = permissionBooleans["charge_market_fee"] ? react_default.a.createElement(
                "tr",
                null,
                react_default.a.createElement(
                    "td",
                    null,
                    " ",
                    react_default.a.createElement(react_translate_component_default.a, { content: "explorer.asset.permissions.max_market_fee" }),
                    " "
                ),
                react_default.a.createElement(
                    "td",
                    null,
                    " ",
                    react_default.a.createElement(FormattedAsset["a" /* default */], { amount: +options.max_market_fee, asset: asset.id }),
                    " "
                )
            ) : null;

            // options.max_supply initially a string
            var maxSupply = react_default.a.createElement(
                "tr",
                null,
                react_default.a.createElement(
                    "td",
                    null,
                    " ",
                    react_default.a.createElement(react_translate_component_default.a, { content: "explorer.asset.permissions.max_supply" }),
                    " "
                ),
                react_default.a.createElement(
                    "td",
                    null,
                    " ",
                    react_default.a.createElement(FormattedAsset["a" /* default */], { amount: +options.max_supply, asset: asset.id }),
                    " "
                )
            );

            var whiteLists = permissionBooleans["white_list"] ? react_default.a.createElement(
                "span",
                null,
                react_default.a.createElement("br", null),
                react_default.a.createElement(react_translate_component_default.a, { content: "explorer.asset.permissions.blacklist_authorities" }),
                ": \xA0",
                this.renderAuthorityList(options.blacklist_authorities),
                react_default.a.createElement("br", null),
                react_default.a.createElement(react_translate_component_default.a, { content: "explorer.asset.permissions.blacklist_markets" }),
                ": \xA0",
                this.renderMarketList(asset, options.blacklist_markets),
                react_default.a.createElement("br", null),
                react_default.a.createElement(react_translate_component_default.a, { content: "explorer.asset.permissions.whitelist_authorities" }),
                ": \xA0",
                this.renderAuthorityList(options.whitelist_authorities),
                react_default.a.createElement("br", null),
                react_default.a.createElement(react_translate_component_default.a, { content: "explorer.asset.permissions.whitelist_markets" }),
                ": \xA0",
                this.renderMarketList(asset, options.whitelist_markets)
            ) : null;

            return react_default.a.createElement(
                "div",
                { className: "asset-card no-padding" },
                react_default.a.createElement(
                    "div",
                    { className: "card-divider" },
                    react_default.a.createElement(react_translate_component_default.a, { content: "explorer.asset.permissions.title" }),
                    " "
                ),
                react_default.a.createElement(
                    "table",
                    { className: "table key-value-table table-hover", style: { padding: "1.2rem" } },
                    react_default.a.createElement(
                        "tbody",
                        null,
                        maxMarketFee,
                        maxSupply
                    )
                ),
                react_default.a.createElement("br", null),
                this.renderPermissionIndicators(permissionBooleans, bitNames),
                react_default.a.createElement("br", null)
            );
        }
    }, {
        key: "render",
        value: function render() {
            var asset = this.props.asset.toJS();
            var priceFeed = null;
            var priceFeedData = null;

            return react_default.a.createElement(
                "div",
                { className: "grid-container" },
                react_default.a.createElement(
                    "div",
                    { className: "grid-block page-layout" },
                    react_default.a.createElement(
                        "div",
                        { className: "grid-block main-content wrap regular-padding" },
                        react_default.a.createElement(
                            "div",
                            { className: "grid-block small-up-1", style: { width: "100%" } },
                            this.renderAboutBox(asset)
                        ),
                        react_default.a.createElement(
                            "div",
                            { className: "grid-block small-up-1 medium-up-2" },
                            react_default.a.createElement(
                                "div",
                                { className: "grid-content" },
                                this.renderSummary(asset)
                            ),
                            react_default.a.createElement(
                                "div",
                                { className: "grid-content" },
                                priceFeed ? priceFeed : this.renderPermissions(asset)
                            )
                        ),
                        react_default.a.createElement(
                            "div",
                            { className: "grid-block small-up-1 medium-up-2" },
                            react_default.a.createElement(
                                "div",
                                { className: "grid-content" },
                                this.renderFeePool(asset)
                            ),
                            react_default.a.createElement(
                                "div",
                                { className: "grid-content" },
                                priceFeed ? this.renderPermissions(asset) : null
                            )
                        ),
                        priceFeedData ? priceFeedData : null
                    )
                )
            );
        }
    }]);

    return Asset;
}(react_default.a.Component);

Asset_Asset.propTypes = {
    backingAsset: ChainTypes["a" /* default */].ChainAsset.isRequired
};


Asset_Asset = Object(BindToChainState["a" /* default */])(Asset_Asset, { keep_updating: true });

var Asset_AssetContainer = function (_React$Component4) {
    Asset__inherits(AssetContainer, _React$Component4);

    function AssetContainer() {
        Asset__classCallCheck(this, AssetContainer);

        return Asset__possibleConstructorReturn(this, (AssetContainer.__proto__ || Object.getPrototypeOf(AssetContainer)).apply(this, arguments));
    }

    Asset__createClass(AssetContainer, [{
        key: "render",
        value: function render() {
            var backingAsset = "1.3.0";
            return react_default.a.createElement(Asset_Asset, _extends({}, this.props, { backingAsset: backingAsset }));
        }
    }]);

    return AssetContainer;
}(react_default.a.Component);

Asset_AssetContainer.propTypes = {
    asset: ChainTypes["a" /* default */].ChainAsset.isRequired
};

Asset_AssetContainer = Object(BindToChainState["a" /* default */])(Asset_AssetContainer, { keep_updating: true });

var Asset_AssetSymbolSplitter = function (_React$Component5) {
    Asset__inherits(AssetSymbolSplitter, _React$Component5);

    function AssetSymbolSplitter() {
        Asset__classCallCheck(this, AssetSymbolSplitter);

        return Asset__possibleConstructorReturn(this, (AssetSymbolSplitter.__proto__ || Object.getPrototypeOf(AssetSymbolSplitter)).apply(this, arguments));
    }

    Asset__createClass(AssetSymbolSplitter, [{
        key: "render",
        value: function render() {
            var symbol = this.props.params.symbol;
            return react_default.a.createElement(Asset_AssetContainer, _extends({}, this.props, { asset: symbol }));
        }
    }]);

    return AssetSymbolSplitter;
}(react_default.a.Component);

/* harmony default export */ var Blockchain_Asset = __webpack_exports__["default"] = (Asset_AssetSymbolSplitter);
;

/***/ })

});
//# sourceMappingURL=44.js.map