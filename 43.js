webpackJsonp([43],{

/***/ 1655:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Utility_ChainTypes__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Utility_BindToChainState__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__LinkToAccountById__ = __webpack_require__(147);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var LinkToWitnessById = function (_React$Component) {
    _inherits(LinkToWitnessById, _React$Component);

    function LinkToWitnessById() {
        _classCallCheck(this, LinkToWitnessById);

        return _possibleConstructorReturn(this, (LinkToWitnessById.__proto__ || Object.getPrototypeOf(LinkToWitnessById)).apply(this, arguments));
    }

    _createClass(LinkToWitnessById, [{
        key: "render",
        value: function render() {
            var witness_account = this.props.witness.get("witness_account");
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__LinkToAccountById__["a" /* default */], { account: witness_account });
        }
    }]);

    return LinkToWitnessById;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

LinkToWitnessById.propTypes = {
    witness: __WEBPACK_IMPORTED_MODULE_1__Utility_ChainTypes__["a" /* default */].ChainObject.isRequired
};

LinkToWitnessById = Object(__WEBPACK_IMPORTED_MODULE_2__Utility_BindToChainState__["a" /* default */])(LinkToWitnessById);

/* harmony default export */ __webpack_exports__["a"] = (LinkToWitnessById);

/***/ }),

/***/ 1928:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/react/react.js
var react = __webpack_require__(1);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./app/stores/BlockchainStore.js
var BlockchainStore = __webpack_require__(294);

// EXTERNAL MODULE: ./node_modules/alt-container/lib/AltContainer.js
var AltContainer = __webpack_require__(108);
var AltContainer_default = /*#__PURE__*/__webpack_require__.n(AltContainer);

// EXTERNAL MODULE: ./node_modules/react-intl/lib/index.es.js + 1 modules
var index_es = __webpack_require__(83);

// EXTERNAL MODULE: ./node_modules/immutable/dist/immutable.js
var immutable = __webpack_require__(20);
var immutable_default = /*#__PURE__*/__webpack_require__.n(immutable);

// EXTERNAL MODULE: ./app/actions/BlockchainActions.js
var BlockchainActions = __webpack_require__(700);

// EXTERNAL MODULE: ./app/components/Blockchain/Transaction.jsx
var Transaction = __webpack_require__(711);

// EXTERNAL MODULE: ./node_modules/react-translate-component/index.js
var react_translate_component = __webpack_require__(5);
var react_translate_component_default = /*#__PURE__*/__webpack_require__.n(react_translate_component);

// EXTERNAL MODULE: ./app/components/Utility/ChainTypes.js
var ChainTypes = __webpack_require__(33);

// EXTERNAL MODULE: ./app/components/Utility/BindToChainState.jsx
var BindToChainState = __webpack_require__(32);

// EXTERNAL MODULE: ./app/components/Utility/LinkToWitnessById.jsx
var LinkToWitnessById = __webpack_require__(1655);

// CONCATENATED MODULE: ./app/components/Blockchain/Block.jsx
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }












var Block_TransactionList = function (_React$Component) {
    _inherits(TransactionList, _React$Component);

    function TransactionList() {
        _classCallCheck(this, TransactionList);

        return _possibleConstructorReturn(this, (TransactionList.__proto__ || Object.getPrototypeOf(TransactionList)).apply(this, arguments));
    }

    _createClass(TransactionList, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps) {
            return nextProps.block.id !== this.props.block.id;
        }
    }, {
        key: "render",
        value: function render() {
            var block = this.props.block;

            var transactions = null;

            transactions = [];

            if (block.transactions.length > 0) {
                transactions = [];

                block.transactions.forEach(function (trx, index) {
                    transactions.push(react_default.a.createElement(Transaction["a" /* default */], {
                        key: index,
                        trx: trx,
                        index: index
                    }));
                });
            }

            return react_default.a.createElement(
                "div",
                null,
                transactions
            );
        }
    }]);

    return TransactionList;
}(react_default.a.Component);

