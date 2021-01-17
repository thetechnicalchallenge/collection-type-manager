import Subscriber from './Subscriber';

export default class EventDispatcher {
  constructor () {
    this.subscribers = [];
  }

  addSubscriber (subscriber) {
    if (subscriber instanceof Subscriber === false) {
      throw new Error('Argument must be type of Subscriber');
    }

    this.subscribers.push(subscriber);
  }

  dispatch (event) {
    for (const key in this.subscribers) {
      if (this.subscribers[key].has(event)) {
        this.subscribers[key].call(event);
      }
    }
  }

  getSubscribers () {
    return this.subscribers;
  }
}
