var mongoose = require('mongoose');
var Appointment = mongoose.model('Appointment');

module.exports={
    newAppointment: function(req, res){
        console.log("at appointment.js new appointment", req.body)
        var appointment=req.body.appointment
            console.log("this is req body appointment", appointment)
        var date=req.body.date
        var time=req.body.time
        var complaint=req.body.complaint
        var name=req.body.name
        console.log("this is name date time complaint in appts.js new appt", name, date, time, complaint)
        var newAppointment=new Appointment({name:name, date:date, time:time, complaint:complaint})
            console.log("this is the new appointment", newAppointment)
        var appointment=newAppointment
        appointment.save(function(err){
            if(err){
                console.log('something went wrong')
                console.log(err)
                res.json(err)
            }
            else{
                console.log('successfully added a new appointment')
                    res.json({created:true, appointment:appointment})
            }
            })
        },
        dashboard: function(req,res){
          Appointment.find({}).sort([['date', 'ascending']]).exec(function(err, appointments){
              if(err){
                  console.log('something went wrong')
              }
              else{
                 res.json(appointments)
          }})
    },
        verify: function(req,res){
            console.log("at appointments.js verify", req.body)
            console.log("this is req date", req.body.date)
            Appointment.find({date:req.body.date},function(err, appointments){
              if(err){
                  console.log('something went wrong')
              }
              else{

                  if(appointments.length > 2){
                      console.log("appointments.length", appointments.length)
                      console.log("appointments", appointments)
                      console.log("there are already 3 appointments on that date")
                      res.json({appointments:appointments})

                  }
                  if(!appointments.length){
                      console.log("these are the appointments on that date", appointments)
                      res.json({created:true, appointments:appointments})
                  }
                  else{
                      console.log('these are the appointments on that date', appointments)
                          res.json({created:true, appointments:appointments})
                  }
          }})
    },
        cancel: function(req,res){
            console.log("at appointments.js like", req.body)
            console.log("this is req appointment id", req.body.appointment_id)
            Appointment.remove({_id: req.body.appointment_id}, function(err, appt){
                console.log("this is appt", appt);
                if(err){
                    console.log("something went wrong")
                    console.log(err)
                    res.json(err)
                }
                else{
                    console.log('successfully cancelled appointment')
                    res.json({deleted:true})
                }
                })
        },
}
