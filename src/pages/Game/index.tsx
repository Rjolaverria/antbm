import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useContext, useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

import Polaroid from "../../components/Polaroid";
import Timer from "../../components/Timer";
import Title from "../../components/Title";

import "./style.css";
import { Classification, GameContext } from "../../context/gameContext";
import Tyrabots from "../../components/Tyrabots";

const Game = () => {
  const navigate = useNavigate();
  const { currentGame, setScore, score } = useContext(GameContext);

  const [models, setModels] = useState<Classification[]>();
  const [round, setRound] = useState(0);
  const [roundOver, setRoundOver] = useState(false);
  const [roundResult, setRoundResult] = useState<"pass" | "fail" | "timeOut">();
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setModels(currentGame?.rounds);
    setRound(0);
    setRoundOver(false);
    setShowAnswer(false);
  }, [currentGame?.rounds, navigate]);

  if (!currentGame) {
    return <Navigate to="/menu" />;
  }
  const finishRound = () => {
    setRoundOver(true);
    setShowAnswer(true);
  };

  const nextRound = () => {
    if (!!models && round < models.length - 1) {
      setRound(round + 1);
      setShowAnswer(false);
      setRoundResult(undefined);
      setRoundOver(false);
    } else {
      navigate("/results");
    }
  };

  const submitAnswer = (answer: 1 | 0) => {
    finishRound();
    if (models && answer === models[round].true_label) {
      setScore(score + 1);
      setRoundResult("pass");
    } else {
      setRoundResult("fail");
    }
  };

  const ranOutOfTime = () => {
    setRoundResult("timeOut");
    finishRound();
  };

  const roundResultsMap = {
    pass: (
      <>
        <Typography variant="h2" align="center">
          SUCCESS!
        </Typography>
        <Typography variant="h3" align="center">
          You correctly identified the AI!
        </Typography>
      </>
    ),
    fail: (
      <>
        <Typography variant="h2" align="center">
          This is a fellow human
        </Typography>
        <Typography variant="h3" align="center">
          Better luck next time...
        </Typography>
      </>
    ),
    timeOut: (
      <>
        <Typography variant="h2" align="center">
          Oops!
        </Typography>
        <Typography variant="h3" align="center">
          You ran out of time.
        </Typography>
      </>
    ),
  };

  if (!models) {
    return null;
  }

  const headerGrid = () => (
    <Grid item container justifyContent="center" xs={12} md={6} direction="row">
      <Grid item lg={8} sm={12}>
        <Title />
      </Grid>
      <Grid item lg={4} sm={12}>
        <div className="game-header-container">
          <Typography variant="h3" align="right">
            Score: {score}
          </Typography>
        </div>
      </Grid>
    </Grid>
  );

  const photoGrid = () => (
    <Grid item xs={12} md={6}>
      <div className="game-photo-container">
        <Polaroid
          showAnswer={showAnswer}
          img={models[round].s3_uri}
          trueLabel={models[round].true_label}
          botLabel={models[round].bot_label}
        />

      </div>
    </Grid>
  );

  const footerGrid = () => (
    <Grid container item xs={12} md={6}>
      <Grid item xs={0} md={1}></Grid>
      <Grid item xs={12} md={10}>
        <Stack
          spacing={4}
          marginTop={5}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {roundOver ? (
            <Stack>{roundResult && roundResultsMap[roundResult]}</Stack>
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
      <Grid item xs={12} md={1}>
        {roundOver ? (
          <div
            style={{ marginTop: 40, display: "flex", justifyContent: "center" }}
          >
            <Button
              variant="contained"
              endIcon={<ArrowForwardIosIcon />}
              onClick={nextRound}
            >
              {round < models?.length - 1 ? "Next" : "Results"}
            </Button>
          </div>
        ) : (
          <Timer
            initSeconds={currentGame.roundDuration}
            callBack={ranOutOfTime}
          />
        )}
      </Grid>
    </Grid>
  );

  return (
    <main className="game-container">
      <Grid container direction="column" justifyContent="center">
        {headerGrid()}
        {photoGrid()}
        {footerGrid()}
      </Grid>
    </main>
  );
};

export default Game;
