import express from "express";
import { createAdmin, getAllAdmin } from "../controllers/adminController.js";


const router = express.Router()

router.post('/addNewAdmin', createAdmin)
router.get('/getAllAdmin', getAllAdmin)

export default router