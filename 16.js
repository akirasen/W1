webpackJsonp([16],{

/***/ 1659:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_keccak__ = __webpack_require__(1772);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_keccak___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_keccak__);


/* harmony default export */ __webpack_exports__["a"] = ({
    base: function base(obj, vType) {
        return Object.prototype.toString.call(obj) === '[object ' + vType + ']';
    },
    isArray: function isArray(obj) {
        return this.base(obj, 'Array');
    },
    isFunction: function isFunction(obj) {
        return this.base(obj, 'Function');
    },
    isString: function isString(obj) {
        return this.base(obj, 'String');
    },
    isObject: function isObject(obj) {
        return this.base(obj, 'Object');
    },
    isNumber: function isNumber(obj) {
        var n = Number(obj);
        return this.base(n, 'Number') && !isNaN(n);
    },
    isEmptyObject: function isEmptyObject(obj) {
        for (var t in obj) {
            return false;
        }return true;
    },
    isEmpty: function isEmpty(obj) {
        var flag = obj == undefined || obj == null || obj == 'null' || obj == '' || obj.length == 0;
        if (this.isObject(obj)) {
            flag = this.isEmptyObject(obj);
        }
        return flag;
    },
    whatType: function whatType(obj) {
        var t = Object.prototype.toString.call(obj);
        return t.substring(t.indexOf(' ') + 1, t.length - 1);
    },
    validateEtherAddress: function validateEtherAddress(address) {
        if (address) {
            if (address == "0x0000000000000000000000000000000000000000") return false;else {
                if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
                    // check if it has the basic requirements of an address
                    return false;
                } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
                    // If it's all small caps or all all caps, return true
                    return true;
                } else {
                    return address == this.checksumAddress(address);
                }
            }
        }
        return false;
    },
    checksumAddress: function checksumAddress(address) {
        address = address.toLowerCase().replace('0x', '');
        var hash = __WEBPACK_IMPORTED_MODULE_0_keccak___default()('keccak256').update(address).digest('hex');
        var ret = '0x';

        for (var i = 0; i < address.length; i++) {
            if (parseInt(hash[i], 16) >= 8) {
                ret += address[i].toUpperCase();
            } else {
                ret += address[i];
            }
        }
        return ret;
    }
});

/***/ }),

/***/ 1660:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_Utils__ = __webpack_require__(1741);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by BenJ on 2017/8/15.
 * 
 * 2018/3/4 修改 网关参数获取方式改为本地
 * 
 */


// 参数定义时注意不要与链上或水龙投参数键重复，除非想要被替换的，如目前的网关参数和最小抵押参数
global.walletConfig = {
    // 本地参数
    balance_task_timeout: 30000, // 资产定时任务刷新间隔
    history_page_size: 20, // 近期活动每页显示数
    csaf_param: 100, // 币天及积分积累 最终现实转换参数
    retain_count: 100000, // 核心资产精度参数
    // 网关参数 从水龙头获取
    bts_fees: 1, // bts网关转出手续费
    bts_master: 43752382, // bts网关账号
    erc20_fees: 10, // erc20网关转出手续费
    erc20_master: 43752382, // erc20网关账号
    // 链上参数 从链上获取 
    coin_unit: '', // 货币单位
    min_witness_pledge: 0, // 见证人最小抵押
    min_committee_member_pledge: 0 // 理事会成员最小抵押
};

var GlobalParams = function () {
    function GlobalParams() {
        _classCallCheck(this, GlobalParams);

        /**
         * 需要进行核心资产精度转换的参数 
         * 若不在此处转换则使用的时候自行转换亦可
         */
        this.need_transfer = ['min_witness_pledge', 'min_committee_member_pledge'];
    }

    _createClass(GlobalParams, [{
        key: 'init',
        value: function init() {
            var _this = this;

            // let fetchFaucet = new Promise((resolve, reject) => {
            //     FetchApi.get('sys/sysConf/walletConfigs').then(res => {
            //         if (res.code == 0) {
            //             resolve(res.data);
            //         } else if (__DEBUG__) {
            //             console.error('get wallet config error...');
            //             console.log(res.msg);
            //             resolve();
            //         }
            //     }).catch(() => {
            //         resolve();
            //     });
            // });

            var fetchChain = new Promise(function (resolve, reject) {
                ChainApi.getParameters().then(function (_ref) {
                    var params = _ref.params,
                        dynamicParams = _ref.dynamicParams;

                    resolve(params);
                }).catch(function (err) {
                    if (__DEBUG__) {
                        console.error('get chain config error...');
                        console.log(err.message);
                    }
                    resolve();
                });
            });

            return new Promise(function (resolve, reject) {
                Promise.all([fetchChain]).then(function (res) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = res[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var paramsObj = _step.value;

                            if (paramsObj) for (var key in paramsObj) {
                                var val = paramsObj[key];
                                if (__WEBPACK_IMPORTED_MODULE_0__utils_Utils__["a" /* default */].containerInArr(key, _this.need_transfer)) {
                                    val = __WEBPACK_IMPORTED_MODULE_0__utils_Utils__["a" /* default */].realCount(val);
                                }

                                _this.setConf(key, val);
                            }
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

                    resolve(global.walletConfig);
                });
            });
        }
    }, {
        key: 'setConf',
        value: function setConf(key, val) {
            global.walletConfig[key] = val;
        }
    }]);

    return GlobalParams;
}();

/* unused harmony default export */ var _unused_webpack_default_export = (new GlobalParams());
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(45)))

/***/ }),

/***/ 1740:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./app/alt-instance.js
var alt_instance = __webpack_require__(9);

// EXTERNAL MODULE: ./app/stores/SettingsStore.js
var SettingsStore = __webpack_require__(35);

// EXTERNAL MODULE: ./app/utils/Validation.js
var Validation = __webpack_require__(1659);

// CONCATENATED MODULE: ./app/api/FetchApi.js
/**
 * Created by BenJ on 2017/8/1.
 */



var serializeObj = function serializeObj(obj) {
    var arr = [];
    for (var o in obj) {
        arr.push(o + "=" + obj[o]);
    }
    return arr.join('&');
};

var FetchApi_baseFetch = function baseFetch(url) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'get';
    var data = arguments[2];

    var faucetAddress = SettingsStore["a" /* default */].getSetting("faucet_address");
    if (window && window.location && window.location.protocol === "https:") {
        faucetAddress = faucetAddress.replace(/http:\/\//, "https://");
    }

    return new Promise(function (resolve, reject) {
        var requestObj = {
            method: type,
            mode: 'cors',
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            }
        };
        if (!Validation["a" /* default */].isEmpty(data)) {
            requestObj.body = JSON.stringify(data);
        }
        fetch(faucetAddress + "/" + url, requestObj).then(function (response) {
            return response.json();
        }).then(function (res) {
            if (res.code == 0) {
                resolve(res);
            } else {
                reject(res.msg);
            }
        }).catch(function (err) {
            reject(err.message);
        });
    });
};

/* harmony default export */ var FetchApi = ({
    get: function get(url, data) {
        var params = serializeObj(data);
        return FetchApi_baseFetch(url + "?" + params);
    },
    post: function post(url, data) {
        return FetchApi_baseFetch(url, 'post', data);
    }
});
// EXTERNAL MODULE: ./app/utils/GlobalParams.js
var GlobalParams = __webpack_require__(1660);

// CONCATENATED MODULE: ./app/actions/gateway/ERC20GatewayActions.js
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by xiangxn on 2017/9/13.
 */



//import ChainApi from "../../api/ChainApi";



