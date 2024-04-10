// function Navbar() {
//   const [sidebarShow, setSidebarShow] = useState(false);
//   return (
//     <div className="flex justify-between items-start sticky top-0 pt-4 w-[100%] ">
//       <div className="flex flex-col w-[20%]">
//         <div className="flex gap-4 pl-6  ">
//           <button
//             className=" cursor-pointer "
//             onClick={() => setSidebarShow(!sidebarShow)}
//           >
//             <img src="/images/hamburger.png"/>
//           </button>
//           <div className="flex gap-1">
//             <img src="/images/logo.png" />
//             <img src="/images/utube.png" />
//           </div>
//         </div>
//         {sidebarShow && (
//           <div className="sidebar-slide-in top-10  absolute z-12 ">
//             <Sidebar />
//           </div>
//         )}

//         {/* {sidebarShow ? (
//           <div className="sidebar-slide-in">
//             <Sidebar />
//           </div>
//         ) : (
//           <div className="flex  flex-col pt-8  gap-6 w-[20%] pl-6">
//             <div className="flex flex-col items-center gap-0 ">
//               <img src="/images/home.png" />

//               <p className="text-[14px]">Home</p>
//             </div>
//             <div className="flex flex-col items-center  gap-0 ">
//               <img src="/images/explore.png" />
//               <p className="text-[14px]">Explore</p>
//             </div>

//             <div className="flex flex-col items-center  gap-0 ">
//               <img src="/images/subscriptions.png" />
//               <p className="text-[14px]">Subscriptions</p>
//             </div>

//             <div className="flex flex-col items-center gap-0">
//               <img src="/images/yourVideos.png" />
//               <p className="text-[14px]">You</p>
//             </div>
//           </div>
//         )} */}
//       </div>

//       <div className="flex justify-center items-center  ">
//         <input
//           type="text"
//           placeholder="Search"
//           className="bg-gray-400 text-red-black py-2 px-20 rounded-l-lg focus:outline-none focus:ring focus:border-blue-300"
//         />
//         <button className="bg-gray-700 relative text-gray-800 p-5 rounded-r-lg">
//           <img src="/images/search.png" className="absolute left-2 top-2" />
//         </button>
//         <img
//           src="/images/mic.png"
//           className="bg-gray-700 ml-2 p-3 rounded-full"
//         />
//       </div>

//       <div className="flex justify-center items-center gap-8 mr-6 ">
//         <img src="/images/create.png" />
//         <img src="/images/notifications.png" />
//         <img src="/images/tick.png" className="h-8" />
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import CreateVideo from "../pages/CreateVideo";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout as authLogout } from "../store/authSlice";
import {setPopoverVisibility} from '../store/uploadVideo';

const Navbar = () => {
  const [sidebarShow, setSidebarShow] = useState(false);
  // const [popoverVisible, setPopoverVisible] = useState(false);
  const dispatch=useDispatch();
  
  const popoverVisible = useSelector((state) => state.popover.popoverVisible);
  const togglePopover = () => {
   // setPopoverVisible(!popoverVisible);
    dispatch(setPopoverVisibility(!popoverVisible));
  };
  const handleLogout = async () => {
    await axios
      .post("/api/users/logout")
      .then((res) => {
        console.log("user logout successfully", res);
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(authLogout());
  };

  const authStatus = useSelector((state) => state.auth.status);
  return (
    <div className="">
      <div className="flex justify-between bg-black bg-opacity-100 items-start  pt-4 w-full  z-10">
        <div className="flex flex-col w-[20%]">
          <div className="flex gap-4 pl-6  ">
            <button
              className="cursor-pointer"
              onClick={() => {
                setSidebarShow(!sidebarShow);
              }}
            >
              <img src="/images/hamburger.png" alt="Menu" />
            </button>
            <Link to="/">
              <div className="flex gap-1">
                <img src="/images/logo.png" alt="Logo" />
                <img src="/images/utube.png" alt="YouTube" />
              </div>
            </Link>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-400 text-red-black py-2 px-20 rounded-l-lg focus:outline-none focus:ring focus:border-blue-300"
          />
          <button className="bg-gray-700 relative text-gray-800 p-5 rounded-r-lg">
            <img
              src="/images/search.png"
              alt="Search"
              className="absolute left-2 top-2"
            />
          </button>
          <img
            src="/images/mic.png"
            alt="Microphone"
            className="bg-gray-700 ml-2 p-3 rounded-full"
          />
        </div>

        <div className="flex justify-center items-center gap-8 mr-6 ">
          <button data-ripple-dark="true" onClick={togglePopover}>
            <img src="/images/create.png" alt="Create" />
          </button>
          <CreateVideo popoverVisible={popoverVisible} />
          <img src="/images/notifications.png" alt="Notifications" />

          {!authStatus ? (
            <>
              <Link to="/sign-up" className="text-white">
                SignUp
              </Link>
              <Link to="/login" className="text-white">
                Login
              </Link>
            </>
          ) : (
            <button className="text-white" onClick={handleLogout}>
              Logout
            </button>
          )}

          {/* <img src="/images/tick.png" alt="Tick" className="h-8" /> */}
        </div>
      </div>

      {sidebarShow && (
        <div
          className={`${
            !sidebarShow && `sidebar-slide-out`
          } sidebar-slide-in  absolute z-10 top-[40px] left-0 w-[20%]`}
        >
          <Sidebar />
        </div>
      )}
      {/* : (
        <div className="sidebar-slide-out  absolute z-100 top-[40px] left-0 w-[20%]">
          <Sidebar />
        </div>
      
      )} */}
    </div>
  );
};

export default Navbar;
