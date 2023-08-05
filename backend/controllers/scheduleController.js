import Trip from "../models/Trip.js"
import Schedule from "../models/Schedule.js";

export const createSchedule = async (req,res)  => {
    
    const tripId = req.params.tripId
    const newSchedule = new Schedule({...req.body})

    try {

        const savedSchedule = await newSchedule.save()

        // after creating a new review now update the review array of the trip
        await Trip.findByIdAndUpdate(tripId, {
            $push: {schedules: savedSchedule._id}
        })

        res.status(200).json({
            success: true,
            message: "Schedule submitted",
            data: savedSchedule
        })
        
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Schedule failed to be submitted"
        })
    }
};

export const getAllSchedules = async(req,res)=>{


    //for pagination
    const page = parseInt(req.query.page)

    try {
        const trips = await Trip.find({})
            .populate("reviews").populate("schedules")
            .skip(page * 8)
            .limit(8);

        res.status(200).json({
            success: true,
            count: trips.length,
            message: "Successfully",
            data: trips
        })
        
    } catch (err) {
        res
        .status(404)
        .json({
            success: false,
            message: "Not Found.",
        })   
    }
}

