import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FirebaseProvider } from "./context/firebaseContext";
import MuiContextProvider from "./context/muiContext";
import GameContextProvider from "./context/gameContext";
import Welcome from "./pages/Welcome";
import Menu from "./pages/Menu";
import Game from "./pages/Game";
import Results from "./pages/Results";
import { AudioContextProvider } from "./context/audioContext";
import AppFooter from "./components/AppFooter";

const App = () => {
  return (
    <MuiContextProvider>
      <FirebaseProvider>
        <GameContextProvider>
          <AudioContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/game" element={<Game />} />
                <Route path="/results" element={<Results />} />
              </Routes>
            </BrowserRouter>
            <AppFooter />
          </AudioContextProvider>
        </GameContextProvider>
      </FirebaseProvider>
    </MuiContextProvider>
  );
};

export default App;
