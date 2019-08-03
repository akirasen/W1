webpackJsonp([34],{

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

/***/ 1919:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_seerjs_ws__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_seerjs_ws___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_seerjs_ws__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_react_router_es__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__stores_AccountStore__ = __webpack_require__(49);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


















__webpack_require__(1609);

var HouseCard = function (_React$Component) {
    _inherits(HouseCard, _React$Component);

    function HouseCard() {
        _classCallCheck(this, HouseCard);

        return _possibleConstructorReturn(this, (HouseCard.__proto__ || Object.getPrototypeOf(HouseCard)).apply(this, arguments));
    }

    _createClass(HouseCard, [{
        key: "_onCardClick",
        value: function _onCardClick(e) {
            e.preventDefault();
            this.context.router.push("/houses/" + this.props.house.id);
        }
    }, {
        key: "render",
        value: function render() {
            var house = this.props.house;
            // let script=house.script?house.script.indexOf("{")!=-1?JSON.parse(house.script):{}:{}
            //let iconUrl = house.script.indexOf("{") != -1 ? JSON.parse(house.script).iconUrl : house.script;
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "grid-content account-card", onClick: this._onCardClick.bind(this) },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "card" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "h3",
                        { className: "text-center" },
                        this.props.account.get("name")
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "card-content" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "table",
                            { className: "table key-value-table table-column-fixed" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "tbody",
                                null,
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "tr",
                                    null,
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "td",
                                        { width: 80 },
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_translate_component___default.a, { content: "seer.oracle.description" })
                                    ),
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "td",
                                        { className: "text-ellipsis" },
                                        house.description
                                    )
                                ),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "tr",
                                    null,
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "td",
                                        null,
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_translate_component___default.a, { content: "seer.oracle.guaranty" })
                                    ),
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "td",
                                        null,
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__Utility_FormattedAsset__["a" /* default */], { amount: house.guaranty, asset: "1.3.0" })
                                    )
                                ),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "tr",
                                    null,
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "td",
                                        null,
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_translate_component___default.a, { content: "seer.oracle.reputation" })
                                    ),
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "td",
                                        null,
                                        house.reputation
                                    )
                                ),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "tr",
                                    null,
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "td",
                                        null,
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_translate_component___default.a, { content: "seer.oracle.volume" })
                                    ),
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "td",
                                        null,
                                        house.volume
                                    )
                                ),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "tr",
                                    null,
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "td",
                                        null,
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_translate_component___default.a, { content: "seer.oracle.script" })
                                    ),
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "td",
                                        { className: "text-ellipsis" },
                                        this.props.house.script.substring(0, 32)
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return HouseCard;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

HouseCard.propTypes = {
    account: __WEBPACK_IMPORTED_MODULE_3__Utility_ChainTypes__["a" /* default */].ChainAccount.isRequired,
    house: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.object
};
HouseCard.contextTypes = {
    router: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.object.isRequired
};

HouseCard = Object(__WEBPACK_IMPORTED_MODULE_4__Utility_BindToChainState__["a" /* default */])(HouseCard, { keep_updating: true });

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
            var total_votes = witness_data.get("total_votes");

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
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__Utility_FormattedAsset__["a" /* default */], { amount: witness_data.get('total_votes'), asset: "1.3.0", decimalOffset: 5 })
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

var HouseList = function (_React$Component3) {
    _inherits(HouseList, _React$Component3);

    function HouseList() {
        _classCallCheck(this, HouseList);

        var _this3 = _possibleConstructorReturn(this, (HouseList.__proto__ || Object.getPrototypeOf(HouseList)).call(this));

        _this3.state = {
            sortBy: 'rank',
            inverseSort: true,
            houses: []
        };

        return _this3;
    }

    _createClass(HouseList, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            var _this4 = this;

            __WEBPACK_IMPORTED_MODULE_13_seerjs_ws__["Apis"].instance().db_api().exec("lookup_house_accounts", [0, 1000]).then(function (results) {
                var ids = [];
                results.forEach(function (r) {
                    ids.push(r[1]);
                });

                __WEBPACK_IMPORTED_MODULE_13_seerjs_ws__["Apis"].instance().db_api().exec("get_houses", [ids]).then(function (houses) {
                    _this4.setState({ houses: houses });
                });
            });
        }
    }, {
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
            var _this5 = this;

            var _props2 = this.props,
                witnesses = _props2.witnesses,
                current = _props2.current,
                cardView = _props2.cardView,
                witnessList = _props2.witnessList;
            var _state = this.state,
                sortBy = _state.sortBy,
                inverseSort = _state.inverseSort,
                houses = _state.houses;

            var most_recent_aslot = 0;
            var ranks = {};

            var itemRows = null;
            if (witnesses.length > 0 && witnesses[1]) {
                itemRows = houses.map(function (a) {

                    if (0) {
                        return React.createElement(WitnessRow, { key: a.get("id"), rank: ranks[a.get("id")], isCurrent: current === a.get("id"), witness: a.get("witness_account"), most_recent: _this5.props.current_aslot });
                    } else {
                        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(HouseCard, { key: a.id, house: a, account: a.owner });
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
                                { className: "clickable", onClick: this._setSort.bind(this, 'total_votes') },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_translate_component___default.a, { content: "account.votes.votes" })
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

    return HouseList;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

HouseList.propTypes = {
    witnesses: __WEBPACK_IMPORTED_MODULE_3__Utility_ChainTypes__["a" /* default */].ChainObjectsList.isRequired
};

HouseList = Object(__WEBPACK_IMPORTED_MODULE_4__Utility_BindToChainState__["a" /* default */])(HouseList, { keep_updating: true, show_loader: true });

var Witnesses = function (_React$Component4) {
    _inherits(Witnesses, _React$Component4);

    function Witnesses(props) {
        _classCallCheck(this, Witnesses);

        var _this6 = _possibleConstructorReturn(this, (Witnesses.__proto__ || Object.getPrototypeOf(Witnesses)).call(this, props));

        _this6.state = {
            filterWitness: props.filterWitness || "",
            cardView: true //props.cardView
        };
        return _this6;
    }

    _createClass(Witnesses, [{
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
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "grid-block", style: { padding: '24px' } },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "grid-block" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "grid-block" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "grid-content " },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(HouseList, {
                                current_aslot: dynGlobalObject.current_aslot,
                                current: current ? current.get("id") : null,
                                witnesses: __WEBPACK_IMPORTED_MODULE_1_immutable___default.a.List(globalObject.active_witnesses),
                                witnessList: globalObject.active_witnesses,
                                filter: this.state.filterWitness,
                                cardView: this.state.cardView
                            })
                        )
                    )
                )
            );
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

/***/ })

});
//# sourceMappingURL=34.js.map