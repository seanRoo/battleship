import { ShipType, CellStatus } from "../types/battleship";
export const GAME_CONSTANTS = {
  BOARD_SIZE: 10,
  MAX_SHOTS: 100,
} as const;

export const SHIP_DISPLAY_DATA = [
  {
    name: "Carrier",
    type: ShipType.CARRIER,
    size: 5,
    description: "Aircraft Carrier - 5 cells",
    image: "/src/assets/Carrier Shape.png",
  },
  {
    name: "Battleship",
    type: ShipType.BATTLESHIP,
    size: 4,
    description: "Battleship - 4 cells",
    image: "/src/assets/Battleship Shape.png",
  },
  {
    name: "Cruiser",
    type: ShipType.CRUISER,
    size: 3,
    description: "Cruiser - 3 cells",
    image: "/src/assets/Cruiser Shape.png",
  },
  {
    name: "Submarine",
    type: ShipType.SUBMARINE,
    size: 3,
    description: "Submarine - 3 cells",
    image: "/src/assets/Submarine Shape.png",
  },
  {
    name: "Destroyer",
    type: ShipType.DESTROYER,
    size: 2,
    description: "Destroyer - 2 cells",
    image: "/src/assets/Aircraft Shape.png",
  },
] as const;

export const GAME_MESSAGES = {
  GAME_OVER: "Game Over! All ships sunk.",
  RESTART_PROMPT: "Click restart to play again",
  SHOTS_FIRED: "Shots fired",
  YOUR_FLEET: "Opponent's Fleet",
  SUNK: "SUNK",
} as const;

export const CELL_STATUS_CLASSES = {
  [CellStatus.EMPTY]: "",
  [CellStatus.HIT]: "hit",
  [CellStatus.MISS]: "miss",
  [CellStatus.SUNK]: "sunk",
} as const;

export const ARIA_LABELS = {
  GAME_BOARD: "Battleship game board",
  CELL: (x: number, y: number, status: string) => `Cell ${x},${y} ${status}`,
  RESTART_BUTTON: "Restart game",
  SHIP_STATUS: (name: string, status: string) => `${name} ship - ${status}`,
} as const;
