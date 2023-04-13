import View from "./view.js";
import Store from "./store.js";
import { Player } from "./types";

// window.addEventListener("load", App.init);
const players: Player[] = [
  {
    id: 1,
    name: "Player 1",
    iconClass: "fa-x",
    colorClass: "turquoise",
  },
  {
    id: 2,
    name: "Player 2",
    iconClass: "fa-o",
    colorClass: "yellow",
  },
];

function init() {
  const view = new View();
  const store = new Store("live-t3-storage-key", players);

  // Current tab state changes
  store.addEventListener("stateChange", () => {
    view.render(store.game, store.stats);
  });

  // Different tab state changes
  window.addEventListener("storage", () => {
    view.render(store.game, store.stats);
  });

  //first load of document
  view.render(store.game, store.stats);

  view.bindGameResetEvent((event) => {
    store.reset();
  });

  view.bindNewRoundEvent((event) => {
    store.newRound();
  });

  view.bindPlayerMoveEvent((square) => {
    const existingMove = store.game.moves.find(
      (move) => move.squareId === +square.id
    );

    if (existingMove) {
      return;
    }

    // advance to the next state by pushing a move to the moves array
    store.playerMove(+square.id);
  });
}

window.addEventListener("load", init);
