//------------------------------------------------------------------------------
// Name: @file@
// Author: rand0me <not.randome@gmail.com>
// Timestamp: 2016-10-05T13:58:30.319Z
// Description:
//    @description@
//------------------------------------------------------------------------------

import Analytics from '../src/lib/Analytics';

class ClientMock {
  get(path, data) {
    return Promise.resolve({ message: 'OK' });
  }
}

const clientMock = new ClientMock();

test('Analytics', () => {
  expect(Analytics).toBeTruthy();
  expect(new Analytics()).toBeInstanceOf(Analytics);

  const analytics = new Analytics(clientMock);

  analytics.start().then(data => expect(data.message).toBe('OK'));

  analytics.interaction().then(data => expect(data.message).toBe('OK'));

  analytics.end().then(data => expect(data.message).toBe('OK'));
});
