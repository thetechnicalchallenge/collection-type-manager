export default class SortableEventAdapter {
  constructor () {
    this.events = ['onEnd'];
  }

  adapt (collectionTypeManager, sortableConfig) {
    const config = sortableConfig === undefined ? {} : { ...sortableConfig };

    config.onEnd = (evt) => {
      collectionTypeManager.sortFieldNames();
      if (sortableConfig !== undefined && Object.prototype.hasOwnProperty.call(sortableConfig, 'onEnd')) {
        sortableConfig.onEnd(evt);
      }
    };

    return config;
  }
}
