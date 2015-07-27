var endpoint = null

var Promise = require('bluebird');

var needle = Promise.promisifyAll(require('needle'));

var credentials = null;

module.exports = function(_endpoint, _credentials) {
  endpoint = _endpoint;
  credentials = _credentials;
  return api;
}

var api = {}

var url = function(path) {
  return endpoint+path;
}

var opts = null;

api.setToken = function(token) {
  opts = { headers: { Authorization: 'Bearer '+token } }
}

api.endpoint = function() {
  return endpoint;
}

api.request = function(method, path, data) {
  return needle.requestAsync(method, url(path), data, opts).spread(function(res) {
    return [res.statusCode, res.body];
  });
}

api.get = function(path) {
  return api.request('get', path, null);
}

api.put = function(path, data) {
  return api.request('put', path, data);
}

api.post = function(path, data) {
  return api.request('post', path, data);
}

api.initialize = function() {
  return api.post('/initialize').spread(function(statusCode, body) {
    if (statusCode !== 200) throw new Error(body.error);
    return body;
  })
}

api.session = {};

api.session.create = function(user, pass) {
  var creds = { email: user, password: pass };
  return api.post('/session', creds).spread(function(statusCode, body) {
    if (statusCode !== 201) throw new Error('Unauthorized');
    api.setToken(body.token);
    return body;
  });
}

