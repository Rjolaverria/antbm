import Tyrabots from "../Tyrabots";
import "./style.css";
interface PolaroidProps {
  img: string;
  showAnswer?: boolean;
  trueLabel: 1 | 0
  botLabel: 1 | 0
}

const Polaroid = ({ img, showAnswer, trueLabel, botLabel }: PolaroidProps) => (
  <div className="polaroid-container">
    <div className="polaroid">
      <img src={img} alt="Model" />
      <div className="polaroid-bottom">
        {showAnswer ? (trueLabel === 1 ? "AI-Generated Model" : "Human") : null}
      </div>
    </div>
    {showAnswer && trueLabel === botLabel && <Tyrabots />}
  </div>
);

export default Polaroid;
