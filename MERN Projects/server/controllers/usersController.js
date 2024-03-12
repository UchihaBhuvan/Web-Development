const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
    try{
        const {username, email, password} = req.body;
        const usernameCheck = await userModel.findOne({username});
        if(usernameCheck){        
            return res.json({msg: "Username already exists", status:flase});
        }

        const emailCheck = await userModel.findOne({email});
        if(emailCheck){
            return res.json({msg: "Email already exists"})
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            email,
            username,
            password: hashPassword,
        });
        delete user.password;
        return res.json({
            status:true, user
        });
    }catch(e){
        next(e);
        
    }
};
module.exports.login = async (req, res, next) => {
    try{
        const {username, password} = req.body;
        const user = await userModel.findOne({username});
        if(!user){        
            return res.json({msg: "Incorrect username or password", status:false});
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.json({msg: "Incorrect username or password", status:false});

        }
        
        delete user.password;
        return res.json({
            status:true, user
        });
    }catch(e){
        next(e);
        
    }
};

module.exports.setAvatar = async (req, res, next) =>{
    try{
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await userModel.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage,
        });
        return res.json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage,
        });
    }catch(e){next(e); }
};

module.exports.getAllUsers = async (req,res,next) =>{
    try{
        const users = await userModel.find({_id: {$ne: req.params.id}}).select([
            "email",
            "username",
            "avatarImage",
            "_id",
        ]);
        return res.json(users);
    }catch(e){next(e);}
};