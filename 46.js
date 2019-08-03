webpackJsonp([46],{

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

/***/ 1951:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/react/react.js
var react = __webpack_require__(1);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-translate-component/index.js
var react_translate_component = __webpack_require__(5);
var react_translate_component_default = /*#__PURE__*/__webpack_require__.n(react_translate_component);

// EXTERNAL MODULE: ./app/components/Utility/FormattedAsset.jsx
var FormattedAsset = __webpack_require__(68);

// EXTERNAL MODULE: ./node_modules/react-foundation-apps/src/utils/foundation-api.js
var foundation_api = __webpack_require__(41);
var foundation_api_default = /*#__PURE__*/__webpack_require__.n(foundation_api);

// EXTERNAL MODULE: ./app/components/Utility/BindToChainState.jsx
var BindToChainState = __webpack_require__(32);

// EXTERNAL MODULE: ./app/components/Utility/Tabs.jsx
var Tabs = __webpack_require__(1541);

// EXTERNAL MODULE: ./node_modules/seerjs-ws/cjs/index.js
var cjs = __webpack_require__(8);
var cjs_default = /*#__PURE__*/__webpack_require__.n(cjs);

// EXTERNAL MODULE: ./node_modules/seerjs/dist/index.js
var dist = __webpack_require__(710);
var dist_default = /*#__PURE__*/__webpack_require__.n(dist);

// EXTERNAL MODULE: ./app/components/Utility/ChainTypes.js
var ChainTypes = __webpack_require__(33);

// EXTERNAL MODULE: ./app/components/Utility/TimeAgo.jsx
var TimeAgo = __webpack_require__(694);

// EXTERNAL MODULE: ./app/api/WalletApi.js
var WalletApi = __webpack_require__(280);

// EXTERNAL MODULE: ./app/alt-instance.js
var alt_instance = __webpack_require__(9);

// EXTERNAL MODULE: ./app/stores/WalletDb.js
var WalletDb = __webpack_require__(26);

// CONCATENATED MODULE: ./app/actions/WitnessActions.js
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





var WitnessActions_WitnessActions = function () {
    function WitnessActions() {
        _classCallCheck(this, WitnessActions);
    }

    _createClass(WitnessActions, [{
        key: "createCollateral",
        value: function createCollateral(args) {
            var tr = WalletApi["a" /* default */].new_transaction();

            tr.add_type_operation("witness_create_collateral", args);
            return function (dispatch) {
                return WalletDb["a" /* default */].process_transaction(tr, null, true).then(function (result) {
                    console.log("witness_create_collateral result:", result);
                    dispatch(true);
                }).catch(function (error) {
                    console.log("witness_create_collateral error ----->", error);
                    dispatch(false);
                });
            };
        }
    }, {
        key: "cancelCollateral",
        value: function cancelCollateral(args) {
            var tr = WalletApi["a" /* default */].new_transaction();

            tr.add_type_operation("witness_cancel_collateral", args);
            return function (dispatch) {
                return WalletDb["a" /* default */].process_transaction(tr, null, true).then(function (result) {
                    console.log("witness_cancel_collateral result:", result);
                    dispatch(true);
                }).catch(function (error) {
                    console.log("witness_cancel_collateral error ----->", error);
                    dispatch(false);
                });
            };
        }
    }, {
        key: "claimCollateral",
        value: function claimCollateral(args) {
            var tr = WalletApi["a" /* default */].new_transaction();

            tr.add_type_operation("witness_claim_collateral", args);
            return function (dispatch) {
                return WalletDb["a" /* default */].process_transaction(tr, null, true).then(function (result) {
                    console.log("witness_claim_collateral result:", result);
                    dispatch(true);
                }).catch(function (error) {
                    console.log("witness_claim_collateral error ----->", error);
                    dispatch(false);
                });
            };
        }
    }, {
        key: "create",
        value: function create(args) {
            var tr = WalletApi["a" /* default */].new_transaction();

            tr.add_type_operation("witness_create", args);
            return function (dispatch) {
                return WalletDb["a" /* default */].process_transaction(tr, null, true).then(function (result) {
                    console.log("witness_create result:", result);
                    dispatch(true);
                }).catch(function (error) {
                    console.log("witness_create error ----->", error);
                    dispatch(false);
                });
            };
        }
    }, {
        key: "update",
        value: function update(args) {
            var tr = WalletApi["a" /* default */].new_transaction();

            tr.add_type_operation("witness_update", args);
            return function (dispatch) {
                return WalletDb["a" /* default */].process_transaction(tr, null, true).then(function (result) {
                    console.log("witness_update result:", result);
                    dispatch(true);
                }).catch(function (error) {
                    console.log("witness_update error ----->", error);
                    dispatch(false);
                });
            };
        }
    }]);

    return WitnessActions;
}();

/* harmony default export */ var actions_WitnessActions = (alt_instance["a" /* default */].createActions(WitnessActions_WitnessActions));
// EXTERNAL MODULE: ./app/components/Modal/BaseModal.jsx
var BaseModal = __webpack_require__(105);

// EXTERNAL MODULE: ./node_modules/counterpart/index.js
var counterpart = __webpack_require__(3);
var counterpart_default = /*#__PURE__*/__webpack_require__.n(counterpart);

// EXTERNAL MODULE: ./app/components/Utility/AmountSelector.jsx
var AmountSelector = __webpack_require__(689);

// EXTERNAL MODULE: ./node_modules/react-router/es/index.js + 32 modules
var es = __webpack_require__(34);

// CONCATENATED MODULE: ./app/components/Account/AccountWitness.jsx
var AccountWitness__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function AccountWitness__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


















var AccountWitness_CollateralList = function (_React$Component) {
    _inherits(CollateralList, _React$Component);

    function CollateralList(props) {
        AccountWitness__classCallCheck(this, CollateralList);

        var _this = _possibleConstructorReturn(this, (CollateralList.__proto__ || Object.getPrototypeOf(CollateralList)).call(this, props));

        _this.state = {
            collaterals: []
        };
        return _this;
    }

    AccountWitness__createClass(CollateralList, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            var _this2 = this;

            cjs["Apis"].instance().db_api().exec("get_objects", [this.props.collaterals]).then(function (r) {
                _this2.setState({ collaterals: r });
            });
        }
    }, {
        key: "cancelCollateral",
        value: function cancelCollateral(accountId, collateralId) {
            var args = {
                witness: this.props.witnessId,
                witness_account: accountId,
                collateral_id: collateralId
            };
            actions_WitnessActions.cancelCollateral(args);
        }
    }, {
        key: "claimCollateral",
        value: function claimCollateral(accountId, collateralId) {
            var args = {
                witness: this.props.witnessId,
                witness_account: accountId,
                collateral_id: collateralId
            };
            actions_WitnessActions.claimCollateral(args);
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var now = new Date().valueOf() + new Date().getTimezoneOffset() * 60000;
            var collateralRows = this.state.collaterals.map(function (r) {
                return react_default.a.createElement(
                    "tr",
                    { key: r.id },
                    react_default.a.createElement(
                        "td",
                        null,
                        r.id
                    ),
                    react_default.a.createElement(
                        "td",
                        null,
                        r.start
                    ),
                    react_default.a.createElement(
                        "td",
                        null,
                        react_default.a.createElement(FormattedAsset["a" /* default */], { amount: r.amount, asset: "1.3.0", decimalOffset: 5 })
                    ),
                    react_default.a.createElement(
                        "td",
                        null,
                        r.expiration
                    ),
                    react_default.a.createElement(
                        "td",
                        null,
                        r.status ? now > new Date(r.expiration).valueOf() ? react_default.a.createElement(react_translate_component_default.a, { content: "account.witness.collateral.unfrozen" }) : react_default.a.createElement(react_translate_component_default.a, { content: "account.witness.collateral.unfreezing" }) : react_default.a.createElement(react_translate_component_default.a, { content: "account.witness.collateral.frozen" })
                    ),
                    react_default.a.createElement(
                        "td",
                        null,
                        r.status ? react_default.a.createElement(
                            "button",
                            { onClick: _this3.claimCollateral.bind(_this3, r.owner, r.id), className: "button " + (now > new Date(r.expiration).valueOf() ? '' : 'disabled') },
                            react_default.a.createElement(react_translate_component_default.a, { content: "account.witness.collateral.claim" })
                        ) : react_default.a.createElement(
                            "button",
                            { onClick: _this3.cancelCollateral.bind(_this3, r.owner, r.id), className: "button" },
                            react_default.a.createElement(react_translate_component_default.a, { content: "account.witness.collateral.cancel" })
                        )
                    )
                );
            });
            return react_default.a.createElement(
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
                            null,
                            "ID"
                        ),
                        react_default.a.createElement(
                            "th",
                            null,
                            react_default.a.createElement(react_translate_component_default.a, { content: "account.witness.collateral.date" })
                        ),
                        react_default.a.createElement(
                            "th",
                            null,
                            react_default.a.createElement(react_translate_component_default.a, { content: "account.witness.collateral.amount" })
                        ),
                        react_default.a.createElement(
                            "th",
                            null,
                            react_default.a.createElement(react_translate_component_default.a, { content: "account.witness.collateral.expiration" })
                        ),
                        react_default.a.createElement(
                            "th",
                            null,
                            react_default.a.createElement(react_translate_component_default.a, { content: "account.witness.collateral.status" })
                        ),
                        react_default.a.createElement(
                            "th",
                            null,
                            react_default.a.createElement(react_translate_component_default.a, { content: "account.witness.collateral.operation" })
                        )
                    )
                ),
                react_default.a.createElement(
                    "tbody",
                    null,
                    collateralRows
                )
            );
        }
    }]);

    return CollateralList;
}(react_default.a.Component);

