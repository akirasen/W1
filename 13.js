webpackJsonp([13],{

/***/ 1536:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(1537);
var cls = __webpack_require__(1543);
var defaultSettings = __webpack_require__(1559);
var dom = __webpack_require__(1540);
var EventManager = __webpack_require__(1560);
var guid = __webpack_require__(1561);

var instances = {};

function Instance(element) {
  var i = this;

  i.settings = _.clone(defaultSettings);
  i.containerWidth = null;
  i.containerHeight = null;
  i.contentWidth = null;
  i.contentHeight = null;

  i.isRtl = dom.css(element, 'direction') === "rtl";
  i.isNegativeScroll = (function () {
    var originalScrollLeft = element.scrollLeft;
    var result = null;
    element.scrollLeft = -1;
    result = element.scrollLeft < 0;
    element.scrollLeft = originalScrollLeft;
    return result;
  })();
  i.negativeScrollAdjustment = i.isNegativeScroll ? element.scrollWidth - element.clientWidth : 0;
  i.event = new EventManager();
  i.ownerDocument = element.ownerDocument || document;

  function focus() {
    cls.add(element, 'ps-focus');
  }

  function blur() {
    cls.remove(element, 'ps-focus');
  }

  i.scrollbarXRail = dom.appendTo(dom.e('div', 'ps-scrollbar-x-rail'), element);
  i.scrollbarX = dom.appendTo(dom.e('div', 'ps-scrollbar-x'), i.scrollbarXRail);
  i.scrollbarX.setAttribute('tabindex', 0);
  i.event.bind(i.scrollbarX, 'focus', focus);
  i.event.bind(i.scrollbarX, 'blur', blur);
  i.scrollbarXActive = null;
  i.scrollbarXWidth = null;
  i.scrollbarXLeft = null;
  i.scrollbarXBottom = _.toInt(dom.css(i.scrollbarXRail, 'bottom'));
  i.isScrollbarXUsingBottom = i.scrollbarXBottom === i.scrollbarXBottom; // !isNaN
  i.scrollbarXTop = i.isScrollbarXUsingBottom ? null : _.toInt(dom.css(i.scrollbarXRail, 'top'));
  i.railBorderXWidth = _.toInt(dom.css(i.scrollbarXRail, 'borderLeftWidth')) + _.toInt(dom.css(i.scrollbarXRail, 'borderRightWidth'));
  // Set rail to display:block to calculate margins
  dom.css(i.scrollbarXRail, 'display', 'block');
  i.railXMarginWidth = _.toInt(dom.css(i.scrollbarXRail, 'marginLeft')) + _.toInt(dom.css(i.scrollbarXRail, 'marginRight'));
  dom.css(i.scrollbarXRail, 'display', '');
  i.railXWidth = null;
  i.railXRatio = null;

  i.scrollbarYRail = dom.appendTo(dom.e('div', 'ps-scrollbar-y-rail'), element);
  i.scrollbarY = dom.appendTo(dom.e('div', 'ps-scrollbar-y'), i.scrollbarYRail);
  i.scrollbarY.setAttribute('tabindex', 0);
  i.event.bind(i.scrollbarY, 'focus', focus);
  i.event.bind(i.scrollbarY, 'blur', blur);
  i.scrollbarYActive = null;
  i.scrollbarYHeight = null;
  i.scrollbarYTop = null;
  i.scrollbarYRight = _.toInt(dom.css(i.scrollbarYRail, 'right'));
  i.isScrollbarYUsingRight = i.scrollbarYRight === i.scrollbarYRight; // !isNaN
  i.scrollbarYLeft = i.isScrollbarYUsingRight ? null : _.toInt(dom.css(i.scrollbarYRail, 'left'));
  i.scrollbarYOuterWidth = i.isRtl ? _.outerWidth(i.scrollbarY) : null;
  i.railBorderYWidth = _.toInt(dom.css(i.scrollbarYRail, 'borderTopWidth')) + _.toInt(dom.css(i.scrollbarYRail, 'borderBottomWidth'));
  dom.css(i.scrollbarYRail, 'display', 'block');
  i.railYMarginHeight = _.toInt(dom.css(i.scrollbarYRail, 'marginTop')) + _.toInt(dom.css(i.scrollbarYRail, 'marginBottom'));
  dom.css(i.scrollbarYRail, 'display', '');
  i.railYHeight = null;
  i.railYRatio = null;
}

function getId(element) {
  return element.getAttribute('data-ps-id');
}

function setId(element, id) {
  element.setAttribute('data-ps-id', id);
}

function removeId(element) {
  element.removeAttribute('data-ps-id');
}

exports.add = function (element) {
  var newId = guid();
  setId(element, newId);
  instances[newId] = new Instance(element);
  return instances[newId];
};

exports.remove = function (element) {
  delete instances[getId(element)];
  removeId(element);
};

exports.get = function (element) {
  return instances[getId(element)];
};


/***/ }),

/***/ 1537:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cls = __webpack_require__(1543);
var dom = __webpack_require__(1540);

var toInt = exports.toInt = function (x) {
  return parseInt(x, 10) || 0;
};

var clone = exports.clone = function (obj) {
  if (!obj) {
    return null;
  } else if (obj.constructor === Array) {
    return obj.map(clone);
  } else if (typeof obj === 'object') {
    var result = {};
    for (var key in obj) {
      result[key] = clone(obj[key]);
    }
    return result;
  } else {
    return obj;
  }
};

exports.extend = function (original, source) {
  var result = clone(original);
  for (var key in source) {
    result[key] = clone(source[key]);
  }
  return result;
};

exports.isEditable = function (el) {
  return dom.matches(el, "input,[contenteditable]") ||
         dom.matches(el, "select,[contenteditable]") ||
         dom.matches(el, "textarea,[contenteditable]") ||
         dom.matches(el, "button,[contenteditable]");
};

exports.removePsClasses = function (element) {
  var clsList = cls.list(element);
  for (var i = 0; i < clsList.length; i++) {
    var className = clsList[i];
    if (className.indexOf('ps-') === 0) {
      cls.remove(element, className);
    }
  }
};

exports.outerWidth = function (element) {
  return toInt(dom.css(element, 'width')) +
         toInt(dom.css(element, 'paddingLeft')) +
         toInt(dom.css(element, 'paddingRight')) +
         toInt(dom.css(element, 'borderLeftWidth')) +
         toInt(dom.css(element, 'borderRightWidth'));
};

exports.startScrolling = function (element, axis) {
  cls.add(element, 'ps-in-scrolling');
  if (typeof axis !== 'undefined') {
    cls.add(element, 'ps-' + axis);
  } else {
    cls.add(element, 'ps-x');
    cls.add(element, 'ps-y');
  }
};

exports.stopScrolling = function (element, axis) {
  cls.remove(element, 'ps-in-scrolling');
  if (typeof axis !== 'undefined') {
    cls.remove(element, 'ps-' + axis);
  } else {
    cls.remove(element, 'ps-x');
    cls.remove(element, 'ps-y');
  }
};

exports.env = {
  isWebKit: 'WebkitAppearance' in document.documentElement.style,
  supportsTouch: (('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch),
  supportsIePointer: window.navigator.msMaxTouchPoints !== null
};


/***/ }),

/***/ 1538:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(1537);
var cls = __webpack_require__(1543);
var dom = __webpack_require__(1540);
var instances = __webpack_require__(1536);
var updateScroll = __webpack_require__(1539);

function getThumbSize(i, thumbSize) {
  if (i.settings.minScrollbarLength) {
    thumbSize = Math.max(thumbSize, i.settings.minScrollbarLength);
  }
  if (i.settings.maxScrollbarLength) {
    thumbSize = Math.min(thumbSize, i.settings.maxScrollbarLength);
  }
  return thumbSize;
}

function updateCss(element, i) {
  var xRailOffset = {width: i.railXWidth};
  if (i.isRtl) {
    xRailOffset.left = i.negativeScrollAdjustment + element.scrollLeft + i.containerWidth - i.contentWidth;
  } else {
    xRailOffset.left = element.scrollLeft;
  }
  if (i.isScrollbarXUsingBottom) {
    xRailOffset.bottom = i.scrollbarXBottom - element.scrollTop;
  } else {
    xRailOffset.top = i.scrollbarXTop + element.scrollTop;
  }
  dom.css(i.scrollbarXRail, xRailOffset);

  var yRailOffset = {top: element.scrollTop, height: i.railYHeight};
  if (i.isScrollbarYUsingRight) {
    if (i.isRtl) {
      yRailOffset.right = i.contentWidth - (i.negativeScrollAdjustment + element.scrollLeft) - i.scrollbarYRight - i.scrollbarYOuterWidth;
    } else {
      yRailOffset.right = i.scrollbarYRight - element.scrollLeft;
    }
  } else {
    if (i.isRtl) {
      yRailOffset.left = i.negativeScrollAdjustment + element.scrollLeft + i.containerWidth * 2 - i.contentWidth - i.scrollbarYLeft - i.scrollbarYOuterWidth;
    } else {
      yRailOffset.left = i.scrollbarYLeft + element.scrollLeft;
    }
  }
  dom.css(i.scrollbarYRail, yRailOffset);

  dom.css(i.scrollbarX, {left: i.scrollbarXLeft, width: i.scrollbarXWidth - i.railBorderXWidth});
  dom.css(i.scrollbarY, {top: i.scrollbarYTop, height: i.scrollbarYHeight - i.railBorderYWidth});
}

module.exports = function (element) {
  var i = instances.get(element);

  i.containerWidth = element.clientWidth;
  i.containerHeight = element.clientHeight;
  i.contentWidth = element.scrollWidth;
  i.contentHeight = element.scrollHeight;

  var existingRails;
  if (!element.contains(i.scrollbarXRail)) {
    existingRails = dom.queryChildren(element, '.ps-scrollbar-x-rail');
    if (existingRails.length > 0) {
      existingRails.forEach(function (rail) {
        dom.remove(rail);
      });
    }
    dom.appendTo(i.scrollbarXRail, element);
  }
  if (!element.contains(i.scrollbarYRail)) {
    existingRails = dom.queryChildren(element, '.ps-scrollbar-y-rail');
    if (existingRails.length > 0) {
      existingRails.forEach(function (rail) {
        dom.remove(rail);
      });
    }
    dom.appendTo(i.scrollbarYRail, element);
  }

  if (!i.settings.suppressScrollX && i.containerWidth + i.settings.scrollXMarginOffset < i.contentWidth) {
    i.scrollbarXActive = true;
    i.railXWidth = i.containerWidth - i.railXMarginWidth;
    i.railXRatio = i.containerWidth / i.railXWidth;
    i.scrollbarXWidth = getThumbSize(i, _.toInt(i.railXWidth * i.containerWidth / i.contentWidth));
    i.scrollbarXLeft = _.toInt((i.negativeScrollAdjustment + element.scrollLeft) * (i.railXWidth - i.scrollbarXWidth) / (i.contentWidth - i.containerWidth));
  } else {
    i.scrollbarXActive = false;
  }

  if (!i.settings.suppressScrollY && i.containerHeight + i.settings.scrollYMarginOffset < i.contentHeight) {
    i.scrollbarYActive = true;
    i.railYHeight = i.containerHeight - i.railYMarginHeight;
    i.railYRatio = i.containerHeight / i.railYHeight;
    i.scrollbarYHeight = getThumbSize(i, _.toInt(i.railYHeight * i.containerHeight / i.contentHeight));
    i.scrollbarYTop = _.toInt(element.scrollTop * (i.railYHeight - i.scrollbarYHeight) / (i.contentHeight - i.containerHeight));
  } else {
    i.scrollbarYActive = false;
  }

  if (i.scrollbarXLeft >= i.railXWidth - i.scrollbarXWidth) {
    i.scrollbarXLeft = i.railXWidth - i.scrollbarXWidth;
  }
  if (i.scrollbarYTop >= i.railYHeight - i.scrollbarYHeight) {
    i.scrollbarYTop = i.railYHeight - i.scrollbarYHeight;
  }

  updateCss(element, i);

  if (i.scrollbarXActive) {
    cls.add(element, 'ps-active-x');
  } else {
    cls.remove(element, 'ps-active-x');
    i.scrollbarXWidth = 0;
    i.scrollbarXLeft = 0;
    updateScroll(element, 'left', 0);
  }
  if (i.scrollbarYActive) {
    cls.add(element, 'ps-active-y');
  } else {
    cls.remove(element, 'ps-active-y');
    i.scrollbarYHeight = 0;
    i.scrollbarYTop = 0;
    updateScroll(element, 'top', 0);
  }
};


/***/ }),

/***/ 1539:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var instances = __webpack_require__(1536);

var lastTop;
var lastLeft;

var createDOMEvent = function (name) {
  var event = document.createEvent("Event");
  event.initEvent(name, true, true);
  return event;
};

module.exports = function (element, axis, value) {
  if (typeof element === 'undefined') {
    throw 'You must provide an element to the update-scroll function';
  }

  if (typeof axis === 'undefined') {
    throw 'You must provide an axis to the update-scroll function';
  }

  if (typeof value === 'undefined') {
    throw 'You must provide a value to the update-scroll function';
  }

  if (axis === 'top' && value <= 0) {
    element.scrollTop = value = 0; // don't allow negative scroll
    element.dispatchEvent(createDOMEvent('ps-y-reach-start'));
  }

  if (axis === 'left' && value <= 0) {
    element.scrollLeft = value = 0; // don't allow negative scroll
    element.dispatchEvent(createDOMEvent('ps-x-reach-start'));
  }

  var i = instances.get(element);

  if (axis === 'top' && value >= i.contentHeight - i.containerHeight) {
    // don't allow scroll past container
    value = i.contentHeight - i.containerHeight;
    if (value - element.scrollTop <= 1) {
      // mitigates rounding errors on non-subpixel scroll values
      value = element.scrollTop;
    } else {
      element.scrollTop = value;
    }
    element.dispatchEvent(createDOMEvent('ps-y-reach-end'));
  }

  if (axis === 'left' && value >= i.contentWidth - i.containerWidth) {
    // don't allow scroll past container
    value = i.contentWidth - i.containerWidth;
    if (value - element.scrollLeft <= 1) {
      // mitigates rounding errors on non-subpixel scroll values
      value = element.scrollLeft;
    } else {
      element.scrollLeft = value;
    }
    element.dispatchEvent(createDOMEvent('ps-x-reach-end'));
  }

  if (!lastTop) {
    lastTop = element.scrollTop;
  }

  if (!lastLeft) {
    lastLeft = element.scrollLeft;
  }

  if (axis === 'top' && value < lastTop) {
    element.dispatchEvent(createDOMEvent('ps-scroll-up'));
  }

  if (axis === 'top' && value > lastTop) {
    element.dispatchEvent(createDOMEvent('ps-scroll-down'));
  }

  if (axis === 'left' && value < lastLeft) {
    element.dispatchEvent(createDOMEvent('ps-scroll-left'));
  }

  if (axis === 'left' && value > lastLeft) {
    element.dispatchEvent(createDOMEvent('ps-scroll-right'));
  }

  if (axis === 'top') {
    element.scrollTop = lastTop = value;
    element.dispatchEvent(createDOMEvent('ps-scroll-y'));
  }

  if (axis === 'left') {
    element.scrollLeft = lastLeft = value;
    element.dispatchEvent(createDOMEvent('ps-scroll-x'));
  }

};


/***/ }),

/***/ 1540:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DOM = {};

DOM.e = function (tagName, className) {
  var element = document.createElement(tagName);
  element.className = className;
  return element;
};

DOM.appendTo = function (child, parent) {
  parent.appendChild(child);
  return child;
};

function cssGet(element, styleName) {
  return window.getComputedStyle(element)[styleName];
}

function cssSet(element, styleName, styleValue) {
  if (typeof styleValue === 'number') {
    styleValue = styleValue.toString() + 'px';
  }
  element.style[styleName] = styleValue;
  return element;
}

function cssMultiSet(element, obj) {
  for (var key in obj) {
    var val = obj[key];
    if (typeof val === 'number') {
      val = val.toString() + 'px';
    }
    element.style[key] = val;
  }
  return element;
}

DOM.css = function (element, styleNameOrObject, styleValue) {
  if (typeof styleNameOrObject === 'object') {
    // multiple set with object
    return cssMultiSet(element, styleNameOrObject);
  } else {
    if (typeof styleValue === 'undefined') {
      return cssGet(element, styleNameOrObject);
    } else {
      return cssSet(element, styleNameOrObject, styleValue);
    }
  }
};

DOM.matches = function (element, query) {
  if (typeof element.matches !== 'undefined') {
    return element.matches(query);
  } else {
    if (typeof element.matchesSelector !== 'undefined') {
      return element.matchesSelector(query);
    } else if (typeof element.webkitMatchesSelector !== 'undefined') {
      return element.webkitMatchesSelector(query);
    } else if (typeof element.mozMatchesSelector !== 'undefined') {
      return element.mozMatchesSelector(query);
    } else if (typeof element.msMatchesSelector !== 'undefined') {
      return element.msMatchesSelector(query);
    }
  }
};

DOM.remove = function (element) {
  if (typeof element.remove !== 'undefined') {
    element.remove();
  } else {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }
};

DOM.queryChildren = function (element, selector) {
  return Array.prototype.filter.call(element.childNodes, function (child) {
    return DOM.matches(child, selector);
  });
};

module.exports = DOM;


/***/ }),

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

/***/ 1543:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function oldAdd(element, className) {
  var classes = element.className.split(' ');
  if (classes.indexOf(className) < 0) {
    classes.push(className);
  }
  element.className = classes.join(' ');
}

