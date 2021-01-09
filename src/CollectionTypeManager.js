"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @author thetechnicalchallenge@gmail.com
 */
var CollectionTypeManager = /*#__PURE__*/function () {
  function CollectionTypeManager() {
    var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      containerId: null,
      addButtonId: null,
      removeButtonsClassName: null,
      isBuilt: null,
      afterAddElement: null,
      afterRemoveElement: null
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

    if (settings.isBuilt instanceof Function) {
      settings.isBuilt();
    }
  }

  _createClass(CollectionTypeManager, [{
    key: "listenButtons",
    value: function listenButtons() {
      var _this = this;

      this.addButton.addEventListener('click', this.addElement.bind(this));
      this.removeButtons.forEach(function (removeButton, index) {
        removeButton.addEventListener('click', _this.removeElement.bind(_this, removeButton));
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