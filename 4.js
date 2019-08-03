webpackJsonp([4,51],{

/***/ 128:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/react/react.js
var react = __webpack_require__(1);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/alt-react/lib/index.js
var lib = __webpack_require__(29);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// EXTERNAL MODULE: ./app/stores/AccountStore.js
var AccountStore = __webpack_require__(49);

// EXTERNAL MODULE: ./node_modules/react-router/es/index.js + 32 modules
var es = __webpack_require__(34);

// EXTERNAL MODULE: ./node_modules/react-translate-component/index.js
var react_translate_component = __webpack_require__(5);
var react_translate_component_default = /*#__PURE__*/__webpack_require__.n(react_translate_component);

// CONCATENATED MODULE: ./app/lib/feature_detect/browser.js
/* harmony default export */ var browser = (function () {
    var ua = navigator.userAgent.toLowerCase();

    if (ua.indexOf("firefox") > -1) {
        //is firefox
        return "firefox";
    } else if (ua.search("safari") >= 0 && ua.search("chrome") < 0) {
        //is safari
        return "safari";
    } else if (window.chrome) {
        //is chrome
        return "chrome";
    } else if (ua.indexOf("msie") > -1 || ua.match(/trident.*rv\:11\./)) {
        //is IE
        return "ie";
    } else if (ua.indexOf("opera") > -1) {
        return "opera";
    } else {
        return ua;
    }
});
// CONCATENATED MODULE: ./app/lib/feature_detect/incognito.js

/*
* Using feature detectino techniques described here:
* https://stackoverflow.com/questions/2860879/detecting-if-a-browser-is-using-private-browsing-mode
*/
/* harmony default export */ var incognito = (function (cb) {
    return cb(false);
    // let ua = navigator.userAgent.toLowerCase();
    // let name = browser();
    // if(name === "firefox"){
    //     var db = indexedDB.open("test");
    //     db.onerror = function(){
    //         cb(true);
    //     };
    //     db.onsuccess =function(){
    //         cb(false);
    //     };
    // } else if(name === "safari"){
    //     var storage = window.sessionStorage;
    //     try {
    //         storage.setItem("someKeyHere", "test");
    //         storage.removeItem("someKeyHere");
    //         cb(false);
    //     } catch (e) {
    //         if (e.code === DOMException.QUOTA_EXCEEDED_ERR && storage.length === 0) {
    //             //Private here
    //             cb(true);
    //         } else {
    //             cb(false);
    //         }
    //     }
    // } else if(name === "chrome" || name === "opera"){
    //     var fs = window.RequestFileSystem || window.webkitRequestFileSystem;
    //     if (!fs) {
    //         cb(false);
    //         return;
    //     }
    //
    //     fs(window.TEMPORARY, 100, function (fs) {
    //         // Not incognito mode
    //         cb(false);
    //     }, function (err) {
    //         // Incognito mode
    //         cb(true);
    //     });
    // } else if(name === "ie"){
    //     if(!window.indexedDB && (window.PointerEvent || window.MSPointerEvent)){
    //         //Privacy Mode
    //         cb(true);
    //     } else {
    //         cb(false);
    //     }
    // }
});
// CONCATENATED MODULE: ./app/lib/feature_detect/index.js




// EXTERNAL MODULE: ./app/actions/SettingsActions.js
var SettingsActions = __webpack_require__(25);

// EXTERNAL MODULE: ./app/actions/WalletUnlockActions.js
var WalletUnlockActions = __webpack_require__(69);

// EXTERNAL MODULE: ./node_modules/react-foundation-apps/src/action-sheet/index.jsx
var action_sheet = __webpack_require__(699);
var action_sheet_default = /*#__PURE__*/__webpack_require__.n(action_sheet);

// EXTERNAL MODULE: ./app/stores/SettingsStore.js
var SettingsStore = __webpack_require__(35);

// EXTERNAL MODULE: ./app/actions/IntlActions.js
var IntlActions = __webpack_require__(150);

// EXTERNAL MODULE: ./app/actions/AccountActions.js + 1 modules
var AccountActions = __webpack_require__(89);

// CONCATENATED MODULE: ./app/components/LoginSelector.jsx
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var logo = __webpack_require__(190);







var LoginSelector_FlagImage = function FlagImage(_ref) {
    var flag = _ref.flag,
        _ref$width = _ref.width,
        width = _ref$width === undefined ? 50 : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === undefined ? 50 : _ref$height;

    return react_default.a.createElement("img", { height: height, width: width, src: "/" + "language-dropdown/" + flag.toUpperCase() + ".png" });
};

var LoginSelector_LoginSelector = function (_React$Component) {
    _inherits(LoginSelector, _React$Component);

    function LoginSelector(props) {
        _classCallCheck(this, LoginSelector);

        var _this = _possibleConstructorReturn(this, (LoginSelector.__proto__ || Object.getPrototypeOf(LoginSelector)).call(this, props));

        AccountActions["a" /* default */].setRegisterStep(1);
        _this.state = {
            locales: SettingsStore["a" /* default */].getState().defaults.locale,
            currentLocale: SettingsStore["a" /* default */].getState().settings.get("locale")
        };
        return _this;
    }

    _createClass(LoginSelector, [{
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            var myAccounts = AccountStore["a" /* default */].getMyAccounts();

            // use ChildCount to make sure user is on /create-account page except /create-account/*
            // to prevent redirect when user just registered and need to make backup of wallet or password
            var childCount = react_default.a.Children.count(this.props.children);

            // do redirect to portfolio if user already logged in
            if (Array.isArray(myAccounts) && myAccounts.length !== 0 && childCount === 0) this.props.router.push("/account/" + this.props.currentAccount);
        }
    }, {
        key: "componentWillMount",
        value: function componentWillMount() {
            var _this2 = this;

            incognito(function (incognito) {
                _this2.setState({ incognito: incognito });
            });
        }
    }, {
        key: "onSelect",
        value: function onSelect(route) {
            this.props.router.push("/create-account/" + route);
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var translator = __webpack_require__(3);

            var childCount = react_default.a.Children.count(this.props.children);

            var flagDropdown = react_default.a.createElement(
                action_sheet_default.a,
                null,
                react_default.a.createElement(
                    action_sheet_default.a.Button,
                    { title: "", style: { width: "64px" } },
                    react_default.a.createElement(
                        "a",
                        { style: { padding: "1rem", border: "none" }, className: "button arrow-down" },
                        react_default.a.createElement(LoginSelector_FlagImage, { flag: this.state.currentLocale })
                    )
                ),
                react_default.a.createElement(
                    action_sheet_default.a.Content,
                    null,
                    react_default.a.createElement(
                        "ul",
                        { className: "no-first-element-top-border" },
                        this.state.locales.map(function (locale) {
                            return react_default.a.createElement(
                                "li",
                                { key: locale },
                                react_default.a.createElement(
                                    "a",
                                    { href: true, onClick: function onClick(e) {
                                            e.preventDefault();IntlActions["a" /* default */].switchLocale(locale);_this3.setState({ currentLocale: locale });
                                        } },
                                    react_default.a.createElement(
                                        "div",
                                        { className: "table-cell" },
                                        react_default.a.createElement(LoginSelector_FlagImage, { width: "20", height: "20", flag: locale })
                                    ),
                                    react_default.a.createElement(
                                        "div",
                                        { className: "table-cell", style: { paddingLeft: 10 } },
                                        react_default.a.createElement(react_translate_component_default.a, { content: "languages." + locale })
                                    )
                                )
                            );
                        })
                    )
                )
            );

            var formTitle = "header.create_account";
            if (AccountStore["a" /* default */].getState().registerStep === 3) {
                formTitle = "header.backup_bin";
            } else if (AccountStore["a" /* default */].getState().registerStep === 9) {
                formTitle = "header.restore_bin";
            }

            return react_default.a.createElement(
                "div",
                { className: "grid-block align-center", style: { background: "#F2F2F2" } },
                react_default.a.createElement(
                    "div",
                    { className: "grid-block shrink vertical" },
                    react_default.a.createElement(
                        "div",
                        { className: "grid-content shrink text-center account-creation" },
                        childCount == 0 ? null : react_default.a.createElement(
                            "div",
                            null,
                            react_default.a.createElement(react_translate_component_default.a, { content: formTitle, component: "h4" })
                        ),
                        childCount == 1 ? null : react_default.a.createElement(
                            "div",
                            null,
                            react_default.a.createElement(react_translate_component_default.a, { content: "account.intro_text_title", component: "h4" }),
                            react_default.a.createElement(react_translate_component_default.a, { unsafe: true, content: "account.intro_text_1", component: "p" }),
                            react_default.a.createElement(
                                "div",
                                { className: "shrink text-center" },
                                react_default.a.createElement(
                                    "div",
                                    { className: "grp-menu-item overflow-visible account-drop-down" },
                                    react_default.a.createElement(
                                        "div",
                                        { className: "grp-menu-item overflow-visible", style: { margin: "0 auto" }, "data-intro": translator.translate("walkthrough.language_flag") },
                                        flagDropdown
                                    )
                                )
                            )
                        ),
                        !!childCount ? null : react_default.a.createElement(
                            "div",
                            { className: "grid-block account-login-options" },
                            react_default.a.createElement(
                                es["b" /* Link */],
                                { to: "/create-account/wallet", className: "button primary", "data-intro": translator.translate("walkthrough.create_cloud_wallet") },
                                react_default.a.createElement(react_translate_component_default.a, { content: "header.create_account" })
                            )
                        ),
                        !!childCount ? null : react_default.a.createElement(
                            "div",
                            { className: "additional-account-options" },
                            react_default.a.createElement(
                                "p",
                                null,
                                "Optionally, ",
                                react_default.a.createElement(
                                    es["b" /* Link */],
                                    { to: "/wallet/backup/restore", "data-intro": translator.translate("walkthrough.restore_account") },
                                    "restore your account"
                                ),
                                " or create an account using the ",
                                react_default.a.createElement(
                                    es["b" /* Link */],
                                    { to: "/create-account/wallet", "data-intro": translator.translate("walkthrough.create_local_wallet") },
                                    "advanced form"
                                ),
                                "."
                            )
                        ),
                        this.props.children
                    )
                )
            );
        }
    }]);

    return LoginSelector;
}(react_default.a.Component);

/* harmony default export */ var components_LoginSelector = __webpack_exports__["default"] = (Object(lib["connect"])(LoginSelector_LoginSelector, {
    listenTo: function listenTo() {
        return [AccountStore["a" /* default */]];
    },
    getProps: function getProps() {
        return {
            currentAccount: AccountStore["a" /* default */].getState().currentAccount || AccountStore["a" /* default */].getState().passwordAccount
        };
    }
}));

/***/ }),

