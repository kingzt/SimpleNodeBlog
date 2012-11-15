window.utils = {
	loadTemplate: function(views, callback) {
		var deferreds = [];

		$.each(views, function(index, view) {
			if(window[view]) {
				deferreds.push($.get('templates/' + view + '.html', function(data) {
					window[view].prototype.template = _.template(data);
				}));
			} else {
				alert(view + " not found");
			}
		});

		$.when.apply(null, deferreds).done(callback);
	}
}

var AppRouter = Backbone.Router.extend({

	routes: {
		"": "index",
		"blog/:slug": "blog",
		"category/:slug": "category",
		"about": "about"
	},

	initialize: function() {
		var categoryList = new CategoryCollection();
		categoryList.fetch({
			success: function() {
				this.categoryView = new CategoryListView({
					model: categoryList
				});
				$('#categories-2').html(this.categoryView.el);
			}
		});

		var recentPostList = new BlogCollection();
		recentPostList.fetch({
			success: function() {
				this.recentPostView = new RecentPostView({
					model: recentPostList
				});
				$('#recent-posts-2').html(this.recentPostView.el);
			}
		});
	},

	index: function() {
		var blogList = new BlogCollection();
		blogList.fetch({
			success: function() {
				$('#content').html(new BlogListView({
					model: blogList
				}).el);
			}
		});
	},

	blog: function(slug) {
		var blog = new Blog();
		blog.fetch({
			url: '/api/post/' + slug,
			success: function() {
				$("#content").html(new BlogView({
					model: blog
				}).el);
			}
		});
	},

	category: function(slug) {
		console.log(slug);
		var categoryPosts = new BlogCollection();
		categoryPosts.fetch({
			url: '/api/category/' + slug,
			success: function() {
				console.log(categoryPosts.toJSON());
				$('#content').html(new BlogListView({
					model: categoryPosts
				}).el);
			}
		});
	},

	about: function() {
		if(!this.aboutView) {
			this.aboutView = new AboutView();
		}
		$('#content').html(this.aboutView.el);
	}

});

utils.loadTemplate(['BlogListView', 'BlogView', 'CategoryListView', 'RecentPostView', 'AboutView'], function() {
	app = new AppRouter();
	Backbone.history.start();
});