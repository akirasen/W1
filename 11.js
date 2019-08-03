webpackJsonp([11],{

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

/***/ 1595:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EquivalentValueComponent; });
/* unused harmony export BalanceValueComponent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FormattedAsset__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ChainTypes__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__BindToChainState__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_common_utils__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_alt_react__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_alt_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_alt_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_stores_MarketsStore__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_translate_component__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_translate_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_translate_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_counterpart__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_counterpart___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_counterpart__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react_tooltip__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_react_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Utility_EquivalentPrice__ = __webpack_require__(698);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }













/**
 *  Given an asset amount, displays the equivalent value in baseAsset if possible
 *
 *  Expects three properties
 *  -'toAsset' which should be a asset id
 *  -'fromAsset' which is the asset id of the original asset amount
 *  -'amount' which is the amount to convert
 *  -'fullPrecision' boolean to tell if the amount uses the full precision of the asset
 */

var ValueComponent = function (_MarketStatsCheck) {
    _inherits(ValueComponent, _MarketStatsCheck);

    function ValueComponent(props) {
        _classCallCheck(this, ValueComponent);

        return _possibleConstructorReturn(this, (ValueComponent.__proto__ || Object.getPrototypeOf(ValueComponent)).call(this, props));
    }

    _createClass(ValueComponent, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            __WEBPACK_IMPORTED_MODULE_9_react_tooltip___default.a.rebuild();
        }
    }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(np) {
            return _get(ValueComponent.prototype.__proto__ || Object.getPrototypeOf(ValueComponent.prototype), "shouldComponentUpdate", this).call(this, np) || np.toAsset !== this.props.toAsset || np.fromAsset !== this.props.fromAsset || np.amount !== this.props.amount;
        }
    }, {
        key: "getValue",
        value: function getValue() {
            var _props = this.props,
                amount = _props.amount,
                toAsset = _props.toAsset,
                fromAsset = _props.fromAsset,
                fullPrecision = _props.fullPrecision,
                marketStats = _props.marketStats,
                coreAsset = _props.coreAsset;

            var toStats = void 0,
                fromStats = void 0;

            var toID = toAsset.get("id");
            var toSymbol = toAsset.get("symbol");
            var fromID = fromAsset.get("id");
            var fromSymbol = fromAsset.get("symbol");

            if (!fullPrecision) {
                amount = __WEBPACK_IMPORTED_MODULE_4_common_utils__["a" /* default */].get_asset_amount(amount, fromAsset);
            }

            if (coreAsset && marketStats) {
                var coreSymbol = coreAsset.get("symbol");
                toStats = marketStats.get(toSymbol + "_" + coreSymbol);
                fromStats = marketStats.get(fromSymbol + "_" + coreSymbol);
            }

            var price = __WEBPACK_IMPORTED_MODULE_4_common_utils__["a" /* default */].convertPrice(fromStats && fromStats.close ? fromStats.close : fromID === "1.3.0" || fromAsset.has("bitasset") ? fromAsset : null, toStats && toStats.close ? toStats.close : toID === "1.3.0" || toAsset.has("bitasset") ? toAsset : null, fromID, toID);

            var eqValue = price ? __WEBPACK_IMPORTED_MODULE_4_common_utils__["a" /* default */].convertValue(price, amount, fromAsset, toAsset) : null;
            return eqValue;
        }
    }, {
        key: "render",
        value: function render() {
            var _props2 = this.props,
                amount = _props2.amount,
                toAsset = _props2.toAsset,
                fromAsset = _props2.fromAsset,
                fullPrecision = _props2.fullPrecision;


            var toID = toAsset.get("id");
            var toSymbol = toAsset.get("symbol");

            if (!fullPrecision) {
                amount = __WEBPACK_IMPORTED_MODULE_4_common_utils__["a" /* default */].get_asset_amount(amount, fromAsset);
            }

            var eqValue = this.getValue();

            if (!eqValue && eqValue !== 0) {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "tooltip inline-block", "data-place": "bottom", "data-tip": __WEBPACK_IMPORTED_MODULE_8_counterpart___default.a.translate("tooltip.no_price"), style: { fontSize: "0.9rem" } },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_translate_component___default.a, { content: "account.no_price" })
                );
            }

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__FormattedAsset__["a" /* default */], { hide_asset: this.props.hide_asset, noPrefix: true, amount: eqValue, asset: toID, decimalOffset: toSymbol.indexOf("BTC") !== -1 ? 4 : this.props.fullDecimals ? 0 : this.props.noDecimals ? toAsset.get("precision") : toAsset.get("precision") - 2 });
        }
    }]);

    return ValueComponent;
}(__WEBPACK_IMPORTED_MODULE_10__Utility_EquivalentPrice__["a" /* MarketStatsCheck */]);

ValueComponent.propTypes = {
    toAsset: __WEBPACK_IMPORTED_MODULE_2__ChainTypes__["a" /* default */].ChainAsset.isRequired,
    fromAsset: __WEBPACK_IMPORTED_MODULE_2__ChainTypes__["a" /* default */].ChainAsset.isRequired,
    coreAsset: __WEBPACK_IMPORTED_MODULE_2__ChainTypes__["a" /* default */].ChainAsset.isRequired
};
ValueComponent.defaultProps = {
    toAsset: "1.3.0",
    fullPrecision: true,
    noDecimals: false,
    fullDecimals: false,
    hide_asset: false,
    coreAsset: "1.3.0"
};

ValueComponent = Object(__WEBPACK_IMPORTED_MODULE_3__BindToChainState__["a" /* default */])(ValueComponent, { keep_updating: true });

var EquivalentValueComponent = function (_React$Component) {
    _inherits(EquivalentValueComponent, _React$Component);

    function EquivalentValueComponent() {
        _classCallCheck(this, EquivalentValueComponent);

        return _possibleConstructorReturn(this, (EquivalentValueComponent.__proto__ || Object.getPrototypeOf(EquivalentValueComponent)).apply(this, arguments));
    }

    _createClass(EquivalentValueComponent, [{
        key: "render",
        value: function render() {
            var _props3 = this.props,
                refCallback = _props3.refCallback,
                others = _objectWithoutProperties(_props3, ["refCallback"]);

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(ValueComponent, _extends({}, others, { ref: refCallback }));
        }
    }]);

    return EquivalentValueComponent;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

EquivalentValueComponent = Object(__WEBPACK_IMPORTED_MODULE_5_alt_react__["connect"])(EquivalentValueComponent, {
    listenTo: function listenTo() {
        return [__WEBPACK_IMPORTED_MODULE_6_stores_MarketsStore__["a" /* default */]];
    },
    getProps: function getProps() {
        return {
            marketStats: __WEBPACK_IMPORTED_MODULE_6_stores_MarketsStore__["a" /* default */].getState().allMarketStats
        };
    }
});

var BalanceValueComponent = function (_React$Component2) {
    _inherits(BalanceValueComponent, _React$Component2);

    function BalanceValueComponent() {
        _classCallCheck(this, BalanceValueComponent);

        return _possibleConstructorReturn(this, (BalanceValueComponent.__proto__ || Object.getPrototypeOf(BalanceValueComponent)).apply(this, arguments));
    }

    _createClass(BalanceValueComponent, [{
        key: "render",
        value: function render() {
            var balance = this.props.balance;

            var isBalanceObject = !!balance.getIn(["balance", "amount"]);

            var amount = Number(isBalanceObject ? balance.getIn(["balance", "amount"]) : balance.get("balance"));
            var fromAsset = isBalanceObject ? balance.getIn(["balance", "asset_id"]) : balance.get("asset_type");
            if (isNaN(amount)) return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "span",
                null,
                "--"
            );
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(EquivalentValueComponent, { refCallback: this.props.refCallback, hide_asset: this.props.hide_asset, amount: amount, fromAsset: fromAsset, noDecimals: true, toAsset: this.props.toAsset });
        }
    }]);

    return BalanceValueComponent;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

BalanceValueComponent.propTypes = {
    balance: __WEBPACK_IMPORTED_MODULE_2__ChainTypes__["a" /* default */].ChainObject.isRequired
};

BalanceValueComponent = Object(__WEBPACK_IMPORTED_MODULE_3__BindToChainState__["a" /* default */])(BalanceValueComponent, { keep_updating: true });


/***/ }),

/***/ 1606:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_utils__ = __webpack_require__(15);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var PriceText = function (_React$Component) {
    _inherits(PriceText, _React$Component);

    function PriceText() {
        _classCallCheck(this, PriceText);

        return _possibleConstructorReturn(this, (PriceText.__proto__ || Object.getPrototypeOf(PriceText)).apply(this, arguments));
    }

    _createClass(PriceText, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                price = _props.price,
                preFormattedPrice = _props.preFormattedPrice,
                quote = _props.quote,
                base = _props.base,
                component = _props.component;


            var formattedPrice = preFormattedPrice ? preFormattedPrice : __WEBPACK_IMPORTED_MODULE_1_common_utils__["a" /* default */].price_to_text(price, quote, base);

            if (formattedPrice.full >= 1) {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "span",
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "span",
                        { className: "price-integer" },
                        formattedPrice.int,
                        "."
                    ),
                    formattedPrice.dec ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "span",
                        { className: "price-integer" },
                        formattedPrice.dec
                    ) : null,
                    formattedPrice.trailing ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "span",
                        { className: "price-decimal" },
                        formattedPrice.trailing
                    ) : null
                );
            } else if (formattedPrice.full >= 0.1) {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "span",
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "span",
                        { className: "price-decimal" },
                        formattedPrice.int,
                        "."
                    ),
                    formattedPrice.dec ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "span",
                        { className: "price-integer" },
                        formattedPrice.dec
                    ) : null,
                    formattedPrice.trailing ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "span",
                        { className: "price-decimal" },
                        formattedPrice.trailing
                    ) : null
                );
            } else {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "span",
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "span",
                        { className: "price-decimal" },
                        formattedPrice.int,
                        "."
                    ),
                    formattedPrice.dec ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "span",
                        { className: "price-decimal" },
                        formattedPrice.dec
                    ) : null,
                    formattedPrice.trailing ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "span",
                        { className: "price-integer" },
                        formattedPrice.trailing
                    ) : null
                );
            }
        }
    }]);

    return PriceText;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (PriceText);

/***/ }),

/***/ 1611:
/***/ (function(module, exports) {

module.exports = function browserLocale () {
  var lang

  if (navigator.languages && navigator.languages.length) {
    // latest versions of Chrome and Firefox set this correctly
    lang = navigator.languages[0]
  } else if (navigator.userLanguage) {
    // IE only
    lang = navigator.userLanguage
  } else {
    // latest versions of Chrome, Firefox, and Safari set this correctly
    lang = navigator.language
  }

  return lang
}


/***/ }),

/***/ 1644:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MarketPrice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MarketStats; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Utility_ChainTypes__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Utility_BindToChainState__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_actions_MarketsActions__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_stores_MarketsStore__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_alt_react__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_alt_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_alt_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_common_utils__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__FormattedPrice__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_common_market_utils__ = __webpack_require__(126);
var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }












var MarketStats = function (_React$Component) {
    _inherits(MarketStats, _React$Component);

    function MarketStats(props) {
        _classCallCheck(this, MarketStats);

        var _this = _possibleConstructorReturn(this, (MarketStats.__proto__ || Object.getPrototypeOf(MarketStats)).call(this));

        _this.statsInterval = null;

        var _marketUtils$getMarke = __WEBPACK_IMPORTED_MODULE_9_common_market_utils__["a" /* default */].getMarketID(props.base, props.quote),
            marketID = _marketUtils$getMarke.marketID,
            first = _marketUtils$getMarke.first,
            second = _marketUtils$getMarke.second;

        _this.state = {
            marketID: marketID,
            first: first,
            second: second
        };
        return _this;
    }

    _createClass(MarketStats, [{
        key: "_checkStats",
        value: function _checkStats() {
            var newStats = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { close: {} };
            var oldStats = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { close: {} };

            return newStats.volumeBase !== oldStats.volumeBase || !__WEBPACK_IMPORTED_MODULE_7_common_utils__["a" /* default */].are_equal_shallow(newStats.close && newStats.close.base, oldStats.close && oldStats.close.base) || !__WEBPACK_IMPORTED_MODULE_7_common_utils__["a" /* default */].are_equal_shallow(newStats.close && newStats.close.quote, oldStats.close && oldStats.close.quote);
        }
    }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(np) {
            return this._checkStats(np.allMarketStats.get(this.state.marketID), this.props.allMarketStats.get(this.state.marketID)) || np.base.get("id") !== this.props.base.get("id") || np.quote.get("id") !== this.props.quote.get("id");
        }
    }, {
        key: "componentWillMount",
        value: function componentWillMount() {
            __WEBPACK_IMPORTED_MODULE_4_actions_MarketsActions__["a" /* default */].getMarketStats.defer(this.state.second, this.state.first);
            this.statsChecked = new Date();
            this.statsInterval = setInterval(__WEBPACK_IMPORTED_MODULE_4_actions_MarketsActions__["a" /* default */].getMarketStats.bind(this, this.state.second, this.state.first), 35 * 1000);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            clearInterval(this.statsInterval);
        }
    }]);

    return MarketStats;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var MarketPriceInner = function (_MarketStats) {
    _inherits(MarketPriceInner, _MarketStats);

    function MarketPriceInner(props) {
        _classCallCheck(this, MarketPriceInner);

        return _possibleConstructorReturn(this, (MarketPriceInner.__proto__ || Object.getPrototypeOf(MarketPriceInner)).call(this, props));
    }

    _createClass(MarketPriceInner, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(np) {
            return _get(MarketPriceInner.prototype.__proto__ || Object.getPrototypeOf(MarketPriceInner.prototype), "shouldComponentUpdate", this).call(this, np);
        }
    }, {
        key: "render",
        value: function render() {
            var allMarketStats = this.props.allMarketStats;
            var marketID = this.state.marketID;

            var marketStats = allMarketStats.get(marketID);
            var price = marketStats && marketStats.price ? marketStats.price : null;
            // if (!price && marketStatsInverted && marketStatsInverted.price) {
            //     price = marketStatsInverted.price.invert();
            // }

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "span",
                { className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()("", this.props.className) },
                price ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__FormattedPrice__["a" /* default */], {
                    base_amount: price.base.amount, base_asset: price.base.asset_id,
                    quote_amount: price.quote.amount, quote_asset: price.quote.asset_id,
                    force_direction: this.props.force_direction,
                    hide_symbols: this.props.hide_symbols
                }) : "n/a"
            );
        }
    }]);

    return MarketPriceInner;
}(MarketStats);

MarketPriceInner.propTypes = {
    quote: __WEBPACK_IMPORTED_MODULE_1__Utility_ChainTypes__["a" /* default */].ChainAsset.isRequired,
    base: __WEBPACK_IMPORTED_MODULE_1__Utility_ChainTypes__["a" /* default */].ChainAsset.isRequired
};


MarketPriceInner = Object(__WEBPACK_IMPORTED_MODULE_2__Utility_BindToChainState__["a" /* default */])(MarketPriceInner);

var MarketPrice = function (_React$Component2) {
    _inherits(MarketPrice, _React$Component2);

    function MarketPrice() {
        _classCallCheck(this, MarketPrice);

        return _possibleConstructorReturn(this, (MarketPrice.__proto__ || Object.getPrototypeOf(MarketPrice)).apply(this, arguments));
    }

    _createClass(MarketPrice, [{
        key: "render",
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(MarketPriceInner, this.props);
        }
    }]);

    return MarketPrice;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

MarketPrice = Object(__WEBPACK_IMPORTED_MODULE_6_alt_react__["connect"])(MarketPrice, {
    listenTo: function listenTo() {
        return [__WEBPACK_IMPORTED_MODULE_5_stores_MarketsStore__["a" /* default */]];
    },
    getProps: function getProps() {
        return {
            allMarketStats: __WEBPACK_IMPORTED_MODULE_5_stores_MarketsStore__["a" /* default */].getState().allMarketStats
        };
    }
});



/***/ }),

/***/ 1663:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/react/react.js
var react = __webpack_require__(1);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-router/es/index.js + 32 modules
var es = __webpack_require__(34);

// EXTERNAL MODULE: ./node_modules/counterpart/index.js
var counterpart = __webpack_require__(3);
var counterpart_default = /*#__PURE__*/__webpack_require__.n(counterpart);

// EXTERNAL MODULE: ./node_modules/perfect-scrollbar/index.js
var perfect_scrollbar = __webpack_require__(1550);
var perfect_scrollbar_default = /*#__PURE__*/__webpack_require__.n(perfect_scrollbar);

// EXTERNAL MODULE: ./app/lib/common/utils.js
var utils = __webpack_require__(15);

// EXTERNAL MODULE: ./node_modules/react-translate-component/index.js
var react_translate_component = __webpack_require__(5);
var react_translate_component_default = /*#__PURE__*/__webpack_require__.n(react_translate_component);

// EXTERNAL MODULE: ./app/components/Utility/AssetName.jsx
var AssetName = __webpack_require__(124);

// EXTERNAL MODULE: ./node_modules/browser-locale/index.js
var browser_locale = __webpack_require__(1611);
var browser_locale_default = /*#__PURE__*/__webpack_require__.n(browser_locale);

// EXTERNAL MODULE: ./app/components/Utility/TransitionWrapper.jsx
var TransitionWrapper = __webpack_require__(1555);

// CONCATENATED MODULE: ./app/components/Exchange/OpenSettleOrders.jsx
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var OpenSettleOrders_TableHeader = function (_React$Component) {
    _inherits(TableHeader, _React$Component);

    function TableHeader() {
        _classCallCheck(this, TableHeader);

        return _possibleConstructorReturn(this, (TableHeader.__proto__ || Object.getPrototypeOf(TableHeader)).apply(this, arguments));
    }

    _createClass(TableHeader, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                baseSymbol = _props.baseSymbol,
                quoteSymbol = _props.quoteSymbol;


            return react_default.a.createElement(
                "thead",
                null,
                react_default.a.createElement(
                    "tr",
                    null,
                    react_default.a.createElement(
                        "th",
                        { style: { textAlign: "right" } },
                        react_default.a.createElement(react_translate_component_default.a, { content: "exchange.price" }),
                        react_default.a.createElement("br", null),
                        baseSymbol ? react_default.a.createElement(
                            "span",
                            { className: "header-sub-title" },
                            "(",
                            react_default.a.createElement(AssetName["a" /* default */], { name: baseSymbol }),
                            "/",
                            react_default.a.createElement(AssetName["a" /* default */], { name: quoteSymbol }),
                            ")"
                        ) : null
                    ),
                    react_default.a.createElement(
                        "th",
                        { style: { textAlign: "right" } },
                        react_default.a.createElement(react_translate_component_default.a, { content: "transfer.amount" }),
                        react_default.a.createElement("br", null),
                        quoteSymbol ? react_default.a.createElement(
                            "span",
                            { className: "header-sub-title" },
                            "(",
                            react_default.a.createElement(AssetName["a" /* default */], { name: quoteSymbol }),
                            ")"
                        ) : null
                    ),
                    react_default.a.createElement(
                        "th",
                        { style: { textAlign: "right" } },
                        react_default.a.createElement(react_translate_component_default.a, { content: "transaction.settlement_date" }),
                        react_default.a.createElement("br", null),
                        react_default.a.createElement(
                            "span",
                            { style: { visibility: "hidden" }, className: "header-sub-title" },
                            "d"
                        )
                    )
                )
            );
        }
    }]);

    return TableHeader;
}(react_default.a.Component);

OpenSettleOrders_TableHeader.defaultProps = {
    quoteSymbol: null,
    baseSymbol: null
};

var OpenSettleOrders_SettleOrderRow = function (_React$Component2) {
    _inherits(SettleOrderRow, _React$Component2);

    function SettleOrderRow() {
        _classCallCheck(this, SettleOrderRow);

        return _possibleConstructorReturn(this, (SettleOrderRow.__proto__ || Object.getPrototypeOf(SettleOrderRow)).apply(this, arguments));
    }

    _createClass(SettleOrderRow, [{
        key: "render",
        value: function render() {
            var _props2 = this.props,
                base = _props2.base,
                quote = _props2.quote,
                order = _props2.order,
                showSymbols = _props2.showSymbols;


            var price = base.get("id") == "1.3.0" ? order.getPrice() / (1 + order.offset_percent / 10000) : order.getPrice() * (1 + order.offset_percent / 10000);
            var amountSymbol = showSymbols ? " " + quote.get("symbol") : null;

            return react_default.a.createElement(
                "tr",
                { style: { paddingRight: 5 } },
                react_default.a.createElement(
                    "td",
                    { style: { textAlign: "right", width: "25%" } },
                    utils["a" /* default */].format_number(price, quote.get("precision")),
                    " ",
                    amountSymbol
                ),
                react_default.a.createElement(
                    "td",
                    { style: { textAlign: "right", width: "25%" } },
                    utils["a" /* default */].format_number(order[!order.isBid() ? "amountForSale" : "amountToReceive"]().getAmount({ real: true }), quote.get("precision"))
                ),
                react_default.a.createElement(
                    "td",
                    { style: { textAlign: "right", width: "25%" } },
                    utils["a" /* default */].format_number(order[!order.isBid() ? "amountToReceive" : "amountForSale"]().getAmount({ real: true }), base.get("precision"))
                ),
                react_default.a.createElement(
                    "td",
                    { style: { textAlign: "right", width: "25%" }, className: "tooltip", "data-tip": new Date(order.settlement_date) },
                    counterpart_default.a.localize(new Date(order.settlement_date), { type: "date", format: browser_locale_default()().toLowerCase().indexOf("en-us") !== -1 ? "market_history_us" : "market_history" })
                )
            );
        }
    }]);

    return SettleOrderRow;
}(react_default.a.Component);

OpenSettleOrders_SettleOrderRow.defaultProps = {
    showSymbols: false,
    invert: false
};

var OpenSettleOrders_OpenSettleOrders = function (_React$Component3) {
    _inherits(OpenSettleOrders, _React$Component3);

    function OpenSettleOrders() {
        _classCallCheck(this, OpenSettleOrders);

        return _possibleConstructorReturn(this, (OpenSettleOrders.__proto__ || Object.getPrototypeOf(OpenSettleOrders)).apply(this, arguments));
    }

    _createClass(OpenSettleOrders, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps) {
            return nextProps.currentAccount !== this.props.currentAccount || nextProps.orders !== this.props.orders;
        }
    }, {
        key: "render",
        value: function render() {
            var _props3 = this.props,
                orders = _props3.orders,
                base = _props3.base,
                quote = _props3.quote;


            var activeOrders = null;

            if (orders.size > 0 && base && quote) {
                var index = 0;

                activeOrders = orders.sort(function (a, b) {
                    return a.isBefore(b) ? -1 : 1;
                }).map(function (order) {
                    return Date.now() < order.settlement_date ? react_default.a.createElement(OpenSettleOrders_SettleOrderRow, { key: index++, order: order, base: base, quote: quote }) : null;
                }).toArray();
            } else {
                return null;
            }

            return react_default.a.createElement(
                TransitionWrapper["a" /* default */],
                { component: "tbody", transitionName: "newrow" },
                activeOrders
            );
        }
    }]);

    return OpenSettleOrders;
}(react_default.a.Component);

OpenSettleOrders_OpenSettleOrders.defaultProps = {
    base: {},
    quote: {},
    orders: {},
    quoteSymbol: "",
    baseSymbol: ""
};

OpenSettleOrders_OpenSettleOrders.propTypes = {
    base: react["PropTypes"].object.isRequired,
    quote: react["PropTypes"].object.isRequired,
    orders: react["PropTypes"].object.isRequired,
    quoteSymbol: react["PropTypes"].string.isRequired,
    baseSymbol: react["PropTypes"].string.isRequired
};

/* harmony default export */ var Exchange_OpenSettleOrders = (OpenSettleOrders_OpenSettleOrders);
// EXTERNAL MODULE: ./app/components/Utility/PriceText.jsx
var PriceText = __webpack_require__(1606);

// EXTERNAL MODULE: ./app/actions/SettingsActions.js
var SettingsActions = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(28);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./app/components/Icon/Icon.jsx
var Icon = __webpack_require__(59);

// EXTERNAL MODULE: ./node_modules/seerjs/es/index.js + 7 modules
var seerjs_es = __webpack_require__(6);

// EXTERNAL MODULE: ./app/lib/common/MarketClasses.js
var MarketClasses = __webpack_require__(145);

// EXTERNAL MODULE: ./app/components/Utility/EquivalentValueComponent.jsx
var EquivalentValueComponent = __webpack_require__(1595);

// EXTERNAL MODULE: ./app/components/Utility/MarketPrice.jsx
var MarketPrice = __webpack_require__(1644);

// EXTERNAL MODULE: ./app/components/Utility/FormattedPrice.jsx
var FormattedPrice = __webpack_require__(149);

// CONCATENATED MODULE: ./app/components/Exchange/MyOpenOrders.jsx
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MyOpenOrders_OrderRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MyOpenOrders_TableHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyOpenOrders_MyOpenOrders; });
var MyOpenOrders__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function MyOpenOrders__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function MyOpenOrders__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function MyOpenOrders__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




















var leftAlign = { textAlign: "left" };

