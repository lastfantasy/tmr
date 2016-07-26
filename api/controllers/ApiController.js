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
		User.findOne({ email: req.param('email') }, function foundUser(err, user){
			if (err) return res.json({code : 404, message : "Error"});
			if (user) return res.json({code : 404, message : 'Email ' + req.param('email') + ' sudah terdaftar. Mohon gunakan email lain.'});
			// if (user) {
			// 	var existingAccountError = [
			// 	 'Email ' + req.param('email') + ' sudah terdaftar. Mohon gunakan email lain.'
			// 	]
			// 	req.session.flash = {
			// 		err: existingAccountError
			// 	}
			// 	res.redirect('/register');
			// 	return;
			// }
		});
		var opendate = new Date();
		var closedate = new Date();
		User.findOne({admin : true}, function(err, user){
			opendate = new Date(user.opendate);
			closedate = new Date(user.closedate);
		});
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
					// // var opendate, closedate;
					// User.findOne({admin : true}, function(err, _user){
					// 	var opendate = new Date(_user.opendate);
					// 	var closedate = new Date(_user.closedate);
					// 	User.update(user.id, {opendate : opendate, closedate : closedate}, function(err, usersss){
					// 		if (err) return res.json({code:404, message:"Error"});
					// 		return res.json({code:200,user:user});
					// 		// return;
					// 	});
					// });
					return res.json({code:200,user:user});
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
		// console.log('yes');
    	// tmpstatus ++;
    	var nowdate = new Date().getFullYear();
    	// var datebirth = req.param('birth');
    	var tmp = new Date(req.param('year'),req.param('month'),req.param('day'));
    	var birthdate = tmp.getFullYear();
    	// console.log(datebirth);
		if (nowdate - birthdate < 13 || nowdate - birthdate > 18){
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
		// if (tmpstatus == 3){
		// 	tmpstatus = 0;
		// 	var usrObj = {
		// 		name : req.param('name'),
		// 		address : req.param('address'),
		// 		placebirth : req.param('placebirth'),
		// 		datebirth : datebirth,
		// 		gender : req.param('gender'),
		// 		phone : req.param('phone'),
		// 		handphone : req.param('handphone'),
		// 		fathername : req.param('fathername'),
		// 		fatheroccupation : req.param('fatheroccupation'),
		// 		fathersalary : req.param('fathersalary'),
		// 		fatherphone : req.param('fatherphone'),
		// 		mothername : req.param('mothername'),
		// 		motheroccupation : req.param('motheroccupation'),
		// 		mothersalary : req.param('mothersalary'),
		// 		motherphone : req.param('motherphone'),
		// 		numbersiblings : req.param('numbersiblings'),
		// 		dashboard_status : 1,
		// 		verifyremarks : "Harap Menyerahkan Dokumen Asli Ke Sekolah Sebelum Tanggal XX-XX-XXXX"
		// 	}
		// }
		// else {
		// 	var usrObj = {
		// 		name : req.param('name'),
		// 		address : req.param('address'),
		// 		placebirth : req.param('placebirth'),
		// 		datebirth : req.param('datebirth'),
		// 		gender : req.param('gender'),
		// 		phone : req.param('phone'),
		// 		handphone : req.param('handphone'),
		// 		fathername : req.param('fathername'),
		// 		fatheroccupation : req.param('fatheroccupation'),
		// 		fathersalary : req.param('fathersalary'),
		// 		fatherphone : req.param('fatherphone'),
		// 		mothername : req.param('mothername'),
		// 		motheroccupation : req.param('motheroccupation'),
		// 		mothersalary : req.param('mothersalary'),
		// 		motherphone : req.param('motherphone'),
		// 		numbersiblings : req.param('numbersiblings'),
		// 		dashboard_status : 1
		// 	}
		// }
		User.update(req.param("id_user"),usrObj,function(err,user){
			if(err) return res.json({code:404, message:"Error!"});
			return res.json({code:200, message:"Formulir Anda sedang kami proses. Silahkan lengkapi data yang lainnya."});
		});
    },
    applygrade : function(req,res,next){
    	tmpstatus ++;
    	var usrObj = {
    		grade : req.param('grade'),
    		previousschool : req.param('previousschool'),
    		grade_status : 1
		}
    	// if (tmpstatus == 3){
    	// 	tmpstatus = 0;
    	// 	var usrObj = {
	    // 		grade : req.param('grade'),
	    // 		previousschool : req.param('previousschoolname'),
	    // 		grade_status : 1,
	    // 		verifyremarks : "Harap Menyerahkan Dokumen Asli Ke Sekolah Sebelum Tanggal XX-XX-XXXX"
    	// 	}
    	// }
    	// else {
    	// 	var usrObj = {
	    // 		grade : req.param('grade'),
	    // 		previousschool : req.param('previousschoolname'),
	    // 		grade_status : 1
    	// 	}
    	// }
    	User.update(req.param("id_user"),usrObj,function(err,user){
			if(err) return res.json({code:404, message:"Error!"});
			return res.json({code:200, message:"Formulir Anda sedang kami proses. Silahkan lengkapi data yang lainnya."});
		});
    },
    applydocuments : function(req,res,next){
    	
    	tmpstatus ++;

    	var file1 = "";
		var file2 = "";
		var file3 = "";
		var file4 = "";

		var fileurl1 = "";
		var fileurl2 = "";
		var fileurl3 = "";
		var fileurl4 = "";

		if(typeof req.param('file_url_1')=="undefined") {
			return res.json({code:404, message:"Anda harus mengupload akte lahir Anda."});
		}
		if(typeof req.param('file_url_2')=="undefined") {
			return res.json({code:404, message:"Anda harus mengupload ijazah Anda."});
		}
		if(typeof req.param('file_url_1')!="undefined") {
				file1 = req.param('file_name_1');
				fileurl1 = req.param('file_url_1');
		}
		if(typeof req.param('file_url_2')!="undefined") {
				file2 = req.param('file_name_2');
				fileurl2 = req.param('file_url_2');		
		}
		if(typeof req.param('file_url_3')!="undefined") {
				file3 = req.param('file_name_3');
				fileurl3 = req.param('file_url_3');		
		}
		if(typeof req.param('file_url_4')!="undefined") {
				file4 = req.param('file_name_4');
				fileurl4 = req.param('file_url_4');		
		}
		// console.log(req.param('file_url_1'));
  //   	console.log(req.param('file_url_2'));
  //   	console.log(req.param('file_url_3'));
  //   	console.log(req.param('file_url_4'));
		// buf = new Buffer(fileurl1.replace("data:image/*;charset=utf-8;base64,",""),'base64');
		// var filename1 = 'akte lahir ' + req.param("id_user") + '.jpg';
		// fs.writeFile(filename1,buf,function(err,data){});
		// buf = new Buffer(fileurl2.replace("data:image/*;charset=utf-8;base64,",""),'base64');
		// var filename2 = 'ijazah ' + req.param("id_user") + '.jpg';
		// fs.writeFile(filename2,buf,function(err,data){});
		// buf = new Buffer(fileurl3.replace("data:image/*;charset=utf-8;base64,",""),'base64');
		// var filename3 = 'dok1 ' + req.param("id_user") + '.jpg';
		// fs.writeFile(filename3,buf,function(err,data){});
		// buf = new Buffer(fileurl4.replace("data:image/*;charset=utf-8;base64,",""),'base64');
		// var filename4 = 'dok2 ' + req.param("id_user") + '.jpg';
		// fs.writeFile(filename4,buf,function(err,data){});
		var usrObj = {
			file1 : filename1,
			file2 : filename2,
			file3 : filename3,
			file4 : filename4,
			documents_status : 1,
			verifyremarks : "Harap Menyerahkan Dokumen Asli Ke Sekolah Sebelum Pendaftaran Ditutup."
		}
		// if (tmpstatus == 3){
		// 	tmpstatus = 0;
		// 	var usrObj = {
		// 		file1 : filename1,
		// 		file2 : filename2,
		// 		file3 : filename3,
		// 		file4 : filename4,
		// 		documents_status : 1,
		// 		verifyremarks : "Harap Menyerahkan Dokumen Asli Ke Sekolah Sebelum Pendaftaran Ditutup."
		// 	}
		// }
		// else {
		// 	var usrObj = {
		// 		file1 : filename1,
		// 		file2 : filename2,
		// 		file3 : filename3,
		// 		file4 : filename4,
		// 		documents_status : 1
		// 	}
		// }
		User.update(req.param("id_user"),usrObj,function(err,user){
				if(err) return res.json({code:404, message:"Error"});
				return res.json({code:200, message:"Formulir Anda sedang kami proses. Silahkan lengkapi data yang lainnya."});
		});
    }
};