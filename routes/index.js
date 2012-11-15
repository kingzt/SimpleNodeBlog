var Post = require('../models/post');
var Category = require('../models/category');

exports.setLocalVariableRecentPosts = function(req, res, next) {
	Post.find().sort('post_date').limit(10).exec(function(err, posts) {
		if(err) {
			return next();
		}
		res.locals.recentPosts = posts;
		next();
	});
};

exports.setLocalVariableCategories = function(req, res, next) {
	Category.find(function(err, categories) {
		if(err) {
			return next();
		}
		res.locals.categories = categories;
		next();
	});
};

exports.index = function(req, res, next) {
	Post.find(function(err, posts) {
		if(err) {
			return next();
		}
		return res.render('index', {
			'title': 'Node Blog',
			'posts': posts
		});
	});
};

exports.getPost = function(req, res, next) {
	Post.find({
		slug: req.params.slug
	}, function(err, posts) {
		if(err) {
			return next();
		}
		if(posts.length === 0) {
			return next();
		}
		res.render('post', {
			post: posts[0],
			title: posts[0].title
		});
	});
};

exports.getCategoryPosts = function(req, res, next) {
	Category.find({
		slug: req.params.slug
	}, function(err, categories) {
		if(err) {
			return next();
		}
		if(categories.length == 0) {
			return next();
		}
		Post.find({
			category: categories[0].slug
		}, function(err, posts) {
			if(err) {
				return next();
			}
			return res.render('index', {
				categoryName: categories[0].name,
				posts: posts,
				title: categories[0].name
			});
		});
	});

};

exports.error404 = function(req, res) {
	return res.render('404', {title: '404 not found'});
};

exports.archives = function(req, res) {

};

exports.admin = function(req, res) {
	return res.render('admin');
}