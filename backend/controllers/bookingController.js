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
        const userBookers = await User.findById(userID)

        await Schedule.findByIdAndUpdate(scheduleID, {
            $push: {participants: userBookers}
        })

        await User.findByIdAndUpdate(userID, {
            $push: {followedTrip: savedBooking}
        })

        res.status(200).json({
            success: true,
            message: 'Yout Trip is booked',
            data: savedBooking
        })
    } catch (err) {
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
        const books = await Booking.find()

        res.status(200).json({
            success: true,
            message: "successful",
            data: books,
        })
    } catch (err) {
        res.status(500).json({
            success: true,
            message: "internal server error"
        })
    }
}