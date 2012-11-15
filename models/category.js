var db = require('./db');
var Schema = require('mongoose').Schema;

var categorySchema = new Schema({
	name: {type: String, required: true, unique: true},
	slug: {type: String, required: true, unique: true},
	description: String
})

var Category = db.model('categorySchema', categorySchema);

module.exports = Category;