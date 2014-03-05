/*
 * Mini routing system
 *
 * Usage:
 *
 * var miniroutes = require('miniroutes');
 *
 * var paths = [
 *
 *   // Match '', 'search', 'search/<anything>'
 *   [ 'search', /^(?:search(?:\/(.+))?)?$/ ],
 *
 *   // Match 'page2'
 *   [ 'page2', /^page2$/ ]
 *
 * ];
 *
 * var routing = miniroutes(paths, function(route) {
 *   console.log(route); // matched route
 * });
 *
 * routing('search'); // { 'name': 'search', params: [] }
 * routing('search/test'); // { 'name': 'search', params: ['test'] }
 *
 * Use the minihash module to feed miniroutes:
 *
 * var minihash = require('minihash');
 * var hash = minihash('!/', routing);
 *
 */

module.exports = function createRouting(paths, cb) {
  return function updatePath(path) {
    cb(getRoute(paths, path));
  };
}

function matches(re, path) {
  var matches = re.exec(path);
  if (matches === null) return null;
  matches = matches.slice(1);
  matches = matches.map(function(val) {
    if (typeof val === 'undefined') return null;
    return val;
  });
  return matches;
}

function getRoute(paths, value) {
  var route = {
    name: null,
    params: [],
    value: value
  };
  for (var i=0, l = paths.length, params; i < l; i++) {
    // Valid path found
    params = matches(paths[i][1], value);
    if (params !== null) {
      route.name = paths[i][0];
      route.params = params;
      break;
    }
  }
  return route;
};
