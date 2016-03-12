/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
		dashboard : function(req,res,next){
			User.findOne(req.session.User.id, function(err,user){
				return res.view({user:user});
			});
		},
		apply : function(req,res,next){
				if(typeof req.param('name')=="undefined" || typeof req.param('address')=="undefined" || typeof req.param('placebirth')=="undefined" || typeof req.param('datebirth')=="undefined" || typeof req.param('phone')=="undefined"){
					var info = ['Anda harus mengisi secara lengkap formulir yang sudah kami sediakan.']
					 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
					 // the key of usernamePasswordRequiredError
					 req.session.flash = {
						 err: info,
					 }
					 res.redirect('/user/dashboard');
					 return;
				}
				var phone = req.param('phone');
				for(var i=0;i<phone.length;i++){
						if(phone[i]<'0' || phone[i]>'9'){
							var info = ['Nomor Telepon harus dalam bentuk angka (0-9)']
							 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
							 // the key of usernamePasswordRequiredError
							 req.session.flash = {
								 err: info,
							 }
							 res.redirect('/user/dashboard');
							 return;
						}
				}
				var file1 = "";
				var file2 = "";
				var file3 = "";
				var file4 = "";
				// if(typeof req.param('file_url_1')=="undefined") {
				// 	var info = ['Anda harus mengupload akte lahir anda']
				// 	 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
				// 	 // the key of usernamePasswordRequiredError
				// 	 req.session.flash = {
				// 		 err: info,
				// 	 }
				// 	 res.redirect('/user/dashboard');
				// 	 return;
				// }
				// if(typeof req.param('file_url_2')=="undefined") {
				// 	var info = ['Anda harus mengupload ijazah anda']
				// 	 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
				// 	 // the key of usernamePasswordRequiredError
				// 	 req.session.flash = {
				// 		 err: info,
				// 	 }
				// 	 res.redirect('/user/dashboard');
				// 	 return;
				// }
				// if(typeof req.param('file_url_3')=="undefined") {
				// 	var info = ['Anda harus mengupload dokumen pendukung 1 anda']
				// 	 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
				// 	 // the key of usernamePasswordRequiredError
				// 	 req.session.flash = {
				// 		 err: info,
				// 	 }
				// 	 res.redirect('/user/dashboard');
				// 	 return;
				// }
				// if(typeof req.param('file_url_4')=="undefined") {
				// 	var info = ['Anda harus mengupload dokumen pendukung 2 anda']
				// 	 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
				// 	 // the key of usernamePasswordRequiredError
				// 	 req.session.flash = {
				// 		 err: info,
				// 	 }
				// 	 res.redirect('/user/dashboard');
				// 	 return;
				// }
				// if(typeof req.param('file_url_1')!="undefined") {
				// 		var fs = require('fs');
				// 		file1 = req.param('file_url_1');
				// 		fs.write(new Buffer (file1));
				// }
				// if(typeof req.param('file_url_2')!="undefined") {
				// 		var fs = require('fs');
				// 		file2 = req.param('file_url_2');
				// 		fs.write(new Buffer (file2));
				// }
				// if(typeof req.param('file_url_3')!="undefined") {
				// 		var fs = require('fs');
				// 		file3 = req.param('file_url_3');
				// 		fs.write(new Buffer (file3));
				// }
				// if(typeof req.param('file_url_4')!="undefined") {
				// 		var fs = require('fs');
				// 		file4 = req.param('file_url_4');
				// 		fs.write(new Buffer (file4));
				// }
				if(typeof req.param('file_name_1')=="undefined") {
					var info = ['Anda harus mengupload akte lahir anda']
					 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
					 // the key of usernamePasswordRequiredError
					 req.session.flash = {
						 err: info,
					 }
					 res.redirect('/user/dashboard');
					 return;
				}
				if(typeof req.param('file_name_2')=="undefined") {
					var info = ['Anda harus mengupload ijazah anda']
					 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
					 // the key of usernamePasswordRequiredError
					 req.session.flash = {
						 err: info,
					 }
					 res.redirect('/user/dashboard');
					 return;
				}
				if(typeof req.param('file_name_3')=="undefined") {
					var info = ['Anda harus mengupload dokumen pendukung 1 anda']
					 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
					 // the key of usernamePasswordRequiredError
					 req.session.flash = {
						 err: info,
					 }
					 res.redirect('/user/dashboard');
					 return;
				}
				if(typeof req.param('file_name_4')=="undefined") {
					var info = ['Anda harus mengupload dokumen pendukung 2 anda']
					 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
					 // the key of usernamePasswordRequiredError
					 req.session.flash = {
						 err: info,
					 }
					 res.redirect('/user/dashboard');
					 return;
				}
				if(typeof req.param('file_name_1')!="undefined") {
						file1 = req.param('file_name_1');
				}
				if(typeof req.param('file_name_2')!="undefined") {
						file2 = req.param('file_name_2');
				}
				if(typeof req.param('file_name_3')!="undefined") {
						file3 = req.param('file_name_3');
				}
				if(typeof req.param('file_name_4')!="undefined") {
						file4 = req.param('file_name_4');
				}
				var usrObj = {
						grade : req.param('grade'),
						name : req.param('name'),
						address : req.param('address'),
						placebirth : req.param('placebirth'),
						datebirth : req.param('datebirth'),
						gender : req.param('gender'),
						phone : req.param('phone'),
						status : 1,
						file1 : file1,
						file2 : file2,
						file3 : file3,
						file4 : file4
				}
				User.update(req.session.User.id,usrObj,function(err,user){
						if(err) return next(err);
						var info = ['Formulir anda sedang kami proses.']
						 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
						 // the key of usernamePasswordRequiredError
						 req.session.flash = {
							 success: info,
						 }
						 res.redirect('/user/dashboard');
						 return;
				});
		},
};
