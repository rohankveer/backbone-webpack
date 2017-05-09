var AlbumDetail = require("./../model/albumDetailModel");

var albumDetailView = Backbone.View.extend({
    tagName: "div",
    className:"album-detail",
    model: AlbumDetail,
    template: _.template("<div class='title'><%= albumTitle %></div><img src=<%= imgurl %> /><div class='description'><%= albumDescription %></div>"),
    render: function (){
        this.$el.html(this.template({imgurl: this.model.get("AlbumImage"),albumDescription: this.model.get("Description"),albumTitle:this.model.get("Title")}));
        return this;
    }
});

module.exports = albumDetailView;