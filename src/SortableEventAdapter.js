export default class SortableEventAdapter {
    constructor() {
        this.events = ['onEnd'];
    }

    adapt(collectionTypeManager, sortableConfig)
    {
        let config = sortableConfig === undefined ? {} : {...sortableConfig};

        this.events.forEach(event => {
            this.attach(collectionTypeManager, event, config, sortableConfig);
        });

        return config;
    }

    attach(collectionTypeManager, event, config, sortableConfig)
    {
        switch (event) {
            case 'onEnd':
                config[event] = (evt) => {
                    collectionTypeManager.sortFieldNames();
                    if (sortableConfig !== undefined && sortableConfig.hasOwnProperty(event)) {
                        sortableConfig[event](evt);
                    }
                }
                break;
        }
    }
}