var ERC20GatewayActions_ERC20GatewayActions = function () {
    function ERC20GatewayActions() {
        _classCallCheck(this, ERC20GatewayActions);
    }

    _createClass(ERC20GatewayActions, [{
        key: "getAddrByAccount",
        value: function getAddrByAccount(js) {
            return function (dispatch) {
                return new Promise(function (resolve, reject) {
                    return FetchApi.get('api/v1/seer_eth/query', js).then(function (res) {
                        //console.log(res.data)
                        dispatch({ "ethaddr": res.data.eth_address });
                        resolve(res.data.eth_address);
                    }).catch(function (err) {
                        dispatch(null);

                        console.log(err);
                    });
                });
            };
        }
    }, {
        key: "bindAccount",
        value: function bindAccount(js) {

            return function (dispatch) {
                return new Promise(function (resolve, reject) {
                    return FetchApi.post('api/v1/seer_eth/bind', js).then(function (res) {
                        //console.log("ethaddr:",res)
                        dispatch({ "ethaddr": res.data.eth_address });
                        resolve(res.data.eth_address);
                    }).catch(function (err) {
                        dispatch(null);

                        console.log(err);
                    });
                });
            };
        }
    }, {
        key: "loading",
        value: function loading(flag) {
            return flag;
        }
    }]);

    return ERC20GatewayActions;
}();

/* harmony default export */ var gateway_ERC20GatewayActions = __webpack_exports__["a"] = (alt_instance["a" /* default */].createActions(ERC20GatewayActions_ERC20GatewayActions));

/***/ }),

/***/ 1741:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer, global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bytebuffer__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bytebuffer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bytebuffer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bs58__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bs58___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_bs58__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__GlobalParams__ = __webpack_require__(1660);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Validation__ = __webpack_require__(1659);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by xiangxn on 2017/7/10.
 */






var Utils = function () {
    function Utils() {
        _classCallCheck(this, Utils);
    }

    _createClass(Utils, null, [{
        key: 'calcCoinSecondsEarned',


        /**
         * 计算可领取的币龄
         * @param statistics 账户的统计对象
         * @param window 币龄过期时间
         * @param now 头块时间
         * @returns {{new_coin_seconds_earned: number, new_average_coins: number}} 返回可领取的币龄和新的平均余额
         * remark
         * 时间之间的计算以秒为单位
         * 时间与其他的计算以分钟点的秒(向下取整的分钟秒数)为单位
         */
        value: function calcCoinSecondsEarned(statistics, window, now) {
            var new_average_coins = 0;
            var max_coin_seconds = 0;
            var effective_balance = __WEBPACK_IMPORTED_MODULE_0_bytebuffer__["Long"].fromValue(statistics.core_balance).add(__WEBPACK_IMPORTED_MODULE_0_bytebuffer__["Long"].fromValue(statistics.core_leased_in)).sub(__WEBPACK_IMPORTED_MODULE_0_bytebuffer__["Long"].fromValue(statistics.core_leased_out));
            var nowTime = __WEBPACK_IMPORTED_MODULE_0_bytebuffer__["Long"].fromNumber(new Date(now).getTime() / 1000); //头块时间 单位 秒
            nowTime -= nowTime % 60; // 转换成整分钟秒
            var averageUpdateTime = __WEBPACK_IMPORTED_MODULE_0_bytebuffer__["Long"].fromNumber(new Date(statistics.average_coins_last_update).getTime() / 1000); //平均余额上次更新时间 单位 秒
            var earnedUpdateTime = __WEBPACK_IMPORTED_MODULE_0_bytebuffer__["Long"].fromNumber(new Date(statistics.coin_seconds_earned_last_update).getTime() / 1000); //币龄采集上次更新时间 单位 秒
            if (nowTime <= averageUpdateTime) {
                new_average_coins = __WEBPACK_IMPORTED_MODULE_0_bytebuffer__["Long"].fromValue(statistics.average_coins);
            } else {
                var delta_seconds = nowTime - averageUpdateTime;
                if (delta_seconds >= window) {
                    new_average_coins = effective_balance;
                } else {
                    var old_seconds = window - delta_seconds;
                    var old_coin_seconds = __WEBPACK_IMPORTED_MODULE_0_bytebuffer__["Long"].fromValue(statistics.average_coins) * old_seconds;
                    var new_coin_seconds = effective_balance * delta_seconds;
                    max_coin_seconds = old_coin_seconds + new_coin_seconds;
                    new_average_coins = Math.floor(max_coin_seconds / window);
                }
            }
            max_coin_seconds = new_average_coins * window;
            //检查可领取的币龄
            var new_coin_seconds_earned = 0;
            if (nowTime <= earnedUpdateTime) {
                new_coin_seconds_earned = __WEBPACK_IMPORTED_MODULE_0_bytebuffer__["Long"].fromValue(statistics.coin_seconds_earned);
            } else {
                var _delta_seconds = nowTime - earnedUpdateTime;
                var delta_coin_seconds = effective_balance * _delta_seconds;
                new_coin_seconds_earned = __WEBPACK_IMPORTED_MODULE_0_bytebuffer__["Long"].fromValue(statistics.coin_seconds_earned).add(delta_coin_seconds);
            }
            if (new_coin_seconds_earned > max_coin_seconds) {
                new_coin_seconds_earned = max_coin_seconds;
            }

            return { new_coin_seconds_earned: new_coin_seconds_earned, new_average_coins: new_average_coins };
        }
    }, {
        key: 'uint64ToBase58',
        value: function uint64ToBase58(val) {
            return Object(__WEBPACK_IMPORTED_MODULE_1_bs58__["encode"])(__WEBPACK_IMPORTED_MODULE_0_bytebuffer__["Long"].fromValue(val).toBytesLE());
        }
    }, {
        key: 'base58ToUInt64',
        value: function base58ToUInt64(val58) {
            var uidBuf = __WEBPACK_IMPORTED_MODULE_0_bytebuffer___default.a.fromBinary(Buffer.from(Object(__WEBPACK_IMPORTED_MODULE_1_bs58__["decode"])(val58)).toString("binary"), __WEBPACK_IMPORTED_MODULE_0_bytebuffer___default.a.LITTLE_ENDIAN);
            var m = uidBuf.readUInt64();
            return m;
        }
    }, {
        key: 'encodeBackOwner',
        value: function encodeBackOwner(uid, owner) {
            if (typeof owner != "string") return null;
            if (owner.length != 51) return null;
            return owner + "" + Utils.uint64ToBase58(uid);
        }
    }, {
        key: 'decodeBackOwner',
        value: function decodeBackOwner(backOwner) {
            if (typeof backOwner != "string") return null;
            if (backOwner.length < 52) return null;
            var owner = backOwner.substr(0, 51);
            var uid = 0;
            try {
                uid = Utils.base58ToUInt64(backOwner.substr(51));
            } catch (e) {
                return null;
            }
            return { uid: uid, owner: owner };
        }

        /**
         * 核心资产类精度转换
         * @param {*} count 
         */

    }, {
        key: 'realCount',
        value: function realCount(count) {
            var rc = global.walletConfig.retain_count;
            var real = Math.round(count / rc * rc) / rc;
            return this.formatAmount(real);
        }

        /**
         * 精确小数点后5位的有效数据
         * 5位是根据实际yoyo全局比例参数来
         * @param val 格式化原始值
         * @param retainLen 保留小数长度(含小数点)
         */

    }, {
        key: 'formatAmount',
        value: function formatAmount(val, retainLen) {
            var valLen = val.toString().length;
            var pointLen = val.toString().indexOf('.');
            if (!retainLen) retainLen = global.walletConfig.retain_count.toString().length;
            if (pointLen >= 0 && valLen > pointLen + retainLen) {
                val = parseFloat(val.toString().substring(0, pointLen + retainLen));
            }
            return val;
        }

        /**
         * 格式化日期
         * @param dateStr 日期字符串 或 timestamp
         * @param GMT 时区差值
         * @returns {string}
         */

    }, {
        key: 'formatDate',
        value: function formatDate(dateStr, GMT) {
            var date = new Date(dateStr);
            if (__WEBPACK_IMPORTED_MODULE_3__Validation__["a" /* default */].isNumber(GMT) && GMT != 0) {
                date = new Date(date.getTime() + GMT * 60 * 60 * 1000);
            }
            return date.getFullYear() + '-' + this.autoFixed(date.getMonth() + 1) + '-' + this.autoFixed(date.getDate()) + ' ' + this.autoFixed(date.getHours()) + ':' + this.autoFixed(date.getMinutes()) + ':' + this.autoFixed(date.getSeconds());
        }

        /**
         * 转换与api通讯时间值
         * @param dObj 日期字符串 或 timestamp
         * @returns {timestamp, dateStr} 转化后的时间戳 和 格式化日期
         */

    }, {
        key: 'transferApiDate',
        value: function transferApiDate(dObj) {
            var now = new Date();
            var date = new Date(dObj);
            var timeOffset = -(now.getTimezoneOffset() * 60 * 1000);
            var timestamp = date.getTime() + timeOffset;
            var ua = navigator.userAgent.toLowerCase();
            // 某些浏览器修整了时区差值，比如猎豹
            if (ua.indexOf('lbbrowser') >= 0) {
                timestamp -= timeOffset;
            }
            var dateStr = this.formatDate(timestamp);
            return { timestamp: timestamp, dateStr: dateStr };
        }
    }, {
        key: 'transferApiDateString',
        value: function transferApiDateString(dateStr) {
            try {
                var time = dateStr;
                var timeArr = [];
                var temp = time.split('T');

                timeArr = timeArr.concat(temp[0].split('-'));
                timeArr = timeArr.concat(temp[1].split(':'));

                var tempY = parseInt(timeArr[0]);
                var tempM = parseInt(timeArr[1]);
                var rangeMonth = 0;
                var maxDate = [1, 3, 5, 7, 8, 10, 12];
                var minDate = [4, 6, 9, 11];
                if (this.containerInArr(tempM, maxDate)) rangeMonth = 31;else if (this.containerInArr(tempM, maxDate)) rangeMonth = 30;else {
                    if (tempY % 4 == 0 && tempY % 100 != 0 || tempY % 400 == 0) {
                        rangeMonth = 29;
                    } else {
                        rangeMonth = 28;
                    }
                }
                var rangeArr = [12, rangeMonth, 24, 60, 60];
                var finalSec = new Date(tempY + '-' + this.autoFixed(tempM)).getTime() / 1000;

                // 年与月不参与计算 但参与索引递增
                timeArr[0] = 0;
                timeArr[1] = 0;
                // 抹去初始第一天
                timeArr[2] -= 1;

                for (var i = 0; i < 5; i++) {
                    var sec = parseInt(timeArr[i]);
                    for (var j = i; j < 5; j++) {
                        sec *= rangeArr[j];
                    }
                    finalSec += sec;
                }

                return finalSec;
            } catch (error) {
                return 0;
            }
        }

        /**
         * 自动补全数字
         * @param num
         * @param len
         * @returns {string}
         */

    }, {
        key: 'autoFixed',
        value: function autoFixed(num) {
            var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
            var symbol = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            var arr = [];
            var o = num.toString().split('');
            for (var i = 0; i < len - o.length; i++) {
                arr.push(symbol);
            }
            return arr.concat(o).join('');
        }
    }, {
        key: 'containerInArr',
        value: function containerInArr(target, arr) {
            var flag = false;
            if (__WEBPACK_IMPORTED_MODULE_3__Validation__["a" /* default */].isArray(arr)) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var t = _step.value;

                        if (target == t) {
                            return true;
                        }
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
            }
            return flag;
        }
    }, {
        key: 'hexToBase64',
        value: function hexToBase64(hex) {
            return new Buffer(hex, 'hex').toString('base64');
        }
    }]);

    return Utils;
}();

