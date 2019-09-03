const express = require('express')
const router = express.Router();
const { Resorts } = require('./../../models/resorts');

router.route('/edit')
	.get((req,res,next) => {
		res.render('editresort',{});
	})

module.exports = router;
