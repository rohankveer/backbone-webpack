var Book = Backbone.Model.extend({
    defaults: {
        ID: "",
        BookName: ""
    },

    idAttribute: "ID",

    initialize: function () {
        console.log('Book has been intialized');

        // Lets hook up some event handers to listen to model change
        this.on('change:BookName', function () {
            console.log('Message from specific listener: BookName has been changed');
        });

        this.on("invalid", function (model, error) {
            console.log("Houston, we have a problem: " + error)
        });
    },

    validate: function (attr) {
        if (attr.ID <= 0) {
            return "Invalid value for ID supplied."
        }
    },

    constructor: function (attributes, options) {
        console.log('Book\'s constructor had been called');
        Backbone.Model.apply(this, arguments);
    },

    showAlert: function () {
        alert('ID: ' + this.get('ID') + ', BookName: ' + this.get('BookName'));
    },

    // for CRUD operations

    // Lets create function which will return the custom URL based on the method type
    getCustomUrl: function (method) {
        switch (method) {
            case 'read':
                return 'http://localhost:51377/api/Books/' + this.id;
                break;
            case 'create':
                return 'http://localhost:51377/api/Books';
                break;
            case 'update':
                return 'http://localhost:51377/api/Books/' + this.id;
                break;
            case 'delete':
                return 'http://localhost:51377/api/Books/' + this.id;
                break;
        }
    },
    // Now lets override the sync function to use our custom URLs
    sync: function (method, model, options) {
        options || (options = {});
        options.url = this.getCustomUrl(method.toLowerCase());
        
        // Lets notify backbone to use our URLs and do follow default course
        return Backbone.sync.apply(this, arguments);
    }

});

module.exports = Book;