/* harmony default export */ __webpack_exports__["a"] = (Utils);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(4).Buffer, __webpack_require__(45)))

/***/ }),

/***/ 1771:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_alt_instance__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BaseStore__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions_gateway_ERC20GatewayActions__ = __webpack_require__(1740);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by xiangxn on 2017/9/13.
 */





var ERC20GatewayStore = function (_BaseStore) {
    _inherits(ERC20GatewayStore, _BaseStore);

    function ERC20GatewayStore() {
        _classCallCheck(this, ERC20GatewayStore);

        var _this = _possibleConstructorReturn(this, (ERC20GatewayStore.__proto__ || Object.getPrototypeOf(ERC20GatewayStore)).call(this));

        _this.state = {
            ethaddr: null,
            error: null,
            balance: {},
            loading: false,
            fees: {
                min_fees: 0,
                min_real_fees: 0,
                use_csaf: 0,
                with_csaf_fees: 0
            }
        };
        _this.bindActions(__WEBPACK_IMPORTED_MODULE_2__actions_gateway_ERC20GatewayActions__["a" /* default */]);
        return _this;
    }

    _createClass(ERC20GatewayStore, [{
        key: "onGetAddrByUid",
        value: function onGetAddrByUid(ethaddr) {
            if (ethaddr && ethaddr.code == 0) {
                this.setState({ ethaddr: ethaddr.data });
            } else {
                this.setState({ ethaddr: null, error: ethaddr });
            }
        }
    }, {
        key: "onBindAccount",
        value: function onBindAccount(ethaddr) {
            if (ethaddr && ethaddr.code == 0) {
                this.setState({ ethaddr: ethaddr.data });
            } else {
                this.setState({ error: ethaddr });
            }
        }
    }, {
        key: "onGetBalanceByUid",
        value: function onGetBalanceByUid(balance) {
            if (balance) {
                this.setState({ balance: balance });
            }
        }
    }, {
        key: "onConfirmTransfer",
        value: function onConfirmTransfer(_ref) {
            var err = _ref.err,
                resolve = _ref.resolve,
                reject = _ref.reject;

            if (err) {
                var code = 0;
                if (err.message) {
                    if (err.message.indexOf('Insufficient Balance') >= 0) {
                        code = 2;
                    } else if (err.message.indexOf("'toUncompressed' of null") >= 0) {
                        code = 3;
                    }
                } else {
                    code = err;
                }
                reject(code);
            } else {
                resolve();
            }
            this.setState({ loading: false });
        }
    }, {
        key: "onConfirmTransferBts",
        value: function onConfirmTransferBts(_ref2) {
            var err = _ref2.err,
                resolve = _ref2.resolve,
                reject = _ref2.reject;

            if (err) {
                var code = 0;
                if (err.message) {
                    if (err.message.indexOf('Insufficient Balance') >= 0) {
                        code = 2;
                    } else if (err.message.indexOf("'toUncompressed' of null") >= 0) {
                        code = 3;
                    }
                } else {
                    code = err;
                }
                reject(code);
            } else {
                resolve();
            }
            this.setState({ loading: false });
        }
    }, {
        key: "onGetFees",
        value: function onGetFees(_ref3) {
            var resolve = _ref3.resolve,
                fees = _ref3.fees;

            if (resolve) {
                resolve();
                this.setState({
                    fees: fees,
                    loading: false
                });
            }
        }
    }, {
        key: "onLoading",
        value: function onLoading(flag) {
            this.setState({ loading: flag });
        }
    }]);

    return ERC20GatewayStore;
}(__WEBPACK_IMPORTED_MODULE_1__BaseStore__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_alt_instance__["a" /* default */].createStore(ERC20GatewayStore, "ERC20GatewayStore"));

/***/ }),

/***/ 1772:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = __webpack_require__(1773)(__webpack_require__(1776))


/***/ }),

/***/ 1773:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var createKeccak = __webpack_require__(1774)
var createShake = __webpack_require__(1775)

module.exports = function (KeccakState) {
  var Keccak = createKeccak(KeccakState)
  var Shake = createShake(KeccakState)

  return function (algorithm, options) {
    var hash = typeof algorithm === 'string' ? algorithm.toLowerCase() : algorithm
    switch (hash) {
      case 'keccak224': return new Keccak(1152, 448, null, 224, options)
      case 'keccak256': return new Keccak(1088, 512, null, 256, options)
      case 'keccak384': return new Keccak(832, 768, null, 384, options)
      case 'keccak512': return new Keccak(576, 1024, null, 512, options)

      case 'sha3-224': return new Keccak(1152, 448, 0x06, 224, options)
      case 'sha3-256': return new Keccak(1088, 512, 0x06, 256, options)
      case 'sha3-384': return new Keccak(832, 768, 0x06, 384, options)
      case 'sha3-512': return new Keccak(576, 1024, 0x06, 512, options)

      case 'shake128': return new Shake(1344, 256, 0x1f, options)
      case 'shake256': return new Shake(1088, 512, 0x1f, options)

      default: throw new Error('Invald algorithm: ' + algorithm)
    }
  }
}


