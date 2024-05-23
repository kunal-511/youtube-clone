import Video from "../models/Video.js";
import { createError } from "../error.js";
import User from "../models/User.js";

export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    const savedVideo = await newVideo.save();
    res.send(200).json(savedVideo);
  } catch (error) {
    next(error);
  }
};
export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id); //find the video
    if (!video) return next(createError(404, "Video not found")); //if video not found
    if (req.user.id === video.user.id) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.send(200).json(updatedVideo);
    } else {
      return next(createError(403, "You can update only your videos"));
    }
  } catch (error) {
    next(error);
  }
};
export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id); //find the video
    if (!video) return next(createError(404, "Video not found")); //if video not found
    if (req.user.id === video.user.id) {
      await Video.findByIdAndDelete(req.params.id);
      res.send(200).json("The video has been deleted successfully!");
    } else {
      return next(createError(403, "You can delete only your videos"));
    }
  } catch (error) {
    next(error);
  }
};
export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (error) {
    next(error);
  }
};

export const updateViews = async (req, res, next) => {
  await Video.findByIdAndUpdate(req.params.id, {
    $inc: { views: 1 },
  });
  res.status(200).json("The views has been incremented successfully!");
};

export const RandomVideos = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};
export const TrendingVideos = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    re.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

export const SubscribedChannelVideos = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;

    const list = await Promise.all(
      subscribedChannels.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    next(error);
  }
};

export const getByTags = async (req, res, next) => {
  const { tags } = req.query.tags.split(",");

  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
  } catch (error) {
    next(error);
  }
};
export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
  } catch (error) {
    next(error);
  }
};
