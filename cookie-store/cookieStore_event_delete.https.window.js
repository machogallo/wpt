'use strict';

promise_test(async testCase => {
  testCase.add_cleanup(async () => {
    await cookieStore.delete('cookie-name');
  });

  // The events are asynchronously dispatched. Let's wait for both in the
  // expected order to avoid race conditions.

  {
    const eventPromise = new Promise((resolve) => {
      cookieStore.onchange = resolve;
    });
    await cookieStore.set('cookie-name', 'cookie-value');

    const event = await eventPromise;
    assert_true(event instanceof CookieChangeEvent);
    assert_equals(event.type, 'change');
    assert_equals(event.changed.length, 1);
    assert_equals(event.changed[0].name, 'cookie-name');
  }

  {
    const eventPromise = new Promise((resolve) => {
      cookieStore.onchange = resolve;
    });
    await cookieStore.delete('cookie-name');
    const event = await eventPromise;
    assert_true(event instanceof CookieChangeEvent);
    assert_equals(event.type, 'change');
    assert_equals(event.deleted.length, 1);
    assert_equals(event.deleted[0].name, 'cookie-name');
    assert_equals(
        event.deleted[0].value, undefined,
        'Cookie change events for deletions should not have cookie values');
    assert_equals(event.changed.length, 0);
  }
}, 'cookieStore fires change event for cookie deleted by cookieStore.delete()');
