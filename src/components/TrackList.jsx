import { Play } from "lucide-react";
import React from "react";

export default function TrackList({
  tracks = [],
  handleTrackSelect,
  currentTrack,
}) {
  return (
    <ul>
      {tracks.map((track) => (
        <li
          key={track.id}
          onClick={() => handleTrackSelect(track)}
          className={`flex items-center justify-between py-2 border-b last:border-0 cursor-pointer ${
            currentTrack?.id === track.id ? "bg-indigo-100" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            {/* Random Avatar */}
            <img
              src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${track.id}&randomizeIds=false&skinColor=f2d3b1,ecad80`}
              alt="Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className="w-full break-all text-wrap">
              <p className="font-semibold text-gray-900">{track.name}</p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleTrackSelect(track);
            }}
            className="flex items-center gap-1 bg-indigo-600 text-white py-1 px-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Play size={16} />
            <span className="text-sm">Play</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
