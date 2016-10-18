(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //------------------------------------------------------------------------------
// Name: src/API.js
// Author: rand0me <not.randome@gmail.com>
// Timestamp: 2016-10-05T13:13:48.560Z
// Description:
//    InHabit API wrapper
//------------------------------------------------------------------------------

var _postmessageClient = require('postmessage-client');

var _postmessageClient2 = _interopRequireDefault(_postmessageClient);

var _Analytics = require('./lib/Analytics');

var _Analytics2 = _interopRequireDefault(_Analytics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InhabitAPI = function () {
  function InhabitAPI() {
    _classCallCheck(this, InhabitAPI);

    this.client = new _postmessageClient2.default();
    this.analytics = new _Analytics2.default(this.client);
  }

  _createClass(InhabitAPI, [{
    key: 'getAnalytics',
    value: function getAnalytics() {
      return this.analytics;
    }
  }]);

  return InhabitAPI;
}();

exports.default = InhabitAPI;


InhabitAPI.create = function (moduleConfiguration) {
  var api = new InhabitAPI();
  api.analytics.info = moduleConfiguration;

  return api;
};
module.exports = exports['default'];
},{"./lib/Analytics":2,"postmessage-client":5}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//------------------------------------------------------------------------------
// Name: src/lib/Analytics.js
// Author: rand0me <not.randome@gmail.com>
// Timestamp: 2016-10-05T13:29:32.000Z
// Description:
//    Analytics
//------------------------------------------------------------------------------

var PREFIX = 'inhabit:module:';

var Analytics = function () {
  function Analytics(client) {
    _classCallCheck(this, Analytics);

    this.client = client;
    this.info = {};
  }

  _createClass(Analytics, [{
    key: 'start',
    value: function start() {
      return this.client.get(PREFIX + 'start', this.info);
    }
  }, {
    key: 'end',
    value: function end() {
      return this.client.get(PREFIX + 'end', this.info);
    }
  }, {
    key: 'interaction',
    value: function interaction() {
      return this.client.get(PREFIX + 'interaction', this.info);
    }
  }, {
    key: 'error',
    value: function error() {
      return this.client.get(PREFIX + 'interaction', this.info);
    }
  }]);

  return Analytics;
}();

exports.default = Analytics;
module.exports = exports['default'];
},{}],3:[function(require,module,exports){
'use strict';

var _InhabitAPI = require('../InhabitAPI');

var _InhabitAPI2 = _interopRequireDefault(_InhabitAPI);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Export class to global namespace
window.InhabitAPI = window.InhabitAPI || _InhabitAPI2.default; //------------------------------------------------------------------------------
// Name: src/Globals.js
// Author: rand0me <not.randome@gmail.com>
// Timestamp: 2016-10-06T08:45:16.936Z
// Description:
//    @description@
//------------------------------------------------------------------------------
},{"../InhabitAPI":1}],4:[function(require,module,exports){
(function (global){
/*! Native Promise Only
    v0.8.1 (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/

(function UMD(name,context,definition){
	// special form of UMD for polyfilling across evironments
	context[name] = context[name] || definition();
	if (typeof module != "undefined" && module.exports) { module.exports = context[name]; }
	else if (typeof define == "function" && define.amd) { define(function $AMD$(){ return context[name]; }); }
})("Promise",typeof global != "undefined" ? global : this,function DEF(){
	/*jshint validthis:true */
	"use strict";

	var builtInProp, cycle, scheduling_queue,
		ToString = Object.prototype.toString,
		timer = (typeof setImmediate != "undefined") ?
			function timer(fn) { return setImmediate(fn); } :
			setTimeout
	;

	// dammit, IE8.
	try {
		Object.defineProperty({},"x",{});
		builtInProp = function builtInProp(obj,name,val,config) {
			return Object.defineProperty(obj,name,{
				value: val,
				writable: true,
				configurable: config !== false
			});
		};
	}
	catch (err) {
		builtInProp = function builtInProp(obj,name,val) {
			obj[name] = val;
			return obj;
		};
	}

	// Note: using a queue instead of array for efficiency
	scheduling_queue = (function Queue() {
		var first, last, item;

		function Item(fn,self) {
			this.fn = fn;
			this.self = self;
			this.next = void 0;
		}

		return {
			add: function add(fn,self) {
				item = new Item(fn,self);
				if (last) {
					last.next = item;
				}
				else {
					first = item;
				}
				last = item;
				item = void 0;
			},
			drain: function drain() {
				var f = first;
				first = last = cycle = void 0;

				while (f) {
					f.fn.call(f.self);
					f = f.next;
				}
			}
		};
	})();

	function schedule(fn,self) {
		scheduling_queue.add(fn,self);
		if (!cycle) {
			cycle = timer(scheduling_queue.drain);
		}
	}

	// promise duck typing
	function isThenable(o) {
		var _then, o_type = typeof o;

		if (o != null &&
			(
				o_type == "object" || o_type == "function"
			)
		) {
			_then = o.then;
		}
		return typeof _then == "function" ? _then : false;
	}

	function notify() {
		for (var i=0; i<this.chain.length; i++) {
			notifyIsolated(
				this,
				(this.state === 1) ? this.chain[i].success : this.chain[i].failure,
				this.chain[i]
			);
		}
		this.chain.length = 0;
	}

	// NOTE: This is a separate function to isolate
	// the `try..catch` so that other code can be
	// optimized better
	function notifyIsolated(self,cb,chain) {
		var ret, _then;
		try {
			if (cb === false) {
				chain.reject(self.msg);
			}
			else {
				if (cb === true) {
					ret = self.msg;
				}
				else {
					ret = cb.call(void 0,self.msg);
				}

				if (ret === chain.promise) {
					chain.reject(TypeError("Promise-chain cycle"));
				}
				else if (_then = isThenable(ret)) {
					_then.call(ret,chain.resolve,chain.reject);
				}
				else {
					chain.resolve(ret);
				}
			}
		}
		catch (err) {
			chain.reject(err);
		}
	}

	function resolve(msg) {
		var _then, self = this;

		// already triggered?
		if (self.triggered) { return; }

		self.triggered = true;

		// unwrap
		if (self.def) {
			self = self.def;
		}

		try {
			if (_then = isThenable(msg)) {
				schedule(function(){
					var def_wrapper = new MakeDefWrapper(self);
					try {
						_then.call(msg,
							function $resolve$(){ resolve.apply(def_wrapper,arguments); },
							function $reject$(){ reject.apply(def_wrapper,arguments); }
						);
					}
					catch (err) {
						reject.call(def_wrapper,err);
					}
				})
			}
			else {
				self.msg = msg;
				self.state = 1;
				if (self.chain.length > 0) {
					schedule(notify,self);
				}
			}
		}
		catch (err) {
			reject.call(new MakeDefWrapper(self),err);
		}
	}

	function reject(msg) {
		var self = this;

		// already triggered?
		if (self.triggered) { return; }

		self.triggered = true;

		// unwrap
		if (self.def) {
			self = self.def;
		}

		self.msg = msg;
		self.state = 2;
		if (self.chain.length > 0) {
			schedule(notify,self);
		}
	}

	function iteratePromises(Constructor,arr,resolver,rejecter) {
		for (var idx=0; idx<arr.length; idx++) {
			(function IIFE(idx){
				Constructor.resolve(arr[idx])
				.then(
					function $resolver$(msg){
						resolver(idx,msg);
					},
					rejecter
				);
			})(idx);
		}
	}

	function MakeDefWrapper(self) {
		this.def = self;
		this.triggered = false;
	}

	function MakeDef(self) {
		this.promise = self;
		this.state = 0;
		this.triggered = false;
		this.chain = [];
		this.msg = void 0;
	}

	function Promise(executor) {
		if (typeof executor != "function") {
			throw TypeError("Not a function");
		}

		if (this.__NPO__ !== 0) {
			throw TypeError("Not a promise");
		}

		// instance shadowing the inherited "brand"
		// to signal an already "initialized" promise
		this.__NPO__ = 1;

		var def = new MakeDef(this);

		this["then"] = function then(success,failure) {
			var o = {
				success: typeof success == "function" ? success : true,
				failure: typeof failure == "function" ? failure : false
			};
			// Note: `then(..)` itself can be borrowed to be used against
			// a different promise constructor for making the chained promise,
			// by substituting a different `this` binding.
			o.promise = new this.constructor(function extractChain(resolve,reject) {
				if (typeof resolve != "function" || typeof reject != "function") {
					throw TypeError("Not a function");
				}

				o.resolve = resolve;
				o.reject = reject;
			});
			def.chain.push(o);

			if (def.state !== 0) {
				schedule(notify,def);
			}

			return o.promise;
		};
		this["catch"] = function $catch$(failure) {
			return this.then(void 0,failure);
		};

		try {
			executor.call(
				void 0,
				function publicResolve(msg){
					resolve.call(def,msg);
				},
				function publicReject(msg) {
					reject.call(def,msg);
				}
			);
		}
		catch (err) {
			reject.call(def,err);
		}
	}

	var PromisePrototype = builtInProp({},"constructor",Promise,
		/*configurable=*/false
	);

	// Note: Android 4 cannot use `Object.defineProperty(..)` here
	Promise.prototype = PromisePrototype;

	// built-in "brand" to signal an "uninitialized" promise
	builtInProp(PromisePrototype,"__NPO__",0,
		/*configurable=*/false
	);

	builtInProp(Promise,"resolve",function Promise$resolve(msg) {
		var Constructor = this;

		// spec mandated checks
		// note: best "isPromise" check that's practical for now
		if (msg && typeof msg == "object" && msg.__NPO__ === 1) {
			return msg;
		}

		return new Constructor(function executor(resolve,reject){
			if (typeof resolve != "function" || typeof reject != "function") {
				throw TypeError("Not a function");
			}

			resolve(msg);
		});
	});

	builtInProp(Promise,"reject",function Promise$reject(msg) {
		return new this(function executor(resolve,reject){
			if (typeof resolve != "function" || typeof reject != "function") {
				throw TypeError("Not a function");
			}

			reject(msg);
		});
	});

	builtInProp(Promise,"all",function Promise$all(arr) {
		var Constructor = this;

		// spec mandated checks
		if (ToString.call(arr) != "[object Array]") {
			return Constructor.reject(TypeError("Not an array"));
		}
		if (arr.length === 0) {
			return Constructor.resolve([]);
		}

		return new Constructor(function executor(resolve,reject){
			if (typeof resolve != "function" || typeof reject != "function") {
				throw TypeError("Not a function");
			}

			var len = arr.length, msgs = Array(len), count = 0;

			iteratePromises(Constructor,arr,function resolver(idx,msg) {
				msgs[idx] = msg;
				if (++count === len) {
					resolve(msgs);
				}
			},reject);
		});
	});

	builtInProp(Promise,"race",function Promise$race(arr) {
		var Constructor = this;

		// spec mandated checks
		if (ToString.call(arr) != "[object Array]") {
			return Constructor.reject(TypeError("Not an array"));
		}

		return new Constructor(function executor(resolve,reject){
			if (typeof resolve != "function" || typeof reject != "function") {
				throw TypeError("Not a function");
			}

			iteratePromises(Constructor,arr,function resolver(idx,msg){
				resolve(msg);
			},reject);
		});
	});

	return Promise;
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Client = require('./lib/Client');

var _Client2 = _interopRequireDefault(_Client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Client2.default;
module.exports = exports['default'];
},{"./lib/Client":6}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('native-promise-only');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * postMessage Client
 */
var Client = function () {
    function Client() {
        _classCallCheck(this, Client);

        this.listeners = {};
        this.promises = {};
    }

    /**
     * Instantiate a connection to remote window object
     * @param thisWindow {object} a current window, which will be listened for response
     * @param remoteWindow {object}
     */


    _createClass(Client, [{
        key: 'connect',
        value: function connect(thisWindow, remoteWindow) {
            var _this = this;

            this.disconnect();

            if (!thisWindow || !thisWindow.addEventListener) {
                throw new TypeError('thisWindow must have "addEventListener" method');
            }

            if (!remoteWindow || !remoteWindow.postMessage) {
                throw new TypeError('remoteWindow must have "postMessage" method');
            }

            this.window = thisWindow;
            this.remoteWindow = remoteWindow;

            this.window.addEventListener('message', this.boundListener = function (data) {
                return _this.listener(data);
            });

            return this;
        }

        /**
         * "Close" a connection to other window
         * This method removes EventListeners from current window
         */

    }, {
        key: 'disconnect',
        value: function disconnect() {
            if (this.window) {
                this.window.removeEventListener('message', this.boundListener);
            }

            this.window = null;
            this.remoteWindow = null;
        }

        /**
         * Request a "server" with path and optional data object
         * @param path {string}
         * @param [data] {object}
         * @returns {Promise}
         */

    }, {
        key: 'get',
        value: function get(path, data) {
            var _this2 = this;

            if (!this.promises[path]) {
                return this.promises[path] = new Promise(function (resolve, reject) {
                    _this2.listeners[path] = { resolve: resolve, reject: reject };
                    data = data || {};
                    data.path = path;
                    _this2.remoteWindow.postMessage(JSON.stringify(data), '*');
                });
            }

            return this.promises[path];
        }

        /**
         * Listener
         * @param e {Event}
         * @private
         */

    }, {
        key: 'listener',
        value: function listener(e) {
            var data = JSON.parse(e.data);

            // Ignore messages without path
            if (!data.path || data.type !== 'RESPONSE') {
                return;
            }

            // Ignore messages, we aren't subscribe
            if (!this.listeners[data.path]) {
                return;
            }

            if (data.error) {
                this.listeners[data.path].reject(data);
            } else {
                this.listeners[data.path].resolve(data);
            }
        }
    }]);

    return Client;
}();

exports.default = Client;
module.exports = exports['default'];
},{"native-promise-only":4}]},{},[3])
//# sourceMappingURL=InhabitAPI.bower.js.map
