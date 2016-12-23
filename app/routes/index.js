'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();

	app.route('/')
		.get( function (req, res) {
			res.sendFile(path + '/public/polls.html');
		});

	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});
	app.route('/profile/myPolls')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/myPolls.html');
		});	
		
	app.route('/profile/deleteMyPolls')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/myPolls-Delete.html');
		});	
		
		
	app.route('/api/getUser')
		.get(function (req, res) {
			res.json({LoggedIn:req.isAuthenticated()});
		});


	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/polls',
			failureRedirect: '/login'
		}));
		
		

		
		
	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);
		
		
	app.route('/polls')
		.get(function (req, res) {
			res.sendFile(path + '/public/polls.html');
		});
		
	app.route('/polls/add-Poll')
		.get(isLoggedIn,function (req, res) {
			res.sendFile(path + '/public/add-Poll.html');
		})
		.post(isLoggedIn,clickHandler.addPoll);

	app.route('/polls/:time')
		.get(function (req, res) {
			res.sendFile(path + '/public/poll-page.html');
		})
		.post(clickHandler.vote);

		
	app.route('/api/polls/all')
		.get( clickHandler.getAllPolls);
		
	app.route('/api/polls/myPolls')
		.get( clickHandler.getMyPolls);
		
	app.route('/api/polls/:time/')
		.get(clickHandler.getPoll)
		.post(isLoggedIn, clickHandler.addPoll)
		.delete(isLoggedIn,clickHandler.deletePoll);



};
