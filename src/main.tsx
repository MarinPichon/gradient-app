// == Imports
import { randomHexColor, generateSpanColor } from "./utils/color";
import store from "./store";

import "./styles/index.scss";
import {
  changeAllColors,
  changeColorFirst,
  changeColorLast,
  changeDirection,
} from "./store/actions/gradient";

//A chaque fois que le state du store est modifié, je relance ces trois fonctions pour rerender
store.subscribe(() => {
  renderNbColors();
  renderGradient();
  renderColors();
});

// == Rendu dans le DOM
function renderNbColors() {
  const { nbColors } = store.getState().color;
  /*
    le `!` indique à TS que l'élément ne sera jamais `null`
    (à utiliser avec précaution)
  */
  document.querySelector(".nbColors")!.innerHTML = `
    ${nbColors} couleur(s) générée(s)
  `;
}
function renderGradient() {
  const { direction, firstColor, lastColor } = store.getState().color;

  /*
    par défaut, `document.querySelector` retourne un type `Element`
    qui n'a pas de propriété `style` ;
    on spécifie qu'il s'agit d'un `HTMLElement` qui l'a.
  */
  document.querySelector<HTMLElement>(".gradient")!.style.background = `
    linear-gradient(${direction},${firstColor},${lastColor})
  `;
}
function renderColors() {
  const { firstColor, lastColor } = store.getState().color;

  const firstSpan = generateSpanColor(firstColor);
  const lastSpan = generateSpanColor(lastColor);

  const result = `${firstSpan} - ${lastSpan}`;

  document.querySelector(".colors")!.innerHTML = result;
}

// == Initialisation
//Premier render
renderNbColors();
renderGradient();
renderColors();

// == Controls
document.getElementById("randAll")!.addEventListener("click", () => {
  // debug
  // data
  const color1 = randomHexColor();
  const color2 = randomHexColor();
  store.dispatch(changeAllColors(color1, color2));
  // ui
});

document.getElementById("randFirst")!.addEventListener("click", () => {
  // data
  store.dispatch(changeColorFirst());
  /* state.nbColors += 1;
  state.firstColor = randomHexColor(); */
  // ui
});

document.getElementById("randLast")!.addEventListener("click", () => {
  //On appele un action creator qui va nous retourner une action {type:"CHANGE_LAST_COLOR",payload:{color:randomHexColor()}}
  store.dispatch(changeColorLast());
  // ui
});

document.getElementById("toLeft")!.addEventListener("click", () => {
  // data
  //state.direction = "270deg";
  store.dispatch(changeDirection("270deg"));
  // ui
});

document.getElementById("toRight")!.addEventListener("click", () => {
  // data
  //state.direction = "90deg";
  store.dispatch(changeDirection("90deg"));
  // ui
});
document.getElementById("to45")!.addEventListener("click", () => {
  // data
  //state.direction = "45deg";
  store.dispatch(changeDirection("45deg"));
  // ui
});
