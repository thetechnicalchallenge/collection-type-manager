/**
 * @author thetechnicalchallenge@gmail.com
 */
import Sortable from "sortablejs";

export default class CollectionTypeManager {
    constructor(settings = {
        containerId: null,
        addButtonId: null,
        removeButtonsClassName: null,
        isBuilt: null,
        afterAddElement: null,
        afterRemoveElement: null,
        enableSortable: false,
        sortableConfig: {}
    }) {
        this.settings = settings;
        this.container = document.getElementById(settings.containerId);
        this.addButton = document.getElementById(settings.addButtonId);
        this.removeButtons = Array.from(document.getElementsByClassName(settings.removeButtonsClassName))

        this.widgetPrototype = this.container.dataset.prototype;
        this.counter = this.container.dataset.counter;

        this.lastWidgetAdded = null;

        this.listenButtons();

        if (settings.enableSortable) {
            let config = this.sortOnEnd(settings.sortableConfig);
            this.sortable = Sortable.create(this.container, config)
        }

        this.fields = [];
        this.sortFieldNames();

        if (settings.isBuilt instanceof Function) {
            settings.isBuilt();
        }
    }

    sortOnEnd(sortableConfig)
    {
        let config = {};
        if (sortableConfig && sortableConfig.hasOwnProperty('onEnd')) {
            config.onEnd = () => {
                this.sortFieldNames();
                sortableConfig.onEnd();
            }
        } else {
            config.onEnd = (evt) => {
                this.sortFieldNames();
            }
        }

        return config;
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
            console.log(new Error('You must set "enableSortable" to true for using this feature.'));
        }

        return this.sortable;
    }

    listenButtons()
    {
        this.addButton.addEventListener('click', this.addElement.bind(this));

        this.removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener('click', this.removeElement.bind(this, removeButton));
        });
    }

    addElement()
    {
        let widgetContainer = document.createElement('div');
        widgetContainer.innerHTML = this.widgetPrototype.replace(/__name__/g, this.counter);

        let removeButton = widgetContainer.children[0].getElementsByClassName(this.settings.removeButtonsClassName)[0];
        removeButton.addEventListener('click', this.removeElement.bind(this, removeButton));

        this.lastWidgetAdded = widgetContainer.children[0];

        this.container.appendChild(widgetContainer.children[0]);
        this.counter++;

        this.sortFieldNames();

        if (this.settings.afterAddElement instanceof Function) {
            this.settings.afterAddElement();
        }
    }

    getLastWidgetAdded()
    {
        return this.lastWidgetAdded;
    }

    removeElement(removeButton)
    {
        let targetElement = document.getElementById(removeButton.dataset.target);
        removeButton.removeEventListener('click', this.removeElement.bind(this, removeButton));

        this.container.removeChild(targetElement);

        if (this.settings.afterRemoveElement instanceof Function) {
            this.settings.afterRemoveElement();
        }
    }
}