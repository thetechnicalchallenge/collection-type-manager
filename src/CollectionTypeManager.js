/**
 * @author thetechnicalchallenge@gmail.com
 */
export class CollectionTypeManager {
    constructor(settings = {
        containerId: null,
        addButtonId: null,
        removeButtonsClassName: null,
        isBuilt: null,
        afterAddElement: null,
        afterRemoveElement: null
    }) {
        this.settings = settings;
        this.container = document.getElementById(settings.containerId);
        this.addButton = document.getElementById(settings.addButtonId);
        this.removeButtons = Array.from(document.getElementsByClassName(settings.removeButtonsClassName))

        this.widgetPrototype = this.container.dataset.prototype;
        this.counter = this.container.dataset.counter;

        this.lastWidgetAdded = null;

        this.listenButtons();

        if (settings.isBuilt instanceof Function) {
            settings.isBuilt();
        }
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