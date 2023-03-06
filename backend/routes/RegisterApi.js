import { Router } from "express";
import { register, login, getEmail } from "../controllers/RegisterApiController.js";

const router = Router();

router.post("/register", register)
router.post("/login", login)
router.get('/getemail', getEmail)

export default router;