function oldRemove(element, className) {
  var classes = element.className.split(' ');
  var idx = classes.indexOf(className);
  if (idx >= 0) {
    classes.splice(idx, 1);
  }
  element.className = classes.join(' ');
}

exports.add = function (element, className) {
  if (element.classList) {
    element.classList.add(className);
  } else {
    oldAdd(element, className);
  }
};

exports.remove = function (element, className) {
  if (element.classList) {
    element.classList.remove(className);
  } else {
    oldRemove(element, className);
  }
};

exports.list = function (element) {
  if (element.classList) {
    return Array.prototype.slice.apply(element.classList);
  } else {
    return element.className.split(' ');
  }
};


/***/ }),

/***/ 1546:
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ 1550:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(1557);


/***/ }),

/***/ 1551:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _default = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

exports.default = _default;
module.exports = exports["default"];

/***/ }),

/***/ 1552:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.nameShape = undefined;
exports.transitionTimeout = transitionTimeout;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(21);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function transitionTimeout(transitionType) {
  var timeoutPropName = 'transition' + transitionType + 'Timeout';
  var enabledPropName = 'transition' + transitionType;

  return function (props) {
    // If the transition is enabled
    if (props[enabledPropName]) {
      // If no timeout duration is provided
      if (props[timeoutPropName] == null) {
        return new Error(timeoutPropName + ' wasn\'t supplied to CSSTransitionGroup: ' + 'this can cause unreliable animations and won\'t be supported in ' + 'a future version of React. See ' + 'https://fb.me/react-animation-transition-group-timeout for more ' + 'information.');

        // If the duration isn't a number
      } else if (typeof props[timeoutPropName] !== 'number') {
        return new Error(timeoutPropName + ' must be a number (in milliseconds)');
      }
    }

    return null;
  };
}

var nameShape = exports.nameShape = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
  enter: _propTypes2.default.string,
  leave: _propTypes2.default.string,
  active: _propTypes2.default.string
}), _propTypes2.default.shape({
  enter: _propTypes2.default.string,
  enterActive: _propTypes2.default.string,
  leave: _propTypes2.default.string,
  leaveActive: _propTypes2.default.string,
  appear: _propTypes2.default.string,
  appearActive: _propTypes2.default.string
})]);

/***/ }),

/***/ 1555:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_transition_group_CSSTransitionGroup__ = __webpack_require__(1571);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_transition_group_CSSTransitionGroup___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_transition_group_CSSTransitionGroup__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var TransitionWrapper = function (_React$Component) {
    _inherits(TransitionWrapper, _React$Component);

    function TransitionWrapper() {
        _classCallCheck(this, TransitionWrapper);

        var _this = _possibleConstructorReturn(this, (TransitionWrapper.__proto__ || Object.getPrototypeOf(TransitionWrapper)).call(this));

        _this.state = {
            animateEnter: false
        };

        _this.timer = null;
        return _this;
    }

    _createClass(TransitionWrapper, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.enableAnimation();
        }
    }, {
        key: "resetAnimation",
        value: function resetAnimation() {
            this.setState({
                animateEnter: false
            });

            this.enableAnimation();
        }
    }, {
        key: "enableAnimation",
        value: function enableAnimation() {
            var _this2 = this;

            this.timer = setTimeout(function () {
                if (_this2.timer) {
                    _this2.setState({
                        animateEnter: true
                    });
                }
            }, 2000);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }, {
        key: "render",
        value: function render() {
            if (!this.props.children) {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(this.props.component);
            } else {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_1_react_transition_group_CSSTransitionGroup___default.a,
                    {
                        className: this.props.className,
                        component: this.props.component,
                        transitionName: this.props.transitionName,
                        transitionEnterTimeout: this.props.enterTimeout,
                        transitionEnter: this.state.animateEnter,
                        transitionLeave: false
                    },
                    this.props.children
                );
            }
        }
    }]);

    return TransitionWrapper;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

TransitionWrapper.defaultProps = {
    component: "span",
    enterTimeout: 2000
};
/* harmony default export */ __webpack_exports__["a"] = (TransitionWrapper);

/***/ }),

/***/ 1557:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var destroy = __webpack_require__(1558);
var initialize = __webpack_require__(1562);
var update = __webpack_require__(1570);

module.exports = {
  initialize: initialize,
  update: update,
  destroy: destroy
};


/***/ }),

/***/ 1558:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(1537);
var dom = __webpack_require__(1540);
var instances = __webpack_require__(1536);

module.exports = function (element) {
  var i = instances.get(element);

  if (!i) {
    return;
  }

  i.event.unbindAll();
  dom.remove(i.scrollbarX);
  dom.remove(i.scrollbarY);
  dom.remove(i.scrollbarXRail);
  dom.remove(i.scrollbarYRail);
  _.removePsClasses(element);

  instances.remove(element);
};


/***/ }),

/***/ 1559:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  handlers: ['click-rail', 'drag-scrollbar', 'keyboard', 'wheel', 'touch'],
  maxScrollbarLength: null,
  minScrollbarLength: null,
  scrollXMarginOffset: 0,
  scrollYMarginOffset: 0,
  suppressScrollX: false,
  suppressScrollY: false,
  swipePropagation: true,
  useBothWheelAxes: false,
  wheelPropagation: false,
  wheelSpeed: 1,
  theme: 'default'
};


/***/ }),

/***/ 1560:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var EventElement = function (element) {
  this.element = element;
  this.events = {};
};

EventElement.prototype.bind = function (eventName, handler) {
  if (typeof this.events[eventName] === 'undefined') {
    this.events[eventName] = [];
  }
  this.events[eventName].push(handler);
  this.element.addEventListener(eventName, handler, false);
};

EventElement.prototype.unbind = function (eventName, handler) {
  var isHandlerProvided = (typeof handler !== 'undefined');
  this.events[eventName] = this.events[eventName].filter(function (hdlr) {
    if (isHandlerProvided && hdlr !== handler) {
      return true;
    }
    this.element.removeEventListener(eventName, hdlr, false);
    return false;
  }, this);
};

EventElement.prototype.unbindAll = function () {
  for (var name in this.events) {
    this.unbind(name);
  }
};

var EventManager = function () {
  this.eventElements = [];
};

EventManager.prototype.eventElement = function (element) {
  var ee = this.eventElements.filter(function (eventElement) {
    return eventElement.element === element;
  })[0];
  if (typeof ee === 'undefined') {
    ee = new EventElement(element);
    this.eventElements.push(ee);
  }
  return ee;
};

EventManager.prototype.bind = function (element, eventName, handler) {
  this.eventElement(element).bind(eventName, handler);
};

EventManager.prototype.unbind = function (element, eventName, handler) {
  this.eventElement(element).unbind(eventName, handler);
};

EventManager.prototype.unbindAll = function () {
  for (var i = 0; i < this.eventElements.length; i++) {
    this.eventElements[i].unbindAll();
  }
};

EventManager.prototype.once = function (element, eventName, handler) {
  var ee = this.eventElement(element);
  var onceHandler = function (e) {
    ee.unbind(eventName, onceHandler);
    handler(e);
  };
  ee.bind(eventName, onceHandler);
};

module.exports = EventManager;


/***/ }),

/***/ 1561:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = (function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }
  return function () {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  };
})();


/***/ }),

/***/ 1562:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(1537);
var cls = __webpack_require__(1543);
var instances = __webpack_require__(1536);
var updateGeometry = __webpack_require__(1538);

// Handlers
var handlers = {
  'click-rail': __webpack_require__(1563),
  'drag-scrollbar': __webpack_require__(1564),
  'keyboard': __webpack_require__(1565),
  'wheel': __webpack_require__(1566),
  'touch': __webpack_require__(1567),
  'selection': __webpack_require__(1568)
};
var nativeScrollHandler = __webpack_require__(1569);

module.exports = function (element, userSettings) {
  userSettings = typeof userSettings === 'object' ? userSettings : {};

  cls.add(element, 'ps-container');

  // Create a plugin instance.
  var i = instances.add(element);

  i.settings = _.extend(i.settings, userSettings);
  cls.add(element, 'ps-theme-' + i.settings.theme);

  i.settings.handlers.forEach(function (handlerName) {
    handlers[handlerName](element);
  });

  nativeScrollHandler(element);

  updateGeometry(element);
};


/***/ }),

/***/ 1563:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var instances = __webpack_require__(1536);
var updateGeometry = __webpack_require__(1538);
var updateScroll = __webpack_require__(1539);

function bindClickRailHandler(element, i) {
  function pageOffset(el) {
    return el.getBoundingClientRect();
  }
  var stopPropagation = function (e) { e.stopPropagation(); };

  i.event.bind(i.scrollbarY, 'click', stopPropagation);
  i.event.bind(i.scrollbarYRail, 'click', function (e) {
    var positionTop = e.pageY - window.pageYOffset - pageOffset(i.scrollbarYRail).top;
    var direction = positionTop > i.scrollbarYTop ? 1 : -1;

    updateScroll(element, 'top', element.scrollTop + direction * i.containerHeight);
    updateGeometry(element);

    e.stopPropagation();
  });

  i.event.bind(i.scrollbarX, 'click', stopPropagation);
  i.event.bind(i.scrollbarXRail, 'click', function (e) {
    var positionLeft = e.pageX - window.pageXOffset - pageOffset(i.scrollbarXRail).left;
    var direction = positionLeft > i.scrollbarXLeft ? 1 : -1;

    updateScroll(element, 'left', element.scrollLeft + direction * i.containerWidth);
    updateGeometry(element);

    e.stopPropagation();
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindClickRailHandler(element, i);
};


/***/ }),

/***/ 1564:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(1537);
var dom = __webpack_require__(1540);
var instances = __webpack_require__(1536);
var updateGeometry = __webpack_require__(1538);
var updateScroll = __webpack_require__(1539);

function bindMouseScrollXHandler(element, i) {
  var currentLeft = null;
  var currentPageX = null;

  function updateScrollLeft(deltaX) {
    var newLeft = currentLeft + (deltaX * i.railXRatio);
    var maxLeft = Math.max(0, i.scrollbarXRail.getBoundingClientRect().left) + (i.railXRatio * (i.railXWidth - i.scrollbarXWidth));

    if (newLeft < 0) {
      i.scrollbarXLeft = 0;
    } else if (newLeft > maxLeft) {
      i.scrollbarXLeft = maxLeft;
    } else {
      i.scrollbarXLeft = newLeft;
    }

    var scrollLeft = _.toInt(i.scrollbarXLeft * (i.contentWidth - i.containerWidth) / (i.containerWidth - (i.railXRatio * i.scrollbarXWidth))) - i.negativeScrollAdjustment;
    updateScroll(element, 'left', scrollLeft);
  }

  var mouseMoveHandler = function (e) {
    updateScrollLeft(e.pageX - currentPageX);
    updateGeometry(element);
    e.stopPropagation();
    e.preventDefault();
  };

  var mouseUpHandler = function () {
    _.stopScrolling(element, 'x');
    i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
  };

  i.event.bind(i.scrollbarX, 'mousedown', function (e) {
    currentPageX = e.pageX;
    currentLeft = _.toInt(dom.css(i.scrollbarX, 'left')) * i.railXRatio;
    _.startScrolling(element, 'x');

    i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
    i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);

    e.stopPropagation();
    e.preventDefault();
  });
}

function bindMouseScrollYHandler(element, i) {
  var currentTop = null;
  var currentPageY = null;

  function updateScrollTop(deltaY) {
    var newTop = currentTop + (deltaY * i.railYRatio);
    var maxTop = Math.max(0, i.scrollbarYRail.getBoundingClientRect().top) + (i.railYRatio * (i.railYHeight - i.scrollbarYHeight));

    if (newTop < 0) {
      i.scrollbarYTop = 0;
    } else if (newTop > maxTop) {
      i.scrollbarYTop = maxTop;
    } else {
      i.scrollbarYTop = newTop;
    }

    var scrollTop = _.toInt(i.scrollbarYTop * (i.contentHeight - i.containerHeight) / (i.containerHeight - (i.railYRatio * i.scrollbarYHeight)));
    updateScroll(element, 'top', scrollTop);
  }

  var mouseMoveHandler = function (e) {
    updateScrollTop(e.pageY - currentPageY);
    updateGeometry(element);
    e.stopPropagation();
    e.preventDefault();
  };

  var mouseUpHandler = function () {
    _.stopScrolling(element, 'y');
    i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
  };

  i.event.bind(i.scrollbarY, 'mousedown', function (e) {
    currentPageY = e.pageY;
    currentTop = _.toInt(dom.css(i.scrollbarY, 'top')) * i.railYRatio;
    _.startScrolling(element, 'y');

    i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
    i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);

    e.stopPropagation();
    e.preventDefault();
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindMouseScrollXHandler(element, i);
  bindMouseScrollYHandler(element, i);
};


/***/ }),

/***/ 1565:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(1537);
var dom = __webpack_require__(1540);
var instances = __webpack_require__(1536);
var updateGeometry = __webpack_require__(1538);
var updateScroll = __webpack_require__(1539);

function bindKeyboardHandler(element, i) {
  var hovered = false;
  i.event.bind(element, 'mouseenter', function () {
    hovered = true;
  });
  i.event.bind(element, 'mouseleave', function () {
    hovered = false;
  });

  var shouldPrevent = false;
  function shouldPreventDefault(deltaX, deltaY) {
    var scrollTop = element.scrollTop;
    if (deltaX === 0) {
      if (!i.scrollbarYActive) {
        return false;
      }
      if ((scrollTop === 0 && deltaY > 0) || (scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0)) {
        return !i.settings.wheelPropagation;
      }
    }

    var scrollLeft = element.scrollLeft;
    if (deltaY === 0) {
      if (!i.scrollbarXActive) {
        return false;
      }
      if ((scrollLeft === 0 && deltaX < 0) || (scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0)) {
        return !i.settings.wheelPropagation;
      }
    }
    return true;
  }

  i.event.bind(i.ownerDocument, 'keydown', function (e) {
    if ((e.isDefaultPrevented && e.isDefaultPrevented()) || e.defaultPrevented) {
      return;
    }

    var focused = dom.matches(i.scrollbarX, ':focus') ||
                  dom.matches(i.scrollbarY, ':focus');

    if (!hovered && !focused) {
      return;
    }

    var activeElement = document.activeElement ? document.activeElement : i.ownerDocument.activeElement;
    if (activeElement) {
      if (activeElement.tagName === 'IFRAME') {
        activeElement = activeElement.contentDocument.activeElement;
      } else {
        // go deeper if element is a webcomponent
        while (activeElement.shadowRoot) {
          activeElement = activeElement.shadowRoot.activeElement;
        }
      }
      if (_.isEditable(activeElement)) {
        return;
      }
    }

    var deltaX = 0;
    var deltaY = 0;

    switch (e.which) {
    case 37: // left
      if (e.metaKey) {
        deltaX = -i.contentWidth;
      } else if (e.altKey) {
        deltaX = -i.containerWidth;
      } else {
        deltaX = -30;
      }
      break;
    case 38: // up
      if (e.metaKey) {
        deltaY = i.contentHeight;
      } else if (e.altKey) {
        deltaY = i.containerHeight;
      } else {
        deltaY = 30;
      }
      break;
    case 39: // right
      if (e.metaKey) {
        deltaX = i.contentWidth;
      } else if (e.altKey) {
        deltaX = i.containerWidth;
      } else {
        deltaX = 30;
      }
      break;
    case 40: // down
      if (e.metaKey) {
        deltaY = -i.contentHeight;
      } else if (e.altKey) {
        deltaY = -i.containerHeight;
      } else {
        deltaY = -30;
      }
      break;
    case 33: // page up
      deltaY = 90;
      break;
    case 32: // space bar
      if (e.shiftKey) {
        deltaY = 90;
      } else {
        deltaY = -90;
      }
      break;
    case 34: // page down
      deltaY = -90;
      break;
    case 35: // end
      if (e.ctrlKey) {
        deltaY = -i.contentHeight;
      } else {
        deltaY = -i.containerHeight;
      }
      break;
    case 36: // home
      if (e.ctrlKey) {
        deltaY = element.scrollTop;
      } else {
        deltaY = i.containerHeight;
      }
      break;
    default:
      return;
    }

    updateScroll(element, 'top', element.scrollTop - deltaY);
    updateScroll(element, 'left', element.scrollLeft + deltaX);
    updateGeometry(element);

    shouldPrevent = shouldPreventDefault(deltaX, deltaY);
    if (shouldPrevent) {
      e.preventDefault();
    }
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindKeyboardHandler(element, i);
};


/***/ }),

/***/ 1566:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var instances = __webpack_require__(1536);
var updateGeometry = __webpack_require__(1538);
var updateScroll = __webpack_require__(1539);

