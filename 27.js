webpackJsonp([27],{

/***/ 1794:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(1795),
    CopyToClipboard = _require.CopyToClipboard;

CopyToClipboard.CopyToClipboard = CopyToClipboard;
module.exports = CopyToClipboard;

/***/ }),

/***/ 1795:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CopyToClipboard = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _copyToClipboard = __webpack_require__(1796);

var _copyToClipboard2 = _interopRequireDefault(_copyToClipboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CopyToClipboard = exports.CopyToClipboard = function (_React$PureComponent) {
  _inherits(CopyToClipboard, _React$PureComponent);

  function CopyToClipboard() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CopyToClipboard);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CopyToClipboard.__proto__ || Object.getPrototypeOf(CopyToClipboard)).call.apply(_ref, [this].concat(args))), _this), _this.onClick = function (event) {
      var _this$props = _this.props,
          text = _this$props.text,
          onCopy = _this$props.onCopy,
          children = _this$props.children,
          options = _this$props.options;


      var elem = _react2.default.Children.only(children);

      var result = (0, _copyToClipboard2.default)(text, options);

      if (onCopy) {
        onCopy(text, result);
      }

      // Bypass onClick if it was present
      if (elem && elem.props && typeof elem.props.onClick === 'function') {
        elem.props.onClick(event);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CopyToClipboard, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _text = _props.text,
          _onCopy = _props.onCopy,
          _options = _props.options,
          children = _props.children,
          props = _objectWithoutProperties(_props, ['text', 'onCopy', 'options', 'children']);

      var elem = _react2.default.Children.only(children);

      return _react2.default.cloneElement(elem, _extends({}, props, { onClick: this.onClick }));
    }
  }]);

  return CopyToClipboard;
}(_react2.default.PureComponent);

CopyToClipboard.defaultProps = {
  onCopy: undefined,
  options: undefined
};

/***/ }),

/***/ 1796:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var deselectCurrent = __webpack_require__(1797);

var defaultMessage = "Copy to clipboard: #{key}, Enter";

function format(message) {
  var copyKey = (/mac os x/i.test(navigator.userAgent) ? "⌘" : "Ctrl") + "+C";
  return message.replace(/#{\s*key\s*}/g, copyKey);
}

function copy(text, options) {
  var debug,
    message,
    reselectPrevious,
    range,
    selection,
    mark,
    success = false;
  if (!options) {
    options = {};
  }
  debug = options.debug || false;
  try {
    reselectPrevious = deselectCurrent();

    range = document.createRange();
    selection = document.getSelection();

    mark = document.createElement("span");
    mark.textContent = text;
    // reset user styles for span element
    mark.style.all = "unset";
    // prevents scrolling to the end of the page
    mark.style.position = "fixed";
    mark.style.top = 0;
    mark.style.clip = "rect(0, 0, 0, 0)";
    // used to preserve spaces and line breaks
    mark.style.whiteSpace = "pre";
    // do not inherit user-select (it may be `none`)
    mark.style.webkitUserSelect = "text";
    mark.style.MozUserSelect = "text";
    mark.style.msUserSelect = "text";
    mark.style.userSelect = "text";
    mark.addEventListener("copy", function(e) {
      e.stopPropagation();
      if (options.format) {
        e.preventDefault();
        e.clipboardData.clearData();
        e.clipboardData.setData(options.format, text);
      }
    });

    document.body.appendChild(mark);

    range.selectNodeContents(mark);
    selection.addRange(range);

    var successful = document.execCommand("copy");
    if (!successful) {
      throw new Error("copy command was unsuccessful");
    }
    success = true;
  } catch (err) {
    debug && console.error("unable to copy using execCommand: ", err);
    debug && console.warn("trying IE specific stuff");
    try {
      window.clipboardData.setData(options.format || "text", text);
      success = true;
    } catch (err) {
      debug && console.error("unable to copy using clipboardData: ", err);
      debug && console.error("falling back to prompt");
      message = format("message" in options ? options.message : defaultMessage);
      window.prompt(message, text);
    }
  } finally {
    if (selection) {
      if (typeof selection.removeRange == "function") {
        selection.removeRange(range);
      } else {
        selection.removeAllRanges();
      }
    }

    if (mark) {
      document.body.removeChild(mark);
    }
    reselectPrevious();
  }

  return success;
}

module.exports = copy;


/***/ }),

