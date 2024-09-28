import React from "react";
import ShowTime from "./ShowTime";

const VideoPopup = ({ subContent, currIndex }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-white text-xl rounded-lg">
        <div>
          <video
            controls
            className="w-[68rem] mt-5 border"
            src={subContent?.video}
          />
        </div>
        <div className="flex justify-center pt-5 font-bold">
          {currIndex + 1}) {subContent?.title} - <div className="mr-2"></div>
          <ShowTime time={subContent?.time} />
        </div>
        <div className="flex justify-center pt-5 font-bold">
          {subContent?.description}
        </div>
      </div>
    </div>
  );
};

export default VideoPopup;
