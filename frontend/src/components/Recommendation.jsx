import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Card from "./Card";
import api from "../axios";

const Container = styled.div`
    flex: 2;
`;

const Recommendation = ({ tags }) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await axios.get(`${api}/api/videos/tags?tags=${tags}`);
                // Assuming res.data is expected to be an array of videos
                setVideos(res.data);
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        };

        fetchVideos();
    }, [tags]);

    return (
        <Container>
            {Array.isArray(videos) && videos.length > 0 ? (
                videos.map((video) => <Card key={video._id} video={video} />)
            ) : (
                <p>No videos found</p>
            )}
        </Container>
    );
};

export default Recommendation;
