import express from 'express'
import { createBooking, getAllBooking, getBooking, updateBookingStatus, deleteBooking, payBooking, updateBookers, completeBooking } from '../controllers/bookingController.js';
// import { verifyAdmin, verifyUser } from '../utils/verifyToken.js'


const router = express.Router()

router.post('/:userID/:scheduleID', createBooking)
router.get('/:id', getBooking)
router.get('/', getAllBooking)
router.delete('/:idBooking', deleteBooking)
router.put('/updateBookingStatus/:idBooking/:paymentStage', updateBookingStatus)
router.put('/completeBooking/:idBooking', completeBooking)
router.put('/:idBooking', payBooking)
router.put('/updateBookers/:idBooking', updateBookers)
// router.put('/:whatFor/:idBooking', (req,res,next) =>{
//     const {whatFor} = req.params.whatFor
//     if (whatFor === 'payment'){
//         payBooking(req,res,next);
//     }else if(whatFor === 'updateBookers'){
//         updateBookers(req,res,next);
//     }else{
//         res.status(400).json({message:"Tidak ada operasi yang dituju"})
//     }
// } )

export default router;