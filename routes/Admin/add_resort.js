const express = require('express')
const router = express.Router();
const { Resorts } = require('./../../models/resorts');

router.route('/')
	.get((req,res,next) => {
		res.render('index',{
			layout: 'layout',
			title: 'Add Resorts'
		})
	})
	.post((req,res,next) => {

		const resortName = req.body.resortName;
		const resortLocation = req.body.resortLocation;
		const logitude = req.body.logitude;
		const latitude = req.body.latitude;
		const ratePerDay = req.body.ratePerDay;
		const image = req.body.image;
		const resortDescription = req.body.resortDescription;
		const dateCreated = req.body.dateCreated;

		const resort = new Resorts({
			resortName: resortName,
			resortLocation: resortLocation,
			logitude: logitude,
			latitude: latitude,
			ratePerDay: ratePerDay,
			image: image,
			resortDescription: resortDescription,
			dateCreated: dateCreated
		});

		resort.save((err, savedResort) => {
			if (err) {
				res.render('index',{
					layout: 'layout',
					title: 'Add Resorts',
					error: err.message
				})
			} else {
				res.render('index',{
					layout: 'layout',
					title: 'Add Resorts',
					data: savedResort
				})
			}
		})
	})
	.patch((req,res,next) => {

		const rid = req.body.resortId;
		const ratings = req.body.ratings;
		const likes = req.body.likes;

		Resorts.findOneAndUpdate({
			'_id': rid
		},{
			$set: {
				'ratings': ratings,
				'likes': likes
			}
		},{
			new: true
		},(err, updatedResort) => {
			if (err) {
				res.render('index',{
					layout: 'layout',
					title: 'Add Resorts',
					error: err.message
				})
			} else {
				res.render('index',{
					layout: 'layout',
					title: 'Add Resorts',
					data: updatedResort
				})
			}
		})
	})
	.delete((req,res,next) => {
		const rid = req.body.resortId;

		Resorts.findOneAndDelete({
			'_id': rid
		},(err, isDeleted) => {
			if (error) {
				res.render('index',{
					layout: 'layout',
					title: 'Add Resorts',
					error: err.message
				})
			} else {
				Resorts.find({

				},(error,resorts) => {
					if (error) {
						console.log(error.message);
						res.end();
					} else {
						res.render('index',{
							layout: 'layout',
							title: 'Add Resorts',
							data: resorts
						})
					}
				})
			}
		})
	})

module.exports = router;
