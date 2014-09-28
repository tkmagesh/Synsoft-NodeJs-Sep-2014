var express = require('express');
var session = require("session");
var router = express.Router();
var fs = require('fs');

var taskRepository = [
    {id : 1, name : "Learn JavaScript", isCompleted : false},
    {id : 2, name : "Explore Angular.js", isCompleted : false},
    {id : 3, name : "Master Node.js", isCompleted : true},
    {id : 4, name : "Automate development workflow", isCompleted : false}
]

/* GET users listing. */
router.get('/', function(req, res) {
  if (!req.cookies["myCookie"]){
      res.redirect('/');
  } else {
  res.render('tasks/list', {tasks : taskRepository});
  }
});

router.get('/new', function(req, res) {
  res.render('tasks/new');
});

router.post('/new',function(req,res) {
    var newTask = {
        id : taskRepository.length + 1,
        name : req.body.taskName,
        isCompleted : false
    };
    taskRepository.push(newTask);
    fs.writeFile('tasks.json',JSON.stringify(taskRepository), function(){
        res.render('tasks/list', {tasks : taskRepository, user : });
    });
});

module.exports = router;