import Subscriber from '../src/Subscriber';

describe('subscribe method', () => {
  test('second argument must be a function', () => {
    const sub = new Subscriber();
    expect(() => {
      sub.subscribe('not.exists');
    }).toThrow('Second argument must be a function');
  });

  test('subscribe to one existent event', () => {
    const sub = new Subscriber();
    sub.subscribe('mount', () => 'hello');
    expect(sub.has('mount')).toBe(true);
  });

  test('subscribe to a non-existent event', () => {
    const sub = new Subscriber();
    expect(() => {
      sub.subscribe('not.exists', () => 'hello');
    }).toThrow('Event not.exists is not available');
  });

  test('subscribe to all existing events (array of all events) at once', () => {
    const sub = new Subscriber();
    sub.subscribe(sub.getEventTags(), () => '');
    sub.getEventTags().forEach(tag => {
      expect(sub.has(tag)).toBe(true);
    });
  });
});

describe('has method', () => {
  test('has return false if no subscription', () => {
    const sub = new Subscriber();
    sub.getEventTags().forEach(tag => {
      expect(sub.has(tag)).toBe(false);
    });
  });
});

describe('call method', () => {
  test('call throw exception if no subscriptions', () => {
    const sub = new Subscriber();
    expect(() => {
      sub.call('mount');
    }).toThrow('Event mount has no subscription');
  });

  test('callback works fine', () => {
    const subscriber = new Subscriber();

    let text = '';
    subscriber.subscribe('mount', () => {
      text = 'hello';
    });

    subscriber.call('mount');

    expect('hello').toBe(text);
  });
});
