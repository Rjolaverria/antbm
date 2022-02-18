import { createContext, useEffect, useMemo, useState } from "react";

import audioFile from "../assets/audio/Daydream.mp3";

export const AudioContext = createContext<{
  muted?: boolean
  setMuted: (muted: boolean) => void;
}>({
  muted: false,
  setMuted: (muted: boolean) => {},
});

export const AudioContextProvider: React.FC = ({ children }) => {
  const [muted, setMuted] = useState(false)
  const audio = useMemo(() => new Audio(audioFile),[])

  useEffect(() => {
    const canPlay = () => {
      audio.play();
    }
    audio.addEventListener("canplaythrough", canPlay);
    return () => audio.removeEventListener("canplaythrough",canPlay)
  },[audio])

  useEffect(() => {
    if(muted) {
      audio.pause()
    } else {
      audio.play()
    }
  }, [audio, muted])

  return (
    <AudioContext.Provider value={{ muted, setMuted }}>
      {children}
    </AudioContext.Provider>
  );
};
