const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const service = {};

service.authenticate = authenticate;
//service.getUser = getUser;
service.addUser = addUser;
//service.update = update;

module.exports = service;

function authenticate(userType, username, password) {
    return new Promise(function(resolve,reject){
        User[userType].findOne({username:username},function(err,user){
            if(err){
                reject(err);
            }
            else if(user && bcrypt.compareSync(password, user.password)){
                jwt.sign({userType:userType,username:username},process.env.SECRET_KEY,function(error,token){
                    if(error){
                        reject(error);
                    }
                    else{

                        var data = _.omit(user.toJSON(), ['password', '_id', '__v']);
                        data.token = token;
                        resolve(data);
                    }
                    
                });
            }
            else {
                resolve();
            }
        });
    });
}

function addUser(userData){
    return new Promise(function(resolve,reject){
        User[userData.userType].findOne({username: userData.username}, function(err,doc){
            if(err){
                reject(err);
            }
            else if(doc){
                resolve({msg:"username duplicated"});
            }
            else{
                const schema = User[userData.userType];
                userData.password = bcrypt.hashSync(userData.password,10);
                const user = new schema(userData);
                user.save(function(err){
                    if(err){
                        reject(err);
                    }
                    else resolve({msg:"success"});
                });
            }
        });
    });
}