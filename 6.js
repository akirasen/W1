webpackJsonp([6],{

/***/ 1922:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/react/react.js
var react = __webpack_require__(1);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/alt-react/lib/index.js
var lib = __webpack_require__(29);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// EXTERNAL MODULE: ./node_modules/immutable/dist/immutable.js
var immutable = __webpack_require__(20);
var immutable_default = /*#__PURE__*/__webpack_require__.n(immutable);

// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(28);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./app/alt-instance.js
var alt_instance = __webpack_require__(9);

// CONCATENATED MODULE: ./app/actions/BrainkeyActions.js
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var BrainkeyActions = function () {
    function BrainkeyActions() {
        _classCallCheck(this, BrainkeyActions);
    }

    _createClass(BrainkeyActions, [{
        key: "setBrainkey",
        value: function setBrainkey(brnkey) {
            return brnkey;
        }
    }]);

    return BrainkeyActions;
}();

var BrainkeyActionsWrapped = alt_instance["a" /* default */].createActions(BrainkeyActions);
/* harmony default export */ var actions_BrainkeyActions = (BrainkeyActionsWrapped);
// EXTERNAL MODULE: ./node_modules/seerjs/es/index.js + 7 modules
var es = __webpack_require__(6);

// EXTERNAL MODULE: ./app/stores/BaseStore.js
var BaseStore = __webpack_require__(60);

// CONCATENATED MODULE: ./app/stores/BrainkeyStore.js
var BrainkeyStore__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function BrainkeyStore__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }







/** Each instance supports a single brainkey. */

var BrainkeyStore_BrainkeyStoreFactory = function () {
    function BrainkeyStoreFactory() {
        BrainkeyStore__classCallCheck(this, BrainkeyStoreFactory);
    }

    BrainkeyStore__createClass(BrainkeyStoreFactory, null, [{
        key: "getInstance",

        /** This may be called multiple times for the same <b>name</b>.  When done,
            (componentWillUnmount) make sure to call this.closeInstance()
        */
        value: function getInstance(name) {
            var instance = BrainkeyStoreFactory.instances.get(name);
            if (!instance) {
                instance = alt_instance["a" /* default */].createStore(BrainkeyStore_BrainkeyStoreImpl, "BrainkeyStore");
                BrainkeyStoreFactory.instances.set(name, instance);
            }
            var subscribed_instance_key = name + " subscribed_instance";
            if (!BrainkeyStoreFactory.instances.get(subscribed_instance_key)) {
                var subscribed_instance = instance.chainStoreUpdate.bind(instance);
                es["b" /* ChainStore */].subscribe(subscribed_instance);
                BrainkeyStoreFactory.instances.set(subscribed_instance_key, subscribed_instance);
            }
            return instance;
        }
    }, {
        key: "closeInstance",
        value: function closeInstance(name) {
            var instance = BrainkeyStoreFactory.instances.get(name);
            if (!instance) throw new Error("unknown instance " + name);
            var subscribed_instance_key = name + " subscribed_instance";
            var subscribed_instance = BrainkeyStoreFactory.instances.get(subscribed_instance_key);
            BrainkeyStoreFactory.instances.delete(subscribed_instance_key);
            es["b" /* ChainStore */].unsubscribe(subscribed_instance);
            instance.clearCache();
        }
    }]);

    return BrainkeyStoreFactory;
}();

/** Derived keys may be unassigned from accounts therefore we must define a
    fixed block of derivied keys then monitor the entire block.
*/


BrainkeyStore_BrainkeyStoreFactory.instances = new Map();
/* harmony default export */ var BrainkeyStore = (BrainkeyStore_BrainkeyStoreFactory);
var DERIVIED_BRAINKEY_POOL_SIZE = 10;

var BrainkeyStore_BrainkeyStoreImpl = function (_BaseStore) {
    _inherits(BrainkeyStoreImpl, _BaseStore);

    function BrainkeyStoreImpl() {
        BrainkeyStore__classCallCheck(this, BrainkeyStoreImpl);

        var _this = _possibleConstructorReturn(this, (BrainkeyStoreImpl.__proto__ || Object.getPrototypeOf(BrainkeyStoreImpl)).call(this));

        _this.clearCache();
        _this.bindListeners({
            onSetBrainkey: actions_BrainkeyActions.setBrainkey
        });
        _this._export("inSync", "chainStoreUpdate", "clearCache");
        return _this;
    }

    // chainStoreUnsubscribe() {
    //     try{
    //         ChainStore.unsubscribe(this.chainStoreUpdate)
    //     }catch(e1) {console.log("unsub 1 fail");
    //         try{
    //             ChainStore.unsubscribe(this.chainStoreUpdate.bind(this))
    //         }catch(e2) {console.log("unsub 1 fail")}
    //     }
    // }

    BrainkeyStore__createClass(BrainkeyStoreImpl, [{
        key: "clearCache",
        value: function clearCache() {
            this.state = {
                brnkey: "",
                account_ids: immutable_default.a.Set()
            };
            this.derived_keys = new Array();
            // Compared with ChainStore.account_ids_by_key
            this.account_ids_by_key = null;
        }

        /** Saves the brainkey and begins the lookup for derived account referneces */

    }, {
        key: "onSetBrainkey",
        value: function onSetBrainkey(brnkey) {
            this.clearCache();
            this.setState({ brnkey: brnkey });
            this.deriveKeys(brnkey);
            this.chainStoreUpdate();
        }

        /** @return <b>true</b> when all derivied account references are either
            found or known not to exist.
        */

    }, {
        key: "inSync",
        value: function inSync() {
            this.derived_keys.forEach(function (derived_key) {
                if (BrainkeyStore_isPendingFromChain(derived_key)) return false;
            });
            return true;
        }
    }, {
        key: "chainStoreUpdate",
        value: function chainStoreUpdate() {
            if (!this.derived_keys.length) return;
            if (this.account_ids_by_key === es["b" /* ChainStore */].account_ids_by_key) return;
            this.account_ids_by_key = es["b" /* ChainStore */].account_ids_by_key;
            this.updateAccountIds();
        }
    }, {
        key: "deriveKeys",
        value: function deriveKeys() {
            var brnkey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.brnkey;

            var sequence = this.derived_keys.length; // next sequence (starting with 0)
            var private_key = es["o" /* key */].get_brainPrivateKey(brnkey, sequence);
            var derived_key = derivedKeyStruct(private_key);
            this.derived_keys.push(derived_key);
            if (this.derived_keys.length < DERIVIED_BRAINKEY_POOL_SIZE) this.deriveKeys(brnkey);
        }
    }, {
        key: "updateAccountIds",
        value: function updateAccountIds() {
            var _this2 = this;

            var new_account_ids = immutable_default.a.Set().withMutations(function (new_ids) {
                var updatePubkey = function updatePubkey(public_string) {
                    var chain_account_ids = es["b" /* ChainStore */].getAccountRefsOfKey(public_string);
                    if (chain_account_ids) chain_account_ids.forEach(function (chain_account_id) {
                        new_ids.add(chain_account_id);
                    });
                };
                _this2.derived_keys.forEach(function (derived_key) {
                    return updatePubkey(derived_key.public_string);
                });
            });
            if (!new_account_ids.equals(this.state.account_ids)) {
                this.state.account_ids = new_account_ids;
                this.setState({ account_ids: new_account_ids });
            }
        }
    }]);

    return BrainkeyStoreImpl;
}(BaseStore["a" /* default */]);

function derivedKeyStruct(private_key) {
    var public_string = private_key.toPublicKey().toPublicKeyString();
    var derived_key = { private_key: private_key, public_string: public_string };
    return derived_key;
}

var BrainkeyStore_isPendingFromChain = function isPendingFromChain(derived_key) {
    return es["b" /* ChainStore */].getAccountRefsOfKey(derived_key.public_string) === undefined;
};
// EXTERNAL MODULE: ./app/components/Utility/BindToChainState.jsx
var BindToChainState = __webpack_require__(32);

// EXTERNAL MODULE: ./app/components/Utility/ChainTypes.js
var ChainTypes = __webpack_require__(33);

// EXTERNAL MODULE: ./app/components/Wallet/BrainkeyInput.jsx
var BrainkeyInput = __webpack_require__(715);

// EXTERNAL MODULE: ./node_modules/lodash/index.js
var lodash = __webpack_require__(106);
var lodash_default = /*#__PURE__*/__webpack_require__.n(lodash);

// EXTERNAL MODULE: ./node_modules/react-translate-component/index.js
var react_translate_component = __webpack_require__(5);
var react_translate_component_default = /*#__PURE__*/__webpack_require__.n(react_translate_component);

// EXTERNAL MODULE: ./app/components/Utility/BalanceComponent.jsx
var BalanceComponent = __webpack_require__(690);

// EXTERNAL MODULE: ./app/components/Account/AccountImage.jsx + 1 modules
var AccountImage = __webpack_require__(287);

// EXTERNAL MODULE: ./app/stores/AccountStore.js
var AccountStore = __webpack_require__(49);

// CONCATENATED MODULE: ./app/components/Dashboard/AccountCard.jsx
var AccountCard__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function AccountCard__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function AccountCard__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function AccountCard__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









/**
 *  @brief displays the summary of a given account in a condenced view (for the dashboard)
 *
 *  This card has the following properties:
 *
 *  { account: ${name_or_id} }
 */

var AccountCard_AccountCard = function (_React$Component) {
    AccountCard__inherits(AccountCard, _React$Component);

    function AccountCard() {
        AccountCard__classCallCheck(this, AccountCard);

        return AccountCard__possibleConstructorReturn(this, (AccountCard.__proto__ || Object.getPrototypeOf(AccountCard)).apply(this, arguments));
    }

    AccountCard__createClass(AccountCard, [{
        key: "onCardClick",
        value: function onCardClick(e) {
            e.preventDefault();
            var name = this.props.account.get('name');
            this.context.router.push("/account/" + name + "/overview/");
        }
    }, {
        key: "render",
        value: function render() {
            var name = null;
            var balances = null;
            var isMyAccount = false;
            if (this.props.account) {
                name = this.props.account.get('name');
                var abal = this.props.account.get('balances');
                if (abal) {
                    balances = abal.map(function (x) {
                        var balanceAmount = es["b" /* ChainStore */].getObject(x);
                        if (!balanceAmount.get("balance")) {
                            return null;
                        }
                        return react_default.a.createElement(
                            "li",
                            { key: x },
                            react_default.a.createElement(BalanceComponent["a" /* default */], { balance: x })
                        );
                    }).toArray();
                }
                isMyAccount = AccountStore["a" /* default */].isMyAccount(this.props.account);
            }

            return react_default.a.createElement(
                "div",
                { className: "grid-content account-card", onClick: this.onCardClick.bind(this) },
                react_default.a.createElement(
                    "div",
                    { className: "card" + (isMyAccount ? " my-account" : "") },
                    react_default.a.createElement(
                        "h4",
                        { className: "text-center" },
                        name
                    ),
                    react_default.a.createElement(
                        "div",
                        { className: "card-content clearfix" },
                        react_default.a.createElement(
                            "div",
                            { className: "float-left" },
                            react_default.a.createElement(AccountImage["a" /* default */], { account: name, size: { height: 64, width: 64 } })
                        ),
                        react_default.a.createElement(
                            "ul",
                            { className: "balances" },
                            balances
                        )
                    )
                )
            );
        }
    }]);

    return AccountCard;
}(react_default.a.Component);

AccountCard_AccountCard.contextTypes = {
    router: react_default.a.PropTypes.object.isRequired
};
AccountCard_AccountCard.propTypes = {
    account: ChainTypes["a" /* default */].ChainAccount.isRequired
};


/* harmony default export */ var Dashboard_AccountCard = (Object(BindToChainState["a" /* default */])(AccountCard_AccountCard));
// CONCATENATED MODULE: ./app/components/Wallet/Brainkey.jsx
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrainkeyInputAccept", function() { return Brainkey_BrainkeyInputAccept; });
var Brainkey__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function Brainkey__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Brainkey__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Brainkey__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }














