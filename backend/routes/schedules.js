
import express from 'express'
import { createSchedule, getAllSchedules, updateSchedule } from '../controllers/scheduleController.js'


const router = express.Router()

router.post('/:tripId', createSchedule)
router.get('/', getAllSchedules)
router.put('/:idSchedule', updateSchedule)

export default router