AccountWitness_CollateralList.defaultProps = {};
AccountWitness_CollateralList.propTypes = {
    collaterals: ChainTypes["a" /* default */].ChainObjectsList.isRequired,
    witnessId: ChainTypes["a" /* default */].ChainObject.isRequired
};

var AccountWitness_AccountWitness = function (_React$Component2) {
    _inherits(AccountWitness, _React$Component2);

    // static defaultProps = {
    //     dynGlobalObject: '2.1.0',
    //     globalObject: "2.0.0",
    //
    // };
    //
    // static propTypes = {
    //     dynGlobalObject: ChainTypes.ChainObject.isRequired,
    //     globalObject: ChainTypes.ChainObject.isRequired,
    // };

    function AccountWitness(props) {
        AccountWitness__classCallCheck(this, AccountWitness);

        var _this4 = _possibleConstructorReturn(this, (AccountWitness.__proto__ || Object.getPrototypeOf(AccountWitness)).call(this, props));

        _this4.state = {
            witness: null,
            collateralAmount: "0",
            signingKey: "",
            witnessUrl: "",
            viewStatus: null
        };
        _this4.update = _this4.update.bind(_this4);
        return _this4;
    }

    AccountWitness__createClass(AccountWitness, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            dist["ChainStore"].subscribe(this.update);
            this.update();
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            dist["ChainStore"].unsubscribe(this.update);
        }
    }, {
        key: "update",
        value: function update(obj) {
            var witness = dist["ChainStore"].getWitnessById(this.props.account.get("id"));
            if (witness) this.setState({ witness: witness.toJS() });
        }
    }, {
        key: "openCreateCollateralModal",
        value: function openCreateCollateralModal() {
            foundation_api_default.a.publish("witness_create_collateral", "open");
        }
    }, {
        key: "closeCreateCollateralModal",
        value: function closeCreateCollateralModal() {
            foundation_api_default.a.publish("witness_create_collateral", "close");
        }
    }, {
        key: "createCollateral",
        value: function createCollateral(id) {
            var args = {
                witness: id,
                witness_account: this.props.account.get("id"),
                amount: this.state.collateralAmount * 100000
            };
            actions_WitnessActions.createCollateral(args);
            this.closeCreateCollateralModal();
        }
    }, {
        key: "openWitnessUpdateModal",
        value: function openWitnessUpdateModal() {
            foundation_api_default.a.publish("witness_update", "open");
        }
    }, {
        key: "closeWitnessUpdateModal",
        value: function closeWitnessUpdateModal() {
            foundation_api_default.a.publish("witness_update", "close");
        }
    }, {
        key: "updateWitness",
        value: function updateWitness(id) {
            var args = {
                witness: id,
                witness_account: this.props.account.get("id"),
                new_url: this.state.witnessUrl,
                new_signing_key: this.state.signingKey
            };
            actions_WitnessActions.update(args);
            this.closeWitnessUpdateModal();
        }
    }, {
        key: "createWitness",
        value: function createWitness() {
            var args = {
                witness_account: this.props.account.get("id"),
                url: this.state.witnessUrl,
                block_signing_key: this.state.signingKey
            };
            actions_WitnessActions.create(args);
        }
    }, {
        key: "claimProfit",
        value: function claimProfit(witnessId) {
            var args = {
                witness: witnessId,
                witness_account: this.props.account.get("id")
            };
            actions_WitnessActions.claimCollateral(args);
        }
    }, {
        key: "render",
        value: function render() {
            var _this5 = this;

            var account_name = this.props.account_name;

            var witness = this.state.witness,
                isLifetimeMember = this.props.account.get("id") === this.props.account.get("lifetime_referrer"),
                children = void 0;
            if (witness) {
                // let last_aslot_time = new Date(Date.now() - ((dynGlobalObject.get("current_aslot") - witness.last_aslot ) * globalObject.getIn( ["parameters","block_interval"] )*1000));
                children = react_default.a.createElement(
                    "div",
                    { className: "card-content" },
                    react_default.a.createElement(
                        "table",
                        { className: "table", style: { width: "100%" } },
                        react_default.a.createElement(
                            "tbody",
                            null,
                            react_default.a.createElement(
                                "tr",
                                null,
                                react_default.a.createElement(
                                    "td",
                                    null,
                                    react_default.a.createElement(react_translate_component_default.a, { content: "explorer.witnesses.total_collateral" })
                                ),
                                react_default.a.createElement(
                                    "td",
                                    null,
                                    react_default.a.createElement(FormattedAsset["a" /* default */], { amount: witness.total_collateral, asset: "1.3.0", decimalOffset: 5 })
                                )
                            ),
                            react_default.a.createElement(
                                "tr",
                                null,
                                react_default.a.createElement(
                                    "td",
                                    null,
                                    react_default.a.createElement(react_translate_component_default.a, { content: "explorer.witnesses.missed" })
                                ),
                                react_default.a.createElement(
                                    "td",
                                    null,
                                    witness.total_missed
                                )
                            ),

                            // <tr>
                            //     <td><Translate content="explorer.blocks.last_block" /></td>
                            //     <td><TimeAgo time={new Date(last_aslot_time)} /></td>
                            // </tr>
                            react_default.a.createElement(
                                "tr",
                                null,
                                react_default.a.createElement(
                                    "td",
                                    null,
                                    "URL"
                                ),
                                react_default.a.createElement(
                                    "td",
                                    null,
                                    witness.url
                                )
                            ),
                            react_default.a.createElement(
                                "tr",
                                null,
                                react_default.a.createElement(
                                    "td",
                                    null,
                                    react_default.a.createElement(react_translate_component_default.a, { content: "account.witness.signing_key" })
                                ),
                                react_default.a.createElement(
                                    "td",
                                    null,
                                    witness.signing_key
                                )
                            ),
                            react_default.a.createElement(
                                "tr",
                                null,
                                react_default.a.createElement(
                                    "td",
                                    null,
                                    react_default.a.createElement(react_translate_component_default.a, { content: "explorer.witnesses.collateral_profit" })
                                ),
                                react_default.a.createElement(
                                    "td",
                                    null,
                                    react_default.a.createElement(FormattedAsset["a" /* default */], { amount: witness.collateral_profit, asset: "1.3.0", decimalOffset: 5 }),
                                    "\xA0\xA0",
                                    react_default.a.createElement(
                                        "button",
                                        { onClick: this.claimProfit.bind(this, witness.id), className: "button small right" },
                                        react_default.a.createElement(react_translate_component_default.a, { content: "account.witness.collateral.claim" })
                                    )
                                )
                            )
                        )
                    ),
                    react_default.a.createElement("br", null),
                    react_default.a.createElement(
                        "div",
                        { className: "content-block" },
                        react_default.a.createElement(
                            "button",
                            { className: "button", onClick: this.openWitnessUpdateModal },
                            react_default.a.createElement(react_translate_component_default.a, { content: "account.witness.update" })
                        )
                    ),
                    react_default.a.createElement(
                        "h4",
                        null,
                        react_default.a.createElement(react_translate_component_default.a, { content: "account.witness.collateral.title" })
                    ),
                    react_default.a.createElement(AccountWitness_CollateralList, { witnessId: witness.id, collaterals: witness.collaterals }),
                    react_default.a.createElement("br", null),
                    react_default.a.createElement(
                        "div",
                        { className: "content-block" },
                        react_default.a.createElement(
                            "button",
                            { className: "button", onClick: this.openCreateCollateralModal },
                            react_default.a.createElement(react_translate_component_default.a, { content: "account.witness.collateral.create" })
                        )
                    ),
                    react_default.a.createElement(
                        BaseModal["a" /* default */],
                        { id: "witness_create_collateral", overlay: true },
                        react_default.a.createElement(
                            "h5",
                            null,
                            react_default.a.createElement(react_translate_component_default.a, { content: "account.witness.collateral.create" })
                        ),
                        react_default.a.createElement(
                            "div",
                            { className: "grid-container ", style: { paddingTop: "2rem" } },
                            react_default.a.createElement(AmountSelector["a" /* default */], {
                                label: "account.witness.collateral.amount",
                                amount: this.state.collateralAmount,
                                onChange: function onChange(v) {
                                    return _this5.setState({ collateralAmount: v.amount });
                                },
                                asset: "1.3.0",
                                assets: ["1.3.0"]
                            }),
                            react_default.a.createElement("br", null),
                            react_default.a.createElement(
                                "div",
                                { className: "content-block button-group" },
                                react_default.a.createElement(
                                    "button",
                                    { className: "button", onClick: this.createCollateral.bind(this, witness.id) },
                                    counterpart_default.a.translate("submit")
                                ),
                                react_default.a.createElement(
                                    "button",
                                    { className: "button", onClick: this.closeCreateCollateralModal },
                                    counterpart_default.a.translate("cancel")
                                )
                            )
                        )
                    ),
                    react_default.a.createElement(
                        BaseModal["a" /* default */],
                        { id: "witness_update", overlay: true },
                        react_default.a.createElement(
                            "h5",
                            null,
                            react_default.a.createElement(react_translate_component_default.a, { content: "account.witness.update" })
                        ),
                        react_default.a.createElement(
                            "div",
                            { className: "grid-container ", style: { paddingTop: "2rem" } },
                            react_default.a.createElement(
                                "label",
                                null,
                                react_default.a.createElement(
                                    "span",
                                    null,
                                    react_default.a.createElement(react_translate_component_default.a, { content: "account.witness.signing_key" })
                                ),
                                react_default.a.createElement("input", {
                                    type: "text",
                                    value: this.state.signingKey,
                                    onChange: function onChange(e) {
                                        return _this5.setState({ signingKey: e.target.value });
                                    }
                                })
                            ),
                            react_default.a.createElement(
                                "label",
                                null,
                                react_default.a.createElement(
                                    "span",
                                    null,
                                    "URL"
                                ),
                                react_default.a.createElement("input", {
                                    type: "text",
                                    value: this.state.witnessUrl,
                                    onChange: function onChange(e) {
                                        return _this5.setState({ witnessUrl: e.target.value });
                                    }
                                })
                            ),
                            react_default.a.createElement("br", null),
                            react_default.a.createElement(
                                "div",
                                { className: "content-block button-group" },
                                react_default.a.createElement(
                                    "button",
                                    { className: "button", onClick: this.updateWitness.bind(this, witness.id) },
                                    counterpart_default.a.translate("submit")
                                ),
                                react_default.a.createElement(
                                    "button",
                                    { className: "button", onClick: this.closeWitnessUpdateModal },
                                    counterpart_default.a.translate("cancel")
                                )
                            )
                        )
                    )
                );
            } else {
                if (this.state.viewStatus === "witness_create") {
                    children = react_default.a.createElement(
                        "div",
                        null,
                        react_default.a.createElement(
                            "div",
                            { className: "content-block" },
                            react_default.a.createElement(react_translate_component_default.a, { component: "label", content: "account.witness.signing_key" }),
                            react_default.a.createElement(
                                "textarea",
                                { onChange: function onChange(e) {
                                        return _this5.setState({ signingKey: e.target.value });
                                    }, style: { height: "6.69em", resize: "none" } },
                                this.state.signingKey
                            )
                        ),
                        react_default.a.createElement(
                            "div",
                            { className: "content-block" },
                            react_default.a.createElement(
                                "label",
                                null,
                                "URL"
                            ),
                            react_default.a.createElement("input", {
                                type: "text",
                                value: this.state.witnessUrl,
                                onChange: function onChange(e) {
                                    return _this5.setState({ witnessUrl: e.target.value });
                                }
                            })
                        ),
                        react_default.a.createElement(
                            "button",
                            { onClick: this.createWitness.bind(this), className: "button primary", style: { marginTop: "48px" } },
                            react_default.a.createElement(react_translate_component_default.a, { content: "account.witness.create" })
                        )
                    );
                } else {
                    children = react_default.a.createElement(
                        "div",
                        { className: "content-block" },
                        react_default.a.createElement(
                            "div",
                            { className: "content-block", style: { textAlign: "center", marginTop: "8em" } },
                            react_default.a.createElement(
                                "svg",
                                { className: "icon", "aria-hidden": "true", style: { width: "5.19em", height: "4.35em", marginBottom: "10px" } },
                                react_default.a.createElement("use", { xlinkHref: "#icon-zanwujilu1-copy" })
                            ),
                            react_default.a.createElement(
                                "p",
                                null,
                                react_default.a.createElement(react_translate_component_default.a, { content: "account.witness.not_created", style: { fontSize: "14px", color: "#999999" } }),
                                !isLifetimeMember && react_default.a.createElement(
                                    es["b" /* Link */],
                                    { to: "/account/" + account_name + "/member-stats", style: { fontSize: "14px" } },
                                    react_default.a.createElement(react_translate_component_default.a, { content: "account.witness.not_lifetime_member" })
                                )
                            ),
                            react_default.a.createElement("br", null),
                            react_default.a.createElement(
                                "button",
                                { className: "button  primary " + (isLifetimeMember ? '' : 'disabled'), onClick: function onClick(e) {
                                        return _this5.setState({ viewStatus: "witness_create" });
                                    } },
                                react_default.a.createElement(react_translate_component_default.a, { content: "account.witness.create" })
                            )
                        )
                    );
                }
            }

            return react_default.a.createElement(
                "div",
                { className: "grid-content app-tables no-padding", ref: "appTables" },
                react_default.a.createElement(
                    "div",
                    { className: "content-block small-12", style: { paddingTop: "34px" } },
                    react_default.a.createElement(react_translate_component_default.a, { content: "account.witness.title", component: "h5", style: { fontWeight: "bold" } }),
                    react_default.a.createElement(react_translate_component_default.a, { content: "account.witness.explain", component: "p", style: { fontSize: "14px", color: "#999" } }),
                    react_default.a.createElement(
                        es["b" /* Link */],
                        { to: "" },
                        " ",
                        react_default.a.createElement(react_translate_component_default.a, { content: "account.witness.tips" })
                    ),
                    react_default.a.createElement(
                        "div",
                        { style: { marginTop: "48px" } },
                        children
                    )
                )
            );
        }
    }]);

    return AccountWitness;
}(react_default.a.Component);

AccountWitness_AccountWitness = Object(BindToChainState["a" /* default */])(AccountWitness_AccountWitness);

/* harmony default export */ var Account_AccountWitness = __webpack_exports__["default"] = (AccountWitness_AccountWitness);

/***/ })

});
//# sourceMappingURL=46.js.map