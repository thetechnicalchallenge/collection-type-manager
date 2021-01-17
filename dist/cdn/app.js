(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app"],{

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_CollectionTypeManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/CollectionTypeManager */ "./src/CollectionTypeManager.js");
/* harmony import */ var _src_Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/Subscriber */ "./src/Subscriber.js");



/***/ }),

/***/ "./src/CollectionTypeManager.js":
/*!**************************************!*\
  !*** ./src/CollectionTypeManager.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CollectionTypeManager; });
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.from.js */ "./node_modules/core-js/modules/es.array.from.js");
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var sortablejs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! sortablejs */ "./node_modules/sortablejs/modular/sortable.esm.js");
/* harmony import */ var _EventDispatcher__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./EventDispatcher */ "./src/EventDispatcher.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Subscriber */ "./src/Subscriber.js");
/* harmony import */ var _SortableEventAdapter__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./SortableEventAdapter */ "./src/SortableEventAdapter.js");








function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @author thetechnicalchallenge@gmail.com
 */





var CollectionTypeManager = /*#__PURE__*/function () {
  function CollectionTypeManager() {
    var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      containerId: '',
      addButtonId: '',
      removeButtonsClassName: '',
      subscriber: null,
      enableSortable: false,
      sortableConfig: null
    };

    _classCallCheck(this, CollectionTypeManager);

    this.settings = settings;
    this.eventDispatcher = new _EventDispatcher__WEBPACK_IMPORTED_MODULE_8__["default"]();
    this.eventDispatcher.addSubscriber(this.configureInternalSubscriber());

    if (typeof settings.subscriber === 'function') {
      this.eventDispatcher.addSubscriber(settings.subscriber());
    }

    this.container = document.getElementById(settings.containerId);
    this.widgetPrototype = this.container.dataset.prototype;
    this.counter = this.container.dataset.counter;
    this.fields = [];
    this.lastWidgetAdded = null;
    this.bindListeners(document.getElementById(settings.addButtonId), Array.from(document.getElementsByClassName(settings.removeButtonsClassName)));

    if (settings.enableSortable) {
      var config = new _SortableEventAdapter__WEBPACK_IMPORTED_MODULE_10__["default"]().adapt(this, settings.sortableConfig);
      this.sortable = sortablejs__WEBPACK_IMPORTED_MODULE_7__["default"].create(this.container, config);
    }

    this.eventDispatcher.dispatch('mount');
  }

  _createClass(CollectionTypeManager, [{
    key: "configureInternalSubscriber",
    value: function configureInternalSubscriber() {
      var internalSubscriber = new _Subscriber__WEBPACK_IMPORTED_MODULE_9__["default"]();
      internalSubscriber.subscribe(['mount', 'after.add.widget', 'after.remove.widget'], this.sortFieldNames.bind(this));
      return internalSubscriber;
    }
  }, {
    key: "bindListeners",
    value: function bindListeners(addButton, removeButtons) {
      var _this = this;

      addButton.addEventListener('click', this.addElement.bind(this));
      removeButtons.forEach(function (removeButton) {
        removeButton.addEventListener('click', _this.removeElement.bind(_this, removeButton));
      });
    }
  }, {
    key: "addElement",
    value: function addElement() {
      this.eventDispatcher.dispatch('before.add.widget');
      var widgetContainer = document.createElement('div');
      widgetContainer.innerHTML = this.widgetPrototype.replace(/__name__/g, this.counter);
      var removeButton = widgetContainer.children[0].getElementsByClassName(this.settings.removeButtonsClassName)[0];
      removeButton.addEventListener('click', this.removeElement.bind(this, removeButton));
      this.lastWidgetAdded = widgetContainer.children[0];
      this.container.appendChild(widgetContainer.children[0]);
      this.counter++;
      this.eventDispatcher.dispatch('after.add.widget');
    }
  }, {
    key: "removeElement",
    value: function removeElement(removeButton) {
      this.eventDispatcher.dispatch('before.remove.widget');
      var targetElement = document.getElementById(removeButton.dataset.target);
      removeButton.removeEventListener('click', this.removeElement.bind(this, removeButton));
      this.container.removeChild(targetElement);
      this.eventDispatcher.dispatch('after.remove.widget');
    }
  }, {
    key: "getLastWidgetAdded",
    value: function getLastWidgetAdded() {
      return this.lastWidgetAdded;
    }
  }, {
    key: "getFields",
    value: function getFields() {
      return this.fields;
    }
  }, {
    key: "sortFieldNames",
    value: function sortFieldNames() {
      var _this2 = this;

      this.fields = [];
      var collectionItems = Array.from(this.container.children);
      collectionItems.forEach(function (item, indexA) {
        var fields = Array.from(item.querySelectorAll('select, textarea, input'));
        fields.forEach(function (child) {
          child.name = child.name.replace(/\[(\d+)\]/g, "[".concat(indexA, "]"));

          _this2.fields.push(child);
        });
      });
    }
  }, {
    key: "getContainer",
    value: function getContainer() {
      return this.container;
    }
  }, {
    key: "getSortable",
    value: function getSortable() {
      if (!this.settings.enableSortable) {
        throw new Error('You must set "enableSortable" to true for using this feature.');
      }

      return this.sortable;
    }
  }]);

  return CollectionTypeManager;
}();



