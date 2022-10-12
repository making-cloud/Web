import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./component/Main/Main";
import Map from "./component/Map/Map";
import My from "./component/My/My";
import Settings from "./component/Settings/Settings";

function App() {
  return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="/map" element={<Map />} />
          <Route path="/my" element={<My />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
  );
}

export default App;
