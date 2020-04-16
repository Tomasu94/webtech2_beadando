var express= require("express");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var app= express();

app.get('/index.html', function (req, res) {
    res.sendFile(__dirname + "/stuffs/" + "index.html");
});

var server= app.listen(8081, function(){

    var host = server.address().host;
    var port = server.address().port;
    console.log("App listening at http://%d%d", host, port);
});

app.use(express.static(__dirname + '/stuffs'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.get('/books', function (req, res) {
    res.send(books);
});

var books= [
    {
        "title": "The Count of Monte Cristo",
        "author": "Alexandre Dumas",
        "type": "Adventure",
        "year": "1844"
    },

    {
        "title": "Strange Case of Dr Jekyll and Mr Hyde",
        "author": "Robert Louis Stevenson",
        "type": "Horror",
        "year": "1886"
    },

    {
        "title": "L'Étranger",
        "author": "Albert Camus",
        "type": "Philosophical",
        "year": "1942"
    },

    {
        "title": "The Master and Margarita",
        "author": "Mikhail Bulgakov",
        "type": "Supernatural",
        "year": "1967"
    }
];

app.post('/addBooks', function (req, res) {
    for (var book of books) {
        if (book.title === req.body.title) {
            res.status(409).end();
            return;
        }
    }
    var bookJSON = {
        "title":req.body.title,
        "author":req.body.author,
        "type":req.body.type,
        "year":req.body.year,
    };
    books.push(bookJSON);
    res.send(books);
});
