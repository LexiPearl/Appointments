
var users= require('../controllers/users.js')
var appointments=require('../controllers/appointments.js')

module.exports=function(app){
    app.post('/login', function(req,res){
        console.log("this is login req body at routes login", req.body)
        users.login(req,res)
    });
    app.get('/dashboard', function(req,res){
        appointments.dashboard(req,res)
    });
    app.post('/newAppointment', function(req, res){
        console.log("this is the req.body from newAppointment at routes newAppointment", req.body)
        appointments.newAppointment(req,res)
    });
    app.post('/appointment/verify', function(req, res){
        console.log("this is the req.body from appointment/verify", req.body)
        appointments.verify(req,res)
    });
    app.post('/appointment/cancel', function(req,res){
        console.log("you are at appointment/cancel in routes", req.body)
        appointments.cancel(req,res)
    });
}
