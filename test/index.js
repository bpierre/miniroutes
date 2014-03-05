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
    value: 'abc'
  };
  routing('abc');

  expected = {
    name: 'foo',
    params: [],
    value: 'foo'
  };
  routing('foo');

  expected = {
    name: 'foo',
    params: [],
    value: 'foo/'
  };
  routing('foo/');

  expected = {
    name: null,
    params: [],
    value: 'foo/abc'
  };
  routing('foo/abc');

  expected = {
    name: 'bar',
    params: ['abc', 'def'],
    value: 'bar/abc/def'
  };
  routing('bar/abc/def');

  expected = {
    name: 'bar',
    params: ['abc', null],
    value: 'bar/abc'
  };
  routing('bar/abc');

  expected = {
    name: 'bar',
    params: [null, null],
    value: 'bar'
  };
  routing('bar');
});
