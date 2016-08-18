/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 var fs = require('fs');
 var nodemailer = require('nodemailer');
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
			var info = "";
			var usrFind = {
				admin : false
			}
			if (req.param('filternama') != '' && typeof(req.param('filternama')) != "undefined"){
				info = ['Data Berhasil Disaring.']
				usrFind.name = req.param('filternama');
			}
			if (req.param('filternousm') != '' && typeof(req.param('filternousm')) != "undefined"){
				info = ['Data Berhasil Disaring.']
				usrFind.nousm = req.param('filternousm');
			}
			if (req.param('filtertingkatan') != '' && typeof(req.param('filtertingkatan')) != "undefined"){
				info = ['Data Berhasil Disaring.']
				usrFind.grade = req.param('filtertingkatan');
			}
			if (req.param('filtersekolah') != '' && typeof(req.param('filtersekolah')) != "undefined"){
				info = ['Data Berhasil Disaring.']
				usrFind.previousschoolname = req.param('filtersekolah');
			}
			if (req.param('filterstatus') != '' && typeof(req.param('filterstatus')) != "undefined"){
				info = ['Data Berhasil Disaring.']
				usrFind.status = req.param('filterstatus');
			}
			User.find(usrFind,function(err,users){
				if (info != ""){
					req.session.flash = {
						success : info
					}
				}
				return res.view({users:users});
			});
		},
		verifydocument : function(req,res,next){
			User.findOne(req.param('id'), function(err,user){
				return res.view({user:user});
			});
		},
		laporan : function(req,res,next){
			User.find({admin:false}, function(err, users1){
				var totalujian1 = 0;
				var totalujian2 = 0;
				var totalujian3 = 0;
				var totalujian4 = 0;
				var totalujian5 = 0;
				var totalujian6 = 0;
				var totalujian7 = 0;
				var totalujian8 = 0;
				var _date1, _date2, _date3, _date4, _date5, _date6, _date7, _date8;
				_date1 = new Date("2016-08-06");
				_date2 = new Date("2016-08-20");
				_date3 = new Date("2016-09-03");
				_date4 = new Date("2016-09-17");
				_date5 = new Date("2016-10-01");
				_date6 = new Date("2016-10-15");
				_date7 = new Date("2016-10-29");
				_date8 = new Date("2016-11-12");
				for (var i = 0; i < users1.length; i++){
					if (users1[i].testdate){
						var userdate = new Date(users1[i].testdate).getDate();
						var usermonth = new Date(users1[i].testdate).getMonth();
						var useryear = new Date(users1[i].testdate).getFullYear();
						if (userdate == _date1.getDate() && usermonth == _date1.getMonth()+1 && useryear == _date1.getFullYear()){
							totalujian1++;
						}
						else if (userdate == _date2.getDate() && usermonth == _date2.getMonth()+1 && useryear == _date2.getFullYear()){
							totalujian2++;
						}
						else if (userdate == _date3.getDate() && usermonth == _date3.getMonth()+1 && useryear == _date3.getFullYear()){
							totalujian3++;
						}
						else if (userdate == _date4.getDate() && usermonth == _date4.getMonth()+1 && useryear == _date4.getFullYear()){
							totalujian4++;
						}
						else if (userdate == _date5.getDate() && usermonth == _date5.getMonth()+1 && useryear == _date5.getFullYear()){
							totalujian5++;
						}
						else if (userdate == _date6.getDate() && usermonth == _date6.getMonth()+1 && useryear == _date6.getFullYear()){
							totalujian6++;
						}
						else if (userdate == _date7.getDate() && usermonth == _date7.getMonth()+1 && useryear == _date7.getFullYear()){
							totalujian7++;
						}
						else if (userdate == _date8.getDate() && usermonth == _date8.getMonth()+1 && useryear == _date8.getFullYear()){
							totalujian8++;
						}
					}
				}
				var usrObj = {
					totaldaftar : users1.length,
					totalujian1 : totalujian1,
					totalujian2 : totalujian2,
					totalujian3 : totalujian3,
					totalujian4 : totalujian4,
					totalujian5 : totalujian5,
					totalujian6 : totalujian6,
					totalujian7 : totalujian7,
					totalujian8 : totalujian8,
				}
				User.update(req.session.User.id, usrObj, function(err, _user){});
			});
			User.find({admin:false, status:0}, function(err, users2){
				User.update(req.session.User.id, {totalpending : users2.length}, function(err, _user){});
			});
			User.find({admin:false, status:1}, function(err, users3){
				User.update(req.session.User.id, {totalverified : users3.length}, function(err, _user){});
			});
			User.find({admin:false, status:2}, function(err, users4){
				User.update(req.session.User.id, {totaldenied : users4.length}, function(err, _user){});
			});
			User.find({admin:false, status:3}, function(err, users5){
				User.update(req.session.User.id, {totalpassed : users5.length}, function(err, _user){});
			});
			User.find({admin:false, status:4}, function(err, users6){
				User.update(req.session.User.id, {totalfailed : users6.length}, function(err, _user){});
			});
			// var _date1, _date2, _date3, _date4, _date5, _date6, _date7, _date8;
			// _date1 = new Date("2016-08-06");
			// User.find({admin:false, testdate:_date1}, function(err, usersujian1){
			// 	User.update(req.session.User.id, {totalujian1 : usersujian1.length}, function(err, _user){});
			// });
			// _date2 = new Date("2016-08-20");
			// User.find({admin:false, testdate:_date2}, function(err, usersujian2){
			// 	User.update(req.session.User.id, {totalujian2 : usersujian2.length}, function(err, _user){});
			// });
			// _date3 = new Date("2016-09-03");
			// User.find({admin:false, testdate:_date3}, function(err, usersujian3){
			// 	User.update(req.session.User.id, {totalujian3 : usersujian3.length}, function(err, _user){});
			// });
			// _date4 = new Date("2016-09-17");
			// User.find({admin:false, testdate:_date4}, function(err, usersujian4){
			// 	User.update(req.session.User.id, {totalujian4 : usersujian4.length}, function(err, _user){});
			// });
			// _date5 = new Date("2016-10-01");
			// User.find({admin:false, testdate:_date5}, function(err, usersujian5){
			// 	User.update(req.session.User.id, {totalujian5 : usersujian5.length}, function(err, _user){});
			// });
			// _date6 = new Date("2016-10-15");
			// User.find({admin:false, testdate:_date6}, function(err, usersujian6){
			// 	User.update(req.session.User.id, {totalujian6 : usersujian6.length}, function(err, _user){});
			// });
			// _date7 = new Date("2016-10-29");
			// User.find({admin:false, testdate:_date7}, function(err, usersujian7){
			// 	User.update(req.session.User.id, {totalujian7 : usersujian7.length}, function(err, _user){});
			// });
			// _date8 = new Date("2016-11-12");
			// User.find({admin:false, testdate:_date8}, function(err, usersujian8){
			// 	User.update(req.session.User.id, {totalujian8 : usersujian8.length}, function(err, _user){});
			// });
			User.findOne(req.session.User.id, function(err, user){
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
	    	var nowdate = new Date();
	    	var testdate = new Date(req.param('testdate'));
	    	if (testdate <= nowdate){
	    		var info = ['Tanggal Ujian Tidak Boleh Kurang Dari Tanggal Hari Ini.']
	    		req.session.flash = {
	    			err : info,
	    		}
	    		res.redirect('/user/testadmin');
	    		return;
	    	}

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
			if (nowdate - birthdate < 10 || nowdate - birthdate > 20){
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
	    	var previousschool = "";
	    	if (req.param('statusmurid') == 'temanis'){
	    		previousschool = "Temanis Baru";
	    	}
	    	if (req.param('statusmurid') == 'pindahan' && req.param('previousschoolname') != ""){
	    		previousschool = req.param('previousschoolname');
	    	}
	    	var usrObj = {
	    		statusmurid : req.param('statusmurid'),
	    		grade : req.param('grade'),
	    		previousschool : previousschool,
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
