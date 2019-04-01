var express = require('express');
var router = express.Router();
const passport = require('passport');
const { Resorts } = require('./../../models/resorts');

/* GET home page. */
router.route('/')
	.get((req,res,next) => {
		res.render(
			'Authentications/login',
			{
				layout:'Layouts/auth_layout',
				title: 'Resort Locator - Login'
			}
		);
	})
	.post(passport.authenticate('local-login', {
		failureRedirect: '/'
	}), (req, res) => {
		res.redirect('/home');
	});
	// .post((req,res,next) => {
	// 	res.render('Pages/home', { layout:'Layouts/dashboard_layout', title: 'Resort Locator - Home' });
	// });

	// registration page if there will be one
router.route('/register')
	.get((req,res,next) => {
		res.render('Authentications/register', { layout:'Layouts/auth_layout', title: 'Resort Locator - Register' });
	})
	.post((req,res,next) => {
		req.checkBody('firstname', 'Empty First Name').notEmpty();
		req.checkBody('lastname', 'Empty Last Name').notEmpty();
		// req.checkBody('email', 'Invalid Email').isEmail();
		// req.checkBody('mobilenumber','Incorrect Mobile Number').isMobilePhone();
		// req.checkBody('password', 'Empty Password').notEmpty();
		// req.checkBody('confirmpassword', 'Password do not match').equals(req.body.confirmPassword).notEmpty();

		var errors = req.validationErrors();
        if (errors) {
			console.log(errors);
            res.render('Authentications/register', {
                lastName: req.body.lastname,
                email: req.body.email,
                errorMesage: errors
            });
        }else {
			var user = new User();
			if (req.body.type !== 'Property Owner' || req.body.type !== 'Content Provider') {
				user.isAdmin = false;
			} else {
				user.isAdmin = true;
			}
			user.firstName = req.body.firstname;
			user.lastName = req.body.lastname;
			user.mobileNumber = req.body.mobilenumber;
			user.type = req.body.type;
			user.email = req.body.email;
			user.location = req.body.location;
            user.setPassword(req.body.password);
            user.save((err,user) => {
                if (err) {
					console.log(err.message);
					res.render('Authentications/register', {
						layout: 'Layouts/auth_layout',
                        errorMesage: err
                    })
                }else{
                    res.redirect('/login');
                }
            })
        }
		// res.render('Pages/home', { layout:'Layouts/dashboard_layout', title: 'Resort Locator - Home' });
	})

	// User Profile
router.route('/profile')
	.get((req,res,next) => {
		res.render('Authentications/profile',{
			layout: 'Layouts/dashboard_layout',
			title: 'My Profile'
		})
	})

module.exports = router;
