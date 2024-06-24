import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from "../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchFailure, fetchStart, fetchSuccess, like, dislike } from "../redux/videoSlice";
import { subscription } from "../redux/userSlice";
import { Container, Content, VideoWrapper, Title, Details, Info, Buttons, Button, Hr, ChannelInfo, Channel, Image, ChannelDetail, ChannelName, ChannelCounter, Description, Subscribe, VideoFrame } from "./Styles/VideoStyledComponent";
import { format } from "timeago.js";
import { ThumbDown, ThumbUp } from "@mui/icons-material";
import Recommendation from "../components/Recommendation";
import api from "../axios";

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchStart());
      try {
        const videoRes = await axios.get(`${api}/api/videos/find/${path}`);
        const channelRes = await axios.get(`${api}/api/users/find/${videoRes.data.userId}`);
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
        setLoading(false);
      } catch (error) {
        dispatch(fetchFailure());
        setLoading(false);
      }
    };
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    await axios.put(`${api}/api/users/like/${currentVideo._id}`);
    dispatch(like(currentUser._id));
  };

  const handleDisLike = async () => {
    await axios.put(`${api}/api/users/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser._id));
  };

  const handleSubscription = async () => {
    if (currentUser.subscribedUsers.includes(channel._id)) {
      await axios.put(`${api}/api/users/unsub/${channel._id}`);
    } else {
      await axios.put(`${api}/api/users/sub/${channel._id}`);
    }
    dispatch(subscription(channel._id));
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while fetching data
  }

  if (!currentVideo || !channel) {
    return <div>Error: Video or channel data is not available.</div>; // Handle cases where data is not available
  }

  return (
    <Container>
      <Content>
        <VideoWrapper>
          {currentVideo.videoUrl && <VideoFrame src={currentVideo.videoUrl} controls />}
        </VideoWrapper>
        <Title>{currentVideo.title}</Title>
        <Details>
          <Info>{currentVideo.views} views • {format(currentVideo.createdAt)}</Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo.likes?.includes(currentUser._id) ? <ThumbUp /> : <ThumbUpOutlinedIcon />} {currentVideo.likes?.length}
            </Button>
            <Button onClick={handleDisLike}>
              {currentVideo.dislikes?.includes(currentUser._id) ? <ThumbDown /> : <ThumbDownOffAltOutlinedIcon />} Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel.img} />
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
              <Description>
                {currentVideo.description}
              </Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSubscription}>
            {currentUser.subscribedUsers?.includes(channel._id) ? "SUBSCRIBED" : "SUBSCRIBE"}
          </Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo._id} />
      </Content>
      <Recommendation tags={currentVideo.tags} />
    </Container>
  );
};

export default Video;
