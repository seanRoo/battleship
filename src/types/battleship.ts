export enum ShipType {
  CARRIER = "carrier",
  BATTLESHIP = "battleship",
  CRUISER = "cruiser",
  SUBMARINE = "submarine",
  DESTROYER = "destroyer",
}

export interface ShipDefinition {
  size: number;
  count: number;
}

export interface ShipLayout {
  ship: ShipType;
  positions: [number, number][];
}

export interface GameConfig {
  shipTypes: Record<ShipType, ShipDefinition>;
  layout: ShipLayout[];
}

export enum CellStatus {
  EMPTY = "empty",
  MISS = "miss",
  HIT = "hit",
  SUNK = "sunk",
}

export interface BoardCell {
  x: number;
  y: number;
  status: CellStatus;
  ship?: ShipType;
}

export interface ShipState {
  ship: ShipType;
  positions: [number, number][];
  hits: number;
  sunk: boolean;
}

export interface GameState {
  board: BoardCell[][];
  ships: ShipState[];
  shotsFired: number;
  gameOver: boolean;
  lastShot?: { x: number; y: number; result: CellStatus; ship?: ShipType };
  sunkShips: ShipType[];
}
