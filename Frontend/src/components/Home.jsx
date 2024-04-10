import { Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import VideoSection from "./VideoSection.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { formatDistanceToNow } from "date-fns";
function Home() {
  const videoSections = [];
  for (let i = 1; i <= 3; i++) {
    videoSections.push(<VideoSection key={i} />);
  }
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/videos/allvideos");
      setVideos(res.data.data.videos);
      // console.log(res.data.data.videos[0].ownerInfo);
      //console.log("data is fetched");
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex w-full m-0 p-0 min-h-full bg-black bg-opacity-80">
        <div className="w-[100%]">
          <div className="sticky top-0 z-12 ">
            <Navbar />
          </div>
          <div className="flex gap-12  ">
            <div className=" ">
              <div className="flex  flex-col sticky  top-16 -z-1  pt-2  gap-6 w-[100%]  pl-0">
                <div className="flex flex-col items-center  gap-0 ">
                  <img src="/images/home.png" />

                  <p className="text-[14px]">Home</p>
                </div>

                <div className="flex flex-col items-center  gap-0 ">
                  <img src="/images/explore.png" />
                  <p className="text-[14px]">Explore</p>
                </div>

                <div className="flex flex-col items-center gap-0 ">
                  <img src="/images/subscriptions.png" />
                  <p className="text-[14px]">Subscriptions</p>
                </div>

                <div className="flex flex-col items-center gap-0">
                  <img src="/images/yourVideos.png" />
                  <p className="text-[14px]">You</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 mr-8  gap-10 mt-8">
              {videoSections.map((video) => (
                <Link to={`/video/${video._id}`}>{video}</Link>
              ))}
              {videos.map((video) => (
                <div className="bg-white flex flex-col rounded-lg">
                  <Link to={`/video/${video._id}`}>
                    <div className="">
                      <ReactPlayer
                        url={video.videoUrl}
                        controls
                        width="100%"
                        //height={"60%"}
                        //   playing={inView} // Automatically plays when in view, pauses when out of view
                        loop // Loops the video when it reaches the end
                        muted={true}
                        className="object-cover"
                      />
                    </div>
                  </Link>
                  <div className="flex justify-center mt-2 gap-2">
                    <Link to={`/user/@${video.ownerInfo[0]?.username}`}>
                      <img
                        src={video.ownerInfo[0].avatar}
                        className="h-10 mt-2 rounded-full"
                      />
                    </Link>

                    <div className="flex flex-col  gap-2">
                      <p className="font-semibold">{video.description}</p>
                      <div className="flex flex-col text-gray-500">
                        <p className="font-semibold text-md">
                          {video.ownerInfo[0].channelName}
                        </p>
                        <div className="flex gap-2  ">
                          <p>{video.views} views</p>
                          <p>{formatDistanceToNow(video.createdAt)} ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {/* <div className="h-80 w-60 rounded-3xl border-gray-700 border-2 overflow-hidden">
                <ReactPlayer
                  url={url}
                  controls
                  width="100%"
                  height={"100%"}
                  //   playing={inView} // Automatically plays when in view, pauses when out of view
                  loop // Loops the video when it reaches the end
                  muted={true}
                  className="object-cover"
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
