var express = require('express'),
    user = require('./routes/users'),
    fs = require('fs');
 
var app = express();

app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(__dirname));

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
	app.use(app.router);
	app.use(express.static(__dirname));
});

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8000");
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  next();
});
 
app.get('/users', user.findAll);
app.get('/users/:id', user.findById);
app.post('/users', user.addUser);
// app.post('/upload', user.upload);
app.put('/users/:id', user.updateUser);
app.post('/user_login',user.login);
app['delete']('/users/:id', user.deleteUser);
 
app.listen(3000);
console.log('Listening on port 3000...');


