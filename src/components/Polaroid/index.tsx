import "./style.css";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

interface PolaroidProps {
  img: string
  isAI?: boolean;
  showAnswer?: boolean;
}

const Polaroid = ({ img, isAI, showAnswer }: PolaroidProps) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="400px"
        image={img}
        alt="Polaroid"
      />
      <CardContent>
        {showAnswer ? (isAI ? "AI-Genereted Model" : "Human") : null}
      </CardContent>
    </Card>
  );
};

export default Polaroid;
