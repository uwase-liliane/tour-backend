import UserInfos from "../models/user";
import bcrypt from "bcrypt";
import TokenAuth from "../helpers/tokenauth"

class UserController {
    //create user in db
    static async createuser(req,res){
        const hashPassword = bcrypt.hashSync(req.body.password,10)
        req.body.password = hashPassword;

        const user = await UserInfos.create(req.body);
        if(!user){
            return res.status(404).json({err:"user not registered"});
        }
        return res
        .status(200)
        .json({message:"user created successfully", date:user});

    }
    //get all users
      static async getallusers(req,res){
        const user = await UserInfos.find();
        if(!user){
            return res.status(404)
            .json({err:"no users registered"});
        }
        return res
        .status(200)
        .json({message:"successfully retrived users", date:user});

}
static async getOneUser(req,res){
    const user =await UserInfos.findById(req.params.id);
    if(!user){
        return res.status(404)
        .json({error:"user not found"});
    }
    return res.status(200)
    .json({message:"user found successfully",data:user})
}
static async deleteOneUser(req,res){
    const user =await UserInfos.findByIdAndDelete(req.params.id);
    if(!user){
        return res.status(404)
        .json({error:" not deleted"});
    }
    return res.status(200)
    .json({message:"user deleted successfully"})
}
//login function
static async userLogin(req,res){
    const user = await UserInfos.findOne({email:req.body.email});
    if(!user){
        return res.status(404).json({error:"user not found! kindly register first"})
    }
    if(bcrypt.compareSync(req.body.password,user.password)){

        user.password=null;
        const token = TokenAuth.tokenGenerator({user:user});
        
        return res.status(200).json({message:"succefully logged in", token:token});

    }
    return res.status(400).json({error:"password is wrong"})
}
}

    export default UserController;