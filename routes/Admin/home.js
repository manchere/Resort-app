const express = require('express')
const router = express.Router();
const { Resorts } = require('./../../models/resorts');

router.route('/home')
	.get((req,res,next) => {
		Resorts.find({

		},(err,resortData) => {
			if (err) {
				console.log(err.message);
			} else {
				res.render('Pages/home',{
					layout: 'Layouts/dashboard_layout',
					title: 'Admin-home',
					data: resortData
				});
			}
		})
	})
	.post((req,res,next) => {

	});

module.exports = router;
