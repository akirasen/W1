webpackJsonp([24,42],{

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

/***/ 1609:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1610);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1534)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js??ref--6-3!../../../node_modules/sass-loader/lib/loader.js??ref--6-4!./witnesses.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/postcss-loader/index.js??ref--6-3!../../../node_modules/sass-loader/lib/loader.js??ref--6-4!./witnesses.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 1610:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1533)();
// imports


// module
exports.push([module.i, ".active-witness>td{background-color:rgba(80,210,194,.4);transition:background-color .6s ease}.clickable{cursor:pointer;user-select:none}.view-switcher{padding-top:1rem;text-align:right}", ""]);

// exports


/***/ }),

/***/ 1916:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutable__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_immutable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Account_AccountImage__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Utility_ChainTypes__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Utility_BindToChainState__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_seerjs_es__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Utility_FormattedAsset__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_translate_component__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_translate_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_translate_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Utility_TimeAgo__ = __webpack_require__(694);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_alt_react__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_alt_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_alt_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_actions_SettingsActions__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_stores_SettingsStore__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_classnames__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Explorer__ = __webpack_require__(50);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }















var Apis = __webpack_require__(8).Apis;
__webpack_require__(1609);

var WitnessCard = function (_React$Component) {
    _inherits(WitnessCard, _React$Component);

    function WitnessCard() {
        _classCallCheck(this, WitnessCard);

        return _possibleConstructorReturn(this, (WitnessCard.__proto__ || Object.getPrototypeOf(WitnessCard)).apply(this, arguments));
    }

    _createClass(WitnessCard, [{
        key: "_onCardClick",
        value: function _onCardClick(e) {
            e.preventDefault();
            this.context.router.push("/account/" + this.props.witness.get("name"));
        }
    }, {
        key: "render",
        value: function render() {
            var witness_data = __WEBPACK_IMPORTED_MODULE_5_seerjs_es__["b" /* ChainStore */].getWitnessById(this.props.witness.get('id'));
            if (!witness_data) return null;
            var total_collateral = witness_data.get("total_collateral");
            var collateral_profit = witness_data.get("collateral_profit");

            var witness_aslot = witness_data.get('last_aslot');
            var color = {};
            if (this.props.most_recent - witness_aslot > 100) {
                color = { borderLeft: "1px solid #FCAB53" };
            } else {
                color = { borderLeft: "1px solid #50D2C2" };
            }
            var last_aslot_time = new Date(Date.now() - (this.props.most_recent - witness_aslot) * __WEBPACK_IMPORTED_MODULE_5_seerjs_es__["b" /* ChainStore */].getObject("2.0.0").getIn(["parameters", "block_interval"]) * 1000);

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "grid-content account-card", onClick: this._onCardClick.bind(this) },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "card", style: color },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "h4",
                        { className: "text-center" },
                        "#",
                        this.props.rank,
                        ": ",
                        this.props.witness.get('name')
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "card-content" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "text-center" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Account_AccountImage__["a" /* default */], { account: this.props.witness.get('name'), size: { height: 64, width: 64 } })
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "table",
                            { className: "table key-value-table" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "tbody",
                                null,
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "tr",
                                    null,
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "td",
                                        null,
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_translate_component___default.a, { content: "explorer.witnesses.total_collateral" })
                                    ),
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "td",
                                        null,
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__Utility_FormattedAsset__["a" /* default */], { amount: total_collateral, asset: "1.3.0", decimalOffset: 5 })
                                    )
                                ),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "tr",
                                    null,
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "td",
                                        null,
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_translate_component___default.a, { content: "explorer.witnesses.collateral_profit" })
                                    ),
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "td",
                                        null,
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__Utility_FormattedAsset__["a" /* default */], { amount: collateral_profit, asset: "1.3.0", decimalOffset: 5 })
                                    )
                                ),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "tr",
                                    null,
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "td",
                                        null,
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_translate_component___default.a, { content: "explorer.blocks.last_block" })
                                    ),
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "td",
                                        null,
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__Utility_TimeAgo__["a" /* default */], { time: new Date(last_aslot_time) })
                                    )
                                ),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "tr",
                                    null,
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "td",
                                        null,
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_translate_component___default.a, { content: "explorer.witnesses.missed" })
                                    ),
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "td",
                                        null,
                                        witness_data.get('total_missed')
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return WitnessCard;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