function bindMouseWheelHandler(element, i) {
  var shouldPrevent = false;

  function shouldPreventDefault(deltaX, deltaY) {
    var scrollTop = element.scrollTop;
    if (deltaX === 0) {
      if (!i.scrollbarYActive) {
        return false;
      }
      if ((scrollTop === 0 && deltaY > 0) || (scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0)) {
        return !i.settings.wheelPropagation;
      }
    }

    var scrollLeft = element.scrollLeft;
    if (deltaY === 0) {
      if (!i.scrollbarXActive) {
        return false;
      }
      if ((scrollLeft === 0 && deltaX < 0) || (scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0)) {
        return !i.settings.wheelPropagation;
      }
    }
    return true;
  }

  function getDeltaFromEvent(e) {
    var deltaX = e.deltaX;
    var deltaY = -1 * e.deltaY;

    if (typeof deltaX === "undefined" || typeof deltaY === "undefined") {
      // OS X Safari
      deltaX = -1 * e.wheelDeltaX / 6;
      deltaY = e.wheelDeltaY / 6;
    }

    if (e.deltaMode && e.deltaMode === 1) {
      // Firefox in deltaMode 1: Line scrolling
      deltaX *= 10;
      deltaY *= 10;
    }

    if (deltaX !== deltaX && deltaY !== deltaY/* NaN checks */) {
      // IE in some mouse drivers
      deltaX = 0;
      deltaY = e.wheelDelta;
    }

    if (e.shiftKey) {
      // reverse axis with shift key
      return [-deltaY, -deltaX];
    }
    return [deltaX, deltaY];
  }

  function shouldBeConsumedByChild(deltaX, deltaY) {
    var child = element.querySelector('textarea:hover, select[multiple]:hover, .ps-child:hover');
    if (child) {
      if (child.className.match(/ps-must-propagate/)) {
        // force consumption by child
        return true;
      }
      if (!window.getComputedStyle(child).overflow.match(/(scroll|auto)/)) {
        // if not scrollable
        return false;
      }



      var maxScrollTop = child.scrollHeight - child.clientHeight;
      if (maxScrollTop > 0) {
        if (!(child.scrollTop === 0 && deltaY > 0) && !(child.scrollTop === maxScrollTop && deltaY < 0)) {
          return true;
        }
      }
      var maxScrollLeft = child.scrollLeft - child.clientWidth;
      if (maxScrollLeft > 0) {
        if (!(child.scrollLeft === 0 && deltaX < 0) && !(child.scrollLeft === maxScrollLeft && deltaX > 0)) {
          return true;
        }
      }
    }
    return false;
  }

  function mousewheelHandler(e) {
    var delta = getDeltaFromEvent(e);

    var deltaX = delta[0];
    var deltaY = delta[1];

    if (shouldBeConsumedByChild(deltaX, deltaY)) {
      return;
    }

    shouldPrevent = false;
    if (!i.settings.useBothWheelAxes) {
      // deltaX will only be used for horizontal scrolling and deltaY will
      // only be used for vertical scrolling - this is the default
      updateScroll(element, 'top', element.scrollTop - (deltaY * i.settings.wheelSpeed));
      updateScroll(element, 'left', element.scrollLeft + (deltaX * i.settings.wheelSpeed));
    } else if (i.scrollbarYActive && !i.scrollbarXActive) {
      // only vertical scrollbar is active and useBothWheelAxes option is
      // active, so let's scroll vertical bar using both mouse wheel axes
      if (deltaY) {
        updateScroll(element, 'top', element.scrollTop - (deltaY * i.settings.wheelSpeed));
      } else {
        updateScroll(element, 'top', element.scrollTop + (deltaX * i.settings.wheelSpeed));
      }
      shouldPrevent = true;
    } else if (i.scrollbarXActive && !i.scrollbarYActive) {
      // useBothWheelAxes and only horizontal bar is active, so use both
      // wheel axes for horizontal bar
      if (deltaX) {
        updateScroll(element, 'left', element.scrollLeft + (deltaX * i.settings.wheelSpeed));
      } else {
        updateScroll(element, 'left', element.scrollLeft - (deltaY * i.settings.wheelSpeed));
      }
      shouldPrevent = true;
    }

    updateGeometry(element);

    shouldPrevent = (shouldPrevent || shouldPreventDefault(deltaX, deltaY));
    if (shouldPrevent) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  if (typeof window.onwheel !== "undefined") {
    i.event.bind(element, 'wheel', mousewheelHandler);
  } else if (typeof window.onmousewheel !== "undefined") {
    i.event.bind(element, 'mousewheel', mousewheelHandler);
  }
}

module.exports = function (element) {
  var i = instances.get(element);
  bindMouseWheelHandler(element, i);
};


/***/ }),

/***/ 1567:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(1537);
var instances = __webpack_require__(1536);
var updateGeometry = __webpack_require__(1538);
var updateScroll = __webpack_require__(1539);

function bindTouchHandler(element, i, supportsTouch, supportsIePointer) {
  function shouldPreventDefault(deltaX, deltaY) {
    var scrollTop = element.scrollTop;
    var scrollLeft = element.scrollLeft;
    var magnitudeX = Math.abs(deltaX);
    var magnitudeY = Math.abs(deltaY);

    if (magnitudeY > magnitudeX) {
      // user is perhaps trying to swipe up/down the page

      if (((deltaY < 0) && (scrollTop === i.contentHeight - i.containerHeight)) ||
          ((deltaY > 0) && (scrollTop === 0))) {
        return !i.settings.swipePropagation;
      }
    } else if (magnitudeX > magnitudeY) {
      // user is perhaps trying to swipe left/right across the page

      if (((deltaX < 0) && (scrollLeft === i.contentWidth - i.containerWidth)) ||
          ((deltaX > 0) && (scrollLeft === 0))) {
        return !i.settings.swipePropagation;
      }
    }

    return true;
  }

  function applyTouchMove(differenceX, differenceY) {
    updateScroll(element, 'top', element.scrollTop - differenceY);
    updateScroll(element, 'left', element.scrollLeft - differenceX);

    updateGeometry(element);
  }

  var startOffset = {};
  var startTime = 0;
  var speed = {};
  var easingLoop = null;
  var inGlobalTouch = false;
  var inLocalTouch = false;

  function globalTouchStart() {
    inGlobalTouch = true;
  }
  function globalTouchEnd() {
    inGlobalTouch = false;
  }

  function getTouch(e) {
    if (e.targetTouches) {
      return e.targetTouches[0];
    } else {
      // Maybe IE pointer
      return e;
    }
  }
  function shouldHandle(e) {
    if (e.targetTouches && e.targetTouches.length === 1) {
      return true;
    }
    if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== e.MSPOINTER_TYPE_MOUSE) {
      return true;
    }
    return false;
  }
  function touchStart(e) {
    if (shouldHandle(e)) {
      inLocalTouch = true;

      var touch = getTouch(e);

      startOffset.pageX = touch.pageX;
      startOffset.pageY = touch.pageY;

      startTime = (new Date()).getTime();

      if (easingLoop !== null) {
        clearInterval(easingLoop);
      }

      e.stopPropagation();
    }
  }
  function touchMove(e) {
    if (!inLocalTouch && i.settings.swipePropagation) {
      touchStart(e);
    }
    if (!inGlobalTouch && inLocalTouch && shouldHandle(e)) {
      var touch = getTouch(e);

      var currentOffset = {pageX: touch.pageX, pageY: touch.pageY};

      var differenceX = currentOffset.pageX - startOffset.pageX;
      var differenceY = currentOffset.pageY - startOffset.pageY;

      applyTouchMove(differenceX, differenceY);
      startOffset = currentOffset;

      var currentTime = (new Date()).getTime();

      var timeGap = currentTime - startTime;
      if (timeGap > 0) {
        speed.x = differenceX / timeGap;
        speed.y = differenceY / timeGap;
        startTime = currentTime;
      }

      if (shouldPreventDefault(differenceX, differenceY)) {
        e.stopPropagation();
        e.preventDefault();
      }
    }
  }
  function touchEnd() {
    if (!inGlobalTouch && inLocalTouch) {
      inLocalTouch = false;

      clearInterval(easingLoop);
      easingLoop = setInterval(function () {
        if (!instances.get(element)) {
          clearInterval(easingLoop);
          return;
        }

        if (!speed.x && !speed.y) {
          clearInterval(easingLoop);
          return;
        }

        if (Math.abs(speed.x) < 0.01 && Math.abs(speed.y) < 0.01) {
          clearInterval(easingLoop);
          return;
        }

        applyTouchMove(speed.x * 30, speed.y * 30);

        speed.x *= 0.8;
        speed.y *= 0.8;
      }, 10);
    }
  }

  if (supportsTouch) {
    i.event.bind(window, 'touchstart', globalTouchStart);
    i.event.bind(window, 'touchend', globalTouchEnd);
    i.event.bind(element, 'touchstart', touchStart);
    i.event.bind(element, 'touchmove', touchMove);
    i.event.bind(element, 'touchend', touchEnd);
  } else if (supportsIePointer) {
    if (window.PointerEvent) {
      i.event.bind(window, 'pointerdown', globalTouchStart);
      i.event.bind(window, 'pointerup', globalTouchEnd);
      i.event.bind(element, 'pointerdown', touchStart);
      i.event.bind(element, 'pointermove', touchMove);
      i.event.bind(element, 'pointerup', touchEnd);
    } else if (window.MSPointerEvent) {
      i.event.bind(window, 'MSPointerDown', globalTouchStart);
      i.event.bind(window, 'MSPointerUp', globalTouchEnd);
      i.event.bind(element, 'MSPointerDown', touchStart);
      i.event.bind(element, 'MSPointerMove', touchMove);
      i.event.bind(element, 'MSPointerUp', touchEnd);
    }
  }
}

module.exports = function (element) {
  if (!_.env.supportsTouch && !_.env.supportsIePointer) {
    return;
  }

  var i = instances.get(element);
  bindTouchHandler(element, i, _.env.supportsTouch, _.env.supportsIePointer);
};


/***/ }),

/***/ 1568:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(1537);
var instances = __webpack_require__(1536);
var updateGeometry = __webpack_require__(1538);
var updateScroll = __webpack_require__(1539);

function bindSelectionHandler(element, i) {
  function getRangeNode() {
    var selection = window.getSelection ? window.getSelection() :
                    document.getSelection ? document.getSelection() : '';
    if (selection.toString().length === 0) {
      return null;
    } else {
      return selection.getRangeAt(0).commonAncestorContainer;
    }
  }

  var scrollingLoop = null;
  var scrollDiff = {top: 0, left: 0};
  function startScrolling() {
    if (!scrollingLoop) {
      scrollingLoop = setInterval(function () {
        if (!instances.get(element)) {
          clearInterval(scrollingLoop);
          return;
        }

        updateScroll(element, 'top', element.scrollTop + scrollDiff.top);
        updateScroll(element, 'left', element.scrollLeft + scrollDiff.left);
        updateGeometry(element);
      }, 50); // every .1 sec
    }
  }
  function stopScrolling() {
    if (scrollingLoop) {
      clearInterval(scrollingLoop);
      scrollingLoop = null;
    }
    _.stopScrolling(element);
  }

  var isSelected = false;
  i.event.bind(i.ownerDocument, 'selectionchange', function () {
    if (element.contains(getRangeNode())) {
      isSelected = true;
    } else {
      isSelected = false;
      stopScrolling();
    }
  });
  i.event.bind(window, 'mouseup', function () {
    if (isSelected) {
      isSelected = false;
      stopScrolling();
    }
  });
  i.event.bind(window, 'keyup', function () {
    if (isSelected) {
      isSelected = false;
      stopScrolling();
    }
  });

  i.event.bind(window, 'mousemove', function (e) {
    if (isSelected) {
      var mousePosition = {x: e.pageX, y: e.pageY};
      var containerGeometry = {
        left: element.offsetLeft,
        right: element.offsetLeft + element.offsetWidth,
        top: element.offsetTop,
        bottom: element.offsetTop + element.offsetHeight
      };

      if (mousePosition.x < containerGeometry.left + 3) {
        scrollDiff.left = -5;
        _.startScrolling(element, 'x');
      } else if (mousePosition.x > containerGeometry.right - 3) {
        scrollDiff.left = 5;
        _.startScrolling(element, 'x');
      } else {
        scrollDiff.left = 0;
      }

      if (mousePosition.y < containerGeometry.top + 3) {
        if (containerGeometry.top + 3 - mousePosition.y < 5) {
          scrollDiff.top = -5;
        } else {
          scrollDiff.top = -20;
        }
        _.startScrolling(element, 'y');
      } else if (mousePosition.y > containerGeometry.bottom - 3) {
        if (mousePosition.y - containerGeometry.bottom + 3 < 5) {
          scrollDiff.top = 5;
        } else {
          scrollDiff.top = 20;
        }
        _.startScrolling(element, 'y');
      } else {
        scrollDiff.top = 0;
      }

      if (scrollDiff.top === 0 && scrollDiff.left === 0) {
        stopScrolling();
      } else {
        startScrolling();
      }
    }
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindSelectionHandler(element, i);
};


/***/ }),

/***/ 1569:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var instances = __webpack_require__(1536);
var updateGeometry = __webpack_require__(1538);

function bindNativeScrollHandler(element, i) {
  i.event.bind(element, 'scroll', function () {
    updateGeometry(element);
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindNativeScrollHandler(element, i);
};


/***/ }),

/***/ 1570:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(1537);
var dom = __webpack_require__(1540);
var instances = __webpack_require__(1536);
var updateGeometry = __webpack_require__(1538);
var updateScroll = __webpack_require__(1539);

module.exports = function (element) {
  var i = instances.get(element);

  if (!i) {
    return;
  }

  // Recalcuate negative scrollLeft adjustment
  i.negativeScrollAdjustment = i.isNegativeScroll ? element.scrollWidth - element.clientWidth : 0;

  // Recalculate rail margins
  dom.css(i.scrollbarXRail, 'display', 'block');
  dom.css(i.scrollbarYRail, 'display', 'block');
  i.railXMarginWidth = _.toInt(dom.css(i.scrollbarXRail, 'marginLeft')) + _.toInt(dom.css(i.scrollbarXRail, 'marginRight'));
  i.railYMarginHeight = _.toInt(dom.css(i.scrollbarYRail, 'marginTop')) + _.toInt(dom.css(i.scrollbarYRail, 'marginBottom'));

  // Hide scrollbars not to affect scrollWidth and scrollHeight
  dom.css(i.scrollbarXRail, 'display', 'none');
  dom.css(i.scrollbarYRail, 'display', 'none');

  updateGeometry(element);

  // Update top/left scroll to trigger events
  updateScroll(element, 'top', element.scrollTop);
  updateScroll(element, 'left', element.scrollLeft);

  dom.css(i.scrollbarXRail, 'display', '');
  dom.css(i.scrollbarYRail, 'display', '');
};


/***/ }),

/***/ 1571:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(21);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TransitionGroup = __webpack_require__(1572);

var _TransitionGroup2 = _interopRequireDefault(_TransitionGroup);

var _CSSTransitionGroupChild = __webpack_require__(1575);

var _CSSTransitionGroupChild2 = _interopRequireDefault(_CSSTransitionGroupChild);

var _PropTypes = __webpack_require__(1552);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  transitionName: _PropTypes.nameShape.isRequired,

  transitionAppear: _propTypes2.default.bool,
  transitionEnter: _propTypes2.default.bool,
  transitionLeave: _propTypes2.default.bool,
  transitionAppearTimeout: (0, _PropTypes.transitionTimeout)('Appear'),
  transitionEnterTimeout: (0, _PropTypes.transitionTimeout)('Enter'),
  transitionLeaveTimeout: (0, _PropTypes.transitionTimeout)('Leave')
};

var defaultProps = {
  transitionAppear: false,
  transitionEnter: true,
  transitionLeave: true
};

var CSSTransitionGroup = function (_React$Component) {
  _inherits(CSSTransitionGroup, _React$Component);

  function CSSTransitionGroup() {
    var _temp, _this, _ret;

    _classCallCheck(this, CSSTransitionGroup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this._wrapChild = function (child) {
      return _react2.default.createElement(_CSSTransitionGroupChild2.default, {
        name: _this.props.transitionName,
        appear: _this.props.transitionAppear,
        enter: _this.props.transitionEnter,
        leave: _this.props.transitionLeave,
        appearTimeout: _this.props.transitionAppearTimeout,
        enterTimeout: _this.props.transitionEnterTimeout,
        leaveTimeout: _this.props.transitionLeaveTimeout
      }, child);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // We need to provide this childFactory so that
  // ReactCSSTransitionGroupChild can receive updates to name, enter, and
  // leave while it is leaving.


  CSSTransitionGroup.prototype.render = function render() {
    return _react2.default.createElement(_TransitionGroup2.default, _extends({}, this.props, { childFactory: this._wrapChild }));
  };

  return CSSTransitionGroup;
}(_react2.default.Component);

CSSTransitionGroup.displayName = 'CSSTransitionGroup';


CSSTransitionGroup.propTypes =  false ? propTypes : {};
CSSTransitionGroup.defaultProps = defaultProps;

exports.default = CSSTransitionGroup;
module.exports = exports['default'];

/***/ }),

/***/ 1572:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _chainFunction = __webpack_require__(1573);

var _chainFunction2 = _interopRequireDefault(_chainFunction);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(21);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _warning = __webpack_require__(81);

var _warning2 = _interopRequireDefault(_warning);

var _ChildMapping = __webpack_require__(1574);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  component: _propTypes2.default.any,
  childFactory: _propTypes2.default.func,
  children: _propTypes2.default.node
};

var defaultProps = {
  component: 'span',
  childFactory: function childFactory(child) {
    return child;
  }
};

