define(['backbone'
		], function(Backbone) {
  var Toilet = Backbone.Model.extend({
    defaults:{
      name: 'Location',
      description: '',
      latitude: 0,
      longitude: 0
    },
    initialize: function() {
 
    }
  });

  return Toilet;
});