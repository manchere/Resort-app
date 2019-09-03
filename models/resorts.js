const mongoose = require('mongoose')

const resortShema = mongoose.Schema({

	resortName: {
		type: String,
		required: true
	},

	rcountry: {
		type: String,
		required: true
	},

	rregion: {
		type: String,
		required: true
	},

	rcity: {
		type: String,
		required: true
	},

	locationCoordinate: {
		logitude: {
			type:String,
			defaut: -0
		},
		latitude: {
			type: String,
			defaut: 0
		}
	},

	ratePerDay: {
		type: String,
		required: true
	},

	ratings: {
		type: Number,
		min: 0,
		max: 5,
		defaut: 0
	},

	likes: {
		type: Number,
		min: 0,
		defaut: 0
	},

	image: {
		type: String,
		required: true
	},

	resortDescription: {
		type: String,
		required: true
	},

	dateCreated: {
		type: String,
		required: false
	}
});

const Resorts = mongoose.model('Resorts', resortShema);
module.exports = { Resorts };
