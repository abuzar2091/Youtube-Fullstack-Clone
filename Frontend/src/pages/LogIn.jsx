import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice.js";
function LogIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/users/login", formData);
      console.log("Response from backend:");
      console.log(response.data.data);
      dispatch(authLogin(response.data.data));
      //console.log(formData);
      setFormData({
        email: "",
        password: "",
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
      <h2 class="text-3xl font-semibold">SignIn Form</h2>
      <div class="min-w-[500px]">
        <form onSubmit={handleSubmit}>
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
          <div class="flex flex-col gap-4 ">
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
          <div class="flex gap-4 items-center mt-4">
            <button class="bg-green-600 text-white rounded-lg py-2 px-4 ">
              Signin
            </button>
            <p className="text-gray-500 text-md font-semibold ">
              Don't have an account?
              <Link to="/sign-up" className="hover:text-blue-400 ml-2 ">
                Register here.
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
