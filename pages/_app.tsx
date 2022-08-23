import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, ReactNode, useState } from "react";
import { StoreDebugger } from "../src/components/StateDebug";
import {
  GameLogicProvider,
  useGameLogic,
} from "../src/components/GameLogicProvider";

function Layout({ children }: { children: ReactNode }) {
  const logic = useGameLogic();
  const [debug, setDebug] = useState(logic.getState().modes.debug);
  const [state, setState] = useState(logic.getState());

  useEffect(() => {
    const cleanup = logic.addListener((state) => {
      setDebug(state.modes.debug);
      setState(state);
    });
    return () => {
      cleanup();
    };
  }, [logic]);

  return (
    <>
      {debug && <StoreDebugger state={state} />}
      {children}
    </>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GameLogicProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GameLogicProvider>
  );
}

export default MyApp;
