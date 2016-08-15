/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 var bcrypt = require('bcrypt');
 var nodemailer = require('nodemailer');
 var resetEmail = "";
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

				 req.session.flash = {
					 err: info,
				 }

				 res.redirect('/register');
				 return;
			}
			User.findOne({ email: req.param('email') }, function foundUser(err, user){
				if (err) return next(err);
				if (user) {
					var existingAccountError = [
					 'Email ' + req.param('email') + ' sudah terdaftar. Mohon gunakan email lain.'
					]
					req.session.flash = {
						err: existingAccountError
					}
					res.redirect('/register');
					return;
				}
			});
			if(req.param('password')!=req.param('passwordconfirmation')){
				var info = ['Password anda harus sama dengan password konfirmasi anda.']

				 req.session.flash = {
					 err: info,
				 }

				 res.redirect('/register');
				 return;
			}
			var pw = req.param('password');
			if(pw.length < 6 || pw.length > 8){
				var info = ['Password Anda harus berisi 6-8 karakter.']

				 req.session.flash = {
					 err: info,
				 }

				 res.redirect('/register');
				 return;
			}
			if(req.param('g-recaptcha-response') == ""){
				var info = ['Harap menyelesaikan captcha terlebih dahulu']

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
                    res.redirect('/login');
                    return;
								});
							});
					});
			});
	},
	signin : function(req,res,next){
		if (!req.param('email') || !req.param('password')) {
			var usernamePasswordRequiredError = ['Anda harus memasukkan email dan password']

			req.session.flash = {
				err: usernamePasswordRequiredError,
			}

			res.redirect('/login');
			return;
		}
		var email = req.param('email');
		User.findOne({ email: email }, function foundUser(err, user) {
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
							return res.redirect('/user/homeadmin');
						else {
							var opendate, closedate;
							User.findOne({admin : true}, function(err, user){
								opendate = new Date(user.opendate);
								closedate = new Date(user.closedate);
								User.update(req.session.User.id, {opendate : opendate, closedate : closedate}, function(err, _user){
									if (err) return next(err);
									res.redirect('/user/homesiswa');
									return;
								});
							});
						}
				});
		});
	},
	emailpass : function(req, res, next){
		return res.view();
	},
	resetpassword : function(req,res,next){
		User.findOne({email : sentEmail}, function(err, user){
			sentEmail = "";
			return res.view ({user:user});
		});
	},
	cekemail : function(req, res, next){
		if (!req.param('email')){
			var info = ['Anda harus mengisi email pendaftaran Anda.']
			req.session.flash = {
				err : info
			}
			res.redirect('/emailpass');
			return;
		}
		if(req.param('g-recaptcha-response') == ""){
			var info = ['Harap menyelesaikan captcha terlebih dahulu']
			req.session.flash = {
				err: info,
			}
			res.redirect('/emailpass');
			return;
		}
		User.findOne({email : req.param('email')}, function foundUser(err, user){
			if (err) return next(err);
			if (!user) {
				var noAccountError = [
				 'Email ' + req.param('email') + ' tidak ditemukan.'
				]
				req.session.flash = {
					err: noAccountError
				}
				res.redirect('/emailpass');
				return;
			}
			resetEmail = user.email;
			// create reusable transporter object using the default SMTP transport
			var transporter = nodemailer.createTransport('SMTP', {
				service : 'Gmail',
				auth : {
					user : 'noreply.temanisbaru@gmail.com',
					pass : 'temanisbaru2016'
				}
			});

			// setup e-mail data with unicode symbols
			var mailOptions = {
			    from: 'Temanis Baru', // sender address
			    to: user.email, // list of receivers
			    subject: 'Reset Password Akun', // Subject line
			    text: 'Anda menerima email ini karena Anda (atau seseorang) telah mengirimkan permintaan untuk me-reset password Temanis Baru Anda\n\n' +
			    'Silahkan klik link di bawah ini, atau paste link di bawah ke browser Anda untuk me-reset password Anda :\n\n' +
			    'http://temanisbaru.herokuapp.com/resetpassword/ \n\n' +
			    'Jikalau Anda tidak merasa melakukan permintaan ini, silahkan abaikan email ini dan password Anda tidak akan berganti.\n' // plaintext body
			};

			// send mail with defined transport object
			transporter.sendMail(mailOptions, function(err){
			    if(err) return next(err);
			    var emailSent = ['Link reset password sudah terkirim ke ' + req.param('email')]
			    req.session.flash = {
			    	success : emailSent
			    }
			    res.redirect('/login');
			    return;
			});
		});
	},
	reset : function(req,res,next){
		if(typeof req.param('password')=="undefined" || typeof req.param('passwordconfirmation')=="undefined"){
			var info = ['Anda harus mengisi secara lengkap formulir yang sudah kami sediakan.']

			 req.session.flash = {
				 err: info,
			 }

			 res.redirect('/resetpassword');
			 return;
		}
		if(req.param('password')!=req.param('passwordconfirmation')){
			var info = ['Password baru Anda harus sama dengan password konfirmasi baru Anda.']

			 req.session.flash = {
				 err: info,
			 }

			 res.redirect('/resetpassword');
			 return;
		}
		var pw = req.param('password');
		if(pw.length < 6 || pw.length > 8){
			var info = ['Password baru Anda harus berisi 6-8 karakter.']

			 req.session.flash = {
				 err: info,
			 }

			 res.redirect('/resetpassword');
			 return;
		}
		bcrypt.hash(req.param('password'), 10, function PasswordEncrypted(err, encryptedPassword) {
			if (err) return next(err);
			user.encryptedPassword = encryptedPassword;
			var info = ['Password Anda berhasil direset. SIlahkan Login.']
			req.session.flash = {
				success : info,
			}
			res.redirect('/login');
			return;
		});
	},
	signout : function(req,res,next){
		req.session.destroy();
		res.redirect('/');
	}
};
