/**
 * ApiController
 *
 * @description :: Server-side logic for managing apis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcrypt');
var fs = require('fs');
var tmpstatus = 0;
module.exports = {
	register : function(req,res,next){
		if(!req.param('email') || !req.param('password') || !req.param('passwordconfirmation')){
			return res.json({code:404, message:"Anda harus mengisi secara lengkap formulir yang sudah kami sediakan"});
		}
		if(req.param('password')!=req.param('passwordconfirmation')){
			return res.json({code:404, message:"Password anda harus sama dengan password konfirmasi anda"});
		}
		var pw = req.param('password');
		if (pw.length < 6 || pw.length > 8){
			return res.json({code:404, message:"Password Anda harus berisi 6-8 karakter."});
		}
		User.findOne({ email: req.param('email') }, function foundUser(err, user){
			if (err) return res.json({code : 404, message : "Error"});
			if (user) return res.json({code : 404, message : 'Email ' + req.param('email') + ' sudah terdaftar. Mohon gunakan email lain.'});
		});
		var opendate = new Date();
		var closedate = new Date();
		User.findOne({admin : true}, function(err, user){
			opendate = new Date(user.opendate);
			closedate = new Date(user.closedate);
		});
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
		    opendate : opendate,
		    closedate : closedate
		}
		bcrypt.hash(req.param('password'), 10, function PasswordEncrypted(err, encryptedPassword) {
			usrObj.encryptedPassword = encryptedPassword;
			User.create(usrObj, function(err,user){
				if(err) return res.json({code:404, message:"Error"});
				require('bcrypt').hash(user.id, 10, function IdEncrypted(err, encryptedId) {
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
		var opendate = new Date();
		var closedate = new Date();
		User.findOne({admin : true}, function(err, user){
			opendate = new Date(user.opendate);
			closedate = new Date(user.closedate);
		});
		User.findOne({ email: email }, function foundUser(err, user) {
				if (err) return res.json({code:404, message:"Error"});
				if (!user) return res.json({code:404, message:"Tidak ada user"});
				bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid) {
					if (err) return res.json({code:404, message:"Error"});
					if (!valid) return res.json({code:404, message:"Password salah"});
					user.opendate = opendate;
					user.closedate = closedate;
					return res.json({code:200,user:user});
				});
		});
	},
	cekemail : function(req, res, next){
		if (!req.param('email')){
			return res.json({code:404, message:'Anda harus mengisi email Anda.'});
		}
		User.findOne({email : req.param('email')}, function foundUser(err, user){
			if (err) return res.json({code:404, message:'Error.'});
			if (!user) {
				return res.json({code:404, message:'Email ' + req.param('email') + ' tidak ditemukan.'});
			}
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
			    subject: 'Reset Password Temanis Baru', // Subject line
			    text: 'Anda menerima email ini karena Anda (atau seseorang) telah mengirimkan permintaan untuk me-reset password Temanis Baru Anda\n\n' +
			    'Silahkan klik link di bawah ini, atau paste link di bawah ke browser Anda untuk me-reset password Anda :\n\n' +
			    'http://temanisbaru.herokuapp.com/resetpassword/' + user.id + '\n\n' +
			    'Jikalau Anda tidak merasa melakukan permintaan ini, silahkan abaikan email ini dan password Anda tidak akan berganti.\n' // plaintext body
			};

			// send mail with defined transport object
			transporter.sendMail(mailOptions, function(err){
			    if (err) return res.json({code:404, message:'Error.'});
			    return res.json({code:200, message:'Link reset password sudah terkirim ke ' + req.param('email')});
			});
		});
	},
	verifyapplication : function(req,res,next){
		var nowdate = new Date();
		var opendate;
		var closedate;
		User.findOne({admin:true}, function(err, user){
			opendate = new Date(user.opendate)
			closedate = new Date(user.closedate)
			if (nowdate < opendate){
				return res.json({code:404, message:"Pendaftaran Belum Dibuka."});
			}
			else if (nowdate > closedate){
				return res.json({code:404, message:"Pendaftaran Sudah Ditutup."})
			}
			return res.json({code:200, message:"Silahkan Mendaftar."});
		});
		
	},
	applyprofile : function(req,res,next){
    	var nowdate = new Date().getFullYear();
    	var tmp = new Date(req.param('year'),req.param('month'),req.param('day'));
    	var birthdate = tmp.getFullYear();
		if (nowdate - birthdate < 10 || nowdate - birthdate > 20){
    		return res.json({code:404, message:"Anda belum cukup umur untuk mendaftar."});
    	}
    	var phone = req.param('phone');
		for(var i=0;i<phone.length;i++){
				if(phone[i]<'0' || phone[i]>'9'){
					return res.json({code:404, message:"Nomor Telepon harus dalam bentuk angka (0-9)."});
				}
		}
		var handphone = req.param('handphone');
		for(var i=0;i<handphone.length;i++){
				if(handphone[i]<'0' || handphone[i]>'9'){
					return res.json({code:404, message:"Nomor Handphone harus dalam bentuk angka (0-9)."});
				}
		}
		var fatherphone = req.param('fatherphone');
		for(var i=0;i<fatherphone.length;i++){
				if(fatherphone[i]<'0' || fatherphone[i]>'9'){
					return res.json({code:404, message:"Nomor Telepon Ayah harus dalam bentuk angka (0-9)."});
				}
		}
		var motherphone = req.param('motherphone');
		for(var i=0;i<motherphone.length;i++){
				if(motherphone[i]<'0' || motherphone[i]>'9'){
					return res.json({code:404, message:"Nomor Telepon Ibu harus dalam bentuk angka (0-9)."});
				}
		}
		var siblings = req.param('numbersiblings');
		for(var i=0;i<siblings.length;i++){
				if(siblings[i]<'0' || siblings[i]>'9'){
					return res.json({code:404, message:"Mohon input jumlah saudara dengan angka."});
				}
		}
		var usrObj = {
			name : req.param('name'),
			address : req.param('address'),
			placebirth : req.param('placebirth'),
			datebirth : req.param('datebirth'),
			gender : req.param('gender'),
			phone : req.param('phone'),
			handphone : req.param('handphone'),
			fathername : req.param('fathername'),
			fatheroccupation : req.param('fatheroccupation'),
			fathersalary : req.param('fathersalary'),
			fatherphone : req.param('fatherphone'),
			mothername : req.param('mothername'),
			motheroccupation : req.param('motheroccupation'),
			mothersalary : req.param('mothersalary'),
			motherphone : req.param('motherphone'),
			numbersiblings : req.param('numbersiblings'),
			dashboard_status : 1
		}
		User.update(req.param("id_user"),usrObj,function(err,user){
			if(err) return res.json({code:404, message:"Error!"});
			return res.json({code:200, message:"Formulir Anda sedang kami proses. Silahkan lengkapi data yang lainnya."});
		});
    },
    applygrade : function(req,res,next){
    	var usrObj = {
    		grade : req.param('grade'),
    		previousschool : req.param('previousschool'),
    		grade_status : 1
		}
    	User.update(req.param("id_user"),usrObj,function(err,user){
			if(err) return res.json({code:404, message:"Error!"});
			return res.json({code:200, message:"Formulir Anda sedang kami proses. Silahkan lengkapi data yang lainnya."});
		});
    },
    applydocuments : function(req,res,next){
		var usrObj = {
			files : req.param('files'),
			documents_status : 1,
			verifyremarks : "Harap Menyerahkan Dokumen Asli Ke Sekolah Sebelum Pendaftaran Ditutup."
		}
		User.update(req.param("id_user"),usrObj,function(err,user){
				if(err) return res.json({code:404, message:"Error"});
				return res.json({code:200, message:"Formulir Anda sedang kami proses. Silahkan lengkapi data yang lainnya."});
		});
    }
};