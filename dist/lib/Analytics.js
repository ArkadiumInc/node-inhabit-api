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