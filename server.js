var express = require('express'),
    user = require('./routes/users');
 
var app = express();
 
app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8000");
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

app.get('/users', user.findAll);
app.get('/users/:id', user.findById);
app.post('/users', user.addUser);
app.put('/users/:id', user.updateUser);
app['delete']('/users/:id', user.deleteUser);
 
app.listen(3000);
console.log('Listening on port 3000...');
