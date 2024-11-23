"use client";
import { useState } from "react";

const VideoGallery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  const videos = [
    "/pink.mp4", // Replace with your video URLs
    "/green_diamonds.mp4",
  ];

  const openModal = (video) => {
    setActiveVideo(video);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setActiveVideo(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  ">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Video Gallery</h1>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 max-w-5xl">
        {videos.map((video, index) => (
          <div
            key={index}
            className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
            onClick={() => openModal(video)}
          >
            <video
              src={video}
              className="w-full h-auto group-hover:opacity-90"
              controls
            />
            {/* Overlay Effect */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center">
              <p className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                Play Video
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 transition-opacity duration-300 animate-fadeIn"
          onClick={closeModal}
        >
          <div
            className="relative max-w-3xl   p-4 transition-transform transform animate-scaleUp"
            onClick={(e) => e.stopPropagation()} // Prevent modal close on inner click
          >
            <video
              src={activeVideo}
              className="w-full h-[50vh] md:h-[80vh] rounded-lg shadow-lg"
              controls
              autoPlay
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGallery;
