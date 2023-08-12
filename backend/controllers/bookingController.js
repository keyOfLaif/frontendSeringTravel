import User from '../models/User.js'
import Booking from '../models/Booking.js'
import Trip from '../models/Trip.js'
import Schedule from '../models/Schedule.js'

export const createBooking = async(req,res) =>{

    const userID = req.params.userID
    const scheduleID = req.params.scheduleID
    // Create a new booking instance and set the userBooking and tripBooked fields
    const newBooking = new Booking({
        ...req.body,
        userBooking: userID,
        tripBooked: scheduleID,
    });

    try {

        const savedBooking = await newBooking.save()

        if(!savedBooking){
            return res.status(400).json({success:false, message:'Gagal Memesan Trip'})
        }

        await Schedule.findByIdAndUpdate(scheduleID,{
            $inc: {maxParticipants : -newBooking.participantCount}
        })

        await User.findByIdAndUpdate(userID, {
            $push: {bookings: savedBooking._id}
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
export const getAllBooking = async(req,res)=>{

    try {
        const books = await Booking.find({})

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
    const bookingId = req.params.idBooking;
  const { paymentStage } = req.params;
  const { value } = req.body;

  try {
    let updateObject = {};

    if (paymentStage === 'dp') {
      // Update dp paymentStage based on the value received from the client
      updateObject.dp = value === 'true';
    } else if (paymentStage === 'fullPayment') {
      // Update fullPayment paymentStage based on the value received from the client
      updateObject.fullPayment = value === 'true';
    } else {
      return res.status(400).json({ success: false, message: 'Invalid field parameter' });
    }

    // Perform the update based on the updateObject
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      updateObject,
      { new: true }
    );

    // Send the updated booking back to the client
    res.status(200).json({ success: true, data: updatedBooking });
  } catch (err) {
    console.error('Error updating booking:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

export const deleteBooking = async(req,res) =>{
    const bookingId = req.params.idBooking;
    
    try {
        const deleteBooking = await Booking.findByIdAndDelete(bookingId)

        if(!deleteBooking){
            return res.status(400).json({success: false, message: "Failed to delete booking"})
        }

        const tripBooked = deleteBooking.tripBooked._id
        if(tripBooked){
            await Schedule.findByIdAndUpdate(tripBooked,
                {
                    $inc : {maxParticipants : deleteBooking.participantCount},
                }
            )
        }

        res.status(200).json({success: true, data: deleteBooking})
    } catch (error) {
        console.err("Error:", error)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
}