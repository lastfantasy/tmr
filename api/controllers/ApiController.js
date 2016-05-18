/**
 * ApiController
 *
 * @description :: Server-side logic for managing apis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 var bcrypt = require('bcrypt');
module.exports = {
	register : function(req,res,next){
		if(!req.param('email') || !req.param('password') || !req.param('passwordconfirmation')){
			return res.json({code:404, message:"Anda harus mengisi secara lengkap formulir yang sudah kami sediakan"});
		}
		if(req.param('password')!=req.param('passwordconfirmation')){
			return res.json({code:404, message:"Password anda harus sama dengan password konfirmasi anda"});
		}
		// if(req.param('g-recaptcha-response') == ""){
		// 	var info = ['Harap menyelesaikan captcha terlebih dahulu']

		// 	 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
		// 	 // the key of usernamePasswordRequiredError
		// 	 req.session.flash = {
		// 		 err: info,
		// 	 }

		// 	 res.redirect('/register');
		// 	 return;
		// }
		var usrObj = {
			email : req.param('email'),
			types : "1",
			name : "",
			files : [],
			grade : "",
			gender: "",
		    address : '',
		    placebirth : '',
		    datebirth : '',
		    phone : '',
		    status : 0,
		}
		bcrypt.hash(req.param('password'), null,null, function PasswordEncrypted(err, encryptedPassword) {
			usrObj.encryptedPassword = encryptedPassword;
			User.create(usrObj, function(err,user){
				if(err) return res.json({code:404, message:"Error"});
				require('bcrypt').hash(user.id, null, null, function IdEncrypted(err, encryptedId) {
					var usr = {
		                encryptedId : encryptedId
		            }
		        	User.update(user.id, usr, function userUpdated(err,users) {
						if(err) return res.json({code:404, message:"Error"});
						return res.json({code:200, message:"Akun anda telah terdaftar. Silahkan Login"})
					});
				});
			});
		});
	},
	login : function(req, res, next){
		if (!req.param('email') || !req.param('password')) {
			return res.json({code:404, message:"Harap mengisi email dan password anda"});
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