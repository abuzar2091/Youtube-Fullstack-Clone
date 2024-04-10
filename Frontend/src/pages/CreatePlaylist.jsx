import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
function CreatePlaylist() {
  const { username } = useParams();
  const naviagte = useNavigate();
  const [playlistData, setPlaylistData] = useState({
    name: "",
    description: "",
    videos: [], // Store selected videos
  });
  const [videos, setVideos] = useState([]);
  const handleChange = (e) => {
    setPlaylistData({ ...playlistData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const fetchVideo = async () => {
      await axios
        .get(`/api/videos/getchannelvideo/${username.slice(1)}`)
        .then((res) => {
          console.log("channel videos", res.data.data);
          setVideos(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchVideo();
  }, [username]);

  const handleVideoSelection = (e) => {
    const selectedVideoId = e.target.value;
    const isSelected = e.target.checked;

    if (isSelected) {
      setPlaylistData({
        ...playlistData,
        videos: [...playlistData.videos, selectedVideoId],
      });
    } else {
      setPlaylistData({
        ...playlistData,
        videos: playlistData.videos.filter((id) => id !== selectedVideoId),
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(playlistData);

    await axios
      .post("/api/playlist/create-playlist", playlistData)
      .then((res) => {
        console.log("Playlist created successfully:");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    naviagte(`/user/@${username}/playlist`);
  };

  return (
    <div class="flex flex-col gap-2 justify-center text-white items-center mx-auto mt-0 w-[70%] font-serif">
      <h2 class="text-3xl font-semibold">Create Playlist</h2>
      <div class="min-w-[500px]">
        <form onSubmit={handleSubmit}>
          <label>PlayList Name</label>
          <div class="flex flex-col gap-4 text-black">
            <input
              type="text"
              name="name"
              value={playlistData.name}
              class="border-2 rounded-md px-8 py-2"
              placeholder="Enter playlist name"
              onChange={handleChange}
              required
            />
          </div>
          <label>Description</label>
          <div class="flex flex-col gap-4 text-black ">
            <input
              type="text"
              name="description"
              value={playlistData.description}
              class="border-2 rounded-md px-8 py-2"
              placeholder="Enter playlist description"
              onChange={handleChange}
              required
            />
          </div>
          <div class="flex flex-col gap-4 ">
            <label>Select Videos:</label>
            {videos?.map((video) => (
              <div key={video._id}>
                <input
                  type="checkbox"
                  value={video._id}
                  onChange={handleVideoSelection}
                />
                <label>{video.description}</label>
              </div>
            ))}
          </div>

          <div class="flex gap-4 items-center mt-4">
            <button class="bg-green-600 text-white rounded-lg py-2 px-4 ">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePlaylist;
