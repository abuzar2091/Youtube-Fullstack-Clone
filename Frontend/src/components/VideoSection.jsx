import React from "react";

function VideoSection() {
  return (
    <div className="bg-white flex flex-col gap-3 rounded-lg">
      <div className="">
        <img src="/images/background.png" className="rounded-lg" />
      </div>
      <div className="flex justify-center gap-2">
        <img src="/images/tick.png" className="h-10" />

        <div className="flex flex-col  gap-2">
          <p className="font-semibold">
            Chai aur JavaScript with full | tailwind CSS Learn in easy way
          </p>
          <div className="flex flex-col text-gray-500">
            <p className=" ">Chai aur Code</p>
            <div className="flex gap-2  ">
              <p>623k views</p>
              <p>2 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoSection;
