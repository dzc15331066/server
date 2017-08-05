var express =  require('express');
var userService = require('../services/user.service');
var router = express.Router();

module.exports = router;

router.post('/authenticate/', authenticate);
router.post('/register/', register);

//Update User
router.put('/:username',function(req, res, next){
    var updateInfo = req.body;
    User[req.params.userType].where({username:req.params.username,password:updateInfo.password}).update(updateInfo.data, function(err, doc){
        if(err){
            res.send(err);
        }
        res.json({msg:"user updated successfully",doc:doc});
    });
});

function authenticate(req, res){
    userService.authenticate(req.body.userType,req.body.username,req.body.password)
        .then(function(user) {
            if(user) {
                //authenticate successful
                res.send(user);
            }
            else {
                //authenticate failed
                res.send({error:'username or password is incorrect'});
            }
        })
        .catch(function(err){
            res.status(400).send(err);
        });
}

function register(req, res) {
    userService.addUser(req.body)
        .then(function(data){
            res.send(data);
        })
        .catch(function(err){
            console.log(err);
            res.status(400).send(err);
        });
}