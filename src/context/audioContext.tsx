import { createContext, useState } from "react";
import Track from "../components/Track";

export const AudioContext = createContext<{
  muted: boolean
  setMuted: (muted: boolean) => void;
}>({
  muted: false,
  setMuted: (muted: boolean) => {},
});

export const AudioContextProvider: React.FC = ({ children }) => {
  const [muted, setMuted] = useState(false);
  return (
    <AudioContext.Provider value={{ setMuted, muted }}>
      <Track muted={false} />
      {children}
    </AudioContext.Provider>
  );
};
