const express = require('express')
const router = express.Router();
const { Resorts } = require('./../../models/resorts');

router.route('/addresort')
	.get((req,res,next) => {
		res.render('Pages/addresort', {
			layout: 'Layouts/dashboard_layout',
			title: 'Admin - Add Resort'
		});
	})
	.post((req,res,next) => {

		console.log(req.body);

		// resort
		const resortName = req.body.resortName;
		const ratePerDay = req.body.ratePerDay;
		const image = req.body.image;
		const resortDescription = req.body.resortDescription;
		const dateCreated = req.body.dateCreated;

		// location
		const resortCountry = req.body.rcountry;
		const resortRegion = req.body.rregion;
		const resortCity = req.body.rcity;
		const locationCoordinate = req.body.locationCoordinate;

		const latlong = locationCoordinate.split(",");

		const resort = new Resorts({
			resortName: resortName,
			ratePerDay: ratePerDay,
			image: image,
			resortDescription: resortDescription,
			dateCreated: dateCreated,

			rcountry: resortCountry,
			rregion: resortRegion,
			rcity: resortCity,
			locationCoordinate: {
				logitude: latlong[1],
				latitude: latlong[0],
			}
		});

		resort.save((err, savedResort) => {
			if (err) {
				res.render('Pages/addresort', {
					layout: 'Layouts/dashboard_layout',
					title: 'Admin - Add Resort',
					error: err.message
				});
			} else {
				res.redirect('/allresorts');
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

router.route('/allresorts')
	.get((req,res,next) => {
		Resorts.find({

		},(err,resortData) => {
			if (err) {
				console.log(err.message);
			} else {
				res.render('Pages/allresorts', {
					layout: 'Layouts/dashboard_layout',
					title: 'Admin - Add Resort',
					data: resortData
				});
			}
		})
	})
	.post((req,res,next) => {
		const id = req.body.resortId;
		console.log(id);
		Resorts.findOneAndDelete({
			'_id': id
		},(err,deleted) => {
			if (err) {
				res.status(400).json({
					successfull: false,
					message: err.message
				})
			} else {
				console.log(deleted);
				res.redirect('/resortdetail');
			}
		})
	});

router.route('/resortdetail')
	.post((req,res,next) => {
		const resortId = req.body.resortId;
		console.log("hello: " + resortId);
		Resorts.findOne({
			'_id': resortId
		},(err,resort) => {
			if (err){
				res.status(400).json({
					successfull: false,
					message: err.message
				});
			}else{
				console.log(resort);
				res.render('Pages/resortdetail', {
					layout: 'Layouts/dashboard_layout',
					data: resort,
					// userData: req.user
				});
			}
		});
	});

router.route('/editproperty')
	.post((req,res,next) => {
		const resortId = req.body.resortId;
		console.log("hello: " + resortId);
		Resorts.findOne({
			'_id': resortId
		},(err,resort) => {
			if (err){
				res.status(400).json({
					successfull: false,
					message: err.message
				});
			}else{
				console.log(resort);
				const coordlong = resort.locationCoordinate.logitude;
				const coordlat = resort.locationCoordinate.latitude;
				const coord = `${coordlong},${coordlat}`;

				res.render('Pages/editresort', {
					layout: 'Layouts/dashboard_layout',
					data: resort,
					locationCoordinate: coord,
					title: "Edit Resort"
					// userData: req.user
				});
			}
		});
	})
	.patch((req,res,next) => {

		console.log(req.body);

		// resort
		const resortName = req.body.resortName;
		const ratePerDay = req.body.ratePerDay;
		const image = req.body.image;
		const resortDescription = req.body.resortDescription;
		const dateCreated = req.body.dateCreated;

		// location
		const resortCountry = req.body.rcountry;
		const resortRegion = req.body.rregion;
		const resortCity = req.body.rcity;
		const locationCoordinate = req.body.locationCoordinate;

		const latlong = locationCoordinate.split(",");

		// find property and update
		Resorts.findOneAndUpdate({
			'_id': req.body.resortId
		},{
			$set: {
				'resortName': resortName,
				'ratePerDay': ratePerDay,
				'image': image,
				'resortDescription': resortDescription,
				'dateCreated': dateCreated,
				'resortCountry': resortCountry,
				'resortRegion': resortRegion,
				'resortCity': resortCity,
				'locationCoordinate': {
					'logitude': latlong[1],
					'latitude': latlong[0],
				}
			}
		},{
			new: true
		},(err,updated) => {
			if (err) {
				res.status(400).json({
					successfull: false,
					message: err.message
				})
			} else {
				console.log(updated);

				res.status(200).json({
					successfull: true,
					message: updated
				})
			}
		})
	});

module.exports = router;