/***/ 1911:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/react/react.js
var react = __webpack_require__(1);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./app/stores/AccountStore.js
var AccountStore = __webpack_require__(49);

// EXTERNAL MODULE: ./app/stores/SettingsStore.js
var SettingsStore = __webpack_require__(35);

// EXTERNAL MODULE: ./app/stores/MarketsStore.js
var MarketsStore = __webpack_require__(282);

// EXTERNAL MODULE: ./node_modules/alt-container/lib/AltContainer.js
var AltContainer = __webpack_require__(108);
var AltContainer_default = /*#__PURE__*/__webpack_require__.n(AltContainer);

// EXTERNAL MODULE: ./node_modules/react-translate-component/index.js
var react_translate_component = __webpack_require__(5);
var react_translate_component_default = /*#__PURE__*/__webpack_require__.n(react_translate_component);

// EXTERNAL MODULE: ./app/components/Utility/ChainTypes.js
var ChainTypes = __webpack_require__(33);

// EXTERNAL MODULE: ./app/components/Utility/BindToChainState.jsx
var BindToChainState = __webpack_require__(32);

// EXTERNAL MODULE: ./app/components/Utility/AssetName.jsx
var AssetName = __webpack_require__(124);

// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(28);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./app/actions/MarketsActions.js
var MarketsActions = __webpack_require__(286);