var MyOpenOrders_TableHeader = function (_React$Component) {
    MyOpenOrders__inherits(TableHeader, _React$Component);

    function TableHeader() {
        MyOpenOrders__classCallCheck(this, TableHeader);

        return MyOpenOrders__possibleConstructorReturn(this, (TableHeader.__proto__ || Object.getPrototypeOf(TableHeader)).apply(this, arguments));
    }

    MyOpenOrders__createClass(TableHeader, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                baseSymbol = _props.baseSymbol,
                quoteSymbol = _props.quoteSymbol,
                dashboard = _props.dashboard,
                isMyAccount = _props.isMyAccount,
                settings = _props.settings;

            var preferredUnit = settings ? settings.get("unit") : "1.3.0";

            return !dashboard ? react_default.a.createElement(
                "thead",
                null,
                react_default.a.createElement(
                    "tr",
                    null,
                    react_default.a.createElement(
                        "th",
                        { style: { textAlign: this.props.leftAlign ? "left" : "" } },
                        react_default.a.createElement(react_translate_component_default.a, { className: "header-sub-title", content: "exchange.price" })
                    ),
                    react_default.a.createElement(
                        "th",
                        { style: this.props.leftAlign ? { textAlign: "left" } : null },
                        baseSymbol ? react_default.a.createElement(
                            "span",
                            { className: "header-sub-title" },
                            react_default.a.createElement(AssetName["a" /* default */], { dataPlace: "top", name: quoteSymbol })
                        ) : null
                    ),
                    react_default.a.createElement(
                        "th",
                        { style: this.props.leftAlign ? { textAlign: "left" } : null },
                        baseSymbol ? react_default.a.createElement(
                            "span",
                            { className: "header-sub-title" },
                            react_default.a.createElement(AssetName["a" /* default */], { dataPlace: "top", name: baseSymbol })
                        ) : null
                    ),
                    react_default.a.createElement(
                        "th",
                        { style: { textAlign: this.props.leftAlign ? "left" : "" } },
                        react_default.a.createElement(react_translate_component_default.a, { className: "header-sub-title", content: "transaction.expiration" })
                    ),
                    react_default.a.createElement("th", { style: { width: "6%" } })
                )
            ) : react_default.a.createElement(
                "thead",
                null,
                react_default.a.createElement(
                    "tr",
                    null,
                    react_default.a.createElement(
                        "th",
                        { style: leftAlign, colSpan: "5" },
                        react_default.a.createElement(react_translate_component_default.a, { content: "exchange.description" })
                    ),
                    react_default.a.createElement(
                        "th",
                        { style: leftAlign },
                        react_default.a.createElement(react_translate_component_default.a, { content: "exchange.price" })
                    ),
                    react_default.a.createElement(
                        "th",
                        { style: leftAlign },
                        react_default.a.createElement(react_translate_component_default.a, { content: "exchange.price_market" })
                    ),
                    react_default.a.createElement(
                        "th",
                        { style: { textAlign: "right" } },
                        react_default.a.createElement(react_translate_component_default.a, { content: "exchange.value" })
                    ),
                    react_default.a.createElement(
                        "th",
                        null,
                        react_default.a.createElement(react_translate_component_default.a, { content: "account.trade" })
                    ),
                    isMyAccount ? react_default.a.createElement(
                        "th",
                        { id: "cancelAllOrders", style: { cursor: "pointer" } },
                        react_default.a.createElement(react_translate_component_default.a, { content: "wallet.cancel" })
                    ) : null
                )
            );
        }
    }]);

    return TableHeader;
}(react_default.a.Component);

MyOpenOrders_TableHeader.defaultProps = {
    quoteSymbol: null,
    baseSymbol: null
};

var MyOpenOrders_OrderRow = function (_React$Component2) {
    MyOpenOrders__inherits(OrderRow, _React$Component2);

    function OrderRow() {
        MyOpenOrders__classCallCheck(this, OrderRow);

        return MyOpenOrders__possibleConstructorReturn(this, (OrderRow.__proto__ || Object.getPrototypeOf(OrderRow)).apply(this, arguments));
    }

    MyOpenOrders__createClass(OrderRow, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps) {
            return nextProps.order.for_sale !== this.props.order.for_sale || nextProps.order.id !== this.props.order.id || nextProps.quote !== this.props.quote || nextProps.base !== this.props.base || nextProps.order.market_base !== this.props.order.market_base;
        }
    }, {
        key: "render",
        value: function render() {
            var _props2 = this.props,
                base = _props2.base,
                quote = _props2.quote,
                order = _props2.order,
                showSymbols = _props2.showSymbols,
                dashboard = _props2.dashboard,
                isMyAccount = _props2.isMyAccount,
                settings = _props2.settings;

            var isBid = order.isBid();
            var isCall = order.isCall();
            var tdClass = isCall ? "orderHistoryCall" : isBid ? "orderHistoryBid" : "orderHistoryAsk";

            var priceSymbol = showSymbols ? react_default.a.createElement(
                "span",
                null,
                " " + base.get("symbol") + "/" + quote.get("symbol")
            ) : null;
            var valueSymbol = showSymbols ? " " + base.get("symbol") : null;
            var amountSymbol = showSymbols ? " " + quote.get("symbol") : null;
            var preferredUnit = settings ? settings.get("unit") : "1.3.0";
            var quoteColor = !isBid ? "value negative" : "value positive";
            var baseColor = isBid ? "value negative" : "value positive";

            return !dashboard ? react_default.a.createElement(
                "tr",
                { key: order.id },
                react_default.a.createElement(
                    "td",
                    { className: tdClass, style: { paddingLeft: 10 } },
                    react_default.a.createElement(PriceText["a" /* default */], { price: order.getPrice(), base: base, quote: quote }),
                    priceSymbol
                ),
                react_default.a.createElement(
                    "td",
                    null,
                    utils["a" /* default */].format_number(order[!isBid ? "amountForSale" : "amountToReceive"]().getAmount({ real: true }), quote.get("precision")),
                    " ",
                    amountSymbol
                ),
                react_default.a.createElement(
                    "td",
                    null,
                    utils["a" /* default */].format_number(order[!isBid ? "amountToReceive" : "amountForSale"]().getAmount({ real: true }), base.get("precision")),
                    " ",
                    valueSymbol
                ),
                react_default.a.createElement(
                    "td",
                    { style: { width: "25%", textAlign: "right" }, className: "tooltip", "data-tip": new Date(order.expiration) },
                    counterpart_default.a.localize(new Date(order.expiration), { type: "date", format: "short_custom" })
                ),
                react_default.a.createElement(
                    "td",
                    { className: "text-center", style: { width: "6%" } },
                    isCall ? null : react_default.a.createElement(
                        "a",
                        { style: { marginRight: 0 }, className: "order-cancel", onClick: this.props.onCancel },
                        react_default.a.createElement(Icon["a" /* default */], { name: "cross-circle", className: "icon-14px" })
                    )
                )
            ) : react_default.a.createElement(
                "tr",
                { key: order.id, className: "clickable" },
                react_default.a.createElement(
                    "td",
                    { colSpan: "5", style: leftAlign, onClick: this.props.onFlip },
                    isBid ? react_default.a.createElement(react_translate_component_default.a, {
                        content: "exchange.buy_description",
                        baseAsset: utils["a" /* default */].format_number(order[isBid ? "amountToReceive" : "amountForSale"]().getAmount({ real: true }), base.get("precision"), false),
                        quoteAsset: utils["a" /* default */].format_number(order[isBid ? "amountForSale" : "amountToReceive"]().getAmount({ real: true }), quote.get("precision"), false),
                        baseName: react_default.a.createElement(AssetName["a" /* default */], { noTip: true, customClass: quoteColor, name: quote.get("symbol") }),
                        quoteName: react_default.a.createElement(AssetName["a" /* default */], { noTip: true, customClass: baseColor, name: base.get("symbol") })
                    }) : react_default.a.createElement(react_translate_component_default.a, {
                        content: "exchange.sell_description",
                        baseAsset: utils["a" /* default */].format_number(order[isBid ? "amountToReceive" : "amountForSale"]().getAmount({ real: true }), base.get("precision"), false),
                        quoteAsset: utils["a" /* default */].format_number(order[isBid ? "amountForSale" : "amountToReceive"]().getAmount({ real: true }), quote.get("precision"), false),
                        baseName: react_default.a.createElement(AssetName["a" /* default */], { noTip: true, customClass: quoteColor, name: quote.get("symbol") }),
                        quoteName: react_default.a.createElement(AssetName["a" /* default */], { noTip: true, customClass: baseColor, name: base.get("symbol") })
                    })
                ),
                react_default.a.createElement(
                    "td",
                    { style: leftAlign, onClick: this.props.onFlip },
                    react_default.a.createElement(FormattedPrice["a" /* default */], {
                        base_amount: order.sellPrice().base.amount, base_asset: order.sellPrice().base.asset_id,
                        quote_amount: order.sellPrice().quote.amount, quote_asset: order.sellPrice().quote.asset_id,
                        force_direction: base.get("symbol"),
                        hide_symbols: true
                    })
                ),
                react_default.a.createElement(
                    "td",
                    { style: leftAlign, onClick: this.props.onFlip },
                    isBid ? react_default.a.createElement(MarketPrice["a" /* MarketPrice */], {
                        base: base.get("id"),
                        quote: quote.get("id"),
                        force_direction: base.get("symbol"),
                        hide_symbols: true,
                        hide_asset: true
                    }) : react_default.a.createElement(MarketPrice["a" /* MarketPrice */], {
                        base: base.get("id"),
                        quote: quote.get("id"),
                        force_direction: base.get("symbol"),
                        hide_symbols: true,
                        hide_asset: true
                    })
                ),
                react_default.a.createElement(
                    "td",
                    { style: { textAlign: "right" }, onClick: this.props.onFlip },
                    react_default.a.createElement(EquivalentValueComponent["a" /* EquivalentValueComponent */], { hide_asset: true, amount: order.amountForSale().getAmount(), fromAsset: order.amountForSale().asset_id, noDecimals: true, toAsset: preferredUnit }),
                    " ",
                    react_default.a.createElement(AssetName["a" /* default */], { name: preferredUnit })
                ),
                react_default.a.createElement(
                    "td",
                    null,
                    react_default.a.createElement(
                        es["b" /* Link */],
                        { to: "/market/" + quote.get("symbol") + "_" + base.get("symbol") },
                        react_default.a.createElement(Icon["a" /* default */], { name: "trade", className: "icon-14px" })
                    )
                ),
                isMyAccount ? react_default.a.createElement(
                    "td",
                    { className: "text-center", style: { padding: "2px 5px" } },
                    isCall ? null : react_default.a.createElement(
                        "span",
                        { style: { marginRight: 0 }, className: "order-cancel" },
                        react_default.a.createElement("input", { type: "checkbox", className: "orderCancel", onChange: this.props.onCheckCancel })
                    )
                ) : null
            );
        }
    }]);

    return OrderRow;
}(react_default.a.Component);

MyOpenOrders_OrderRow.defaultProps = {
    showSymbols: false
};

var MyOpenOrders_MyOpenOrders = function (_React$Component3) {
    MyOpenOrders__inherits(MyOpenOrders, _React$Component3);

    function MyOpenOrders(props) {
        MyOpenOrders__classCallCheck(this, MyOpenOrders);

        var _this3 = MyOpenOrders__possibleConstructorReturn(this, (MyOpenOrders.__proto__ || Object.getPrototypeOf(MyOpenOrders)).call(this));

        _this3.state = {
            activeTab: props.activeTab
        };
        _this3._getOrders = _this3._getOrders.bind(_this3);
        return _this3;
    }

    MyOpenOrders__createClass(MyOpenOrders, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var contentContainer = this.refs.container;
            if (contentContainer) perfect_scrollbar_default.a.initialize(contentContainer);
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            var contentContainer = this.refs.container;
            if (contentContainer) perfect_scrollbar_default.a.update(contentContainer);
        }
    }, {
        key: "_getOrders",
        value: function _getOrders() {
            var _assets;

            var _props3 = this.props,
                currentAccount = _props3.currentAccount,
                base = _props3.base,
                quote = _props3.quote,
                feedPrice = _props3.feedPrice;

            var orders = currentAccount.get("orders"),
                call_orders = currentAccount.get("call_orders");
            var baseID = base.get("id"),
                quoteID = quote.get("id");
            var assets = (_assets = {}, _defineProperty(_assets, base.get("id"), { precision: base.get("precision") }), _defineProperty(_assets, quote.get("id"), { precision: quote.get("precision") }), _assets);
            var limitOrders = orders.toArray().map(function (order) {
                var o = seerjs_es["b" /* ChainStore */].getObject(order);
                if (!o) return null;
                var sellBase = o.getIn(["sell_price", "base", "asset_id"]),
                    sellQuote = o.getIn(["sell_price", "quote", "asset_id"]);
                if (sellBase === baseID && sellQuote === quoteID || sellBase === quoteID && sellQuote === baseID) {
                    return new MarketClasses["d" /* LimitOrder */](o.toJS(), assets, quote.get("id"));
                }
            }).filter(function (a) {
                return !!a;
            });

            var callOrders = call_orders.toArray().map(function (order) {
                try {
                    var o = seerjs_es["b" /* ChainStore */].getObject(order);
                    if (!o) return null;
                    var sellBase = o.getIn(["call_price", "base", "asset_id"]),
                        sellQuote = o.getIn(["call_price", "quote", "asset_id"]);
                    if (sellBase === baseID && sellQuote === quoteID || sellBase === quoteID && sellQuote === baseID) {
                        return feedPrice ? new MarketClasses["b" /* CallOrder */](o.toJS(), assets, quote.get("id"), feedPrice) : null;
                    }
                } catch (e) {
                    return null;
                }
            }).filter(function (a) {
                return !!a;
            }).filter(function (a) {
                try {
                    return a.isMarginCalled();
                } catch (err) {
                    return false;
                }
            });
            return limitOrders.concat(callOrders);
        }
    }, {
        key: "_changeTab",
        value: function _changeTab(tab) {
            SettingsActions["a" /* default */].changeViewSetting({
                ordersTab: tab
            });
            this.setState({
                activeTab: tab
            });

            // Ensure that focus goes back to top of scrollable container when tab is changed
            var contentContainer = this.refs.container;
            contentContainer.scrollTop = 0;
            perfect_scrollbar_default.a.update(contentContainer);

            setTimeout(ReactTooltip.rebuild, 1000);
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            var _props4 = this.props,
                base = _props4.base,
                quote = _props4.quote,
                quoteSymbol = _props4.quoteSymbol,
                baseSymbol = _props4.baseSymbol,
                settleOrders = _props4.settleOrders;
            var activeTab = this.state.activeTab;


            if (!base || !quote) return null;

            var contentContainer = void 0;

            // Is asset a BitAsset with Settlements
            var baseIsBitAsset = base.get("bitasset_data_id") && settleOrders.size > 0 ? true : false;
            var quoteIsBitAsset = quote.get("bitasset_data_id") && settleOrders.size > 0 ? true : false;

            // Default Tab
            if (!activeTab || !baseIsBitAsset && !quoteIsBitAsset) {
                activeTab = "my_orders";
            }

            {/* Users Open Orders Tab (default) */}
            if (activeTab == "my_orders") {
                var orders = this._getOrders();
                var emptyRow = react_default.a.createElement(
                    "tr",
                    null,
                    react_default.a.createElement(
                        "td",
                        { style: { textAlign: "center" }, colSpan: "5" },
                        react_default.a.createElement(react_translate_component_default.a, { content: "account.no_orders" })
                    )
                );

                var bids = orders.filter(function (a) {
                    return a.isBid();
                }).sort(function (a, b) {
                    return b.getPrice() - a.getPrice();
                }).map(function (order) {
                    var price = order.getPrice();
                    return react_default.a.createElement(MyOpenOrders_OrderRow, { price: price, key: order.id, order: order, base: base, quote: quote, onCancel: _this4.props.onCancel.bind(_this4, order.id) });
                });

                var asks = orders.filter(function (a) {
                    return !a.isBid();
                }).sort(function (a, b) {
                    return a.getPrice() - b.getPrice();
                }).map(function (order) {
                    var price = order.getPrice();
                    return react_default.a.createElement(MyOpenOrders_OrderRow, { price: price, key: order.id, order: order, base: base, quote: quote, onCancel: _this4.props.onCancel.bind(_this4, order.id) });
                });

                var rows = [];

                if (asks.length) {
                    rows = rows.concat(asks);
                }

                if (bids.length) {
                    rows = rows.concat(bids);
                }

                rows.sort(function (a, b) {
                    return a.props.price - b.props.price;
                });

                contentContainer = react_default.a.createElement(
                    TransitionWrapper["a" /* default */],
                    { component: "tbody", transitionName: "newrow" },
                    rows.length ? rows : emptyRow
                );
            }

            {/* Open Settle Orders */}

            if (activeTab && activeTab == "open_settlement") {
                contentContainer = react_default.a.createElement(Exchange_OpenSettleOrders, {
                    key: "settle_orders",
                    orders: settleOrders,
                    base: base,
                    quote: quote,
                    baseSymbol: baseSymbol,
                    quoteSymbol: quoteSymbol
                });
            }

            var hc = "mymarkets-header clickable";
            var myOrdersClass = classnames_default()(hc, { inactive: activeTab !== "my_orders" });
            var openSettlementClass = classnames_default()(hc, { inactive: activeTab !== "open_settlement" });
            var myOrdersWidth = baseIsBitAsset || quoteIsBitAsset ? "50%" : "100%";
            var openSettlementWidth = baseIsBitAsset || quoteIsBitAsset ? "inherit" : "none";

            return react_default.a.createElement(
                "div",
                {
                    style: { marginBottom: "15px" },
                    key: "open_orders",
                    className: this.props.className
                },
                react_default.a.createElement(
                    "div",
                    { className: "exchange-bordered small-12", style: { height: 266 } },
                    react_default.a.createElement(
                        "div",
                        { className: "grid-block shrink left-orderbook-header" },
                        react_default.a.createElement(
                            "div",
                            { style: { width: myOrdersWidth }, className: myOrdersClass, onClick: this._changeTab.bind(this, "my_orders") },
                            react_default.a.createElement(react_translate_component_default.a, { content: "exchange.my_orders" })
                        ),
                        react_default.a.createElement(
                            "div",
                            { style: { display: openSettlementWidth }, className: openSettlementClass, onClick: this._changeTab.bind(this, "open_settlement") },
                            react_default.a.createElement(react_translate_component_default.a, { content: "exchange.settle_orders" })
                        )
                    ),
                    react_default.a.createElement(
                        "div",
                        { className: "grid-block shrink left-orderbook-header market-right-padding-only" },
                        react_default.a.createElement(
                            "table",
                            { className: "table order-table text-right fixed-table market-right-padding" },
                            activeTab == "my_orders" ? react_default.a.createElement(MyOpenOrders_TableHeader, { rightAlign: true, type: "sell", baseSymbol: baseSymbol, quoteSymbol: quoteSymbol }) : react_default.a.createElement(
                                "thead",
                                null,
                                react_default.a.createElement(
                                    "tr",
                                    null,
                                    react_default.a.createElement(
                                        "th",
                                        null,
                                        react_default.a.createElement(react_translate_component_default.a, { className: "header-sub-title", content: "exchange.price" })
                                    ),
                                    react_default.a.createElement(
                                        "th",
                                        null,
                                        react_default.a.createElement(
                                            "span",
                                            { className: "header-sub-title" },
                                            react_default.a.createElement(AssetName["a" /* default */], { dataPlace: "top", name: quoteSymbol })
                                        )
                                    ),
                                    react_default.a.createElement(
                                        "th",
                                        null,
                                        react_default.a.createElement(
                                            "span",
                                            { className: "header-sub-title" },
                                            react_default.a.createElement(AssetName["a" /* default */], { dataPlace: "top", name: baseSymbol })
                                        )
                                    ),
                                    react_default.a.createElement(
                                        "th",
                                        null,
                                        react_default.a.createElement(react_translate_component_default.a, { className: "header-sub-title", content: "explorer.block.date" })
                                    )
                                )
                            )
                        )
                    ),
                    react_default.a.createElement(
                        "div",
                        { className: "table-container grid-block market-right-padding-only no-overflow", ref: "container", style: { overflow: "hidden", maxHeight: 200 } },
                        react_default.a.createElement(
                            "table",
                            { className: "table order-table text-right fixed-table market-right-padding" },
                            contentContainer
                        )
                    )
                )
            );
        }
    }]);

    return MyOpenOrders;
}(react_default.a.Component);

MyOpenOrders_MyOpenOrders.defaultProps = {
    base: {},
    quote: {},
    orders: {},
    quoteSymbol: "",
    baseSymbol: ""
};

MyOpenOrders_MyOpenOrders.propTypes = {
    base: react["PropTypes"].object.isRequired,
    quote: react["PropTypes"].object.isRequired,
    orders: react["PropTypes"].object.isRequired,
    quoteSymbol: react["PropTypes"].string.isRequired,
    baseSymbol: react["PropTypes"].string.isRequired
};



/***/ }),

/***/ 1664:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_foundation_apps_src_utils_foundation_api__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_foundation_apps_src_utils_foundation_api___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_foundation_apps_src_utils_foundation_api__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Modal_BaseModal__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_translate_component__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_translate_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_translate_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_common_MarketClasses__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_common_utils__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Utility_BindToChainState__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Utility_ChainTypes__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_actions_AccountActions__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react_tooltip__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_react_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_counterpart__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_counterpart___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_counterpart__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_common_blockTradesMethods__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Utility_CopyButton__ = __webpack_require__(697);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Icon_Icon__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__LoadingIndicator__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_common_trxHelper__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__Utility_AssetName__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_seerjs_es__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_lodash__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__Exchange_ExchangeInput__ = __webpack_require__(702);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_api_apiConfig__ = __webpack_require__(125);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }























// import DepositFiatOpenLedger from "components/DepositWithdraw/openledger/DepositFiatOpenLedger";
// import WithdrawFiatOpenLedger from "components/DepositWithdraw/openledger/WithdrawFiatOpenLedger";

