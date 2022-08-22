import { store } from "..";

// a function that takes the redux store and returns a cleanup function
type Cleanup = () => void;
export type Updater = (s: typeof store) => Cleanup;
