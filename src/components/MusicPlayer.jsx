import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export default function MusicPlayer({
  audioPreview,
  currentTrack,
  nextTrack,
  prevTrack,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      // Auto-play when a new track is selected
      setIsPlaying(true);
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [audioPreview]);

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className="relative p-6 rounded-2xl max-w-xl shadow-lg border border-gray-800 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-80"></div>

      {/* Content */}
      <div className="relative text-white">
        {/* Header */}
        <div className="flex justify-between items-center text-green-400 text-sm">
          <span>{currentTrack?.name || "Now Playing"}</span>
          <span className="text-gray-400">...</span>
        </div>

        {/* Song Info */}
        <div className="flex items-center mt-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-green-400 text-wrap break-all">
              {currentTrack?.name || "Unknown Track"}
            </h2>
            {/* <p className="text-gray-400">Artist Name</p> */}
          </div>
          <img
            src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${currentTrack?.id}&randomizeIds=false&skinColor=f2d3b1,ecad80`}
            alt="Album Cover"
            className="rounded-lg w-24 h-24 object-cover"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-4">
          {/* <Heart
            className={`text-gray-400  ${
              currentTrack?.id ? "text-red-600" : ""
            } cursor-pointer`}
            onClick={favTrack}
          /> */}
          <SkipBack className="text-white cursor-pointer" onClick={prevTrack} />
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-white text-black p-3 rounded-full flex items-center justify-center w-12 h-12"
          >
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <SkipForward
            className="text-white cursor-pointer"
            onClick={nextTrack}
          />
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full h-1 bg-gray-700 rounded-full relative">
            <div className="w-3/4 h-1 bg-green-400 rounded-full"></div>
          </div>
          <div className="flex justify-between text-gray-400 text-xs mt-2">
            <span>2:37</span>
            <span>3:15</span>
          </div>
        </div>

        {/* Hidden Audio Element */}
        <audio ref={audioRef} controls autoPlay className="w-full hidden">
          <source src={audioPreview} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
}
