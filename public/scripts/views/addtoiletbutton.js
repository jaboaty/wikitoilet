define(['backbone'
		], function(Backbone) {
  var Addtoiletbutton = Backbone.View.extend({
  	tagName:'input',
  	attributes: {
        type: 'submit'
    },
  	id: 'addtoilet',
  	template: _.template("Hero"),

    initialize: function() {
    	//this.render();
    },
    render: function(){
    	this.$el.html(this.template());
    	return this;
    }

  });

  return Addtoiletbutton;
});