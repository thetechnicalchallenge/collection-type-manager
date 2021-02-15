/**
 * @author thetechnicalchallenge@gmail.com
 */
import Sortable from 'sortablejs';
import EventDispatcher from './EventDispatcher';
import Subscriber from './Subscriber';
import SortableEventAdapter from './SortableEventAdapter';
import ChildCollection from './ChildCollection';

export default class CollectionTypeManager {
  constructor (settings = {
    containerId: '',
    addButtonId: '',
    removeButtonsClassName: '',
    subscriber: null,
    enableSortable: false,
    sortableConfig: null,
    childCollectionList: null
  }) {
    this._settings = settings;
    this.eventDispatcher = new EventDispatcher();
    this.eventDispatcher.addSubscriber(this.configureInternalSubscriber());

    if (typeof settings.subscriber === 'function') {
      this.eventDispatcher.addSubscriber(settings.subscriber());
    }

    this._container = document.getElementById(settings.containerId);
    this._widgetPrototype = this._container.dataset.prototype;
    this._counter = this._container.dataset.counter;
    this._widgets = this._container.children;
    this._fields = [];
    this._lastWidgetAdded = null;

    this.bindListeners(
      document.getElementById(settings.addButtonId),
      Array.from(document.getElementsByClassName(settings.removeButtonsClassName))
    );

    if (settings.enableSortable) {
      const config = new SortableEventAdapter().adapt(this, settings.sortableConfig);

      this.sortable = Sortable.create(this._container, config);
    }

    if (settings.childCollectionList) {
      this.manageChildCollection(settings.childCollectionList);
    }

    this.eventDispatcher.dispatch('mount');
  }

  manageChildCollection (childCollectionList) {
    if (childCollectionList instanceof ChildCollection !== false) {
      throw new Error(`Unexpected type for childCollection property, expected "ChildCollection", "${typeof childCollectionList}" given`);
    }

    childCollectionList.forEach(childCollection => {
      childCollection.getCollection().forEach(child => {
        const ChildCollection = new CollectionTypeManager({
          containerId: child.id,
          addButtonId: childCollection.getAddButtonPrefix() + child.id,
          removeButtonsClassName: childCollection.getRemoveButtonPrefix() + child.id
        });
      });

      const subscriber = new Subscriber();

      subscriber.subscribe('after.add.widget', () => {
        const lastWidget = this.getLastWidgetAdded();

        const child = lastWidget.querySelector(`.${childCollection.getContainerClassName()}`);
        const ChildCollection = new CollectionTypeManager({
          containerId: child.id,
          addButtonId: childCollection.getAddButtonPrefix() + child.id,
          removeButtonsClassName: childCollection.getRemoveButtonPrefix() + child.id
        });
      });

      this.eventDispatcher.addSubscriber(subscriber);
    });
  }

  configureInternalSubscriber () {
    const internalSubscriber = new Subscriber();
    internalSubscriber.subscribe(
      ['mount', 'after.add.widget', 'after.remove.widget'],
      this.sortFieldNames.bind(this)
    );

    return internalSubscriber;
  }

  bindListeners (addButton, removeButtons) {
    addButton.addEventListener('click', this.addElement.bind(this));

    removeButtons.forEach((removeButton) => {
      removeButton.addEventListener('click', this.removeElement.bind(this, removeButton));
    });
  }

  addElement () {
    this.eventDispatcher.dispatch('before.add.widget');

    const widgetContainer = document.createElement('div');
    widgetContainer.innerHTML = this._widgetPrototype.replace(/__name__/g, this._counter);
    const removeButton = widgetContainer.children[0].getElementsByClassName(this._settings.removeButtonsClassName)[0];
    removeButton.addEventListener('click', this.removeElement.bind(this, removeButton));

    this._lastWidgetAdded = widgetContainer.children[0];

    this._container.appendChild(widgetContainer.children[0]);
    this._counter++;

    this.eventDispatcher.dispatch('after.add.widget');
  }

  removeElement (removeButton) {
    this.eventDispatcher.dispatch('before.remove.widget');

    const targetElement = document.getElementById(removeButton.dataset.target);
    removeButton.removeEventListener('click', this.removeElement.bind(this, removeButton));

    this._container.removeChild(targetElement);

    this.eventDispatcher.dispatch('after.remove.widget');
  }

  getWidgets () {
    return this._widgets;
  }

  getLastWidgetAdded () {
    return this._lastWidgetAdded;
  }

  getFields () {
    return this._fields;
  }

  sortFieldNames () {
    this._fields = [];
    const collectionItems = Array.from(this._container.children);
    collectionItems.forEach((item, indexA) => {
      const fields = Array.from(item.querySelectorAll('select, textarea, input'));
      fields.forEach(child => {
        child.name = child.name.replace(/\[(\d+)\]/g, `[${indexA}]`);
        this._fields.push(child);
      });
    });
  }

  getContainer () {
    return this._container;
  }

  getSortable () {
    if (!this._settings.enableSortable) {
      throw new Error('You must set "enableSortable" to true for using this feature.');
    }

    return this.sortable;
  }
}

export { Subscriber, ChildCollection };
