webpackJsonp([22],{

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

/***/ 1542:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_alt_instance__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_seerjs_ws__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_seerjs_ws___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_seerjs_ws__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_utils__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_api_WalletApi__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_api_ApplicationApi__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_stores_WalletDb__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_seerjs_es__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_bignumber_js__ = __webpack_require__(1545);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_bignumber_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_bignumber_js__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }










var inProgress = {};

var AssetActions = function () {
    function AssetActions() {
        _classCallCheck(this, AssetActions);
    }

    _createClass(AssetActions, [{
        key: "fundPool",
        value: function fundPool(account_id, core, asset, amount) {
            var tr = __WEBPACK_IMPORTED_MODULE_3_api_WalletApi__["a" /* default */].new_transaction();
            var precision = __WEBPACK_IMPORTED_MODULE_2_common_utils__["a" /* default */].get_asset_precision(core.get("precision"));
            tr.add_type_operation("asset_fund_fee_pool", {
                "fee": {
                    amount: 0,
                    asset_id: "1.3.0"
                },
                "from_account": account_id,
                "asset_id": asset.get("id"),
                "amount": amount * precision
            });

            return function (dispatch) {
                return __WEBPACK_IMPORTED_MODULE_5_stores_WalletDb__["a" /* default */].process_transaction(tr, null, true).then(function () {
                    dispatch(true);
                }).catch(function (error) {
                    console.log("[AssetActions.js:150] ----- fundPool error ----->", error);
                    dispatch(false);
                });
            };
        }
    }, {
        key: "updateFeedProducers",
        value: function updateFeedProducers(account, asset, producers) {
            var tr = __WEBPACK_IMPORTED_MODULE_3_api_WalletApi__["a" /* default */].new_transaction();
            tr.add_type_operation("asset_update_feed_producers", {
                "fee": {
                    amount: 0,
                    asset_id: "1.3.0"
                },
                "issuer": account,
                "asset_to_update": asset.get("id"),
                "new_feed_producers": producers
            });

            return function (dispatch) {
                return __WEBPACK_IMPORTED_MODULE_5_stores_WalletDb__["a" /* default */].process_transaction(tr, null, true).then(function () {
                    dispatch(true);
                }).catch(function (error) {
                    console.log("[AssetActions.js:150] ----- updateFeedProducers error ----->", error);
                    dispatch(false);
                });
            };
        }
    }, {
        key: "claimPoolFees",
        value: function claimPoolFees(account_id, asset, amount) {
            var tr = __WEBPACK_IMPORTED_MODULE_3_api_WalletApi__["a" /* default */].new_transaction();
            var precision = __WEBPACK_IMPORTED_MODULE_2_common_utils__["a" /* default */].get_asset_precision(asset.get("precision"));

            tr.add_type_operation("asset_claim_fees", {
                "fee": {
                    amount: 0,
                    asset_id: 0
                },
                "issuer": account_id,
                "amount_to_claim": {
                    "asset_id": asset.get("id"),
                    "amount": amount * precision
                }
            });
            return function (dispatch) {
                return __WEBPACK_IMPORTED_MODULE_5_stores_WalletDb__["a" /* default */].process_transaction(tr, null, true).then(function (result) {
                    dispatch(true);
                }).catch(function (error) {
                    console.log("[AssetActions.js:150] ----- claimFees error ----->", error);
                    dispatch(false);
                });
            };
        }
    }, {
        key: "createAsset",
        value: function createAsset(account_id, createObject, flags, permissions, cer, description) {
            // Create asset action here...
            console.log("create asset:", createObject, "flags:", flags);
            var tr = __WEBPACK_IMPORTED_MODULE_3_api_WalletApi__["a" /* default */].new_transaction();
            var precision = __WEBPACK_IMPORTED_MODULE_2_common_utils__["a" /* default */].get_asset_precision(createObject.precision);

            __WEBPACK_IMPORTED_MODULE_7_bignumber_js___default.a.config({ DECIMAL_PLACES: createObject.precision });
            var max_supply = new __WEBPACK_IMPORTED_MODULE_7_bignumber_js___default.a(createObject.max_supply).times(precision).toString();
            var max_market_fee = new __WEBPACK_IMPORTED_MODULE_7_bignumber_js___default.a(createObject.max_market_fee || 0).times(precision).toString();
            // console.log("max_supply:", max_supply);
            // console.log("max_market_fee:", max_market_fee);

            var corePrecision = __WEBPACK_IMPORTED_MODULE_2_common_utils__["a" /* default */].get_asset_precision(__WEBPACK_IMPORTED_MODULE_6_seerjs_es__["b" /* ChainStore */].getAsset(cer.base.asset_id).get("precision"));

            var operationJSON = {
                "fee": {
                    amount: 0,
                    asset_id: 0
                },
                "issuer": account_id,
                "symbol": createObject.symbol,
                "precision": parseInt(createObject.precision, 10),
                "common_options": {
                    "max_supply": max_supply,
                    "market_fee_percent": createObject.market_fee_percent * 100 || 0,
                    "max_market_fee": max_market_fee,
                    "issuer_permissions": permissions,
                    "flags": flags,
                    "core_exchange_rate": {
                        "base": {
                            "amount": cer.base.amount * corePrecision,
                            "asset_id": cer.base.asset_id
                        },
                        "quote": {
                            "amount": cer.quote.amount * precision,
                            "asset_id": "1.3.1"
                        }
                    },
                    "whitelist_authorities": [],
                    "blacklist_authorities": [],
                    "whitelist_markets": [],
                    "blacklist_markets": [],
                    "description": description,
                    "extensions": null
                },
                "extensions": null
            };

            tr.add_type_operation("asset_create", operationJSON);
            return function (dispatch) {
                return __WEBPACK_IMPORTED_MODULE_5_stores_WalletDb__["a" /* default */].process_transaction(tr, null, true).then(function (result) {
                    // console.log("asset create result:", result);
                    // this.dispatch(account_id);
                    dispatch(true);
                }).catch(function (error) {
                    console.log("[AssetActions.js:150] ----- createAsset error ----->", error);
                    dispatch(false);
                });
            };
        }
    }, {
        key: "updateAsset",
        value: function updateAsset(issuer, new_issuer, update, core_exchange_rate, asset, flags, permissions, description, auths, assetChanged) {

            // Create asset action here...
            var tr = __WEBPACK_IMPORTED_MODULE_3_api_WalletApi__["a" /* default */].new_transaction();
            if (assetChanged) {
                var quotePrecision = __WEBPACK_IMPORTED_MODULE_2_common_utils__["a" /* default */].get_asset_precision(asset.get("precision"));

                __WEBPACK_IMPORTED_MODULE_7_bignumber_js___default.a.config({ DECIMAL_PLACES: asset.get("precision") });
                var max_supply = new __WEBPACK_IMPORTED_MODULE_7_bignumber_js___default.a(update.max_supply).times(quotePrecision).toString();
                var max_market_fee = new __WEBPACK_IMPORTED_MODULE_7_bignumber_js___default.a(update.max_market_fee || 0).times(quotePrecision).toString();

                var cr_quote_asset = __WEBPACK_IMPORTED_MODULE_6_seerjs_es__["b" /* ChainStore */].getAsset(core_exchange_rate.quote.asset_id);
                var cr_quote_precision = __WEBPACK_IMPORTED_MODULE_2_common_utils__["a" /* default */].get_asset_precision(cr_quote_asset.get("precision"));
                var cr_base_asset = __WEBPACK_IMPORTED_MODULE_6_seerjs_es__["b" /* ChainStore */].getAsset(core_exchange_rate.base.asset_id);
                var cr_base_precision = __WEBPACK_IMPORTED_MODULE_2_common_utils__["a" /* default */].get_asset_precision(cr_base_asset.get("precision"));

                var cr_quote_amount = new __WEBPACK_IMPORTED_MODULE_7_bignumber_js___default.a(core_exchange_rate.quote.amount).times(cr_quote_precision).toString();
                var cr_base_amount = new __WEBPACK_IMPORTED_MODULE_7_bignumber_js___default.a(core_exchange_rate.base.amount).times(cr_base_precision).toString();
                console.log("auths:", auths);
                var updateObject = {
                    fee: {
                        amount: 0,
                        asset_id: 0
                    },
                    asset_to_update: asset.get("id"),
                    extensions: asset.get("extensions"),
                    issuer: issuer,
                    new_issuer: new_issuer,
                    new_options: {
                        max_supply: max_supply,
                        max_market_fee: max_market_fee,
                        market_fee_percent: update.market_fee_percent * 100,
                        description: description,
                        issuer_permissions: permissions,
                        flags: flags,
                        whitelist_authorities: auths.whitelist_authorities.toJS(),
                        blacklist_authorities: auths.blacklist_authorities.toJS(),
                        whitelist_markets: auths.whitelist_markets.toJS(),
                        blacklist_markets: auths.blacklist_markets.toJS(),
                        extensions: asset.getIn(["options", "extensions"]),
                        core_exchange_rate: {
                            quote: {
                                amount: cr_quote_amount,
                                asset_id: core_exchange_rate.quote.asset_id
                            },
                            base: {
                                amount: cr_base_amount,
                                asset_id: core_exchange_rate.base.asset_id
                            }
                        }
                    }
                };

                if (issuer === new_issuer || !new_issuer) {
                    delete updateObject.new_issuer;
                }
                tr.add_type_operation("asset_update", updateObject);
            }

            return __WEBPACK_IMPORTED_MODULE_5_stores_WalletDb__["a" /* default */].process_transaction(tr, null, true).then(function (result) {
                // console.log("asset create result:", result);
                // this.dispatch(account_id);
                return true;
            }).catch(function (error) {
                console.log("[AssetActions.js:150] ----- updateAsset error ----->", error);
                return false;
            });
        }
    }, {
        key: "issueAsset",
        value: function issueAsset(to_account, from_account, asset_id, amount, memo) {

            __WEBPACK_IMPORTED_MODULE_4_api_ApplicationApi__["a" /* default */].issue_asset(to_account, from_account, asset_id, amount, memo);
        }

        // issueAsset(account_id, issueObject) {
        //     console.log("account_id: ", account_id, issueObject);
        //     // Create asset action here...
        //     var tr = WalletApi.new_transaction();
        //     tr.add_type_operation("asset_issue", {
        //         fee: {
        //             amount: 0,
        //             asset_id: 0
        //         },
        //         "issuer": account_id,
        //         "asset_to_issue": {
        //             "amount": issueObject.amount,
        //             "asset_id": issueObject.asset_id
        //         },
        //         "issue_to_account": issueObject.to_id,

        //         "extensions": [

        //         ]
        //     });
        //     return WalletDb.process_transaction(tr, null, true).then(result => {
        //         console.log("asset issue result:", result);
        //         // this.dispatch(account_id);
        //         return true;
        //     }).catch(error => {
        //         console.log("[AssetActions.js:150] ----- createAsset error ----->", error);
        //         return false;
        //     });
        // }

    }, {
        key: "getAssetList",
        value: function getAssetList(start, count) {

            var id = start + "_" + count;
            return function (dispatch) {
                if (!inProgress[id]) {
                    inProgress[id] = true;
                    dispatch({ loading: true });
                    return __WEBPACK_IMPORTED_MODULE_1_seerjs_ws__["Apis"].instance().db_api().exec("list_assets", [start, count]).then(function (assets) {
                        var dynamicIDS = [];

                        assets.forEach(function (asset) {
                            __WEBPACK_IMPORTED_MODULE_6_seerjs_es__["b" /* ChainStore */]._updateObject(asset, false);
                            dynamicIDS.push(asset.dynamic_asset_data_id);
                        });

                        var dynamicPromise = __WEBPACK_IMPORTED_MODULE_1_seerjs_ws__["Apis"].instance().db_api().exec("get_objects", [dynamicIDS]);

                        Promise.all([dynamicPromise]).then(function (results) {
                            delete inProgress[id];
                            dispatch({
                                assets: assets,
                                dynamic: results[0],
                                loading: false
                            });
                            return assets && assets.length;
                        });
                    }).catch(function (error) {
                        console.log("Error in AssetActions.getAssetList: ", error);
                        dispatch({ loading: false });
                        delete inProgress[id];
                    });
                }
            };
        }
    }, {
        key: "lookupAsset",
        value: function lookupAsset(symbol, searchID) {
            var asset = __WEBPACK_IMPORTED_MODULE_6_seerjs_es__["b" /* ChainStore */].getAsset(symbol);

            if (asset) {
                return {
                    assets: [asset],
                    searchID: searchID,
                    symbol: symbol
                };
            } else {
                return function (dispatch) {
                    // Hack to retry once until we replace this method with a new api call to lookup multiple assets
                    setTimeout(function () {
                        var asset = __WEBPACK_IMPORTED_MODULE_6_seerjs_es__["b" /* ChainStore */].getAsset(symbol);
                        if (asset) {
                            dispatch({
                                assets: [asset],
                                searchID: searchID,
                                symbol: symbol
                            });
                        }
                    }, 200);
                };
            }
        }
    }, {
        key: "reserveAsset",
        value: function reserveAsset(amount, assetId, payer) {
            var tr = __WEBPACK_IMPORTED_MODULE_3_api_WalletApi__["a" /* default */].new_transaction();
            tr.add_type_operation("asset_reserve", {
                fee: {
                    amount: 0,
                    asset_id: 0
                },
                "amount_to_reserve": {
                    "amount": amount,
                    "asset_id": assetId
                },
                payer: payer,
                "extensions": []
            });
            return __WEBPACK_IMPORTED_MODULE_5_stores_WalletDb__["a" /* default */].process_transaction(tr, null, true).then(function (result) {
                return true;
            }).catch(function (error) {
                console.log("[AssetActions.js:150] ----- reserveAsset error ----->", error);
                return false;
            });
        }
    }]);

    return AssetActions;
}();

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_alt_instance__["a" /* default */].createActions(AssetActions));

/***/ }),

/***/ 1545:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*! bignumber.js v4.1.0 https://github.com/MikeMcl/bignumber.js/LICENCE */

