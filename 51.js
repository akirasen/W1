webpackJsonp([51],{

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

/***/ })

});
//# sourceMappingURL=51.js.map