var DepositWithdrawContent = function (_DecimalChecker) {
    _inherits(DepositWithdrawContent, _DecimalChecker);

    function DepositWithdrawContent(props) {
        _classCallCheck(this, DepositWithdrawContent);

        var _this = _possibleConstructorReturn(this, (DepositWithdrawContent.__proto__ || Object.getPrototypeOf(DepositWithdrawContent)).call(this));

        _this.state = {
            toAddress: __WEBPACK_IMPORTED_MODULE_11_common_blockTradesMethods__["a" /* WithdrawAddresses */].getLast(props.walletType),
            withdrawValue: "",
            amountError: null,
            symbol: props.asset.get("symbol"),
            to_withdraw: new __WEBPACK_IMPORTED_MODULE_4_common_MarketClasses__["a" /* Asset */]({
                asset_id: props.asset.get("id"),
                precision: props.asset.get("precision")
            }),
            fee_asset_id: "1.3.0",
            feeStatus: {},
            loading: false,
            emptyAddressDeposit: false
        };

        _this._validateAddress(_this.state.toAddress, props);

        _this.addDepositAddress = _this.addDepositAddress.bind(_this);
        _this._checkFeeStatus = _this._checkFeeStatus.bind(_this);
        _this._checkBalance = _this._checkBalance.bind(_this);
        _this._getCurrentBalance = _this._getCurrentBalance.bind(_this);
        _this._getFee = _this._getFee.bind(_this);
        _this._updateFee = Object(__WEBPACK_IMPORTED_MODULE_18_lodash__["debounce"])(_this._updateFee.bind(_this), 250);
        return _this;
    }

    _createClass(DepositWithdrawContent, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this._getDepositAddress();

            this._updateFee();
            this._checkFeeStatus();
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(np) {
            if (np.asset && this.props.asset && np.asset.get("id") !== this.props.asset.get("id")) {
                this.setState({
                    to_withdraw: new __WEBPACK_IMPORTED_MODULE_4_common_MarketClasses__["a" /* Asset */]({
                        asset_id: np.asset.get("id"),
                        precision: np.asset.get("precision")
                    }),
                    gateFee: np.asset.get("gateFee"),
                    intermediateAccount: np.asset.get("intermediateAccount"),
                    symbol: np.asset.get("symbol"),
                    memo: "",
                    withdrawValue: "",
                    receive_address: null,
                    toAddress: __WEBPACK_IMPORTED_MODULE_11_common_blockTradesMethods__["a" /* WithdrawAddresses */].getLast(np.walletType)
                }, this._getDepositAddress);
            }
        }
    }, {
        key: "_getDepositAddress",
        value: function _getDepositAddress() {
            if (!this.props.backingCoinType) return;

            var receive_address = Object(__WEBPACK_IMPORTED_MODULE_11_common_blockTradesMethods__["j" /* getDepositAddress */])({ coin: "open." + this.props.backingCoinType.toLowerCase(), account: this.props.account, stateCallback: this.addDepositAddress });

            if (!receive_address) {
                Object(__WEBPACK_IMPORTED_MODULE_11_common_blockTradesMethods__["l" /* requestDepositAddress */])(this._getDepositObject());
            } else {
                this.setState({
                    receive_address: receive_address
                });
            }
        }
    }, {
        key: "_getDepositObject",
        value: function _getDepositObject() {
            return {
                inputCoinType: this.props.backingCoinType.toLowerCase(),
                outputCoinType: this.props.symbol.toLowerCase(),
                outputAddress: this.props.sender.get("name"),
                stateCallback: this.addDepositAddress
            };
        }
    }, {
        key: "requestDepositAddressLoad",
        value: function requestDepositAddressLoad() {
            this.setState({
                loading: true,
                emptyAddressDeposit: false
            });
            Object(__WEBPACK_IMPORTED_MODULE_11_common_blockTradesMethods__["l" /* requestDepositAddress */])(this._getDepositObject());
        }
    }, {
        key: "addDepositAddress",
        value: function addDepositAddress(receive_address) {
            if (receive_address.error) {
                receive_address.error.message === "no_address" ? this.setState({ emptyAddressDeposit: true }) : this.setState({ emptyAddressDeposit: false });
            };

            this.setState({
                receive_address: receive_address,
                loading: false
            });
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            __WEBPACK_IMPORTED_MODULE_9_react_tooltip___default.a.rebuild();
        }
    }, {
        key: "onSubmit",
        value: function onSubmit(e) {
            e.preventDefault();
            if (this.state.to_withdraw.getAmount() === 0) {
                return this.setState({
                    amountError: "transfer.errors.pos"
                });
            }

            if (!this.props.intermediateAccount) return;

            var fee = this._getFee();
            var gateFee = this._getGateFee();

            var sendAmount = this.state.to_withdraw.clone();

            var balanceAmount = sendAmount.clone(this._getCurrentBalance().get("balance"));

            sendAmount.plus(gateFee);

            /* Insufficient balance */
            if (balanceAmount.lt(sendAmount)) {
                // Send the originally entered amount
                sendAmount = this.state.to_withdraw.clone();
            }

            __WEBPACK_IMPORTED_MODULE_8_actions_AccountActions__["a" /* default */].transfer(this.props.sender.get("id"), this.props.intermediateAccount, this.state.to_withdraw.getAmount(), this.state.to_withdraw.asset_id, this.props.backingCoinType.toLowerCase() + ":" + this.state.toAddress + (this.state.memo ? ":" + new Buffer(this.state.memo, "utf-8") : ""), null, fee.asset_id);
        }
    }, {
        key: "_updateAmount",
        value: function _updateAmount() {
            var feeAmount = this._getFee();
            var currentBalance = this._getCurrentBalance();

            var total = new __WEBPACK_IMPORTED_MODULE_4_common_MarketClasses__["a" /* Asset */]({
                amount: currentBalance ? currentBalance.get("balance") : 0,
                asset_id: this.props.asset.get("id"),
                precision: this.props.asset.get("precision")
            });

            // Subtract the fee if it is using the same asset
            if (total.asset_id === feeAmount.asset_id) {
                total.minus(feeAmount);
            }

            this.state.to_withdraw.setAmount({ sats: total.getAmount() });
            this.setState({
                withdrawValue: total.getAmount({ real: true }),
                amountError: null
            }, this._checkBalance);
        }
    }, {
        key: "_checkFeeStatus",
        value: function _checkFeeStatus() {
            var _this2 = this;

            var account = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.sender;

            if (!account) return;

            var assets = ["1.3.0", this.state.to_withdraw.asset_id];
            var feeStatus = {};
            var p = [];
            assets.forEach(function (a) {
                p.push(Object(__WEBPACK_IMPORTED_MODULE_15_common_trxHelper__["b" /* checkFeeStatusAsync */])({
                    accountID: account.get("id"),
                    feeID: a,
                    options: ["price_per_kbyte"],
                    data: {
                        type: "memo",
                        content: _this2.props.backingCoinType.toLowerCase() + ":" + _this2.state.toAddress + (_this2.state.memo ? ":" + _this2.state.memo : "")
                    }
                }));
            });
            Promise.all(p).then(function (status) {
                assets.forEach(function (a, idx) {
                    feeStatus[a] = status[idx];
                });
                if (!__WEBPACK_IMPORTED_MODULE_5_common_utils__["a" /* default */].are_equal_shallow(_this2.state.feeStatus, feeStatus)) {
                    _this2.setState({
                        feeStatus: feeStatus
                    });
                }
                _this2._checkBalance();
            }).catch(function (err) {
                console.error(err);
            });
        }
    }, {
        key: "_updateFee",
        value: function _updateFee() {
            var _this3 = this;

            var fee_asset_id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.fee_asset_id;

            if (!this.props.sender) return null;
            Object(__WEBPACK_IMPORTED_MODULE_15_common_trxHelper__["b" /* checkFeeStatusAsync */])({
                accountID: this.props.sender.get("id"),
                feeID: fee_asset_id,
                options: ["price_per_kbyte"],
                data: {
                    type: "memo",
                    content: this.props.backingCoinType.toLowerCase() + ":" + this.state.toAddress + (this.state.memo ? ":" + this.state.memo : "")
                }
            }).then(function (_ref) {
                var fee = _ref.fee,
                    hasBalance = _ref.hasBalance,
                    hasPoolBalance = _ref.hasPoolBalance;

                _this3.setState({
                    feeAmount: fee,
                    hasBalance: hasBalance,
                    hasPoolBalance: hasPoolBalance,
                    error: !hasBalance || !hasPoolBalance
                }, _this3._checkFeeStatus);
            });
        }
    }, {
        key: "_getCurrentBalance",
        value: function _getCurrentBalance() {
            var _this4 = this;

            return this.props.balances.find(function (b) {
                return b && b.get("asset_type") === _this4.props.asset.get("id");
            });
        }
    }, {
        key: "_checkBalance",
        value: function _checkBalance() {
            var _state = this.state,
                feeAmount = _state.feeAmount,
                to_withdraw = _state.to_withdraw;
            var asset = this.props.asset;

            var balance = this._getCurrentBalance();
            if (!balance || !feeAmount) return;
            var hasBalance = Object(__WEBPACK_IMPORTED_MODULE_15_common_trxHelper__["a" /* checkBalance */])(to_withdraw.getAmount({ real: true }), asset, this._getFee(), balance, this._getGateFee());
            if (hasBalance === null) return;
            if (this.state.balanceError !== !hasBalance) this.setState({ balanceError: !hasBalance });

            return hasBalance;
        }
    }, {
        key: "_getFee",
        value: function _getFee() {
            var defaultFee = { getAmount: function getAmount() {
                    return 0;
                }, asset_id: this.state.fee_asset_id };

            if (!this.state.feeStatus || !this.state.feeAmount) return defaultFee;

            var coreStatus = this.state.feeStatus["1.3.0"];
            var withdrawAssetStatus = this.state.feeStatus[this.state.to_withdraw.asset_id];
            // Use core asset to pay the fees if present and balance is sufficient since it's cheapest
            if (coreStatus && coreStatus.hasBalance) return coreStatus.fee;
            // Use same asset as withdraw if not
            if (coreStatus && !coreStatus.hasBalance && withdrawAssetStatus && withdrawAssetStatus.hasBalance) {
                return withdrawAssetStatus.fee;
            }
            return coreStatus ? coreStatus.fee : defaultFee;
        }
    }, {
        key: "_onInputAmount",
        value: function _onInputAmount(e) {
            try {
                this.state.to_withdraw.setAmount({
                    real: parseFloat(e.target.value || 0)
                });
                this.setState({
                    withdrawValue: e.target.value,
                    amountError: null
                }, this._checkBalance);
            } catch (err) {
                console.error("err:", err);
            }
        }
    }, {
        key: "_onInputTo",
        value: function _onInputTo(e) {
            var toAddress = e.target.value.trim();

            this.setState({
                withdraw_address_check_in_progress: true,
                withdraw_address_selected: toAddress,
                validAddress: null,
                toAddress: toAddress
            });

            this._validateAddress(toAddress);
        }
    }, {
        key: "_onMemoChanged",
        value: function _onMemoChanged(e) {
            this.setState({ memo: e.target.value }, this._updateFee);
        }
    }, {
        key: "_validateAddress",
        value: function _validateAddress(address) {
            var _this5 = this;

            var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props;

            Object(__WEBPACK_IMPORTED_MODULE_11_common_blockTradesMethods__["m" /* validateAddress */])({ url: __WEBPACK_IMPORTED_MODULE_20_api_apiConfig__["a" /* blockTradesAPIs */].BASE_OL, walletType: props.walletType, newAddress: address }).then(function (isValid) {
                if (_this5.state.toAddress === address) {
                    _this5.setState({
                        withdraw_address_check_in_progress: false,
                        validAddress: !!isValid
                    });
                }
            }).catch(function (err) {
                console.error("Error when validating address:", err);
            });
        }
    }, {
        key: "_openRegistrarSite",
        value: function _openRegistrarSite(e) {
            e.preventDefault();
            var newWnd = window.open(SettingsStore.site_registr, "_blank");
            newWnd.opener = null;
        }
    }, {
        key: "_getGateFee",
        value: function _getGateFee() {
            var _props = this.props,
                gateFee = _props.gateFee,
                asset = _props.asset;

            return new __WEBPACK_IMPORTED_MODULE_4_common_MarketClasses__["a" /* Asset */]({
                real: parseFloat(gateFee ? gateFee.replace(",", "") : 0),
                asset_id: asset.get("id"),
                precision: asset.get("precision")
            });
        }
    }, {
        key: "_renderWithdraw",
        value: function _renderWithdraw() {
            var amountError = this.state.amountError;

            var _utils$replaceName = __WEBPACK_IMPORTED_MODULE_5_common_utils__["a" /* default */].replaceName(this.props.asset.get("symbol"), !!this.props.asset.get("bitasset")),
                assetName = _utils$replaceName.name;

            var tabIndex = 1;
            var supportsMemos = this.props.supportsMemos;

            // if(this.props.fiatModal){
            //     if(~this.props.fiatModal.indexOf('canFiatWith')){
            //         return (<WithdrawFiatOpenLedger
            //             account={this.props.account}
            //             issuer_account="openledger-fiat"
            //             deposit_asset={this.props.asset.get("symbol").split('OPEN.').join('')}
            //             receive_asset={this.props.asset.get("symbol")}
            //             rpc_url={SettingsStore.rpc_url}
            //         />);
            //     }else{
            //         return (<p>Click <a href='#' onClick={this._openRegistrarSite} >here</a> to register for deposits </p>);
            //     }
            // }

            var currentFee = this._getFee();
            var gateFee = this._getGateFee();
            var feeStatus = this.state.feeStatus[currentFee.asset_id];
            var feeAsset = __WEBPACK_IMPORTED_MODULE_17_seerjs_es__["b" /* ChainStore */].getAsset(currentFee.asset_id);

            var disableSubmit = feeStatus && !feeStatus.hasBalance || this.state.balanceError || !this.state.toAddress || !this.state.withdrawValue;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "p",
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_translate_component___default.a, { content: "gateway.withdraw_funds", asset: assetName })
                ),
                this._renderCurrentBalance(),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "SimpleTrade__withdraw-row" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "label",
                        { className: "left-label" },
                        __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("modal.withdraw.amount")
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "inline-label input-wrapper" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", {
                            tabIndex: tabIndex++,
                            type: "number",
                            min: "0",
                            onKeyPress: this.onKeyPress.bind(this),
                            value: this.state.withdrawValue,
                            onChange: this._onInputAmount.bind(this)
                        }),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "form-label select floating-dropdown" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { className: "dropdown-wrapper inactive" },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    null,
                                    assetName
                                )
                            )
                        )
                    ),
                    amountError ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "p",
                        { className: "has-error no-margin", style: { paddingTop: 10 } },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_translate_component___default.a, { content: amountError })
                    ) : null,
                    this.state.balanceError ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "p",
                        { className: "has-error no-margin", style: { paddingTop: 10 } },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_translate_component___default.a, { content: "transfer.errors.insufficient" })
                    ) : null
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "SimpleTrade__withdraw-row" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "label",
                        { className: "left-label" },
                        __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("transfer.fee")
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "inline-label input-wrapper" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "text", disabled: true, value: currentFee.getAmount({ real: true }) }),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "form-label select floating-dropdown" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { className: "dropdown-wrapper inactive" },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    null,
                                    feeAsset ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_16__Utility_AssetName__["a" /* default */], { name: feeAsset.get("symbol") }) : null
                                )
                            )
                        )
                    ),
                    feeStatus && !feeStatus.hasBalance ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "p",
                        { className: "has-error no-margin", style: { paddingTop: 10 } },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_translate_component___default.a, { content: "transfer.errors.insufficient" })
                    ) : null
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "SimpleTrade__withdraw-row" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "label",
                        { className: "left-label" },
                        __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("gateway.fee")
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "inline-label input-wrapper" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "text", disabled: true, value: gateFee.getAmount({ real: true }) }),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "form-label select floating-dropdown" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { className: "dropdown-wrapper inactive" },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    null,
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_16__Utility_AssetName__["a" /* default */], { name: this.props.asset.get("symbol") })
                                )
                            )
                        )
                    ),
                    feeStatus && !feeStatus.hasBalance ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "p",
                        { className: "has-error no-margin", style: { paddingTop: 10 } },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_translate_component___default.a, { content: "transfer.errors.insufficient" })
                    ) : null
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "SimpleTrade__withdraw-row" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "label",
                        { className: "left-label" },
                        __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("modal.withdraw.address")
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "inline-label input-wrapper" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { placeholder: __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("gateway.withdraw_placeholder", { asset: assetName }), tabIndex: tabIndex++, type: "text", value: this.state.toAddress, onChange: this._onInputTo.bind(this) }),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "form-label select floating-dropdown" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { className: "dropdown-wrapper inactive" },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { "data-place": "right", "data-tip": __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("tooltip.withdraw_address", { asset: assetName }) },
                                    "?"
                                )
                            )
                        )
                    ),
                    !this.state.validAddress && this.state.toAddress ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "has-error", style: { paddingTop: 10 } },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_translate_component___default.a, { content: "gateway.valid_address", coin_type: assetName })
                    ) : null
                ),
                supportsMemos ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "SimpleTrade__withdraw-row" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "label",
                        { className: "left-label" },
                        __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("transfer.memo")
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "inline-label input-wrapper" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("textarea", { rows: "3", value: this.state.memo, tabIndex: tabIndex++, onChange: this._onMemoChanged.bind(this) })
                    ),
                    !this.state.validAddress && this.state.toAddress ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "has-error", style: { paddingTop: 10 } },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_translate_component___default.a, { content: "gateway.valid_address", coin_type: assetName })
                    ) : null
                ) : null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "button-group SimpleTrade__withdraw-row" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "button",
                        { tabIndex: tabIndex++, className: "button" + (disableSubmit ? " disabled" : ""), onClick: this.onSubmit.bind(this), type: "submit" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_translate_component___default.a, { content: "gateway.withdraw_now" })
                    )
                )
            );
        }
    }, {
        key: "_renderDeposit",
        value: function _renderDeposit() {
            var _state2 = this.state,
                receive_address = _state2.receive_address,
                loading = _state2.loading,
                emptyAddressDeposit = _state2.emptyAddressDeposit;

            var _utils$replaceName2 = __WEBPACK_IMPORTED_MODULE_5_common_utils__["a" /* default */].replaceName(this.props.asset.get("symbol"), !!this.props.asset.get("bitasset")),
                assetName = _utils$replaceName2.name;

            var hasMemo = receive_address && "memo" in receive_address && receive_address.memo;
            var addressValue = receive_address && receive_address.address || "";
            var tabIndex = 1;

            // if(this.props.fiatModal){
            //     if(~this.props.fiatModal.indexOf('canFiatDep')){
            //         return (<DepositFiatOpenLedger
            //             account={this.props.account}
            //             issuer_account="openledger-fiat"
            //             deposit_asset={this.props.asset.get("symbol").split('OPEN.').join('')}
            //             receive_asset={this.props.asset.get("symbol")}
            //             rpc_url={SettingsStore.rpc_url}
            //         />);
            //     }else{
            //         return (<p>Click <a href='#' onClick={this._openRegistrarSite} >here</a> to register for deposits </p>);
            //     }
            // }
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: !addressValue ? "no-overflow" : "" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "p",
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_translate_component___default.a, { unsafe: true, content: "gateway.add_funds", account: this.props.sender.get("name") })
                ),
                this._renderCurrentBalance(),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "SimpleTrade__withdraw-row" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "p",
                        { style: { marginBottom: 10 }, "data-place": "right", "data-tip": __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("tooltip.deposit_tip", { asset: assetName }) },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_translate_component___default.a, { className: "help-tooltip", content: "gateway.deposit_to", asset: assetName }),
                        ":",
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "label",
                            { className: "fz_12 left-label" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_translate_component___default.a, { content: "gateway.deposit_notice_delay" })
                        )
                    ),
                    !addressValue ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_14__LoadingIndicator__["a" /* default */], { type: "three-bounce" }) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "label",
                        null,
                        emptyAddressDeposit ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_translate_component___default.a, { content: "gateway.please_generate_address" }) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "span",
                            { className: "inline-label" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { readOnly: true, type: "text", value: addressValue }),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12__Utility_CopyButton__["a" /* default */], { text: addressValue }),
                            " "
                        )
                    ),
                    hasMemo ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "label",
                        null,
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "span",
                            { className: "inline-label" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { readOnly: true, type: "text", value: __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("transfer.memo") + ": " + receive_address.memo }),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12__Utility_CopyButton__["a" /* default */], {
                                text: receive_address.memo
                            })
                        )
                    ) : null,
                    receive_address && receive_address.error ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "has-error", style: { paddingTop: 10 } },
                        receive_address.error.message
                    ) : null
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "button-group SimpleTrade__withdraw-row" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "button",
                        { tabIndex: tabIndex++, className: "button spinner-button-circle", onClick: this.requestDepositAddressLoad.bind(this), type: "submit" },
                        loading ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_14__LoadingIndicator__["a" /* default */], { type: "circle" }) : null,
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_translate_component___default.a, { content: "gateway.generate_new" })
                    )
                )
            );
        }
    }, {
        key: "_renderCurrentBalance",
        value: function _renderCurrentBalance() {
            var _utils$replaceName3 = __WEBPACK_IMPORTED_MODULE_5_common_utils__["a" /* default */].replaceName(this.props.asset.get("symbol"), !!this.props.asset.get("bitasset")),
                assetName = _utils$replaceName3.name;

            var isDeposit = this.props.action === "deposit";

            var currentBalance = this._getCurrentBalance();

            var asset = currentBalance ? new __WEBPACK_IMPORTED_MODULE_4_common_MarketClasses__["a" /* Asset */]({
                asset_id: currentBalance.get("asset_type"),
                precision: this.props.asset.get("precision"),
                amount: currentBalance.get("balance")
            }) : null;

            // TEMP //
            // asset = new Asset({
            //     asset_id: this.props.asset.get("id"),
            //     precision: this.props.asset.get("precision"),
            //     amount: 65654645
            // });

            var applyBalanceButton = isDeposit ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "span",
                { style: { border: "2px solid black", borderLeft: "none" }, className: "form-label" },
                assetName
            ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "button",
                {
                    "data-place": "right", "data-tip": __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("tooltip.withdraw_full"),
                    className: "button",
                    style: { border: "2px solid black", borderLeft: "none" },
                    onClick: this._updateAmount.bind(this, !currentBalance ? 0 : parseInt(currentBalance.get("balance"), 10))
                },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_13__Icon_Icon__["a" /* default */], { name: "clippy" })
            );

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "SimpleTrade__withdraw-row", style: { fontSize: "1rem" } },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "label",
                    { style: { fontSize: "1rem" } },
                    __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("gateway.balance_asset", { asset: assetName }),
                    ":",
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "span",
                        { className: "inline-label" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", {
                            disabled: true,
                            style: { color: "black", border: "2px solid black", padding: 10, width: "100%" },
                            value: !asset ? 0 : asset.getAmount({ real: true })
                        }),
                        applyBalanceButton
                    )
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            var _props2 = this.props,
                asset = _props2.asset,
                action = _props2.action;

            var isDeposit = action === "deposit";

            if (!asset) {
                return null;
            }

            var _utils$replaceName4 = __WEBPACK_IMPORTED_MODULE_5_common_utils__["a" /* default */].replaceName(asset.get("symbol"), true),
                assetName = _utils$replaceName4.name;

            var content = this.props.isDown ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_translate_component___default.a, { className: "txtlabel cancel", content: "gateway.unavailable_OPEN", component: "p" })
            ) : !this.props.isAvailable ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_translate_component___default.a, { className: "txtlabel cancel", content: "gateway.unavailable", component: "p" })
            ) : isDeposit ? this._renderDeposit() : this._renderWithdraw();

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "SimpleTrade__modal" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "Modal__header" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "h3",
                        null,
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_translate_component___default.a, { content: isDeposit ? "gateway.deposit" : "modal.withdraw.submit" }),
                        " ",
                        assetName
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { className: "Modal__divider" }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    {
                        className: "grid-block vertical no-overflow",
                        style: {
                            zIndex: 1002,
                            paddingLeft: "2rem",
                            paddingRight: "2rem",
                            paddingTop: "1rem"
                        } },
                    content
                )
            );
        }
    }]);

    return DepositWithdrawContent;
}(__WEBPACK_IMPORTED_MODULE_19__Exchange_ExchangeInput__["a" /* DecimalChecker */]);

DepositWithdrawContent.propTypes = {
    sender: __WEBPACK_IMPORTED_MODULE_7__Utility_ChainTypes__["a" /* default */].ChainAccount.isRequired,
    asset: __WEBPACK_IMPORTED_MODULE_7__Utility_ChainTypes__["a" /* default */].ChainAsset.isRequired,
    coreAsset: __WEBPACK_IMPORTED_MODULE_7__Utility_ChainTypes__["a" /* default */].ChainAsset.isRequired,
    globalObject: __WEBPACK_IMPORTED_MODULE_7__Utility_ChainTypes__["a" /* default */].ChainAsset.isRequired
};
DepositWithdrawContent.defaultProps = {
    coreAsset: "1.3.0",
    globalObject: "2.0.0"
};

DepositWithdrawContent = Object(__WEBPACK_IMPORTED_MODULE_6__Utility_BindToChainState__["a" /* default */])(DepositWithdrawContent);

var SimpleDepositWithdrawModal = function (_React$Component) {
    _inherits(SimpleDepositWithdrawModal, _React$Component);

    function SimpleDepositWithdrawModal() {
        _classCallCheck(this, SimpleDepositWithdrawModal);

        var _this6 = _possibleConstructorReturn(this, (SimpleDepositWithdrawModal.__proto__ || Object.getPrototypeOf(SimpleDepositWithdrawModal)).call(this));

        _this6.state = { open: false };
        return _this6;
    }

    _createClass(SimpleDepositWithdrawModal, [{
        key: "show",
        value: function show() {
            var _this7 = this;

            this.setState({ open: true }, function () {
                __WEBPACK_IMPORTED_MODULE_1_react_foundation_apps_src_utils_foundation_api___default.a.publish(_this7.props.modalId, "open");
            });
        }
    }, {
        key: "onClose",
        value: function onClose() {
            this.setState({ open: false });
        }
    }, {
        key: "render",
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_2__Modal_BaseModal__["a" /* default */],
                { className: "test", onClose: this.onClose.bind(this), overlay: true, id: this.props.modalId },
                this.state.open ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(DepositWithdrawContent, _extends({}, this.props, { open: this.state.open })) : null
            );
        }
    }]);

    return SimpleDepositWithdrawModal;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (SimpleDepositWithdrawModal);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(4).Buffer))

/***/ }),

/***/ 1665:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_foundation_apps_src_utils_foundation_api__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_foundation_apps_src_utils_foundation_api___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_foundation_apps_src_utils_foundation_api__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Modal_BaseModal__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_translate_component__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_translate_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_translate_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_common_MarketClasses__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_common_utils__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Utility_BindToChainState__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Utility_ChainTypes__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_tooltip__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_counterpart__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_counterpart___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_counterpart__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_common_blockTradesMethods__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_common_BlockTradesDepositAddressCache__ = __webpack_require__(696);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Utility_CopyButton__ = __webpack_require__(697);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Icon_Icon__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__LoadingIndicator__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_api_apiConfig__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__Utility_FloatingDropdown__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_alt_react__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_alt_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17_alt_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_stores_SettingsStore__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_actions_SettingsActions__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_qrcode_react__ = __webpack_require__(692);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_qrcode_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_20_qrcode_react__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }























// import DepositFiatOpenLedger from "components/DepositWithdraw/openledger/DepositFiatOpenLedger";
// import WithdrawFiatOpenLedger from "components/DepositWithdraw/openledger/WithdrawFiatOpenLedger";

