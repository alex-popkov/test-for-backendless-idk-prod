var express = require('express'),
    bodyParser = require('body-parser'),
    http = require('http'),
    path = require('path'),
    _ = require('lodash'),
    fs = require( 'fs' );
    
var app = module.exports = express();
app.set('port', process.env.PORT || 8000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, '')));

var data = fs.readFileSync( 'tabs.json', 'utf8');

// server API
app.route('/api/json')
    .get( function( req, res ){

        res.json( data );
    });

// Redirect all non api requests to the index
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'sources', 'index.html'));
});

// Starting express server
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});