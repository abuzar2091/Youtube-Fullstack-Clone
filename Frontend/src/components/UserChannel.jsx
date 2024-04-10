import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Link, useParams, useLocation } from "react-router-dom";
import ChannelVideo from "../pages/ChannelVideo";
function UserChannel() {
  const [ownerData, setOwnerData] = useState();
  const { username } = useParams();
  const { pathname } = useLocation();
  console.log(pathname);

  useEffect(() => {
    const fetchChannelProfile = async () => {
      await axios
        .get(`/api/users/channel/${username.slice(1)}`)
        .then((res) => {
          const date = new Date(res.data.data.createdAt);
          const options = { year: "numeric", month: "long", day: "numeric" };
          const dateJoined = date.toLocaleDateString("en-GB", options);
          setOwnerData({ ...res.data.data, createdAt: dateJoined });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchChannelProfile();
  }, []);
  //console.log(ownerData);
  return (
    <div className="text-white w-full min-h-full">
      <div className="sticky top-0 z-12 ">
        <Navbar />
      </div>
      <div className="flex gap-12 mt-4 ">
        <div className=" ">
          <div className="flex  flex-col sticky  top-16 -z-1  pt-2  gap-8 w-[100%]  pl-0">
            <div className="flex flex-col items-center  gap-1 ">
              <img src="/images/home.png" />

              <p className="text-[14px]">Home</p>
            </div>

            <div className="flex flex-col items-center  gap-1 ">
              <img src="/images/explore.png" />
              <p className="text-[14px]">Explore</p>
            </div>

            <div className="flex flex-col items-center gap-1 ">
              <img src="/images/subscriptions.png" />
              <p className="text-[14px]">Subscriptions</p>
            </div>

            <div className="flex flex-col items-center gap-1">
              <img src="/images/yourVideos.png" />
              <p className="text-[14px]">You</p>
            </div>
          </div>
        </div>
        <div className=" flex flex-col">
          <div className="flex gap-8">
            <div className="flex items-center">
              <img src={ownerData?.avatar} className="rounded-full h-40 w-40" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-4xl font-semibold">Chai aur Code</p>
              <div className="flex gap-2">
                <p>{ownerData?.username} .</p>
                <p>{ownerData?.subscribersCount} Subscribers .</p>
                <p>20 videos</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-2xl font-semibold">Channel Details</p>
                <p>{ownerData?.subscribersCount} Subscribers .</p>
                <p>20 videos</p>
                <p>400 views</p>
                <p>Joined {ownerData?.createdAt} </p>
              </div>
              <button className="border-2 w-[60%] py-1 rounded-xl bg-white text-black">
                Subscribe
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-12">
            <div className="flex gap-24 mt-12 ml-0">
              <div className="">
                <Link
                  to={`/user/@${ownerData?.username}/home`}
                  className="flex  items-center gap-3"
                >
                  <p>Home</p>
                </Link>
                {pathname === `/user/@${ownerData?.username}/home` ? (
                  <div className="h-[2px] mt-2 bg-red-300"></div>
                ) : (
                  ""
                )}
              </div>
              <div className="">
                <Link
                  to={`/user/@${ownerData?.username}/videos`}
                  className="flex  items-center gap-3"
                >
                  <p>Videos</p>
                </Link>
                {pathname === `/user/@${ownerData?.username}/videos` ? (
                  <div className="h-[2px] mt-2 bg-slate-300"></div>
                ) : (
                  ""
                )}
              </div>
              <div className="">
                <Link
                  to={`/user/@${ownerData?.username}/playlist`}
                  className="flex  items-center gap-3"
                >
                  <span>Playlist</span>
                </Link>
                {pathname === `/user/@${ownerData?.username}/playlist` ? (
                  <div className="h-[2px] mt-2 bg-slate-300"></div>
                ) : (
                  ""
                )}
              </div>
              <div className="w-full">
                <Link
                  to={`/user/@${ownerData?.username}/communitypost`}
                  className="flex  items-center gap-3"
                >
                  <span>Community Post</span>
                </Link>
                {pathname === `/user/@${ownerData?.username}/communitypost` ? (
                  <div className="h-[2px] mt-2 bg-slate-300"></div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserChannel;
