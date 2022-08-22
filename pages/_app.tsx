import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, ReactNode } from "react";
import { Provider, useSelector, useStore } from "react-redux";

import { store, State, Store } from "../src/state";
import { init } from "../src/init";
import { EnhancedStore } from "@reduxjs/toolkit";
import { StoreDebugger } from "../src/components/StateDebug";

function Layout({ children }: { children: ReactNode }) {
  const debug = useSelector<State>((state) => state.modes.debug);
  const store = useStore<Store>();

  useEffect(() => {
    const cleanup = init(store as EnhancedStore);
    return () => cleanup();
  }, [store]);

  return (
    <>
      {debug && <StoreDebugger />}
      {children}
    </>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
