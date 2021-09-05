import { Router } from 'express';
import { body } from 'express-validator';
import { signinUser, LoginController, registerUser, loginUser, verifyOTP, fetchCurrentUser, handleAdmin } from './controller'
import { checkAuth, checkAdmin } from '../../../utils/middleware/checkAuth'

const router: Router = Router();



router.get('/userLogin', signinUser)

router.post('/login', LoginController);


router.post("/register", registerUser);

router.post("/login_with_phone", loginUser);

router.post("/verify", verifyOTP);

router.get("/me", checkAuth, fetchCurrentUser);

router.get("/admin", checkAuth, checkAdmin, handleAdmin);

export default router;