var SimpleDepositBlocktradesBridge = function (_React$Component) {
    _inherits(SimpleDepositBlocktradesBridge, _React$Component);

    function SimpleDepositBlocktradesBridge(props) {
        _classCallCheck(this, SimpleDepositBlocktradesBridge);

        var _this = _possibleConstructorReturn(this, (SimpleDepositBlocktradesBridge.__proto__ || Object.getPrototypeOf(SimpleDepositBlocktradesBridge)).call(this));

        _this.state = {
            toAddress: __WEBPACK_IMPORTED_MODULE_10_common_blockTradesMethods__["a" /* WithdrawAddresses */].getLast(props.walletType),
            withdrawValue: "",
            amountError: null,
            inputAmount: 0,
            receiveLoading: false,
            limitLoading: true,
            apiError: false
        };

        _this._validateAddress(_this.state.toAddress, props);

        _this.deposit_address_cache = new __WEBPACK_IMPORTED_MODULE_11_common_BlockTradesDepositAddressCache__["a" /* default */]();
        return _this;
    }

    _createClass(SimpleDepositBlocktradesBridge, [{
        key: "onClose",
        value: function onClose() {
            __WEBPACK_IMPORTED_MODULE_1_react_foundation_apps_src_utils_foundation_api___default.a.publish(this.props.modalId, "close");
        }
    }, {
        key: "componentWillMount",
        value: function componentWillMount() {
            this._getDepositAddress();
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this._getDepositLimit();
            this._estimateOutput();
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(np) {
            if (np.inputCoinType !== this.props.inputCoinType || np.outputCoinType !== this.props.outputCoinType) {
                this._getDepositLimit(np);
                this._estimateOutput(np);
                this._getDepositAddress(np);
            }
        }
    }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(np, ns) {
            return np.inputCoinType !== this.props.inputCoinType || np.outputCoinType !== this.props.outputCoinType || np.sender !== this.props.sender || np.asset !== this.props.asset || np.isAvailable !== this.props.isAvailable || np.isDown !== this.props.isDown || !__WEBPACK_IMPORTED_MODULE_5_common_utils__["a" /* default */].are_equal_shallow(ns, this.state);
        }
    }, {
        key: "_getDepositLimit",
        value: function _getDepositLimit() {
            var _this2 = this;

            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

            this.setState({ limitLoading: true });
            Object(__WEBPACK_IMPORTED_MODULE_10_common_blockTradesMethods__["k" /* getDepositLimit */])(props.inputCoinType, props.outputCoinType).then(function (res) {
                _this2.setState({
                    depositLimit: res.depositLimit,
                    limitLoading: false
                });
            }).catch(function (err) {
                console.log("deposit limit error:", err);
                _this2.setState({
                    depositLimit: null,
                    limitLoading: false
                });
            });
        }
    }, {
        key: "_onAmountChange",
        value: function _onAmountChange(value, e) {
            var regexp_numeral = new RegExp(/[[:digit:]]/);
            var target = e.target;

            // Ensure input is valid
            if (!regexp_numeral.test(target.value)) {
                target.value = target.value.replace(/[^0-9.]/g, "");
            }

            // Catch initial decimal input
            if (target.value.charAt(0) == ".") {
                target.value = "0.";
            }

            // Catch double decimal and remove if invalid
            if (target.value.charAt(target.value.length) != target.value.search(".")) {
                target.value.substr(1);
            }

            target.value = __WEBPACK_IMPORTED_MODULE_5_common_utils__["a" /* default */].limitByPrecision(target.value, 8);

            switch (value) {
                case "input":
                    this.setState({ inputAmount: target.value }, this._estimateOutput.bind(this));
                    break;

                case "output":
                    this.setState({ outputAmount: target.value }, this._estimateInput.bind(this));
                    break;
            }
        }
    }, {
        key: "_estimateOutput",
        value: function _estimateOutput() {
            var _this3 = this;

            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

            this.setState({ receiveAmount: 0, sendAmount: this.state.inputAmount });
            if (!this.state.inputAmount) {
                return;
            }

            this.setState({ receiveLoading: true });
            Object(__WEBPACK_IMPORTED_MODULE_10_common_blockTradesMethods__["c" /* estimateOutput */])(this.state.inputAmount, props.inputCoinType, props.outputCoinType).then(function (res) {
                _this3.setState({
                    inputAmount: res.inputAmount,
                    receiveAmount: res.outputAmount,
                    receiveLoading: false
                });
            }).catch(function (err) {
                console.log("receive amount err:", err);
                _this3.setState({ receiveLoading: false, apiError: true });
            });
        }
    }, {
        key: "_estimateInput",
        value: function _estimateInput() {
            var _this4 = this;

            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

            this.setState({ receiveAmount: this.state.outputAmount, sendAmount: 0 });
            if (!this.state.outputAmount) {
                return;
            }

            this.setState({ receiveLoading: true });
            Object(__WEBPACK_IMPORTED_MODULE_10_common_blockTradesMethods__["b" /* estimateInput */])(this.state.outputAmount, props.inputCoinType, props.outputCoinType).then(function (res) {
                _this4.setState({
                    inputAmount: res.inputAmount,
                    sendAmount: __WEBPACK_IMPORTED_MODULE_5_common_utils__["a" /* default */].limitByPrecision(res.inputAmount, 8),
                    receiveLoading: false
                });
            }).catch(function (err) {
                console.log("send amount err:", err);
                _this4.setState({ receiveLoading: false, apiError: true });
            });
        }
    }, {
        key: "_getDepositAddress",
        value: function _getDepositAddress() {
            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

            if (!props.inputCoinType) return;
            var receive_address = void 0;

            /* Always generate new address/memo for increased security */
            /*let account_name = props.sender.get("name");
            let receive_address = this.deposit_address_cache.getCachedInputAddress(
                "blocktrades",
                account_name,
                props.inputCoinType.toLowerCase(),
                props.outputCoinType.toLowerCase()
            );*/
            if (!receive_address) {
                this.setState({ receive_address: null });
                Object(__WEBPACK_IMPORTED_MODULE_10_common_blockTradesMethods__["l" /* requestDepositAddress */])(this._getDepositObject(props));
            } else {
                this.setState({
                    receive_address: receive_address
                });
            }
        }
    }, {
        key: "_getDepositObject",
        value: function _getDepositObject() {
            var _this5 = this;

            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

            return {
                inputCoinType: props.inputCoinType.toLowerCase(),
                outputCoinType: props.outputCoinType.toLowerCase(),
                outputAddress: props.sender.get("name"),
                url: __WEBPACK_IMPORTED_MODULE_15_api_apiConfig__["a" /* blockTradesAPIs */].BASE,
                stateCallback: function stateCallback(receive_address) {
                    _this5.addDepositAddress(props.inputCoinType.toLowerCase(), props.outputCoinType.toLowerCase(), props.sender.get("name"), receive_address);
                }
            };
        }
    }, {
        key: "addDepositAddress",
        value: function addDepositAddress(input_coin_type, output_coin_type, account, receive_address) {
            this.deposit_address_cache.cacheInputAddress("blocktrades", account, input_coin_type, output_coin_type, receive_address.address, receive_address.memo);
            this.setState({
                receive_address: receive_address
            });
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            __WEBPACK_IMPORTED_MODULE_8_react_tooltip___default.a.rebuild();
        }
    }, {
        key: "_validateAddress",
        value: function _validateAddress(address) {
            var _this6 = this;

            var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props;

            Object(__WEBPACK_IMPORTED_MODULE_10_common_blockTradesMethods__["m" /* validateAddress */])({ walletType: props.walletType, newAddress: address }).then(function (isValid) {
                if (_this6.state.toAddress === address) {
                    _this6.setState({
                        withdraw_address_check_in_progress: false,
                        validAddress: isValid
                    });
                }
            }).catch(function (err) {
                console.error("Error when validating address:", err);
            });
        }
    }, {
        key: "_openRegistrarSite",
        value: function _openRegistrarSite(e) {
            e.preventDefault();
            var newWnd = window.open(__WEBPACK_IMPORTED_MODULE_18_stores_SettingsStore__["a" /* default */].site_registr, "_blank");
            newWnd.opener = null;
        }
    }, {
        key: "_onDropDownSelect",
        value: function _onDropDownSelect(e) {
            __WEBPACK_IMPORTED_MODULE_19_actions_SettingsActions__["a" /* default */].changeViewSetting({ preferredBridge: e });
        }
    }, {
        key: "onBlockTradesContact",
        value: function onBlockTradesContact() {
            console.log("Open New Tab");
            var win = window.open("https://www.blocktrades.us/contact", "_blank");
            win.focus();
        }
    }, {
        key: "_renderDeposit",
        value: function _renderDeposit() {
            var _utils$replaceName = __WEBPACK_IMPORTED_MODULE_5_common_utils__["a" /* default */].replaceName(this.props.asset.get("symbol"), !!this.props.asset.get("bitasset")),
                assetName = _utils$replaceName.name,
                prefix = _utils$replaceName.prefix;

            var _state = this.state,
                receive_address = _state.receive_address,
                apiError = _state.apiError;

            var hasMemo = receive_address && "memo" in receive_address && receive_address.memo;
            var addressValue = receive_address && receive_address.address || "";
            var QR = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "SimpleTrade__QR" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_20_qrcode_react___default.a, { size: 140, value: addressValue })
            );

            var bridgeAssets = Object.keys(this.props.bridges.toJS());

            var inputName = this.props.inputCoinType.toUpperCase();
            var receiveName = (prefix ? prefix : "") + assetName;

            var price = (this.state.receiveAmount / this.state.inputAmount).toFixed(4);
            var priceSuffix = receiveName + "/" + inputName;

            var aboveLimit = this.state.inputAmount > parseFloat(this.state.depositLimit) || this.state.sendAmount > parseFloat(this.state.depositLimit);
            var aboveLimitStyle = aboveLimit ? { border: "1px solid #a94442" } : null;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: !addressValue ? "no-overflow" : "" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "SimpleTrade__withdraw-row" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "label",
                        { className: "left-label" },
                        "ASSET"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "inline-label input-wrapper" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { disabled: true, type: "text", defaultValue: receiveName })
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "SimpleTrade__withdraw-row" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "grid-block" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "label",
                            { className: "left-label" },
                            "BRIDGE"
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "span",
                            { "data-tip": __WEBPACK_IMPORTED_MODULE_9_counterpart___default.a.translate("tooltip.bridge_TRADE"), className: "inline-block tooltip", onClick: this.onBlockTradesContact.bind(this) },
                            "\xA0",
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_13__Icon_Icon__["a" /* default */], { style: { position: "relative", top: 0 }, name: "question-circle" })
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "inline-label input-wrapper" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { disabled: true, type: "text", defaultValue: "BLOCKTRADES" }),
                        " "
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "span",
                    { style: !apiError ? { display: "" } : { display: "none" } },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "SimpleTrade__withdraw-row" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "no-margin no-padding" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { className: "small-6", style: { paddingRight: 10 } },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { className: "grid-block" },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "label",
                                        { className: "left-label" },
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_translate_component___default.a, { content: "transfer.send" })
                                    ),
                                    aboveLimit ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "div",
                                        { className: "error-msg inline-block tooltip", "data-tip": __WEBPACK_IMPORTED_MODULE_9_counterpart___default.a.translate("tooltip.over_limit") },
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_translate_component___default.a, { content: "gateway.over_limit" }),
                                        "\xA0",
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_13__Icon_Icon__["a" /* default */], { name: "question-circle" })
                                    ) : null
                                ),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { className: "inline-label input-wrapper" },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { style: aboveLimitStyle, type: "text", value: this.state.sendAmount, onInput: this._onAmountChange.bind(this, "input") }),
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "div",
                                        { className: "form-label select floating-dropdown" },
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_16__Utility_FloatingDropdown__["a" /* default */], {
                                            entries: bridgeAssets,
                                            values: bridgeAssets.reduce(function (map, a) {
                                                if (a) map[a] = a;return map;
                                            }, {}),
                                            singleEntry: bridgeAssets[0],
                                            value: this.props.preferredBridge || bridgeAssets[0],
                                            onChange: this._onDropDownSelect,
                                            upperCase: true
                                        })
                                    )
                                )
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { className: "small-6", style: { paddingLeft: 10 } },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "label",
                                    { className: "left-label" },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_translate_component___default.a, { content: "gateway.deposit_limit" })
                                ),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { className: "inline-label input-wrapper" },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { disabled: true, type: "number", value: this.state.depositLimit && parseFloat(this.state.depositLimit).toFixed(4) || 0 }),
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "div",
                                        { className: "input-right-symbol" },
                                        inputName
                                    )
                                )
                            )
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "SimpleTrade__withdraw-row" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "no-margin no-padding" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { className: "small-6", style: { paddingRight: 10 } },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "label",
                                    { className: "left-label" },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_translate_component___default.a, { content: "exchange.receive" })
                                ),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { className: "inline-label input-wrapper" },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { style: aboveLimitStyle, type: "text", value: this.state.receiveAmount, onInput: this._onAmountChange.bind(this, "output") }),
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "div",
                                        { className: "input-right-symbol" },
                                        receiveName
                                    )
                                )
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { className: "small-6", style: { paddingLeft: 10 } },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { className: "grid-block" },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "label",
                                        { className: "left-label" },
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_translate_component___default.a, { content: "exchange.price" }),
                                        "\xA0\xA0",
                                        this.state.receiveLoading ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_translate_component___default.a, { content: "footer.loading" }) : ""
                                    )
                                ),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { className: "inline-label input-wrapper" },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { disabled: true, type: "number", value: aboveLimit ? 0 : price }),
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "div",
                                        { className: "input-right-symbol" },
                                        priceSuffix
                                    )
                                )
                            )
                        )
                    ),
                    !addressValue ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { style: { textAlign: "center" } },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_14__LoadingIndicator__["a" /* default */], { type: "three-bounce" })
                    ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "SimpleTrade__withdraw-row", style: { textAlign: "center" } },
                        hasMemo ? null : QR,
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "grid-block SimpleTrade__deposit-info" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { className: "copyIcon" },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12__Utility_CopyButton__["a" /* default */], { text: addressValue, className: "SimpleTrade__copyIcon" })
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { className: "deposit-details" },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    null,
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_translate_component___default.a, { content: "gateway.purchase_notice", inputAsset: inputName, outputAsset: receiveName })
                                ),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    null,
                                    addressValue
                                )
                            )
                        ),
                        hasMemo ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "grid-block SimpleTrade__deposit-info", style: { marginTop: "10px" } },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { className: "copyIcon" },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12__Utility_CopyButton__["a" /* default */], { text: receive_address.memo, className: "SimpleTrade__copyIcon" })
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { className: "deposit-details" },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    null,
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_translate_component___default.a, { unsafe: true, content: "gateway.purchase_notice_memo" })
                                ),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    null,
                                    receive_address.memo
                                )
                            )
                        ) : null
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "SimpleTrade__withdraw-row", style: { textAlign: "center", paddingBottom: "2rem" } },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "no-margin no-padding" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "button",
                                { className: "ActionButton_Close", onClick: this.onClose.bind(this) },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_translate_component___default.a, { content: "transfer.close" })
                            )
                        )
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "span",
                    { style: apiError ? { display: "" } : { display: "none" } },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "SimpleTrade__withdraw-row", style: { textAlign: "center", paddingBottom: "2rem", color: "#bb2926" } },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_translate_component___default.a, { className: "txtlabel cancel", content: "gateway.unavailable_TRADE", component: "p" }),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "button",
                            { className: "ActionButton_Close", onClick: this.onClose.bind(this) },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_translate_component___default.a, { content: "transfer.close" })
                        )
                    )
                )
            );
        }
    }, {
        key: "_renderCurrentBalance",
        value: function _renderCurrentBalance() {
            var _this7 = this;

            var _utils$replaceName2 = __WEBPACK_IMPORTED_MODULE_5_common_utils__["a" /* default */].replaceName(this.props.asset.get("symbol"), !!this.props.asset.get("bitasset")),
                assetName = _utils$replaceName2.name;

            var isDeposit = this.props.action === "deposit";

            var currentBalance = this.props.balances.find(function (b) {
                return b && b.get("asset_type") === _this7.props.asset.get("id");
            });

            var asset = currentBalance ? new __WEBPACK_IMPORTED_MODULE_4_common_MarketClasses__["a" /* Asset */]({
                asset_id: currentBalance.get("asset_type"),
                precision: this.props.asset.get("precision"),
                amount: currentBalance.get("balance")
            }) : null;

            var applyBalanceButton = isDeposit ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "span",
                { style: { border: "2px solid black", borderLeft: "none" }, className: "form-label" },
                assetName
            ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "button",
                {
                    "data-place": "right", "data-tip": __WEBPACK_IMPORTED_MODULE_9_counterpart___default.a.translate("tooltip.withdraw_full"),
                    className: "button",
                    style: { border: "2px solid black", borderLeft: "none" },
                    onClick: this._updateAmount.bind(this, !currentBalance ? 0 : parseInt(currentBalance.get("balance"), 10))
                },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_13__Icon_Icon__["a" /* default */], { name: "clippy" })
            );

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "SimpleTrade__withdraw-row", style: { fontSize: "1rem" } },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "label",
                    { style: { fontSize: "1rem" } },
                    __WEBPACK_IMPORTED_MODULE_9_counterpart___default.a.translate("gateway.balance_asset", { asset: assetName }),
                    ":",
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "span",
                        { className: "inline-label" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", {
                            disabled: true,
                            style: { color: "black", border: "2px solid black", padding: 10, width: "100%" },
                            value: !asset ? 0 : asset.getAmount({ real: true })
                        }),
                        applyBalanceButton
                    )
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            var asset = this.props.asset;


            if (!asset) {
                return null;
            }

            var logo = __webpack_require__(190);

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "SimpleTrade__modal" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { className: "Modal__header", style: { background: "none" } }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    {
                        className: "grid-block vertical no-overflow",
                        style: {
                            zIndex: 1002,
                            paddingLeft: "2rem",
                            paddingRight: "2rem"
                        } },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { style: { textAlign: "center" } },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: { margin: 0, height: 80 }, src: logo }),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "p",
                            { style: { fontSize: "1.8rem", fontWeight: "bold", marginBottom: 0 } },
                            "Buy"
                        )
                    ),
                    this.props.isDown ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { style: { textAlign: "center" } },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_translate_component___default.a, { className: "txtlabel cancel", content: "gateway.unavailable_TRADE", component: "p" })
                    ) : !this.props.isAvailable ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { style: { textAlign: "center" } },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_translate_component___default.a, { className: "txtlabel cancel", content: "gateway.unavailable", component: "p" })
                    ) : this._renderDeposit()
                )
            );
        }
    }]);

    return SimpleDepositBlocktradesBridge;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

SimpleDepositBlocktradesBridge.propTypes = {
    sender: __WEBPACK_IMPORTED_MODULE_7__Utility_ChainTypes__["a" /* default */].ChainAccount.isRequired,
    asset: __WEBPACK_IMPORTED_MODULE_7__Utility_ChainTypes__["a" /* default */].ChainAsset.isRequired
};

SimpleDepositBlocktradesBridge = Object(__WEBPACK_IMPORTED_MODULE_6__Utility_BindToChainState__["a" /* default */])(SimpleDepositBlocktradesBridge);

var StoreWrapper = function (_React$Component2) {
    _inherits(StoreWrapper, _React$Component2);

    function StoreWrapper() {
        _classCallCheck(this, StoreWrapper);

        return _possibleConstructorReturn(this, (StoreWrapper.__proto__ || Object.getPrototypeOf(StoreWrapper)).apply(this, arguments));
    }

    _createClass(StoreWrapper, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                preferredBridge = _props.preferredBridge,
                others = _objectWithoutProperties(_props, ["preferredBridge"]);

            var currentBridge = this.props.bridges.get(this.props.preferredBridge);
            if (!currentBridge) {
                currentBridge = this.props.bridges.first();
                preferredBridge = currentBridge.inputCoinType;
            }
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(SimpleDepositBlocktradesBridge, _extends({}, others, { preferredBridge: preferredBridge }, currentBridge.toJS()));
        }
    }]);

    return StoreWrapper;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

StoreWrapper = Object(__WEBPACK_IMPORTED_MODULE_17_alt_react__["connect"])(StoreWrapper, {
    listenTo: function listenTo() {
        return [__WEBPACK_IMPORTED_MODULE_18_stores_SettingsStore__["a" /* default */]];
    },
    getProps: function getProps() {
        return {
            preferredBridge: __WEBPACK_IMPORTED_MODULE_18_stores_SettingsStore__["a" /* default */].getState().viewSettings.get("preferredBridge", "btc")
        };
    }
});

var SimpleDepositBlocktradesBridgeModal = function (_React$Component3) {
    _inherits(SimpleDepositBlocktradesBridgeModal, _React$Component3);

    function SimpleDepositBlocktradesBridgeModal() {
        _classCallCheck(this, SimpleDepositBlocktradesBridgeModal);

        var _this9 = _possibleConstructorReturn(this, (SimpleDepositBlocktradesBridgeModal.__proto__ || Object.getPrototypeOf(SimpleDepositBlocktradesBridgeModal)).call(this));

        _this9.state = {
            open: false
        };
        return _this9;
    }

    _createClass(SimpleDepositBlocktradesBridgeModal, [{
        key: "show",
        value: function show() {
            var _this10 = this;

            this.setState({ open: true }, function () {
                __WEBPACK_IMPORTED_MODULE_1_react_foundation_apps_src_utils_foundation_api___default.a.publish(_this10.props.modalId, "open");
            });
        }
    }, {
        key: "onClose",
        value: function onClose() {
            this.setState({ open: false });
        }
    }, {
        key: "render",
        value: function render() {
            if (!this.props.bridges) return null;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_2__Modal_BaseModal__["a" /* default */],
                { className: "test", onClose: this.onClose.bind(this), id: this.props.modalId, overlay: true },
                this.state.open ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(StoreWrapper, _extends({}, this.props, { open: this.state.open })) : null
            );
        }
    }]);

    return SimpleDepositBlocktradesBridgeModal;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (SimpleDepositBlocktradesBridgeModal);

/***/ }),

/***/ 1666:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_foundation_apps_src_utils_foundation_api__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_foundation_apps_src_utils_foundation_api___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_foundation_apps_src_utils_foundation_api__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__BaseModal__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_foundation_apps_src_trigger__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_foundation_apps_src_trigger___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_foundation_apps_src_trigger__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_translate_component__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_translate_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_translate_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Utility_ChainTypes__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Utility_BindToChainState__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Utility_FormattedAsset__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_common_utils__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_classnames__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Utility_AmountSelector__ = __webpack_require__(689);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Utility_BalanceComponent__ = __webpack_require__(690);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_api_WalletApi__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_stores_WalletDb__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__Utility_FormattedPrice__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_counterpart__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_counterpart___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_counterpart__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__Utility_HelpContent__ = __webpack_require__(691);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_immutable__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18_immutable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_seerjs_es__ = __webpack_require__(6);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






















/**
 *  Given an account and an asset id, render a modal allowing modification of a margin position for that asset
 *
 *  Expected Properties:
 *     quote_asset:  asset id, must be a bitasset
 *     account: full_account object for the account to use
 *
 */

