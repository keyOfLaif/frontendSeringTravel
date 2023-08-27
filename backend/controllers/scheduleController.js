import Trip from "../models/Trip.js"
import Schedule from "../models/Schedule.js";

export const createSchedule = async (req,res)  => {
    
    const tripId = req.params.tripId
    const newSchedule = new Schedule({...req.body})

    try {

        const savedSchedule = await newSchedule.save()

        // after creating a new review now update the review array of the trip
        const updatedTrip = await Trip.findByIdAndUpdate(tripId, {
            $push: {schedules: savedSchedule._id}
        })

        if(!updatedTrip){
            return res.status(400).json({})
        }

        res.status(200).json({
            success: true,
            message: "Jadwal berhasil ditambahkan",
            data: savedSchedule
        })
        
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Jadwal gagal ditambahkan"
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

//update Schedule
export const updateSchedule = async(req,res)=>{

    const id = req.params.id

    try {
        
        const updatedSchedule = await Schedule.findByIdAndUpdate(id,{
            $set: req.body
        }, {new:true})

        res
            .status(200)
            .json({
                success: true,
                message: "Berhasil mengubah data Schedule",
                data: updatedSchedule,
            })

    } catch (err) {
        res
            .status(500)
            .json({
                success: false,
                message: "Gagal mengubah data Schedule, coba lagi",
            })
    }
}