;(function (globalObj) {
    'use strict';

    /*
      bignumber.js v4.1.0
      A JavaScript library for arbitrary-precision arithmetic.
      https://github.com/MikeMcl/bignumber.js
      Copyright (c) 2017 Michael Mclaughlin <M8ch88l@gmail.com>
      MIT Expat Licence
    */


    var BigNumber,
        isNumeric = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
        mathceil = Math.ceil,
        mathfloor = Math.floor,
        notBool = ' not a boolean or binary digit',
        roundingMode = 'rounding mode',
        tooManyDigits = 'number type has more than 15 significant digits',
        ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_',
        BASE = 1e14,
        LOG_BASE = 14,
        MAX_SAFE_INTEGER = 0x1fffffffffffff,         // 2^53 - 1
        // MAX_INT32 = 0x7fffffff,                   // 2^31 - 1
        POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
        SQRT_BASE = 1e7,

        /*
         * The limit on the value of DECIMAL_PLACES, TO_EXP_NEG, TO_EXP_POS, MIN_EXP, MAX_EXP, and
         * the arguments to toExponential, toFixed, toFormat, and toPrecision, beyond which an
         * exception is thrown (if ERRORS is true).
         */
        MAX = 1E9;                                   // 0 to MAX_INT32


    /*
     * Create and return a BigNumber constructor.
     */
    function constructorFactory(config) {
        var div, parseNumeric,

            // id tracks the caller function, so its name can be included in error messages.
            id = 0,
            P = BigNumber.prototype,
            ONE = new BigNumber(1),


            /********************************* EDITABLE DEFAULTS **********************************/


            /*
             * The default values below must be integers within the inclusive ranges stated.
             * The values can also be changed at run-time using BigNumber.config.
             */

            // The maximum number of decimal places for operations involving division.
            DECIMAL_PLACES = 20,                     // 0 to MAX

            /*
             * The rounding mode used when rounding to the above decimal places, and when using
             * toExponential, toFixed, toFormat and toPrecision, and round (default value).
             * UP         0 Away from zero.
             * DOWN       1 Towards zero.
             * CEIL       2 Towards +Infinity.
             * FLOOR      3 Towards -Infinity.
             * HALF_UP    4 Towards nearest neighbour. If equidistant, up.
             * HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
             * HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
             * HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
             * HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
             */
            ROUNDING_MODE = 4,                       // 0 to 8

            // EXPONENTIAL_AT : [TO_EXP_NEG , TO_EXP_POS]

            // The exponent value at and beneath which toString returns exponential notation.
            // Number type: -7
            TO_EXP_NEG = -7,                         // 0 to -MAX

            // The exponent value at and above which toString returns exponential notation.
            // Number type: 21
            TO_EXP_POS = 21,                         // 0 to MAX

            // RANGE : [MIN_EXP, MAX_EXP]

            // The minimum exponent value, beneath which underflow to zero occurs.
            // Number type: -324  (5e-324)
            MIN_EXP = -1e7,                          // -1 to -MAX

            // The maximum exponent value, above which overflow to Infinity occurs.
            // Number type:  308  (1.7976931348623157e+308)
            // For MAX_EXP > 1e7, e.g. new BigNumber('1e100000000').plus(1) may be slow.
            MAX_EXP = 1e7,                           // 1 to MAX

            // Whether BigNumber Errors are ever thrown.
            ERRORS = true,                           // true or false

            // Change to intValidatorNoErrors if ERRORS is false.
            isValidInt = intValidatorWithErrors,     // intValidatorWithErrors/intValidatorNoErrors

            // Whether to use cryptographically-secure random number generation, if available.
            CRYPTO = false,                          // true or false

            /*
             * The modulo mode used when calculating the modulus: a mod n.
             * The quotient (q = a / n) is calculated according to the corresponding rounding mode.
             * The remainder (r) is calculated as: r = a - n * q.
             *
             * UP        0 The remainder is positive if the dividend is negative, else is negative.
             * DOWN      1 The remainder has the same sign as the dividend.
             *             This modulo mode is commonly known as 'truncated division' and is
             *             equivalent to (a % n) in JavaScript.
             * FLOOR     3 The remainder has the same sign as the divisor (Python %).
             * HALF_EVEN 6 This modulo mode implements the IEEE 754 remainder function.
             * EUCLID    9 Euclidian division. q = sign(n) * floor(a / abs(n)).
             *             The remainder is always positive.
             *
             * The truncated division, floored division, Euclidian division and IEEE 754 remainder
             * modes are commonly used for the modulus operation.
             * Although the other rounding modes can also be used, they may not give useful results.
             */
            MODULO_MODE = 1,                         // 0 to 9

            // The maximum number of significant digits of the result of the toPower operation.
            // If POW_PRECISION is 0, there will be unlimited significant digits.
            POW_PRECISION = 0,                       // 0 to MAX

            // The format specification used by the BigNumber.prototype.toFormat method.
            FORMAT = {
                decimalSeparator: '.',
                groupSeparator: ',',
                groupSize: 3,
                secondaryGroupSize: 0,
                fractionGroupSeparator: '\xA0',      // non-breaking space
                fractionGroupSize: 0
            };


        /******************************************************************************************/


        // CONSTRUCTOR


        /*
         * The BigNumber constructor and exported function.
         * Create and return a new instance of a BigNumber object.
         *
         * n {number|string|BigNumber} A numeric value.
         * [b] {number} The base of n. Integer, 2 to 64 inclusive.
         */
        function BigNumber( n, b ) {
            var c, e, i, num, len, str,
                x = this;

            // Enable constructor usage without new.
            if ( !( x instanceof BigNumber ) ) {

                // 'BigNumber() constructor call without new: {n}'
                if (ERRORS) raise( 26, 'constructor call without new', n );
                return new BigNumber( n, b );
            }

            // 'new BigNumber() base not an integer: {b}'
            // 'new BigNumber() base out of range: {b}'
            if ( b == null || !isValidInt( b, 2, 64, id, 'base' ) ) {

                // Duplicate.
                if ( n instanceof BigNumber ) {
                    x.s = n.s;
                    x.e = n.e;
                    x.c = ( n = n.c ) ? n.slice() : n;
                    id = 0;
                    return;
                }

                if ( ( num = typeof n == 'number' ) && n * 0 == 0 ) {
                    x.s = 1 / n < 0 ? ( n = -n, -1 ) : 1;

                    // Fast path for integers.
                    if ( n === ~~n ) {
                        for ( e = 0, i = n; i >= 10; i /= 10, e++ );
                        x.e = e;
                        x.c = [n];
                        id = 0;
                        return;
                    }

                    str = n + '';
                } else {
                    if ( !isNumeric.test( str = n + '' ) ) return parseNumeric( x, str, num );
                    x.s = str.charCodeAt(0) === 45 ? ( str = str.slice(1), -1 ) : 1;
                }
            } else {
                b = b | 0;
                str = n + '';

                // Ensure return value is rounded to DECIMAL_PLACES as with other bases.
                // Allow exponential notation to be used with base 10 argument.
                if ( b == 10 ) {
                    x = new BigNumber( n instanceof BigNumber ? n : str );
                    return round( x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE );
                }

                // Avoid potential interpretation of Infinity and NaN as base 44+ values.
                // Any number in exponential form will fail due to the [Ee][+-].
                if ( ( num = typeof n == 'number' ) && n * 0 != 0 ||
                  !( new RegExp( '^-?' + ( c = '[' + ALPHABET.slice( 0, b ) + ']+' ) +
                    '(?:\\.' + c + ')?$',b < 37 ? 'i' : '' ) ).test(str) ) {
                    return parseNumeric( x, str, num, b );
                }

                if (num) {
                    x.s = 1 / n < 0 ? ( str = str.slice(1), -1 ) : 1;

                    if ( ERRORS && str.replace( /^0\.0*|\./, '' ).length > 15 ) {

                        // 'new BigNumber() number type has more than 15 significant digits: {n}'
                        raise( id, tooManyDigits, n );
                    }

                    // Prevent later check for length on converted number.
                    num = false;
                } else {
                    x.s = str.charCodeAt(0) === 45 ? ( str = str.slice(1), -1 ) : 1;
                }

                str = convertBase( str, 10, b, x.s );
            }

            // Decimal point?
            if ( ( e = str.indexOf('.') ) > -1 ) str = str.replace( '.', '' );

            // Exponential form?
            if ( ( i = str.search( /e/i ) ) > 0 ) {

                // Determine exponent.
                if ( e < 0 ) e = i;
                e += +str.slice( i + 1 );
                str = str.substring( 0, i );
            } else if ( e < 0 ) {

                // Integer.
                e = str.length;
            }

            // Determine leading zeros.
            for ( i = 0; str.charCodeAt(i) === 48; i++ );

            // Determine trailing zeros.
            for ( len = str.length; str.charCodeAt(--len) === 48; );
            str = str.slice( i, len + 1 );

            if (str) {
                len = str.length;

                // Disallow numbers with over 15 significant digits if number type.
                // 'new BigNumber() number type has more than 15 significant digits: {n}'
                if ( num && ERRORS && len > 15 && ( n > MAX_SAFE_INTEGER || n !== mathfloor(n) ) ) {
                    raise( id, tooManyDigits, x.s * n );
                }

                e = e - i - 1;

                 // Overflow?
                if ( e > MAX_EXP ) {

                    // Infinity.
                    x.c = x.e = null;

                // Underflow?
                } else if ( e < MIN_EXP ) {

                    // Zero.
                    x.c = [ x.e = 0 ];
                } else {
                    x.e = e;
                    x.c = [];

                    // Transform base

                    // e is the base 10 exponent.
                    // i is where to slice str to get the first element of the coefficient array.
                    i = ( e + 1 ) % LOG_BASE;
                    if ( e < 0 ) i += LOG_BASE;

                    if ( i < len ) {
                        if (i) x.c.push( +str.slice( 0, i ) );

                        for ( len -= LOG_BASE; i < len; ) {
                            x.c.push( +str.slice( i, i += LOG_BASE ) );
                        }

                        str = str.slice(i);
                        i = LOG_BASE - str.length;
                    } else {
                        i -= len;
                    }

                    for ( ; i--; str += '0' );
                    x.c.push( +str );
                }
            } else {

                // Zero.
                x.c = [ x.e = 0 ];
            }

            id = 0;
        }


        // CONSTRUCTOR PROPERTIES


        BigNumber.another = constructorFactory;

        BigNumber.ROUND_UP = 0;
        BigNumber.ROUND_DOWN = 1;
        BigNumber.ROUND_CEIL = 2;
        BigNumber.ROUND_FLOOR = 3;
        BigNumber.ROUND_HALF_UP = 4;
        BigNumber.ROUND_HALF_DOWN = 5;
        BigNumber.ROUND_HALF_EVEN = 6;
        BigNumber.ROUND_HALF_CEIL = 7;
        BigNumber.ROUND_HALF_FLOOR = 8;
        BigNumber.EUCLID = 9;


        /*
         * Configure infrequently-changing library-wide settings.
         *
         * Accept an object or an argument list, with one or many of the following properties or
         * parameters respectively:
         *
         *   DECIMAL_PLACES  {number}  Integer, 0 to MAX inclusive
         *   ROUNDING_MODE   {number}  Integer, 0 to 8 inclusive
         *   EXPONENTIAL_AT  {number|number[]}  Integer, -MAX to MAX inclusive or
         *                                      [integer -MAX to 0 incl., 0 to MAX incl.]
         *   RANGE           {number|number[]}  Non-zero integer, -MAX to MAX inclusive or
         *                                      [integer -MAX to -1 incl., integer 1 to MAX incl.]
         *   ERRORS          {boolean|number}   true, false, 1 or 0
         *   CRYPTO          {boolean|number}   true, false, 1 or 0
         *   MODULO_MODE     {number}           0 to 9 inclusive
         *   POW_PRECISION   {number}           0 to MAX inclusive
         *   FORMAT          {object}           See BigNumber.prototype.toFormat
         *      decimalSeparator       {string}
         *      groupSeparator         {string}
         *      groupSize              {number}
         *      secondaryGroupSize     {number}
         *      fractionGroupSeparator {string}
         *      fractionGroupSize      {number}
         *
         * (The values assigned to the above FORMAT object properties are not checked for validity.)
         *
         * E.g.
         * BigNumber.config(20, 4) is equivalent to
         * BigNumber.config({ DECIMAL_PLACES : 20, ROUNDING_MODE : 4 })
         *
         * Ignore properties/parameters set to null or undefined.
         * Return an object with the properties current values.
         */
        BigNumber.config = BigNumber.set = function () {
            var v, p,
                i = 0,
                r = {},
                a = arguments,
                o = a[0],
                has = o && typeof o == 'object'
                  ? function () { if ( o.hasOwnProperty(p) ) return ( v = o[p] ) != null; }
                  : function () { if ( a.length > i ) return ( v = a[i++] ) != null; };

            // DECIMAL_PLACES {number} Integer, 0 to MAX inclusive.
            // 'config() DECIMAL_PLACES not an integer: {v}'
            // 'config() DECIMAL_PLACES out of range: {v}'
            if ( has( p = 'DECIMAL_PLACES' ) && isValidInt( v, 0, MAX, 2, p ) ) {
                DECIMAL_PLACES = v | 0;
            }
            r[p] = DECIMAL_PLACES;

            // ROUNDING_MODE {number} Integer, 0 to 8 inclusive.
            // 'config() ROUNDING_MODE not an integer: {v}'
            // 'config() ROUNDING_MODE out of range: {v}'
            if ( has( p = 'ROUNDING_MODE' ) && isValidInt( v, 0, 8, 2, p ) ) {
                ROUNDING_MODE = v | 0;
            }
            r[p] = ROUNDING_MODE;

            // EXPONENTIAL_AT {number|number[]}
            // Integer, -MAX to MAX inclusive or [integer -MAX to 0 inclusive, 0 to MAX inclusive].
            // 'config() EXPONENTIAL_AT not an integer: {v}'
            // 'config() EXPONENTIAL_AT out of range: {v}'
            if ( has( p = 'EXPONENTIAL_AT' ) ) {

                if ( isArray(v) ) {
                    if ( isValidInt( v[0], -MAX, 0, 2, p ) && isValidInt( v[1], 0, MAX, 2, p ) ) {
                        TO_EXP_NEG = v[0] | 0;
                        TO_EXP_POS = v[1] | 0;
                    }
                } else if ( isValidInt( v, -MAX, MAX, 2, p ) ) {
                    TO_EXP_NEG = -( TO_EXP_POS = ( v < 0 ? -v : v ) | 0 );
                }
            }
            r[p] = [ TO_EXP_NEG, TO_EXP_POS ];

            // RANGE {number|number[]} Non-zero integer, -MAX to MAX inclusive or
            // [integer -MAX to -1 inclusive, integer 1 to MAX inclusive].
            // 'config() RANGE not an integer: {v}'
            // 'config() RANGE cannot be zero: {v}'
            // 'config() RANGE out of range: {v}'
            if ( has( p = 'RANGE' ) ) {

                if ( isArray(v) ) {
                    if ( isValidInt( v[0], -MAX, -1, 2, p ) && isValidInt( v[1], 1, MAX, 2, p ) ) {
                        MIN_EXP = v[0] | 0;
                        MAX_EXP = v[1] | 0;
                    }
                } else if ( isValidInt( v, -MAX, MAX, 2, p ) ) {
                    if ( v | 0 ) MIN_EXP = -( MAX_EXP = ( v < 0 ? -v : v ) | 0 );
                    else if (ERRORS) raise( 2, p + ' cannot be zero', v );
                }
            }
            r[p] = [ MIN_EXP, MAX_EXP ];

            // ERRORS {boolean|number} true, false, 1 or 0.
            // 'config() ERRORS not a boolean or binary digit: {v}'
            if ( has( p = 'ERRORS' ) ) {

                if ( v === !!v || v === 1 || v === 0 ) {
                    id = 0;
                    isValidInt = ( ERRORS = !!v ) ? intValidatorWithErrors : intValidatorNoErrors;
                } else if (ERRORS) {
                    raise( 2, p + notBool, v );
                }
            }
            r[p] = ERRORS;

            // CRYPTO {boolean|number} true, false, 1 or 0.
            // 'config() CRYPTO not a boolean or binary digit: {v}'
            // 'config() crypto unavailable: {crypto}'
            if ( has( p = 'CRYPTO' ) ) {

                if ( v === true || v === false || v === 1 || v === 0 ) {
                    if (v) {
                        v = typeof crypto == 'undefined';
                        if ( !v && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
                            CRYPTO = true;
                        } else if (ERRORS) {
                            raise( 2, 'crypto unavailable', v ? void 0 : crypto );
                        } else {
                            CRYPTO = false;
                        }
                    } else {
                        CRYPTO = false;
                    }
                } else if (ERRORS) {
                    raise( 2, p + notBool, v );
                }
            }
            r[p] = CRYPTO;

            // MODULO_MODE {number} Integer, 0 to 9 inclusive.
            // 'config() MODULO_MODE not an integer: {v}'
            // 'config() MODULO_MODE out of range: {v}'
            if ( has( p = 'MODULO_MODE' ) && isValidInt( v, 0, 9, 2, p ) ) {
                MODULO_MODE = v | 0;
            }
            r[p] = MODULO_MODE;

            // POW_PRECISION {number} Integer, 0 to MAX inclusive.
            // 'config() POW_PRECISION not an integer: {v}'
            // 'config() POW_PRECISION out of range: {v}'
            if ( has( p = 'POW_PRECISION' ) && isValidInt( v, 0, MAX, 2, p ) ) {
                POW_PRECISION = v | 0;
            }
            r[p] = POW_PRECISION;

            // FORMAT {object}
            // 'config() FORMAT not an object: {v}'
            if ( has( p = 'FORMAT' ) ) {

                if ( typeof v == 'object' ) {
                    FORMAT = v;
                } else if (ERRORS) {
                    raise( 2, p + ' not an object', v );
                }
            }
            r[p] = FORMAT;

            return r;
        };


        /*
         * Return a new BigNumber whose value is the maximum of the arguments.
         *
         * arguments {number|string|BigNumber}
         */
        BigNumber.max = function () { return maxOrMin( arguments, P.lt ); };


        /*
         * Return a new BigNumber whose value is the minimum of the arguments.
         *
         * arguments {number|string|BigNumber}
         */
        BigNumber.min = function () { return maxOrMin( arguments, P.gt ); };


        /*
         * Return a new BigNumber with a random value equal to or greater than 0 and less than 1,
         * and with dp, or DECIMAL_PLACES if dp is omitted, decimal places (or less if trailing
         * zeros are produced).
         *
         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
         *
         * 'random() decimal places not an integer: {dp}'
         * 'random() decimal places out of range: {dp}'
         * 'random() crypto unavailable: {crypto}'
         */
        BigNumber.random = (function () {
            var pow2_53 = 0x20000000000000;

            // Return a 53 bit integer n, where 0 <= n < 9007199254740992.
            // Check if Math.random() produces more than 32 bits of randomness.
            // If it does, assume at least 53 bits are produced, otherwise assume at least 30 bits.
            // 0x40000000 is 2^30, 0x800000 is 2^23, 0x1fffff is 2^21 - 1.
            var random53bitInt = (Math.random() * pow2_53) & 0x1fffff
              ? function () { return mathfloor( Math.random() * pow2_53 ); }
              : function () { return ((Math.random() * 0x40000000 | 0) * 0x800000) +
                  (Math.random() * 0x800000 | 0); };

            return function (dp) {
                var a, b, e, k, v,
                    i = 0,
                    c = [],
                    rand = new BigNumber(ONE);

                dp = dp == null || !isValidInt( dp, 0, MAX, 14 ) ? DECIMAL_PLACES : dp | 0;
                k = mathceil( dp / LOG_BASE );

                if (CRYPTO) {

                    // Browsers supporting crypto.getRandomValues.
                    if (crypto.getRandomValues) {

                        a = crypto.getRandomValues( new Uint32Array( k *= 2 ) );

                        for ( ; i < k; ) {

                            // 53 bits:
                            // ((Math.pow(2, 32) - 1) * Math.pow(2, 21)).toString(2)
                            // 11111 11111111 11111111 11111111 11100000 00000000 00000000
                            // ((Math.pow(2, 32) - 1) >>> 11).toString(2)
                            //                                     11111 11111111 11111111
                            // 0x20000 is 2^21.
                            v = a[i] * 0x20000 + (a[i + 1] >>> 11);

                            // Rejection sampling:
                            // 0 <= v < 9007199254740992
                            // Probability that v >= 9e15, is
                            // 7199254740992 / 9007199254740992 ~= 0.0008, i.e. 1 in 1251
                            if ( v >= 9e15 ) {
                                b = crypto.getRandomValues( new Uint32Array(2) );
                                a[i] = b[0];
                                a[i + 1] = b[1];
                            } else {

                                // 0 <= v <= 8999999999999999
                                // 0 <= (v % 1e14) <= 99999999999999
                                c.push( v % 1e14 );
                                i += 2;
                            }
                        }
                        i = k / 2;

                    // Node.js supporting crypto.randomBytes.
                    } else if (crypto.randomBytes) {

                        // buffer
                        a = crypto.randomBytes( k *= 7 );

                        for ( ; i < k; ) {

                            // 0x1000000000000 is 2^48, 0x10000000000 is 2^40
                            // 0x100000000 is 2^32, 0x1000000 is 2^24
                            // 11111 11111111 11111111 11111111 11111111 11111111 11111111
                            // 0 <= v < 9007199254740992
                            v = ( ( a[i] & 31 ) * 0x1000000000000 ) + ( a[i + 1] * 0x10000000000 ) +
                                  ( a[i + 2] * 0x100000000 ) + ( a[i + 3] * 0x1000000 ) +
                                  ( a[i + 4] << 16 ) + ( a[i + 5] << 8 ) + a[i + 6];

                            if ( v >= 9e15 ) {
                                crypto.randomBytes(7).copy( a, i );
                            } else {

                                // 0 <= (v % 1e14) <= 99999999999999
                                c.push( v % 1e14 );
                                i += 7;
                            }
                        }
                        i = k / 7;
                    } else {
                        CRYPTO = false;
                        if (ERRORS) raise( 14, 'crypto unavailable', crypto );
                    }
                }

                // Use Math.random.
                if (!CRYPTO) {

                    for ( ; i < k; ) {
                        v = random53bitInt();
                        if ( v < 9e15 ) c[i++] = v % 1e14;
                    }
                }

                k = c[--i];
                dp %= LOG_BASE;

                // Convert trailing digits to zeros according to dp.
                if ( k && dp ) {
                    v = POWS_TEN[LOG_BASE - dp];
                    c[i] = mathfloor( k / v ) * v;
                }

                // Remove trailing elements which are zero.
                for ( ; c[i] === 0; c.pop(), i-- );

                // Zero?
                if ( i < 0 ) {
                    c = [ e = 0 ];
                } else {

                    // Remove leading elements which are zero and adjust exponent accordingly.
                    for ( e = -1 ; c[0] === 0; c.splice(0, 1), e -= LOG_BASE);

                    // Count the digits of the first element of c to determine leading zeros, and...
                    for ( i = 1, v = c[0]; v >= 10; v /= 10, i++);

                    // adjust the exponent accordingly.
                    if ( i < LOG_BASE ) e -= LOG_BASE - i;
                }

                rand.e = e;
                rand.c = c;
                return rand;
            };
        })();


        // PRIVATE FUNCTIONS


        // Convert a numeric string of baseIn to a numeric string of baseOut.
        function convertBase( str, baseOut, baseIn, sign ) {
            var d, e, k, r, x, xc, y,
                i = str.indexOf( '.' ),
                dp = DECIMAL_PLACES,
                rm = ROUNDING_MODE;

            if ( baseIn < 37 ) str = str.toLowerCase();

            // Non-integer.
            if ( i >= 0 ) {
                k = POW_PRECISION;

                // Unlimited precision.
                POW_PRECISION = 0;
                str = str.replace( '.', '' );
                y = new BigNumber(baseIn);
                x = y.pow( str.length - i );
                POW_PRECISION = k;

                // Convert str as if an integer, then restore the fraction part by dividing the
                // result by its base raised to a power.
                y.c = toBaseOut( toFixedPoint( coeffToString( x.c ), x.e ), 10, baseOut );
                y.e = y.c.length;
            }

            // Convert the number as integer.
            xc = toBaseOut( str, baseIn, baseOut );
            e = k = xc.length;

            // Remove trailing zeros.
            for ( ; xc[--k] == 0; xc.pop() );
            if ( !xc[0] ) return '0';

            if ( i < 0 ) {
                --e;
            } else {
                x.c = xc;
                x.e = e;

                // sign is needed for correct rounding.
                x.s = sign;
                x = div( x, y, dp, rm, baseOut );
                xc = x.c;
                r = x.r;
                e = x.e;
            }

            d = e + dp + 1;

            // The rounding digit, i.e. the digit to the right of the digit that may be rounded up.
            i = xc[d];
            k = baseOut / 2;
            r = r || d < 0 || xc[d + 1] != null;

            r = rm < 4 ? ( i != null || r ) && ( rm == 0 || rm == ( x.s < 0 ? 3 : 2 ) )
                       : i > k || i == k &&( rm == 4 || r || rm == 6 && xc[d - 1] & 1 ||
                         rm == ( x.s < 0 ? 8 : 7 ) );

            if ( d < 1 || !xc[0] ) {

                // 1^-dp or 0.
                str = r ? toFixedPoint( '1', -dp ) : '0';
            } else {
                xc.length = d;

                if (r) {

                    // Rounding up may mean the previous digit has to be rounded up and so on.
                    for ( --baseOut; ++xc[--d] > baseOut; ) {
                        xc[d] = 0;

                        if ( !d ) {
                            ++e;
                            xc = [1].concat(xc);
                        }
                    }
                }

                // Determine trailing zeros.
                for ( k = xc.length; !xc[--k]; );

                // E.g. [4, 11, 15] becomes 4bf.
                for ( i = 0, str = ''; i <= k; str += ALPHABET.charAt( xc[i++] ) );
                str = toFixedPoint( str, e );
            }

            // The caller will add the sign.
            return str;
        }


        // Perform division in the specified base. Called by div and convertBase.
        div = (function () {

            // Assume non-zero x and k.
            function multiply( x, k, base ) {
                var m, temp, xlo, xhi,
                    carry = 0,
                    i = x.length,
                    klo = k % SQRT_BASE,
                    khi = k / SQRT_BASE | 0;

                for ( x = x.slice(); i--; ) {
                    xlo = x[i] % SQRT_BASE;
                    xhi = x[i] / SQRT_BASE | 0;
                    m = khi * xlo + xhi * klo;
                    temp = klo * xlo + ( ( m % SQRT_BASE ) * SQRT_BASE ) + carry;
                    carry = ( temp / base | 0 ) + ( m / SQRT_BASE | 0 ) + khi * xhi;
                    x[i] = temp % base;
                }

                if (carry) x = [carry].concat(x);

                return x;
            }

            function compare( a, b, aL, bL ) {
                var i, cmp;

                if ( aL != bL ) {
                    cmp = aL > bL ? 1 : -1;
                } else {

                    for ( i = cmp = 0; i < aL; i++ ) {

                        if ( a[i] != b[i] ) {
                            cmp = a[i] > b[i] ? 1 : -1;
                            break;
                        }
                    }
                }
                return cmp;
            }

            function subtract( a, b, aL, base ) {
                var i = 0;

                // Subtract b from a.
                for ( ; aL--; ) {
                    a[aL] -= i;
                    i = a[aL] < b[aL] ? 1 : 0;
                    a[aL] = i * base + a[aL] - b[aL];
                }

                // Remove leading zeros.
                for ( ; !a[0] && a.length > 1; a.splice(0, 1) );
            }

            // x: dividend, y: divisor.
            return function ( x, y, dp, rm, base ) {
                var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0,
                    yL, yz,
                    s = x.s == y.s ? 1 : -1,
                    xc = x.c,
                    yc = y.c;

                // Either NaN, Infinity or 0?
                if ( !xc || !xc[0] || !yc || !yc[0] ) {

                    return new BigNumber(

                      // Return NaN if either NaN, or both Infinity or 0.
                      !x.s || !y.s || ( xc ? yc && xc[0] == yc[0] : !yc ) ? NaN :

                        // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
                        xc && xc[0] == 0 || !yc ? s * 0 : s / 0
                    );
                }

                q = new BigNumber(s);
                qc = q.c = [];
                e = x.e - y.e;
                s = dp + e + 1;

                if ( !base ) {
                    base = BASE;
                    e = bitFloor( x.e / LOG_BASE ) - bitFloor( y.e / LOG_BASE );
                    s = s / LOG_BASE | 0;
                }

                // Result exponent may be one less then the current value of e.
                // The coefficients of the BigNumbers from convertBase may have trailing zeros.
                for ( i = 0; yc[i] == ( xc[i] || 0 ); i++ );
                if ( yc[i] > ( xc[i] || 0 ) ) e--;

                if ( s < 0 ) {
                    qc.push(1);
                    more = true;
                } else {
                    xL = xc.length;
                    yL = yc.length;
                    i = 0;
                    s += 2;

                    // Normalise xc and yc so highest order digit of yc is >= base / 2.

                    n = mathfloor( base / ( yc[0] + 1 ) );

                    // Not necessary, but to handle odd bases where yc[0] == ( base / 2 ) - 1.
                    // if ( n > 1 || n++ == 1 && yc[0] < base / 2 ) {
                    if ( n > 1 ) {
                        yc = multiply( yc, n, base );
                        xc = multiply( xc, n, base );
                        yL = yc.length;
                        xL = xc.length;
                    }

                    xi = yL;
                    rem = xc.slice( 0, yL );
                    remL = rem.length;

                    // Add zeros to make remainder as long as divisor.
                    for ( ; remL < yL; rem[remL++] = 0 );
                    yz = yc.slice();
                    yz = [0].concat(yz);
                    yc0 = yc[0];
                    if ( yc[1] >= base / 2 ) yc0++;
                    // Not necessary, but to prevent trial digit n > base, when using base 3.
                    // else if ( base == 3 && yc0 == 1 ) yc0 = 1 + 1e-15;

                    do {
                        n = 0;

                        // Compare divisor and remainder.
                        cmp = compare( yc, rem, yL, remL );

                        // If divisor < remainder.
                        if ( cmp < 0 ) {

                            // Calculate trial digit, n.

                            rem0 = rem[0];
                            if ( yL != remL ) rem0 = rem0 * base + ( rem[1] || 0 );

                            // n is how many times the divisor goes into the current remainder.
                            n = mathfloor( rem0 / yc0 );

                            //  Algorithm:
                            //  1. product = divisor * trial digit (n)
                            //  2. if product > remainder: product -= divisor, n--
                            //  3. remainder -= product
                            //  4. if product was < remainder at 2:
                            //    5. compare new remainder and divisor
                            //    6. If remainder > divisor: remainder -= divisor, n++

                            if ( n > 1 ) {

                                // n may be > base only when base is 3.
                                if (n >= base) n = base - 1;

                                // product = divisor * trial digit.
                                prod = multiply( yc, n, base );
                                prodL = prod.length;
                                remL = rem.length;

                                // Compare product and remainder.
                                // If product > remainder.
                                // Trial digit n too high.
                                // n is 1 too high about 5% of the time, and is not known to have
                                // ever been more than 1 too high.
                                while ( compare( prod, rem, prodL, remL ) == 1 ) {
                                    n--;

                                    // Subtract divisor from product.
                                    subtract( prod, yL < prodL ? yz : yc, prodL, base );
                                    prodL = prod.length;
                                    cmp = 1;
                                }
                            } else {

                                // n is 0 or 1, cmp is -1.
                                // If n is 0, there is no need to compare yc and rem again below,
                                // so change cmp to 1 to avoid it.
                                // If n is 1, leave cmp as -1, so yc and rem are compared again.
                                if ( n == 0 ) {

                                    // divisor < remainder, so n must be at least 1.
                                    cmp = n = 1;
                                }

                                // product = divisor
                                prod = yc.slice();
                                prodL = prod.length;
                            }

                            if ( prodL < remL ) prod = [0].concat(prod);

                            // Subtract product from remainder.
                            subtract( rem, prod, remL, base );
                            remL = rem.length;

                             // If product was < remainder.
                            if ( cmp == -1 ) {

                                // Compare divisor and new remainder.
                                // If divisor < new remainder, subtract divisor from remainder.
                                // Trial digit n too low.
                                // n is 1 too low about 5% of the time, and very rarely 2 too low.
                                while ( compare( yc, rem, yL, remL ) < 1 ) {
                                    n++;

                                    // Subtract divisor from remainder.
                                    subtract( rem, yL < remL ? yz : yc, remL, base );
                                    remL = rem.length;
                                }
                            }
                        } else if ( cmp === 0 ) {
                            n++;
                            rem = [0];
                        } // else cmp === 1 and n will be 0

                        // Add the next digit, n, to the result array.
                        qc[i++] = n;

                        // Update the remainder.
                        if ( rem[0] ) {
                            rem[remL++] = xc[xi] || 0;
                        } else {
                            rem = [ xc[xi] ];
                            remL = 1;
                        }
                    } while ( ( xi++ < xL || rem[0] != null ) && s-- );

                    more = rem[0] != null;

                    // Leading zero?
                    if ( !qc[0] ) qc.splice(0, 1);
                }

                if ( base == BASE ) {

                    // To calculate q.e, first get the number of digits of qc[0].
                    for ( i = 1, s = qc[0]; s >= 10; s /= 10, i++ );
                    round( q, dp + ( q.e = i + e * LOG_BASE - 1 ) + 1, rm, more );

                // Caller is convertBase.
                } else {
                    q.e = e;
                    q.r = +more;
                }

                return q;
            };
        })();


        /*
         * Return a string representing the value of BigNumber n in fixed-point or exponential
         * notation rounded to the specified decimal places or significant digits.
         *
         * n is a BigNumber.
         * i is the index of the last digit required (i.e. the digit that may be rounded up).
         * rm is the rounding mode.
         * caller is caller id: toExponential 19, toFixed 20, toFormat 21, toPrecision 24.
         */
        function format( n, i, rm, caller ) {
            var c0, e, ne, len, str;

            rm = rm != null && isValidInt( rm, 0, 8, caller, roundingMode )
              ? rm | 0 : ROUNDING_MODE;

            if ( !n.c ) return n.toString();
            c0 = n.c[0];
            ne = n.e;

            if ( i == null ) {
                str = coeffToString( n.c );
                str = caller == 19 || caller == 24 && ne <= TO_EXP_NEG
                  ? toExponential( str, ne )
                  : toFixedPoint( str, ne );
            } else {
                n = round( new BigNumber(n), i, rm );

                // n.e may have changed if the value was rounded up.
                e = n.e;

                str = coeffToString( n.c );
                len = str.length;

                // toPrecision returns exponential notation if the number of significant digits
                // specified is less than the number of digits necessary to represent the integer
                // part of the value in fixed-point notation.

                // Exponential notation.
                if ( caller == 19 || caller == 24 && ( i <= e || e <= TO_EXP_NEG ) ) {

                    // Append zeros?
                    for ( ; len < i; str += '0', len++ );
                    str = toExponential( str, e );

                // Fixed-point notation.
                } else {
                    i -= ne;
                    str = toFixedPoint( str, e );

                    // Append zeros?
                    if ( e + 1 > len ) {
                        if ( --i > 0 ) for ( str += '.'; i--; str += '0' );
                    } else {
                        i += e - len;
                        if ( i > 0 ) {
                            if ( e + 1 == len ) str += '.';
                            for ( ; i--; str += '0' );
                        }
                    }
                }
            }

            return n.s < 0 && c0 ? '-' + str : str;
        }


        // Handle BigNumber.max and BigNumber.min.
        function maxOrMin( args, method ) {
            var m, n,
                i = 0;

            if ( isArray( args[0] ) ) args = args[0];
            m = new BigNumber( args[0] );

            for ( ; ++i < args.length; ) {
                n = new BigNumber( args[i] );

                // If any number is NaN, return NaN.
                if ( !n.s ) {
                    m = n;
                    break;
                } else if ( method.call( m, n ) ) {
                    m = n;
                }
            }

            return m;
        }


        /*
         * Return true if n is an integer in range, otherwise throw.
         * Use for argument validation when ERRORS is true.
         */
        function intValidatorWithErrors( n, min, max, caller, name ) {
            if ( n < min || n > max || n != truncate(n) ) {
                raise( caller, ( name || 'decimal places' ) +
                  ( n < min || n > max ? ' out of range' : ' not an integer' ), n );
            }

            return true;
        }


        /*
         * Strip trailing zeros, calculate base 10 exponent and check against MIN_EXP and MAX_EXP.
         * Called by minus, plus and times.
         */
        function normalise( n, c, e ) {
            var i = 1,
                j = c.length;

             // Remove trailing zeros.
            for ( ; !c[--j]; c.pop() );

            // Calculate the base 10 exponent. First get the number of digits of c[0].
            for ( j = c[0]; j >= 10; j /= 10, i++ );

            // Overflow?
            if ( ( e = i + e * LOG_BASE - 1 ) > MAX_EXP ) {

                // Infinity.
                n.c = n.e = null;

            // Underflow?
            } else if ( e < MIN_EXP ) {

                // Zero.
                n.c = [ n.e = 0 ];
            } else {
                n.e = e;
                n.c = c;
            }

            return n;
        }


        // Handle values that fail the validity test in BigNumber.
        parseNumeric = (function () {
            var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
                dotAfter = /^([^.]+)\.$/,
                dotBefore = /^\.([^.]+)$/,
                isInfinityOrNaN = /^-?(Infinity|NaN)$/,
                whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;

            return function ( x, str, num, b ) {
                var base,
                    s = num ? str : str.replace( whitespaceOrPlus, '' );

                // No exception on ±Infinity or NaN.
                if ( isInfinityOrNaN.test(s) ) {
                    x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
                } else {
                    if ( !num ) {

                        // basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i
                        s = s.replace( basePrefix, function ( m, p1, p2 ) {
                            base = ( p2 = p2.toLowerCase() ) == 'x' ? 16 : p2 == 'b' ? 2 : 8;
                            return !b || b == base ? p1 : m;
                        });

                        if (b) {
                            base = b;

                            // E.g. '1.' to '1', '.1' to '0.1'
                            s = s.replace( dotAfter, '$1' ).replace( dotBefore, '0.$1' );
                        }

                        if ( str != s ) return new BigNumber( s, base );
                    }

                    // 'new BigNumber() not a number: {n}'
                    // 'new BigNumber() not a base {b} number: {n}'
                    if (ERRORS) raise( id, 'not a' + ( b ? ' base ' + b : '' ) + ' number', str );
                    x.s = null;
                }

                x.c = x.e = null;
                id = 0;
            }
        })();


        // Throw a BigNumber Error.
        function raise( caller, msg, val ) {
            var error = new Error( [
                'new BigNumber',     // 0
                'cmp',               // 1
                'config',            // 2
                'div',               // 3
                'divToInt',          // 4
                'eq',                // 5
                'gt',                // 6
                'gte',               // 7
                'lt',                // 8
                'lte',               // 9
                'minus',             // 10
                'mod',               // 11
                'plus',              // 12
                'precision',         // 13
                'random',            // 14
                'round',             // 15
                'shift',             // 16
                'times',             // 17
                'toDigits',          // 18
                'toExponential',     // 19
                'toFixed',           // 20
                'toFormat',          // 21
                'toFraction',        // 22
                'pow',               // 23
                'toPrecision',       // 24
                'toString',          // 25
                'BigNumber'          // 26
            ][caller] + '() ' + msg + ': ' + val );

            error.name = 'BigNumber Error';
            id = 0;
            throw error;
        }


        /*
         * Round x to sd significant digits using rounding mode rm. Check for over/under-flow.
         * If r is truthy, it is known that there are more digits after the rounding digit.
         */
        function round( x, sd, rm, r ) {
            var d, i, j, k, n, ni, rd,
                xc = x.c,
                pows10 = POWS_TEN;

            // if x is not Infinity or NaN...
            if (xc) {

                // rd is the rounding digit, i.e. the digit after the digit that may be rounded up.
                // n is a base 1e14 number, the value of the element of array x.c containing rd.
                // ni is the index of n within x.c.
                // d is the number of digits of n.
                // i is the index of rd within n including leading zeros.
                // j is the actual index of rd within n (if < 0, rd is a leading zero).
                out: {

                    // Get the number of digits of the first element of xc.
                    for ( d = 1, k = xc[0]; k >= 10; k /= 10, d++ );
                    i = sd - d;

                    // If the rounding digit is in the first element of xc...
                    if ( i < 0 ) {
                        i += LOG_BASE;
                        j = sd;
                        n = xc[ ni = 0 ];

                        // Get the rounding digit at index j of n.
                        rd = n / pows10[ d - j - 1 ] % 10 | 0;
                    } else {
                        ni = mathceil( ( i + 1 ) / LOG_BASE );

                        if ( ni >= xc.length ) {

                            if (r) {

                                // Needed by sqrt.
                                for ( ; xc.length <= ni; xc.push(0) );
                                n = rd = 0;
                                d = 1;
                                i %= LOG_BASE;
                                j = i - LOG_BASE + 1;
                            } else {
                                break out;
                            }
                        } else {
                            n = k = xc[ni];

                            // Get the number of digits of n.
                            for ( d = 1; k >= 10; k /= 10, d++ );

                            // Get the index of rd within n.
                            i %= LOG_BASE;

                            // Get the index of rd within n, adjusted for leading zeros.
                            // The number of leading zeros of n is given by LOG_BASE - d.
                            j = i - LOG_BASE + d;

                            // Get the rounding digit at index j of n.
                            rd = j < 0 ? 0 : n / pows10[ d - j - 1 ] % 10 | 0;
                        }
                    }

                    r = r || sd < 0 ||

                    // Are there any non-zero digits after the rounding digit?
                    // The expression  n % pows10[ d - j - 1 ]  returns all digits of n to the right
                    // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
                      xc[ni + 1] != null || ( j < 0 ? n : n % pows10[ d - j - 1 ] );

                    r = rm < 4
                      ? ( rd || r ) && ( rm == 0 || rm == ( x.s < 0 ? 3 : 2 ) )
                      : rd > 5 || rd == 5 && ( rm == 4 || r || rm == 6 &&

                        // Check whether the digit to the left of the rounding digit is odd.
                        ( ( i > 0 ? j > 0 ? n / pows10[ d - j ] : 0 : xc[ni - 1] ) % 10 ) & 1 ||
                          rm == ( x.s < 0 ? 8 : 7 ) );

                    if ( sd < 1 || !xc[0] ) {
                        xc.length = 0;

                        if (r) {

                            // Convert sd to decimal places.
                            sd -= x.e + 1;

                            // 1, 0.1, 0.01, 0.001, 0.0001 etc.
                            xc[0] = pows10[ ( LOG_BASE - sd % LOG_BASE ) % LOG_BASE ];
                            x.e = -sd || 0;
                        } else {

                            // Zero.
                            xc[0] = x.e = 0;
                        }

                        return x;
                    }

                    // Remove excess digits.
                    if ( i == 0 ) {
                        xc.length = ni;
                        k = 1;
                        ni--;
                    } else {
                        xc.length = ni + 1;
                        k = pows10[ LOG_BASE - i ];

                        // E.g. 56700 becomes 56000 if 7 is the rounding digit.
                        // j > 0 means i > number of leading zeros of n.
                        xc[ni] = j > 0 ? mathfloor( n / pows10[ d - j ] % pows10[j] ) * k : 0;
                    }

                    // Round up?
                    if (r) {

                        for ( ; ; ) {

                            // If the digit to be rounded up is in the first element of xc...
                            if ( ni == 0 ) {

                                // i will be the length of xc[0] before k is added.
                                for ( i = 1, j = xc[0]; j >= 10; j /= 10, i++ );
                                j = xc[0] += k;
                                for ( k = 1; j >= 10; j /= 10, k++ );

                                // if i != k the length has increased.
                                if ( i != k ) {
                                    x.e++;
                                    if ( xc[0] == BASE ) xc[0] = 1;
                                }

                                break;
                            } else {
                                xc[ni] += k;
                                if ( xc[ni] != BASE ) break;
                                xc[ni--] = 0;
                                k = 1;
                            }
                        }
                    }

                    // Remove trailing zeros.
                    for ( i = xc.length; xc[--i] === 0; xc.pop() );
                }

                // Overflow? Infinity.
                if ( x.e > MAX_EXP ) {
                    x.c = x.e = null;

                // Underflow? Zero.
                } else if ( x.e < MIN_EXP ) {
                    x.c = [ x.e = 0 ];
                }
            }

            return x;
        }


        // PROTOTYPE/INSTANCE METHODS


        /*
         * Return a new BigNumber whose value is the absolute value of this BigNumber.
         */
        P.absoluteValue = P.abs = function () {
            var x = new BigNumber(this);
            if ( x.s < 0 ) x.s = 1;
            return x;
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber rounded to a whole
         * number in the direction of Infinity.
         */
        P.ceil = function () {
            return round( new BigNumber(this), this.e + 1, 2 );
        };


        /*
         * Return
         * 1 if the value of this BigNumber is greater than the value of BigNumber(y, b),
         * -1 if the value of this BigNumber is less than the value of BigNumber(y, b),
         * 0 if they have the same value,
         * or null if the value of either is NaN.
         */
        P.comparedTo = P.cmp = function ( y, b ) {
            id = 1;
            return compare( this, new BigNumber( y, b ) );
        };


        /*
         * Return the number of decimal places of the value of this BigNumber, or null if the value
         * of this BigNumber is ±Infinity or NaN.
         */
        P.decimalPlaces = P.dp = function () {
            var n, v,
                c = this.c;

            if ( !c ) return null;
            n = ( ( v = c.length - 1 ) - bitFloor( this.e / LOG_BASE ) ) * LOG_BASE;

            // Subtract the number of trailing zeros of the last number.
            if ( v = c[v] ) for ( ; v % 10 == 0; v /= 10, n-- );
            if ( n < 0 ) n = 0;

            return n;
        };


        /*
         *  n / 0 = I
         *  n / N = N
         *  n / I = 0
         *  0 / n = 0
         *  0 / 0 = N
         *  0 / N = N
         *  0 / I = 0
         *  N / n = N
         *  N / 0 = N
         *  N / N = N
         *  N / I = N
         *  I / n = I
         *  I / 0 = I
         *  I / N = N
         *  I / I = N
         *
         * Return a new BigNumber whose value is the value of this BigNumber divided by the value of
         * BigNumber(y, b), rounded according to DECIMAL_PLACES and ROUNDING_MODE.
         */
        P.dividedBy = P.div = function ( y, b ) {
            id = 3;
            return div( this, new BigNumber( y, b ), DECIMAL_PLACES, ROUNDING_MODE );
        };


        /*
         * Return a new BigNumber whose value is the integer part of dividing the value of this
         * BigNumber by the value of BigNumber(y, b).
         */
        P.dividedToIntegerBy = P.divToInt = function ( y, b ) {
            id = 4;
            return div( this, new BigNumber( y, b ), 0, 1 );
        };


        /*
         * Return true if the value of this BigNumber is equal to the value of BigNumber(y, b),
         * otherwise returns false.
         */
        P.equals = P.eq = function ( y, b ) {
            id = 5;
            return compare( this, new BigNumber( y, b ) ) === 0;
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber rounded to a whole
         * number in the direction of -Infinity.
         */
        P.floor = function () {
            return round( new BigNumber(this), this.e + 1, 3 );
        };


        /*
         * Return true if the value of this BigNumber is greater than the value of BigNumber(y, b),
         * otherwise returns false.
         */
        P.greaterThan = P.gt = function ( y, b ) {
            id = 6;
            return compare( this, new BigNumber( y, b ) ) > 0;
        };


        /*
         * Return true if the value of this BigNumber is greater than or equal to the value of
         * BigNumber(y, b), otherwise returns false.
         */
        P.greaterThanOrEqualTo = P.gte = function ( y, b ) {
            id = 7;
            return ( b = compare( this, new BigNumber( y, b ) ) ) === 1 || b === 0;

        };


        /*
         * Return true if the value of this BigNumber is a finite number, otherwise returns false.
         */
        P.isFinite = function () {
            return !!this.c;
        };


        /*
         * Return true if the value of this BigNumber is an integer, otherwise return false.
         */
        P.isInteger = P.isInt = function () {
            return !!this.c && bitFloor( this.e / LOG_BASE ) > this.c.length - 2;
        };


        /*
         * Return true if the value of this BigNumber is NaN, otherwise returns false.
         */
        P.isNaN = function () {
            return !this.s;
        };


        /*
         * Return true if the value of this BigNumber is negative, otherwise returns false.
         */
        P.isNegative = P.isNeg = function () {
            return this.s < 0;
        };


        /*
         * Return true if the value of this BigNumber is 0 or -0, otherwise returns false.
         */
        P.isZero = function () {
            return !!this.c && this.c[0] == 0;
        };


        /*
         * Return true if the value of this BigNumber is less than the value of BigNumber(y, b),
         * otherwise returns false.
         */
        P.lessThan = P.lt = function ( y, b ) {
            id = 8;
            return compare( this, new BigNumber( y, b ) ) < 0;
        };


        /*
         * Return true if the value of this BigNumber is less than or equal to the value of
         * BigNumber(y, b), otherwise returns false.
         */
        P.lessThanOrEqualTo = P.lte = function ( y, b ) {
            id = 9;
            return ( b = compare( this, new BigNumber( y, b ) ) ) === -1 || b === 0;
        };


        /*
         *  n - 0 = n
         *  n - N = N
         *  n - I = -I
         *  0 - n = -n
         *  0 - 0 = 0
         *  0 - N = N
         *  0 - I = -I
         *  N - n = N
         *  N - 0 = N
         *  N - N = N
         *  N - I = N
         *  I - n = I
         *  I - 0 = I
         *  I - N = N
         *  I - I = N
         *
         * Return a new BigNumber whose value is the value of this BigNumber minus the value of
         * BigNumber(y, b).
         */
        P.minus = P.sub = function ( y, b ) {
            var i, j, t, xLTy,
                x = this,
                a = x.s;

            id = 10;
            y = new BigNumber( y, b );
            b = y.s;

            // Either NaN?
            if ( !a || !b ) return new BigNumber(NaN);

            // Signs differ?
            if ( a != b ) {
                y.s = -b;
                return x.plus(y);
            }

            var xe = x.e / LOG_BASE,
                ye = y.e / LOG_BASE,
                xc = x.c,
                yc = y.c;

            if ( !xe || !ye ) {

                // Either Infinity?
                if ( !xc || !yc ) return xc ? ( y.s = -b, y ) : new BigNumber( yc ? x : NaN );

                // Either zero?
                if ( !xc[0] || !yc[0] ) {

                    // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
                    return yc[0] ? ( y.s = -b, y ) : new BigNumber( xc[0] ? x :

                      // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
                      ROUNDING_MODE == 3 ? -0 : 0 );
                }
            }

            xe = bitFloor(xe);
            ye = bitFloor(ye);
            xc = xc.slice();

            // Determine which is the bigger number.
            if ( a = xe - ye ) {

                if ( xLTy = a < 0 ) {
                    a = -a;
                    t = xc;
                } else {
                    ye = xe;
                    t = yc;
                }

                t.reverse();

                // Prepend zeros to equalise exponents.
                for ( b = a; b--; t.push(0) );
                t.reverse();
            } else {

                // Exponents equal. Check digit by digit.
                j = ( xLTy = ( a = xc.length ) < ( b = yc.length ) ) ? a : b;

                for ( a = b = 0; b < j; b++ ) {

                    if ( xc[b] != yc[b] ) {
                        xLTy = xc[b] < yc[b];
                        break;
                    }
                }
            }

            // x < y? Point xc to the array of the bigger number.
            if (xLTy) t = xc, xc = yc, yc = t, y.s = -y.s;

            b = ( j = yc.length ) - ( i = xc.length );

            // Append zeros to xc if shorter.
            // No need to add zeros to yc if shorter as subtract only needs to start at yc.length.
            if ( b > 0 ) for ( ; b--; xc[i++] = 0 );
            b = BASE - 1;

            // Subtract yc from xc.
            for ( ; j > a; ) {

                if ( xc[--j] < yc[j] ) {
                    for ( i = j; i && !xc[--i]; xc[i] = b );
                    --xc[i];
                    xc[j] += BASE;
                }

                xc[j] -= yc[j];
            }

            // Remove leading zeros and adjust exponent accordingly.
            for ( ; xc[0] == 0; xc.splice(0, 1), --ye );

            // Zero?
            if ( !xc[0] ) {

                // Following IEEE 754 (2008) 6.3,
                // n - n = +0  but  n - n = -0  when rounding towards -Infinity.
                y.s = ROUNDING_MODE == 3 ? -1 : 1;
                y.c = [ y.e = 0 ];
                return y;
            }

            // No need to check for Infinity as +x - +y != Infinity && -x - -y != Infinity
            // for finite x and y.
            return normalise( y, xc, ye );
        };


        /*
         *   n % 0 =  N
         *   n % N =  N
         *   n % I =  n
         *   0 % n =  0
         *  -0 % n = -0
         *   0 % 0 =  N
         *   0 % N =  N
         *   0 % I =  0
         *   N % n =  N
         *   N % 0 =  N
         *   N % N =  N
         *   N % I =  N
         *   I % n =  N
         *   I % 0 =  N
         *   I % N =  N
         *   I % I =  N
         *
         * Return a new BigNumber whose value is the value of this BigNumber modulo the value of
         * BigNumber(y, b). The result depends on the value of MODULO_MODE.
         */
        P.modulo = P.mod = function ( y, b ) {
            var q, s,
                x = this;

            id = 11;
            y = new BigNumber( y, b );

            // Return NaN if x is Infinity or NaN, or y is NaN or zero.
            if ( !x.c || !y.s || y.c && !y.c[0] ) {
                return new BigNumber(NaN);

            // Return x if y is Infinity or x is zero.
            } else if ( !y.c || x.c && !x.c[0] ) {
                return new BigNumber(x);
            }

            if ( MODULO_MODE == 9 ) {

                // Euclidian division: q = sign(y) * floor(x / abs(y))
                // r = x - qy    where  0 <= r < abs(y)
                s = y.s;
                y.s = 1;
                q = div( x, y, 0, 3 );
                y.s = s;
                q.s *= s;
            } else {
                q = div( x, y, 0, MODULO_MODE );
            }

            return x.minus( q.times(y) );
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber negated,
         * i.e. multiplied by -1.
         */
        P.negated = P.neg = function () {
            var x = new BigNumber(this);
            x.s = -x.s || null;
            return x;
        };


        /*
         *  n + 0 = n
         *  n + N = N
         *  n + I = I
         *  0 + n = n
         *  0 + 0 = 0
         *  0 + N = N
         *  0 + I = I
         *  N + n = N
         *  N + 0 = N
         *  N + N = N
         *  N + I = N
         *  I + n = I
         *  I + 0 = I
         *  I + N = N
         *  I + I = I
         *
         * Return a new BigNumber whose value is the value of this BigNumber plus the value of
         * BigNumber(y, b).
         */
        P.plus = P.add = function ( y, b ) {
            var t,
                x = this,
                a = x.s;

            id = 12;
            y = new BigNumber( y, b );
            b = y.s;

            // Either NaN?
            if ( !a || !b ) return new BigNumber(NaN);

            // Signs differ?
             if ( a != b ) {
                y.s = -b;
                return x.minus(y);
            }

            var xe = x.e / LOG_BASE,
                ye = y.e / LOG_BASE,
                xc = x.c,
                yc = y.c;

            if ( !xe || !ye ) {

                // Return ±Infinity if either ±Infinity.
                if ( !xc || !yc ) return new BigNumber( a / 0 );

                // Either zero?
                // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
                if ( !xc[0] || !yc[0] ) return yc[0] ? y : new BigNumber( xc[0] ? x : a * 0 );
            }

            xe = bitFloor(xe);
            ye = bitFloor(ye);
            xc = xc.slice();

            // Prepend zeros to equalise exponents. Faster to use reverse then do unshifts.
            if ( a = xe - ye ) {
                if ( a > 0 ) {
                    ye = xe;
                    t = yc;
                } else {
                    a = -a;
                    t = xc;
                }

                t.reverse();
                for ( ; a--; t.push(0) );
                t.reverse();
            }

            a = xc.length;
            b = yc.length;

            // Point xc to the longer array, and b to the shorter length.
            if ( a - b < 0 ) t = yc, yc = xc, xc = t, b = a;

            // Only start adding at yc.length - 1 as the further digits of xc can be ignored.
            for ( a = 0; b; ) {
                a = ( xc[--b] = xc[b] + yc[b] + a ) / BASE | 0;
                xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
            }

            if (a) {
                xc = [a].concat(xc);
                ++ye;
            }

            // No need to check for zero, as +x + +y != 0 && -x + -y != 0
            // ye = MAX_EXP + 1 possible
            return normalise( y, xc, ye );
        };


        /*
         * Return the number of significant digits of the value of this BigNumber.
         *
         * [z] {boolean|number} Whether to count integer-part trailing zeros: true, false, 1 or 0.
         */
        P.precision = P.sd = function (z) {
            var n, v,
                x = this,
                c = x.c;

            // 'precision() argument not a boolean or binary digit: {z}'
            if ( z != null && z !== !!z && z !== 1 && z !== 0 ) {
                if (ERRORS) raise( 13, 'argument' + notBool, z );
                if ( z != !!z ) z = null;
            }

            if ( !c ) return null;
            v = c.length - 1;
            n = v * LOG_BASE + 1;

            if ( v = c[v] ) {

                // Subtract the number of trailing zeros of the last element.
                for ( ; v % 10 == 0; v /= 10, n-- );

                // Add the number of digits of the first element.
                for ( v = c[0]; v >= 10; v /= 10, n++ );
            }

            if ( z && x.e + 1 > n ) n = x.e + 1;

            return n;
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber rounded to a maximum of
         * dp decimal places using rounding mode rm, or to 0 and ROUNDING_MODE respectively if
         * omitted.
         *
         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
         *
         * 'round() decimal places out of range: {dp}'
         * 'round() decimal places not an integer: {dp}'
         * 'round() rounding mode not an integer: {rm}'
         * 'round() rounding mode out of range: {rm}'
         */
        P.round = function ( dp, rm ) {
            var n = new BigNumber(this);

            if ( dp == null || isValidInt( dp, 0, MAX, 15 ) ) {
                round( n, ~~dp + this.e + 1, rm == null ||
                  !isValidInt( rm, 0, 8, 15, roundingMode ) ? ROUNDING_MODE : rm | 0 );
            }

            return n;
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber shifted by k places
         * (powers of 10). Shift to the right if n > 0, and to the left if n < 0.
         *
         * k {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
         *
         * If k is out of range and ERRORS is false, the result will be ±0 if k < 0, or ±Infinity
         * otherwise.
         *
         * 'shift() argument not an integer: {k}'
         * 'shift() argument out of range: {k}'
         */
        P.shift = function (k) {
            var n = this;
            return isValidInt( k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER, 16, 'argument' )

              // k < 1e+21, or truncate(k) will produce exponential notation.
              ? n.times( '1e' + truncate(k) )
              : new BigNumber( n.c && n.c[0] && ( k < -MAX_SAFE_INTEGER || k > MAX_SAFE_INTEGER )
                ? n.s * ( k < 0 ? 0 : 1 / 0 )
                : n );
        };


        /*
         *  sqrt(-n) =  N
         *  sqrt( N) =  N
         *  sqrt(-I) =  N
         *  sqrt( I) =  I
         *  sqrt( 0) =  0
         *  sqrt(-0) = -0
         *
         * Return a new BigNumber whose value is the square root of the value of this BigNumber,
         * rounded according to DECIMAL_PLACES and ROUNDING_MODE.
         */
        P.squareRoot = P.sqrt = function () {
            var m, n, r, rep, t,
                x = this,
                c = x.c,
                s = x.s,
                e = x.e,
                dp = DECIMAL_PLACES + 4,
                half = new BigNumber('0.5');

            // Negative/NaN/Infinity/zero?
            if ( s !== 1 || !c || !c[0] ) {
                return new BigNumber( !s || s < 0 && ( !c || c[0] ) ? NaN : c ? x : 1 / 0 );
            }

            // Initial estimate.
            s = Math.sqrt( +x );

            // Math.sqrt underflow/overflow?
            // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
            if ( s == 0 || s == 1 / 0 ) {
                n = coeffToString(c);
                if ( ( n.length + e ) % 2 == 0 ) n += '0';
                s = Math.sqrt(n);
                e = bitFloor( ( e + 1 ) / 2 ) - ( e < 0 || e % 2 );

                if ( s == 1 / 0 ) {
                    n = '1e' + e;
                } else {
                    n = s.toExponential();
                    n = n.slice( 0, n.indexOf('e') + 1 ) + e;
                }

                r = new BigNumber(n);
            } else {
                r = new BigNumber( s + '' );
            }

            // Check for zero.
            // r could be zero if MIN_EXP is changed after the this value was created.
            // This would cause a division by zero (x/t) and hence Infinity below, which would cause
            // coeffToString to throw.
            if ( r.c[0] ) {
                e = r.e;
                s = e + dp;
                if ( s < 3 ) s = 0;

                // Newton-Raphson iteration.
                for ( ; ; ) {
                    t = r;
                    r = half.times( t.plus( div( x, t, dp, 1 ) ) );

                    if ( coeffToString( t.c   ).slice( 0, s ) === ( n =
                         coeffToString( r.c ) ).slice( 0, s ) ) {

                        // The exponent of r may here be one less than the final result exponent,
                        // e.g 0.0009999 (e-4) --> 0.001 (e-3), so adjust s so the rounding digits
                        // are indexed correctly.
                        if ( r.e < e ) --s;
                        n = n.slice( s - 3, s + 1 );

                        // The 4th rounding digit may be in error by -1 so if the 4 rounding digits
                        // are 9999 or 4999 (i.e. approaching a rounding boundary) continue the
                        // iteration.
                        if ( n == '9999' || !rep && n == '4999' ) {

                            // On the first iteration only, check to see if rounding up gives the
                            // exact result as the nines may infinitely repeat.
                            if ( !rep ) {
                                round( t, t.e + DECIMAL_PLACES + 2, 0 );

                                if ( t.times(t).eq(x) ) {
                                    r = t;
                                    break;
                                }
                            }

                            dp += 4;
                            s += 4;
                            rep = 1;
                        } else {

                            // If rounding digits are null, 0{0,4} or 50{0,3}, check for exact
                            // result. If not, then there are further digits and m will be truthy.
                            if ( !+n || !+n.slice(1) && n.charAt(0) == '5' ) {

                                // Truncate to the first rounding digit.
                                round( r, r.e + DECIMAL_PLACES + 2, 1 );
                                m = !r.times(r).eq(x);
                            }

                            break;
                        }
                    }
                }
            }

            return round( r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m );
        };


        /*
         *  n * 0 = 0
         *  n * N = N
         *  n * I = I
         *  0 * n = 0
         *  0 * 0 = 0
         *  0 * N = N
         *  0 * I = N
         *  N * n = N
         *  N * 0 = N
         *  N * N = N
         *  N * I = N
         *  I * n = I
         *  I * 0 = N
         *  I * N = N
         *  I * I = I
         *
         * Return a new BigNumber whose value is the value of this BigNumber times the value of
         * BigNumber(y, b).
         */
        P.times = P.mul = function ( y, b ) {
            var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc,
                base, sqrtBase,
                x = this,
                xc = x.c,
                yc = ( id = 17, y = new BigNumber( y, b ) ).c;

            // Either NaN, ±Infinity or ±0?
            if ( !xc || !yc || !xc[0] || !yc[0] ) {

                // Return NaN if either is NaN, or one is 0 and the other is Infinity.
                if ( !x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc ) {
                    y.c = y.e = y.s = null;
                } else {
                    y.s *= x.s;

                    // Return ±Infinity if either is ±Infinity.
                    if ( !xc || !yc ) {
                        y.c = y.e = null;

                    // Return ±0 if either is ±0.
                    } else {
                        y.c = [0];
                        y.e = 0;
                    }
                }

                return y;
            }

            e = bitFloor( x.e / LOG_BASE ) + bitFloor( y.e / LOG_BASE );
            y.s *= x.s;
            xcL = xc.length;
            ycL = yc.length;

            // Ensure xc points to longer array and xcL to its length.
            if ( xcL < ycL ) zc = xc, xc = yc, yc = zc, i = xcL, xcL = ycL, ycL = i;

            // Initialise the result array with zeros.
            for ( i = xcL + ycL, zc = []; i--; zc.push(0) );

            base = BASE;
            sqrtBase = SQRT_BASE;

            for ( i = ycL; --i >= 0; ) {
                c = 0;
                ylo = yc[i] % sqrtBase;
                yhi = yc[i] / sqrtBase | 0;

                for ( k = xcL, j = i + k; j > i; ) {
                    xlo = xc[--k] % sqrtBase;
                    xhi = xc[k] / sqrtBase | 0;
                    m = yhi * xlo + xhi * ylo;
                    xlo = ylo * xlo + ( ( m % sqrtBase ) * sqrtBase ) + zc[j] + c;
                    c = ( xlo / base | 0 ) + ( m / sqrtBase | 0 ) + yhi * xhi;
                    zc[j--] = xlo % base;
                }

                zc[j] = c;
            }

            if (c) {
                ++e;
            } else {
                zc.splice(0, 1);
            }

            return normalise( y, zc, e );
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber rounded to a maximum of
         * sd significant digits using rounding mode rm, or ROUNDING_MODE if rm is omitted.
         *
         * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
         *
         * 'toDigits() precision out of range: {sd}'
         * 'toDigits() precision not an integer: {sd}'
         * 'toDigits() rounding mode not an integer: {rm}'
         * 'toDigits() rounding mode out of range: {rm}'
         */
        P.toDigits = function ( sd, rm ) {
            var n = new BigNumber(this);
            sd = sd == null || !isValidInt( sd, 1, MAX, 18, 'precision' ) ? null : sd | 0;
            rm = rm == null || !isValidInt( rm, 0, 8, 18, roundingMode ) ? ROUNDING_MODE : rm | 0;
            return sd ? round( n, sd, rm ) : n;
        };


        /*
         * Return a string representing the value of this BigNumber in exponential notation and
         * rounded using ROUNDING_MODE to dp fixed decimal places.
         *
         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
         *
         * 'toExponential() decimal places not an integer: {dp}'
         * 'toExponential() decimal places out of range: {dp}'
         * 'toExponential() rounding mode not an integer: {rm}'
         * 'toExponential() rounding mode out of range: {rm}'
         */
        P.toExponential = function ( dp, rm ) {
            return format( this,
              dp != null && isValidInt( dp, 0, MAX, 19 ) ? ~~dp + 1 : null, rm, 19 );
        };


        /*
         * Return a string representing the value of this BigNumber in fixed-point notation rounding
         * to dp fixed decimal places using rounding mode rm, or ROUNDING_MODE if rm is omitted.
         *
         * Note: as with JavaScript's number type, (-0).toFixed(0) is '0',
         * but e.g. (-0.00001).toFixed(0) is '-0'.
         *
         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
         *
         * 'toFixed() decimal places not an integer: {dp}'
         * 'toFixed() decimal places out of range: {dp}'
         * 'toFixed() rounding mode not an integer: {rm}'
         * 'toFixed() rounding mode out of range: {rm}'
         */
        P.toFixed = function ( dp, rm ) {
            return format( this, dp != null && isValidInt( dp, 0, MAX, 20 )
              ? ~~dp + this.e + 1 : null, rm, 20 );
        };


        /*
         * Return a string representing the value of this BigNumber in fixed-point notation rounded
         * using rm or ROUNDING_MODE to dp decimal places, and formatted according to the properties
         * of the FORMAT object (see BigNumber.config).
         *
         * FORMAT = {
         *      decimalSeparator : '.',
         *      groupSeparator : ',',
         *      groupSize : 3,
         *      secondaryGroupSize : 0,
         *      fractionGroupSeparator : '\xA0',    // non-breaking space
         *      fractionGroupSize : 0
         * };
         *
         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
         *
         * 'toFormat() decimal places not an integer: {dp}'
         * 'toFormat() decimal places out of range: {dp}'
         * 'toFormat() rounding mode not an integer: {rm}'
         * 'toFormat() rounding mode out of range: {rm}'
         */
        P.toFormat = function ( dp, rm ) {
            var str = format( this, dp != null && isValidInt( dp, 0, MAX, 21 )
              ? ~~dp + this.e + 1 : null, rm, 21 );

            if ( this.c ) {
                var i,
                    arr = str.split('.'),
                    g1 = +FORMAT.groupSize,
                    g2 = +FORMAT.secondaryGroupSize,
                    groupSeparator = FORMAT.groupSeparator,
                    intPart = arr[0],
                    fractionPart = arr[1],
                    isNeg = this.s < 0,
                    intDigits = isNeg ? intPart.slice(1) : intPart,
                    len = intDigits.length;

                if (g2) i = g1, g1 = g2, g2 = i, len -= i;

                if ( g1 > 0 && len > 0 ) {
                    i = len % g1 || g1;
                    intPart = intDigits.substr( 0, i );

                    for ( ; i < len; i += g1 ) {
                        intPart += groupSeparator + intDigits.substr( i, g1 );
                    }

                    if ( g2 > 0 ) intPart += groupSeparator + intDigits.slice(i);
                    if (isNeg) intPart = '-' + intPart;
                }

                str = fractionPart
                  ? intPart + FORMAT.decimalSeparator + ( ( g2 = +FORMAT.fractionGroupSize )
                    ? fractionPart.replace( new RegExp( '\\d{' + g2 + '}\\B', 'g' ),
                      '$&' + FORMAT.fractionGroupSeparator )
                    : fractionPart )
                  : intPart;
            }

            return str;
        };


        /*
         * Return a string array representing the value of this BigNumber as a simple fraction with
         * an integer numerator and an integer denominator. The denominator will be a positive
         * non-zero value less than or equal to the specified maximum denominator. If a maximum
         * denominator is not specified, the denominator will be the lowest value necessary to
         * represent the number exactly.
         *
         * [md] {number|string|BigNumber} Integer >= 1 and < Infinity. The maximum denominator.
         *
         * 'toFraction() max denominator not an integer: {md}'
         * 'toFraction() max denominator out of range: {md}'
         */
        P.toFraction = function (md) {
            var arr, d0, d2, e, exp, n, n0, q, s,
                k = ERRORS,
                x = this,
                xc = x.c,
                d = new BigNumber(ONE),
                n1 = d0 = new BigNumber(ONE),
                d1 = n0 = new BigNumber(ONE);

            if ( md != null ) {
                ERRORS = false;
                n = new BigNumber(md);
                ERRORS = k;

                if ( !( k = n.isInt() ) || n.lt(ONE) ) {

                    if (ERRORS) {
                        raise( 22,
                          'max denominator ' + ( k ? 'out of range' : 'not an integer' ), md );
                    }

                    // ERRORS is false:
                    // If md is a finite non-integer >= 1, round it to an integer and use it.
                    md = !k && n.c && round( n, n.e + 1, 1 ).gte(ONE) ? n : null;
                }
            }

            if ( !xc ) return x.toString();
            s = coeffToString(xc);

            // Determine initial denominator.
            // d is a power of 10 and the minimum max denominator that specifies the value exactly.
            e = d.e = s.length - x.e - 1;
            d.c[0] = POWS_TEN[ ( exp = e % LOG_BASE ) < 0 ? LOG_BASE + exp : exp ];
            md = !md || n.cmp(d) > 0 ? ( e > 0 ? d : n1 ) : n;

            exp = MAX_EXP;
            MAX_EXP = 1 / 0;
            n = new BigNumber(s);

            // n0 = d1 = 0
            n0.c[0] = 0;

            for ( ; ; )  {
                q = div( n, d, 0, 1 );
                d2 = d0.plus( q.times(d1) );
                if ( d2.cmp(md) == 1 ) break;
                d0 = d1;
                d1 = d2;
                n1 = n0.plus( q.times( d2 = n1 ) );
                n0 = d2;
                d = n.minus( q.times( d2 = d ) );
                n = d2;
            }

            d2 = div( md.minus(d0), d1, 0, 1 );
            n0 = n0.plus( d2.times(n1) );
            d0 = d0.plus( d2.times(d1) );
            n0.s = n1.s = x.s;
            e *= 2;

            // Determine which fraction is closer to x, n0/d0 or n1/d1
            arr = div( n1, d1, e, ROUNDING_MODE ).minus(x).abs().cmp(
                  div( n0, d0, e, ROUNDING_MODE ).minus(x).abs() ) < 1
                    ? [ n1.toString(), d1.toString() ]
                    : [ n0.toString(), d0.toString() ];

            MAX_EXP = exp;
            return arr;
        };


        /*
         * Return the value of this BigNumber converted to a number primitive.
         */
        P.toNumber = function () {
            return +this;
        };


        /*
         * Return a BigNumber whose value is the value of this BigNumber raised to the power n.
         * If m is present, return the result modulo m.
         * If n is negative round according to DECIMAL_PLACES and ROUNDING_MODE.
         * If POW_PRECISION is non-zero and m is not present, round to POW_PRECISION using
         * ROUNDING_MODE.
         *
         * The modular power operation works efficiently when x, n, and m are positive integers,
         * otherwise it is equivalent to calculating x.toPower(n).modulo(m) (with POW_PRECISION 0).
         *
         * n {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
         * [m] {number|string|BigNumber} The modulus.
         *
         * 'pow() exponent not an integer: {n}'
         * 'pow() exponent out of range: {n}'
         *
         * Performs 54 loop iterations for n of 9007199254740991.
         */
        P.toPower = P.pow = function ( n, m ) {
            var k, y, z,
                i = mathfloor( n < 0 ? -n : +n ),
                x = this;

            if ( m != null ) {
                id = 23;
                m = new BigNumber(m);
            }

            // Pass ±Infinity to Math.pow if exponent is out of range.
            if ( !isValidInt( n, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER, 23, 'exponent' ) &&
              ( !isFinite(n) || i > MAX_SAFE_INTEGER && ( n /= 0 ) ||
                parseFloat(n) != n && !( n = NaN ) ) || n == 0 ) {
                k = Math.pow( +x, n );
                return new BigNumber( m ? k % m : k );
            }

            if (m) {
                if ( n > 1 && x.gt(ONE) && x.isInt() && m.gt(ONE) && m.isInt() ) {
                    x = x.mod(m);
                } else {
                    z = m;

                    // Nullify m so only a single mod operation is performed at the end.
                    m = null;
                }
            } else if (POW_PRECISION) {

                // Truncating each coefficient array to a length of k after each multiplication
                // equates to truncating significant digits to POW_PRECISION + [28, 41],
                // i.e. there will be a minimum of 28 guard digits retained.
                // (Using + 1.5 would give [9, 21] guard digits.)
                k = mathceil( POW_PRECISION / LOG_BASE + 2 );
            }

            y = new BigNumber(ONE);

            for ( ; ; ) {
                if ( i % 2 ) {
                    y = y.times(x);
                    if ( !y.c ) break;
                    if (k) {
                        if ( y.c.length > k ) y.c.length = k;
                    } else if (m) {
                        y = y.mod(m);
                    }
                }

                i = mathfloor( i / 2 );
                if ( !i ) break;
                x = x.times(x);
                if (k) {
                    if ( x.c && x.c.length > k ) x.c.length = k;
                } else if (m) {
                    x = x.mod(m);
                }
            }

            if (m) return y;
            if ( n < 0 ) y = ONE.div(y);

            return z ? y.mod(z) : k ? round( y, POW_PRECISION, ROUNDING_MODE ) : y;
        };


        /*
         * Return a string representing the value of this BigNumber rounded to sd significant digits
         * using rounding mode rm or ROUNDING_MODE. If sd is less than the number of digits
         * necessary to represent the integer part of the value in fixed-point notation, then use
         * exponential notation.
         *
         * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
         *
         * 'toPrecision() precision not an integer: {sd}'
         * 'toPrecision() precision out of range: {sd}'
         * 'toPrecision() rounding mode not an integer: {rm}'
         * 'toPrecision() rounding mode out of range: {rm}'
         */
        P.toPrecision = function ( sd, rm ) {
            return format( this, sd != null && isValidInt( sd, 1, MAX, 24, 'precision' )
              ? sd | 0 : null, rm, 24 );
        };


        /*
         * Return a string representing the value of this BigNumber in base b, or base 10 if b is
         * omitted. If a base is specified, including base 10, round according to DECIMAL_PLACES and
         * ROUNDING_MODE. If a base is not specified, and this BigNumber has a positive exponent
         * that is equal to or greater than TO_EXP_POS, or a negative exponent equal to or less than
         * TO_EXP_NEG, return exponential notation.
         *
         * [b] {number} Integer, 2 to 64 inclusive.
         *
         * 'toString() base not an integer: {b}'
         * 'toString() base out of range: {b}'
         */
        P.toString = function (b) {
            var str,
                n = this,
                s = n.s,
                e = n.e;

            // Infinity or NaN?
            if ( e === null ) {

                if (s) {
                    str = 'Infinity';
                    if ( s < 0 ) str = '-' + str;
                } else {
                    str = 'NaN';
                }
            } else {
                str = coeffToString( n.c );

                if ( b == null || !isValidInt( b, 2, 64, 25, 'base' ) ) {
                    str = e <= TO_EXP_NEG || e >= TO_EXP_POS
                      ? toExponential( str, e )
                      : toFixedPoint( str, e );
                } else {
                    str = convertBase( toFixedPoint( str, e ), b | 0, 10, s );
                }

                if ( s < 0 && n.c[0] ) str = '-' + str;
            }

            return str;
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber truncated to a whole
         * number.
         */
        P.truncated = P.trunc = function () {
            return round( new BigNumber(this), this.e + 1, 1 );
        };


        /*
         * Return as toString, but do not accept a base argument, and include the minus sign for
         * negative zero.
         */
        P.valueOf = P.toJSON = function () {
            var str,
                n = this,
                e = n.e;

            if ( e === null ) return n.toString();

            str = coeffToString( n.c );

            str = e <= TO_EXP_NEG || e >= TO_EXP_POS
                ? toExponential( str, e )
                : toFixedPoint( str, e );

            return n.s < 0 ? '-' + str : str;
        };


        P.isBigNumber = true;

        if ( config != null ) BigNumber.config(config);

        return BigNumber;
    }


    // PRIVATE HELPER FUNCTIONS


    function bitFloor(n) {
        var i = n | 0;
        return n > 0 || n === i ? i : i - 1;
    }


    // Return a coefficient array as a string of base 10 digits.
    function coeffToString(a) {
        var s, z,
            i = 1,
            j = a.length,
            r = a[0] + '';

        for ( ; i < j; ) {
            s = a[i++] + '';
            z = LOG_BASE - s.length;
            for ( ; z--; s = '0' + s );
            r += s;
        }

        // Determine trailing zeros.
        for ( j = r.length; r.charCodeAt(--j) === 48; );
        return r.slice( 0, j + 1 || 1 );
    }


    // Compare the value of BigNumbers x and y.
    function compare( x, y ) {
        var a, b,
            xc = x.c,
            yc = y.c,
            i = x.s,
            j = y.s,
            k = x.e,
            l = y.e;

        // Either NaN?
        if ( !i || !j ) return null;

        a = xc && !xc[0];
        b = yc && !yc[0];

        // Either zero?
        if ( a || b ) return a ? b ? 0 : -j : i;

        // Signs differ?
        if ( i != j ) return i;

        a = i < 0;
        b = k == l;

        // Either Infinity?
        if ( !xc || !yc ) return b ? 0 : !xc ^ a ? 1 : -1;

        // Compare exponents.
        if ( !b ) return k > l ^ a ? 1 : -1;

        j = ( k = xc.length ) < ( l = yc.length ) ? k : l;

        // Compare digit by digit.
        for ( i = 0; i < j; i++ ) if ( xc[i] != yc[i] ) return xc[i] > yc[i] ^ a ? 1 : -1;

        // Compare lengths.
        return k == l ? 0 : k > l ^ a ? 1 : -1;
    }


    /*
     * Return true if n is a valid number in range, otherwise false.
     * Use for argument validation when ERRORS is false.
     * Note: parseInt('1e+1') == 1 but parseFloat('1e+1') == 10.
     */
    function intValidatorNoErrors( n, min, max ) {
        return ( n = truncate(n) ) >= min && n <= max;
    }


    function isArray(obj) {
        return Object.prototype.toString.call(obj) == '[object Array]';
    }


    /*
     * Convert string of baseIn to an array of numbers of baseOut.
     * Eg. convertBase('255', 10, 16) returns [15, 15].
     * Eg. convertBase('ff', 16, 10) returns [2, 5, 5].
     */
    function toBaseOut( str, baseIn, baseOut ) {
        var j,
            arr = [0],
            arrL,
            i = 0,
            len = str.length;

        for ( ; i < len; ) {
            for ( arrL = arr.length; arrL--; arr[arrL] *= baseIn );
            arr[ j = 0 ] += ALPHABET.indexOf( str.charAt( i++ ) );

            for ( ; j < arr.length; j++ ) {

                if ( arr[j] > baseOut - 1 ) {
                    if ( arr[j + 1] == null ) arr[j + 1] = 0;
                    arr[j + 1] += arr[j] / baseOut | 0;
                    arr[j] %= baseOut;
                }
            }
        }

        return arr.reverse();
    }


    function toExponential( str, e ) {
        return ( str.length > 1 ? str.charAt(0) + '.' + str.slice(1) : str ) +
          ( e < 0 ? 'e' : 'e+' ) + e;
    }


    function toFixedPoint( str, e ) {
        var len, z;

        // Negative exponent?
        if ( e < 0 ) {

            // Prepend zeros.
            for ( z = '0.'; ++e; z += '0' );
            str = z + str;

        // Positive exponent
        } else {
            len = str.length;

            // Append zeros.
            if ( ++e > len ) {
                for ( z = '0', e -= len; --e; z += '0' );
                str += z;
            } else if ( e < len ) {
                str = str.slice( 0, e ) + '.' + str.slice(e);
            }
        }

        return str;
    }


    function truncate(n) {
        n = parseFloat(n);
        return n < 0 ? mathceil(n) : mathfloor(n);
    }


    // EXPORT


    BigNumber = constructorFactory();
    BigNumber['default'] = BigNumber.BigNumber = BigNumber;


    // AMD.
    if ( true ) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () { return BigNumber; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

    // Node.js and other environments that support module.exports.
    } else if ( typeof module != 'undefined' && module.exports ) {
        module.exports = BigNumber;

    // Browser.
    } else {
        if ( !globalObj ) globalObj = typeof self != 'undefined' ? self : Function('return this')();
        globalObj.BigNumber = BigNumber;
    }
})(this);


/***/ }),

/***/ 1553:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BaseStore__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutable__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_immutable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_alt_instance__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_actions_AssetActions__ = __webpack_require__(1542);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var AssetStore = function (_BaseStore) {
    _inherits(AssetStore, _BaseStore);

    function AssetStore() {
        _classCallCheck(this, AssetStore);

        var _this = _possibleConstructorReturn(this, (AssetStore.__proto__ || Object.getPrototypeOf(AssetStore)).call(this));

        _this.assets = __WEBPACK_IMPORTED_MODULE_1_immutable___default.a.Map();
        _this.asset_symbol_to_id = {};
        _this.searchTerms = {};
        _this.lookupResults = [];
        _this.assetsLoading = false;

        _this.bindListeners({
            onGetAssetList: __WEBPACK_IMPORTED_MODULE_3_actions_AssetActions__["a" /* default */].getAssetList,
            onLookupAsset: __WEBPACK_IMPORTED_MODULE_3_actions_AssetActions__["a" /* default */].lookupAsset
        });
        return _this;
    }

    _createClass(AssetStore, [{
        key: "onGetAssetList",
        value: function onGetAssetList(payload) {
            var _this2 = this;

            if (!payload) {
                return false;
            }
            this.assetsLoading = payload.loading;

            if (payload.assets) {
                payload.assets.forEach(function (asset) {

                    for (var i = 0; i < payload.dynamic.length; i++) {
                        if (payload.dynamic[i].id === asset.dynamic_asset_data_id) {
                            asset.dynamic = payload.dynamic[i];
                            break;
                        }
                    }

                    if (asset.bitasset_data_id) {
                        asset.market_asset = true;

                        for (var i = 0; i < payload.bitasset_data.length; i++) {
                            if (payload.bitasset_data[i].id === asset.bitasset_data_id) {
                                asset.bitasset_data = payload.bitasset_data[i];
                                break;
                            }
                        }
                    } else {
                        asset.market_asset = false;
                    }

                    _this2.assets = _this2.assets.set(asset.id, asset);

                    _this2.asset_symbol_to_id[asset.symbol] = asset.id;
                });
            }
        }
    }, {
        key: "onLookupAsset",
        value: function onLookupAsset(payload) {
            this.searchTerms[payload.searchID] = payload.symbol;
            this.lookupResults = payload.assets;
        }
    }]);

    return AssetStore;
}(__WEBPACK_IMPORTED_MODULE_0__BaseStore__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_alt_instance__["a" /* default */].createStore(AssetStore, "AssetStore"));

/***/ }),

/***/ 1589:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_translate_component__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_translate_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_translate_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_utils__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Utility_BalanceComponent__ = __webpack_require__(690);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_counterpart__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_counterpart___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_counterpart__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Utility_AmountSelector__ = __webpack_require__(689);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_actions_AssetActions__ = __webpack_require__(1542);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var ReserveAssetModal = function (_React$Component) {
    _inherits(ReserveAssetModal, _React$Component);

    function ReserveAssetModal(props) {
        _classCallCheck(this, ReserveAssetModal);

        var _this = _possibleConstructorReturn(this, (ReserveAssetModal.__proto__ || Object.getPrototypeOf(ReserveAssetModal)).call(this, props));

        _this.state = {
            amount: 0
        };
        return _this;
    }

    _createClass(ReserveAssetModal, [{
        key: "onAmountChanged",
        value: function onAmountChanged(_ref) {
            var amount = _ref.amount,
                asset = _ref.asset;

            this.setState({ amount: amount, asset: asset });
        }
    }, {
        key: "onSubmit",
        value: function onSubmit() {
            var precision = __WEBPACK_IMPORTED_MODULE_2_common_utils__["a" /* default */].get_asset_precision(this.state.asset.get("precision"));
            var amount = this.state.amount.replace(/,/g, "");
            amount *= precision;
            __WEBPACK_IMPORTED_MODULE_6_actions_AssetActions__["a" /* default */].reserveAsset(amount, this.props.assetId, this.props.account.get("id"));
            this.props.onClose();
        }
    }, {
        key: "render",
        value: function render() {
            var assetId = this.props.assetId;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "form",
                { className: "grid-block vertical full-width-content" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_translate_component___default.a, { component: "h3", content: "modal.reserve.title" }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "grid-container ", style: { paddingTop: "2rem" } },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "content-block" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__Utility_AmountSelector__["a" /* default */], {
                            label: "modal.reserve.amount",
                            amount: this.state.amount,
                            onChange: this.onAmountChanged.bind(this),
                            asset: assetId,
                            assets: [assetId],
                            display_balance: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__Utility_BalanceComponent__["a" /* default */], { balance: this.props.account.getIn(["balances", assetId]) }),
                            tabIndex: 1
                        })
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "content-block button-group" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", {
                            type: "submit",
                            className: "button success",
                            onClick: this.onSubmit.bind(this),
                            value: __WEBPACK_IMPORTED_MODULE_4_counterpart___default.a.translate("modal.reserve.submit"),
                            tabIndex: 2
                        }),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            {
                                className: "button",
                                onClick: this.props.onClose,
                                tabIndex: 3
                            },
                            __WEBPACK_IMPORTED_MODULE_4_counterpart___default.a.translate("cancel")
                        )
                    )
                )
            );
        }
    }]);

    return ReserveAssetModal;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (ReserveAssetModal);