var connectObject = {
    listenTo: function listenTo() {
        return [BrainkeyStore.getInstance("wmc")];
    },
    getProps: function getProps() {
        return BrainkeyStore.getInstance("wmc").getState();
    }
};

var Brainkey_Brainkey = function (_Component) {
    Brainkey__inherits(Brainkey, _Component);

    function Brainkey() {
        Brainkey__classCallCheck(this, Brainkey);

        return Brainkey__possibleConstructorReturn(this, (Brainkey.__proto__ || Object.getPrototypeOf(Brainkey)).apply(this, arguments));
    }

    Brainkey__createClass(Brainkey, [{
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            BrainkeyStore.closeInstance("wmc");
        }
    }, {
        key: "render",
        value: function render() {
            return react_default.a.createElement(
                "span",
                null,
                react_default.a.createElement(
                    "h3",
                    null,
                    react_default.a.createElement(react_translate_component_default.a, { content: "wallet.brainkey" })
                ),
                react_default.a.createElement(
                    Brainkey_BrainkeyInputAccept,
                    null,
                    react_default.a.createElement(Brainkey_ViewBrainkey, null)
                )
            );
        }
    }]);

    return Brainkey;
}(react["Component"]);

Brainkey_Brainkey = Object(lib["connect"])(Brainkey_Brainkey, connectObject);
/* harmony default export */ var Wallet_Brainkey = __webpack_exports__["default"] = (Brainkey_Brainkey);

