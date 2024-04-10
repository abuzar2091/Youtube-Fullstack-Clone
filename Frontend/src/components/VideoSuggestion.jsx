// import React from "react";
// import ReactPlayer from "react-player";

// function VideoSuggestion({ videoUrl }) {
//   return (
//     <div className="flex  gap-4 w-[100%]">
//       <ReactPlayer
//         url={videoUrl}
//         controls
//         width="100%"
//         muted={true}
//         className="object-cover rounded-lg w-[40%]"
//       />

//       <div className="flex flex-col">
//         <p className="text-lg text-gray-400">
//           Chai aur JavaScript | Learn Js Mastarey with fun and funny moments
//         </p>
//         <p className=" text-gray-400">Chai aur Code</p>
//         <div className="flex text-gray-400 gap-2">
//           <p className="">694K views </p>
//           <p>1 years ago</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default VideoSuggestion;
import React from "react";
import ReactPlayer from "react-player";

function VideoSuggestion({ videoUrl }) {
  return (
    <div className="w-full flex max-w-lg rounded-lg   shadow-lg">
      {/* Video Player */}
      <div className="relative w-[30%]" style={{ paddingTop: "56.25%" }}>
        <ReactPlayer
          url={videoUrl}
          controls
          width="100%"
          height="60%"
          muted={true}
          className="absolute top-0 left-0 rounded-t-lg"
        />
      </div>
      {/* Video Details */}
      <div className="p-6 w-[60%]">
        <p className="text-lg text-gray-400">
          Chai aur JavaScript | Learn Js Mastarey with fun and funny moments
        </p>
        <p className="text-gray-400">Chai aur Code</p>
        <div className="flex text-gray-400 gap-2">
          <p className="">694K views</p>
          <p>1 year ago</p>
        </div>
      </div>
    </div>
  );
}

export default VideoSuggestion;
