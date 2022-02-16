import Title from "../../components/Title";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

import "./style.css";
import { GameContext } from "../../context/gameContext";

const Results = () => {
  const navigate = useNavigate();
  const { currentGame } = useContext(GameContext);

  const tryAgain = () => {
    navigate("/menu");
  };

  useEffect(() => {
    if(!currentGame) {
      navigate("/menu")
    }
  }, [])

  return (
    <main className="results-container">
      <Title />
      <h1 className="ready-h1">Player Leaderboard</h1>
      <Box
        sx={{
          width: "100%",
          maxWidth: 360,
          margin: "auto",
        }}
      >
        <List>
          {currentGame?.players
            .sort((a, b) => b.score - a.score)
            .map((player, index) => (
              <ListItem key={player.id}>
                <ListItemText primary={index + 1} />
                <ListItemText
                  primary={
                    player.id === currentGame.currentUserId
                      ? "You"
                      : player.name
                  }
                  style={player.id === "AI" ? { color: "#73BF37" } : {}}
                />
                <ListItemText
                  primary={player.score}
                  style={player.id === "AI" ? { color: "#73BF37" } : {}}
                />
              </ListItem>
            ))}
        </List>
        <div className="try-again-button">
          <Button
            variant="outlined"
            startIcon={<RestartAltIcon />}
            onClick={tryAgain}
          >
            Try again
          </Button>
        </div>
      </Box>
    </main>
  );
};

export default Results;
