import React from "react";
import { RxCross2 } from "react-icons/rx";

const VideoPopup = ({ setShowVideo, linkText, altHeading }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div
        className="fixed inset-0 bg-opacity-80 backdrop-blur-sm z-10"
        onClick={() => setShowVideo(false)}
      ></div>
      <div className="bg-slate-200 text-black min-h-fit text-xl fixed z-20 duration-150 ease-in-out rounded-lg p-2">
        <div className="flex justify-center pt-5 font-bold">{altHeading}</div>
        <RxCross2
          className="absolute top-5 right-5 text-3xl font-extrabold duration-150 ease-in-out hover:opacity-80 cursor-pointer"
          onClick={() => setShowVideo(false)}
        />
        <div>
          <video controls className="pt-0 pb-5 px-8 mt-5 w-[50rem] border-2">
            <source src={linkText} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default VideoPopup;