// EXTERNAL MODULE: ./node_modules/alt-react/lib/index.js
var lib = __webpack_require__(29);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// EXTERNAL MODULE: ./app/lib/common/utils.js
var utils = __webpack_require__(15);

// CONCATENATED MODULE: ./app/components/Dashboard/MarketCard.jsx
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }












var MarketCard_MarketCard = function (_React$Component) {
    _inherits(MarketCard, _React$Component);

    function MarketCard() {
        _classCallCheck(this, MarketCard);

        var _this = _possibleConstructorReturn(this, (MarketCard.__proto__ || Object.getPrototypeOf(MarketCard)).call(this));

        _this.statsInterval = null;

        _this.state = {
            imgError: false
        };
        return _this;
    }

    _createClass(MarketCard, [{
        key: "_checkStats",
        value: function _checkStats() {
            var newStats = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { close: {} };
            var oldStats = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { close: {} };

            return newStats.volumeBase !== oldStats.volumeBase || !utils["a" /* default */].are_equal_shallow(newStats.close && newStats.close.base, oldStats.close && oldStats.close.base) || !utils["a" /* default */].are_equal_shallow(newStats.close && newStats.close.quote, oldStats.close && oldStats.close.quote);
        }
    }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(np, ns) {
            return this._checkStats(np.marketStats, this.props.marketStats) || np.base.get("id") !== this.props.base.get("id") || np.quote.get("id") !== this.props.quote.get("id") || ns.imgError !== this.state.imgError;
        }
    }, {
        key: "componentWillMount",
        value: function componentWillMount() {
            MarketsActions["a" /* default */].getMarketStats.defer(this.props.quote, this.props.base);
            this.statsChecked = new Date();
            this.statsInterval = setInterval(MarketsActions["a" /* default */].getMarketStats.bind(this, this.props.quote, this.props.base), 35 * 1000);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            clearInterval(this.statsInterval);
        }
    }, {
        key: "goToMarket",
        value: function goToMarket(e) {
            e.preventDefault();
            this.context.router.push("/market/" + this.props.base.get("symbol") + "_" + this.props.quote.get("symbol"));
        }
    }, {
        key: "_onError",
        value: function _onError(imgName) {
            if (!this.state.imgError) {
                this.refs[imgName.toLowerCase()].src = "asset-symbols/bts.png";
                this.setState({
                    imgError: true
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _props = this.props,
                hide = _props.hide,
                isLowVolume = _props.isLowVolume,
                base = _props.base,
                quote = _props.quote,
                marketStats = _props.marketStats;

            if (isLowVolume || hide) return null;

            function getImageName(asset) {
                var symbol = asset.get("symbol");
                if (symbol === "OPEN.BTC" || symbol === "GDEX.BTC") return symbol;
                var imgName = asset.get("symbol").split(".");
                return imgName.length === 2 ? imgName[1] : imgName[0];
            }
            var imgName = getImageName(base);

            // let marketID = base.get("symbol") + "_" + quote.get("symbol");
            // let stats = marketStats;
            var changeClass = !marketStats ? "" : parseFloat(marketStats.change) > 0 ? "change-up" : parseFloat(marketStats.change) < 0 ? "change-down" : "";

            return react_default.a.createElement(
                "div",
                { className: classnames_default()("grid-block no-overflow fm-container", this.props.className), onClick: this.goToMarket.bind(this) },
                react_default.a.createElement(
                    "div",
                    { className: "grid-block vertical shrink" },
                    react_default.a.createElement(
                        "div",
                        { className: "v-align" },
                        react_default.a.createElement("img", { className: "align-center", ref: imgName.toLowerCase(), onError: this._onError.bind(this, imgName), style: { maxWidth: 70 }, src: "/" + "asset-symbols/" + imgName.toLowerCase() + ".png" })
                    )
                ),
                react_default.a.createElement(
                    "div",
                    { className: "grid-block vertical no-overflow" },
                    react_default.a.createElement(
                        "div",
                        { className: "fm-name" },
                        react_default.a.createElement(AssetName["a" /* default */], { dataPlace: "top", name: base.get("symbol") }),
                        " : ",
                        react_default.a.createElement(AssetName["a" /* default */], { dataPlace: "top", name: quote.get("symbol") })
                    ),
                    react_default.a.createElement(
                        "div",
                        { className: "fm-volume" },
                        react_default.a.createElement(react_translate_component_default.a, { content: "exchange.price" }),
                        ": ",
                        react_default.a.createElement(
                            "div",
                            { className: "float-right" },
                            marketStats && marketStats.price ? utils["a" /* default */].price_text(marketStats.price.toReal(), base, quote) : null
                        )
                    ),
                    react_default.a.createElement(
                        "div",
                        { className: "fm-volume" },
                        react_default.a.createElement(react_translate_component_default.a, { content: "exchange.volume" }),
                        ": ",
                        react_default.a.createElement(
                            "div",
                            { className: "float-right" },
                            !marketStats ? null : utils["a" /* default */].format_volume(marketStats.volumeBase, quote.get("precision"))
                        )
                    ),
                    react_default.a.createElement(
                        "div",
                        { className: "fm-change" },
                        react_default.a.createElement(react_translate_component_default.a, { content: "exchange.change" }),
                        ": ",
                        react_default.a.createElement(
                            "div",
                            { className: classnames_default()("float-right", changeClass) },
                            !marketStats ? null : marketStats.change,
                            "%"
                        )
                    )
                )
            );
        }
    }]);

    return MarketCard;
}(react_default.a.Component);

MarketCard_MarketCard.contextTypes = {
    router: react_default.a.PropTypes.object.isRequired
};
MarketCard_MarketCard.propTypes = {
    quote: ChainTypes["a" /* default */].ChainAsset.isRequired,
    base: ChainTypes["a" /* default */].ChainAsset.isRequired,
    invert: react_default.a.PropTypes.bool
};
MarketCard_MarketCard.defaultProps = {
    invert: true
};


MarketCard_MarketCard = Object(BindToChainState["a" /* default */])(MarketCard_MarketCard);

var MarketCard_MarketCardWrapper = function (_React$Component2) {
    _inherits(MarketCardWrapper, _React$Component2);

    function MarketCardWrapper() {
        _classCallCheck(this, MarketCardWrapper);

        return _possibleConstructorReturn(this, (MarketCardWrapper.__proto__ || Object.getPrototypeOf(MarketCardWrapper)).apply(this, arguments));
    }

    _createClass(MarketCardWrapper, [{
        key: "render",
        value: function render() {
            return react_default.a.createElement(MarketCard_MarketCard, this.props);
        }
    }]);

    return MarketCardWrapper;
}(react_default.a.Component);

/* harmony default export */ var Dashboard_MarketCard = (Object(lib["connect"])(MarketCard_MarketCardWrapper, {
    listenTo: function listenTo() {
        return [MarketsStore["a" /* default */]];
    },
    getProps: function getProps(props) {
        return {
            marketStats: MarketsStore["a" /* default */].getState().allMarketStats.get(props.marketId)
        };
    }
}));
// EXTERNAL MODULE: ./node_modules/seerjs-ws/cjs/index.js
var cjs = __webpack_require__(8);
var cjs_default = /*#__PURE__*/__webpack_require__.n(cjs);

// EXTERNAL MODULE: ./app/components/LoadingIndicator.jsx
var LoadingIndicator = __webpack_require__(107);

// EXTERNAL MODULE: ./app/components/LoginSelector.jsx + 3 modules
var LoginSelector = __webpack_require__(128);

// EXTERNAL MODULE: ./app/actions/SettingsActions.js
var SettingsActions = __webpack_require__(25);

// CONCATENATED MODULE: ./app/components/Dashboard/Dashboard.jsx
var Dashboard__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function Dashboard__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Dashboard__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Dashboard__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }












var Dashboard_Dashboard = function (_React$Component) {
    Dashboard__inherits(Dashboard, _React$Component);

    function Dashboard(props) {
        Dashboard__classCallCheck(this, Dashboard);

        var _this = Dashboard__possibleConstructorReturn(this, (Dashboard.__proto__ || Object.getPrototypeOf(Dashboard)).call(this));

        var marketsByChain = {
            "4018d784": [["USD", "BTS"], ["USD", "OPEN.BTC"], ["USD", "OPEN.USDT"], ["USD", "OPEN.ETH"], ["USD", "OPEN.DASH"], ["USD", "GOLD"], ["USD", "HERO"], ["USD", "GDEX.BTC"], ["USD", "GDEX.ETH"], ["USD", "GDEX.EOS"], ["USD", "GDEX.BTO"], ["CNY", "BTS"], ["CNY", "OPEN.BTC"], ["CNY", "USD"], ["CNY", "OPEN.ETH"], ["CNY", "YOYOW"], ["CNY", "OCT"], ["CNY", "GDEX.BTC"], ["CNY", "GDEX.ETH"], ["CNY", "GDEX.EOS"], ["CNY", "GDEX.BTO"], ["CNY", "GDEX.BTM"], ["OPEN.BTC", "BTS"], ["OPEN.BTC", "OPEN.ETH"], ["OPEN.BTC", "OPEN.DASH"], ["OPEN.BTC", "BLOCKPAY"], ["OPEN.BTC", "OPEN.DGD"], ["OPEN.BTC", "OPEN.STEEM"], ["BTS", "OPEN.ETH"], ["BTS", "OPEN.EOS"], ["BTS", "PPY"], ["BTS", "OPEN.STEEM"], ["BTS", "OBITS"], ["BTS", "RUBLE"], ["BTS", "HERO"], ["BTS", "OCT"], ["BTS", "SILVER"], ["BTS", "GOLD"], ["BTS", "BLOCKPAY"], ["BTS", "BTWTY"], ["BTS", "SMOKE"], ["BTS", "GDEX.BTC"], ["BTS", "GDEX.ETH"], ["BTS", "GDEX.EOS"], ["BTS", "GDEX.BTO"], ["KAPITAL", "OPEN.BTC"], ["USD", "OPEN.STEEM"], ["USD", "OPEN.MAID"], ["OPEN.USDT", "OPEN.BTC"], ["OPEN.BTC", "OPEN.MAID"], ["BTS", "OPEN.MAID"], ["BTS", "OPEN.HEAT"], ["BTS", "OPEN.INCENT"], ["HEMPSWEET", "OPEN.BTC"], ["KAPITAL", "BTS"]],
            "39f5e2ed": [["TEST", "PEG.FAKEUSD"], ["TEST", "BTWTY"]]
        };
        var chainID = cjs["Apis"].instance().chain_id;
        if (chainID) chainID = chainID.substr(0, 8);

        _this.state = {
            width: null,
            featuredMarkets: marketsByChain[chainID] || marketsByChain["4018d784"],
            newAssets: []
        };

        _this._setDimensions = _this._setDimensions.bind(_this);
        return _this;
    }

    Dashboard__createClass(Dashboard, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this._setDimensions();

            window.addEventListener("resize", this._setDimensions, { capture: false, passive: true });
        }
    }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState) {
            return !utils["a" /* default */].are_equal_shallow(nextState.featuredMarkets, this.state.featuredMarkets) || !utils["a" /* default */].are_equal_shallow(nextProps.lowVolumeMarkets, this.props.lowVolumeMarkets) || !utils["a" /* default */].are_equal_shallow(nextState.newAssets, this.state.newAssets) || nextProps.linkedAccounts !== this.props.linkedAccounts || nextProps.passwordAccount !== this.props.passwordAccount || nextState.width !== this.state.width || nextProps.accountsReady !== this.props.accountsReady;
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
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                linkedAccounts = _props.linkedAccounts,
                myIgnoredAccounts = _props.myIgnoredAccounts,
                accountsReady = _props.accountsReady,
                passwordAccount = _props.passwordAccount;
            var _state = this.state,
                featuredMarkets = _state.featuredMarkets,
                newAssets = _state.newAssets;


            if (passwordAccount && !linkedAccounts.has(passwordAccount)) {
                linkedAccounts = linkedAccounts.add(passwordAccount);
            }
            var names = linkedAccounts.toArray().sort();
            if (passwordAccount && names.indexOf(passwordAccount) === -1) names.push(passwordAccount);

            var accountCount = linkedAccounts.size + myIgnoredAccounts.size + (passwordAccount ? 1 : 0);

            if (!accountsReady) {
                return react_default.a.createElement(LoadingIndicator["a" /* default */], null);
            }

            var validMarkets = 0;

            var markets = featuredMarkets.map(function (pair) {
                var isLowVolume = _this2.props.lowVolumeMarkets.get(pair[1] + "_" + pair[0]) || _this2.props.lowVolumeMarkets.get(pair[0] + "_" + pair[1]);
                if (!isLowVolume) validMarkets++;
                var className = "";
                if (validMarkets > 24) {
                    return null;
                } else if (validMarkets > 15) {
                    className += " show-for-large";
                } else if (validMarkets > 6) {
                    className += " show-for-medium";
                }

                return react_default.a.createElement(Dashboard_MarketCard, {
                    key: pair[0] + "_" + pair[1],
                    marketId: pair[1] + "_" + pair[0],
                    "new": newAssets.indexOf(pair[1]) !== -1,
                    className: className,
                    quote: pair[0],
                    base: pair[1],
                    invert: pair[2],
                    isLowVolume: isLowVolume
                });
            }).filter(function (a) {
                return !!a;
            });

            if (!accountCount) {
                return react_default.a.createElement(LoginSelector["default"], null);
            }

            return react_default.a.createElement(
                "div",
                { ref: "wrapper", className: "grid-block tab-layout vertical" },
                react_default.a.createElement(
                    "div",
                    { ref: "container", className: "grid-container", style: { padding: "2rem 8px" } },
                    this.props.onlyAccounts ? null : react_default.a.createElement(
                        "div",
                        { className: "block-content-header", style: { marginBottom: 15, paddingTop: 0 } },
                        react_default.a.createElement(react_translate_component_default.a, { content: "exchange.featured" })
                    ),
                    this.props.onlyAccounts ? null : react_default.a.createElement(
                        "div",
                        { className: "grid-block small-up-1 medium-up-3 large-up-4 no-overflow fm-outer-container" },
                        markets
                    )
                )
            );
        }
    }]);

    return Dashboard;
}(react_default.a.Component);

