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
		kartuujian : function(req,res,next){
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
			if (req.param('aktelahir') == "on" && req.param('ijazah') == "on" && req.param('pasfoto') == "on" && req.param('rapor') == "on"){
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
	        var _idgrade0 = req.session.User.idgrade0;
	        var _idgrade1 = req.session.User.idgrade1;
	        var _idgrade2 = req.session.User.idgrade2;
	        var _idgrade3 = req.session.User.idgrade3;
	        var _idgrade4 = req.session.User.idgrade4;
	        var _idgrade5 = req.session.User.idgrade5;

	        var smp1 = req.param('jlhsmp1');
	        var smp2 = req.param('jlhsmp2');
	        var smp3 = req.param('jlhsmp3');
	        var sma1 = req.param('jlhsma1');
	        var sma2 = req.param('jlhsma2');
	        var sma3 = req.param('jlhsma3');

	        if (smp1 < 0 || smp2 < 0 || smp3 < 0 || sma1 < 0 || sma2 < 0 || sma3 < 0){
	        	var info = ['Jumlah Siswa Tidak Boleh Kurang Dari 0.']
				req.session.flash = {
					err : info,
				}
				res.redirect('/user/testadmin');
				return;
	        }
	        var usrObj = {
                testdate : req.param('testdate'),
                smp1 : smp1,
                smp2 : smp2,
                smp3 : smp3,
                sma1 : sma1,
                sma2 : sma2,
                sma3 : sma3,
	        }
	        User.update(req.session.User.id, usrObj, function(err, user){});
	        User.find({admin : false, status : 1, grade : "0", nousm : "-"}).limit(smp1).exec (function(err, users){
	        	for (var i = 0; i < users.length; i++){
	        		_idgrade0 ++;
	        		var string_id0 = users[i].createdAt.getFullYear() + "-000-" + _idgrade0;
	        		User.update(req.session.User.id, {idgrade0 : _idgrade0}, function(err, user){});
	        		User.update(users[i].id, {testdate : req.param('testdate'), nousm : string_id0}, function(err, usersss){});
	        	}
	        });
	        User.find({admin : false, status : 1, grade : "1", nousm : "-"}).limit(smp2).exec (function(err, users){
	        	for (var i = 0; i < users.length; i++){
	        		_idgrade1 ++;
	        		var string_id1 = users[i].createdAt.getFullYear() + "-001-" + _idgrade1;
	        		User.update(req.session.User.id, {idgrade1 : _idgrade1}, function(err, user){});
	        		User.update(users[i].id, {testdate : req.param('testdate'), nousm : string_id1}, function(err, usersss){});
	        	}
	        });
	        User.find({admin : false, status : 1, grade : "2", nousm : "-"}).limit(smp3).exec (function(err, users){
	        	for (var i = 0; i < users.length; i++){
	        		_idgrade2 ++;
	        		var string_id2 = users[i].createdAt.getFullYear() + "-002-" + _idgrade2;
	        		User.update(req.session.User.id, {idgrade2 : _idgrade2}, function(err, user){});
	        		User.update(users[i].id, {testdate : req.param('testdate'), nousm : string_id2}, function(err, usersss){});
	        	}
	        });
	        User.find({admin : false, status : 1, grade : "3", nousm : "-"}).limit(sma1).exec (function(err, users){
	        	for (var i = 0; i < users.length; i++){
	        		_idgrade3 ++;
	        		var string_id3 = users[i].createdAt.getFullYear() + "-003-" + _idgrade3;
	        		User.update(req.session.User.id, {idgrade3 : _idgrade3}, function(err, user){});
	        		User.update(users[i].id, {testdate : req.param('testdate'), nousm : string_id3}, function(err, usersss){});
	        	}
	        });
	        User.find({admin : false, status : 1, grade : "4", nousm : "-"}).limit(sma2).exec (function(err, users){
	        	for (var i = 0; i < users.length; i++){
	        		_idgrade4 ++;
	        		var string_id4 = users[i].createdAt.getFullYear() + "-004-" + _idgrade4;
	        		User.update(req.session.User.id, {idgrade4 : _idgrade4}, function(err, user){});
	        		User.update(users[i].id, {testdate : req.param('testdate'), nousm : string_id4}, function(err, usersss){});
	        	}
	        });
	        User.find({admin : false, status : 1, grade : "5", nousm : "-"}).limit(sma3).exec (function(err, users){
	        	for (var i = 0; i < users.length; i++){
	        		_idgrade5 ++;
	        		var string_id5 = users[i].createdAt.getFullYear() + "-005-" + _idgrade5;
	        		User.update(req.session.User.id, {idgrade5 : _idgrade5}, function(err, user){});
	        		User.update(users[i].id, {testdate : req.param('testdate'), nousm : string_id5}, function(err, usersss){});
	        	}
	        });
	        var info = ['Tanggal Berhasil Disetting']
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
			User.update(req.session.User.id,usrObj,function(err,user){
					if(err) return next(err);
					var info = ['Formulir anda sedang kami proses. Silahkan lengkapi data yang lainnya.']
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
	    		previousschool : req.param('previousschoolname'),
	    		grade_status : 1
    		}
	    	User.update(req.session.User.id,usrObj,function(err,user){
					if(err) return next(err);
					var info = ['Formulir anda sedang kami proses. Silahkan lengkapi data yang lainnya.']
					 req.session.flash = {
						 success: info,
					 }
					 res.redirect('/user/grade');
					 return;
			});
	    },
	    applydocuments : function(req,res,next){
	    	var files = [];

			if(!req.session.User.files[0] && req.param('file_url_1') == "") {
				var info = ['Anda harus mengupload akte lahir anda.']
				 req.session.flash = {
					 err: info,
				 }
				 res.redirect('/user/documents');
				 return;
			}
			if(req.param('file_url_2')=="" && !req.session.User.files[1]) {
				var info = ['Anda harus mengupload ijazah anda.']
				 req.session.flash = {
					 err: info,
				 }
				 res.redirect('/user/documents');
				 return;
			}
			if(!req.session.User.files[2] && req.param('file_url_3') == "") {
				var info = ['Anda harus mengupload pas foto anda.']
				 req.session.flash = {
					 err: info,
				 }
				 res.redirect('/user/documents');
				 return;
			}
			if(req.param('file_url_4')=="" && !req.session.User.files[3]) {
				var info = ['Anda harus mengupload rapor anda.']
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
			}
			if(req.param('file_url_2') != "") {
					files[1] = {name : "", url : ""};
					files[1].name = req.param('file_name_2');
					files[1].url = req.param('file_url_2');
			}
			if(req.param('file_url_3') != "") {
					files[2] = {name : "", url : ""};
					files[2].name = req.param('file_name_3');
					files[2].url = req.param('file_url_3');
			}
			if(req.param('file_url_4') != "") {
					files[3] = {name : "", url : ""};
					files[3].name = req.param('file_name_4');
					files[3].url = req.param('file_url_4');
			}
			var usrObj = {
				files : files,
				documents_status : 1,
				verifyremarks : "Harap Menyerahkan Dokumen Asli Ke Sekolah Sebelum Pendaftaran Berakhir"
			}
			User.update(req.session.User.id,usrObj,function(err,user){
					if(err) return next(err);
					var info = ['Formulir anda sedang kami proses. Silahkan lengkapi data yang lainnya.']
					 req.session.flash = {
						 success: info,
					 }
					 res.redirect('/user/documents');
					 return;
			});
	    }
};
