import mongoose from "mongoose";


const tourSchema = new mongoose.Schema(
    {
        tittle:{
           type: String,
        },
        discription:{
            type:String,
            required:true,
        },
      seats:{
          type:Number,
          required:true,
      },
      available:{
          type:Number,
      },
      datescheduled:{
          type:Date,
      },
      duedate:{
          type:Date,
      },
      price:{
          type:String,
      },
      user:{
          type:mongoose.Schema.ObjectId,
          ref:"user",
      }
      
    },
    {
        timestamps:true,
    }  
);
tourSchema.pre(/^find/,function (next){
    this.populate({path:"user", select:"lastName email adress"});
    next();
})
const tour = mongoose.model("tour",tourSchema);
export default tour;
    