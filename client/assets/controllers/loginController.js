app.controller('loginController', ['$scope', 'userFactory', '$http', '$location', '$cookies', function ($scope, userFactory, $http, $location, $cookies) {
    $scope.newAnswer={}
    $scope.newQuestion={}
    $scope.questions=[]
    userFactory.getAppointments(function(appointments){
        $scope.appointments=appointments
    })
    console.log("these are the cookies", $cookies)
    var cookieJar=$cookies.getAll();
    $scope.cookies=cookieJar
    console.log("this is cookieJar", cookieJar)
    $scope.existingUser={}
    if(!cookieJar.name){
        $location.url('/')
    }
    $scope.loginUser = function (){
        console.log($scope.existingUser.name + ' is trying to login')
        userFactory.login($scope.existingUser, function(data){
            if (data.data.logged_in){
                console.log("in userFactor.login successful")
                $cookies.put('id', data.data.user._id);
                $cookies.put('name', data.data.user.name);
                $location.url('/dashboard')
            }
        });
    };
    $scope.addAppointment = function (){
        console.log("you are in the login Controller at addAppointment!")
        console.log("this is scope new appointment!",$scope.newAppointment)
        console.log(cookieJar.name)
        var name=cookieJar.name
        console.log("new appointment.date", $scope.newAppointment.date)
        console.log("new appointment.time", $scope.newAppointment.time)
        console.log("new appointment.complaint", $scope.newAppointment.complaint)
        var todaysDate= new Date();
        console.log("today's date", todaysDate)
        if($scope.newAppointment.date <= todaysDate){
            alert('Appointment date must be after today!')
        }
        else if (!$scope.newAppointment.complaint){
            alert('complaint must be at least 10 characters')
        }
        else if ($scope.newAppointment.complaint.length < 10){
            alert('complaint must be at least 10 characters')
        }
        else{
            userFactory.verify($scope.newAppointment.date, function(message){
                if(message.created){
                    userFactory.newAppointment($scope.newAppointment, name, function(message){
                        if (message.created){
                            console.log("I AM CONSOLE LOGGING MESSAGE", message)
                            console.log( "message specifics", message.message)
                            $scope.newAppointment={}
                            userFactory.getAppointments(function(messages){
                                $scope.appointments=messages
                            })
                            $location.url('/dashboard')
                        }
                    })
                }
                else{
                    alert('There are no appointments left on that date. Please choose another date.')
                }
            })
        }
    };
    $scope.cancel=function(appointment_id){
        console.log("this is the appt id in loginController cancel", appointment_id)
        userFactory.cancel(appointment_id, function(message){
            if(message.deleted){
                console.log("I am console logging message in loginController cancel", message)
                console.log("The appointment was deleted!")
                userFactory.getAppointments(function(messages){
                    $scope.appointments=messages
                })
                $location.url('/dashboard')
            }
        })
    };
    $scope.logout=function(){
        console.log('log me out');
        $cookies.remove('name');
        $cookies.remove('id');
        $location.url('/');
    }
}]);