/***/ }),

/***/ "./src/EventDispatcher.js":
/*!********************************!*\
  !*** ./src/EventDispatcher.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventDispatcher; });
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Subscriber */ "./src/Subscriber.js");
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
      if (subscriber instanceof _Subscriber__WEBPACK_IMPORTED_MODULE_0__["default"] === false) {
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



/***/ }),

/***/ "./src/SortableEventAdapter.js":
/*!*************************************!*\
  !*** ./src/SortableEventAdapter.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SortableEventAdapter; });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SortableEventAdapter = /*#__PURE__*/function () {
  function SortableEventAdapter() {
    _classCallCheck(this, SortableEventAdapter);

    this.events = ['onEnd'];
  }

  _createClass(SortableEventAdapter, [{
    key: "adapt",
    value: function adapt(collectionTypeManager, sortableConfig) {
      var config = sortableConfig === undefined ? {} : _objectSpread({}, sortableConfig);

      config.onEnd = function (evt) {
        collectionTypeManager.sortFieldNames();

        if (sortableConfig !== undefined && Object.prototype.hasOwnProperty.call(sortableConfig, 'onEnd')) {
          sortableConfig.onEnd(evt);
        }
      };

      return config;
    }
  }]);

  return SortableEventAdapter;
}();



/***/ }),

/***/ "./src/Subscriber.js":
/*!***************************!*\
  !*** ./src/Subscriber.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Subscriber; });
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.includes.js */ "./node_modules/core-js/modules/es.array.includes.js");
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.string.includes.js */ "./node_modules/core-js/modules/es.string.includes.js");
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_3__);





