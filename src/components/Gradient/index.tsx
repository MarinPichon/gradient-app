import {
  changeAllColors,
  changeColorFirst,
  changeColorLast,
} from "../../store/actions/gradient";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";

const Gradient = () => {
  const dispatch = useAppDispatch();

  //On récupère les données du state (store) une à une pour éviter de rerender si juste une partie du state est modifiée
  //Si j'importe tout le state d'un coup, un rerender sera déclenché peu importe si j'utilise ou pas la partie modifiée.
  const firstColor = useAppSelector((state) => state.color.firstColor);
  const lastColor = useAppSelector((state) => state.color.lastColor);
  const direction = useAppSelector((state) => state.color.direction);

  return (
    <>
      <div className="buttons group">
        {/* On appel dans le dispatch notre action creator */}
        <button
          className="button"
          id="randFirst"
          onClick={() => dispatch(changeColorFirst())}
        >
          Random First
        </button>
        <button
          className="button"
          id="randAll"
          onClick={() => dispatch(changeAllColors())}
        >
          Random All
        </button>
        <button
          className="button"
          id="randLast"
          onClick={() => dispatch(changeColorLast())}
        >
          Random Last
        </button>
      </div>

      <div className="colors">
        <span style={{ color: firstColor }}>{firstColor}</span>
        <span style={{ color: lastColor }}>{lastColor}</span>
      </div>

      <div
        className="gradient"
        style={{
          background: `linear-gradient(${direction},${firstColor},${lastColor})`,
        }}
      ></div>
    </>
  );
};
export default Gradient;