/***/ 1797:
/***/ (function(module, exports) {


module.exports = function () {
  var selection = document.getSelection();
  if (!selection.rangeCount) {
    return function () {};
  }
  var active = document.activeElement;

  var ranges = [];
  for (var i = 0; i < selection.rangeCount; i++) {
    ranges.push(selection.getRangeAt(i));
  }

  switch (active.tagName.toUpperCase()) { // .toUpperCase handles XHTML
    case 'INPUT':
    case 'TEXTAREA':
      active.blur();
      break;

    default:
      active = null;
      break;
  }

  selection.removeAllRanges();
  return function () {
    selection.type === 'Caret' &&
    selection.removeAllRanges();

    if (!selection.rangeCount) {
      ranges.forEach(function(range) {
        selection.addRange(range);
      });
    }

    active &&
    active.focus();
  };
};


/***/ }),

/***/ 1937:
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

// EXTERNAL MODULE: ./node_modules/seerjs/es/index.js + 7 modules
var seerjs_es = __webpack_require__(6);

// EXTERNAL MODULE: ./app/components/Utility/ChainTypes.js
var ChainTypes = __webpack_require__(33);

// EXTERNAL MODULE: ./app/components/Utility/BindToChainState.jsx
var BindToChainState = __webpack_require__(32);

// EXTERNAL MODULE: ./app/components/Utility/FormattedAsset.jsx
var FormattedAsset = __webpack_require__(68);

// CONCATENATED MODULE: ./app/components/Account/Statistics.jsx
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var Statistics_Statistics = function (_React$Component) {
    _inherits(Statistics, _React$Component);

    function Statistics() {
        _classCallCheck(this, Statistics);

        return _possibleConstructorReturn(this, (Statistics.__proto__ || Object.getPrototypeOf(Statistics)).apply(this, arguments));
    }

    _createClass(Statistics, [{
        key: "render",
        value: function render() {
            var stat_object = this.props.stat_object.toJS();
            return react_default.a.createElement(
                "tbody",
                null,
                react_default.a.createElement(
                    "tr",
                    null,
                    react_default.a.createElement(
                        "td",
                        null,
                        react_default.a.createElement(react_translate_component_default.a, { content: "account.member.fees_paid" }),
                        " "
                    ),
                    react_default.a.createElement(
                        "td",
                        null,
                        react_default.a.createElement(FormattedAsset["a" /* default */], { amount: parseFloat(stat_object.lifetime_fees_paid), asset: "1.3.0" })
                    )
                )
            );
        }
    }]);

    return Statistics;
}(react_default.a.Component);

Statistics_Statistics.propTypes = {
    stat_object: ChainTypes["a" /* default */].ChainObject.isRequired
};


/* harmony default export */ var Account_Statistics = (Object(BindToChainState["a" /* default */])(Statistics_Statistics, { keep_updating: true }));
// EXTERNAL MODULE: ./app/actions/AccountActions.js + 1 modules
var AccountActions = __webpack_require__(89);

// EXTERNAL MODULE: ./app/components/Utility/TimeAgo.jsx
var TimeAgo = __webpack_require__(694);

// EXTERNAL MODULE: ./app/components/Utility/HelpContent.jsx
var HelpContent = __webpack_require__(691);

// EXTERNAL MODULE: ./app/lib/common/account_utils.js
var account_utils = __webpack_require__(189);

// EXTERNAL MODULE: ./node_modules/react-copy-to-clipboard/lib/index.js
var lib = __webpack_require__(1794);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// CONCATENATED MODULE: ./app/components/Account/AccountMembership.jsx
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var AccountMembership__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function AccountMembership__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function AccountMembership__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function AccountMembership__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }














