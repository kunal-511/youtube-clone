import express from "express";

const router = express.Router();
import { verifyToken } from "../verifyToken.js";
import {
  createVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  updateViews,
  TrendingVideos,
  RandomVideos,
  SubscribedChannelVideos,
  getByTags,
  search,
} from "../controllers/video.js";

// Create a video
router.post("/", verifyToken, createVideo);
// Update a video
router.put("/:id", verifyToken, updateVideo);
// Delete a video
router.delete("/:id", verifyToken, deleteVideo);
// Get a video
router.get("/find/:id", getVideo);
//Update views on the video
router.put("/view/:id", updateViews);
//Treding videos
router.get("/trending", TrendingVideos);
//Random videos
router.get("/random", RandomVideos);
//Susbscribed Channels Videos
router.get("/sub", verifyToken, SubscribedChannelVideos);
// Get videos by tags
router.get("/tags", getByTags);
// Search videos
router.get("/search", search);

export default router;
