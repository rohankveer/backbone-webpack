var BooksCollection = require("./../collection/book");
var bookView = require("./../view/book");

var bookListView = Backbone.View.extend({
    model: BooksCollection,

    render: function() {
        this.$el.html(); // lets render this view
        
        var self = this;

        for(var i = 0; i < this.model.length; ++i) {
            // lets create a book view to render
            var m_bookView = new bookView({model: this.model.at(i)});

            // lets add this book view to this list view
            this.$el.append(m_bookView.$el); 
            m_bookView.render(); // lets render the book           
        } 
         return this;
    },
});

module.exports = bookListView;