WitnessCard.propTypes = {
    witness: __WEBPACK_IMPORTED_MODULE_3__Utility_ChainTypes__["a" /* default */].ChainAccount.isRequired
};
WitnessCard.contextTypes = {
    router: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.object.isRequired
};

WitnessCard = Object(__WEBPACK_IMPORTED_MODULE_4__Utility_BindToChainState__["a" /* default */])(WitnessCard, { keep_updating: true });

var WitnessRow = function (_React$Component2) {
    _inherits(WitnessRow, _React$Component2);

    function WitnessRow() {
        _classCallCheck(this, WitnessRow);

        return _possibleConstructorReturn(this, (WitnessRow.__proto__ || Object.getPrototypeOf(WitnessRow)).apply(this, arguments));
    }

    _createClass(WitnessRow, [{
        key: "_onRowClick",
        value: function _onRowClick(e) {
            e.preventDefault();
            this.context.router.push("/account/" + this.props.witness.get("name"));
        }

        // componentWillUnmount() {
        //     ChainStore.unSubFrom("witnesses", ChainStore.getWitnessById( this.props.witness.get("id") ).get("id"));
        // }

    }, {
        key: "render",
        value: function render() {
            var _props = this.props,
                witness = _props.witness,
                isCurrent = _props.isCurrent,
                rank = _props.rank;

            var witness_data = __WEBPACK_IMPORTED_MODULE_5_seerjs_es__["b" /* ChainStore */].getWitnessById(this.props.witness.get('id'));
            if (!witness_data) return null;
            var total_collateral = witness_data.get("total_collateral");

            var witness_aslot = witness_data.get('last_aslot');
            var color = {};
            if (this.props.most_recent - witness_aslot > 100) {
                color = { borderLeft: "1px solid #FCAB53" };
            } else {
                color = { borderLeft: "1px solid #50D2C2" };
            }
            var last_aslot_time = new Date(Date.now() - (this.props.most_recent - witness_aslot) * __WEBPACK_IMPORTED_MODULE_5_seerjs_es__["b" /* ChainStore */].getObject("2.0.0").getIn(["parameters", "block_interval"]) * 1000);

            var currentClass = isCurrent ? "active-witness" : "";

            var missed = witness_data.get('total_missed');
            var missedClass = __WEBPACK_IMPORTED_MODULE_12_classnames___default()("txtlabel", { "success": missed <= 500 }, { "info": missed > 500 && missed <= 1250 }, { "warning": missed > 1250 && missed <= 2000 }, { "error": missed >= 200 });

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "tr",
                { className: currentClass, onClick: this._onRowClick.bind(this) },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "td",
                    null,
                    rank
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "td",
                    { style: color },
                    witness.get("name")
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "td",
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__Utility_TimeAgo__["a" /* default */], { time: new Date(last_aslot_time) })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "td",
                    null,
                    witness_data.get('last_confirmed_block_num')
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "td",
                    { className: missedClass },
                    missed
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "td",
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__Utility_FormattedAsset__["a" /* default */], { amount: witness_data.get('total_collateral'), asset: "1.3.0", decimalOffset: 5 })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "td",
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__Utility_FormattedAsset__["a" /* default */], { amount: witness_data.get('collateral_profit'), asset: "1.3.0", decimalOffset: 5 })
                )
            );
        }
    }]);

    return WitnessRow;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

