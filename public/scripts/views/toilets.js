define(['backbone',
		'views/toilet'
		], function(Backbone,ToiletView) {
  var Toilets= Backbone.View.extend({
    initialize: function() {
    	//this.collection.fetch();
    	//this.renderAll();

    },
    renderAll: function(){
    	//this.collection.each(this.render, this);
    },
    render: function(toilet){
    	//var toiletView = new ToiletView({ model:toilet });
    	return this;
    }

  });

  return Toilets
});