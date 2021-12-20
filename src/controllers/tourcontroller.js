import tourInfos from "../models/tour";

class tourController {
    //create tours in db
    static async createTours(req,res){
        req.body.user=req.user._id;
        const tour = await tourInfos.create(req.body);
        if(!tour){
            return res.status(404).json({err:"tour not registered"});
        }
        return res
        .status(200)
        .json({message:"tour created successfully", date:tour});

    }
    //get all tours
      static async getAllTours(req,res){
        const tours = await tourInfos.find();
        if(!tours){
            return res.status(404).json({err:"no tours registered"});
        }
        return res
        .status(200)
        .json({message:"successfully  tours", date:tours});

}
//get one tour
static async getOneTour(req,res){
    const tour = await tourInfos.findById(req.params.id);
    if(!tour){
        return res.status(404).json({err:"tour not found"});
    }
    return res
    .status(200)
    .json({message:"Tour Found", date:tour});

}

}

    export default tourController;