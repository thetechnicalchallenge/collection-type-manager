import Subscriber from "./Subscriber";

export default class EventDispatcher {
    constructor() {
        this.subscribers = [];
    }

    addSubscriber(subscriber)
    {
        if (!(subscriber instanceof Subscriber)) {
            throw new Error("Argument must be an an instance of Subscriber");
        }

        this.subscribers.push(subscriber);
    }

    dispatch(event)
    {
        this.subscribers.forEach(subscriber => {
            if (subscriber.has(event)) {
                subscriber.call(event);
            }
        })
    }

    getSubscribers()
    {
        return this.subscribers;
    }
}