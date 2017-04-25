var $ = require("jquery");
var Backbone = require("backbone");
var Book = require("./model/book");
import '../assets/styles/main.scss';
var BooksCollection = require("./collection/book");
var bookListView = require("./view/bookListView");
var book1 = new Book({ ID: 1, BookName: "Book 1" });
var book2 = new Book({ ID: 2, BookName: "Book 2" });
var book3 = new Book({ ID: 3, BookName: "Book 3" });
var book4 = new Book({ ID: 4, BookName: "Book 4" });
var book5 = new Book({ ID: 5, BookName: "Book 5" });
var bookCollection = new BooksCollection([book1, book2, book3, book4, book5]);
var bookList = null;

$(document).ready(function () {
    bookList = new bookListView({ el: $("#app"), model: bookCollection });
    bookList.render();
});