var AccountMembership_FeeHelp = function (_React$Component) {
    AccountMembership__inherits(FeeHelp, _React$Component);

    function FeeHelp() {
        AccountMembership__classCallCheck(this, FeeHelp);

        return AccountMembership__possibleConstructorReturn(this, (FeeHelp.__proto__ || Object.getPrototypeOf(FeeHelp)).apply(this, arguments));
    }

    AccountMembership__createClass(FeeHelp, [{
        key: "render",
        value: function render() {
            var dprops = this.props.dprops;


            return react_default.a.createElement(HelpContent["a" /* default */], _extends({}, this.props, {
                path: "components/AccountMembership",
                section: "fee-division",
                nextMaintenanceTime: { time: dprops.get("next_maintenance_time") }
            }));
        }
    }]);

    return FeeHelp;
}(react_default.a.Component);

AccountMembership_FeeHelp.propTypes = {
    dprops: ChainTypes["a" /* default */].ChainObject.isRequired
};
AccountMembership_FeeHelp.defaultProps = {
    dprops: "2.1.0"
};

AccountMembership_FeeHelp = Object(BindToChainState["a" /* default */])(AccountMembership_FeeHelp);

var AccountMembership_AccountMembership = function (_React$Component2) {
    AccountMembership__inherits(AccountMembership, _React$Component2);

    function AccountMembership() {
        AccountMembership__classCallCheck(this, AccountMembership);

        return AccountMembership__possibleConstructorReturn(this, (AccountMembership.__proto__ || Object.getPrototypeOf(AccountMembership)).apply(this, arguments));
    }

    AccountMembership__createClass(AccountMembership, [{
        key: "upgradeAccount",
        value: function upgradeAccount(id, lifetime, e) {
            e.preventDefault();
            AccountActions["a" /* default */].upgradeAccount(id, lifetime);
        }
    }, {
        key: "componentWillMount",
        value: function componentWillMount() {
            account_utils["a" /* default */].getFinalFeeAsset(this.props.account, "account_upgrade");
        }
    }, {
        key: "render",
        value: function render() {
            var _props = this.props,
                gprops = _props.gprops,
                core_asset = _props.core_asset;


            var account = this.props.account.toJS();

            var ltr = seerjs_es["b" /* ChainStore */].getAccount(account.lifetime_referrer, false);
            if (ltr) account.lifetime_referrer_name = ltr.get("name");
            var ref = seerjs_es["b" /* ChainStore */].getAccount(account.referrer, false);
            if (ref) account.referrer_name = ref.get("name");
            var reg = seerjs_es["b" /* ChainStore */].getAccount(account.registrar, false);
            if (reg) account.registrar_name = reg.get("name");

            var account_name = account.name;

            var network_fee = account.network_fee_percentage / 100;
            var lifetime_fee = account.lifetime_referrer_fee_percentage / 100;
            var referrer_total_fee = 100 - network_fee - lifetime_fee;
            var referrer_fee = referrer_total_fee * account.referrer_rewards_percentage / 10000;
            var registrar_fee = 100 - referrer_fee - lifetime_fee - network_fee;

            var lifetime_cost = gprops.getIn(["parameters", "current_fees", "parameters", 8, 1, "membership_lifetime_fee"]) * gprops.getIn(["parameters", "current_fees", "scale"]) / 10000;

            var member_status = seerjs_es["b" /* ChainStore */].getAccountMemberStatus(this.props.account);
            var membership = "account.member." + member_status;
            var expiration = null;
            if (member_status === "annual") expiration = react_default.a.createElement(
                "span",
                null,
                "(",
                react_default.a.createElement(react_translate_component_default.a, { content: "account.member.expires" }),
                " ",
                react_default.a.createElement(TimeAgo["a" /* default */], { time: account.membership_expiration_date }),
                ")"
            );
            var expiration_date = account.membership_expiration_date;
            if (expiration_date === "1969-12-31T23:59:59") expiration_date = "Never";else if (expiration_date === "1970-01-01T00:00:00") expiration_date = "N/A";

            var className = member_status === "lifetime" ? "lifetime" : "";

            return react_default.a.createElement(
                "div",
                { className: "grid-content app-tables no-padding", ref: "appTables" },
                react_default.a.createElement(
                    "div",
                    { className: "content-block small-12 member " + className, style: { marginTop: "48px" } },
                    react_default.a.createElement(
                        "h3",
                        { className: "member-title" },
                        react_default.a.createElement(
                            "svg",
                            { className: "icon", "aria-hidden": "true", style: { width: "50px", height: "39.12px", marginRight: "14px" } },
                            react_default.a.createElement("use", { xlinkHref: member_status === "lifetime" ? "#icon-tubiao-huiyuan-lifttime" : "#icon-tubiao-huiyuan" })
                        ),
                        react_default.a.createElement(react_translate_component_default.a, { content: membership }),
                        " ",
                        expiration
                    ),
                    member_status === "lifetime" ? react_default.a.createElement(
                        "div",
                        null,
                        react_default.a.createElement(
                            "h4",
                            { style: { fontSize: "18px", color: "#333", fontWeight: "bold", marginTop: "54px" } },
                            react_default.a.createElement(react_translate_component_default.a, { content: "account.member.referral_link" })
                        ),
                        react_default.a.createElement(
                            "div",
                            { style: { display: "flex", alignItems: "center", marginBottom: "1rem" } },
                            react_default.a.createElement("input", { id: "copy-link", type: "text", value: "https://www.seer.best/?r=" + account.name, style: { width: "37.5em", color: "#666", margin: "0 1rem 0 0" } }),
                            react_default.a.createElement(
                                lib["CopyToClipboard"],
                                { text: "https://www.seer.best/?r=" + account.name },
                                react_default.a.createElement(react_translate_component_default.a, { content: "account.member.copy_link", style: { fontSize: "14px", color: "#449E7B", cursor: "pointer" } })
                            )
                        ),
                        react_default.a.createElement(react_translate_component_default.a, { content: "account.member.referral_text", style: { fontSize: "14px", color: "#666" } })
                    ) : react_default.a.createElement(
                        "div",
                        null,
                        react_default.a.createElement(HelpContent["a" /* default */], { path: "components/AccountMembership", section: "lifetime", feesCashback: 100 - network_fee, price: { amount: lifetime_cost, asset: core_asset } }),
                        react_default.a.createElement(
                            "button",
                            { onClick: this.upgradeAccount.bind(this, account.id, true), className: "button primary", style: { marginTop: "16px" } },
                            react_default.a.createElement(react_translate_component_default.a, { content: "account.member.upgrade_lifetime" })
                        ),
                        "\xA0 \xA0",
                         true ? null : React.createElement(
                            "button",
                            { onClick: this.upgradeAccount.bind(this, account.id, false), className: "button primary", style: { marginTop: "16px" } },
                            React.createElement(Translate, { content: "account.member.subscribe" })
                        )
                    ),
                    react_default.a.createElement(
                        "div",
                        { className: "content-block no-margin", style: { padding: "75px 0 0 0" } },
                        react_default.a.createElement(
                            "div",
                            { className: "no-margin grid-block vertical large-horizontal" },
                            react_default.a.createElement(
                                "div",
                                { className: "no-margin grid-block large-6" },
                                react_default.a.createElement(
                                    "div",
                                    { className: "grid-content", style: { padding: "0 15px 0 0" } },
                                    react_default.a.createElement(
                                        "h5",
                                        { className: "table-title" },
                                        react_default.a.createElement(react_translate_component_default.a, { content: "account.member.fee_allocation" })
                                    ),
                                    react_default.a.createElement(
                                        "table",
                                        { className: "table key-value-table" },
                                        react_default.a.createElement(
                                            "tbody",
                                            null,
                                            react_default.a.createElement(
                                                "tr",
                                                null,
                                                react_default.a.createElement(
                                                    "td",
                                                    null,
                                                    react_default.a.createElement(react_translate_component_default.a, { content: "account.member.network_percentage" })
                                                ),
                                                react_default.a.createElement(
                                                    "td",
                                                    null,
                                                    network_fee,
                                                    "%"
                                                )
                                            ),
                                            react_default.a.createElement(
                                                "tr",
                                                null,
                                                react_default.a.createElement(
                                                    "td",
                                                    null,
                                                    react_default.a.createElement(react_translate_component_default.a, { content: "account.member.lifetime_referrer" }),
                                                    "  \xA0 (",
                                                    react_default.a.createElement(
                                                        es["b" /* Link */],
                                                        { to: "account/" + account.lifetime_referrer_name + "/overview" },
                                                        account.lifetime_referrer_name
                                                    ),
                                                    ")"
                                                ),
                                                react_default.a.createElement(
                                                    "td",
                                                    null,
                                                    lifetime_fee,
                                                    "%"
                                                )
                                            ),
                                            react_default.a.createElement(
                                                "tr",
                                                null,
                                                react_default.a.createElement(
                                                    "td",
                                                    null,
                                                    react_default.a.createElement(react_translate_component_default.a, { content: "account.member.registrar" }),
                                                    "  \xA0 (",
                                                    react_default.a.createElement(
                                                        es["b" /* Link */],
                                                        { to: "account/" + account.registrar_name + "/overview" },
                                                        account.registrar_name
                                                    ),
                                                    ")"
                                                ),
                                                react_default.a.createElement(
                                                    "td",
                                                    null,
                                                    registrar_fee,
                                                    "%"
                                                )
                                            ),
                                            react_default.a.createElement(
                                                "tr",
                                                null,
                                                react_default.a.createElement(
                                                    "td",
                                                    null,
                                                    react_default.a.createElement(react_translate_component_default.a, { content: "account.member.referrer" }),
                                                    "  \xA0 (",
                                                    react_default.a.createElement(
                                                        es["b" /* Link */],
                                                        { to: "account/" + account.referrer_name + "/overview" },
                                                        account.referrer_name
                                                    ),
                                                    ")"
                                                ),
                                                react_default.a.createElement(
                                                    "td",
                                                    null,
                                                    referrer_fee,
                                                    "%"
                                                )
                                            ),
                                            react_default.a.createElement(
                                                "tr",
                                                null,
                                                react_default.a.createElement(
                                                    "td",
                                                    null,
                                                    react_default.a.createElement(react_translate_component_default.a, { content: "account.member.membership_expiration" }),
                                                    " "
                                                ),
                                                react_default.a.createElement(
                                                    "td",
                                                    null,
                                                    expiration_date
                                                )
                                            )
                                        )
                                    )
                                )
                            ),
                            react_default.a.createElement(
                                "div",
                                { className: "no-margin grid-block large-6" },
                                react_default.a.createElement(
                                    "div",
                                    { className: "grid-content", style: { padding: "0 0 0 15px" } },
                                    react_default.a.createElement(
                                        "h5",
                                        { className: "table-title" },
                                        react_default.a.createElement(react_translate_component_default.a, { content: "account.member.fees_cashback" })
                                    ),
                                    react_default.a.createElement(
                                        "table",
                                        { className: "table key-value-table" },
                                        react_default.a.createElement(Account_Statistics, { stat_object: account.statistics })
                                    )
                                )
                            )
                        )
                    ),
                    react_default.a.createElement(
                        "div",
                        { className: "fee-help" },
                        react_default.a.createElement(AccountMembership_FeeHelp, {
                            account: account_name,
                            networkFee: network_fee,
                            referrerFee: referrer_fee,
                            registrarFee: registrar_fee,
                            lifetimeFee: lifetime_fee,
                            referrerTotalFee: referrer_total_fee,
                            maintenanceInterval: gprops.getIn(["parameters", "maintenance_interval"]),
                            vestingThreshold: { amount: gprops.getIn(["parameters", "cashback_vesting_threshold"]), asset: core_asset },
                            vestingPeriod: gprops.getIn(["parameters", "cashback_vesting_period_seconds"]) / 60 / 60 / 24
                        })
                    )
                )
            );
        }
    }]);

    return AccountMembership;
}(react_default.a.Component);

AccountMembership_AccountMembership.propTypes = {
    account: ChainTypes["a" /* default */].ChainAccount.isRequired,
    gprops: ChainTypes["a" /* default */].ChainObject.isRequired,
    core_asset: ChainTypes["a" /* default */].ChainAsset.isRequired
};
AccountMembership_AccountMembership.defaultProps = {
    gprops: "2.0.0",
    core_asset: "1.3.0"
};

AccountMembership_AccountMembership = Object(BindToChainState["a" /* default */])(AccountMembership_AccountMembership);

/* harmony default export */ var Account_AccountMembership = __webpack_exports__["default"] = (AccountMembership_AccountMembership);

/***/ })

});
//# sourceMappingURL=27.js.map