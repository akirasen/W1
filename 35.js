webpackJsonp([35,42],{

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

/***/ 1917:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_alt_react__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_alt_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_alt_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_actions_SettingsActions__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_stores_SettingsStore__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Explorer__ = __webpack_require__(50);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }














var CommitteeMemberCard = function (_React$Component) {
    _inherits(CommitteeMemberCard, _React$Component);

    function CommitteeMemberCard() {
        _classCallCheck(this, CommitteeMemberCard);

        return _possibleConstructorReturn(this, (CommitteeMemberCard.__proto__ || Object.getPrototypeOf(CommitteeMemberCard)).apply(this, arguments));
    }

    _createClass(CommitteeMemberCard, [{
        key: "_onCardClick",
        value: function _onCardClick(e) {
            e.preventDefault();
            this.context.router.push("/account/" + this.props.committee_member.get("name"));
        }
    }, {
        key: "render",
        value: function render() {
            var committee_member_data = __WEBPACK_IMPORTED_MODULE_5_seerjs_es__["b" /* ChainStore */].getCommitteeMemberById(this.props.committee_member.get("id"));

            if (!committee_member_data) {
                return null;
            }

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "grid-content account-card", onClick: this._onCardClick.bind(this) },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "card" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "h4",
                        { className: "text-center" },
                        this.props.committee_member.get("name")
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "card-content clearfix" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "float-left" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Account_AccountImage__["a" /* default */], { account: this.props.committee_member.get("name"), size: { height: 64, width: 64 } })
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "ul",
                            { className: "balances" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "li",
                                null,
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_translate_component___default.a, { content: "account.votes.votes" }),
                                ": ",
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__Utility_FormattedAsset__["a" /* default */], { decimalOffset: 5, amount: committee_member_data.get("total_votes"), asset: "1.3.0" })
                            )
                        )
                    )
                )
            );
        }
    }]);

    return CommitteeMemberCard;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

CommitteeMemberCard.propTypes = {
    committee_member: __WEBPACK_IMPORTED_MODULE_3__Utility_ChainTypes__["a" /* default */].ChainAccount.isRequired
};
CommitteeMemberCard.contextTypes = {
    router: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.object.isRequired
};

CommitteeMemberCard = Object(__WEBPACK_IMPORTED_MODULE_4__Utility_BindToChainState__["a" /* default */])(CommitteeMemberCard, { keep_updating: true });

var CommitteeMemberRow = function (_React$Component2) {
    _inherits(CommitteeMemberRow, _React$Component2);

    function CommitteeMemberRow() {
        _classCallCheck(this, CommitteeMemberRow);

        return _possibleConstructorReturn(this, (CommitteeMemberRow.__proto__ || Object.getPrototypeOf(CommitteeMemberRow)).apply(this, arguments));
    }

    _createClass(CommitteeMemberRow, [{
        key: "_onRowClick",
        value: function _onRowClick(e) {
            e.preventDefault();
            this.context.router.push("/account/" + this.props.committee_member.get("name"));
        }
    }, {
        key: "render",
        value: function render() {
            var _props = this.props,
                committee_member = _props.committee_member,
                rank = _props.rank;

            var committee_member_data = __WEBPACK_IMPORTED_MODULE_5_seerjs_es__["b" /* ChainStore */].getCommitteeMemberById(committee_member.get("id"));
            if (!committee_member_data) return null;

            var url = committee_member_data.get("url");
            url = url && url.length > 0 && url.indexOf("http") === -1 ? "http://" + url : url;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "tr",
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "td",
                    { onClick: this._onRowClick.bind(this) },
                    rank
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "td",
                    { onClick: this._onRowClick.bind(this) },
                    committee_member.get("name")
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "td",
                    { onClick: this._onRowClick.bind(this) },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__Utility_FormattedAsset__["a" /* default */], { amount: committee_member_data.get("total_votes"), asset: "1.3.0" })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "td",
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "a",
                        { href: url, rel: "noopener noreferrer", target: "_blank" },
                        committee_member_data.get("url")
                    )
                )
            );
        }
    }]);

    return CommitteeMemberRow;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

CommitteeMemberRow.propTypes = {
    committee_member: __WEBPACK_IMPORTED_MODULE_3__Utility_ChainTypes__["a" /* default */].ChainAccount.isRequired
};
CommitteeMemberRow.contextTypes = {
    router: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.object.isRequired
};

