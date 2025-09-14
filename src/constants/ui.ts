export const UI_CONSTANTS = {
  BOARD_CELL_SIZE: "clamp(2rem, 5vw, 3rem)",
  GRID_GAP: "0.25rem",
  BORDER_RADIUS: "0.25rem",
  SHADOW_BLUR: "0.5rem",
};

export const ASSETS = {
  SHIPS: {
    CARRIER: "/src/assets/Carrier Shape.png",
    BATTLESHIP: "/src/assets/Battleship Shape.png",
    CRUISER: "/src/assets/Cruiser Shape.png",
    SUBMARINE: "/src/assets/Submarine Shape.png",
    DESTROYER: "/src/assets/Aircraft Shape.png",
  },
  EFFECTS: {
    HIT: "/src/assets/Hit.png",
    MISS: "/src/assets/Miss.png",
    CROSSHAIR: "/crosshair.svg",
  },
};

export const Z_INDEX = {
  BASE: 1,
  OVERLAY: 10,
  MODAL: 100,
  TOOLTIP: 1000,
};