var BorrowModalContent = function (_React$Component) {
    _inherits(BorrowModalContent, _React$Component);

    function BorrowModalContent(props) {
        _classCallCheck(this, BorrowModalContent);

        var _this = _possibleConstructorReturn(this, (BorrowModalContent.__proto__ || Object.getPrototypeOf(BorrowModalContent)).call(this));

        _this.state = _this._initialState(props);
        return _this;
    }

    _createClass(BorrowModalContent, [{
        key: "_initialState",
        value: function _initialState(props) {
            var currentPosition = props ? this._getCurrentPosition(props) : {};

            if (currentPosition.collateral) {
                var debt = __WEBPACK_IMPORTED_MODULE_9_common_utils__["a" /* default */].get_asset_amount(currentPosition.debt, props.quote_asset);
                var collateral = __WEBPACK_IMPORTED_MODULE_9_common_utils__["a" /* default */].get_asset_amount(currentPosition.collateral, props.backing_asset);
                return {
                    short_amount: debt ? debt.toString() : null,
                    collateral: collateral ? collateral.toString() : null,
                    collateral_ratio: this._getCollateralRatio(debt, collateral),
                    errors: this._getInitialErrors(),
                    isValid: false,
                    original_position: {
                        debt: debt,
                        collateral: collateral
                    }
                };
            } else {
                return {
                    short_amount: 0,
                    collateral: 0,
                    collateral_ratio: this._getInitialCollateralRatio(props),
                    errors: this._getInitialErrors(),
                    isValid: false,
                    original_position: {
                        debt: 0,
                        collateral: 0
                    }
                };
            }
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var newState = this._initialState(this.props);

            this.setState(newState);
            this._setUpdatedPosition(newState);
        }
    }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState) {
            return !__WEBPACK_IMPORTED_MODULE_9_common_utils__["a" /* default */].are_equal_shallow(nextState, this.state) || !__WEBPACK_IMPORTED_MODULE_18_immutable___default.a.is(nextProps.quote_asset, this.props.quote_asset) || !nextProps.backing_asset.get("symbol") === this.props.backing_asset.get("symbol") || !__WEBPACK_IMPORTED_MODULE_18_immutable___default.a.is(nextProps.account, this.props.account) || !__WEBPACK_IMPORTED_MODULE_18_immutable___default.a.is(nextProps.call_orders, this.props.call_orders);
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            var _state = this.state,
                short_amount = _state.short_amount,
                collateral = _state.collateral,
                collateral_ratio = _state.collateral_ratio;


            if (nextProps.account !== this.props.account || nextProps.hasCallOrders !== this.props.hasCallOrders || nextProps.quote_asset.get("id") !== this.props.quote_asset.get("id")) {

                var newState = this._initialState(nextProps);

                var revalidate = false;
                if (short_amount || collateral || collateral_ratio) {
                    newState.short_amount = short_amount;
                    newState.collateral = collateral;
                    newState.collateral_ratio = collateral_ratio;
                    revalidate = true;
                }

                this.setState(newState);

                if (revalidate) {
                    this._validateFields(newState);
                }
            }
        }
    }, {
        key: "_getInitialErrors",
        value: function _getInitialErrors() {
            return {
                collateral_balance: null,
                ratio_too_high: null
            };
        }
    }, {
        key: "confirmClicked",
        value: function confirmClicked(e) {
            e.preventDefault();
            __WEBPACK_IMPORTED_MODULE_2_react_foundation_apps_src_utils_foundation_api___default.a.publish(this.props.modalId, "close");
        }
    }, {
        key: "_onBorrowChange",
        value: function _onBorrowChange(e) {
            var feed_price = this._getFeedPrice();
            var amount = e.amount.replace(/,/g, "");
            var newState = {
                short_amount: amount,
                collateral: (this.state.collateral_ratio * (amount / feed_price)).toFixed(this.props.backing_asset.get("precision")),
                collateral_ratio: this.state.collateral_ratio
            };

            this.setState(newState);
            this._validateFields(newState);
            this._setUpdatedPosition(newState);
        }
    }, {
        key: "_onCollateralChange",
        value: function _onCollateralChange(e) {
            var amount = e.amount.replace(/,/g, "");

            var feed_price = this._getFeedPrice();
            var collateralRatio = amount / (this.state.short_amount / feed_price);

            var newState = this._isPredictionMarket(this.props) ? {
                short_amount: amount,
                collateral: amount,
                collateral_ratio: 1
            } : {
                short_amount: this.state.short_amount,
                collateral: amount,
                collateral_ratio: Object(__WEBPACK_IMPORTED_MODULE_1_lodash__["isFinite"])(collateralRatio) ? collateralRatio : this._getInitialCollateralRatio(this.props)
            };

            this.setState(newState);
            this._validateFields(newState);
            this._setUpdatedPosition(newState);
        }
    }, {
        key: "_onRatioChange",
        value: function _onRatioChange(e) {
            var feed_price = this._getFeedPrice();

            var ratio = e.target.value;

            var newState = {
                short_amount: this.state.short_amount,
                collateral: (this.state.short_amount / feed_price * ratio).toFixed(this.props.backing_asset.get("precision")),
                collateral_ratio: ratio
            };

            this.setState(newState);
            this._validateFields(newState);
            this._setUpdatedPosition(newState);
        }
    }, {
        key: "_maximizeCollateral",
        value: function _maximizeCollateral() {
            var currentPosition = this.props ? this._getCurrentPosition(this.props) : {};
            var initialCollateral = 0;

            if (currentPosition.collateral) {
                initialCollateral = __WEBPACK_IMPORTED_MODULE_9_common_utils__["a" /* default */].get_asset_amount(currentPosition.collateral, this.props.backing_asset);
            }

            // Make sure we don't go over the maximum collateral ratio of
            var maximizedCollateral = Math.floor(Math.min(this.props.backing_balance.get("balance") / __WEBPACK_IMPORTED_MODULE_9_common_utils__["a" /* default */].get_asset_precision(this.props.backing_asset) + initialCollateral - 10, this.state.short_amount / this._getFeedPrice() * 1000.0));

            this._onCollateralChange(new Object({ amount: maximizedCollateral.toString() }));
        }
    }, {
        key: "_setUpdatedPosition",
        value: function _setUpdatedPosition(newState) {
            this.setState({
                newPosition: parseFloat(newState.short_amount) / parseFloat(newState.collateral)
            });
        }
    }, {
        key: "_validateFields",
        value: function _validateFields(newState) {
            var errors = this._getInitialErrors();
            var original_position = this.state.original_position;

            var backing_balance = !this.props.backing_balance ? { balance: 0 } : this.props.backing_balance.toJS();

            if (parseFloat(newState.collateral) - original_position.collateral > __WEBPACK_IMPORTED_MODULE_9_common_utils__["a" /* default */].get_asset_amount(backing_balance.balance, this.props.backing_asset.toJS())) {
                errors.collateral_balance = __WEBPACK_IMPORTED_MODULE_16_counterpart___default.a.translate("borrow.errors.collateral");
            }
            var isValid = newState.short_amount >= 0 && newState.collateral >= 0 && (newState.short_amount != original_position.debt || newState.collateral != original_position.collateral);

            // let sqp = this.props.quote_asset.getIn(["bitasset", "current_feed", "maximum_short_squeeze_ratio"]) / 1000;
            var mcr = this.props.quote_asset.getIn(["bitasset", "current_feed", "maintenance_collateral_ratio"]) / 1000;
            if (parseFloat(newState.collateral_ratio) < (this._isPredictionMarket(this.props) ? 1 : mcr)) {
                errors.below_maintenance = __WEBPACK_IMPORTED_MODULE_16_counterpart___default.a.translate("borrow.errors.below", { mr: mcr });
                isValid = false;
            } else if (parseFloat(newState.collateral_ratio) < (this._isPredictionMarket(this.props) ? 1 : mcr + 0.5)) {
                errors.close_maintenance = __WEBPACK_IMPORTED_MODULE_16_counterpart___default.a.translate("borrow.errors.close", { mr: mcr });
                isValid = true;
            }

            this.setState({ errors: errors, isValid: isValid });
        }
    }, {
        key: "_onSubmit",
        value: function _onSubmit(e) {
            e.preventDefault();

            var quotePrecision = __WEBPACK_IMPORTED_MODULE_9_common_utils__["a" /* default */].get_asset_precision(this.props.quote_asset.get("precision"));
            var backingPrecision = __WEBPACK_IMPORTED_MODULE_9_common_utils__["a" /* default */].get_asset_precision(this.props.backing_asset.get("precision"));
            var currentPosition = this._getCurrentPosition(this.props);

            var tr = __WEBPACK_IMPORTED_MODULE_13_api_WalletApi__["a" /* default */].new_transaction();
            tr.add_type_operation("call_order_update", {
                "fee": {
                    amount: 0,
                    asset_id: 0
                },
                "funding_account": this.props.account.get("id"),
                "delta_collateral": {
                    "amount": parseInt(this.state.collateral * backingPrecision - currentPosition.collateral, 10),
                    "asset_id": this.props.backing_asset.get("id")
                },
                "delta_debt": {
                    "amount": parseInt(this.state.short_amount * quotePrecision - currentPosition.debt, 10),
                    "asset_id": this.props.quote_asset.get("id")
                } });
            __WEBPACK_IMPORTED_MODULE_14_stores_WalletDb__["a" /* default */].process_transaction(tr, null, true).catch(function (err) {
                // console.log("unlock failed:", err);
            });

            __WEBPACK_IMPORTED_MODULE_2_react_foundation_apps_src_utils_foundation_api___default.a.publish(this.props.modalId, "close");
        }
    }, {
        key: "_getCurrentPosition",
        value: function _getCurrentPosition(props) {
            var currentPosition = {
                collateral: null,
                debt: null
            };

            if (props && props.hasCallOrders && props.call_orders) {
                for (var key in props.call_orders) {
                    if (props.call_orders.hasOwnProperty(key) && props.call_orders[key]) {
                        if (props.quote_asset.get("id") === props.call_orders[key].getIn(["call_price", "quote", "asset_id"])) {
                            currentPosition = props.call_orders[key].toJS();
                        }
                    }
                }
            }
            return currentPosition;
        }
    }, {
        key: "_getFeedPrice",
        value: function _getFeedPrice() {
            if (!this.props) {
                return 1;
            }

            if (this._isPredictionMarket(this.props)) {
                return 1;
            }

            return 1 / __WEBPACK_IMPORTED_MODULE_9_common_utils__["a" /* default */].get_asset_price(this.props.quote_asset.getIn(["bitasset", "current_feed", "settlement_price", "quote", "amount"]), this.props.backing_asset, this.props.quote_asset.getIn(["bitasset", "current_feed", "settlement_price", "base", "amount"]), this.props.quote_asset);
        }
    }, {
        key: "_getInitialCollateralRatio",
        value: function _getInitialCollateralRatio(props) {
            return this._isPredictionMarket(props) ? 1 : 0;
        }
    }, {
        key: "_getCollateralRatio",
        value: function _getCollateralRatio(debt, collateral) {
            return collateral / (debt / this._getFeedPrice());
        }
    }, {
        key: "_isPredictionMarket",
        value: function _isPredictionMarket(props) {
            return props.quote_asset.getIn(["bitasset", "is_prediction_market"]);
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                quote_asset = _props.quote_asset,
                bitasset_balance = _props.bitasset_balance,
                backing_asset = _props.backing_asset,
                backing_balance = _props.backing_balance;
            var _state2 = this.state,
                short_amount = _state2.short_amount,
                collateral = _state2.collateral,
                collateral_ratio = _state2.collateral_ratio,
                errors = _state2.errors,
                isValid = _state2.isValid;

            var quotePrecision = __WEBPACK_IMPORTED_MODULE_9_common_utils__["a" /* default */].get_asset_precision(this.props.quote_asset.get("precision"));
            var backingPrecision = __WEBPACK_IMPORTED_MODULE_9_common_utils__["a" /* default */].get_asset_precision(this.props.backing_asset.get("precision"));

            if (!collateral_ratio || isNaN(collateral_ratio) || !(collateral_ratio > 0.0 && collateral_ratio < 1000.0)) collateral_ratio = 0;
            bitasset_balance = !bitasset_balance ? { balance: 0, id: null } : bitasset_balance.toJS();
            backing_balance = !backing_balance ? { balance: 0, id: null } : backing_balance.toJS();

            var collateralClass = __WEBPACK_IMPORTED_MODULE_10_classnames___default()("form-group", { "has-error": errors.collateral_balance });
            var collateralRatioClass = __WEBPACK_IMPORTED_MODULE_10_classnames___default()("form-group", { "has-error": errors.below_maintenance }, { "has-warning": errors.close_maintenance });
            var buttonClass = __WEBPACK_IMPORTED_MODULE_10_classnames___default()("button", { disabled: errors.collateral_balance || !isValid }, { success: isValid });

            // Dynamically update user's remaining collateral
            var currentPosition = this._getCurrentPosition(this.props);
            var backingBalance = backing_balance.id ? __WEBPACK_IMPORTED_MODULE_19_seerjs_es__["b" /* ChainStore */].getObject(backing_balance.id) : null;
            var backingAmount = backingBalance ? backingBalance.get("balance") : 0;
            var collateralChange = parseInt(this.state.collateral * backingPrecision - currentPosition.collateral, 10);
            var remainingBalance = backingAmount - collateralChange;

            var bitAssetBalanceText = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "span",
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_translate_component___default.a, { component: "span", content: "transfer.available" }),
                ": ",
                bitasset_balance.id ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12__Utility_BalanceComponent__["a" /* default */], { balance: bitasset_balance.id }) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__Utility_FormattedAsset__["a" /* default */], { amount: 0, asset: quote_asset.get("id") })
            );
            var backingBalanceText = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "span",
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_translate_component___default.a, { component: "span", content: "transfer.available" }),
                ": ",
                backing_balance.id ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__Utility_FormattedAsset__["a" /* default */], { amount: remainingBalance, asset: backing_asset.get("id") }) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__Utility_FormattedAsset__["a" /* default */], { amount: 0, asset: backing_asset.get("id") })
            );

            var feed_price = this._getFeedPrice();

            var maintenanceRatio = this.props.quote_asset.getIn(["bitasset", "current_feed", "maintenance_collateral_ratio"]) / 1000;
            var squeezeRatio = this.props.quote_asset.getIn(["bitasset", "current_feed", "maximum_short_squeeze_ratio"]) / 1000;

            var isPredictionMarket = this._isPredictionMarket(this.props);

            if (!isPredictionMarket && isNaN(feed_price)) {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "form",
                        { className: "grid-container text-center no-overflow", noValidate: true },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_translate_component___default.a, { component: "h3", content: "borrow.no_valid", asset_symbol: quote_asset.get("symbol") })
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "grid-content button-group text-center no-overflow" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            __WEBPACK_IMPORTED_MODULE_4_react_foundation_apps_src_trigger___default.a,
                            { close: this.props.modalId },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { className: " button warning" },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_translate_component___default.a, { content: "account.perm.cancel" })
                            )
                        )
                    )
                );
            }

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "form",
                    { className: "grid-container small-10 small-offset-1 no-overflow", noValidate: true },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_translate_component___default.a, { component: "h3", content: "borrow.title", asset_symbol: quote_asset.get("symbol") }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { style: { textAlign: "left" } },
                        this.props.hide_help ? null : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_17__Utility_HelpContent__["a" /* default */], {
                            path: "components/" + (isPredictionMarket ? "BorrowModalPrediction" : "BorrowModal"),
                            debt: quote_asset.get("symbol"),
                            collateral: backing_asset.get("symbol"),
                            borrower: this.props.account.get("name"),
                            mr: maintenanceRatio
                        }),
                        !isPredictionMarket ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { style: { paddingBottom: "1rem" } },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { className: "borrow-price-feeds" },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "span",
                                    { className: "borrow-price-label" },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_translate_component___default.a, { content: "transaction.feed_price" }),
                                    ":\xA0"
                                ),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15__Utility_FormattedPrice__["a" /* default */], {
                                    noPopOver: true,
                                    quote_amount: quote_asset.getIn(["bitasset", "current_feed", "settlement_price", "base", "amount"]),
                                    quote_asset: quote_asset.getIn(["bitasset", "current_feed", "settlement_price", "base", "asset_id"]),
                                    base_asset: quote_asset.getIn(["bitasset", "current_feed", "settlement_price", "quote", "asset_id"]),
                                    base_amount: quote_asset.getIn(["bitasset", "current_feed", "settlement_price", "quote", "amount"])
                                })
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("b", null),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { className: "borrow-price-final " + (errors.below_maintenance ? "has-error" : errors.close_maintenance ? "has-warning" : "") },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "span",
                                    { className: "borrow-price-label" },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_translate_component___default.a, { content: "exchange.your_price" }),
                                    ":\xA0"
                                ),
                                this.state.newPosition ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_15__Utility_FormattedPrice__["a" /* default */], {
                                    noPopOver: true,
                                    quote_amount: maintenanceRatio * this.state.short_amount * quotePrecision,
                                    quote_asset: quote_asset.get("id"),
                                    base_asset: backing_asset.get("id"),
                                    base_amount: this.state.collateral * backingPrecision
                                }) : null
                            )
                        ) : null,
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "form-group" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11__Utility_AmountSelector__["a" /* default */], { label: "transaction.borrow_amount",
                                amount: short_amount.toString(),
                                onChange: this._onBorrowChange.bind(this),
                                asset: quote_asset.get("id"),
                                assets: [quote_asset.get("id")],
                                display_balance: bitAssetBalanceText,
                                placeholder: "0.0",
                                tabIndex: 1 })
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: collateralClass },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11__Utility_AmountSelector__["a" /* default */], { label: "transaction.collateral",
                                amount: collateral.toString(),
                                onChange: this._onCollateralChange.bind(this),
                                asset: backing_asset.get("id"),
                                assets: [backing_asset.get("id")],
                                display_balance: backingBalanceText,
                                placeholder: "0.0",
                                tabIndex: 1 }),
                            errors.collateral_balance ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { style: { paddingTop: "0.5rem" } },
                                errors.collateral_balance
                            ) : null
                        ),
                        !isPredictionMarket ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            null,
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { className: collateralRatioClass },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_translate_component___default.a, { component: "label", content: "borrow.coll_ratio" }),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { min: "0", max: "6", step: "0.01", onChange: this._onRatioChange.bind(this), value: collateral_ratio, type: "range", disabled: !short_amount }),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { className: "inline-block" },
                                    __WEBPACK_IMPORTED_MODULE_9_common_utils__["a" /* default */].format_number(collateral_ratio, 2)
                                ),
                                errors.below_maintenance || errors.close_maintenance ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { style: { maxWidth: "calc(100% - 50px)" }, className: "float-right" },
                                    errors.below_maintenance,
                                    errors.close_maintenance
                                ) : null
                            )
                        ) : null,
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "no-padding grid-content button-group no-overflow" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { onClick: this._onSubmit.bind(this), href: true, className: buttonClass },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_translate_component___default.a, { content: "borrow.adjust" })
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { onClick: function onClick(e) {
                                        e.preventDefault();_this2.setState(_this2._initialState(_this2.props));
                                    }, href: true, className: "button info" },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_translate_component___default.a, { content: "wallet.reset" })
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { href: true, className: "float-right button info", onClick: this._maximizeCollateral.bind(this) },
                                "Maximize Collateral"
                            )
                        )
                    )
                )
            );
        }
    }]);

    return BorrowModalContent;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

BorrowModalContent.propTypes = {
    quote_asset: __WEBPACK_IMPORTED_MODULE_6__Utility_ChainTypes__["a" /* default */].ChainAsset.isRequired,
    bitasset_balance: __WEBPACK_IMPORTED_MODULE_6__Utility_ChainTypes__["a" /* default */].ChainObject,
    backing_asset: __WEBPACK_IMPORTED_MODULE_6__Utility_ChainTypes__["a" /* default */].ChainAsset.isRequired,
    backing_balance: __WEBPACK_IMPORTED_MODULE_6__Utility_ChainTypes__["a" /* default */].ChainObject,
    call_orders: __WEBPACK_IMPORTED_MODULE_6__Utility_ChainTypes__["a" /* default */].ChainObjectsList,
    hasCallOrders: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].bool
};

BorrowModalContent = Object(__WEBPACK_IMPORTED_MODULE_7__Utility_BindToChainState__["a" /* default */])(BorrowModalContent, { keep_updating: true });

/* This wrapper class appears to be necessary because the decorator eats the show method from refs */

var ModalWrapper = function (_React$Component2) {
    _inherits(ModalWrapper, _React$Component2);

    function ModalWrapper() {
        _classCallCheck(this, ModalWrapper);

        var _this3 = _possibleConstructorReturn(this, (ModalWrapper.__proto__ || Object.getPrototypeOf(ModalWrapper)).call(this));

        _this3.state = {
            smallScreen: false
        };
        return _this3;
    }

    _createClass(ModalWrapper, [{
        key: "show",
        value: function show() {
            var modalId = "borrow_modal_" + this.props.quote_asset;
            __WEBPACK_IMPORTED_MODULE_2_react_foundation_apps_src_utils_foundation_api___default.a.publish(modalId, "open");
        }
    }, {
        key: "componentWillMount",
        value: function componentWillMount() {
            this.setState({
                smallScreen: window.innerHeight <= 800
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _props2 = this.props,
                quote_asset = _props2.quote_asset,
                backing_asset = _props2.backing_asset,
                account = _props2.account;

            var modalId = "borrow_modal_" + quote_asset;
            var accountBalance = account.get("balances").toJS();
            var coreBalance = void 0,
                bitAssetBalance = void 0;

            if (accountBalance) {
                for (var id in accountBalance) {

                    if (id === backing_asset) {
                        coreBalance = accountBalance[id];
                    }

                    if (id === quote_asset) {
                        bitAssetBalance = accountBalance[id];
                    }
                }
            }

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_3__BaseModal__["a" /* default */],
                { id: modalId, overlay: true, ref: modalId },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "grid-block vertical" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(BorrowModalContent, {
                        quote_asset: quote_asset,
                        call_orders: account.get("call_orders"),
                        hasCallOrders: account.get("call_orders") && account.get("call_orders").size > 0,
                        modalId: modalId,
                        bitasset_balance: bitAssetBalance,
                        backing_balance: coreBalance,
                        backing_asset: backing_asset,
                        hide_help: this.state.smallScreen,
                        account: account
                    })
                )
            );
        }
    }]);

    return ModalWrapper;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (ModalWrapper);

/***/ }),

/***/ 1934:
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

// EXTERNAL MODULE: ./app/components/Utility/BalanceComponent.jsx
var BalanceComponent = __webpack_require__(690);

// EXTERNAL MODULE: ./app/components/Utility/TotalBalanceValue.jsx
var TotalBalanceValue = __webpack_require__(703);

// EXTERNAL MODULE: ./node_modules/react-foundation-apps/src/utils/foundation-api.js
var foundation_api = __webpack_require__(41);
var foundation_api_default = /*#__PURE__*/__webpack_require__.n(foundation_api);

// EXTERNAL MODULE: ./app/components/Modal/BaseModal.jsx
var BaseModal = __webpack_require__(105);

// EXTERNAL MODULE: ./app/components/Utility/ChainTypes.js
var ChainTypes = __webpack_require__(33);

// EXTERNAL MODULE: ./app/components/Utility/BindToChainState.jsx
var BindToChainState = __webpack_require__(32);

// EXTERNAL MODULE: ./app/lib/common/utils.js
var utils = __webpack_require__(15);

// EXTERNAL MODULE: ./app/api/WalletApi.js
var WalletApi = __webpack_require__(280);

// EXTERNAL MODULE: ./app/stores/WalletDb.js
var WalletDb = __webpack_require__(26);

// EXTERNAL MODULE: ./node_modules/counterpart/index.js
var counterpart = __webpack_require__(3);
var counterpart_default = /*#__PURE__*/__webpack_require__.n(counterpart);

// EXTERNAL MODULE: ./node_modules/seerjs/es/index.js + 7 modules
var es = __webpack_require__(6);

// EXTERNAL MODULE: ./app/components/Utility/AmountSelector.jsx
var AmountSelector = __webpack_require__(689);

// CONCATENATED MODULE: ./app/components/Modal/SettleModal.jsx
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }















var SettleModal_ModalContent = function (_React$Component) {
    _inherits(ModalContent, _React$Component);

    function ModalContent() {
        _classCallCheck(this, ModalContent);

        var _this = _possibleConstructorReturn(this, (ModalContent.__proto__ || Object.getPrototypeOf(ModalContent)).call(this));

        _this.state = {
            amount: 0
        };
        return _this;
    }

    _createClass(ModalContent, [{
        key: "onAmountChanged",
        value: function onAmountChanged(_ref) {
            var amount = _ref.amount,
                asset = _ref.asset;

            this.setState({ amount: amount });
        }
    }, {
        key: "onSubmit",
        value: function onSubmit(e) {
            e.preventDefault();
            foundation_api_default.a.publish("settlement_modal", "close");

            var precision = utils["a" /* default */].get_asset_precision(this.props.asset.get("precision"));
            var amount = this.state.amount.replace(/,/g, "");
            amount *= precision;

            var tr = WalletApi["a" /* default */].new_transaction();
            tr.add_type_operation("asset_settle", {
                fee: {
                    amount: 0,
                    asset_id: 0
                },
                "account": this.props.account.get("id"),
                "amount": {
                    "amount": amount,
                    "asset_id": this.props.asset.get("id")
                }
            });
            return WalletDb["a" /* default */].process_transaction(tr, null, true).then(function (result) {
                // console.log("asset settle result:", result);
                // this.dispatch(account_id);
                return true;
            }).catch(function (error) {
                console.error("asset settle error: ", error);
                return false;
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _props = this.props,
                asset = _props.asset,
                account = _props.account;
            var amount = this.state.amount;


            if (!asset) {
                return null;
            }

            var assetID = asset.get('id');

            var account_balances = account.get("balances");

            var currentBalance = null,
                balanceAmount = 0;

            account_balances && account_balances.forEach(function (balance) {
                var balanceObject = es["b" /* ChainStore */].getObject(balance);
                if (!balanceObject.get("balance")) {
                    return null;
                }
                if (balanceObject.get("asset_type") === assetID) {
                    currentBalance = balance;
                    balanceAmount = balanceObject.get("balance");
                }
            });

            var precision = utils["a" /* default */].get_asset_precision(asset.get("precision"));
            var parsedAmount = amount ? amount.replace(/,/g, "") : 0;
            var submit_btn_class = parseFloat(parsedAmount) > 0 && parseFloat(parsedAmount) * precision <= parseFloat(balanceAmount) ? "button success" : "button disabled";

            var balanceText = currentBalance ? react_default.a.createElement(
                "span",
                null,
                react_default.a.createElement(react_translate_component_default.a, { content: "exchange.balance" }),
                ":\xA0",
                react_default.a.createElement(BalanceComponent["a" /* default */], { balance: currentBalance })
            ) : null;

            return react_default.a.createElement(
                "form",
                { className: "grid-block vertical full-width-content" },
                react_default.a.createElement(react_translate_component_default.a, { component: "h3", content: "modal.settle.title", asset: asset.get("symbol") }),
                react_default.a.createElement(
                    "div",
                    { className: "grid-container ", style: { paddingTop: "2rem" } },
                    react_default.a.createElement(
                        "div",
                        { className: "content-block", style: { maxWidth: "25rem" } },
                        react_default.a.createElement(AmountSelector["a" /* default */], { label: "modal.settle.amount",
                            amount: amount,
                            onChange: this.onAmountChanged.bind(this),
                            display_balance: balanceText,
                            asset: assetID,
                            assets: [assetID],
                            tabIndex: 1 })
                    ),
                    react_default.a.createElement(
                        "div",
                        { className: "content-block" },
                        react_default.a.createElement("input", { type: "submit", className: submit_btn_class,
                            onClick: this.onSubmit.bind(this),
                            value: counterpart_default.a.translate("modal.settle.submit") })
                    )
                )
            );
        }
    }]);

    return ModalContent;
}(react_default.a.Component);

SettleModal_ModalContent.propTypes = {
    asset: ChainTypes["a" /* default */].ChainAsset.isRequired,
    account: ChainTypes["a" /* default */].ChainAccount.isRequired
};

SettleModal_ModalContent = Object(BindToChainState["a" /* default */])(SettleModal_ModalContent, { keep_updating: true });

var SettleModal_SettleModal = function (_React$Component2) {
    _inherits(SettleModal, _React$Component2);

    function SettleModal() {
        _classCallCheck(this, SettleModal);

        return _possibleConstructorReturn(this, (SettleModal.__proto__ || Object.getPrototypeOf(SettleModal)).apply(this, arguments));
    }

    _createClass(SettleModal, [{
        key: "show",
        value: function show() {
            foundation_api_default.a.publish("settlement_modal", "open");
        }
    }, {
        key: "render",
        value: function render() {
            return react_default.a.createElement(
                BaseModal["a" /* default */],
                { id: "settlement_modal", overlay: true, ref: "settlement_modal" },
                react_default.a.createElement(
                    "div",
                    { className: "grid-block vertical" },
                    react_default.a.createElement(SettleModal_ModalContent, this.props)
                )
            );
        }
    }]);

    return SettleModal;
}(react_default.a.Component);

/* harmony default export */ var Modal_SettleModal = (SettleModal_SettleModal);
// EXTERNAL MODULE: ./app/components/Utility/EquivalentValueComponent.jsx
var EquivalentValueComponent = __webpack_require__(1595);

// EXTERNAL MODULE: ./node_modules/react-intl/lib/index.es.js + 1 modules
var index_es = __webpack_require__(83);

// EXTERNAL MODULE: ./node_modules/alt-react/lib/index.js
var lib = __webpack_require__(29);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// EXTERNAL MODULE: ./app/stores/MarketsStore.js
var MarketsStore = __webpack_require__(282);

// EXTERNAL MODULE: ./node_modules/react-tooltip/dist/index.js
var dist = __webpack_require__(146);
var dist_default = /*#__PURE__*/__webpack_require__.n(dist);

// EXTERNAL MODULE: ./app/components/Utility/MarketPrice.jsx
var MarketPrice = __webpack_require__(1644);

// CONCATENATED MODULE: ./app/components/Utility/MarketChangeComponent.jsx
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var MarketChangeComponent__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function MarketChangeComponent__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function MarketChangeComponent__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function MarketChangeComponent__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










/**
 *  Displays change in market value for an asset
 *
 *  Expects three properties
 *  -'quote' which should be a asset id
 *  -'base' which is the asset id of the original asset amount
 */

var MarketChangeComponent_MarketChangeComponent = function (_MarketStats) {
    MarketChangeComponent__inherits(MarketChangeComponent, _MarketStats);

    function MarketChangeComponent(props) {
        MarketChangeComponent__classCallCheck(this, MarketChangeComponent);

        return MarketChangeComponent__possibleConstructorReturn(this, (MarketChangeComponent.__proto__ || Object.getPrototypeOf(MarketChangeComponent)).call(this, props));
    }

    MarketChangeComponent__createClass(MarketChangeComponent, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            dist_default.a.rebuild();
        }
    }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(np) {
            return _get(MarketChangeComponent.prototype.__proto__ || Object.getPrototypeOf(MarketChangeComponent.prototype), "shouldComponentUpdate", this).call(this, np) || np.base !== this.props.base;
        }
    }, {
        key: "getValue",
        value: function getValue() {
            var marketStats = this.props.marketStats;

            return marketStats && marketStats.change ? marketStats.change : 0;
        }
    }, {
        key: "render",
        value: function render() {
            var marketChangeValue = this.getValue();
            var dayChangeClass = parseFloat(marketChangeValue) === 0 ? "" : parseFloat(marketChangeValue) < 0 ? "change-down" : "change-up";
            var marketChangeFormattedValue = react_default.a.createElement(index_es["b" /* FormattedNumber */], {
                style: "decimal",
                value: marketChangeValue,
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

            return react_default.a.createElement(
                "span",
                { className: "value " + dayChangeClass },
                marketChangeFormattedValue,
                "%"
            );
        }
    }]);

    return MarketChangeComponent;
}(MarketPrice["b" /* MarketStats */]);

MarketChangeComponent_MarketChangeComponent.propTypes = {
    quote: ChainTypes["a" /* default */].ChainAsset.isRequired,
    base: ChainTypes["a" /* default */].ChainAsset.isRequired
};
MarketChangeComponent_MarketChangeComponent.defaultProps = {
    quote: "1.3.0",
    fullPrecision: false,
    noDecimals: false,
    hide_asset: false
};

MarketChangeComponent_MarketChangeComponent = Object(BindToChainState["a" /* default */])(MarketChangeComponent_MarketChangeComponent, { keep_updating: true });

var MarketChangeComponent_Market24HourChangeComponent = function (_React$Component) {
    MarketChangeComponent__inherits(Market24HourChangeComponent, _React$Component);

    function Market24HourChangeComponent() {
        MarketChangeComponent__classCallCheck(this, Market24HourChangeComponent);

        return MarketChangeComponent__possibleConstructorReturn(this, (Market24HourChangeComponent.__proto__ || Object.getPrototypeOf(Market24HourChangeComponent)).apply(this, arguments));
    }

    MarketChangeComponent__createClass(Market24HourChangeComponent, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                refCallback = _props.refCallback,
                others = _objectWithoutProperties(_props, ["refCallback"]);

            return react_default.a.createElement(MarketChangeComponent_MarketChangeComponent, _extends({}, others, { ref: refCallback }));
        }
    }]);

    return Market24HourChangeComponent;
}(react_default.a.Component);

MarketChangeComponent_Market24HourChangeComponent = Object(lib["connect"])(MarketChangeComponent_Market24HourChangeComponent, {
    listenTo: function listenTo() {
        return [MarketsStore["a" /* default */]];
    },
    getProps: function getProps(props) {
        return {
            marketStats: MarketsStore["a" /* default */].getState().allMarketStats.get(props.marketId),
            allMarketStats: MarketsStore["a" /* default */].getState().allMarketStats
        };
    }
});


// EXTERNAL MODULE: ./app/components/Utility/AssetName.jsx
var AssetName = __webpack_require__(124);

// EXTERNAL MODULE: ./app/components/Account/RecentTransactions.jsx
var RecentTransactions = __webpack_require__(1583);

// EXTERNAL MODULE: ./app/components/Blockchain/ProposedOperation.jsx
var ProposedOperation = __webpack_require__(302);

// EXTERNAL MODULE: ./app/components/Forms/AccountSelect.jsx
var Forms_AccountSelect = __webpack_require__(193);

// EXTERNAL MODULE: ./app/stores/AccountStore.js
var AccountStore = __webpack_require__(49);

