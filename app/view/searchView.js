var searchView = Backbone.View.extend({
    tagName: "div",
    className: "row",
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
            window.typingTimer = setTimeout(function(){
                console.log(_event.target.value);
            }, 1000);
        }
    }
});

module.exports = searchView;