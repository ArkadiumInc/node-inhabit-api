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