// EXTERNAL MODULE: ./app/components/Icon/Icon.jsx
var Icon = __webpack_require__(59);

// EXTERNAL MODULE: ./app/components/Utility/LinkToAccountById.jsx
var LinkToAccountById = __webpack_require__(147);

// CONCATENATED MODULE: ./app/lib/common/permission_utils.js



var KeyAuth = function KeyAuth(auth) {
    var _this = this;

    this.id = auth.toJS ? auth.get(0) : auth[0];
    this.weight = auth.toJS ? auth.get(1) : auth[1];

    this.isAvailable = function (auths) {
        return auths.includes ? auths.includes(_this.id) : auths.indexOf(_this) !== -1;
    };
};

var permissionUtils = {

    AccountPermission: function AccountPermission(account, weight, type) {
        var _this2 = this;

        this.id = account.get("id");
        this.weight = weight;
        this.threshold = account.getIn([type, "weight_threshold"]);
        this.accounts = [];
        this.keys = account.getIn([type, "key_auths"]).map(function (auth) {
            return new KeyAuth(auth);
        }).toArray();

        this.isAvailable = function (auths) {
            return auths.includes ? auths.includes(_this2.id) : auths.indexOf(_this2) !== -1;
        };

        this._sumWeights = function (auths) {

            if (!_this2.isNested() && !_this2.isMultiSig()) {
                return _this2.isAvailable(auths) ? _this2.weight : 0;
            } else {
                var sum = _this2.accounts.reduce(function (status, account) {
                    return status + (account._sumWeights(auths) ? account.weight : 0);
                }, 0);

                return Math.floor(sum / _this2.threshold);
            }
        };

        this.getStatus = function (auths, keyAuths) {
            if (!_this2.isNested()) {
                var sum = _this2._sumWeights(auths);
                if (_this2.isMultiSig()) {
                    sum += _this2.sumKeys(keyAuths);
                }
                return sum;
            } else {
                var _sum = _this2.accounts.reduce(function (status, account) {
                    return status + account._sumWeights(auths);
                }, 0);

                if (_this2.keys.length) {
                    _sum += _this2.sumKeys(keyAuths);
                }

                return _sum;
            }
        };

        this.sumKeys = function (keyAuths) {
            var keySum = _this2.keys.reduce(function (s, key) {
                return s + (key.isAvailable(keyAuths) ? key.weight : 0);
            }, 0);
            return keySum;
        };

        this.isNested = function () {
            return _this2.accounts.length > 0;
        };

        this.isMultiSig = function () {
            return _this2.keys.reduce(function (final, key) {
                return final || key.weight < _this2.threshold;
            }, false);
        };

        this.getMissingSigs = function (auths) {
            var missing = [];
            var nested = [];
            if (_this2.isNested()) {
                nested = _this2.accounts.reduce(function (a, account) {
                    return a.concat(account.getMissingSigs(auths));
                }, []);
            } else if (!_this2.isAvailable(auths)) {
                missing.push(_this2.id);
            }

            return missing.concat(nested);
        };

        this.getMissingKeys = function (auths) {
            var missing = [];
            var nested = [];
            if (_this2.keys.length && (_this2.isNested() || _this2.isMultiSig())) {
                _this2.keys.forEach(function (key) {
                    if (!key.isAvailable(auths)) {
                        missing.push(key.id);
                    }
                });
            }

            if (_this2.isNested()) {
                nested = _this2.accounts.reduce(function (a, account) {
                    return a.concat(account.getMissingKeys(auths));
                }, []);
            };

            return missing.concat(nested);
        };
    },

    listToIDs: function listToIDs(accountList) {
        var allAccounts = [];

        accountList.forEach(function (account) {
            if (account) {
                allAccounts.push(account.get ? account.get("id") : account);
            }
        });

        return allAccounts;
    },

    unravel: function unravel(accountPermission, type) {
        var _this3 = this;

        var recursive_count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        if (recursive_count < 3) {
            var account = es["b" /* ChainStore */].getAccount(accountPermission.id);
            if (account && account.getIn([type, "account_auths"]).size) {
                account.getIn([type, "account_auths"]).forEach(function (auth) {
                    var nestedAccount = es["b" /* ChainStore */].getAccount(auth.get(0));
                    if (nestedAccount) {
                        accountPermission.accounts.push(_this3.unravel(new _this3.AccountPermission(nestedAccount, auth.get(1), type), type, recursive_count + 1));
                    }
                });
            }
        }

        return accountPermission;
    },

    unnest: function unnest(accounts, type) {
        var _this4 = this;

        var map = [];
        accounts.forEach(function (id) {
            var fullAccount = es["b" /* ChainStore */].getAccount(id);
            var currentPermission = _this4.unravel(new _this4.AccountPermission(fullAccount, null, type), type);
            map.push(currentPermission);
        });

        return map;
    },

    flatten_auths: function flatten_auths(auths) {
        var existingAuths = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : immutable_default.a.List();

        if (!auths.size) {
            return existingAuths;
        }

        auths.forEach(function (owner) {
            if (!existingAuths.includes(owner.get(0))) {
                existingAuths = existingAuths.push(owner.get(0));
            }
        });
        return existingAuths;
    }
};

/* harmony default export */ var permission_utils = (permissionUtils);
// EXTERNAL MODULE: ./node_modules/lodash/index.js
var lodash = __webpack_require__(106);
var lodash_default = /*#__PURE__*/__webpack_require__.n(lodash);

// CONCATENATED MODULE: ./app/components/Account/NestedApprovalState.jsx
var NestedApprovalState__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var NestedApprovalState__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function NestedApprovalState__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function NestedApprovalState__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function NestedApprovalState__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }











var NestedApprovalState_AccountPermissionTree = function (_React$Component) {
    NestedApprovalState__inherits(AccountPermissionTree, _React$Component);

    function AccountPermissionTree() {
        NestedApprovalState__classCallCheck(this, AccountPermissionTree);

        return NestedApprovalState__possibleConstructorReturn(this, (AccountPermissionTree.__proto__ || Object.getPrototypeOf(AccountPermissionTree)).apply(this, arguments));
    }

    NestedApprovalState__createClass(AccountPermissionTree, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                account = _props.account,
                available = _props.available,
                availableKeys = _props.availableKeys,
                permission = _props.permission,
                threshold = _props.threshold;


            var isOK = permission.isAvailable(available);
            var isNested = permission.isNested();
            var isMultiSig = permission.isMultiSig();

            var status = [];

            var notNestedWeight = threshold && threshold > 10 ? utils["a" /* default */].get_percentage(permission.weight, this.props.threshold) : permission.weight;

            var nestedWeight = permission && permission.threshold > 10 ? utils["a" /* default */].get_percentage(permission.getStatus(available, availableKeys), permission.threshold) + " / 100%" : permission.getStatus(available, availableKeys) + " / " + permission.threshold;

            // if (!account || typeof account === "string") return null;

            status.push(react_default.a.createElement(
                "div",
                { key: account.get("id"), style: { textAlign: "left", width: "100%", clear: "both", paddingBottom: 5 } },
                react_default.a.createElement(
                    "div",
                    {
                        className: "inline-block",
                        style: {
                            paddingLeft: 5 * this.props.indent + "%"
                        }
                    },
                    react_default.a.createElement(LinkToAccountById["a" /* default */], { subpage: "permissions", account: account.get("id") }),
                    !isNested && notNestedWeight ? (notNestedWeight && notNestedWeight.length === 2 ? "\xA0\xA0" : "") + "(" + notNestedWeight + ") " : null
                ),
                react_default.a.createElement(
                    "div",
                    { className: "float-right", style: { paddingLeft: 20, marginRight: 10 } },
                    !isNested && !isMultiSig ? react_default.a.createElement(
                        "span",
                        null,
                        isOK ? react_default.a.createElement(Icon["a" /* default */], { name: "checkmark-circle", size: "1x", className: "success" }) : react_default.a.createElement(Icon["a" /* default */], { name: "cross-circle", size: "1x", className: "error" })
                    ) : react_default.a.createElement(
                        "span",
                        { className: isOK ? "success-text" : "" },
                        nestedWeight
                    )
                )
            ));

            if (isNested || isMultiSig) {
                permission.accounts.forEach(function (subAccount) {
                    status.push(react_default.a.createElement(BoundAccountPermissionTree, {
                        key: subAccount.id,
                        indent: _this2.props.indent + 1,
                        account: subAccount.id,
                        accounts: subAccount.accounts,
                        permission: subAccount,
                        available: available,
                        availableKeys: availableKeys,
                        threshold: permission.threshold
                    }));
                });

                if (permission.keys.length) {
                    permission.keys.forEach(function (key) {
                        status.push(react_default.a.createElement(NestedApprovalState_KeyPermissionBranch, {
                            key: key.id,
                            permission: key,
                            available: availableKeys,
                            indent: _this2.props.indent + 1
                        }));
                    });
                }
            }

            return react_default.a.createElement(
                "div",
                null,
                status
            );
        }
    }]);

    return AccountPermissionTree;
}(react_default.a.Component);

NestedApprovalState_AccountPermissionTree.propTypes = {
    account: ChainTypes["a" /* default */].ChainAccount.isRequired,
    accounts: ChainTypes["a" /* default */].ChainAccountsList,
    indent: react_default.a.PropTypes.number.isRequired
};
NestedApprovalState_AccountPermissionTree.defaultProps = {
    indent: 0
};

var BoundAccountPermissionTree = Object(BindToChainState["a" /* default */])(NestedApprovalState_AccountPermissionTree);

var NestedApprovalState_KeyPermissionBranch = function (_React$Component2) {
    NestedApprovalState__inherits(KeyPermissionBranch, _React$Component2);

    function KeyPermissionBranch() {
        NestedApprovalState__classCallCheck(this, KeyPermissionBranch);

        return NestedApprovalState__possibleConstructorReturn(this, (KeyPermissionBranch.__proto__ || Object.getPrototypeOf(KeyPermissionBranch)).apply(this, arguments));
    }

    NestedApprovalState__createClass(KeyPermissionBranch, [{
        key: "render",
        value: function render() {
            var _props2 = this.props,
                available = _props2.available,
                permission = _props2.permission;


            var isOK = permission.isAvailable(available);

            var status = [];
            status.push(react_default.a.createElement(
                "div",
                { key: permission.id, style: { textAlign: "left", width: "100%", paddingBottom: 5 } },
                react_default.a.createElement(
                    "div",
                    {
                        className: "inline-block",
                        style: {
                            paddingLeft: 5 * this.props.indent + "%"
                        }
                    },
                    react_default.a.createElement(
                        "span",
                        null,
                        permission.id.substr(0, 20 - 4 * this.props.indent),
                        "... (",
                        permission.weight,
                        ")"
                    )
                ),
                react_default.a.createElement(
                    "div",
                    { className: "float-right", style: { paddingLeft: 20, marginRight: 10 } },
                    react_default.a.createElement(
                        "span",
                        null,
                        isOK ? react_default.a.createElement(Icon["a" /* default */], { name: "checkmark-circle", size: "1x", className: "success" }) : react_default.a.createElement(Icon["a" /* default */], { name: "cross-circle", size: "1x", className: "error" })
                    )
                )
            ));

            return react_default.a.createElement(
                "div",
                null,
                status
            );
        }
    }]);

    return KeyPermissionBranch;
}(react_default.a.Component);

NestedApprovalState_KeyPermissionBranch.propTypes = {
    indent: react_default.a.PropTypes.number.isRequired
};
NestedApprovalState_KeyPermissionBranch.defaultProps = {
    indent: 0
};

var NestedApprovalState_SecondLevel = function (_React$Component3) {
    NestedApprovalState__inherits(SecondLevel, _React$Component3);

    function SecondLevel() {
        NestedApprovalState__classCallCheck(this, SecondLevel);

        return NestedApprovalState__possibleConstructorReturn(this, (SecondLevel.__proto__ || Object.getPrototypeOf(SecondLevel)).apply(this, arguments));
    }

    NestedApprovalState__createClass(SecondLevel, [{
        key: "render",
        value: function render() {
            var _props3 = this.props,
                requiredPermissions = _props3.requiredPermissions,
                available = _props3.available,
                availableKeys = _props3.availableKeys;


            var status = [];

            requiredPermissions.forEach(function (account) {
                status.push(react_default.a.createElement(BoundAccountPermissionTree, {
                    key: account.id,
                    account: account.id,
                    accounts: account.accounts,
                    permission: account,
                    available: available,
                    availableKeys: availableKeys
                }));
            });

            return react_default.a.createElement(
                "div",
                null,
                status
            );
        }
    }]);

    return SecondLevel;
}(react_default.a.Component);

var NestedApprovalState_FirstLevel = function (_React$Component4) {
    NestedApprovalState__inherits(FirstLevel, _React$Component4);

    function FirstLevel() {
        NestedApprovalState__classCallCheck(this, FirstLevel);

        var _this5 = NestedApprovalState__possibleConstructorReturn(this, (FirstLevel.__proto__ || Object.getPrototypeOf(FirstLevel)).call(this));

        _this5.state = {
            requiredPermissions: []
        };

        _this5._updateState = _this5._updateState.bind(_this5);
        return _this5;
    }

    NestedApprovalState__createClass(FirstLevel, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this._updateState();

            es["b" /* ChainStore */].subscribe(this._updateState);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            es["b" /* ChainStore */].unsubscribe(this._updateState);
        }
    }, {
        key: "_updateState",
        value: function _updateState() {
            var required = permission_utils.listToIDs(this.props.required);
            var available = permission_utils.listToIDs(this.props.available);

            this.setState({
                requiredPermissions: permission_utils.unnest(required, this.props.type),
                required: required,
                available: available
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _props4 = this.props,
                type = _props4.type,
                added = _props4.added,
                removed = _props4.removed,
                availableKeys = _props4.availableKeys;
            var _state = this.state,
                requiredPermissions = _state.requiredPermissions,
                required = _state.required,
                available = _state.available;


            available = Object(lodash["cloneDeep"])(available);
            availableKeys = availableKeys.toJS();

            if (added) {
                available.push(added);
                availableKeys.push(added);
            }

            if (removed) {
                if (available.indexOf(removed) !== -1) {
                    available.splice(available.indexOf(removed), 1);
                }
                if (availableKeys.indexOf(removed) !== -1) {
                    availableKeys.splice(availableKeys.indexOf(removed), 1);
                }
            }

            return react_default.a.createElement(NestedApprovalState_SecondLevel, {
                type: type,
                added: added,
                removed: removed,
                required: required,
                available: available,
                availableKeys: availableKeys,
                requiredPermissions: requiredPermissions
            });
        }
    }]);

    return FirstLevel;
}(react_default.a.Component);

NestedApprovalState_FirstLevel.propTypes = {
    required: ChainTypes["a" /* default */].ChainAccountsList,
    available: ChainTypes["a" /* default */].ChainAccountsList
};
NestedApprovalState_FirstLevel.defaultProps = {
    type: "active",
    added: null,
    removed: null
};

NestedApprovalState_FirstLevel = Object(BindToChainState["a" /* default */])(NestedApprovalState_FirstLevel, { keep_updating: true });

var NestedApprovalState_ProposalWrapper = function (_React$Component5) {
    NestedApprovalState__inherits(ProposalWrapper, _React$Component5);

    function ProposalWrapper() {
        NestedApprovalState__classCallCheck(this, ProposalWrapper);

        return NestedApprovalState__possibleConstructorReturn(this, (ProposalWrapper.__proto__ || Object.getPrototypeOf(ProposalWrapper)).apply(this, arguments));
    }

    NestedApprovalState__createClass(ProposalWrapper, [{
        key: "render",
        value: function render() {
            var _props5 = this.props,
                proposal = _props5.proposal,
                type = _props5.type;


            var available = proposal.get("available_" + type + "_approvals");
            var availableKeys = proposal.get("available_key_approvals");
            var required = proposal.get("required_" + type + "_approvals");

            return react_default.a.createElement(NestedApprovalState_FirstLevel, NestedApprovalState__extends({}, this.props, {
                required: required,
                available: available,
                availableKeys: availableKeys
            }));
        }
    }]);

    return ProposalWrapper;
}(react_default.a.Component);

NestedApprovalState_ProposalWrapper.propTypes = {
    proposal: ChainTypes["a" /* default */].ChainObject.isRequired,
    type: react_default.a.PropTypes.string.isRequired
};
NestedApprovalState_ProposalWrapper.defaultProps = {
    type: "active",
    added: null
};


/* harmony default export */ var NestedApprovalState = (Object(BindToChainState["a" /* default */])(NestedApprovalState_ProposalWrapper, { keep_updating: true }));
// CONCATENATED MODULE: ./app/components/Modal/ProposalApproveModal.jsx
var ProposalApproveModal__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var ProposalApproveModal__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function ProposalApproveModal__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ProposalApproveModal__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function ProposalApproveModal__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }















var ProposalApproveModal_ProposalApproveModal = function (_React$Component) {
    ProposalApproveModal__inherits(ProposalApproveModal, _React$Component);

    function ProposalApproveModal(props) {
        ProposalApproveModal__classCallCheck(this, ProposalApproveModal);

        var _this = ProposalApproveModal__possibleConstructorReturn(this, (ProposalApproveModal.__proto__ || Object.getPrototypeOf(ProposalApproveModal)).call(this));

        _this.state = {
            active: null,
            key: null,
            owner: null,
            payee: null
        };
        return _this;
    }

    ProposalApproveModal__createClass(ProposalApproveModal, [{
        key: "onActiveAccount",
        value: function onActiveAccount(accountMap, keyMap, type, account) {
            var newState = {};

            if (keyMap[account]) {
                newState["key"] = account;
                newState[type] = null;
            } else if (account) {
                newState[type] = accountMap[account];
                newState["key"] = null;
            } else {
                newState[type] = null;
                newState["key"] = null;
            }
            this.setState(newState);
        }
    }, {
        key: "_onProposalAction",
        value: function _onProposalAction(oldProposal) {
            var _this2 = this;

            var proposalObject = oldProposal.toJS();
            var _state = this.state,
                active = _state.active,
                key = _state.key,
                owner = _state.owner,
                payee = _state.payee;


            var proposal = {
                fee_paying_account: payee || active,
                proposal: proposalObject.id,
                active_approvals_to_add: [],
                active_approvals_to_remove: [],
                owner_approvals_to_add: [],
                owner_approvals_to_remove: [],
                key_approvals_to_add: [],
                key_approvals_to_remove: []
            };

            var isAdd = this.props.action === "approve";

            var neededKeys = [];

            ["active", "owner", "key"].forEach(function (auth_type) {
                var value = _this2.state[auth_type];
                if (value) {
                    var hasValue = proposalObject["available_" + auth_type + "_approvals"].indexOf(value) !== -1;
                    if (isAdd && !hasValue || !isAdd && hasValue) {
                        if (_this2.props.action === "approve") {
                            proposal[auth_type + "_approvals_to_add"] = [value];
                            if (auth_type === "key") neededKeys.push(value);
                        } else if (_this2.props.action === "reject") {
                            proposal[auth_type + "_approvals_to_remove"] = [value];
                            if (auth_type === "key") neededKeys.push(value);
                        }
                    }
                }
            });

            var tr = WalletApi["a" /* default */].new_transaction();
            tr.add_type_operation("proposal_update", proposal);
            WalletDb["a" /* default */].process_transaction(tr, null, true, neededKeys);

            foundation_api_default.a.publish(this.props.modalId, "close");
        }
    }, {
        key: "onChangePayee",
        value: function onChangePayee(account) {
            var fullAccount = es["b" /* ChainStore */].getAccount(account);

            if (fullAccount) {
                this.setState({
                    payee: fullAccount.get("id")
                });
            }
        }
    }, {
        key: "onCancel",
        value: function onCancel() {
            foundation_api_default.a.publish(this.props.modalId, "close");
        }
    }, {
        key: "render",
        value: function render() {
            var _props = this.props,
                proposal = _props.proposal,
                type = _props.type;


            var accountNames = [];
            var accountMap = {};
            var isAdd = this.props.action === "approve";

            if (this.props.accounts.length) {
                this.props.accounts.forEach(function (account) {
                    var accountCheck = isAdd ? account && !proposal.get("available_" + type + "_approvals").includes(account.get("id")) : account && proposal.get("available_" + type + "_approvals").includes(account.get("id"));
                    if (accountCheck) {
                        accountMap[account.get("name")] = account.get("id");
                        accountNames.push(account.get("name"));
                    }
                });
            }

            var keyNames = [];
            var keyMap = {};
            if (this.props.keys.length) {
                this.props.keys.forEach(function (key) {
                    var isMine = AccountStore["a" /* default */].isMyKey(key);
                    if (isMine && !proposal.get("available_key_approvals").includes(key)) {
                        keyMap[key] = true;
                        keyNames.push(key);
                    }
                });
            }

            var myAccounts = AccountStore["a" /* default */].getMyAccounts();

            return react_default.a.createElement(
                "form",
                { className: "grid-block vertical full-width-content" },
                react_default.a.createElement(
                    "div",
                    { className: "grid-container" },
                    react_default.a.createElement(
                        "div",
                        { className: "content-block" },
                        react_default.a.createElement(
                            "h4",
                            null,
                            isAdd ? "Add approval" : "Remove approval"
                        )
                    ),
                    react_default.a.createElement(
                        "div",
                        { className: "content-block", style: { paddingRight: "20%" } },
                        react_default.a.createElement(NestedApprovalState, {
                            proposal: proposal.get("id"),
                            type: type,
                            added: isAdd ? this.state.key ? this.state.key : this.state[type] || null : null,
                            removed: !isAdd ? this.state.key ? this.state.key : this.state[type] || null : null
                        })
                    ),
                    react_default.a.createElement(
                        "div",
                        { className: "content-block full-width-content" },
                        react_default.a.createElement(
                            "div",
                            { className: "full-width-content form-group" },
                            react_default.a.createElement(react_translate_component_default.a, { content: "modal.proposals.pay_with", component: "label" }),
                            react_default.a.createElement(Forms_AccountSelect["a" /* default */], {
                                account_names: myAccounts,
                                onChange: this.onChangePayee.bind(this)
                            })
                        ),
                        accountNames.length || keyNames.length ? react_default.a.createElement(
                            "div",
                            { className: "full-width-content form-group" },
                            react_default.a.createElement(react_translate_component_default.a, { content: "modal.proposals.approval_" + (isAdd ? "add" : "remove"), component: "label" }),
                            react_default.a.createElement(Forms_AccountSelect["a" /* default */], {
                                account_names: accountNames.concat(keyNames),
                                onChange: this.onActiveAccount.bind(this, accountMap, keyMap, type)
                            })
                        ) : null,
                         false ? React.createElement(
                            "div",
                            { className: "full-width-content form-group" },
                            React.createElement(Translate, { content: "modal.proposals.key_approval_" + (isAdd ? "add" : "remove"), component: "label" }),
                            React.createElement(AccountSelect, {
                                account_names: keyNames,
                                onChange: this.onActiveAccount.bind(this, keyMap, "key")
                            })
                        ) : null
                    ),
                    react_default.a.createElement(
                        "div",
                        { className: "content-block" },
                        react_default.a.createElement("input", {
                            type: "submit",
                            className: "button",
                            onClick: this._onProposalAction.bind(this, proposal),
                            value: isAdd ? "Approve" : "Remove"
                        }),
                        react_default.a.createElement(
                            "div",
                            { onClick: this.onCancel.bind(this), className: " button" },
                            react_default.a.createElement(react_translate_component_default.a, { content: "account.perm.cancel" })
                        )
                    )
                )
            );
        }
    }]);

    return ProposalApproveModal;
}(react_default.a.Component);

ProposalApproveModal_ProposalApproveModal.propTypes = {
    accounts: ChainTypes["a" /* default */].ChainAccountsList
};
;
ProposalApproveModal_ProposalApproveModal = Object(BindToChainState["a" /* default */])(ProposalApproveModal_ProposalApproveModal);

var ProposalApproveModal_FirstLevel = function (_React$Component2) {
    ProposalApproveModal__inherits(FirstLevel, _React$Component2);

    function FirstLevel() {
        ProposalApproveModal__classCallCheck(this, FirstLevel);

        var _this3 = ProposalApproveModal__possibleConstructorReturn(this, (FirstLevel.__proto__ || Object.getPrototypeOf(FirstLevel)).call(this));

        _this3._updateState = _this3._updateState.bind(_this3);
        return _this3;
    }

    ProposalApproveModal__createClass(FirstLevel, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this._updateState();

            es["b" /* ChainStore */].subscribe(this._updateState);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            es["b" /* ChainStore */].unsubscribe(this._updateState);
        }
    }, {
        key: "_updateState",
        value: function _updateState() {
            var _props2 = this.props,
                proposal = _props2.proposal,
                account = _props2.account;

            var type = proposal.get("required_active_approvals").size ? "active" : "owner";

            var required = permission_utils.listToIDs(proposal.get("required_" + type + "_approvals"));
            var available = permission_utils.listToIDs(proposal.get("available_" + type + "_approvals"));
            var availableKeys = permission_utils.listToIDs(proposal.get("available_key_approvals"));

            this.setState({
                requiredPermissions: permission_utils.unnest(required, type),
                available: available,
                availableKeys: availableKeys,
                type: type
            });
        }
    }, {
        key: "render",
        value: function render() {
            var action = this.props.action;
            var _state2 = this.state,
                requiredPermissions = _state2.requiredPermissions,
                available = _state2.available,
                availableKeys = _state2.availableKeys,
                type = _state2.type;

            var finalRequired = [];

            requiredPermissions.forEach(function (account) {
                finalRequired = finalRequired.concat(account.getMissingSigs(available));
            });

            var finalRequiredKeys = [];

            requiredPermissions.forEach(function (account) {
                finalRequiredKeys = finalRequiredKeys.concat(account.getMissingKeys(availableKeys));
            });

            return react_default.a.createElement(ProposalApproveModal_ProposalApproveModal, ProposalApproveModal__extends({}, this.props, {
                type: type,
                accounts: action === "approve" ? finalRequired : available,
                keys: action === "approve" ? finalRequiredKeys : availableKeys
            }));
        }
    }]);

    return FirstLevel;
}(react_default.a.Component);

ProposalApproveModal_FirstLevel.propTypes = {
    account: ChainTypes["a" /* default */].ChainAccount.isRequired,
    proposal: ChainTypes["a" /* default */].ChainObject.isRequired
};

ProposalApproveModal_FirstLevel = Object(BindToChainState["a" /* default */])(ProposalApproveModal_FirstLevel);

