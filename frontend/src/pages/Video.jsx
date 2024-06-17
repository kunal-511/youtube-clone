import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from "../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchFailure, fetchStart, fetchSuccess, like, disLike } from "../redux/videoSlice"
import { subscription } from "../redux/userSlice"
import { Container, Content, VideoWrapper, Title, Details, Info, Buttons, Button, Hr, ChannelInfo, Channel, Image, ChannelDetail, ChannelName, ChannelCounter, Description, Subscribe, VideoFrame } from "./Styles/VideoStyledComponent"
import { format } from "timeago.js";
import { ThumbDown, ThumbUp } from "@mui/icons-material";
import Recommendation from "../components/Recommendation";

const Video = () => {
  const { currentUser } = useSelector((state) => state.user)
  const { currentVideo } = useSelector((state) => state.video)
  const dispatch = useDispatch()

  const path = useLocation().pathname.split("/")[2]
  console.log(path)

  const [channel, setChannel] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/api/videos/find/${path}`)
        const channelRes = await axios.get(`/api/users/find/${videoRes.data.userId}`)
        setChannel(channelRes.data)
        dispatch(fetchSuccess(videoRes.data))
      } catch (error) { dispatch(fetchFailure()) }
    }
    fetchData()
  }, [path, dispatch])

  const handleLike = async () => {
    await axios.put(`/api/users/like/${currentVideo._id}`, { userId: currentUser.id })
    dispatch(like(currentUser._id))
  }
  const handleDisLike = async () => {
    await axios.put(`/api/users/dislike/${currentVideo._id}`, { userId: currentUser.id })
    dispatch(disLike(currentUser._id))
  }
  const handleSubscription = async () => {
    currentUser.subscribedUsers.includes(channel._id)
      ? await axios.put(`/api/users/unsub/${channel.id}`)
      : await axios.put(`/api/users/sub/${channel._id}`)
    dispatch(subscription(channel._id))
  }
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo.videoUrl} controls />
        </VideoWrapper>
        <Title>{currentVideo.title}</Title>
        <Details>
          <Info>{currentVideo.views} views • {format(currentVideo.createdAt)}</Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo.likes?.includes(currentUser.id) ? <ThumbUp /> : <ThumbUpOutlinedIcon />} {currentVideo.likes?.length}
            </Button>
            <Button>
              {currentVideo.dislikes?.includes(currentUser._id) ? <ThumbDown /> : < ThumbDownOffAltOutlinedIcon />} Dislike
            </Button>
            <Button onClick={handleDisLike}>
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
          <Subscribe onClick={handleSubscription}>{currentUser.subscribedUsers?.includes(channel._id) ? "SUBSCRIBED" : "SUBSCRIBE"}</Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo._id} />
      </Content>
      <Recommendation tags={currentVideo.tags} />
    </Container>
  );
};

export default Video;