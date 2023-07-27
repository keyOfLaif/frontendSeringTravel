
import express from 'express'
import { createSchedule } from '../controllers/scheduleController.js'


const router = express.Router()

router.post('/:tripId', createSchedule)

export default router