var TransitionGroup = function (_React$Component) {
  _inherits(TransitionGroup, _React$Component);

  function TransitionGroup(props, context) {
    _classCallCheck(this, TransitionGroup);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    _this.performAppear = function (key, component) {
      _this.currentlyTransitioningKeys[key] = true;

      if (component.componentWillAppear) {
        component.componentWillAppear(_this._handleDoneAppearing.bind(_this, key, component));
      } else {
        _this._handleDoneAppearing(key, component);
      }
    };

    _this._handleDoneAppearing = function (key, component) {
      if (component.componentDidAppear) {
        component.componentDidAppear();
      }

      delete _this.currentlyTransitioningKeys[key];

      var currentChildMapping = (0, _ChildMapping.getChildMapping)(_this.props.children);

      if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
        // This was removed before it had fully appeared. Remove it.
        _this.performLeave(key, component);
      }
    };

    _this.performEnter = function (key, component) {
      _this.currentlyTransitioningKeys[key] = true;

      if (component.componentWillEnter) {
        component.componentWillEnter(_this._handleDoneEntering.bind(_this, key, component));
      } else {
        _this._handleDoneEntering(key, component);
      }
    };

    _this._handleDoneEntering = function (key, component) {
      if (component.componentDidEnter) {
        component.componentDidEnter();
      }

      delete _this.currentlyTransitioningKeys[key];

      var currentChildMapping = (0, _ChildMapping.getChildMapping)(_this.props.children);

      if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
        // This was removed before it had fully entered. Remove it.
        _this.performLeave(key, component);
      }
    };

    _this.performLeave = function (key, component) {
      _this.currentlyTransitioningKeys[key] = true;

      if (component.componentWillLeave) {
        component.componentWillLeave(_this._handleDoneLeaving.bind(_this, key, component));
      } else {
        // Note that this is somewhat dangerous b/c it calls setState()
        // again, effectively mutating the component before all the work
        // is done.
        _this._handleDoneLeaving(key, component);
      }
    };

    _this._handleDoneLeaving = function (key, component) {
      if (component.componentDidLeave) {
        component.componentDidLeave();
      }

      delete _this.currentlyTransitioningKeys[key];

      var currentChildMapping = (0, _ChildMapping.getChildMapping)(_this.props.children);

      if (currentChildMapping && currentChildMapping.hasOwnProperty(key)) {
        // This entered again before it fully left. Add it again.
        _this.keysToEnter.push(key);
      } else {
        _this.setState(function (state) {
          var newChildren = _extends({}, state.children);
          delete newChildren[key];
          return { children: newChildren };
        });
      }
    };

    _this.childRefs = Object.create(null);

    _this.state = {
      children: (0, _ChildMapping.getChildMapping)(props.children)
    };
    return _this;
  }

  TransitionGroup.prototype.componentWillMount = function componentWillMount() {
    this.currentlyTransitioningKeys = {};
    this.keysToEnter = [];
    this.keysToLeave = [];
  };

  TransitionGroup.prototype.componentDidMount = function componentDidMount() {
    var initialChildMapping = this.state.children;
    for (var key in initialChildMapping) {
      if (initialChildMapping[key]) {
        this.performAppear(key, this.childRefs[key]);
      }
    }
  };

  TransitionGroup.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var nextChildMapping = (0, _ChildMapping.getChildMapping)(nextProps.children);
    var prevChildMapping = this.state.children;

    this.setState({
      children: (0, _ChildMapping.mergeChildMappings)(prevChildMapping, nextChildMapping)
    });

    for (var key in nextChildMapping) {
      var hasPrev = prevChildMapping && prevChildMapping.hasOwnProperty(key);
      if (nextChildMapping[key] && !hasPrev && !this.currentlyTransitioningKeys[key]) {
        this.keysToEnter.push(key);
      }
    }

    for (var _key in prevChildMapping) {
      var hasNext = nextChildMapping && nextChildMapping.hasOwnProperty(_key);
      if (prevChildMapping[_key] && !hasNext && !this.currentlyTransitioningKeys[_key]) {
        this.keysToLeave.push(_key);
      }
    }

    // If we want to someday check for reordering, we could do it here.
  };

  TransitionGroup.prototype.componentDidUpdate = function componentDidUpdate() {
    var _this2 = this;

    var keysToEnter = this.keysToEnter;
    this.keysToEnter = [];
    keysToEnter.forEach(function (key) {
      return _this2.performEnter(key, _this2.childRefs[key]);
    });

    var keysToLeave = this.keysToLeave;
    this.keysToLeave = [];
    keysToLeave.forEach(function (key) {
      return _this2.performLeave(key, _this2.childRefs[key]);
    });
  };

  TransitionGroup.prototype.render = function render() {
    var _this3 = this;

    // TODO: we could get rid of the need for the wrapper node
    // by cloning a single child
    var childrenToRender = [];

    var _loop = function _loop(key) {
      var child = _this3.state.children[key];
      if (child) {
        var isCallbackRef = typeof child.ref !== 'string';
        var factoryChild = _this3.props.childFactory(child);
        var ref = function ref(r) {
          _this3.childRefs[key] = r;
        };

         false ? (0, _warning2.default)(isCallbackRef, 'string refs are not supported on children of TransitionGroup and will be ignored. ' + 'Please use a callback ref instead: https://facebook.github.io/react/docs/refs-and-the-dom.html#the-ref-callback-attribute') : void 0;

        // Always chaining the refs leads to problems when the childFactory
        // wraps the child. The child ref callback gets called twice with the
        // wrapper and the child. So we only need to chain the ref if the
        // factoryChild is not different from child.
        if (factoryChild === child && isCallbackRef) {
          ref = (0, _chainFunction2.default)(child.ref, ref);
        }

        // You may need to apply reactive updates to a child as it is leaving.
        // The normal React way to do it won't work since the child will have
        // already been removed. In case you need this behavior you can provide
        // a childFactory function to wrap every child, even the ones that are
        // leaving.
        childrenToRender.push(_react2.default.cloneElement(factoryChild, {
          key: key,
          ref: ref
        }));
      }
    };

    for (var key in this.state.children) {
      _loop(key);
    }

    // Do not forward TransitionGroup props to primitive DOM nodes
    var props = _extends({}, this.props);
    delete props.transitionLeave;
    delete props.transitionName;
    delete props.transitionAppear;
    delete props.transitionEnter;
    delete props.childFactory;
    delete props.transitionLeaveTimeout;
    delete props.transitionEnterTimeout;
    delete props.transitionAppearTimeout;
    delete props.component;

    return _react2.default.createElement(this.props.component, props, childrenToRender);
  };

  return TransitionGroup;
}(_react2.default.Component);

TransitionGroup.displayName = 'TransitionGroup';


TransitionGroup.propTypes =  false ? propTypes : {};
TransitionGroup.defaultProps = defaultProps;

exports.default = TransitionGroup;
module.exports = exports['default'];

/***/ }),

/***/ 1573:
/***/ (function(module, exports) {


module.exports = function chain(){
  var len = arguments.length
  var args = [];

  for (var i = 0; i < len; i++)
    args[i] = arguments[i]

  args = args.filter(function(fn){ return fn != null })

  if (args.length === 0) return undefined
  if (args.length === 1) return args[0]

  return args.reduce(function(current, next){
    return function chainedFunction() {
      current.apply(this, arguments);
      next.apply(this, arguments);
    };
  })
}


/***/ }),

/***/ 1574:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getChildMapping = getChildMapping;
exports.mergeChildMappings = mergeChildMappings;

var _react = __webpack_require__(1);

/**
 * Given `this.props.children`, return an object mapping key to child.
 *
 * @param {*} children `this.props.children`
 * @return {object} Mapping of key to child
 */
function getChildMapping(children) {
  if (!children) {
    return children;
  }
  var result = {};
  _react.Children.map(children, function (child) {
    return child;
  }).forEach(function (child) {
    result[child.key] = child;
  });
  return result;
}

/**
 * When you're adding or removing children some may be added or removed in the
 * same render pass. We want to show *both* since we want to simultaneously
 * animate elements in and out. This function takes a previous set of keys
 * and a new set of keys and merges them with its best guess of the correct
 * ordering. In the future we may expose some of the utilities in
 * ReactMultiChild to make this easy, but for now React itself does not
 * directly have this concept of the union of prevChildren and nextChildren
 * so we implement it here.
 *
 * @param {object} prev prev children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @param {object} next next children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @return {object} a key set that contains all keys in `prev` and all keys
 * in `next` in a reasonable order.
 */
function mergeChildMappings(prev, next) {
  prev = prev || {};
  next = next || {};

  function getValueForKey(key) {
    if (next.hasOwnProperty(key)) {
      return next[key];
    }

    return prev[key];
  }

  // For each key of `next`, the list of keys to insert before that key in
  // the combined list
  var nextKeysPending = {};

  var pendingKeys = [];
  for (var prevKey in prev) {
    if (next.hasOwnProperty(prevKey)) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }

  var i = void 0;
  var childMapping = {};
  for (var nextKey in next) {
    if (nextKeysPending.hasOwnProperty(nextKey)) {
      for (i = 0; i < nextKeysPending[nextKey].length; i++) {
        var pendingNextKey = nextKeysPending[nextKey][i];
        childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
      }
    }
    childMapping[nextKey] = getValueForKey(nextKey);
  }

  // Finally, add the keys which didn't appear before any key in `next`
  for (i = 0; i < pendingKeys.length; i++) {
    childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
  }

  return childMapping;
}

/***/ }),

/***/ 1575:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _addClass = __webpack_require__(1576);

var _addClass2 = _interopRequireDefault(_addClass);

var _removeClass = __webpack_require__(1578);

var _removeClass2 = _interopRequireDefault(_removeClass);

var _requestAnimationFrame = __webpack_require__(1579);

var _requestAnimationFrame2 = _interopRequireDefault(_requestAnimationFrame);

var _properties = __webpack_require__(1580);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(21);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__(80);

var _PropTypes = __webpack_require__(1552);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var events = [];
if (_properties.transitionEnd) events.push(_properties.transitionEnd);
if (_properties.animationEnd) events.push(_properties.animationEnd);

function addEndListener(node, listener) {
  if (events.length) {
    events.forEach(function (e) {
      return node.addEventListener(e, listener, false);
    });
  } else {
    setTimeout(listener, 0);
  }

  return function () {
    if (!events.length) return;
    events.forEach(function (e) {
      return node.removeEventListener(e, listener, false);
    });
  };
}

var propTypes = {
  children: _propTypes2.default.node,
  name: _PropTypes.nameShape.isRequired,

  // Once we require timeouts to be specified, we can remove the
  // boolean flags (appear etc.) and just accept a number
  // or a bool for the timeout flags (appearTimeout etc.)
  appear: _propTypes2.default.bool,
  enter: _propTypes2.default.bool,
  leave: _propTypes2.default.bool,
  appearTimeout: _propTypes2.default.number,
  enterTimeout: _propTypes2.default.number,
  leaveTimeout: _propTypes2.default.number
};

var CSSTransitionGroupChild = function (_React$Component) {
  _inherits(CSSTransitionGroupChild, _React$Component);

  function CSSTransitionGroupChild() {
    var _temp, _this, _ret;

    _classCallCheck(this, CSSTransitionGroupChild);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.componentWillAppear = function (done) {
      if (_this.props.appear) {
        _this.transition('appear', done, _this.props.appearTimeout);
      } else {
        done();
      }
    }, _this.componentWillEnter = function (done) {
      if (_this.props.enter) {
        _this.transition('enter', done, _this.props.enterTimeout);
      } else {
        done();
      }
    }, _this.componentWillLeave = function (done) {
      if (_this.props.leave) {
        _this.transition('leave', done, _this.props.leaveTimeout);
      } else {
        done();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  CSSTransitionGroupChild.prototype.componentWillMount = function componentWillMount() {
    this.classNameAndNodeQueue = [];
    this.transitionTimeouts = [];
  };

  CSSTransitionGroupChild.prototype.componentWillUnmount = function componentWillUnmount() {
    this.unmounted = true;

    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.transitionTimeouts.forEach(function (timeout) {
      clearTimeout(timeout);
    });

    this.classNameAndNodeQueue.length = 0;
  };

  CSSTransitionGroupChild.prototype.transition = function transition(animationType, finishCallback, timeout) {
    var node = (0, _reactDom.findDOMNode)(this);

    if (!node) {
      if (finishCallback) {
        finishCallback();
      }
      return;
    }

    var className = this.props.name[animationType] || this.props.name + '-' + animationType;
    var activeClassName = this.props.name[animationType + 'Active'] || className + '-active';
    var timer = null;
    var removeListeners = void 0;

    (0, _addClass2.default)(node, className);

    // Need to do this to actually trigger a transition.
    this.queueClassAndNode(activeClassName, node);

    // Clean-up the animation after the specified delay
    var finish = function finish(e) {
      if (e && e.target !== node) {
        return;
      }

      clearTimeout(timer);
      if (removeListeners) removeListeners();

      (0, _removeClass2.default)(node, className);
      (0, _removeClass2.default)(node, activeClassName);

      if (removeListeners) removeListeners();

      // Usually this optional callback is used for informing an owner of
      // a leave animation and telling it to remove the child.
      if (finishCallback) {
        finishCallback();
      }
    };

    if (timeout) {
      timer = setTimeout(finish, timeout);
      this.transitionTimeouts.push(timer);
    } else if (_properties.transitionEnd) {
      removeListeners = addEndListener(node, finish);
    }
  };

  CSSTransitionGroupChild.prototype.queueClassAndNode = function queueClassAndNode(className, node) {
    var _this2 = this;

    this.classNameAndNodeQueue.push({
      className: className,
      node: node
    });

    if (!this.rafHandle) {
      this.rafHandle = (0, _requestAnimationFrame2.default)(function () {
        return _this2.flushClassNameAndNodeQueue();
      });
    }
  };

  CSSTransitionGroupChild.prototype.flushClassNameAndNodeQueue = function flushClassNameAndNodeQueue() {
    if (!this.unmounted) {
      this.classNameAndNodeQueue.forEach(function (obj) {
        // This is for to force a repaint,
        // which is necessary in order to transition styles when adding a class name.
        /* eslint-disable no-unused-expressions */
        obj.node.scrollTop;
        /* eslint-enable no-unused-expressions */
        (0, _addClass2.default)(obj.node, obj.className);
      });
    }
    this.classNameAndNodeQueue.length = 0;
    this.rafHandle = null;
  };

  CSSTransitionGroupChild.prototype.render = function render() {
    var props = _extends({}, this.props);
    delete props.name;
    delete props.appear;
    delete props.enter;
    delete props.leave;
    delete props.appearTimeout;
    delete props.enterTimeout;
    delete props.leaveTimeout;
    delete props.children;
    return _react2.default.cloneElement(_react2.default.Children.only(this.props.children), props);
  };

  return CSSTransitionGroupChild;
}(_react2.default.Component);

CSSTransitionGroupChild.displayName = 'CSSTransitionGroupChild';


CSSTransitionGroupChild.propTypes =  false ? propTypes : {};

exports.default = CSSTransitionGroupChild;
module.exports = exports['default'];

/***/ }),

/***/ 1576:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(1546);

exports.__esModule = true;
exports.default = addClass;

var _hasClass = _interopRequireDefault(__webpack_require__(1577));

function addClass(element, className) {
  if (element.classList) element.classList.add(className);else if (!(0, _hasClass.default)(element, className)) if (typeof element.className === 'string') element.className = element.className + ' ' + className;else element.setAttribute('class', (element.className && element.className.baseVal || '') + ' ' + className);
}

module.exports = exports["default"];

/***/ }),

/***/ 1577:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = hasClass;

function hasClass(element, className) {
  if (element.classList) return !!className && element.classList.contains(className);else return (" " + (element.className.baseVal || element.className) + " ").indexOf(" " + className + " ") !== -1;
}

module.exports = exports["default"];

/***/ }),

/***/ 1578:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function replaceClassName(origClass, classToRemove) {
  return origClass.replace(new RegExp('(^|\\s)' + classToRemove + '(?:\\s|$)', 'g'), '$1').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
}

module.exports = function removeClass(element, className) {
  if (element.classList) element.classList.remove(className);else if (typeof element.className === 'string') element.className = replaceClassName(element.className, className);else element.setAttribute('class', replaceClassName(element.className && element.className.baseVal || '', className));
};

/***/ }),

/***/ 1579:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(1546);

exports.__esModule = true;
exports.default = void 0;

var _inDOM = _interopRequireDefault(__webpack_require__(1551));

var vendors = ['', 'webkit', 'moz', 'o', 'ms'];
var cancel = 'clearTimeout';
var raf = fallback;
var compatRaf;

var getKey = function getKey(vendor, k) {
  return vendor + (!vendor ? k : k[0].toUpperCase() + k.substr(1)) + 'AnimationFrame';
};

if (_inDOM.default) {
  vendors.some(function (vendor) {
    var rafKey = getKey(vendor, 'request');

    if (rafKey in window) {
      cancel = getKey(vendor, 'cancel');
      return raf = function raf(cb) {
        return window[rafKey](cb);
      };
    }
  });
}
/* https://github.com/component/raf */


var prev = new Date().getTime();

function fallback(fn) {
  var curr = new Date().getTime(),
      ms = Math.max(0, 16 - (curr - prev)),
      req = setTimeout(fn, ms);
  prev = curr;
  return req;
}

compatRaf = function compatRaf(cb) {
  return raf(cb);
};

compatRaf.cancel = function (id) {
  window[cancel] && typeof window[cancel] === 'function' && window[cancel](id);
};

var _default = compatRaf;
exports.default = _default;
module.exports = exports["default"];

/***/ }),

/***/ 1580:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(1546);

exports.__esModule = true;
exports.default = exports.animationEnd = exports.animationDelay = exports.animationTiming = exports.animationDuration = exports.animationName = exports.transitionEnd = exports.transitionDuration = exports.transitionDelay = exports.transitionTiming = exports.transitionProperty = exports.transform = void 0;

