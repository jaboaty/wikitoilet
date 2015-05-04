require.config({
  paths: {
    'jquery': 'vendor/jquery/jquery',
    'underscore': 'vendor/underscore-amd/underscore',
    'backbone': 'vendor/backbone-amd/backbone',
    'async' : 'vendor/requirejs-plugins/src/async',
    'goog' : 'vendor/requirejs-plugins/src/goog',
    'propertyParser' : 'vendor/requirejs-plugins/src/propertyParser'
	
  },
  shim: {
    'backbone': {
	    deps: ['underscore', 'jquery'],
        exports: 'Backbone'
    },
    'underscore': {
        exports: '_'
    }
  }
});


define('gmaps', ['async!http://maps.google.com/maps/api/js?v=3&sensor=true'],
function(){
    return window.google.maps;
});


require([
  'views/app'

  ], function(App) {

    var app = new App;

});

