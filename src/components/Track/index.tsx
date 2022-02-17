import audio from "../../assets/audio/track.mp3";

const Track = ({ muted }: { muted: boolean }) => {

  return muted ? <audio src={audio} autoPlay muted loop/> : <audio src={audio} autoPlay loop/> ;
};

export default Track;