var _inDOM = _interopRequireDefault(__webpack_require__(1551));

var transform = 'transform';
exports.transform = transform;
var prefix, transitionEnd, animationEnd;
exports.animationEnd = animationEnd;
exports.transitionEnd = transitionEnd;
var transitionProperty, transitionDuration, transitionTiming, transitionDelay;
exports.transitionDelay = transitionDelay;
exports.transitionTiming = transitionTiming;
exports.transitionDuration = transitionDuration;
exports.transitionProperty = transitionProperty;
var animationName, animationDuration, animationTiming, animationDelay;
exports.animationDelay = animationDelay;
exports.animationTiming = animationTiming;
exports.animationDuration = animationDuration;
exports.animationName = animationName;

if (_inDOM.default) {
  var _getTransitionPropert = getTransitionProperties();

  prefix = _getTransitionPropert.prefix;
  exports.transitionEnd = transitionEnd = _getTransitionPropert.transitionEnd;
  exports.animationEnd = animationEnd = _getTransitionPropert.animationEnd;
  exports.transform = transform = prefix + "-" + transform;
  exports.transitionProperty = transitionProperty = prefix + "-transition-property";
  exports.transitionDuration = transitionDuration = prefix + "-transition-duration";
  exports.transitionDelay = transitionDelay = prefix + "-transition-delay";
  exports.transitionTiming = transitionTiming = prefix + "-transition-timing-function";
  exports.animationName = animationName = prefix + "-animation-name";
  exports.animationDuration = animationDuration = prefix + "-animation-duration";
  exports.animationTiming = animationTiming = prefix + "-animation-delay";
  exports.animationDelay = animationDelay = prefix + "-animation-timing-function";
}

var _default = {
  transform: transform,
  end: transitionEnd,
  property: transitionProperty,
  timing: transitionTiming,
  delay: transitionDelay,
  duration: transitionDuration
};
exports.default = _default;

function getTransitionProperties() {
  var style = document.createElement('div').style;
  var vendorMap = {
    O: function O(e) {
      return "o" + e.toLowerCase();
    },
    Moz: function Moz(e) {
      return e.toLowerCase();
    },
    Webkit: function Webkit(e) {
      return "webkit" + e;
    },
    ms: function ms(e) {
      return "MS" + e;
    }
  };
  var vendors = Object.keys(vendorMap);
  var transitionEnd, animationEnd;
  var prefix = '';

  for (var i = 0; i < vendors.length; i++) {
    var vendor = vendors[i];

    if (vendor + "TransitionProperty" in style) {
      prefix = "-" + vendor.toLowerCase();
      transitionEnd = vendorMap[vendor]('TransitionEnd');
      animationEnd = vendorMap[vendor]('AnimationEnd');
      break;
    }
  }

  if (!transitionEnd && 'transitionProperty' in style) transitionEnd = 'transitionend';
  if (!animationEnd && 'animationName' in style) animationEnd = 'animationend';
  style = null;
  return {
    animationEnd: animationEnd,
    transitionEnd: transitionEnd,
    prefix: prefix
  };
}

/***/ }),

/***/ 1583:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecentTransactions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TransactionWrapper; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_translate_component__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_translate_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_translate_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_file_saver__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_file_saver___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_file_saver__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Blockchain_Operation__ = __webpack_require__(693);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Utility_ChainTypes__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Utility_BindToChainState__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_common_utils__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_seerjs_es__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Utility_TransitionWrapper__ = __webpack_require__(1555);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_perfect_scrollbar__ = __webpack_require__(1550);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_perfect_scrollbar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_perfect_scrollbar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_counterpart__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_counterpart___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_counterpart__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Icon_Icon__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_classnames__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_classnames__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }















var operations = __WEBPACK_IMPORTED_MODULE_7_seerjs_es__["c" /* ChainTypes */].operations;

var alignLeft = { textAlign: "left" };
var alignRight = { textAlign: "right" };

function compareOps(b, a) {
    if (a.block_num === b.block_num) {
        return a.virtual_op - b.virtual_op;
    } else {
        return a.block_num - b.block_num;
    }
}

function textContent(n) {
    return n ? "\"" + n.textContent.replace(/[\s\t\r\n]/gi, " ") + "\"" : "";
}

var RecentTransactions = function (_React$Component) {
    _inherits(RecentTransactions, _React$Component);

    function RecentTransactions(props) {
        _classCallCheck(this, RecentTransactions);

        var _this = _possibleConstructorReturn(this, (RecentTransactions.__proto__ || Object.getPrototypeOf(RecentTransactions)).call(this));

        _this.state = {
            limit: props.limit || 20,
            csvExport: false,
            headerHeight: 85,
            filter: "all"
        };
        return _this;
    }

    _createClass(RecentTransactions, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            if (!this.props.fullHeight) {
                var t = this.refs.transactions;
                __WEBPACK_IMPORTED_MODULE_9_perfect_scrollbar___default.a.initialize(t);

                this._setHeaderHeight();
            }
        }
    }, {
        key: "_setHeaderHeight",
        value: function _setHeaderHeight() {
            var height = this.refs.header.offsetHeight;

            if (height !== this.state.headerHeight) {
                this.setState({
                    headerHeight: height
                });
            }
        }
    }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState) {
            if (!__WEBPACK_IMPORTED_MODULE_6_common_utils__["a" /* default */].are_equal_shallow(this.props.accountsList, nextProps.accountsList)) return true;
            if (this.props.maxHeight !== nextProps.maxHeight) return true;
            if (this.state.headerHeight !== nextState.headerHeight) return true;
            if (this.state.filter !== nextState.filter) return true;
            if (this.props.customFilter) {
                if (!__WEBPACK_IMPORTED_MODULE_6_common_utils__["a" /* default */].are_equal_shallow(this.props.customFilter.fields, nextProps.customFilter.fields) || !__WEBPACK_IMPORTED_MODULE_6_common_utils__["a" /* default */].are_equal_shallow(this.props.customFilter.values, nextProps.customFilter.values)) {
                    return true;
                };
            }

            if (this.props.maxHeight !== nextProps.maxHeight) return true;
            if (nextState.limit !== this.state.limit || nextState.csvExport !== this.state.csvExport) return true;
            for (var key = 0; key < nextProps.accountsList.length; ++key) {
                var npa = nextProps.accountsList[key];
                var nsa = this.props.accountsList[key];
                if (npa && nsa && npa.get("history") !== nsa.get("history")) return true;
            }
            return false;
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            if (this.state.csvExport) {
                this.state.csvExport = false;
                var csv_export_container = document.getElementById("csv_export_container");
                var nodes = csv_export_container.childNodes;
                var csv = "";
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var n = _step.value;

                        //console.log("-- RecentTransactions._downloadCSV -->", n);
                        var cn = n.childNodes;
                        if (csv !== "") csv += "\n";
                        csv += [textContent(cn[0]), textContent(cn[1]), textContent(cn[2]), textContent(cn[3])].join(",");
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                var blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
                var today = new Date();
                Object(__WEBPACK_IMPORTED_MODULE_2_file_saver__["saveAs"])(blob, 'btshist-' + today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2) + '-' + ('0' + today.getHours()).slice(-2) + ('0' + today.getMinutes()).slice(-2) + '.csv');
            }

            if (!this.props.fullHeight) {
                var t = this.refs.transactions;
                __WEBPACK_IMPORTED_MODULE_9_perfect_scrollbar___default.a.update(t);

                this._setHeaderHeight();
            }
        }
    }, {
        key: "_onIncreaseLimit",
        value: function _onIncreaseLimit() {
            this.setState({
                limit: this.state.limit + 30
            });
        }
    }, {
        key: "_getHistory",
        value: function _getHistory(accountsList, filterOp, customFilter) {
            var history = [];
            var seen_ops = new Set();
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = accountsList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var account = _step2.value;

                    if (account) {
                        var h = account.get("history");
                        if (h) history = history.concat(h.toJS().filter(function (op) {
                            return !seen_ops.has(op.id) && seen_ops.add(op.id);
                        }));
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            if (filterOp) {
                history = history.filter(function (a) {
                    return a.op[0] === operations[filterOp];
                });
            }

            if (customFilter) {
                history = history.filter(function (a) {
                    var finalValue = customFilter.fields.reduce(function (final, filter) {
                        switch (filter) {
                            case "asset_id":
                                return final && a.op[1]["amount"][filter] === customFilter.values[filter];
                                break;
                            default:
                                return final && a.op[1][filter] === customFilter.values[filter];
                                break;
                        }
                    }, true);
                    return finalValue;
                });
            }
            return history;
        }
    }, {
        key: "_downloadCSV",
        value: function _downloadCSV() {
            this.setState({ csvExport: true });
        }
    }, {
        key: "_onChangeFilter",
        value: function _onChangeFilter(e) {
            this.setState({
                filter: e.target.value
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _props = this.props,
                accountsList = _props.accountsList,
                compactView = _props.compactView,
                filter = _props.filter,
                customFilter = _props.customFilter,
                style = _props.style,
                maxHeight = _props.maxHeight;
            var _state = this.state,
                limit = _state.limit,
                headerHeight = _state.headerHeight;

            var current_account_id = accountsList.length === 1 && accountsList[0] ? accountsList[0].get("id") : null;
            var history = this._getHistory(accountsList, this.props.showFilters && this.state.filter !== "all" ? this.state.filter : filter, customFilter).sort(compareOps);
            var historyCount = history.length;

            style = style ? style : {};
            style.width = "100%";
            style.height = "100%";

            var options = null;
            if (true) {
                options = ["all", "transfer", "limit_order_create", "limit_order_cancel", "fill_order", "account_create", "account_update", "asset_create", "witness_withdraw_pay", "vesting_balance_withdraw"].map(function (type) {
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "option",
                        { value: type, key: type },
                        __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("transaction.trxTypes." + type)
                    );
                });
            }

            var display_history = history.length ? history.slice(0, limit).map(function (o) {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__Blockchain_Operation__["a" /* default */], {
                    style: alignLeft,
                    key: o.id,
                    op: o.op,
                    result: o.result,
                    block: o.block_num,
                    current: current_account_id,
                    hideFee: true,
                    inverted: false,
                    hideOpLabel: compactView
                });
            }) : [__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "tr",
                { key: "no_recent" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "td",
                    { colSpan: compactView ? "2" : "3" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_translate_component___default.a, { content: "operation.no_recent" })
                )
            )];
            display_history.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "tr",
                { className: "total-value", key: "total_value" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("td", { className: "column-hide-tiny" }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "td",
                    { style: alignRight },
                    historyCount > 0 ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "span",
                        null,
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "a",
                            {
                                className: "inline-block",
                                onClick: this._downloadCSV.bind(this),
                                "data-tip": __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("transaction.csv_tip"),
                                "data-place": "bottom"
                            },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11__Icon_Icon__["a" /* default */], { name: "excel", className: "icon-14px" })
                        )
                    ) : null
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "td",
                    { style: { textAlign: "center" } },
                    "\xA0",
                    this.props.showMore && historyCount > this.props.limit || 20 && limit < historyCount ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "a",
                        { onClick: this._onIncreaseLimit.bind(this) },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11__Icon_Icon__["a" /* default */], { name: "chevron-down", className: "icon-14px" })
                    ) : null
                )
            ));

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "recent-transactions no-overflow", style: style },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "generic-bordered-box" },
                    this.props.dashboard ? null : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { ref: "header" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "block-content-header" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "span",
                                null,
                                this.props.title ? this.props.title : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_translate_component___default.a, { content: "account.recent" })
                            )
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "header-selector" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "selector" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { className: __WEBPACK_IMPORTED_MODULE_12_classnames___default()("inline-block") },
                                this.props.showFilters ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "select",
                                    { "data-place": "left", "data-tip": __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("tooltip.filter_ops"), style: { paddingTop: 5, width: "auto" }, className: "bts-select no-margin", value: this.state.filter, onChange: this._onChangeFilter.bind(this) },
                                    options
                                ) : null
                            )
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        {
                            className: "box-content grid-block no-margin",
                            style: !this.props.fullHeight ? {
                                maxHeight: maxHeight - headerHeight
                            } : null,
                            ref: "transactions" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "table",
                            { className: "table table-striped " + (compactView ? "compact" : "") + (this.props.dashboard ? " dashboard-table table-hover" : "") },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "thead",
                                null,
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "tr",
                                    null,
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "th",
                                        { className: "column-hide-tiny", style: _extends({}, alignLeft, { paddingLeft: "20px" }) },
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_translate_component___default.a, { content: "account.transactions.type" })
                                    ),
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "th",
                                        { style: alignLeft },
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_translate_component___default.a, { content: "account.transactions.info" })
                                    ),
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "th",
                                        { style: alignLeft },
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_translate_component___default.a, { content: "account.transactions.time" })
                                    )
                                )
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                __WEBPACK_IMPORTED_MODULE_8__Utility_TransitionWrapper__["a" /* default */],
                                {
                                    component: "tbody",
                                    transitionName: "newrow"
                                },
                                display_history
                            )
                        )
                    ),
                    historyCount > 0 && this.state.csvExport && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { id: "csv_export_container", style: { display: "none" } },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            null,
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                null,
                                "DATE"
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                null,
                                "OPERATION"
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                null,
                                "MEMO"
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                null,
                                "AMOUNT"
                            )
                        ),
                        history.map(function (o) {
                            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__Blockchain_Operation__["a" /* default */], {
                                key: o.id,
                                op: o.op,
                                result: o.result,
                                block: o.block_num,
                                inverted: false,
                                csvExportMode: true
                            });
                        })
                    )
                )
            );
        }
    }]);

    return RecentTransactions;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

RecentTransactions.propTypes = {
    accountsList: __WEBPACK_IMPORTED_MODULE_4__Utility_ChainTypes__["a" /* default */].ChainAccountsList.isRequired,
    compactView: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.bool,
    limit: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.number,
    maxHeight: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.number,
    fullHeight: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.bool,
    showFilters: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.bool
};
RecentTransactions.defaultProps = {
    limit: 25,
    maxHeight: 500,
    fullHeight: false,
    showFilters: false
};

RecentTransactions = Object(__WEBPACK_IMPORTED_MODULE_5__Utility_BindToChainState__["a" /* default */])(RecentTransactions, { keep_updating: true });

var TransactionWrapper = function (_React$Component2) {
    _inherits(TransactionWrapper, _React$Component2);

    function TransactionWrapper() {
        _classCallCheck(this, TransactionWrapper);

        return _possibleConstructorReturn(this, (TransactionWrapper.__proto__ || Object.getPrototypeOf(TransactionWrapper)).apply(this, arguments));
    }

    _createClass(TransactionWrapper, [{
        key: "render",
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "span",
                { className: "wrapper" },
                this.props.children(this.props)
            );
        }
    }]);

    return TransactionWrapper;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

TransactionWrapper.propTypes = {
    asset: __WEBPACK_IMPORTED_MODULE_4__Utility_ChainTypes__["a" /* default */].ChainAsset.isRequired,
    to: __WEBPACK_IMPORTED_MODULE_4__Utility_ChainTypes__["a" /* default */].ChainAccount.isRequired,
    fromAccount: __WEBPACK_IMPORTED_MODULE_4__Utility_ChainTypes__["a" /* default */].ChainAccount.isRequired
};
TransactionWrapper.defaultProps = {
    asset: "1.3.0"
};

TransactionWrapper = Object(__WEBPACK_IMPORTED_MODULE_5__Utility_BindToChainState__["a" /* default */])(TransactionWrapper);



/***/ }),

/***/ 1646:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/react/react.js
var react = __webpack_require__(1);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./app/components/Modal/BaseModal.jsx
var BaseModal = __webpack_require__(105);

// EXTERNAL MODULE: ./node_modules/react-foundation-apps/src/utils/foundation-api.js
var foundation_api = __webpack_require__(41);
var foundation_api_default = /*#__PURE__*/__webpack_require__.n(foundation_api);

// EXTERNAL MODULE: ./app/actions/WalletUnlockActions.js
var WalletUnlockActions = __webpack_require__(69);

// EXTERNAL MODULE: ./app/stores/WalletDb.js
var WalletDb = __webpack_require__(26);

// EXTERNAL MODULE: ./node_modules/react-translate-component/index.js
var react_translate_component = __webpack_require__(5);
var react_translate_component_default = /*#__PURE__*/__webpack_require__.n(react_translate_component);

// EXTERNAL MODULE: ./app/stores/PrivateKeyStore.js
var PrivateKeyStore = __webpack_require__(82);

// EXTERNAL MODULE: ./node_modules/qrcode.react/lib/index.js
var lib = __webpack_require__(692);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// EXTERNAL MODULE: ./node_modules/seerjs/es/index.js + 7 modules
var es = __webpack_require__(6);