/***/ }),

/***/ 1612:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_translate_component__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_translate_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_translate_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Utility_ChainTypes__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Utility_BindToChainState__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_common_utils__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_counterpart__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_counterpart___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_counterpart__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_actions_AssetActions__ = __webpack_require__(1542);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Account_AccountSelector__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Utility_AmountSelector__ = __webpack_require__(689);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }











var IssueModal = function (_React$Component) {
    _inherits(IssueModal, _React$Component);

    function IssueModal(props) {
        _classCallCheck(this, IssueModal);

        var _this = _possibleConstructorReturn(this, (IssueModal.__proto__ || Object.getPrototypeOf(IssueModal)).call(this, props));

        _this.state = {
            amount: props.amount,
            to: props.to,
            to_id: null,
            memo: null
        };
        return _this;
    }

    _createClass(IssueModal, [{
        key: "onAmountChanged",
        value: function onAmountChanged(_ref) {
            var amount = _ref.amount,
                asset = _ref.asset;

            this.setState({ amount: amount });
        }
    }, {
        key: "onToAccountChanged",
        value: function onToAccountChanged(to) {
            var state = to ? { to: to.get('name'), to_id: to.get('id') } : { to_id: null };
            this.setState(state);
        }
    }, {
        key: "onToChanged",
        value: function onToChanged(to) {
            this.setState({ to: to, to_id: null });
        }
    }, {
        key: "onSubmit",
        value: function onSubmit() {
            var asset_to_issue = this.props.asset_to_issue;

            var precision = __WEBPACK_IMPORTED_MODULE_4_common_utils__["a" /* default */].get_asset_precision(asset_to_issue.get("precision"));
            var amount = this.state.amount.replace(/,/g, "");
            amount *= precision;

            __WEBPACK_IMPORTED_MODULE_6_actions_AssetActions__["a" /* default */].issueAsset(this.state.to_id, asset_to_issue.get("issuer"), asset_to_issue.get("id"), amount, this.state.memo ? new Buffer(this.state.memo, "utf-8") : this.state.memo);

            this.setState({
                amount: null,
                to_id: null,
                memo: null
            });
        }
    }, {
        key: "onMemoChanged",
        value: function onMemoChanged(e) {
            this.setState({ memo: e.target.value });
        }
    }, {
        key: "render",
        value: function render() {
            var asset_to_issue = this.props.asset_to_issue.get('id');
            var tabIndex = 1;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "form",
                { className: "grid-block vertical full-width-content" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "grid-container ", style: { paddingTop: "2rem" } },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "content-block" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__Account_AccountSelector__["a" /* default */], {
                            label: "modal.issue.to",
                            accountName: this.state.to,
                            onAccountChanged: this.onToAccountChanged.bind(this),
                            onChange: this.onToChanged.bind(this),
                            account: this.state.to,
                            tabIndex: tabIndex++
                        })
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "content-block" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__Utility_AmountSelector__["a" /* default */], {
                            label: "modal.issue.amount",
                            amount: this.state.amount,
                            onChange: this.onAmountChanged.bind(this),
                            asset: asset_to_issue,
                            assets: [asset_to_issue],
                            tabIndex: tabIndex++
                        })
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "content-block" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "label",
                            null,
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_translate_component___default.a, { component: "span", content: "transfer.memo" }),
                            " (",
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_translate_component___default.a, { content: "transfer.optional" }),
                            ")"
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("textarea", { rows: "3", value: this.state.memo, tabIndex: tabIndex++, onChange: this.onMemoChanged.bind(this) })
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "content-block button-group" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", {
                            type: "submit",
                            className: "button success",
                            onClick: this.onSubmit.bind(this, this.state.to, this.state.amount),
                            value: __WEBPACK_IMPORTED_MODULE_5_counterpart___default.a.translate("modal.issue.submit"),
                            tabIndex: tabIndex++
                        }),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            {
                                className: "button",
                                onClick: this.props.onClose,
                                tabIndex: tabIndex++
                            },
                            __WEBPACK_IMPORTED_MODULE_5_counterpart___default.a.translate("cancel")
                        )
                    )
                )
            );
        }
    }]);

    return IssueModal;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

