import Title from "../../components/Title";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useNavigate, Navigate } from "react-router-dom";
import { useContext } from "react";

import "./style.css";
import { GameContext } from "../../context/gameContext";
import Tyrabots from "../../components/Tyrabots";

const Results = () => {
  const navigate = useNavigate();
  const { currentGame } = useContext(GameContext);

  const tryAgain = () => {
    navigate("/menu");
  };

  if (!currentGame) {
    return <Navigate to="/menu" />;
  }

  const rankings = currentGame?.players.sort((a, b) => b.score - a.score);

  return (
    <main className="results-container">
      <Title />
      <Typography variant="h2" align="center" marginTop={10} marginBottom={1}>
        {rankings[0].id === currentGame.currentUserId ? (
          <span>🌟{"You win!!"}🌟</span>
        ) : rankings[0].id === "AI" ? (
          <div className="tyrabots-wins">
            <Tyrabots />
            <div className="bubble speech">
                Better luck next time!
            </div>
          </div>
        ) : (
          "You lose..."
        )}
      </Typography>
      <Divider />
      <Typography variant="h1" className="leaderboard-h1">
        Player Leaderboard
      </Typography>
      <Box
        sx={{
          width: "100%",
          maxWidth: 360,
          margin: "auto",
        }}
      >
        <List>
          {rankings.map((player, index) => (
            <ListItem
              key={player.id}
              secondaryAction={
                <ListItemText
                  primary={player.score}
                  style={player.id === "AI" ? { color: "#73BF37" } : {}}
                />
              }
            >
              <ListItemIcon>
                <ListItemText primary={index + 1} />
              </ListItemIcon>
              <ListItemText
                primary={
                  player.id === currentGame.currentUserId ? "You" : player.name
                }
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
