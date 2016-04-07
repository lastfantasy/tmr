module.exports = {
 setopenclose: function(req, res){
        var opendate = req.param('opendate');
        var closedate = req.param('closedate');
        User.update({opendate:opendate}, {closedate:closedate}).exec(function afterwards(err, updated){
        	if (err) return err;

        	var info = ['Tanggal Berhasil Disetting']
        	req.flash = {success : info,}
        	res.redirect('/user/openclose');
        	return;
        });
    }
};