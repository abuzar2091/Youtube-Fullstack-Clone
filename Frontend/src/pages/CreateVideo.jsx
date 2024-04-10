import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setPopoverVisibility } from "../store/uploadVideo.js";
function CreateVideo() {
  const dispatch = useDispatch();
  const popoverVisible = useSelector((state) => state.popover.popoverVisible);
  const [formData, setFormData] = useState({
    title: "",  
    description: "",
    videotags: "",
    videoUrl: null,
  });
  const handleChange = (e) => {
    if (e.target.name === "videoUrl") {
      console.log(e.target.files[0]);
      setFormData({ ...formData, [e.target.name]: e.target.files[0] || null });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("/api/videos/publishvideo", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Response from backend:");
        console.log(response);

      setFormData({
        title: "",
        description: "",
        videotags: "",
        videoUrl: null,
      });
      dispatch(setPopoverVisibility(!popoverVisible));
      // Optionally, you can redirect the user or show a success message here
    } catch (error) {
      console.error("occur Error while uploading:", error);
      // Handle error
    }
  };

  return (
    <div className="w-full absolute top-[100%] right-[0%]  flex justify-center items-center">
      {popoverVisible && (
        <div
          className=" w-[50%] grid-cols-2 overflow-hidden whitespace-normal break-words rounded-lg border border-blue-gray-50 bg-white p-0 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none "
          aria-labelledby=":r3a:-label"
          aria-describedby="popover-with-image"
          id="popover-with-image"
          role="dialog"
        >
          <div class="flex flex-col   items-center  p-4">
            <p class="block mb-2 font-sans text-lg antialiased font-bold text-blue-gray-900">
              Upload Video
            </p>
            <form onSubmit={handleSubmit}>
              <div class="  p-4">
                <input
                  type="file"
                  name="videoUrl"
                  accept="video/*"
                  class="border-2 rounded-md px-8 w-[100%] py-2"
                  onChange={handleChange}
                  //   required
                />
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  name="title"
                  class="border-2 rounded-md px-8 w-[100%] py-2"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mt-4">
                <textarea
                  type="text"
                  name="description"
                  class="border-2 rounded-md px-8 w-[100%] py-2"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mt-4">
                <textarea
                  type="text"
                  name="videotags"
                  class="border-2 rounded-md px-8 w-[100%] py-2"
                  placeholder="Tags for SEO (comma separated)"
                  value={formData.videotags}
                  onChange={handleChange}
                />
              </div>

              <button class="flex items-center mt-4 px-4 py-2 font-sans text-xs font-bold bg-green-500 text-center text-gray-900 capitalize align-middle transition-all rounded-lg select-none gap-x-2 hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                Upload
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateVideo;
