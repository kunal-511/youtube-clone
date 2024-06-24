import express from "express";
import {} from "../controllers/auth.js";
import { signup, signin, googleauth, logout } from "../controllers/auth.js";

const router = express.Router();

//health check of auhth route
router.get("/health", (req, res) => {
  res.send("Auth is Working Fine");
});
// Create a user
router.post("/signup", signup);
//Sign In
router.post("/signin", signin);
router.post("/logout", logout);

//Google auth
router.post("/googleauth", googleauth);

export default router;
