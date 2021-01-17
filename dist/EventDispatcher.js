"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Subscriber = _interopRequireDefault(require("./Subscriber"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EventDispatcher = /*#__PURE__*/function () {
  function EventDispatcher() {
    _classCallCheck(this, EventDispatcher);

    this.subscribers = [];
  }

  _createClass(EventDispatcher, [{
    key: "addSubscriber",
    value: function addSubscriber(subscriber) {
      if (subscriber instanceof _Subscriber.default === false) {
        throw new Error('Argument must be type of Subscriber');
      }

      this.subscribers.push(subscriber);
    }
  }, {
    key: "dispatch",
    value: function dispatch(event) {
      for (var key in this.subscribers) {
        if (this.subscribers[key].has(event)) {
          this.subscribers[key].call(event);
        }
      }
    }
  }, {
    key: "getSubscribers",
    value: function getSubscribers() {
      return this.subscribers;
    }
  }]);

  return EventDispatcher;
}();

exports.default = EventDispatcher;