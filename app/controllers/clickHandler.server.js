'use strict';

var Users = require('../models/users.js');
var Polls = require('../models/polls.js');

// Polls.insert({userId:"13324",poll:
// {
// 	name:"hello",
// 	answers:["sup","wazzup","Gudentak"],
// 	answered:[23,12,40]
// }});

//console.log("creating");

					

function ClickHandler () {

	this.getClicks = function (req, res) {
		Users
			.findOne({ 'github.id': req.user.github.id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result.nbrClicks);
			});
	};

	this.addClick = function (req, res) {
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { $inc: { 'nbrClicks.clicks': 1 } })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.nbrClicks);
				}
			);
	};

	this.resetClicks = function (req, res) {
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { 'nbrClicks.clicks': 0 })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.nbrClicks);
				}
			);
	};



	this.getPoll = function (req, res) {
		Polls
			.findOne({ 'time': req.params.time }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result);
			});
	};
	this.deletePoll = function (req, res) {
		console.log("ieh");
		Polls
			.findOne({ 'time': req.params.time }).remove().exec(function(err,data){
					console.log(data);
			});
	};
	this.addPoll = function (req, res) {
		// TODO req.query add poll
		var ans=req.body.comment.split("\r\n");
		if(ans.length>0){
		

		
		
			var arr=Array(ans.length).fill(0);
			var ntime=new Date().getTime()
		
			var po = new Polls({userId:req.user.github.id,	time:ntime,poll:
			{

				name:req.body.title,
				answers:ans,
				answered:arr
			}});
					po.save();
			res.redirect("/polls/"+ntime);
		}
		else
			res.redirect('back');
	};
	this.getAllPolls = function (req, res) {
		Polls
			.find({}, { '_id': false }).sort({"time": -1})
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result);
			});
	};
	this.getMyPolls = function (req, res) {
		Polls
			.find({userId:req.user.github.id}, { '_id': false }).sort({"time": -1})
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result);
			});
	};
	this.vote=function(req,res){
		var ch=req.body.dropdown;

		ch='poll.answered.'+ch;
		var obj={
		
		}
		obj[ch]=1;
	//	console.log(obj);
	//	console.log("poll.answered.1");
		Polls
			.findOneAndUpdate({ 'time': req.params.time }, { $inc: obj}).exec(function(err,result){
						res.redirect(req.originalUrl);
			});

		
	}
}

module.exports = ClickHandler;
