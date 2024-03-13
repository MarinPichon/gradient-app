import "./App.css";
import Buttons from "./components/Buttons/Index";
import Gradient from "./components/Gradient";
import { useAppSelector } from "./store/redux-hooks";

function App() {
  const nbColors = useAppSelector((state) => state.color.nbColors);
  return (
    <div className="app">
      <div className="nbColors">{nbColors} couleurs générées</div>
      <Gradient />
      <Buttons />
    </div>
  );
}

export default App;