/***/ }),

/***/ 1774:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Buffer = __webpack_require__(39).Buffer
var Transform = __webpack_require__(293).Transform
var inherits = __webpack_require__(30)

module.exports = function (KeccakState) {
  function Keccak (rate, capacity, delimitedSuffix, hashBitLength, options) {
    Transform.call(this, options)

    this._rate = rate
    this._capacity = capacity
    this._delimitedSuffix = delimitedSuffix
    this._hashBitLength = hashBitLength
    this._options = options

    this._state = new KeccakState()
    this._state.initialize(rate, capacity)
    this._finalized = false
  }

  inherits(Keccak, Transform)

  Keccak.prototype._transform = function (chunk, encoding, callback) {
    var error = null
    try {
      this.update(chunk, encoding)
    } catch (err) {
      error = err
    }

    callback(error)
  }

  Keccak.prototype._flush = function (callback) {
    var error = null
    try {
      this.push(this.digest())
    } catch (err) {
      error = err
    }

    callback(error)
  }

  Keccak.prototype.update = function (data, encoding) {
    if (!Buffer.isBuffer(data) && typeof data !== 'string') throw new TypeError('Data must be a string or a buffer')
    if (this._finalized) throw new Error('Digest already called')
    if (!Buffer.isBuffer(data)) data = Buffer.from(data, encoding)

    this._state.absorb(data)

    return this
  }

  Keccak.prototype.digest = function (encoding) {
    if (this._finalized) throw new Error('Digest already called')
    this._finalized = true

    if (this._delimitedSuffix) this._state.absorbLastFewBits(this._delimitedSuffix)
    var digest = this._state.squeeze(this._hashBitLength / 8)
    if (encoding !== undefined) digest = digest.toString(encoding)

    this._resetState()

    return digest
  }

  // remove result from memory
  Keccak.prototype._resetState = function () {
    this._state.initialize(this._rate, this._capacity)
    return this
  }

  // because sometimes we need hash right now and little later
  Keccak.prototype._clone = function () {
    var clone = new Keccak(this._rate, this._capacity, this._delimitedSuffix, this._hashBitLength, this._options)
    this._state.copy(clone._state)
    clone._finalized = this._finalized

    return clone
  }

  return Keccak
}


/***/ }),

/***/ 1775:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Buffer = __webpack_require__(39).Buffer
var Transform = __webpack_require__(293).Transform
var inherits = __webpack_require__(30)

module.exports = function (KeccakState) {
  function Shake (rate, capacity, delimitedSuffix, options) {
    Transform.call(this, options)

    this._rate = rate
    this._capacity = capacity
    this._delimitedSuffix = delimitedSuffix
    this._options = options

    this._state = new KeccakState()
    this._state.initialize(rate, capacity)
    this._finalized = false
  }

  inherits(Shake, Transform)

  Shake.prototype._transform = function (chunk, encoding, callback) {
    var error = null
    try {
      this.update(chunk, encoding)
    } catch (err) {
      error = err
    }

    callback(error)
  }

  Shake.prototype._flush = function () {}

  Shake.prototype._read = function (size) {
    this.push(this.squeeze(size))
  }

  Shake.prototype.update = function (data, encoding) {
    if (!Buffer.isBuffer(data) && typeof data !== 'string') throw new TypeError('Data must be a string or a buffer')
    if (this._finalized) throw new Error('Squeeze already called')
    if (!Buffer.isBuffer(data)) data = Buffer.from(data, encoding)

    this._state.absorb(data)

    return this
  }

  Shake.prototype.squeeze = function (dataByteLength, encoding) {
    if (!this._finalized) {
      this._finalized = true
      this._state.absorbLastFewBits(this._delimitedSuffix)
    }

    var data = this._state.squeeze(dataByteLength)
    if (encoding !== undefined) data = data.toString(encoding)

    return data
  }

  Shake.prototype._resetState = function () {
    this._state.initialize(this._rate, this._capacity)
    return this
  }

  Shake.prototype._clone = function () {
    var clone = new Shake(this._rate, this._capacity, this._delimitedSuffix, this._options)
    this._state.copy(clone._state)
    clone._finalized = this._finalized

    return clone
  }

  return Shake
}


/***/ }),

/***/ 1776:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Buffer = __webpack_require__(39).Buffer
var keccakState = __webpack_require__(1777)

function Keccak () {
  // much faster than `new Array(50)`
  this.state = [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
  ]

  this.blockSize = null
  this.count = 0
  this.squeezing = false
}

Keccak.prototype.initialize = function (rate, capacity) {
  for (var i = 0; i < 50; ++i) this.state[i] = 0
  this.blockSize = rate / 8
  this.count = 0
  this.squeezing = false
}

Keccak.prototype.absorb = function (data) {
  for (var i = 0; i < data.length; ++i) {
    this.state[~~(this.count / 4)] ^= data[i] << (8 * (this.count % 4))
    this.count += 1
    if (this.count === this.blockSize) {
      keccakState.p1600(this.state)
      this.count = 0
    }
  }
}

Keccak.prototype.absorbLastFewBits = function (bits) {
  this.state[~~(this.count / 4)] ^= bits << (8 * (this.count % 4))
  if ((bits & 0x80) !== 0 && this.count === (this.blockSize - 1)) keccakState.p1600(this.state)
  this.state[~~((this.blockSize - 1) / 4)] ^= 0x80 << (8 * ((this.blockSize - 1) % 4))
  keccakState.p1600(this.state)
  this.count = 0
  this.squeezing = true
}

Keccak.prototype.squeeze = function (length) {
  if (!this.squeezing) this.absorbLastFewBits(0x01)

  var output = Buffer.alloc(length)
  for (var i = 0; i < length; ++i) {
    output[i] = (this.state[~~(this.count / 4)] >>> (8 * (this.count % 4))) & 0xff
    this.count += 1
    if (this.count === this.blockSize) {
      keccakState.p1600(this.state)
      this.count = 0
    }
  }

  return output
}

Keccak.prototype.copy = function (dest) {
  for (var i = 0; i < 50; ++i) dest.state[i] = this.state[i]
  dest.blockSize = this.blockSize
  dest.count = this.count
  dest.squeezing = this.squeezing
}

module.exports = Keccak


/***/ }),

/***/ 1777:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var P1600_ROUND_CONSTANTS = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648]

