import Title from "../../components/Title";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

import "./style.css";
import { useContext, useState } from "react";
import Timer from "../../components/Timer";
import { GameContext } from "../../context/gameContext";

const Menu = () => {
  const navigate = useNavigate();
  const { newGame } = useContext(GameContext);
  const [startGame, setStartGame] = useState(false);
  return (
    <main className="menu-container">
      {!startGame ? (
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
                setStartGame(true);
                newGame("Rafi", 10, 5);
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
    </main>
  );
};

export default Menu;
