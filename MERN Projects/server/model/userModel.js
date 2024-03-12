const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email:{
        reuired:true,
        type: String,
        unique:true,
        max:50,
    },
    password:{
        reuired:true,
        type: String,
        unique:true,
        min:8
    },
    isAvatarImageSet:{
        type:Boolean,
        default:false
    },
    avatarImage: {
        type:String,
        default:"",
    },
});

module.exports = mongoose.model("Users", userSchema);