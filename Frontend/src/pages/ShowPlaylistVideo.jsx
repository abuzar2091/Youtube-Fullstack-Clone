import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import VideoSuggestion from "../components/VideoSuggestion";

function ShowPlaylistVideo() {
  const { username, playlistId } = useParams();
  const [playlist, setPlaylist] = useState();
  useEffect(() => {
    const fetchVideo = async () => {
      await axios
        .get(`/api/playlist/getplaylistvideo/${playlistId}`)
        .then((res) => {
          console.log("playlist", res.data.data);
          setPlaylist(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchVideo();
  }, [playlistId]);
  return (
    <div className="flex w-full">
      <div className="flex flex-col items-center  text-white w-[50%]">
        <p className="text-2xl font-serif">{playlist?.name}</p>
        <p className="text-lg font-serif">{playlist?.description}</p>
        <p className="text-lg font-serif">{username?.slice(1)}</p>
        <p className="text-md font-serif">
          Last updated On {playlist?.createdAt}
        </p>
        <Link to={`/user/${username}/playlist/${playlistId}/addvideo`}>
           <button>Add videos to this playlist:</button>
        </Link>
      </div>

      <div className="flex flex-col  gap-3 w-[40%]">
        {playlist?.playlistVideos?.length &&
          playlist?.playlistVideos.map((video) => (
            <VideoSuggestion videoUrl={video.videoUrl} />
          ))}
        {/* <VideoSuggestion />
        <VideoSuggestion /> */}
      </div>
    </div>
  );
}

export default ShowPlaylistVideo;
