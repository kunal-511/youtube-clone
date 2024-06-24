/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Container, Avatar, Details, Name, Date, Text } from "./Styles/CommentStyledComponent"
import axios from "axios";
import api from "../axios";

const Comment = ({ comment }) => {

  const [channel, setChannel] = useState({})

  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(
        `${api}/api/users/find/${comment.userId}`
      )
      setChannel(res.data)
    }
    fetchComment()
  }, [comment.userId])
  return (
    <Container>
      <Avatar src={channel.img} />
      <Details>
        <Name>
          {channel.name} <Date>1 day ago</Date>
        </Name>
        <Text>
          {comment.desc}
        </Text>
      </Details>
    </Container>
  );
};

export default Comment;