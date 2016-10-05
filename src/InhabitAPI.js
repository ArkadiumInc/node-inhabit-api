//------------------------------------------------------------------------------
// Name: src/API.js
// Author: rand0me <not.randome@gmail.com>
// Timestamp: 2016-10-05T13:13:48.560Z
// Description:
//    InHabit API wrapper
//------------------------------------------------------------------------------

import PMClient from 'postmessage-client';
import Analytics from './lib/Analytics';

export default class InhabitAPI {
  constructor() {
    this.client = new PMClient();
    this.analytics = new Analytics(this.client);
  }
  getAnalytics() {
    return this.analytics;
  }
}

InhabitAPI.create = (moduleConfiguration) => {
  const api = new InhabitAPI();
  api.analytics.setInfo(moduleConfiguration);

  return api;
}