// CONCATENATED MODULE: ./app/components/Modal/QrcodeModal.jsx
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var QrcodeModal_QrcodeModal = function (_React$Component) {
    _inherits(QrcodeModal, _React$Component);

    function QrcodeModal(props) {
        _classCallCheck(this, QrcodeModal);

        var _this = _possibleConstructorReturn(this, (QrcodeModal.__proto__ || Object.getPrototypeOf(QrcodeModal)).call(this, props));

        _this.state = _this._getInitialState();
        _this.onPasswordEnter = _this.onPasswordEnter.bind(_this);
        _this.onKeyDown = _this.onKeyDown.bind(_this);
        _this.onCancel = _this.onCancel.bind(_this);
        _this.onClose = _this.onClose.bind(_this);
        return _this;
    }

    _createClass(QrcodeModal, [{
        key: "_getInitialState",
        value: function _getInitialState() {
            return {
                isShowQrcode: false,
                keyString: null
            };
        }
    }, {
        key: "show",
        value: function show() {
            foundation_api_default.a.publish(this.props.modalId, "open");
        }
    }, {
        key: "onCancel",
        value: function onCancel() {
            foundation_api_default.a.publish(this.props.modalId, "close");
            this.onClose();
        }
    }, {
        key: "onClose",
        value: function onClose() {
            if (this.refs.password_input) this.refs.password_input.value = "";
            this.setState(this._getInitialState());
        }
    }, {
        key: "onPasswordEnter",
        value: function onPasswordEnter(e) {
            e.preventDefault();
            var pwd = this.refs.password_input.value;
            var key = this.props.keyValue;
            if (pwd != null && pwd != "") {
                if (key !== undefined && key != null && key != "") {
                    var pwd_aes = es["a" /* Aes */].fromSeed(pwd);
                    var qrkey = pwd_aes.encryptToHex(key);
                    this.setState({ isShowQrcode: true, keyString: qrkey });
                }
            } else {
                //notify.error("You'd better enter a password to encrypt the qr code");
                this.setState({ isShowQrcode: true, keyString: key });
            }
        }
    }, {
        key: "onKeyDown",
        value: function onKeyDown(e) {
            if (e.keyCode === 13) this.onPasswordEnter(e);
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var pos = null;
            if (this.state.isShowQrcode) pos = { textAlign: "center" };
            return react_default.a.createElement(
                BaseModal["a" /* default */],
                { onClose: this.onClose, id: this.props.modalId, ref: "modal", overlay: true, overlayClose: false },
                react_default.a.createElement(
                    "div",
                    { className: "text-center" },
                    react_default.a.createElement(
                        "div",
                        { style: { margin: "1.5rem 0" } },
                        react_default.a.createElement(react_translate_component_default.a, { component: "h4", content: "modal.qrcode.title" })
                    ),
                    react_default.a.createElement(
                        "form",
                        { className: "full-width", style: { margin: "0 3.5rem" }, onSubmit: this.onPasswordEnter, noValidate: true },
                        react_default.a.createElement(
                            "div",
                            { className: "form-group" },
                            this.state.isShowQrcode ? react_default.a.createElement(
                                "section",
                                { style: pos },
                                react_default.a.createElement(
                                    "span",
                                    { style: { background: "#fff", padding: ".75rem", display: "inline-block" } },
                                    react_default.a.createElement(lib_default.a, { size: 256, value: this.state.keyString })
                                )
                            ) : react_default.a.createElement(
                                "section",
                                null,
                                react_default.a.createElement(
                                    "label",
                                    { className: "left-label" },
                                    react_default.a.createElement(react_translate_component_default.a, { unsafe: true, content: "modal.qrcode.input_message" })
                                ),
                                react_default.a.createElement("input", {
                                    name: "password",
                                    type: "text",
                                    onFocus: function onFocus() {
                                        _this2.refs.password_input.setAttribute("type", "password");
                                    },
                                    ref: "password_input",
                                    autoComplete: "off",
                                    onKeyDown: this.onKeyDown
                                })
                            )
                        ),
                        react_default.a.createElement(
                            "div",
                            { style: pos },
                            react_default.a.createElement(
                                "div",
                                { className: "button-group" },
                                this.state.isShowQrcode == false ? react_default.a.createElement(
                                    "button",
                                    { className: "button", "data-place": "bottom", "data-html": true, onClick: this.onPasswordEnter },
                                    react_default.a.createElement(react_translate_component_default.a, { content: "modal.ok" })
                                ) : null,
                                react_default.a.createElement(
                                    "button",
                                    { className: "button", "data-place": "bottom", "data-html": true, onClick: this.onCancel },
                                    react_default.a.createElement(react_translate_component_default.a, { content: "cancel" })
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return QrcodeModal;
}(react_default.a.Component);

QrcodeModal_QrcodeModal.propTypes = {
    modalId: react["PropTypes"].string.isRequired,
    keyValue: react["PropTypes"].string
};
QrcodeModal_QrcodeModal.defaultProps = {
    modalId: "qr_code_password_modal"
};
/* harmony default export */ var Modal_QrcodeModal = (QrcodeModal_QrcodeModal);
// CONCATENATED MODULE: ./app/components/PrivateKeyView.jsx
var PrivateKeyView__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function PrivateKeyView__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function PrivateKeyView__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function PrivateKeyView__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var PrivateKeyView_PrivateKeyView = function (_Component) {
    PrivateKeyView__inherits(PrivateKeyView, _Component);

    function PrivateKeyView() {
        PrivateKeyView__classCallCheck(this, PrivateKeyView);

        var _this = PrivateKeyView__possibleConstructorReturn(this, (PrivateKeyView.__proto__ || Object.getPrototypeOf(PrivateKeyView)).call(this));

        _this.state = _this._getInitialState();
        return _this;
    }

    PrivateKeyView__createClass(PrivateKeyView, [{
        key: "_getInitialState",
        value: function _getInitialState() {
            return { wif: null };
        }
    }, {
        key: "reset",
        value: function reset() {
            this.setState(this._getInitialState());
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            var modalId = "key_view_modal" + this.props.pubkey;
            foundation_api_default.a.subscribe(modalId, function (name, msg) {
                if (name !== modalId) return;
                if (msg === "close") _this2.reset();
            });
        }
    }, {
        key: "render",
        value: function render() {
            var modalId = "key_view_modal" + this.props.pubkey;
            var keys = PrivateKeyStore["a" /* default */].getState().keys;

            var has_private = keys.has(this.props.pubkey);
            if (!has_private) return react_default.a.createElement(
                "span",
                null,
                this.props.children
            );
            var key = keys.get(this.props.pubkey);
            return react_default.a.createElement(
                "span",
                null,
                react_default.a.createElement(
                    "a",
                    { onClick: this.onOpen.bind(this) },
                    this.props.children
                ),
                react_default.a.createElement(
                    BaseModal["a" /* default */],
                    { ref: modalId, id: modalId, overlay: true, overlayClose: false },
                    react_default.a.createElement(
                        "h3",
                        null,
                        react_default.a.createElement(react_translate_component_default.a, { content: "account.perm.key_viewer" })
                    ),
                    react_default.a.createElement(
                        "div",
                        { className: "grid-block vertical" },
                        react_default.a.createElement(
                            "div",
                            { className: "content-block" },
                            react_default.a.createElement(
                                "div",
                                { className: "grid-content" },
                                react_default.a.createElement(
                                    "label",
                                    null,
                                    react_default.a.createElement(react_translate_component_default.a, { content: "account.perm.public" })
                                ),
                                this.props.pubkey
                            ),
                            react_default.a.createElement("br", null),
                            react_default.a.createElement(
                                "div",
                                { className: "grid-block grid-content" },
                                react_default.a.createElement(
                                    "label",
                                    null,
                                    react_default.a.createElement(react_translate_component_default.a, { content: "account.perm.private" })
                                ),
                                react_default.a.createElement(
                                    "div",
                                    null,
                                    this.state.wif ? react_default.a.createElement(
                                        "span",
                                        null,
                                        react_default.a.createElement(
                                            "p",
                                            { style: { fontWeight: 600 } },
                                            this.state.wif
                                        ),
                                        react_default.a.createElement(
                                            "div",
                                            { className: "button-group" },
                                            react_default.a.createElement(
                                                "div",
                                                { className: "button", onClick: this.onHide.bind(this) },
                                                "hide"
                                            ),
                                            react_default.a.createElement(
                                                "div",
                                                { className: "clickable", onClick: this.showQrCode.bind(this) },
                                                react_default.a.createElement("img", { style: { height: 50 }, src: __webpack_require__(1668) })
                                            )
                                        )
                                    ) : react_default.a.createElement(
                                        "span",
                                        null,
                                        react_default.a.createElement(
                                            "div",
                                            { className: "button", onClick: this.onShow.bind(this) },
                                            react_default.a.createElement(react_translate_component_default.a, { content: "account.perm.show" })
                                        )
                                    )
                                )
                            ),
                            react_default.a.createElement("br", null),
                            react_default.a.createElement(
                                "div",
                                { className: "grid-block grid-content" },
                                react_default.a.createElement(
                                    "label",
                                    null,
                                    react_default.a.createElement(react_translate_component_default.a, { content: "account.perm.brain" })
                                ),
                                key.brainkey_sequence == null ? "Non-deterministic" : key.brainkey_sequence
                            ),
                            react_default.a.createElement("br", null),
                            key.import_account_names && key.import_account_names.length ? react_default.a.createElement(
                                "div",
                                { className: "grid-block grid-content" },
                                react_default.a.createElement(
                                    "label",
                                    null,
                                    react_default.a.createElement(react_translate_component_default.a, { content: "account.perm.from" })
                                ),
                                key.import_account_names.join(", "),
                                react_default.a.createElement("br", null)
                            ) : null
                        )
                    ),
                    react_default.a.createElement(
                        "div",
                        { className: "button-group" },
                        react_default.a.createElement(
                            "div",
                            { onClick: this.onClose.bind(this), className: " button" },
                            react_default.a.createElement(react_translate_component_default.a, { content: "transfer.close" })
                        )
                    )
                ),
                react_default.a.createElement(Modal_QrcodeModal, { ref: "qrmodal", keyValue: this.state.wif })
            );
        }
    }, {
        key: "onOpen",
        value: function onOpen() {
            var modalId = "key_view_modal" + this.props.pubkey;
            foundation_api_default.a.publish(modalId, "open");
        }
    }, {
        key: "onClose",
        value: function onClose() {
            this.reset();
            var modalId = "key_view_modal" + this.props.pubkey;
            foundation_api_default.a.publish(modalId, "close");
        }
    }, {
        key: "onShow",
        value: function onShow() {
            var _this3 = this;

            WalletUnlockActions["a" /* default */].unlock().then(function () {
                var private_key = WalletDb["a" /* default */].getPrivateKey(_this3.props.pubkey);
                _this3.setState({ wif: private_key.toWif() });
            });
        }
    }, {
        key: "onHide",
        value: function onHide() {
            this.setState({ wif: null });
        }
    }, {
        key: "showQrCode",
        value: function showQrCode() {
            this.refs.qrmodal.show();
        }
    }]);

    return PrivateKeyView;
}(react["Component"]);

PrivateKeyView_PrivateKeyView.propTypes = {
    pubkey: react_default.a.PropTypes.string.isRequired
};
/* harmony default export */ var components_PrivateKeyView = __webpack_exports__["a"] = (PrivateKeyView_PrivateKeyView);

/***/ }),

/***/ 1668:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 1669:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_translate_component__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_translate_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_translate_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_components_PrivateKeyView__ = __webpack_require__(1646);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_seerjs_es__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Icon_Icon__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_stores_PrivateKeyStore__ = __webpack_require__(82);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









/**
 * @brief Allows the user to enter a public key
 */

var PubKeyInput = function (_React$Component) {
    _inherits(PubKeyInput, _React$Component);

    function PubKeyInput(props) {
        _classCallCheck(this, PubKeyInput);

        return _possibleConstructorReturn(this, (PubKeyInput.__proto__ || Object.getPrototypeOf(PubKeyInput)).call(this, props));
    }

    _createClass(PubKeyInput, [{
        key: "isValidPubKey",
        value: function isValidPubKey(value) {
            return !!__WEBPACK_IMPORTED_MODULE_4_seerjs_es__["i" /* PublicKey */].fromPublicKeyString(value);
        }
    }, {
        key: "onInputChanged",
        value: function onInputChanged(event) {
            var value = event.target.value.trim();
            this.props.onChange(value);
        }
    }, {
        key: "onKeyDown",
        value: function onKeyDown(event) {
            if (event.keyCode === 13) this.onAction(event);
        }
    }, {
        key: "onAction",
        value: function onAction(event) {
            event.preventDefault();
            if (this.props.onAction && this.state.valid && !this.props.disableActionButton) {
                this.props.onAction(event);
            }
        }
    }, {
        key: "render",
        value: function render() {
            var error = this.props.error;
            if (!error && this.props.value && !this.isValidPubKey(this.props.value)) error = "Not a valid public key";
            var action_class = __WEBPACK_IMPORTED_MODULE_1_classnames___default()("button", { "disabled": error || this.props.disableActionButton });
            var keys = __WEBPACK_IMPORTED_MODULE_6_stores_PrivateKeyStore__["a" /* default */].getState().keys;
            var has_private = this.isValidPubKey(this.props.value) && keys.has(this.props.value);

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "pubkey-input no-overflow" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "content-area" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "header-area" },
                        !error && this.props.value && this.isValidPubKey(this.props.value) ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "label",
                            { className: "right-label" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_translate_component___default.a, { content: "account.perm.valid_pub" })
                        ) : null,
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_translate_component___default.a, { className: "left-label", component: "label", content: this.props.label })
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "input-area" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "span",
                            { className: "inline-label" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { className: "account-image" },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    __WEBPACK_IMPORTED_MODULE_3_components_PrivateKeyView__["a" /* default */],
                                    { pubkey: this.props.value },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__Icon_Icon__["a" /* default */], { name: "key", size: "4x" })
                                )
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "text",
                                className: has_private ? "my-key" : "",
                                value: this.props.value,
                                placeholder: this.props.placeholder || counterpart.translate("account.public_key"),
                                ref: "user_input",
                                onChange: this.onInputChanged.bind(this),
                                onKeyDown: this.onKeyDown.bind(this),
                                tabIndex: this.props.tabIndex
                            }),
                            this.props.onAction ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "button",
                                { className: action_class,
                                    onClick: this.onAction.bind(this) },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_translate_component___default.a, { content: this.props.action_label })
                            ) : null
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "error-area has-error" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "span",
                            null,
                            error
                        )
                    )
                )
            );
        }
    }]);

    return PubKeyInput;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

PubKeyInput.propTypes = {
    label: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.string.isRequired, // a translation key for the label
    value: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.string, // current value
    error: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.string, // the error message override
    placeholder: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.string, // the placeholder text to be displayed when there is no user_input
    onChange: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.func, // a method to be called any time user input changes
    onAction: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.func, // a method called when Add button is clicked
    tabIndex: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.number, // tabindex property to be passed to input tag
    disableActionButton: __WEBPACK_IMPORTED_MODULE_0_react___default.a.PropTypes.bool // use it if you need to disable action button
};

/* harmony default export */ __webpack_exports__["a"] = (PubKeyInput);

/***/ }),

/***/ 1939:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/react/react.js
var react = __webpack_require__(1);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/immutable/dist/immutable.js
var immutable = __webpack_require__(20);
var immutable_default = /*#__PURE__*/__webpack_require__.n(immutable);

// EXTERNAL MODULE: ./node_modules/react-translate-component/index.js
var react_translate_component = __webpack_require__(5);
var react_translate_component_default = /*#__PURE__*/__webpack_require__.n(react_translate_component);

// EXTERNAL MODULE: ./node_modules/counterpart/index.js
var counterpart = __webpack_require__(3);
var counterpart_default = /*#__PURE__*/__webpack_require__.n(counterpart);

// EXTERNAL MODULE: ./app/lib/common/utils.js
var utils = __webpack_require__(15);

// EXTERNAL MODULE: ./app/lib/common/account_utils.js
var account_utils = __webpack_require__(189);

// EXTERNAL MODULE: ./app/api/ApplicationApi.js
var ApplicationApi = __webpack_require__(187);

// EXTERNAL MODULE: ./node_modules/seerjs/es/index.js + 7 modules
var es = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/react-router/es/index.js + 32 modules
var react_router_es = __webpack_require__(34);

// EXTERNAL MODULE: ./app/components/Account/AccountSelector.jsx
var AccountSelector = __webpack_require__(281);

// EXTERNAL MODULE: ./app/components/Account/AccountImage.jsx + 1 modules
var AccountImage = __webpack_require__(287);

// EXTERNAL MODULE: ./app/components/Utility/ChainTypes.js
var ChainTypes = __webpack_require__(33);

// EXTERNAL MODULE: ./app/components/Utility/BindToChainState.jsx
var BindToChainState = __webpack_require__(32);

// EXTERNAL MODULE: ./app/components/Icon/Icon.jsx
var Icon = __webpack_require__(59);

// EXTERNAL MODULE: ./app/components/PrivateKeyView.jsx + 1 modules
var PrivateKeyView = __webpack_require__(1646);

// EXTERNAL MODULE: ./app/stores/AddressIndex.js
var AddressIndex = __webpack_require__(194);

// EXTERNAL MODULE: ./app/stores/PrivateKeyStore.js
var PrivateKeyStore = __webpack_require__(82);

// CONCATENATED MODULE: ./app/components/Account/AccountPermissionsList.jsx
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }















