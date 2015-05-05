define(['backbone',
		'gmaps',
    'underscore',
    'views/toilets',
    'views/addtoiletbutton',
    'collections/toilets'
		], function(Backbone,
                gmaps,
                _,
                Toilets,
                AddToiletButton,
                ToiletCollection) {
  var App = Backbone.View.extend({

    el:document.body,
    map_el: document.getElementById("map"),
    add_toilet_button_id: "addtoilet",
    latitude: "",
    longitude: "",

    //Inits listener Events
    events: {
      "click #addtoilet" : "addtoilet"
    },

    initialize: function() {
      //Handle shared variables
      _.bindAll(this,'listener','error','getToilets');

      //Create Google Map
      var mapOptions = {
        center: new gmaps.LatLng(-34.397, 150.644),
        zoom: 16,
        mapTypeId: gmaps.MapTypeId.ROADMAP
      };
      this.map = new gmaps.Map(this.map_el, mapOptions);

      //Watches user location
      navigator.geolocation.watchPosition(this.listener,this.error, { enableHighAccuracy:true});

      
      //Adds "Add Toilet Button"
      this.addtoiletbutton = new AddToiletButton();
      this.addtoiletbutton.render();
      $(document.body).append(this.addtoiletbutton.el);

    },


    //Gets user location and calls for list of toilets
    listener: function(position){
        newPosition = new gmaps.LatLng(position.coords.latitude, position.coords.longitude);
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.map.setCenter(newPosition, 16);
        this.getToilets();
    },

    //Restful Call to application to create a new toilet
    addtoilet: function(e){
      e.preventDefault();
      this.newToilet = this.toilets.collection.create({
        name:"new toilet",
        latitude:this.latitude,
        longitude:this.longitude
      });
      this.newToilet.save({},{
        success:function(model,response){
          console.log('success');
          console.log(response);
        },
        error: function(model, response) {
          console.log('fail');
        }
      });

    },

    error: function(error){
          switch(error.code) {  
            case error.PERMISSION_DENIED: alert("user did not share geolocation data");  
            break;  
            case error.POSITION_UNAVAILABLE: alert("could not detect current position");  
            break;  
            case error.TIMEOUT: alert("retrieving position timed out");  
            break;  
            default: alert("unknown error");  
            break;  
          }  
    },

    //Gets toilets within range and adds to collection
    getToilets: function(){
        var self = this;
        this.toilets = new Toilets({
          collection: new ToiletCollection([]),
        });
        

        this.toilets.collection.fetch({
          data: {
            latitude: self.latitude,
            longitude: self.longitude
          },
          success: function() {
          //Loads succesful toilets to map
           self.toilets.collection.each(function(model) {
              model.cords = new gmaps.LatLng(model.get("latitude"), model.get("longitude"));
              model.marker = new gmaps.Marker({
                  position: model.cords,
                  title:model.get("name")
              });
              model.marker.setMap(self.map);
           });
          }
        },this);
    }


  });

  return App;
});