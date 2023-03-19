import { Router } from "express";
import { register, login, getEmail, HomeGet } from "../controllers/RegisterApiController.js";

const router = Router();

router.post("/register", register)
router.post("/login", login)
router.get('/getemail', getEmail)
router.get("/", HomeGet)

export default router;