var Book = require("./../model/book");

var bookView = Backbone.View.extend({
    tagname: "li",
    model: Book,
    render: function (){
        this.$el.html('<li>' + this.model.get("BookName") + '</li>');
        return this;
    }
});

module.exports = bookView;