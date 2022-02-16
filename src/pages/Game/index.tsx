import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useContext, useEffect, useState } from "react";
import { useNavigate, Navigate} from "react-router-dom";

import Polaroid from "../../components/Polaroid";
import Timer from "../../components/Timer";
import Title from "../../components/Title";

import "./style.css";
import { Classification, GameContext } from "../../context/gameContext";

const Game = () => {
  const navigate = useNavigate();
  const { currentGame, setScore, score } = useContext(GameContext);

  const [models, setModels] = useState<Classification[]>();
  const [round, setRound] = useState(0);
  const [roundOver, setRoundOver] = useState(false);
  const [roundResult, setRoundResult] = useState<string>("");
  const [showAnswer, setShowAnswer] = useState(false);


  useEffect(() => {
    setModels(currentGame?.rounds);
    setRound(0);
    setRoundOver(false);
    setShowAnswer(false);
  }, [currentGame?.rounds, navigate]);

  if(!currentGame) {
    return <Navigate to="/menu" />
  }
  const finishRound = () => {
    setRoundOver(true);
    setShowAnswer(true);
  };

  const nextRound = () => {
    if (!!models && round < models.length - 1) {
      setRound(round + 1);
      setShowAnswer(false);
      setRoundResult("");
      setTimeout(() => setRoundOver(false), 500);
    } else {
      navigate("/results");
    }
  };

  const submitAnswer = (answer: 1 | 0) => {
    finishRound();
    if (models && answer === models[round].true_label) {
      setScore(score + 1);
      setRoundResult("Nice!");
    } else {
      setRoundResult("WRONG");
    }
  };

  const ranOutOfTime = () => {
    setRoundResult("Speed up bud");
    finishRound();
  };

  return (
    <main className="game-container">
      {!!models && <Grid container direction="column" justifyContent="center">
        <Grid item container justifyContent="center" xs={6} direction="row">
          <Grid item xs={10}>
            <Title />
          </Grid>
          <Grid item xs={2} alignItems="end">
            <h1 className="game-score">Score: {score}</h1>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <div className="game-photo-container">
            <Polaroid
              showAnswer={showAnswer}
              img={models[round].s3_uri}
              isAI={models[round].true_label === 1}
            />
          </div>
        </Grid>
        <Grid container item xs={6} direction="row">
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <Stack
              spacing={4}
              marginTop={5}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              {roundOver ? (
                roundResult
              ) : (
                <>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => submitAnswer(0)}
                  >
                    Human
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => submitAnswer(1)}
                  >
                    AI
                  </Button>
                </>
              )}
            </Stack>
          </Grid>
          <Grid item xs={1}>
            {roundOver ? (
              <div style={{ marginTop: 40 }}>
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIosIcon />}
                  onClick={nextRound}
                >
                  {round < models?.length - 1 ? "Next" : "Results"}
                </Button>
              </div>
            ) : (
              <Timer initSeconds={10} callBack={ranOutOfTime} />
            )}
          </Grid>
        </Grid>
      </Grid>}
    </main>
  );
};

export default Game;
