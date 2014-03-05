var minihash = require('minihash');
var miniroutes = require('../');

var hashField = document.querySelector('#hash');
var routeName = document.querySelector('#route-name');
var routeParams = document.querySelector('#route-params');
var routeValue = document.querySelector('#route-value');

var routes = [
  [ 'foo', /^foo\/?$/ ],
  [ 'bar', /^bar(?:\/([^\/]+))?(?:\/([^\/]+))?\/?$/ ]
];

var routing = miniroutes(routes, function(route) {
  routeName.value = JSON.stringify(route.name);
  routeParams.value = JSON.stringify(route.params);
  routeValue.value = JSON.stringify(route.value);
});

var hash = minihash('!/', function(value) {
  hashField.value = value;
  routing(value);
});

hashField.addEventListener('input', function() {
  if (this.value === hash.value) return;
  hash.value = this.value;
});
