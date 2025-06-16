import express, { Router } from 'express';
import { getUserProfile, loginUser, registerUser } from '../../controllers/user/user.auth';
import { auth } from '../../middlewares/authMiddleware';


const router:Router = express.Router();


//user routes

router.post('/register', registerUser )
router.post('/login', loginUser)

router.get('/me',auth,getUserProfile)


export default router;