var mongoose= require('mongoose');
var UserSchema= new mongoose.Schema({

    name: {
        type: String,
        required: [true, "name is required"],
        trim: true,
    },
})

mongoose.model('User', UserSchema)
