import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setTweetPopoverVisibility } from "../store/postTweet";
import axios from "axios";
function CommunityPostForm() {
  const [formData, setFormData] = useState({
    content:""
  });

  const dispatch = useDispatch();
  const popoverVisible = useSelector(
    (state) => state.tweetPopover.tweetPopoverVisible
  );
  const handleChange=(e)=>{

     setFormData({[e.target.name]: e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/tweet/createtweet", formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.error(err));
    setFormData({
        content:""
    });
    dispatch(setTweetPopoverVisibility(false));
  };
  const togglePopover = () => {
    dispatch(setTweetPopoverVisibility(!popoverVisible));
  };

  return (
    <div className="bg-black w-full">
      <div className="">
        <button
          data-ripple-dark="true"
          data-popover-target="popover-animation"
          onClick={togglePopover}
        >
          <img src="/images/create.png" alt="Create" />
        </button>
      </div>
      {popoverVisible && (
        <div className=" bg-gray-800 ml-24 w-full">
          <div class="flex flex-col gap-2 justify-center  items-center  mt-0 w-[90%] font-serif">
            <h2 class="text-3xl font-semibold">Post Your Tweet</h2>
            <div class="min-w-[500px]">
              <form onSubmit={handleSubmit}>
                <div class="flex flex-col gap-4 ">
                  <label for="password">Content</label>
                  <textarea
                    type="text"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    class="border-2 rounded-md px-8 py-2"
                    placeholder="Write your content..."
                    required
                  ></textarea>
                </div>
                <div class="flex gap-4 items-center mt-4">
                  <button class="bg-green-600 text-white rounded-lg py-2 px-8 ">
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommunityPostForm;
