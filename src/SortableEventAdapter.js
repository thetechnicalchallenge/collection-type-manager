export default class SortableEventAdapter {
    constructor() {
        this.events = ['onEnd'];
    }

    adapt(collectionTypeManager, sortableConfig)
    {
        let config = {...sortableConfig};

        this.events.forEach(event => {
            if (sortableConfig && sortableConfig.hasOwnProperty(event)) {
                this.attach(collectionTypeManager, event, config, sortableConfig);
            }
        });

        return config;
    }

    attach(collectionTypeManager, event, config, sortableConfig)
    {
        switch (event) {
            case 'onEnd':
                config[event] = (evt) => {
                    collectionTypeManager.sortFieldNames();
                    sortableConfig[event](evt);
                }
                break;
        }
    }
}