IssueModal.propTypes = {
    asset_to_issue: __WEBPACK_IMPORTED_MODULE_2__Utility_ChainTypes__["a" /* default */].ChainAsset.isRequired
};


/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_3__Utility_BindToChainState__["a" /* default */])(IssueModal));
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(4).Buffer))

/***/ }),

/***/ 717:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_es__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_translate_component__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_translate_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_translate_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_actions_AssetActions__ = __webpack_require__(1542);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_stores_AssetStore__ = __webpack_require__(1553);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_actions_AccountActions__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Modal_BaseModal__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Utility_FormattedAsset__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_foundation_apps_src_utils_foundation_api__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_foundation_apps_src_utils_foundation_api___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react_foundation_apps_src_utils_foundation_api__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_actions_NotificationActions__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_common_utils__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_lodash__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__LoadingIndicator__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Modal_IssueModal__ = __webpack_require__(1612);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Modal_ReserveAssetModal__ = __webpack_require__(1589);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_alt_react__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_alt_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_alt_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_common_asset_utils__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_immutable__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17_immutable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__Utility_ChainTypes__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__Utility_BindToChainState__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__Utility_Tabs__ = __webpack_require__(1541);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_seerjs_es__ = __webpack_require__(6);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

























var AccountAssets = function (_React$Component) {
    _inherits(AccountAssets, _React$Component);

    function AccountAssets(props) {
        _classCallCheck(this, AccountAssets);

        var _this = _possibleConstructorReturn(this, (AccountAssets.__proto__ || Object.getPrototypeOf(AccountAssets)).call(this, props));

        _this.state = {
            create: {
                symbol: "",
                name: "",
                description: "",
                max_supply: 1000000000000000,
                precision: 4
            },
            issue: {
                amount: 0,
                to: "",
                to_id: "",
                asset_id: "",
                symbol: ""
            },
            errors: {
                symbol: null
            },
            isValid: false,
            searchTerm: ""
        };

        _this._searchAccounts = Object(__WEBPACK_IMPORTED_MODULE_11_lodash__["debounce"])(_this._searchAccounts, 150);
        return _this;
    }

    _createClass(AccountAssets, [{
        key: "_checkAssets",
        value: function _checkAssets(assets, force) {
            if (this.props.account.get("assets").size) return;
            var lastAsset = assets.sort(function (a, b) {
                if (a.symbol > b.symbol) {
                    return 1;
                } else if (a.symbol < b.symbol) {
                    return -1;
                } else {
                    return 0;
                }
            }).last();

            if (assets.size === 0 || force) {
                __WEBPACK_IMPORTED_MODULE_3_actions_AssetActions__["a" /* default */].getAssetList.defer("A", 100);
                this.setState({ assetsFetched: 100 });
            } else if (assets.size >= this.state.assetsFetched) {
                __WEBPACK_IMPORTED_MODULE_3_actions_AssetActions__["a" /* default */].getAssetList.defer(lastAsset.symbol, 100);
                this.setState({ assetsFetched: this.state.assetsFetched + 99 });
            }
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            this._checkAssets(nextProps.assets);
        }
    }, {
        key: "componentWillMount",
        value: function componentWillMount() {
            this._checkAssets(this.props.assets, true);
        }
    }, {
        key: "_onIssueInput",
        value: function _onIssueInput(value, e) {
            var key = e.target.id;
            var issue = this.state.issue;


            if (key === "to") {
                this._searchAccounts(e.target.value);
                issue.to = e.target.value;
                var account = this.props.searchAccounts.findEntry(function (name) {
                    return name === e.target.value;
                });

                issue.to_id = account ? account[0] : null;
            } else {
                issue[value] = e.target.value;
            }

            this.setState({ issue: issue });
        }
    }, {
        key: "_searchAccounts",
        value: function _searchAccounts(searchTerm) {
            __WEBPACK_IMPORTED_MODULE_5_actions_AccountActions__["a" /* default */].accountSearch(searchTerm);
        }
    }, {
        key: "_issueAsset",
        value: function _issueAsset(account_id, e) {
            var _this2 = this;

            e.preventDefault();
            __WEBPACK_IMPORTED_MODULE_8_react_foundation_apps_src_utils_foundation_api___default.a.publish("issue_asset", "close");
            var issue = this.state.issue;

            var asset = this.props.assets.get(issue.asset_id);
            issue.amount *= __WEBPACK_IMPORTED_MODULE_10_common_utils__["a" /* default */].get_asset_precision(asset.precision);
            __WEBPACK_IMPORTED_MODULE_3_actions_AssetActions__["a" /* default */].issueAsset(account_id, issue).then(function (result) {
                if (result) {
                    __WEBPACK_IMPORTED_MODULE_9_actions_NotificationActions__["a" /* default */].addNotification({
                        message: "Successfully issued " + __WEBPACK_IMPORTED_MODULE_10_common_utils__["a" /* default */].format_asset(issue.amount, _this2.props.assets.get(issue.asset_id)), //: ${this.state.wallet_public_name}
                        level: "success",
                        autoDismiss: 10
                    });

                    // Update the data for the asset
                    __WEBPACK_IMPORTED_MODULE_21_seerjs_es__["b" /* ChainStore */].getAsset(issue.asset_id);
                } else {
                    __WEBPACK_IMPORTED_MODULE_9_actions_NotificationActions__["a" /* default */].addNotification({
                        message: "Failed to issue asset", //: ${this.state.wallet_public_name}
                        level: "error",
                        autoDismiss: 10
                    });
                }
            });
        }
    }, {
        key: "_reserveButtonClick",
        value: function _reserveButtonClick(assetId, e) {
            e.preventDefault();
            this.setState({ reserve: assetId });
            __WEBPACK_IMPORTED_MODULE_8_react_foundation_apps_src_utils_foundation_api___default.a.publish("reserve_asset", "open");
        }
    }, {
        key: "_reserveAsset",
        value: function _reserveAsset(account_id, e) {
            e.preventDefault();
            __WEBPACK_IMPORTED_MODULE_8_react_foundation_apps_src_utils_foundation_api___default.a.publish("reserve_asset", "close");
            var issue = this.state.issue;

            var asset = this.props.assets.get(issue.asset_id);
            issue.amount *= __WEBPACK_IMPORTED_MODULE_10_common_utils__["a" /* default */].get_asset_precision(asset.precision);
            __WEBPACK_IMPORTED_MODULE_3_actions_AssetActions__["a" /* default */].issueAsset(account_id, issue);
        }
    }, {
        key: "_issueButtonClick",
        value: function _issueButtonClick(asset_id, symbol, e) {
            e.preventDefault();
            var issue = this.state.issue;

            issue.asset_id = asset_id;
            issue.symbol = symbol;
            this.setState({ issue: issue });
            __WEBPACK_IMPORTED_MODULE_8_react_foundation_apps_src_utils_foundation_api___default.a.publish("issue_asset", "open");
        }
    }, {
        key: "_editButtonClick",
        value: function _editButtonClick(symbol, account_name, e) {
            e.preventDefault();
            this.props.router.push("/account/" + account_name + "/update-asset/" + symbol);
        }
    }, {
        key: "_onAccountSelect",
        value: function _onAccountSelect(account_name) {
            var issue = this.state.issue;

            issue.to = account_name;
            issue.to_id = this.props.account_name_to_id[account_name];
            this.setState({ issue: issue });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                account = _props.account,
                account_name = _props.account_name,
                assets = _props.assets,
                assetsList = _props.assetsList;


            var accountExists = true;
            if (!account) {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12__LoadingIndicator__["a" /* default */], { type: "circle" });
            } else if (account.notFound) {
                accountExists = false;
            }
            if (!accountExists) {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "grid-block" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "h5",
                        null,
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_translate_component___default.a, { component: "h5", content: "account.errors.not_found", name: account_name })
                    )
                );
            }

            if (assetsList.length) {
                assets = assets.clear();
                assetsList.forEach(function (a) {
                    if (a) assets = assets.set(a.get("id"), a.toJS());
                });
            }
            var myAssets = assets.filter(function (asset) {
                return asset.issuer === account.get("id");
            }).sort(function (a, b) {
                return parseInt(a.id.substring(4, a.id.length), 10) - parseInt(b.id.substring(4, b.id.length), 10);
            }).map(function (asset) {
                var dynamic = __WEBPACK_IMPORTED_MODULE_21_seerjs_es__["b" /* ChainStore */].getObject(asset.dynamic_asset_data_id, false, false);
                var current_supply = dynamic ? parseInt(dynamic.get("current_supply")) : 0;
                var description = __WEBPACK_IMPORTED_MODULE_16_common_asset_utils__["a" /* default */].parseDescription(asset.options.description);
                var desc = description.short_name ? description.short_name : description.main;

                if (desc.length > 100) {
                    desc = desc.substr(0, 100) + "...";
                }
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "tr",
                    { key: asset.symbol },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "td",
                        null,
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            __WEBPACK_IMPORTED_MODULE_1_react_router_es__["b" /* Link */],
                            { to: "/asset/" + asset.symbol },
                            asset.symbol
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "td",
                        { style: { maxWidth: "250px" } },
                        desc
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "td",
                        null,
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__Utility_FormattedAsset__["a" /* default */], { amount: current_supply, asset: asset.id })
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "td",
                        null,
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__Utility_FormattedAsset__["a" /* default */], { amount: parseInt(asset.options.max_supply, 10), asset: asset.id })
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "td",
                        null,
                        !asset.bitasset_data_id ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "button",
                            { onClick: _this3._issueButtonClick.bind(_this3, asset.id, asset.symbol), className: "button" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_translate_component___default.a, { content: "transaction.trxTypes.asset_issue" })
                        ) : null
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "td",
                        null,
                        !asset.bitasset_data_id ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "button",
                            { onClick: _this3._reserveButtonClick.bind(_this3, asset.id), className: "button" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_translate_component___default.a, { content: "transaction.trxTypes.asset_reserve" })
                        ) : null
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "td",
                        null,
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "button",
                            { onClick: _this3._editButtonClick.bind(_this3, asset.symbol, account_name), className: "button" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_translate_component___default.a, { content: "transaction.trxTypes.asset_update" })
                        )
                    )
                );
            }).toArray();

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
                            __WEBPACK_IMPORTED_MODULE_20__Utility_Tabs__["b" /* Tabs */],
                            { segmented: false, setting: "issuedAssetsTab", className: "account-tabs", tabsClass: "account-overview bordered-header content-block", contentClass: "padding" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                __WEBPACK_IMPORTED_MODULE_20__Utility_Tabs__["a" /* Tab */],
                                { title: "account.user_issued_assets.issued_assets" },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { className: "content-block" },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "table",
                                        { className: "table dashboard-table table-hover" },
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            "thead",
                                            null,
                                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                                "tr",
                                                null,
                                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                                    "th",
                                                    null,
                                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_translate_component___default.a, { content: "account.user_issued_assets.symbol" })
                                                ),
                                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                                    "th",
                                                    { style: { maxWidth: "200px" } },
                                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_translate_component___default.a, { content: "account.user_issued_assets.description" })
                                                ),
                                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_translate_component___default.a, { component: "th", content: "markets.supply" }),
                                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                                    "th",
                                                    null,
                                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_translate_component___default.a, { content: "account.user_issued_assets.max_supply" })
                                                ),
                                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                                    "th",
                                                    { style: { textAlign: "center" }, colSpan: "3" },
                                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_translate_component___default.a, { content: "account.perm.action" })
                                                )
                                            )
                                        ),
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            "tbody",
                                            null,
                                            myAssets
                                        )
                                    )
                                ),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { className: "content-block" },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        __WEBPACK_IMPORTED_MODULE_1_react_router_es__["b" /* Link */],
                                        { to: "/account/" + account_name + "/create-asset/" },
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            "button",
                                            { className: "button" },
                                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_translate_component___default.a, { content: "transaction.trxTypes.asset_create" })
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_6__Modal_BaseModal__["a" /* default */],
                        { id: "issue_asset", overlay: true },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "grid-block vertical" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_13__Modal_IssueModal__["a" /* default */], {
                                asset_to_issue: this.state.issue.asset_id,
                                onClose: function onClose() {
                                    __WEBPACK_IMPORTED_MODULE_8_react_foundation_apps_src_utils_foundation_api___default.a.publish("issue_asset", "close");
                                }
                            })
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_6__Modal_BaseModal__["a" /* default */],
                        { id: "reserve_asset", overlay: true },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "grid-block vertical" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_14__Modal_ReserveAssetModal__["a" /* default */], {
                                assetId: this.state.reserve,
                                account: account,
                                onClose: function onClose() {
                                    __WEBPACK_IMPORTED_MODULE_8_react_foundation_apps_src_utils_foundation_api___default.a.publish("reserve_asset", "close");
                                }
                            })
                        )
                    )
                )
            );
        }
    }]);

    return AccountAssets;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

