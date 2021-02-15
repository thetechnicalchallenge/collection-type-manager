export default class ChildCollection {
  constructor (
    childCollectionClassName = '',
    addButtonPrefix = 'add-',
    removeButtonPrefix = 'remove-'
  ) {
    this._childCollectionClassName = childCollectionClassName;
    this._addButtonPrefix = addButtonPrefix;
    this._removeButtonPrefix = removeButtonPrefix;

    this._childCollection = Array.from(document.getElementsByClassName(childCollectionClassName));
  }

  getCollection () {
    return this._childCollection;
  }

  getContainerClassName () {
    return this._childCollectionClassName;
  }

  getRemoveButtonPrefix () {
    return this._removeButtonPrefix;
  }

  getAddButtonPrefix () {
    return this._addButtonPrefix;
  }
}
