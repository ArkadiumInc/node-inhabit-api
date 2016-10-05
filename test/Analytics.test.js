//------------------------------------------------------------------------------
// Name: @file@
// Author: rand0me <not.randome@gmail.com>
// Timestamp: 2016-10-05T13:58:30.319Z
// Description:
//    @description@
//------------------------------------------------------------------------------

import test from 'tape';
import Analytics from '../src/lib/Analytics';
import ClientMock from './ClientMock';

const clientMock = new ClientMock();

test('Analytics', t => {
  t.ok(Analytics);
  t.test('#constructor', t => {
    t.ok(new Analytics());
    t.end();
  });
  t.test('#start', t => {
    const analytics = new Analytics(clientMock);
    analytics.start().then(data => {
      t.equals(data.message, 'OK');
      t.end();
    });
  });
  t.test('#end', t => {
    const analytics = new Analytics(clientMock);
    analytics.end().then(data => {
      t.equals(data.message, 'OK');
      t.end();
    });
  });
  t.test('#interaction', t => {
    const analytics = new Analytics(clientMock);
    analytics.interaction().then(data => {
      t.equals(data.message, 'OK');
      t.end();
    });
  });
  t.end();
});
