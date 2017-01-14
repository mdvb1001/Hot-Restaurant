var express = require('express');
var app = express();
var path = require('path');
var mysql = require('mysql');
var password = require('./password.js');
var bodyParser = require('body-parser');
var PORT = 3000;
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: password.mySqlPw.password,
    database: "hot_restaurant_DB"
});

connection.connect(function(err) {
    if (err) throw err;
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));



app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/tables', function(req, res) {
    res.sendFile(path.join(__dirname, 'tables.html'));
});

app.get('/reserve', function(req, res) {
    res.sendFile(path.join(__dirname, 'reservation.html'));
});

app.get('/api/tables', function(req, res) {
    connection.query("SELECT * FROM reservations", function(err, data) {
        if (err) throw err;
        res.end(JSON.stringify(data))
;
    });
});

app.post('/api/tables', function(req, res) {
    var newRes = req.body;

    connection.query("SELECT * FROM reservations", function(err, res) {
        if (res.length < 5) {
            connection.query("INSERT INTO reservations SET ?", {
                customer_name: newRes.name,
                phone_number: newRes.phone,
                email: newRes.email,
                unique_id: newRes.id
            }, function(err, res) {
                if (err) throw err;
            });
        } else {
            connection.query("INSERT INTO waitlist SET ?", {
                customer_name: newRes.name,
                phone_number: newRes.phone,
                email: newRes.email,
                unique_id: newRes.id
            }, function(err, res) {
                if (err) throw err;
            });
        }
    });
});



app.get('/api/waitlist', function(req, res) {
    connection.query("SELECT * FROM waitlist", function(err, data) {
        if (err) throw err;
        res.end(JSON.stringify(data));
    });
});





app.listen(PORT, function() {
    console.log('Listening on port: ' + PORT);
});
