import React, { useState } from "react";
{
  /* <div className="flex gap-4 bg-black z-10 sticky top-0 pl-6 pt-4  ">
<button className=" " onClick={()=>setSidebarShow(!sidebarShow)}>
<img src="/images/hamburger.png" />
</button>
<div className="flex gap-1">
  <img src="/images/logo.png" />
  <img src="/images/utube.png" />
</div>
</div> */
}

function Sidebar() {
  return (
    <div className=" h-screen overflow-y-auto ">
      <div className=" bg-black z-12 text-white w-[100%] text-center min-h-[100vh] ">
        <div className="flex flex-col pt-8 pb-16 pl-6 gap-8 ">
          <div className="flex flex-col gap-6 ">
            <div className="flex gap-4 ">
              <img src="/images/home.png" />
              <p className="">Home</p>
            </div>
            <div className="flex gap-4 ">
              <img src="/images/explore.png" />
              <p className="">Explore</p>
            </div>
            <div className="flex gap-4  ">
              <img src="/images/subscriptions.png" />
              <p className="">Subscriptions</p>
            </div>
            <div className="border-t border-gray-200  w-[80%]"></div>
          </div>

          <div className="flex flex-col gap-6  ">
            <div className="flex gap-2">
              <h1 className="font-semibold text-lg text-gray-300">You</h1>
              <img src="/images/leftBottom.png" />
            </div>
            <div className="flex  gap-4 ">
              <img src="/images/library.png" />
              <h1 className="">Library</h1>
            </div>
            <div className="flex  gap-4 ">
              <img src="/images/history.png" />
              <h1 className="">History</h1>
            </div>
            <div className="flex  gap-4 ">
              <img src="/images/yourVideos.png" />
              <h1 className="">Your Videos</h1>
            </div>
            <div className="flex  gap-4 ">
              <img src="/images/watchLater.png" />
              <h1 className="">Watch Later</h1>
            </div>
            <div className="flex  gap-4 ">
              <img src="/images/liked.png" />
              <h1 className="">Liked Videos</h1>
            </div>
            <div className="flex gap-2">
              <h1 className="">Show More</h1>
              <img src="/images/arrowBottom.png" />
            </div>
            <div className="border-t border-gray-200  w-[80%]"></div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex gap-2">
              <h1 className="font-semibold text-lg text-gray-300">
                Subscriptions
              </h1>
            </div>
            <div className="flex gap-4">
              <img src="/images/tick.png" className="h-8" />
              <p>Chai aur Code</p>
            </div>
            <div className="flex gap-4">
              <img src="/images/tick.png" className="h-8" />
              <p>Code With harry</p>
            </div>
            <div className="flex gap-4">
              <img src="/images/tick.png" className="h-8" />
              <p>JS Mastarey</p>
            </div>
            <div className="flex gap-4">
              <img src="/images/tick.png" className="h-8" />
              <p>Lover Babbar</p>
            </div>
            <div className="flex gap-4">
              <img src="/images/tick.png" className="h-8" />
              <p>Apna College</p>
            </div>
            <div className="flex gap-2">
              <h1 className="">Show More</h1>
              <img src="/images/arrowBottom.png" />
            </div>
          </div>

          <div className="flex flex-col gap-6  ">
            <div className="flex gap-2">
              <h1 className="font-semibold text-lg text-gray-300">
                More From YouTube
              </h1>
            </div>
            <div className="flex  gap-4 ">
              <img src="/images/premium.png" />
              <h1 className="">Youtube Preminum</h1>
            </div>
            <div className="flex  gap-4 ">
              <img src="/images/gaming.png" />
              <h1 className="">Gaming</h1>
            </div>
            <div className="flex  gap-4 ">
              <img src="/images/live.png" />
              <h1 className="">Live</h1>
            </div>
            <div className="flex  gap-4 ">
              <img src="/images/sports.png" />
              <h1 className="">Sports</h1>
            </div>
            <div className="border-t border-gray-200  w-[80%]"></div>
            <div className="flex  gap-4 ">
              <img src="/images/gaming.png" />
              <h1 className="">Settings</h1>
            </div>
            <div className="flex  gap-4 ">
              <img src="/images/live.png" />
              <h1 className="">Report history</h1>
            </div>
            <div className="flex  gap-4 ">
              <img src="/images/sports.png" />
              <h1 className="">Help</h1>
            </div>

            <div className="flex  gap-4 ">
              <img src="/images/sports.png" />
              <h1 className="">Send feedback</h1>
            </div>
            <div className="border-t border-gray-200  w-[80%]"></div>

            <div className="font-semibold w-[80%] flex flex-col gap-4">
              <p>
                About Press Copyright Contact us Creator Advertise Developers
              </p>
              <p>
                Terms Privacy Policy & Safety How Youtube Works Test new
                features
              </p>
              <p>&copy;2024 Google LLC</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
