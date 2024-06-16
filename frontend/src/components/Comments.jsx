/* eslint-disable react/prop-types */

import { useEffect } from "react";
import Comment from "./Comment";
import { Container, NewComment, Avatar, Input } from "./Styles/CommentsStyledComponent"
import axios from "axios";
import { useSelector } from "react-redux";

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user)

  const [comments, setComments] = useState([])


  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get(`/api/comments/${videoId}`)
    }
  })
  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser.img} />
        <Input placeholder="Add a comment..." />
      </NewComment>
      {comments.map(comment => (
        <Comment key={comment._id} comment={comment} />

      ))}

    </Container>
  );
};

export default Comments;