import VideoDetails from "./components/VideoDetails";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import CreateVideo from "./pages/CreateVideo";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import UserChannel from "./components/UserChannel";

import ChannelVideo from "./pages/ChannelVideo";
import ChannelLayout from "./components/ChannelLayout";
import PlayList from "./pages/PlayList";
import CommunityPostForm from "./pages/CommunityPostForm";
import CommunityPost from "./components/CommunityPost";
import CreatePlaylist from "./pages/CreatePlaylist";
import ShowPlaylistVideo from "./pages/ShowPlaylistVideo";
import AddVideoToPlaylist from "./pages/AddVideoToPlaylist";
function App() {
  return (
    <main className="flex h-screen bg-black opacity-80">
      <Routes>
        <Route index element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/upload-video" element={<CreateVideo />} />
        <Route path="/video/:id" element={<VideoDetails />} />
        <Route path="/user/:username" element={<ChannelLayout />}>
          <Route path="/user/:username/home" element={<ChannelVideo />} />
          {/* <Route
            path="/user/:username/communitypost"
            element={<CommunityPostForm />}
          /> */}
          <Route
            path="/user/:username/communitypost"
            element={<CommunityPost/>}
          />
          <Route path="/user/:username/playlist" element={<PlayList />} />
        </Route>
        <Route path="/user/:username/playlist/:playlistId/addvideo" element={<AddVideoToPlaylist/>}/>
        <Route path="/user/:username/createplaylist" element={<CreatePlaylist/>}/>
        <Route path="/user/:username/playlist/:playlistId" element={<ShowPlaylistVideo/>}/>
      </Routes>
    </main>
  );
}

export default App;
