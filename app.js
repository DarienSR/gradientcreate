var express = require('express'),
app         = express(),
bodyParser  = require('body-parser'),
mongoose    = require('mongoose');

mongoose.connect('mongodb://localhost:27017/gradientcreate', { useNewUrlParser: true});
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