WitnessRow.propTypes = {
    witness: __WEBPACK_IMPORTED_MODULE_3__Utility_ChainTypes__["a" /* default */].ChainAccount.isRequired
};
WitnessRow.contextTypes = {
    router: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.object.isRequired
};

WitnessRow = Object(__WEBPACK_IMPORTED_MODULE_4__Utility_BindToChainState__["a" /* default */])(WitnessRow, { keep_updating: true });

var WitnessList = function (_React$Component3) {
    _inherits(WitnessList, _React$Component3);

    function WitnessList() {
        _classCallCheck(this, WitnessList);

        var _this3 = _possibleConstructorReturn(this, (WitnessList.__proto__ || Object.getPrototypeOf(WitnessList)).call(this));

        _this3.state = {
            sortBy: 'rank',
            inverseSort: true
        };
        return _this3;
    }

    _createClass(WitnessList, [{
        key: "_setSort",
        value: function _setSort(field) {
            this.setState({
                sortBy: field,
                inverseSort: field === this.state.sortBy ? !this.state.inverseSort : this.state.inverseSort
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            var _props2 = this.props,
                witnesses = _props2.witnesses,
                current = _props2.current,
                cardView = _props2.cardView,
                witnessList = _props2.witnessList;
            var _state = this.state,
                sortBy = _state.sortBy,
                inverseSort = _state.inverseSort;

            var most_recent_aslot = 0;
            var ranks = {};

            witnesses.filter(function (a) {
                if (!a) {
                    return false;
                }
                return witnessList.indexOf(a.get("id")) !== -1;
            }).sort(function (a, b) {
                if (a && b) {
                    return parseInt(b.get("total_collateral"), 10) - parseInt(a.get("total_collateral"), 10);
                }
            }).forEach(function (w, index) {
                if (w) {
                    var s = w.get("last_aslot");
                    if (most_recent_aslot < s) {
                        most_recent_aslot = s;
                    }

                    ranks[w.get("id")] = index + 1;
                }
            });

            var itemRows = null;
            if (witnesses.length > 0 && witnesses[1]) {
                itemRows = witnesses.filter(function (a) {
                    if (!a) {
                        return false;
                    }
                    var account = __WEBPACK_IMPORTED_MODULE_5_seerjs_es__["b" /* ChainStore */].getObject(a.get("witness_account"));
                    if (!account) return false;
                    var name = account.get("name");
                    if (!name) return false;
                    return name.indexOf(_this4.props.filter) !== -1;
                }).sort(function (a, b) {
                    var a_account = __WEBPACK_IMPORTED_MODULE_5_seerjs_es__["b" /* ChainStore */].getObject(a.get("witness_account"));
                    var b_account = __WEBPACK_IMPORTED_MODULE_5_seerjs_es__["b" /* ChainStore */].getObject(b.get("witness_account"));

                    if (!a_account || !b_account) {
                        return 0;
                    }
                    // console.log("a:", a.toJS());

                    switch (sortBy) {
                        case 'name':
                            if (a_account.get("name") > b_account.get("name")) {
                                return inverseSort ? 1 : -1;
                            } else if (a_account.get("name") < b_account.get("name")) {
                                return inverseSort ? -1 : 1;
                            } else {
                                return 0;
                            }
                            break;

                        case "rank":
                            return !inverseSort ? ranks[b.get("id")] - ranks[a.get("id")] : ranks[a.get("id")] - ranks[b.get("id")];
                            break;

                        default:
                            return !inverseSort ? parseInt(b.get(sortBy), 10) - parseInt(a.get(sortBy), 10) : parseInt(a.get(sortBy), 10) - parseInt(b.get(sortBy), 10);
                    }
                }).map(function (a) {

                    if (!cardView) {
                        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(WitnessRow, { key: a.get("id"), rank: ranks[a.get("id")], isCurrent: current === a.get("id"), witness: a.get("witness_account"), most_recent: _this4.props.current_aslot });
                    } else {
                        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(WitnessCard, { key: a.get("id"), rank: ranks[a.get("id")], witness: a.get("witness_account"), most_recent: _this4.props.current_aslot });
                    }
                });
            }

            // table view
            if (!cardView) {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "table",
                    { className: "table table-hover" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "thead",
                        null,
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "tr",
                            null,
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "th",
                                { className: "clickable", onClick: this._setSort.bind(this, 'rank') },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_translate_component___default.a, { content: "explorer.witnesses.rank" })
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "th",
                                { className: "clickable", onClick: this._setSort.bind(this, 'name') },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_translate_component___default.a, { content: "account.votes.name" })
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "th",
                                { className: "clickable", onClick: this._setSort.bind(this, 'last_aslot') },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_translate_component___default.a, { content: "explorer.blocks.last_block" })
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "th",
                                { className: "clickable", onClick: this._setSort.bind(this, 'last_confirmed_block_num') },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_translate_component___default.a, { content: "explorer.witnesses.last_confirmed" })
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "th",
                                { className: "clickable", onClick: this._setSort.bind(this, 'total_missed') },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_translate_component___default.a, { content: "explorer.witnesses.missed" })
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "th",
                                { className: "clickable", onClick: this._setSort.bind(this, 'total_collateral') },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_translate_component___default.a, { content: "explorer.witnesses.total_collateral" })
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "th",
                                { className: "clickable", onClick: this._setSort.bind(this, 'collateral_profit') },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_translate_component___default.a, { content: "explorer.witnesses.collateral_profit" })
                            )
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "tbody",
                        null,
                        itemRows
                    )
                );
            } else {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "grid-block small-up-1 medium-up-2 large-up-3" },
                    itemRows
                );
            }
        }
    }]);

    return WitnessList;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

