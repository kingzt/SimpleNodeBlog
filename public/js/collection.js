window.BlogCollection = Backbone.Collection.extend({
	url: '/api/post',
});

window.CategoryCollection = Backbone.Collection.extend({
	url: '/api/category'
});