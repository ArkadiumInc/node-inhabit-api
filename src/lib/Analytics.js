//------------------------------------------------------------------------------
// Name: src/lib/Analytics.js
// Author: rand0me <not.randome@gmail.com>
// Timestamp: 2016-10-05T13:29:32.000Z
// Description:
//    Analytics
//------------------------------------------------------------------------------

const PREFIX = 'inhabit:module:';


export default class Analytics {
  constructor(client) {
    this.client = client;
    this.info = {};
  }
  start() {
    return this.client.get(`${PREFIX}start`, this.info);
  }
  end() {
    return this.client.get(`${PREFIX}end`, this.info);
  }
  interaction() {
    return this.client.get(`${PREFIX}interaction`, this.info);
  }
  error(){
    return this.client.get(`${PREFIX}interaction`,this.info);
  }
}
