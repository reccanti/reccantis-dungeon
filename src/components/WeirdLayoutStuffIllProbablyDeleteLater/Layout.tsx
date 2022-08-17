import { assignInlineVars } from "@vanilla-extract/dynamic";
import { ReactNode } from "react";

import {
  layout,
  column,
  columns as columnsVar,
  span as spanVar,
} from "./Layout.css";

interface LayoutProps {
  children: ReactNode;
  columns: number | string;
}

export function Layout({ children, columns }: LayoutProps) {
  const style = assignInlineVars({
    [columnsVar]:
      typeof columns === "number" ? `repeat(${columns}, min-content)` : columns,
  });
  return (
    <div className={layout} style={style}>
      {children}
    </div>
  );
}

interface ColumnProps {
  children: ReactNode;
  span?: number;
}

export function Column({ children, span = 1 }: ColumnProps) {
  const style = assignInlineVars({
    [spanVar]: `span ${span}`,
  });
  return (
    <div className={column} style={style}>
      <div>{children}</div>
    </div>
  );
}
