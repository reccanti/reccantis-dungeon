// utiltiy that lets you add properties to a deeply-nested object. I plan on
// using this to tell when certain objects were last updated

export type Annotate<T, A extends Object> = T extends Record<any, any>
  ? { [key in keyof T]: Annotate<T[key], A> } & A
  : T;
