import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DetailsPage from "./pages/DetailsPage";
import SplashPage from "./pages/SplashPage";
import MapPage from "./pages/MapPage";
import MyPage from "./pages/MyPage";
import Settings from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import { useUserContext } from "./contexts/UserContext";
import { useEffect } from "react";
import { auth } from "./Firebase/firebase";

function App() {
  const { user, setUser } = useUserContext();

  useEffect(() => {
    if (!user) setUser(auth.currentUser);
  }, [auth]);

  return (
    <Router>
      <Switch>
        <Route exact path="/map" component={MapPage} />
        <Route exact path="/map/:id" component={DetailsPage} />
        <Route exact path="/my" component={MyPage} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/Login" component={LoginPage} />
        <Route path="/" component={SplashPage} />
      </Switch>
    </Router>
  );
}

export default App;
