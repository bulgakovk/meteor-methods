

Package.describe({
  name:     "bulgakovk:callall",
  version:  "0.9.0",
  summary:  "Advanced version of anti:methods.Call client methods from the server",
  git:      "https://github.com/bulgakovk/meteor-methods",
});



Package.on_use(function (api, where) {

  api.versionsFrom('0.9.0');
  
  api.use('deps', ['client', 'server']);
  api.use('mongo-livedata', ['client', 'server']);
  
  api.add_files([
    'files/_.js',
    'files/_database.js',
  ], [
    'client',
    'server',
  ]);

  api.add_files([
    'files/publish.js',
    'files/call.js',
    'files/cleanup.js',
  ], [
    'server',
  ]);

  api.add_files([
    'files/methods.js',
    'files/subscribe.js',
    'files/receive.js',
  ], [
    'client',
  ]);

});



