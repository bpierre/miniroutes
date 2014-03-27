var test = require('tape');
var miniroutes = require('../');

test('miniroute matches', function(t) {

  var routes = [
    [ 'foo', /^foo\/?$/ ],
    [ 'bar', /^bar(?:\/([^\/]+))?(?:\/([^\/]+))?\/?$/ ]
  ];

  var tests = [

    ['abc', function(route, previous) {
      t.deepEqual(route, {
        name: null,
        params: [],
        path: 'abc'
      }, 'the previous route should be null when the first route is set');
    }],

    ['abc', function(route, previous) {
      t.deepEqual(route, {
        name: null,
        params: [],
        path: 'abc'
      }, 'an unmatched path should return null');
    }],

    ['foo', function(route) {
      t.deepEqual(route, {
        name: 'foo',
        params: [],
        path: 'foo'
      }, 'a matched path should return the corresponding route');
    }],

    ['bar/abc/def', function(route) {
      t.deepEqual(route, {
        name: 'bar',
        params: ['abc', 'def'],
        path: 'bar/abc/def'
      }, 'matched params should be in the params array');
    }],

    ['bar/abc', function(route) {
      t.deepEqual(route, {
        name: 'bar',
        params: ['abc', null],
        path: 'bar/abc'
      }, 'a reserved but unmatched param should be null');
    }],

    ['bar', function(route) {
      t.deepEqual(route, {
        name: 'bar',
        params: [null, null],
        path: 'bar'
      }, 'the params array should always match the number of capturing groups');
    }],

    ['baz', function(route, previous) {
      t.deepEqual(previous, {
        name: 'bar',
        params: [null, null],
        path: 'bar'
      }, 'the previous route should be passed as a second parameter');
    }]
  ];

  var i = 0;
  var routing = miniroutes(routes, function(route, previous) {
    tests[i][1](route, previous);
    if (i >= tests.length-1) return t.end();
    routing(tests[++i][0]);
  });
  routing(tests[i][0]);
});
