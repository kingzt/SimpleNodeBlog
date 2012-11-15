var Post = require('../models/post');
var Category = require('../models/category');
var sanitize = require('validator').sanitize;
/*
 * GET home page.
 */

exports.getPostList = function(req, res) {
	Post.find(function(err, posts) {
		if(err) {
			return res.end({
				status: 500
			}, JSON.stringify(err))
		}
		return res.end(JSON.stringify(posts));
	});
};

exports.createPost = function(req, res) {
	var post = new Post({
		title: sanitize(req.body.title).xss(),
		author: req.body.author ? sanitize(req.body.author).xss() : 'admin',
		slug: sanitize(req.body.slug).xss(),
		content: sanitize(req.body.content).xss(),
		category: (req.body.category && req.body.category !== []) ? req.body.category : ['uncategorized']
	});

	post.save(function(err) {
		if(!err) {
			return res.end('created');
		} else {
			return res.end({
				status: 500
			}, JSON.stringify(err));
		}
	});
};

exports.getPost = function(req, res) {
	Post.find({
		slug: req.params.slug
	}, function(err, posts) {
		if(err) {
			return res.end(error);
		}
		if(posts.length === 0) {
			return res.end('404');
		}
		return res.end(JSON.stringify(posts[0]));
	});
};

exports.updatePost = function(req, res) {
	Post.find({
		title: req.params.title
	}, function(err, product) {
		product.title = req.body.title;
		product.content = req.body.content;
		product.save(function(err) {
			if(err) {
				return res.end({
					status: 500
				}, JSON.stringify(err));
			}
			return res.end('success');
		});
	});
};

exports.deletePost = function(req, res) {
	Post.findOneAndRemove({slug: req.params.slug}, function(err) {
		res.end();
	});
};

exports.getCategoryList = function(req, res) {
	Category.find(function(err, categories) {
		if (err) {
			res.writeHead(500);
			return res.end();
		}
		return res.end(JSON.stringify(categories));
	});
};

exports.createCategory = function(req, res) {
	var category = new Category({
		name: sanitize(req.body.name).xss(),
		slug: sanitize(req.body.slug).xss(),
		description: sanitize(req.body.description).xss()
	});
	category.save(function(err) {
		if(err) {
			res.writeHead(500);
			return res.end(JSON.stringify(err));
		}
		return res.end();
	})
};

exports.getCategoryPosts = function(req, res) {
	Category.find({
		slug: req.params.slug
	}, function(err, categories) {
		if(err) {
			res.writeHead(500);
			return res.end(JSON.stringify(err));
		}
		if(categories.length == 0) {
			res.writeHead(404);
			return res.end();
		}
		Post.find({
			category: categories[0].slug
		}, function(err, posts) {
			if(err) {
				res.writeHead(500);
				return res.end(JSON.stringify(err));
			}
			return res.end(JSON.stringify(posts));
		});
	});
};

exports.updateCategory = function(req, res) {
	Category.findOne({slug: req.params.slug}, function(err, category) {
		if (err) {
			res.writeHead(500);
			return res.end(JSON.stringify(err));
		}
		if (!category) {
			res.writeHead(404);
			return res.end();
		}
		console.log(req.body.slug);
		category.name = req.body.name || category.name;
		category.slug = req.body.slug || category.slug;
		category.description = req.body.description || category.description;
		category.save(function(err) {
			if (err) {
				res.writeHead(500);
				return res.end(err);
			}
			return res.end();
		});
	})
};

exports.deleteCategory = function(req, res) {
	Category.findOneAndRemove({slug: req.params.slug}, function() {
		res.end();
	});
};