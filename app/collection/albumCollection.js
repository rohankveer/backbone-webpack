var Album = require("./../model/albumModel");

var AlbumsCollection = Backbone.Collection.extend({
    model: Album,
    initialize: function () {
    
        // This will be called when an item is added. pushed or unshifted
        this.on('add', function(model) {
        });
        // This will be called when an item is removed, popped or shifted
        this.on('remove',  function(model) {
        });
        // This will be called when an item is updated
        this.on('change', function(model) {
        });
    },
});

module.exports = AlbumsCollection;