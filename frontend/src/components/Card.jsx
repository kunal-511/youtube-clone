/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { format } from "timeago.js";
import axios from "axios";
import api from "../axios";
import { Container, Image, Details, ChannelImage, Texts, Title, ChannelName, Info } from "./Styles/CardStyledComponent"

const Card = ({ type, video }) => {
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`http://localhost:3000/api/videos/find/${video.userId}`);
      setChannel(res.data);
    };
    fetchChannel();
  }, [video.userId]);

  return (
    <Link to={`${api}/api/videos/${video._id}`} style={{ textDecoration: "none" }
    }>
      <Container type={type}>
        <Image
          type={type}
          src={video.imgUrl}
        />
        <Details type={type}>
          <ChannelImage
            type={type}
            src={channel?.img}
          />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel?.name}</ChannelName>
            <Info>{video.views} views • {format(video.createdAt)}</Info>
          </Texts>
        </Details>
      </Container>
    </Link >
  );
};

export default Card;