function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Subscriber = /*#__PURE__*/function () {
  function Subscriber() {
    _classCallCheck(this, Subscriber);

    this.subscriptions = [];
    this.eventTags = ['mount', 'before.add.widget', 'after.add.widget', 'before.remove.widget', 'after.remove.widget'];
  }

  _createClass(Subscriber, [{
    key: "subscribe",
    value: function subscribe(event, action) {
      if (typeof action !== 'function') {
        throw new Error('Second argument must be a function');
      }

      if (Array.isArray(event)) {
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



/***/ })

},[["./app.js","runtime","vendors~app"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NvbGxlY3Rpb25UeXBlTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRXZlbnREaXNwYXRjaGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9Tb3J0YWJsZUV2ZW50QWRhcHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvU3Vic2NyaWJlci5qcyJdLCJuYW1lcyI6WyJDb2xsZWN0aW9uVHlwZU1hbmFnZXIiLCJzZXR0aW5ncyIsImNvbnRhaW5lcklkIiwiYWRkQnV0dG9uSWQiLCJyZW1vdmVCdXR0b25zQ2xhc3NOYW1lIiwic3Vic2NyaWJlciIsImVuYWJsZVNvcnRhYmxlIiwic29ydGFibGVDb25maWciLCJldmVudERpc3BhdGNoZXIiLCJFdmVudERpc3BhdGNoZXIiLCJhZGRTdWJzY3JpYmVyIiwiY29uZmlndXJlSW50ZXJuYWxTdWJzY3JpYmVyIiwiY29udGFpbmVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIndpZGdldFByb3RvdHlwZSIsImRhdGFzZXQiLCJwcm90b3R5cGUiLCJjb3VudGVyIiwiZmllbGRzIiwibGFzdFdpZGdldEFkZGVkIiwiYmluZExpc3RlbmVycyIsIkFycmF5IiwiZnJvbSIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJjb25maWciLCJTb3J0YWJsZUV2ZW50QWRhcHRlciIsImFkYXB0Iiwic29ydGFibGUiLCJTb3J0YWJsZSIsImNyZWF0ZSIsImRpc3BhdGNoIiwiaW50ZXJuYWxTdWJzY3JpYmVyIiwiU3Vic2NyaWJlciIsInN1YnNjcmliZSIsInNvcnRGaWVsZE5hbWVzIiwiYmluZCIsImFkZEJ1dHRvbiIsInJlbW92ZUJ1dHRvbnMiLCJhZGRFdmVudExpc3RlbmVyIiwiYWRkRWxlbWVudCIsImZvckVhY2giLCJyZW1vdmVCdXR0b24iLCJyZW1vdmVFbGVtZW50Iiwid2lkZ2V0Q29udGFpbmVyIiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsInJlcGxhY2UiLCJjaGlsZHJlbiIsImFwcGVuZENoaWxkIiwidGFyZ2V0RWxlbWVudCIsInRhcmdldCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW1vdmVDaGlsZCIsImNvbGxlY3Rpb25JdGVtcyIsIml0ZW0iLCJpbmRleEEiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY2hpbGQiLCJuYW1lIiwicHVzaCIsIkVycm9yIiwic3Vic2NyaWJlcnMiLCJldmVudCIsImtleSIsImhhcyIsImNhbGwiLCJldmVudHMiLCJjb2xsZWN0aW9uVHlwZU1hbmFnZXIiLCJ1bmRlZmluZWQiLCJvbkVuZCIsImV2dCIsIk9iamVjdCIsImhhc093blByb3BlcnR5Iiwic3Vic2NyaXB0aW9ucyIsImV2ZW50VGFncyIsImFjdGlvbiIsImlzQXJyYXkiLCJpIiwibGVuZ3RoIiwiY2hlY2tJZkV2ZW50VGFnQXZhaWxhYmxlIiwiY2FsbGJhY2siLCJlIiwiaW5jbHVkZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7SUFFcUJBLHFCO0FBQ25CLG1DQU9HO0FBQUEsUUFQVUMsUUFPVix1RUFQcUI7QUFDdEJDLGlCQUFXLEVBQUUsRUFEUztBQUV0QkMsaUJBQVcsRUFBRSxFQUZTO0FBR3RCQyw0QkFBc0IsRUFBRSxFQUhGO0FBSXRCQyxnQkFBVSxFQUFFLElBSlU7QUFLdEJDLG9CQUFjLEVBQUUsS0FMTTtBQU10QkMsb0JBQWMsRUFBRTtBQU5NLEtBT3JCOztBQUFBOztBQUNELFNBQUtOLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsU0FBS08sZUFBTCxHQUF1QixJQUFJQyx3REFBSixFQUF2QjtBQUNBLFNBQUtELGVBQUwsQ0FBcUJFLGFBQXJCLENBQW1DLEtBQUtDLDJCQUFMLEVBQW5DOztBQUVBLFFBQUksT0FBT1YsUUFBUSxDQUFDSSxVQUFoQixL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TUFBL0I7QUFDRDs7O3dCQUVJYixLLEVBQU87QUFDVixhQUFPLEtBQUtXLGFBQUwsQ0FBbUJYLEtBQW5CLE1BQThCTSxTQUFyQztBQUNEOzs7eUJBRUtOLEssRUFBTztBQUNYLFdBQUtpQix3QkFBTCxDQUE4QmpCLEtBQTlCOztBQUVBLFVBQUksQ0FBQyxLQUFLRSxHQUFMLENBQVNGLEtBQVQsQ0FBTCxFQUFzQjtBQUNwQixjQUFNLElBQUlGLEtBQUosaUJBQW1CRSxLQUFuQiwwQkFBTjtBQUNEOztBQUVELFdBQUtXLGFBQUwsQ0FBbUJYLEtBQW5CLEVBQTBCdEIsT0FBMUIsQ0FBa0MsVUFBQXdDLFFBQVEsRUFBSTtBQUM1QyxZQUFJO0FBQ0ZBLGtCQUFRO0FBQ1QsU0FGRCxDQUVFLE9BQU9DLENBQVAsRUFBVTtBQUNWLGdCQUFNLElBQUlyQixLQUFKLENBQVVxQixDQUFWLENBQU47QUFDRDtBQUNGLE9BTkQ7QUFPRDs7OzZDQUV5Qm5CLEssRUFBTztBQUMvQixVQUFJLENBQUMsS0FBS1ksU0FBTCxDQUFlUSxRQUFmLENBQXdCcEIsS0FBeEIsQ0FBTCxFQUFxQztBQUNuQyxjQUFNLElBQUlGLEtBQUosaUJBQW1CRSxLQUFuQix1QkFBTjtBQUNEO0FBQ0Y7Ozt1Q0FFbUI7QUFDbEIsYUFBTyxLQUFLVyxhQUFaO0FBQ0Q7OzttQ0FFZTtBQUNkLGFBQU8sS0FBS0MsU0FBWjtBQUNEIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb2xsZWN0aW9uVHlwZU1hbmFnZXIgZnJvbSBcIi4vc3JjL0NvbGxlY3Rpb25UeXBlTWFuYWdlclwiO1xuaW1wb3J0IFN1YnNjcmliZXIgZnJvbSBcIi4vc3JjL1N1YnNjcmliZXJcIjtcbiIsIi8qKlxuICogQGF1dGhvciB0aGV0ZWNobmljYWxjaGFsbGVuZ2VAZ21haWwuY29tXG4gKi9cbmltcG9ydCBTb3J0YWJsZSBmcm9tICdzb3J0YWJsZWpzJztcbmltcG9ydCBFdmVudERpc3BhdGNoZXIgZnJvbSAnLi9FdmVudERpc3BhdGNoZXInO1xuaW1wb3J0IFN1YnNjcmliZXIgZnJvbSAnLi9TdWJzY3JpYmVyJztcbmltcG9ydCBTb3J0YWJsZUV2ZW50QWRhcHRlciBmcm9tICcuL1NvcnRhYmxlRXZlbnRBZGFwdGVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGVjdGlvblR5cGVNYW5hZ2VyIHtcbiAgY29uc3RydWN0b3IgKHNldHRpbmdzID0ge1xuICAgIGNvbnRhaW5lcklkOiAnJyxcbiAgICBhZGRCdXR0b25JZDogJycsXG4gICAgcmVtb3ZlQnV0dG9uc0NsYXNzTmFtZTogJycsXG4gICAgc3Vic2NyaWJlcjogbnVsbCxcbiAgICBlbmFibGVTb3J0YWJsZTogZmFsc2UsXG4gICAgc29ydGFibGVDb25maWc6IG51bGxcbiAgfSkge1xuICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgICB0aGlzLmV2ZW50RGlzcGF0Y2hlciA9IG5ldyBFdmVudERpc3BhdGNoZXIoKTtcbiAgICB0aGlzLmV2ZW50RGlzcGF0Y2hlci5hZGRTdWJzY3JpYmVyKHRoaXMuY29uZmlndXJlSW50ZXJuYWxTdWJzY3JpYmVyKCkpO1xuXG4gICAgaWYgKHR5cGVvZiBzZXR0aW5ncy5zdWJzY3JpYmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLmV2ZW50RGlzcGF0Y2hlci5hZGRTdWJzY3JpYmVyKHNldHRpbmdzLnN1YnNjcmliZXIoKSk7XG4gICAgfVxuXG4gICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZXR0aW5ncy5jb250YWluZXJJZCk7XG4gICAgdGhpcy53aWRnZXRQcm90b3R5cGUgPSB0aGlzLmNvbnRhaW5lci5kYXRhc2V0LnByb3RvdHlwZTtcbiAgICB0aGlzLmNvdW50ZXIgPSB0aGlzLmNvbnRhaW5lci5kYXRhc2V0LmNvdW50ZXI7XG4gICAgdGhpcy5maWVsZHMgPSBbXTtcbiAgICB0aGlzLmxhc3RXaWRnZXRBZGRlZCA9IG51bGw7XG5cbiAgICB0aGlzLmJpbmRMaXN0ZW5lcnMoXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZXR0aW5ncy5hZGRCdXR0b25JZCksXG4gICAgICBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoc2V0dGluZ3MucmVtb3ZlQnV0dG9uc0NsYXNzTmFtZSkpXG4gICAgKTtcblxuICAgIGlmIChzZXR0aW5ncy5lbmFibGVTb3J0YWJsZSkge1xuICAgICAgY29uc3QgY29uZmlnID0gbmV3IFNvcnRhYmxlRXZlbnRBZGFwdGVyKCkuYWRhcHQodGhpcywgc2V0dGluZ3Muc29ydGFibGVDb25maWcpO1xuXG4gICAgICB0aGlzLnNvcnRhYmxlID0gU29ydGFibGUuY3JlYXRlKHRoaXMuY29udGFpbmVyLCBjb25maWcpO1xuICAgIH1cblxuICAgIHRoaXMuZXZlbnREaXNwYXRjaGVyLmRpc3BhdGNoKCdtb3VudCcpO1xuICB9XG5cbiAgY29uZmlndXJlSW50ZXJuYWxTdWJzY3JpYmVyICgpIHtcbiAgICBjb25zdCBpbnRlcm5hbFN1YnNjcmliZXIgPSBuZXcgU3Vic2NyaWJlcigpO1xuICAgIGludGVybmFsU3Vic2NyaWJlci5zdWJzY3JpYmUoXG4gICAgICBbJ21vdW50JywgJ2FmdGVyLmFkZC53aWRnZXQnLCAnYWZ0ZXIucmVtb3ZlLndpZGdldCddLFxuICAgICAgdGhpcy5zb3J0RmllbGROYW1lcy5iaW5kKHRoaXMpXG4gICAgKTtcblxuICAgIHJldHVybiBpbnRlcm5hbFN1YnNjcmliZXI7XG4gIH1cblxuICBiaW5kTGlzdGVuZXJzIChhZGRCdXR0b24sIHJlbW92ZUJ1dHRvbnMpIHtcbiAgICBhZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmFkZEVsZW1lbnQuYmluZCh0aGlzKSk7XG5cbiAgICByZW1vdmVCdXR0b25zLmZvckVhY2goKHJlbW92ZUJ1dHRvbikgPT4ge1xuICAgICAgcmVtb3ZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5yZW1vdmVFbGVtZW50LmJpbmQodGhpcywgcmVtb3ZlQnV0dG9uKSk7XG4gICAgfSk7XG4gIH1cblxuICBhZGRFbGVtZW50ICgpIHtcbiAgICB0aGlzLmV2ZW50RGlzcGF0Y2hlci5kaXNwYXRjaCgnYmVmb3JlLmFkZC53aWRnZXQnKTtcblxuICAgIGNvbnN0IHdpZGdldENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHdpZGdldENvbnRhaW5lci5pbm5lckhUTUwgPSB0aGlzLndpZGdldFByb3RvdHlwZS5yZXBsYWNlKC9fX25hbWVfXy9nLCB0aGlzLmNvdW50ZXIpO1xuXG4gICAgY29uc3QgcmVtb3ZlQnV0dG9uID0gd2lkZ2V0Q29udGFpbmVyLmNoaWxkcmVuWzBdLmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy5zZXR0aW5ncy5yZW1vdmVCdXR0b25zQ2xhc3NOYW1lKVswXTtcbiAgICByZW1vdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnJlbW92ZUVsZW1lbnQuYmluZCh0aGlzLCByZW1vdmVCdXR0b24pKTtcblxuICAgIHRoaXMubGFzdFdpZGdldEFkZGVkID0gd2lkZ2V0Q29udGFpbmVyLmNoaWxkcmVuWzBdO1xuXG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQod2lkZ2V0Q29udGFpbmVyLmNoaWxkcmVuWzBdKTtcbiAgICB0aGlzLmNvdW50ZXIrKztcblxuICAgIHRoaXMuZXZlbnREaXNwYXRjaGVyLmRpc3BhdGNoKCdhZnRlci5hZGQud2lkZ2V0Jyk7XG4gIH1cblxuICByZW1vdmVFbGVtZW50IChyZW1vdmVCdXR0b24pIHtcbiAgICB0aGlzLmV2ZW50RGlzcGF0Y2hlci5kaXNwYXRjaCgnYmVmb3JlLnJlbW92ZS53aWRnZXQnKTtcblxuICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChyZW1vdmVCdXR0b24uZGF0YXNldC50YXJnZXQpO1xuICAgIHJlbW92ZUJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucmVtb3ZlRWxlbWVudC5iaW5kKHRoaXMsIHJlbW92ZUJ1dHRvbikpO1xuXG4gICAgdGhpcy5jb250YWluZXIucmVtb3ZlQ2hpbGQodGFyZ2V0RWxlbWVudCk7XG5cbiAgICB0aGlzLmV2ZW50RGlzcGF0Y2hlci5kaXNwYXRjaCgnYWZ0ZXIucmVtb3ZlLndpZGdldCcpO1xuICB9XG5cbiAgZ2V0TGFzdFdpZGdldEFkZGVkICgpIHtcbiAgICByZXR1cm4gdGhpcy5sYXN0V2lkZ2V0QWRkZWQ7XG4gIH1cblxuICBnZXRGaWVsZHMgKCkge1xuICAgIHJldHVybiB0aGlzLmZpZWxkcztcbiAgfVxuXG4gIHNvcnRGaWVsZE5hbWVzICgpIHtcbiAgICB0aGlzLmZpZWxkcyA9IFtdO1xuICAgIGNvbnN0IGNvbGxlY3Rpb25JdGVtcyA9IEFycmF5LmZyb20odGhpcy5jb250YWluZXIuY2hpbGRyZW4pO1xuICAgIGNvbGxlY3Rpb25JdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleEEpID0+IHtcbiAgICAgIGNvbnN0IGZpZWxkcyA9IEFycmF5LmZyb20oaXRlbS5xdWVyeVNlbGVjdG9yQWxsKCdzZWxlY3QsIHRleHRhcmVhLCBpbnB1dCcpKTtcbiAgICAgIGZpZWxkcy5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgY2hpbGQubmFtZSA9IGNoaWxkLm5hbWUucmVwbGFjZSgvXFxbKFxcZCspXFxdL2csIGBbJHtpbmRleEF9XWApO1xuICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKGNoaWxkKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q29udGFpbmVyICgpIHtcbiAgICByZXR1cm4gdGhpcy5jb250YWluZXI7XG4gIH1cblxuICBnZXRTb3J0YWJsZSAoKSB7XG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLmVuYWJsZVNvcnRhYmxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtdXN0IHNldCBcImVuYWJsZVNvcnRhYmxlXCIgdG8gdHJ1ZSBmb3IgdXNpbmcgdGhpcyBmZWF0dXJlLicpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnNvcnRhYmxlO1xuICB9XG59XG4iLCJpbXBvcnQgU3Vic2NyaWJlciBmcm9tICcuL1N1YnNjcmliZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudERpc3BhdGNoZXIge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5zdWJzY3JpYmVycyA9IFtdO1xuICB9XG5cbiAgYWRkU3Vic2NyaWJlciAoc3Vic2NyaWJlcikge1xuICAgIGlmIChzdWJzY3JpYmVyIGluc3RhbmNlb2YgU3Vic2NyaWJlciA9PT0gZmFsc2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQXJndW1lbnQgbXVzdCBiZSB0eXBlIG9mIFN1YnNjcmliZXInKTtcbiAgICB9XG5cbiAgICB0aGlzLnN1YnNjcmliZXJzLnB1c2goc3Vic2NyaWJlcik7XG4gIH1cblxuICBkaXNwYXRjaCAoZXZlbnQpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLnN1YnNjcmliZXJzKSB7XG4gICAgICBpZiAodGhpcy5zdWJzY3JpYmVyc1trZXldLmhhcyhldmVudCkpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVyc1trZXldLmNhbGwoZXZlbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldFN1YnNjcmliZXJzICgpIHtcbiAgICByZXR1cm4gdGhpcy5zdWJzY3JpYmVycztcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU29ydGFibGVFdmVudEFkYXB0ZXIge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5ldmVudHMgPSBbJ29uRW5kJ107XG4gIH1cblxuICBhZGFwdCAoY29sbGVjdGlvblR5cGVNYW5hZ2VyLCBzb3J0YWJsZUNvbmZpZykge1xuICAgIGNvbnN0IGNvbmZpZyA9IHNvcnRhYmxlQ29uZmlnID09PSB1bmRlZmluZWQgPyB7fSA6IHsgLi4uc29ydGFibGVDb25maWcgfTtcblxuICAgIGNvbmZpZy5vbkVuZCA9IChldnQpID0+IHtcbiAgICAgIGNvbGxlY3Rpb25UeXBlTWFuYWdlci5zb3J0RmllbGROYW1lcygpO1xuICAgICAgaWYgKHNvcnRhYmxlQ29uZmlnICE9PSB1bmRlZmluZWQgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvcnRhYmxlQ29uZmlnLCAnb25FbmQnKSkge1xuICAgICAgICBzb3J0YWJsZUNvbmZpZy5vbkVuZChldnQpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gY29uZmlnO1xuICB9XG59XG4iLCJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1YnNjcmliZXIge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gW107XG4gICAgdGhpcy5ldmVudFRhZ3MgPSBbXG4gICAgICAnbW91bnQnLFxuICAgICAgJ2JlZm9yZS5hZGQud2lkZ2V0JyxcbiAgICAgICdhZnRlci5hZGQud2lkZ2V0JyxcbiAgICAgICdiZWZvcmUucmVtb3ZlLndpZGdldCcsXG4gICAgICAnYWZ0ZXIucmVtb3ZlLndpZGdldCdcbiAgICBdO1xuICB9XG5cbiAgc3Vic2NyaWJlIChldmVudCwgYWN0aW9uKSB7XG4gICAgaWYgKHR5cGVvZiBhY3Rpb24gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU2Vjb25kIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICAgIH1cblxuICAgIGlmIChBcnJheS5pc0FycmF5KGV2ZW50KSkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBldmVudC5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLnN1YnNjcmliZShldmVudFtpXSwgYWN0aW9uKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY2hlY2tJZkV2ZW50VGFnQXZhaWxhYmxlKGV2ZW50KTtcblxuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbnNbZXZlbnRdID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uc1tldmVudF0gPSBbXTtcbiAgICB9XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnNbZXZlbnRdLnB1c2goYWN0aW9uKTtcbiAgfVxuXG4gIGhhcyAoZXZlbnQpIHtcbiAgICByZXR1cm4gdGhpcy5zdWJzY3JpcHRpb25zW2V2ZW50XSAhPT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgY2FsbCAoZXZlbnQpIHtcbiAgICB0aGlzLmNoZWNrSWZFdmVudFRhZ0F2YWlsYWJsZShldmVudCk7XG5cbiAgICBpZiAoIXRoaXMuaGFzKGV2ZW50KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBFdmVudCAke2V2ZW50fSBoYXMgbm8gc3Vic2NyaXB0aW9uYCk7XG4gICAgfVxuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zW2V2ZW50XS5mb3JFYWNoKGNhbGxiYWNrID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNoZWNrSWZFdmVudFRhZ0F2YWlsYWJsZSAoZXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuZXZlbnRUYWdzLmluY2x1ZGVzKGV2ZW50KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBFdmVudCAke2V2ZW50fSBpcyBub3QgYXZhaWxhYmxlYCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0U3Vic2NyaXB0aW9ucyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3Vic2NyaXB0aW9ucztcbiAgfVxuXG4gIGdldEV2ZW50VGFncyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZXZlbnRUYWdzO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9