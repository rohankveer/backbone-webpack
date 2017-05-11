var searchView = Backbone.View.extend({
    tagName: "div",
    className: "row",
    initialize: function(options){
        this.vent = options.vent;
    },
    render: function() {
        this.$el.html('<input type="text" id="search-box"></input>');
         return this;
    },
    events: {
      "keyup input[type=text]": "doSearch"
    },
    doSearch: function( event ){
        _event = event;
        if(_event.target.value != ""){
            clearTimeout(window.typingTimer);
            window.typingTimer = setTimeout(()=>{
                console.log(_event.target.value);
                this.vent.trigger('search_complete', _event.target.value);
            }, 1000);
        } else {
            this.vent.trigger('search_complete', "");
        }
    }
});

module.exports = searchView;