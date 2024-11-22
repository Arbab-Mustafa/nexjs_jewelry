import React from "react";

const Vedio = () => {
  return (
    <div className="relative w-full mt-12 rounded-lg overflow-hidden shadow-xl bg-gray-200 group">
      {/* Video Container with Hover Effect */}
      <div className="relative w-full h-0 pt-[56.25%] bg-gray-800">
        <iframe
          className="absolute top-0 left-0 w-full h-full transition-all group-hover:scale-105 group-hover:opacity-90"
          src="https://www.youtube.com/embed/KF0yuG7uWyo?si=RnFh6Zvk4WdP_frm"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default Vedio;
