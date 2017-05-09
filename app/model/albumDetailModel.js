var Album = Backbone.Model.extend({
    defaults: {
        ID: "",
        AlbumImage: "",
        Description: "",
        Title: ""
    },

    idAttribute: "ID",

    initialize: function () {
        
    },

    validate: function (attr) {
        if (attr.ID <= 0) {
            return "Invalid value for ID supplied."
        }
    },

    constructor: function (attributes, options) {
        Backbone.Model.apply(this, arguments);
    },

    showAlert: function () {
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

module.exports = Album;