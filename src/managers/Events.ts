interface BaseEvent<T extends string> {
  type: T;
}

export type InputUp = BaseEvent<"InputUp">;
export type InputDown = BaseEvent<"InputDown">;
export type InputLeft = BaseEvent<"InputLeft">;
export type InputRight = BaseEvent<"InputRight">;

export type Events = InputUp | InputDown | InputLeft | InputRight;
