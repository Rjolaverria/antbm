import { useContext } from "react";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MusicOffIcon from "@mui/icons-material/MusicOff";

import { AudioContext } from "../../context/audioContext";
import tyrabots from "../../assets/stock/tyrabots.png";

import "./style.css";

const AppFooter = () => {
  const { muted, setMuted } = useContext(AudioContext);
  return (
    <div className="app-footer">
      <span>
        Powered by
        <img src={tyrabots} alt="Tyra bots" style={{ width: 40 }} />
        Tyra Bots @ Drift AI
      </span>
      {!muted ? (
        <MusicNoteIcon onClick={() => setMuted(true)} />
      ) : (
        <MusicOffIcon onClick={() => setMuted(false)} />
      )}
    </div>
  );
};

export default AppFooter;