var Brainkey_ViewBrainkey = function (_Component2) {
    Brainkey__inherits(ViewBrainkey, _Component2);

    function ViewBrainkey() {
        Brainkey__classCallCheck(this, ViewBrainkey);

        return Brainkey__possibleConstructorReturn(this, (ViewBrainkey.__proto__ || Object.getPrototypeOf(ViewBrainkey)).apply(this, arguments));
    }

    Brainkey__createClass(ViewBrainkey, [{
        key: "render",
        value: function render() {
            var short_brnkey = this.props.brnkey.substring(0, 10);
            // console.log("this.props.account_ids.toArray()", this.props.account_ids.toArray())
            return react_default.a.createElement(
                "span",
                null,
                react_default.a.createElement(
                    "div",
                    null,
                    react_default.a.createElement(
                        "span",
                        { className: "" },
                        short_brnkey
                    ),
                    "\u2026"
                ),
                react_default.a.createElement("p", null),
                this.props.account_ids.size ? react_default.a.createElement(Brainkey_BrainkeyAccounts, { accounts: immutable_default.a.List(this.props.account_ids.toArray()) }) : react_default.a.createElement(
                    "h5",
                    null,
                    react_default.a.createElement(react_translate_component_default.a, { content: "wallet.no_accounts" })
                )
            );
        }
    }]);

    return ViewBrainkey;
}(react["Component"]);

