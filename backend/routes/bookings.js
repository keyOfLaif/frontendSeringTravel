
import express from 'express'
import { createBooking, getAllBooking, getBooking, updateBookingStatus } from '../controllers/bookingController.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js'


const router = express.Router()

router.post('/:userID/:scheduleID', createBooking)
router.get('/:id', getBooking)
router.get('/', getAllBooking)
router.put('/:idBooking', updateBookingStatus)

export default router;