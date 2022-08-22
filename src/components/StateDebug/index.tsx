import { useSelector } from "react-redux";
import { State } from "../../state";
import { box, grid, stateCol, actionCol, wrapper } from "./StoreDebugger.css";

export function StoreDebugger() {
  const { actions, ...state } = useSelector<State, State>((state) => state);

  return (
    <div className={wrapper}>
      <div className={grid}>
        <div className={stateCol}>
          <div className={box}>
            <pre>{JSON.stringify(state, null, 2)}</pre>
          </div>
        </div>
        <div className={actionCol}>
          <div className={box}>
            <pre>{JSON.stringify(actions, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
