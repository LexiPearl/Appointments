app.factory('userFactory', ['$http', function($http){
    var users= [];
    var factory = {};
    factory.login = function(user, callback){
        console.log('user in the factory', user);
        $http.post('/login', user).then(function(response){
            console.log("response from login", response)
            callback(response)
        })
    };
    factory.newAppointment = function(appointment, name, callback){
        console.log('I am adding an appointment', appointment);
        console.log("this is the name for the appointment", name);
        var date=appointment.date
        var time=appointment.time
        var complaint=appointment.complaint
        var newAppointment={name:name, date:date, time:time, complaint:complaint}
        console.log("this is the new appointment in the UserFactory", newAppointment)
        $http.post('/newAppointment', newAppointment).then(function(response){
            console.log("newAppointment route worked in userFactory")
            var message=response.data
            console.log("this is response.data from newAppointment", message)
            callback(message)
        })
    };
    factory.cancel = function(appointment_id, callback){
        console.log("I am cancelling an appointment")
        var appointment={appointment_id:appointment_id}
        $http.post('/appointment/cancel', appointment).then(function(response){
            console.log("appointment/cancel route worked")
            var message=response.data
            console.log("This is response.data from cancel", message)
            callback(message)
        })
    };
    factory.verify = function(appointment_date, callback){
        console.log("I am verifying appointment date in userFactory verify")
        var date={date:appointment_date}
        $http.post('/appointment/verify', date).then(function(response){
            console.log("appointment/verify route worked")
            var message=response.data
            console.log("This is response.data from verify", message)
            callback(message)
        })
    };
    factory.getAppointments = function (callback){
        $http.get('/dashboard').then(function(response){
            console.log("factory get messages response", response);
        var messages=response.data
        console.log("response.data", messages)
        callback(messages);
        console.log("callback messages", messages)
    })};
    return factory
}]);
