"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sortablejs = _interopRequireDefault(require("sortablejs"));

var _EventDispatcher = _interopRequireDefault(require("./EventDispatcher"));

var _Subscriber = _interopRequireDefault(require("./Subscriber"));

var _SortableEventAdapter = _interopRequireDefault(require("./SortableEventAdapter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CollectionTypeManager = /*#__PURE__*/function () {
  function CollectionTypeManager() {
    var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      containerId: '',
      addButtonId: '',
      removeButtonsClassName: '',
      subscriber: _Subscriber.default,
      enableSortable: false,
      sortableConfig: {}
    };

    _classCallCheck(this, CollectionTypeManager);

    this.settings = settings;
    this.eventDispatcher = new _EventDispatcher.default();
    this.eventDispatcher.addSubscriber(this.configureInternalSubscriber());

    if (settings.subscriber instanceof Function) {
      this.eventDispatcher.addSubscriber(settings.subscriber());
    }

    this.container = document.getElementById(settings.containerId);
    this.widgetPrototype = this.container.dataset.prototype;
    this.counter = this.container.dataset.counter;
    this.fields = [];
    this.lastWidgetAdded = null;
    this.bindListeners(document.getElementById(settings.addButtonId), Array.from(document.getElementsByClassName(settings.removeButtonsClassName)));

    if (settings.enableSortable) {
      var config = new _SortableEventAdapter.default().adapt(this, settings.sortableConfig);
      this.sortable = _sortablejs.default.create(this.container, config);
    }

    this.eventDispatcher.dispatch('mount');
  }

  _createClass(CollectionTypeManager, [{
    key: "configureInternalSubscriber",
    value: function configureInternalSubscriber() {
      var internalSubscriber = new _Subscriber.default();
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
        var fields = Array.from(item.querySelectorAll("select, textarea, input"));
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
        console.log(new Error('You must set "enableSortable" to true for using this feature.'));
      }

      return this.sortable;
    }
  }]);

  return CollectionTypeManager;
}();

exports.default = CollectionTypeManager;