var AccountPermissionsList_AccountPermissionRow = function (_React$Component) {
    _inherits(AccountPermissionRow, _React$Component);

    function AccountPermissionRow() {
        _classCallCheck(this, AccountPermissionRow);

        return _possibleConstructorReturn(this, (AccountPermissionRow.__proto__ || Object.getPrototypeOf(AccountPermissionRow)).apply(this, arguments));
    }

    _createClass(AccountPermissionRow, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps) {
            return !utils["a" /* default */].are_equal_shallow(nextProps, this.props);
        }
    }, {
        key: "_lookUpPubKeyForAddress",
        value: function _lookUpPubKeyForAddress(address) {
            var addresses = AddressIndex["a" /* default */].getState().addresses;
            var pubkey = addresses.get(address);
            return pubkey;
        }
    }, {
        key: "render",
        value: function render() {
            var name = void 0,
                item_id = void 0,
                name_or_key = void 0;
            var suffix = "_accounts";
            var pubKey = this.props.pubkey;

            var keys = PrivateKeyStore["a" /* default */].getState().keys;

            var has_private = false;

            if (this.props.account) {
                name = this.props.account.get("name");
                item_id = this.props.account.get("id");
                name_or_key = react_default.a.createElement(
                    react_router_es["b" /* Link */],
                    { to: "/account/" + name + "/permissions" },
                    name
                );
            } else if (pubKey) {
                name = item_id = pubKey;
                name_or_key = react_default.a.createElement(
                    PrivateKeyView["a" /* default */],
                    { pubkey: pubKey },
                    pubKey
                );
                suffix = "_keys";
                has_private = keys.has(pubKey);
            } else if (this.props.address) {
                pubKey = this._lookUpPubKeyForAddress(this.props.address);
                item_id = this.props.address;
                name_or_key = !pubKey ? this.props.address : react_default.a.createElement(
                    PrivateKeyView["a" /* default */],
                    { pubkey: pubKey },
                    pubKey
                );
                suffix = "_addresses";
                has_private = keys.has(pubKey);
            }

            return react_default.a.createElement(
                "tr",
                { key: name },
                react_default.a.createElement(
                    "td",
                    null,
                    this.props.account ? react_default.a.createElement(AccountImage["a" /* default */], { size: { height: 30, width: 30 }, account: name }) : pubKey ? react_default.a.createElement(
                        "div",
                        { className: "account-image" },
                        react_default.a.createElement(
                            PrivateKeyView["a" /* default */],
                            { pubkey: pubKey },
                            react_default.a.createElement(Icon["a" /* default */], { name: "key", size: "4x" })
                        )
                    ) : null
                ),
                react_default.a.createElement(
                    "td",
                    { className: (has_private ? "my-key" : "") + " pub-key" },
                    name_or_key
                ),
                react_default.a.createElement(
                    "td",
                    null,
                    this.props.weights[item_id]
                ),
                react_default.a.createElement(
                    "td",
                    null,
                    react_default.a.createElement(
                        "button",
                        { className: "button", onClick: this.props.onRemoveItem.bind(this, item_id, suffix) },
                        react_default.a.createElement(react_translate_component_default.a, { content: "account.votes.remove_witness" })
                    )
                )
            );
        }
    }]);

    return AccountPermissionRow;
}(react_default.a.Component);

AccountPermissionsList_AccountPermissionRow.propTypes = {
    account: react_default.a.PropTypes.object,
    pubkey: react_default.a.PropTypes.string,
    address: react_default.a.PropTypes.string,
    onRemoveItem: react_default.a.PropTypes.func.isRequired,
    weights: react_default.a.PropTypes.object
};

var AccountPermissionsList_AccountPermissionsList = function (_React$Component2) {
    _inherits(AccountPermissionsList, _React$Component2);

    function AccountPermissionsList(props) {
        _classCallCheck(this, AccountPermissionsList);

        var _this2 = _possibleConstructorReturn(this, (AccountPermissionsList.__proto__ || Object.getPrototypeOf(AccountPermissionsList)).call(this, props));

        _this2.state = {
            selected_item: null,
            item_name_input: "",
            weight_input: "",
            error: null
        };
        _this2.onItemChange = _this2.onItemChange.bind(_this2);
        _this2.onItemAccountChange = _this2.onItemAccountChange.bind(_this2);
        _this2.onAddItem = _this2.onAddItem.bind(_this2);
        return _this2;
    }

    _createClass(AccountPermissionsList, [{
        key: "onItemChange",
        value: function onItemChange(item_name_input) {
            this.setState({ item_name_input: item_name_input });
        }
    }, {
        key: "onItemAccountChange",
        value: function onItemAccountChange(selected_item) {
            var _this3 = this;

            this.setState({ selected_item: selected_item, error: null });
            if (selected_item && this.props.validateAccount) {
                var res = this.props.validateAccount(selected_item);
                if (res === null) return;
                if (typeof res === "string") this.setState({ error: res });else res.then(function (error) {
                    return _this3.setState({ error: error });
                });
            }
        }
    }, {
        key: "onWeightChanged",
        value: function onWeightChanged(event) {
            var value = event.target.value.trim();
            this.setState({ weight_input: parseInt(value) });
        }
    }, {
        key: "onAddItem",
        value: function onAddItem(item) {
            if (!item) return;
            var next_state = {
                selected_item: null,
                item_name_input: "",
                weight_input: "",
                error: null
            };
            this.setState(next_state);
            var item_value = typeof item === "string" ? item : item.get("id");
            this.props.onAddItem(item_value, this.state.weight_input);
        }
    }, {
        key: "onWeightKeyDown",
        value: function onWeightKeyDown(event) {
            if (event.keyCode === 13 && this.state.weight_input && this.state.selected_item) this.onAddItem(this.state.selected_item);
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            var key = 0;
            var account_rows = this.props.accounts.filter(function (i) {
                if (!i) return false;
                //if (this.state.item_name_input) return i.get("name").indexOf(this.state.item_name_input) !== -1;
                return true;
            }).sort(function (a, b) {
                if (a.get("name") > b.get("name")) return 1;else if (a.get("name") < b.get("name")) return -1;
                return 0;
            }).map(function (i) {
                return react_default.a.createElement(AccountPermissionsList_AccountPermissionRow, { key: key++, account: i, weights: _this4.props.weights, onRemoveItem: _this4.props.onRemoveItem });
            });

            var key_rows = this.props.keys.map(function (k) {
                return react_default.a.createElement(AccountPermissionsList_AccountPermissionRow, { key: key++, pubkey: k, weights: _this4.props.weights, onRemoveItem: _this4.props.onRemoveItem });
            });

            var address_rows = this.props.addresses.map(function (k) {
                return react_default.a.createElement(AccountPermissionsList_AccountPermissionRow, { key: key++, address: k, weights: _this4.props.weights, onRemoveItem: _this4.props.onRemoveItem });
            });

            var error = this.state.error;
            if (!error && this.state.selected_item && this.props.accounts.indexOf(this.state.selected_item) !== -1) error = counterpart_default.a.translate("account.perm.warning3");
            if (!error && this.state.item_name_input && this.props.keys.indexOf(this.state.item_name_input) !== -1) error = counterpart_default.a.translate("account.perm.warning4");

            var cw = ["10%", "70%", "30%", "10%"];

            return react_default.a.createElement(
                "div",
                null,
                react_default.a.createElement(
                    AccountSelector["a" /* default */],
                    {
                        label: this.props.label,
                        error: error,
                        placeholder: this.props.placeholder,
                        account: this.state.item_name_input,
                        accountName: this.state.item_name_input,
                        onChange: this.onItemChange,
                        onAccountChanged: this.onItemAccountChange,
                        onAction: this.onAddItem,
                        action_label: "account.votes.add_witness",
                        tabIndex: this.props.tabIndex,
                        allowPubKey: true,
                        disableActionButton: !this.state.weight_input,
                        allowUppercase: true
                    },
                    react_default.a.createElement("input", { value: this.state.weight_input,
                        onChange: this.onWeightChanged.bind(this),
                        className: "weight-input",
                        type: "number",
                        autoComplete: "off",
                        placeholder: counterpart_default.a.translate("account.perm.weight"),
                        onKeyDown: this.onWeightKeyDown.bind(this),
                        tabIndex: this.props.tabIndex + 1
                    })
                ),
                react_default.a.createElement(
                    "div",
                    { style: { paddingTop: "2rem" } },
                    react_default.a.createElement(
                        "table",
                        { className: "table" },
                        react_default.a.createElement(
                            "thead",
                            null,
                            react_default.a.createElement(
                                "tr",
                                null,
                                react_default.a.createElement("th", { style: { width: cw[0] } }),
                                react_default.a.createElement(
                                    "th",
                                    { style: { width: cw[1] } },
                                    react_default.a.createElement(react_translate_component_default.a, { content: "account.perm.acct_or_key" })
                                ),
                                react_default.a.createElement(
                                    "th",
                                    { style: { width: cw[2] } },
                                    react_default.a.createElement(react_translate_component_default.a, { content: "account.perm.weight" })
                                ),
                                react_default.a.createElement(
                                    "th",
                                    { style: { width: cw[3] } },
                                    react_default.a.createElement(react_translate_component_default.a, { content: "account.perm.action" })
                                )
                            )
                        ),
                        react_default.a.createElement(
                            "tbody",
                            null,
                            account_rows,
                            key_rows,
                            address_rows
                        )
                    )
                )
            );
        }
    }]);

    return AccountPermissionsList;
}(react_default.a.Component);

AccountPermissionsList_AccountPermissionsList.propTypes = {
    accounts: ChainTypes["a" /* default */].ChainObjectsList,
    onAddItem: react_default.a.PropTypes.func.isRequired,
    onRemoveItem: react_default.a.PropTypes.func.isRequired,
    validateAccount: react_default.a.PropTypes.func,
    label: react_default.a.PropTypes.string.isRequired, // a translation key for the label,
    placeholder: react_default.a.PropTypes.string, // the placeholder text to be displayed when there is no user_input
    tabIndex: react_default.a.PropTypes.number, // tabindex property to be passed to input tag
    weights: react_default.a.PropTypes.object // weights: hash of {account id -> weight}
};


/* harmony default export */ var Account_AccountPermissionsList = (Object(BindToChainState["a" /* default */])(AccountPermissionsList_AccountPermissionsList, { keep_updating: true }));
// EXTERNAL MODULE: ./app/components/Forms/PasswordInput.jsx
var PasswordInput = __webpack_require__(707);

// EXTERNAL MODULE: ./app/stores/WalletDb.js
var WalletDb = __webpack_require__(26);

// CONCATENATED MODULE: ./app/components/Account/AccountPermissionsMigrate.jsx
var AccountPermissionsMigrate__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function AccountPermissionsMigrate__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function AccountPermissionsMigrate__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function AccountPermissionsMigrate__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var AccountPermissionsMigrate_AccountPermissionsMigrate = function (_React$Component) {
    AccountPermissionsMigrate__inherits(AccountPermissionsMigrate, _React$Component);

    function AccountPermissionsMigrate() {
        AccountPermissionsMigrate__classCallCheck(this, AccountPermissionsMigrate);

        var _this = AccountPermissionsMigrate__possibleConstructorReturn(this, (AccountPermissionsMigrate.__proto__ || Object.getPrototypeOf(AccountPermissionsMigrate)).call(this));

        _this.state = {
            validPassword: false,
            pass: null,
            generatedPassword: "P" + es["o" /* key */].get_random_key().toWif().toString()
        };
        return _this;
    }

    AccountPermissionsMigrate__createClass(AccountPermissionsMigrate, [{
        key: "onSubmit",
        value: function onSubmit() {}
    }, {
        key: "onPasswordChange",
        value: function onPasswordChange(e) {
            var valid = e.valid;

            var name = this.props.account.get("name");

            var active = !valid ? null : WalletDb["a" /* default */].generateKeyFromPassword(name, "active", e.value).pubKey;
            var owner = !valid ? null : WalletDb["a" /* default */].generateKeyFromPassword(name, "owner", e.value).pubKey;
            var memo = !valid ? null : WalletDb["a" /* default */].generateKeyFromPassword(name, "active", e.value).pubKey;
            this.setState({ validPassword: e.valid, pass: e.value });
            this.props.onSetPasswordKeys({ active: active, owner: owner, memo: memo });
        }
    }, {
        key: "checkKeyUse",
        value: function checkKeyUse(key, role) {
            if (!key) return false;
            if (role === "memo") {
                return key === this.props.memoKey;
            } else {
                return this.props[role + "Keys"].reduce(function (a, b) {
                    return b === key || a;
                }, false);
            }
        }
    }, {
        key: "_onUseKey",
        value: function _onUseKey(role) {
            var remove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (remove) {
                this.props[role === "active" ? "onRemoveActive" : "onRemoveOwner"](this.props[role], "_keys");
            } else if (this.props[role]) {
                var weights = {
                    active: this.props.account.getIn(["active", "weight_threshold"]),
                    owner: this.props.account.getIn(["owner", "weight_threshold"])
                };
                console.log("key", this.props[role], "weights", weights, "weight of role:", weights[role]);
                this.props[role === "active" ? "onAddActive" : role === "owner" ? "onAddOwner" : "onSetMemo"](this.props[role], weights[role]);
            }
        }
    }, {
        key: "render",
        value: function render() {
            var activeInUse = this.checkKeyUse(this.props.active && this.props.active, "active");
            var ownerInUse = this.checkKeyUse(this.props.owner && this.props.owner, "owner");
            var memoInUse = this.checkKeyUse(this.props.memo && this.props.memo, "memo");

            var useText = counterpart_default.a.translate("account.perm.use_text");
            var removeText = counterpart_default.a.translate("account.perm.remove_text");

            return react_default.a.createElement(
                "div",
                null,
                react_default.a.createElement(
                    "p",
                    { style: { maxWidth: "800px" } },
                    react_default.a.createElement(react_translate_component_default.a, { content: "account.perm.password_model_1" })
                ),
                react_default.a.createElement(
                    "p",
                    { style: { maxWidth: "800px" } },
                    react_default.a.createElement(react_translate_component_default.a, { content: "wallet.password_model_1" })
                ),
                react_default.a.createElement(
                    "p",
                    { style: { maxWidth: "800px" } },
                    react_default.a.createElement(react_translate_component_default.a, { unsafe: true, content: "wallet.password_model_2" })
                ),
                react_default.a.createElement("div", { className: "divider" }),
                react_default.a.createElement(
                    "form",
                    {
                        style: { maxWidth: "40rem" },
                        onSubmit: this.onSubmit.bind(this),
                        noValidate: true
                    },
                    react_default.a.createElement(
                        "label",
                        { className: "left-label" },
                        react_default.a.createElement(react_translate_component_default.a, { content: "wallet.generated" })
                    ),
                    react_default.a.createElement(
                        "p",
                        null,
                        this.state.generatedPassword
                    ),
                    react_default.a.createElement(
                        "p",
                        { style: { fontWeight: "bold" } },
                        react_default.a.createElement(react_translate_component_default.a, { content: "account.perm.password_model_2" })
                    ),
                    react_default.a.createElement(PasswordInput["a" /* default */], {
                        ref: "password",
                        confirmation: true,
                        onChange: this.onPasswordChange.bind(this),
                        noLabel: true,
                        passwordLength: 12,
                        checkStrength: true
                    })
                ),
                react_default.a.createElement(
                    "table",
                    { className: "table" },
                    react_default.a.createElement(
                        "tbody",
                        null,
                        react_default.a.createElement(
                            "tr",
                            { className: activeInUse ? "in-use" : "" },
                            react_default.a.createElement(
                                "td",
                                null,
                                react_default.a.createElement(react_translate_component_default.a, { content: "account.perm.new_active" }),
                                ":"
                            ),
                            react_default.a.createElement(
                                "td",
                                null,
                                this.props.active
                            ),
                            react_default.a.createElement(
                                "td",
                                { className: "text-right" },
                                react_default.a.createElement(
                                    "div",
                                    { className: "button", onClick: this._onUseKey.bind(this, "active", activeInUse) },
                                    activeInUse ? removeText : useText
                                )
                            )
                        ),
                        react_default.a.createElement(
                            "tr",
                            { className: ownerInUse ? "in-use" : "" },
                            react_default.a.createElement(
                                "td",
                                null,
                                react_default.a.createElement(react_translate_component_default.a, { content: "account.perm.new_owner" }),
                                ":"
                            ),
                            react_default.a.createElement(
                                "td",
                                null,
                                this.props.owner
                            ),
                            react_default.a.createElement(
                                "td",
                                { className: "text-right" },
                                react_default.a.createElement(
                                    "div",
                                    { className: "button", onClick: this._onUseKey.bind(this, "owner", ownerInUse) },
                                    ownerInUse ? removeText : useText
                                )
                            )
                        ),
                        react_default.a.createElement(
                            "tr",
                            { className: memoInUse ? "in-use" : "" },
                            react_default.a.createElement(
                                "td",
                                null,
                                react_default.a.createElement(react_translate_component_default.a, { content: "account.perm.new_memo" }),
                                ":"
                            ),
                            react_default.a.createElement(
                                "td",
                                null,
                                this.props.memo
                            ),
                            react_default.a.createElement(
                                "td",
                                { className: "text-right" },
                                react_default.a.createElement(
                                    "div",
                                    { className: "button", style: { visibility: memoInUse ? "hidden" : "" }, onClick: this._onUseKey.bind(this, "memo", memoInUse) },
                                    useText
                                )
                            )
                        )
                    )
                ),
                memoInUse ? react_default.a.createElement(
                    "p",
                    { style: { maxWidth: "800px", paddingTop: 10 }, className: "has-error" },
                    react_default.a.createElement(react_translate_component_default.a, { content: "account.perm.memo_warning" })
                ) : null
            );
        }
    }]);

    return AccountPermissionsMigrate;
}(react_default.a.Component);

/* harmony default export */ var Account_AccountPermissionsMigrate = (AccountPermissionsMigrate_AccountPermissionsMigrate);
// EXTERNAL MODULE: ./app/components/Forms/PubKeyInput.jsx
var PubKeyInput = __webpack_require__(1669);

