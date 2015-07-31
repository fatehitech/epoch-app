angular.module('filters.date', [])

.filter('date', function() {
  return function(items, attr) {
    return items.map(function(i) {
      i[attr] = new Date(i[attr])
      return i;
    });
  }
})

