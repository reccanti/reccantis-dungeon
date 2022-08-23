import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { init } from "../../logic";
import { GameLogic } from "../../logic/GameLogic";

const GameLogicContext = createContext<GameLogic | null>(null);

export function useGameLogic(): GameLogic {
  const logic = useContext(GameLogicContext);
  if (!logic) {
    throw Error("useGameLogic must be used inside a GameLogicProvider!");
  }
  return logic;
}

interface Props {
  children: ReactNode;
}

export function GameLogicProvider({ children }: Props) {
  const [logic, setLogic] = useState<GameLogic>();

  useEffect(() => {
    const { cleanup, logic } = init();
    setLogic(logic);
    return () => cleanup();
  }, []);

  if (!logic) {
    return <></>;
  }

  return (
    <GameLogicContext.Provider value={logic}>
      {children}
    </GameLogicContext.Provider>
  );
}
