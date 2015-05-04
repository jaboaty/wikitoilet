define(['backbone', 
		'models/toilet'
		], function(Backbone,ToiletModel) {

  var Toilets = Backbone.Collection.extend({

  	model: ToiletModel,
  	url: '/toilets',

  });

  return Toilets
});