exports.p1600 = function (s) {
  for (var round = 0; round < 24; ++round) {
    // theta
    var lo0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40]
    var hi0 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41]
    var lo1 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42]
    var hi1 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43]
    var lo2 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44]
    var hi2 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45]
    var lo3 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46]
    var hi3 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47]
    var lo4 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48]
    var hi4 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49]

    var lo = lo4 ^ (lo1 << 1 | hi1 >>> 31)
    var hi = hi4 ^ (hi1 << 1 | lo1 >>> 31)
    var t1slo0 = s[0] ^ lo
    var t1shi0 = s[1] ^ hi
    var t1slo5 = s[10] ^ lo
    var t1shi5 = s[11] ^ hi
    var t1slo10 = s[20] ^ lo
    var t1shi10 = s[21] ^ hi
    var t1slo15 = s[30] ^ lo
    var t1shi15 = s[31] ^ hi
    var t1slo20 = s[40] ^ lo
    var t1shi20 = s[41] ^ hi
    lo = lo0 ^ (lo2 << 1 | hi2 >>> 31)
    hi = hi0 ^ (hi2 << 1 | lo2 >>> 31)
    var t1slo1 = s[2] ^ lo
    var t1shi1 = s[3] ^ hi
    var t1slo6 = s[12] ^ lo
    var t1shi6 = s[13] ^ hi
    var t1slo11 = s[22] ^ lo
    var t1shi11 = s[23] ^ hi
    var t1slo16 = s[32] ^ lo
    var t1shi16 = s[33] ^ hi
    var t1slo21 = s[42] ^ lo
    var t1shi21 = s[43] ^ hi
    lo = lo1 ^ (lo3 << 1 | hi3 >>> 31)
    hi = hi1 ^ (hi3 << 1 | lo3 >>> 31)
    var t1slo2 = s[4] ^ lo
    var t1shi2 = s[5] ^ hi
    var t1slo7 = s[14] ^ lo
    var t1shi7 = s[15] ^ hi
    var t1slo12 = s[24] ^ lo
    var t1shi12 = s[25] ^ hi
    var t1slo17 = s[34] ^ lo
    var t1shi17 = s[35] ^ hi
    var t1slo22 = s[44] ^ lo
    var t1shi22 = s[45] ^ hi
    lo = lo2 ^ (lo4 << 1 | hi4 >>> 31)
    hi = hi2 ^ (hi4 << 1 | lo4 >>> 31)
    var t1slo3 = s[6] ^ lo
    var t1shi3 = s[7] ^ hi
    var t1slo8 = s[16] ^ lo
    var t1shi8 = s[17] ^ hi
    var t1slo13 = s[26] ^ lo
    var t1shi13 = s[27] ^ hi
    var t1slo18 = s[36] ^ lo
    var t1shi18 = s[37] ^ hi
    var t1slo23 = s[46] ^ lo
    var t1shi23 = s[47] ^ hi
    lo = lo3 ^ (lo0 << 1 | hi0 >>> 31)
    hi = hi3 ^ (hi0 << 1 | lo0 >>> 31)
    var t1slo4 = s[8] ^ lo
    var t1shi4 = s[9] ^ hi
    var t1slo9 = s[18] ^ lo
    var t1shi9 = s[19] ^ hi
    var t1slo14 = s[28] ^ lo
    var t1shi14 = s[29] ^ hi
    var t1slo19 = s[38] ^ lo
    var t1shi19 = s[39] ^ hi
    var t1slo24 = s[48] ^ lo
    var t1shi24 = s[49] ^ hi

    // rho & pi
    var t2slo0 = t1slo0
    var t2shi0 = t1shi0
    var t2slo16 = (t1shi5 << 4 | t1slo5 >>> 28)
    var t2shi16 = (t1slo5 << 4 | t1shi5 >>> 28)
    var t2slo7 = (t1slo10 << 3 | t1shi10 >>> 29)
    var t2shi7 = (t1shi10 << 3 | t1slo10 >>> 29)
    var t2slo23 = (t1shi15 << 9 | t1slo15 >>> 23)
    var t2shi23 = (t1slo15 << 9 | t1shi15 >>> 23)
    var t2slo14 = (t1slo20 << 18 | t1shi20 >>> 14)
    var t2shi14 = (t1shi20 << 18 | t1slo20 >>> 14)
    var t2slo10 = (t1slo1 << 1 | t1shi1 >>> 31)
    var t2shi10 = (t1shi1 << 1 | t1slo1 >>> 31)
    var t2slo1 = (t1shi6 << 12 | t1slo6 >>> 20)
    var t2shi1 = (t1slo6 << 12 | t1shi6 >>> 20)
    var t2slo17 = (t1slo11 << 10 | t1shi11 >>> 22)
    var t2shi17 = (t1shi11 << 10 | t1slo11 >>> 22)
    var t2slo8 = (t1shi16 << 13 | t1slo16 >>> 19)
    var t2shi8 = (t1slo16 << 13 | t1shi16 >>> 19)
    var t2slo24 = (t1slo21 << 2 | t1shi21 >>> 30)
    var t2shi24 = (t1shi21 << 2 | t1slo21 >>> 30)
    var t2slo20 = (t1shi2 << 30 | t1slo2 >>> 2)
    var t2shi20 = (t1slo2 << 30 | t1shi2 >>> 2)
    var t2slo11 = (t1slo7 << 6 | t1shi7 >>> 26)
    var t2shi11 = (t1shi7 << 6 | t1slo7 >>> 26)
    var t2slo2 = (t1shi12 << 11 | t1slo12 >>> 21)
    var t2shi2 = (t1slo12 << 11 | t1shi12 >>> 21)
    var t2slo18 = (t1slo17 << 15 | t1shi17 >>> 17)
    var t2shi18 = (t1shi17 << 15 | t1slo17 >>> 17)
    var t2slo9 = (t1shi22 << 29 | t1slo22 >>> 3)
    var t2shi9 = (t1slo22 << 29 | t1shi22 >>> 3)
    var t2slo5 = (t1slo3 << 28 | t1shi3 >>> 4)
    var t2shi5 = (t1shi3 << 28 | t1slo3 >>> 4)
    var t2slo21 = (t1shi8 << 23 | t1slo8 >>> 9)
    var t2shi21 = (t1slo8 << 23 | t1shi8 >>> 9)
    var t2slo12 = (t1slo13 << 25 | t1shi13 >>> 7)
    var t2shi12 = (t1shi13 << 25 | t1slo13 >>> 7)
    var t2slo3 = (t1slo18 << 21 | t1shi18 >>> 11)
    var t2shi3 = (t1shi18 << 21 | t1slo18 >>> 11)
    var t2slo19 = (t1shi23 << 24 | t1slo23 >>> 8)
    var t2shi19 = (t1slo23 << 24 | t1shi23 >>> 8)
    var t2slo15 = (t1slo4 << 27 | t1shi4 >>> 5)
    var t2shi15 = (t1shi4 << 27 | t1slo4 >>> 5)
    var t2slo6 = (t1slo9 << 20 | t1shi9 >>> 12)
    var t2shi6 = (t1shi9 << 20 | t1slo9 >>> 12)
    var t2slo22 = (t1shi14 << 7 | t1slo14 >>> 25)
    var t2shi22 = (t1slo14 << 7 | t1shi14 >>> 25)
    var t2slo13 = (t1slo19 << 8 | t1shi19 >>> 24)
    var t2shi13 = (t1shi19 << 8 | t1slo19 >>> 24)
    var t2slo4 = (t1slo24 << 14 | t1shi24 >>> 18)
    var t2shi4 = (t1shi24 << 14 | t1slo24 >>> 18)

    // chi
    s[0] = t2slo0 ^ (~t2slo1 & t2slo2)
    s[1] = t2shi0 ^ (~t2shi1 & t2shi2)
    s[10] = t2slo5 ^ (~t2slo6 & t2slo7)
    s[11] = t2shi5 ^ (~t2shi6 & t2shi7)
    s[20] = t2slo10 ^ (~t2slo11 & t2slo12)
    s[21] = t2shi10 ^ (~t2shi11 & t2shi12)
    s[30] = t2slo15 ^ (~t2slo16 & t2slo17)
    s[31] = t2shi15 ^ (~t2shi16 & t2shi17)
    s[40] = t2slo20 ^ (~t2slo21 & t2slo22)
    s[41] = t2shi20 ^ (~t2shi21 & t2shi22)
    s[2] = t2slo1 ^ (~t2slo2 & t2slo3)
    s[3] = t2shi1 ^ (~t2shi2 & t2shi3)
    s[12] = t2slo6 ^ (~t2slo7 & t2slo8)
    s[13] = t2shi6 ^ (~t2shi7 & t2shi8)
    s[22] = t2slo11 ^ (~t2slo12 & t2slo13)
    s[23] = t2shi11 ^ (~t2shi12 & t2shi13)
    s[32] = t2slo16 ^ (~t2slo17 & t2slo18)
    s[33] = t2shi16 ^ (~t2shi17 & t2shi18)
    s[42] = t2slo21 ^ (~t2slo22 & t2slo23)
    s[43] = t2shi21 ^ (~t2shi22 & t2shi23)
    s[4] = t2slo2 ^ (~t2slo3 & t2slo4)
    s[5] = t2shi2 ^ (~t2shi3 & t2shi4)
    s[14] = t2slo7 ^ (~t2slo8 & t2slo9)
    s[15] = t2shi7 ^ (~t2shi8 & t2shi9)
    s[24] = t2slo12 ^ (~t2slo13 & t2slo14)
    s[25] = t2shi12 ^ (~t2shi13 & t2shi14)
    s[34] = t2slo17 ^ (~t2slo18 & t2slo19)
    s[35] = t2shi17 ^ (~t2shi18 & t2shi19)
    s[44] = t2slo22 ^ (~t2slo23 & t2slo24)
    s[45] = t2shi22 ^ (~t2shi23 & t2shi24)
    s[6] = t2slo3 ^ (~t2slo4 & t2slo0)
    s[7] = t2shi3 ^ (~t2shi4 & t2shi0)
    s[16] = t2slo8 ^ (~t2slo9 & t2slo5)
    s[17] = t2shi8 ^ (~t2shi9 & t2shi5)
    s[26] = t2slo13 ^ (~t2slo14 & t2slo10)
    s[27] = t2shi13 ^ (~t2shi14 & t2shi10)
    s[36] = t2slo18 ^ (~t2slo19 & t2slo15)
    s[37] = t2shi18 ^ (~t2shi19 & t2shi15)
    s[46] = t2slo23 ^ (~t2slo24 & t2slo20)
    s[47] = t2shi23 ^ (~t2shi24 & t2shi20)
    s[8] = t2slo4 ^ (~t2slo0 & t2slo1)
    s[9] = t2shi4 ^ (~t2shi0 & t2shi1)
    s[18] = t2slo9 ^ (~t2slo5 & t2slo6)
    s[19] = t2shi9 ^ (~t2shi5 & t2shi6)
    s[28] = t2slo14 ^ (~t2slo10 & t2slo11)
    s[29] = t2shi14 ^ (~t2shi10 & t2shi11)
    s[38] = t2slo19 ^ (~t2slo15 & t2slo16)
    s[39] = t2shi19 ^ (~t2shi15 & t2shi16)
    s[48] = t2slo24 ^ (~t2slo20 & t2slo21)
    s[49] = t2shi24 ^ (~t2shi20 & t2shi21)

    // iota
    s[0] ^= P1600_ROUND_CONSTANTS[round * 2]
    s[1] ^= P1600_ROUND_CONSTANTS[round * 2 + 1]
  }
}


