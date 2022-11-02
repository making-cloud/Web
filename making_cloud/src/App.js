import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Details from "./pages/Details";
import MainPage from "./pages/MainPage";
import MapPage from "./pages/MapPage";
import MyPage from "./pages/MyPage";
import Settings from "./pages/SettingsPage";


function App() {
  return (
      <Router>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/details" element={<Details />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
  );
}

export default App;
