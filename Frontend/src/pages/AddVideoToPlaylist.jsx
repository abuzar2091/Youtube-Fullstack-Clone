import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function AddVideoToPlaylist() {
  const { username, playlistId } = useParams();
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `/api/videos/getchannelvideo/${username.slice(1)}`
        );
        setVideos(response.data.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideo();
  }, [username]);

  const handleVideoSelection = (e) => {
    const selectedVideoId = e.target.value;
    const isSelected = e.target.checked;

    setSelectedVideos((prevSelectedVideos) => {
      if (isSelected) {
        return [...prevSelectedVideos, selectedVideoId];
      } else {
        return prevSelectedVideos.filter((id) => id !== selectedVideoId);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Videos to be added:", selectedVideos);
    await axios
      .post("/api/playlist/addvideotoplaylist", {
        selectedVideos,
        playlistId,
      })
      .then((res) => {
        console.log("videos added to the playlist", res);
      })
      .catch((err) => {
        console.log(err);
      });

    // Redirect to the playlist page after adding videos
    navigate(`/user/${username}/playlist/${playlistId}`);
  };

  return (
    <div className="flex flex-col gap-2 justify-center text-white items-center mx-auto mt-0 w-[70%] font-serif">
      <h2 className="text-3xl font-semibold">Add Videos to Playlist</h2>
      <div className="min-w-[500px]">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <label>Select Videos:</label>
            {videos.map((video) => (
              <div key={video._id}>
                <input
                  type="checkbox"
                  value={video._id}
                  checked={selectedVideos.includes(video._id)}
                  onChange={handleVideoSelection}
                />
                <label>{video.description}</label>
              </div>
            ))}
          </div>

          <div className="flex gap-4 items-center mt-4">
            <button className="bg-green-600 text-white rounded-lg py-2 px-4">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddVideoToPlaylist;
