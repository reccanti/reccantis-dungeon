import { ReactNode } from "react";

import { box } from "./Box.css";

export function Box({ children }: { children: ReactNode }) {
  return <div className={box}>{children}</div>;
}