// EXTERNAL MODULE: ./app/components/Utility/Tabs.jsx
var Tabs = __webpack_require__(1541);

// EXTERNAL MODULE: ./app/components/Utility/HelpContent.jsx
var HelpContent = __webpack_require__(691);

// EXTERNAL MODULE: ./app/components/Account/RecentTransactions.jsx
var RecentTransactions = __webpack_require__(1583);

// EXTERNAL MODULE: ./app/actions/NotificationActions.js
var NotificationActions = __webpack_require__(46);

// CONCATENATED MODULE: ./app/components/Account/AccountPermissions.jsx
var AccountPermissions__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function AccountPermissions__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function AccountPermissions__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function AccountPermissions__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

















var AccountPermissions_AccountPermissions = function (_React$Component) {
    AccountPermissions__inherits(AccountPermissions, _React$Component);

    function AccountPermissions(props) {
        AccountPermissions__classCallCheck(this, AccountPermissions);

        var _this = AccountPermissions__possibleConstructorReturn(this, (AccountPermissions.__proto__ || Object.getPrototypeOf(AccountPermissions)).call(this, props));

        _this.state = {};
        _this.onPublish = _this.onPublish.bind(_this);
        _this.onReset = _this.onReset.bind(_this);
        return _this;
    }

    AccountPermissions__createClass(AccountPermissions, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.updateAccountData(this.props.account);
            account_utils["a" /* default */].getFinalFeeAsset(this.props.account, "account_update");
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.account !== this.props.account) this.updateAccountData(nextProps.account);
        }
    }, {
        key: "permissionsFromImmutableObj",
        value: function permissionsFromImmutableObj(auths) {
            var threshold = auths.get("weight_threshold");
            var account_auths = auths.get("account_auths");
            var key_auths = auths.get("key_auths");
            var address_auths = auths.get("address_auths");

            var accounts = account_auths.map(function (a) {
                return a.get(0);
            });
            var keys = key_auths.map(function (a) {
                return a.get(0);
            });
            var addresses = address_auths.map(function (a) {
                return a.get(0);
            });

            var weights = account_auths.reduce(function (res, a) {
                res[a.get(0)] = a.get(1);return res;
            }, {});
            weights = key_auths.reduce(function (res, a) {
                res[a.get(0)] = a.get(1);return res;
            }, weights);
            weights = address_auths.reduce(function (res, a) {
                res[a.get(0)] = a.get(1);return res;
            }, weights);

            return { threshold: threshold, accounts: accounts, keys: keys, addresses: addresses, weights: weights };
        }
    }, {
        key: "permissionsToJson",
        value: function permissionsToJson(threshold, accounts, keys, addresses, weights) {
            var res = { weight_threshold: threshold };
            res["account_auths"] = accounts.sort(utils["a" /* default */].sortID).map(function (a) {
                return [a, weights[a]];
            }).toJS();
            res["key_auths"] = keys.sort(utils["a" /* default */].sortID).map(function (a) {
                return [a, weights[a]];
            }).toJS();
            res["address_auths"] = addresses.sort(utils["a" /* default */].sortID).map(function (a) {
                return [a, weights[a]];
            }).toJS();
            return res;
        }
    }, {
        key: "updateAccountData",
        value: function updateAccountData(account) {
            var active = this.permissionsFromImmutableObj(account.get("active"));
            var owner = this.permissionsFromImmutableObj(account.get("owner"));
            var memo_key = account.get("options").get("memo_key");
            var state = {
                active_accounts: active.accounts,
                active_keys: active.keys,
                active_addresses: active.addresses,
                owner_accounts: owner.accounts,
                owner_keys: owner.keys,
                owner_addresses: owner.addresses,
                active_weights: active.weights,
                owner_weights: owner.weights,
                active_threshold: active.threshold,
                owner_threshold: owner.threshold,
                memo_key: memo_key,
                prev_active_accounts: active.accounts,
                prev_active_keys: active.keys,
                prev_active_addresses: active.addresses,
                prev_owner_accounts: owner.accounts,
                prev_owner_keys: owner.keys,
                prev_owner_addresses: owner.addresses,
                prev_active_weights: active.weights,
                prev_owner_weights: owner.weights,
                prev_active_threshold: active.threshold,
                prev_owner_threshold: owner.threshold,
                prev_memo_key: memo_key
            };
            this.setState(state);
        }
    }, {
        key: "isChanged",
        value: function isChanged() {
            var s = this.state;
            return s.active_accounts !== s.prev_active_accounts || s.active_keys !== s.prev_active_keys || s.active_addresses !== s.prev_active_addresses || s.owner_accounts !== s.prev_owner_accounts || s.owner_keys !== s.prev_owner_keys || s.owner_addresses !== s.prev_owner_addresses || s.active_threshold !== s.prev_active_threshold || s.owner_threshold !== s.prev_owner_threshold || s.memo_key !== s.prev_memo_key;
        }
    }, {
        key: "didChange",
        value: function didChange(type) {
            var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state;

            if (type === "memo") {
                return s.memo_key !== s.prev_memo_key;
            }
            var didChange = false;
            ["_keys", "_active_addresses", "_accounts", "_threshold"].forEach(function (key) {
                var current = type + key;
                if (s[current] !== s["prev_" + current]) {
                    didChange = true;
                }
            });
            return didChange;
        }
    }, {
        key: "onPublish",
        value: function onPublish() {
            var s = this.state;
            var updated_account = this.props.account.toJS();

            // Set fee asset
            updated_account.fee = {
                amount: 0,
                asset_id: account_utils["a" /* default */].getFinalFeeAsset(updated_account.id, "account_update")
            };

            var updateObject = {
                account: updated_account.id
            };

            if (this.didChange("active")) {
                updateObject.active = this.permissionsToJson(s.active_threshold, s.active_accounts, s.active_keys, s.active_addresses, s.active_weights);
            }
            if (this.didChange("owner")) {
                updateObject.owner = this.permissionsToJson(s.owner_threshold, s.owner_accounts, s.owner_keys, s.owner_addresses, s.owner_weights);
            }
            if (this.didChange("owner") && s.owner_keys.size === 0 && s.owner_addresses.size === 0 && s.owner_accounts.size === 1 && s.owner_accounts.first() === updated_account.id) {
                return NotificationActions["a" /* default */].addNotification({
                    message: "Setting your owner permissions like this will render your account permanently unusable. Please make sure you know what you're doing before modifying account authorities!",
                    level: "error",
                    autoDismiss: 10
                });
            }
            if (s.memo_key && this.didChange("memo") && this.isValidPubKey(s.memo_key)) {
                updateObject.new_options = this.props.account.get("options").toJS();
                updateObject.new_options.memo_key = s.memo_key;
            }

            // console.log("-- AccountPermissions.onPublish -->", updateObject, s.memo_key);
            ApplicationApi["a" /* default */].updateAccount(updateObject);
        }
    }, {
        key: "isValidPubKey",
        value: function isValidPubKey(value) {
            return !!es["i" /* PublicKey */].fromPublicKeyString(value);
        }
    }, {
        key: "onReset",
        value: function onReset() {
            var s = this.state;
            this.setState({
                active_accounts: s.prev_active_accounts,
                active_keys: s.prev_active_keys,
                active_addresses: s.prev_active_addresses,
                owner_accounts: s.prev_owner_accounts,
                owner_keys: s.prev_owner_keys,
                owner_addresses: s.prev_owner_addresses,
                active_weights: s.prev_active_weights,
                owner_weights: s.prev_owner_weights,
                active_threshold: s.prev_active_threshold,
                owner_threshold: s.prev_owner_threshold,
                memo_key: s.prev_memo_key
            });
        }
    }, {
        key: "onAddItem",
        value: function onAddItem(collection, item_value, weight) {
            var state = {};
            var list = collection + (utils["a" /* default */].is_object_id(item_value) ? "_accounts" : "_keys");
            state[list] = this.state[list].push(item_value);
            this.state[collection + "_weights"][item_value] = weight;
            this.setState(state);
        }
    }, {
        key: "onRemoveItem",
        value: function onRemoveItem(collection, item_value, listSuffix) {
            console.log("onRemoveItem", collection, item_value, listSuffix);
            var state = {};
            var list = collection + listSuffix;

            state[list] = this.state[list].filter(function (i) {
                return i !== item_value;
            });
            this.setState(state);
        }
    }, {
        key: "onThresholdChanged",
        value: function onThresholdChanged(var_name, event) {
            var value = parseInt(event.target.value.trim());
            var state = {};
            state[var_name] = value;
            this.setState(state);
        }
    }, {
        key: "validateAccount",
        value: function validateAccount(collection, account) {
            return null;
        }
    }, {
        key: "sumUpWeights",
        value: function sumUpWeights(accounts, keys, addresses, weights) {
            var sum = accounts.reduce(function (sum, a) {
                return sum + weights[a];
            }, 0);
            sum = keys.reduce(function (sum, a) {
                return sum + weights[a];
            }, sum);
            return addresses.reduce(function (sum, a) {
                return sum + weights[a];
            }, sum);
        }
    }, {
        key: "onMemoKeyChanged",
        value: function onMemoKeyChanged(memo_key) {
            this.setState({ memo_key: memo_key });
        }
    }, {
        key: "onSetPasswordKeys",
        value: function onSetPasswordKeys(keys) {
            var roles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ["active", "owner", "memo"];

            var newState = {};

            roles.forEach(function (role) {
                newState["password_" + role] = keys[role];
            });

            this.setState(newState);
        }
    }, {
        key: "render",
        value: function render() {
            var error1 = void 0,
                error2 = void 0;

            var _state = this.state,
                active_accounts = _state.active_accounts,
                active_keys = _state.active_keys,
                active_addresses = _state.active_addresses,
                active_weights = _state.active_weights;
            var _state2 = this.state,
                owner_accounts = _state2.owner_accounts,
                owner_keys = _state2.owner_keys,
                owner_addresses = _state2.owner_addresses,
                owner_weights = _state2.owner_weights;


            var threshold = this.state.active_threshold > 0 ? this.state.active_threshold : 0;
            var weights_total = this.sumUpWeights(active_accounts, active_keys, active_addresses, active_weights);
            if (this.didChange("active") && weights_total < threshold) error1 = counterpart_default.a.translate("account.perm.warning1", { weights_total: weights_total, threshold: threshold });

            threshold = this.state.owner_threshold > 0 ? this.state.owner_threshold : 0;
            weights_total = this.sumUpWeights(owner_accounts, owner_keys, owner_addresses, owner_weights);
            if (this.didChange("owner") && weights_total < threshold) error2 = counterpart_default.a.translate("account.perm.warning2", { weights_total: weights_total, threshold: threshold });

            var publish_buttons_class = "button" + (!(error1 || error2) && this.isChanged() && this.isValidPubKey(this.state.memo_key) ? "" : " disabled");
            var reset_buttons_class = "button" + (this.isChanged() ? "" : " disabled");

            var accountsList = immutable_default.a.Set();
            accountsList = accountsList.add(this.props.account.get("id"));

            return react_default.a.createElement(
                "div",
                { className: "grid-content app-tables no-padding", ref: "appTables" },
                react_default.a.createElement(
                    "div",
                    { className: "content-block small-12" },
                    react_default.a.createElement(
                        "div",
                        { className: "tabs-container generic-bordered-box" },
                        react_default.a.createElement(
                            Tabs["b" /* Tabs */],
                            {
                                defaultActiveTab: 1,
                                segmented: false,
                                setting: "permissionsTab",
                                className: "account-tabs",
                                tabsClass: "account-overview bordered-header content-block",
                                contentClass: "padding",
                                actionButtons: react_default.a.createElement(
                                    "div",
                                    { className: "action-buttons" },
                                    react_default.a.createElement(
                                        "button",
                                        { className: reset_buttons_class, onClick: this.onReset, tabIndex: 8 },
                                        react_default.a.createElement(react_translate_component_default.a, { content: "account.perm.reset" })
                                    ),
                                    react_default.a.createElement(
                                        "button",
                                        { className: publish_buttons_class, onClick: this.onPublish, tabIndex: 9 },
                                        react_default.a.createElement(react_translate_component_default.a, { content: "account.perm.publish" })
                                    )
                                )
                            },
                            react_default.a.createElement(
                                Tabs["a" /* Tab */],
                                { title: "account.perm.active" },
                                react_default.a.createElement(HelpContent["a" /* default */], { path: "components/AccountPermActive" }),
                                react_default.a.createElement(
                                    "form",
                                    { className: "threshold" },
                                    react_default.a.createElement(
                                        "label",
                                        { className: "horizontal" },
                                        react_default.a.createElement(react_translate_component_default.a, { content: "account.perm.threshold" }),
                                        " \xA0 \xA0",
                                        react_default.a.createElement("input", { type: "number", placeholder: "0", size: "5",
                                            value: this.state.active_threshold,
                                            onChange: this.onThresholdChanged.bind(this, "active_threshold"),
                                            autoComplete: "off",
                                            tabIndex: 1 })
                                    )
                                ),
                                react_default.a.createElement(Account_AccountPermissionsList, {
                                    label: "account.perm.add_permission_label",
                                    accounts: active_accounts,
                                    keys: active_keys,
                                    weights: active_weights,
                                    addresses: active_addresses,
                                    validateAccount: this.validateAccount.bind(this, "active"),
                                    onAddItem: this.onAddItem.bind(this, "active"),
                                    onRemoveItem: this.onRemoveItem.bind(this, "active"),
                                    placeholder: counterpart_default.a.translate("account.perm.account_name_or_key"),
                                    tabIndex: 2
                                }),
                                react_default.a.createElement("br", null),
                                error1 ? react_default.a.createElement(
                                    "div",
                                    { className: "content-block has-error" },
                                    error1
                                ) : null
                            ),
                            react_default.a.createElement(
                                Tabs["a" /* Tab */],
                                { title: "account.perm.owner" },
                                react_default.a.createElement(HelpContent["a" /* default */], { path: "components/AccountPermOwner" }),
                                react_default.a.createElement(
                                    "form",
                                    { className: "threshold" },
                                    react_default.a.createElement(
                                        "label",
                                        { className: "horizontal" },
                                        react_default.a.createElement(react_translate_component_default.a, { content: "account.perm.threshold" }),
                                        " \xA0 \xA0",
                                        react_default.a.createElement("input", { type: "number", placeholder: "0", size: "5",
                                            value: this.state.owner_threshold,
                                            onChange: this.onThresholdChanged.bind(this, "owner_threshold"),
                                            autoComplete: "off",
                                            tabIndex: 4 })
                                    )
                                ),
                                react_default.a.createElement(Account_AccountPermissionsList, {
                                    label: "account.perm.add_permission_label",
                                    accounts: owner_accounts,
                                    keys: owner_keys,
                                    weights: owner_weights,
                                    addresses: owner_addresses,
                                    validateAccount: this.validateAccount.bind(this, "owner"),
                                    onAddItem: this.onAddItem.bind(this, "owner"),
                                    onRemoveItem: this.onRemoveItem.bind(this, "owner"),
                                    placeholder: counterpart_default.a.translate("account.perm.account_name_or_key"),
                                    tabIndex: 5
                                }),
                                react_default.a.createElement("br", null),
                                error2 ? react_default.a.createElement(
                                    "div",
                                    { className: "content-block has-error" },
                                    error2
                                ) : null
                            ),
                            react_default.a.createElement(
                                Tabs["a" /* Tab */],
                                { title: "account.perm.memo_key" },
                                react_default.a.createElement(HelpContent["a" /* default */], { style: { maxWidth: "800px" }, path: "components/AccountPermMemo" }),
                                react_default.a.createElement(PubKeyInput["a" /* default */], {
                                    ref: "memo_key",
                                    value: this.state.memo_key,
                                    label: "account.perm.memo_public_key",
                                    placeholder: "Public Key",
                                    onChange: this.onMemoKeyChanged.bind(this),
                                    tabIndex: 7
                                })
                            ),
                            react_default.a.createElement(
                                Tabs["a" /* Tab */],
                                { title: "account.perm.password_model" },
                                react_default.a.createElement(Account_AccountPermissionsMigrate, {
                                    active: this.state.password_active,
                                    owner: this.state.password_owner,
                                    memo: this.state.password_memo,
                                    onSetPasswordKeys: this.onSetPasswordKeys.bind(this),
                                    account: this.props.account,
                                    activeKeys: this.state.active_keys,
                                    ownerKeys: this.state.owner_keys,
                                    memoKey: this.state.memo_key,
                                    onAddActive: this.onAddItem.bind(this, "active"),
                                    onRemoveActive: this.onRemoveItem.bind(this, "active"),
                                    onAddOwner: this.onAddItem.bind(this, "owner"),
                                    onRemoveOwner: this.onRemoveItem.bind(this, "owner"),
                                    onSetMemo: this.onMemoKeyChanged.bind(this)
                                })
                            )
                        ),
                        react_default.a.createElement(
                            "div",
                            { className: "tab-content", style: { padding: 10 } },
                            react_default.a.createElement("div", { className: "divider" }),
                            react_default.a.createElement(RecentTransactions["a" /* RecentTransactions */], {
                                accountsList: accountsList,
                                limit: 25,
                                compactView: false,
                                filter: "account_update",
                                style: { paddingBottom: "2rem" }
                            })
                        )
                    )
                )
            );
        }
    }]);

    return AccountPermissions;
}(react_default.a.Component);

/* harmony default export */ var Account_AccountPermissions = __webpack_exports__["default"] = (AccountPermissions_AccountPermissions);

/***/ })

});
//# sourceMappingURL=13.js.map