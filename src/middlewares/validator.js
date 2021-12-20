import {check,validationResult} from "express-validator";

class Validator{
    static validateInput=(req,res,next)=>{
        const errors =validationResult(req);
        if(!errors.isEmpty()){
            const errorMessage =errors.errors.map((error)=>error.msg);
            return res.status(400).json({message: errorMessage});
        }
        return next();
    };

    static newAccountRules(){
        return[
            check("email","email is valid").trim().isEmail(),
            check("password","password is not strong").trim().isStrongPassword(),
            check("lastName","Last name should be valid").trim().isAlpha(),
            check("firstName","First name should be valid").trim().isAlpha(),
            check("gender","gender should be valid among male,female,other,not-say",).trim().isIn(["male","female","other","not-say"]),
        ];
    }
    static newToursRules(){
        return[
            check("tittle","tittle is invalid").trim().isString(),
            check("seats","seats should be number").trim().isNumeric(),
            check("available","available seats should number").trim().isNumeric(),
            check("duedate","duedate is invalid").trim().isDate(),
            check("datescheduled","datescheduled should be valid").trim().isDate(),
            check("price","price is invalid").trim().isNumeric(),
        ]
    }
}
export default Validator;