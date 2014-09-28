var express = require('express');
var router = express.Router();
var session = require('services/session');

/* GET home page. */
router.get('/', function(req, res) {
  
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req,res){
   var email = req.body.email;
    session.create(email);
    var sessionData = session.get(email);
    sesionData.loggedInAt = new Date();
    
   res.cookie('authToken',email);  
});

module.exports = router;
