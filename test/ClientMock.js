//------------------------------------------------------------------------------
// Name: test/ClientMock.js
// Author: rand0me <not.randome@gmail.com>
// Timestamp: 2016-10-05T15:14:31.261Z
// Description:
//    @description@
//------------------------------------------------------------------------------

export default class ClientMock {
  get(path, data) {
    return Promise.resolve({ message: 'OK' });
  }
}
