import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import realData from "../data/final_data.json";
import { useLocalStorage } from "../hooks/useLocalStorage";

const randomItems = <T,>(array: T[], count: number) => {
  const res:number[] = [];
  if (count > array.length) {
    count = array.length
  }

  while(res.length < count){
      const r = Math.floor(Math.random() * array.length);
      if(res.indexOf(r) === -1) res.push(r);
  }

  return res.map(i => array[i])
}

export interface Player {
  id: string
  name: string
  score: number
  type: "HUMAN" | "AI"
}

export interface Classification {
  id: string
  s3_uri?: string
  true_label: 1 | 0
  bot_label: 1 | 0
}

export interface Game {
  gameId: string
  currentUserId: string
  players: Player[]
  rounds: Classification[]
  roundCount: number
  roundDuration: number
  gameOver: boolean
}

export const GameContext = createContext<{
  currentGame?: Game
  newGame: (name:string, roundCount: number, roundDuration: number) => void
  resetGame: () => void
  setScore: (score: number) => void
  score: number
  totalDataCount: number
}>({
  newGame: () => {},
  resetGame: () => {},
  setScore: () => {},
  score: 0,
  totalDataCount: 20
});

export const GameContextProvider: React.FC = ({ children }) => {
  const [currentGame, setCurrentGame] = useState<Game>();
  const [userId] = useLocalStorage('antbm.userId', uuidv4())


  const newGame = (name: string, roundCount = 10, roundDuration = 5) => {
    const randomClassifications = randomItems(realData as Classification[], roundCount)

    const botScore = randomClassifications.reduce((sum, a) =>  a.bot_label === a.true_label ? sum + 1 : sum, 0);
    setCurrentGame({
      gameId: uuidv4(),
      currentUserId: userId,
      players: [
        {
          id: userId,
          name,
          score: 0,
          type: "HUMAN",
        },
        {
          id: "AI",
          name: "Tyra Bots",
          score: botScore,
          type: "AI",
        },
      ],
      rounds: randomClassifications,
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
      value={{ currentGame, newGame, resetGame, setScore, score, totalDataCount:20 }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
