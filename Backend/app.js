var http = require('http'),
    path = require('path'),
    methods = require('methods'),
    express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cors = require('cors'),
    passport = require('passport'),
    errorhandler = require('errorhandler'),
    mongoose = require('mongoose');
    fs = require('fs');
    router= express.Router();
var isProduction = process.env.NODE_ENV === 'production';

var app = express();

app.use(cors());

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));



app.use(session({ secret: 'delivery', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));


  app.use(errorhandler());

  mongoose.connect('mongodb://admin:password123@ds223268.mlab.com:23268/doorstep',{useNewUrlParser:true});
  mongoose.set('debug', true);
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);


require('./models/User');

require('./config/passport');

app.use(require('./routes'));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  if(req.accepts('html')){
    fs.readFile(__dirname + '/public/error/index.html', 'utf-8',function(err,page){
      res.writeHead(404, {'Content-Type':'text/html'});
      res.write(page);
      res.end();
    });
  }
  // next(err);
});

/// error handlers
// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });
}

// production error handler

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});

app.get('*',function(req,res){
  res.sendFile(path.join(__dirname +'/public/index.html'));
})

var server = app.listen( process.env.PORT || 8080, function(){
  console.log('Listening on port ' + server.address().port);
});
