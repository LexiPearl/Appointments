var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports={
        login: function(req, res){
             console.log("at users.js login", req.body)
             User.findOne({name: req.body.name}, function(err, user){
                 if(!user){
                     var user = new User(req.body)
                        user.save(function(err){
                            if(err){
                                console.log('something went wrong')
                                console.log(err)
                                res.json(err)
                            }
                            else{
                                console.log('successfully added a new name');
                                res.json({logged_in:true, user:user})
                            }
                        })
                    }
                else{
                    console.log(user.name)
                    console.log('user exists and is now logged in')
                    res.json({logged_in:true, user:user})
                }
            })
            },
      }
