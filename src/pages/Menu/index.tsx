import Title from "../../components/Title";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

import "./style.css";
import { useContext, useState } from "react";
import Timer from "../../components/Timer";
import { GameContext } from "../../context/gameContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import AppFooter from "../../components/AppFooter";

const Menu = () => {
  const navigate = useNavigate();
  const { newGame } = useContext(GameContext);
  const [startGame, setStartGame] = useState(false);
  const [ready, setReady] = useState(false);
  const [username] = useLocalStorage("antbm.username", "user");
  const [rounds, setRounds] = useLocalStorage<number>("antbm.rounds", 10);
  const [roundDuration, setRoundDuration] = useLocalStorage<number>(
    "antbm.roundDuration", 10
  );

  const start = () => {
    if (rounds && roundDuration) {
      setStartGame(true);
      newGame(username || "user", rounds, roundDuration);
    }
  };

  return (
    <main className="menu-container">
      {!startGame ? (
        <>
          <Title />
          <Stack
            spacing={4}
            margin="auto"
            marginTop={10}
            direction="column"
            justifyContent="center"
            alignItems="center"
            maxWidth="400px"
          >
            <TextField
              fullWidth
              select
              label="How many rounds?"
              value={rounds}
              onChange={(e) => setRounds(Number(e.target.value))}
            >
              {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              select
              label="How long are the rounds?"
              value={roundDuration}
              onChange={(e) => setRoundDuration(Number(e.target.value))}
            >
              {[5, 10, 15, 20].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}s
                </MenuItem>
              ))}
            </TextField>
            <Button variant="outlined" onClick={start} size="large">
              Start
            </Button>
          </Stack>
        </>
      ) : !ready ? (
        <>
          <Title />
          <h1 className="ready-h1">Are you ready?</h1>
          <Stack
            spacing={4}
            marginTop={10}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variant="outlined"
              size="large"
              onClick={() => {
                setReady(true);
              }}
            >
              LET'S GO
            </Button>
          </Stack>
        </>
      ) : (
        <div className="menu-timer">
          <Timer initSeconds={3} callBack={() => navigate("/game")} size="lg" />
        </div>
      )}
      <AppFooter />
    </main>
  );
};

export default Menu;
