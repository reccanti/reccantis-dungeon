import { useSelector } from "react-redux";
import { State } from "../../logic/GameLogic";
import { grid, stateCol, actionCol, wrapper } from "./StoreDebugger.css";

export function StoreDebugger({ state }: { state: State }) {
  // const { actions, ...state } = useSelector<State, State>((state) => state);

  return (
    <div className={wrapper}>
      <div className={grid}>
        <div className={stateCol}>
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
