import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useParams } from "react-router-dom";
function ChannelVideo() {
  const { username } = useParams();
  // const channelId="660f5998a9f9a7eaafb06e75";
  console.log("Chennel name", username.slice(1));
  const [channelVideo, setChannelVideo] = useState([]);

  useEffect(() => {
    const fetchVideo = async () => {
      await axios
        .get(`/api/videos/getchannelvideo/${username.slice(1)}`)
        .then((res) => {
          console.log("channel videos", res.data.data);
          setChannelVideo(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchVideo();
  }, [username]);

  return (
    <div className="grid grid-cols-3 gap-4 bg-gray-800 ml-24">
      {channelVideo.length > 0 &&
        channelVideo.map((video) => (
          <div className="bg-white flex flex-col rounded-lg " key={video._id}>
            <Link to={`/video/${video._id}`}>
              <div className="object-cover">
                <ReactPlayer
                  url={video.videoUrl}
                  controls
                  width="100%"
                  muted={true}
                />
              </div>
            </Link>
            <div className="flex justify-center mt-2 gap-2">
              <div className="flex flex-col  gap-2">
                <p className="font-semibold">{video.description}</p>
                <div className="flex flex-col text-gray-500">
                  <div className="flex gap-2">
                    <p>{video.views} views</p>
                    <p>{formatDistanceToNow(new Date(video.createdAt))} ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ChannelVideo;
