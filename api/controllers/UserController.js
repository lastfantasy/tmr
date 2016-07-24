/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 var fs = require('fs');
 var open = 'null';
 var close = 'null';
 var tmpstatus = 0;

module.exports = {
		openclose : function(req,res,next){
			User.findOne(req.session.User.id, function(err,user){
				return res.view({user:user});
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
					var info = ['Pendaftaran Belum Dibuka.']
					req.session.flash = {
						err : info,
					}
					res.redirect('/user/homesiswa');
					return;
				}
				else if (nowdate > closedate){
					var info = ['Pendaftaran Sudah Ditutup.']
					req.session.flash = {
						err : info,
					}
					res.redirect('/user/homesiswa');
					return;
				}
				res.redirect('/user/dashboard');
				return;
			});
			
		},
		verifyapplicant : function(req,res,next){
			User.find({admin:false},function(err,users){
				return res.view({users:users});
			});
		},
		verifydocument : function(req,res,next){
			User.findOne(req.param('id'), function(err,user){
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
		verifyuser : function(req,res,next){
			if (req.param('aktelahir') == "on" && req.param('ijazah') == "on" && req.param('dokumenpendukung1') == "on" && req.param('dokumenpendukung2') == "on"){
				User.update(req.param('id'), {status : 1, verifyremarks : req.param('verifyremarks')}, function(err, user){
					if (err) return next(err);
					res.redirect('/user/verifyapplicant');
					return;
				});
			}
			else {
				User.update(req.param('id'), {status : 2, verifyremarks : req.param('verifyremarks')}, function(err, user){
					if (err) return next(err);
					res.redirect('/user/verifyapplicant');
					return;
				});
			}
		},
		setopenclose: function(req, res, next){
			var nowdate = new Date();
			var opendate = new Date(req.param('opendate'));
			var closedate = new Date(req.param('closedate'));
			if (opendate >= nowdate){
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
			}
			else {
				var info = ['Tanggal Pembukaan Tidak Boleh Kurang Dari Tanggal Hari Ini.']
				req.session.flash = {
					err : info,
				}
				res.redirect('/user/openclose');
				return;
			}	
	    },
	    settestdate: function(req, res, next){
	        // if (open == null || close == null){
	        // 	var info = ['Harap Tentukan Tanggal Pembukaan Dan Penutupan Terlebih Dahulu.']
	        // 	req.session.flash = {
	        // 		err : info,
	        // 	}
	        // 	res.redirect('/user/testadmin');
	        // 	return;
	        // }

	        // var test = req.param('testdate');

	        // if (open > test || test < close){
	        // 	var info = ['Tanggal Ujian Harus Setelah Pendaftaran Ditutup']
	        // 	req.session.flash = {
	        // 		err : info,
	        // 	}
	        // 	res.redirect('/user/testadmin');
	        // 	return; 
	        // }

	        var _idgrade0 = req.session.User.idgrade0;
	        var _idgrade1 = req.session.User.idgrade1;
	        var _idgrade2 = req.session.User.idgrade2;
	        var _idgrade3 = req.session.User.idgrade3;
	        var _idgrade4 = req.session.User.idgrade4;
	        var _idgrade5 = req.session.User.idgrade5;

	        // var usrObj = {
	        //         idgrade0 : _idgrade0,
	        //         idgrade1 : _idgrade1,
	        //         idgrade2 : _idgrade2,
	        //         idgrade3 : _idgrade3,
	        //         idgrade4 : _idgrade4,
	        //         idgrade5 : _idgrade5,
	        //         testdate : req.param('testdate')
	        // }
	        User.find({admin : false, status : 1, grade : "0"}).limit(20).exec (function(err, users){
	        	for (var i = 0; i < users.length; i++){
	        		_idgrade0 ++;
	        		var string_id0 = users[i].createdAt.getYear() + "-000-" + _idgrade0;
	        		User.update(req.session.User.id, {idgrade0 : _idgrade0, testdate : req.param('testdate')}, function(err, user){});
	        		User.update(users[i].id, {testdate : req.param('testdate'), nousm : string_id0}, function(err, usersss){});
	        	}
	        });
	        User.find({admin : false, status : 1, grade : "1"}).limit(20).exec (function(err, users){
	        	for (var i = 0; i < users.length; i++){
	        		_idgrade1 ++;
	        		var string_id1 = users[i].createdAt.getYear() + "-001-" + _idgrade1;
	        		User.update(req.session.User.id, {idgrade1 : _idgrade1, testdate : req.param('testdate')}, function(err, user){});
	        		User.update(users[i].id, {testdate : req.param('testdate'), nousm : string_id1}, function(err, usersss){});
	        	}
	        });
	        User.find({admin : false, status : 1, grade : "2"}).limit(20).exec (function(err, users){
	        	for (var i = 0; i < users.length; i++){
	        		_idgrade2 ++;
	        		var string_id2 = users[i].createdAt.getYear() + "-002-" + _idgrade2;
	        		User.update(req.session.User.id, {idgrade2 : _idgrade2, testdate : req.param('testdate')}, function(err, user){});
	        		User.update(users[i].id, {testdate : req.param('testdate'), nousm : string_id2}, function(err, usersss){});
	        	}
	        });
	        User.find({admin : false, status : 1, grade : "3"}).limit(20).exec (function(err, users){
	        	for (var i = 0; i < users.length; i++){
	        		_idgrade3 ++;
	        		var string_id3 = users[i].createdAt.getFullYear() + "-003-" + _idgrade3;
	        		User.update(req.session.User.id, {idgrade3 : _idgrade3, testdate : req.param('testdate')}, function(err, user){});
	        		User.update(users[i].id, {testdate : req.param('testdate'), nousm : string_id3}, function(err, usersss){});
	        	}
	        });
	        User.find({admin : false, status : 1, grade : "4"}).limit(20).exec (function(err, users){
	        	for (var i = 0; i < users.length; i++){
	        		_idgrade4 ++;
	        		var string_id4 = users[i].createdAt.getFullYear() + "-004-" + _idgrade4;
	        		User.update(req.session.User.id, {idgrade4 : _idgrade4, testdate : req.param('testdate')}, function(err, user){});
	        		User.update(users[i].id, {testdate : req.param('testdate'), nousm : string_id4}, function(err, usersss){});
	        	}
	        });
	        User.find({admin : false, status : 1, grade : "5"}).limit(20).exec (function(err, users){
	        	for (var i = 0; i < users.length; i++){
	        		_idgrade5 ++;
	        		var string_id5 = users[i].createdAt.getFullYear() + "-005-" + _idgrade5;
	        		User.update(req.session.User.id, {idgrade5 : _idgrade5, testdate : req.param('testdate')}, function(err, user){});
	        		User.update(users[i].id, {testdate : req.param('testdate'), nousm : string_id5}, function(err, usersss){});
	        	}
	        });
	        // User.update(req.session.User.id, {
        	// 	idgrade0 : _idgrade0,
        	// 	idgrade1 : _idgrade1,
        	// 	idgrade2 : _idgrade2,
         //        idgrade3 : _idgrade3,
         //        idgrade4 : _idgrade4,
         //        idgrade5 : _idgrade5,
         //        testdate : req.param('testdate')}, function(err, user){
         //        	console.log(user.idgrade5);
	        //     if(err) return next(err);
	        //     // var info = ['Tanggal Berhasil Disetting']
	        //     //  // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
	        //     //  // the key of usernamePasswordRequiredError
	        //     //  req.session.flash = {
	        //     //      success: info,
	        //      // }
	        // });
	        var info = ['Tanggal Berhasil Disetting']
	        // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
	        // the key of usernamePasswordRequiredError
	        req.session.flash = {
	            success: info,
	        }
	        res.redirect('/user/testadmin');
	        return;
	    },
	    userpass : function(req,res,next){
	    	User.update(req.param('id'), {status : 3, verifyremarks : "Selamat, Anda Lulus."}, function(err, user){
	    		res.redirect('/user/verifyapplicant')
	    	});
	    },
	    userfail : function(req,res,next){
	    	User.update(req.param('id'), {status : 4, verifyremarks : "Maaf, Anda Gagal."}, function(err, user){
	    		res.redirect('/user/verifyapplicant')
	    	});
	    },
	    applyprofile : function(req,res,next){
	    	tmpstatus ++;
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
				dashboard_status : 1
			}
			// if (tmpstatus == 3){
			// 	tmpstatus = 0;

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
	    	tmpstatus ++;
	    	var usrObj = {
	    		grade : req.param('grade'),
	    		previousschool : req.param('previousschoolname'),
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
	    	tmpstatus ++;

	    	var files = [];
	    	// files[0] = {};
	    	// files[1] = {};
	    	// files[2] = {};
	    	// files[3] = {};

	  //   	var file1 = "";
			// var file2 = "";
			// var file3 = "";
			// var file4 = "";

			// var fileurl1 = "";
			// var fileurl2 = "";
			// var fileurl3 = "";
			// var fileurl4 = "";

			if(!req.session.User.files[0] && req.param('file_url_1') == "") {
				var info = ['Anda harus mengupload akte lahir anda.']
				 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
				 // the key of usernamePasswordRequiredError
				 req.session.flash = {
					 err: info,
				 }
				 res.redirect('/user/documents');
				 return;
			}
			if(req.param('file_url_2')=="" && !req.session.User.files[1]) {
				var info = ['Anda harus mengupload ijazah anda.']
				 // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
				 // the key of usernamePasswordRequiredError
				 req.session.flash = {
					 err: info,
				 }
				 res.redirect('/user/documents');
				 return;
			}
			if(req.param('file_url_1') != "") {
					files[0] = {name : "", url : ""};
					files[0].name = req.param('file_name_1');
					files[0].url = req.param('file_url_1');
					// file1 = req.param('file_name_1');
					// fileurl1 = req.param('file_url_1');
			}
			if(req.param('file_url_2') != "") {
					files[1] = {name : "", url : ""};
					files[1].name = req.param('file_name_2');
					files[1].url = req.param('file_url_2');
					// file2 = req.param('file_name_2');
					// fileurl2 = req.param('file_url_2');		
			}
			if(req.param('file_url_3') != "") {
					files[2] = {name : "", url : ""};
					files[2].name = req.param('file_name_3');
					files[2].url = req.param('file_url_3');
					// file3 = req.param('file_name_3');
					// fileurl3 = req.param('file_url_3');		
			}
			if(req.param('file_url_4') != "") {
					files[3] = {name : "", url : ""};
					files[3].name = req.param('file_name_4');
					files[3].url = req.param('file_url_4');
					// file4 = req.param('file_name_4');
					// fileurl4 = req.param('file_url_4');		
			}
			// buf = new Buffer(fileurl1.replace(/^data:image\/\w+;base64,/,""),'base64');
			// fs.writeFile('akte lahir ' + req.session.User.id + '.jpg',buf,function(err,data){});
			// buf = new Buffer(fileurl2.replace(/^data:image\/\w+;base64,/,""),'base64');
			// fs.writeFile('ijazah ' + req.session.User.id + '.jpg',buf,function(err,data){});
			// buf = new Buffer(fileurl3.replace(/^data:image\/\w+;base64,/,""),'base64');
			// fs.writeFile('dok1 ' + req.session.User.id + '.jpg',buf,function(err,data){});
			// buf = new Buffer(fileurl4.replace(/^data:image\/\w+;base64,/,""),'base64');
			// fs.writeFile('dok2 ' + req.session.User.id + '.jpg',buf,function(err,data){});
			var usrObj = {
				files : files,
				// file1 : file1,
				// file2 : file2,
				// file3 : file3,
				// file4 : file4,
				documents_status : 1,
				verifyremarks : "Harap Menyerahkan Dokumen Asli Ke Sekolah Sebelum Pendaftaran Berakhir"
			}
			// if (tmpstatus == 3){
			// 	tmpstatus = 0;
			// 	var usrObj = {
			// 		files : files,
			// 		// file1 : file1,
			// 		// file2 : file2,
			// 		// file3 : file3,
			// 		// file4 : file4,
			// 		documents_status : 1,
			// 		verifyremarks : "Harap Menyerahkan Dokumen Asli Ke Sekolah Sebelum Tanggal XX-XX-XXXX"
			// 	}
			// }
			// else {
			// 	var usrObj = {
			// 		files : files,
			// 		// file1 : file1,
			// 		// file2 : file2,
			// 		// file3 : file3,
			// 		// file4 : file4,
			// 		documents_status : 1
			// 	}
			// }
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
