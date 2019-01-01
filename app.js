var express = require('express'),
app         = express(),
bodyParser  = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.redirect('/home')
});

app.get('/home', function(req, res){
    res.render('home');
});

app.listen(3000, process.env.IP, function(){
    console.log('Listening on localhost.')
});


