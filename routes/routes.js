module.exports = function Route(app){
  app.get('/', function(req, res){
    res.render('index');
    // req.session.id = req.body.id;
    // console.log("session:" + req.session.id);
  })
}
