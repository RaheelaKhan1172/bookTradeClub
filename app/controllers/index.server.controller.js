exports.render = function(req,res) {
  res.render('index', {
      userFullName: req.user? req.user.firstName : '',
  });
}
