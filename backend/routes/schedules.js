
import express from 'express'
import { createSchedule, getAllSchedules } from '../controllers/scheduleController.js'


const router = express.Router()

router.post('/:tripId', createSchedule)
router.get('/', getAllSchedules)

export default router