/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _opendate, _closedate;
module.exports = {
	index : function(req,res,next){
		User.findOne({admin : true}, function(err, user){
			_opendate = new Date(user.opendate);
			_closedate = new Date(user.closedate);
			console.log(_opendate);
			console.log(_closedate);
			return res.view('homepage.ejs');
		});
		// console.log(opendate);
		// console.log(closedate);
		// return res.view('homepage.ejs');
	}
};

