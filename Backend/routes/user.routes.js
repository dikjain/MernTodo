import {SignUp, SignIn} from "../Controllers/user.controller.js";
import express from 'express';


const router = express.Router();

router.post("/",SignUp)
router.post("/login",SignIn)




export default router
