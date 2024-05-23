import { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({ type }) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await axios.get("/videos/random");
                if (Array.isArray(res.data)) {
                    setVideos(res.data);
                } else {
                    console.error("Unexpected data format:", res.data);
                    setVideos([]);
                }
            } catch (error) {
                console.error("Failed to fetch videos:", error);
            }
        };
        fetchVideos();
    }, []);

    return (
        <Container>
            {Array.isArray(videos) && videos.map((video) => (
                <Card key={video.id} video={video} />
            ))}
        </Container>
    );
};

export default Home;