CommitteeMemberRow = Object(__WEBPACK_IMPORTED_MODULE_4__Utility_BindToChainState__["a" /* default */])(CommitteeMemberRow, { keep_updating: true });

var CommitteeMemberList = function (_React$Component3) {
    _inherits(CommitteeMemberList, _React$Component3);

    function CommitteeMemberList() {
        _classCallCheck(this, CommitteeMemberList);

        var _this3 = _possibleConstructorReturn(this, (CommitteeMemberList.__proto__ || Object.getPrototypeOf(CommitteeMemberList)).call(this));

        _this3.state = {
            sortBy: 'rank',
            inverseSort: true
        };
        return _this3;
    }

    _createClass(CommitteeMemberList, [{
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
                committee_members = _props2.committee_members,
                cardView = _props2.cardView,
                membersList = _props2.membersList;
            var _state = this.state,
                sortBy = _state.sortBy,
                inverseSort = _state.inverseSort;


            var itemRows = null;

            var ranks = {};

            committee_members.filter(function (a) {
                if (!a) {
                    return false;
                }
                return membersList.indexOf(a.get("id")) !== -1;
            }).sort(function (a, b) {
                if (a && b) {
                    return parseInt(b.get("total_votes"), 10) - parseInt(a.get("total_votes"), 10);
                }
            }).forEach(function (c, index) {
                if (c) {
                    ranks[c.get("id")] = index + 1;
                }
            });

            if (committee_members.length > 0 && committee_members[1]) {
                itemRows = committee_members.filter(function (a) {
                    if (!a) {
                        return false;
                    }
                    var account = __WEBPACK_IMPORTED_MODULE_5_seerjs_es__["b" /* ChainStore */].getObject(a.get("committee_member_account"));
                    if (!account) {
                        return false;
                    }

                    return account.get("name").indexOf(_this4.props.filter) !== -1;
                }).sort(function (a, b) {
                    var a_account = __WEBPACK_IMPORTED_MODULE_5_seerjs_es__["b" /* ChainStore */].getObject(a.get("committee_member_account"));
                    var b_account = __WEBPACK_IMPORTED_MODULE_5_seerjs_es__["b" /* ChainStore */].getObject(b.get("committee_member_account"));
                    if (!a_account || !b_account) {
                        return 0;
                    }

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
                        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(CommitteeMemberRow, { key: a.get("id"), rank: ranks[a.get("id")], committee_member: a.get("committee_member_account") });
                    } else {
                        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(CommitteeMemberCard, { key: a.get("id"), rank: ranks[a.get("id")], committee_member: a.get("committee_member_account") });
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
                                { className: "clickable", onClick: this._setSort.bind(this, 'total_votes') },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_translate_component___default.a, { content: "account.votes.votes" })
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "th",
                                null,
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_translate_component___default.a, { content: "account.votes.url" })
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
                    { className: "grid-block no-margin small-up-1 medium-up-2 large-up-3" },
                    itemRows
                );
            }
        }
    }]);

    return CommitteeMemberList;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

CommitteeMemberList.propTypes = {
    committee_members: __WEBPACK_IMPORTED_MODULE_3__Utility_ChainTypes__["a" /* default */].ChainObjectsList.isRequired
};

CommitteeMemberList = Object(__WEBPACK_IMPORTED_MODULE_4__Utility_BindToChainState__["a" /* default */])(CommitteeMemberList, { keep_updating: true, show_loader: true });

