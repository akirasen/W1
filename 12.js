webpackJsonp([12,42],{

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

/***/ 1643:
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory(__webpack_require__(1), __webpack_require__(1656));
	else if(typeof define === 'function' && define.amd)
		define(["react", "highcharts/highstock"], factory);
	else if(typeof exports === 'object')
		exports["ReactHighstock"] = factory(require("react"), require("highcharts/highstock"));
	else
		root["ReactHighstock"] = factory(root["React"], root["Highcharts"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_23__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyFunction = __webpack_require__(2);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  (function () {
    var printWarning = function printWarning(format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning = function warning(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  })();
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _assign = __webpack_require__(9);

var emptyObject = __webpack_require__(8);
var _invariant = __webpack_require__(1);

if (process.env.NODE_ENV !== 'production') {
  var warning = __webpack_require__(3);
}

var MIXINS_KEY = 'mixins';

// Helper function to allow the creation of anonymous functions which do not
// have .name set to the name of the variable being assigned to.
function identity(fn) {
  return fn;
}

var ReactPropTypeLocationNames;
if (process.env.NODE_ENV !== 'production') {
  ReactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context',
  };
} else {
  ReactPropTypeLocationNames = {};
}

function factory(ReactComponent, isValidElement, ReactNoopUpdateQueue) {
  /**
   * Policies that describe methods in `ReactClassInterface`.
   */


  var injectedMixins = [];

  /**
   * Composite components are higher-level components that compose other composite
   * or host components.
   *
   * To create a new type of `ReactClass`, pass a specification of
   * your new class to `React.createClass`. The only requirement of your class
   * specification is that you implement a `render` method.
   *
   *   var MyComponent = React.createClass({
   *     render: function() {
   *       return <div>Hello World</div>;
   *     }
   *   });
   *
   * The class specification supports a specific protocol of methods that have
   * special meaning (e.g. `render`). See `ReactClassInterface` for
   * more the comprehensive protocol. Any other properties and methods in the
   * class specification will be available on the prototype.
   *
   * @interface ReactClassInterface
   * @internal
   */
  var ReactClassInterface = {

    /**
     * An array of Mixin objects to include when defining your component.
     *
     * @type {array}
     * @optional
     */
    mixins: 'DEFINE_MANY',

    /**
     * An object containing properties and methods that should be defined on
     * the component's constructor instead of its prototype (static methods).
     *
     * @type {object}
     * @optional
     */
    statics: 'DEFINE_MANY',

    /**
     * Definition of prop types for this component.
     *
     * @type {object}
     * @optional
     */
    propTypes: 'DEFINE_MANY',

    /**
     * Definition of context types for this component.
     *
     * @type {object}
     * @optional
     */
    contextTypes: 'DEFINE_MANY',

    /**
     * Definition of context types this component sets for its children.
     *
     * @type {object}
     * @optional
     */
    childContextTypes: 'DEFINE_MANY',

    // ==== Definition methods ====

    /**
     * Invoked when the component is mounted. Values in the mapping will be set on
     * `this.props` if that prop is not specified (i.e. using an `in` check).
     *
     * This method is invoked before `getInitialState` and therefore cannot rely
     * on `this.state` or use `this.setState`.
     *
     * @return {object}
     * @optional
     */
    getDefaultProps: 'DEFINE_MANY_MERGED',

    /**
     * Invoked once before the component is mounted. The return value will be used
     * as the initial value of `this.state`.
     *
     *   getInitialState: function() {
     *     return {
     *       isOn: false,
     *       fooBaz: new BazFoo()
     *     }
     *   }
     *
     * @return {object}
     * @optional
     */
    getInitialState: 'DEFINE_MANY_MERGED',

    /**
     * @return {object}
     * @optional
     */
    getChildContext: 'DEFINE_MANY_MERGED',

    /**
     * Uses props from `this.props` and state from `this.state` to render the
     * structure of the component.
     *
     * No guarantees are made about when or how often this method is invoked, so
     * it must not have side effects.
     *
     *   render: function() {
     *     var name = this.props.name;
     *     return <div>Hello, {name}!</div>;
     *   }
     *
     * @return {ReactComponent}
     * @nosideeffects
     * @required
     */
    render: 'DEFINE_ONCE',

    // ==== Delegate methods ====

    /**
     * Invoked when the component is initially created and about to be mounted.
     * This may have side effects, but any external subscriptions or data created
     * by this method must be cleaned up in `componentWillUnmount`.
     *
     * @optional
     */
    componentWillMount: 'DEFINE_MANY',

    /**
     * Invoked when the component has been mounted and has a DOM representation.
     * However, there is no guarantee that the DOM node is in the document.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been mounted (initialized and rendered) for the first time.
     *
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidMount: 'DEFINE_MANY',

    /**
     * Invoked before the component receives new props.
     *
     * Use this as an opportunity to react to a prop transition by updating the
     * state using `this.setState`. Current props are accessed via `this.props`.
     *
     *   componentWillReceiveProps: function(nextProps, nextContext) {
     *     this.setState({
     *       likesIncreasing: nextProps.likeCount > this.props.likeCount
     *     });
     *   }
     *
     * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
     * transition may cause a state change, but the opposite is not true. If you
     * need it, you are probably looking for `componentWillUpdate`.
     *
     * @param {object} nextProps
     * @optional
     */
    componentWillReceiveProps: 'DEFINE_MANY',

    /**
     * Invoked while deciding if the component should be updated as a result of
     * receiving new props, state and/or context.
     *
     * Use this as an opportunity to `return false` when you're certain that the
     * transition to the new props/state/context will not require a component
     * update.
     *
     *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
     *     return !equal(nextProps, this.props) ||
     *       !equal(nextState, this.state) ||
     *       !equal(nextContext, this.context);
     *   }
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @return {boolean} True if the component should update.
     * @optional
     */
    shouldComponentUpdate: 'DEFINE_ONCE',

    /**
     * Invoked when the component is about to update due to a transition from
     * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
     * and `nextContext`.
     *
     * Use this as an opportunity to perform preparation before an update occurs.
     *
     * NOTE: You **cannot** use `this.setState()` in this method.
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @param {ReactReconcileTransaction} transaction
     * @optional
     */
    componentWillUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component's DOM representation has been updated.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been updated.
     *
     * @param {object} prevProps
     * @param {?object} prevState
     * @param {?object} prevContext
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component is about to be removed from its parent and have
     * its DOM representation destroyed.
     *
     * Use this as an opportunity to deallocate any external resources.
     *
     * NOTE: There is no `componentDidUnmount` since your component will have been
     * destroyed by that point.
     *
     * @optional
     */
    componentWillUnmount: 'DEFINE_MANY',

    // ==== Advanced methods ====

    /**
     * Updates the component's currently mounted DOM representation.
     *
     * By default, this implements React's rendering and reconciliation algorithm.
     * Sophisticated clients may wish to override this.
     *
     * @param {ReactReconcileTransaction} transaction
     * @internal
     * @overridable
     */
    updateComponent: 'OVERRIDE_BASE'

  };

  /**
   * Mapping from class specification keys to special processing functions.
   *
   * Although these are declared like instance properties in the specification
   * when defining classes using `React.createClass`, they are actually static
   * and are accessible on the constructor instead of the prototype. Despite
   * being static, they must be defined outside of the "statics" key under
   * which all other static methods are defined.
   */
  var RESERVED_SPEC_KEYS = {
    displayName: function (Constructor, displayName) {
      Constructor.displayName = displayName;
    },
    mixins: function (Constructor, mixins) {
      if (mixins) {
        for (var i = 0; i < mixins.length; i++) {
          mixSpecIntoComponent(Constructor, mixins[i]);
        }
      }
    },
    childContextTypes: function (Constructor, childContextTypes) {
      if (process.env.NODE_ENV !== 'production') {
        validateTypeDef(Constructor, childContextTypes, 'childContext');
      }
      Constructor.childContextTypes = _assign({}, Constructor.childContextTypes, childContextTypes);
    },
    contextTypes: function (Constructor, contextTypes) {
      if (process.env.NODE_ENV !== 'production') {
        validateTypeDef(Constructor, contextTypes, 'context');
      }
      Constructor.contextTypes = _assign({}, Constructor.contextTypes, contextTypes);
    },
    /**
     * Special case getDefaultProps which should move into statics but requires
     * automatic merging.
     */
    getDefaultProps: function (Constructor, getDefaultProps) {
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, getDefaultProps);
      } else {
        Constructor.getDefaultProps = getDefaultProps;
      }
    },
    propTypes: function (Constructor, propTypes) {
      if (process.env.NODE_ENV !== 'production') {
        validateTypeDef(Constructor, propTypes, 'prop');
      }
      Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
    },
    statics: function (Constructor, statics) {
      mixStaticSpecIntoComponent(Constructor, statics);
    },
    autobind: function () {} };

  function validateTypeDef(Constructor, typeDef, location) {
    for (var propName in typeDef) {
      if (typeDef.hasOwnProperty(propName)) {
        // use a warning instead of an _invariant so components
        // don't show up in prod but only in __DEV__
        process.env.NODE_ENV !== 'production' ? warning(typeof typeDef[propName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', Constructor.displayName || 'ReactClass', ReactPropTypeLocationNames[location], propName) : void 0;
      }
    }
  }

  function validateMethodOverride(isAlreadyDefined, name) {
    var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null;

    // Disallow overriding of base class methods unless explicitly allowed.
    if (ReactClassMixin.hasOwnProperty(name)) {
      _invariant(specPolicy === 'OVERRIDE_BASE', 'ReactClassInterface: You are attempting to override ' + '`%s` from your class specification. Ensure that your method names ' + 'do not overlap with React methods.', name);
    }

    // Disallow defining methods more than once unless explicitly allowed.
    if (isAlreadyDefined) {
      _invariant(specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED', 'ReactClassInterface: You are attempting to define ' + '`%s` on your component more than once. This conflict may be due ' + 'to a mixin.', name);
    }
  }

  /**
   * Mixin helper which handles policy validation and reserved
   * specification keys when building React classes.
   */
  function mixSpecIntoComponent(Constructor, spec) {
    if (!spec) {
      if (process.env.NODE_ENV !== 'production') {
        var typeofSpec = typeof spec;
        var isMixinValid = typeofSpec === 'object' && spec !== null;

        process.env.NODE_ENV !== 'production' ? warning(isMixinValid, '%s: You\'re attempting to include a mixin that is either null ' + 'or not an object. Check the mixins included by the component, ' + 'as well as any mixins they include themselves. ' + 'Expected object but got %s.', Constructor.displayName || 'ReactClass', spec === null ? null : typeofSpec) : void 0;
      }

      return;
    }

    _invariant(typeof spec !== 'function', 'ReactClass: You\'re attempting to ' + 'use a component class or function as a mixin. Instead, just use a ' + 'regular object.');
    _invariant(!isValidElement(spec), 'ReactClass: You\'re attempting to ' + 'use a component as a mixin. Instead, just use a regular object.');

    var proto = Constructor.prototype;
    var autoBindPairs = proto.__reactAutoBindPairs;

    // By handling mixins before any other properties, we ensure the same
    // chaining order is applied to methods with DEFINE_MANY policy, whether
    // mixins are listed before or after these methods in the spec.
    if (spec.hasOwnProperty(MIXINS_KEY)) {
      RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
    }

    for (var name in spec) {
      if (!spec.hasOwnProperty(name)) {
        continue;
      }

      if (name === MIXINS_KEY) {
        // We have already handled mixins in a special case above.
        continue;
      }

      var property = spec[name];
      var isAlreadyDefined = proto.hasOwnProperty(name);
      validateMethodOverride(isAlreadyDefined, name);

      if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
        RESERVED_SPEC_KEYS[name](Constructor, property);
      } else {
        // Setup methods on prototype:
        // The following member methods should not be automatically bound:
        // 1. Expected ReactClass methods (in the "interface").
        // 2. Overridden methods (that were mixed in).
        var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
        var isFunction = typeof property === 'function';
        var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;

        if (shouldAutoBind) {
          autoBindPairs.push(name, property);
          proto[name] = property;
        } else {
          if (isAlreadyDefined) {
            var specPolicy = ReactClassInterface[name];

            // These cases should already be caught by validateMethodOverride.
            _invariant(isReactClassMethod && (specPolicy === 'DEFINE_MANY_MERGED' || specPolicy === 'DEFINE_MANY'), 'ReactClass: Unexpected spec policy %s for key %s ' + 'when mixing in component specs.', specPolicy, name);

            // For methods which are defined more than once, call the existing
            // methods before calling the new property, merging if appropriate.
            if (specPolicy === 'DEFINE_MANY_MERGED') {
              proto[name] = createMergedResultFunction(proto[name], property);
            } else if (specPolicy === 'DEFINE_MANY') {
              proto[name] = createChainedFunction(proto[name], property);
            }
          } else {
            proto[name] = property;
            if (process.env.NODE_ENV !== 'production') {
              // Add verbose displayName to the function, which helps when looking
              // at profiling tools.
              if (typeof property === 'function' && spec.displayName) {
                proto[name].displayName = spec.displayName + '_' + name;
              }
            }
          }
        }
      }
    }
  }

  function mixStaticSpecIntoComponent(Constructor, statics) {
    if (!statics) {
      return;
    }
    for (var name in statics) {
      var property = statics[name];
      if (!statics.hasOwnProperty(name)) {
        continue;
      }

      var isReserved = name in RESERVED_SPEC_KEYS;
      _invariant(!isReserved, 'ReactClass: You are attempting to define a reserved ' + 'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' + 'as an instance property instead; it will still be accessible on the ' + 'constructor.', name);

      var isInherited = name in Constructor;
      _invariant(!isInherited, 'ReactClass: You are attempting to define ' + '`%s` on your component more than once. This conflict may be ' + 'due to a mixin.', name);
      Constructor[name] = property;
    }
  }

  /**
   * Merge two objects, but throw if both contain the same key.
   *
   * @param {object} one The first object, which is mutated.
   * @param {object} two The second object
   * @return {object} one after it has been mutated to contain everything in two.
   */
  function mergeIntoWithNoDuplicateKeys(one, two) {
    _invariant(one && two && typeof one === 'object' && typeof two === 'object', 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.');

    for (var key in two) {
      if (two.hasOwnProperty(key)) {
        _invariant(one[key] === undefined, 'mergeIntoWithNoDuplicateKeys(): ' + 'Tried to merge two objects with the same key: `%s`. This conflict ' + 'may be due to a mixin; in particular, this may be caused by two ' + 'getInitialState() or getDefaultProps() methods returning objects ' + 'with clashing keys.', key);
        one[key] = two[key];
      }
    }
    return one;
  }

  /**
   * Creates a function that invokes two functions and merges their return values.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */
  function createMergedResultFunction(one, two) {
    return function mergedResult() {
      var a = one.apply(this, arguments);
      var b = two.apply(this, arguments);
      if (a == null) {
        return b;
      } else if (b == null) {
        return a;
      }
      var c = {};
      mergeIntoWithNoDuplicateKeys(c, a);
      mergeIntoWithNoDuplicateKeys(c, b);
      return c;
    };
  }

  /**
   * Creates a function that invokes two functions and ignores their return vales.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */
  function createChainedFunction(one, two) {
    return function chainedFunction() {
      one.apply(this, arguments);
      two.apply(this, arguments);
    };
  }

  /**
   * Binds a method to the component.
   *
   * @param {object} component Component whose method is going to be bound.
   * @param {function} method Method to be bound.
   * @return {function} The bound method.
   */
  function bindAutoBindMethod(component, method) {
    var boundMethod = method.bind(component);
    if (process.env.NODE_ENV !== 'production') {
      boundMethod.__reactBoundContext = component;
      boundMethod.__reactBoundMethod = method;
      boundMethod.__reactBoundArguments = null;
      var componentName = component.constructor.displayName;
      var _bind = boundMethod.bind;
      boundMethod.bind = function (newThis) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        // User is trying to bind() an autobound method; we effectively will
        // ignore the value of "this" that the user is trying to use, so
        // let's warn.
        if (newThis !== component && newThis !== null) {
          process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): React component methods may only be bound to the ' + 'component instance. See %s', componentName) : void 0;
        } else if (!args.length) {
          process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): You are binding a component method to the component. ' + 'React does this for you automatically in a high-performance ' + 'way, so you can safely remove this call. See %s', componentName) : void 0;
          return boundMethod;
        }
        var reboundMethod = _bind.apply(boundMethod, arguments);
        reboundMethod.__reactBoundContext = component;
        reboundMethod.__reactBoundMethod = method;
        reboundMethod.__reactBoundArguments = args;
        return reboundMethod;
      };
    }
    return boundMethod;
  }

  /**
   * Binds all auto-bound methods in a component.
   *
   * @param {object} component Component whose method is going to be bound.
   */
  function bindAutoBindMethods(component) {
    var pairs = component.__reactAutoBindPairs;
    for (var i = 0; i < pairs.length; i += 2) {
      var autoBindKey = pairs[i];
      var method = pairs[i + 1];
      component[autoBindKey] = bindAutoBindMethod(component, method);
    }
  }

  var IsMountedMixin = {
    componentDidMount: function () {
      this.__isMounted = true;
    },
    componentWillUnmount: function () {
      this.__isMounted = false;
    }
  };

  /**
   * Add more to the ReactClass base class. These are all legacy features and
   * therefore not already part of the modern ReactComponent.
   */
  var ReactClassMixin = {

    /**
     * TODO: This will be deprecated because state should always keep a consistent
     * type signature and the only use case for this, is to avoid that.
     */
    replaceState: function (newState, callback) {
      this.updater.enqueueReplaceState(this, newState, callback);
    },

    /**
     * Checks whether or not this composite component is mounted.
     * @return {boolean} True if mounted, false otherwise.
     * @protected
     * @final
     */
    isMounted: function () {
      if (process.env.NODE_ENV !== 'production') {
        process.env.NODE_ENV !== 'production' ? warning(this.__didWarnIsMounted, '%s: isMounted is deprecated. Instead, make sure to clean up ' + 'subscriptions and pending requests in componentWillUnmount to ' + 'prevent memory leaks.', this.constructor && this.constructor.displayName || this.name || 'Component') : void 0;
        this.__didWarnIsMounted = true;
      }
      return !!this.__isMounted;
    }
  };

  var ReactClassComponent = function () {};
  _assign(ReactClassComponent.prototype, ReactComponent.prototype, ReactClassMixin);

  /**
   * Creates a composite component class given a class specification.
   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
   *
   * @param {object} spec Class specification (which must define `render`).
   * @return {function} Component constructor function.
   * @public
   */
  function createClass(spec) {
    // To keep our warnings more understandable, we'll use a little hack here to
    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
    // unnecessarily identify a class without displayName as 'Constructor'.
    var Constructor = identity(function (props, context, updater) {
      // This constructor gets overridden by mocks. The argument is used
      // by mocks to assert on what gets mounted.

      if (process.env.NODE_ENV !== 'production') {
        process.env.NODE_ENV !== 'production' ? warning(this instanceof Constructor, 'Something is calling a React component directly. Use a factory or ' + 'JSX instead. See: https://fb.me/react-legacyfactory') : void 0;
      }

      // Wire up auto-binding
      if (this.__reactAutoBindPairs.length) {
        bindAutoBindMethods(this);
      }

      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;

      this.state = null;

      // ReactClasses doesn't have constructors. Instead, they use the
      // getInitialState and componentWillMount methods for initialization.

      var initialState = this.getInitialState ? this.getInitialState() : null;
      if (process.env.NODE_ENV !== 'production') {
        // We allow auto-mocks to proceed as if they're returning null.
        if (initialState === undefined && this.getInitialState._isMockFunction) {
          // This is probably bad practice. Consider warning here and
          // deprecating this convenience.
          initialState = null;
        }
      }
      _invariant(typeof initialState === 'object' && !Array.isArray(initialState), '%s.getInitialState(): must return an object or null', Constructor.displayName || 'ReactCompositeComponent');

      this.state = initialState;
    });
    Constructor.prototype = new ReactClassComponent();
    Constructor.prototype.constructor = Constructor;
    Constructor.prototype.__reactAutoBindPairs = [];

    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

    mixSpecIntoComponent(Constructor, IsMountedMixin);
    mixSpecIntoComponent(Constructor, spec);

    // Initialize the defaultProps property after all mixins have been merged.
    if (Constructor.getDefaultProps) {
      Constructor.defaultProps = Constructor.getDefaultProps();
    }

    if (process.env.NODE_ENV !== 'production') {
      // This is a tag to indicate that the use of these method names is ok,
      // since it's used with createClass. If it's not, then it's likely a
      // mistake so we'll warn you to use the static property, property
      // initializer or constructor respectively.
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps.isReactClassApproved = {};
      }
      if (Constructor.prototype.getInitialState) {
        Constructor.prototype.getInitialState.isReactClassApproved = {};
      }
    }

    _invariant(Constructor.prototype.render, 'createClass(...): Class specification must implement a `render` method.');

    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', spec.displayName || 'A component') : void 0;
      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', spec.displayName || 'A component') : void 0;
    }

    // Reduce time spent doing lookups by setting these on the prototype.
    for (var methodName in ReactClassInterface) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null;
      }
    }

    return Constructor;
  }

  return createClass;
}

module.exports = factory;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var React = __webpack_require__(4);
var factory = __webpack_require__(6);

// Hack to grab NoopUpdateQueue from isomorphic React
var ReactNoopUpdateQueue = new React.Component().updater;

module.exports = factory(
  React.Component,
  React.isValidElement,
  ReactNoopUpdateQueue
);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = __webpack_require__(4);
var createReactClass = __webpack_require__(7);
var PropTypes = __webpack_require__(14);
var win = typeof global === 'undefined' ? window : global;

module.exports = function (chartType, Highcharts) {
  var displayName = 'Highcharts' + chartType;
  var result = createReactClass({
    displayName: displayName,

    propTypes: {
      config: PropTypes.object,
      isPureConfig: PropTypes.bool,
      neverReflow: PropTypes.bool,
      callback: PropTypes.func,
      domProps: PropTypes.object
    },

    defaultProps: {
      callback: function callback() {},
      domProps: {}
    },

    renderChart: function renderChart(config) {
      var _this = this;

      if (!config) {
        throw new Error('Config must be specified for the ' + displayName + ' component');
      }
      var chartConfig = config.chart;
      this.chart = new Highcharts[chartType](_extends({}, config, {
        chart: _extends({}, chartConfig, {
          renderTo: this.refs.chart
        })
      }), this.props.callback);

      if (!this.props.neverReflow) {
        win && win.requestAnimationFrame && requestAnimationFrame(function () {
          _this.chart && _this.chart.options && _this.chart.reflow();
        });
      }
    },

    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
      if (nextProps.neverReflow || nextProps.isPureConfig && this.props.config === nextProps.config) {
        return true;
      }
      this.renderChart(nextProps.config);
      return false;
    },


    getChart: function getChart() {
      if (!this.chart) {
        throw new Error('getChart() should not be called before the component is mounted');
      }
      return this.chart;
    },

    componentDidMount: function componentDidMount() {
      this.renderChart(this.props.config);
    },

    componentWillUnmount: function componentWillUnmount() {
      this.chart.destroy();
    },


    render: function render() {
      return React.createElement('div', _extends({ ref: 'chart' }, this.props.domProps));
    }
  });

  result.Highcharts = Highcharts;
  result.withHighcharts = function (Highcharts) {
    return module.exports(chartType, Highcharts);
  };
  return result;
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(1);
  var warning = __webpack_require__(3);
  var ReactPropTypesSecret = __webpack_require__(5);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(2);
var invariant = __webpack_require__(1);

module.exports = function() {
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  function shim() {
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(2);
var invariant = __webpack_require__(1);
var warning = __webpack_require__(3);

var ReactPropTypesSecret = __webpack_require__(5);
var checkPropTypes = __webpack_require__(11);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(13)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(12)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 15 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(10)('StockChart', __webpack_require__(23));

/***/ }),
/* 21 */,
/* 22 */,
/* 23 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_23__;

/***/ }),
/* 24 */,
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(20);


/***/ })
/******/ ]);
});

/***/ }),

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

/***/ 1656:
/***/ (function(module, exports) {

/*
 Highstock JS v5.0.14 (2017-07-28)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(M,S){"object"===typeof module&&module.exports?module.exports=M.document?S(M):S:M.Highcharts=S(M)})("undefined"!==typeof window?window:this,function(M){M=function(){var a=window,D=a.document,B=a.navigator&&a.navigator.userAgent||"",G=D&&D.createElementNS&&!!D.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,E=/(edge|msie|trident)/i.test(B)&&!window.opera,r=!G,g=/Firefox/.test(B),p=g&&4>parseInt(B.split("Firefox/")[1],10);return a.Highcharts?a.Highcharts.error(16,!0):{product:"Highstock",
version:"5.0.14",deg2rad:2*Math.PI/360,doc:D,hasBidiBug:p,hasTouch:D&&void 0!==D.documentElement.ontouchstart,isMS:E,isWebKit:/AppleWebKit/.test(B),isFirefox:g,isTouchDevice:/(Mobile|Android|Windows Phone)/.test(B),SVG_NS:"http://www.w3.org/2000/svg",chartCount:0,seriesTypes:{},symbolSizes:{},svg:G,vml:r,win:a,marginNames:["plotTop","marginRight","marginBottom","plotLeft"],noop:function(){},charts:[]}}();(function(a){var D=[],B=a.charts,G=a.doc,E=a.win;a.error=function(r,g){r=a.isNumber(r)?"Highcharts error #"+
r+": www.highcharts.com/errors/"+r:r;if(g)throw Error(r);E.console&&console.log(r)};a.Fx=function(a,g,p){this.options=g;this.elem=a;this.prop=p};a.Fx.prototype={dSetter:function(){var a=this.paths[0],g=this.paths[1],p=[],t=this.now,v=a.length,u;if(1===t)p=this.toD;else if(v===g.length&&1>t)for(;v--;)u=parseFloat(a[v]),p[v]=isNaN(u)?a[v]:t*parseFloat(g[v]-u)+u;else p=g;this.elem.attr("d",p,null,!0)},update:function(){var a=this.elem,g=this.prop,p=this.now,t=this.options.step;if(this[g+"Setter"])this[g+
"Setter"]();else a.attr?a.element&&a.attr(g,p,null,!0):a.style[g]=p+this.unit;t&&t.call(a,p,this)},run:function(a,g,p){var t=this,r=function(a){return r.stopped?!1:t.step(a)},u;this.startTime=+new Date;this.start=a;this.end=g;this.unit=p;this.now=this.start;this.pos=0;r.elem=this.elem;r.prop=this.prop;r()&&1===D.push(r)&&(r.timerId=setInterval(function(){for(u=0;u<D.length;u++)D[u]()||D.splice(u--,1);D.length||clearInterval(r.timerId)},13))},step:function(r){var g=+new Date,p,t=this.options,v=this.elem,
u=t.complete,l=t.duration,e=t.curAnim;v.attr&&!v.element?r=!1:r||g>=l+this.startTime?(this.now=this.end,this.pos=1,this.update(),p=e[this.prop]=!0,a.objectEach(e,function(a){!0!==a&&(p=!1)}),p&&u&&u.call(v),r=!1):(this.pos=t.easing((g-this.startTime)/l),this.now=this.start+(this.end-this.start)*this.pos,this.update(),r=!0);return r},initPath:function(r,g,p){function t(a){var b,m;for(c=a.length;c--;)b="M"===a[c]||"L"===a[c],m=/[a-zA-Z]/.test(a[c+3]),b&&m&&a.splice(c+1,0,a[c+1],a[c+2],a[c+1],a[c+2])}
function v(a,b){for(;a.length<x;){a[0]=b[x-a.length];var m=a.slice(0,d);[].splice.apply(a,[0,0].concat(m));q&&(m=a.slice(a.length-d),[].splice.apply(a,[a.length,0].concat(m)),c--)}a[0]="M"}function u(a,b){for(var m=(x-a.length)/d;0<m&&m--;)C=a.slice().splice(a.length/I-d,d*I),C[0]=b[x-d-m*d],f&&(C[d-6]=C[d-2],C[d-5]=C[d-1]),[].splice.apply(a,[a.length/I,0].concat(C)),q&&m--}g=g||"";var l,e=r.startX,k=r.endX,f=-1<g.indexOf("C"),d=f?7:3,x,C,c;g=g.split(" ");p=p.slice();var q=r.isArea,I=q?2:1,m;f&&(t(g),
t(p));if(e&&k){for(c=0;c<e.length;c++)if(e[c]===k[0]){l=c;break}else if(e[0]===k[k.length-e.length+c]){l=c;m=!0;break}void 0===l&&(g=[])}g.length&&a.isNumber(l)&&(x=p.length+l*I*d,m?(v(g,p),u(p,g)):(v(p,g),u(g,p)));return[g,p]}};a.Fx.prototype.fillSetter=a.Fx.prototype.strokeSetter=function(){this.elem.attr(this.prop,a.color(this.start).tweenTo(a.color(this.end),this.pos),null,!0)};a.extend=function(a,g){var r;a||(a={});for(r in g)a[r]=g[r];return a};a.merge=function(){var r,g=arguments,p,t={},v=
function(g,l){"object"!==typeof g&&(g={});a.objectEach(l,function(e,k){!a.isObject(e,!0)||a.isClass(e)||a.isDOMElement(e)?g[k]=l[k]:g[k]=v(g[k]||{},e)});return g};!0===g[0]&&(t=g[1],g=Array.prototype.slice.call(g,2));p=g.length;for(r=0;r<p;r++)t=v(t,g[r]);return t};a.pInt=function(a,g){return parseInt(a,g||10)};a.isString=function(a){return"string"===typeof a};a.isArray=function(a){a=Object.prototype.toString.call(a);return"[object Array]"===a||"[object Array Iterator]"===a};a.isObject=function(r,
g){return!!r&&"object"===typeof r&&(!g||!a.isArray(r))};a.isDOMElement=function(r){return a.isObject(r)&&"number"===typeof r.nodeType};a.isClass=function(r){var g=r&&r.constructor;return!(!a.isObject(r,!0)||a.isDOMElement(r)||!g||!g.name||"Object"===g.name)};a.isNumber=function(a){return"number"===typeof a&&!isNaN(a)};a.erase=function(a,g){for(var r=a.length;r--;)if(a[r]===g){a.splice(r,1);break}};a.defined=function(a){return void 0!==a&&null!==a};a.attr=function(r,g,p){var t;a.isString(g)?a.defined(p)?
r.setAttribute(g,p):r&&r.getAttribute&&(t=r.getAttribute(g)):a.defined(g)&&a.isObject(g)&&a.objectEach(g,function(a,g){r.setAttribute(g,a)});return t};a.splat=function(r){return a.isArray(r)?r:[r]};a.syncTimeout=function(a,g,p){if(g)return setTimeout(a,g,p);a.call(0,p)};a.pick=function(){var a=arguments,g,p,t=a.length;for(g=0;g<t;g++)if(p=a[g],void 0!==p&&null!==p)return p};a.css=function(r,g){a.isMS&&!a.svg&&g&&void 0!==g.opacity&&(g.filter="alpha(opacity\x3d"+100*g.opacity+")");a.extend(r.style,
g)};a.createElement=function(r,g,p,t,v){r=G.createElement(r);var u=a.css;g&&a.extend(r,g);v&&u(r,{padding:0,border:"none",margin:0});p&&u(r,p);t&&t.appendChild(r);return r};a.extendClass=function(r,g){var p=function(){};p.prototype=new r;a.extend(p.prototype,g);return p};a.pad=function(a,g,p){return Array((g||2)+1-String(a).length).join(p||0)+a};a.relativeLength=function(a,g,p){return/%$/.test(a)?g*parseFloat(a)/100+(p||0):parseFloat(a)};a.wrap=function(a,g,p){var t=a[g];a[g]=function(){var a=Array.prototype.slice.call(arguments),
g=arguments,l=this;l.proceed=function(){t.apply(l,arguments.length?arguments:g)};a.unshift(t);a=p.apply(this,a);l.proceed=null;return a}};a.getTZOffset=function(r){var g=a.Date;return 6E4*(g.hcGetTimezoneOffset&&g.hcGetTimezoneOffset(r)||g.hcTimezoneOffset||0)};a.dateFormat=function(r,g,p){if(!a.defined(g)||isNaN(g))return a.defaultOptions.lang.invalidDate||"";r=a.pick(r,"%Y-%m-%d %H:%M:%S");var t=a.Date,v=new t(g-a.getTZOffset(g)),u=v[t.hcGetHours](),l=v[t.hcGetDay](),e=v[t.hcGetDate](),k=v[t.hcGetMonth](),
f=v[t.hcGetFullYear](),d=a.defaultOptions.lang,x=d.weekdays,C=d.shortWeekdays,c=a.pad,t=a.extend({a:C?C[l]:x[l].substr(0,3),A:x[l],d:c(e),e:c(e,2," "),w:l,b:d.shortMonths[k],B:d.months[k],m:c(k+1),y:f.toString().substr(2,2),Y:f,H:c(u),k:u,I:c(u%12||12),l:u%12||12,M:c(v[t.hcGetMinutes]()),p:12>u?"AM":"PM",P:12>u?"am":"pm",S:c(v.getSeconds()),L:c(Math.round(g%1E3),3)},a.dateFormats);a.objectEach(t,function(a,f){for(;-1!==r.indexOf("%"+f);)r=r.replace("%"+f,"function"===typeof a?a(g):a)});return p?r.substr(0,
1).toUpperCase()+r.substr(1):r};a.formatSingle=function(r,g){var p=/\.([0-9])/,t=a.defaultOptions.lang;/f$/.test(r)?(p=(p=r.match(p))?p[1]:-1,null!==g&&(g=a.numberFormat(g,p,t.decimalPoint,-1<r.indexOf(",")?t.thousandsSep:""))):g=a.dateFormat(r,g);return g};a.format=function(r,g){for(var p="{",t=!1,v,u,l,e,k=[],f;r;){p=r.indexOf(p);if(-1===p)break;v=r.slice(0,p);if(t){v=v.split(":");u=v.shift().split(".");e=u.length;f=g;for(l=0;l<e;l++)f=f[u[l]];v.length&&(f=a.formatSingle(v.join(":"),f));k.push(f)}else k.push(v);
r=r.slice(p+1);p=(t=!t)?"}":"{"}k.push(r);return k.join("")};a.getMagnitude=function(a){return Math.pow(10,Math.floor(Math.log(a)/Math.LN10))};a.normalizeTickInterval=function(r,g,p,t,v){var u,l=r;p=a.pick(p,1);u=r/p;g||(g=v?[1,1.2,1.5,2,2.5,3,4,5,6,8,10]:[1,2,2.5,5,10],!1===t&&(1===p?g=a.grep(g,function(a){return 0===a%1}):.1>=p&&(g=[1/p])));for(t=0;t<g.length&&!(l=g[t],v&&l*p>=r||!v&&u<=(g[t]+(g[t+1]||g[t]))/2);t++);return l=a.correctFloat(l*p,-Math.round(Math.log(.001)/Math.LN10))};a.stableSort=
function(a,g){var p=a.length,t,v;for(v=0;v<p;v++)a[v].safeI=v;a.sort(function(a,l){t=g(a,l);return 0===t?a.safeI-l.safeI:t});for(v=0;v<p;v++)delete a[v].safeI};a.arrayMin=function(a){for(var g=a.length,p=a[0];g--;)a[g]<p&&(p=a[g]);return p};a.arrayMax=function(a){for(var g=a.length,p=a[0];g--;)a[g]>p&&(p=a[g]);return p};a.destroyObjectProperties=function(r,g){a.objectEach(r,function(a,t){a&&a!==g&&a.destroy&&a.destroy();delete r[t]})};a.discardElement=function(r){var g=a.garbageBin;g||(g=a.createElement("div"));
r&&g.appendChild(r);g.innerHTML=""};a.correctFloat=function(a,g){return parseFloat(a.toPrecision(g||14))};a.setAnimation=function(r,g){g.renderer.globalAnimation=a.pick(r,g.options.chart.animation,!0)};a.animObject=function(r){return a.isObject(r)?a.merge(r):{duration:r?500:0}};a.timeUnits={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5,month:24192E5,year:314496E5};a.numberFormat=function(r,g,p,t){r=+r||0;g=+g;var v=a.defaultOptions.lang,u=(r.toString().split(".")[1]||"").split("e")[0].length,
l,e,k=r.toString().split("e");-1===g?g=Math.min(u,20):a.isNumber(g)||(g=2);e=(Math.abs(k[1]?k[0]:r)+Math.pow(10,-Math.max(g,u)-1)).toFixed(g);u=String(a.pInt(e));l=3<u.length?u.length%3:0;p=a.pick(p,v.decimalPoint);t=a.pick(t,v.thousandsSep);r=(0>r?"-":"")+(l?u.substr(0,l)+t:"");r+=u.substr(l).replace(/(\d{3})(?=\d)/g,"$1"+t);g&&(r+=p+e.slice(-g));k[1]&&(r+="e"+k[1]);return r};Math.easeInOutSine=function(a){return-.5*(Math.cos(Math.PI*a)-1)};a.getStyle=function(r,g,p){if("width"===g)return Math.min(r.offsetWidth,
r.scrollWidth)-a.getStyle(r,"padding-left")-a.getStyle(r,"padding-right");if("height"===g)return Math.min(r.offsetHeight,r.scrollHeight)-a.getStyle(r,"padding-top")-a.getStyle(r,"padding-bottom");if(r=E.getComputedStyle(r,void 0))r=r.getPropertyValue(g),a.pick(p,!0)&&(r=a.pInt(r));return r};a.inArray=function(a,g){return g.indexOf?g.indexOf(a):[].indexOf.call(g,a)};a.grep=function(a,g){return[].filter.call(a,g)};a.find=function(a,g){return[].find.call(a,g)};a.map=function(a,g){for(var p=[],t=0,v=
a.length;t<v;t++)p[t]=g.call(a[t],a[t],t,a);return p};a.offset=function(a){var g=G.documentElement;a=a.getBoundingClientRect();return{top:a.top+(E.pageYOffset||g.scrollTop)-(g.clientTop||0),left:a.left+(E.pageXOffset||g.scrollLeft)-(g.clientLeft||0)}};a.stop=function(a,g){for(var p=D.length;p--;)D[p].elem!==a||g&&g!==D[p].prop||(D[p].stopped=!0)};a.each=function(a,g,p){return Array.prototype.forEach.call(a,g,p)};a.objectEach=function(a,g,p){for(var t in a)a.hasOwnProperty(t)&&g.call(p,a[t],t,a)};
a.addEvent=function(r,g,p){function t(a){a.target=a.srcElement||E;p.call(r,a)}var v=r.hcEvents=r.hcEvents||{};r.addEventListener?r.addEventListener(g,p,!1):r.attachEvent&&(r.hcEventsIE||(r.hcEventsIE={}),p.hcGetKey||(p.hcGetKey=a.uniqueKey()),r.hcEventsIE[p.hcGetKey]=t,r.attachEvent("on"+g,t));v[g]||(v[g]=[]);v[g].push(p);return function(){a.removeEvent(r,g,p)}};a.removeEvent=function(r,g,p){function t(a,f){r.removeEventListener?r.removeEventListener(a,f,!1):r.attachEvent&&(f=r.hcEventsIE[f.hcGetKey],
r.detachEvent("on"+a,f))}function v(){var e,f;r.nodeName&&(g?(e={},e[g]=!0):e=l,a.objectEach(e,function(a,e){if(l[e])for(f=l[e].length;f--;)t(e,l[e][f])}))}var u,l=r.hcEvents,e;l&&(g?(u=l[g]||[],p?(e=a.inArray(p,u),-1<e&&(u.splice(e,1),l[g]=u),t(g,p)):(v(),l[g]=[])):(v(),r.hcEvents={}))};a.fireEvent=function(r,g,p,t){var v;v=r.hcEvents;var u,l;p=p||{};if(G.createEvent&&(r.dispatchEvent||r.fireEvent))v=G.createEvent("Events"),v.initEvent(g,!0,!0),a.extend(v,p),r.dispatchEvent?r.dispatchEvent(v):r.fireEvent(g,
v);else if(v)for(v=v[g]||[],u=v.length,p.target||a.extend(p,{preventDefault:function(){p.defaultPrevented=!0},target:r,type:g}),g=0;g<u;g++)(l=v[g])&&!1===l.call(r,p)&&p.preventDefault();t&&!p.defaultPrevented&&t(p)};a.animate=function(r,g,p){var t,v="",u,l,e;a.isObject(p)||(e=arguments,p={duration:e[2],easing:e[3],complete:e[4]});a.isNumber(p.duration)||(p.duration=400);p.easing="function"===typeof p.easing?p.easing:Math[p.easing]||Math.easeInOutSine;p.curAnim=a.merge(g);a.objectEach(g,function(e,
f){a.stop(r,f);l=new a.Fx(r,p,f);u=null;"d"===f?(l.paths=l.initPath(r,r.d,g.d),l.toD=g.d,t=0,u=1):r.attr?t=r.attr(f):(t=parseFloat(a.getStyle(r,f))||0,"opacity"!==f&&(v="px"));u||(u=e);u&&u.match&&u.match("px")&&(u=u.replace(/px/g,""));l.run(t,u,v)})};a.seriesType=function(r,g,p,t,v){var u=a.getOptions(),l=a.seriesTypes;u.plotOptions[r]=a.merge(u.plotOptions[g],p);l[r]=a.extendClass(l[g]||function(){},t);l[r].prototype.type=r;v&&(l[r].prototype.pointClass=a.extendClass(a.Point,v));return l[r]};a.uniqueKey=
function(){var a=Math.random().toString(36).substring(2,9),g=0;return function(){return"highcharts-"+a+"-"+g++}}();E.jQuery&&(E.jQuery.fn.highcharts=function(){var r=[].slice.call(arguments);if(this[0])return r[0]?(new (a[a.isString(r[0])?r.shift():"Chart"])(this[0],r[0],r[1]),this):B[a.attr(this[0],"data-highcharts-chart")]});G&&!G.defaultView&&(a.getStyle=function(r,g){var p={width:"clientWidth",height:"clientHeight"}[g];if(r.style[g])return a.pInt(r.style[g]);"opacity"===g&&(g="filter");if(p)return r.style.zoom=
1,Math.max(r[p]-2*a.getStyle(r,"padding"),0);r=r.currentStyle[g.replace(/\-(\w)/g,function(a,g){return g.toUpperCase()})];"filter"===g&&(r=r.replace(/alpha\(opacity=([0-9]+)\)/,function(a,g){return g/100}));return""===r?1:a.pInt(r)});Array.prototype.forEach||(a.each=function(a,g,p){for(var t=0,v=a.length;t<v;t++)if(!1===g.call(p,a[t],t,a))return t});Array.prototype.indexOf||(a.inArray=function(a,g){var p,t=0;if(g)for(p=g.length;t<p;t++)if(g[t]===a)return t;return-1});Array.prototype.filter||(a.grep=
function(a,g){for(var p=[],t=0,v=a.length;t<v;t++)g(a[t],t)&&p.push(a[t]);return p});Array.prototype.find||(a.find=function(a,g){var p,t=a.length;for(p=0;p<t;p++)if(g(a[p],p))return a[p]})})(M);(function(a){var D=a.each,B=a.isNumber,G=a.map,E=a.merge,r=a.pInt;a.Color=function(g){if(!(this instanceof a.Color))return new a.Color(g);this.init(g)};a.Color.prototype={parsers:[{regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,parse:function(a){return[r(a[1]),
r(a[2]),r(a[3]),parseFloat(a[4],10)]}},{regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,parse:function(a){return[r(a[1]),r(a[2]),r(a[3]),1]}}],names:{none:"rgba(255,255,255,0)",white:"#ffffff",black:"#000000"},init:function(g){var p,t,v,u;if((this.input=g=this.names[g&&g.toLowerCase?g.toLowerCase():""]||g)&&g.stops)this.stops=G(g.stops,function(l){return new a.Color(l[1])});else if(g&&"#"===g.charAt()&&(p=g.length,g=parseInt(g.substr(1),16),7===p?t=[(g&16711680)>>16,(g&65280)>>
8,g&255,1]:4===p&&(t=[(g&3840)>>4|(g&3840)>>8,(g&240)>>4|g&240,(g&15)<<4|g&15,1])),!t)for(v=this.parsers.length;v--&&!t;)u=this.parsers[v],(p=u.regex.exec(g))&&(t=u.parse(p));this.rgba=t||[]},get:function(a){var g=this.input,t=this.rgba,v;this.stops?(v=E(g),v.stops=[].concat(v.stops),D(this.stops,function(g,l){v.stops[l]=[v.stops[l][0],g.get(a)]})):v=t&&B(t[0])?"rgb"===a||!a&&1===t[3]?"rgb("+t[0]+","+t[1]+","+t[2]+")":"a"===a?t[3]:"rgba("+t.join(",")+")":g;return v},brighten:function(a){var g,t=this.rgba;
if(this.stops)D(this.stops,function(g){g.brighten(a)});else if(B(a)&&0!==a)for(g=0;3>g;g++)t[g]+=r(255*a),0>t[g]&&(t[g]=0),255<t[g]&&(t[g]=255);return this},setOpacity:function(a){this.rgba[3]=a;return this},tweenTo:function(a,p){var g,v;a.rgba.length?(g=this.rgba,a=a.rgba,v=1!==a[3]||1!==g[3],a=(v?"rgba(":"rgb(")+Math.round(a[0]+(g[0]-a[0])*(1-p))+","+Math.round(a[1]+(g[1]-a[1])*(1-p))+","+Math.round(a[2]+(g[2]-a[2])*(1-p))+(v?","+(a[3]+(g[3]-a[3])*(1-p)):"")+")"):a=a.input||"none";return a}};a.color=
function(g){return new a.Color(g)}})(M);(function(a){var D,B,G=a.addEvent,E=a.animate,r=a.attr,g=a.charts,p=a.color,t=a.css,v=a.createElement,u=a.defined,l=a.deg2rad,e=a.destroyObjectProperties,k=a.doc,f=a.each,d=a.extend,x=a.erase,C=a.grep,c=a.hasTouch,q=a.inArray,I=a.isArray,m=a.isFirefox,J=a.isMS,b=a.isObject,z=a.isString,K=a.isWebKit,y=a.merge,A=a.noop,n=a.objectEach,H=a.pick,h=a.pInt,w=a.removeEvent,P=a.stop,L=a.svg,Q=a.SVG_NS,N=a.symbolSizes,O=a.win;D=a.SVGElement=function(){return this};d(D.prototype,
{opacity:1,SVG_NS:Q,textProps:"direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline".split(" "),init:function(a,h){this.element="span"===h?v(h):k.createElementNS(this.SVG_NS,h);this.renderer=a},animate:function(F,h,b){h=a.animObject(H(h,this.renderer.globalAnimation,!0));0!==h.duration?(b&&(h.complete=b),E(this,F,h)):(this.attr(F,null,b),h.step&&h.step.call(this));return this},colorGradient:function(F,h,b){var w=this.renderer,
m,d,c,e,k,L,R,z,q,A,H=[],x;F.radialGradient?d="radialGradient":F.linearGradient&&(d="linearGradient");d&&(c=F[d],k=w.gradients,R=F.stops,A=b.radialReference,I(c)&&(F[d]=c={x1:c[0],y1:c[1],x2:c[2],y2:c[3],gradientUnits:"userSpaceOnUse"}),"radialGradient"===d&&A&&!u(c.gradientUnits)&&(e=c,c=y(c,w.getRadialAttr(A,e),{gradientUnits:"userSpaceOnUse"})),n(c,function(a,F){"id"!==F&&H.push(F,a)}),n(R,function(a){H.push(a)}),H=H.join(","),k[H]?A=k[H].attr("id"):(c.id=A=a.uniqueKey(),k[H]=L=w.createElement(d).attr(c).add(w.defs),
L.radAttr=e,L.stops=[],f(R,function(F){0===F[1].indexOf("rgba")?(m=a.color(F[1]),z=m.get("rgb"),q=m.get("a")):(z=F[1],q=1);F=w.createElement("stop").attr({offset:F[0],"stop-color":z,"stop-opacity":q}).add(L);L.stops.push(F)})),x="url("+w.url+"#"+A+")",b.setAttribute(h,x),b.gradient=H,F.toString=function(){return x})},applyTextOutline:function(F){var h=this.element,b,n,w,m,d;-1!==F.indexOf("contrast")&&(F=F.replace(/contrast/g,this.renderer.getContrast(h.style.fill)));F=F.split(" ");n=F[F.length-1];
if((w=F[0])&&"none"!==w&&a.svg){this.fakeTS=!0;F=[].slice.call(h.getElementsByTagName("tspan"));this.ySetter=this.xSetter;w=w.replace(/(^[\d\.]+)(.*?)$/g,function(a,F,h){return 2*F+h});for(d=F.length;d--;)b=F[d],"highcharts-text-outline"===b.getAttribute("class")&&x(F,h.removeChild(b));m=h.firstChild;f(F,function(a,F){0===F&&(a.setAttribute("x",h.getAttribute("x")),F=h.getAttribute("y"),a.setAttribute("y",F||0),null===F&&h.setAttribute("y",0));a=a.cloneNode(1);r(a,{"class":"highcharts-text-outline",
fill:n,stroke:n,"stroke-width":w,"stroke-linejoin":"round"});h.insertBefore(a,m)})}},attr:function(a,h,b,w){var F,m=this.element,d,f=this,c,y;"string"===typeof a&&void 0!==h&&(F=a,a={},a[F]=h);"string"===typeof a?f=(this[a+"Getter"]||this._defaultGetter).call(this,a,m):(n(a,function(F,h){c=!1;w||P(this,h);this.symbolName&&/^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(h)&&(d||(this.symbolAttr(a),d=!0),c=!0);!this.rotation||"x"!==h&&"y"!==h||(this.doTransform=!0);c||(y=this[h+"Setter"]||
this._defaultSetter,y.call(this,F,h,m),this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(h)&&this.updateShadows(h,F,y))},this),this.afterSetters());b&&b();return f},afterSetters:function(){this.doTransform&&(this.updateTransform(),this.doTransform=!1)},updateShadows:function(a,h,b){for(var F=this.shadows,w=F.length;w--;)b.call(F[w],"height"===a?Math.max(h-(F[w].cutHeight||0),0):"d"===a?this.d:h,a,F[w])},addClass:function(a,h){var F=this.attr("class")||"";-1===F.indexOf(a)&&
(h||(a=(F+(F?" ":"")+a).replace("  "," ")),this.attr("class",a));return this},hasClass:function(a){return-1!==q(a,(this.attr("class")||"").split(" "))},removeClass:function(a){return this.attr("class",(this.attr("class")||"").replace(a,""))},symbolAttr:function(a){var h=this;f("x y r start end width height innerR anchorX anchorY".split(" "),function(F){h[F]=H(a[F],h[F])});h.attr({d:h.renderer.symbols[h.symbolName](h.x,h.y,h.width,h.height,h)})},clip:function(a){return this.attr("clip-path",a?"url("+
this.renderer.url+"#"+a.id+")":"none")},crisp:function(a,h){var F=this,b={},w;h=h||a.strokeWidth||0;w=Math.round(h)%2/2;a.x=Math.floor(a.x||F.x||0)+w;a.y=Math.floor(a.y||F.y||0)+w;a.width=Math.floor((a.width||F.width||0)-2*w);a.height=Math.floor((a.height||F.height||0)-2*w);u(a.strokeWidth)&&(a.strokeWidth=h);n(a,function(a,h){F[h]!==a&&(F[h]=b[h]=a)});return b},css:function(a){var F=this.styles,b={},w=this.element,m,c="",f,y=!F,e=["textOutline","textOverflow","width"];a&&a.color&&(a.fill=a.color);
F&&n(a,function(a,h){a!==F[h]&&(b[h]=a,y=!0)});y&&(F&&(a=d(F,b)),m=this.textWidth=a&&a.width&&"auto"!==a.width&&"text"===w.nodeName.toLowerCase()&&h(a.width),this.styles=a,m&&!L&&this.renderer.forExport&&delete a.width,J&&!L?t(this.element,a):(f=function(a,h){return"-"+h.toLowerCase()},n(a,function(a,h){-1===q(h,e)&&(c+=h.replace(/([A-Z])/g,f)+":"+a+";")}),c&&r(w,"style",c)),this.added&&("text"===this.element.nodeName&&this.renderer.buildText(this),a&&a.textOutline&&this.applyTextOutline(a.textOutline)));
return this},strokeWidth:function(){return this["stroke-width"]||0},on:function(a,h){var F=this,b=F.element;c&&"click"===a?(b.ontouchstart=function(a){F.touchEventFired=Date.now();a.preventDefault();h.call(b,a)},b.onclick=function(a){(-1===O.navigator.userAgent.indexOf("Android")||1100<Date.now()-(F.touchEventFired||0))&&h.call(b,a)}):b["on"+a]=h;return this},setRadialReference:function(a){var h=this.renderer.gradients[this.element.gradient];this.element.radialReference=a;h&&h.radAttr&&h.animate(this.renderer.getRadialAttr(a,
h.radAttr));return this},translate:function(a,h){return this.attr({translateX:a,translateY:h})},invert:function(a){this.inverted=a;this.updateTransform();return this},updateTransform:function(){var a=this.translateX||0,h=this.translateY||0,b=this.scaleX,w=this.scaleY,n=this.inverted,m=this.rotation,d=this.element;n&&(a+=this.width,h+=this.height);a=["translate("+a+","+h+")"];n?a.push("rotate(90) scale(-1,1)"):m&&a.push("rotate("+m+" "+(d.getAttribute("x")||0)+" "+(d.getAttribute("y")||0)+")");(u(b)||
u(w))&&a.push("scale("+H(b,1)+" "+H(w,1)+")");a.length&&d.setAttribute("transform",a.join(" "))},toFront:function(){var a=this.element;a.parentNode.appendChild(a);return this},align:function(a,h,b){var F,w,n,m,d={};w=this.renderer;n=w.alignedObjects;var c,f;if(a){if(this.alignOptions=a,this.alignByTranslate=h,!b||z(b))this.alignTo=F=b||"renderer",x(n,this),n.push(this),b=null}else a=this.alignOptions,h=this.alignByTranslate,F=this.alignTo;b=H(b,w[F],w);F=a.align;w=a.verticalAlign;n=(b.x||0)+(a.x||
0);m=(b.y||0)+(a.y||0);"right"===F?c=1:"center"===F&&(c=2);c&&(n+=(b.width-(a.width||0))/c);d[h?"translateX":"x"]=Math.round(n);"bottom"===w?f=1:"middle"===w&&(f=2);f&&(m+=(b.height-(a.height||0))/f);d[h?"translateY":"y"]=Math.round(m);this[this.placed?"animate":"attr"](d);this.placed=!0;this.alignAttr=d;return this},getBBox:function(a,h){var F,b=this.renderer,w,n=this.element,m=this.styles,c,y=this.textStr,e,k=b.cache,L=b.cacheKeys,z;h=H(h,this.rotation);w=h*l;c=m&&m.fontSize;void 0!==y&&(z=y.toString(),
-1===z.indexOf("\x3c")&&(z=z.replace(/[0-9]/g,"0")),z+=["",h||0,c,m&&m.width,m&&m.textOverflow].join());z&&!a&&(F=k[z]);if(!F){if(n.namespaceURI===this.SVG_NS||b.forExport){try{(e=this.fakeTS&&function(a){f(n.querySelectorAll(".highcharts-text-outline"),function(h){h.style.display=a})})&&e("none"),F=n.getBBox?d({},n.getBBox()):{width:n.offsetWidth,height:n.offsetHeight},e&&e("")}catch(V){}if(!F||0>F.width)F={width:0,height:0}}else F=this.htmlGetBBox();b.isSVG&&(a=F.width,b=F.height,m&&"11px"===m.fontSize&&
17===Math.round(b)&&(F.height=b=14),h&&(F.width=Math.abs(b*Math.sin(w))+Math.abs(a*Math.cos(w)),F.height=Math.abs(b*Math.cos(w))+Math.abs(a*Math.sin(w))));if(z&&0<F.height){for(;250<L.length;)delete k[L.shift()];k[z]||L.push(z);k[z]=F}}return F},show:function(a){return this.attr({visibility:a?"inherit":"visible"})},hide:function(){return this.attr({visibility:"hidden"})},fadeOut:function(a){var h=this;h.animate({opacity:0},{duration:a||150,complete:function(){h.attr({y:-9999})}})},add:function(a){var h=
this.renderer,F=this.element,b;a&&(this.parentGroup=a);this.parentInverted=a&&a.inverted;void 0!==this.textStr&&h.buildText(this);this.added=!0;if(!a||a.handleZ||this.zIndex)b=this.zIndexSetter();b||(a?a.element:h.box).appendChild(F);if(this.onAdd)this.onAdd();return this},safeRemoveChild:function(a){var h=a.parentNode;h&&h.removeChild(a)},destroy:function(){var a=this,h=a.element||{},b=a.renderer.isSVG&&"SPAN"===h.nodeName&&a.parentGroup,w=h.ownerSVGElement;h.onclick=h.onmouseout=h.onmouseover=h.onmousemove=
h.point=null;P(a);a.clipPath&&w&&(f(w.querySelectorAll("[clip-path]"),function(h){-1<h.getAttribute("clip-path").indexOf(a.clipPath.element.id+")")&&h.removeAttribute("clip-path")}),a.clipPath=a.clipPath.destroy());if(a.stops){for(w=0;w<a.stops.length;w++)a.stops[w]=a.stops[w].destroy();a.stops=null}a.safeRemoveChild(h);for(a.destroyShadows();b&&b.div&&0===b.div.childNodes.length;)h=b.parentGroup,a.safeRemoveChild(b.div),delete b.div,b=h;a.alignTo&&x(a.renderer.alignedObjects,a);n(a,function(h,b){delete a[b]});
return null},shadow:function(a,h,b){var F=[],w,n,m=this.element,d,c,f,y;if(!a)this.destroyShadows();else if(!this.shadows){c=H(a.width,3);f=(a.opacity||.15)/c;y=this.parentInverted?"(-1,-1)":"("+H(a.offsetX,1)+", "+H(a.offsetY,1)+")";for(w=1;w<=c;w++)n=m.cloneNode(0),d=2*c+1-2*w,r(n,{isShadow:"true",stroke:a.color||"#000000","stroke-opacity":f*w,"stroke-width":d,transform:"translate"+y,fill:"none"}),b&&(r(n,"height",Math.max(r(n,"height")-d,0)),n.cutHeight=d),h?h.element.appendChild(n):m.parentNode.insertBefore(n,
m),F.push(n);this.shadows=F}return this},destroyShadows:function(){f(this.shadows||[],function(a){this.safeRemoveChild(a)},this);this.shadows=void 0},xGetter:function(a){"circle"===this.element.nodeName&&("x"===a?a="cx":"y"===a&&(a="cy"));return this._defaultGetter(a)},_defaultGetter:function(a){a=H(this[a],this.element?this.element.getAttribute(a):null,0);/^[\-0-9\.]+$/.test(a)&&(a=parseFloat(a));return a},dSetter:function(a,h,b){a&&a.join&&(a=a.join(" "));/(NaN| {2}|^$)/.test(a)&&(a="M 0 0");this[h]!==
a&&(b.setAttribute(h,a),this[h]=a)},dashstyleSetter:function(a){var b,w=this["stroke-width"];"inherit"===w&&(w=1);if(a=a&&a.toLowerCase()){a=a.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(b=a.length;b--;)a[b]=h(a[b])*w;a=a.join(",").replace(/NaN/g,"none");this.element.setAttribute("stroke-dasharray",a)}},alignSetter:function(a){this.element.setAttribute("text-anchor",
{left:"start",center:"middle",right:"end"}[a])},opacitySetter:function(a,h,b){this[h]=a;b.setAttribute(h,a)},titleSetter:function(a){var h=this.element.getElementsByTagName("title")[0];h||(h=k.createElementNS(this.SVG_NS,"title"),this.element.appendChild(h));h.firstChild&&h.removeChild(h.firstChild);h.appendChild(k.createTextNode(String(H(a),"").replace(/<[^>]*>/g,"")))},textSetter:function(a){a!==this.textStr&&(delete this.bBox,this.textStr=a,this.added&&this.renderer.buildText(this))},fillSetter:function(a,
h,b){"string"===typeof a?b.setAttribute(h,a):a&&this.colorGradient(a,h,b)},visibilitySetter:function(a,h,b){"inherit"===a?b.removeAttribute(h):this[h]!==a&&b.setAttribute(h,a);this[h]=a},zIndexSetter:function(a,b){var w=this.renderer,n=this.parentGroup,m=(n||w).element||w.box,F,d=this.element,c;F=this.added;var f;u(a)&&(d.zIndex=a,a=+a,this[b]===a&&(F=!1),this[b]=a);if(F){(a=this.zIndex)&&n&&(n.handleZ=!0);b=m.childNodes;for(f=0;f<b.length&&!c;f++)n=b[f],F=n.zIndex,n!==d&&(h(F)>a||!u(a)&&u(F)||0>
a&&!u(F)&&m!==w.box)&&(m.insertBefore(d,n),c=!0);c||m.appendChild(d)}return c},_defaultSetter:function(a,h,b){b.setAttribute(h,a)}});D.prototype.yGetter=D.prototype.xGetter;D.prototype.translateXSetter=D.prototype.translateYSetter=D.prototype.rotationSetter=D.prototype.verticalAlignSetter=D.prototype.scaleXSetter=D.prototype.scaleYSetter=function(a,h){this[h]=a;this.doTransform=!0};D.prototype["stroke-widthSetter"]=D.prototype.strokeSetter=function(a,h,b){this[h]=a;this.stroke&&this["stroke-width"]?
(D.prototype.fillSetter.call(this,this.stroke,"stroke",b),b.setAttribute("stroke-width",this["stroke-width"]),this.hasStroke=!0):"stroke-width"===h&&0===a&&this.hasStroke&&(b.removeAttribute("stroke"),this.hasStroke=!1)};B=a.SVGRenderer=function(){this.init.apply(this,arguments)};d(B.prototype,{Element:D,SVG_NS:Q,init:function(a,h,b,w,n,d){var F;w=this.createElement("svg").attr({version:"1.1","class":"highcharts-root"}).css(this.getStyle(w));F=w.element;a.appendChild(F);-1===a.innerHTML.indexOf("xmlns")&&
r(F,"xmlns",this.SVG_NS);this.isSVG=!0;this.box=F;this.boxWrapper=w;this.alignedObjects=[];this.url=(m||K)&&k.getElementsByTagName("base").length?O.location.href.replace(/#.*?$/,"").replace(/<[^>]*>/g,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(k.createTextNode("Created with Highstock 5.0.14"));this.defs=this.createElement("defs").add();this.allowHTML=d;this.forExport=n;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=
0;this.setSize(h,b,!1);var c;m&&a.getBoundingClientRect&&(h=function(){t(a,{left:0,top:0});c=a.getBoundingClientRect();t(a,{left:Math.ceil(c.left)-c.left+"px",top:Math.ceil(c.top)-c.top+"px"})},h(),this.unSubPixelFix=G(O,"resize",h))},getStyle:function(a){return this.style=d({fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',fontSize:"12px"},a)},setStyle:function(a){this.boxWrapper.css(this.getStyle(a))},isHidden:function(){return!this.boxWrapper.getBBox().width},destroy:function(){var a=
this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();e(this.gradients||{});this.gradients=null;a&&(this.defs=a.destroy());this.unSubPixelFix&&this.unSubPixelFix();return this.alignedObjects=null},createElement:function(a){var h=new this.Element;h.init(this,a);return h},draw:A,getRadialAttr:function(a,h){return{cx:a[0]-a[2]/2+h.cx*a[2],cy:a[1]-a[2]/2+h.cy*a[2],r:h.r*a[2]}},getSpanWidth:function(a,h){var b=a.getBBox(!0).width;!L&&this.forExport&&(b=this.measureSpanWidth(h.firstChild.data,
a.styles));return b},applyEllipsis:function(a,h,b,w){var n=a.rotation,m=b,c,d=0,F=b.length,f=function(a){h.removeChild(h.firstChild);a&&h.appendChild(k.createTextNode(a))},y;a.rotation=0;m=this.getSpanWidth(a,h);if(y=m>w){for(;d<=F;)c=Math.ceil((d+F)/2),m=b.substring(0,c)+"\u2026",f(m),m=this.getSpanWidth(a,h),d===F?d=F+1:m>w?F=c-1:d=c;0===F&&f("")}a.rotation=n;return y},buildText:function(a){var b=a.element,w=this,n=w.forExport,m=H(a.textStr,"").toString(),c=-1!==m.indexOf("\x3c"),d=b.childNodes,
F,y,e,z,q=r(b,"x"),A=a.styles,x=a.textWidth,J=A&&A.lineHeight,l=A&&A.textOutline,P=A&&"ellipsis"===A.textOverflow,g=A&&"nowrap"===A.whiteSpace,K=A&&A.fontSize,I,v,p=d.length,A=x&&!a.added&&this.box,u=function(a){var n;n=/(px|em)$/.test(a&&a.style.fontSize)?a.style.fontSize:K||w.style.fontSize||12;return J?h(J):w.fontMetrics(n,a.getAttribute("style")?a:b).h};I=[m,P,g,J,l,K,x].join();if(I!==a.textCache){for(a.textCache=I;p--;)b.removeChild(d[p]);c||l||P||x||-1!==m.indexOf(" ")?(F=/<.*class="([^"]+)".*>/,
y=/<.*style="([^"]+)".*>/,e=/<.*href="([^"]+)".*>/,A&&A.appendChild(b),m=c?m.replace(/<(b|strong)>/g,'\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g,'\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g,"\x3cspan").replace(/<\/(b|strong|i|em|a)>/g,"\x3c/span\x3e").split(/<br.*?>/g):[m],m=C(m,function(a){return""!==a}),f(m,function(h,m){var c,d=0;h=h.replace(/^\s+|\s+$/g,"").replace(/<span/g,"|||\x3cspan").replace(/<\/span>/g,"\x3c/span\x3e|||");c=h.split("|||");f(c,function(h){if(""!==
h||1===c.length){var f={},A=k.createElementNS(w.SVG_NS,"tspan"),H,J;F.test(h)&&(H=h.match(F)[1],r(A,"class",H));y.test(h)&&(J=h.match(y)[1].replace(/(;| |^)color([ :])/,"$1fill$2"),r(A,"style",J));e.test(h)&&!n&&(r(A,"onclick",'location.href\x3d"'+h.match(e)[1]+'"'),t(A,{cursor:"pointer"}));h=(h.replace(/<(.|\n)*?>/g,"")||" ").replace(/&lt;/g,"\x3c").replace(/&gt;/g,"\x3e");if(" "!==h){A.appendChild(k.createTextNode(h));d?f.dx=0:m&&null!==q&&(f.x=q);r(A,f);b.appendChild(A);!d&&v&&(!L&&n&&t(A,{display:"block"}),
r(A,"dy",u(A)));if(x){f=h.replace(/([^\^])-/g,"$1- ").split(" ");H=1<c.length||m||1<f.length&&!g;var l=[],C,R=u(A),K=a.rotation;for(P&&(z=w.applyEllipsis(a,A,h,x));!P&&H&&(f.length||l.length);)a.rotation=0,C=w.getSpanWidth(a,A),h=C>x,void 0===z&&(z=h),h&&1!==f.length?(A.removeChild(A.firstChild),l.unshift(f.pop())):(f=l,l=[],f.length&&!g&&(A=k.createElementNS(Q,"tspan"),r(A,{dy:R,x:q}),J&&r(A,"style",J),b.appendChild(A)),C>x&&(x=C)),f.length&&A.appendChild(k.createTextNode(f.join(" ").replace(/- /g,
"-")));a.rotation=K}d++}}});v=v||b.childNodes.length}),z&&a.attr("title",a.textStr),A&&A.removeChild(b),l&&a.applyTextOutline&&a.applyTextOutline(l)):b.appendChild(k.createTextNode(m.replace(/&lt;/g,"\x3c").replace(/&gt;/g,"\x3e")))}},getContrast:function(a){a=p(a).rgba;return 510<a[0]+a[1]+a[2]?"#000000":"#FFFFFF"},button:function(a,h,b,w,n,m,c,f,e){var F=this.label(a,h,b,e,null,null,null,null,"button"),A=0;F.attr(y({padding:8,r:2},n));var k,z,L,q;n=y({fill:"#f7f7f7",stroke:"#cccccc","stroke-width":1,
style:{color:"#333333",cursor:"pointer",fontWeight:"normal"}},n);k=n.style;delete n.style;m=y(n,{fill:"#e6e6e6"},m);z=m.style;delete m.style;c=y(n,{fill:"#e6ebf5",style:{color:"#000000",fontWeight:"bold"}},c);L=c.style;delete c.style;f=y(n,{style:{color:"#cccccc"}},f);q=f.style;delete f.style;G(F.element,J?"mouseover":"mouseenter",function(){3!==A&&F.setState(1)});G(F.element,J?"mouseout":"mouseleave",function(){3!==A&&F.setState(A)});F.setState=function(a){1!==a&&(F.state=A=a);F.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-"+
["normal","hover","pressed","disabled"][a||0]);F.attr([n,m,c,f][a||0]).css([k,z,L,q][a||0])};F.attr(n).css(d({cursor:"default"},k));return F.on("click",function(a){3!==A&&w.call(F,a)})},crispLine:function(a,h){a[1]===a[4]&&(a[1]=a[4]=Math.round(a[1])-h%2/2);a[2]===a[5]&&(a[2]=a[5]=Math.round(a[2])+h%2/2);return a},path:function(a){var h={fill:"none"};I(a)?h.d=a:b(a)&&d(h,a);return this.createElement("path").attr(h)},circle:function(a,h,w){a=b(a)?a:{x:a,y:h,r:w};h=this.createElement("circle");h.xSetter=
h.ySetter=function(a,h,b){b.setAttribute("c"+h,a)};return h.attr(a)},arc:function(a,h,w,n,m,c){b(a)?(n=a,h=n.y,w=n.r,a=n.x):n={innerR:n,start:m,end:c};a=this.symbol("arc",a,h,w,w,n);a.r=w;return a},rect:function(a,h,w,n,m,c){m=b(a)?a.r:m;var d=this.createElement("rect");a=b(a)?a:void 0===a?{}:{x:a,y:h,width:Math.max(w,0),height:Math.max(n,0)};void 0!==c&&(a.strokeWidth=c,a=d.crisp(a));a.fill="none";m&&(a.r=m);d.rSetter=function(a,h,b){r(b,{rx:a,ry:a})};return d.attr(a)},setSize:function(a,h,b){var w=
this.alignedObjects,n=w.length;this.width=a;this.height=h;for(this.boxWrapper.animate({width:a,height:h},{step:function(){this.attr({viewBox:"0 0 "+this.attr("width")+" "+this.attr("height")})},duration:H(b,!0)?void 0:0});n--;)w[n].align()},g:function(a){var h=this.createElement("g");return a?h.attr({"class":"highcharts-"+a}):h},image:function(a,h,b,w,n){var m={preserveAspectRatio:"none"};1<arguments.length&&d(m,{x:h,y:b,width:w,height:n});m=this.createElement("image").attr(m);m.element.setAttributeNS?
m.element.setAttributeNS("http://www.w3.org/1999/xlink","href",a):m.element.setAttribute("hc-svg-href",a);return m},symbol:function(a,h,b,w,n,m){var c=this,y,F=/^url\((.*?)\)$/,e=F.test(a),A=!e&&(this.symbols[a]?a:"circle"),z=A&&this.symbols[A],L=u(h)&&z&&z.call(this.symbols,Math.round(h),Math.round(b),w,n,m),q,x;z?(y=this.path(L),y.attr("fill","none"),d(y,{symbolName:A,x:h,y:b,width:w,height:n}),m&&d(y,m)):e&&(q=a.match(F)[1],y=this.image(q),y.imgwidth=H(N[q]&&N[q].width,m&&m.width),y.imgheight=
H(N[q]&&N[q].height,m&&m.height),x=function(){y.attr({width:y.width,height:y.height})},f(["width","height"],function(a){y[a+"Setter"]=function(a,h){var b={},w=this["img"+h],n="width"===h?"translateX":"translateY";this[h]=a;u(w)&&(this.element&&this.element.setAttribute(h,w),this.alignByTranslate||(b[n]=((this[h]||0)-w)/2,this.attr(b)))}}),u(h)&&y.attr({x:h,y:b}),y.isImg=!0,u(y.imgwidth)&&u(y.imgheight)?x():(y.attr({width:0,height:0}),v("img",{onload:function(){var a=g[c.chartIndex];0===this.width&&
(t(this,{position:"absolute",top:"-999em"}),k.body.appendChild(this));N[q]={width:this.width,height:this.height};y.imgwidth=this.width;y.imgheight=this.height;y.element&&x();this.parentNode&&this.parentNode.removeChild(this);c.imgCount--;if(!c.imgCount&&a&&a.onload)a.onload()},src:q}),this.imgCount++));return y},symbols:{circle:function(a,h,b,w){return this.arc(a+b/2,h+w/2,b/2,w/2,{start:0,end:2*Math.PI,open:!1})},square:function(a,h,b,w){return["M",a,h,"L",a+b,h,a+b,h+w,a,h+w,"Z"]},triangle:function(a,
h,b,w){return["M",a+b/2,h,"L",a+b,h+w,a,h+w,"Z"]},"triangle-down":function(a,h,b,w){return["M",a,h,"L",a+b,h,a+b/2,h+w,"Z"]},diamond:function(a,h,b,w){return["M",a+b/2,h,"L",a+b,h+w/2,a+b/2,h+w,a,h+w/2,"Z"]},arc:function(a,h,b,w,n){var m=n.start,c=n.r||b,d=n.r||w||b,f=n.end-.001;b=n.innerR;w=H(n.open,.001>Math.abs(n.end-n.start-2*Math.PI));var y=Math.cos(m),e=Math.sin(m),F=Math.cos(f),f=Math.sin(f);n=.001>n.end-m-Math.PI?0:1;c=["M",a+c*y,h+d*e,"A",c,d,0,n,1,a+c*F,h+d*f];u(b)&&c.push(w?"M":"L",a+b*
F,h+b*f,"A",b,b,0,n,0,a+b*y,h+b*e);c.push(w?"":"Z");return c},callout:function(a,h,b,w,n){var m=Math.min(n&&n.r||0,b,w),c=m+6,d=n&&n.anchorX;n=n&&n.anchorY;var f;f=["M",a+m,h,"L",a+b-m,h,"C",a+b,h,a+b,h,a+b,h+m,"L",a+b,h+w-m,"C",a+b,h+w,a+b,h+w,a+b-m,h+w,"L",a+m,h+w,"C",a,h+w,a,h+w,a,h+w-m,"L",a,h+m,"C",a,h,a,h,a+m,h];d&&d>b?n>h+c&&n<h+w-c?f.splice(13,3,"L",a+b,n-6,a+b+6,n,a+b,n+6,a+b,h+w-m):f.splice(13,3,"L",a+b,w/2,d,n,a+b,w/2,a+b,h+w-m):d&&0>d?n>h+c&&n<h+w-c?f.splice(33,3,"L",a,n+6,a-6,n,a,n-6,
a,h+m):f.splice(33,3,"L",a,w/2,d,n,a,w/2,a,h+m):n&&n>w&&d>a+c&&d<a+b-c?f.splice(23,3,"L",d+6,h+w,d,h+w+6,d-6,h+w,a+m,h+w):n&&0>n&&d>a+c&&d<a+b-c&&f.splice(3,3,"L",d-6,h,d,h-6,d+6,h,b-m,h);return f}},clipRect:function(h,b,w,n){var m=a.uniqueKey(),c=this.createElement("clipPath").attr({id:m}).add(this.defs);h=this.rect(h,b,w,n,0).add(c);h.id=m;h.clipPath=c;h.count=0;return h},text:function(a,h,b,w){var n=!L&&this.forExport,m={};if(w&&(this.allowHTML||!this.forExport))return this.html(a,h,b);m.x=Math.round(h||
0);b&&(m.y=Math.round(b));if(a||0===a)m.text=a;a=this.createElement("text").attr(m);n&&a.css({position:"absolute"});w||(a.xSetter=function(a,h,b){var w=b.getElementsByTagName("tspan"),n,m=b.getAttribute(h),c;for(c=0;c<w.length;c++)n=w[c],n.getAttribute(h)===m&&n.setAttribute(h,a);b.setAttribute(h,a)});return a},fontMetrics:function(a,b){a=a||b&&b.style&&b.style.fontSize||this.style&&this.style.fontSize;a=/px/.test(a)?h(a):/em/.test(a)?parseFloat(a)*(b?this.fontMetrics(null,b.parentNode).f:16):12;
b=24>a?a+3:Math.round(1.2*a);return{h:b,b:Math.round(.8*b),f:a}},rotCorr:function(a,h,b){var w=a;h&&b&&(w=Math.max(w*Math.cos(h*l),4));return{x:-a/3*Math.sin(h*l),y:w}},label:function(h,b,n,m,c,e,A,k,z){var L=this,q=L.g("button"!==z&&"label"),H=q.text=L.text("",0,0,A).attr({zIndex:1}),x,F,J=0,l=3,C=0,P,g,K,I,t,Q={},v,p,r=/^url\((.*?)\)$/.test(m),R=r,N,U,T,O;z&&q.addClass("highcharts-"+z);R=r;N=function(){return(v||0)%2/2};U=function(){var a=H.element.style,h={};F=(void 0===P||void 0===g||t)&&u(H.textStr)&&
H.getBBox();q.width=(P||F.width||0)+2*l+C;q.height=(g||F.height||0)+2*l;p=l+L.fontMetrics(a&&a.fontSize,H).b;R&&(x||(q.box=x=L.symbols[m]||r?L.symbol(m):L.rect(),x.addClass(("button"===z?"":"highcharts-label-box")+(z?" highcharts-"+z+"-box":"")),x.add(q),a=N(),h.x=a,h.y=(k?-p:0)+a),h.width=Math.round(q.width),h.height=Math.round(q.height),x.attr(d(h,Q)),Q={})};T=function(){var a=C+l,h;h=k?0:p;u(P)&&F&&("center"===t||"right"===t)&&(a+={center:.5,right:1}[t]*(P-F.width));if(a!==H.x||h!==H.y)H.attr("x",
a),void 0!==h&&H.attr("y",h);H.x=a;H.y=h};O=function(a,h){x?x.attr(a,h):Q[a]=h};q.onAdd=function(){H.add(q);q.attr({text:h||0===h?h:"",x:b,y:n});x&&u(c)&&q.attr({anchorX:c,anchorY:e})};q.widthSetter=function(h){P=a.isNumber(h)?h:null};q.heightSetter=function(a){g=a};q["text-alignSetter"]=function(a){t=a};q.paddingSetter=function(a){u(a)&&a!==l&&(l=q.padding=a,T())};q.paddingLeftSetter=function(a){u(a)&&a!==C&&(C=a,T())};q.alignSetter=function(a){a={left:0,center:.5,right:1}[a];a!==J&&(J=a,F&&q.attr({x:K}))};
q.textSetter=function(a){void 0!==a&&H.textSetter(a);U();T()};q["stroke-widthSetter"]=function(a,h){a&&(R=!0);v=this["stroke-width"]=a;O(h,a)};q.strokeSetter=q.fillSetter=q.rSetter=function(a,h){"r"!==h&&("fill"===h&&a&&(R=!0),q[h]=a);O(h,a)};q.anchorXSetter=function(a,h){c=q.anchorX=a;O(h,Math.round(a)-N()-K)};q.anchorYSetter=function(a,h){e=q.anchorY=a;O(h,a-I)};q.xSetter=function(a){q.x=a;J&&(a-=J*((P||F.width)+2*l));K=Math.round(a);q.attr("translateX",K)};q.ySetter=function(a){I=q.y=Math.round(a);
q.attr("translateY",I)};var B=q.css;return d(q,{css:function(a){if(a){var h={};a=y(a);f(q.textProps,function(b){void 0!==a[b]&&(h[b]=a[b],delete a[b])});H.css(h)}return B.call(q,a)},getBBox:function(){return{width:F.width+2*l,height:F.height+2*l,x:F.x-l,y:F.y-l}},shadow:function(a){a&&(U(),x&&x.shadow(a));return q},destroy:function(){w(q.element,"mouseenter");w(q.element,"mouseleave");H&&(H=H.destroy());x&&(x=x.destroy());D.prototype.destroy.call(q);q=L=U=T=O=null}})}});a.Renderer=B})(M);(function(a){var D=
a.attr,B=a.createElement,G=a.css,E=a.defined,r=a.each,g=a.extend,p=a.isFirefox,t=a.isMS,v=a.isWebKit,u=a.pInt,l=a.SVGRenderer,e=a.win,k=a.wrap;g(a.SVGElement.prototype,{htmlCss:function(a){var d=this.element;if(d=a&&"SPAN"===d.tagName&&a.width)delete a.width,this.textWidth=d,this.updateTransform();a&&"ellipsis"===a.textOverflow&&(a.whiteSpace="nowrap",a.overflow="hidden");this.styles=g(this.styles,a);G(this.element,a);return this},htmlGetBBox:function(){var a=this.element;"text"===a.nodeName&&(a.style.position=
"absolute");return{x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight}},htmlUpdateTransform:function(){if(this.added){var a=this.renderer,d=this.element,e=this.translateX||0,k=this.translateY||0,c=this.x||0,q=this.y||0,l=this.textAlign||"left",m={left:0,center:.5,right:1}[l],J=this.styles;G(d,{marginLeft:e,marginTop:k});this.shadows&&r(this.shadows,function(a){G(a,{marginLeft:e+1,marginTop:k+1})});this.inverted&&r(d.childNodes,function(b){a.invertChild(b,d)});if("SPAN"===d.tagName){var b=
this.rotation,z=u(this.textWidth),g=J&&J.whiteSpace,y=[b,l,d.innerHTML,this.textWidth,this.textAlign].join();y!==this.cTT&&(J=a.fontMetrics(d.style.fontSize).b,E(b)&&this.setSpanRotation(b,m,J),G(d,{width:"",whiteSpace:g||"nowrap"}),d.offsetWidth>z&&/[ \-]/.test(d.textContent||d.innerText)&&G(d,{width:z+"px",display:"block",whiteSpace:g||"normal"}),this.getSpanCorrection(d.offsetWidth,J,m,b,l));G(d,{left:c+(this.xCorr||0)+"px",top:q+(this.yCorr||0)+"px"});v&&(J=d.offsetHeight);this.cTT=y}}else this.alignOnAdd=
!0},setSpanRotation:function(a,d,k){var f={},c=t?"-ms-transform":v?"-webkit-transform":p?"MozTransform":e.opera?"-o-transform":"";f[c]=f.transform="rotate("+a+"deg)";f[c+(p?"Origin":"-origin")]=f.transformOrigin=100*d+"% "+k+"px";G(this.element,f)},getSpanCorrection:function(a,d,e){this.xCorr=-a*e;this.yCorr=-d}});g(l.prototype,{html:function(a,d,e){var f=this.createElement("span"),c=f.element,q=f.renderer,x=q.isSVG,m=function(a,b){r(["opacity","visibility"],function(m){k(a,m+"Setter",function(a,
m,c,n){a.call(this,m,c,n);b[c]=m})})};f.textSetter=function(a){a!==c.innerHTML&&delete this.bBox;c.innerHTML=this.textStr=a;f.htmlUpdateTransform()};x&&m(f,f.element.style);f.xSetter=f.ySetter=f.alignSetter=f.rotationSetter=function(a,b){"align"===b&&(b="textAlign");f[b]=a;f.htmlUpdateTransform()};f.attr({text:a,x:Math.round(d),y:Math.round(e)}).css({fontFamily:this.style.fontFamily,fontSize:this.style.fontSize,position:"absolute"});c.style.whiteSpace="nowrap";f.css=f.htmlCss;x&&(f.add=function(a){var b,
d=q.box.parentNode,e=[];if(this.parentGroup=a){if(b=a.div,!b){for(;a;)e.push(a),a=a.parentGroup;r(e.reverse(),function(a){var c,n=D(a.element,"class");n&&(n={className:n});b=a.div=a.div||B("div",n,{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px",display:a.display,opacity:a.opacity,pointerEvents:a.styles&&a.styles.pointerEvents},b||d);c=b.style;g(a,{classSetter:function(a){this.element.setAttribute("class",a);b.className=a},on:function(){e[0].div&&f.on.apply({element:e[0].div},
arguments);return a},translateXSetter:function(b,h){c.left=b+"px";a[h]=b;a.doTransform=!0},translateYSetter:function(b,h){c.top=b+"px";a[h]=b;a.doTransform=!0}});m(a,c)})}}else b=d;b.appendChild(c);f.added=!0;f.alignOnAdd&&f.htmlUpdateTransform();return f});return f}})})(M);(function(a){var D,B,G=a.createElement,E=a.css,r=a.defined,g=a.deg2rad,p=a.discardElement,t=a.doc,v=a.each,u=a.erase,l=a.extend;D=a.extendClass;var e=a.isArray,k=a.isNumber,f=a.isObject,d=a.merge;B=a.noop;var x=a.pick,C=a.pInt,
c=a.SVGElement,q=a.SVGRenderer,I=a.win;a.svg||(B={docMode8:t&&8===t.documentMode,init:function(a,c){var b=["\x3c",c,' filled\x3d"f" stroked\x3d"f"'],m=["position: ","absolute",";"],d="div"===c;("shape"===c||d)&&m.push("left:0;top:0;width:1px;height:1px;");m.push("visibility: ",d?"hidden":"visible");b.push(' style\x3d"',m.join(""),'"/\x3e');c&&(b=d||"span"===c||"img"===c?b.join(""):a.prepVML(b),this.element=G(b));this.renderer=a},add:function(a){var m=this.renderer,b=this.element,c=m.box,d=a&&a.inverted,
c=a?a.element||a:c;a&&(this.parentGroup=a);d&&m.invertChild(b,c);c.appendChild(b);this.added=!0;this.alignOnAdd&&!this.deferUpdateTransform&&this.updateTransform();if(this.onAdd)this.onAdd();this.className&&this.attr("class",this.className);return this},updateTransform:c.prototype.htmlUpdateTransform,setSpanRotation:function(){var a=this.rotation,c=Math.cos(a*g),b=Math.sin(a*g);E(this.element,{filter:a?["progid:DXImageTransform.Microsoft.Matrix(M11\x3d",c,", M12\x3d",-b,", M21\x3d",b,", M22\x3d",
c,", sizingMethod\x3d'auto expand')"].join(""):"none"})},getSpanCorrection:function(a,c,b,d,f){var m=d?Math.cos(d*g):1,e=d?Math.sin(d*g):0,n=x(this.elemHeight,this.element.offsetHeight),q;this.xCorr=0>m&&-a;this.yCorr=0>e&&-n;q=0>m*e;this.xCorr+=e*c*(q?1-b:b);this.yCorr-=m*c*(d?q?b:1-b:1);f&&"left"!==f&&(this.xCorr-=a*b*(0>m?-1:1),d&&(this.yCorr-=n*b*(0>e?-1:1)),E(this.element,{textAlign:f}))},pathToVML:function(a){for(var m=a.length,b=[];m--;)k(a[m])?b[m]=Math.round(10*a[m])-5:"Z"===a[m]?b[m]="x":
(b[m]=a[m],!a.isArc||"wa"!==a[m]&&"at"!==a[m]||(b[m+5]===b[m+7]&&(b[m+7]+=a[m+7]>a[m+5]?1:-1),b[m+6]===b[m+8]&&(b[m+8]+=a[m+8]>a[m+6]?1:-1)));return b.join(" ")||"x"},clip:function(a){var m=this,b;a?(b=a.members,u(b,m),b.push(m),m.destroyClip=function(){u(b,m)},a=a.getCSS(m)):(m.destroyClip&&m.destroyClip(),a={clip:m.docMode8?"inherit":"rect(auto)"});return m.css(a)},css:c.prototype.htmlCss,safeRemoveChild:function(a){a.parentNode&&p(a)},destroy:function(){this.destroyClip&&this.destroyClip();return c.prototype.destroy.apply(this)},
on:function(a,c){this.element["on"+a]=function(){var a=I.event;a.target=a.srcElement;c(a)};return this},cutOffPath:function(a,c){var b;a=a.split(/[ ,]/);b=a.length;if(9===b||11===b)a[b-4]=a[b-2]=C(a[b-2])-10*c;return a.join(" ")},shadow:function(a,c,b){var m=[],d,f=this.element,e=this.renderer,n,q=f.style,h,w=f.path,k,L,l,J;w&&"string"!==typeof w.value&&(w="x");L=w;if(a){l=x(a.width,3);J=(a.opacity||.15)/l;for(d=1;3>=d;d++)k=2*l+1-2*d,b&&(L=this.cutOffPath(w.value,k+.5)),h=['\x3cshape isShadow\x3d"true" strokeweight\x3d"',
k,'" filled\x3d"false" path\x3d"',L,'" coordsize\x3d"10 10" style\x3d"',f.style.cssText,'" /\x3e'],n=G(e.prepVML(h),null,{left:C(q.left)+x(a.offsetX,1),top:C(q.top)+x(a.offsetY,1)}),b&&(n.cutOff=k+1),h=['\x3cstroke color\x3d"',a.color||"#000000",'" opacity\x3d"',J*d,'"/\x3e'],G(e.prepVML(h),null,null,n),c?c.element.appendChild(n):f.parentNode.insertBefore(n,f),m.push(n);this.shadows=m}return this},updateShadows:B,setAttr:function(a,c){this.docMode8?this.element[a]=c:this.element.setAttribute(a,c)},
classSetter:function(a){(this.added?this.element:this).className=a},dashstyleSetter:function(a,c,b){(b.getElementsByTagName("stroke")[0]||G(this.renderer.prepVML(["\x3cstroke/\x3e"]),null,null,b))[c]=a||"solid";this[c]=a},dSetter:function(a,c,b){var m=this.shadows;a=a||[];this.d=a.join&&a.join(" ");b.path=a=this.pathToVML(a);if(m)for(b=m.length;b--;)m[b].path=m[b].cutOff?this.cutOffPath(a,m[b].cutOff):a;this.setAttr(c,a)},fillSetter:function(a,c,b){var m=b.nodeName;"SPAN"===m?b.style.color=a:"IMG"!==
m&&(b.filled="none"!==a,this.setAttr("fillcolor",this.renderer.color(a,b,c,this)))},"fill-opacitySetter":function(a,c,b){G(this.renderer.prepVML(["\x3c",c.split("-")[0],' opacity\x3d"',a,'"/\x3e']),null,null,b)},opacitySetter:B,rotationSetter:function(a,c,b){b=b.style;this[c]=b[c]=a;b.left=-Math.round(Math.sin(a*g)+1)+"px";b.top=Math.round(Math.cos(a*g))+"px"},strokeSetter:function(a,c,b){this.setAttr("strokecolor",this.renderer.color(a,b,c,this))},"stroke-widthSetter":function(a,c,b){b.stroked=!!a;
this[c]=a;k(a)&&(a+="px");this.setAttr("strokeweight",a)},titleSetter:function(a,c){this.setAttr(c,a)},visibilitySetter:function(a,c,b){"inherit"===a&&(a="visible");this.shadows&&v(this.shadows,function(b){b.style[c]=a});"DIV"===b.nodeName&&(a="hidden"===a?"-999em":0,this.docMode8||(b.style[c]=a?"visible":"hidden"),c="top");b.style[c]=a},xSetter:function(a,c,b){this[c]=a;"x"===c?c="left":"y"===c&&(c="top");this.updateClipping?(this[c]=a,this.updateClipping()):b.style[c]=a},zIndexSetter:function(a,
c,b){b.style[c]=a}},B["stroke-opacitySetter"]=B["fill-opacitySetter"],a.VMLElement=B=D(c,B),B.prototype.ySetter=B.prototype.widthSetter=B.prototype.heightSetter=B.prototype.xSetter,B={Element:B,isIE8:-1<I.navigator.userAgent.indexOf("MSIE 8.0"),init:function(a,c,b){var m,d;this.alignedObjects=[];m=this.createElement("div").css({position:"relative"});d=m.element;a.appendChild(m.element);this.isVML=!0;this.box=d;this.boxWrapper=m;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(c,
b,!1);if(!t.namespaces.hcv){t.namespaces.add("hcv","urn:schemas-microsoft-com:vml");try{t.createStyleSheet().cssText="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}catch(y){t.styleSheets[0].cssText+="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}}},isHidden:function(){return!this.box.offsetWidth},clipRect:function(a,c,b,d){var m=this.createElement(),y=f(a);return l(m,{members:[],
count:0,left:(y?a.x:a)+1,top:(y?a.y:c)+1,width:(y?a.width:b)-1,height:(y?a.height:d)-1,getCSS:function(a){var b=a.element,c=b.nodeName,h=a.inverted,w=this.top-("shape"===c?b.offsetTop:0),m=this.left,b=m+this.width,d=w+this.height,w={clip:"rect("+Math.round(h?m:w)+"px,"+Math.round(h?d:b)+"px,"+Math.round(h?b:d)+"px,"+Math.round(h?w:m)+"px)"};!h&&a.docMode8&&"DIV"===c&&l(w,{width:b+"px",height:d+"px"});return w},updateClipping:function(){v(m.members,function(a){a.element&&a.css(m.getCSS(a))})}})},color:function(c,
d,b,f){var m=this,y,e=/^rgba/,n,q,h="none";c&&c.linearGradient?q="gradient":c&&c.radialGradient&&(q="pattern");if(q){var w,k,L=c.linearGradient||c.radialGradient,x,z,l,F,C,g="";c=c.stops;var J,t=[],I=function(){n=['\x3cfill colors\x3d"'+t.join(",")+'" opacity\x3d"',l,'" o:opacity2\x3d"',z,'" type\x3d"',q,'" ',g,'focus\x3d"100%" method\x3d"any" /\x3e'];G(m.prepVML(n),null,null,d)};x=c[0];J=c[c.length-1];0<x[0]&&c.unshift([0,x[1]]);1>J[0]&&c.push([1,J[1]]);v(c,function(h,b){e.test(h[1])?(y=a.color(h[1]),
w=y.get("rgb"),k=y.get("a")):(w=h[1],k=1);t.push(100*h[0]+"% "+w);b?(l=k,F=w):(z=k,C=w)});if("fill"===b)if("gradient"===q)b=L.x1||L[0]||0,c=L.y1||L[1]||0,x=L.x2||L[2]||0,L=L.y2||L[3]||0,g='angle\x3d"'+(90-180*Math.atan((L-c)/(x-b))/Math.PI)+'"',I();else{var h=L.r,p=2*h,u=2*h,r=L.cx,B=L.cy,D=d.radialReference,E,h=function(){D&&(E=f.getBBox(),r+=(D[0]-E.x)/E.width-.5,B+=(D[1]-E.y)/E.height-.5,p*=D[2]/E.width,u*=D[2]/E.height);g='src\x3d"'+a.getOptions().global.VMLRadialGradientURL+'" size\x3d"'+p+","+
u+'" origin\x3d"0.5,0.5" position\x3d"'+r+","+B+'" color2\x3d"'+C+'" ';I()};f.added?h():f.onAdd=h;h=F}else h=w}else e.test(c)&&"IMG"!==d.tagName?(y=a.color(c),f[b+"-opacitySetter"](y.get("a"),b,d),h=y.get("rgb")):(h=d.getElementsByTagName(b),h.length&&(h[0].opacity=1,h[0].type="solid"),h=c);return h},prepVML:function(a){var c=this.isIE8;a=a.join("");c?(a=a.replace("/\x3e",' xmlns\x3d"urn:schemas-microsoft-com:vml" /\x3e'),a=-1===a.indexOf('style\x3d"')?a.replace("/\x3e",' style\x3d"display:inline-block;behavior:url(#default#VML);" /\x3e'):
a.replace('style\x3d"','style\x3d"display:inline-block;behavior:url(#default#VML);')):a=a.replace("\x3c","\x3chcv:");return a},text:q.prototype.html,path:function(a){var c={coordsize:"10 10"};e(a)?c.d=a:f(a)&&l(c,a);return this.createElement("shape").attr(c)},circle:function(a,c,b){var d=this.symbol("circle");f(a)&&(b=a.r,c=a.y,a=a.x);d.isCircle=!0;d.r=b;return d.attr({x:a,y:c})},g:function(a){var c;a&&(c={className:"highcharts-"+a,"class":"highcharts-"+a});return this.createElement("div").attr(c)},
image:function(a,c,b,d,f){var m=this.createElement("img").attr({src:a});1<arguments.length&&m.attr({x:c,y:b,width:d,height:f});return m},createElement:function(a){return"rect"===a?this.symbol(a):q.prototype.createElement.call(this,a)},invertChild:function(a,c){var b=this;c=c.style;var d="IMG"===a.tagName&&a.style;E(a,{flip:"x",left:C(c.width)-(d?C(d.top):1),top:C(c.height)-(d?C(d.left):1),rotation:-90});v(a.childNodes,function(c){b.invertChild(c,a)})},symbols:{arc:function(a,c,b,d,f){var m=f.start,
e=f.end,n=f.r||b||d;b=f.innerR;d=Math.cos(m);var q=Math.sin(m),h=Math.cos(e),w=Math.sin(e);if(0===e-m)return["x"];m=["wa",a-n,c-n,a+n,c+n,a+n*d,c+n*q,a+n*h,c+n*w];f.open&&!b&&m.push("e","M",a,c);m.push("at",a-b,c-b,a+b,c+b,a+b*h,c+b*w,a+b*d,c+b*q,"x","e");m.isArc=!0;return m},circle:function(a,c,b,d,f){f&&r(f.r)&&(b=d=2*f.r);f&&f.isCircle&&(a-=b/2,c-=d/2);return["wa",a,c,a+b,c+d,a+b,c+d/2,a+b,c+d/2,"e"]},rect:function(a,c,b,d,f){return q.prototype.symbols[r(f)&&f.r?"callout":"square"].call(0,a,c,
b,d,f)}}},a.VMLRenderer=D=function(){this.init.apply(this,arguments)},D.prototype=d(q.prototype,B),a.Renderer=D);q.prototype.measureSpanWidth=function(a,c){var b=t.createElement("span");a=t.createTextNode(a);b.appendChild(a);E(b,c);this.box.appendChild(b);c=b.offsetWidth;p(b);return c}})(M);(function(a){function D(){var g=a.defaultOptions.global,p=t.moment;if(g.timezone){if(p)return function(a){return-p.tz(a,g.timezone).utcOffset()};a.error(25)}return g.useUTC&&g.getTimezoneOffset}function B(){var g=
a.defaultOptions.global,u,l=g.useUTC,e=l?"getUTC":"get",k=l?"setUTC":"set";a.Date=u=g.Date||t.Date;u.hcTimezoneOffset=l&&g.timezoneOffset;u.hcGetTimezoneOffset=D();u.hcMakeTime=function(a,d,e,k,c,q){var f;l?(f=u.UTC.apply(0,arguments),f+=r(f)):f=(new u(a,d,p(e,1),p(k,0),p(c,0),p(q,0))).getTime();return f};E("Minutes Hours Day Date Month FullYear".split(" "),function(a){u["hcGet"+a]=e+a});E("Milliseconds Seconds Minutes Hours Date Month FullYear".split(" "),function(a){u["hcSet"+a]=k+a})}var G=a.color,
E=a.each,r=a.getTZOffset,g=a.merge,p=a.pick,t=a.win;a.defaultOptions={colors:"#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January February March April May June July August September October November December".split(" "),shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
decimalPoint:".",numericSymbols:"kMGTPE".split(""),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:" "},global:{useUTC:!0,VMLRadialGradientURL:"http://code.highcharts.com/5.0.14/gfx/vml-radial-gradient.png"},chart:{borderRadius:0,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,10,15,10],resetZoomButton:{theme:{zIndex:20},position:{align:"right",x:-10,y:10}},width:null,height:null,borderColor:"#335cad",backgroundColor:"#ffffff",plotBorderColor:"#cccccc"},title:{text:"Chart title",
align:"center",margin:15,widthAdjust:-44},subtitle:{text:"",align:"center",widthAdjust:-44},plotOptions:{},labels:{style:{position:"absolute",color:"#333333"}},legend:{enabled:!0,align:"center",layout:"horizontal",labelFormatter:function(){return this.name},borderColor:"#999999",borderRadius:0,navigation:{activeColor:"#003399",inactiveColor:"#cccccc"},itemStyle:{color:"#333333",fontSize:"12px",fontWeight:"bold",textOverflow:"ellipsis"},itemHoverStyle:{color:"#000000"},itemHiddenStyle:{color:"#cccccc"},
shadow:!1,itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},squareSymbol:!0,symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"45%"},style:{position:"absolute",backgroundColor:"#ffffff",opacity:.5,textAlign:"center"}},tooltip:{enabled:!0,animation:a.svg,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",
day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},footerFormat:"",padding:8,snap:a.isTouchDevice?25:10,backgroundColor:G("#f7f7f7").setOpacity(.85).get(),borderWidth:1,headerFormat:'\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',shadow:!0,style:{color:"#333333",cursor:"default",fontSize:"12px",pointerEvents:"none",
whiteSpace:"nowrap"}},credits:{enabled:!0,href:"http://www.highcharts.com",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#999999",fontSize:"9px"},text:"Highcharts.com"}};a.setOptions=function(t){a.defaultOptions=g(!0,a.defaultOptions,t);B();return a.defaultOptions};a.getOptions=function(){return a.defaultOptions};a.defaultPlotOptions=a.defaultOptions.plotOptions;B()})(M);(function(a){var D=a.correctFloat,B=a.defined,G=a.destroyObjectProperties,E=a.isNumber,
r=a.merge,g=a.pick,p=a.deg2rad;a.Tick=function(a,g,p,l){this.axis=a;this.pos=g;this.type=p||"";this.isNewLabel=this.isNew=!0;p||l||this.addLabel()};a.Tick.prototype={addLabel:function(){var a=this.axis,p=a.options,u=a.chart,l=a.categories,e=a.names,k=this.pos,f=p.labels,d=a.tickPositions,x=k===d[0],C=k===d[d.length-1],e=l?g(l[k],e[k],k):k,l=this.label,d=d.info,c;a.isDatetimeAxis&&d&&(c=p.dateTimeLabelFormats[d.higherRanks[k]||d.unitName]);this.isFirst=x;this.isLast=C;p=a.labelFormatter.call({axis:a,
chart:u,isFirst:x,isLast:C,dateTimeLabelFormat:c,value:a.isLog?D(a.lin2log(e)):e,pos:k});B(l)?l&&l.attr({text:p}):(this.labelLength=(this.label=l=B(p)&&f.enabled?u.renderer.text(p,0,0,f.useHTML).css(r(f.style)).add(a.labelGroup):null)&&l.getBBox().width,this.rotation=0)},getLabelSize:function(){return this.label?this.label.getBBox()[this.axis.horiz?"height":"width"]:0},handleOverflow:function(a){var t=this.axis,u=a.x,l=t.chart.chartWidth,e=t.chart.spacing,k=g(t.labelLeft,Math.min(t.pos,e[3])),e=g(t.labelRight,
Math.max(t.pos+t.len,l-e[1])),f=this.label,d=this.rotation,x={left:0,center:.5,right:1}[t.labelAlign],C=f.getBBox().width,c=t.getSlotWidth(),q=c,I=1,m,J={};if(d)0>d&&u-x*C<k?m=Math.round(u/Math.cos(d*p)-k):0<d&&u+x*C>e&&(m=Math.round((l-u)/Math.cos(d*p)));else if(l=u+(1-x)*C,u-x*C<k?q=a.x+q*(1-x)-k:l>e&&(q=e-a.x+q*x,I=-1),q=Math.min(c,q),q<c&&"center"===t.labelAlign&&(a.x+=I*(c-q-x*(c-Math.min(C,q)))),C>q||t.autoRotation&&(f.styles||{}).width)m=q;m&&(J.width=m,(t.options.labels.style||{}).textOverflow||
(J.textOverflow="ellipsis"),f.css(J))},getPosition:function(a,g,p,l){var e=this.axis,k=e.chart,f=l&&k.oldChartHeight||k.chartHeight;return{x:a?e.translate(g+p,null,null,l)+e.transB:e.left+e.offset+(e.opposite?(l&&k.oldChartWidth||k.chartWidth)-e.right-e.left:0),y:a?f-e.bottom+e.offset-(e.opposite?e.height:0):f-e.translate(g+p,null,null,l)-e.transB}},getLabelPosition:function(a,g,u,l,e,k,f,d){var x=this.axis,C=x.transA,c=x.reversed,q=x.staggerLines,t=x.tickRotCorr||{x:0,y:0},m=e.y;B(m)||(m=0===x.side?
u.rotation?-8:-u.getBBox().height:2===x.side?t.y+8:Math.cos(u.rotation*p)*(t.y-u.getBBox(!1,0).height/2));a=a+e.x+t.x-(k&&l?k*C*(c?-1:1):0);g=g+m-(k&&!l?k*C*(c?1:-1):0);q&&(u=f/(d||1)%q,x.opposite&&(u=q-u-1),g+=x.labelOffset/q*u);return{x:a,y:Math.round(g)}},getMarkPath:function(a,g,p,l,e,k){return k.crispLine(["M",a,g,"L",a+(e?0:-p),g+(e?p:0)],l)},renderGridLine:function(a,g,p){var l=this.axis,e=l.options,k=this.gridLine,f={},d=this.pos,x=this.type,C=l.tickmarkOffset,c=l.chart.renderer,q=x?x+"Grid":
"grid",I=e[q+"LineWidth"],m=e[q+"LineColor"],e=e[q+"LineDashStyle"];k||(f.stroke=m,f["stroke-width"]=I,e&&(f.dashstyle=e),x||(f.zIndex=1),a&&(f.opacity=0),this.gridLine=k=c.path().attr(f).addClass("highcharts-"+(x?x+"-":"")+"grid-line").add(l.gridGroup));if(!a&&k&&(a=l.getPlotLinePath(d+C,k.strokeWidth()*p,a,!0)))k[this.isNew?"attr":"animate"]({d:a,opacity:g})},renderMark:function(a,p,u){var l=this.axis,e=l.options,k=l.chart.renderer,f=this.type,d=f?f+"Tick":"tick",x=l.tickSize(d),C=this.mark,c=!C,
q=a.x;a=a.y;var I=g(e[d+"Width"],!f&&l.isXAxis?1:0),e=e[d+"Color"];x&&(l.opposite&&(x[0]=-x[0]),c&&(this.mark=C=k.path().addClass("highcharts-"+(f?f+"-":"")+"tick").add(l.axisGroup),C.attr({stroke:e,"stroke-width":I})),C[c?"attr":"animate"]({d:this.getMarkPath(q,a,x[0],C.strokeWidth()*u,l.horiz,k),opacity:p}))},renderLabel:function(a,p,u,l){var e=this.axis,k=e.horiz,f=e.options,d=this.label,x=f.labels,C=x.step,c=e.tickmarkOffset,q=!0,I=a.x;a=a.y;d&&E(I)&&(d.xy=a=this.getLabelPosition(I,a,d,k,x,c,
l,C),this.isFirst&&!this.isLast&&!g(f.showFirstLabel,1)||this.isLast&&!this.isFirst&&!g(f.showLastLabel,1)?q=!1:!k||e.isRadial||x.step||x.rotation||p||0===u||this.handleOverflow(a),C&&l%C&&(q=!1),q&&E(a.y)?(a.opacity=u,d[this.isNewLabel?"attr":"animate"](a),this.isNewLabel=!1):(d.attr("y",-9999),this.isNewLabel=!0),this.isNew=!1)},render:function(a,p,u){var l=this.axis,e=l.horiz,k=this.getPosition(e,this.pos,l.tickmarkOffset,p),f=k.x,d=k.y,l=e&&f===l.pos+l.len||!e&&d===l.pos?-1:1;u=g(u,1);this.isActive=
!0;this.renderGridLine(p,u,l);this.renderMark(k,u,l);this.renderLabel(k,p,u,a)},destroy:function(){G(this,this.axis)}}})(M);var S=function(a){var D=a.addEvent,B=a.animObject,G=a.arrayMax,E=a.arrayMin,r=a.color,g=a.correctFloat,p=a.defaultOptions,t=a.defined,v=a.deg2rad,u=a.destroyObjectProperties,l=a.each,e=a.extend,k=a.fireEvent,f=a.format,d=a.getMagnitude,x=a.grep,C=a.inArray,c=a.isArray,q=a.isNumber,I=a.isString,m=a.merge,J=a.normalizeTickInterval,b=a.objectEach,z=a.pick,K=a.removeEvent,y=a.splat,
A=a.syncTimeout,n=a.Tick,H=function(){this.init.apply(this,arguments)};a.extend(H.prototype,{defaultOptions:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%e. %b",week:"%e. %b",month:"%b '%y",year:"%Y"},endOnTick:!1,labels:{enabled:!0,style:{color:"#666666",cursor:"default",fontSize:"11px"},x:0},minPadding:.01,maxPadding:.01,minorTickLength:2,minorTickPosition:"outside",startOfWeek:1,startOnTick:!1,tickLength:10,tickmarkPlacement:"between",tickPixelInterval:100,
tickPosition:"outside",title:{align:"middle",style:{color:"#666666"}},type:"linear",minorGridLineColor:"#f2f2f2",minorGridLineWidth:1,minorTickColor:"#999999",lineColor:"#ccd6eb",lineWidth:1,gridLineColor:"#e6e6e6",tickColor:"#ccd6eb"},defaultYAxisOptions:{endOnTick:!0,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8},maxPadding:.05,minPadding:.05,startOnTick:!0,title:{rotation:270,text:"Values"},stackLabels:{allowOverlap:!1,enabled:!1,formatter:function(){return a.numberFormat(this.total,-1)},
style:{fontSize:"11px",fontWeight:"bold",color:"#000000",textOutline:"1px contrast"}},gridLineWidth:1,lineWidth:0},defaultLeftAxisOptions:{labels:{x:-15},title:{rotation:270}},defaultRightAxisOptions:{labels:{x:15},title:{rotation:90}},defaultBottomAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},defaultTopAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},init:function(a,c){var h=c.isX,w=this;w.chart=a;w.horiz=a.inverted&&!w.isZAxis?!h:h;w.isXAxis=h;w.coll=w.coll||(h?
"xAxis":"yAxis");w.opposite=c.opposite;w.side=c.side||(w.horiz?w.opposite?0:2:w.opposite?1:3);w.setOptions(c);var n=this.options,d=n.type;w.labelFormatter=n.labels.formatter||w.defaultLabelFormatter;w.userOptions=c;w.minPixelPadding=0;w.reversed=n.reversed;w.visible=!1!==n.visible;w.zoomEnabled=!1!==n.zoomEnabled;w.hasNames="category"===d||!0===n.categories;w.categories=n.categories||w.hasNames;w.names=w.names||[];w.plotLinesAndBandsGroups={};w.isLog="logarithmic"===d;w.isDatetimeAxis="datetime"===
d;w.positiveValuesOnly=w.isLog&&!w.allowNegativeLog;w.isLinked=t(n.linkedTo);w.ticks={};w.labelEdge=[];w.minorTicks={};w.plotLinesAndBands=[];w.alternateBands={};w.len=0;w.minRange=w.userMinRange=n.minRange||n.maxZoom;w.range=n.range;w.offset=n.offset||0;w.stacks={};w.oldStacks={};w.stacksTouched=0;w.max=null;w.min=null;w.crosshair=z(n.crosshair,y(a.options.tooltip.crosshairs)[h?0:1],!1);c=w.options.events;-1===C(w,a.axes)&&(h?a.axes.splice(a.xAxis.length,0,w):a.axes.push(w),a[w.coll].push(w));w.series=
w.series||[];a.inverted&&!w.isZAxis&&h&&void 0===w.reversed&&(w.reversed=!0);b(c,function(a,h){D(w,h,a)});w.lin2log=n.linearToLogConverter||w.lin2log;w.isLog&&(w.val2lin=w.log2lin,w.lin2val=w.lin2log)},setOptions:function(a){this.options=m(this.defaultOptions,"yAxis"===this.coll&&this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],m(p[this.coll],a))},defaultLabelFormatter:function(){var h=this.axis,
b=this.value,c=h.categories,n=this.dateTimeLabelFormat,d=p.lang,m=d.numericSymbols,d=d.numericSymbolMagnitude||1E3,e=m&&m.length,y,q=h.options.labels.format,h=h.isLog?Math.abs(b):h.tickInterval;if(q)y=f(q,this);else if(c)y=b;else if(n)y=a.dateFormat(n,b);else if(e&&1E3<=h)for(;e--&&void 0===y;)c=Math.pow(d,e+1),h>=c&&0===10*b%c&&null!==m[e]&&0!==b&&(y=a.numberFormat(b/c,-1)+m[e]);void 0===y&&(y=1E4<=Math.abs(b)?a.numberFormat(b,-1):a.numberFormat(b,-1,void 0,""));return y},getSeriesExtremes:function(){var a=
this,b=a.chart;a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.threshold=null;a.softThreshold=!a.isXAxis;a.buildStacks&&a.buildStacks();l(a.series,function(h){if(h.visible||!b.options.chart.ignoreHiddenSeries){var w=h.options,c=w.threshold,n;a.hasVisibleSeries=!0;a.positiveValuesOnly&&0>=c&&(c=null);if(a.isXAxis)w=h.xData,w.length&&(h=E(w),q(h)||h instanceof Date||(w=x(w,function(a){return q(a)}),h=E(w)),a.dataMin=Math.min(z(a.dataMin,w[0]),h),a.dataMax=Math.max(z(a.dataMax,w[0]),G(w)));else if(h.getExtremes(),
n=h.dataMax,h=h.dataMin,t(h)&&t(n)&&(a.dataMin=Math.min(z(a.dataMin,h),h),a.dataMax=Math.max(z(a.dataMax,n),n)),t(c)&&(a.threshold=c),!w.softThreshold||a.positiveValuesOnly)a.softThreshold=!1}})},translate:function(a,b,c,n,d,f){var h=this.linkedParent||this,w=1,m=0,y=n?h.oldTransA:h.transA;n=n?h.oldMin:h.min;var e=h.minPixelPadding;d=(h.isOrdinal||h.isBroken||h.isLog&&d)&&h.lin2val;y||(y=h.transA);c&&(w*=-1,m=h.len);h.reversed&&(w*=-1,m-=w*(h.sector||h.len));b?(a=(a*w+m-e)/y+n,d&&(a=h.lin2val(a))):
(d&&(a=h.val2lin(a)),a=w*(a-n)*y+m+w*e+(q(f)?y*f:0));return a},toPixels:function(a,b){return this.translate(a,!1,!this.horiz,null,!0)+(b?0:this.pos)},toValue:function(a,b){return this.translate(a-(b?0:this.pos),!0,!this.horiz,null,!0)},getPlotLinePath:function(a,b,c,n,d){var h=this.chart,w=this.left,f=this.top,m,y,e=c&&h.oldChartHeight||h.chartHeight,k=c&&h.oldChartWidth||h.chartWidth,A;m=this.transB;var x=function(a,h,b){if(a<h||a>b)n?a=Math.min(Math.max(h,a),b):A=!0;return a};d=z(d,this.translate(a,
null,null,c));a=c=Math.round(d+m);m=y=Math.round(e-d-m);q(d)?this.horiz?(m=f,y=e-this.bottom,a=c=x(a,w,w+this.width)):(a=w,c=k-this.right,m=y=x(m,f,f+this.height)):A=!0;return A&&!n?null:h.renderer.crispLine(["M",a,m,"L",c,y],b||1)},getLinearTickPositions:function(a,b,c){var h,w=g(Math.floor(b/a)*a);c=g(Math.ceil(c/a)*a);var n=[];if(this.single)return[b];for(b=w;b<=c;){n.push(b);b=g(b+a);if(b===h)break;h=b}return n},getMinorTickPositions:function(){var a=this,b=a.options,c=a.tickPositions,n=a.minorTickInterval,
d=[],f=a.pointRangePadding||0,m=a.min-f,f=a.max+f,y=f-m;if(y&&y/n<a.len/3)if(a.isLog)l(this.paddedTicks,function(h,b,c){b&&d.push.apply(d,a.getLogTickPositions(n,c[b-1],c[b],!0))});else if(a.isDatetimeAxis&&"auto"===b.minorTickInterval)d=d.concat(a.getTimeTicks(a.normalizeTimeTickInterval(n),m,f,b.startOfWeek));else for(b=m+(c[0]-m)%n;b<=f&&b!==d[0];b+=n)d.push(b);0!==d.length&&a.trimTicks(d);return d},adjustForMinRange:function(){var a=this.options,b=this.min,c=this.max,n,d,f,m,y,e,q,k;this.isXAxis&&
void 0===this.minRange&&!this.isLog&&(t(a.min)||t(a.max)?this.minRange=null:(l(this.series,function(a){e=a.xData;for(m=q=a.xIncrement?1:e.length-1;0<m;m--)if(y=e[m]-e[m-1],void 0===f||y<f)f=y}),this.minRange=Math.min(5*f,this.dataMax-this.dataMin)));c-b<this.minRange&&(d=this.dataMax-this.dataMin>=this.minRange,k=this.minRange,n=(k-c+b)/2,n=[b-n,z(a.min,b-n)],d&&(n[2]=this.isLog?this.log2lin(this.dataMin):this.dataMin),b=G(n),c=[b+k,z(a.max,b+k)],d&&(c[2]=this.isLog?this.log2lin(this.dataMax):this.dataMax),
c=E(c),c-b<k&&(n[0]=c-k,n[1]=z(a.min,c-k),b=G(n)));this.min=b;this.max=c},getClosest:function(){var a;this.categories?a=1:l(this.series,function(h){var b=h.closestPointRange,c=h.visible||!h.chart.options.chart.ignoreHiddenSeries;!h.noSharedTooltip&&t(b)&&c&&(a=t(a)?Math.min(a,b):b)});return a},nameToX:function(a){var h=c(this.categories),b=h?this.categories:this.names,n=a.options.x,d;a.series.requireSorting=!1;t(n)||(n=!1===this.options.uniqueNames?a.series.autoIncrement():C(a.name,b));-1===n?h||
(d=b.length):d=n;void 0!==d&&(this.names[d]=a.name);return d},updateNames:function(){var a=this;0<this.names.length&&(this.names.length=0,this.minRange=this.userMinRange,l(this.series||[],function(h){h.xIncrement=null;if(!h.points||h.isDirtyData)h.processData(),h.generatePoints();l(h.points,function(b,c){var n;b.options&&(n=a.nameToX(b),void 0!==n&&n!==b.x&&(b.x=n,h.xData[c]=n))})}))},setAxisTranslation:function(a){var h=this,b=h.max-h.min,c=h.axisPointRange||0,n,d=0,f=0,m=h.linkedParent,y=!!h.categories,
e=h.transA,q=h.isXAxis;if(q||y||c)n=h.getClosest(),m?(d=m.minPointOffset,f=m.pointRangePadding):l(h.series,function(a){var b=y?1:q?z(a.options.pointRange,n,0):h.axisPointRange||0;a=a.options.pointPlacement;c=Math.max(c,b);h.single||(d=Math.max(d,I(a)?0:b/2),f=Math.max(f,"on"===a?0:b))}),m=h.ordinalSlope&&n?h.ordinalSlope/n:1,h.minPointOffset=d*=m,h.pointRangePadding=f*=m,h.pointRange=Math.min(c,b),q&&(h.closestPointRange=n);a&&(h.oldTransA=e);h.translationSlope=h.transA=e=h.options.staticScale||h.len/
(b+f||1);h.transB=h.horiz?h.left:h.bottom;h.minPixelPadding=e*d},minFromRange:function(){return this.max-this.range},setTickInterval:function(h){var b=this,c=b.chart,n=b.options,f=b.isLog,m=b.log2lin,y=b.isDatetimeAxis,e=b.isXAxis,A=b.isLinked,x=n.maxPadding,H=n.minPadding,C=n.tickInterval,p=n.tickPixelInterval,I=b.categories,K=b.threshold,u=b.softThreshold,r,v,B,D;y||I||A||this.getTickAmount();B=z(b.userMin,n.min);D=z(b.userMax,n.max);A?(b.linkedParent=c[b.coll][n.linkedTo],c=b.linkedParent.getExtremes(),
b.min=z(c.min,c.dataMin),b.max=z(c.max,c.dataMax),n.type!==b.linkedParent.options.type&&a.error(11,1)):(!u&&t(K)&&(b.dataMin>=K?(r=K,H=0):b.dataMax<=K&&(v=K,x=0)),b.min=z(B,r,b.dataMin),b.max=z(D,v,b.dataMax));f&&(b.positiveValuesOnly&&!h&&0>=Math.min(b.min,z(b.dataMin,b.min))&&a.error(10,1),b.min=g(m(b.min),15),b.max=g(m(b.max),15));b.range&&t(b.max)&&(b.userMin=b.min=B=Math.max(b.dataMin,b.minFromRange()),b.userMax=D=b.max,b.range=null);k(b,"foundExtremes");b.beforePadding&&b.beforePadding();b.adjustForMinRange();
!(I||b.axisPointRange||b.usePercentage||A)&&t(b.min)&&t(b.max)&&(m=b.max-b.min)&&(!t(B)&&H&&(b.min-=m*H),!t(D)&&x&&(b.max+=m*x));q(n.softMin)&&(b.min=Math.min(b.min,n.softMin));q(n.softMax)&&(b.max=Math.max(b.max,n.softMax));q(n.floor)&&(b.min=Math.max(b.min,n.floor));q(n.ceiling)&&(b.max=Math.min(b.max,n.ceiling));u&&t(b.dataMin)&&(K=K||0,!t(B)&&b.min<K&&b.dataMin>=K?b.min=K:!t(D)&&b.max>K&&b.dataMax<=K&&(b.max=K));b.tickInterval=b.min===b.max||void 0===b.min||void 0===b.max?1:A&&!C&&p===b.linkedParent.options.tickPixelInterval?
C=b.linkedParent.tickInterval:z(C,this.tickAmount?(b.max-b.min)/Math.max(this.tickAmount-1,1):void 0,I?1:(b.max-b.min)*p/Math.max(b.len,p));e&&!h&&l(b.series,function(a){a.processData(b.min!==b.oldMin||b.max!==b.oldMax)});b.setAxisTranslation(!0);b.beforeSetTickPositions&&b.beforeSetTickPositions();b.postProcessTickInterval&&(b.tickInterval=b.postProcessTickInterval(b.tickInterval));b.pointRange&&!C&&(b.tickInterval=Math.max(b.pointRange,b.tickInterval));h=z(n.minTickInterval,b.isDatetimeAxis&&b.closestPointRange);
!C&&b.tickInterval<h&&(b.tickInterval=h);y||f||C||(b.tickInterval=J(b.tickInterval,null,d(b.tickInterval),z(n.allowDecimals,!(.5<b.tickInterval&&5>b.tickInterval&&1E3<b.max&&9999>b.max)),!!this.tickAmount));this.tickAmount||(b.tickInterval=b.unsquish());this.setTickPositions()},setTickPositions:function(){var a=this.options,b,c=a.tickPositions,n=a.tickPositioner,d=a.startOnTick,f=a.endOnTick;this.tickmarkOffset=this.categories&&"between"===a.tickmarkPlacement&&1===this.tickInterval?.5:0;this.minorTickInterval=
"auto"===a.minorTickInterval&&this.tickInterval?this.tickInterval/5:a.minorTickInterval;this.single=this.min===this.max&&t(this.min)&&!this.tickAmount&&(parseInt(this.min,10)===this.min||!1!==a.allowDecimals);this.tickPositions=b=c&&c.slice();!b&&(b=this.isDatetimeAxis?this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,a.units),this.min,this.max,a.startOfWeek,this.ordinalPositions,this.closestPointRange,!0):this.isLog?this.getLogTickPositions(this.tickInterval,this.min,this.max):this.getLinearTickPositions(this.tickInterval,
this.min,this.max),b.length>this.len&&(b=[b[0],b.pop()]),this.tickPositions=b,n&&(n=n.apply(this,[this.min,this.max])))&&(this.tickPositions=b=n);this.paddedTicks=b.slice(0);this.trimTicks(b,d,f);this.isLinked||(this.single&&2>b.length&&(this.min-=.5,this.max+=.5),c||n||this.adjustTickAmount())},trimTicks:function(a,b,c){var h=a[0],n=a[a.length-1],d=this.minPointOffset||0;if(!this.isLinked){if(b&&-Infinity!==h)this.min=h;else for(;this.min-d>a[0];)a.shift();if(c)this.max=n;else for(;this.max+d<a[a.length-
1];)a.pop();0===a.length&&t(h)&&a.push((n+h)/2)}},alignToOthers:function(){var a={},b,c=this.options;!1===this.chart.options.chart.alignTicks||!1===c.alignTicks||this.isLog||l(this.chart[this.coll],function(h){var c=h.options,c=[h.horiz?c.left:c.top,c.width,c.height,c.pane].join();h.series.length&&(a[c]?b=!0:a[c]=1)});return b},getTickAmount:function(){var a=this.options,b=a.tickAmount,c=a.tickPixelInterval;!t(a.tickInterval)&&this.len<c&&!this.isRadial&&!this.isLog&&a.startOnTick&&a.endOnTick&&(b=
2);!b&&this.alignToOthers()&&(b=Math.ceil(this.len/c)+1);4>b&&(this.finalTickAmt=b,b=5);this.tickAmount=b},adjustTickAmount:function(){var a=this.tickInterval,b=this.tickPositions,c=this.tickAmount,n=this.finalTickAmt,d=b&&b.length;if(d<c){for(;b.length<c;)b.push(g(b[b.length-1]+a));this.transA*=(d-1)/(c-1);this.max=b[b.length-1]}else d>c&&(this.tickInterval*=2,this.setTickPositions());if(t(n)){for(a=c=b.length;a--;)(3===n&&1===a%2||2>=n&&0<a&&a<c-1)&&b.splice(a,1);this.finalTickAmt=void 0}},setScale:function(){var a,
b;this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();b=this.len!==this.oldAxisLength;l(this.series,function(b){if(b.isDirtyData||b.isDirty||b.xAxis.isDirty)a=!0});b||a||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax||this.alignToOthers()?(this.resetStacks&&this.resetStacks(),this.forceRedraw=!1,this.getSeriesExtremes(),this.setTickInterval(),this.oldUserMin=this.userMin,this.oldUserMax=this.userMax,this.isDirty||
(this.isDirty=b||this.min!==this.oldMin||this.max!==this.oldMax)):this.cleanStacks&&this.cleanStacks()},setExtremes:function(a,b,c,n,d){var h=this,f=h.chart;c=z(c,!0);l(h.series,function(a){delete a.kdTree});d=e(d,{min:a,max:b});k(h,"setExtremes",d,function(){h.userMin=a;h.userMax=b;h.eventArgs=d;c&&f.redraw(n)})},zoom:function(a,b){var h=this.dataMin,c=this.dataMax,n=this.options,d=Math.min(h,z(n.min,h)),n=Math.max(c,z(n.max,c));if(a!==this.min||b!==this.max)this.allowZoomOutside||(t(h)&&(a<d&&(a=
d),a>n&&(a=n)),t(c)&&(b<d&&(b=d),b>n&&(b=n))),this.displayBtn=void 0!==a||void 0!==b,this.setExtremes(a,b,!1,void 0,{trigger:"zoom"});return!0},setAxisSize:function(){var b=this.chart,c=this.options,n=c.offsets||[0,0,0,0],d=this.horiz,f=this.width=Math.round(a.relativeLength(z(c.width,b.plotWidth-n[3]+n[1]),b.plotWidth)),m=this.height=Math.round(a.relativeLength(z(c.height,b.plotHeight-n[0]+n[2]),b.plotHeight)),y=this.top=Math.round(a.relativeLength(z(c.top,b.plotTop+n[0]),b.plotHeight,b.plotTop)),
c=this.left=Math.round(a.relativeLength(z(c.left,b.plotLeft+n[3]),b.plotWidth,b.plotLeft));this.bottom=b.chartHeight-m-y;this.right=b.chartWidth-f-c;this.len=Math.max(d?f:m,0);this.pos=d?c:y},getExtremes:function(){var a=this.isLog,b=this.lin2log;return{min:a?g(b(this.min)):this.min,max:a?g(b(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var b=this.isLog,h=this.lin2log,c=b?h(this.min):this.min,b=b?h(this.max):this.max;
null===a?a=c:c>a?a=c:b<a&&(a=b);return this.translate(a,0,1,0,1)},autoLabelAlign:function(a){a=(z(a,0)-90*this.side+720)%360;return 15<a&&165>a?"right":195<a&&345>a?"left":"center"},tickSize:function(a){var b=this.options,h=b[a+"Length"],c=z(b[a+"Width"],"tick"===a&&this.isXAxis?1:0);if(c&&h)return"inside"===b[a+"Position"]&&(h=-h),[h,c]},labelMetrics:function(){var a=this.tickPositions&&this.tickPositions[0]||0;return this.chart.renderer.fontMetrics(this.options.labels.style&&this.options.labels.style.fontSize,
this.ticks[a]&&this.ticks[a].label)},unsquish:function(){var a=this.options.labels,b=this.horiz,c=this.tickInterval,n=c,d=this.len/(((this.categories?1:0)+this.max-this.min)/c),f,m=a.rotation,y=this.labelMetrics(),e,q=Number.MAX_VALUE,k,A=function(a){a/=d||1;a=1<a?Math.ceil(a):1;return a*c};b?(k=!a.staggerLines&&!a.step&&(t(m)?[m]:d<z(a.autoRotationLimit,80)&&a.autoRotation))&&l(k,function(a){var b;if(a===m||a&&-90<=a&&90>=a)e=A(Math.abs(y.h/Math.sin(v*a))),b=e+Math.abs(a/360),b<q&&(q=b,f=a,n=e)}):
a.step||(n=A(y.h));this.autoRotation=k;this.labelRotation=z(f,m);return n},getSlotWidth:function(){var a=this.chart,b=this.horiz,c=this.options.labels,n=Math.max(this.tickPositions.length-(this.categories?0:1),1),d=a.margin[3];return b&&2>(c.step||0)&&!c.rotation&&(this.staggerLines||1)*this.len/n||!b&&(d&&d-a.spacing[3]||.33*a.chartWidth)},renderUnsquish:function(){var a=this.chart,b=a.renderer,c=this.tickPositions,n=this.ticks,d=this.options.labels,f=this.horiz,y=this.getSlotWidth(),e=Math.max(1,
Math.round(y-2*(d.padding||5))),q={},k=this.labelMetrics(),A=d.style&&d.style.textOverflow,x,H=0,z,C;I(d.rotation)||(q.rotation=d.rotation||0);l(c,function(a){(a=n[a])&&a.labelLength>H&&(H=a.labelLength)});this.maxLabelLength=H;if(this.autoRotation)H>e&&H>k.h?q.rotation=this.labelRotation:this.labelRotation=0;else if(y&&(x={width:e+"px"},!A))for(x.textOverflow="clip",z=c.length;!f&&z--;)if(C=c[z],e=n[C].label)e.styles&&"ellipsis"===e.styles.textOverflow?e.css({textOverflow:"clip"}):n[C].labelLength>
y&&e.css({width:y+"px"}),e.getBBox().height>this.len/c.length-(k.h-k.f)&&(e.specCss={textOverflow:"ellipsis"});q.rotation&&(x={width:(H>.5*a.chartHeight?.33*a.chartHeight:a.chartHeight)+"px"},A||(x.textOverflow="ellipsis"));if(this.labelAlign=d.align||this.autoLabelAlign(this.labelRotation))q.align=this.labelAlign;l(c,function(a){var b=(a=n[a])&&a.label;b&&(b.attr(q),x&&b.css(m(x,b.specCss)),delete b.specCss,a.rotation=q.rotation)});this.tickRotCorr=b.rotCorr(k.b,this.labelRotation||0,0!==this.side)},
hasData:function(){return this.hasVisibleSeries||t(this.min)&&t(this.max)&&!!this.tickPositions},addTitle:function(a){var b=this.chart.renderer,h=this.horiz,c=this.opposite,n=this.options.title,d;this.axisTitle||((d=n.textAlign)||(d=(h?{low:"left",middle:"center",high:"right"}:{low:c?"right":"left",middle:"center",high:c?"left":"right"})[n.align]),this.axisTitle=b.text(n.text,0,0,n.useHTML).attr({zIndex:7,rotation:n.rotation||0,align:d}).addClass("highcharts-axis-title").css(n.style).add(this.axisGroup),
this.axisTitle.isNew=!0);n.style.width||this.isRadial||this.axisTitle.css({width:this.len});this.axisTitle[a?"show":"hide"](!0)},generateTick:function(a){var b=this.ticks;b[a]?b[a].addLabel():b[a]=new n(this,a)},getOffset:function(){var a=this,c=a.chart,n=c.renderer,d=a.options,f=a.tickPositions,m=a.ticks,y=a.horiz,e=a.side,q=c.inverted&&!a.isZAxis?[1,0,3,2][e]:e,k,A,x=0,H,C=0,g=d.title,p=d.labels,I=0,J=c.axisOffset,c=c.clipOffset,K=[-1,1,1,-1][e],u=d.className,r=a.axisParent,v=this.tickSize("tick");
k=a.hasData();a.showAxis=A=k||z(d.showEmpty,!0);a.staggerLines=a.horiz&&p.staggerLines;a.axisGroup||(a.gridGroup=n.g("grid").attr({zIndex:d.gridZIndex||1}).addClass("highcharts-"+this.coll.toLowerCase()+"-grid "+(u||"")).add(r),a.axisGroup=n.g("axis").attr({zIndex:d.zIndex||2}).addClass("highcharts-"+this.coll.toLowerCase()+" "+(u||"")).add(r),a.labelGroup=n.g("axis-labels").attr({zIndex:p.zIndex||7}).addClass("highcharts-"+a.coll.toLowerCase()+"-labels "+(u||"")).add(r));k||a.isLinked?(l(f,function(b,
h){a.generateTick(b,h)}),a.renderUnsquish(),!1===p.reserveSpace||0!==e&&2!==e&&{1:"left",3:"right"}[e]!==a.labelAlign&&"center"!==a.labelAlign||l(f,function(a){I=Math.max(m[a].getLabelSize(),I)}),a.staggerLines&&(I*=a.staggerLines,a.labelOffset=I*(a.opposite?-1:1))):b(m,function(a,b){a.destroy();delete m[b]});g&&g.text&&!1!==g.enabled&&(a.addTitle(A),A&&!1!==g.reserveSpace&&(a.titleOffset=x=a.axisTitle.getBBox()[y?"height":"width"],H=g.offset,C=t(H)?0:z(g.margin,y?5:10)));a.renderLine();a.offset=
K*z(d.offset,J[e]);a.tickRotCorr=a.tickRotCorr||{x:0,y:0};n=0===e?-a.labelMetrics().h:2===e?a.tickRotCorr.y:0;C=Math.abs(I)+C;I&&(C=C-n+K*(y?z(p.y,a.tickRotCorr.y+8*K):p.x));a.axisTitleMargin=z(H,C);J[e]=Math.max(J[e],a.axisTitleMargin+x+K*a.offset,C,k&&f.length&&v?v[0]+K*a.offset:0);f=2*Math.floor(a.axisLine.strokeWidth()/2);0<d.offset&&(f-=2*d.offset);c[q]=Math.max(c[q]||f,f)},getLinePath:function(a){var b=this.chart,h=this.opposite,c=this.offset,n=this.horiz,d=this.left+(h?this.width:0)+c,c=b.chartHeight-
this.bottom-(h?this.height:0)+c;h&&(a*=-1);return b.renderer.crispLine(["M",n?this.left:d,n?c:this.top,"L",n?b.chartWidth-this.right:d,n?c:b.chartHeight-this.bottom],a)},renderLine:function(){this.axisLine||(this.axisLine=this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),this.axisLine.attr({stroke:this.options.lineColor,"stroke-width":this.options.lineWidth,zIndex:7}))},getTitlePosition:function(){var a=this.horiz,b=this.left,c=this.top,n=this.len,d=this.options.title,
f=a?b:c,m=this.opposite,e=this.offset,y=d.x||0,q=d.y||0,k=this.axisTitle,A=this.chart.renderer.fontMetrics(d.style&&d.style.fontSize,k),k=Math.max(k.getBBox(null,0).height-A.h-1,0),n={low:f+(a?0:n),middle:f+n/2,high:f+(a?n:0)}[d.align],b=(a?c+this.height:b)+(a?1:-1)*(m?-1:1)*this.axisTitleMargin+[-k,k,A.f,-k][this.side];return{x:a?n+y:b+(m?this.width:0)+e+y,y:a?b+q-(m?this.height:0)+e:n+q}},renderMinorTick:function(a){var b=this.chart.hasRendered&&q(this.oldMin),c=this.minorTicks;c[a]||(c[a]=new n(this,
a,"minor"));b&&c[a].isNew&&c[a].render(null,!0);c[a].render(null,!1,1)},renderTick:function(a,b){var c=this.isLinked,h=this.ticks,d=this.chart.hasRendered&&q(this.oldMin);if(!c||a>=this.min&&a<=this.max)h[a]||(h[a]=new n(this,a)),d&&h[a].isNew&&h[a].render(b,!0,.1),h[a].render(b)},render:function(){var c=this,d=c.chart,f=c.options,m=c.isLog,e=c.lin2log,y=c.isLinked,k=c.tickPositions,x=c.axisTitle,H=c.ticks,z=c.minorTicks,C=c.alternateBands,g=f.stackLabels,p=f.alternateGridColor,I=c.tickmarkOffset,
J=c.axisLine,K=c.showAxis,t=B(d.renderer.globalAnimation),u,r;c.labelEdge.length=0;c.overlap=!1;l([H,z,C],function(a){b(a,function(a){a.isActive=!1})});if(c.hasData()||y)c.minorTickInterval&&!c.categories&&l(c.getMinorTickPositions(),function(a){c.renderMinorTick(a)}),k.length&&(l(k,function(a,b){c.renderTick(a,b)}),I&&(0===c.min||c.single)&&(H[-1]||(H[-1]=new n(c,-1,null,!0)),H[-1].render(-1))),p&&l(k,function(b,h){r=void 0!==k[h+1]?k[h+1]+I:c.max-I;0===h%2&&b<c.max&&r<=c.max+(d.polar?-I:I)&&(C[b]||
(C[b]=new a.PlotLineOrBand(c)),u=b+I,C[b].options={from:m?e(u):u,to:m?e(r):r,color:p},C[b].render(),C[b].isActive=!0)}),c._addedPlotLB||(l((f.plotLines||[]).concat(f.plotBands||[]),function(a){c.addPlotBandOrLine(a)}),c._addedPlotLB=!0);l([H,z,C],function(a){var c,h=[],n=t.duration;b(a,function(a,b){a.isActive||(a.render(b,!1,0),a.isActive=!1,h.push(b))});A(function(){for(c=h.length;c--;)a[h[c]]&&!a[h[c]].isActive&&(a[h[c]].destroy(),delete a[h[c]])},a!==C&&d.hasRendered&&n?n:0)});J&&(J[J.isPlaced?
"animate":"attr"]({d:this.getLinePath(J.strokeWidth())}),J.isPlaced=!0,J[K?"show":"hide"](!0));x&&K&&(f=c.getTitlePosition(),q(f.y)?(x[x.isNew?"attr":"animate"](f),x.isNew=!1):(x.attr("y",-9999),x.isNew=!0));g&&g.enabled&&c.renderStackTotals();c.isDirty=!1},redraw:function(){this.visible&&(this.render(),l(this.plotLinesAndBands,function(a){a.render()}));l(this.series,function(a){a.isDirty=!0})},keepProps:"extKey hcEvents names series userMax userMin".split(" "),destroy:function(a){var c=this,h=c.stacks,
n=c.plotLinesAndBands,d;a||K(c);b(h,function(a,b){u(a);h[b]=null});l([c.ticks,c.minorTicks,c.alternateBands],function(a){u(a)});if(n)for(a=n.length;a--;)n[a].destroy();l("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "),function(a){c[a]&&(c[a]=c[a].destroy())});for(d in c.plotLinesAndBandsGroups)c.plotLinesAndBandsGroups[d]=c.plotLinesAndBandsGroups[d].destroy();b(c,function(a,b){-1===C(b,c.keepProps)&&delete c[b]})},drawCrosshair:function(a,b){var c,h=this.crosshair,
n=z(h.snap,!0),d,f=this.cross;a||(a=this.cross&&this.cross.e);this.crosshair&&!1!==(t(b)||!n)?(n?t(b)&&(d=this.isXAxis?b.plotX:this.len-b.plotY):d=a&&(this.horiz?a.chartX-this.pos:this.len-a.chartY+this.pos),t(d)&&(c=this.getPlotLinePath(b&&(this.isXAxis?b.x:z(b.stackY,b.y)),null,null,null,d)||null),t(c)?(b=this.categories&&!this.isRadial,f||(this.cross=f=this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-"+(b?"category ":"thin ")+h.className).attr({zIndex:z(h.zIndex,2)}).add(),
f.attr({stroke:h.color||(b?r("#ccd6eb").setOpacity(.25).get():"#cccccc"),"stroke-width":z(h.width,1)}),h.dashStyle&&f.attr({dashstyle:h.dashStyle})),f.show().attr({d:c}),b&&!h.width&&f.attr({"stroke-width":this.transA}),this.cross.e=a):this.hideCrosshair()):this.hideCrosshair()},hideCrosshair:function(){this.cross&&this.cross.hide()}});return a.Axis=H}(M);(function(a){var D=a.Axis,B=a.Date,G=a.dateFormat,E=a.defaultOptions,r=a.defined,g=a.each,p=a.extend,t=a.getMagnitude,v=a.getTZOffset,u=a.normalizeTickInterval,
l=a.pick,e=a.timeUnits;D.prototype.getTimeTicks=function(a,f,d,x){var k=[],c={},q=E.global.useUTC,I,m=new B(f-Math.max(v(f),v(d))),J=B.hcMakeTime,b=a.unitRange,z=a.count,K,y;if(r(f)){m[B.hcSetMilliseconds](b>=e.second?0:z*Math.floor(m.getMilliseconds()/z));if(b>=e.second)m[B.hcSetSeconds](b>=e.minute?0:z*Math.floor(m.getSeconds()/z));if(b>=e.minute)m[B.hcSetMinutes](b>=e.hour?0:z*Math.floor(m[B.hcGetMinutes]()/z));if(b>=e.hour)m[B.hcSetHours](b>=e.day?0:z*Math.floor(m[B.hcGetHours]()/z));if(b>=e.day)m[B.hcSetDate](b>=
e.month?1:z*Math.floor(m[B.hcGetDate]()/z));b>=e.month&&(m[B.hcSetMonth](b>=e.year?0:z*Math.floor(m[B.hcGetMonth]()/z)),I=m[B.hcGetFullYear]());if(b>=e.year)m[B.hcSetFullYear](I-I%z);if(b===e.week)m[B.hcSetDate](m[B.hcGetDate]()-m[B.hcGetDay]()+l(x,1));I=m[B.hcGetFullYear]();x=m[B.hcGetMonth]();var A=m[B.hcGetDate](),n=m[B.hcGetHours]();if(B.hcTimezoneOffset||B.hcGetTimezoneOffset)y=(!q||!!B.hcGetTimezoneOffset)&&(d-f>4*e.month||v(f)!==v(d)),m=m.getTime(),K=v(m),m=new B(m+K);q=m.getTime();for(f=1;q<
d;)k.push(q),q=b===e.year?J(I+f*z,0):b===e.month?J(I,x+f*z):!y||b!==e.day&&b!==e.week?y&&b===e.hour?J(I,x,A,n+f*z,0,0,K)-K:q+b*z:J(I,x,A+f*z*(b===e.day?1:7)),f++;k.push(q);b<=e.hour&&1E4>k.length&&g(k,function(a){0===a%18E5&&"000000000"===G("%H%M%S%L",a)&&(c[a]="day")})}k.info=p(a,{higherRanks:c,totalRange:b*z});return k};D.prototype.normalizeTimeTickInterval=function(a,f){var d=f||[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,
2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],["month",[1,2,3,4,6]],["year",null]];f=d[d.length-1];var k=e[f[0]],l=f[1],c;for(c=0;c<d.length&&!(f=d[c],k=e[f[0]],l=f[1],d[c+1]&&a<=(k*l[l.length-1]+e[d[c+1][0]])/2);c++);k===e.year&&a<5*k&&(l=[1,2,5]);a=u(a/k,l,"year"===f[0]?Math.max(t(a/k),1):1);return{unitRange:k,count:a,unitName:f[0]}}})(M);(function(a){var D=a.Axis,B=a.getMagnitude,G=a.map,E=a.normalizeTickInterval,r=a.pick;D.prototype.getLogTickPositions=function(a,p,t,v){var g=this.options,l=this.len,
e=this.lin2log,k=this.log2lin,f=[];v||(this._minorAutoInterval=null);if(.5<=a)a=Math.round(a),f=this.getLinearTickPositions(a,p,t);else if(.08<=a)for(var l=Math.floor(p),d,x,C,c,q,g=.3<a?[1,2,4]:.15<a?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];l<t+1&&!q;l++)for(x=g.length,d=0;d<x&&!q;d++)C=k(e(l)*g[d]),C>p&&(!v||c<=t)&&void 0!==c&&f.push(c),c>t&&(q=!0),c=C;else p=e(p),t=e(t),a=g[v?"minorTickInterval":"tickInterval"],a=r("auto"===a?null:a,this._minorAutoInterval,g.tickPixelInterval/(v?5:1)*(t-p)/((v?l/this.tickPositions.length:
l)||1)),a=E(a,null,B(a)),f=G(this.getLinearTickPositions(a,p,t),k),v||(this._minorAutoInterval=a/5);v||(this.tickInterval=a);return f};D.prototype.log2lin=function(a){return Math.log(a)/Math.LN10};D.prototype.lin2log=function(a){return Math.pow(10,a)}})(M);(function(a,D){var B=a.arrayMax,G=a.arrayMin,E=a.defined,r=a.destroyObjectProperties,g=a.each,p=a.erase,t=a.merge,v=a.pick;a.PlotLineOrBand=function(a,l){this.axis=a;l&&(this.options=l,this.id=l.id)};a.PlotLineOrBand.prototype={render:function(){var g=
this,l=g.axis,e=l.horiz,k=g.options,f=k.label,d=g.label,x=k.to,C=k.from,c=k.value,q=E(C)&&E(x),p=E(c),m=g.svgElem,J=!m,b=[],z=k.color,K=v(k.zIndex,0),y=k.events,b={"class":"highcharts-plot-"+(q?"band ":"line ")+(k.className||"")},A={},n=l.chart.renderer,H=q?"bands":"lines",h=l.log2lin;l.isLog&&(C=h(C),x=h(x),c=h(c));p?(b={stroke:z,"stroke-width":k.width},k.dashStyle&&(b.dashstyle=k.dashStyle)):q&&(z&&(b.fill=z),k.borderWidth&&(b.stroke=k.borderColor,b["stroke-width"]=k.borderWidth));A.zIndex=K;H+=
"-"+K;(z=l.plotLinesAndBandsGroups[H])||(l.plotLinesAndBandsGroups[H]=z=n.g("plot-"+H).attr(A).add());J&&(g.svgElem=m=n.path().attr(b).add(z));if(p)b=l.getPlotLinePath(c,m.strokeWidth());else if(q)b=l.getPlotBandPath(C,x,k);else return;J&&b&&b.length?(m.attr({d:b}),y&&a.objectEach(y,function(a,b){m.on(b,function(a){y[b].apply(g,[a])})})):m&&(b?(m.show(),m.animate({d:b})):(m.hide(),d&&(g.label=d=d.destroy())));f&&E(f.text)&&b&&b.length&&0<l.width&&0<l.height&&!b.flat?(f=t({align:e&&q&&"center",x:e?
!q&&4:10,verticalAlign:!e&&q&&"middle",y:e?q?16:10:q?6:-4,rotation:e&&!q&&90},f),this.renderLabel(f,b,q,K)):d&&d.hide();return g},renderLabel:function(a,l,e,k){var f=this.label,d=this.axis.chart.renderer;f||(f={align:a.textAlign||a.align,rotation:a.rotation,"class":"highcharts-plot-"+(e?"band":"line")+"-label "+(a.className||"")},f.zIndex=k,this.label=f=d.text(a.text,0,0,a.useHTML).attr(f).add(),f.css(a.style));k=[l[1],l[4],e?l[6]:l[1]];l=[l[2],l[5],e?l[7]:l[2]];e=G(k);d=G(l);f.align(a,!1,{x:e,y:d,
width:B(k)-e,height:B(l)-d});f.show()},destroy:function(){p(this.axis.plotLinesAndBands,this);delete this.axis;r(this)}};a.extend(D.prototype,{getPlotBandPath:function(a,l){var e=this.getPlotLinePath(l,null,null,!0),k=this.getPlotLinePath(a,null,null,!0),f=this.horiz,d=1;a=a<this.min&&l<this.min||a>this.max&&l>this.max;k&&e?(a&&(k.flat=k.toString()===e.toString(),d=0),k.push(f&&e[4]===k[4]?e[4]+d:e[4],f||e[5]!==k[5]?e[5]:e[5]+d,f&&e[1]===k[1]?e[1]+d:e[1],f||e[2]!==k[2]?e[2]:e[2]+d)):k=null;return k},
addPlotBand:function(a){return this.addPlotBandOrLine(a,"plotBands")},addPlotLine:function(a){return this.addPlotBandOrLine(a,"plotLines")},addPlotBandOrLine:function(g,l){var e=(new a.PlotLineOrBand(this,g)).render(),k=this.userOptions;e&&(l&&(k[l]=k[l]||[],k[l].push(g)),this.plotLinesAndBands.push(e));return e},removePlotBandOrLine:function(a){for(var l=this.plotLinesAndBands,e=this.options,k=this.userOptions,f=l.length;f--;)l[f].id===a&&l[f].destroy();g([e.plotLines||[],k.plotLines||[],e.plotBands||
[],k.plotBands||[]],function(d){for(f=d.length;f--;)d[f].id===a&&p(d,d[f])})},removePlotBand:function(a){this.removePlotBandOrLine(a)},removePlotLine:function(a){this.removePlotBandOrLine(a)}})})(M,S);(function(a){var D=a.dateFormat,B=a.each,G=a.extend,E=a.format,r=a.isNumber,g=a.map,p=a.merge,t=a.pick,v=a.splat,u=a.syncTimeout,l=a.timeUnits;a.Tooltip=function(){this.init.apply(this,arguments)};a.Tooltip.prototype={init:function(a,k){this.chart=a;this.options=k;this.crosshairs=[];this.now={x:0,y:0};
this.isHidden=!0;this.split=k.split&&!a.inverted;this.shared=k.shared||this.split},cleanSplit:function(a){B(this.chart.series,function(e){var f=e&&e.tt;f&&(!f.isActive||a?e.tt=f.destroy():f.isActive=!1)})},getLabel:function(){var a=this.chart.renderer,k=this.options;this.label||(this.split?this.label=a.g("tooltip"):(this.label=a.label("",0,0,k.shape||"callout",null,null,k.useHTML,null,"tooltip").attr({padding:k.padding,r:k.borderRadius}),this.label.attr({fill:k.backgroundColor,"stroke-width":k.borderWidth}).css(k.style).shadow(k.shadow)),
this.label.attr({zIndex:8}).add());return this.label},update:function(a){this.destroy();p(!0,this.chart.options.tooltip.userOptions,a);this.init(this.chart,p(!0,this.options,a))},destroy:function(){this.label&&(this.label=this.label.destroy());this.split&&this.tt&&(this.cleanSplit(this.chart,!0),this.tt=this.tt.destroy());clearTimeout(this.hideTimer);clearTimeout(this.tooltipTimeout)},move:function(a,k,f,d){var e=this,l=e.now,c=!1!==e.options.animation&&!e.isHidden&&(1<Math.abs(a-l.x)||1<Math.abs(k-
l.y)),q=e.followPointer||1<e.len;G(l,{x:c?(2*l.x+a)/3:a,y:c?(l.y+k)/2:k,anchorX:q?void 0:c?(2*l.anchorX+f)/3:f,anchorY:q?void 0:c?(l.anchorY+d)/2:d});e.getLabel().attr(l);c&&(clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){e&&e.move(a,k,f,d)},32))},hide:function(a){var e=this;clearTimeout(this.hideTimer);a=t(a,this.options.hideDelay,500);this.isHidden||(this.hideTimer=u(function(){e.getLabel()[a?"fadeOut":"hide"]();e.isHidden=!0},a))},getAnchor:function(a,k){var f,d=this.chart,
e=d.inverted,l=d.plotTop,c=d.plotLeft,q=0,p=0,m,J;a=v(a);f=a[0].tooltipPos;this.followPointer&&k&&(void 0===k.chartX&&(k=d.pointer.normalize(k)),f=[k.chartX-d.plotLeft,k.chartY-l]);f||(B(a,function(a){m=a.series.yAxis;J=a.series.xAxis;q+=a.plotX+(!e&&J?J.left-c:0);p+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+(!e&&m?m.top-l:0)}),q/=a.length,p/=a.length,f=[e?d.plotWidth-p:q,this.shared&&!e&&1<a.length&&k?k.chartY-l:e?d.plotHeight-q:p]);return g(f,Math.round)},getPosition:function(a,k,f){var d=this.chart,
e=this.distance,l={},c=f.h||0,q,g=["y",d.chartHeight,k,f.plotY+d.plotTop,d.plotTop,d.plotTop+d.plotHeight],m=["x",d.chartWidth,a,f.plotX+d.plotLeft,d.plotLeft,d.plotLeft+d.plotWidth],p=!this.followPointer&&t(f.ttBelow,!d.inverted===!!f.negative),b=function(a,b,d,h,f,m){var n=d<h-e,y=h+e+d<b,q=h-e-d;h+=e;if(p&&y)l[a]=h;else if(!p&&n)l[a]=q;else if(n)l[a]=Math.min(m-d,0>q-c?q:q-c);else if(y)l[a]=Math.max(f,h+c+d>b?h:h+c);else return!1},z=function(a,b,c,h){var n;h<e||h>b-e?n=!1:l[a]=h<c/2?1:h>b-c/2?
b-c-2:h-c/2;return n},K=function(a){var b=g;g=m;m=b;q=a},y=function(){!1!==b.apply(0,g)?!1!==z.apply(0,m)||q||(K(!0),y()):q?l.x=l.y=0:(K(!0),y())};(d.inverted||1<this.len)&&K();y();return l},defaultFormatter:function(a){var e=this.points||v(this),f;f=[a.tooltipFooterHeaderFormatter(e[0])];f=f.concat(a.bodyFormatter(e));f.push(a.tooltipFooterHeaderFormatter(e[0],!0));return f},refresh:function(a,k){var f,d=this.options,e,l=a,c,q={},g=[];f=d.formatter||this.defaultFormatter;var q=this.shared,m;d.enabled&&
(clearTimeout(this.hideTimer),this.followPointer=v(l)[0].series.tooltipOptions.followPointer,c=this.getAnchor(l,k),k=c[0],e=c[1],!q||l.series&&l.series.noSharedTooltip?q=l.getLabelConfig():(B(l,function(a){a.setState("hover");g.push(a.getLabelConfig())}),q={x:l[0].category,y:l[0].y},q.points=g,l=l[0]),this.len=g.length,q=f.call(q,this),m=l.series,this.distance=t(m.tooltipOptions.distance,16),!1===q?this.hide():(f=this.getLabel(),this.isHidden&&f.attr({opacity:1}).show(),this.split?this.renderSplit(q,
a):(d.style.width||f.css({width:this.chart.spacingBox.width}),f.attr({text:q&&q.join?q.join(""):q}),f.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-"+t(l.colorIndex,m.colorIndex)),f.attr({stroke:d.borderColor||l.color||m.color||"#666666"}),this.updatePosition({plotX:k,plotY:e,negative:l.negative,ttBelow:l.ttBelow,h:c[2]||0})),this.isHidden=!1))},renderSplit:function(e,k){var f=this,d=[],l=this.chart,g=l.renderer,c=!0,q=this.options,p=0,m=this.getLabel();B(e.slice(0,k.length+1),
function(a,b){if(!1!==a){b=k[b-1]||{isHeader:!0,plotX:k[0].plotX};var e=b.series||f,x=e.tt,y=b.series||{},A="highcharts-color-"+t(b.colorIndex,y.colorIndex,"none");x||(e.tt=x=g.label(null,null,null,"callout").addClass("highcharts-tooltip-box "+A).attr({padding:q.padding,r:q.borderRadius,fill:q.backgroundColor,stroke:q.borderColor||b.color||y.color||"#333333","stroke-width":q.borderWidth}).add(m));x.isActive=!0;x.attr({text:a});x.css(q.style).shadow(q.shadow);a=x.getBBox();y=a.width+x.strokeWidth();
b.isHeader?(p=a.height,y=Math.max(0,Math.min(b.plotX+l.plotLeft-y/2,l.chartWidth-y))):y=b.plotX+l.plotLeft-t(q.distance,16)-y;0>y&&(c=!1);a=(b.series&&b.series.yAxis&&b.series.yAxis.pos)+(b.plotY||0);a-=l.plotTop;d.push({target:b.isHeader?l.plotHeight+p:a,rank:b.isHeader?1:0,size:e.tt.getBBox().height+1,point:b,x:y,tt:x})}});this.cleanSplit();a.distribute(d,l.plotHeight+p);B(d,function(a){var b=a.point,d=b.series;a.tt.attr({visibility:void 0===a.pos?"hidden":"inherit",x:c||b.isHeader?a.x:b.plotX+
l.plotLeft+t(q.distance,16),y:a.pos+l.plotTop,anchorX:b.isHeader?b.plotX+l.plotLeft:b.plotX+d.xAxis.pos,anchorY:b.isHeader?a.pos+l.plotTop-15:b.plotY+d.yAxis.pos})})},updatePosition:function(a){var e=this.chart,f=this.getLabel(),f=(this.options.positioner||this.getPosition).call(this,f.width,f.height,a);this.move(Math.round(f.x),Math.round(f.y||0),a.plotX+e.plotLeft,a.plotY+e.plotTop)},getDateFormat:function(a,k,f,d){var e=D("%m-%d %H:%M:%S.%L",k),g,c,q={millisecond:15,second:12,minute:9,hour:6,day:3},
p="millisecond";for(c in l){if(a===l.week&&+D("%w",k)===f&&"00:00:00.000"===e.substr(6)){c="week";break}if(l[c]>a){c=p;break}if(q[c]&&e.substr(q[c])!=="01-01 00:00:00.000".substr(q[c]))break;"week"!==c&&(p=c)}c&&(g=d[c]);return g},getXDateFormat:function(a,k,f){k=k.dateTimeLabelFormats;var d=f&&f.closestPointRange;return(d?this.getDateFormat(d,a.x,f.options.startOfWeek,k):k.day)||k.year},tooltipFooterHeaderFormatter:function(a,k){var f=k?"footer":"header";k=a.series;var d=k.tooltipOptions,e=d.xDateFormat,
l=k.xAxis,c=l&&"datetime"===l.options.type&&r(a.key),f=d[f+"Format"];c&&!e&&(e=this.getXDateFormat(a,d,l));c&&e&&(f=f.replace("{point.key}","{point.key:"+e+"}"));return E(f,{point:a,series:k})},bodyFormatter:function(a){return g(a,function(a){var f=a.series.tooltipOptions;return(f.pointFormatter||a.point.tooltipFormatter).call(a.point,f.pointFormat)})}}})(M);(function(a){var D=a.addEvent,B=a.attr,G=a.charts,E=a.color,r=a.css,g=a.defined,p=a.each,t=a.extend,v=a.find,u=a.fireEvent,l=a.isObject,e=a.offset,
k=a.pick,f=a.removeEvent,d=a.splat,x=a.Tooltip,C=a.win;a.Pointer=function(a,d){this.init(a,d)};a.Pointer.prototype={init:function(a,d){this.options=d;this.chart=a;this.runChartClick=d.chart.events&&!!d.chart.events.click;this.pinchDown=[];this.lastValidTouch={};x&&(a.tooltip=new x(a,d.tooltip),this.followTouchMove=k(d.tooltip.followTouchMove,!0));this.setDOMEvents()},zoomOption:function(a){var c=this.chart,d=c.options.chart,f=d.zoomType||"",c=c.inverted;/touch/.test(a.type)&&(f=k(d.pinchType,f));
this.zoomX=a=/x/.test(f);this.zoomY=f=/y/.test(f);this.zoomHor=a&&!c||f&&c;this.zoomVert=f&&!c||a&&c;this.hasZoom=a||f},normalize:function(a,d){var c,f;a=a||C.event;a.target||(a.target=a.srcElement);f=a.touches?a.touches.length?a.touches.item(0):a.changedTouches[0]:a;d||(this.chartPosition=d=e(this.chart.container));void 0===f.pageX?(c=Math.max(a.x,a.clientX-d.left),d=a.y):(c=f.pageX-d.left,d=f.pageY-d.top);return t(a,{chartX:Math.round(c),chartY:Math.round(d)})},getCoordinates:function(a){var c=
{xAxis:[],yAxis:[]};p(this.chart.axes,function(d){c[d.isXAxis?"xAxis":"yAxis"].push({axis:d,value:d.toValue(a[d.horiz?"chartX":"chartY"])})});return c},findNearestKDPoint:function(a,d,f){var c;p(a,function(a){var b=!(a.noSharedTooltip&&d)&&0>a.options.findNearestPointBy.indexOf("y");a=a.searchPoint(f,b);if((b=l(a,!0))&&!(b=!l(c,!0)))var b=c.distX-a.distX,m=c.dist-a.dist,e=(a.series.group&&a.series.group.zIndex)-(c.series.group&&c.series.group.zIndex),b=0<(0!==b&&d?b:0!==m?m:0!==e?e:c.series.index>
a.series.index?-1:1);b&&(c=a)});return c},getPointFromEvent:function(a){a=a.target;for(var c;a&&!c;)c=a.point,a=a.parentNode;return c},getChartCoordinatesFromPoint:function(a,d){var c=a.series,f=c.xAxis,c=c.yAxis;if(f&&c)return d?{chartX:f.len+f.pos-a.clientX,chartY:c.len+c.pos-a.plotY}:{chartX:a.clientX+f.pos,chartY:a.plotY+c.pos}},getHoverData:function(c,d,f,m,e,b){var q,x=[];m=!(!m||!c);var y=d&&!d.stickyTracking?[d]:a.grep(f,function(a){return a.visible&&!(!e&&a.directTouch)&&k(a.options.enableMouseTracking,
!0)&&a.stickyTracking});d=(q=m?c:this.findNearestKDPoint(y,e,b))&&q.series;q&&(e&&!d.noSharedTooltip?(y=a.grep(f,function(a){return a.visible&&!(!e&&a.directTouch)&&k(a.options.enableMouseTracking,!0)&&!a.noSharedTooltip}),p(y,function(a){a=v(a.points,function(a){return a.x===q.x});l(a)&&!a.isNull&&x.push(a)})):x.push(q));return{hoverPoint:q,hoverSeries:d,hoverPoints:x}},runPointActions:function(c,d){var f=this.chart,m=f.tooltip,e=m?m.shared:!1,b=d||f.hoverPoint,q=b&&b.series||f.hoverSeries,q=this.getHoverData(b,
q,f.series,!!d||q&&q.directTouch&&this.isDirectTouch,e,c),l,b=q.hoverPoint;l=q.hoverPoints;d=(q=q.hoverSeries)&&q.tooltipOptions.followPointer;e=e&&q&&!q.noSharedTooltip;if(b&&(b!==f.hoverPoint||m&&m.isHidden)){p(f.hoverPoints||[],function(b){-1===a.inArray(b,l)&&b.setState()});p(l||[],function(a){a.setState("hover")});if(f.hoverSeries!==q)q.onMouseOver();f.hoverPoint&&f.hoverPoint.firePointEvent("mouseOut");b.firePointEvent("mouseOver");f.hoverPoints=l;f.hoverPoint=b;m&&m.refresh(e?l:b,c)}else d&&
m&&!m.isHidden&&(b=m.getAnchor([{}],c),m.updatePosition({plotX:b[0],plotY:b[1]}));this.unDocMouseMove||(this.unDocMouseMove=D(f.container.ownerDocument,"mousemove",function(b){var c=G[a.hoverChartIndex];if(c)c.pointer.onDocumentMouseMove(b)}));p(f.axes,function(b){var d=k(b.crosshair.snap,!0),n=d?a.find(l,function(a){return a.series[b.coll]===b}):void 0;n||!d?b.drawCrosshair(c,n):b.hideCrosshair()})},reset:function(a,f){var c=this.chart,m=c.hoverSeries,e=c.hoverPoint,b=c.hoverPoints,q=c.tooltip,k=
q&&q.shared?b:e;a&&k&&p(d(k),function(b){b.series.isCartesian&&void 0===b.plotX&&(a=!1)});if(a)q&&k&&(q.refresh(k),e&&(e.setState(e.state,!0),p(c.axes,function(a){a.crosshair&&a.drawCrosshair(null,e)})));else{if(e)e.onMouseOut();b&&p(b,function(a){a.setState()});if(m)m.onMouseOut();q&&q.hide(f);this.unDocMouseMove&&(this.unDocMouseMove=this.unDocMouseMove());p(c.axes,function(a){a.hideCrosshair()});this.hoverX=c.hoverPoints=c.hoverPoint=null}},scaleGroups:function(a,d){var c=this.chart,f;p(c.series,
function(m){f=a||m.getPlotBox();m.xAxis&&m.xAxis.zoomEnabled&&m.group&&(m.group.attr(f),m.markerGroup&&(m.markerGroup.attr(f),m.markerGroup.clip(d?c.clipRect:null)),m.dataLabelsGroup&&m.dataLabelsGroup.attr(f))});c.clipRect.attr(d||c.clipBox)},dragStart:function(a){var c=this.chart;c.mouseIsDown=a.type;c.cancelClick=!1;c.mouseDownX=this.mouseDownX=a.chartX;c.mouseDownY=this.mouseDownY=a.chartY},drag:function(a){var c=this.chart,d=c.options.chart,f=a.chartX,e=a.chartY,b=this.zoomHor,k=this.zoomVert,
l=c.plotLeft,y=c.plotTop,A=c.plotWidth,n=c.plotHeight,x,h=this.selectionMarker,w=this.mouseDownX,g=this.mouseDownY,C=d.panKey&&a[d.panKey+"Key"];h&&h.touch||(f<l?f=l:f>l+A&&(f=l+A),e<y?e=y:e>y+n&&(e=y+n),this.hasDragged=Math.sqrt(Math.pow(w-f,2)+Math.pow(g-e,2)),10<this.hasDragged&&(x=c.isInsidePlot(w-l,g-y),c.hasCartesianSeries&&(this.zoomX||this.zoomY)&&x&&!C&&!h&&(this.selectionMarker=h=c.renderer.rect(l,y,b?1:A,k?1:n,0).attr({fill:d.selectionMarkerFill||E("#335cad").setOpacity(.25).get(),"class":"highcharts-selection-marker",
zIndex:7}).add()),h&&b&&(f-=w,h.attr({width:Math.abs(f),x:(0<f?0:f)+w})),h&&k&&(f=e-g,h.attr({height:Math.abs(f),y:(0<f?0:f)+g})),x&&!h&&d.panning&&c.pan(a,d.panning)))},drop:function(a){var c=this,d=this.chart,f=this.hasPinched;if(this.selectionMarker){var e={originalEvent:a,xAxis:[],yAxis:[]},b=this.selectionMarker,k=b.attr?b.attr("x"):b.x,l=b.attr?b.attr("y"):b.y,y=b.attr?b.attr("width"):b.width,A=b.attr?b.attr("height"):b.height,n;if(this.hasDragged||f)p(d.axes,function(b){if(b.zoomEnabled&&g(b.min)&&
(f||c[{xAxis:"zoomX",yAxis:"zoomY"}[b.coll]])){var h=b.horiz,d="touchend"===a.type?b.minPixelPadding:0,m=b.toValue((h?k:l)+d),h=b.toValue((h?k+y:l+A)-d);e[b.coll].push({axis:b,min:Math.min(m,h),max:Math.max(m,h)});n=!0}}),n&&u(d,"selection",e,function(a){d.zoom(t(a,f?{animation:!1}:null))});this.selectionMarker=this.selectionMarker.destroy();f&&this.scaleGroups()}d&&(r(d.container,{cursor:d._cursor}),d.cancelClick=10<this.hasDragged,d.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=
[])},onContainerMouseDown:function(a){a=this.normalize(a);this.zoomOption(a);a.preventDefault&&a.preventDefault();this.dragStart(a)},onDocumentMouseUp:function(c){G[a.hoverChartIndex]&&G[a.hoverChartIndex].pointer.drop(c)},onDocumentMouseMove:function(a){var c=this.chart,d=this.chartPosition;a=this.normalize(a,d);!d||this.inClass(a.target,"highcharts-tracker")||c.isInsidePlot(a.chartX-c.plotLeft,a.chartY-c.plotTop)||this.reset()},onContainerMouseLeave:function(c){var d=G[a.hoverChartIndex];d&&(c.relatedTarget||
c.toElement)&&(d.pointer.reset(),d.pointer.chartPosition=null)},onContainerMouseMove:function(c){var d=this.chart;g(a.hoverChartIndex)&&G[a.hoverChartIndex]&&G[a.hoverChartIndex].mouseIsDown||(a.hoverChartIndex=d.index);c=this.normalize(c);c.returnValue=!1;"mousedown"===d.mouseIsDown&&this.drag(c);!this.inClass(c.target,"highcharts-tracker")&&!d.isInsidePlot(c.chartX-d.plotLeft,c.chartY-d.plotTop)||d.openMenu||this.runPointActions(c)},inClass:function(a,d){for(var c;a;){if(c=B(a,"class")){if(-1!==
c.indexOf(d))return!0;if(-1!==c.indexOf("highcharts-container"))return!1}a=a.parentNode}},onTrackerMouseOut:function(a){var c=this.chart.hoverSeries;a=a.relatedTarget||a.toElement;this.isDirectTouch=!1;if(!(!c||!a||c.stickyTracking||this.inClass(a,"highcharts-tooltip")||this.inClass(a,"highcharts-series-"+c.index)&&this.inClass(a,"highcharts-tracker")))c.onMouseOut()},onContainerClick:function(a){var c=this.chart,d=c.hoverPoint,f=c.plotLeft,e=c.plotTop;a=this.normalize(a);c.cancelClick||(d&&this.inClass(a.target,
"highcharts-tracker")?(u(d.series,"click",t(a,{point:d})),c.hoverPoint&&d.firePointEvent("click",a)):(t(a,this.getCoordinates(a)),c.isInsidePlot(a.chartX-f,a.chartY-e)&&u(c,"click",a)))},setDOMEvents:function(){var c=this,d=c.chart.container,f=d.ownerDocument;d.onmousedown=function(a){c.onContainerMouseDown(a)};d.onmousemove=function(a){c.onContainerMouseMove(a)};d.onclick=function(a){c.onContainerClick(a)};D(d,"mouseleave",c.onContainerMouseLeave);1===a.chartCount&&D(f,"mouseup",c.onDocumentMouseUp);
a.hasTouch&&(d.ontouchstart=function(a){c.onContainerTouchStart(a)},d.ontouchmove=function(a){c.onContainerTouchMove(a)},1===a.chartCount&&D(f,"touchend",c.onDocumentTouchEnd))},destroy:function(){var c=this,d=this.chart.container.ownerDocument;c.unDocMouseMove&&c.unDocMouseMove();f(c.chart.container,"mouseleave",c.onContainerMouseLeave);a.chartCount||(f(d,"mouseup",c.onDocumentMouseUp),a.hasTouch&&f(d,"touchend",c.onDocumentTouchEnd));clearInterval(c.tooltipTimeout);a.objectEach(c,function(a,d){c[d]=
null})}}})(M);(function(a){var D=a.charts,B=a.each,G=a.extend,E=a.map,r=a.noop,g=a.pick;G(a.Pointer.prototype,{pinchTranslate:function(a,g,r,u,l,e){this.zoomHor&&this.pinchTranslateDirection(!0,a,g,r,u,l,e);this.zoomVert&&this.pinchTranslateDirection(!1,a,g,r,u,l,e)},pinchTranslateDirection:function(a,g,r,u,l,e,k,f){var d=this.chart,x=a?"x":"y",C=a?"X":"Y",c="chart"+C,q=a?"width":"height",p=d["plot"+(a?"Left":"Top")],m,t,b=f||1,z=d.inverted,K=d.bounds[a?"h":"v"],y=1===g.length,A=g[0][c],n=r[0][c],
H=!y&&g[1][c],h=!y&&r[1][c],w;r=function(){!y&&20<Math.abs(A-H)&&(b=f||Math.abs(n-h)/Math.abs(A-H));t=(p-n)/b+A;m=d["plot"+(a?"Width":"Height")]/b};r();g=t;g<K.min?(g=K.min,w=!0):g+m>K.max&&(g=K.max-m,w=!0);w?(n-=.8*(n-k[x][0]),y||(h-=.8*(h-k[x][1])),r()):k[x]=[n,h];z||(e[x]=t-p,e[q]=m);e=z?1/b:b;l[q]=m;l[x]=g;u[z?a?"scaleY":"scaleX":"scale"+C]=b;u["translate"+C]=e*p+(n-e*A)},pinch:function(a){var p=this,v=p.chart,u=p.pinchDown,l=a.touches,e=l.length,k=p.lastValidTouch,f=p.hasZoom,d=p.selectionMarker,
x={},C=1===e&&(p.inClass(a.target,"highcharts-tracker")&&v.runTrackerClick||p.runChartClick),c={};1<e&&(p.initiated=!0);f&&p.initiated&&!C&&a.preventDefault();E(l,function(a){return p.normalize(a)});"touchstart"===a.type?(B(l,function(a,c){u[c]={chartX:a.chartX,chartY:a.chartY}}),k.x=[u[0].chartX,u[1]&&u[1].chartX],k.y=[u[0].chartY,u[1]&&u[1].chartY],B(v.axes,function(a){if(a.zoomEnabled){var c=v.bounds[a.horiz?"h":"v"],d=a.minPixelPadding,f=a.toPixels(g(a.options.min,a.dataMin)),b=a.toPixels(g(a.options.max,
a.dataMax)),e=Math.max(f,b);c.min=Math.min(a.pos,Math.min(f,b)-d);c.max=Math.max(a.pos+a.len,e+d)}}),p.res=!0):p.followTouchMove&&1===e?this.runPointActions(p.normalize(a)):u.length&&(d||(p.selectionMarker=d=G({destroy:r,touch:!0},v.plotBox)),p.pinchTranslate(u,l,x,d,c,k),p.hasPinched=f,p.scaleGroups(x,c),p.res&&(p.res=!1,this.reset(!1,0)))},touch:function(p,t){var r=this.chart,u,l;if(r.index!==a.hoverChartIndex)this.onContainerMouseLeave({relatedTarget:!0});a.hoverChartIndex=r.index;1===p.touches.length?
(p=this.normalize(p),(l=r.isInsidePlot(p.chartX-r.plotLeft,p.chartY-r.plotTop))&&!r.openMenu?(t&&this.runPointActions(p),"touchmove"===p.type&&(t=this.pinchDown,u=t[0]?4<=Math.sqrt(Math.pow(t[0].chartX-p.chartX,2)+Math.pow(t[0].chartY-p.chartY,2)):!1),g(u,!0)&&this.pinch(p)):t&&this.reset()):2===p.touches.length&&this.pinch(p)},onContainerTouchStart:function(a){this.zoomOption(a);this.touch(a,!0)},onContainerTouchMove:function(a){this.touch(a)},onDocumentTouchEnd:function(g){D[a.hoverChartIndex]&&
D[a.hoverChartIndex].pointer.drop(g)}})})(M);(function(a){var D=a.addEvent,B=a.charts,G=a.css,E=a.doc,r=a.extend,g=a.noop,p=a.Pointer,t=a.removeEvent,v=a.win,u=a.wrap;if(!a.hasTouch&&(v.PointerEvent||v.MSPointerEvent)){var l={},e=!!v.PointerEvent,k=function(){var d=[];d.item=function(a){return this[a]};a.objectEach(l,function(a){d.push({pageX:a.pageX,pageY:a.pageY,target:a.target})});return d},f=function(d,f,e,c){"touch"!==d.pointerType&&d.pointerType!==d.MSPOINTER_TYPE_TOUCH||!B[a.hoverChartIndex]||
(c(d),c=B[a.hoverChartIndex].pointer,c[f]({type:e,target:d.currentTarget,preventDefault:g,touches:k()}))};r(p.prototype,{onContainerPointerDown:function(a){f(a,"onContainerTouchStart","touchstart",function(a){l[a.pointerId]={pageX:a.pageX,pageY:a.pageY,target:a.currentTarget}})},onContainerPointerMove:function(a){f(a,"onContainerTouchMove","touchmove",function(a){l[a.pointerId]={pageX:a.pageX,pageY:a.pageY};l[a.pointerId].target||(l[a.pointerId].target=a.currentTarget)})},onDocumentPointerUp:function(a){f(a,
"onDocumentTouchEnd","touchend",function(a){delete l[a.pointerId]})},batchMSEvents:function(a){a(this.chart.container,e?"pointerdown":"MSPointerDown",this.onContainerPointerDown);a(this.chart.container,e?"pointermove":"MSPointerMove",this.onContainerPointerMove);a(E,e?"pointerup":"MSPointerUp",this.onDocumentPointerUp)}});u(p.prototype,"init",function(a,f,e){a.call(this,f,e);this.hasZoom&&G(f.container,{"-ms-touch-action":"none","touch-action":"none"})});u(p.prototype,"setDOMEvents",function(a){a.apply(this);
(this.hasZoom||this.followTouchMove)&&this.batchMSEvents(D)});u(p.prototype,"destroy",function(a){this.batchMSEvents(t);a.call(this)})}})(M);(function(a){var D=a.addEvent,B=a.css,G=a.discardElement,E=a.defined,r=a.each,g=a.isFirefox,p=a.marginNames,t=a.merge,v=a.pick,u=a.setAnimation,l=a.stableSort,e=a.win,k=a.wrap;a.Legend=function(a,d){this.init(a,d)};a.Legend.prototype={init:function(a,d){this.chart=a;this.setOptions(d);d.enabled&&(this.render(),D(this.chart,"endResize",function(){this.legend.positionCheckboxes()}))},
setOptions:function(a){var d=v(a.padding,8);this.options=a;this.itemStyle=a.itemStyle;this.itemHiddenStyle=t(this.itemStyle,a.itemHiddenStyle);this.itemMarginTop=a.itemMarginTop||0;this.padding=d;this.initialItemY=d-5;this.itemHeight=this.maxItemWidth=0;this.symbolWidth=v(a.symbolWidth,16);this.pages=[]},update:function(a,d){var f=this.chart;this.setOptions(t(!0,this.options,a));this.destroy();f.isDirtyLegend=f.isDirtyBox=!0;v(d,!0)&&f.redraw()},colorizeItem:function(a,d){a.legendGroup[d?"removeClass":
"addClass"]("highcharts-legend-item-hidden");var f=this.options,e=a.legendItem,c=a.legendLine,k=a.legendSymbol,l=this.itemHiddenStyle.color,f=d?f.itemStyle.color:l,m=d?a.color||l:l,g=a.options&&a.options.marker,b={fill:m};e&&e.css({fill:f,color:f});c&&c.attr({stroke:m});k&&(g&&k.isMarker&&(b=a.pointAttribs(),d||(b.stroke=b.fill=l)),k.attr(b))},positionItem:function(a){var d=this.options,f=d.symbolPadding,d=!d.rtl,e=a._legendItemPos,c=e[0],e=e[1],k=a.checkbox;(a=a.legendGroup)&&a.element&&a.translate(d?
c:this.legendWidth-c-2*f-4,e);k&&(k.x=c,k.y=e)},destroyItem:function(a){var d=a.checkbox;r(["legendItem","legendLine","legendSymbol","legendGroup"],function(d){a[d]&&(a[d]=a[d].destroy())});d&&G(a.checkbox)},destroy:function(){function a(a){this[a]&&(this[a]=this[a].destroy())}r(this.getAllItems(),function(d){r(["legendItem","legendGroup"],a,d)});r("clipRect up down pager nav box title group".split(" "),a,this);this.display=null},positionCheckboxes:function(a){var d=this.group&&this.group.alignAttr,
f,e=this.clipHeight||this.legendHeight,c=this.titleHeight;d&&(f=d.translateY,r(this.allItems,function(k){var l=k.checkbox,m;l&&(m=f+c+l.y+(a||0)+3,B(l,{left:d.translateX+k.checkboxOffset+l.x-20+"px",top:m+"px",display:m>f-6&&m<f+e-6?"":"none"}))}))},renderTitle:function(){var a=this.options,d=this.padding,e=a.title,k=0;e.text&&(this.title||(this.title=this.chart.renderer.label(e.text,d-3,d-4,null,null,null,a.useHTML,null,"legend-title").attr({zIndex:1}).css(e.style).add(this.group)),a=this.title.getBBox(),
k=a.height,this.offsetWidth=a.width,this.contentGroup.attr({translateY:k}));this.titleHeight=k},setText:function(f){var d=this.options;f.legendItem.attr({text:d.labelFormat?a.format(d.labelFormat,f):d.labelFormatter.call(f)})},renderItem:function(a){var d=this.chart,f=d.renderer,e=this.options,c="horizontal"===e.layout,k=this.symbolWidth,l=e.symbolPadding,m=this.itemStyle,g=this.itemHiddenStyle,b=this.padding,z=c?v(e.itemDistance,20):0,p=!e.rtl,y=e.width,A=e.itemMarginBottom||0,n=this.itemMarginTop,
H=a.legendItem,h=!a.series,w=!h&&a.series.drawLegendSymbol?a.series:a,r=w.options,L=this.createCheckboxForItem&&r&&r.showCheckbox,r=k+l+z+(L?20:0),u=e.useHTML,N=a.options.className;H||(a.legendGroup=f.g("legend-item").addClass("highcharts-"+w.type+"-series highcharts-color-"+a.colorIndex+(N?" "+N:"")+(h?" highcharts-series-"+a.index:"")).attr({zIndex:1}).add(this.scrollGroup),a.legendItem=H=f.text("",p?k+l:-l,this.baseline||0,u).css(t(a.visible?m:g)).attr({align:p?"left":"right",zIndex:2}).add(a.legendGroup),
this.baseline||(k=m.fontSize,this.fontMetrics=f.fontMetrics(k,H),this.baseline=this.fontMetrics.f+3+n,H.attr("y",this.baseline)),this.symbolHeight=e.symbolHeight||this.fontMetrics.f,w.drawLegendSymbol(this,a),this.setItemEvents&&this.setItemEvents(a,H,u),L&&this.createCheckboxForItem(a));this.colorizeItem(a,a.visible);m.width||H.css({width:(e.itemWidth||e.width||d.spacingBox.width)-r});this.setText(a);f=H.getBBox();m=a.checkboxOffset=e.itemWidth||a.legendItemWidth||f.width+r;this.itemHeight=f=Math.round(a.legendItemHeight||
f.height||this.symbolHeight);c&&this.itemX-b+m>(y||d.spacingBox.width-2*b-e.x)&&(this.itemX=b,this.itemY+=n+this.lastLineHeight+A,this.lastLineHeight=0);this.maxItemWidth=Math.max(this.maxItemWidth,m);this.lastItemY=n+this.itemY+A;this.lastLineHeight=Math.max(f,this.lastLineHeight);a._legendItemPos=[this.itemX,this.itemY];c?this.itemX+=m:(this.itemY+=n+f+A,this.lastLineHeight=f);this.offsetWidth=y||Math.max((c?this.itemX-b-(a.checkbox?0:z):m)+b,this.offsetWidth)},getAllItems:function(){var a=[];r(this.chart.series,
function(d){var f=d&&d.options;d&&v(f.showInLegend,E(f.linkedTo)?!1:void 0,!0)&&(a=a.concat(d.legendItems||("point"===f.legendType?d.data:d)))});return a},adjustMargins:function(a,d){var f=this.chart,e=this.options,c=e.align.charAt(0)+e.verticalAlign.charAt(0)+e.layout.charAt(0);e.floating||r([/(lth|ct|rth)/,/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,/(lbv|lm|ltv)/],function(k,l){k.test(c)&&!E(a[l])&&(f[p[l]]=Math.max(f[p[l]],f.legend[(l+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][l]*e[l%2?"x":"y"]+v(e.margin,
12)+d[l]))})},render:function(){var a=this,d=a.chart,e=d.renderer,k=a.group,c,q,g,m,p=a.box,b=a.options,z=a.padding;a.itemX=z;a.itemY=a.initialItemY;a.offsetWidth=0;a.lastItemY=0;k||(a.group=k=e.g("legend").attr({zIndex:7}).add(),a.contentGroup=e.g().attr({zIndex:1}).add(k),a.scrollGroup=e.g().add(a.contentGroup));a.renderTitle();c=a.getAllItems();l(c,function(a,b){return(a.options&&a.options.legendIndex||0)-(b.options&&b.options.legendIndex||0)});b.reversed&&c.reverse();a.allItems=c;a.display=q=
!!c.length;a.lastLineHeight=0;r(c,function(b){a.renderItem(b)});g=(b.width||a.offsetWidth)+z;m=a.lastItemY+a.lastLineHeight+a.titleHeight;m=a.handleOverflow(m);m+=z;p||(a.box=p=e.rect().addClass("highcharts-legend-box").attr({r:b.borderRadius}).add(k),p.isNew=!0);p.attr({stroke:b.borderColor,"stroke-width":b.borderWidth||0,fill:b.backgroundColor||"none"}).shadow(b.shadow);0<g&&0<m&&(p[p.isNew?"attr":"animate"](p.crisp({x:0,y:0,width:g,height:m},p.strokeWidth())),p.isNew=!1);p[q?"show":"hide"]();a.legendWidth=
g;a.legendHeight=m;r(c,function(b){a.positionItem(b)});q&&k.align(t(b,{width:g,height:m}),!0,"spacingBox");d.isResizing||this.positionCheckboxes()},handleOverflow:function(a){var d=this,f=this.chart,e=f.renderer,c=this.options,k=c.y,l=this.padding,f=f.spacingBox.height+("top"===c.verticalAlign?-k:k)-l,k=c.maxHeight,m,g=this.clipRect,b=c.navigation,z=v(b.animation,!0),p=b.arrowSize||12,y=this.nav,A=this.pages,n,H=this.allItems,h=function(a){"number"===typeof a?g.attr({height:a}):g&&(d.clipRect=g.destroy(),
d.contentGroup.clip());d.contentGroup.div&&(d.contentGroup.div.style.clip=a?"rect("+l+"px,9999px,"+(l+a)+"px,0)":"auto")};"horizontal"!==c.layout||"middle"===c.verticalAlign||c.floating||(f/=2);k&&(f=Math.min(f,k));A.length=0;a>f&&!1!==b.enabled?(this.clipHeight=m=Math.max(f-20-this.titleHeight-l,0),this.currentPage=v(this.currentPage,1),this.fullHeight=a,r(H,function(a,b){var c=a._legendItemPos[1];a=Math.round(a.legendItem.getBBox().height);var d=A.length;if(!d||c-A[d-1]>m&&(n||c)!==A[d-1])A.push(n||
c),d++;b===H.length-1&&c+a-A[d-1]>m&&A.push(c);c!==n&&(n=c)}),g||(g=d.clipRect=e.clipRect(0,l,9999,0),d.contentGroup.clip(g)),h(m),y||(this.nav=y=e.g().attr({zIndex:1}).add(this.group),this.up=e.symbol("triangle",0,0,p,p).on("click",function(){d.scroll(-1,z)}).add(y),this.pager=e.text("",15,10).addClass("highcharts-legend-navigation").css(b.style).add(y),this.down=e.symbol("triangle-down",0,0,p,p).on("click",function(){d.scroll(1,z)}).add(y)),d.scroll(0),a=f):y&&(h(),this.nav=y.destroy(),this.scrollGroup.attr({translateY:1}),
this.clipHeight=0);return a},scroll:function(a,d){var f=this.pages,e=f.length;a=this.currentPage+a;var c=this.clipHeight,k=this.options.navigation,l=this.pager,m=this.padding;a>e&&(a=e);0<a&&(void 0!==d&&u(d,this.chart),this.nav.attr({translateX:m,translateY:c+this.padding+7+this.titleHeight,visibility:"visible"}),this.up.attr({"class":1===a?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),l.attr({text:a+"/"+e}),this.down.attr({x:18+this.pager.getBBox().width,"class":a===e?"highcharts-legend-nav-inactive":
"highcharts-legend-nav-active"}),this.up.attr({fill:1===a?k.inactiveColor:k.activeColor}).css({cursor:1===a?"default":"pointer"}),this.down.attr({fill:a===e?k.inactiveColor:k.activeColor}).css({cursor:a===e?"default":"pointer"}),d=-f[a-1]+this.initialItemY,this.scrollGroup.animate({translateY:d}),this.currentPage=a,this.positionCheckboxes(d))}};a.LegendSymbolMixin={drawRectangle:function(a,d){var f=a.symbolHeight,e=a.options.squareSymbol;d.legendSymbol=this.chart.renderer.rect(e?(a.symbolWidth-f)/
2:0,a.baseline-f+1,e?f:a.symbolWidth,f,v(a.options.symbolRadius,f/2)).addClass("highcharts-point").attr({zIndex:3}).add(d.legendGroup)},drawLineMarker:function(a){var d=this.options,f=d.marker,e=a.symbolWidth,c=a.symbolHeight,k=c/2,l=this.chart.renderer,m=this.legendGroup;a=a.baseline-Math.round(.3*a.fontMetrics.b);var g;g={"stroke-width":d.lineWidth||0};d.dashStyle&&(g.dashstyle=d.dashStyle);this.legendLine=l.path(["M",0,a,"L",e,a]).addClass("highcharts-graph").attr(g).add(m);f&&!1!==f.enabled&&
(d=Math.min(v(f.radius,k),k),0===this.symbol.indexOf("url")&&(f=t(f,{width:c,height:c}),d=0),this.legendSymbol=f=l.symbol(this.symbol,e/2-d,a-d,2*d,2*d,f).addClass("highcharts-point").add(m),f.isMarker=!0)}};(/Trident\/7\.0/.test(e.navigator.userAgent)||g)&&k(a.Legend.prototype,"positionItem",function(a,d){var f=this,e=function(){d._legendItemPos&&a.call(f,d)};e();setTimeout(e)})})(M);(function(a){var D=a.addEvent,B=a.animate,G=a.animObject,E=a.attr,r=a.doc,g=a.Axis,p=a.createElement,t=a.defaultOptions,
v=a.discardElement,u=a.charts,l=a.css,e=a.defined,k=a.each,f=a.extend,d=a.find,x=a.fireEvent,C=a.getStyle,c=a.grep,q=a.isNumber,I=a.isObject,m=a.isString,J=a.Legend,b=a.marginNames,z=a.merge,K=a.objectEach,y=a.Pointer,A=a.pick,n=a.pInt,H=a.removeEvent,h=a.seriesTypes,w=a.splat,P=a.svg,L=a.syncTimeout,Q=a.win,N=a.Renderer,O=a.Chart=function(){this.getArgs.apply(this,arguments)};a.chart=function(a,b,c){return new O(a,b,c)};f(O.prototype,{callbacks:[],getArgs:function(){var a=[].slice.call(arguments);
if(m(a[0])||a[0].nodeName)this.renderTo=a.shift();this.init(a[0],a[1])},init:function(b,c){var d,h,n=b.series,f=b.plotOptions||{};b.series=null;d=z(t,b);for(h in d.plotOptions)d.plotOptions[h].tooltip=f[h]&&z(f[h].tooltip)||void 0;d.tooltip.userOptions=b.chart&&b.chart.forExport&&b.tooltip.userOptions||b.tooltip;d.series=b.series=n;this.userOptions=b;b=d.chart;h=b.events;this.margin=[];this.spacing=[];this.bounds={h:{},v:{}};this.callback=c;this.isResizing=0;this.options=d;this.axes=[];this.series=
[];this.hasCartesianSeries=b.showAxes;var e=this;e.index=u.length;u.push(e);a.chartCount++;h&&K(h,function(a,b){D(e,b,a)});e.xAxis=[];e.yAxis=[];e.pointCount=e.colorCounter=e.symbolCounter=0;e.firstRender()},initSeries:function(b){var c=this.options.chart;(c=h[b.type||c.type||c.defaultSeriesType])||a.error(17,!0);c=new c;c.init(this,b);return c},orderSeries:function(a){var b=this.series;for(a=a||0;a<b.length;a++)b[a]&&(b[a].index=a,b[a].name=b[a].name||"Series "+(b[a].index+1))},isInsidePlot:function(a,
b,c){var d=c?b:a;a=c?a:b;return 0<=d&&d<=this.plotWidth&&0<=a&&a<=this.plotHeight},redraw:function(b){var c=this.axes,d=this.series,h=this.pointer,n=this.legend,e=this.isDirtyLegend,m,y,l=this.hasCartesianSeries,w=this.isDirtyBox,A,q=this.renderer,g=q.isHidden(),H=[];this.setResponsive&&this.setResponsive(!1);a.setAnimation(b,this);g&&this.temporaryDisplay();this.layOutTitles();for(b=d.length;b--;)if(A=d[b],A.options.stacking&&(m=!0,A.isDirty)){y=!0;break}if(y)for(b=d.length;b--;)A=d[b],A.options.stacking&&
(A.isDirty=!0);k(d,function(a){a.isDirty&&"point"===a.options.legendType&&(a.updateTotals&&a.updateTotals(),e=!0);a.isDirtyData&&x(a,"updatedData")});e&&n.options.enabled&&(n.render(),this.isDirtyLegend=!1);m&&this.getStacks();l&&k(c,function(a){a.updateNames();a.setScale()});this.getMargins();l&&(k(c,function(a){a.isDirty&&(w=!0)}),k(c,function(a){var b=a.min+","+a.max;a.extKey!==b&&(a.extKey=b,H.push(function(){x(a,"afterSetExtremes",f(a.eventArgs,a.getExtremes()));delete a.eventArgs}));(w||m)&&
a.redraw()}));w&&this.drawChartBox();x(this,"predraw");k(d,function(a){(w||a.isDirty)&&a.visible&&a.redraw();a.isDirtyData=!1});h&&h.reset(!0);q.draw();x(this,"redraw");x(this,"render");g&&this.temporaryDisplay(!0);k(H,function(a){a.call()})},get:function(a){function b(b){return b.id===a||b.options&&b.options.id===a}var c,h=this.series,n;c=d(this.axes,b)||d(this.series,b);for(n=0;!c&&n<h.length;n++)c=d(h[n].points||[],b);return c},getAxes:function(){var a=this,b=this.options,c=b.xAxis=w(b.xAxis||
{}),b=b.yAxis=w(b.yAxis||{});k(c,function(a,b){a.index=b;a.isX=!0});k(b,function(a,b){a.index=b});c=c.concat(b);k(c,function(b){new g(a,b)})},getSelectedPoints:function(){var a=[];k(this.series,function(b){a=a.concat(c(b.data||[],function(a){return a.selected}))});return a},getSelectedSeries:function(){return c(this.series,function(a){return a.selected})},setTitle:function(a,b,c){var d=this,h=d.options,n;n=h.title=z({style:{color:"#333333",fontSize:h.isStock?"16px":"18px"}},h.title,a);h=h.subtitle=
z({style:{color:"#666666"}},h.subtitle,b);k([["title",a,n],["subtitle",b,h]],function(a,b){var c=a[0],h=d[c],n=a[1];a=a[2];h&&n&&(d[c]=h=h.destroy());a&&a.text&&!h&&(d[c]=d.renderer.text(a.text,0,0,a.useHTML).attr({align:a.align,"class":"highcharts-"+c,zIndex:a.zIndex||4}).add(),d[c].update=function(a){d.setTitle(!b&&a,b&&a)},d[c].css(a.style))});d.layOutTitles(c)},layOutTitles:function(a){var b=0,c,d=this.renderer,h=this.spacingBox;k(["title","subtitle"],function(a){var c=this[a],n=this.options[a];
a="title"===a?-3:n.verticalAlign?0:b+2;var e;c&&(e=n.style.fontSize,e=d.fontMetrics(e,c).b,c.css({width:(n.width||h.width+n.widthAdjust)+"px"}).align(f({y:a+e},n),!1,"spacingBox"),n.floating||n.verticalAlign||(b=Math.ceil(b+c.getBBox(n.useHTML).height)))},this);c=this.titleOffset!==b;this.titleOffset=b;!this.isDirtyBox&&c&&(this.isDirtyBox=c,this.hasRendered&&A(a,!0)&&this.isDirtyBox&&this.redraw())},getChartSize:function(){var b=this.options.chart,c=b.width,b=b.height,d=this.renderTo;e(c)||(this.containerWidth=
C(d,"width"));e(b)||(this.containerHeight=C(d,"height"));this.chartWidth=Math.max(0,c||this.containerWidth||600);this.chartHeight=Math.max(0,a.relativeLength(b,this.chartWidth)||this.containerHeight||400)},temporaryDisplay:function(b){var c=this.renderTo;if(b)for(;c&&c.style;)c.hcOrigStyle&&(a.css(c,c.hcOrigStyle),delete c.hcOrigStyle),c.hcOrigDetached&&(r.body.removeChild(c),c.hcOrigDetached=!1),c=c.parentNode;else for(;c&&c.style;){r.body.contains(c)||(c.hcOrigDetached=!0,r.body.appendChild(c));
if("none"===C(c,"display",!1)||c.hcOricDetached)c.hcOrigStyle={display:c.style.display,height:c.style.height,overflow:c.style.overflow},b={display:"block",overflow:"hidden"},c!==this.renderTo&&(b.height=0),a.css(c,b),c.offsetWidth||c.style.setProperty("display","block","important");c=c.parentNode;if(c===r.body)break}},setClassName:function(a){this.container.className="highcharts-container "+(a||"")},getContainer:function(){var b,c=this.options,d=c.chart,h,e;b=this.renderTo;var y=a.uniqueKey(),k;b||
(this.renderTo=b=d.renderTo);m(b)&&(this.renderTo=b=r.getElementById(b));b||a.error(13,!0);h=n(E(b,"data-highcharts-chart"));q(h)&&u[h]&&u[h].hasRendered&&u[h].destroy();E(b,"data-highcharts-chart",this.index);b.innerHTML="";d.skipClone||b.offsetWidth||this.temporaryDisplay();this.getChartSize();h=this.chartWidth;e=this.chartHeight;k=f({position:"relative",overflow:"hidden",width:h+"px",height:e+"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},d.style);
this.container=b=p("div",{id:y},k,b);this._cursor=b.style.cursor;this.renderer=new (a[d.renderer]||N)(b,h,e,null,d.forExport,c.exporting&&c.exporting.allowHTML);this.setClassName(d.className);this.renderer.setStyle(d.style);this.renderer.chartIndex=this.index},getMargins:function(a){var b=this.spacing,c=this.margin,d=this.titleOffset;this.resetMargins();d&&!e(c[0])&&(this.plotTop=Math.max(this.plotTop,d+this.options.title.margin+b[0]));this.legend.display&&this.legend.adjustMargins(c,b);this.extraMargin&&
(this[this.extraMargin.type]=(this[this.extraMargin.type]||0)+this.extraMargin.value);this.extraTopMargin&&(this.plotTop+=this.extraTopMargin);a||this.getAxisMargins()},getAxisMargins:function(){var a=this,c=a.axisOffset=[0,0,0,0],d=a.margin;a.hasCartesianSeries&&k(a.axes,function(a){a.visible&&a.getOffset()});k(b,function(b,h){e(d[h])||(a[b]+=c[h])});a.setChartSize()},reflow:function(a){var b=this,c=b.options.chart,d=b.renderTo,h=e(c.width)&&e(c.height),n=c.width||C(d,"width"),c=c.height||C(d,"height"),
d=a?a.target:Q;if(!h&&!b.isPrinting&&n&&c&&(d===Q||d===r)){if(n!==b.containerWidth||c!==b.containerHeight)clearTimeout(b.reflowTimeout),b.reflowTimeout=L(function(){b.container&&b.setSize(void 0,void 0,!1)},a?100:0);b.containerWidth=n;b.containerHeight=c}},initReflow:function(){var a=this,b;b=D(Q,"resize",function(b){a.reflow(b)});D(a,"destroy",b)},setSize:function(b,c,d){var h=this,n=h.renderer;h.isResizing+=1;a.setAnimation(d,h);h.oldChartHeight=h.chartHeight;h.oldChartWidth=h.chartWidth;void 0!==
b&&(h.options.chart.width=b);void 0!==c&&(h.options.chart.height=c);h.getChartSize();b=n.globalAnimation;(b?B:l)(h.container,{width:h.chartWidth+"px",height:h.chartHeight+"px"},b);h.setChartSize(!0);n.setSize(h.chartWidth,h.chartHeight,d);k(h.axes,function(a){a.isDirty=!0;a.setScale()});h.isDirtyLegend=!0;h.isDirtyBox=!0;h.layOutTitles();h.getMargins();h.redraw(d);h.oldChartHeight=null;x(h,"resize");L(function(){h&&x(h,"endResize",null,function(){--h.isResizing})},G(b).duration)},setChartSize:function(a){function b(a){a=
m[a]||0;return Math.max(q||a,a)/2}var c=this.inverted,h=this.renderer,d=this.chartWidth,n=this.chartHeight,e=this.options.chart,f=this.spacing,m=this.clipOffset,y,l,w,A,q;this.plotLeft=y=Math.round(this.plotLeft);this.plotTop=l=Math.round(this.plotTop);this.plotWidth=w=Math.max(0,Math.round(d-y-this.marginRight));this.plotHeight=A=Math.max(0,Math.round(n-l-this.marginBottom));this.plotSizeX=c?A:w;this.plotSizeY=c?w:A;this.plotBorderWidth=e.plotBorderWidth||0;this.spacingBox=h.spacingBox={x:f[3],y:f[0],
width:d-f[3]-f[1],height:n-f[0]-f[2]};this.plotBox=h.plotBox={x:y,y:l,width:w,height:A};q=2*Math.floor(this.plotBorderWidth/2);c=Math.ceil(b(3));h=Math.ceil(b(0));this.clipBox={x:c,y:h,width:Math.floor(this.plotSizeX-b(1)-c),height:Math.max(0,Math.floor(this.plotSizeY-b(2)-h))};a||k(this.axes,function(a){a.setAxisSize();a.setAxisTranslation()})},resetMargins:function(){var a=this,c=a.options.chart;k(["margin","spacing"],function(b){var h=c[b],d=I(h)?h:[h,h,h,h];k(["Top","Right","Bottom","Left"],function(h,
n){a[b][n]=A(c[b+h],d[n])})});k(b,function(b,c){a[b]=A(a.margin[c],a.spacing[c])});a.axisOffset=[0,0,0,0];a.clipOffset=[]},drawChartBox:function(){var a=this.options.chart,b=this.renderer,c=this.chartWidth,h=this.chartHeight,d=this.chartBackground,n=this.plotBackground,e=this.plotBorder,f,m=this.plotBGImage,y=a.backgroundColor,k=a.plotBackgroundColor,l=a.plotBackgroundImage,w,A=this.plotLeft,q=this.plotTop,g=this.plotWidth,H=this.plotHeight,z=this.plotBox,p=this.clipRect,x=this.clipBox,C="animate";
d||(this.chartBackground=d=b.rect().addClass("highcharts-background").add(),C="attr");f=a.borderWidth||0;w=f+(a.shadow?8:0);y={fill:y||"none"};if(f||d["stroke-width"])y.stroke=a.borderColor,y["stroke-width"]=f;d.attr(y).shadow(a.shadow);d[C]({x:w/2,y:w/2,width:c-w-f%2,height:h-w-f%2,r:a.borderRadius});C="animate";n||(C="attr",this.plotBackground=n=b.rect().addClass("highcharts-plot-background").add());n[C](z);n.attr({fill:k||"none"}).shadow(a.plotShadow);l&&(m?m.animate(z):this.plotBGImage=b.image(l,
A,q,g,H).add());p?p.animate({width:x.width,height:x.height}):this.clipRect=b.clipRect(x);C="animate";e||(C="attr",this.plotBorder=e=b.rect().addClass("highcharts-plot-border").attr({zIndex:1}).add());e.attr({stroke:a.plotBorderColor,"stroke-width":a.plotBorderWidth||0,fill:"none"});e[C](e.crisp({x:A,y:q,width:g,height:H},-e.strokeWidth()));this.isDirtyBox=!1},propFromSeries:function(){var a=this,b=a.options.chart,c,d=a.options.series,n,e;k(["inverted","angular","polar"],function(f){c=h[b.type||b.defaultSeriesType];
e=b[f]||c&&c.prototype[f];for(n=d&&d.length;!e&&n--;)(c=h[d[n].type])&&c.prototype[f]&&(e=!0);a[f]=e})},linkSeries:function(){var a=this,b=a.series;k(b,function(a){a.linkedSeries.length=0});k(b,function(b){var c=b.options.linkedTo;m(c)&&(c=":previous"===c?a.series[b.index-1]:a.get(c))&&c.linkedParent!==b&&(c.linkedSeries.push(b),b.linkedParent=c,b.visible=A(b.options.visible,c.options.visible,b.visible))})},renderSeries:function(){k(this.series,function(a){a.translate();a.render()})},renderLabels:function(){var a=
this,b=a.options.labels;b.items&&k(b.items,function(c){var h=f(b.style,c.style),d=n(h.left)+a.plotLeft,e=n(h.top)+a.plotTop+12;delete h.left;delete h.top;a.renderer.text(c.html,d,e).attr({zIndex:2}).css(h).add()})},render:function(){var a=this.axes,b=this.renderer,c=this.options,h,d,n;this.setTitle();this.legend=new J(this,c.legend);this.getStacks&&this.getStacks();this.getMargins(!0);this.setChartSize();c=this.plotWidth;h=this.plotHeight-=21;k(a,function(a){a.setScale()});this.getAxisMargins();d=
1.1<c/this.plotWidth;n=1.05<h/this.plotHeight;if(d||n)k(a,function(a){(a.horiz&&d||!a.horiz&&n)&&a.setTickInterval(!0)}),this.getMargins();this.drawChartBox();this.hasCartesianSeries&&k(a,function(a){a.visible&&a.render()});this.seriesGroup||(this.seriesGroup=b.g("series-group").attr({zIndex:3}).add());this.renderSeries();this.renderLabels();this.addCredits();this.setResponsive&&this.setResponsive();this.hasRendered=!0},addCredits:function(a){var b=this;a=z(!0,this.options.credits,a);a.enabled&&!this.credits&&
(this.credits=this.renderer.text(a.text+(this.mapCredits||""),0,0).addClass("highcharts-credits").on("click",function(){a.href&&(Q.location.href=a.href)}).attr({align:a.position.align,zIndex:8}).css(a.style).add().align(a.position),this.credits.update=function(a){b.credits=b.credits.destroy();b.addCredits(a)})},destroy:function(){var b=this,c=b.axes,h=b.series,d=b.container,n,e=d&&d.parentNode;x(b,"destroy");b.renderer.forExport?a.erase(u,b):u[b.index]=void 0;a.chartCount--;b.renderTo.removeAttribute("data-highcharts-chart");
H(b);for(n=c.length;n--;)c[n]=c[n].destroy();this.scroller&&this.scroller.destroy&&this.scroller.destroy();for(n=h.length;n--;)h[n]=h[n].destroy();k("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "),function(a){var c=b[a];c&&c.destroy&&(b[a]=c.destroy())});d&&(d.innerHTML="",H(d),e&&v(d));K(b,function(a,c){delete b[c]})},isReadyToRender:function(){var a=this;return P||Q!=Q.top||
"complete"===r.readyState?!0:(r.attachEvent("onreadystatechange",function(){r.detachEvent("onreadystatechange",a.firstRender);"complete"===r.readyState&&a.firstRender()}),!1)},firstRender:function(){var a=this,b=a.options;if(a.isReadyToRender()){a.getContainer();x(a,"init");a.resetMargins();a.setChartSize();a.propFromSeries();a.getAxes();k(b.series||[],function(b){a.initSeries(b)});a.linkSeries();x(a,"beforeRender");y&&(a.pointer=new y(a,b));a.render();if(!a.renderer.imgCount&&a.onload)a.onload();
a.temporaryDisplay(!0)}},onload:function(){k([this.callback].concat(this.callbacks),function(a){a&&void 0!==this.index&&a.apply(this,[this])},this);x(this,"load");x(this,"render");e(this.index)&&!1!==this.options.chart.reflow&&this.initReflow();this.onload=null}})})(M);(function(a){var D,B=a.each,G=a.extend,E=a.erase,r=a.fireEvent,g=a.format,p=a.isArray,t=a.isNumber,v=a.pick,u=a.removeEvent;a.Point=D=function(){};a.Point.prototype={init:function(a,e,k){this.series=a;this.color=a.color;this.applyOptions(e,
k);a.options.colorByPoint?(e=a.options.colors||a.chart.options.colors,this.color=this.color||e[a.colorCounter],e=e.length,k=a.colorCounter,a.colorCounter++,a.colorCounter===e&&(a.colorCounter=0)):k=a.colorIndex;this.colorIndex=v(this.colorIndex,k);a.chart.pointCount++;return this},applyOptions:function(a,e){var k=this.series,f=k.options.pointValKey||k.pointValKey;a=D.prototype.optionsToObject.call(this,a);G(this,a);this.options=this.options?G(this.options,a):a;a.group&&delete this.group;f&&(this.y=
this[f]);this.isNull=v(this.isValid&&!this.isValid(),null===this.x||!t(this.y,!0));this.selected&&(this.state="select");"name"in this&&void 0===e&&k.xAxis&&k.xAxis.hasNames&&(this.x=k.xAxis.nameToX(this));void 0===this.x&&k&&(this.x=void 0===e?k.autoIncrement(this):e);return this},optionsToObject:function(a){var e={},k=this.series,f=k.options.keys,d=f||k.pointArrayMap||["y"],l=d.length,g=0,c=0;if(t(a)||null===a)e[d[0]]=a;else if(p(a))for(!f&&a.length>l&&(k=typeof a[0],"string"===k?e.name=a[0]:"number"===
k&&(e.x=a[0]),g++);c<l;)f&&void 0===a[g]||(e[d[c]]=a[g]),g++,c++;else"object"===typeof a&&(e=a,a.dataLabels&&(k._hasPointLabels=!0),a.marker&&(k._hasPointMarkers=!0));return e},getClassName:function(){return"highcharts-point"+(this.selected?" highcharts-point-select":"")+(this.negative?" highcharts-negative":"")+(this.isNull?" highcharts-null-point":"")+(void 0!==this.colorIndex?" highcharts-color-"+this.colorIndex:"")+(this.options.className?" "+this.options.className:"")+(this.zone&&this.zone.className?
" "+this.zone.className.replace("highcharts-negative",""):"")},getZone:function(){var a=this.series,e=a.zones,a=a.zoneAxis||"y",k=0,f;for(f=e[k];this[a]>=f.value;)f=e[++k];f&&f.color&&!this.options.color&&(this.color=f.color);return f},destroy:function(){var a=this.series.chart,e=a.hoverPoints,k;a.pointCount--;e&&(this.setState(),E(e,this),e.length||(a.hoverPoints=null));if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel)u(this),this.destroyElements();this.legendItem&&a.legend.destroyItem(this);
for(k in this)this[k]=null},destroyElements:function(){for(var a=["graphic","dataLabel","dataLabelUpper","connector","shadowGroup"],e,k=6;k--;)e=a[k],this[e]&&(this[e]=this[e].destroy())},getLabelConfig:function(){return{x:this.category,y:this.y,color:this.color,colorIndex:this.colorIndex,key:this.name||this.category,series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}},tooltipFormatter:function(a){var e=this.series,k=e.tooltipOptions,f=v(k.valueDecimals,""),
d=k.valuePrefix||"",l=k.valueSuffix||"";B(e.pointArrayMap||["y"],function(e){e="{point."+e;if(d||l)a=a.replace(e+"}",d+e+"}"+l);a=a.replace(e+"}",e+":,."+f+"f}")});return g(a,{point:this,series:this.series})},firePointEvent:function(a,e,k){var f=this,d=this.series.options;(d.point.events[a]||f.options&&f.options.events&&f.options.events[a])&&this.importEvents();"click"===a&&d.allowPointSelect&&(k=function(a){f.select&&f.select(null,a.ctrlKey||a.metaKey||a.shiftKey)});r(this,a,e,k)},visible:!0}})(M);
(function(a){var D=a.addEvent,B=a.animObject,G=a.arrayMax,E=a.arrayMin,r=a.correctFloat,g=a.Date,p=a.defaultOptions,t=a.defaultPlotOptions,v=a.defined,u=a.each,l=a.erase,e=a.extend,k=a.fireEvent,f=a.grep,d=a.isArray,x=a.isNumber,C=a.isString,c=a.merge,q=a.objectEach,I=a.pick,m=a.removeEvent,J=a.splat,b=a.SVGElement,z=a.syncTimeout,K=a.win;a.Series=a.seriesType("line",null,{lineWidth:2,allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},marker:{lineWidth:0,lineColor:"#ffffff",radius:4,
states:{hover:{animation:{duration:50},enabled:!0,radiusPlus:2,lineWidthPlus:1},select:{fillColor:"#cccccc",lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:{align:"center",formatter:function(){return null===this.y?"":a.numberFormat(this.y,-1)},style:{fontSize:"11px",fontWeight:"bold",color:"contrast",textOutline:"1px contrast"},verticalAlign:"bottom",x:0,y:0,padding:5},cropThreshold:300,pointRange:0,softThreshold:!0,states:{hover:{animation:{duration:50},lineWidthPlus:1,marker:{},
halo:{size:10,opacity:.25}},select:{marker:{}}},stickyTracking:!0,turboThreshold:1E3,findNearestPointBy:"x"},{isCartesian:!0,pointClass:a.Point,sorted:!0,requireSorting:!0,directTouch:!1,axisTypes:["xAxis","yAxis"],colorCounter:0,parallelArrays:["x","y"],coll:"series",init:function(a,b){var c=this,d,h=a.series,f;c.chart=a;c.options=b=c.setOptions(b);c.linkedSeries=[];c.bindAxes();e(c,{name:b.name,state:"",visible:!1!==b.visible,selected:!0===b.selected});d=b.events;q(d,function(a,b){D(c,b,a)});if(d&&
d.click||b.point&&b.point.events&&b.point.events.click||b.allowPointSelect)a.runTrackerClick=!0;c.getColor();c.getSymbol();u(c.parallelArrays,function(a){c[a+"Data"]=[]});c.setData(b.data,!1);c.isCartesian&&(a.hasCartesianSeries=!0);h.length&&(f=h[h.length-1]);c._i=I(f&&f._i,-1)+1;a.orderSeries(this.insert(h))},insert:function(a){var b=this.options.index,c;if(x(b)){for(c=a.length;c--;)if(b>=I(a[c].options.index,a[c]._i)){a.splice(c+1,0,this);break}-1===c&&a.unshift(this);c+=1}else a.push(this);return I(c,
a.length-1)},bindAxes:function(){var b=this,c=b.options,d=b.chart,e;u(b.axisTypes||[],function(h){u(d[h],function(a){e=a.options;if(c[h]===e.index||void 0!==c[h]&&c[h]===e.id||void 0===c[h]&&0===e.index)b.insert(a.series),b[h]=a,a.isDirty=!0});b[h]||b.optionalAxis===h||a.error(18,!0)})},updateParallelArrays:function(a,b){var c=a.series,d=arguments,h=x(b)?function(h){var d="y"===h&&c.toYData?c.toYData(a):a[h];c[h+"Data"][b]=d}:function(a){Array.prototype[b].apply(c[a+"Data"],Array.prototype.slice.call(d,
2))};u(c.parallelArrays,h)},autoIncrement:function(){var a=this.options,b=this.xIncrement,c,d=a.pointIntervalUnit,b=I(b,a.pointStart,0);this.pointInterval=c=I(this.pointInterval,a.pointInterval,1);d&&(a=new g(b),"day"===d?a=+a[g.hcSetDate](a[g.hcGetDate]()+c):"month"===d?a=+a[g.hcSetMonth](a[g.hcGetMonth]()+c):"year"===d&&(a=+a[g.hcSetFullYear](a[g.hcGetFullYear]()+c)),c=a-b);this.xIncrement=b+c;return b},setOptions:function(a){var b=this.chart,d=b.options,e=d.plotOptions,h=(b.userOptions||{}).plotOptions||
{},f=e[this.type];this.userOptions=a;b=c(f,e.series,a);this.tooltipOptions=c(p.tooltip,p.plotOptions.series&&p.plotOptions.series.tooltip,p.plotOptions[this.type].tooltip,d.tooltip.userOptions,e.series&&e.series.tooltip,e[this.type].tooltip,a.tooltip);this.stickyTracking=I(a.stickyTracking,h[this.type]&&h[this.type].stickyTracking,h.series&&h.series.stickyTracking,this.tooltipOptions.shared&&!this.noSharedTooltip?!0:b.stickyTracking);null===f.marker&&delete b.marker;this.zoneAxis=b.zoneAxis;a=this.zones=
(b.zones||[]).slice();!b.negativeColor&&!b.negativeFillColor||b.zones||a.push({value:b[this.zoneAxis+"Threshold"]||b.threshold||0,className:"highcharts-negative",color:b.negativeColor,fillColor:b.negativeFillColor});a.length&&v(a[a.length-1].value)&&a.push({color:this.color,fillColor:this.fillColor});return b},getCyclic:function(a,b,c){var d,h=this.chart,n=this.userOptions,e=a+"Index",f=a+"Counter",m=c?c.length:I(h.options.chart[a+"Count"],h[a+"Count"]);b||(d=I(n[e],n["_"+e]),v(d)||(h.series.length||
(h[f]=0),n["_"+e]=d=h[f]%m,h[f]+=1),c&&(b=c[d]));void 0!==d&&(this[e]=d);this[a]=b},getColor:function(){this.options.colorByPoint?this.options.color=null:this.getCyclic("color",this.options.color||t[this.type].color,this.chart.options.colors)},getSymbol:function(){this.getCyclic("symbol",this.options.marker.symbol,this.chart.options.symbols)},drawLegendSymbol:a.LegendSymbolMixin.drawLineMarker,setData:function(b,c,n,e){var h=this,f=h.points,m=f&&f.length||0,k,y=h.options,l=h.chart,q=null,g=h.xAxis,
A=y.turboThreshold,H=this.xData,z=this.yData,p=(k=h.pointArrayMap)&&k.length;b=b||[];k=b.length;c=I(c,!0);if(!1!==e&&k&&m===k&&!h.cropped&&!h.hasGroupedData&&h.visible)u(b,function(a,b){f[b].update&&a!==y.data[b]&&f[b].update(a,!1,null,!1)});else{h.xIncrement=null;h.colorCounter=0;u(this.parallelArrays,function(a){h[a+"Data"].length=0});if(A&&k>A){for(n=0;null===q&&n<k;)q=b[n],n++;if(x(q))for(n=0;n<k;n++)H[n]=this.autoIncrement(),z[n]=b[n];else if(d(q))if(p)for(n=0;n<k;n++)q=b[n],H[n]=q[0],z[n]=q.slice(1,
p+1);else for(n=0;n<k;n++)q=b[n],H[n]=q[0],z[n]=q[1];else a.error(12)}else for(n=0;n<k;n++)void 0!==b[n]&&(q={series:h},h.pointClass.prototype.applyOptions.apply(q,[b[n]]),h.updateParallelArrays(q,n));C(z[0])&&a.error(14,!0);h.data=[];h.options.data=h.userOptions.data=b;for(n=m;n--;)f[n]&&f[n].destroy&&f[n].destroy();g&&(g.minRange=g.userMinRange);h.isDirty=l.isDirtyBox=!0;h.isDirtyData=!!f;n=!1}"point"===y.legendType&&(this.processData(),this.generatePoints());c&&l.redraw(n)},processData:function(b){var c=
this.xData,d=this.yData,e=c.length,h;h=0;var f,m,k=this.xAxis,y,l=this.options;y=l.cropThreshold;var q=this.getExtremesFromAll||l.getExtremesFromAll,g=this.isCartesian,l=k&&k.val2lin,z=k&&k.isLog,p,x;if(g&&!this.isDirty&&!k.isDirty&&!this.yAxis.isDirty&&!b)return!1;k&&(b=k.getExtremes(),p=b.min,x=b.max);if(g&&this.sorted&&!q&&(!y||e>y||this.forceCrop))if(c[e-1]<p||c[0]>x)c=[],d=[];else if(c[0]<p||c[e-1]>x)h=this.cropData(this.xData,this.yData,p,x),c=h.xData,d=h.yData,h=h.start,f=!0;for(y=c.length||
1;--y;)e=z?l(c[y])-l(c[y-1]):c[y]-c[y-1],0<e&&(void 0===m||e<m)?m=e:0>e&&this.requireSorting&&a.error(15);this.cropped=f;this.cropStart=h;this.processedXData=c;this.processedYData=d;this.closestPointRange=m},cropData:function(a,b,c,d){var h=a.length,n=0,e=h,f=I(this.cropShoulder,1),m;for(m=0;m<h;m++)if(a[m]>=c){n=Math.max(0,m-f);break}for(c=m;c<h;c++)if(a[c]>d){e=c+f;break}return{xData:a.slice(n,e),yData:b.slice(n,e),start:n,end:e}},generatePoints:function(){var a=this.options,b=a.data,c=this.data,
d,h=this.processedXData,e=this.processedYData,f=this.pointClass,m=h.length,k=this.cropStart||0,l,q=this.hasGroupedData,a=a.keys,g,z=[],p;c||q||(c=[],c.length=b.length,c=this.data=c);a&&q&&(this.options.keys=!1);for(p=0;p<m;p++)l=k+p,q?(g=(new f).init(this,[h[p]].concat(J(e[p]))),g.dataGroup=this.groupMap[p]):(g=c[l])||void 0===b[l]||(c[l]=g=(new f).init(this,b[l],h[p])),g&&(g.index=l,z[p]=g);this.options.keys=a;if(c&&(m!==(d=c.length)||q))for(p=0;p<d;p++)p!==k||q||(p+=m),c[p]&&(c[p].destroyElements(),
c[p].plotX=void 0);this.data=c;this.points=z},getExtremes:function(a){var b=this.yAxis,c=this.processedXData,e,h=[],f=0;e=this.xAxis.getExtremes();var m=e.min,k=e.max,y,l,q,g;a=a||this.stackedYData||this.processedYData||[];e=a.length;for(g=0;g<e;g++)if(l=c[g],q=a[g],y=(x(q,!0)||d(q))&&(!b.positiveValuesOnly||q.length||0<q),l=this.getExtremesFromAll||this.options.getExtremesFromAll||this.cropped||(c[g]||l)>=m&&(c[g]||l)<=k,y&&l)if(y=q.length)for(;y--;)null!==q[y]&&(h[f++]=q[y]);else h[f++]=q;this.dataMin=
E(h);this.dataMax=G(h)},translate:function(){this.processedXData||this.processData();this.generatePoints();var a=this.options,b=a.stacking,c=this.xAxis,d=c.categories,h=this.yAxis,e=this.points,f=e.length,m=!!this.modifyValue,k=a.pointPlacement,l="between"===k||x(k),q=a.threshold,g=a.startFromThreshold?q:0,z,p,C,t,K=Number.MAX_VALUE;"between"===k&&(k=.5);x(k)&&(k*=I(a.pointRange||c.pointRange));for(a=0;a<f;a++){var u=e[a],J=u.x,B=u.y;p=u.low;var D=b&&h.stacks[(this.negStacks&&B<(g?0:q)?"-":"")+this.stackKey],
E;h.positiveValuesOnly&&null!==B&&0>=B&&(u.isNull=!0);u.plotX=z=r(Math.min(Math.max(-1E5,c.translate(J,0,0,0,1,k,"flags"===this.type)),1E5));b&&this.visible&&!u.isNull&&D&&D[J]&&(t=this.getStackIndicator(t,J,this.index),E=D[J],B=E.points[t.key],p=B[0],B=B[1],p===g&&t.key===D[J].base&&(p=I(q,h.min)),h.positiveValuesOnly&&0>=p&&(p=null),u.total=u.stackTotal=E.total,u.percentage=E.total&&u.y/E.total*100,u.stackY=B,E.setOffset(this.pointXOffset||0,this.barW||0));u.yBottom=v(p)?h.translate(p,0,1,0,1):
null;m&&(B=this.modifyValue(B,u));u.plotY=p="number"===typeof B&&Infinity!==B?Math.min(Math.max(-1E5,h.translate(B,0,1,0,1)),1E5):void 0;u.isInside=void 0!==p&&0<=p&&p<=h.len&&0<=z&&z<=c.len;u.clientX=l?r(c.translate(J,0,0,0,1,k)):z;u.negative=u.y<(q||0);u.category=d&&void 0!==d[u.x]?d[u.x]:u.x;u.isNull||(void 0!==C&&(K=Math.min(K,Math.abs(z-C))),C=z);u.zone=this.zones.length&&u.getZone()}this.closestPointRangePx=K},getValidPoints:function(a,b){var c=this.chart;return f(a||this.points||[],function(a){return b&&
!c.isInsidePlot(a.plotX,a.plotY,c.inverted)?!1:!a.isNull})},setClip:function(a){var b=this.chart,c=this.options,d=b.renderer,h=b.inverted,e=this.clipBox,f=e||b.clipBox,m=this.sharedClipKey||["_sharedClip",a&&a.duration,a&&a.easing,f.height,c.xAxis,c.yAxis].join(),k=b[m],l=b[m+"m"];k||(a&&(f.width=0,b[m+"m"]=l=d.clipRect(-99,h?-b.plotLeft:-b.plotTop,99,h?b.chartWidth:b.chartHeight)),b[m]=k=d.clipRect(f),k.count={length:0});a&&!k.count[this.index]&&(k.count[this.index]=!0,k.count.length+=1);!1!==c.clip&&
(this.group.clip(a||e?k:b.clipRect),this.markerGroup.clip(l),this.sharedClipKey=m);a||(k.count[this.index]&&(delete k.count[this.index],--k.count.length),0===k.count.length&&m&&b[m]&&(e||(b[m]=b[m].destroy()),b[m+"m"]&&(b[m+"m"]=b[m+"m"].destroy())))},animate:function(a){var b=this.chart,c=B(this.options.animation),d;a?this.setClip(c):(d=this.sharedClipKey,(a=b[d])&&a.animate({width:b.plotSizeX},c),b[d+"m"]&&b[d+"m"].animate({width:b.plotSizeX+99},c),this.animate=null)},afterAnimate:function(){this.setClip();
k(this,"afterAnimate");this.finishedAnimating=!0},drawPoints:function(){var a=this.points,b=this.chart,c,d,h,e,f=this.options.marker,m,k,l,q,g=this[this.specialGroup]||this.markerGroup,z=I(f.enabled,this.xAxis.isRadial?!0:null,this.closestPointRangePx>=2*f.radius);if(!1!==f.enabled||this._hasPointMarkers)for(d=0;d<a.length;d++)h=a[d],c=h.plotY,e=h.graphic,m=h.marker||{},k=!!h.marker,l=z&&void 0===m.enabled||m.enabled,q=h.isInside,l&&x(c)&&null!==h.y?(c=I(m.symbol,this.symbol),h.hasImage=0===c.indexOf("url"),
l=this.markerAttribs(h,h.selected&&"select"),e?e[q?"show":"hide"](!0).animate(l):q&&(0<l.width||h.hasImage)&&(h.graphic=e=b.renderer.symbol(c,l.x,l.y,l.width,l.height,k?m:f).add(g)),e&&e.attr(this.pointAttribs(h,h.selected&&"select")),e&&e.addClass(h.getClassName(),!0)):e&&(h.graphic=e.destroy())},markerAttribs:function(a,b){var c=this.options.marker,d=a.marker||{},h=I(d.radius,c.radius);b&&(c=c.states[b],b=d.states&&d.states[b],h=I(b&&b.radius,c&&c.radius,h+(c&&c.radiusPlus||0)));a.hasImage&&(h=
0);a={x:Math.floor(a.plotX)-h,y:a.plotY-h};h&&(a.width=a.height=2*h);return a},pointAttribs:function(a,b){var c=this.options.marker,d=a&&a.options,h=d&&d.marker||{},e=this.color,f=d&&d.color,m=a&&a.color,d=I(h.lineWidth,c.lineWidth);a=a&&a.zone&&a.zone.color;e=f||a||m||e;a=h.fillColor||c.fillColor||e;e=h.lineColor||c.lineColor||e;b&&(c=c.states[b],b=h.states&&h.states[b]||{},d=I(b.lineWidth,c.lineWidth,d+I(b.lineWidthPlus,c.lineWidthPlus,0)),a=b.fillColor||c.fillColor||a,e=b.lineColor||c.lineColor||
e);return{stroke:e,"stroke-width":d,fill:a}},destroy:function(){var a=this,c=a.chart,d=/AppleWebKit\/533/.test(K.navigator.userAgent),e,h,f=a.data||[],g,z;k(a,"destroy");m(a);u(a.axisTypes||[],function(b){(z=a[b])&&z.series&&(l(z.series,a),z.isDirty=z.forceRedraw=!0)});a.legendItem&&a.chart.legend.destroyItem(a);for(h=f.length;h--;)(g=f[h])&&g.destroy&&g.destroy();a.points=null;clearTimeout(a.animationTimeout);q(a,function(a,c){a instanceof b&&!a.survive&&(e=d&&"group"===c?"hide":"destroy",a[e]())});
c.hoverSeries===a&&(c.hoverSeries=null);l(c.series,a);c.orderSeries();q(a,function(b,c){delete a[c]})},getGraphPath:function(a,b,c){var d=this,h=d.options,n=h.step,e,f=[],m=[],k;a=a||d.points;(e=a.reversed)&&a.reverse();(n={right:1,center:2}[n]||n&&3)&&e&&(n=4-n);!h.connectNulls||b||c||(a=this.getValidPoints(a));u(a,function(e,l){var q=e.plotX,g=e.plotY,y=a[l-1];(e.leftCliff||y&&y.rightCliff)&&!c&&(k=!0);e.isNull&&!v(b)&&0<l?k=!h.connectNulls:e.isNull&&!b?k=!0:(0===l||k?l=["M",e.plotX,e.plotY]:d.getPointSpline?
l=d.getPointSpline(a,e,l):n?(l=1===n?["L",y.plotX,g]:2===n?["L",(y.plotX+q)/2,y.plotY,"L",(y.plotX+q)/2,g]:["L",q,y.plotY],l.push("L",q,g)):l=["L",q,g],m.push(e.x),n&&m.push(e.x),f.push.apply(f,l),k=!1)});f.xMap=m;return d.graphPath=f},drawGraph:function(){var a=this,b=this.options,c=(this.gappedPath||this.getGraphPath).call(this),d=[["graph","highcharts-graph",b.lineColor||this.color,b.dashStyle]];u(this.zones,function(c,e){d.push(["zone-graph-"+e,"highcharts-graph highcharts-zone-graph-"+e+" "+
(c.className||""),c.color||a.color,c.dashStyle||b.dashStyle])});u(d,function(d,e){var h=d[0],n=a[h];n?(n.endX=c.xMap,n.animate({d:c})):c.length&&(a[h]=a.chart.renderer.path(c).addClass(d[1]).attr({zIndex:1}).add(a.group),n={stroke:d[2],"stroke-width":b.lineWidth,fill:a.fillGraph&&a.color||"none"},d[3]?n.dashstyle=d[3]:"square"!==b.linecap&&(n["stroke-linecap"]=n["stroke-linejoin"]="round"),n=a[h].attr(n).shadow(2>e&&b.shadow));n&&(n.startX=c.xMap,n.isArea=c.isArea)})},applyZones:function(){var a=
this,b=this.chart,c=b.renderer,d=this.zones,h,e,f=this.clips||[],m,k=this.graph,l=this.area,q=Math.max(b.chartWidth,b.chartHeight),g=this[(this.zoneAxis||"y")+"Axis"],z,p,x=b.inverted,C,t,r,K,v=!1;d.length&&(k||l)&&g&&void 0!==g.min&&(p=g.reversed,C=g.horiz,k&&k.hide(),l&&l.hide(),z=g.getExtremes(),u(d,function(d,n){h=p?C?b.plotWidth:0:C?0:g.toPixels(z.min);h=Math.min(Math.max(I(e,h),0),q);e=Math.min(Math.max(Math.round(g.toPixels(I(d.value,z.max),!0)),0),q);v&&(h=e=g.toPixels(z.max));t=Math.abs(h-
e);r=Math.min(h,e);K=Math.max(h,e);g.isXAxis?(m={x:x?K:r,y:0,width:t,height:q},C||(m.x=b.plotHeight-m.x)):(m={x:0,y:x?K:r,width:q,height:t},C&&(m.y=b.plotWidth-m.y));x&&c.isVML&&(m=g.isXAxis?{x:0,y:p?r:K,height:m.width,width:b.chartWidth}:{x:m.y-b.plotLeft-b.spacingBox.x,y:0,width:m.height,height:b.chartHeight});f[n]?f[n].animate(m):(f[n]=c.clipRect(m),k&&a["zone-graph-"+n].clip(f[n]),l&&a["zone-area-"+n].clip(f[n]));v=d.value>z.max}),this.clips=f)},invertGroups:function(a){function b(){u(["group",
"markerGroup"],function(b){c[b]&&(d.renderer.isVML&&c[b].attr({width:c.yAxis.len,height:c.xAxis.len}),c[b].width=c.yAxis.len,c[b].height=c.xAxis.len,c[b].invert(a))})}var c=this,d=c.chart,h;c.xAxis&&(h=D(d,"resize",b),D(c,"destroy",h),b(a),c.invertGroups=b)},plotGroup:function(a,b,c,d,h){var e=this[a],n=!e;n&&(this[a]=e=this.chart.renderer.g().attr({zIndex:d||.1}).add(h));e.addClass("highcharts-"+b+" highcharts-series-"+this.index+" highcharts-"+this.type+"-series highcharts-color-"+this.colorIndex+
" "+(this.options.className||""),!0);e.attr({visibility:c})[n?"attr":"animate"](this.getPlotBox());return e},getPlotBox:function(){var a=this.chart,b=this.xAxis,c=this.yAxis;a.inverted&&(b=c,c=this.xAxis);return{translateX:b?b.left:a.plotLeft,translateY:c?c.top:a.plotTop,scaleX:1,scaleY:1}},render:function(){var a=this,b=a.chart,c,d=a.options,h=!!a.animate&&b.renderer.isSVG&&B(d.animation).duration,e=a.visible?"inherit":"hidden",f=d.zIndex,m=a.hasRendered,k=b.seriesGroup,l=b.inverted;c=a.plotGroup("group",
"series",e,f,k);a.markerGroup=a.plotGroup("markerGroup","markers",e,f,k);h&&a.animate(!0);c.inverted=a.isCartesian?l:!1;a.drawGraph&&(a.drawGraph(),a.applyZones());a.drawDataLabels&&a.drawDataLabels();a.visible&&a.drawPoints();a.drawTracker&&!1!==a.options.enableMouseTracking&&a.drawTracker();a.invertGroups(l);!1===d.clip||a.sharedClipKey||m||c.clip(b.clipRect);h&&a.animate();m||(a.animationTimeout=z(function(){a.afterAnimate()},h));a.isDirty=!1;a.hasRendered=!0},redraw:function(){var a=this.chart,
b=this.isDirty||this.isDirtyData,c=this.group,d=this.xAxis,h=this.yAxis;c&&(a.inverted&&c.attr({width:a.plotWidth,height:a.plotHeight}),c.animate({translateX:I(d&&d.left,a.plotLeft),translateY:I(h&&h.top,a.plotTop)}));this.translate();this.render();b&&delete this.kdTree},kdAxisArray:["clientX","plotY"],searchPoint:function(a,b){var c=this.xAxis,d=this.yAxis,h=this.chart.inverted;return this.searchKDTree({clientX:h?c.len-a.chartY+c.pos:a.chartX-c.pos,plotY:h?d.len-a.chartX+d.pos:a.chartY-d.pos},b)},
buildKDTree:function(){function a(c,d,e){var h,n;if(n=c&&c.length)return h=b.kdAxisArray[d%e],c.sort(function(a,b){return a[h]-b[h]}),n=Math.floor(n/2),{point:c[n],left:a(c.slice(0,n),d+1,e),right:a(c.slice(n+1),d+1,e)}}this.buildingKdTree=!0;var b=this,c=-1<b.options.findNearestPointBy.indexOf("y")?2:1;delete b.kdTree;z(function(){b.kdTree=a(b.getValidPoints(null,!b.directTouch),c,c);b.buildingKdTree=!1},b.options.kdNow?0:1)},searchKDTree:function(a,b){function c(a,b,n,m){var k=b.point,l=d.kdAxisArray[n%
m],q,g,z=k;g=v(a[h])&&v(k[h])?Math.pow(a[h]-k[h],2):null;q=v(a[e])&&v(k[e])?Math.pow(a[e]-k[e],2):null;q=(g||0)+(q||0);k.dist=v(q)?Math.sqrt(q):Number.MAX_VALUE;k.distX=v(g)?Math.sqrt(g):Number.MAX_VALUE;l=a[l]-k[l];q=0>l?"left":"right";g=0>l?"right":"left";b[q]&&(q=c(a,b[q],n+1,m),z=q[f]<z[f]?q:k);b[g]&&Math.sqrt(l*l)<z[f]&&(a=c(a,b[g],n+1,m),z=a[f]<z[f]?a:z);return z}var d=this,h=this.kdAxisArray[0],e=this.kdAxisArray[1],f=b?"distX":"dist";b=-1<d.options.findNearestPointBy.indexOf("y")?2:1;this.kdTree||
this.buildingKdTree||this.buildKDTree();if(this.kdTree)return c(a,this.kdTree,b,b)}})})(M);(function(a){var D=a.Axis,B=a.Chart,G=a.correctFloat,E=a.defined,r=a.destroyObjectProperties,g=a.each,p=a.format,t=a.objectEach,v=a.pick,u=a.Series;a.StackItem=function(a,e,k,f,d){var l=a.chart.inverted;this.axis=a;this.isNegative=k;this.options=e;this.x=f;this.total=null;this.points={};this.stack=d;this.rightCliff=this.leftCliff=0;this.alignOptions={align:e.align||(l?k?"left":"right":"center"),verticalAlign:e.verticalAlign||
(l?"middle":k?"bottom":"top"),y:v(e.y,l?4:k?14:-6),x:v(e.x,l?k?-6:6:0)};this.textAlign=e.textAlign||(l?k?"right":"left":"center")};a.StackItem.prototype={destroy:function(){r(this,this.axis)},render:function(a){var e=this.options,k=e.format,k=k?p(k,this):e.formatter.call(this);this.label?this.label.attr({text:k,visibility:"hidden"}):this.label=this.axis.chart.renderer.text(k,null,null,e.useHTML).css(e.style).attr({align:this.textAlign,rotation:e.rotation,visibility:"hidden"}).add(a)},setOffset:function(a,
e){var k=this.axis,f=k.chart,d=k.translate(k.usePercentage?100:this.total,0,0,0,1),k=k.translate(0),k=Math.abs(d-k);a=f.xAxis[0].translate(this.x)+a;d=this.getStackBox(f,this,a,d,e,k);if(e=this.label)e.align(this.alignOptions,null,d),d=e.alignAttr,e[!1===this.options.crop||f.isInsidePlot(d.x,d.y)?"show":"hide"](!0)},getStackBox:function(a,e,k,f,d,g){var l=e.axis.reversed,c=a.inverted;a=a.plotHeight;e=e.isNegative&&!l||!e.isNegative&&l;return{x:c?e?f:f-g:k,y:c?a-k-d:e?a-f-g:a-f,width:c?g:d,height:c?
d:g}}};B.prototype.getStacks=function(){var a=this;g(a.yAxis,function(a){a.stacks&&a.hasVisibleSeries&&(a.oldStacks=a.stacks)});g(a.series,function(e){!e.options.stacking||!0!==e.visible&&!1!==a.options.chart.ignoreHiddenSeries||(e.stackKey=e.type+v(e.options.stack,""))})};D.prototype.buildStacks=function(){var a=this.series,e=v(this.options.reversedStacks,!0),k=a.length,f;if(!this.isXAxis){this.usePercentage=!1;for(f=k;f--;)a[e?f:k-f-1].setStackedPoints();if(this.usePercentage)for(f=0;f<k;f++)a[f].setPercentStacks()}};
D.prototype.renderStackTotals=function(){var a=this.chart,e=a.renderer,k=this.stacks,f=this.stackTotalGroup;f||(this.stackTotalGroup=f=e.g("stack-labels").attr({visibility:"visible",zIndex:6}).add());f.translate(a.plotLeft,a.plotTop);t(k,function(a){t(a,function(a){a.render(f)})})};D.prototype.resetStacks=function(){var a=this,e=a.stacks;a.isXAxis||t(e,function(e){t(e,function(f,d){f.touched<a.stacksTouched?(f.destroy(),delete e[d]):(f.total=null,f.cum=null)})})};D.prototype.cleanStacks=function(){var a;
this.isXAxis||(this.oldStacks&&(a=this.stacks=this.oldStacks),t(a,function(a){t(a,function(a){a.cum=a.total})}))};u.prototype.setStackedPoints=function(){if(this.options.stacking&&(!0===this.visible||!1===this.chart.options.chart.ignoreHiddenSeries)){var l=this.processedXData,e=this.processedYData,k=[],f=e.length,d=this.options,g=d.threshold,p=d.startFromThreshold?g:0,c=d.stack,d=d.stacking,q=this.stackKey,r="-"+q,m=this.negStacks,t=this.yAxis,b=t.stacks,z=t.oldStacks,K,y,A,n,H,h,w;t.stacksTouched+=
1;for(H=0;H<f;H++)h=l[H],w=e[H],K=this.getStackIndicator(K,h,this.index),n=K.key,A=(y=m&&w<(p?0:g))?r:q,b[A]||(b[A]={}),b[A][h]||(z[A]&&z[A][h]?(b[A][h]=z[A][h],b[A][h].total=null):b[A][h]=new a.StackItem(t,t.options.stackLabels,y,h,c)),A=b[A][h],null!==w&&(A.points[n]=A.points[this.index]=[v(A.cum,p)],E(A.cum)||(A.base=n),A.touched=t.stacksTouched,0<K.index&&!1===this.singleStacks&&(A.points[n][0]=A.points[this.index+","+h+",0"][0])),"percent"===d?(y=y?q:r,m&&b[y]&&b[y][h]?(y=b[y][h],A.total=y.total=
Math.max(y.total,A.total)+Math.abs(w)||0):A.total=G(A.total+(Math.abs(w)||0))):A.total=G(A.total+(w||0)),A.cum=v(A.cum,p)+(w||0),null!==w&&(A.points[n].push(A.cum),k[H]=A.cum);"percent"===d&&(t.usePercentage=!0);this.stackedYData=k;t.oldStacks={}}};u.prototype.setPercentStacks=function(){var a=this,e=a.stackKey,k=a.yAxis.stacks,f=a.processedXData,d;g([e,"-"+e],function(e){for(var l=f.length,c,q;l--;)if(c=f[l],d=a.getStackIndicator(d,c,a.index,e),c=(q=k[e]&&k[e][c])&&q.points[d.key])q=q.total?100/
q.total:0,c[0]=G(c[0]*q),c[1]=G(c[1]*q),a.stackedYData[l]=c[1]})};u.prototype.getStackIndicator=function(a,e,k,f){!E(a)||a.x!==e||f&&a.key!==f?a={x:e,index:0,key:f}:a.index++;a.key=[k,e,a.index].join();return a}})(M);(function(a){var D=a.addEvent,B=a.animate,G=a.Axis,E=a.createElement,r=a.css,g=a.defined,p=a.each,t=a.erase,v=a.extend,u=a.fireEvent,l=a.inArray,e=a.isNumber,k=a.isObject,f=a.isArray,d=a.merge,x=a.objectEach,C=a.pick,c=a.Point,q=a.Series,I=a.seriesTypes,m=a.setAnimation,J=a.splat;v(a.Chart.prototype,
{addSeries:function(a,c,d){var b,e=this;a&&(c=C(c,!0),u(e,"addSeries",{options:a},function(){b=e.initSeries(a);e.isDirtyLegend=!0;e.linkSeries();c&&e.redraw(d)}));return b},addAxis:function(a,c,e,f){var b=c?"xAxis":"yAxis",n=this.options;a=d(a,{index:this[b].length,isX:c});c=new G(this,a);n[b]=J(n[b]||{});n[b].push(a);C(e,!0)&&this.redraw(f);return c},showLoading:function(a){var b=this,c=b.options,d=b.loadingDiv,e=c.loading,n=function(){d&&r(d,{left:b.plotLeft+"px",top:b.plotTop+"px",width:b.plotWidth+
"px",height:b.plotHeight+"px"})};d||(b.loadingDiv=d=E("div",{className:"highcharts-loading highcharts-loading-hidden"},null,b.container),b.loadingSpan=E("span",{className:"highcharts-loading-inner"},null,d),D(b,"redraw",n));d.className="highcharts-loading";b.loadingSpan.innerHTML=a||c.lang.loading;r(d,v(e.style,{zIndex:10}));r(b.loadingSpan,e.labelStyle);b.loadingShown||(r(d,{opacity:0,display:""}),B(d,{opacity:e.style.opacity||.5},{duration:e.showDuration||0}));b.loadingShown=!0;n()},hideLoading:function(){var a=
this.options,c=this.loadingDiv;c&&(c.className="highcharts-loading highcharts-loading-hidden",B(c,{opacity:0},{duration:a.loading.hideDuration||100,complete:function(){r(c,{display:"none"})}}));this.loadingShown=!1},propsRequireDirtyBox:"backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
propsRequireUpdateSeries:"chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions tooltip".split(" "),update:function(a,c,f){var b=this,m={credits:"addCredits",title:"setTitle",subtitle:"setSubtitle"},n=a.chart,k,h,q=[];if(n){d(!0,b.options.chart,n);"className"in n&&b.setClassName(n.className);if("inverted"in n||"polar"in n)b.propFromSeries(),k=!0;"alignTicks"in n&&(k=!0);x(n,function(a,c){-1!==l("chart."+c,b.propsRequireUpdateSeries)&&(h=!0);-1!==l(c,b.propsRequireDirtyBox)&&
(b.isDirtyBox=!0)});"style"in n&&b.renderer.setStyle(n.style)}a.colors&&(this.options.colors=a.colors);a.plotOptions&&d(!0,this.options.plotOptions,a.plotOptions);x(a,function(a,c){if(b[c]&&"function"===typeof b[c].update)b[c].update(a,!1);else if("function"===typeof b[m[c]])b[m[c]](a);"chart"!==c&&-1!==l(c,b.propsRequireUpdateSeries)&&(h=!0)});p("xAxis yAxis zAxis series colorAxis pane".split(" "),function(c){a[c]&&(p(J(a[c]),function(a,d){(d=g(a.id)&&b.get(a.id)||b[c][d])&&d.coll===c&&(d.update(a,
!1),f&&(d.touched=!0));if(!d&&f)if("series"===c)b.addSeries(a,!1).touched=!0;else if("xAxis"===c||"yAxis"===c)b.addAxis(a,"xAxis"===c,!1).touched=!0}),f&&p(b[c],function(a){a.touched?delete a.touched:q.push(a)}))});p(q,function(a){a.remove(!1)});k&&p(b.axes,function(a){a.update({},!1)});h&&p(b.series,function(a){a.update({},!1)});a.loading&&d(!0,b.options.loading,a.loading);k=n&&n.width;n=n&&n.height;e(k)&&k!==b.chartWidth||e(n)&&n!==b.chartHeight?b.setSize(k,n):C(c,!0)&&b.redraw()},setSubtitle:function(a){this.setTitle(void 0,
a)}});v(c.prototype,{update:function(a,c,d,e){function b(){n.applyOptions(a);null===n.y&&h&&(n.graphic=h.destroy());k(a,!0)&&(h&&h.element&&a&&a.marker&&void 0!==a.marker.symbol&&(n.graphic=h.destroy()),a&&a.dataLabels&&n.dataLabel&&(n.dataLabel=n.dataLabel.destroy()));m=n.index;f.updateParallelArrays(n,m);q.data[m]=k(q.data[m],!0)||k(a,!0)?n.options:a;f.isDirty=f.isDirtyData=!0;!f.fixedBox&&f.hasCartesianSeries&&(l.isDirtyBox=!0);"point"===q.legendType&&(l.isDirtyLegend=!0);c&&l.redraw(d)}var n=
this,f=n.series,h=n.graphic,m,l=f.chart,q=f.options;c=C(c,!0);!1===e?b():n.firePointEvent("update",{options:a},b)},remove:function(a,c){this.series.removePoint(l(this,this.series.data),a,c)}});v(q.prototype,{addPoint:function(a,c,d,e){var b=this.options,n=this.data,f=this.chart,h=this.xAxis,h=h&&h.hasNames&&h.names,m=b.data,k,l,q=this.xData,g,p;c=C(c,!0);k={series:this};this.pointClass.prototype.applyOptions.apply(k,[a]);p=k.x;g=q.length;if(this.requireSorting&&p<q[g-1])for(l=!0;g&&q[g-1]>p;)g--;
this.updateParallelArrays(k,"splice",g,0,0);this.updateParallelArrays(k,g);h&&k.name&&(h[p]=k.name);m.splice(g,0,a);l&&(this.data.splice(g,0,null),this.processData());"point"===b.legendType&&this.generatePoints();d&&(n[0]&&n[0].remove?n[0].remove(!1):(n.shift(),this.updateParallelArrays(k,"shift"),m.shift()));this.isDirtyData=this.isDirty=!0;c&&f.redraw(e)},removePoint:function(a,c,d){var b=this,e=b.data,n=e[a],f=b.points,h=b.chart,k=function(){f&&f.length===e.length&&f.splice(a,1);e.splice(a,1);
b.options.data.splice(a,1);b.updateParallelArrays(n||{series:b},"splice",a,1);n&&n.destroy();b.isDirty=!0;b.isDirtyData=!0;c&&h.redraw()};m(d,h);c=C(c,!0);n?n.firePointEvent("remove",null,k):k()},remove:function(a,c,d){function b(){e.destroy();f.isDirtyLegend=f.isDirtyBox=!0;f.linkSeries();C(a,!0)&&f.redraw(c)}var e=this,f=e.chart;!1!==d?u(e,"remove",null,b):b()},update:function(a,c){var b=this,e=b.chart,f=b.userOptions,n=b.oldType||b.type,m=a.type||f.type||e.options.chart.type,h=I[n].prototype,k,
l=["group","markerGroup","dataLabelsGroup","navigatorSeries","baseSeries"],q=b.finishedAnimating&&{animation:!1};if(Object.keys&&"data"===Object.keys(a).toString())return this.setData(a.data,c);if(m&&m!==n||void 0!==a.zIndex)l.length=0;p(l,function(a){l[a]=b[a];delete b[a]});a=d(f,q,{index:b.index,pointStart:b.xData[0]},{data:b.options.data},a);b.remove(!1,null,!1);for(k in h)b[k]=void 0;v(b,I[m||n].prototype);p(l,function(a){b[a]=l[a]});b.init(e,a);b.oldType=n;e.linkSeries();C(c,!0)&&e.redraw(!1)}});
v(G.prototype,{update:function(a,c){var b=this.chart;a=b.options[this.coll][this.options.index]=d(this.userOptions,a);this.destroy(!0);this.init(b,v(a,{events:void 0}));b.isDirtyBox=!0;C(c,!0)&&b.redraw()},remove:function(a){for(var b=this.chart,c=this.coll,d=this.series,e=d.length;e--;)d[e]&&d[e].remove(!1);t(b.axes,this);t(b[c],this);f(b.options[c])?b.options[c].splice(this.options.index,1):delete b.options[c];p(b[c],function(a,b){a.options.index=b});this.destroy();b.isDirtyBox=!0;C(a,!0)&&b.redraw()},
setTitle:function(a,c){this.update({title:a},c)},setCategories:function(a,c){this.update({categories:a},c)}})})(M);(function(a){var D=a.color,B=a.each,G=a.map,E=a.pick,r=a.Series,g=a.seriesType;g("area","line",{softThreshold:!1,threshold:0},{singleStacks:!1,getStackPoints:function(g){var p=[],r=[],u=this.xAxis,l=this.yAxis,e=l.stacks[this.stackKey],k={},f=this.index,d=l.series,x=d.length,C,c=E(l.options.reversedStacks,!0)?1:-1,q;g=g||this.points;if(this.options.stacking){for(q=0;q<g.length;q++)k[g[q].x]=
g[q];a.objectEach(e,function(a,c){null!==a.total&&r.push(c)});r.sort(function(a,c){return a-c});C=G(d,function(){return this.visible});B(r,function(a,d){var m=0,b,g;if(k[a]&&!k[a].isNull)p.push(k[a]),B([-1,1],function(m){var l=1===m?"rightNull":"leftNull",p=0,n=e[r[d+m]];if(n)for(q=f;0<=q&&q<x;)b=n.points[q],b||(q===f?k[a][l]=!0:C[q]&&(g=e[a].points[q])&&(p-=g[1]-g[0])),q+=c;k[a][1===m?"rightCliff":"leftCliff"]=p});else{for(q=f;0<=q&&q<x;){if(b=e[a].points[q]){m=b[1];break}q+=c}m=l.translate(m,0,
1,0,1);p.push({isNull:!0,plotX:u.translate(a,0,0,0,1),x:a,plotY:m,yBottom:m})}})}return p},getGraphPath:function(a){var g=r.prototype.getGraphPath,p=this.options,u=p.stacking,l=this.yAxis,e,k,f=[],d=[],x=this.index,C,c=l.stacks[this.stackKey],q=p.threshold,I=l.getThreshold(p.threshold),m,p=p.connectNulls||"percent"===u,J=function(b,e,m){var k=a[b];b=u&&c[k.x].points[x];var g=k[m+"Null"]||0;m=k[m+"Cliff"]||0;var n,p,k=!0;m||g?(n=(g?b[0]:b[1])+m,p=b[0]+m,k=!!g):!u&&a[e]&&a[e].isNull&&(n=p=q);void 0!==
n&&(d.push({plotX:C,plotY:null===n?I:l.getThreshold(n),isNull:k,isCliff:!0}),f.push({plotX:C,plotY:null===p?I:l.getThreshold(p),doCurve:!1}))};a=a||this.points;u&&(a=this.getStackPoints(a));for(e=0;e<a.length;e++)if(k=a[e].isNull,C=E(a[e].rectPlotX,a[e].plotX),m=E(a[e].yBottom,I),!k||p)p||J(e,e-1,"left"),k&&!u&&p||(d.push(a[e]),f.push({x:e,plotX:C,plotY:m})),p||J(e,e+1,"right");e=g.call(this,d,!0,!0);f.reversed=!0;k=g.call(this,f,!0,!0);k.length&&(k[0]="L");k=e.concat(k);g=g.call(this,d,!1,p);k.xMap=
e.xMap;this.areaPath=k;return g},drawGraph:function(){this.areaPath=[];r.prototype.drawGraph.apply(this);var a=this,g=this.areaPath,v=this.options,u=[["area","highcharts-area",this.color,v.fillColor]];B(this.zones,function(l,e){u.push(["zone-area-"+e,"highcharts-area highcharts-zone-area-"+e+" "+l.className,l.color||a.color,l.fillColor||v.fillColor])});B(u,function(l){var e=l[0],k=a[e];k?(k.endX=g.xMap,k.animate({d:g})):(k=a[e]=a.chart.renderer.path(g).addClass(l[1]).attr({fill:E(l[3],D(l[2]).setOpacity(E(v.fillOpacity,
.75)).get()),zIndex:0}).add(a.group),k.isArea=!0);k.startX=g.xMap;k.shiftUnit=v.step?2:1})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(M);(function(a){var D=a.pick;a=a.seriesType;a("spline","line",{},{getPointSpline:function(a,G,E){var r=G.plotX,g=G.plotY,p=a[E-1];E=a[E+1];var t,v,u,l;if(p&&!p.isNull&&!1!==p.doCurve&&!G.isCliff&&E&&!E.isNull&&!1!==E.doCurve&&!G.isCliff){a=p.plotY;u=E.plotX;E=E.plotY;var e=0;t=(1.5*r+p.plotX)/2.5;v=(1.5*g+a)/2.5;u=(1.5*r+u)/2.5;l=(1.5*g+E)/2.5;u!==t&&(e=
(l-v)*(u-r)/(u-t)+g-l);v+=e;l+=e;v>a&&v>g?(v=Math.max(a,g),l=2*g-v):v<a&&v<g&&(v=Math.min(a,g),l=2*g-v);l>E&&l>g?(l=Math.max(E,g),v=2*g-l):l<E&&l<g&&(l=Math.min(E,g),v=2*g-l);G.rightContX=u;G.rightContY=l}G=["C",D(p.rightContX,p.plotX),D(p.rightContY,p.plotY),D(t,r),D(v,g),r,g];p.rightContX=p.rightContY=null;return G}})})(M);(function(a){var D=a.seriesTypes.area.prototype,B=a.seriesType;B("areaspline","spline",a.defaultPlotOptions.area,{getStackPoints:D.getStackPoints,getGraphPath:D.getGraphPath,
drawGraph:D.drawGraph,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(M);(function(a){var D=a.animObject,B=a.color,G=a.each,E=a.extend,r=a.isNumber,g=a.merge,p=a.pick,t=a.Series,v=a.seriesType,u=a.svg;v("column","line",{borderRadius:0,crisp:!0,groupPadding:.2,marker:null,pointPadding:.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{halo:!1,brightness:.1,shadow:!1},select:{color:"#cccccc",borderColor:"#000000",shadow:!1}},dataLabels:{align:null,verticalAlign:null,y:null},
softThreshold:!1,startFromThreshold:!0,stickyTracking:!1,tooltip:{distance:6},threshold:0,borderColor:"#ffffff"},{cropShoulder:0,directTouch:!0,trackerGroups:["group","dataLabelsGroup"],negStacks:!0,init:function(){t.prototype.init.apply(this,arguments);var a=this,e=a.chart;e.hasRendered&&G(e.series,function(e){e.type===a.type&&(e.isDirty=!0)})},getColumnMetrics:function(){var a=this,e=a.options,k=a.xAxis,f=a.yAxis,d=k.reversed,g,C={},c=0;!1===e.grouping?c=1:G(a.chart.series,function(d){var b=d.options,
e=d.yAxis,m;d.type!==a.type||!d.visible&&a.chart.options.chart.ignoreHiddenSeries||f.len!==e.len||f.pos!==e.pos||(b.stacking?(g=d.stackKey,void 0===C[g]&&(C[g]=c++),m=C[g]):!1!==b.grouping&&(m=c++),d.columnIndex=m)});var q=Math.min(Math.abs(k.transA)*(k.ordinalSlope||e.pointRange||k.closestPointRange||k.tickInterval||1),k.len),r=q*e.groupPadding,m=(q-2*r)/(c||1),e=Math.min(e.maxPointWidth||k.len,p(e.pointWidth,m*(1-2*e.pointPadding)));a.columnMetrics={width:e,offset:(m-e)/2+(r+((a.columnIndex||0)+
(d?1:0))*m-q/2)*(d?-1:1)};return a.columnMetrics},crispCol:function(a,e,k,f){var d=this.chart,g=this.borderWidth,l=-(g%2?.5:0),g=g%2?.5:1;d.inverted&&d.renderer.isVML&&(g+=1);this.options.crisp&&(k=Math.round(a+k)+l,a=Math.round(a)+l,k-=a);f=Math.round(e+f)+g;l=.5>=Math.abs(e)&&.5<f;e=Math.round(e)+g;f-=e;l&&f&&(--e,f+=1);return{x:a,y:e,width:k,height:f}},translate:function(){var a=this,e=a.chart,k=a.options,f=a.dense=2>a.closestPointRange*a.xAxis.transA,f=a.borderWidth=p(k.borderWidth,f?0:1),d=a.yAxis,
g=a.translatedThreshold=d.getThreshold(k.threshold),C=p(k.minPointLength,5),c=a.getColumnMetrics(),q=c.width,r=a.barW=Math.max(q,1+2*f),m=a.pointXOffset=c.offset;e.inverted&&(g-=.5);k.pointPadding&&(r=Math.ceil(r));t.prototype.translate.apply(a);G(a.points,function(c){var b=p(c.yBottom,g),f=999+Math.abs(b),f=Math.min(Math.max(-f,c.plotY),d.len+f),k=c.plotX+m,l=r,x=Math.min(f,b),n,H=Math.max(f,b)-x;Math.abs(H)<C&&C&&(H=C,n=!d.reversed&&!c.negative||d.reversed&&c.negative,x=Math.abs(x-g)>C?b-C:g-(n?
C:0));c.barX=k;c.pointWidth=q;c.tooltipPos=e.inverted?[d.len+d.pos-e.plotLeft-f,a.xAxis.len-k-l/2,H]:[k+l/2,f+d.pos-e.plotTop,H];c.shapeType="rect";c.shapeArgs=a.crispCol.apply(a,c.isNull?[k,g,l,0]:[k,x,l,H])})},getSymbol:a.noop,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,drawGraph:function(){this.group[this.dense?"addClass":"removeClass"]("highcharts-dense-data")},pointAttribs:function(a,e){var k=this.options,f,d=this.pointAttrToOptions||{};f=d.stroke||"borderColor";var l=d["stroke-width"]||
"borderWidth",p=a&&a.color||this.color,c=a[f]||k[f]||this.color||p,q=a[l]||k[l]||this[l]||0,d=k.dashStyle;a&&this.zones.length&&(p=a.getZone(),p=a.options.color||p&&p.color||this.color);e&&(a=g(k.states[e],a.options.states&&a.options.states[e]||{}),e=a.brightness,p=a.color||void 0!==e&&B(p).brighten(a.brightness).get()||p,c=a[f]||c,q=a[l]||q,d=a.dashStyle||d);f={fill:p,stroke:c,"stroke-width":q};d&&(f.dashstyle=d);return f},drawPoints:function(){var a=this,e=this.chart,k=a.options,f=e.renderer,d=
k.animationLimit||250,p;G(a.points,function(l){var c=l.graphic;if(r(l.plotY)&&null!==l.y){p=l.shapeArgs;if(c)c[e.pointCount<d?"animate":"attr"](g(p));else l.graphic=c=f[l.shapeType](p).add(l.group||a.group);k.borderRadius&&c.attr({r:k.borderRadius});c.attr(a.pointAttribs(l,l.selected&&"select")).shadow(k.shadow,null,k.stacking&&!k.borderRadius);c.addClass(l.getClassName(),!0)}else c&&(l.graphic=c.destroy())})},animate:function(a){var e=this,k=this.yAxis,f=e.options,d=this.chart.inverted,g={};u&&(a?
(g.scaleY=.001,a=Math.min(k.pos+k.len,Math.max(k.pos,k.toPixels(f.threshold))),d?g.translateX=a-k.len:g.translateY=a,e.group.attr(g)):(g[d?"translateX":"translateY"]=k.pos,e.group.animate(g,E(D(e.options.animation),{step:function(a,c){e.group.attr({scaleY:Math.max(.001,c.pos)})}})),e.animate=null))},remove:function(){var a=this,e=a.chart;e.hasRendered&&G(e.series,function(e){e.type===a.type&&(e.isDirty=!0)});t.prototype.remove.apply(a,arguments)}})})(M);(function(a){a=a.seriesType;a("bar","column",
null,{inverted:!0})})(M);(function(a){var D=a.Series;a=a.seriesType;a("scatter","line",{lineWidth:0,findNearestPointBy:"xy",marker:{enabled:!0},tooltip:{headerFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',pointFormat:"x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"}},{sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","markerGroup","dataLabelsGroup"],
takeOrdinalPosition:!1,drawGraph:function(){this.options.lineWidth&&D.prototype.drawGraph.call(this)}})})(M);(function(a){var D=a.pick,B=a.relativeLength;a.CenteredSeriesMixin={getCenter:function(){var a=this.options,E=this.chart,r=2*(a.slicedOffset||0),g=E.plotWidth-2*r,E=E.plotHeight-2*r,p=a.center,p=[D(p[0],"50%"),D(p[1],"50%"),a.size||"100%",a.innerSize||0],t=Math.min(g,E),v,u;for(v=0;4>v;++v)u=p[v],a=2>v||2===v&&/%$/.test(u),p[v]=B(u,[g,E,t,p[2]][v])+(a?r:0);p[3]>p[2]&&(p[3]=p[2]);return p}}})(M);
(function(a){var D=a.addEvent,B=a.defined,G=a.each,E=a.extend,r=a.inArray,g=a.noop,p=a.pick,t=a.Point,v=a.Series,u=a.seriesType,l=a.setAnimation;u("pie","line",{center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{distance:30,enabled:!0,formatter:function(){return this.point.isNull?void 0:this.point.name},x:0},ignoreHiddenPoint:!0,legendType:"point",marker:null,size:null,showInLegend:!1,slicedOffset:10,stickyTracking:!1,tooltip:{followPointer:!0},borderColor:"#ffffff",borderWidth:1,states:{hover:{brightness:.1,
shadow:!1}}},{isCartesian:!1,requireSorting:!1,directTouch:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],axisTypes:[],pointAttribs:a.seriesTypes.column.prototype.pointAttribs,animate:function(a){var e=this,f=e.points,d=e.startAngleRad;a||(G(f,function(a){var f=a.graphic,c=a.shapeArgs;f&&(f.attr({r:a.startR||e.center[3]/2,start:d,end:d}),f.animate({r:c.r,start:c.start,end:c.end},e.options.animation))}),e.animate=null)},updateTotals:function(){var a,k=0,f=this.points,d=f.length,g,
l=this.options.ignoreHiddenPoint;for(a=0;a<d;a++)g=f[a],k+=l&&!g.visible?0:g.isNull?0:g.y;this.total=k;for(a=0;a<d;a++)g=f[a],g.percentage=0<k&&(g.visible||!l)?g.y/k*100:0,g.total=k},generatePoints:function(){v.prototype.generatePoints.call(this);this.updateTotals()},translate:function(a){this.generatePoints();var e=0,f=this.options,d=f.slicedOffset,g=d+(f.borderWidth||0),l,c,q,r=f.startAngle||0,m=this.startAngleRad=Math.PI/180*(r-90),r=(this.endAngleRad=Math.PI/180*(p(f.endAngle,r+360)-90))-m,t=
this.points,b,z=f.dataLabels.distance,f=f.ignoreHiddenPoint,u,y=t.length,A;a||(this.center=a=this.getCenter());this.getX=function(b,c,d){q=Math.asin(Math.min((b-a[1])/(a[2]/2+d.labelDistance),1));return a[0]+(c?-1:1)*Math.cos(q)*(a[2]/2+d.labelDistance)};for(u=0;u<y;u++){A=t[u];A.labelDistance=p(A.options.dataLabels&&A.options.dataLabels.distance,z);this.maxLabelDistance=Math.max(this.maxLabelDistance||0,A.labelDistance);l=m+e*r;if(!f||A.visible)e+=A.percentage/100;c=m+e*r;A.shapeType="arc";A.shapeArgs=
{x:a[0],y:a[1],r:a[2]/2,innerR:a[3]/2,start:Math.round(1E3*l)/1E3,end:Math.round(1E3*c)/1E3};q=(c+l)/2;q>1.5*Math.PI?q-=2*Math.PI:q<-Math.PI/2&&(q+=2*Math.PI);A.slicedTranslation={translateX:Math.round(Math.cos(q)*d),translateY:Math.round(Math.sin(q)*d)};c=Math.cos(q)*a[2]/2;b=Math.sin(q)*a[2]/2;A.tooltipPos=[a[0]+.7*c,a[1]+.7*b];A.half=q<-Math.PI/2||q>Math.PI/2?1:0;A.angle=q;l=Math.min(g,A.labelDistance/5);A.labelPos=[a[0]+c+Math.cos(q)*A.labelDistance,a[1]+b+Math.sin(q)*A.labelDistance,a[0]+c+Math.cos(q)*
l,a[1]+b+Math.sin(q)*l,a[0]+c,a[1]+b,0>A.labelDistance?"center":A.half?"right":"left",q]}},drawGraph:null,drawPoints:function(){var a=this,k=a.chart.renderer,f,d,g,l,c=a.options.shadow;c&&!a.shadowGroup&&(a.shadowGroup=k.g("shadow").add(a.group));G(a.points,function(e){if(!e.isNull){d=e.graphic;l=e.shapeArgs;f=e.getTranslate();var q=e.shadowGroup;c&&!q&&(q=e.shadowGroup=k.g("shadow").add(a.shadowGroup));q&&q.attr(f);g=a.pointAttribs(e,e.selected&&"select");d?d.setRadialReference(a.center).attr(g).animate(E(l,
f)):(e.graphic=d=k[e.shapeType](l).setRadialReference(a.center).attr(f).add(a.group),e.visible||d.attr({visibility:"hidden"}),d.attr(g).attr({"stroke-linejoin":"round"}).shadow(c,q));d.addClass(e.getClassName())}})},searchPoint:g,sortByAngle:function(a,k){a.sort(function(a,d){return void 0!==a.angle&&(d.angle-a.angle)*k})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,getCenter:a.CenteredSeriesMixin.getCenter,getSymbol:g},{init:function(){t.prototype.init.apply(this,arguments);var a=this,k;a.name=
p(a.name,"Slice");k=function(e){a.slice("select"===e.type)};D(a,"select",k);D(a,"unselect",k);return a},isValid:function(){return a.isNumber(this.y,!0)&&0<=this.y},setVisible:function(a,k){var e=this,d=e.series,g=d.chart,l=d.options.ignoreHiddenPoint;k=p(k,l);a!==e.visible&&(e.visible=e.options.visible=a=void 0===a?!e.visible:a,d.options.data[r(e,d.data)]=e.options,G(["graphic","dataLabel","connector","shadowGroup"],function(c){if(e[c])e[c][a?"show":"hide"](!0)}),e.legendItem&&g.legend.colorizeItem(e,
a),a||"hover"!==e.state||e.setState(""),l&&(d.isDirty=!0),k&&g.redraw())},slice:function(a,k,f){var d=this.series;l(f,d.chart);p(k,!0);this.sliced=this.options.sliced=B(a)?a:!this.sliced;d.options.data[r(this,d.data)]=this.options;this.graphic.animate(this.getTranslate());this.shadowGroup&&this.shadowGroup.animate(this.getTranslate())},getTranslate:function(){return this.sliced?this.slicedTranslation:{translateX:0,translateY:0}},haloPath:function(a){var e=this.shapeArgs;return this.sliced||!this.visible?
[]:this.series.chart.renderer.symbols.arc(e.x,e.y,e.r+a,e.r+a,{innerR:this.shapeArgs.r,start:e.start,end:e.end})}})})(M);(function(a){var D=a.addEvent,B=a.arrayMax,G=a.defined,E=a.each,r=a.extend,g=a.format,p=a.map,t=a.merge,v=a.noop,u=a.pick,l=a.relativeLength,e=a.Series,k=a.seriesTypes,f=a.stableSort;a.distribute=function(a,e){function d(a,c){return a.target-c.target}var c,k=!0,g=a,m=[],l;l=0;for(c=a.length;c--;)l+=a[c].size;if(l>e){f(a,function(a,c){return(c.rank||0)-(a.rank||0)});for(l=c=0;l<=
e;)l+=a[c].size,c++;m=a.splice(c-1,a.length)}f(a,d);for(a=p(a,function(a){return{size:a.size,targets:[a.target]}});k;){for(c=a.length;c--;)k=a[c],l=(Math.min.apply(0,k.targets)+Math.max.apply(0,k.targets))/2,k.pos=Math.min(Math.max(0,l-k.size/2),e-k.size);c=a.length;for(k=!1;c--;)0<c&&a[c-1].pos+a[c-1].size>a[c].pos&&(a[c-1].size+=a[c].size,a[c-1].targets=a[c-1].targets.concat(a[c].targets),a[c-1].pos+a[c-1].size>e&&(a[c-1].pos=e-a[c-1].size),a.splice(c,1),k=!0)}c=0;E(a,function(a){var b=0;E(a.targets,
function(){g[c].pos=a.pos+b;b+=g[c].size;c++})});g.push.apply(g,m);f(g,d)};e.prototype.drawDataLabels=function(){var d=this,e=d.options,f=e.dataLabels,c=d.points,k,l,m=d.hasRendered||0,p,b,z=u(f.defer,!!e.animation),r=d.chart.renderer;if(f.enabled||d._hasPointLabels)d.dlProcessOptions&&d.dlProcessOptions(f),b=d.plotGroup("dataLabelsGroup","data-labels",z&&!m?"hidden":"visible",f.zIndex||6),z&&(b.attr({opacity:+m}),m||D(d,"afterAnimate",function(){d.visible&&b.show(!0);b[e.animation?"animate":"attr"]({opacity:1},
{duration:200})})),l=f,E(c,function(c){var m,n=c.dataLabel,q,h,w=c.connector,z=!n,y;k=c.dlOptions||c.options&&c.options.dataLabels;if(m=u(k&&k.enabled,l.enabled)&&null!==c.y)f=t(l,k),q=c.getLabelConfig(),p=f.format?g(f.format,q):f.formatter.call(q,f),y=f.style,q=f.rotation,y.color=u(f.color,y.color,d.color,"#000000"),"contrast"===y.color&&(c.contrastColor=r.getContrast(c.color||d.color),y.color=f.inside||0>u(c.labelDistance,f.distance)||e.stacking?c.contrastColor:"#000000"),e.cursor&&(y.cursor=e.cursor),
h={fill:f.backgroundColor,stroke:f.borderColor,"stroke-width":f.borderWidth,r:f.borderRadius||0,rotation:q,padding:f.padding,zIndex:1},a.objectEach(h,function(a,b){void 0===a&&delete h[b]});!n||m&&G(p)?m&&G(p)&&(n?h.text=p:(n=c.dataLabel=r[q?"text":"label"](p,0,-9999,f.shape,null,null,f.useHTML,null,"data-label"),n.addClass("highcharts-data-label-color-"+c.colorIndex+" "+(f.className||"")+(f.useHTML?"highcharts-tracker":""))),n.attr(h),n.css(y).shadow(f.shadow),n.added||n.add(b),d.alignDataLabel(c,
n,f,null,z)):(c.dataLabel=n=n.destroy(),w&&(c.connector=w.destroy()))})};e.prototype.alignDataLabel=function(a,e,f,c,k){var d=this.chart,m=d.inverted,g=u(a.plotX,-9999),b=u(a.plotY,-9999),l=e.getBBox(),q,p=f.rotation,x=f.align,n=this.visible&&(a.series.forceDL||d.isInsidePlot(g,Math.round(b),m)||c&&d.isInsidePlot(g,m?c.x+1:c.y+c.height-1,m)),H="justify"===u(f.overflow,"justify");if(n&&(q=f.style.fontSize,q=d.renderer.fontMetrics(q,e).b,c=r({x:m?this.yAxis.len-b:g,y:Math.round(m?this.xAxis.len-g:b),
width:0,height:0},c),r(f,{width:l.width,height:l.height}),p?(H=!1,g=d.renderer.rotCorr(q,p),g={x:c.x+f.x+c.width/2+g.x,y:c.y+f.y+{top:0,middle:.5,bottom:1}[f.verticalAlign]*c.height},e[k?"attr":"animate"](g).attr({align:x}),b=(p+720)%360,b=180<b&&360>b,"left"===x?g.y-=b?l.height:0:"center"===x?(g.x-=l.width/2,g.y-=l.height/2):"right"===x&&(g.x-=l.width,g.y-=b?0:l.height)):(e.align(f,null,c),g=e.alignAttr),H?a.isLabelJustified=this.justifyDataLabel(e,f,g,l,c,k):u(f.crop,!0)&&(n=d.isInsidePlot(g.x,
g.y)&&d.isInsidePlot(g.x+l.width,g.y+l.height)),f.shape&&!p))e[k?"attr":"animate"]({anchorX:m?d.plotWidth-a.plotY:a.plotX,anchorY:m?d.plotHeight-a.plotX:a.plotY});n||(e.attr({y:-9999}),e.placed=!1)};e.prototype.justifyDataLabel=function(a,e,f,c,k,g){var d=this.chart,l=e.align,b=e.verticalAlign,q,p,y=a.box?0:a.padding||0;q=f.x+y;0>q&&("right"===l?e.align="left":e.x=-q,p=!0);q=f.x+c.width-y;q>d.plotWidth&&("left"===l?e.align="right":e.x=d.plotWidth-q,p=!0);q=f.y+y;0>q&&("bottom"===b?e.verticalAlign=
"top":e.y=-q,p=!0);q=f.y+c.height-y;q>d.plotHeight&&("top"===b?e.verticalAlign="bottom":e.y=d.plotHeight-q,p=!0);p&&(a.placed=!g,a.align(e,null,k));return p};k.pie&&(k.pie.prototype.drawDataLabels=function(){var d=this,f=d.data,k,c=d.chart,g=d.options.dataLabels,l=u(g.connectorPadding,10),m=u(g.connectorWidth,1),p=c.plotWidth,b=c.plotHeight,z,r=d.center,y=r[2]/2,t=r[1],n,H,h,w,v=[[],[]],L,D,N,O,F=[0,0,0,0];d.visible&&(g.enabled||d._hasPointLabels)&&(E(f,function(a){a.dataLabel&&a.visible&&a.dataLabel.shortened&&
(a.dataLabel.attr({width:"auto"}).css({width:"auto",textOverflow:"clip"}),a.dataLabel.shortened=!1)}),e.prototype.drawDataLabels.apply(d),E(f,function(a){a.dataLabel&&a.visible&&(v[a.half].push(a),a.dataLabel._pos=null)}),E(v,function(e,f){var m,q,z=e.length,x=[],A;if(z)for(d.sortByAngle(e,f-.5),0<d.maxLabelDistance&&(m=Math.max(0,t-y-d.maxLabelDistance),q=Math.min(t+y+d.maxLabelDistance,c.plotHeight),E(e,function(a){0<a.labelDistance&&a.dataLabel&&(a.top=Math.max(0,t-y-a.labelDistance),a.bottom=
Math.min(t+y+a.labelDistance,c.plotHeight),A=a.dataLabel.getBBox().height||21,a.positionsIndex=x.push({target:a.labelPos[1]-a.top+A/2,size:A,rank:a.y})-1)}),a.distribute(x,q+A-m)),O=0;O<z;O++)k=e[O],q=k.positionsIndex,h=k.labelPos,n=k.dataLabel,N=!1===k.visible?"hidden":"inherit",m=h[1],x&&G(x[q])?void 0===x[q].pos?N="hidden":(w=x[q].size,D=k.top+x[q].pos):D=m,delete k.positionIndex,L=g.justify?r[0]+(f?-1:1)*(y+k.labelDistance):d.getX(D<k.top+2||D>k.bottom-2?m:D,f,k),n._attr={visibility:N,align:h[6]},
n._pos={x:L+g.x+({left:l,right:-l}[h[6]]||0),y:D+g.y-10},h.x=L,h.y=D,u(g.crop,!0)&&(H=n.getBBox().width,m=null,L-H<l?(m=Math.round(H-L+l),F[3]=Math.max(m,F[3])):L+H>p-l&&(m=Math.round(L+H-p+l),F[1]=Math.max(m,F[1])),0>D-w/2?F[0]=Math.max(Math.round(-D+w/2),F[0]):D+w/2>b&&(F[2]=Math.max(Math.round(D+w/2-b),F[2])),n.sideOverflow=m)}),0===B(F)||this.verifyDataLabelOverflow(F))&&(this.placeDataLabels(),m&&E(this.points,function(a){var b;z=a.connector;if((n=a.dataLabel)&&n._pos&&a.visible&&0<a.labelDistance){N=
n._attr.visibility;if(b=!z)a.connector=z=c.renderer.path().addClass("highcharts-data-label-connector highcharts-color-"+a.colorIndex).add(d.dataLabelsGroup),z.attr({"stroke-width":m,stroke:g.connectorColor||a.color||"#666666"});z[b?"attr":"animate"]({d:d.connectorPath(a.labelPos)});z.attr("visibility",N)}else z&&(a.connector=z.destroy())}))},k.pie.prototype.connectorPath=function(a){var d=a.x,e=a.y;return u(this.options.dataLabels.softConnector,!0)?["M",d+("left"===a[6]?5:-5),e,"C",d,e,2*a[2]-a[4],
2*a[3]-a[5],a[2],a[3],"L",a[4],a[5]]:["M",d+("left"===a[6]?5:-5),e,"L",a[2],a[3],"L",a[4],a[5]]},k.pie.prototype.placeDataLabels=function(){E(this.points,function(a){var d=a.dataLabel;d&&a.visible&&((a=d._pos)?(d.sideOverflow&&(d._attr.width=d.getBBox().width-d.sideOverflow,d.css({width:d._attr.width+"px",textOverflow:"ellipsis"}),d.shortened=!0),d.attr(d._attr),d[d.moved?"animate":"attr"](a),d.moved=!0):d&&d.attr({y:-9999}))},this)},k.pie.prototype.alignDataLabel=v,k.pie.prototype.verifyDataLabelOverflow=
function(a){var d=this.center,e=this.options,c=e.center,f=e.minSize||80,k,m=null!==e.size;m||(null!==c[0]?k=Math.max(d[2]-Math.max(a[1],a[3]),f):(k=Math.max(d[2]-a[1]-a[3],f),d[0]+=(a[3]-a[1])/2),null!==c[1]?k=Math.max(Math.min(k,d[2]-Math.max(a[0],a[2])),f):(k=Math.max(Math.min(k,d[2]-a[0]-a[2]),f),d[1]+=(a[0]-a[2])/2),k<d[2]?(d[2]=k,d[3]=Math.min(l(e.innerSize||0,k),k),this.translate(d),this.drawDataLabels&&this.drawDataLabels()):m=!0);return m});k.column&&(k.column.prototype.alignDataLabel=function(a,
f,k,c,g){var d=this.chart.inverted,m=a.series,l=a.dlBox||a.shapeArgs,b=u(a.below,a.plotY>u(this.translatedThreshold,m.yAxis.len)),q=u(k.inside,!!this.options.stacking);l&&(c=t(l),0>c.y&&(c.height+=c.y,c.y=0),l=c.y+c.height-m.yAxis.len,0<l&&(c.height-=l),d&&(c={x:m.yAxis.len-c.y-c.height,y:m.xAxis.len-c.x-c.width,width:c.height,height:c.width}),q||(d?(c.x+=b?0:c.width,c.width=0):(c.y+=b?c.height:0,c.height=0)));k.align=u(k.align,!d||q?"center":b?"right":"left");k.verticalAlign=u(k.verticalAlign,d||
q?"middle":b?"top":"bottom");e.prototype.alignDataLabel.call(this,a,f,k,c,g);a.isLabelJustified&&a.contrastColor&&a.dataLabel.css({color:a.contrastColor})})})(M);(function(a){var D=a.Chart,B=a.each,G=a.objectEach,E=a.pick,r=a.addEvent;D.prototype.callbacks.push(function(a){function g(){var g=[];B(a.yAxis||[],function(a){a.options.stackLabels&&!a.options.stackLabels.allowOverlap&&G(a.stacks,function(a){G(a,function(a){g.push(a.label)})})});B(a.series||[],function(a){var p=a.options.dataLabels,l=a.dataLabelCollections||
["dataLabel"];(p.enabled||a._hasPointLabels)&&!p.allowOverlap&&a.visible&&B(l,function(e){B(a.points,function(a){a[e]&&(a[e].labelrank=E(a.labelrank,a.shapeArgs&&a.shapeArgs.height),g.push(a[e]))})})});a.hideOverlappingLabels(g)}g();r(a,"redraw",g)});D.prototype.hideOverlappingLabels=function(a){var g=a.length,r,v,u,l,e,k,f,d,x,C=function(a,d,e,f,k,b,g,l){return!(k>a+e||k+g<a||b>d+f||b+l<d)};for(v=0;v<g;v++)if(r=a[v])r.oldOpacity=r.opacity,r.newOpacity=1,r.width||(u=r.getBBox(),r.width=u.width,r.height=
u.height);a.sort(function(a,d){return(d.labelrank||0)-(a.labelrank||0)});for(v=0;v<g;v++)for(u=a[v],r=v+1;r<g;++r)if(l=a[r],u&&l&&u!==l&&u.placed&&l.placed&&0!==u.newOpacity&&0!==l.newOpacity&&(e=u.alignAttr,k=l.alignAttr,f=u.parentGroup,d=l.parentGroup,x=2*(u.box?0:u.padding||0),e=C(e.x+f.translateX,e.y+f.translateY,u.width-x,u.height-x,k.x+d.translateX,k.y+d.translateY,l.width-x,l.height-x)))(u.labelrank<l.labelrank?u:l).newOpacity=0;B(a,function(a){var c,d;a&&(d=a.newOpacity,a.oldOpacity!==d&&
a.placed&&(d?a.show(!0):c=function(){a.hide()},a.alignAttr.opacity=d,a[a.isOld?"animate":"attr"](a.alignAttr,null,c)),a.isOld=!0)})}})(M);(function(a){var D=a.addEvent,B=a.Chart,G=a.createElement,E=a.css,r=a.defaultOptions,g=a.defaultPlotOptions,p=a.each,t=a.extend,v=a.fireEvent,u=a.hasTouch,l=a.inArray,e=a.isObject,k=a.Legend,f=a.merge,d=a.pick,x=a.Point,C=a.Series,c=a.seriesTypes,q=a.svg,I;I=a.TrackerMixin={drawTrackerPoint:function(){var a=this,c=a.chart.pointer,b=function(a){var b=c.getPointFromEvent(a);
void 0!==b&&(c.isDirectTouch=!0,b.onMouseOver(a))};p(a.points,function(a){a.graphic&&(a.graphic.element.point=a);a.dataLabel&&(a.dataLabel.div?a.dataLabel.div.point=a:a.dataLabel.element.point=a)});a._hasTracking||(p(a.trackerGroups,function(d){if(a[d]){a[d].addClass("highcharts-tracker").on("mouseover",b).on("mouseout",function(a){c.onTrackerMouseOut(a)});if(u)a[d].on("touchstart",b);a.options.cursor&&a[d].css(E).css({cursor:a.options.cursor})}}),a._hasTracking=!0)},drawTrackerGraph:function(){var a=
this,c=a.options,b=c.trackByArea,d=[].concat(b?a.areaPath:a.graphPath),e=d.length,f=a.chart,k=f.pointer,n=f.renderer,g=f.options.tooltip.snap,h=a.tracker,l,r=function(){if(f.hoverSeries!==a)a.onMouseOver()},t="rgba(192,192,192,"+(q?.0001:.002)+")";if(e&&!b)for(l=e+1;l--;)"M"===d[l]&&d.splice(l+1,0,d[l+1]-g,d[l+2],"L"),(l&&"M"===d[l]||l===e)&&d.splice(l,0,"L",d[l-2]+g,d[l-1]);h?h.attr({d:d}):a.graph&&(a.tracker=n.path(d).attr({"stroke-linejoin":"round",visibility:a.visible?"visible":"hidden",stroke:t,
fill:b?t:"none","stroke-width":a.graph.strokeWidth()+(b?0:2*g),zIndex:2}).add(a.group),p([a.tracker,a.markerGroup],function(a){a.addClass("highcharts-tracker").on("mouseover",r).on("mouseout",function(a){k.onTrackerMouseOut(a)});c.cursor&&a.css({cursor:c.cursor});if(u)a.on("touchstart",r)}))}};c.column&&(c.column.prototype.drawTracker=I.drawTrackerPoint);c.pie&&(c.pie.prototype.drawTracker=I.drawTrackerPoint);c.scatter&&(c.scatter.prototype.drawTracker=I.drawTrackerPoint);t(k.prototype,{setItemEvents:function(a,
c,b){var d=this,e=d.chart.renderer.boxWrapper,k="highcharts-legend-"+(a.series?"point":"series")+"-active";(b?c:a.legendGroup).on("mouseover",function(){a.setState("hover");e.addClass(k);c.css(d.options.itemHoverStyle)}).on("mouseout",function(){c.css(f(a.visible?d.itemStyle:d.itemHiddenStyle));e.removeClass(k);a.setState()}).on("click",function(b){var c=function(){a.setVisible&&a.setVisible()};b={browserEvent:b};a.firePointEvent?a.firePointEvent("legendItemClick",b,c):v(a,"legendItemClick",b,c)})},
createCheckboxForItem:function(a){a.checkbox=G("input",{type:"checkbox",checked:a.selected,defaultChecked:a.selected},this.options.itemCheckboxStyle,this.chart.container);D(a.checkbox,"click",function(c){v(a.series||a,"checkboxClick",{checked:c.target.checked,item:a},function(){a.select()})})}});r.legend.itemStyle.cursor="pointer";t(B.prototype,{showResetZoom:function(){var a=this,c=r.lang,b=a.options.chart.resetZoomButton,d=b.theme,e=d.states,f="chart"===b.relativeTo?null:"plotBox";this.resetZoomButton=
a.renderer.button(c.resetZoom,null,null,function(){a.zoomOut()},d,e&&e.hover).attr({align:b.position.align,title:c.resetZoomTitle}).addClass("highcharts-reset-zoom").add().align(b.position,!1,f)},zoomOut:function(){var a=this;v(a,"selection",{resetSelection:!0},function(){a.zoom()})},zoom:function(a){var c,b=this.pointer,f=!1,k;!a||a.resetSelection?(p(this.axes,function(a){c=a.zoom()}),b.initiated=!1):p(a.xAxis.concat(a.yAxis),function(a){var d=a.axis;b[d.isXAxis?"zoomX":"zoomY"]&&(c=d.zoom(a.min,
a.max),d.displayBtn&&(f=!0))});k=this.resetZoomButton;f&&!k?this.showResetZoom():!f&&e(k)&&(this.resetZoomButton=k.destroy());c&&this.redraw(d(this.options.chart.animation,a&&a.animation,100>this.pointCount))},pan:function(a,c){var b=this,d=b.hoverPoints,e;d&&p(d,function(a){a.setState()});p("xy"===c?[1,0]:[1],function(c){c=b[c?"xAxis":"yAxis"][0];var d=c.horiz,f=a[d?"chartX":"chartY"],d=d?"mouseDownX":"mouseDownY",k=b[d],h=(c.pointRange||0)/2,m=c.getExtremes(),g=c.toValue(k-f,!0)+h,h=c.toValue(k+
c.len-f,!0)-h,l=h<g,k=l?h:g,g=l?g:h,h=Math.min(m.dataMin,c.toValue(c.toPixels(m.min)-c.minPixelPadding)),l=Math.max(m.dataMax,c.toValue(c.toPixels(m.max)+c.minPixelPadding)),q;q=h-k;0<q&&(g+=q,k=h);q=g-l;0<q&&(g=l,k-=q);c.series.length&&k!==m.min&&g!==m.max&&(c.setExtremes(k,g,!1,!1,{trigger:"pan"}),e=!0);b[d]=f});e&&b.redraw(!1);E(b.container,{cursor:"move"})}});t(x.prototype,{select:function(a,c){var b=this,e=b.series,f=e.chart;a=d(a,!b.selected);b.firePointEvent(a?"select":"unselect",{accumulate:c},
function(){b.selected=b.options.selected=a;e.options.data[l(b,e.data)]=b.options;b.setState(a&&"select");c||p(f.getSelectedPoints(),function(a){a.selected&&a!==b&&(a.selected=a.options.selected=!1,e.options.data[l(a,e.data)]=a.options,a.setState(""),a.firePointEvent("unselect"))})})},onMouseOver:function(a){var c=this.series.chart,b=c.pointer;a=a?b.normalize(a):b.getChartCoordinatesFromPoint(this,c.inverted);b.runPointActions(a,this)},onMouseOut:function(){var a=this.series.chart;this.firePointEvent("mouseOut");
p(a.hoverPoints||[],function(a){a.setState()});a.hoverPoints=a.hoverPoint=null},importEvents:function(){if(!this.hasImportedEvents){var c=this,d=f(c.series.options.point,c.options).events;c.events=d;a.objectEach(d,function(a,d){D(c,d,a)});this.hasImportedEvents=!0}},setState:function(a,c){var b=Math.floor(this.plotX),e=this.plotY,f=this.series,k=f.options.states[a]||{},m=g[f.type].marker&&f.options.marker,n=m&&!1===m.enabled,l=m&&m.states&&m.states[a]||{},h=!1===l.enabled,q=f.stateMarkerGraphic,p=
this.marker||{},r=f.chart,u=f.halo,x,v=m&&f.markerAttribs;a=a||"";if(!(a===this.state&&!c||this.selected&&"select"!==a||!1===k.enabled||a&&(h||n&&!1===l.enabled)||a&&p.states&&p.states[a]&&!1===p.states[a].enabled)){v&&(x=f.markerAttribs(this,a));if(this.graphic)this.state&&this.graphic.removeClass("highcharts-point-"+this.state),a&&this.graphic.addClass("highcharts-point-"+a),this.graphic.animate(f.pointAttribs(this,a),d(r.options.chart.animation,k.animation)),x&&this.graphic.animate(x,d(r.options.chart.animation,
l.animation,m.animation)),q&&q.hide();else{if(a&&l){m=p.symbol||f.symbol;q&&q.currentSymbol!==m&&(q=q.destroy());if(q)q[c?"animate":"attr"]({x:x.x,y:x.y});else m&&(f.stateMarkerGraphic=q=r.renderer.symbol(m,x.x,x.y,x.width,x.height).add(f.markerGroup),q.currentSymbol=m);q&&q.attr(f.pointAttribs(this,a))}q&&(q[a&&r.isInsidePlot(b,e,r.inverted)?"show":"hide"](),q.element.point=this)}(b=k.halo)&&b.size?(u||(f.halo=u=r.renderer.path().add((this.graphic||q).parentGroup)),u[c?"animate":"attr"]({d:this.haloPath(b.size)}),
u.attr({"class":"highcharts-halo highcharts-color-"+d(this.colorIndex,f.colorIndex)}),u.point=this,u.attr(t({fill:this.color||f.color,"fill-opacity":b.opacity,zIndex:-1},b.attributes))):u&&u.point&&u.point.haloPath&&u.animate({d:u.point.haloPath(0)});this.state=a}},haloPath:function(a){return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX)-a,this.plotY-a,2*a,2*a)}});t(C.prototype,{onMouseOver:function(){var a=this.chart,c=a.hoverSeries;if(c&&c!==this)c.onMouseOut();this.options.events.mouseOver&&
v(this,"mouseOver");this.setState("hover");a.hoverSeries=this},onMouseOut:function(){var a=this.options,c=this.chart,b=c.tooltip,d=c.hoverPoint;c.hoverSeries=null;if(d)d.onMouseOut();this&&a.events.mouseOut&&v(this,"mouseOut");!b||this.stickyTracking||b.shared&&!this.noSharedTooltip||b.hide();this.setState()},setState:function(a){var c=this,b=c.options,e=c.graph,f=b.states,k=b.lineWidth,b=0;a=a||"";if(c.state!==a&&(p([c.group,c.markerGroup,c.dataLabelsGroup],function(b){b&&(c.state&&b.removeClass("highcharts-series-"+
c.state),a&&b.addClass("highcharts-series-"+a))}),c.state=a,!f[a]||!1!==f[a].enabled)&&(a&&(k=f[a].lineWidth||k+(f[a].lineWidthPlus||0)),e&&!e.dashstyle))for(k={"stroke-width":k},e.animate(k,d(c.chart.options.chart.animation,f[a]&&f[a].animation));c["zone-graph-"+b];)c["zone-graph-"+b].attr(k),b+=1},setVisible:function(a,c){var b=this,d=b.chart,e=b.legendItem,f,k=d.options.chart.ignoreHiddenSeries,n=b.visible;f=(b.visible=a=b.options.visible=b.userOptions.visible=void 0===a?!n:a)?"show":"hide";p(["group",
"dataLabelsGroup","markerGroup","tracker","tt"],function(a){if(b[a])b[a][f]()});if(d.hoverSeries===b||(d.hoverPoint&&d.hoverPoint.series)===b)b.onMouseOut();e&&d.legend.colorizeItem(b,a);b.isDirty=!0;b.options.stacking&&p(d.series,function(a){a.options.stacking&&a.visible&&(a.isDirty=!0)});p(b.linkedSeries,function(b){b.setVisible(a,!1)});k&&(d.isDirtyBox=!0);!1!==c&&d.redraw();v(b,f)},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},select:function(a){this.selected=a=void 0===
a?!this.selected:a;this.checkbox&&(this.checkbox.checked=a);v(this,a?"select":"unselect")},drawTracker:I.drawTrackerGraph})})(M);(function(a){var D=a.Chart,B=a.each,G=a.inArray,E=a.isArray,r=a.isObject,g=a.pick,p=a.splat;D.prototype.setResponsive=function(g){var p=this.options.responsive,r=[],l=this.currentResponsive;p&&p.rules&&B(p.rules,function(e){void 0===e._id&&(e._id=a.uniqueKey());this.matchResponsiveRule(e,r,g)},this);var e=a.merge.apply(0,a.map(r,function(e){return a.find(p.rules,function(a){return a._id===
e}).chartOptions})),r=r.toString()||void 0;r!==(l&&l.ruleIds)&&(l&&this.update(l.undoOptions,g),r?(this.currentResponsive={ruleIds:r,mergedOptions:e,undoOptions:this.currentOptions(e)},this.update(e,g)):this.currentResponsive=void 0)};D.prototype.matchResponsiveRule=function(a,p){var r=a.condition;(r.callback||function(){return this.chartWidth<=g(r.maxWidth,Number.MAX_VALUE)&&this.chartHeight<=g(r.maxHeight,Number.MAX_VALUE)&&this.chartWidth>=g(r.minWidth,0)&&this.chartHeight>=g(r.minHeight,0)}).call(this)&&
p.push(a._id)};D.prototype.currentOptions=function(g){function t(g,e,k,f){var d;a.objectEach(g,function(a,l){if(!f&&-1<G(l,["series","xAxis","yAxis"]))for(g[l]=p(g[l]),k[l]=[],d=0;d<g[l].length;d++)e[l][d]&&(k[l][d]={},t(a[d],e[l][d],k[l][d],f+1));else r(a)?(k[l]=E(a)?[]:{},t(a,e[l]||{},k[l],f+1)):k[l]=e[l]||null})}var u={};t(g,this.options,u,0);return u}})(M);(function(a){var D=a.addEvent,B=a.Axis,G=a.Chart,E=a.css,r=a.dateFormat,g=a.defined,p=a.each,t=a.extend,v=a.noop,u=a.timeUnits,l=a.wrap;l(a.Series.prototype,
"init",function(a){var e;a.apply(this,Array.prototype.slice.call(arguments,1));(e=this.xAxis)&&e.options.ordinal&&D(this,"updatedData",function(){delete e.ordinalIndex})});l(B.prototype,"getTimeTicks",function(a,k,f,d,l,p,c,q){var e=0,m,t,b={},z,x,y,A=[],n=-Number.MAX_VALUE,H=this.options.tickPixelInterval;if(!this.options.ordinal&&!this.options.breaks||!p||3>p.length||void 0===f)return a.call(this,k,f,d,l);x=p.length;for(m=0;m<x;m++){y=m&&p[m-1]>d;p[m]<f&&(e=m);if(m===x-1||p[m+1]-p[m]>5*c||y){if(p[m]>
n){for(t=a.call(this,k,p[e],p[m],l);t.length&&t[0]<=n;)t.shift();t.length&&(n=t[t.length-1]);A=A.concat(t)}e=m+1}if(y)break}a=t.info;if(q&&a.unitRange<=u.hour){m=A.length-1;for(e=1;e<m;e++)r("%d",A[e])!==r("%d",A[e-1])&&(b[A[e]]="day",z=!0);z&&(b[A[0]]="day");a.higherRanks=b}A.info=a;if(q&&g(H)){q=a=A.length;m=[];var h;for(z=[];q--;)e=this.translate(A[q]),h&&(z[q]=h-e),m[q]=h=e;z.sort();z=z[Math.floor(z.length/2)];z<.6*H&&(z=null);q=A[a-1]>d?a-1:a;for(h=void 0;q--;)e=m[q],d=Math.abs(h-e),h&&d<.8*
H&&(null===z||d<.8*z)?(b[A[q]]&&!b[A[q+1]]?(d=q+1,h=e):d=q,A.splice(d,1)):h=e}return A});t(B.prototype,{beforeSetTickPositions:function(){var a,k=[],f=!1,d,g=this.getExtremes(),l=g.min,c=g.max,q,r=this.isXAxis&&!!this.options.breaks,g=this.options.ordinal,m=this.chart.options.chart.ignoreHiddenSeries;if(g||r){p(this.series,function(c,b){if(!(m&&!1===c.visible||!1===c.takeOrdinalPosition&&!r)&&(k=k.concat(c.processedXData),a=k.length,k.sort(function(a,b){return a-b}),a))for(b=a-1;b--;)k[b]===k[b+1]&&
k.splice(b,1)});a=k.length;if(2<a){d=k[1]-k[0];for(q=a-1;q--&&!f;)k[q+1]-k[q]!==d&&(f=!0);!this.options.keepOrdinalPadding&&(k[0]-l>d||c-k[k.length-1]>d)&&(f=!0)}f?(this.ordinalPositions=k,d=this.ordinal2lin(Math.max(l,k[0]),!0),q=Math.max(this.ordinal2lin(Math.min(c,k[k.length-1]),!0),1),this.ordinalSlope=c=(c-l)/(q-d),this.ordinalOffset=l-d*c):this.ordinalPositions=this.ordinalSlope=this.ordinalOffset=void 0}this.isOrdinal=g&&f;this.groupIntervalFactor=null},val2lin:function(a,k){var e=this.ordinalPositions;
if(e){var d=e.length,g,l;for(g=d;g--;)if(e[g]===a){l=g;break}for(g=d-1;g--;)if(a>e[g]||0===g){a=(a-e[g])/(e[g+1]-e[g]);l=g+a;break}k=k?l:this.ordinalSlope*(l||0)+this.ordinalOffset}else k=a;return k},lin2val:function(a,k){var e=this.ordinalPositions;if(e){var d=this.ordinalSlope,g=this.ordinalOffset,l=e.length-1,c;if(k)0>a?a=e[0]:a>l?a=e[l]:(l=Math.floor(a),c=a-l);else for(;l--;)if(k=d*l+g,a>=k){d=d*(l+1)+g;c=(a-k)/(d-k);break}return void 0!==c&&void 0!==e[l]?e[l]+(c?c*(e[l+1]-e[l]):0):a}return a},
getExtendedPositions:function(){var a=this.chart,k=this.series[0].currentDataGrouping,f=this.ordinalIndex,d=k?k.count+k.unitName:"raw",g=this.getExtremes(),l,c;f||(f=this.ordinalIndex={});f[d]||(l={series:[],chart:a,getExtremes:function(){return{min:g.dataMin,max:g.dataMax}},options:{ordinal:!0},val2lin:B.prototype.val2lin,ordinal2lin:B.prototype.ordinal2lin},p(this.series,function(d){c={xAxis:l,xData:d.xData,chart:a,destroyGroupedData:v};c.options={dataGrouping:k?{enabled:!0,forced:!0,approximation:"open",
units:[[k.unitName,[k.count]]]}:{enabled:!1}};d.processData.apply(c);l.series.push(c)}),this.beforeSetTickPositions.apply(l),f[d]=l.ordinalPositions);return f[d]},getGroupIntervalFactor:function(a,k,f){var d;f=f.processedXData;var e=f.length,g=[];d=this.groupIntervalFactor;if(!d){for(d=0;d<e-1;d++)g[d]=f[d+1]-f[d];g.sort(function(a,d){return a-d});g=g[Math.floor(e/2)];a=Math.max(a,f[0]);k=Math.min(k,f[e-1]);this.groupIntervalFactor=d=e*g/(k-a)}return d},postProcessTickInterval:function(a){var e=this.ordinalSlope;
return e?this.options.breaks?this.closestPointRange:a/(e/this.closestPointRange):a}});B.prototype.ordinal2lin=B.prototype.val2lin;l(G.prototype,"pan",function(a,k){var e=this.xAxis[0],d=k.chartX,g=!1;if(e.options.ordinal&&e.series.length){var l=this.mouseDownX,c=e.getExtremes(),q=c.dataMax,r=c.min,m=c.max,t=this.hoverPoints,b=e.closestPointRange,l=(l-d)/(e.translationSlope*(e.ordinalSlope||b)),z={ordinalPositions:e.getExtendedPositions()},b=e.lin2val,u=e.val2lin,y;z.ordinalPositions?1<Math.abs(l)&&
(t&&p(t,function(a){a.setState()}),0>l?(t=z,y=e.ordinalPositions?e:z):(t=e.ordinalPositions?e:z,y=z),z=y.ordinalPositions,q>z[z.length-1]&&z.push(q),this.fixedRange=m-r,l=e.toFixedRange(null,null,b.apply(t,[u.apply(t,[r,!0])+l,!0]),b.apply(y,[u.apply(y,[m,!0])+l,!0])),l.min>=Math.min(c.dataMin,r)&&l.max<=Math.max(q,m)&&e.setExtremes(l.min,l.max,!0,!1,{trigger:"pan"}),this.mouseDownX=d,E(this.container,{cursor:"move"})):g=!0}else g=!0;g&&a.apply(this,Array.prototype.slice.call(arguments,1))})})(M);
(function(a){function D(){return Array.prototype.slice.call(arguments,1)}function B(a){a.apply(this);this.drawBreaks(this.xAxis,["x"]);this.drawBreaks(this.yAxis,G(this.pointArrayMap,["y"]))}var G=a.pick,E=a.wrap,r=a.each,g=a.extend,p=a.isArray,t=a.fireEvent,v=a.Axis,u=a.Series;g(v.prototype,{isInBreak:function(a,e){var k=a.repeat||Infinity,f=a.from,d=a.to-a.from;e=e>=f?(e-f)%k:k-(f-e)%k;return a.inclusive?e<=d:e<d&&0!==e},isInAnyBreak:function(a,e){var k=this.options.breaks,f=k&&k.length,d,g,l;if(f){for(;f--;)this.isInBreak(k[f],
a)&&(d=!0,g||(g=G(k[f].showPoints,this.isXAxis?!1:!0)));l=d&&e?d&&!g:d}return l}});E(v.prototype,"setTickPositions",function(a){a.apply(this,Array.prototype.slice.call(arguments,1));if(this.options.breaks){var e=this.tickPositions,k=this.tickPositions.info,f=[],d;for(d=0;d<e.length;d++)this.isInAnyBreak(e[d])||f.push(e[d]);this.tickPositions=f;this.tickPositions.info=k}});E(v.prototype,"init",function(a,e,k){var f=this;k.breaks&&k.breaks.length&&(k.ordinal=!1);a.call(this,e,k);a=this.options.breaks;
f.isBroken=p(a)&&!!a.length;f.isBroken&&(f.val2lin=function(a){var d=a,e,c;for(c=0;c<f.breakArray.length;c++)if(e=f.breakArray[c],e.to<=a)d-=e.len;else if(e.from>=a)break;else if(f.isInBreak(e,a)){d-=a-e.from;break}return d},f.lin2val=function(a){var d,e;for(e=0;e<f.breakArray.length&&!(d=f.breakArray[e],d.from>=a);e++)d.to<a?a+=d.len:f.isInBreak(d,a)&&(a+=d.len);return a},f.setExtremes=function(a,e,f,c,k){for(;this.isInAnyBreak(a);)a-=this.closestPointRange;for(;this.isInAnyBreak(e);)e-=this.closestPointRange;
v.prototype.setExtremes.call(this,a,e,f,c,k)},f.setAxisTranslation=function(a){v.prototype.setAxisTranslation.call(this,a);a=f.options.breaks;var d=[],e=[],c=0,k,g,l=f.userMin||f.min,p=f.userMax||f.max,b=G(f.pointRangePadding,0),z,u;r(a,function(a){g=a.repeat||Infinity;f.isInBreak(a,l)&&(l+=a.to%g-l%g);f.isInBreak(a,p)&&(p-=p%g-a.from%g)});r(a,function(a){z=a.from;for(g=a.repeat||Infinity;z-g>l;)z-=g;for(;z<l;)z+=g;for(u=z;u<p;u+=g)d.push({value:u,move:"in"}),d.push({value:u+(a.to-a.from),move:"out",
size:a.breakSize})});d.sort(function(a,b){return a.value===b.value?("in"===a.move?0:1)-("in"===b.move?0:1):a.value-b.value});k=0;z=l;r(d,function(a){k+="in"===a.move?1:-1;1===k&&"in"===a.move&&(z=a.value);0===k&&(e.push({from:z,to:a.value,len:a.value-z-(a.size||0)}),c+=a.value-z-(a.size||0))});f.breakArray=e;f.unitLength=p-l-c+b;t(f,"afterBreaks");f.options.staticScale?f.transA=f.options.staticScale:f.unitLength&&(f.transA*=(p-f.min+b)/f.unitLength);b&&(f.minPixelPadding=f.transA*f.minPointOffset);
f.min=l;f.max=p})});E(u.prototype,"generatePoints",function(a){a.apply(this,D(arguments));var e=this.xAxis,k=this.yAxis,f=this.points,d,g=f.length,l=this.options.connectNulls,c;if(e&&k&&(e.options.breaks||k.options.breaks))for(;g--;)d=f[g],c=null===d.y&&!1===l,c||!e.isInAnyBreak(d.x,!0)&&!k.isInAnyBreak(d.y,!0)||(f.splice(g,1),this.data[g]&&this.data[g].destroyElements())});a.Series.prototype.drawBreaks=function(a,e){var k=this,f=k.points,d,g,l,c;a&&r(e,function(e){d=a.breakArray||[];g=a.isXAxis?
a.min:G(k.options.threshold,a.min);r(f,function(f){c=G(f["stack"+e.toUpperCase()],f[e]);r(d,function(d){l=!1;if(g<d.from&&c>d.to||g>d.from&&c<d.from)l="pointBreak";else if(g<d.from&&c>d.from&&c<d.to||g>d.from&&c>d.to&&c<d.from)l="pointInBreak";l&&t(a,l,{point:f,brk:d})})})})};a.Series.prototype.gappedPath=function(){var g=this.options.gapSize,e=this.points.slice(),k=e.length-1,f=this.yAxis,d;if(g&&0<k)for("value"!==this.options.gapUnit&&(g*=this.closestPointRange);k--;)e[k+1].x-e[k].x>g&&(d=(e[k].x+
e[k+1].x)/2,e.splice(k+1,0,{isNull:!0,x:d}),this.options.stacking&&(d=f.stacks[this.stackKey][d]=new a.StackItem(f,f.options.stackLabels,!1,d,this.stack),d.total=0));return this.getGraphPath(e)};E(a.seriesTypes.column.prototype,"drawPoints",B);E(a.Series.prototype,"drawPoints",B)})(M);(function(a){var D=a.arrayMax,B=a.arrayMin,G=a.Axis,E=a.defaultPlotOptions,r=a.defined,g=a.each,p=a.extend,t=a.format,v=a.isNumber,u=a.merge,l=a.pick,e=a.Point,k=a.Tooltip,f=a.wrap,d=a.Series.prototype,x=d.processData,
C=d.generatePoints,c=d.destroy,q={approximation:"average",groupPixelWidth:2,dateTimeLabelFormats:{millisecond:["%A, %b %e, %H:%M:%S.%L","%A, %b %e, %H:%M:%S.%L","-%H:%M:%S.%L"],second:["%A, %b %e, %H:%M:%S","%A, %b %e, %H:%M:%S","-%H:%M:%S"],minute:["%A, %b %e, %H:%M","%A, %b %e, %H:%M","-%H:%M"],hour:["%A, %b %e, %H:%M","%A, %b %e, %H:%M","-%H:%M"],day:["%A, %b %e, %Y","%A, %b %e","-%A, %b %e, %Y"],week:["Week from %A, %b %e, %Y","%A, %b %e","-%A, %b %e, %Y"],month:["%B %Y","%B","-%B %Y"],year:["%Y",
"%Y","-%Y"]}},I={line:{},spline:{},area:{},areaspline:{},column:{approximation:"sum",groupPixelWidth:10},arearange:{approximation:"range"},areasplinerange:{approximation:"range"},columnrange:{approximation:"range",groupPixelWidth:10},candlestick:{approximation:"ohlc",groupPixelWidth:10},ohlc:{approximation:"ohlc",groupPixelWidth:5}},m=a.defaultDataGroupingUnits=[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",
[1]],["week",[1]],["month",[1,3,6]],["year",null]],J={sum:function(a){var b=a.length,c;if(!b&&a.hasNulls)c=null;else if(b)for(c=0;b--;)c+=a[b];return c},average:function(a){var b=a.length;a=J.sum(a);v(a)&&b&&(a/=b);return a},averages:function(){var a=[];g(arguments,function(b){a.push(J.average(b))});return a},open:function(a){return a.length?a[0]:a.hasNulls?null:void 0},high:function(a){return a.length?D(a):a.hasNulls?null:void 0},low:function(a){return a.length?B(a):a.hasNulls?null:void 0},close:function(a){return a.length?
a[a.length-1]:a.hasNulls?null:void 0},ohlc:function(a,c,d,e){a=J.open(a);c=J.high(c);d=J.low(d);e=J.close(e);if(v(a)||v(c)||v(d)||v(e))return[a,c,d,e]},range:function(a,c){a=J.low(a);c=J.high(c);if(v(a)||v(c))return[a,c];if(null===a&&null===c)return null}};d.groupData=function(a,c,d,e){var b=this.data,f=this.options.data,k=[],h=[],l=[],m=a.length,p,r,t=!!c,u=[];e="function"===typeof e?e:J[e]||I[this.type]&&J[I[this.type].approximation]||J[q.approximation];var z=this.pointArrayMap,y=z&&z.length,x=
0;r=0;var C,K;y?g(z,function(){u.push([])}):u.push([]);C=y||1;for(K=0;K<=m&&!(a[K]>=d[0]);K++);for(K;K<=m;K++){for(;void 0!==d[x+1]&&a[K]>=d[x+1]||K===m;){p=d[x];this.dataGroupInfo={start:r,length:u[0].length};r=e.apply(this,u);void 0!==r&&(k.push(p),h.push(r),l.push(this.dataGroupInfo));r=K;for(p=0;p<C;p++)u[p].length=0,u[p].hasNulls=!1;x+=1;if(K===m)break}if(K===m)break;if(z){p=this.cropStart+K;var B=b&&b[p]||this.pointClass.prototype.applyOptions.apply({series:this},[f[p]]),D;for(p=0;p<y;p++)D=
B[z[p]],v(D)?u[p].push(D):null===D&&(u[p].hasNulls=!0)}else p=t?c[K]:null,v(p)?u[0].push(p):null===p&&(u[0].hasNulls=!0)}return[k,h,l]};d.processData=function(){var a=this.chart,c=this.options.dataGrouping,e=!1!==this.allowDG&&c&&l(c.enabled,a.options.isStock),f=this.visible||!a.options.chart.ignoreHiddenSeries,k;this.forceCrop=e;this.groupPixelWidth=null;this.hasProcessed=!0;if(!1!==x.apply(this,arguments)&&e){this.destroyGroupedData();var n=this.processedXData,g=this.processedYData,h=a.plotSizeX,
a=this.xAxis,q=a.options.ordinal,p=this.groupPixelWidth=a.getGroupPixelWidth&&a.getGroupPixelWidth();if(p){this.isDirty=k=!0;this.points=null;var t=a.getExtremes(),e=t.min,t=t.max,q=q&&a.getGroupIntervalFactor(e,t,this)||1,h=p*(t-e)/h*q,p=a.getTimeTicks(a.normalizeTimeTickInterval(h,c.units||m),Math.min(e,n[0]),Math.max(t,n[n.length-1]),a.options.startOfWeek,n,this.closestPointRange),n=d.groupData.apply(this,[n,g,p,c.approximation]),g=n[0],q=n[1];if(c.smoothed){c=g.length-1;for(g[c]=Math.min(g[c],
t);c--&&0<c;)g[c]+=h/2;g[0]=Math.max(g[0],e)}this.currentDataGrouping=p.info;this.closestPointRange=p.info.totalRange;this.groupMap=n[2];r(g[0])&&g[0]<a.dataMin&&f&&(a.min===a.dataMin&&(a.min=g[0]),a.dataMin=g[0]);this.processedXData=g;this.processedYData=q}else this.currentDataGrouping=this.groupMap=null;this.hasGroupedData=k}};d.destroyGroupedData=function(){var a=this.groupedData;g(a||[],function(b,c){b&&(a[c]=b.destroy?b.destroy():null)});this.groupedData=null};d.generatePoints=function(){C.apply(this);
this.destroyGroupedData();this.groupedData=this.hasGroupedData?this.points:null};f(e.prototype,"update",function(b){this.dataGroup?a.error(24):b.apply(this,[].slice.call(arguments,1))});f(k.prototype,"tooltipFooterHeaderFormatter",function(b,c,d){var e=c.series,f=e.tooltipOptions,n=e.options.dataGrouping,k=f.xDateFormat,h,g=e.xAxis,l=a.dateFormat;return g&&"datetime"===g.options.type&&n&&v(c.key)?(b=e.currentDataGrouping,n=n.dateTimeLabelFormats,b?(g=n[b.unitName],1===b.count?k=g[0]:(k=g[1],h=g[2])):
!k&&n&&(k=this.getXDateFormat(c,f,g)),k=l(k,c.key),h&&(k+=l(h,c.key+b.totalRange-1)),t(f[(d?"footer":"header")+"Format"],{point:p(c.point,{key:k}),series:e})):b.call(this,c,d)});d.destroy=function(){for(var a=this.groupedData||[],d=a.length;d--;)a[d]&&a[d].destroy();c.apply(this)};f(d,"setOptions",function(a,c){a=a.call(this,c);var b=this.type,d=this.chart.options.plotOptions,e=E[b].dataGrouping;I[b]&&(e||(e=u(q,I[b])),a.dataGrouping=u(e,d.series&&d.series.dataGrouping,d[b].dataGrouping,c.dataGrouping));
this.chart.options.isStock&&(this.requireSorting=!0);return a});f(G.prototype,"setScale",function(a){a.call(this);g(this.series,function(a){a.hasProcessed=!1})});G.prototype.getGroupPixelWidth=function(){var a=this.series,c=a.length,d,e=0,f=!1,n;for(d=c;d--;)(n=a[d].options.dataGrouping)&&(e=Math.max(e,n.groupPixelWidth));for(d=c;d--;)(n=a[d].options.dataGrouping)&&a[d].hasProcessed&&(c=(a[d].processedXData||a[d].data).length,a[d].groupPixelWidth||c>this.chart.plotSizeX/e||c&&n.forced)&&(f=!0);return f?
e:0};G.prototype.setDataGrouping=function(a,c){var b;c=l(c,!0);a||(a={forced:!1,units:null});if(this instanceof G)for(b=this.series.length;b--;)this.series[b].update({dataGrouping:a},!1);else g(this.chart.options.series,function(b){b.dataGrouping=a},!1);c&&this.chart.redraw()}})(M);(function(a){var D=a.each,B=a.Point,G=a.seriesType,E=a.seriesTypes;G("ohlc","column",{lineWidth:1,tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eOpen: {point.open}\x3cbr/\x3eHigh: {point.high}\x3cbr/\x3eLow: {point.low}\x3cbr/\x3eClose: {point.close}\x3cbr/\x3e'},
threshold:null,states:{hover:{lineWidth:3}},stickyTracking:!0},{directTouch:!1,pointArrayMap:["open","high","low","close"],toYData:function(a){return[a.open,a.high,a.low,a.close]},pointValKey:"close",pointAttrToOptions:{stroke:"color","stroke-width":"lineWidth"},pointAttribs:function(a,g){g=E.column.prototype.pointAttribs.call(this,a,g);var p=this.options;delete g.fill;!a.options.color&&p.upColor&&a.open<a.close&&(g.stroke=p.upColor);return g},translate:function(){var a=this,g=a.yAxis,p=!!a.modifyValue,
t=["plotOpen","plotHigh","plotLow","plotClose","yBottom"];E.column.prototype.translate.apply(a);D(a.points,function(r){D([r.open,r.high,r.low,r.close,r.low],function(u,l){null!==u&&(p&&(u=a.modifyValue(u)),r[t[l]]=g.toPixels(u,!0))});r.tooltipPos[1]=r.plotHigh+g.pos-a.chart.plotTop})},drawPoints:function(){var a=this,g=a.chart;D(a.points,function(p){var r,v,u,l,e=p.graphic,k,f=!e;void 0!==p.plotY&&(e||(p.graphic=e=g.renderer.path().add(a.group)),e.attr(a.pointAttribs(p,p.selected&&"select")),v=e.strokeWidth()%
2/2,k=Math.round(p.plotX)-v,u=Math.round(p.shapeArgs.width/2),l=["M",k,Math.round(p.yBottom),"L",k,Math.round(p.plotHigh)],null!==p.open&&(r=Math.round(p.plotOpen)+v,l.push("M",k,r,"L",k-u,r)),null!==p.close&&(r=Math.round(p.plotClose)+v,l.push("M",k,r,"L",k+u,r)),e[f?"attr":"animate"]({d:l}).addClass(p.getClassName(),!0))})},animate:null},{getClassName:function(){return B.prototype.getClassName.call(this)+(this.open<this.close?" highcharts-point-up":" highcharts-point-down")}})})(M);(function(a){var D=
a.defaultPlotOptions,B=a.each,G=a.merge,E=a.seriesType,r=a.seriesTypes;E("candlestick","ohlc",G(D.column,{states:{hover:{lineWidth:2}},tooltip:D.ohlc.tooltip,threshold:null,lineColor:"#000000",lineWidth:1,upColor:"#ffffff",stickyTracking:!0}),{pointAttribs:function(a,p){var g=r.column.prototype.pointAttribs.call(this,a,p),v=this.options,u=a.open<a.close,l=v.lineColor||this.color;g["stroke-width"]=v.lineWidth;g.fill=a.options.color||(u?v.upColor||this.color:this.color);g.stroke=a.lineColor||(u?v.upLineColor||
l:l);p&&(a=v.states[p],g.fill=a.color||g.fill,g.stroke=a.lineColor||g.stroke,g["stroke-width"]=a.lineWidth||g["stroke-width"]);return g},drawPoints:function(){var a=this,p=a.chart;B(a.points,function(g){var r=g.graphic,u,l,e,k,f,d,t,C=!r;void 0!==g.plotY&&(r||(g.graphic=r=p.renderer.path().add(a.group)),r.attr(a.pointAttribs(g,g.selected&&"select")).shadow(a.options.shadow),f=r.strokeWidth()%2/2,d=Math.round(g.plotX)-f,u=g.plotOpen,l=g.plotClose,e=Math.min(u,l),u=Math.max(u,l),t=Math.round(g.shapeArgs.width/
2),l=Math.round(e)!==Math.round(g.plotHigh),k=u!==g.yBottom,e=Math.round(e)+f,u=Math.round(u)+f,f=[],f.push("M",d-t,u,"L",d-t,e,"L",d+t,e,"L",d+t,u,"Z","M",d,e,"L",d,l?Math.round(g.plotHigh):e,"M",d,u,"L",d,k?Math.round(g.yBottom):u),r[C?"attr":"animate"]({d:f}).addClass(g.getClassName(),!0))})}})})(M);(function(a){var D=a.addEvent,B=a.each,G=a.merge,E=a.noop,r=a.Renderer,g=a.seriesType,p=a.seriesTypes,t=a.TrackerMixin,v=a.VMLRenderer,u=a.SVGRenderer.prototype.symbols,l=a.stableSort;g("flags","column",
{pointRange:0,shape:"flag",stackDistance:12,textAlign:"center",tooltip:{pointFormat:"{point.text}\x3cbr/\x3e"},threshold:null,y:-30,fillColor:"#ffffff",lineWidth:1,states:{hover:{lineColor:"#000000",fillColor:"#ccd6eb"}},style:{fontSize:"11px",fontWeight:"bold"}},{sorted:!1,noSharedTooltip:!0,allowDG:!1,takeOrdinalPosition:!1,trackerGroups:["markerGroup"],forceCrop:!0,init:a.Series.prototype.init,pointAttribs:function(a,k){var e=this.options,d=a&&a.color||this.color,g=e.lineColor,l=a&&a.lineWidth;
a=a&&a.fillColor||e.fillColor;k&&(a=e.states[k].fillColor,g=e.states[k].lineColor,l=e.states[k].lineWidth);return{fill:a||d,stroke:g||d,"stroke-width":l||e.lineWidth||0}},translate:function(){p.column.prototype.translate.apply(this);var a=this.options,k=this.chart,f=this.points,d=f.length-1,g,r,c=a.onSeries;g=c&&k.get(c);var a=a.onKey||"y",c=g&&g.options.step,q=g&&g.points,t=q&&q.length,m=this.xAxis,u=this.yAxis,b=m.getExtremes(),z=0,v,y,A;if(g&&g.visible&&t)for(z=(g.pointXOffset||0)+(g.barW||0)/
2,g=g.currentDataGrouping,y=q[t-1].x+(g?g.totalRange:0),l(f,function(a,b){return a.x-b.x}),a="plot"+a[0].toUpperCase()+a.substr(1);t--&&f[d]&&!(g=f[d],v=q[t],v.x<=g.x&&void 0!==v[a]&&(g.x<=y&&(g.plotY=v[a],v.x<g.x&&!c&&(A=q[t+1])&&void 0!==A[a]&&(g.plotY+=(g.x-v.x)/(A.x-v.x)*(A[a]-v[a]))),d--,t++,0>d)););B(f,function(a,c){var d;void 0===a.plotY&&(a.x>=b.min&&a.x<=b.max?a.plotY=k.chartHeight-m.bottom-(m.opposite?m.height:0)+m.offset-u.top:a.shapeArgs={});a.plotX+=z;(r=f[c-1])&&r.plotX===a.plotX&&(void 0===
r.stackIndex&&(r.stackIndex=0),d=r.stackIndex+1);a.stackIndex=d})},drawPoints:function(){var e=this.points,g=this.chart,f=g.renderer,d,l,p=this.options,c=p.y,q,r,m,t,b,u,v,y=this.yAxis;for(r=e.length;r--;)m=e[r],v=m.plotX>this.xAxis.len,d=m.plotX,t=m.stackIndex,q=m.options.shape||p.shape,l=m.plotY,void 0!==l&&(l=m.plotY+c-(void 0!==t&&t*p.stackDistance)),b=t?void 0:m.plotX,u=t?void 0:m.plotY,t=m.graphic,void 0!==l&&0<=d&&!v?(t||(t=m.graphic=f.label("",null,null,q,null,null,p.useHTML).attr(this.pointAttribs(m)).css(G(p.style,
m.style)).attr({align:"flag"===q?"left":"center",width:p.width,height:p.height,"text-align":p.textAlign}).addClass("highcharts-point").add(this.markerGroup),m.graphic.div&&(m.graphic.div.point=m),t.shadow(p.shadow)),0<d&&(d-=t.strokeWidth()%2),t.attr({text:m.options.title||p.title||"A",x:d,y:l,anchorX:b,anchorY:u}),m.tooltipPos=g.inverted?[y.len+y.pos-g.plotLeft-l,this.xAxis.len-d]:[d,l+y.pos-g.plotTop]):t&&(m.graphic=t.destroy());p.useHTML&&a.wrap(this.markerGroup,"on",function(b){return a.SVGElement.prototype.on.apply(b.apply(this,
[].slice.call(arguments,1)),[].slice.call(arguments,1))})},drawTracker:function(){var a=this.points;t.drawTrackerPoint.apply(this);B(a,function(e){var f=e.graphic;f&&D(f.element,"mouseover",function(){0<e.stackIndex&&!e.raised&&(e._y=f.y,f.attr({y:e._y-8}),e.raised=!0);B(a,function(a){a!==e&&a.raised&&a.graphic&&(a.graphic.attr({y:a._y}),a.raised=!1)})})})},animate:E,buildKDTree:E,setClip:E});u.flag=function(a,g,f,d,l){return["M",l&&l.anchorX||a,l&&l.anchorY||g,"L",a,g+d,a,g,a+f,g,a+f,g+d,a,g+d,"Z"]};
B(["circle","square"],function(a){u[a+"pin"]=function(e,f,d,g,l){var c=l&&l.anchorX;l=l&&l.anchorY;"circle"===a&&g>d&&(e-=Math.round((g-d)/2),d=g);e=u[a](e,f,d,g);c&&l&&e.push("M",c,f>l?f:f+g,"L",c,l);return e}});r===v&&B(["flag","circlepin","squarepin"],function(a){v.prototype.symbols[a]=u[a]})})(M);(function(a){function D(a,d,e){this.init(a,d,e)}var B=a.addEvent,G=a.Axis,E=a.correctFloat,r=a.defaultOptions,g=a.defined,p=a.destroyObjectProperties,t=a.each,v=a.fireEvent,u=a.hasTouch,l=a.isTouchDevice,
e=a.merge,k=a.pick,f=a.removeEvent,d=a.wrap,x,C={height:l?20:14,barBorderRadius:0,buttonBorderRadius:0,liveRedraw:a.svg&&!l,margin:10,minWidth:6,step:.2,zIndex:3,barBackgroundColor:"#cccccc",barBorderWidth:1,barBorderColor:"#cccccc",buttonArrowColor:"#333333",buttonBackgroundColor:"#e6e6e6",buttonBorderColor:"#cccccc",buttonBorderWidth:1,rifleColor:"#333333",trackBackgroundColor:"#f2f2f2",trackBorderColor:"#f2f2f2",trackBorderWidth:1};r.scrollbar=e(!0,C,r.scrollbar);a.swapXY=x=function(a,d){var c=
a.length,e;if(d)for(d=0;d<c;d+=3)e=a[d+1],a[d+1]=a[d+2],a[d+2]=e;return a};D.prototype={init:function(a,d,f){this.scrollbarButtons=[];this.renderer=a;this.userOptions=d;this.options=e(C,d);this.chart=f;this.size=k(this.options.size,this.options.height);d.enabled&&(this.render(),this.initEvents(),this.addEvents())},render:function(){var a=this.renderer,d=this.options,e=this.size,f;this.group=f=a.g("scrollbar").attr({zIndex:d.zIndex,translateY:-99999}).add();this.track=a.rect().addClass("highcharts-scrollbar-track").attr({x:0,
r:d.trackBorderRadius||0,height:e,width:e}).add(f);this.track.attr({fill:d.trackBackgroundColor,stroke:d.trackBorderColor,"stroke-width":d.trackBorderWidth});this.trackBorderWidth=this.track.strokeWidth();this.track.attr({y:-this.trackBorderWidth%2/2});this.scrollbarGroup=a.g().add(f);this.scrollbar=a.rect().addClass("highcharts-scrollbar-thumb").attr({height:e,width:e,r:d.barBorderRadius||0}).add(this.scrollbarGroup);this.scrollbarRifles=a.path(x(["M",-3,e/4,"L",-3,2*e/3,"M",0,e/4,"L",0,2*e/3,"M",
3,e/4,"L",3,2*e/3],d.vertical)).addClass("highcharts-scrollbar-rifles").add(this.scrollbarGroup);this.scrollbar.attr({fill:d.barBackgroundColor,stroke:d.barBorderColor,"stroke-width":d.barBorderWidth});this.scrollbarRifles.attr({stroke:d.rifleColor,"stroke-width":1});this.scrollbarStrokeWidth=this.scrollbar.strokeWidth();this.scrollbarGroup.translate(-this.scrollbarStrokeWidth%2/2,-this.scrollbarStrokeWidth%2/2);this.drawScrollbarButton(0);this.drawScrollbarButton(1)},position:function(a,d,e,f){var c=
this.options.vertical,b=0,g=this.rendered?"animate":"attr";this.x=a;this.y=d+this.trackBorderWidth;this.width=e;this.xOffset=this.height=f;this.yOffset=b;c?(this.width=this.yOffset=e=b=this.size,this.xOffset=d=0,this.barWidth=f-2*e,this.x=a+=this.options.margin):(this.height=this.xOffset=f=d=this.size,this.barWidth=e-2*f,this.y+=this.options.margin);this.group[g]({translateX:a,translateY:this.y});this.track[g]({width:e,height:f});this.scrollbarButtons[1][g]({translateX:c?0:e-d,translateY:c?f-b:0})},
drawScrollbarButton:function(a){var c=this.renderer,d=this.scrollbarButtons,e=this.options,f=this.size,b;b=c.g().add(this.group);d.push(b);b=c.rect().addClass("highcharts-scrollbar-button").add(b);b.attr({stroke:e.buttonBorderColor,"stroke-width":e.buttonBorderWidth,fill:e.buttonBackgroundColor});b.attr(b.crisp({x:-.5,y:-.5,width:f+1,height:f+1,r:e.buttonBorderRadius},b.strokeWidth()));b=c.path(x(["M",f/2+(a?-1:1),f/2-3,"L",f/2+(a?-1:1),f/2+3,"L",f/2+(a?2:-2),f/2],e.vertical)).addClass("highcharts-scrollbar-arrow").add(d[a]);
b.attr({fill:e.buttonArrowColor})},setRange:function(a,d){var c=this.options,e=c.vertical,f=c.minWidth,b=this.barWidth,k,l,p=this.rendered&&!this.hasDragged?"animate":"attr";g(b)&&(a=Math.max(a,0),k=Math.ceil(b*a),this.calculatedWidth=l=E(b*Math.min(d,1)-k),l<f&&(k=(b-f+l)*a,l=f),f=Math.floor(k+this.xOffset+this.yOffset),b=l/2-.5,this.from=a,this.to=d,e?(this.scrollbarGroup[p]({translateY:f}),this.scrollbar[p]({height:l}),this.scrollbarRifles[p]({translateY:b}),this.scrollbarTop=f,this.scrollbarLeft=
0):(this.scrollbarGroup[p]({translateX:f}),this.scrollbar[p]({width:l}),this.scrollbarRifles[p]({translateX:b}),this.scrollbarLeft=f,this.scrollbarTop=0),12>=l?this.scrollbarRifles.hide():this.scrollbarRifles.show(!0),!1===c.showFull&&(0>=a&&1<=d?this.group.hide():this.group.show()),this.rendered=!0)},initEvents:function(){var a=this;a.mouseMoveHandler=function(c){var d=a.chart.pointer.normalize(c),e=a.options.vertical?"chartY":"chartX",f=a.initPositions;!a.grabbedCenter||c.touches&&0===c.touches[0][e]||
(d=a.cursorToScrollbarPosition(d)[e],e=a[e],e=d-e,a.hasDragged=!0,a.updatePosition(f[0]+e,f[1]+e),a.hasDragged&&v(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMType:c.type,DOMEvent:c}))};a.mouseUpHandler=function(c){a.hasDragged&&v(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMType:c.type,DOMEvent:c});a.grabbedCenter=a.hasDragged=a.chartX=a.chartY=null};a.mouseDownHandler=function(c){c=a.chart.pointer.normalize(c);c=a.cursorToScrollbarPosition(c);a.chartX=c.chartX;a.chartY=c.chartY;
a.initPositions=[a.from,a.to];a.grabbedCenter=!0};a.buttonToMinClick=function(c){var d=E(a.to-a.from)*a.options.step;a.updatePosition(E(a.from-d),E(a.to-d));v(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMEvent:c})};a.buttonToMaxClick=function(c){var d=(a.to-a.from)*a.options.step;a.updatePosition(a.from+d,a.to+d);v(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMEvent:c})};a.trackClick=function(c){var d=a.chart.pointer.normalize(c),e=a.to-a.from,f=a.y+a.scrollbarTop,b=a.x+a.scrollbarLeft;
a.options.vertical&&d.chartY>f||!a.options.vertical&&d.chartX>b?a.updatePosition(a.from+e,a.to+e):a.updatePosition(a.from-e,a.to-e);v(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMEvent:c})}},cursorToScrollbarPosition:function(a){var c=this.options,c=c.minWidth>this.calculatedWidth?c.minWidth:0;return{chartX:(a.chartX-this.x-this.xOffset)/(this.barWidth-c),chartY:(a.chartY-this.y-this.yOffset)/(this.barWidth-c)}},updatePosition:function(a,d){1<d&&(a=E(1-E(d-a)),d=1);0>a&&(d=E(d-a),a=0);
this.from=a;this.to=d},update:function(a){this.destroy();this.init(this.chart.renderer,e(!0,this.options,a),this.chart)},addEvents:function(){var a=this.options.inverted?[1,0]:[0,1],d=this.scrollbarButtons,e=this.scrollbarGroup.element,f=this.mouseDownHandler,g=this.mouseMoveHandler,b=this.mouseUpHandler,a=[[d[a[0]].element,"click",this.buttonToMinClick],[d[a[1]].element,"click",this.buttonToMaxClick],[this.track.element,"click",this.trackClick],[e,"mousedown",f],[e.ownerDocument,"mousemove",g],[e.ownerDocument,
"mouseup",b]];u&&a.push([e,"touchstart",f],[e.ownerDocument,"touchmove",g],[e.ownerDocument,"touchend",b]);t(a,function(a){B.apply(null,a)});this._events=a},removeEvents:function(){t(this._events,function(a){f.apply(null,a)});this._events.length=0},destroy:function(){var a=this.chart.scroller;this.removeEvents();t(["track","scrollbarRifles","scrollbar","scrollbarGroup","group"],function(a){this[a]&&this[a].destroy&&(this[a]=this[a].destroy())},this);a&&this===a.scrollbar&&(a.scrollbar=null,p(a.scrollbarButtons))}};
d(G.prototype,"init",function(a){var c=this;a.apply(c,Array.prototype.slice.call(arguments,1));c.options.scrollbar&&c.options.scrollbar.enabled&&(c.options.scrollbar.vertical=!c.horiz,c.options.startOnTick=c.options.endOnTick=!1,c.scrollbar=new D(c.chart.renderer,c.options.scrollbar,c.chart),B(c.scrollbar,"changed",function(a){var d=Math.min(k(c.options.min,c.min),c.min,c.dataMin),e=Math.max(k(c.options.max,c.max),c.max,c.dataMax)-d,b;c.horiz&&!c.reversed||!c.horiz&&c.reversed?(b=d+e*this.to,d+=e*
this.from):(b=d+e*(1-this.from),d+=e*(1-this.to));c.setExtremes(d,b,!0,!1,a)}))});d(G.prototype,"render",function(a){var c=Math.min(k(this.options.min,this.min),this.min,k(this.dataMin,this.min)),d=Math.max(k(this.options.max,this.max),this.max,k(this.dataMax,this.max)),e=this.scrollbar,f=this.titleOffset||0;a.apply(this,Array.prototype.slice.call(arguments,1));if(e){this.horiz?(e.position(this.left,this.top+this.height+2+this.chart.scrollbarsOffsets[1]+(this.opposite?0:f+this.axisTitleMargin+this.offset),
this.width,this.height),f=1):(e.position(this.left+this.width+2+this.chart.scrollbarsOffsets[0]+(this.opposite?f+this.axisTitleMargin+this.offset:0),this.top,this.width,this.height),f=0);if(!this.opposite&&!this.horiz||this.opposite&&this.horiz)this.chart.scrollbarsOffsets[f]+=this.scrollbar.size+this.scrollbar.options.margin;isNaN(c)||isNaN(d)||!g(this.min)||!g(this.max)?e.setRange(0,0):(f=(this.min-c)/(d-c),c=(this.max-c)/(d-c),this.horiz&&!this.reversed||!this.horiz&&this.reversed?e.setRange(f,
c):e.setRange(1-c,1-f))}});d(G.prototype,"getOffset",function(a){var c=this.horiz?2:1,d=this.scrollbar;a.apply(this,Array.prototype.slice.call(arguments,1));d&&(this.chart.scrollbarsOffsets=[0,0],this.chart.axisOffset[c]+=d.size+d.options.margin)});d(G.prototype,"destroy",function(a){this.scrollbar&&(this.scrollbar=this.scrollbar.destroy());a.apply(this,Array.prototype.slice.call(arguments,1))});a.Scrollbar=D})(M);(function(a){function D(a){this.init(a)}var B=a.addEvent,G=a.Axis,E=a.Chart,r=a.color,
g=a.defaultOptions,p=a.defined,t=a.destroyObjectProperties,v=a.each,u=a.erase,l=a.error,e=a.extend,k=a.grep,f=a.hasTouch,d=a.isArray,x=a.isNumber,C=a.isObject,c=a.merge,q=a.pick,I=a.removeEvent,m=a.Scrollbar,J=a.Series,b=a.seriesTypes,z=a.wrap,K=a.swapXY,y=[].concat(a.defaultDataGroupingUnits),A=function(a){var b=k(arguments,x);if(b.length)return Math[a].apply(0,b)};y[4]=["day",[1,2,3,4]];y[5]=["week",[1,2,3]];b=void 0===b.areaspline?"line":"areaspline";e(g,{navigator:{height:40,margin:25,maskInside:!0,
handles:{backgroundColor:"#f2f2f2",borderColor:"#999999"},maskFill:r("#6685c2").setOpacity(.3).get(),outlineColor:"#cccccc",outlineWidth:1,series:{type:b,color:"#335cad",fillOpacity:.05,lineWidth:1,compare:null,dataGrouping:{approximation:"average",enabled:!0,groupPixelWidth:2,smoothed:!0,units:y},dataLabels:{enabled:!1,zIndex:2},id:"highcharts-navigator-series",className:"highcharts-navigator-series",lineColor:null,marker:{enabled:!1},pointRange:0,shadow:!1,threshold:null},xAxis:{className:"highcharts-navigator-xaxis",
tickLength:0,lineWidth:0,gridLineColor:"#e6e6e6",gridLineWidth:1,tickPixelInterval:200,labels:{align:"left",style:{color:"#999999"},x:3,y:-4},crosshair:!1},yAxis:{className:"highcharts-navigator-yaxis",gridLineWidth:0,startOnTick:!1,endOnTick:!1,minPadding:.1,maxPadding:.1,labels:{enabled:!1},crosshair:!1,title:{text:null},tickLength:0,tickWidth:0}}});D.prototype={drawHandle:function(a,b,c,d){this.handles[b][d](c?{translateX:Math.round(this.left+this.height/2-8),translateY:Math.round(this.top+parseInt(a,
10)+.5)}:{translateX:Math.round(this.left+parseInt(a,10)),translateY:Math.round(this.top+this.height/2-8)})},getHandlePath:function(a){return K(["M",-4.5,.5,"L",3.5,.5,"L",3.5,15.5,"L",-4.5,15.5,"L",-4.5,.5,"M",-1.5,4,"L",-1.5,12,"M",.5,4,"L",.5,12],a)},drawOutline:function(a,b,c,d){var e=this.navigatorOptions.maskInside,h=this.outline.strokeWidth(),f=h/2,h=h%2/2,g=this.outlineHeight,n=this.scrollbarHeight,k=this.size,l=this.left-n,m=this.top;c?(l-=f,c=m+b+h,b=m+a+h,a=["M",l+g,m-n-h,"L",l+g,c,"L",
l,c,"L",l,b,"L",l+g,b,"L",l+g,m+k+n].concat(e?["M",l+g,c-f,"L",l+g,b+f]:[])):(a+=l+n-h,b+=l+n-h,m+=f,a=["M",l,m,"L",a,m,"L",a,m+g,"L",b,m+g,"L",b,m,"L",l+k+2*n,m].concat(e?["M",a-f,m,"L",b+f,m]:[]));this.outline[d]({d:a})},drawMasks:function(a,b,c,d){var e=this.left,h=this.top,f=this.height,g,n,k,l;c?(k=[e,e,e],l=[h,h+a,h+b],n=[f,f,f],g=[a,b-a,this.size-b]):(k=[e,e+a,e+b],l=[h,h,h],n=[a,b-a,this.size-b],g=[f,f,f]);v(this.shades,function(a,b){a[d]({x:k[b],y:l[b],width:n[b],height:g[b]})})},renderElements:function(){var a=
this,b=a.navigatorOptions,c=b.maskInside,d=a.chart,e=d.inverted,f=d.renderer,g;a.navigatorGroup=g=f.g("navigator").attr({zIndex:8,visibility:"hidden"}).add();var k={cursor:e?"ns-resize":"ew-resize"};v([!c,c,!c],function(c,d){a.shades[d]=f.rect().addClass("highcharts-navigator-mask"+(1===d?"-inside":"-outside")).attr({fill:c?b.maskFill:"rgba(0,0,0,0)"}).css(1===d&&k).add(g)});a.outline=f.path().addClass("highcharts-navigator-outline").attr({"stroke-width":b.outlineWidth,stroke:b.outlineColor}).add(g);
v([0,1],function(c){a.handles[c]=f.path(a.getHandlePath(e)).attr({zIndex:7-c}).addClass("highcharts-navigator-handle highcharts-navigator-handle-"+["left","right"][c]).add(g);var d=b.handles;a.handles[c].attr({fill:d.backgroundColor,stroke:d.borderColor,"stroke-width":1}).css(k)})},update:function(a){v(this.series||[],function(a){a.baseSeries&&delete a.baseSeries.navigatorSeries});this.destroy();c(!0,this.chart.options.navigator,this.options,a);this.init(this.chart)},render:function(a,b,c,d){var e=
this.chart,h,f,g=this.scrollbarHeight,n,k=this.xAxis;h=k.fake?e.xAxis[0]:k;var l=this.navigatorEnabled,m,r=this.rendered;f=e.inverted;var w=e.xAxis[0].minRange;if(!this.hasDragged||p(c)){if(!x(a)||!x(b))if(r)c=0,d=k.width;else return;this.left=q(k.left,e.plotLeft+g+(f?e.plotWidth:0));this.size=m=n=q(k.len,(f?e.plotHeight:e.plotWidth)-2*g);e=f?g:n+2*g;c=q(c,k.toPixels(a,!0));d=q(d,k.toPixels(b,!0));x(c)&&Infinity!==Math.abs(c)||(c=0,d=e);a=k.toValue(c,!0);b=k.toValue(d,!0);if(Math.abs(b-a)<w)if(this.grabbedLeft)c=
k.toPixels(b-w,!0);else if(this.grabbedRight)d=k.toPixels(a+w,!0);else return;this.zoomedMax=Math.min(Math.max(c,d,0),m);this.zoomedMin=Math.min(Math.max(this.fixedWidth?this.zoomedMax-this.fixedWidth:Math.min(c,d),0),m);this.range=this.zoomedMax-this.zoomedMin;m=Math.round(this.zoomedMax);c=Math.round(this.zoomedMin);l&&(this.navigatorGroup.attr({visibility:"visible"}),r=r&&!this.hasDragged?"animate":"attr",this.drawMasks(c,m,f,r),this.drawOutline(c,m,f,r),this.drawHandle(c,0,f,r),this.drawHandle(m,
1,f,r));this.scrollbar&&(f?(f=this.top-g,h=this.left-g+(l||!h.opposite?0:(h.titleOffset||0)+h.axisTitleMargin),g=n+2*g):(f=this.top+(l?this.height:-g),h=this.left-g),this.scrollbar.position(h,f,e,g),this.scrollbar.setRange(this.zoomedMin/n,this.zoomedMax/n));this.rendered=!0}},addMouseEvents:function(){var a=this,b=a.chart,c=b.container,d=[],e,g;a.mouseMoveHandler=e=function(b){a.onMouseMove(b)};a.mouseUpHandler=g=function(b){a.onMouseUp(b)};d=a.getPartsEvents("mousedown");d.push(B(c,"mousemove",
e),B(c.ownerDocument,"mouseup",g));f&&(d.push(B(c,"touchmove",e),B(c.ownerDocument,"touchend",g)),d.concat(a.getPartsEvents("touchstart")));a.eventsToUnbind=d;a.series&&a.series[0]&&d.push(B(a.series[0].xAxis,"foundExtremes",function(){b.navigator.modifyNavigatorAxisExtremes()}))},getPartsEvents:function(a){var b=this,c=[];v(["shades","handles"],function(d){v(b[d],function(e,f){c.push(B(e.element,a,function(a){b[d+"Mousedown"](a,f)}))})});return c},shadesMousedown:function(a,b){a=this.chart.pointer.normalize(a);
var c=this.chart,d=this.xAxis,e=this.zoomedMin,f=this.left,g=this.size,k=this.range,n=a.chartX,l;c.inverted&&(n=a.chartY,f=this.top);1===b?(this.grabbedCenter=n,this.fixedWidth=k,this.dragOffset=n-e):(a=n-f-k/2,0===b?a=Math.max(0,a):2===b&&a+k>=g&&(a=g-k,l=this.getUnionExtremes().dataMax),a!==e&&(this.fixedWidth=k,b=d.toFixedRange(a,a+k,null,l),c.xAxis[0].setExtremes(Math.min(b.min,b.max),Math.max(b.min,b.max),!0,null,{trigger:"navigator"})))},handlesMousedown:function(a,b){this.chart.pointer.normalize(a);
a=this.chart;var c=a.xAxis[0],d=a.inverted&&!c.reversed||!a.inverted&&c.reversed;0===b?(this.grabbedLeft=!0,this.otherHandlePos=this.zoomedMax,this.fixedExtreme=d?c.min:c.max):(this.grabbedRight=!0,this.otherHandlePos=this.zoomedMin,this.fixedExtreme=d?c.max:c.min);a.fixedRange=null},onMouseMove:function(a){var b=this,c=b.chart,d=b.left,e=b.navigatorSize,f=b.range,g=b.dragOffset,k=c.inverted;a.touches&&0===a.touches[0].pageX||(a=c.pointer.normalize(a),c=a.chartX,k&&(d=b.top,c=a.chartY),b.grabbedLeft?
(b.hasDragged=!0,b.render(0,0,c-d,b.otherHandlePos)):b.grabbedRight?(b.hasDragged=!0,b.render(0,0,b.otherHandlePos,c-d)):b.grabbedCenter&&(b.hasDragged=!0,c<g?c=g:c>e+g-f&&(c=e+g-f),b.render(0,0,c-g,c-g+f)),b.hasDragged&&b.scrollbar&&b.scrollbar.options.liveRedraw&&(a.DOMType=a.type,setTimeout(function(){b.onMouseUp(a)},0)))},onMouseUp:function(a){var b=this.chart,c=this.xAxis,d=this.scrollbar,e,f,g=a.DOMEvent||a;(!this.hasDragged||d&&d.hasDragged)&&"scrollbar"!==a.trigger||(this.zoomedMin===this.otherHandlePos?
e=this.fixedExtreme:this.zoomedMax===this.otherHandlePos&&(f=this.fixedExtreme),this.zoomedMax===this.size&&(f=this.getUnionExtremes().dataMax),c=c.toFixedRange(this.zoomedMin,this.zoomedMax,e,f),p(c.min)&&b.xAxis[0].setExtremes(Math.min(c.min,c.max),Math.max(c.min,c.max),!0,this.hasDragged?!1:null,{trigger:"navigator",triggerOp:"navigator-drag",DOMEvent:g}));"mousemove"!==a.DOMType&&(this.grabbedLeft=this.grabbedRight=this.grabbedCenter=this.fixedWidth=this.fixedExtreme=this.otherHandlePos=this.hasDragged=
this.dragOffset=null)},removeEvents:function(){this.eventsToUnbind&&(v(this.eventsToUnbind,function(a){a()}),this.eventsToUnbind=void 0);this.removeBaseSeriesEvents()},removeBaseSeriesEvents:function(){var a=this.baseSeries||[];this.navigatorEnabled&&a[0]&&(!1!==this.navigatorOptions.adaptToUpdatedData&&v(a,function(a){I(a,"updatedData",this.updatedDataHandler)},this),a[0].xAxis&&I(a[0].xAxis,"foundExtremes",this.modifyBaseAxisExtremes))},init:function(a){var b=a.options,d=b.navigator,e=d.enabled,
f=b.scrollbar,g=f.enabled,b=e?d.height:0,k=g?f.height:0;this.handles=[];this.shades=[];this.chart=a;this.setBaseSeries();this.height=b;this.scrollbarHeight=k;this.scrollbarEnabled=g;this.navigatorEnabled=e;this.navigatorOptions=d;this.scrollbarOptions=f;this.outlineHeight=b+k;this.opposite=q(d.opposite,!e&&a.inverted);var n=this,f=n.baseSeries,g=a.xAxis.length,l=a.yAxis.length,p=f&&f[0]&&f[0].xAxis||a.xAxis[0];a.extraMargin={type:n.opposite?"plotTop":"marginBottom",value:(e||!a.inverted?n.outlineHeight:
0)+d.margin};a.inverted&&(a.extraMargin.type=n.opposite?"marginRight":"plotLeft");a.isDirtyBox=!0;n.navigatorEnabled?(n.xAxis=new G(a,c({breaks:p.options.breaks,ordinal:p.options.ordinal},d.xAxis,{id:"navigator-x-axis",yAxis:"navigator-y-axis",isX:!0,type:"datetime",index:g,offset:0,keepOrdinalPadding:!0,startOnTick:!1,endOnTick:!1,minPadding:0,maxPadding:0,zoomEnabled:!1},a.inverted?{offsets:[k,0,-k,0],width:b}:{offsets:[0,-k,0,k],height:b})),n.yAxis=new G(a,c(d.yAxis,{id:"navigator-y-axis",alignTicks:!1,
offset:0,index:l,zoomEnabled:!1},a.inverted?{width:b}:{height:b})),f||d.series.data?n.updateNavigatorSeries():0===a.series.length&&z(a,"redraw",function(b,c){0<a.series.length&&!n.series&&(n.setBaseSeries(),a.redraw=b);b.call(a,c)}),n.renderElements(),n.addMouseEvents()):n.xAxis={translate:function(b,c){var d=a.xAxis[0],e=d.getExtremes(),f=d.len-2*k,h=A("min",d.options.min,e.dataMin),d=A("max",d.options.max,e.dataMax)-h;return c?b*d/f+h:f*(b-h)/d},toPixels:function(a){return this.translate(a)},toValue:function(a){return this.translate(a,
!0)},toFixedRange:G.prototype.toFixedRange,fake:!0};a.options.scrollbar.enabled&&(a.scrollbar=n.scrollbar=new m(a.renderer,c(a.options.scrollbar,{margin:n.navigatorEnabled?0:10,vertical:a.inverted}),a),B(n.scrollbar,"changed",function(b){var c=n.size,d=c*this.to,c=c*this.from;n.hasDragged=n.scrollbar.hasDragged;n.render(0,0,c,d);(a.options.scrollbar.liveRedraw||"mousemove"!==b.DOMType)&&setTimeout(function(){n.onMouseUp(b)})}));n.addBaseSeriesEvents();n.addChartEvents()},getUnionExtremes:function(a){var b=
this.chart.xAxis[0],c=this.xAxis,d=c.options,e=b.options,f;a&&null===b.dataMin||(f={dataMin:q(d&&d.min,A("min",e.min,b.dataMin,c.dataMin,c.min)),dataMax:q(d&&d.max,A("max",e.max,b.dataMax,c.dataMax,c.max))});return f},setBaseSeries:function(a){var b=this.chart,c=this.baseSeries=[];a=a||b.options&&b.options.navigator.baseSeries||0;v(b.series||[],function(b,d){b.options.isInternal||!b.options.showInNavigator&&(d!==a&&b.options.id!==a||!1===b.options.showInNavigator)||c.push(b)});this.xAxis&&!this.xAxis.fake&&
this.updateNavigatorSeries()},updateNavigatorSeries:function(){var b=this,e=b.chart,f=b.baseSeries,g,k,l=b.navigatorOptions.series,m,p={enableMouseTracking:!1,index:null,linkedTo:null,group:"nav",padXAxis:!1,xAxis:"navigator-x-axis",yAxis:"navigator-y-axis",showInLegend:!1,stacking:!1,isInternal:!0,visible:!0},q=b.series=a.grep(b.series||[],function(c){var d=c.baseSeries;return 0>a.inArray(d,f)?(d&&(I(d,"updatedData",b.updatedDataHandler),delete d.navigatorSeries),c.destroy(),!1):!0});f&&f.length&&
v(f,function(a,f){var h=a.navigatorSeries,n=d(l)?{}:l;h&&!1===b.navigatorOptions.adaptToUpdatedData||(p.name="Navigator "+(f+1),g=a.options||{},m=g.navigatorOptions||{},k=c(g,p,n,m),f=m.data||n.data,b.hasNavigatorData=b.hasNavigatorData||!!f,k.data=f||g.data&&g.data.slice(0),h?h.update(k):(a.navigatorSeries=e.initSeries(k),a.navigatorSeries.baseSeries=a,q.push(a.navigatorSeries)))});if(l.data&&(!f||!f.length)||d(l))b.hasNavigatorData=!1,l=a.splat(l),v(l,function(a,d){k=c({color:e.series[d]&&!e.series[d].options.isInternal&&
e.series[d].color||e.options.colors[d]||e.options.colors[0]},a,p);k.data=a.data;k.data&&(b.hasNavigatorData=!0,q.push(e.initSeries(k)))});this.addBaseSeriesEvents()},addBaseSeriesEvents:function(){var a=this,b=a.baseSeries||[];b[0]&&b[0].xAxis&&B(b[0].xAxis,"foundExtremes",this.modifyBaseAxisExtremes);v(b,function(b){B(b,"show",function(){this.navigatorSeries&&this.navigatorSeries.show()});B(b,"hide",function(){this.navigatorSeries&&this.navigatorSeries.hide()});!1!==this.navigatorOptions.adaptToUpdatedData&&
b.xAxis&&B(b,"updatedData",this.updatedDataHandler);B(b,"remove",function(){this.navigatorSeries&&(u(a.series,this.navigatorSeries),this.navigatorSeries.remove(!1),delete this.navigatorSeries)})},this)},modifyNavigatorAxisExtremes:function(){var a=this.xAxis,b;a.getExtremes&&(!(b=this.getUnionExtremes(!0))||b.dataMin===a.min&&b.dataMax===a.max||(a.min=b.dataMin,a.max=b.dataMax))},modifyBaseAxisExtremes:function(){var a=this.chart.navigator,b=this.getExtremes(),c=b.dataMin,d=b.dataMax,b=b.max-b.min,
e=a.stickToMin,f=a.stickToMax,g,k,l=a.series&&a.series[0],m=!!this.setExtremes;this.eventArgs&&"rangeSelectorButton"===this.eventArgs.trigger||(e&&(k=c,g=k+b),f&&(g=d,e||(k=Math.max(g-b,l&&l.xData?l.xData[0]:-Number.MAX_VALUE))),m&&(e||f)&&x(k)&&(this.min=this.userMin=k,this.max=this.userMax=g));a.stickToMin=a.stickToMax=null},updatedDataHandler:function(){var a=this.chart.navigator,b=this.navigatorSeries;a.stickToMax=Math.round(a.zoomedMax)>=Math.round(a.size);a.stickToMin=x(this.xAxis.min)&&this.xAxis.min<=
this.xData[0]&&(!this.chart.fixedRange||!a.stickToMax);b&&!a.hasNavigatorData&&(b.options.pointStart=this.xData[0],b.setData(this.options.data,!1,null,!1))},addChartEvents:function(){B(this.chart,"redraw",function(){var a=this.navigator,b=a&&(a.baseSeries&&a.baseSeries[0]&&a.baseSeries[0].xAxis||a.scrollbar&&this.xAxis[0]);b&&a.render(b.min,b.max)})},destroy:function(){this.removeEvents();this.xAxis&&(u(this.chart.xAxis,this.xAxis),u(this.chart.axes,this.xAxis));this.yAxis&&(u(this.chart.yAxis,this.yAxis),
u(this.chart.axes,this.yAxis));v(this.series||[],function(a){a.destroy&&a.destroy()});v("series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered".split(" "),function(a){this[a]&&this[a].destroy&&this[a].destroy();this[a]=null},this);v([this.handles],function(a){t(a)},this)}};a.Navigator=D;z(G.prototype,"zoom",function(a,b,c){var d=this.chart,e=d.options,f=e.chart.zoomType,h=e.navigator,e=e.rangeSelector,g;this.isXAxis&&(h&&h.enabled||e&&e.enabled)&&
("x"===f?d.resetZoomButton="blocked":"y"===f?g=!1:"xy"===f&&(d=this.previousZoom,p(b)?this.previousZoom=[this.min,this.max]:d&&(b=d[0],c=d[1],delete this.previousZoom)));return void 0!==g?g:a.call(this,b,c)});z(E.prototype,"init",function(a,b,c){B(this,"beforeRender",function(){var a=this.options;if(a.navigator.enabled||a.scrollbar.enabled)this.scroller=this.navigator=new D(this)});a.call(this,b,c)});z(E.prototype,"setChartSize",function(a){var b=this.legend,c=this.navigator,d,e,f,g;a.apply(this,
[].slice.call(arguments,1));c&&(e=b.options,f=c.xAxis,g=c.yAxis,d=c.scrollbarHeight,this.inverted?(c.left=c.opposite?this.chartWidth-d-c.height:this.spacing[3]+d,c.top=this.plotTop+d):(c.left=this.plotLeft+d,c.top=c.navigatorOptions.top||this.chartHeight-c.height-d-this.spacing[2]-("bottom"===e.verticalAlign&&e.enabled&&!e.floating?b.legendHeight+q(e.margin,10):0)),f&&g&&(this.inverted?f.options.left=g.options.left=c.left:f.options.top=g.options.top=c.top,f.setAxisSize(),g.setAxisSize()))});z(J.prototype,
"addPoint",function(a,b,c,d,e){var f=this.options.turboThreshold;f&&this.xData.length>f&&C(b,!0)&&this.chart.navigator&&l(20,!0);a.call(this,b,c,d,e)});z(E.prototype,"addSeries",function(a,b,c,d){a=a.call(this,b,!1,d);this.navigator&&this.navigator.setBaseSeries();q(c,!0)&&this.redraw();return a});z(J.prototype,"update",function(a,b,c){a.call(this,b,!1);this.chart.navigator&&!this.options.isInternal&&this.chart.navigator.setBaseSeries();q(c,!0)&&this.chart.redraw()});E.prototype.callbacks.push(function(a){var b=
a.navigator;b&&(a=a.xAxis[0].getExtremes(),b.render(a.min,a.max))})})(M);(function(a){function D(a){this.init(a)}var B=a.addEvent,G=a.Axis,E=a.Chart,r=a.css,g=a.createElement,p=a.dateFormat,t=a.defaultOptions,v=t.global.useUTC,u=a.defined,l=a.destroyObjectProperties,e=a.discardElement,k=a.each,f=a.extend,d=a.fireEvent,x=a.Date,C=a.isNumber,c=a.merge,q=a.pick,I=a.pInt,m=a.splat,J=a.wrap;f(t,{rangeSelector:{buttonTheme:{"stroke-width":0,width:28,height:18,padding:2,zIndex:7},height:35,inputPosition:{align:"right"},
labelStyle:{color:"#666666"}}});t.lang=c(t.lang,{rangeSelectorZoom:"Zoom",rangeSelectorFrom:"From",rangeSelectorTo:"To"});D.prototype={clickButton:function(a,c){var b=this,d=b.chart,e=b.buttonOptions[a],f=d.xAxis[0],g=d.scroller&&d.scroller.getUnionExtremes()||f||{},h=g.dataMin,l=g.dataMax,p,r=f&&Math.round(Math.min(f.max,q(l,f.max))),t=e.type,u,g=e._range,z,x,D,E=e.dataGrouping;if(null!==h&&null!==l){d.fixedRange=g;E&&(this.forcedDataGrouping=!0,G.prototype.setDataGrouping.call(f||{chart:this.chart},
E,!1));if("month"===t||"year"===t)f?(t={range:e,max:r,dataMin:h,dataMax:l},p=f.minFromRange.call(t),C(t.newMax)&&(r=t.newMax)):g=e;else if(g)p=Math.max(r-g,h),r=Math.min(p+g,l);else if("ytd"===t)if(f)void 0===l&&(h=Number.MAX_VALUE,l=Number.MIN_VALUE,k(d.series,function(a){a=a.xData;h=Math.min(a[0],h);l=Math.max(a[a.length-1],l)}),c=!1),r=b.getYTDExtremes(l,h,v),p=z=r.min,r=r.max;else{B(d,"beforeRender",function(){b.clickButton(a)});return}else"all"===t&&f&&(p=h,r=l);b.setSelected(a);f?f.setExtremes(p,
r,q(c,1),null,{trigger:"rangeSelectorButton",rangeSelectorButton:e}):(u=m(d.options.xAxis)[0],D=u.range,u.range=g,x=u.min,u.min=z,B(d,"load",function(){u.range=D;u.min=x}))}},setSelected:function(a){this.selected=this.options.selected=a},defaultButtons:[{type:"month",count:1,text:"1m"},{type:"month",count:3,text:"3m"},{type:"month",count:6,text:"6m"},{type:"ytd",text:"YTD"},{type:"year",count:1,text:"1y"},{type:"all",text:"All"}],init:function(a){var b=this,c=a.options.rangeSelector,e=c.buttons||
[].concat(b.defaultButtons),f=c.selected,g=function(){var a=b.minInput,c=b.maxInput;a&&a.blur&&d(a,"blur");c&&c.blur&&d(c,"blur")};b.chart=a;b.options=c;b.buttons=[];a.extraTopMargin=c.height;b.buttonOptions=e;this.unMouseDown=B(a.container,"mousedown",g);this.unResize=B(a,"resize",g);k(e,b.computeButtonRange);void 0!==f&&e[f]&&this.clickButton(f,!1);B(a,"load",function(){B(a.xAxis[0],"setExtremes",function(c){this.max-this.min!==a.fixedRange&&"rangeSelectorButton"!==c.trigger&&"updatedData"!==c.trigger&&
b.forcedDataGrouping&&this.setDataGrouping(!1,!1)})})},updateButtonStates:function(){var a=this.chart,c=a.xAxis[0],d=Math.round(c.max-c.min),e=!c.hasVisibleSeries,a=a.scroller&&a.scroller.getUnionExtremes()||c,f=a.dataMin,g=a.dataMax,a=this.getYTDExtremes(g,f,v),l=a.min,h=a.max,m=this.selected,p=C(m),q=this.options.allButtonsEnabled,r=this.buttons;k(this.buttonOptions,function(a,b){var k=a._range,n=a.type,t=a.count||1;a=r[b];var u=0;b=b===m;var w=k>g-f,y=k<c.minRange,v=!1,A=!1,k=k===d;("month"===
n||"year"===n)&&d>=864E5*{month:28,year:365}[n]*t&&d<=864E5*{month:31,year:366}[n]*t?k=!0:"ytd"===n?(k=h-l===d,v=!b):"all"===n&&(k=c.max-c.min>=g-f,A=!b&&p&&k);n=!q&&(w||y||A||e);k=b&&k||k&&!p&&!v;n?u=3:k&&(p=!0,u=2);a.state!==u&&a.setState(u)})},computeButtonRange:function(a){var b=a.type,c=a.count||1,d={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5};if(d[b])a._range=d[b]*c;else if("month"===b||"year"===b)a._range=864E5*{month:30,year:365}[b]*c},setInputValue:function(a,c){var b=
this.chart.options.rangeSelector,d=this[a+"Input"];u(c)&&(d.previousValue=d.HCTime,d.HCTime=c);d.value=p(b.inputEditDateFormat||"%Y-%m-%d",d.HCTime);this[a+"DateBox"].attr({text:p(b.inputDateFormat||"%b %e, %Y",d.HCTime)})},showInput:function(a){var b=this.inputGroup,c=this[a+"DateBox"];r(this[a+"Input"],{left:b.translateX+c.x+"px",top:b.translateY+"px",width:c.width-2+"px",height:c.height-2+"px",border:"2px solid silver"})},hideInput:function(a){r(this[a+"Input"],{border:0,width:"1px",height:"1px"});
this.setInputValue(a)},drawInput:function(a){function b(){var a=q.value,b=(m.inputDateParser||Date.parse)(a),c=e.xAxis[0],f=e.scroller&&e.scroller.xAxis?e.scroller.xAxis:c,h=f.dataMin,f=f.dataMax;b!==q.previousValue&&(q.previousValue=b,C(b)||(b=a.split("-"),b=Date.UTC(I(b[0]),I(b[1])-1,I(b[2]))),C(b)&&(v||(b+=6E4*(new Date).getTimezoneOffset()),p?b>d.maxInput.HCTime?b=void 0:b<h&&(b=h):b<d.minInput.HCTime?b=void 0:b>f&&(b=f),void 0!==b&&c.setExtremes(p?b:c.min,p?c.max:b,void 0,void 0,{trigger:"rangeSelectorInput"})))}
var d=this,e=d.chart,k=e.renderer.style||{},l=e.renderer,m=e.options.rangeSelector,h=d.div,p="min"===a,q,u,x=this.inputGroup;this[a+"Label"]=u=l.label(t.lang[p?"rangeSelectorFrom":"rangeSelectorTo"],this.inputGroup.offset).addClass("highcharts-range-label").attr({padding:2}).add(x);x.offset+=u.width+5;this[a+"DateBox"]=l=l.label("",x.offset).addClass("highcharts-range-input").attr({padding:2,width:m.inputBoxWidth||90,height:m.inputBoxHeight||17,stroke:m.inputBoxBorderColor||"#cccccc","stroke-width":1,
"text-align":"center"}).on("click",function(){d.showInput(a);d[a+"Input"].focus()}).add(x);x.offset+=l.width+(p?10:0);this[a+"Input"]=q=g("input",{name:a,className:"highcharts-range-selector",type:"text"},{top:e.plotTop+"px"},h);u.css(c(k,m.labelStyle));l.css(c({color:"#333333"},k,m.inputStyle));r(q,f({position:"absolute",border:0,width:"1px",height:"1px",padding:0,textAlign:"center",fontSize:k.fontSize,fontFamily:k.fontFamily,left:"-9em"},m.inputStyle));q.onfocus=function(){d.showInput(a)};q.onblur=
function(){d.hideInput(a)};q.onchange=b;q.onkeypress=function(a){13===a.keyCode&&b()}},getPosition:function(){var a=this.chart,c=a.options.rangeSelector,a=q((c.buttonPosition||{}).y,a.plotTop-a.axisOffset[0]-c.height);return{buttonTop:a,inputTop:a-10}},getYTDExtremes:function(a,c,d){var b=new x(a),e=b[x.hcGetFullYear]();d=d?x.UTC(e,0,1):+new x(e,0,1);c=Math.max(c||0,d);b=b.getTime();return{max:Math.min(a||b,b),min:c}},render:function(a,c){var b=this,d=b.chart,e=d.renderer,l=d.container,m=d.options,
h=m.exporting&&!1!==m.exporting.enabled&&m.navigation&&m.navigation.buttonOptions,p=m.rangeSelector,r=b.buttons,m=t.lang,v=b.div,v=b.inputGroup,z=p.buttonTheme,x=p.buttonPosition||{},B=p.inputEnabled,F=z&&z.states,C=d.plotLeft,D,E=this.getPosition(),G=b.group,I=b.rendered;!1!==p.enabled&&(I||(b.group=G=e.g("range-selector-buttons").add(),b.zoomText=e.text(m.rangeSelectorZoom,q(x.x,C),15).css(p.labelStyle).add(G),D=q(x.x,C)+b.zoomText.getBBox().width+5,k(b.buttonOptions,function(a,c){r[c]=e.button(a.text,
D,0,function(){b.clickButton(c);b.isActive=!0},z,F&&F.hover,F&&F.select,F&&F.disabled).attr({"text-align":"center"}).add(G);D+=r[c].width+q(p.buttonSpacing,5)}),!1!==B&&(b.div=v=g("div",null,{position:"relative",height:0,zIndex:1}),l.parentNode.insertBefore(v,l),b.inputGroup=v=e.g("input-group").add(),v.offset=0,b.drawInput("min"),b.drawInput("max"))),b.updateButtonStates(),G[I?"animate":"attr"]({translateY:E.buttonTop}),!1!==B&&(v.align(f({y:E.inputTop,width:v.offset,x:h&&E.inputTop<(h.y||0)+h.height-
d.spacing[0]?-40:0},p.inputPosition),!0,d.spacingBox),u(B)||(d=G.getBBox(),v[v.alignAttr.translateX<d.x+d.width+10?"hide":"show"]()),b.setInputValue("min",a),b.setInputValue("max",c)),b.rendered=!0)},update:function(a){var b=this.chart;c(!0,b.options.rangeSelector,a);this.destroy();this.init(b)},destroy:function(){var b=this,c=b.minInput,d=b.maxInput;b.unMouseDown();b.unResize();l(b.buttons);c&&(c.onfocus=c.onblur=c.onchange=null);d&&(d.onfocus=d.onblur=d.onchange=null);a.objectEach(b,function(a,
c){a&&"chart"!==c&&(a.destroy?a.destroy():a.nodeType&&e(this[c]));a!==D.prototype[c]&&(b[c]=null)},this)}};G.prototype.toFixedRange=function(a,c,d,e){var b=this.chart&&this.chart.fixedRange;a=q(d,this.translate(a,!0,!this.horiz));c=q(e,this.translate(c,!0,!this.horiz));d=b&&(c-a)/b;.7<d&&1.3>d&&(e?a=c-b:c=a+b);C(a)||(a=c=void 0);return{min:a,max:c}};G.prototype.minFromRange=function(){var a=this.range,c={month:"Month",year:"FullYear"}[a.type],d,e=this.max,f,g,k=function(a,b){var d=new Date(a),e=d["get"+
c]();d["set"+c](e+b);e===d["get"+c]()&&d.setDate(0);return d.getTime()-a};C(a)?(d=e-a,g=a):(d=e+k(e,-a.count),this.chart&&(this.chart.fixedRange=e-d));f=q(this.dataMin,Number.MIN_VALUE);C(d)||(d=f);d<=f&&(d=f,void 0===g&&(g=k(d,a.count)),this.newMax=Math.min(d+g,this.dataMax));C(e)||(d=void 0);return d};J(E.prototype,"init",function(a,c,d){B(this,"init",function(){this.options.rangeSelector.enabled&&(this.rangeSelector=new D(this))});a.call(this,c,d)});E.prototype.callbacks.push(function(a){function b(){c=
a.xAxis[0].getExtremes();C(c.min)&&d.render(c.min,c.max)}var c,d=a.rangeSelector,e,f;d&&(f=B(a.xAxis[0],"afterSetExtremes",function(a){d.render(a.min,a.max)}),e=B(a,"redraw",b),b());B(a,"destroy",function(){d&&(e(),f())})});a.RangeSelector=D})(M);(function(a){var D=a.arrayMax,B=a.arrayMin,G=a.Axis,E=a.Chart,r=a.defined,g=a.each,p=a.extend,t=a.format,v=a.grep,u=a.inArray,l=a.isNumber,e=a.isString,k=a.map,f=a.merge,d=a.pick,x=a.Point,C=a.Renderer,c=a.Series,q=a.splat,I=a.SVGRenderer,m=a.VMLRenderer,
J=a.wrap,b=c.prototype,z=b.init,K=b.processData,y=x.prototype.tooltipFormatter;a.StockChart=a.stockChart=function(b,c,g){var h=e(b)||b.nodeName,l=arguments[h?1:0],n=l.series,m=a.getOptions(),p,r=d(l.navigator&&l.navigator.enabled,m.navigator.enabled,!0),t=r?{startOnTick:!1,endOnTick:!1}:null,u={marker:{enabled:!1,radius:2}},v={shadow:!1,borderWidth:0};l.xAxis=k(q(l.xAxis||{}),function(a){return f({minPadding:0,maxPadding:0,ordinal:!0,title:{text:null},labels:{overflow:"justify"},showLastLabel:!0},
m.xAxis,a,{type:"datetime",categories:null},t)});l.yAxis=k(q(l.yAxis||{}),function(a){p=d(a.opposite,!0);return f({labels:{y:-2},opposite:p,showLastLabel:!1,title:{text:null}},m.yAxis,a)});l.series=null;l=f({chart:{panning:!0,pinchType:"x"},navigator:{enabled:r},scrollbar:{enabled:d(m.scrollbar.enabled,!0)},rangeSelector:{enabled:d(m.rangeSelector.enabled,!0)},title:{text:null},tooltip:{shared:!0,crosshairs:!0},legend:{enabled:!1},plotOptions:{line:u,spline:u,area:u,areaspline:u,arearange:u,areasplinerange:u,
column:v,columnrange:v,candlestick:v,ohlc:v}},l,{isStock:!0});l.series=n;return h?new E(b,l,g):new E(l,c)};J(G.prototype,"autoLabelAlign",function(a){var b=this.chart,c=this.options,b=b._labelPanes=b._labelPanes||{},d=this.options.labels;return this.chart.options.isStock&&"yAxis"===this.coll&&(c=c.top+","+c.height,!b[c]&&d.enabled)?(15===d.x&&(d.x=0),void 0===d.align&&(d.align="right"),b[c]=this,"right"):a.apply(this,[].slice.call(arguments,1))});J(G.prototype,"destroy",function(a){var b=this.chart,
c=this.options&&this.options.top+","+this.options.height;c&&b._labelPanes&&b._labelPanes[c]===this&&delete b._labelPanes[c];return a.apply(this,Array.prototype.slice.call(arguments,1))});J(G.prototype,"getPlotLinePath",function(b,c,f,h,m,p){var n=this,q=this.isLinked&&!this.series?this.linkedParent.series:this.series,t=n.chart,v=t.renderer,w=n.left,y=n.top,x,A,z,B,C=[],D=[],E,H;if("xAxis"!==n.coll&&"yAxis"!==n.coll)return b.apply(this,[].slice.call(arguments,1));D=function(a){var b="xAxis"===a?"yAxis":
"xAxis";a=n.options[b];return l(a)?[t[b][a]]:e(a)?[t.get(a)]:k(q,function(a){return a[b]})}(n.coll);g(n.isXAxis?t.yAxis:t.xAxis,function(a){if(r(a.options.id)?-1===a.options.id.indexOf("navigator"):1){var b=a.isXAxis?"yAxis":"xAxis",b=r(a.options[b])?t[b][a.options[b]]:t[b][0];n===b&&D.push(a)}});E=D.length?[]:[n.isXAxis?t.yAxis[0]:t.xAxis[0]];g(D,function(b){-1!==u(b,E)||a.find(E,function(a){return a.pos===b.pos&&a.len&&b.len})||E.push(b)});H=d(p,n.translate(c,null,null,h));l(H)&&(n.horiz?g(E,function(a){var b;
A=a.pos;B=A+a.len;x=z=Math.round(H+n.transB);if(x<w||x>w+n.width)m?x=z=Math.min(Math.max(w,x),w+n.width):b=!0;b||C.push("M",x,A,"L",z,B)}):g(E,function(a){var b;x=a.pos;z=x+a.len;A=B=Math.round(y+n.height-H);if(A<y||A>y+n.height)m?A=B=Math.min(Math.max(y,A),n.top+n.height):b=!0;b||C.push("M",x,A,"L",z,B)}));return 0<C.length?v.crispPolyLine(C,f||1):null});G.prototype.getPlotBandPath=function(a,b){b=this.getPlotLinePath(b,null,null,!0);a=this.getPlotLinePath(a,null,null,!0);var c=[],d;if(a&&b)if(a.toString()===
b.toString())c=a,c.flat=!0;else for(d=0;d<a.length;d+=6)c.push("M",a[d+1],a[d+2],"L",a[d+4],a[d+5],b[d+4],b[d+5],b[d+1],b[d+2],"z");else c=null;return c};I.prototype.crispPolyLine=function(a,b){var c;for(c=0;c<a.length;c+=6)a[c+1]===a[c+4]&&(a[c+1]=a[c+4]=Math.round(a[c+1])-b%2/2),a[c+2]===a[c+5]&&(a[c+2]=a[c+5]=Math.round(a[c+2])+b%2/2);return a};C===m&&(m.prototype.crispPolyLine=I.prototype.crispPolyLine);J(G.prototype,"hideCrosshair",function(a,b){a.call(this,b);this.crossLabel&&(this.crossLabel=
this.crossLabel.hide())});J(G.prototype,"drawCrosshair",function(a,b,c){var e,f;a.call(this,b,c);if(r(this.crosshair.label)&&this.crosshair.label.enabled&&this.cross){a=this.chart;var g=this.options.crosshair.label,k=this.horiz;e=this.opposite;f=this.left;var l=this.top,m=this.crossLabel,n,q=g.format,u="",v="inside"===this.options.tickPosition,x=!1!==this.crosshair.snap,y=0;b||(b=this.cross&&this.cross.e);n=k?"center":e?"right"===this.labelAlign?"right":"left":"left"===this.labelAlign?"left":"center";
m||(m=this.crossLabel=a.renderer.label(null,null,null,g.shape||"callout").addClass("highcharts-crosshair-label"+(this.series[0]&&" highcharts-color-"+this.series[0].colorIndex)).attr({align:g.align||n,padding:d(g.padding,8),r:d(g.borderRadius,3),zIndex:2}).add(this.labelGroup),m.attr({fill:g.backgroundColor||this.series[0]&&this.series[0].color||"#666666",stroke:g.borderColor||"","stroke-width":g.borderWidth||0}).css(p({color:"#ffffff",fontWeight:"normal",fontSize:"11px",textAlign:"center"},g.style)));
k?(n=x?c.plotX+f:b.chartX,l+=e?0:this.height):(n=e?this.width+f:0,l=x?c.plotY+l:b.chartY);q||g.formatter||(this.isDatetimeAxis&&(u="%b %d, %Y"),q="{value"+(u?":"+u:"")+"}");b=x?c[this.isXAxis?"x":"y"]:this.toValue(k?b.chartX:b.chartY);m.attr({text:q?t(q,{value:b}):g.formatter.call(this,b),x:n,y:l,visibility:"visible"});b=m.getBBox();if(k){if(v&&!e||!v&&e)l=m.y-b.height}else l=m.y-b.height/2;k?(e=f-b.x,f=f+this.width-b.x):(e="left"===this.labelAlign?f:0,f="right"===this.labelAlign?f+this.width:a.chartWidth);
m.translateX<e&&(y=e-m.translateX);m.translateX+b.width>=f&&(y=-(m.translateX+b.width-f));m.attr({x:n+y,y:l,anchorX:k?n:this.opposite?0:a.chartWidth,anchorY:k?this.opposite?a.chartHeight:0:l+b.height/2})}});b.init=function(){z.apply(this,arguments);this.setCompare(this.options.compare)};b.setCompare=function(a){this.modifyValue="value"===a||"percent"===a?function(b,c){var d=this.compareValue;if(void 0!==b&&void 0!==d)return b="value"===a?b-d:b/d*100-(100===this.options.compareBase?0:100),c&&(c.change=
b),b}:null;this.userOptions.compare=a;this.chart.hasRendered&&(this.isDirty=!0)};b.processData=function(){var a,b=-1,c,d,e,f;K.apply(this,arguments);if(this.xAxis&&this.processedYData)for(c=this.processedXData,d=this.processedYData,e=d.length,this.pointArrayMap&&(b=u("close",this.pointArrayMap),-1===b&&(b=u(this.pointValKey||"y",this.pointArrayMap))),a=0;a<e-1;a++)if(f=d[a]&&-1<b?d[a][b]:d[a],l(f)&&c[a+1]>=this.xAxis.min&&0!==f){this.compareValue=f;break}};J(b,"getExtremes",function(a){var b;a.apply(this,
[].slice.call(arguments,1));this.modifyValue&&(b=[this.modifyValue(this.dataMin),this.modifyValue(this.dataMax)],this.dataMin=B(b),this.dataMax=D(b))});G.prototype.setCompare=function(a,b){this.isXAxis||(g(this.series,function(b){b.setCompare(a)}),d(b,!0)&&this.chart.redraw())};x.prototype.tooltipFormatter=function(b){b=b.replace("{point.change}",(0<this.change?"+":"")+a.numberFormat(this.change,d(this.series.tooltipOptions.changeDecimals,2)));return y.apply(this,[b])};J(c.prototype,"render",function(a){this.chart.is3d&&
this.chart.is3d()||this.chart.polar||!this.xAxis||this.xAxis.isRadial||(!this.clipBox&&this.animate?(this.clipBox=f(this.chart.clipBox),this.clipBox.width=this.xAxis.len,this.clipBox.height=this.yAxis.len):this.chart[this.sharedClipKey]?this.chart[this.sharedClipKey].attr({width:this.xAxis.len,height:this.yAxis.len}):this.clipBox&&(this.clipBox.width=this.xAxis.len,this.clipBox.height=this.yAxis.len));a.call(this)});J(E.prototype,"getSelectedPoints",function(a){var b=a.call(this);g(this.series,function(a){a.hasGroupedData&&
(b=b.concat(v(a.points||[],function(a){return a.selected})))});return b});J(E.prototype,"update",function(a,b){"scrollbar"in b&&this.navigator&&(f(!0,this.options.scrollbar,b.scrollbar),this.navigator.update({},!1),delete b.scrollbar);return a.apply(this,Array.prototype.slice.call(arguments,1))})})(M);return M});


/***/ }),

/***/ 1913:
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

// EXTERNAL MODULE: ./node_modules/react-router/es/index.js + 32 modules
var es = __webpack_require__(34);

// EXTERNAL MODULE: ./app/actions/BlockchainActions.js
var BlockchainActions = __webpack_require__(700);

// EXTERNAL MODULE: ./node_modules/react-translate-component/index.js
var react_translate_component = __webpack_require__(5);
var react_translate_component_default = /*#__PURE__*/__webpack_require__.n(react_translate_component);

// EXTERNAL MODULE: ./node_modules/react-intl/lib/index.es.js + 1 modules
var index_es = __webpack_require__(83);

// EXTERNAL MODULE: ./app/components/Blockchain/Operation.jsx + 1 modules
var Operation = __webpack_require__(693);

// EXTERNAL MODULE: ./app/components/Utility/LinkToWitnessById.jsx
var LinkToWitnessById = __webpack_require__(1655);

// EXTERNAL MODULE: ./app/components/Utility/ChainTypes.js
var ChainTypes = __webpack_require__(33);

// EXTERNAL MODULE: ./app/components/Utility/BindToChainState.jsx
var BindToChainState = __webpack_require__(32);

// EXTERNAL MODULE: ./node_modules/react-highcharts/dist/ReactHighstock.js
var ReactHighstock = __webpack_require__(1643);
var ReactHighstock_default = /*#__PURE__*/__webpack_require__.n(ReactHighstock);

// EXTERNAL MODULE: ./node_modules/counterpart/index.js
var counterpart = __webpack_require__(3);
var counterpart_default = /*#__PURE__*/__webpack_require__.n(counterpart);

// CONCATENATED MODULE: ./app/components/Explorer/TransactionChart.jsx
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var TransactionChart_TransactionChart = function (_React$Component) {
    _inherits(TransactionChart, _React$Component);

    function TransactionChart() {
        _classCallCheck(this, TransactionChart);

        return _possibleConstructorReturn(this, (TransactionChart.__proto__ || Object.getPrototypeOf(TransactionChart)).apply(this, arguments));
    }

    _createClass(TransactionChart, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps) {
            if (nextProps.blocks.size < 20) {
                return false;
            }
            var chart = this.refs.trx_chart ? this.refs.trx_chart.chart : null;
            if (chart && nextProps.blocks !== this.props.blocks) {
                var _getData2 = this._getData(nextProps),
                    trxData = _getData2.trxData,
                    colors = _getData2.colors;

                var series = chart.series[0];
                var finalValue = series.xData[series.xData.length - 1];

                // console.log("chart:", chart, "series:", series.data, "finalValue:", finalValue);
                if (series.xData.length) {
                    trxData.forEach(function (point) {
                        if (point[0] > finalValue) {
                            series.addPoint(point, false, series.xData.length >= 30);
                        }
                    });

                    chart.options.plotOptions.column.colors = colors;

                    chart.redraw();
                    return false;
                }
            }
            return nextProps.blocks !== this.props.blocks || nextProps.head_block !== this.props.head_block;
        }
    }, {
        key: "_getData",
        value: function _getData(props) {
            var blocks = props.blocks,
                head_block = props.head_block;


            var trxData = [];
            var max = 0;
            trxData = blocks.filter(function (a) {
                return a.id >= head_block - 30;
            }).sort(function (a, b) {
                return a.id - b.id;
            }).takeLast(30).map(function (block) {
                max = Math.max(block.transactions.length, max);
                return [block.id, block.transactions.length];
            }).toArray();

            var colors = trxData.map(function (entry) {
                // console.log("entry:", entry);
                if (entry[1] <= 5) {
                    return "#50D2C2";
                } else if (entry[1] <= 10) {
                    return "#A0D3E8";
                } else if (entry[1] <= 20) {
                    return "#FCAB53";
                } else {
                    return "#deb869";
                }
            });

            return {
                colors: colors,
                trxData: trxData,
                max: max
            };
        }
    }, {
        key: "render",
        value: function render() {
            var _getData3 = this._getData(this.props),
                trxData = _getData3.trxData,
                colors = _getData3.colors,
                max = _getData3.max;

            var tooltipLabel = counterpart_default.a.translate("explorer.blocks.transactions");

            var config = {
                chart: {
                    type: "column",
                    backgroundColor: "rgba(255, 0, 0, 0)",
                    spacing: [0, 0, 5, 0],
                    height: 100
                },
                title: {
                    text: null
                },
                credits: {
                    enabled: false
                },
                legend: {
                    enabled: false
                },
                rangeSelector: {
                    enabled: false
                },
                navigator: {
                    enabled: false
                },
                scrollbar: {
                    enabled: false
                },
                tooltip: {
                    shared: false,
                    formatter: function formatter() {
                        return tooltipLabel + ": " + this.point.y;
                    }
                },
                series: [{
                    name: "Transactions",
                    data: trxData,
                    color: "#50D2C2"
                }],
                xAxis: {
                    labels: {
                        enabled: false
                    },
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    min: 0,
                    max: Math.max(1.5, max + 0.5),
                    title: {
                        text: null
                    },
                    labels: {
                        enabled: false
                    },
                    gridLineWidth: 0,
                    currentPriceIndicator: {
                        enabled: false
                    }
                },
                plotOptions: {
                    column: {
                        animation: true,
                        minPointLength: 5,
                        colorByPoint: true,
                        colors: colors,
                        borderWidth: 0
                    }
                }
            };

            return trxData.length ? react_default.a.createElement(ReactHighstock_default.a, { ref: "trx_chart", config: config }) : null;
        }
    }]);

    return TransactionChart;
}(react_default.a.Component);

;

/* harmony default export */ var Explorer_TransactionChart = (TransactionChart_TransactionChart);
// EXTERNAL MODULE: ./node_modules/lodash/index.js
var lodash = __webpack_require__(106);
var lodash_default = /*#__PURE__*/__webpack_require__.n(lodash);

// CONCATENATED MODULE: ./app/components/Explorer/BlocktimeChart.jsx
var BlocktimeChart__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function BlocktimeChart__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function BlocktimeChart__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function BlocktimeChart__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var BlocktimeChart_BlocktimeChart = function (_React$Component) {
    BlocktimeChart__inherits(BlocktimeChart, _React$Component);

    function BlocktimeChart() {
        BlocktimeChart__classCallCheck(this, BlocktimeChart);

        return BlocktimeChart__possibleConstructorReturn(this, (BlocktimeChart.__proto__ || Object.getPrototypeOf(BlocktimeChart)).apply(this, arguments));
    }

    BlocktimeChart__createClass(BlocktimeChart, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps) {

            if (nextProps.blockTimes.length < 19) {
                return false;
            } else if (this.props.blockTimes.length === 0) {
                return true;
            }

            var chart = this.refs.chart ? this.refs.chart.chart : null;
            if (chart) {
                var _getData2 = this._getData(nextProps),
                    blockTimes = _getData2.blockTimes,
                    colors = _getData2.colors;

                var series = chart.series[0];
                var finalValue = series.xData[series.xData.length - 1];

                if (series.xData.length) {
                    // console.log(chart, "series:", series.data, "finalValue:", finalValue);
                    blockTimes.forEach(function (point) {
                        if (point[0] > finalValue) {
                            series.addPoint(point, false, series.xData.length >= 30);
                        }
                    });

                    chart.options.plotOptions.column.colors = colors;

                    chart.redraw();
                    return false;
                }
            }

            return nextProps.blockTimes[nextProps.blockTimes.length - 1][0] !== this.props.blockTimes[this.props.blockTimes.length - 1][0] || nextProps.blockTimes.length !== this.props.blockTimes.length;
        }
    }, {
        key: "_getData",
        value: function _getData() {
            var _props = this.props,
                blockTimes = _props.blockTimes,
                head_block = _props.head_block;


            blockTimes.filter(function (a) {
                return a[0] >= head_block - 30;
            });

            if (blockTimes && blockTimes.length) {
                blockTimes = Object(lodash["takeRight"])(blockTimes, 30);
            }

            var colors = blockTimes.map(function (entry) {
                if (entry[1] <= 5) {
                    return "#50D2C2";
                } else if (entry[1] <= 10) {
                    return "#A0D3E8";
                } else if (entry[1] <= 20) {
                    return "#FCAB53";
                } else {
                    return "#deb869";
                }
            });

            return {
                blockTimes: blockTimes,
                colors: colors
            };
        }
    }, {
        key: "render",
        value: function render() {
            var _getData3 = this._getData(this.props),
                blockTimes = _getData3.blockTimes,
                colors = _getData3.colors;

            var tooltipLabel = counterpart_default.a.translate("explorer.blocks.block_time");

            var config = {
                chart: {
                    type: "column",
                    backgroundColor: "rgba(255, 0, 0, 0)",
                    spacing: [0, 0, 5, 0],
                    height: 100
                },
                title: {
                    text: null
                },
                credits: {
                    enabled: false
                },
                legend: {
                    enabled: false
                },
                rangeSelector: {
                    enabled: false
                },
                navigator: {
                    enabled: false
                },
                scrollbar: {
                    enabled: false
                },
                tooltip: {
                    shared: false,
                    formatter: function formatter() {
                        return tooltipLabel + ": " + this.point.y + "s";
                    }
                },
                series: [{
                    name: "Block time",
                    data: blockTimes,
                    color: "#50D2C2"
                }],
                xAxis: {
                    labels: {
                        enabled: false
                    },
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: null
                    },
                    labels: {
                        enabled: false
                    },
                    gridLineWidth: 0,
                    currentPriceIndicator: {
                        enabled: false
                    }
                },
                plotOptions: {
                    column: {
                        animation: true,
                        minPointLength: 3,
                        colorByPoint: true,
                        colors: colors,
                        borderWidth: 0
                    }
                }
            };

            return blockTimes.length ? react_default.a.createElement(ReactHighstock_default.a, { ref: "chart", config: config }) : null;
        }
    }]);

    return BlocktimeChart;
}(react_default.a.Component);

;

/* harmony default export */ var Explorer_BlocktimeChart = (BlocktimeChart_BlocktimeChart);
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(28);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./app/lib/common/utils.js
var utils = __webpack_require__(15);

// EXTERNAL MODULE: ./node_modules/immutable/dist/immutable.js
var immutable = __webpack_require__(20);
var immutable_default = /*#__PURE__*/__webpack_require__.n(immutable);

// EXTERNAL MODULE: ./app/components/Utility/TimeAgo.jsx
var TimeAgo = __webpack_require__(694);

// EXTERNAL MODULE: ./app/components/Utility/FormattedAsset.jsx
var FormattedAsset = __webpack_require__(68);

// EXTERNAL MODULE: ./node_modules/perfect-scrollbar/index.js
var perfect_scrollbar = __webpack_require__(1550);
var perfect_scrollbar_default = /*#__PURE__*/__webpack_require__.n(perfect_scrollbar);

// EXTERNAL MODULE: ./app/components/Utility/TransitionWrapper.jsx
var TransitionWrapper = __webpack_require__(1555);

// EXTERNAL MODULE: ./node_modules/seerjs/es/index.js + 7 modules
var seerjs_es = __webpack_require__(6);

// CONCATENATED MODULE: ./app/components/Explorer/Blocks.jsx
var Blocks__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function Blocks__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Blocks__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Blocks__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





















__webpack_require__(712);

var Blocks_BlockTimeAgo = function (_React$Component) {
    Blocks__inherits(BlockTimeAgo, _React$Component);

    function BlockTimeAgo() {
        Blocks__classCallCheck(this, BlockTimeAgo);

        return Blocks__possibleConstructorReturn(this, (BlockTimeAgo.__proto__ || Object.getPrototypeOf(BlockTimeAgo)).apply(this, arguments));
    }

    Blocks__createClass(BlockTimeAgo, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps) {
            return nextProps.blockTime !== this.props.blockTime;
        }
    }, {
        key: "render",
        value: function render() {
            var blockTime = this.props.blockTime;

            // let timePassed = Date.now() - blockTime;

            var timePassed = new Date().getTime() - new Date(blockTime).getTime();

            var textClass = classnames_default()("txtlabel", { "success": timePassed <= 6000 }, { "info": timePassed > 6000 && timePassed <= 15000 }, { "warning": timePassed > 15000 && timePassed <= 25000 }, { "error": timePassed > 25000 });

            return blockTime ? react_default.a.createElement(
                "h3",
                { className: textClass },
                react_default.a.createElement(TimeAgo["a" /* default */], { time: blockTime })
            ) : null;
        }
    }]);

    return BlockTimeAgo;
}(react_default.a.Component);

var Blocks_Blocks = function (_React$Component2) {
    Blocks__inherits(Blocks, _React$Component2);

    function Blocks(props) {
        Blocks__classCallCheck(this, Blocks);

        var _this2 = Blocks__possibleConstructorReturn(this, (Blocks.__proto__ || Object.getPrototypeOf(Blocks)).call(this, props));

        _this2.state = {
            animateEnter: false,
            operationsHeight: null,
            blocksHeight: null
        };

        _this2._updateHeight = _this2._updateHeight.bind(_this2);
        return _this2;
    }

    Blocks__createClass(Blocks, [{
        key: "_getBlock",
        value: function _getBlock(height, maxBlock) {
            if (height) {
                height = parseInt(height, 10);
                BlockchainActions["a" /* default */].getLatest(height, maxBlock);
            }
        }
    }, {
        key: "componentWillMount",
        value: function componentWillMount() {
            window.addEventListener("resize", this._updateHeight, { capture: false, passive: true });
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            window.removeEventListener("resize", this._updateHeight);
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {

            if (nextProps.latestBlocks.size === 0) {
                return this._getInitialBlocks();
            } else if (!this.state.animateEnter) {
                this.setState({
                    animateEnter: true
                });
            }

            var maxBlock = nextProps.dynGlobalObject.get("head_block_number");
            if (nextProps.latestBlocks.size >= 20 && nextProps.dynGlobalObject.get("head_block_number") !== nextProps.latestBlocks.get(0).id) {
                return this._getBlock(maxBlock, maxBlock);
            }
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this._getInitialBlocks();
            var oc = this.refs.operations;
            perfect_scrollbar_default.a.initialize(oc);
            var blocks = this.refs.blocks;
            perfect_scrollbar_default.a.initialize(blocks);
            this._updateHeight();
        }
    }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState) {
            return !immutable_default.a.is(nextProps.latestBlocks, this.props.latestBlocks) || !utils["a" /* default */].are_equal_shallow(nextState, this.state);
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            this._updateHeight();
        }
    }, {
        key: "_getInitialBlocks",
        value: function _getInitialBlocks() {
            var maxBlock = parseInt(this.props.dynGlobalObject.get("head_block_number"), 10);
            if (maxBlock) {
                for (var i = 19; i >= 0; i--) {
                    var exists = false;
                    if (this.props.latestBlocks.size > 0) {
                        for (var j = 0; j < this.props.latestBlocks.size; j++) {
                            if (this.props.latestBlocks.get(j).id === maxBlock - i) {
                                exists = true;
                                break;
                            }
                        }
                    }
                    if (!exists) {
                        this._getBlock(maxBlock - i, maxBlock);
                    }
                }
            }
        }
    }, {
        key: "_updateHeight",
        value: function _updateHeight() {
            var containerHeight = this.refs.outerWrapper.offsetHeight;
            var operationsTextHeight = this.refs.operationsText.offsetHeight;
            var blocksTextHeight = this.refs.blocksText.offsetHeight;

            this.setState({
                operationsHeight: containerHeight - operationsTextHeight,
                blocksHeight: containerHeight - blocksTextHeight
            }, this.psUpdate);
        }
    }, {
        key: "psUpdate",
        value: function psUpdate() {
            var oc = this.refs.operations;
            perfect_scrollbar_default.a.update(oc);
            var blocks = this.refs.blocks;
            perfect_scrollbar_default.a.update(blocks);
        }
    }, {
        key: "render",
        value: function render() {
            var _props = this.props,
                latestBlocks = _props.latestBlocks,
                latestTransactions = _props.latestTransactions,
                globalObject = _props.globalObject,
                dynGlobalObject = _props.dynGlobalObject,
                coreAsset = _props.coreAsset;
            var _state = this.state,
                blocksHeight = _state.blocksHeight,
                operationsHeight = _state.operationsHeight;


            var blocks = null,
                transactions = null;
            var headBlock = null;
            var trxCount = 0,
                blockCount = latestBlocks.size,
                trxPerSec = 0,
                blockTimes = [],
                avgTime = 0;

            if (latestBlocks && latestBlocks.size >= 20) {

                var previousTime = void 0;

                var lastBlock = void 0,
                    firstBlock = void 0;

                // Map out the block times for the latest blocks and count the number of transactions
                latestBlocks.filter(function (a, index) {
                    // Only use consecutive blocks counting back from head block
                    return a.id === dynGlobalObject.get("head_block_number") - index;
                }).sort(function (a, b) {
                    return a.id - b.id;
                }).forEach(function (block, index) {
                    trxCount += block.transactions.length;
                    if (index > 0) {
                        blockTimes.push([block.id, (block.timestamp - previousTime) / 1000]);
                        lastBlock = block.timestamp;
                    } else {
                        firstBlock = block.timestamp;
                    }
                    previousTime = block.timestamp;
                });

                // Output block rows for the last 20 blocks
                blocks = latestBlocks.sort(function (a, b) {
                    return b.id - a.id;
                }).take(20).map(function (block) {
                    return react_default.a.createElement(
                        "tr",
                        { key: block.id },
                        react_default.a.createElement(
                            "td",
                            null,
                            react_default.a.createElement(
                                es["b" /* Link */],
                                { to: "/block/" + block.id },
                                "#",
                                utils["a" /* default */].format_number(block.id, 0)
                            )
                        ),
                        react_default.a.createElement(
                            "td",
                            null,
                            react_default.a.createElement(index_es["a" /* FormattedDate */], {
                                value: block.timestamp,
                                format: "time"
                            })
                        ),
                        react_default.a.createElement(
                            "td",
                            null,
                            react_default.a.createElement(LinkToWitnessById["a" /* default */], { witness: block.witness })
                        ),
                        react_default.a.createElement(
                            "td",
                            null,
                            utils["a" /* default */].format_number(block.transactions.length, 0)
                        )
                    );
                }).toArray();

                var trxIndex = 0;

                transactions = latestTransactions.take(20).map(function (trx) {

                    var opIndex = 0;
                    return trx.operations.map(function (op) {
                        return react_default.a.createElement(Operation["a" /* default */], {
                            key: trxIndex++,
                            op: op,
                            result: trx.operation_results[opIndex++],
                            block: trx.block_num,
                            hideFee: true,
                            hideOpLabel: false,
                            current: "1.2.0"
                        });
                    });
                }).toArray();

                headBlock = latestBlocks.first().timestamp;
                avgTime = blockTimes.reduce(function (previous, current, idx, array) {
                    return previous + current[1] / array.length;
                }, 0);

                trxPerSec = trxCount / ((lastBlock - firstBlock) / 1000);
            }

            var dynamic = null;
            if (this.props.coreAsset.toJS()) {
                dynamic = seerjs_es["b" /* ChainStore */].getObject(this.props.coreAsset.toJS().dynamic_asset_data_id, false, false);
            }

            return react_default.a.createElement(
                "div",
                { ref: "outerWrapper", className: "grid-block vertical" },
                react_default.a.createElement(
                    "div",
                    { className: "align-center grid-block shrink small-horizontal blocks-row" },
                    react_default.a.createElement(
                        "div",
                        { className: "grid-block text-center small-6 medium-3" },
                        react_default.a.createElement(
                            "div",
                            { className: "grid-content no-overflow" },
                            react_default.a.createElement(
                                "span",
                                { className: "txtlabel" },
                                react_default.a.createElement(react_translate_component_default.a, { component: "span", content: "explorer.blocks.current_block" })
                            ),
                            react_default.a.createElement(
                                "h2",
                                null,
                                "#",
                                utils["a" /* default */].format_number(dynGlobalObject.get("head_block_number"), 0)
                            )
                        )
                    ),
                    react_default.a.createElement(
                        "div",
                        { className: "grid-block text-center small-6 medium-3" },
                        react_default.a.createElement(
                            "div",
                            { className: "grid-content no-overflow" },
                            react_default.a.createElement(
                                "span",
                                { className: "txtlabel" },
                                react_default.a.createElement(react_translate_component_default.a, { component: "span", content: "explorer.blocks.last_block" })
                            ),
                            react_default.a.createElement(Blocks_BlockTimeAgo, { blockTime: headBlock })
                        )
                    ),
                    react_default.a.createElement(
                        "div",
                        { className: "grid-block text-center small-6 medium-3" },
                        react_default.a.createElement(
                            "div",
                            { className: "grid-content no-overflow" },
                            react_default.a.createElement(
                                "span",
                                { className: "txtlabel" },
                                react_default.a.createElement(react_translate_component_default.a, { component: "span", content: "explorer.blocks.trx_per_sec" })
                            ),
                            react_default.a.createElement(
                                "h2",
                                null,
                                utils["a" /* default */].format_number(trxPerSec, 2)
                            )
                        )
                    ),
                    react_default.a.createElement(
                        "div",
                        { className: "grid-block text-center small-6 medium-3" },
                        react_default.a.createElement(
                            "div",
                            { className: "grid-content no-overflow" },
                            react_default.a.createElement(
                                "span",
                                { className: "txtlabel" },
                                react_default.a.createElement(react_translate_component_default.a, { component: "span", content: "explorer.blocks.avg_conf_time" })
                            ),
                            react_default.a.createElement(
                                "h2",
                                null,
                                utils["a" /* default */].format_number(avgTime / 2, 2),
                                "s"
                            )
                        )
                    )
                ),
                react_default.a.createElement(
                    "div",
                    { className: "align-center grid-block shrink small-horizontal  blocks-row" },
                    react_default.a.createElement(
                        "div",
                        { className: "grid-block text-center small-6 medium-3" },
                        react_default.a.createElement(
                            "div",
                            { className: "grid-content no-overflow clear-fix" },
                            react_default.a.createElement(
                                "span",
                                { className: "txtlabel" },
                                react_default.a.createElement(react_translate_component_default.a, { component: "span", content: "explorer.blocks.active_witnesses" })
                            ),
                            react_default.a.createElement(
                                "h2",
                                { className: "txtlabel success" },
                                globalObject.get("active_witnesses").size
                            )
                        )
                    ),
                    react_default.a.createElement(
                        "div",
                        { className: "grid-block text-center small-6 medium-3" },
                        react_default.a.createElement(
                            "div",
                            { className: "grid-content no-overflow clear-fix" },
                            react_default.a.createElement(
                                "span",
                                { className: "txtlabel" },
                                react_default.a.createElement(react_translate_component_default.a, { component: "span", content: "explorer.blocks.active_committee_members" })
                            ),
                            react_default.a.createElement(
                                "h2",
                                { className: "txtlabel success" },
                                globalObject.get("active_committee_members").size
                            )
                        )
                    ),
                    react_default.a.createElement(
                        "div",
                        { className: "grid-block text-center small-6 medium-3" },
                        react_default.a.createElement(
                            "div",
                            { className: "grid-content no-overflow clear-fix" },
                            react_default.a.createElement(
                                "span",
                                { className: "txtlabel" },
                                react_default.a.createElement(react_translate_component_default.a, { component: "span", content: "explorer.blocks.trx_per_block" })
                            ),
                            react_default.a.createElement(
                                "h2",
                                null,
                                utils["a" /* default */].format_number(trxCount / blockCount || 0, 2)
                            )
                        )
                    ),
                    react_default.a.createElement(
                        "div",
                        { className: "grid-block text-center small-6 medium-3" },
                        react_default.a.createElement(
                            "div",
                            { className: "grid-content no-overflow clear-fix" },
                            react_default.a.createElement(
                                "span",
                                { className: "txtlabel" },
                                react_default.a.createElement(react_translate_component_default.a, { component: "span", content: "explorer.blocks.recently_missed_blocks" })
                            ),
                            react_default.a.createElement(
                                "h2",
                                { className: "txtlabel warning", style: { fontWeight: "100" } },
                                dynGlobalObject.get("recently_missed_count")
                            )
                        )
                    )
                ),
                react_default.a.createElement(
                    "div",
                    { className: "align-center grid-block shrink small-vertical medium-horizontal blocks-row" },
                    react_default.a.createElement(
                        "div",
                        { className: "grid-block text-center small-12 medium-3" },
                        react_default.a.createElement(
                            "div",
                            { className: "grid-content no-overflow clear-fix" },
                            react_default.a.createElement(
                                "span",
                                { className: "txtlabel" },
                                react_default.a.createElement(react_translate_component_default.a, { component: "span", content: "explorer.asset.summary.current_supply" })
                            ),
                            react_default.a.createElement(
                                "h3",
                                { className: "txtlabel" },
                                react_default.a.createElement(FormattedAsset["a" /* default */], {
                                    amount: dynamic ? dynamic.toJS().current_supply : 0,
                                    asset: coreAsset.get("id"),
                                    decimalOffset: 5
                                })
                            )
                        )
                    ),
                    react_default.a.createElement(
                        "div",
                        { className: "grid-block text-center small-12 medium-3" },
                        react_default.a.createElement(
                            "div",
                            { className: "grid-content no-overflow" },
                            react_default.a.createElement(
                                "div",
                                { className: "txtlabel" },
                                react_default.a.createElement(react_translate_component_default.a, { component: "span", content: "explorer.blocks.block_times" })
                            ),
                            react_default.a.createElement(Explorer_BlocktimeChart, { blockTimes: blockTimes, head_block_number: dynGlobalObject.get("head_block_number") })
                        )
                    ),
                    react_default.a.createElement(
                        "div",
                        { className: "grid-block text-center small-12 medium-3" },
                        react_default.a.createElement(
                            "div",
                            { className: "grid-content no-overflow" },
                            react_default.a.createElement(
                                "div",
                                { className: "txtlabel" },
                                react_default.a.createElement(react_translate_component_default.a, { component: "span", content: "explorer.blocks.trx_per_block" })
                            ),
                            react_default.a.createElement(Explorer_TransactionChart, { blocks: latestBlocks, head_block: dynGlobalObject.get("head_block_number") })
                        )
                    ),
                    react_default.a.createElement(
                        "div",
                        { className: "grid-block text-center small-12 medium-3" },
                        react_default.a.createElement(
                            "div",
                            { className: "grid-content no-overflow clear-fix" },
                            react_default.a.createElement(
                                "span",
                                { className: "txtlabel" },
                                react_default.a.createElement(react_translate_component_default.a, { component: "span", content: "explorer.asset.summary.stealth_supply" })
                            ),
                            react_default.a.createElement(
                                "h3",
                                { className: "txtlabel" },
                                react_default.a.createElement(FormattedAsset["a" /* default */], {
                                    amount: dynamic ? dynamic.toJS().confidential_supply : 0,
                                    asset: coreAsset.get("id"),
                                    decimalOffset: 5
                                })
                            )
                        )
                    )
                ),
                react_default.a.createElement(
                    "div",
                    { ref: "transactionsBlock", className: "grid-block no-overflow" },
                    react_default.a.createElement(
                        "div",
                        { className: "grid-block small-12 medium-6 vertical no-overflow", style: { paddingBottom: 0 } },
                        react_default.a.createElement(
                            "div",
                            { className: "grid-block vertical no-overflow generic-bordered-box" },
                            react_default.a.createElement(
                                "div",
                                { ref: "operationsText" },
                                react_default.a.createElement(
                                    "div",
                                    { className: "block-content-header" },
                                    react_default.a.createElement(react_translate_component_default.a, { content: "account.recent" })
                                ),
                                react_default.a.createElement(
                                    "table",
                                    { className: "table" },
                                    react_default.a.createElement(
                                        "thead",
                                        null,
                                        react_default.a.createElement(
                                            "tr",
                                            null,
                                            react_default.a.createElement(
                                                "th",
                                                null,
                                                react_default.a.createElement(react_translate_component_default.a, { content: "account.votes.info" })
                                            )
                                        )
                                    )
                                )
                            ),
                            react_default.a.createElement(
                                "div",
                                { className: "grid-block", style: { maxHeight: operationsHeight || "400px", overflow: "hidden" }, ref: "operations" },
                                react_default.a.createElement(
                                    "table",
                                    { className: "table" },
                                    react_default.a.createElement(
                                        "tbody",
                                        null,
                                        transactions
                                    )
                                )
                            )
                        )
                    ),
                    react_default.a.createElement(
                        "div",
                        { className: "grid-block medium-6 show-for-medium vertical no-overflow", style: { paddingBottom: 0, paddingLeft: 5 } },
                        react_default.a.createElement(
                            "div",
                            { className: "grid-block vertical no-overflow generic-bordered-box" },
                            react_default.a.createElement(
                                "div",
                                { ref: "blocksText" },
                                react_default.a.createElement(
                                    "div",
                                    { className: "block-content-header" },
                                    react_default.a.createElement(react_translate_component_default.a, { component: "span", content: "explorer.blocks.recent" })
                                )
                            ),
                            react_default.a.createElement(
                                "div",
                                { className: "grid-block vertical", style: { maxHeight: blocksHeight || "438px", overflow: "hidden" }, ref: "blocks" },
                                react_default.a.createElement(
                                    "table",
                                    { className: "table" },
                                    react_default.a.createElement(
                                        "thead",
                                        null,
                                        react_default.a.createElement(
                                            "tr",
                                            null,
                                            react_default.a.createElement(
                                                "th",
                                                null,
                                                react_default.a.createElement(react_translate_component_default.a, { component: "span", content: "explorer.block.id" })
                                            ),
                                            react_default.a.createElement(
                                                "th",
                                                null,
                                                react_default.a.createElement(react_translate_component_default.a, { component: "span", content: "explorer.block.date" })
                                            ),
                                            react_default.a.createElement(
                                                "th",
                                                null,
                                                react_default.a.createElement(react_translate_component_default.a, { component: "span", content: "explorer.block.witness" })
                                            ),
                                            react_default.a.createElement(
                                                "th",
                                                null,
                                                react_default.a.createElement(react_translate_component_default.a, { component: "span", content: "explorer.block.count" })
                                            )
                                        )
                                    ),
                                    react_default.a.createElement(
                                        TransitionWrapper["a" /* default */],
                                        {
                                            component: "tbody",
                                            transitionName: "newrow"
                                        },
                                        blocks
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Blocks;
}(react_default.a.Component);

Blocks_Blocks.propTypes = {
    globalObject: ChainTypes["a" /* default */].ChainObject.isRequired,
    dynGlobalObject: ChainTypes["a" /* default */].ChainObject.isRequired,
    coreAsset: ChainTypes["a" /* default */].ChainAsset.isRequired
};
Blocks_Blocks.defaultProps = {
    globalObject: "2.0.0",
    dynGlobalObject: "2.1.0",
    coreAsset: "1.3.0",
    latestBlocks: {},
    assets: {},
    accounts: {},
    height: 1
};


/* harmony default export */ var Explorer_Blocks = (Object(BindToChainState["a" /* default */])(Blocks_Blocks, { keep_updating: true, show_loader: true }));
// EXTERNAL MODULE: ./app/components/Explorer/Explorer.jsx
var Explorer = __webpack_require__(50);

// CONCATENATED MODULE: ./app/components/Explorer/BlocksContainer.jsx
var BlocksContainer__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function BlocksContainer__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function BlocksContainer__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function BlocksContainer__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var BlocksContainer_BlocksContainer = function (_React$Component) {
    BlocksContainer__inherits(BlocksContainer, _React$Component);

    function BlocksContainer() {
        BlocksContainer__classCallCheck(this, BlocksContainer);

        return BlocksContainer__possibleConstructorReturn(this, (BlocksContainer.__proto__ || Object.getPrototypeOf(BlocksContainer)).apply(this, arguments));
    }

    BlocksContainer__createClass(BlocksContainer, [{
        key: "render",
        value: function render() {

            var content = react_default.a.createElement(
                AltContainer_default.a,
                {
                    stores: [BlockchainStore["a" /* default */]],
                    inject: {
                        latestBlocks: function latestBlocks() {
                            return BlockchainStore["a" /* default */].getState().latestBlocks;
                        },
                        latestTransactions: function latestTransactions() {
                            return BlockchainStore["a" /* default */].getState().latestTransactions;
                        }
                    }
                },
                react_default.a.createElement(Explorer_Blocks, null)
            );

            return react_default.a.createElement(Explorer["default"], { tab: "blocks", content: content });
        }
    }]);

    return BlocksContainer;
}(react_default.a.Component);

/* harmony default export */ var Explorer_BlocksContainer = __webpack_exports__["default"] = (BlocksContainer_BlocksContainer);

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
//# sourceMappingURL=12.js.map