WitnessList.propTypes = {
    witnesses: __WEBPACK_IMPORTED_MODULE_3__Utility_ChainTypes__["a" /* default */].ChainObjectsList.isRequired
};

WitnessList = Object(__WEBPACK_IMPORTED_MODULE_4__Utility_BindToChainState__["a" /* default */])(WitnessList, { keep_updating: true, show_loader: true });

var Witnesses = function (_React$Component4) {
    _inherits(Witnesses, _React$Component4);

    function Witnesses(props) {
        _classCallCheck(this, Witnesses);

        var _this5 = _possibleConstructorReturn(this, (Witnesses.__proto__ || Object.getPrototypeOf(Witnesses)).call(this, props));

        _this5.state = {
            filterWitness: props.filterWitness || "",
            cardView: props.cardView,
            viewType: 0,
            allWitnesses: []
        };
        return _this5;
    }

    _createClass(Witnesses, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            var _this6 = this;

            Apis.instance().db_api().exec("lookup_witness_accounts", ["", 1000]).then(function (r) {
                var arr = r.map(function (item, i) {
                    return item[1];
                });
                _this6.setState({ allWitnesses: arr });
                //   console.log(this.state.allWitnesses)
            });
        }
    }, {
        key: "_onFilter",
        value: function _onFilter(e) {
            e.preventDefault();
            this.setState({ filterWitness: e.target.value.toLowerCase() });

            __WEBPACK_IMPORTED_MODULE_10_actions_SettingsActions__["a" /* default */].changeViewSetting({
                filterWitness: e.target.value.toLowerCase()
            });
        }
    }, {
        key: "_toggleView",
        value: function _toggleView() {
            __WEBPACK_IMPORTED_MODULE_10_actions_SettingsActions__["a" /* default */].changeViewSetting({
                cardView: !this.state.cardView
            });

            this.setState({
                cardView: !this.state.cardView
            });
        }
    }, {
        key: "_activeView",
        value: function _activeView() {
            this.setState({ viewType: 0 });
        }
    }, {
        key: "_collateralView",
        value: function _collateralView() {
            this.setState({ viewType: 1 });
        }
    }, {
        key: "_allView",
        value: function _allView() {
            this.setState({ viewType: 2 });
        }
    }, {
        key: "render",
        value: function render() {
            var _props3 = this.props,
                dynGlobalObject = _props3.dynGlobalObject,
                globalObject = _props3.globalObject;

            dynGlobalObject = dynGlobalObject.toJS();
            globalObject = globalObject.toJS();

            var current = __WEBPACK_IMPORTED_MODULE_5_seerjs_es__["b" /* ChainStore */].getObject(dynGlobalObject.current_witness),
                currentAccount = null;
            if (current) {
                currentAccount = __WEBPACK_IMPORTED_MODULE_5_seerjs_es__["b" /* ChainStore */].getObject(current.get("witness_account"));
            }

            var witlst = void 0;
            if (this.state.viewType == 0) {
                witlst = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(WitnessList, {
                    current_aslot: dynGlobalObject.current_aslot,
                    current: current ? current.get("id") : null,
                    witnesses: __WEBPACK_IMPORTED_MODULE_1_immutable___default.a.List(globalObject.active_witnesses),
                    witnessList: globalObject.active_witnesses,
                    filter: this.state.filterWitness,
                    cardView: this.state.cardView
                });
            } else if (this.state.viewType == 1) {
                witlst = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(WitnessList, {
                    current_aslot: dynGlobalObject.current_aslot,
                    current: current ? current.get("id") : null,
                    witnesses: __WEBPACK_IMPORTED_MODULE_1_immutable___default.a.List(globalObject.active_collateral_witnesses),
                    witnessList: globalObject.active_collateral_witnesses,
                    filter: this.state.filterWitness,
                    cardView: this.state.cardView
                });
            } else if (this.state.viewType == 2) {
                witlst = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(WitnessList, {
                    current_aslot: dynGlobalObject.current_aslot,
                    current: current ? current.get("id") : null,
                    witnesses: __WEBPACK_IMPORTED_MODULE_1_immutable___default.a.List(this.state.allWitnesses),
                    witnessList: this.state.allWitnesses,
                    filter: this.state.filterWitness,
                    cardView: this.state.cardView
                });
            };

            var content = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "grid-block" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "grid-block" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "grid-block vertical small-5 medium-3" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "grid-content" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "table",
                                { className: "table key-value-table" },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "tbody",
                                    null,
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "tr",
                                        null,
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            "td",
                                            null,
                                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_translate_component___default.a, { content: "explorer.witnesses.current" })
                                        ),
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            "td",
                                            null,
                                            currentAccount ? currentAccount.get("name") : null
                                        )
                                    ),
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "tr",
                                        null,
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            "td",
                                            null,
                                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_translate_component___default.a, { content: "explorer.blocks.active_witnesses" })
                                        ),
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            "td",
                                            null,
                                            Object.keys(globalObject.active_witnesses).length
                                        )
                                    ),
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "tr",
                                        null,
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            "td",
                                            null,
                                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_translate_component___default.a, { content: "explorer.witnesses.participation" })
                                        ),
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            "td",
                                            null,
                                            dynGlobalObject.participation,
                                            "%"
                                        )
                                    ),
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "tr",
                                        null,
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            "td",
                                            null,
                                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_translate_component___default.a, { content: "explorer.witnesses.pay" })
                                        ),
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            "td",
                                            null,
                                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__Utility_FormattedAsset__["a" /* default */], { amount: globalObject.parameters.witness_pay_per_block, asset: "1.3.0" })
                                        )
                                    ),
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "tr",
                                        null,
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            "td",
                                            null,
                                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_translate_component___default.a, { content: "explorer.witnesses.budget" })
                                        ),
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            "td",
                                            null,
                                            " ",
                                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__Utility_FormattedAsset__["a" /* default */], { amount: dynGlobalObject.witness_budget, asset: "1.3.0" })
                                        )
                                    ),
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "tr",
                                        null,
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            "td",
                                            null,
                                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_translate_component___default.a, { content: "explorer.witnesses.next_vote" })
                                        ),
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            "td",
                                            null,
                                            " ",
                                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__Utility_TimeAgo__["a" /* default */], { time: new Date(dynGlobalObject.next_maintenance_time + "Z") })
                                        )
                                    ),
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "tr",
                                        null,
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            "td",
                                            null,
                                            " ",
                                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_translate_component___default.a, { component: "h4", content: "markets.filter" }),
                                            " "
                                        ),
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            "td",
                                            null,
                                            " ",
                                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "text", value: this.state.filterWitness, onChange: this._onFilter.bind(this) }),
                                            " "
                                        )
                                    )
                                )
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                null,
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "td",
                                    null,
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "span",
                                        { className: "button outline", onClick: this._activeView.bind(this) },
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_translate_component___default.a, { content: "explorer.witnesses.active" })
                                    )
                                ),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "td",
                                    null,
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "span",
                                        { className: "button outline", onClick: this._collateralView.bind(this) },
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_translate_component___default.a, { content: "explorer.witnesses.collateral" })
                                    )
                                ),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "td",
                                    null,
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "span",
                                        { className: "button outline", onClick: this._allView.bind(this) },
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_translate_component___default.a, { content: "explorer.witnesses.all" })
                                    )
                                )
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { className: "view-switcher" },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "td",
                                    null,
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "span",
                                        { className: "button outline", onClick: this._toggleView.bind(this) },
                                        !this.state.cardView ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_translate_component___default.a, { content: "explorer.witnesses.card" }) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_translate_component___default.a, { content: "explorer.witnesses.table" })
                                    )
                                )
                            )
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "grid-block" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "grid-content " },
                            witlst
                        )
                    )
                )
            );
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_13__Explorer__["default"], { tab: "witnesses", content: content });
        }
    }]);

    return Witnesses;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Witnesses.propTypes = {
    globalObject: __WEBPACK_IMPORTED_MODULE_3__Utility_ChainTypes__["a" /* default */].ChainObject.isRequired,
    dynGlobalObject: __WEBPACK_IMPORTED_MODULE_3__Utility_ChainTypes__["a" /* default */].ChainObject.isRequired
};
Witnesses.defaultProps = {
    globalObject: "2.0.0",
    dynGlobalObject: "2.1.0"
};

