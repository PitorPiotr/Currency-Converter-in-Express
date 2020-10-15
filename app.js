//https://free.currconv.com/api/v7/convert?q=USD_PHP&compact=ultra&apiKey=ca6e7dfd6bb952e8bb23

var express = require("express");
var app = express();
var request = require("request");
var path = require('path');
app.set("view engine", "ejs");

app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res) {
    res.render("search");
});


app.get("/results", function(req, res) {
    var howMuch = req.query.amount;
    var fromCurr = req.query.search;
    var toCurr = req.query.search2;
    var url = "https://free.currconv.com/api/v7/convert?q=" + fromCurr + "_" + toCurr + "&compact=ultra&apiKey=ca6e7dfd6bb952e8bb23";
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body)
            var count = data[fromCurr + "_" + toCurr]

            //res.send(data[query]);
            res.render("results", { count: count, howMuch: howMuch, toCurr: toCurr, fromCurr: fromCurr })

        }
    });
});

app.listen(3000, process.env.IP, function() {
    console.log("Currency converter has started!");
})