import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container } from "./Styles/SearchStyledComponents";
import Card from "../components/Card";

const Search = () => {
    const [videos, setVideos] = useState([]);
    const query = useLocation().search;

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await axios.get(`/videos/search/${query}`);
                const data = res.data;
                if (Array.isArray(data)) {
                    setVideos(data);
                } else {
                    console.error("API response is not an array:", data);
                    setVideos([]);
                }
            } catch (error) {
                console.error("Error fetching videos:", error);
                setVideos([]);
            }
        };
        fetchVideos();
    }, [query]);

    return (
        <Container>
            {videos.length > 0 ? (
                videos.map(video => (
                    <Card key={video._id} video={video} />
                ))
            ) : (
                <p style={{ color: "red" }}>No videos found</p>
            )}
        </Container>
    );
};

export default Search;
