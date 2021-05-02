import { BrowserRouter, Route } from "react-router-dom";
import RadioContext from "./contexts/RadioContext";
import UserContext from "./contexts/UserContext";

import Navbar from "./components/Navbar";
import Kanaler from "./pages/Kanaler";
import Home from "./pages/Home";
import ChannelPage from "./pages/ChannelPage";
import ProgramPage from "./pages/ProgramPage";
import User from "./pages/User";
import Categori from "./pages/Categori";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <RadioContext>
        <UserContext>
          <ScrollToTop />
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route exact path="/categories/:id" component={Categori} />
          <Route exact path="/kanaler" component={Kanaler} />
          <Route exact path="/channel/:channelId" component={ChannelPage} />
          <Route exact path="/program/:programId" component={ProgramPage} />
          <Route exact path="/user" component={User} />
        </UserContext>
      </RadioContext>
    </BrowserRouter>
  );
}

export default App;
