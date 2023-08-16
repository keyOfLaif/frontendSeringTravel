
import express from 'express'
import { createBooking, getAllBooking, getBooking, updateBookingStatus, deleteBooking, payBooking } from '../controllers/bookingController.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js'


const router = express.Router()

router.post('/:userID/:scheduleID', createBooking)
router.get('/:id', getBooking)
router.get('/', getAllBooking)
router.put('/:idBooking/:paymentStage', updateBookingStatus)
router.delete('/:idBooking', deleteBooking)
router.put('/:idBooking', payBooking)
export default router;