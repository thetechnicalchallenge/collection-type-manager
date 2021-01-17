
export default class Subscriber {
  constructor () {
    this.subscriptions = [];
    this.eventTags = [
      'mount',
      'before.add.widget',
      'after.add.widget',
      'before.remove.widget',
      'after.remove.widget'
    ];
  }

  subscribe (event, action) {
    if (typeof action !== 'function') {
      throw new Error('Second argument must be a function');
    }

    if (Array.isArray(event)) {
      for (let i = 0; i < event.length; i++) {
        this.subscribe(event[i], action);
      }

      return;
    }

    this.checkIfEventTagAvailable(event);

    if (this.subscriptions[event] === undefined) {
      this.subscriptions[event] = [];
    }

    this.subscriptions[event].push(action);
  }

  has (event) {
    return this.subscriptions[event] !== undefined;
  }

  call (event) {
    this.checkIfEventTagAvailable(event);

    if (!this.has(event)) {
      throw new Error(`Event ${event} has no subscription`);
    }

    this.subscriptions[event].forEach(callback => {
      try {
        callback();
      } catch (e) {
        throw new Error(e);
      }
    });
  }

  checkIfEventTagAvailable (event) {
    if (!this.eventTags.includes(event)) {
      throw new Error(`Event ${event} is not available`);
    }
  }

  getSubscriptions () {
    return this.subscriptions;
  }

  getEventTags () {
    return this.eventTags;
  }
}
