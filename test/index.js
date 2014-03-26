var test = require('tape');
var miniroutes = require('../');

test('miniroute matches', function(t) {
  t.plan(7);

  var expected = null;
  var routing = miniroutes([
    [ 'foo', /^foo\/?$/ ],
    [ 'bar', /^bar(?:\/([^\/]+))?(?:\/([^\/]+))?\/?$/ ]
  ], function(route) {
    t.deepEqual(route, expected);
  });

  expected = {
    name: null,
    params: [],
    path: 'abc'
  };
  routing('abc');

  expected = {
    name: 'foo',
    params: [],
    path: 'foo'
  };
  routing('foo');

  expected = {
    name: 'foo',
    params: [],
    path: 'foo/'
  };
  routing('foo/');

  expected = {
    name: null,
    params: [],
    path: 'foo/abc'
  };
  routing('foo/abc');

  expected = {
    name: 'bar',
    params: ['abc', 'def'],
    path: 'bar/abc/def'
  };
  routing('bar/abc/def');

  expected = {
    name: 'bar',
    params: ['abc', null],
    path: 'bar/abc'
  };
  routing('bar/abc');

  expected = {
    name: 'bar',
    params: [null, null],
    path: 'bar'
  };
  routing('bar');
});
