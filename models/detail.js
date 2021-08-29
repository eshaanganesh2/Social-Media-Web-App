const mongoose = require('mongoose');

const Detail = mongoose.model('Detail', { 
	username: {
		type: String, 
		required: true
	},
	password: {
		type: String,
		required: true
	},
	business: {
		type: Number,
		default: 0
	},
	technology: {
		type: Number,
		default: 0
	},
	health: {
		type: Number,
		default: 0
	},
	science: {
		type: Number,
		default: 0
	},
	sport: {
		type: Number,
		default: 0
	},
	entertainment: {
		type: Number,
		default: 0
	}

 });

 module.exports=Detail;