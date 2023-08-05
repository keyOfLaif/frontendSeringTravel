import User from '../models/User.js'
import Booking from '../models/Booking.js'
import Trip from '../models/Trip.js'
import Schedule from '../models/Schedule.js'

export const createBooking = async(req,res) =>{

    const userID = req.params.userID
    const scheduleID = req.params.scheduleID
    const newBooking = new Booking({...req.body})

    try {
        const savedBooking = await newBooking.save()

        await Schedule.findByIdAndUpdate(scheduleID,
            {
                $inc: {maxParticipants : -newBooking.participantCount},
                $push : {tripBooked: savedBooking._id}
            },
            {new : true},
        )

        await User.findByIdAndUpdate(userID, {
            $push: {followedTrip: savedBooking._id}
        })

        res.status(200).json({
            success: true,
            message: 'Your Trip is booked',
            data: savedBooking
        })
    } catch (err) {
        console.error("Error create booking:", err)
        res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
}

// get single booking
export const  getBooking = async(req,res)=>{
    const id = req.params.id

    try {
        const book = await Booking.findById(id)

        res.status(200).json({
            success: true,
            message: "successful",
            data: book,
        })
    } catch (err) {
        res.status(404).json({
            success: true,
            message: "not found"
        })
    }
}

// get All booking
export const  getAllBooking = async(req,res)=>{

    try {
        const books = await Booking.find({}).populate("userBooking").populate('tripBooked')

        res.status(200).json({
            success: true,
            message: "successful",
            data: books,
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
}

// updating booking status
export const updateBookingStatus = async (req, res) =>{
    const idBooking = req.params.idBooking
    
    try{
        const updatedBooking = await Booking.findByIdAndUpdate(idBooking,{
            $set: req.body
        }, {new:true})

        res.status(200).json({
            success: true,
            message: "Successfully updated booking status",
            data: updatedBooking,
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "failed to update booking status, try again",
        })
    }
}