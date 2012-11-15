window.GeneralView = Backbone.View.extend({
	initialize: function() {
		this.render();
	},
	render: function() {
		console.log(this.model.toJSON());
		$(this.el).html(this.template({model: this.model.toJSON()}));
	}
});

window.BlogView = GeneralView.extend();
window.BlogListView = GeneralView.extend();
window.CategoryListView = GeneralView.extend();
window.RecentPostView = GeneralView.extend();

window.AboutView = GeneralView.extend({
	render: function() {
		$(this.el).html(this.template());
	}
});