var Dashboard_DashboardWrapper = function DashboardWrapper(props) {
    return react_default.a.createElement(Dashboard_Dashboard, props);
};

/* harmony default export */ var components_Dashboard_Dashboard = (Dashboard_DashboardWrapper = Object(lib["connect"])(Dashboard_DashboardWrapper, {
    listenTo: function listenTo() {
        return [SettingsStore["a" /* default */]];
    },
    getProps: function getProps() {
        return {
            viewSettings: SettingsStore["a" /* default */].getState().viewSettings
        };
    }
}));
// CONCATENATED MODULE: ./app/components/Dashboard/DashboardContainer.jsx
var DashboardContainer__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function DashboardContainer__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function DashboardContainer__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function DashboardContainer__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var DashboardContainer_DashboardContainer = function (_React$Component) {
    DashboardContainer__inherits(DashboardContainer, _React$Component);

    function DashboardContainer() {
        DashboardContainer__classCallCheck(this, DashboardContainer);

        return DashboardContainer__possibleConstructorReturn(this, (DashboardContainer.__proto__ || Object.getPrototypeOf(DashboardContainer)).apply(this, arguments));
    }

    DashboardContainer__createClass(DashboardContainer, [{
        key: "render",
        value: function render() {
            return react_default.a.createElement(
                AltContainer_default.a,
                {
                    stores: [AccountStore["a" /* default */], SettingsStore["a" /* default */], MarketsStore["a" /* default */]],
                    inject: {
                        linkedAccounts: function linkedAccounts() {
                            return AccountStore["a" /* default */].getState().linkedAccounts;
                        },
                        myIgnoredAccounts: function myIgnoredAccounts() {
                            return AccountStore["a" /* default */].getState().myIgnoredAccounts;
                        },
                        accountsReady: function accountsReady() {
                            return AccountStore["a" /* default */].getState().accountsLoaded && AccountStore["a" /* default */].getState().refsLoaded;
                        },
                        passwordAccount: function passwordAccount() {
                            return AccountStore["a" /* default */].getState().passwordAccount;
                        },
                        lowVolumeMarkets: function lowVolumeMarkets() {
                            return MarketsStore["a" /* default */].getState().lowVolumeMarkets;
                        },
                        currentEntry: SettingsStore["a" /* default */].getState().viewSettings.get("dashboardEntry", "accounts")
                    } },
                react_default.a.createElement(components_Dashboard_Dashboard, this.props)
            );
        }
    }]);

    return DashboardContainer;
}(react_default.a.Component);

/* harmony default export */ var Dashboard_DashboardContainer = __webpack_exports__["default"] = (DashboardContainer_DashboardContainer);

/***/ })

});
//# sourceMappingURL=4.js.map