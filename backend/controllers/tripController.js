import Trip from '../models/Trip.js'

// create new Trip

export const createTrip = async (req,res)=>{
    const newTrip = new Trip(req.body)

    try {
        const savedTrip = await newTrip.save();

        res.status(200).json(
            {
                success: true,
                message: "Successfully created",
                data: savedTrip,
            })
    } catch (err) {
        res
            .status(500)
            .json({
                success: false,
                message: "Failed to create, Try again."
            })
    }
};

//update Trip
export const updateTrip = async(req,res)=>{

    const id = req.params.id

    try {
        
        const updatedTrip = await Trip.findByIdAndUpdate(id,{
            $set: req.body
        }, {new:true})

        res
            .status(200)
            .json({
                success: true,
                message: "Successfully update",
                data: updatedTrip,
            })

    } catch (err) {
        res
            .status(500)
            .json({
                success: false,
                message: "Failed to update, Try again.",
            })
    }
}

//delete Trip
export const deleteTrip = async(req,res)=>{
    const id = req.params.id;

    try {
        await Trip.findByIdAndDelete(id)

        res.status(200).json(
            {
                success: true,
                message: "Successfully deleted",
            })
        
    } catch (err) {
        res
            .status(500)
            .json({
                success: false,
                message: "Failed to delete.",
            })
    }
}

//getSingle Trip
export const getSingleTrip = async(req,res)=>{
    const id = req.params.id;
    try {

        const trip = await Trip.findById(id).populate("schedules").populate("reviews");

        res
            .status(200)
            .json({
                success: true,
                message: "Successfully",
                data: trip
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

//getAll Trip
export const getAllTrip = async(req,res)=>{


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

// get Trip by search
export const getTripBySearch = async(req,res)=>{

    const city = new RegExp(req.query.city, "i");
    const distance = parseInt(req.query.distance);
    const maxGroupSize = parseInt(req.query.maxGroupSize);

    try {
        const trips = await Trip.find({
            city,
            distance: {$gte:distance},
            maxGroupSize: {$gte:maxGroupSize},
        }).populate('reviews').populate('schedules')

        res.status(200).json({
            success:true,
            message:"Successful",
            data:trips,
        })

    } catch (err) {
        res.status(404).json({
            success:false,
            message:"not found",
        })
    }

}

//getFeatured Trip
export const getFeaturedTrip = async(req,res)=>{


    try {

        const trips = await Trip.find({featured:true}).populate('reviews').populate('schedules').limit(8);

        res
        .status(200)
        .json({
            success: true,
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

// get Trip counts
export const getTripCount = async()=>{
    try {
        const tripCount = await Trip.estimatedDocumentCount();
        res.status(200).json({
            success:true,
            data:tripCount,
        })
    } catch (err) {
        res.status(500).json({
            success:false,
            message:"Failed to Fetch",
        })
    }
}