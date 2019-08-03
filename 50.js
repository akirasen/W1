webpackJsonp([50],{

/***/ 1547:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_WalletApi__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_alt_instance__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_stores_WalletDb__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_seerjs_ws__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_seerjs_ws___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_seerjs_ws__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }






var SeerActions = function () {
    function SeerActions() {
        _classCallCheck(this, SeerActions);
    }

    _createClass(SeerActions, [{
        key: "createOracle",
        value: function createOracle(args) {
            var tr = __WEBPACK_IMPORTED_MODULE_0__api_WalletApi__["a" /* default */].new_transaction();

            tr.add_type_operation("oracle_create", args);
            return function (dispatch) {
                return __WEBPACK_IMPORTED_MODULE_2_stores_WalletDb__["a" /* default */].process_transaction(tr, null, true).then(function (result) {
                    console.log("oracle create result:", result);
                    dispatch(true);
                }).catch(function (error) {
                    console.log("createOracle error ----->", error);
                    dispatch(false);
                });
            };
        }
    }, {
        key: "updateOracle",
        value: function updateOracle(args) {
            var tr = __WEBPACK_IMPORTED_MODULE_0__api_WalletApi__["a" /* default */].new_transaction();

            tr.add_type_operation("oracle_update", args);
            return function (dispatch) {
                return __WEBPACK_IMPORTED_MODULE_2_stores_WalletDb__["a" /* default */].process_transaction(tr, null, true).then(function (result) {
                    console.log("updateOracle result:", result);
                    dispatch(true);
                }).catch(function (error) {
                    console.log("updateOracle error ----->", error);
                    dispatch(false);
                });
            };
        }
    }, {
        key: "inputOracle",
        value: function inputOracle(args) {
            var tr = __WEBPACK_IMPORTED_MODULE_0__api_WalletApi__["a" /* default */].new_transaction();

            tr.add_type_operation("oracle_input", args);
            return function (dispatch) {
                return __WEBPACK_IMPORTED_MODULE_2_stores_WalletDb__["a" /* default */].process_transaction(tr, null, true).then(function (result) {
                    console.log("inputOracle result:", result);
                    dispatch(true);
                }).catch(function (error) {
                    console.log("inputOracle error ----->", error);
                    dispatch(false);
                });
            };
        }
    }, {
        key: "createRoom",
        value: function createRoom(args) {
            var tr = __WEBPACK_IMPORTED_MODULE_0__api_WalletApi__["a" /* default */].new_transaction();

            tr.add_type_operation("seer_room_create", args);
            return function (dispatch) {
                return __WEBPACK_IMPORTED_MODULE_2_stores_WalletDb__["a" /* default */].process_transaction(tr, null, true).then(function (result) {
                    console.log("room create result:", result);
                    dispatch(true);
                }).catch(function (error) {
                    console.log("createRoom error ----->", error);
                    dispatch(false);
                });
            };
        }
    }, {
        key: "participate",
        value: function participate(args) {
            var tr = __WEBPACK_IMPORTED_MODULE_0__api_WalletApi__["a" /* default */].new_transaction();

            tr.add_type_operation("seer_room_participate", args);
            return function (dispatch) {
                return __WEBPACK_IMPORTED_MODULE_2_stores_WalletDb__["a" /* default */].process_transaction(tr, null, true).then(function (result) {
                    console.log("seer_room_participate result:", result);
                    dispatch(true);
                }).catch(function (error) {
                    console.log("seer_room_participate error ----->", error);
                    dispatch(false);
                });
            };
        }
    }, {
        key: "openRoom",
        value: function openRoom(args) {
            var tr = __WEBPACK_IMPORTED_MODULE_0__api_WalletApi__["a" /* default */].new_transaction();

            tr.add_type_operation("seer_room_open", args);
            return function (dispatch) {
                return __WEBPACK_IMPORTED_MODULE_2_stores_WalletDb__["a" /* default */].process_transaction(tr, null, true).then(function (result) {
                    console.log("openRoom result:", result);
                    dispatch(true);
                }).catch(function (error) {
                    console.log("openRoom error ----->", error);
                    dispatch(false);
                });
            };
        }
    }, {
        key: "closeRoom",
        value: function closeRoom(args) {
            var tr = __WEBPACK_IMPORTED_MODULE_0__api_WalletApi__["a" /* default */].new_transaction();

            tr.add_type_operation("seer_room_close", args);
            return function (dispatch) {
                return __WEBPACK_IMPORTED_MODULE_2_stores_WalletDb__["a" /* default */].process_transaction(tr, null, true).then(function (result) {
                    console.log("closeRoom result:", result);
                    dispatch(true);
                }).catch(function (error) {
                    console.log("closeRoom error ----->", error);
                    dispatch(false);
                });
            };
        }
    }, {
        key: "stopParticipate",
        value: function stopParticipate(args) {
            var tr = __WEBPACK_IMPORTED_MODULE_0__api_WalletApi__["a" /* default */].new_transaction();

            tr.add_type_operation("seer_room_stop_participating", args);
            return function (dispatch) {
                return __WEBPACK_IMPORTED_MODULE_2_stores_WalletDb__["a" /* default */].process_transaction(tr, null, true).then(function (result) {
                    console.log("stopParticipate result:", result);
                    dispatch(true);
                }).catch(function (error) {
                    console.log("stopParticipate error ----->", error);
                    dispatch(false);
                });
            };
        }
    }, {
        key: "inputRoom",
        value: function inputRoom(args) {
            var tr = __WEBPACK_IMPORTED_MODULE_0__api_WalletApi__["a" /* default */].new_transaction();

            tr.add_type_operation("seer_room_input", args);
            return function (dispatch) {
                return __WEBPACK_IMPORTED_MODULE_2_stores_WalletDb__["a" /* default */].process_transaction(tr, null, true).then(function (result) {
                    console.log("inputRoom result:", result);
                    dispatch(true);
                }).catch(function (error) {
                    console.log("inputRoom error ----->", error);
                    dispatch(false);
                });
            };
        }
    }, {
        key: "finalRoom",
        value: function finalRoom(args) {
            var tr = __WEBPACK_IMPORTED_MODULE_0__api_WalletApi__["a" /* default */].new_transaction();

            tr.add_type_operation("seer_room_final", args);
            return function (dispatch) {
                return __WEBPACK_IMPORTED_MODULE_2_stores_WalletDb__["a" /* default */].process_transaction(tr, null, true).then(function (result) {
                    console.log("finalRoom result:", result);
                    dispatch(true);
                }).catch(function (error) {
                    console.log("finalRoom error ----->", error);
                    dispatch(false);
                });
            };
        }
    }, {
        key: "settleRoom",
        value: function settleRoom(args) {
            var tr = __WEBPACK_IMPORTED_MODULE_0__api_WalletApi__["a" /* default */].new_transaction();

            tr.add_type_operation("seer_room_settle", args);
            return function (dispatch) {
                return __WEBPACK_IMPORTED_MODULE_2_stores_WalletDb__["a" /* default */].process_transaction(tr, null, true).then(function (result) {
                    console.log("settleRoom result:", result);
                    dispatch(true);
                }).catch(function (error) {
                    console.log("settleRoom error ----->", error);
                    dispatch(false);
                });
            };
        }
    }, {
        key: "updateRoom",
        value: function updateRoom(args) {
            var tr = __WEBPACK_IMPORTED_MODULE_0__api_WalletApi__["a" /* default */].new_transaction();

            tr.add_type_operation("seer_room_update", args);
            console.log(tr);
            return function (dispatch) {
                return __WEBPACK_IMPORTED_MODULE_2_stores_WalletDb__["a" /* default */].process_transaction(tr, null, true).then(function (result) {
                    console.log("room update result:", result);
                    dispatch(true);
                }).catch(function (error) {
                    console.log("updateRoom error ----->", error);
                    dispatch(false);
                });
            };
        }
    }, {
        key: "updatePool",
        value: function updatePool(args) {
            var tr = __WEBPACK_IMPORTED_MODULE_0__api_WalletApi__["a" /* default */].new_transaction();

            tr.add_type_operation("seer_room_pool", args);
            console.log(tr);
            return function (dispatch) {
                return __WEBPACK_IMPORTED_MODULE_2_stores_WalletDb__["a" /* default */].process_transaction(tr, null, true).then(function (result) {
                    console.log("room update result:", result);
                    dispatch(true);
                }).catch(function (error) {
                    console.log("updateRoom error ----->", error);
                    dispatch(false);
                });
            };
        }
    }, {
        key: "createHouse",
        value: function createHouse(args) {
            var tr = __WEBPACK_IMPORTED_MODULE_0__api_WalletApi__["a" /* default */].new_transaction();

            tr.add_type_operation("seer_house_create", args);
            return function (dispatch) {
                return __WEBPACK_IMPORTED_MODULE_2_stores_WalletDb__["a" /* default */].process_transaction(tr, null, true).then(function (result) {
                    console.log("presale create result:", result);
                    // this.dispatch(account_id);
                    dispatch(true);
                }).catch(function (error) {
                    console.log("[PresaleActions.js:150] ----- createPresale error ----->", error);
                    dispatch(false);
                });
            };
        }
    }, {
        key: "updateHouse",
        value: function updateHouse(args) {
            var tr = __WEBPACK_IMPORTED_MODULE_0__api_WalletApi__["a" /* default */].new_transaction();

            tr.add_type_operation("seer_house_update", args);
            return function (dispatch) {
                return __WEBPACK_IMPORTED_MODULE_2_stores_WalletDb__["a" /* default */].process_transaction(tr, null, true).then(function (result) {
                    console.log("house update result:", result);
                    dispatch(true);
                }).catch(function (error) {
                    console.log("updateHouse error ----->", error);
                    dispatch(false);
                });
            };
        }
    }]);

    return SeerActions;
}();

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_alt_instance__["a" /* default */].createActions(SeerActions));

