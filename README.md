# miniroutes

Mini routing system based on regular expressions.

<p align="center"><img width="763" height="256" alt="miniroutes illustration" src="http://scri.ch/ls3.png"></p>

## Usage

```js
var miniroutes = require('miniroutes');

var paths = [

  // Match 'foo' and 'foo/'
  [ 'foo', /^foo\/?$/ ],

  // Match 'bar', 'bar/<anything>', 'bar/<anything>/<anything>'
  [ 'bar', /^bar(?:\/([^\/]+))?(?:\/([^\/]+))?\/?$/ ]

];

var routing = miniroutes(paths, function(route) {
  console.log(route); // matched route
});

routing('foo');
// Console output: { name: 'foo',
//                   params: [],
//                   value: 'foo' }

routing('bar/param1');
// Console output: { name: 'bar',
//                   params: ['param1', null],
//                   value: 'bar/param1' }

routing('bar/param1/param2');
// Console output: { name: 'bar',
//                   params: ['param1', 'param2'],
//                   value: 'bar/param1/param2' }
```

You can also combine it with [minihash](https://github.com/bpierre/minihash):

```js
var miniroutes = require('miniroutes');
var minihash = require('minihash');

var routes = [ /* … */ ];

var hash = minihash('!/', miniroutes(routes, function(route) {
  console.log(route);
}));
```

## License

[MIT](http://pierre.mit-license.org/)


## Special thanks

Illustration made by [Raphaël Bastide](http://raphaelbastide.com/) with [scri.ch](http://scri.ch/).
