import { BrowserRouter, Route, Routes } from "react-router-dom";

import { FirebaseProvider } from "./context/firebaseContext";
import MuiContextProvider from "./context/muiContext";
import GameContextProvider from "./context/gameContext";
import Welcome from "./pages/Welcome";
import Menu from "./pages/Menu";
import Game from "./pages/Game";
import Results from "./pages/Results";

const App = () => {
  return (
    <MuiContextProvider>
      <FirebaseProvider>
        <GameContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/game" element={<Game />} />
              <Route path="/results" element={<Results />} />
            </Routes>
          </BrowserRouter>
        </GameContextProvider>
      </FirebaseProvider>
    </MuiContextProvider>
  );
};

export default App;
