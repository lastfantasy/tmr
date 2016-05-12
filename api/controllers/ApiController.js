/**
 * ApiController
 *
 * @description :: Server-side logic for managing apis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 var bcrypt = require('bcrypt');
module.exports = {
	login : function(req, res, next){
		if (!req.param('email') || !req.param('password')) {
			return res.json({code:404, message:"Error"});
		}
		var email = req.param('email');
		User.findOne({ or : [ {username : email}, { email: email } ] }, function foundUser(err, user) {
				if (err) return res.json({code:404, message:"Error"});
				if (!user) return res.json({code:404, message:"Tidak ada user"});
				bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid) {
						if (err) return res.json({code:404, message:"Error"});
						if (!valid) return res.json({code:404, message:"Password salah"});
						return res.json({code:200,user:user});
				});
		});
	}
};