var ProposalApproveModal_ModalWrapper = function (_React$Component3) {
    ProposalApproveModal__inherits(ModalWrapper, _React$Component3);

    function ModalWrapper() {
        ProposalApproveModal__classCallCheck(this, ModalWrapper);

        var _this4 = ProposalApproveModal__possibleConstructorReturn(this, (ModalWrapper.__proto__ || Object.getPrototypeOf(ModalWrapper)).call(this));

        _this4.state = {
            open: false
        };
        return _this4;
    }

    ProposalApproveModal__createClass(ModalWrapper, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this5 = this;

            foundation_api_default.a.subscribe(this.props.modalId, function (msg, data) {
                _this5.setState({
                    open: data === "open"
                });
            });
        }
    }, {
        key: "show",
        value: function show() {
            foundation_api_default.a.publish(this.props.modalId, "open");
        }
    }, {
        key: "render",
        value: function render() {
            var _props3 = this.props,
                modalId = _props3.modalId,
                proposal = _props3.proposal;


            return react_default.a.createElement(
                BaseModal["a" /* default */],
                { id: modalId, overlay: true, ref: modalId },
                this.state.open ? react_default.a.createElement(
                    "div",
                    { className: "grid-block vertical" },
                    react_default.a.createElement(ProposalApproveModal_FirstLevel, this.props)
                ) : null
            );
        }
    }]);

    return ModalWrapper;
}(react_default.a.Component);

/* harmony default export */ var Modal_ProposalApproveModal = (ProposalApproveModal_ModalWrapper);
// CONCATENATED MODULE: ./app/components/Account/Proposals.jsx
var Proposals__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function Proposals__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Proposals__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Proposals__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }













var Proposals_Proposals = function (_Component) {
    Proposals__inherits(Proposals, _Component);

    function Proposals() {
        Proposals__classCallCheck(this, Proposals);

        return Proposals__possibleConstructorReturn(this, (Proposals.__proto__ || Object.getPrototypeOf(Proposals)).apply(this, arguments));
    }

    Proposals__createClass(Proposals, [{
        key: "_onApproveModal",
        value: function _onApproveModal(id, action) {
            if (this.refs[id + "_" + action]) {
                this.refs[id + "_" + action].show();
            }
        }
    }, {
        key: "_canApprove",
        value: function _canApprove(proposal, id) {

            if (proposal.required_active_approvals.indexOf(id) !== -1 && proposal.available_active_approvals.indexOf(id) === -1) {
                return true;
            } else if (proposal.required_owner_approvals.indexOf(id) !== -1 && proposal.available_owner_approvals.indexOf(id) === -1) {
                return true;
            } else {
                return false;
            }
        }
    }, {
        key: "_canReject",
        value: function _canReject(proposal) {
            return proposal.available_active_approvals.length || proposal.available_owner_approvals.length;
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var account = this.props.account;

            if (!account) return null;

            var proposals = [];

            if (account.get("proposals").size) {
                account.get("proposals").forEach(function (proposal_id) {
                    var proposal = es["b" /* ChainStore */].getObject(proposal_id);
                    if (proposal) {
                        var proposed_transaction = proposal.get("proposed_transaction");
                        var operations = proposed_transaction.get("operations");
                        proposals.push({ operations: operations, account: account, proposal: proposal });
                    }
                });
            }

            var proposalRows = proposals.sort(function (a, b) {
                return utils["a" /* default */].sortID(a.proposal.get("id"), b.proposal.get("id"), true);
            }).map(function (proposal) {
                var isScam = false;
                var text = proposal.operations.map(function (o, index) {
                    if (o.getIn([1, "to"]) === "1.2.153124") isScam = true;
                    return react_default.a.createElement(ProposedOperation["a" /* default */], {
                        key: proposal.proposal.get("id") + "_" + index,
                        expiration: proposal.proposal.get("expiration_time"),
                        index: index,
                        op: o.toJS(),
                        inverted: false,
                        hideFee: false,
                        hideOpLabel: true,
                        hideDate: true,
                        proposal: true,
                        id: proposal.proposal.get("id")
                    });
                }).toArray();

                // let canApprove = this._canApprove(proposal.proposal.toJS(), proposal.account.get("id"));
                var canReject = _this2._canReject(proposal.proposal.toJS());

                var proposalId = proposal.proposal.get("id");

                var type = proposal.proposal.get("required_active_approvals").size ? "active" : "owner";

                return react_default.a.createElement(
                    "tr",
                    { key: proposalId },
                    react_default.a.createElement(
                        "td",
                        null,
                        text
                    ),
                    react_default.a.createElement(
                        "td",
                        null,
                        react_default.a.createElement(NestedApprovalState, {
                            proposal: proposal.proposal.get("id"),
                            type: type
                        })
                    ),
                    react_default.a.createElement(
                        "td",
                        null,
                        canReject ? react_default.a.createElement(
                            "button",
                            {
                                onClick: _this2._onApproveModal.bind(_this2, proposalId, "reject"),
                                className: "button outline"
                            },
                            react_default.a.createElement(react_translate_component_default.a, { content: "proposal.reject" })
                        ) : null,
                        react_default.a.createElement(Modal_ProposalApproveModal, {
                            ref: proposalId + "_" + "reject",
                            modalId: proposalId + "_" + "reject",
                            account: proposal.account.get("id"),
                            proposal: proposalId,
                            action: "reject"
                        }),
                        isScam ? react_default.a.createElement(
                            "div",
                            { "data-tip": counterpart_default.a.translate("tooltip.propose_scam"), className: " tooltip has-error" },
                            "SCAM"
                        ) : react_default.a.createElement(
                            "button",
                            {
                                onClick: _this2._onApproveModal.bind(_this2, proposalId, "approve"),
                                className: "button outline"
                            },
                            react_default.a.createElement(
                                "span",
                                null,
                                react_default.a.createElement(react_translate_component_default.a, { content: "proposal.approve" })
                            )
                        ),
                        react_default.a.createElement(Modal_ProposalApproveModal, {
                            ref: proposalId + "_" + "approve",
                            modalId: proposalId + "_" + "approve",
                            account: proposal.account.get("id"),
                            proposal: proposalId,
                            action: "approve"
                        })
                    )
                );
            });

            return react_default.a.createElement(
                "table",
                { className: "table compact " + this.props.className },
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
                        ),
                        react_default.a.createElement(
                            "th",
                            null,
                            react_default.a.createElement(react_translate_component_default.a, { content: "proposal.status" })
                        ),
                        react_default.a.createElement(
                            "th",
                            null,
                            react_default.a.createElement(react_translate_component_default.a, { content: "proposal.action" })
                        )
                    )
                ),
                react_default.a.createElement(
                    "tbody",
                    null,
                    proposalRows
                )
            );
        }
    }]);

    return Proposals;
}(react["Component"]);

Proposals_Proposals.propTypes = {
    account: ChainTypes["a" /* default */].ChainAccount.isRequired
};


/* harmony default export */ var Account_Proposals = (Object(BindToChainState["a" /* default */])(Proposals_Proposals, { keep_updating: true }));
// EXTERNAL MODULE: ./app/actions/SettingsActions.js
var SettingsActions = __webpack_require__(25);

// EXTERNAL MODULE: ./app/lib/common/asset_utils.js
var asset_utils = __webpack_require__(285);

// EXTERNAL MODULE: ./node_modules/react-router/es/index.js + 32 modules
var react_router_es = __webpack_require__(34);

// EXTERNAL MODULE: ./app/components/Utility/EquivalentPrice.jsx
var EquivalentPrice = __webpack_require__(698);

// EXTERNAL MODULE: ./app/components/Utility/LinkToAssetById.jsx
var LinkToAssetById = __webpack_require__(151);

// EXTERNAL MODULE: ./app/components/Modal/BorrowModal.jsx
var BorrowModal = __webpack_require__(1666);

// EXTERNAL MODULE: ./app/components/Modal/DepositModal.jsx + 1 modules
var DepositModal = __webpack_require__(709);

// EXTERNAL MODULE: ./app/components/Dashboard/SimpleDepositWithdraw.jsx
var SimpleDepositWithdraw = __webpack_require__(1664);

// EXTERNAL MODULE: ./app/components/Dashboard/SimpleDepositBlocktradesBridge.jsx
var SimpleDepositBlocktradesBridge = __webpack_require__(1665);

// EXTERNAL MODULE: ./node_modules/seerjs-ws/cjs/index.js
var cjs = __webpack_require__(8);
var cjs_default = /*#__PURE__*/__webpack_require__.n(cjs);

// EXTERNAL MODULE: ./app/actions/GatewayActions.js
var GatewayActions = __webpack_require__(296);

// EXTERNAL MODULE: ./app/components/Utility/Tabs.jsx
var Tabs = __webpack_require__(1541);

// EXTERNAL MODULE: ./app/components/Exchange/MyOpenOrders.jsx + 1 modules
var MyOpenOrders = __webpack_require__(1663);

// EXTERNAL MODULE: ./app/actions/MarketsActions.js
var MarketsActions = __webpack_require__(286);

// EXTERNAL MODULE: ./app/lib/common/MarketClasses.js
var MarketClasses = __webpack_require__(145);

// EXTERNAL MODULE: ./app/stores/SettingsStore.js
var SettingsStore = __webpack_require__(35);

// EXTERNAL MODULE: ./app/lib/common/market_utils.js
var market_utils = __webpack_require__(126);

// CONCATENATED MODULE: ./app/components/Account/AccountOrders.jsx
var AccountOrders__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function AccountOrders__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function AccountOrders__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function AccountOrders__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }













var AccountOrders_AccountOrders = function (_React$Component) {
    AccountOrders__inherits(AccountOrders, _React$Component);

    function AccountOrders(props) {
        AccountOrders__classCallCheck(this, AccountOrders);

        var _this = AccountOrders__possibleConstructorReturn(this, (AccountOrders.__proto__ || Object.getPrototypeOf(AccountOrders)).call(this, props));

        _this.state = {
            selectedOrders: [],
            filterValue: ""
        };
        return _this;
    }

    AccountOrders__createClass(AccountOrders, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var cancelHeader = document.getElementById("cancelAllOrders");

            if (cancelHeader) {
                cancelHeader.addEventListener("click", function () {
                    var orders = this._getFilteredOrders.call(this);
                    orders = orders.toJS ? orders.toJS() : orders;

                    this.setState({ selectedOrders: orders });

                    var checkboxes = document.querySelectorAll(".orderCancel");

                    checkboxes.forEach(function (item) {
                        if (!item.checked) item.checked = true;
                    });
                }.bind(this));
            }
        }
    }, {
        key: "_getFilteredOrders",
        value: function _getFilteredOrders() {
            var filterValue = this.state.filterValue;


            var orders = this.props.account.get("orders") || [];

            return orders.filter(function (item) {
                var order = es["b" /* ChainStore */].getObject(item).toJS();
                var base = es["b" /* ChainStore */].getAsset(order.sell_price.base.asset_id);
                var quote = es["b" /* ChainStore */].getAsset(order.sell_price.quote.asset_id);

                var baseSymbol = base.get("symbol").toLowerCase();
                var quoteSymbol = quote.get("symbol").toLowerCase();

                return baseSymbol.indexOf(filterValue) > -1 || quoteSymbol.indexOf(filterValue) > -1;
            });
        }
    }, {
        key: "_cancelLimitOrder",
        value: function _cancelLimitOrder(orderID, e) {
            e.preventDefault();

            MarketsActions["a" /* default */].cancelLimitOrder(this.props.account.get("id"), orderID, // order id to cancel
            false // Don't show normal confirms
            ).catch(function (err) {
                console.log("cancel order error:", err);
            });
        }
    }, {
        key: "_cancelLimitOrders",
        value: function _cancelLimitOrders(orderId) {
            var _this2 = this;

            MarketsActions["a" /* default */].cancelLimitOrders(this.props.account.get("id"), this.state.selectedOrders).then(function () {
                _this2.resetSelected();
            }).catch(function (err) {
                console.log("cancel orders error:", err);
            });
        }
    }, {
        key: "onFlip",
        value: function onFlip(marketId) {
            var setting = {};
            setting[marketId] = !this.props.marketDirections.get(marketId);
            SettingsActions["a" /* default */].changeMarketDirection(setting);
        }
    }, {
        key: "onCheckCancel",
        value: function onCheckCancel(orderId, evt) {
            var selectedOrders = this.state.selectedOrders;

            var checked = evt.target.checked;

            if (checked) {
                this.setState({ selectedOrders: selectedOrders.concat([orderId]) });
            } else {
                var index = selectedOrders.indexOf(orderId);

                if (index > -1) {
                    this.setState({ selectedOrders: selectedOrders.slice(0, index).concat(selectedOrders.slice(index + 1)) });
                }
            }
        }
    }, {
        key: "setFilterValue",
        value: function setFilterValue(evt) {
            this.setState({ filterValue: evt.target.value.toLowerCase() });
        }
    }, {
        key: "resetSelected",
        value: function resetSelected() {
            this.setState({ selectedOrders: [] });

            var checkboxes = document.querySelectorAll(".orderCancel");

            checkboxes.forEach(function (item) {
                if (item.checked) item.checked = false;
            });
        }
    }, {
        key: "cancelSelected",
        value: function cancelSelected() {
            this._cancelLimitOrders.call(this);
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                account = _props.account,
                marketDirections = _props.marketDirections;
            var _state = this.state,
                filterValue = _state.filterValue,
                selectedOrders = _state.selectedOrders;

            var cancel = counterpart_default.a.translate("account.perm.cancel");
            var markets = {};

            var marketOrders = {};

            if (!account.get("orders")) {
                return null;
            }

            var orders = account.get("orders");
            var ordersCount = orders.size;
            if (filterValue) {
                orders = this._getFilteredOrders.call(this);
            }

            orders.forEach(function (orderID) {
                var order = es["b" /* ChainStore */].getObject(orderID).toJS();
                var base = es["b" /* ChainStore */].getAsset(order.sell_price.base.asset_id);
                var quote = es["b" /* ChainStore */].getAsset(order.sell_price.quote.asset_id);

                if (base && quote) {
                    var _assets;

                    var assets = (_assets = {}, _defineProperty(_assets, base.get("id"), { precision: base.get("precision") }), _defineProperty(_assets, quote.get("id"), { precision: quote.get("precision") }), _assets);
                    // let baseID = parseInt(order.sell_price.base.asset_id.split(".")[2], 10);
                    // let quoteID = parseInt(order.sell_price.quote.asset_id.split(".")[2], 10);


                    // let marketID = quoteID > baseID ? `${quote.get("symbol")}_${base.get("symbol")}` : `${base.get("symbol")}_${quote.get("symbol")}`;

                    var _marketUtils$getMarke = market_utils["a" /* default */].getMarketID(base, quote),
                        marketID = _marketUtils$getMarke.marketID;

                    var direction = marketDirections.get(marketID);

                    if (!markets[marketID]) {
                        if (direction) {
                            markets[marketID] = {
                                base: { id: base.get("id"), symbol: base.get("symbol"), precision: base.get("precision") },
                                quote: { id: quote.get("id"), symbol: quote.get("symbol"), precision: quote.get("precision") }
                            };
                        } else {
                            markets[marketID] = {
                                base: { id: quote.get("id"), symbol: quote.get("symbol"), precision: quote.get("precision") },
                                quote: { id: base.get("id"), symbol: base.get("symbol"), precision: base.get("precision") }
                            };
                        }
                    }
                    var limitOrder = new MarketClasses["d" /* LimitOrder */](order, assets, markets[marketID].quote.id);

                    var marketBase = es["b" /* ChainStore */].getAsset(markets[marketID].base.id);
                    var marketQuote = es["b" /* ChainStore */].getAsset(markets[marketID].quote.id);

                    if (!marketOrders[marketID]) {
                        marketOrders[marketID] = [];
                    }

                    marketOrders[marketID].push(react_default.a.createElement(MyOpenOrders["b" /* OrderRow */], {
                        ref: markets[marketID].base.symbol,
                        key: order.id,
                        order: limitOrder,
                        base: marketBase,
                        quote: marketQuote,
                        cancel_text: cancel,
                        showSymbols: false,
                        invert: true,
                        onCancel: _this3._cancelLimitOrder.bind(_this3, order.id),
                        price: limitOrder.getPrice(),
                        dashboard: true,
                        isMyAccount: _this3.props.isMyAccount,
                        settings: _this3.props.settings,
                        onFlip: _this3.onFlip.bind(_this3, marketID),
                        onCheckCancel: _this3.onCheckCancel.bind(_this3, order.id)
                    }));
                }
            });

            var tables = [];

            var marketIndex = 0;
            for (var market in marketOrders) {
                if (marketOrders[market].length) {
                    tables.push(react_default.a.createElement(
                        "tbody",
                        { key: market },
                        marketOrders[market].sort(function (a, b) {
                            return a.props.price - b.props.price;
                        })
                    ));
                    marketIndex++;
                }
            }

            return react_default.a.createElement(
                "div",
                { className: "grid-content no-overflow no-padding", style: { paddingBottom: 15 } },
                react_default.a.createElement(
                    "div",
                    { className: "header-selector" },
                    orders && ordersCount ? react_default.a.createElement("input", { type: "text", placeholder: counterpart_default.a.translate("account.filter_orders"), style: { display: "inline-block", maxWidth: "50%", marginRight: "1em", marginBottom: "0" }, onChange: this.setFilterValue.bind(this) }) : null,
                    selectedOrders.length ? react_default.a.createElement(
                        "button",
                        { className: "button" },
                        react_default.a.createElement(react_translate_component_default.a, { content: "account.reset_orders", onClick: this.resetSelected.bind(this) })
                    ) : null,
                    selectedOrders.length ? react_default.a.createElement(
                        "button",
                        { className: "button" },
                        react_default.a.createElement(react_translate_component_default.a, { content: "account.submit_orders", onClick: this.cancelSelected.bind(this) })
                    ) : null
                ),
                react_default.a.createElement(
                    "table",
                    { className: "table table-striped dashboard-table table-hover" },
                    react_default.a.createElement(MyOpenOrders["c" /* TableHeader */], { settings: this.props.settings, dashboard: true, isMyAccount: this.props.isMyAccount }),
                    tables,
                    this.props.children
                )
            );
        }
    }]);

    return AccountOrders;
}(react_default.a.Component);

AccountOrders_AccountOrders = Object(lib["connect"])(AccountOrders_AccountOrders, {
    listenTo: function listenTo() {
        return [SettingsStore["a" /* default */]];
    },
    getProps: function getProps() {
        return {
            marketDirections: SettingsStore["a" /* default */].getState().marketDirections
        };
    }
});

/* harmony default export */ var Account_AccountOrders = (AccountOrders_AccountOrders);
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(28);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./app/components/Utility/TranslateWithLinks.jsx
var TranslateWithLinks = __webpack_require__(303);

// CONCATENATED MODULE: ./app/lib/common/accountHelper.js



function checkMarginStatus(account) {
    return new Promise(function (res, rej) {
        if (!account || account && !account.get("call_orders", []).size) return res(null);

        Object(es["f" /* FetchChain */])("getObject", account.get("call_orders").toArray()).then(function (call_orders) {
            var assets = [];
            call_orders.forEach(function (a) {
                var baseId = a.getIn(["call_price", "base", "asset_id"]);
                var quoteId = a.getIn(["call_price", "quote", "asset_id"]);
                if (assets.indexOf(baseId) === -1) assets.push(baseId);
                if (assets.indexOf(quoteId) === -1) assets.push(quoteId);
            });
            Object(es["f" /* FetchChain */])("getAsset", assets).then(function (assets) {
                var assetsMap = {};
                assets.forEach(function (asset) {
                    assetsMap[asset.get("id")] = asset.toJS();
                });
                var status = {};
                call_orders.forEach(function (co) {
                    var debtAsset = assetsMap[co.getIn(["call_price", "quote", "asset_id"])];
                    var collateralAsset = assetsMap[co.getIn(["call_price", "base", "asset_id"])];
                    var sp = debtAsset.bitasset.current_feed.settlement_price;
                    if (sp.base.asset_id === sp.quote.asset_id) {
                        status[debtAsset.id] = { ratio: null };
                    } else {
                        var collateral = new MarketClasses["a" /* Asset */]({
                            amount: co.get("collateral"),
                            asset_id: collateralAsset.id,
                            precision: collateralAsset.precision
                        });
                        var debt = new MarketClasses["a" /* Asset */]({
                            amount: co.get("debt"),
                            asset_id: debtAsset.id,
                            precision: debtAsset.precision
                        });
                        var mr = debtAsset.bitasset.current_feed.maintenance_collateral_ratio / 1000;
                        var price = new MarketClasses["c" /* FeedPrice */]({
                            priceObject: debtAsset.bitasset.current_feed.settlement_price,
                            market_base: debtAsset.bitasset.current_feed.settlement_price.quote.asset_id,
                            sqr: debtAsset.bitasset.current_feed.maximum_short_squeeze_ratio,
                            assets: assetsMap
                        });
                        var current = { ratio: collateral.getAmount({ real: true }) / (debt.getAmount({ real: true }) / price.toReal()) };
                        if (isNaN(current.ratio)) return null;
                        if (current.ratio < mr) {
                            current.statusClass = "danger";
                        } else if (current.ratio < mr + 0.5) {
                            current.statusClass = "warning";
                        } else {
                            current.statusClass = null;
                        }
                        status[debtAsset.id] = current;
                    }
                });
                res(status);
            });
        }).catch(rej);
    });
}


// EXTERNAL MODULE: ./app/components/Modal/SendModal.jsx
var SendModal = __webpack_require__(708);

// CONCATENATED MODULE: ./app/components/Icon/PulseIcon.js
var PulseIcon__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var PulseIcon__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function PulseIcon__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function PulseIcon__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function PulseIcon__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var PulseIcon_PulseIcon = function (_Component) {
    PulseIcon__inherits(PulseIcon, _Component);

    function PulseIcon() {
        var _ref;

        var _temp, _this, _ret;

        PulseIcon__classCallCheck(this, PulseIcon);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = PulseIcon__possibleConstructorReturn(this, (_ref = PulseIcon.__proto__ || Object.getPrototypeOf(PulseIcon)).call.apply(_ref, [this].concat(args))), _this), _this.tick = function () {
            var _this$props = _this.props,
                onIcon = _this$props.onIcon,
                offIcon = _this$props.offIcon;

            var _ref2 = _this.state || {},
                _ref2$name = _ref2.name,
                name = _ref2$name === undefined ? onIcon : _ref2$name;

            _this.setState({
                name: name === onIcon ? offIcon : onIcon
            });
        }, _temp), PulseIcon__possibleConstructorReturn(_this, _ret);
    }

    PulseIcon__createClass(PulseIcon, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var duration = this.props.duration;

            this.interval = setInterval(this.tick, duration);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.interval && clearInterval(this.interval);
        }
    }, {
        key: "render",
        value: function render() {
            var _props = this.props,
                onIcon = _props.onIcon,
                rest = _props.rest;

            var _ref3 = this.state || {},
                _ref3$name = _ref3.name,
                name = _ref3$name === undefined ? onIcon : _ref3$name;

            return react_default.a.createElement(Icon["a" /* default */], PulseIcon__extends({ name: name }, rest));
        }
    }]);

    return PulseIcon;
}(react["Component"]);

PulseIcon_PulseIcon.propTypes = {
    duration: react["PropTypes"].number.isRequired,
    offIcon: react["PropTypes"].string.isRequired,
    onIcon: react["PropTypes"].string.isRequired
};
/* harmony default export */ var Icon_PulseIcon = (PulseIcon_PulseIcon);
// CONCATENATED MODULE: ./app/components/Account/AccountOverview.jsx
var AccountOverview__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var AccountOverview__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function AccountOverview__defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function AccountOverview__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function AccountOverview__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function AccountOverview__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






