var CommitteeMembers = function (_React$Component4) {
    _inherits(CommitteeMembers, _React$Component4);

    function CommitteeMembers(props) {
        _classCallCheck(this, CommitteeMembers);

        var _this5 = _possibleConstructorReturn(this, (CommitteeMembers.__proto__ || Object.getPrototypeOf(CommitteeMembers)).call(this, props));

        _this5.state = {
            filterCommitteeMember: props.filterCommitteeMember || "",
            cardView: props.cardView
        };
        return _this5;
    }

    _createClass(CommitteeMembers, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState) {
            return !__WEBPACK_IMPORTED_MODULE_1_immutable___default.a.is(nextProps.globalObject, this.props.globalObject) || nextState.filterCommitteeMember !== this.state.filterCommitteeMember || nextState.cardView !== this.state.cardView;
        }
    }, {
        key: "_onFilter",
        value: function _onFilter(e) {
            e.preventDefault();
            this.setState({ filterCommitteeMember: e.target.value.toLowerCase() });

            __WEBPACK_IMPORTED_MODULE_9_actions_SettingsActions__["a" /* default */].changeViewSetting({
                filterCommitteeMember: e.target.value.toLowerCase()
            });
        }
    }, {
        key: "_toggleView",
        value: function _toggleView() {
            __WEBPACK_IMPORTED_MODULE_9_actions_SettingsActions__["a" /* default */].changeViewSetting({
                cardViewCommittee: !this.state.cardView
            });

            this.setState({
                cardView: !this.state.cardView
            });
        }
    }, {
        key: "render",
        value: function render() {
            var globalObject = this.props.globalObject;

            globalObject = globalObject.toJS();

            var activeCommitteeMembers = [];
            for (var key in globalObject.active_committee_members) {
                if (globalObject.active_committee_members.hasOwnProperty(key)) {
                    activeCommitteeMembers.push(globalObject.active_committee_members[key]);
                }
            }

            var content = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "grid-block" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "grid-block vertical medium-horizontal" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "grid-block shrink" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "grid-content" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "h5",
                                null,
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_translate_component___default.a, { content: "explorer.committee_members.active" }),
                                ": ",
                                Object.keys(globalObject.active_committee_members).length
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { className: "view-switcher" },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "span",
                                    { className: "button outline", onClick: this._toggleView.bind(this) },
                                    !this.state.cardView ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_translate_component___default.a, { content: "explorer.witnesses.card" }) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_translate_component___default.a, { content: "explorer.witnesses.table" })
                                )
                            )
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "grid-block vertical" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "grid-block vertical shrink" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_translate_component___default.a, { component: "h3", content: "markets.filter" }),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "text", value: this.state.filterCommitteeMember, onChange: this._onFilter.bind(this) })
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "grid-content" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(CommitteeMemberList, {
                                committee_members: __WEBPACK_IMPORTED_MODULE_1_immutable___default.a.List(globalObject.active_committee_members),
                                membersList: globalObject.active_committee_members,
                                filter: this.state.filterCommitteeMember,
                                cardView: this.state.cardView
                            })
                        )
                    )
                )
            );

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11__Explorer__["default"], { tab: "committee_members", content: content });
        }
    }]);

    return CommitteeMembers;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

CommitteeMembers.propTypes = {
    globalObject: __WEBPACK_IMPORTED_MODULE_3__Utility_ChainTypes__["a" /* default */].ChainObject.isRequired
};
CommitteeMembers.defaultProps = {
    globalObject: "2.0.0"
};

CommitteeMembers = Object(__WEBPACK_IMPORTED_MODULE_4__Utility_BindToChainState__["a" /* default */])(CommitteeMembers, { keep_updating: true });

var CommitteeMembersStoreWrapper = function (_React$Component5) {
    _inherits(CommitteeMembersStoreWrapper, _React$Component5);

    function CommitteeMembersStoreWrapper() {
        _classCallCheck(this, CommitteeMembersStoreWrapper);

        return _possibleConstructorReturn(this, (CommitteeMembersStoreWrapper.__proto__ || Object.getPrototypeOf(CommitteeMembersStoreWrapper)).apply(this, arguments));
    }

    _createClass(CommitteeMembersStoreWrapper, [{
        key: "render",
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(CommitteeMembers, this.props);
        }
    }]);

    return CommitteeMembersStoreWrapper;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

CommitteeMembersStoreWrapper = Object(__WEBPACK_IMPORTED_MODULE_8_alt_react__["connect"])(CommitteeMembersStoreWrapper, {
    listenTo: function listenTo() {
        return [__WEBPACK_IMPORTED_MODULE_10_stores_SettingsStore__["a" /* default */]];
    },
    getProps: function getProps() {
        return {
            cardView: __WEBPACK_IMPORTED_MODULE_10_stores_SettingsStore__["a" /* default */].getState().viewSettings.get("cardViewCommittee"),
            filterCommitteeMember: __WEBPACK_IMPORTED_MODULE_10_stores_SettingsStore__["a" /* default */].getState().viewSettings.get("filterCommitteeMember")
        };
    }
});

/* harmony default export */ __webpack_exports__["default"] = (CommitteeMembersStoreWrapper);

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
//# sourceMappingURL=35.js.map