/***/ }),

/***/ 1949:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_translate_component__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_translate_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_translate_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions_SeerActions__ = __webpack_require__(1547);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Utility_BindToChainState__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Utility_ChainTypes__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Utility_AmountSelector__ = __webpack_require__(689);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_seerjs_es__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Utility_FormattedAsset__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_counterpart__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_counterpart___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_counterpart__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }











var AccountHouseUpdate = function (_React$Component) {
    _inherits(AccountHouseUpdate, _React$Component);

    function AccountHouseUpdate(props) {
        _classCallCheck(this, AccountHouseUpdate);

        var _this = _possibleConstructorReturn(this, (AccountHouseUpdate.__proto__ || Object.getPrototypeOf(AccountHouseUpdate)).call(this, props));

        var core_asset = __WEBPACK_IMPORTED_MODULE_6_seerjs_es__["b" /* ChainStore */].getAsset("1.3.0");
        _this.state = {
            description: props.house.get("description"),
            guaranty: 0,
            script: props.house.get("script")
        };
        return _this;
    }

    _createClass(AccountHouseUpdate, [{
        key: "_updateHouse",
        value: function _updateHouse() {
            var core_asset = __WEBPACK_IMPORTED_MODULE_6_seerjs_es__["b" /* ChainStore */].getAsset("1.3.0");
            var guaranty = parseInt(this.state.guaranty) * Math.pow(10, core_asset.get("precision"));
            var args = {
                issuer: this.props.account.get("id"),
                guaranty: guaranty,
                claim_fees: 0,
                description: this.state.description,
                script: this.state.script,
                house: this.props.house.get("id")
            };
            __WEBPACK_IMPORTED_MODULE_2__actions_SeerActions__["a" /* default */].updateHouse(args);
        }
    }, {
        key: "_changeGuaranty",
        value: function _changeGuaranty(_ref) {
            var amount = _ref.amount,
                asset = _ref.asset;

            this.setState({ guaranty: amount });
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "grid-content app-tables no-padding", ref: "appTables" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "content-block small-12", style: { paddingTop: "34px", maxWidth: "37.5em" } },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_translate_component___default.a, { content: "account.guaranty.title", component: "h5", style: { fontWeight: "bold" } }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_translate_component___default.a, { content: "account.guaranty.explain", component: "p", style: { fontSize: "14px", color: "#999" } }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "content-block", style: { marginTop: "48px" } },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_translate_component___default.a, { component: "label", content: "seer.oracle.description" }),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "textarea",
                            { onChange: function onChange(e) {
                                    return _this2.setState({ description: e.target.value });
                                }, style: { height: "6.69em", resize: "none" } },
                            this.state.description
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "content-block" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_translate_component___default.a, { component: "label", content: "seer.oracle.script" }),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "text", value: this.state.script, placeholder: __WEBPACK_IMPORTED_MODULE_8_counterpart___default.a.translate("account.guaranty.script_explain"), onChange: function onChange(e) {
                                return _this2.setState({ script: e.target.value });
                            } })
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "content-block" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { style: { display: "flex", flexDirection: "row", alignItems: "center" } },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_translate_component___default.a, { content: "seer.oracle.guaranty", style: { fontSize: "14px", color: "#666666" } }),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "svg",
                                { className: "icon", "aria-hidden": "true", style: { width: "18px", height: "18px", marginLeft: "24px", marginRight: "9px" } },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("use", { xlinkHref: "#icon-tishi3" })
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_translate_component___default.a, { content: "account.guaranty.balance_explain", style: { fontSize: "14px", color: "#FF972B" } })
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__Utility_AmountSelector__["a" /* default */], { asset: "1.3.0", assets: ["1.3.0"], amount: this.state.guaranty, onChange: this._changeGuaranty.bind(this) }),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { style: { fontSize: "14px", color: "#999", width: "100%", textAlign: "right", paddingTop: "1em" } },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_translate_component___default.a, { content: "account.guaranty.balance" }),
                            "\uFF1A",
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__Utility_FormattedAsset__["a" /* default */], { amount: this.props.house.get("guaranty"), asset: "1.3.0" })
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "button",
                        { onClick: this._updateHouse.bind(this), className: "button primary", style: { marginTop: "48px" } },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_translate_component___default.a, { content: "account.guaranty.update" })
                    )
                )
            );
        }
    }]);

    return AccountHouseUpdate;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

AccountHouseUpdate.propTypes = {
    house: __WEBPACK_IMPORTED_MODULE_4__Utility_ChainTypes__["a" /* default */].ChainObject.isRequired
};
AccountHouseUpdate.defaultProps = {
    house: "props.params.house_id"
};


AccountHouseUpdate = Object(__WEBPACK_IMPORTED_MODULE_3__Utility_BindToChainState__["a" /* default */])(AccountHouseUpdate);

/* harmony default export */ __webpack_exports__["default"] = (AccountHouseUpdate);

/***/ })

});
//# sourceMappingURL=50.js.map