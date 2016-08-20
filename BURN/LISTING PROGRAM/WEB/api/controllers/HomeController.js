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
			return res.view({user:user});
		});
	}
};

