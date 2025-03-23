import axios from "axios";
import { Search as SearchIcon } from "lucide-react";
import { useState } from "react";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import MusicPlayer from "./components/MusicPlayer.jsx";
import TrackList from "./components/TrackList.jsx";

function App() {
  const randomAvatar = `https://api.dicebear.com/9.x/adventurer/svg?seed=${Math.random()}&randomizeIds=false&skinColor=f2d3b1,ecad80`;

  const [musicList, setMusicList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentSongIndex, setcurrentSongIndex] = useState(null);

  const searchMusicAPI = async (url) => {
    const headers = {
      Authorization: `Token Dyjz7trmYZEG0jDK4eoWttjQK298Z94znjHRrf0T`,
    };

    setIsLoading(true);
    try {
      const res = await axios.get(url, { headers });
      setMusicList(res.data);
    } catch (err) {
      console.error("Error fetching music data: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    if (!isLoading) {
      setSearchValue(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim() && !isLoading) {
      searchMusicAPI(
        `https://freesound.org/apiv2/search/text/?fields=id,name,previews&query=${searchValue}`
      );
      setSearchValue("");
    }
  };

  const handleTrackSelect = (track) => {
    console.log("Playing track:", track);
    const currentIndex = musicList?.results?.findIndex(
      (song) => song.id === track.id
    );
    console.log("Current Song Index:", currentIndex);
    setCurrentTrack(track);
    setcurrentSongIndex(currentIndex);
  };

  const nextTrack = () => {
    if (currentSongIndex < musicList.results.length - 1) {
      const nextIndex = currentSongIndex + 1;
      setCurrentTrack(musicList.results[nextIndex]);
      setcurrentSongIndex(nextIndex);
    }
  };

  const prevTrack = () => {
    if (currentSongIndex > 0) {
      const prevIndex = currentSongIndex - 1;
      setCurrentTrack(musicList.results[prevIndex]);
      setcurrentSongIndex(prevIndex);
    }
  };

  return (
    <div className="bg-gray-300 min-h-screen flex flex-col items-center p-6 sm:p-3">
      {/* Top Navigation Bar */}
      <div className="w-full max-w-4xl bg-indigo-600 p-4 rounded-lg flex items-center justify-between mb-6 sm:mb-3">
        {/* Search Box */}
        <div className="relative w-full max-w-full">
          <form onSubmit={handleSubmit}>
            <SearchIcon
              className="absolute top-2 left-3 text-white"
              size={20}
            />
            <input
              type="text"
              placeholder="Search for Music..."
              value={searchValue}
              onChange={handleChange}
              className="w-full py-2 pl-10 pr-4 bg-indigo-500 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white rounded-lg"
            />
          </form>
        </div>
        {/* Notification & Profile with Random Avatar */}
        <div className="flex items-center gap-4 ml-4">
          {/* <button className="text-white">
            <Bell size={24} />
          </button> */}
          <img
            src={randomAvatar}
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover border-2 border-white"
          />
        </div>
      </div>

      {/* Audio Player */}
      {currentTrack &&
        currentTrack.previews &&
        currentTrack.previews["preview-hq-mp3"] && (
          <div className=" flex justify-center items-center mb-6 w-full max-w-4xl">
            <MusicPlayer
              audioPreview={currentTrack.previews["preview-hq-mp3"]}
              currentTrack={currentTrack}
              nextTrack={nextTrack}
              prevTrack={prevTrack}
            />
          </div>
        )}

      {/* Content Area */}
      <div className="w-full max-w-4xl bg-white rounded-lg p-6 shadow-lg">
        {isLoading ? (
          <LoadingSpinner />
        ) : musicList?.results?.length > 0 ? (
          <>
            <TrackList
              tracks={musicList.results}
              handleTrackSelect={handleTrackSelect}
              currentTrack={currentTrack}
            />
            <div className="pagination flex justify-between mt-4 ">
              {musicList?.previous && (
                <button
                  onClick={() => searchMusicAPI(musicList.previous)}
                  disabled={isLoading}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-colors"
                >
                  Prev
                </button>
              )}
              {musicList?.next && (
                <button
                  onClick={() => searchMusicAPI(musicList.next)}
                  disabled={isLoading}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-colors"
                >
                  Next
                </button>
              )}
            </div>
          </>
        ) : (
          <p className="text-gray-400 text-center">No Songs available</p>
        )}
      </div>
    </div>
  );
}

export default App;