/***/ }),

/***/ 1778:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a2c61cc37cbb7920bc7dfccfe0573c6f.png";

/***/ }),

/***/ 1924:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_alt_react__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_alt_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_alt_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stores_gateway_ERC20GatewayStore__ = __webpack_require__(1771);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions_gateway_ERC20GatewayActions__ = __webpack_require__(1740);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_GlobalParams__ = __webpack_require__(1660);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_Validation__ = __webpack_require__(1659);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_Utils__ = __webpack_require__(1741);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__actions_WalletUnlockActions__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__actions_NotificationActions__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_qrcode_react__ = __webpack_require__(692);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_qrcode_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_qrcode_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_counterpart__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_counterpart___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_counterpart__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_stores_AccountStore__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Modal_BaseModal__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_seerjs_es__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Utility_FormattedAsset__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__Utility_ChainTypes__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__Utility_BindToChainState__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_common_MarketClasses__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_actions_AccountActions__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_react_foundation_apps_src_utils_foundation_api__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_react_foundation_apps_src_utils_foundation_api___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19_react_foundation_apps_src_utils_foundation_api__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


//import BaseComponent from "../BaseComponent";







//import TextLoading from "../Layout/TextLoading";


//import Modal from "../Layout/Modal"
//import Example from "../../assets/img/example.png"










var gatewaySuppots = ["erc20.transfer_in_title", "erc20.transfer_out_title", "bts.transfer_in_title", "bts.transfer_out_title", "erc20.transfer_opc_in_title", "erc20.transfer_opc_out_title"];

var network_fee_asset = ["1.3.0", "1.3.0", "1.3.0", "1.3.0", "1.3.1", "1.3.1"];

var gateway_account = ["1.2.9981", "1.2.9981", "1.2.9981", "1.2.9981", "1.2.12590", "1.2.12590"];

