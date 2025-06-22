import { Router } from "express";
import {setUser, getUser, editUser, removeUser} from "../controllers/users.js"


const router = Router();


// set user
router.post("/setuser", setUser)

// get user
router.get("/getusers", getUser)

// edit user
router.post("/edituser", editUser)

// remove user
router.post("/removeuser", removeUser)

export {router as userRouter}