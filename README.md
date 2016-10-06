inhabit-api [![Build Status](https://travis-ci.org/rand0me/node-inhabit-api.svg?branch=master)](https://travis-ci.org/rand0me/node-inhabit-api) [![Codecov](https://img.shields.io/codecov/c/github/rand0me/node-inhabit-api.svg?maxAge=2592000)](https://codecov.io/gh/rand0me/node-inhabit-api)
===========

## Installation
### npm
[![NPM](https://nodei.co/npm/inhabit-api.png)](https://nodei.co/npm/inhabit-api/)

First, install `inhabit-api` via npm command-line, as follows:
```
npm install --save-dev inhabit-api
```
Next, you must require a module and instantiate a class:
```javascript
var InhabitAPI = require('inhabit-api');
```
### Bower
Install `inhabit-api` package:
```
bower install --save inhabit-api
```
Then include a `<script>` tag like that:
```html
<script src="bower_components/inhabit-api/dist/InhabitAPI.bower.js"></script>
```
Although its use is arguable. :evil:

## Usage
```javascript
// "info" must be an object with "id" property, which specifies module ID
var api = InhabitAPI.create(info);

// Log a "Module Start" analytics event
api.analytics.start();

// Log an "Interaction" analytics event
api.analytics.interaction();

// Log an "Module End" analytics event
api.analytics.end();
```

## License
COPYRIGHT (c) 2016 rand0me

BSD ISC License

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

## Contribution
Be free to create pull requests
