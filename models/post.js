var db = require('./db');
var Schema = require('mongoose').Schema;

var blogSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	slug: {
		type: String,
		required: true,
		unique: true
	},
	author: {
		type: String,
	default:
		'miloz'
	},
	content: {
		type: String,
		required: true
	},
	post_date: {
		type: Date,
	default:
		Date.now
	},
	last_modified: {
		type: Date,
	default:
		Date.now
	},
	category: [String],
	tags: {
		type: [String]
	}
});

var Post = db.model('Post', blogSchema);

module.exports = Post;