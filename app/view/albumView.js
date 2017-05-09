var Album = require("./../model/albumModel");

var albumView = Backbone.View.extend({
    tagName: "div",
    className:"col-3",
    model: Album,
    template: _.template("<a href='#album/<%= albumID %>'><img src=<%= imgurl %> /></a>"),
    render: function (){
        this.$el.html(this.template({albumID: this.model.get("ID"),imgurl: this.model.get("AlbumImage")}));
        return this;
    }
});

module.exports = albumView;