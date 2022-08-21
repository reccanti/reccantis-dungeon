import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { init } from "../src/managers/init";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const cleanup = init();
    return () => cleanup();
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
