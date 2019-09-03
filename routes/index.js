var express = require('express');
var router = express.Router();
const { Resorts } = require('./../models/resorts');

router.get('/all', (req, res, next) => {
	Resorts.find({

	},(err, resort) => {
		if (err) {
			res.status(400).json({
				succesful:  false,
				message: err.message
			})
		} else {
			res.status(200).json({
				succesful: true,
				message: resort
			})
		}
	})
});

// update likes
router.patch('/update/likes', (req,res,next) => {

	const rid = req.body.resortId;
	const likes = req.body.likes;

	Resorts.findOne({
		'_id': rid
	},(error, resortData) => {
		if (error) {
			res.status(400).json({
				succesful: false,
				message: error.message
			})
		} else {

			const likesCount = resortData.likes;
			const likings = parseInt(likesCount);
			const increaselikes = likings + 1;

			Resorts.findOneAndUpdate({
				'_id': rid
			},{
				$set: {
					'likes': increaselikes
				}
			},{
				new: true
			},(err, updatedResort) => {
				if (err) {
					res.status(400).json({
						succesful:  false,
						message: err.message
					})
				} else {
					res.status(200).json({
						succesful: true,
						message: updatedResort
					})
				}
			});
		}
	});
})

module.exports = router;
