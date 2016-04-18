/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 var fs = require('fs');
 var open = 'null';
 var close = 'null';

module.exports = {
		openclose : function(req,res,next){
			User.findOne(req.session.User.id, function(err,user){
				return res.view({user:user});
			});
		},

		
		verifyapplicant : function(req,res,next){
			User.find({admin:false},function(err,users){
				return res.view({users:users});
			});
		},
		verifydocument : function(req,res,next){
			User.findOne(req.session.User.id, function(err,user){
				return res.view({user:user});
			});
		},
		aboutus : function(req,res,next){
			User.findOne(req.session.User.id, function(err,user){
				return res.view({user:user});
			});
		},
		testadmin : function(req,res,next){
			User.findOne(req.session.User.id, function(err,user){
				return res.view({user:user});
			});
		},
		dashboard : function(req,res,next){
			User.findOne(req.session.User.id, function(err,user){
				return res.view({user:user});
			});
		},
		documents : function(req,res,next){
			User.findOne(req.session.User.id, function(err,user){
				return res.view({user:user});
			});
		},
		grade : function(req,res,next){
			User.findOne(req.session.User.id, function(err,user){
				return res.view({user:user});
			});
		},
		test : function(req,res,next){
			User.findOne(req.session.User.id, function(err, user){
				return res.view({user:user});
			});
		},
		homesiswa : function(req,res,next){
			User.findOne(req.session.User.id, function(err, user){
				return res.view({user:user});
			});
		},
		homeadmin : function(req,res,next){
			User.findOne(req.session.User.id, function(err, user){
				return res.view({user:user});
			});
		},
		setopenclose: function(req, res, next){
			var nowdate = new Date();
			var opendate = new Date(req.param('opendate'));
			var closedate = new Date(req.param('closedate'));
			if (opendate < nowdate){
				var info = ['Tanggal Pembukaan Tidak Boleh Kurang Dari Tanggal Hari Ini.']
				req.session.flash = {
					err : info,
				}
				res.redirect('/user/openclose');
				return;
			}
			// if (closedate - opendate != 30){
			// 	var info = ['Pendaftaran Dibuka Selama 30 Hari.']
			// 	req.session.flash = {
			// 		err : info,
			// 	}
			// 	res.redirect('/user/openclose');
			// 	return;
			// }
			open = req.param('opendate');
	        close = req.param('closedate');
	        var usrObj = {
	                opendate : req.param('opendate'),
	                closedate : req.param('closedate'),
	        }
	        User.update(req.session.User.id, usrObj, function(err, user){
	            if(err) return next(err);
	            var info = ['Tanggal Berhasil Disetting']
	             // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
	             // the key of usernamePasswordRequiredError
	             req.session.flash = {
	                 success: info,
	             }
	             res.redirect('/user/openclose');
	             return;
	         });
	    },
	    settestdate: function(req, res, next){
	        if (open == 'null' || close == 'null'){
	        	var info = ['Harap Tentukan Tanggal Pembukaan Dan Penutupan Terlebih Dahulu.']
	        	req.session.flash = {
	        		err : info,
	        	}
	        	res.redirect('/user/testadmin');
	        	return;
	        }

	        var test = req.param('test');

	        if (open > test || test < close){
	        	var info = ['Tanggal Ujian Harus Setelah Pendaftaran Ditutup']
	        	req.session.flash = {
	        		err : info,
	        	}
	        	res.redirect('/user/testadmin');
	        	return; 
	        }

	        var usrObj = {
	                testdate : req.param('testdate')
	        }
	        User.update(req.session.User.id, usrObj, function(err, user){
	            if(err) return next(err);
	            var info = ['Tanggal Berhasil Disetting']
	             // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
	             // the key of usernamePasswordRequiredError
	             req.session.flash = {
	                 success: info,
	             }
	             res.redirect('/user/testadmin');
	             return;
	         });
	    },
	    applyprofile : function(req,res,next){
	    	var nowdate = new Date().getFullYear();
	    	var birthdate = new Date(req.param('datebirth')).getFullYear();
			if (nowdate - birthdate < 13 || nowdate - birthdate > 18){
	    		var info = ['Anda belum cukup umur untuk mendaftar.']
	    		req.session.flash = {
	    			err : info,
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
			var handphone = req.param('handphone');
			for(var i=0;i<handphone.length;i++){
					if(handphone[i]<'0' || handphone[i]>'9'){
						var info = ['Nomor Handphone harus dalam bentuk angka (0-9)']
						 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
						 // the key of usernamePasswordRequiredError
						 req.session.flash = {
							 err: info,
						 }
						 res.redirect('/user/dashboard');
						 return;
					}
			}
			var fatherphone = req.param('fatherphone');
			for(var i=0;i<fatherphone.length;i++){
					if(fatherphone[i]<'0' || fatherphone[i]>'9'){
						var info = ['Nomor Telepon Ayah harus dalam bentuk angka (0-9)']
						 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
						 // the key of usernamePasswordRequiredError
						 req.session.flash = {
							 err: info,
						 }
						 res.redirect('/user/dashboard');
						 return;
					}
			}
			var motherphone = req.param('motherphone');
			for(var i=0;i<motherphone.length;i++){
					if(motherphone[i]<'0' || motherphone[i]>'9'){
						var info = ['Nomor Telepon Ibu harus dalam bentuk angka (0-9)']
						 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
						 // the key of usernamePasswordRequiredError
						 req.session.flash = {
							 err: info,
						 }
						 res.redirect('/user/dashboard');
						 return;
					}
			}
			var siblings = req.param('numbersiblings');
			for(var i=0;i<siblings.length;i++){
					if(siblings[i]<'0' || siblings[i]>'9'){
						var info = ['Mohon input jumlah saudara dengan angka.']
						 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
						 // the key of usernamePasswordRequiredError
						 req.session.flash = {
							 err: info,
						 }
						 res.redirect('/user/dashboard');
						 return;
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
				status : 1
			}
			User.update(req.session.User.id,usrObj,function(err,user){
					if(err) return next(err);
					var info = ['Formulir anda sedang kami proses. Silahkan lengkapi data yang lainnya.']
					 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
					 // the key of usernamePasswordRequiredError
					 req.session.flash = {
						 success: info,
					 }
					 res.redirect('/user/dashboard');
					 return;
			});
	    },
	    applygrade : function(req,res,next){
	    	var usrObj = {
	    		grade : req.param('grade'),
	    		previousschool : req.param('previousschoolname')
	    	}
	    	User.update(req.session.User.id,usrObj,function(err,user){
					if(err) return next(err);
					var info = ['Formulir anda sedang kami proses. Silahkan lengkapi data yang lainnya.']
					 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
					 // the key of usernamePasswordRequiredError
					 req.session.flash = {
						 success: info,
					 }
					 res.redirect('/user/grade');
					 return;
			});
	    },
	    applydocuments : function(req,res,next){
	    	var file1 = "";
			var file2 = "";
			var file3 = "";
			var file4 = "";

			var fileurl1 = "";
			var fileurl2 = "";
			var fileurl3 = "";
			var fileurl4 = "";

			if(typeof req.param('file_url_1')=="undefined") {
				var info = ['Anda harus mengupload akte lahir anda.']
				 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
				 // the key of usernamePasswordRequiredError
				 req.session.flash = {
					 err: info,
				 }
				 res.redirect('/user/documents');
				 return;
			}
			if(typeof req.param('file_url_2')=="undefined") {
				var info = ['Anda harus mengupload ijazah anda.']
				 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
				 // the key of usernamePasswordRequiredError
				 req.session.flash = {
					 err: info,
				 }
				 res.redirect('/user/documents');
				 return;
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
			buf = new Buffer(fileurl1.replace(/^data:image\/\w+;base64,/,""),'base64');
			fs.writeFile('akte lahir ' + req.session.User.id + '.jpg',buf,function(err,data){});
			buf = new Buffer(fileurl2.replace(/^data:image\/\w+;base64,/,""),'base64');
			fs.writeFile('ijazah ' + req.session.User.id + '.jpg',buf,function(err,data){});
			buf = new Buffer(fileurl3.replace(/^data:image\/\w+;base64,/,""),'base64');
			fs.writeFile('dok1 ' + req.session.User.id + '.jpg',buf,function(err,data){});
			buf = new Buffer(fileurl4.replace(/^data:image\/\w+;base64,/,""),'base64');
			fs.writeFile('dok2 ' + req.session.User.id + '.jpg',buf,function(err,data){});
			var usrObj = {
				file1 : file1,
				file2 : file2,
				file3 : file3,
				file4 : file4
			}
			User.update(req.session.User.id,usrObj,function(err,user){
					if(err) return next(err);
					var info = ['Formulir anda sedang kami proses. Silahkan lengkapi data yang lainnya.']
					 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
					 // the key of usernamePasswordRequiredError
					 req.session.flash = {
						 success: info,
					 }
					 res.redirect('/user/documents');
					 return;
			});
	    }
		// apply : function(req,res,next){
		// 		if(typeof req.param('name')=="undefined" || typeof req.param('address')=="undefined" || typeof req.param('placebirth')=="undefined" || typeof req.param('datebirth')=="undefined" || typeof req.param('phone')=="undefined"){
		// 			var info = ['Anda harus mengisi secara lengkap formulir yang sudah kami sediakan.']
		// 			 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
		// 			 // the key of usernamePasswordRequiredError
		// 			 req.session.flash = {
		// 				 err: info,
		// 			 }
		// 			 res.redirect('/user/dashboard');
		// 			 return;
		// 		}
		// 		var phone = req.param('phone');
		// 		for(var i=0;i<phone.length;i++){
		// 				if(phone[i]<'0' || phone[i]>'9'){
		// 					var info = ['Nomor Telepon harus dalam bentuk angka (0-9)']
		// 					 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
		// 					 // the key of usernamePasswordRequiredError
		// 					 req.session.flash = {
		// 						 err: info,
		// 					 }
		// 					 res.redirect('/user/dashboard');
		// 					 return;
		// 				}
		// 		}
		// 		var handphone = req.param('handphone');
		// 		for(var i=0;i<handphone.length;i++){
		// 				if(handphone[i]<'0' || handphone[i]>'9'){
		// 					var info = ['Nomor Handphone harus dalam bentuk angka (0-9)']
		// 					 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
		// 					 // the key of usernamePasswordRequiredError
		// 					 req.session.flash = {
		// 						 err: info,
		// 					 }
		// 					 res.redirect('/user/dashboard');
		// 					 return;
		// 				}
		// 		}
		// 		var fatherphone = req.param('fatherphone');
		// 		for(var i=0;i<fatherphone.length;i++){
		// 				if(fatherphone[i]<'0' || fatherphone[i]>'9'){
		// 					var info = ['Nomor Telepon harus dalam bentuk angka (0-9)']
		// 					 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
		// 					 // the key of usernamePasswordRequiredError
		// 					 req.session.flash = {
		// 						 err: info,
		// 					 }
		// 					 res.redirect('/user/dashboard');
		// 					 return;
		// 				}
		// 		}
		// 		var motherphone = req.param('motherphone');
		// 		for(var i=0;i<motherphone.length;i++){
		// 				if(motherphone[i]<'0' || motherphone[i]>'9'){
		// 					var info = ['Nomor Telepon harus dalam bentuk angka (0-9)']
		// 					 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
		// 					 // the key of usernamePasswordRequiredError
		// 					 req.session.flash = {
		// 						 err: info,
		// 					 }
		// 					 res.redirect('/user/dashboard');
		// 					 return;
		// 				}
		// 		}
		// 		var file1 = "";
		// 		var file2 = "";
		// 		var file3 = "";
		// 		var file4 = "";

		// 		var fileurl1 = "";
		// 		var fileurl2 = "";
		// 		var fileurl3 = "";
		// 		var fileurl4 = "";
		// 		// if(typeof req.param('file_url_1')=="undefined") {
		// 		// 	var info = ['Anda harus mengupload akte lahir anda']
		// 		// 	 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
		// 		// 	 // the key of usernamePasswordRequiredError
		// 		// 	 req.session.flash = {
		// 		// 		 err: info,
		// 		// 	 }
		// 		// 	 res.redirect('/user/dashboard');
		// 		// 	 return;
		// 		// }
		// 		// if(typeof req.param('file_url_2')=="undefined") {
		// 		// 	var info = ['Anda harus mengupload ijazah anda']
		// 		// 	 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
		// 		// 	 // the key of usernamePasswordRequiredError
		// 		// 	 req.session.flash = {
		// 		// 		 err: info,
		// 		// 	 }
		// 		// 	 res.redirect('/user/dashboard');
		// 		// 	 return;
		// 		// }
		// 		// if(typeof req.param('file_url_3')=="undefined") {
		// 		// 	var info = ['Anda harus mengupload dokumen pendukung 1 anda']
		// 		// 	 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
		// 		// 	 // the key of usernamePasswordRequiredError
		// 		// 	 req.session.flash = {
		// 		// 		 err: info,
		// 		// 	 }
		// 		// 	 res.redirect('/user/dashboard');
		// 		// 	 return;
		// 		// }
		// 		// if(typeof req.param('file_url_4')=="undefined") {
		// 		// 	var info = ['Anda harus mengupload dokumen pendukung 2 anda']
		// 		// 	 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
		// 		// 	 // the key of usernamePasswordRequiredError
		// 		// 	 req.session.flash = {
		// 		// 		 err: info,
		// 		// 	 }
		// 		// 	 res.redirect('/user/dashboard');
		// 		// 	 return;
		// 		// }
		// 		// if(typeof req.param('file_url_1')!="undefined") {
		// 		// 		var fs = require('fs');
		// 		// 		file1 = req.param('file_url_1');
		// 		// 		fs.write(new Buffer (file1));
		// 		// }
		// 		// if(typeof req.param('file_url_2')!="undefined") {
		// 		// 		var fs = require('fs');
		// 		// 		file2 = req.param('file_url_2');
		// 		// 		fs.write(new Buffer (file2));
		// 		// }
		// 		// if(typeof req.param('file_url_3')!="undefined") {
		// 		// 		var fs = require('fs');
		// 		// 		file3 = req.param('file_url_3');
		// 		// 		fs.write(new Buffer (file3));
		// 		// }
		// 		// if(typeof req.param('file_url_4')!="undefined") {
		// 		// 		var fs = require('fs');
		// 		// 		file4 = req.param('file_url_4');
		// 		// 		fs.write(new Buffer (file4));
		// 		// }
		// 		if(typeof req.param('file_url_1')=="undefined") {
		// 			var info = ['Anda harus mengupload akte lahir anda']
		// 			 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
		// 			 // the key of usernamePasswordRequiredError
		// 			 req.session.flash = {
		// 				 err: info,
		// 			 }
		// 			 res.redirect('/user/dashboard');
		// 			 return;
		// 		}
		// 		if(typeof req.param('file_url_2')=="undefined") {
		// 			var info = ['Anda harus mengupload ijazah anda']
		// 			 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
		// 			 // the key of usernamePasswordRequiredError
		// 			 req.session.flash = {
		// 				 err: info,
		// 			 }
		// 			 res.redirect('/user/dashboard');
		// 			 return;
		// 		}
		// 		if(typeof req.param('file_url_3')=="undefined") {
		// 			var info = ['Anda harus mengupload dokumen pendukung 1 anda']
		// 			 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
		// 			 // the key of usernamePasswordRequiredError
		// 			 req.session.flash = {
		// 				 err: info,
		// 			 }
		// 			 res.redirect('/user/dashboard');
		// 			 return;
		// 		}
		// 		if(typeof req.param('file_url_4')=="undefined") {
		// 			var info = ['Anda harus mengupload dokumen pendukung 2 anda']
		// 			 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
		// 			 // the key of usernamePasswordRequiredError
		// 			 req.session.flash = {
		// 				 err: info,
		// 			 }
		// 			 res.redirect('/user/dashboard');
		// 			 return;
		// 		}
		// 		if(typeof req.param('file_url_1')!="undefined") {
		// 				file1 = req.param('file_name_1');
		// 				fileurl1 = req.param('file_url_1');
		// 		}
		// 		if(typeof req.param('file_url_2')!="undefined") {
		// 				file2 = req.param('file_name_2');
		// 				fileurl2 = req.param('file_url_2');
		// 		}
		// 		if(typeof req.param('file_url_3')!="undefined") {
		// 				file3 = req.param('file_name_3');
		// 				fileurl3 = req.param('file_url_3');
		// 		}
		// 		if(typeof req.param('file_url_4')!="undefined") {
		// 				file4 = req.param('file_name_4');
		// 				fileurl4 = req.param('file_url_4');
		// 		}
		// 		buf = new Buffer(fileurl1.replace(/^data:image\/\w+;base64,/,""),'base64');
		// 		fs.writeFile('akte lahir ' + req.session.User.id + '.jpg',buf,function(err,data){});
		// 		buf = new Buffer(fileurl2.replace(/^data:image\/\w+;base64,/,""),'base64');
		// 		fs.writeFile('ijazah ' + req.session.User.id + '.jpg',buf,function(err,data){});
		// 		buf = new Buffer(fileurl3.replace(/^data:image\/\w+;base64,/,""),'base64');
		// 		fs.writeFile('dok1 ' + req.session.User.id + '.jpg',buf,function(err,data){});
		// 		buf = new Buffer(fileurl4.replace(/^data:image\/\w+;base64,/,""),'base64');
		// 		fs.writeFile('dok2 ' + req.session.User.id + '.jpg',buf,function(err,data){});

		// 		var usrObj = {
		// 				grade : req.param('grade'),
		// 				name : req.param('name'),
		// 				address : req.param('address'),
		// 				placebirth : req.param('placebirth'),
		// 				datebirth : req.param('datebirth'),
		// 				gender : req.param('gender'),
		// 				phone : req.param('phone'),
		// 				handphone : req.param('handphone'),
		// 				fathername : req.param('fathername'),
		// 				fatheroccupation : req.param('fatheroccupation'),
		// 				fathersalary : req.param('fathersalary'),
		// 				fatherphone : req.param('fatherphone'),
		// 				mothername : req.param('mothername'),
		// 				motheroccupation : req.param('motheroccupation'),
		// 				mothersalary : req.param('mothersalary'),
		// 				motherphone : req.param('motherphone'),
		// 				numbersiblings : req.param('numbersiblings'),
		// 				status : 1,
		// 				file1 : file1,
		// 				file2 : file2,
		// 				file3 : file3,
		// 				file4 : file4
		// 			}
		// 			User.update(req.session.User.id,usrObj,function(err,user){
		// 					if(err) return next(err);
		// 					var info = ['Formulir anda sedang kami proses.']
		// 					 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
		// 					 // the key of usernamePasswordRequiredError
		// 					 req.session.flash = {
		// 						 success: info,
		// 					 }
		// 					 res.redirect('/user/dashboard');
		// 					 return;
		// 			});
		// },
};
