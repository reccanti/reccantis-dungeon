import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, ReactNode, useState } from "react";

import { init } from "../src/logic";
import { StoreDebugger } from "../src/components/StateDebug";
import { State } from "../src/logic/GameLogic";

function Layout({ children }: { children: ReactNode }) {
  const [debug, setDebug] = useState<boolean>(false);
  const [state, setState] = useState<State | null>();
  useEffect(() => {
    const { logic, cleanup: cleanupInit } = init();
    setDebug(logic.getState().modes.debug);

    const cleanupDebug = logic.addListener((state) => {
      setDebug(state.modes.debug);
      setState(state);
    });

    return () => {
      cleanupInit();
      cleanupDebug();
    };
  }, []);

  return (
    <>
      {debug && state && <StoreDebugger state={state} />}
      {children}
    </>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