var ERC20Gateway = function (_React$Component) {
    _inherits(ERC20Gateway, _React$Component);

    function ERC20Gateway() {
        _classCallCheck(this, ERC20Gateway);

        var _this = _possibleConstructorReturn(this, (ERC20Gateway.__proto__ || Object.getPrototypeOf(ERC20Gateway)).call(this));

        _this.state = _this.__init();
        return _this;
    }

    _createClass(ERC20Gateway, [{
        key: "__init",
        value: function __init(account_id) {

            return {
                curInx: 0,
                modalIsShow: true,
                ethaddr: null,
                account: null,
                unit: '',
                from_name: null,
                to_name: "",
                amount: "",
                asset_id: null,
                asset: null,
                memo: "",
                error: null,
                network_fee_amount: 0,
                address: '',
                account_bts: ''
            };
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.changeUser(this.props.currentAccount);
        }
    }, {
        key: "changeUser",
        value: function changeUser(user) {
            if (user && __WEBPACK_IMPORTED_MODULE_11_stores_AccountStore__["a" /* default */].isMyAccount(user)) {
                var self = this;
                var id = user.get("id");
                console.log(this.state.ethaddr, "  ", this.state.account, "  ", id, "  ");
                __WEBPACK_IMPORTED_MODULE_3__actions_gateway_ERC20GatewayActions__["a" /* default */].getAddrByAccount({ seer_account_id: user.get("id") }).then(function (res) {
                    self.setState({
                        ethaddr: res, account: id
                    });
                });
            }
        }
    }, {
        key: "confirmTransfer",
        value: function confirmTransfer() {
            var _this2 = this;

            this.setState({ error: null });
            var _state = this.state,
                asset = _state.asset,
                amount = _state.amount,
                address = _state.address,
                account_bts = _state.account_bts,
                curInx = _state.curInx;

            if (curInx != 3 && (!address || address === '') || curInx == 3 && (!account_bts || account_bts == '')) {
                __WEBPACK_IMPORTED_MODULE_19_react_foundation_apps_src_utils_foundation_api___default.a.publish("seer-out", "open");
                return;
            }
            var sendAmount = new __WEBPACK_IMPORTED_MODULE_17_common_MarketClasses__["a" /* Asset */]({ real: amount, asset_id: this.state.asset_id, precision: 5 });
            var from = this.props.currentAccount.get("id");

            __WEBPACK_IMPORTED_MODULE_18_actions_AccountActions__["a" /* default */].transfer(from, gateway_account[this.state.curInx], sendAmount.getAmount(), this.state.asset_id, this.state.memo ? new Buffer(this.state.memo, "utf-8") : this.state.memo, null, "1.3.0").then(function () {}).catch(function (e) {
                var msg = e.message ? e.message.split("\n")[1] || e.message : null;
                console.log("error: ", e, msg);
                _this2.setState({ error: msg });
            });
        }
    }, {
        key: "initGatewaySettings",
        value: function initGatewaySettings(idx) {
            if (idx == this.state.curInx) {
                return;
            }

            this.setState({ amount: "", address: "", account_bts: "" });

            if (idx == 0) {
                this.setState({ curInx: idx });
                //this.setState({asset_id:"1.3.0",network_fee_amount:10,network_fee_asset:"1.3.0"});
            } else if (idx == 1) {
                this.setState({ curInx: idx, asset_id: "1.3.0", network_fee_amount: 25000000, memo: "erc20#", unit: "SEER" });
            } else if (idx == 2) {
                this.setState({ curInx: idx });
                //this.setState({asset_id:"1.3.0",network_fee_amount:10,network_fee_asset:"1.3.0"});
            } else if (idx == 3) {
                this.setState({ curInx: idx, asset_id: "1.3.0", network_fee_amount: 200000, memo: "bts#", unit: "SEER" });
            } else if (idx == 4) {
                this.setState({ curInx: idx });
            } else if (idx == 5) {
                this.setState({ curInx: idx, asset_id: "1.3.1", network_fee_amount: 5000000, memo: "erc20#", unit: "OPC" });
            }
        }
    }, {
        key: "handleChangeTab",
        value: function handleChangeTab(inx) {
            var indx = parseInt(inx.target.value);
            this.initGatewaySettings(indx);
        }
    }, {
        key: "closeQrcode",
        value: function closeQrcode() {
            this.setState({ modalIsShow: false });
            console.log(this.state.modalIsShow);
        }
    }, {
        key: "showQrcode",
        value: function showQrcode() {
            this.setState({ modalIsShow: true });
            console.log(this.state.modalIsShow);
        }
    }, {
        key: "seerErc20Bind",
        value: function seerErc20Bind() {

            var account_name = this.props.currentAccount.get("name");
            var account_id = this.props.currentAccount.get("id");
            var ethaddr = void 0;

            var self = this;
            __WEBPACK_IMPORTED_MODULE_3__actions_gateway_ERC20GatewayActions__["a" /* default */].bindAccount({
                seer_account_id: account_id,
                seer_account_name: account_name
            }).then(function (res) {
                self.setState({
                    ethaddr: res
                });
            });
        }
    }, {
        key: "handleAmountChange",
        value: function handleAmountChange(e) {
            var value = e.target.value;
            var balance = this.props.balance;

            this.setState({
                amount: value
            });
        }
    }, {
        key: "handleAddressChange",
        value: function handleAddressChange(e) {
            if (this.state.curInx == 1) {
                this.setState({ address: e.target.value, memo: "erc20#" + e.target.value });
            } else if (this.state.curInx == 3) {
                this.setState({ account_bts: e.target.value, memo: "bts#" + e.target.value });
            } else if (this.state.curInx == 5) {
                this.setState({ address: e.target.value, memo: "erc20#" + e.target.value });
            }
        }
    }, {
        key: "renderERC20SeerIn",
        value: function renderERC20SeerIn() {
            var from_error = null;
            var _state2 = this.state,
                propose = _state2.propose,
                from_account = _state2.from_account,
                to_account = _state2.to_account,
                asset = _state2.asset,
                asset_id = _state2.asset_id,
                propose_account = _state2.propose_account,
                feeAmount = _state2.feeAmount,
                amount = _state2.amount,
                error = _state2.error,
                to_name = _state2.to_name,
                from_name = _state2.from_name,
                memo = _state2.memo,
                feeAsset = _state2.feeAsset,
                fee_asset_id = _state2.fee_asset_id,
                balanceError = _state2.balanceError,
                ethaddr = _state2.ethaddr;
            var eth_address = this.props.eth_address;

            if (ethaddr == null || this.state.account != this.props.currentAccount.get("id")) {

                this.changeUser(this.props.currentAccount);
            }

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { "data-title": __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("erc20.transfer_in_title") },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "m-t-20 balance-whitespace" },
                    __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("erc20.note")
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "balance-whitespace-small" },
                    __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("erc20.current_account")
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "text", readOnly: true, className: "erc-btn text-center m-t-14", value: this.props.currentAccount.get("name") }),
                    " "
                ),
                " ",
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "balance-whitespace-small" },
                    __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("erc20.bind_eth")
                ),
                ethaddr == null || this.state.account != this.props.currentAccount.get("id") ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { onClick: this.seerErc20Bind.bind(this), type: "button",
                    className: "button", value: __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("erc20.btn_generate") }) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "span",
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "text", readOnly: true, className: "erc-btn text-center m-t-14", value: ethaddr }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "layer-modal", display: this.state.modalIsShow ? '' : 'none' },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            null,
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "h4",
                                null,
                                __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("erc20.qrcode")
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "dl",
                                null,
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "dt",
                                    null,
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "span",
                                        { className: "qrcode" },
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9_qrcode_react___default.a, { size: 136, value: ethaddr })
                                    )
                                )
                            )
                        )
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { className: "mini_code" })
            );
        }
    }, {
        key: "renderERC20SeerOut",
        value: function renderERC20SeerOut() {
            var _state3 = this.state,
                master = _state3.master,
                address = _state3.address,
                account_bts = _state3.account_bts,
                amount = _state3.amount,
                useCsaf = _state3.useCsaf;
            var _props = this.props,
                wallet = _props.wallet,
                ethaddr = _props.ethaddr,
                balance = _props.balance,
                loading = _props.loading,
                fees = _props.fees;


            var account_balances = this.props.currentAccount.get("balances").toJS();

            var account_balance = void 0;

            for (var key in account_balances) {
                if (key == this.state.asset_id) {
                    var balanceObject = __WEBPACK_IMPORTED_MODULE_13_seerjs_es__["b" /* ChainStore */].getObject(account_balances[key]);
                    account_balance = balanceObject.get("balance");
                    console.log(account_balance);
                    break;
                }
            }

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { "data-title": __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("erc20.transfer_out_title") },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "m-t-20" },
                    __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("erc20.transfer_out_note")
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    null,
                    __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("erc20.transfer_out_to")
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "text", placeholder: __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("erc20.placeholder_out_address"),
                    className: "input-500 m-t-14", value: this.state.address, onChange: this.handleAddressChange.bind(this) }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    null,
                    __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("erc20.transfer_out_amount")
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "text",
                    placeholder: __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("erc20.placeholder_out_amount", { unit: this.state.unit }),
                    className: "input-500 m-t-14",
                    value: amount,
                    onChange: this.handleAmountChange.bind(this) }),
                __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("erc20.useable"),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_14__Utility_FormattedAsset__["a" /* default */], { amount: account_balance, asset: this.state.asset_id }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "span",
                    null,
                    __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("erc20.fees")
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_14__Utility_FormattedAsset__["a" /* default */], { amount: this.state.network_fee_amount, asset: network_fee_asset[this.state.curInx] }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("erc20.confirm_note"),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_14__Utility_FormattedAsset__["a" /* default */], { amount: this.state.network_fee_amount, asset: network_fee_asset[this.state.curInx] }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                loading ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(TextLoading, null) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "button", value: __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("erc20.confirm_btn"), className: "button", onClick: this.confirmTransfer.bind(this) })
            );
        }
    }, {
        key: "renderBTSIn",
        value: function renderBTSIn() {
            var _state4 = this.state,
                master = _state4.master,
                address = _state4.address,
                account_bts = _state4.account_bts,
                amount = _state4.amount,
                useCsaf = _state4.useCsaf;
            var _props2 = this.props,
                wallet = _props2.wallet,
                ethaddr = _props2.ethaddr,
                balance = _props2.balance,
                loading = _props2.loading,
                fees = _props2.fees;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { "data-title": __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("bts.transfer_in_title") },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "m-t-20" },
                    __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("bts.note_info")
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    null,
                    __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("bts.note")
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { className: "balance-bisin-img", src: __webpack_require__(1778), alt: "" })
            );
        }
    }, {
        key: "renderBTSOut",
        value: function renderBTSOut() {
            var _state5 = this.state,
                master = _state5.master,
                address = _state5.address,
                account_bts = _state5.account_bts,
                amount = _state5.amount,
                useCsaf = _state5.useCsaf;
            var _props3 = this.props,
                wallet = _props3.wallet,
                ethaddr = _props3.ethaddr,
                balance = _props3.balance,
                loading = _props3.loading,
                fees = _props3.fees;


            var account_balances = this.props.currentAccount.get("balances").toJS();

            var account_balance = void 0;

            for (var key in account_balances) {
                if (key == this.state.asset_id) {
                    var balanceObject = __WEBPACK_IMPORTED_MODULE_13_seerjs_es__["b" /* ChainStore */].getObject(account_balances[key]);
                    account_balance = balanceObject.get("balance");
                    console.log(account_balance);
                    break;
                }
            }
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { "data-title": __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("bts.transfer_out_title") },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "m-t-20" },
                    __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("bts.transfer_out_note")
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    null,
                    __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("bts.transfer_out_to")
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "text", className: "input-500 m-t-14", placeholder: __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("bts.placeholder_out_address"), value: account_bts, onChange: this.handleAddressChange.bind(this) }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    null,
                    __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("bts.transfer_out_amount")
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "text",
                    placeholder: __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("bts.placeholder_out_amount", { unit: this.state.unit }),
                    className: "input-500 m-t-14",
                    value: amount,
                    onChange: this.handleAmountChange.bind(this) }),
                __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("bts.useable"),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_14__Utility_FormattedAsset__["a" /* default */], { amount: account_balance, asset: this.state.asset_id }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "span",
                    null,
                    __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("bts.fees")
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_14__Utility_FormattedAsset__["a" /* default */], { amount: this.state.network_fee_amount, asset: network_fee_asset[this.state.curInx] }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("bts.confirm_note"),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_14__Utility_FormattedAsset__["a" /* default */], { amount: this.state.network_fee_amount, asset: network_fee_asset[this.state.curInx] }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                loading ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(TextLoading, null) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "button", value: __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("bts.confirm_btn"), className: "button", onClick: this.confirmTransfer.bind(this) })
            );
        }
    }, {
        key: "renderERC20OPCIn",
        value: function renderERC20OPCIn() {
            var from_error = null;
            var _state6 = this.state,
                propose = _state6.propose,
                from_account = _state6.from_account,
                to_account = _state6.to_account,
                asset = _state6.asset,
                asset_id = _state6.asset_id,
                propose_account = _state6.propose_account,
                feeAmount = _state6.feeAmount,
                amount = _state6.amount,
                error = _state6.error,
                to_name = _state6.to_name,
                from_name = _state6.from_name,
                memo = _state6.memo,
                feeAsset = _state6.feeAsset,
                fee_asset_id = _state6.fee_asset_id,
                balanceError = _state6.balanceError,
                ethaddr = _state6.ethaddr;
            var eth_address = this.props.eth_address;

            if (ethaddr == null || this.state.account != this.props.currentAccount.get("id")) {
                this.changeUser(this.props.currentAccount);
            }

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { "data-title": __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("erc20.transfer_in_title") },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "m-t-20 balance-whitespace" },
                    __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("erc20.note_opc")
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "balance-whitespace-small" },
                    __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("erc20.current_account")
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "text", readOnly: true, className: "erc-btn text-center m-t-14", value: this.props.currentAccount.get("name") }),
                    " "
                ),
                " ",
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "balance-whitespace-small" },
                    __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("erc20.bind_eth")
                ),
                ethaddr == null || this.state.account != this.props.currentAccount.get("id") ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { onClick: this.seerErc20Bind.bind(this), type: "button",
                    className: "button", value: __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("erc20.btn_generate") }) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "span",
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "text", readOnly: true, className: "erc-btn text-center m-t-14", value: ethaddr }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "layer-modal", display: this.state.modalIsShow ? '' : 'none' },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            null,
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "h4",
                                null,
                                __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("erc20.qrcode")
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "dl",
                                null,
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "dt",
                                    null,
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "span",
                                        { className: "qrcode" },
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9_qrcode_react___default.a, { size: 136, value: ethaddr })
                                    )
                                )
                            )
                        )
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { className: "mini_code" })
            );
        }
    }, {
        key: "renderERC20OPCOut",
        value: function renderERC20OPCOut() {
            var _state7 = this.state,
                master = _state7.master,
                address = _state7.address,
                account_bts = _state7.account_bts,
                amount = _state7.amount,
                useCsaf = _state7.useCsaf;
            var _props4 = this.props,
                wallet = _props4.wallet,
                ethaddr = _props4.ethaddr,
                balance = _props4.balance,
                loading = _props4.loading,
                fees = _props4.fees;


            var account_balances = this.props.currentAccount.get("balances").toJS();

            var account_balance = void 0;

            for (var key in account_balances) {
                if (key == this.state.asset_id) {
                    var balanceObject = __WEBPACK_IMPORTED_MODULE_13_seerjs_es__["b" /* ChainStore */].getObject(account_balances[key]);
                    account_balance = balanceObject.get("balance");
                    console.log(account_balance);
                    break;
                }
            }

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { "data-title": __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("erc20.transfer_out_title") },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "m-t-20" },
                    __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("erc20.transfer_out_note")
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    null,
                    __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("erc20.transfer_out_to")
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "text", placeholder: __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("erc20.placeholder_out_address"),
                    className: "input-500 m-t-14", value: this.state.address, onChange: this.handleAddressChange.bind(this) }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    null,
                    __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("erc20.transfer_out_amount")
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "text",
                    placeholder: __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("erc20.placeholder_out_amount", { unit: this.state.unit }),
                    className: "input-500 m-t-14",
                    value: amount,
                    onChange: this.handleAmountChange.bind(this) }),
                __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("erc20.useable"),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_14__Utility_FormattedAsset__["a" /* default */], { amount: account_balance, asset: this.state.asset_id }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "span",
                    null,
                    __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("erc20.fees")
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_14__Utility_FormattedAsset__["a" /* default */], { amount: this.state.network_fee_amount, asset: network_fee_asset[this.state.curInx] }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("erc20.confirm_note"),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_14__Utility_FormattedAsset__["a" /* default */], { amount: this.state.network_fee_amount, asset: network_fee_asset[this.state.curInx] }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                loading ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(TextLoading, null) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "button", value: __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("erc20.confirm_btn"), className: "button", onClick: this.confirmTransfer.bind(this) })
            );
        }
    }, {
        key: "render",
        value: function render() {
            if (!this.props.currentAccount) {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "balance-body" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "h3",
                        null,
                        __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("erc20.title")
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        null,
                        __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("account.errors.unknown")
                    )
                );
            }
            if (!__WEBPACK_IMPORTED_MODULE_11_stores_AccountStore__["a" /* default */].isMyAccount(this.props.currentAccount)) {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "balance-body" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "h3",
                        null,
                        __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("erc20.title")
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", null),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        null,
                        this.props.currentAccount.get("name"),
                        __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("account.errors.not_yours")
                    )
                );
            }

            var detail = void 0;
            if (this.state.curInx == 0) {
                detail = this.renderERC20SeerIn();
            } else if (this.state.curInx == 1) {
                detail = this.renderERC20SeerOut();
            } else if (this.state.curInx == 2) {
                detail = this.renderBTSIn();
            } else if (this.state.curInx == 3) {
                detail = this.renderBTSOut();
            } else if (this.state.curInx == 4) {
                detail = this.renderERC20OPCIn();
            } else if (this.state.curInx == 5) {
                detail = this.renderERC20OPCOut();
            }

            var type_options = [];

            gatewaySuppots.forEach(function (item, index) {
                type_options.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "option",
                    { key: index, value: index },
                    __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate(item)
                ));
            });

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "balance-body" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_12__Modal_BaseModal__["a" /* default */],
                    {
                        id: "seer-out",
                        overlay: true
                    },
                    __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("erc20.to_require")
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "h3",
                    null,
                    __WEBPACK_IMPORTED_MODULE_10_counterpart___default.a.translate("erc20.title")
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "select",
                    { className: "balance-select", value: this.state.curInx, onChange: this.handleChangeTab.bind(this) },
                    type_options
                ),
                detail
            );
        }
    }]);

    return ERC20Gateway;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

