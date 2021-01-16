/**
 * @author thetechnicalchallenge@gmail.com
 */
import Sortable from "sortablejs";
import EventDispatcher from "./EventDispatcher";
import Subscriber from "./Subscriber";
import SortableEventAdapter from "./SortableEventAdapter";

export default class CollectionTypeManager {
    constructor(settings = {
        containerId: '',
        addButtonId: '',
        removeButtonsClassName: '',
        subscriber: Subscriber,
        enableSortable: false,
        sortableConfig: {}
    }) {
        this.settings = settings;
        this.eventDispatcher = new EventDispatcher();
        this.eventDispatcher.addSubscriber(this.configureInternalSubscriber())

        if (settings.subscriber instanceof Function) {
            this.eventDispatcher.addSubscriber(settings.subscriber())
        }

        this.container = document.getElementById(settings.containerId);
        this.widgetPrototype = this.container.dataset.prototype;
        this.counter = this.container.dataset.counter;
        this.fields = [];
        this.lastWidgetAdded = null;

        this.bindListeners(
            document.getElementById(settings.addButtonId),
            Array.from(document.getElementsByClassName(settings.removeButtonsClassName))
        );

        if (settings.enableSortable) {
            let config = new SortableEventAdapter().adapt(this, settings.sortableConfig);

            this.sortable = Sortable.create(this.container, config)
        }

        this.eventDispatcher.dispatch('mount');
    }

    configureInternalSubscriber()
    {
        const internalSubscriber = new Subscriber();
        internalSubscriber.subscribe(
            ['mount', 'after.add.widget', 'after.remove.widget'],
            this.sortFieldNames.bind(this)
        );

        return internalSubscriber;
    }

    bindListeners(addButton, removeButtons)
    {
        addButton.addEventListener('click', this.addElement.bind(this));

        removeButtons.forEach((removeButton) => {
            removeButton.addEventListener('click', this.removeElement.bind(this, removeButton));
        });
    }

    addElement()
    {
        this.eventDispatcher.dispatch('before.add.widget');

        let widgetContainer = document.createElement('div');
        widgetContainer.innerHTML = this.widgetPrototype.replace(/__name__/g, this.counter);

        let removeButton = widgetContainer.children[0].getElementsByClassName(this.settings.removeButtonsClassName)[0];
        removeButton.addEventListener('click', this.removeElement.bind(this, removeButton));

        this.lastWidgetAdded = widgetContainer.children[0];

        this.container.appendChild(widgetContainer.children[0]);
        this.counter++;

        this.eventDispatcher.dispatch('after.add.widget');
    }

    removeElement(removeButton)
    {
        this.eventDispatcher.dispatch('before.remove.widget');

        let targetElement = document.getElementById(removeButton.dataset.target);
        removeButton.removeEventListener('click', this.removeElement.bind(this, removeButton));

        this.container.removeChild(targetElement);

        this.eventDispatcher.dispatch('after.remove.widget');
    }

    getLastWidgetAdded()
    {
        return this.lastWidgetAdded;
    }

    getFields()
    {
        return this.fields;
    }

    sortFieldNames()
    {
        this.fields = [];
        let collectionItems = Array.from(this.container.children);
        collectionItems.forEach((item, indexA) => {
            let fields = Array.from(item.querySelectorAll("select, textarea, input"));
            fields.forEach(child => {
                child.name = child.name.replace(/\[(\d+)\]/g, `[${indexA}]`);
                this.fields.push(child);
            });
        });
    }

    getContainer()
    {
        return this.container;
    }

    getSortable()
    {
        if (!this.settings.enableSortable) {
            throw new Error('You must set "enableSortable" to true for using this feature.');
        }

        return this.sortable;
    }
}