Brainkey_ViewBrainkey = Object(lib["connect"])(Brainkey_ViewBrainkey, connectObject);

var Brainkey_BrainkeyAccounts = function () {
    function BrainkeyAccounts() {
        Brainkey__classCallCheck(this, BrainkeyAccounts);
    }

    Brainkey__createClass(BrainkeyAccounts, [{
        key: "render",
        value: function render() {
            var rows = Object(lodash["pairs"])(this.props.accounts).filter(function (account) {
                return !!account[1];
            }).map(function (account) {
                return account[1].get("name");
            }).sort().map(function (name) {
                return react_default.a.createElement(Dashboard_AccountCard, { key: name, account: name });
            });
            return react_default.a.createElement(
                "span",
                null,
                rows
            );
        }
    }]);

    return BrainkeyAccounts;
}();

Brainkey_BrainkeyAccounts.propTypes = {
    accounts: ChainTypes["a" /* default */].ChainAccountsList.isRequired
};

Brainkey_BrainkeyAccounts = Object(BindToChainState["a" /* default */])(Brainkey_BrainkeyAccounts, { keep_updating: true });

var Brainkey_BrainkeyInputAccept = function (_Component3) {
    Brainkey__inherits(BrainkeyInputAccept, _Component3);

    function BrainkeyInputAccept() {
        Brainkey__classCallCheck(this, BrainkeyInputAccept);

        var _this3 = Brainkey__possibleConstructorReturn(this, (BrainkeyInputAccept.__proto__ || Object.getPrototypeOf(BrainkeyInputAccept)).call(this));

        _this3.state = { brnkey: "", accept: false };
        return _this3;
    }

    Brainkey__createClass(BrainkeyInputAccept, [{
        key: "render",
        value: function render() {
            if (this.state.accept) return react_default.a.createElement(
                "span",
                null,
                this.props.children
            );

            var ready = this.state.brnkey && this.state.brnkey !== "";
            return react_default.a.createElement(
                "span",
                { className: "grid-container" },
                react_default.a.createElement(
                    "div",
                    null,
                    react_default.a.createElement(BrainkeyInput["a" /* default */], { onChange: this.onBrainkeyChange.bind(this) })
                ),
                react_default.a.createElement(
                    "div",
                    { className: classnames_default()("button success", { disabled: !ready }),
                        onClick: this.onAccept.bind(this) },
                    react_default.a.createElement(react_translate_component_default.a, { content: "wallet.accept" })
                )
            );
        }
    }, {
        key: "onBrainkeyChange",
        value: function onBrainkeyChange(brnkey) {
            this.setState({ brnkey: brnkey });
        }
    }, {
        key: "onAccept",
        value: function onAccept() {
            this.setState({ accept: true });
            actions_BrainkeyActions.setBrainkey(this.state.brnkey);
        }
    }]);

    return BrainkeyInputAccept;
}(react["Component"]);

// <div onClick={this.onLookupAccounts.bind(this)} className="button success">Lookup Accounts</div>
// onLookupAccounts() {
//
// }

/***/ })

});
//# sourceMappingURL=6.js.map