AccountAssets.defaultProps = {
    symbol: "",
    name: "",
    description: "",
    max_supply: 0,
    precision: 0
};
AccountAssets.propTypes = {
    assetsList: __WEBPACK_IMPORTED_MODULE_18__Utility_ChainTypes__["a" /* default */].ChainAssetsList,
    symbol: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string.isRequired
};


AccountAssets = Object(__WEBPACK_IMPORTED_MODULE_19__Utility_BindToChainState__["a" /* default */])(AccountAssets);

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_15_alt_react__["connect"])(AccountAssets, {
    listenTo: function listenTo() {
        return [__WEBPACK_IMPORTED_MODULE_4_stores_AssetStore__["a" /* default */]];
    },
    getProps: function getProps(props) {
        var assets = Object(__WEBPACK_IMPORTED_MODULE_17_immutable__["Map"])(),
            assetsList = Object(__WEBPACK_IMPORTED_MODULE_17_immutable__["List"])();
        if (props.account.get("assets", []).size) {
            props.account.get("assets", []).forEach(function (id) {
                assetsList = assetsList.push(id);
            });
        } else {
            assets = __WEBPACK_IMPORTED_MODULE_4_stores_AssetStore__["a" /* default */].getState().assets;
        }
        return { assets: assets, assetsList: assetsList };
    }
}));

/***/ })

});
//# sourceMappingURL=22.js.map