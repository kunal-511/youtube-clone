/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
import api from "../axios";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({ type }) => {
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);





    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await axios.get(`${api}/api/videos/${type}`);
                setLoading(false);
                if (Array.isArray(res.data)) {
                    setVideos(res.data);
                } else {
                    setError("Unexpected data format");
                    setVideos([]);
                }
            } catch (error) {
                setLoading(false);
                setError("Failed to fetch videos");
                console.error("Failed to fetch videos:", error);
            }
        };
        fetchVideos();
    }, [type]);

    return (
        <>
            <Container>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {!loading && !error && videos.map((video) => (
                    <Card key={video._id} video={video} />
                ))}
            </Container>

        </>
    );
};

export default Home;
