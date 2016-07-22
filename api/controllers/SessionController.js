/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 var bcrypt = require('bcrypt');
 var nodemailer = require('nodemailer');
module.exports = {
	register : function(req,res,next){
		return res.view({
			title : 'Temanis Baru | Register',
			image : '',
			description : 'Sebuah portal untuk penerimaan siswa baru',
			url : 'http://www.temanis.com',
		});
	},
	login : function(req,res,next){
		return res.view({
			title : 'Temanis Baru | Login',
			image : '',
			description : 'Sebuah portal untuk penerimaan siswa baru',
			url : 'http://www.temanis.com',
		});
	},
	signup : function(req,res,next){
			if(typeof req.param('email')=="undefined" || typeof req.param('password')=="undefined" || typeof req.param('passwordconfirmation')=="undefined"){
				var info = ['Anda harus mengisi secara lengkap formulir yang sudah kami sediakan.']

				 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
				 // the key of usernamePasswordRequiredError
				 req.session.flash = {
					 err: info,
				 }

				 res.redirect('/register');
				 return;
			}
			if(req.param('password')!=req.param('passwordconfirmation')){
				var info = ['Password anda harus sama dengan password konfirmasi anda.']

				 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
				 // the key of usernamePasswordRequiredError
				 req.session.flash = {
					 err: info,
				 }

				 res.redirect('/register');
				 return;
			}
			if(req.param('g-recaptcha-response') == ""){
				var info = ['Harap menyelesaikan captcha terlebih dahulu']

				 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
				 // the key of usernamePasswordRequiredError
				 req.session.flash = {
					 err: info,
				 }

				 res.redirect('/register');
				 return;
			}
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
			bcrypt.hash(req.param('password'), 10, function PasswordEncrypted(err, encryptedPassword) {
					//if(err) console.log(err);
					//console.log(encryptedPassword);
					usrObj.encryptedPassword = encryptedPassword;
					User.create(usrObj, function(err,user){
							if(err) return next(err);
							require('bcrypt').hash(user.id, 10, function IdEncrypted(err, encryptedId) {
								var usr = {
                    encryptedId : encryptedId
                }
                User.update(user.id, usr, function userUpdated(err,users) {
										if (err) return next(err);
										var requireLoginError = ['Akun anda telah terdaftar. Silahkan Login'];
                    req.session.flash = {
                      success: requireLoginError
                    }
                    // user.files[0].name = "";
                    // user.files[0].url = "";
                    // user.files[1].name = "";
                    // user.files[1].url = "";
                    // user.files[2].name = "";
                    // user.files[2].url = "";
                    // user.files[3].name = "";
                    // user.files[3].url = "";
                    res.redirect('/login');
                    return;
								});
							});
					});
			});
	},
	signin : function(req,res,next){
		if (!req.param('email') || !req.param('password')) {
			// return next({err: ["Password doesn't match password confirmation."]});

			var usernamePasswordRequiredError = ['Anda harus memasukkan email dan password']

			// Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
			// the key of usernamePasswordRequiredError
			req.session.flash = {
				err: usernamePasswordRequiredError,
			}

			res.redirect('/login');
			return;
		}
		var email = req.param('email');
		User.findOne({ or : [ {username : email}, { email: email } ] }, function foundUser(err, user) {
				if (err) return next(err);
				if (!user) {
					var noAccountError = [
					 'Email ' + req.param('email') + ' tidak ditemukan.'
					]
					req.session.flash = {
						err: noAccountError
					}
					res.redirect('/login');
					return;
				}
				bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid) {
						if (err) return next(err);
						if (!valid) {
							var usernamePasswordMismatchError = ['Password anda salah']
							req.session.flash = {
								err: usernamePasswordMismatchError,
							}
							res.redirect('/login');
							return;
						}
						req.session.authenticated = true;
						req.session.User = user;
						if(user.admin)
							return res.redirect('/');
						else
							return res.redirect('/user/homesiswa');
				});
		});
	},
	signout : function(req,res,next){
		req.session.destroy();
		res.redirect('/');
	}
};
