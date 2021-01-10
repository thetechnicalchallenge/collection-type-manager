"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sortablejs = _interopRequireDefault(require("sortablejs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CollectionTypeManager = /*#__PURE__*/function () {
  function CollectionTypeManager() {
    var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      containerId: null,
      addButtonId: null,
      removeButtonsClassName: null,
      isBuilt: null,
      afterAddElement: null,
      afterRemoveElement: null,
      enableSortable: false,
      sortableConfig: {}
    };

    _classCallCheck(this, CollectionTypeManager);

    this.settings = settings;
    this.container = document.getElementById(settings.containerId);
    this.addButton = document.getElementById(settings.addButtonId);
    this.removeButtons = Array.from(document.getElementsByClassName(settings.removeButtonsClassName));
    this.widgetPrototype = this.container.dataset.prototype;
    this.counter = this.container.dataset.counter;
    this.lastWidgetAdded = null;
    this.listenButtons();

    if (settings.enableSortable) {
      var config = this.sortOnEnd(settings.sortableConfig);
      this.sortable = _sortablejs.default.create(this.container, config);
    }

    this.fields = [];
    this.sortFieldNames();

    if (settings.isBuilt instanceof Function) {
      settings.isBuilt();
    }
  }

  _createClass(CollectionTypeManager, [{
    key: "sortOnEnd",
    value: function sortOnEnd(sortableConfig) {
      var _this = this;

      var config = {};

      if (sortableConfig && sortableConfig.hasOwnProperty('onEnd')) {
        config.onEnd = function () {
          _this.sortFieldNames();

          sortableConfig.onEnd();
        };
      } else {
        config.onEnd = function (evt) {
          _this.sortFieldNames();
        };
      }

      return config;
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
  }, {
    key: "listenButtons",
    value: function listenButtons() {
      var _this3 = this;

      this.addButton.addEventListener('click', this.addElement.bind(this));
      this.removeButtons.forEach(function (removeButton, index) {
        removeButton.addEventListener('click', _this3.removeElement.bind(_this3, removeButton));
      });
    }
  }, {
    key: "addElement",
    value: function addElement() {
      var widgetContainer = document.createElement('div');
      widgetContainer.innerHTML = this.widgetPrototype.replace(/__name__/g, this.counter);
      var removeButton = widgetContainer.children[0].getElementsByClassName(this.settings.removeButtonsClassName)[0];
      removeButton.addEventListener('click', this.removeElement.bind(this, removeButton));
      this.lastWidgetAdded = widgetContainer.children[0];
      this.container.appendChild(widgetContainer.children[0]);
      this.counter++;
      this.sortFieldNames();

      if (this.settings.afterAddElement instanceof Function) {
        this.settings.afterAddElement();
      }
    }
  }, {
    key: "getLastWidgetAdded",
    value: function getLastWidgetAdded() {
      return this.lastWidgetAdded;
    }
  }, {
    key: "removeElement",
    value: function removeElement(removeButton) {
      var targetElement = document.getElementById(removeButton.dataset.target);
      removeButton.removeEventListener('click', this.removeElement.bind(this, removeButton));
      this.container.removeChild(targetElement);

      if (this.settings.afterRemoveElement instanceof Function) {
        this.settings.afterRemoveElement();
      }
    }
  }]);

  return CollectionTypeManager;
}();

exports.default = CollectionTypeManager;