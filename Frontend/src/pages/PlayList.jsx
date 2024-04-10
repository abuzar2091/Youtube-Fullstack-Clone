import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function PlayList() {
  const { username } = useParams();
  const [playlistInfo, setPlaylistInfo] = useState([]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      await axios
        .get(`/api/playlist/getuserplaylistvideo/${username.slice(1)}`)
        .then((res) => {
          console.log("Playlist fetched successfully:");
          setPlaylistInfo(res.data.data);
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchPlaylist();
  }, [username]);

  return (
    <div className="flex flex-col justify-center bg-gray-800 text-white  ml-24">
      <Link to={`/user/${username}/createplaylist`}>
        <button className="rounded-lg bg-green-500 py-2 px-8 ">
          Create Playlist
        </button>
      </Link>
      <div className="grid grid-cols-4 gap-16 min-h-[300px]">
        {playlistInfo?.length &&
          playlistInfo?.map((playlist) => (
            <div
              className="text-white  h-[130px] w-[200px] rounded-md"
              key={playlist._id}
            >
              <div className="relative">
                <img src="/images/background.png" className="rounded-md" />
                <p className="absolute bottom-3 right-4 bg-black rounded-md px-4">
                  {playlist.videos.length} video
                </p>
              </div>
              <p>{playlist.name}</p>
              <Link to={`/user/${username}/playlist/${playlist._id}`}>
                <button>view full playlist</button>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PlayList;