var Block_Block = function (_React$Component2) {
    _inherits(Block, _React$Component2);

    function Block(props) {
        _classCallCheck(this, Block);

        var _this2 = _possibleConstructorReturn(this, (Block.__proto__ || Object.getPrototypeOf(Block)).call(this, props));

        _this2.state = {
            showInput: false
        };
        return _this2;
    }

    _createClass(Block, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this._getBlock(this.props.height);
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(np) {
            if (np.height !== this.props.height) {
                this._getBlock(np.height);
            }
        }
    }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(np, ns) {
            return !immutable_default.a.is(np.blocks, this.props.blocks) || np.height !== this.props.height || np.dynGlobalObject !== this.props.dynGlobalObject || ns.showInput !== this.state.showInput;
        }
    }, {
        key: "_getBlock",
        value: function _getBlock(height) {
            if (height) {
                height = parseInt(height, 10);
                if (!this.props.blocks.get(height)) {
                    BlockchainActions["a" /* default */].getBlock(height);
                }
            }
        }
    }, {
        key: "_nextBlock",
        value: function _nextBlock() {
            var height = this.props.params.height;
            var nextBlock = Math.min(this.props.dynGlobalObject.get("head_block_number"), parseInt(height, 10) + 1);
            this.props.router.push("/block/" + nextBlock);
        }
    }, {
        key: "_previousBlock",
        value: function _previousBlock() {
            var height = this.props.params.height;
            var previousBlock = Math.max(1, parseInt(height, 10) - 1);
            this.props.router.push("/block/" + previousBlock);
        }
    }, {
        key: "toggleInput",
        value: function toggleInput(e) {
            e.preventDefault();
            this.setState({ showInput: true });
        }
    }, {
        key: "_onKeyDown",
        value: function _onKeyDown(e) {
            if (e && e.keyCode === 13) {
                this.props.router.push("/block/" + e.target.value);
                this.setState({ showInput: false });
            }
        }
    }, {
        key: "_onSubmit",
        value: function _onSubmit() {
            var value = this.refs.blockInput.value;
            if (value) {
                this._onKeyDown({ keyCode: 13, target: { value: value } });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var showInput = this.state.showInput;
            var blocks = this.props.blocks;

            var height = parseInt(this.props.height, 10);
            var block = blocks.get(height);

            var blockHeight = showInput ? react_default.a.createElement(
                "span",
                { className: "inline-label" },
                react_default.a.createElement("input", { ref: "blockInput", type: "number", onKeyDown: this._onKeyDown.bind(this) }),
                react_default.a.createElement(
                    "button",
                    { onClick: this._onSubmit.bind(this), className: "button" },
                    react_default.a.createElement(react_translate_component_default.a, { content: "explorer.block.go_to" })
                )
            ) : react_default.a.createElement(
                "span",
                null,
                react_default.a.createElement(react_translate_component_default.a, { style: { textTransform: "uppercase" }, component: "span", content: "explorer.block.title" }),
                react_default.a.createElement(
                    "a",
                    { onClick: this.toggleInput.bind(this) },
                    "\xA0#",
                    height
                )
            );

            return react_default.a.createElement(
                "div",
                { className: "grid-block page-layout" },
                react_default.a.createElement(
                    "div",
                    { className: "grid-block main-content" },
                    react_default.a.createElement(
                        "div",
                        { className: "grid-content" },
                        react_default.a.createElement(
                            "div",
                            { className: "grid-content no-overflow medium-offset-2 medium-8 large-offset-3 large-6 small-12" },
                            react_default.a.createElement(
                                "h4",
                                { className: "text-center" },
                                blockHeight
                            ),
                            react_default.a.createElement(
                                "ul",
                                null,
                                react_default.a.createElement(
                                    "li",
                                    null,
                                    react_default.a.createElement(react_translate_component_default.a, { component: "span", content: "explorer.block.date" }),
                                    ":  ",
                                    block ? react_default.a.createElement(index_es["a" /* FormattedDate */], {
                                        value: block.timestamp,
                                        format: "full"
                                    }) : null
                                ),
                                react_default.a.createElement(
                                    "li",
                                    null,
                                    react_default.a.createElement(react_translate_component_default.a, { component: "span", content: "explorer.block.witness" }),
                                    ":  ",
                                    block ? react_default.a.createElement(LinkToWitnessById["a" /* default */], { witness: block.witness }) : null
                                ),
                                react_default.a.createElement(
                                    "li",
                                    null,
                                    react_default.a.createElement(react_translate_component_default.a, { component: "span", content: "explorer.block.previous" }),
                                    ": ",
                                    block ? block.previous : null
                                ),
                                react_default.a.createElement(
                                    "li",
                                    null,
                                    react_default.a.createElement(react_translate_component_default.a, { component: "span", content: "explorer.block.transactions" }),
                                    ": ",
                                    block ? block.transactions.length : null
                                )
                            ),
                            react_default.a.createElement(
                                "div",
                                { className: "clearfix", style: { marginBottom: "1rem" } },
                                react_default.a.createElement(
                                    "div",
                                    { className: "button float-left outline", onClick: this._previousBlock.bind(this) },
                                    "\u2190"
                                ),
                                react_default.a.createElement(
                                    "div",
                                    { className: "button float-right outline", onClick: this._nextBlock.bind(this) },
                                    "\u2192"
                                )
                            ),
                            block ? react_default.a.createElement(Block_TransactionList, {
                                block: block
                            }) : null
                        )
                    )
                )
            );
        }
    }]);

    return Block;
}(react_default.a.Component);

Block_Block.propTypes = {
    dynGlobalObject: ChainTypes["a" /* default */].ChainObject.isRequired,
    blocks: react["PropTypes"].object.isRequired,
    height: react["PropTypes"].number.isRequired
};
Block_Block.defaultProps = {
    dynGlobalObject: "2.1.0",
    blocks: {},
    height: 1
};


/* harmony default export */ var Blockchain_Block = (Object(BindToChainState["a" /* default */])(Block_Block, { keep_updating: true }));
// CONCATENATED MODULE: ./app/components/Blockchain/BlockContainer.jsx
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var BlockContainer__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function BlockContainer__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function BlockContainer__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function BlockContainer__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var BlockContainer_BlockContainer = function (_React$Component) {
    BlockContainer__inherits(BlockContainer, _React$Component);

    function BlockContainer() {
        BlockContainer__classCallCheck(this, BlockContainer);

        return BlockContainer__possibleConstructorReturn(this, (BlockContainer.__proto__ || Object.getPrototypeOf(BlockContainer)).apply(this, arguments));
    }

    BlockContainer__createClass(BlockContainer, [{
        key: "render",
        value: function render() {
            var height = parseInt(this.props.params.height, 10);

            return react_default.a.createElement(
                AltContainer_default.a,
                {
                    stores: [BlockchainStore["a" /* default */]],
                    inject: {
                        blocks: function blocks() {
                            return BlockchainStore["a" /* default */].getState().blocks;
                        }
                    }
                },
                react_default.a.createElement(Blockchain_Block, _extends({}, this.props, { height: height }))
            );
        }
    }]);

    return BlockContainer;
}(react_default.a.Component);

/* harmony default export */ var Blockchain_BlockContainer = __webpack_exports__["default"] = (BlockContainer_BlockContainer);

/***/ })

});
//# sourceMappingURL=43.js.map