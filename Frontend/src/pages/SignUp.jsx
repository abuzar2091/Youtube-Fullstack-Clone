import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice.js";

function SignUp() {
  const [formData, setFormData] = useState({
    channelName: "",
    username: "",
    email: "",
    password: "",
    avatar: null,
    coverImage: null,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    if (e.target.name === "avatar" || e.target.name === "coverImage") {
      console.log(e.target.files[0]);
      console.log(e.target);
      setFormData({ ...formData, [e.target.name]: e.target.files[0] || null });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // const data = new FormData();
  // data.append("fullName", formData.fullName);
  // data.append("username", formData.username);
  // data.append("email", formData.email);
  // data.append("password", formData.password);
  // data.append("avatar", formData.avatar);
  // data.append("coverImage", formData.coverImage);
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(formData);
    try {
      const response = await axios.post("/api/users/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response from backend:");
      dispatch(authLogin(response.data.data));
      console.log(response);

      setFormData({
        channelName: "",
        username: "",
        email: "",
        password: "",
        avatar: null,
        coverImage: null,
      });
      navigate("/");
      // Optionally, you can redirect the user or show a success message here
    } catch (error) {
      console.error("occur Error signing up:", error);
      // Handle error
    }
  };
  return (
    <div class="flex flex-col gap-2 justify-center text-white items-center mx-auto mt-0 w-[70%] font-serif">
      <h2 class="text-3xl font-semibold">Signup Form</h2>
      <div class="min-w-[500px]">
        <form onSubmit={handleSubmit}>
          <div class="flex  gap-4">
            <label for="avatar">Profile Image</label>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              class="border-2 rounded-md px-8 py-2"
              placeholder="upload your profile image"
              onChange={handleChange}
              required
            />
            <label for="coverImage">Cover Image</label>
            <input
              type="file"
              name="coverImage"
              accept="image/*"
              class="border-2 rounded-md px-8 py-2"
              placeholder="upload your profile image"
              onChange={handleChange}
            />
          </div>
          <div class="flex flex-col gap-4">
            <label for="fullName">ChannelName</label>
            <input
              type="text"
              name="channelName"
              value={formData.channelName}
              class="border-2 rounded-md px-8 py-2"
              placeholder="Enter Full Name"
              onChange={handleChange}
              required
            />
          </div>
          <div class="flex flex-col gap-4">
            <label for="username">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              class="border-2 rounded-md px-8 py-2"
              placeholder="Enter username"
              onChange={handleChange}
              required
            />
          </div>
          <div class="flex flex-col gap-4">
            <label for="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              class="border-2 rounded-md px-8 py-2"
              placeholder="Enter email"
              onChange={handleChange}
              required
            />
          </div>
          <div class="flex flex-col gap-4">
            <label for="password">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              id="password"
              class="border-2 rounded-md px-8 py-2"
              placeholder="Enter password"
              onChange={handleChange}
              required
            />
          </div>
          <div class="flex mt-4 gap-4 items-center">
            <button class="bg-green-600 text-white rounded-lg py-2 px-4">
              Signup
            </button>
            <p class="text-gray-500 text-md font-semibold">
              Already have an account?
              <Link to="/login" className="hover:text-blue-400 ml-2">
                Login here.
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
