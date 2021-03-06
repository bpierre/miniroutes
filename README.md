# miniroutes [![Build Status](https://travis-ci.org/bpierre/miniroutes.png?branch=master)](https://travis-ci.org/bpierre/miniroutes)

Mini routing system based on regular expressions.

<p align="center"><img width="763" height="256" alt="miniroutes illustration" src="http://scri.ch/ls3-2x.png"></p>

## Usage

```js
var miniroutes = require('miniroutes');

var paths = [

  // Match 'foo' and 'foo/'
  [ 'foo', /^foo\/?$/ ],

  // Match 'bar', 'bar/<anything>', 'bar/<anything>/<anything>'
  [ 'bar', /^bar(?:\/([^\/]+))?(?:\/([^\/]+))?\/?$/ ]

];

var routing = miniroutes(paths, function(route, previous) {
  // `route` is the matched route
  // `previous` is the previously matched route
  console.log(route);
});

routing('foo');
// Console output: { name: 'foo',
//                   params: [],
//                   path: 'foo' }

routing('bar/param1');
// Console output: { name: 'bar',
//                   params: ['param1', null],
//                   path: 'bar/param1' }

routing('bar/param1/param2');
// Console output: { name: 'bar',
//                   params: ['param1', 'param2'],
//                   path: 'bar/param1/param2' }
```

You can also combine miniroutes with [minihash](https://github.com/bpierre/minihash):

```js
var miniroutes = require('miniroutes');
var minihash = require('minihash');

var routes = [ /* … */ ];

var hash = minihash('!/', miniroutes(routes, function(route, previous) {
  console.log(route, previous);
}));
```

## Installation

```
$ npm install miniroutes
```

## Browser compatibility

IE9+ and modern browsers.

[![Browser support](https://ci.testling.com/bpierre/miniroutes.png)](https://ci.testling.com/bpierre/miniroutes)

## License

[MIT](LICENSE)

## Special thanks

Illustration made by [Raphaël Bastide](http://raphaelbastide.com/) with [scri.ch](http://scri.ch/).
