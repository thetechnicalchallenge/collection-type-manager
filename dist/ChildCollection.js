"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class ChildCollection {
  constructor(childCollectionClassName = '', addButtonPrefix = 'add-', removeButtonPrefix = 'remove-') {
    this._childCollectionClassName = childCollectionClassName;
    this._addButtonPrefix = addButtonPrefix;
    this._removeButtonPrefix = removeButtonPrefix;
    this._childCollection = Array.from(document.getElementsByClassName(childCollectionClassName));
  }

  getCollection() {
    return this._childCollection;
  }

  getContainerClassName() {
    return this._childCollectionClassName;
  }

  getRemoveButtonPrefix() {
    return this._removeButtonPrefix;
  }

  getAddButtonPrefix() {
    return this._addButtonPrefix;
  }

}

exports.default = ChildCollection;