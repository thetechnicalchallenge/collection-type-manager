import Subscriber from "../src/Subscriber";
import EventDispatcher from "../src/EventDispatcher";

test('subscriber is not instance of Subscriber', () => {
    let eventDispatcher = new EventDispatcher();

    expect(() => {
        eventDispatcher.addSubscriber('subscriber');
    }).toThrow("Argument must be an an instance of Subscriber");
});

test('subscribers are registered', () => {
    let eventDispatcher = new EventDispatcher();
    let subscriber = new Subscriber();
    let subscriber2 = new Subscriber();
    eventDispatcher.addSubscriber(subscriber)
    eventDispatcher.addSubscriber(subscriber2)

    expect(2).toBe(eventDispatcher.getSubscribers().filter(item => item instanceof Subscriber).length);
});

test('successful event dispatch', () => {
    let eventDispatcher = new EventDispatcher();
    let subscriber = new Subscriber();

    let text = '';
    subscriber.subscribe('mount', () => {
        text = 'hello';
    });

    eventDispatcher.addSubscriber(subscriber);
    eventDispatcher.dispatch('mount');

    expect('hello').toBe(text);
});