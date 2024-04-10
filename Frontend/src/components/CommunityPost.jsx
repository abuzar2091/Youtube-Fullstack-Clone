import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import CommunityPostForm from "../pages/CommunityPostForm";
import { useSelector } from "react-redux";

function CommunityPost() {
  const { username } = useParams();
  const currLoggedInUser = useSelector((state) => state.auth.loggedInUser);
  //   console.log("curr user ", currLoggedInUser);

  const [communitypost, setCommunityPost] = useState({});
  useEffect(() => {
    // console.log("inside  fech", username.slice(1));
    const fetchCommunityPost = async () => {
      await axios
        .get(`/api/tweet/gettweet/${username.slice(1)}`)
        .then((res) => {
          //console.log(res.data);
          setCommunityPost(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchCommunityPost();
  }, [username]);
  return (
    <div className="flex flex-col bg-black text-white">
      {currLoggedInUser?.username === username?.slice(1) && (
        <div className="flex justify-end">
          Create Community Post
          <CommunityPostForm className="" />
        </div>
      )}
      <div className="flex flex-col items-center ">
        {communitypost.userTweet &&
          communitypost.userTweet.map((post) => (
            <div
              className=" flex flex-col gap-4 w-[50%] border-2 rounded-lg h-[200px]"
              key={post._id}
            >
              <div className="flex items-center p-2 gap-3">
                <img
                  src={communitypost.avatar}
                  alt={communitypost.channelName}
                  className="h-20 w-20 rounded-full"
                />
                <p className="">{communitypost.channelName}</p>
                <p>{formatDistanceToNow(post.createdAt)} ago</p>
              </div>
              <div className="p-2">{post.content}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CommunityPost;
