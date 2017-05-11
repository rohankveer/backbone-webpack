var $ = require("jquery");
var Backbone = require("backbone");
var Album = require("./model/albumModel");
var AlbumDetail = require("./model/albumDetailModel");
var AlbumCollection = require("./collection/albumCollection");
var homeView = require("./view/homeView")
var searchView = require("./view/searchView")
var albumDetailView = require("./view/albumDetailView")
var config = require('./../config.json');
import '../assets/styles/main.scss';
import axios from 'axios';
var vent = {};
_.extend(vent, Backbone.Events);

// define routes
var AppRouter = Backbone.Router.extend({
    routes: {
        "album/:albumId": "getAlbum",
        "*actions": "defaultRoute" 
        // Backbone will try to match the route above first
    }
});
// Instantiate the router
var app_router = new AppRouter;
app_router.on('route:getAlbum', function (albumId) {

    // clear previous contents 
    document.getElementById("app").innerHTML = "";
    // fetch album details
    axios.get(config.getTracks + albumId + '?client_id=f4323c6f7c0cd73d2d786a2b1cdae80c')
        .then(function (response) {
            var albumDetails = response.data;
            var albumModel = new AlbumDetail({ ID: albumDetails.id, AlbumImage: albumDetails.artwork_url, Description: albumDetails.description, Title: albumDetails.title});
            var albumView = new albumDetailView({ model: albumModel });
            albumView.render();
            document.getElementById("app").appendChild(albumView.el);
        })
        .catch(function (error) {
            console.log(error);
        });
     
});
app_router.on('route:defaultRoute', function (actions) {
    // clear previous contents 
    document.getElementById("app").innerHTML = "";
    // append search box here
    var searchBox = new searchView({vent:vent});
    searchBox.render();
    document.getElementById("app").appendChild(searchBox.el);
    // fetch albums
    axios.get(config.getTracks + "?linked_partitioning=1&client_id=f4323c6f7c0cd73d2d786a2b1cdae80c&limit=50&offset=0&tags=house")
        .then(function (response) {
            var albumsArray = response.data.collection;
            // create a collection for albums
            var albumCollection;
            albumsArray.forEach((albumData,index)=>{
                // create collection for each 4 albums
                if((index % 3) == 0)
                    albumCollection = new AlbumCollection();
                // create model for each album
                if(albumData.artwork_url != null){
                    var album = new Album({ ID: albumData.id, AlbumImage: albumData.artwork_url });
                    // push into album collection
                    albumCollection.push(album);
                }
                if(albumCollection.length == 3){
                    var albumList = new homeView({ model: albumCollection });
                    albumList.render();
                    document.getElementById("app").appendChild(albumList.el);
                }
            });
        })
        .catch(function (error) {
            console.log(error);
        });
        // listening to search event
        vent.on('search_complete', (searchValue)=>{
            $('.album-row').remove();
             axios.get(config.getTracks + "?linked_partitioning=1&client_id=f4323c6f7c0cd73d2d786a2b1cdae80c&limit=50&offset=0&tags=house")
                .then((response) => {
                    var albumsArray = response.data.collection;
                    // filter array
                    albumsArray = albumsArray.filter((arrayData)=>{
                        return arrayData.title.includes(searchValue);
                    });
                    // create a collection for albums
                    var albumCollection;
                    albumsArray.forEach((albumData,index)=>{
                        // create collection for each 4 albums
                        if((index % 3) == 0)
                            albumCollection = new AlbumCollection();
                        // create model for each album
                        if(albumData.artwork_url != null){
                            var album = new Album({ ID: albumData.id, AlbumImage: albumData.artwork_url });
                            // push into album collection
                            albumCollection.push(album);
                        }
                        if((albumCollection.length % 3) == 0 || (albumCollection.length == albumsArray.length)){
                            var albumList = new homeView({ model: albumCollection });
                            albumList.render();
                            document.getElementById("app").appendChild(albumList.el);
                        }
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
});
// Start Backbone history a necessary step for bookmarkable URL's
Backbone.history.start();
