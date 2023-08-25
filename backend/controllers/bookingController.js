import User from '../models/User.js'
import Booking from '../models/Booking.js'
import Trip from '../models/Trip.js'
import Schedule from '../models/Schedule.js'
import History from '../models/History.js'
import multer from 'multer'



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

        const savedBooking = await (await newBooking.save()).populate('tripBooked')

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

//updateParticipantDataBooking
export const updateBookers = async (req, res) => {
  const bookingId = req.params.idBooking;
  const participants = req.body; // Assumption: req.body.participants is an array of participant objects
  console.log("dataParticipants :",participants)

  try {
    
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        $push: {
          participants: participants
        }
      },
      { new: true } // Ini akan mengembalikan dokumen yang sudah diperbarui
    );

    if (updatedBooking) {
      res.status(200).json({ message: "Participants data updated successfully", updatedBooking });
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
    console.log("an error:",error)
  }
};

// updating booking status
export const updateBookingStatus = async (req, res) =>{
  const bookingId = req.params.idBooking;
  const { paymentStage } = req.params;
  const { value } = req.body;
  const userID = await Booking.findById(bookingId);

  try {
    let updateObject = {};

    if (paymentStage === 'dp') {
      // Update dp paymentStage based on the value received from the client
      updateObject.dp = value;
    } else if (paymentStage === 'fullPayment') {
      // Update fullPayment paymentStage based on the value received from the client
      updateObject.fullPayment = value;
    } else {
      return res.status(400).json({ success: false, message: 'Invalid field parameter' });
    }

    // Perform the update based on the updateObject
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      updateObject,
      { new: true }
    );

    const userActor = await User.findById(userID.userBooking)

    const createNewHistory = new History({
      idUser : userID,
      userFullName : userActor.fullName,
      information : 'konfirmasi pembayaran'
    })

    await createNewHistory.save();

    if(!createNewHistory){
      console.log('histori : ',createNewHistory)
      return res.status(400).json({succes: false, message: 'gagal menyimpan history'})
    }
    console.log('histori : ',createNewHistory)
    // Send the updated booking back to the client
    res.status(200).json({ success: true, data: updatedBooking });
  } catch (err) {
    console.error('Error updating booking:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

//deleting a booking
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

//sending payment proof
export const payBooking = async (req, res) => {
    const bookingId = req.params.idBooking;
  
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, '../frontend/public/paymentProofs'); // Ganti dengan direktori yang sesuai
      },
      filename: (req, file, cb) => {
        // const paymentType = req.body.paymentType;
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // const paymentProofName = paymentType; // Gunakan paymentType sebagai nama file
        const fileExtension = file.originalname.split('.').pop();
        const fileName = `${uniqueSuffix}.${fileExtension}`;
        cb(null, fileName);
      },
    });
  
    const upload = multer({ storage: storage });
  
    try {
      // Handle upload di dalam fungsi payBooking
      upload.single('paymentProof')(req, res, async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Error uploading paymentProof' });
        }
  
        const paymentProof = req.file.filename;
  
        // Menentukan objek bukti pembayaran sesuai dengan paymentType
        const updateFields = {};
        if (req.body.paymentType === 'DP') {
          updateFields.dp = 1;
          updateFields['paymentProofs.dp'] = paymentProof;
        } else if (req.body.paymentType === 'FullPayment') {
          updateFields.fullPayment = 1;
          updateFields['paymentProofs.fullPayment'] = paymentProof;
        }

        try {
          const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            { $set: updateFields },
            { new: true }
          );
          console.log('updatedBooking :', updateFields)

          if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not Found' });
          }

    
            return res.json({ message: 'Payment processed Successfully' });
          } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error updating booking data' });
          }
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};