ERC20Gateway.propTypes = {
    currentAccount: __WEBPACK_IMPORTED_MODULE_15__Utility_ChainTypes__["a" /* default */].ChainAccount
};
ERC20Gateway.defaultProps = {};


ERC20Gateway = Object(__WEBPACK_IMPORTED_MODULE_16__Utility_BindToChainState__["a" /* default */])(ERC20Gateway);
// check if is there any other store
/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_1_alt_react__["connect"])(ERC20Gateway, {
    listenTo: function listenTo() {
        return [__WEBPACK_IMPORTED_MODULE_11_stores_AccountStore__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__stores_gateway_ERC20GatewayStore__["a" /* default */]];
    },
    getProps: function getProps() {
        var result = {};
        result["currentAccount"] = __WEBPACK_IMPORTED_MODULE_11_stores_AccountStore__["a" /* default */].getState().currentAccount;

        for (var props in __WEBPACK_IMPORTED_MODULE_2__stores_gateway_ERC20GatewayStore__["a" /* default */].getState()) {
            result[props] = __WEBPACK_IMPORTED_MODULE_2__stores_gateway_ERC20GatewayStore__["a" /* default */].getState()[props];
        }
        return result;
    }
}));
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(4).Buffer))

/***/ })

});
//# sourceMappingURL=16.js.map