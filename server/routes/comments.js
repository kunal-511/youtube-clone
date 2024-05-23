import express from "express";
import {} from "../controllers/comment.js";
const router = express.Router();
import { verifyToken } from "../verifyToken.js";
import {
  addComment,
  getComments,
  deleteComment,
} from "../controllers/comment.js";

// router.get("/test", test);
router.post("/", verifyToken, addComment);
router.delete("/:id", verifyToken, deleteComment);
router.get("/:videoId", getComments);

export default router;