Witnesses = Object(__WEBPACK_IMPORTED_MODULE_4__Utility_BindToChainState__["a" /* default */])(Witnesses, { keep_updating: true });

var WitnessStoreWrapper = function (_React$Component5) {
    _inherits(WitnessStoreWrapper, _React$Component5);

    function WitnessStoreWrapper() {
        _classCallCheck(this, WitnessStoreWrapper);

        return _possibleConstructorReturn(this, (WitnessStoreWrapper.__proto__ || Object.getPrototypeOf(WitnessStoreWrapper)).apply(this, arguments));
    }

    _createClass(WitnessStoreWrapper, [{
        key: "render",
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Witnesses, this.props);
        }
    }]);

    return WitnessStoreWrapper;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

WitnessStoreWrapper = Object(__WEBPACK_IMPORTED_MODULE_9_alt_react__["connect"])(WitnessStoreWrapper, {
    listenTo: function listenTo() {
        return [__WEBPACK_IMPORTED_MODULE_11_stores_SettingsStore__["a" /* default */]];
    },
    getProps: function getProps() {
        return {
            cardView: __WEBPACK_IMPORTED_MODULE_11_stores_SettingsStore__["a" /* default */].getState().viewSettings.get("cardView"),
            filterWitness: __WEBPACK_IMPORTED_MODULE_11_stores_SettingsStore__["a" /* default */].getState().viewSettings.get("filterWitness")
        };
    }
});

/* harmony default export */ __webpack_exports__["default"] = (WitnessStoreWrapper);

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
//# sourceMappingURL=24.js.map