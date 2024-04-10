import React, { useEffect, useState } from "react";
import Home from "./Home";
import Navbar from "./Navbar";
import VideoSection from "./VideoSection";
import VideoSuggestion from "./VideoSuggestion";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ReactPlayer from "react-player";

function VideoDetails() {
  const { id } = useParams();
  const [video, setVideo] = useState([]);
  console.log(id);
  useEffect(() => {
    const fetchVideo = async () => {
      await axios
        .get(`/api/videos/getvideo/${id}`)
        .then((res) => {
          setVideo(res.data.data[0]);
          //console.log(res.data.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchVideo();
  }, []);
  console.log(video);
  //console.log(video.ownerInfo[0]?.avatar);

  return (
    <div>
      <div className="flex  flex-col w-full min-h-screen  bg-slate-600">
        <div className="sticky top-0 z-12 ">
          <Navbar />
        </div>
        <div className="flex gap-4 mt-8 w-[95%] mx-auto flex-grow">
          <div className="w-[60%]">
            <ReactPlayer
              url={video.videoUrl}
              controls
              width="100%"
              muted={true}
              className="object-cover w-[100%]"
            />

            <div className="text-black  font-bold text-xl">
              {video.description}
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-4  items-center">
                {video.ownerInfo && (
                    <Link to={`/${video.ownerInfo[0]?.username}`}>
                  <img
                    src={video.ownerInfo[0]?.avatar}
                    className="h-8 rounded-full"
                  />
                    </Link>
                )}
                {video.ownerInfo && <p>{video.ownerInfo[0]?.channelName}</p>}
                <div className="flex gap-3 bg-gray-300 px-3 py-2 text-white rounded-lg">
                  <img
                    src="/images/notifications.png"
                    className="bg-gray-300 rounded-lg"
                  />
                  <p>Subscribed</p>
                  <img src="/images/arrowBottom.png" />
                </div>
              </div>

              <div className="flex gap-4">
                <img src="/images/liked.png" className="bg-gray-200" />
                <p>690</p>
                <img
                  src="/images/disLiked.png"
                  alt="dislike"
                  className="bg-gray-200"
                />
                <img src="/images/Share.png" className="bg-gray-200" />
                <img src="/images/More.png" className="bg-gray-200" />
              </div>
            </div>
            <div>
              <p>{video.views} views</p>
            </div>
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex gap-4 ">
                <p className="text-lg font-semibold">156 Comments</p>
                <div className="flex bg-gray-300 rounded-lg py-1 px-4">
                  <img src="/images/Dropdown.png" />
                  <p>Sortby</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <img src="/images/tick.png" className="h-8" />
                <input
                  placeholder="Add a comment..."
                  className="w-[100%] rounded-md px-4"
                />
              </div>
              <div className="flex justify-end gap-4 ">
                <button className="bg-slate-500 rounded-lg py-1 px-4">
                  Cancel
                </button>
                <button className="bg-slate-500 rounded-lg py-1 px-4">
                  Comment
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-[40%]">
            <VideoSuggestion />
            <VideoSuggestion />
            <VideoSuggestion />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoDetails;
