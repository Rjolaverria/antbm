import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import dummyData from "../data/dummy_data.json";

export interface Player {
  id: string;
  name: string;
  score: number;
  type: "HUMAN" | "AI";
}

export interface Classification {
  id: string;
  s3_uri: string;
  true_label: 1 | 0;
  bot_label: 1 | 0;
}

export interface Game {
  gameId: string;
  currentUserId: string;
  players: Player[];
  rounds: Classification[];
  roundCount: number;
  roundDuration: number;
  gameOver: boolean;
}

export const GameContext = createContext<{
  currentGame?: Game;
  newGame: (name: string, roundCount: number, roundDuration: number) => void;
  resetGame: () => void;
  setScore: (score: number) => void;
  score: number;
}>({
  newGame: () => {},
  resetGame: () => {},
  setScore: (score: number) => {},
  score: 0,
});

export const GameContextProvider: React.FC = ({ children }) => {
  const [currentGame, setCurrentGame] = useState<Game>();

  // Fisher-Yates
  function shuffle<T>(array: T[]) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  const newGame = (name: string, roundCount = 10, roundDuration = 5) => {
    const currentUserId = uuidv4();
    const shuffledClassifications = shuffle(
      dummyData as Classification[]
    ).slice(0, roundCount);
    const botScore = shuffledClassifications.reduce((sum, a) =>  a.bot_label === a.true_label ? sum + 1 : sum, 0);

    setCurrentGame({
      gameId: uuidv4(),
      currentUserId,
      players: [
        {
          id: currentUserId,
          name,
          score: 0,
          type: "HUMAN",
        },
        {
          id: "AI",
          name: "Tyra Bot",
          score: botScore,
          type: "AI",
        },
      ],
      rounds: shuffledClassifications,
      roundCount,
      roundDuration,
      gameOver: false,
    });
  };

  const setScore = (score: number) => {
    currentGame &&
      setCurrentGame({
        ...currentGame,
        players: currentGame.players.map((player) =>
          player.id === currentGame.currentUserId
            ? { ...player, score }
            : player
        ),
      });
  };

  const resetGame = () => setCurrentGame(undefined);

  const score =
    currentGame?.players.find(
      (player) => player.id === currentGame.currentUserId
    )?.score || 0;

  return (
    <GameContext.Provider
      value={{ currentGame, newGame, resetGame, setScore, score }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
