import { useEffect, useState } from "react";
import axios from "axios";

const TestApi = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/videos/random");
                setVideos(response.data);
            } catch (error) {
                console.error("Error fetching the data", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {videos.length > 0 ? (
                videos.map(video => (
                    <div key={video._id}>
                        <h2>{video.title}</h2>
                        <p>{video.description}</p>
                        <p>Views: {video.views}</p>
                        <p>Created At: {new Date(video.createdAt).toLocaleString()}</p>
                        <hr />
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default TestApi;
