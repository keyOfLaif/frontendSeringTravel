
import express from 'express'
import { createBooking, getAllBooking, getBooking, updateBookingStatus, deleteBooking, payBooking, updateBookers } from '../controllers/bookingController.js';
// import { verifyAdmin, verifyUser } from '../utils/verifyToken.js'


const router = express.Router()

router.post('/:userID/:scheduleID', createBooking)
router.get('/:id', getBooking)
router.get('/', getAllBooking)
// router.put('/:idBooking/:paymentStage', updateBookingStatus)
router.delete('/:idBooking', deleteBooking)
router.put('/payBooking/:idBooking', payBooking)
router.put('/updateBookers/:idBooking', updateBookers)
// router.put('/:idBooking/:whatFor', (req,res,next) =>{
//     const {whatFor} = req.params.whatFor
//     if (whatFor === 'payment'){
//         payBooking(req,res,next);
//     }else if(whatFor === 'updatebookers'){
//         updateBookers(req,res,next);
//     }else{
//         res.status(400).json({message:"Tidak ada operasi yang dituju"})
//     }
// } )

export default router;