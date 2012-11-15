/**
 * Module dependencies.
 */

var express = require('express'),
  apiRoutes = require('./routes/api'),
  routes = require('./routes'),
  http = require('http'),
  path = require('path');

var app = express();

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(routes.setLocalVariableRecentPosts);
  app.use(routes.setLocalVariableCategories);
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(routes.error404);
});

// app.configure('development', function() {
//   app.use(express.errorHandler());
// });

/*
api routes
*/
app.get('/api/post', apiRoutes.getPostList);
app.post('/api/post', apiRoutes.createPost);

app.get('/api/post/:slug', apiRoutes.getPost);
app.put('/api/post/:slug', apiRoutes.updatePost);
app.delete('/api/post/:slug', apiRoutes.deletePost);

app.get('/api/category', apiRoutes.getCategoryList);
app.post('/api/category', apiRoutes.createCategory);

app.get('/api/category/:slug', apiRoutes.getCategoryPosts);
app.put('/api/category/:slug', apiRoutes.updateCategory);
app.delete('/api/category/:slug', apiRoutes.deleteCategory);

// normal routes
app.get('/index', routes.index);
app.get('/blog/:slug', routes.getPost);
app.get('/category/:slug', routes.getCategoryPosts);
app.get('/archives', routes.archives);

app.get('/aboutme', routes.aboutme);
app.get('/blogadmin', routes.admin);

http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});