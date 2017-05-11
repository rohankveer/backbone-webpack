var AlbumsCollection = require("./../collection/albumCollection");
var albumView = require("./albumView");

var albumListView = Backbone.View.extend({
    model: AlbumsCollection,
    tagName: "div",
    className: "row album-row",
    render: function() {
 
        for(var i = 0; i < this.model.length; ++i) {
            var m_albumView = new albumView({model: this.model.at(i)});

            // lets add this album view to this list view
            this.$el.append(m_albumView.$el); 
            m_albumView.render(); // lets render the album           
        } 
         return this;
    },
});

module.exports = albumListView;