var AccountOverview_AccountOverview = function (_React$Component) {
    AccountOverview__inherits(AccountOverview, _React$Component);

    function AccountOverview(props) {
        AccountOverview__classCallCheck(this, AccountOverview);

        var _this = AccountOverview__possibleConstructorReturn(this, (AccountOverview.__proto__ || Object.getPrototypeOf(AccountOverview)).call(this));

        _this.sortFunctions = {
            alphabetic: function alphabetic(a, b, force) {
                if (a.key > b.key) return this.state.sortDirection || force ? 1 : -1;
                if (a.key < b.key) return this.state.sortDirection || force ? -1 : 1;
                return 0;
            }
        };

        _this._renderBuy = function (symbol, canBuy, assetName, emptyCell, balance) {
            if (symbol === "SEER" && balance <= 100000) {
                // Precision of 5, 1 = 10^5
                return react_default.a.createElement(
                    "span",
                    null,
                    react_default.a.createElement(
                        "a",
                        { onClick: _this._showDepositWithdraw.bind(_this, "bridge_modal", assetName, false) },
                        react_default.a.createElement(Icon_PulseIcon, { onIcon: "dollar", offIcon: "dollar-green", duration: 1000, className: "icon-14px" })
                    )
                );
            } else {
                return canBuy && _this.props.isMyAccount ? react_default.a.createElement(
                    "span",
                    null,
                    react_default.a.createElement(
                        "a",
                        { onClick: _this._showDepositWithdraw.bind(_this, "bridge_modal", assetName, false) },
                        react_default.a.createElement(Icon["a" /* default */], { name: "dollar", className: "icon-14px" })
                    )
                ) : emptyCell;
            }
        };

        _this.state = {
            sortKey: props.viewSettings.get("portfolioSort", "totalValue"),
            sortDirection: props.viewSettings.get("portfolioSortDirection", true), // alphabetical A -> B, numbers high to low
            settleAsset: "1.3.0",
            showHidden: false,
            depositAsset: null,
            withdrawAsset: null,
            bridgeAsset: null,
            alwaysShowAssets: ["SEER"]
        };

        _this.priceRefs = {};
        _this.valueRefs = {};
        _this.changeRefs = {};
        for (var key in _this.sortFunctions) {
            _this.sortFunctions[key] = _this.sortFunctions[key].bind(_this);
        }
        return _this;
    }

    AccountOverview__createClass(AccountOverview, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this._checkMarginStatus();
        }
    }, {
        key: "_checkMarginStatus",
        value: function _checkMarginStatus() {
            var _this2 = this;

            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

            checkMarginStatus(props.account).then(function (status) {
                var globalMarginStatus = null;
                for (var asset in status) {
                    globalMarginStatus = status[asset].statusClass || globalMarginStatus;
                };
                _this2.setState({ globalMarginStatus: globalMarginStatus });
            });
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(np) {
            if (np.account !== this.props.account) {
                this._checkMarginStatus(np);
                this.priceRefs = {};
                this.valueRefs = {};
                this.changeRefs = {};
                setTimeout(this.forceUpdate.bind(this), 500);
            };
        }
    }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState) {
            return !utils["a" /* default */].are_equal_shallow(nextProps.balanceAssets, this.props.balanceAssets) || !utils["a" /* default */].are_equal_shallow(nextProps.backedCoins, this.props.backedCoins) || !utils["a" /* default */].are_equal_shallow(nextProps.balances, this.props.balances) || nextProps.account !== this.props.account || nextProps.settings !== this.props.settings || nextProps.hiddenAssets !== this.props.hiddenAssets || !utils["a" /* default */].are_equal_shallow(nextState, this.state);
        }
    }, {
        key: "_onSettleAsset",
        value: function _onSettleAsset(id, e) {
            e.preventDefault();
            this.setState({
                settleAsset: id
            });

            this.refs.settlement_modal.show();
        }
    }, {
        key: "_hideAsset",
        value: function _hideAsset(asset, status) {
            SettingsActions["a" /* default */].hideAsset(asset, status);
        }
    }, {
        key: "_showDepositModal",
        value: function _showDepositModal(asset, e) {
            var _this3 = this;

            e.preventDefault();
            this.setState({ depositAsset: asset }, function () {
                _this3.refs.deposit_modal_new.show();
            });
        }
    }, {
        key: "_showDepositWithdraw",
        value: function _showDepositWithdraw(action, asset, fiatModal, e) {
            var _setState,
                _this4 = this;

            e.preventDefault();
            this.setState((_setState = {}, AccountOverview__defineProperty(_setState, action === "bridge_modal" ? "bridgeAsset" : action === "deposit_modal" ? "depositAsset" : "withdrawAsset", asset), AccountOverview__defineProperty(_setState, "fiatModal", fiatModal), _setState), function () {
                _this4.refs[action].show();
            });
        }
    }, {
        key: "_getSeparator",
        value: function _getSeparator(render) {
            return render ? react_default.a.createElement(
                "span",
                null,
                "\xA0|\xA0"
            ) : null;
        }
    }, {
        key: "_onNavigate",
        value: function _onNavigate(route, e) {
            e.preventDefault();
            this.props.router.push(route);
        }
    }, {
        key: "triggerSend",
        value: function triggerSend(asset) {
            var _this5 = this;

            this.setState({ send_asset: asset }, function () {
                _this5.refs.send_modal.show();
            });
        }
    }, {
        key: "_renderBalances",
        value: function _renderBalances(balanceList, optionalAssets, visible) {
            var _this6 = this;

            var core_asset = this.props.core_asset;
            var _props = this.props,
                settings = _props.settings,
                hiddenAssets = _props.hiddenAssets,
                orders = _props.orders;

            var preferredUnit = settings.get("unit") || core_asset.get("symbol");
            var showAssetPercent = settings.get("showAssetPercent", false);

            var renderBorrow = function renderBorrow(asset, account) {
                var isBitAsset = asset && asset.has("bitasset_data_id");
                var modalRef = "cp_modal_" + asset.get("id");
                return {
                    isBitAsset: isBitAsset,
                    borrowModal: !isBitAsset ? null : react_default.a.createElement(BorrowModal["a" /* default */], {
                        ref: modalRef,
                        quote_asset: asset.get("id"),
                        backing_asset: asset.getIn(["bitasset", "options", "short_backing_asset"]),
                        account: account
                    }),
                    borrowLink: !isBitAsset ? null : react_default.a.createElement(
                        "a",
                        { onClick: function onClick() {
                                dist_default.a.hide();_this6.refs[modalRef].show();
                            } },
                        react_default.a.createElement(Icon["a" /* default */], { name: "dollar", className: "icon-14px" })
                    )
                };
            };

            var balances = [];
            var emptyCell = "-";
            balanceList.forEach(function (balance) {
                var balanceObject = es["b" /* ChainStore */].getObject(balance);
                var asset_type = balanceObject.get("asset_type");
                var asset = es["b" /* ChainStore */].getObject(asset_type);

                var directMarketLink = void 0,
                    settleLink = void 0,
                    transferLink = void 0;
                var symbol = "";
                if (!asset) return null;

                var assetName = asset.get("symbol");
                var notCore = asset.get("id") !== "1.3.0";
                var notCorePrefUnit = preferredUnit !== core_asset.get("symbol");

                var _assetUtils$parseDesc = asset_utils["a" /* default */].parseDescription(asset.getIn(["options", "description"])),
                    market = _assetUtils$parseDesc.market;

                symbol = asset.get("symbol");
                if (symbol.indexOf("OPEN.") !== -1 && !market) market = "USD";
                var preferredMarket = market ? market : preferredUnit;

                if (notCore && preferredMarket === symbol) preferredMarket = core_asset.get("symbol");

                /* Table content */
                directMarketLink = notCore ? react_default.a.createElement(
                    react_router_es["b" /* Link */],
                    { to: "/market/" + asset.get("symbol") + "_" + preferredMarket },
                    react_default.a.createElement(Icon["a" /* default */], { name: "trade", className: "icon-14px" })
                ) : notCorePrefUnit ? react_default.a.createElement(
                    react_router_es["b" /* Link */],
                    { to: "/market/" + asset.get("symbol") + "_" + preferredUnit },
                    react_default.a.createElement(Icon["a" /* default */], { name: "trade", className: "icon-14px" })
                ) : emptyCell;
                transferLink = react_default.a.createElement(
                    "a",
                    { onClick: _this6.triggerSend.bind(_this6, asset.get("id")) },
                    react_default.a.createElement(Icon["a" /* default */], { name: "transfer", className: "icon-14px" })
                );

                var _renderBorrow = renderBorrow(asset, _this6.props.account),
                    isBitAsset = _renderBorrow.isBitAsset,
                    borrowModal = _renderBorrow.borrowModal,
                    borrowLink = _renderBorrow.borrowLink;

                /* Popover content */


                settleLink = react_default.a.createElement(
                    "a",
                    { href: true, onClick: _this6._onSettleAsset.bind(_this6, asset.get("id")) },
                    react_default.a.createElement(Icon["a" /* default */], { name: "settle", className: "icon-14px" })
                );

                var includeAsset = !hiddenAssets.includes(asset_type);
                var hasBalance = !!balanceObject.get("balance");
                var hasOnOrder = !!orders[asset_type];

                var thisAssetName = asset.get("symbol").split(".");
                var canDeposit = (thisAssetName[0] == "OPEN" || thisAssetName[0] == "RUDEX") && !!_this6.props.backedCoins.get("OPEN", []).find(function (a) {
                    return a.backingCoinType === thisAssetName[1];
                }) || !!_this6.props.backedCoins.get("RUDEX", []).find(function (a) {
                    return a.backingCoin === thisAssetName[1];
                }) || asset.get("symbol") == "SEER";

                var canDepositWithdraw = !!_this6.props.backedCoins.get("OPEN", []).find(function (a) {
                    return a.symbol === asset.get("symbol");
                });
                var canWithdraw = canDepositWithdraw && hasBalance && balanceObject.get("balance") != 0;
                var canBuy = !!_this6.props.bridgeCoins.get(symbol);

                balances.push(react_default.a.createElement(
                    "tr",
                    { key: asset.get("symbol"), style: { maxWidth: "100rem" } },
                    react_default.a.createElement(
                        "td",
                        { style: { textAlign: "left" } },
                        react_default.a.createElement(LinkToAssetById["a" /* default */], { asset: asset.get("id") })
                    ),
                    react_default.a.createElement(
                        "td",
                        { style: { textAlign: "right" } },
                        hasBalance || hasOnOrder ? react_default.a.createElement(BalanceComponent["a" /* default */], { balance: balance, hide_asset: true }) : null
                    ),
                    showAssetPercent ? react_default.a.createElement(
                        "td",
                        { style: { textAlign: "right" } },
                        hasBalance ? react_default.a.createElement(BalanceComponent["a" /* default */], { balance: balance, asPercentage: true }) : null
                    ) : null,
                    react_default.a.createElement(
                        "td",
                        null,
                        transferLink
                    ),
                    react_default.a.createElement(
                        "td",
                        null,
                        directMarketLink
                    ),
                    react_default.a.createElement(
                        "td",
                        { style: { textAlign: "center" }, className: "column-hide-small", "data-place": "bottom", "data-tip": counterpart_default.a.translate("tooltip." + (includeAsset ? "hide_asset" : "show_asset")) },
                        react_default.a.createElement(
                            "a",
                            { style: { marginRight: 0 }, className: includeAsset ? "order-cancel" : "action-plus", onClick: _this6._hideAsset.bind(_this6, asset_type, includeAsset) },
                            react_default.a.createElement(Icon["a" /* default */], { name: includeAsset ? "cross-circle" : "plus-circle", className: "icon-14px" })
                        )
                    )
                ));
            });

            if (optionalAssets) {
                optionalAssets.filter(function (asset) {
                    var isAvailable = false;
                    _this6.props.backedCoins.get("OPEN", []).forEach(function (coin) {
                        if (coin && coin.symbol === asset) {
                            isAvailable = true;
                        }
                    });
                    if (!!_this6.props.bridgeCoins.get(asset)) {
                        isAvailable = true;
                    }
                    var keep = true;
                    balances.forEach(function (a) {
                        if (a.key === asset) keep = false;
                    });
                    return keep && isAvailable;
                }).forEach(function (a) {
                    var asset = es["b" /* ChainStore */].getAsset(a);
                    if (asset && _this6.props.isMyAccount) {
                        var includeAsset = !hiddenAssets.includes(asset.get("id"));

                        var thisAssetName = asset.get("symbol").split(".");
                        var canDeposit = !!_this6.props.backedCoins.get("OPEN", []).find(function (a) {
                            return a.backingCoinType === thisAssetName[1];
                        }) || !!_this6.props.backedCoins.get("RUDEX", []).find(function (a) {
                            return a.backingCoin === thisAssetName[1];
                        }) || asset.get("symbol") == "SEER";

                        var canBuy = !!_this6.props.bridgeCoins.get(asset.get("symbol"));

                        var notCore = asset.get("id") !== "1.3.0";

                        var _assetUtils$parseDesc2 = asset_utils["a" /* default */].parseDescription(asset.getIn(["options", "description"])),
                            market = _assetUtils$parseDesc2.market;

                        if (asset.get("symbol").indexOf("OPEN.") !== -1 && !market) market = "USD";
                        var preferredMarket = market ? market : core_asset ? core_asset.get("symbol") : "SEER";
                        var directMarketLink = notCore ? react_default.a.createElement(
                            react_router_es["b" /* Link */],
                            { to: "/market/" + asset.get("symbol") + "_" + preferredMarket },
                            react_default.a.createElement(Icon["a" /* default */], { name: "trade", className: "icon-14px" })
                        ) : emptyCell;

                        var _renderBorrow2 = renderBorrow(asset, _this6.props.account),
                            isBitAsset = _renderBorrow2.isBitAsset,
                            borrowModal = _renderBorrow2.borrowModal,
                            borrowLink = _renderBorrow2.borrowLink;

                        if (includeAsset && visible || !includeAsset && !visible) balances.push(react_default.a.createElement(
                            "tr",
                            { key: asset.get("symbol"), style: { maxWidth: "100rem" } },
                            react_default.a.createElement(
                                "td",
                                { style: { textAlign: "left" } },
                                react_default.a.createElement(LinkToAssetById["a" /* default */], { asset: asset.get("id") })
                            ),
                            react_default.a.createElement(
                                "td",
                                null,
                                emptyCell
                            ),
                            react_default.a.createElement(
                                "td",
                                { className: "column-hide-small" },
                                emptyCell
                            ),
                            react_default.a.createElement(
                                "td",
                                { className: "column-hide-small" },
                                emptyCell
                            ),
                            react_default.a.createElement(
                                "td",
                                { className: "column-hide-small" },
                                emptyCell
                            ),
                            react_default.a.createElement(
                                "td",
                                null,
                                emptyCell
                            ),
                            react_default.a.createElement(
                                "td",
                                { style: { textAlign: "center" } },
                                canBuy && _this6.props.isMyAccount ? react_default.a.createElement(
                                    "span",
                                    null,
                                    react_default.a.createElement(
                                        "a",
                                        { onClick: _this6._showDepositWithdraw.bind(_this6, "bridge_modal", a, false) },
                                        react_default.a.createElement(Icon["a" /* default */], { name: "dollar", className: "icon-14px" })
                                    )
                                ) : emptyCell
                            ),
                            react_default.a.createElement(
                                "td",
                                { style: { textAlign: "center" } },
                                directMarketLink
                            ),
                            react_default.a.createElement(
                                "td",
                                null,
                                isBitAsset ? react_default.a.createElement(
                                    "div",
                                    { className: "inline-block", "data-place": "bottom", "data-tip": counterpart_default.a.translate("tooltip.borrow", { asset: asset.get("symbol") }) },
                                    borrowLink,
                                    borrowModal
                                ) : emptyCell
                            ),
                            react_default.a.createElement(
                                "td",
                                null,
                                emptyCell
                            ),
                            react_default.a.createElement(
                                "td",
                                { style: { textAlign: "center" }, className: "column-hide-small", "data-place": "bottom", "data-tip": counterpart_default.a.translate("tooltip." + (includeAsset ? "hide_asset" : "show_asset")) },
                                react_default.a.createElement(
                                    "a",
                                    { style: { marginRight: 0 }, className: includeAsset ? "order-cancel" : "action-plus", onClick: _this6._hideAsset.bind(_this6, asset.get("id"), includeAsset) },
                                    react_default.a.createElement(Icon["a" /* default */], { name: includeAsset ? "cross-circle" : "plus-circle", className: "icon-14px" })
                                )
                            )
                        ));
                    }
                });
            }

            balances.sort(this.sortFunctions[this.state.sortKey]);
            return balances;
        }
    }, {
        key: "_toggleHiddenAssets",
        value: function _toggleHiddenAssets() {
            this.setState({
                showHidden: !this.state.showHidden
            });
        }
    }, {
        key: "_toggleSortOrder",
        value: function _toggleSortOrder(key) {
            if (this.state.sortKey === key) {
                SettingsActions["a" /* default */].changeViewSetting({
                    portfolioSortDirection: !this.state.sortDirection
                });
                this.setState({
                    sortDirection: !this.state.sortDirection
                });
            } else {
                SettingsActions["a" /* default */].changeViewSetting({
                    portfolioSort: key
                });
                this.setState({
                    sortKey: key
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this7 = this;

            var _props2 = this.props,
                account = _props2.account,
                hiddenAssets = _props2.hiddenAssets,
                settings = _props2.settings,
                orders = _props2.orders;
            var showHidden = this.state.showHidden;


            if (!account) {
                return null;
            }

            var includedBalances = void 0,
                hiddenBalances = void 0;
            var account_balances = account.get("balances");

            var includedBalancesList = immutable_default.a.List(),
                hiddenBalancesList = immutable_default.a.List();

            if (account_balances) {
                // Filter out balance objects that have 0 balance or are not included in open orders
                account_balances = account_balances.filter(function (a, index) {
                    var balanceObject = es["b" /* ChainStore */].getObject(a);
                    if (balanceObject && !balanceObject.get("balance") && !orders[index]) {
                        return false;
                    } else {
                        return true;
                    }
                });

                // Separate balances into hidden and included
                account_balances.forEach(function (a, asset_type) {
                    if (hiddenAssets.includes(asset_type)) {
                        hiddenBalancesList = hiddenBalancesList.push(a);
                    } else {
                        includedBalancesList = includedBalancesList.push(a);
                    }
                });

                var included = this._renderBalances(includedBalancesList, this.state.alwaysShowAssets, true);
                includedBalances = included;
                var hidden = this._renderBalances(hiddenBalancesList, this.state.alwaysShowAssets);
                hiddenBalances = hidden;
            }

            var portfolioHiddenAssetsBalance = react_default.a.createElement(TotalBalanceValue["a" /* default */], {
                noTip: true,
                balances: hiddenBalancesList,
                hide_asset: true
            });

            var portfolioActiveAssetsBalance = react_default.a.createElement(TotalBalanceValue["a" /* default */], {
                noTip: true,
                balances: includedBalancesList,
                hide_asset: true
            });
            var ordersValue = react_default.a.createElement(TotalBalanceValue["a" /* default */], {
                noTip: true,
                balances: immutable_default.a.List(),
                openOrders: orders,
                hide_asset: true
            });

            var preferredUnit = settings.get("unit") || this.props.core_asset.get("symbol");
            var totalValueText = react_default.a.createElement(TranslateWithLinks["a" /* default */], {
                noLink: true,
                string: "account.total",
                keys: [{ type: "asset", value: preferredUnit, arg: "asset" }]
            });

            var showAssetPercent = settings.get("showAssetPercent", false);

            // Find the current Openledger coins
            // const currentDepositAsset = this.props.backedCoins.get("OPEN", []).find(c => {
            //     return c.symbol === this.state.depositAsset;
            // }) || {};
            var currentWithdrawAsset = this.props.backedCoins.get("OPEN", []).find(function (c) {
                return c.symbol === _this7.state.withdrawAsset;
            }) || {};
            var currentBridges = this.props.bridgeCoins.get(this.state.bridgeAsset) || null;

            var preferredAsset = es["b" /* ChainStore */].getAsset(preferredUnit);
            var assetName = !!preferredAsset ? preferredAsset.get("symbol") : "";
            if (preferredAsset) {
                var _utils$replaceName = utils["a" /* default */].replaceName(assetName, !!preferredAsset.get("bitasset_data_id")),
                    prefix = _utils$replaceName.prefix,
                    name = _utils$replaceName.name;

                assetName = (prefix || "") + name;
            }
            var hiddenSubText = react_default.a.createElement(
                "span",
                { style: { visibility: "hidden" } },
                "H"
            );

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
                            { defaultActiveTab: 0, segmented: false, setting: "overviewTab", className: "account-tabs", tabsClass: "account-overview no-padding bordered-header content-block" },
                            react_default.a.createElement(
                                Tabs["a" /* Tab */],
                                { title: "account.portfolio", subText: portfolioActiveAssetsBalance },
                                react_default.a.createElement(
                                    "div",
                                    { className: "header-selector" },
                                    react_default.a.createElement(
                                        "div",
                                        { className: "selector" },
                                        react_default.a.createElement(
                                            "div",
                                            { className: classnames_default()("inline-block", { inactive: showHidden && hiddenBalances.length }), onClick: showHidden ? this._toggleHiddenAssets.bind(this) : function () {} },
                                            react_default.a.createElement(react_translate_component_default.a, { content: "account.hide_hidden" })
                                        ),
                                        hiddenBalances.length ? react_default.a.createElement(
                                            "div",
                                            { className: classnames_default()("inline-block", { inactive: !showHidden }), onClick: !showHidden ? this._toggleHiddenAssets.bind(this) : function () {} },
                                            react_default.a.createElement(react_translate_component_default.a, { content: "account.show_hidden" })
                                        ) : null
                                    )
                                ),
                                react_default.a.createElement(SendModal["a" /* default */], { id: "send_modal_portfolio", ref: "send_modal", from_name: this.props.account.get("name"), asset_id: this.state.send_asset || "1.3.0" }),
                                react_default.a.createElement(
                                    "table",
                                    { className: "table dashboard-table table-hover" },
                                    react_default.a.createElement(
                                        "thead",
                                        null,
                                        react_default.a.createElement(
                                            "tr",
                                            null,
                                            react_default.a.createElement(
                                                "th",
                                                { style: { textAlign: "left" }, className: "clickable", onClick: this._toggleSortOrder.bind(this, "alphabetic") },
                                                react_default.a.createElement(react_translate_component_default.a, { component: "span", content: "account.asset" })
                                            ),
                                            react_default.a.createElement(
                                                "th",
                                                { style: { textAlign: "right" } },
                                                react_default.a.createElement(react_translate_component_default.a, { content: "account.qty" })
                                            ),
                                            showAssetPercent ? react_default.a.createElement(
                                                "th",
                                                { style: { textAlign: "right" } },
                                                react_default.a.createElement(react_translate_component_default.a, { component: "span", content: "account.percent" })
                                            ) : null,
                                            react_default.a.createElement(
                                                "th",
                                                null,
                                                react_default.a.createElement(react_translate_component_default.a, { content: "header.payments" })
                                            ),
                                            react_default.a.createElement(
                                                "th",
                                                null,
                                                react_default.a.createElement(react_translate_component_default.a, { content: "account.trade" })
                                            ),
                                            react_default.a.createElement(
                                                "th",
                                                { className: "column-hide-small" },
                                                react_default.a.createElement(react_translate_component_default.a, { content: !showHidden ? "exchange.hide" : "account.perm.show" })
                                            )
                                        )
                                    ),
                                    react_default.a.createElement(
                                        "tbody",
                                        null,
                                        showHidden && hiddenBalances.length ? hiddenBalances : includedBalances
                                    )
                                )
                            ),
                            react_default.a.createElement(
                                Tabs["a" /* Tab */],
                                { title: "account.open_orders", subText: ordersValue },
                                react_default.a.createElement(
                                    Account_AccountOrders,
                                    this.props,
                                    react_default.a.createElement(
                                        "tbody",
                                        null,
                                        react_default.a.createElement(
                                            "tr",
                                            { className: "total-value" },
                                            "hiddenSubText",
                                            react_default.a.createElement(
                                                "td",
                                                { colSpan: "7", style: { textAlign: "right" } },
                                                totalValueText
                                            ),
                                            react_default.a.createElement(
                                                "td",
                                                { colSpan: "2", style: { textAlign: "left" } },
                                                ordersValue
                                            ),
                                            this.props.isMyAccount ? react_default.a.createElement("td", null) : null
                                        )
                                    )
                                )
                            ),
                            react_default.a.createElement(
                                Tabs["a" /* Tab */],
                                { title: "account.activity", subText: hiddenSubText },
                                react_default.a.createElement(RecentTransactions["a" /* RecentTransactions */], {
                                    accountsList: immutable_default.a.fromJS([account.get("id")]),
                                    compactView: false,
                                    showMore: true,
                                    fullHeight: true,
                                    limit: 15,
                                    showFilters: true,
                                    dashboard: true
                                })
                            ),
                            account.get("proposals") && account.get("proposals").size ? react_default.a.createElement(
                                Tabs["a" /* Tab */],
                                { title: "explorer.proposals.title", subText: account.get("proposals") ? account.get("proposals").size : 0 },
                                react_default.a.createElement(Account_Proposals, { className: "dashboard-table", account: account.get("id") })
                            ) : null
                        ),
                        react_default.a.createElement(Modal_SettleModal, { ref: "settlement_modal", asset: this.state.settleAsset, account: account.get("name") })
                    )
                ),
                react_default.a.createElement(SimpleDepositWithdraw["a" /* default */], AccountOverview__extends({
                    ref: "withdraw_modal",
                    action: "withdraw",
                    fiatModal: this.state.fiatModal,
                    account: this.props.account.get("name"),
                    sender: this.props.account.get("id"),
                    asset: this.state.withdrawAsset,
                    modalId: "simple_withdraw_modal",
                    balances: this.props.balances
                }, currentWithdrawAsset, {
                    isDown: this.props.gatewayDown.get("OPEN")
                })),
                react_default.a.createElement(DepositModal["a" /* default */], {
                    ref: "deposit_modal_new",
                    modalId: "deposit_modal_new",
                    asset: this.state.depositAsset,
                    account: this.props.account.get("name"),
                    backedCoins: this.props.backedCoins
                }),
                react_default.a.createElement(SimpleDepositBlocktradesBridge["a" /* default */], {
                    ref: "bridge_modal",
                    action: "deposit",
                    account: this.props.account.get("name"),
                    sender: this.props.account.get("id"),
                    asset: this.state.bridgeAsset,
                    modalId: "simple_bridge_modal",
                    balances: this.props.balances,
                    bridges: currentBridges,
                    isDown: this.props.gatewayDown.get("TRADE")
                })
            );
        }
    }]);

    return AccountOverview;
}(react_default.a.Component);

AccountOverview_AccountOverview.propTypes = {
    balanceAssets: ChainTypes["a" /* default */].ChainAssetsList,
    core_asset: ChainTypes["a" /* default */].ChainAsset.isRequired
};
AccountOverview_AccountOverview.defaultProps = {
    core_asset: "1.3.0"
};


AccountOverview_AccountOverview = Object(BindToChainState["a" /* default */])(AccountOverview_AccountOverview);

var AccountOverview_BalanceWrapper = function (_React$Component2) {
    AccountOverview__inherits(BalanceWrapper, _React$Component2);

    function BalanceWrapper() {
        AccountOverview__classCallCheck(this, BalanceWrapper);

        return AccountOverview__possibleConstructorReturn(this, (BalanceWrapper.__proto__ || Object.getPrototypeOf(BalanceWrapper)).apply(this, arguments));
    }

    AccountOverview__createClass(BalanceWrapper, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            if (cjs["Apis"].instance().chain_id.substr(0, 8) === "4018d784") {
                // Only fetch this when on BTS main net
                GatewayActions["a" /* default */].fetchCoins();
                GatewayActions["a" /* default */].fetchBridgeCoins();
            }
        }
    }, {
        key: "render",
        value: function render() {
            var balanceAssets = this.props.balances.map(function (b) {
                return b && b.get("asset_type");
            }).filter(function (b) {
                return !!b;
            });

            var ordersByAsset = this.props.orders.reduce(function (orders, o) {
                var asset_id = o.getIn(["sell_price", "base", "asset_id"]);
                if (!orders[asset_id]) orders[asset_id] = 0;
                orders[asset_id] += parseInt(o.get("for_sale"), 10);
                return orders;
            }, {});

            for (var id in ordersByAsset) {
                if (balanceAssets.indexOf(id) === -1) {
                    balanceAssets.push(id);
                }
            }

            return react_default.a.createElement(AccountOverview_AccountOverview, AccountOverview__extends({}, this.state, this.props, { orders: ordersByAsset, balanceAssets: immutable_default.a.List(balanceAssets) }));
        }
    }]);

    return BalanceWrapper;
}(react_default.a.Component);

AccountOverview_BalanceWrapper.propTypes = {
    balances: ChainTypes["a" /* default */].ChainObjectsList,
    orders: ChainTypes["a" /* default */].ChainObjectsList
};
AccountOverview_BalanceWrapper.defaultProps = {
    balances: immutable_default.a.List(),
    orders: immutable_default.a.List()
};


/* harmony default export */ var Account_AccountOverview = __webpack_exports__["default"] = (Object(BindToChainState["a" /* default */])(AccountOverview_BalanceWrapper));

/***/ })

});
//# sourceMappingURL=11.js.map