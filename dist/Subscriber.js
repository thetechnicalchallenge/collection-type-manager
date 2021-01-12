"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Subscriber = /*#__PURE__*/function () {
  function Subscriber() {
    _classCallCheck(this, Subscriber);

    this.subscriptions = [];
    this.eventTags = ['mount', 'before.add.widget', 'after.add.widget', 'after.remove.widget', 'before.remove.widget'];
  }

  _createClass(Subscriber, [{
    key: "subscribe",
    value: function subscribe(event, action) {
      if (!(action instanceof Function)) {
        throw new Error('Second argument must be a function');
      }

      if (event instanceof Array) {
        for (var i = 0; i < event.length; i++) {
          this.subscribe(event[i], action);
        }

        return;
      }

      this.checkIfEventTagAvailable(event);

      if (this.subscriptions[event] === undefined) {
        this.subscriptions[event] = [];
      }

      this.subscriptions[event].push(action);
    }
  }, {
    key: "has",
    value: function has(event) {
      return this.subscriptions[event] !== undefined;
    }
  }, {
    key: "call",
    value: function call(event) {
      this.checkIfEventTagAvailable(event);

      if (!this.has(event)) {
        throw new Error("Event ".concat(event, " has no subscription"));
      }

      this.subscriptions[event].forEach(function (callback) {
        try {
          callback();
        } catch (e) {
          throw new Error(e);
        }
      });
    }
  }, {
    key: "checkIfEventTagAvailable",
    value: function checkIfEventTagAvailable(event) {
      if (!this.eventTags.includes(event)) {
        throw new Error("Event ".concat(event, " is not available"));
      }
    }
  }, {
    key: "getSubscriptions",
    value: function getSubscriptions() {
      return this.subscriptions;
    }
  }, {
    key: "getEventTags",
    value: function getEventTags() {
      return this.eventTags;
    }
  }]);

  return Subscriber;
}();

exports.default = Subscriber;