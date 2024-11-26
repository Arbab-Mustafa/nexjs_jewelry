import React from "react";

const Vedio = () => {
  return (
    <div className="  mt-12 rounded-lg    my-2 md:my-4 py-2 ">
      <h2 className="text-xl md:text-3xl text-center py-2 md:py-6">
        Company Presentation Video
      </h2>
      {/* Video Container with Hover Effect */}
      <div className="   mx-auto">
        <iframe
          className="  mx-auto  w-auto md:w-[55rem]   h-[20rem] md:h-[27rem] transition-all group-hover:scale-105 group-hover:opacity-90 rounded-md"
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
