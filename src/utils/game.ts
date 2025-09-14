import type { BoardCell, ShipState, ShipLayout } from "../types/battleship";
import { CellStatus } from "../types/battleship";
import { GAME_CONSTANTS } from "../constants/game";

/**
 * Creates an empty game board with the specified dimensions
 */
export function createEmptyBoard(
  size = GAME_CONSTANTS.BOARD_SIZE
): BoardCell[][] {
  return Array.from({ length: size }, (_, y) =>
    Array.from({ length: size }, (_, x) => ({
      x,
      y,
      status: CellStatus.EMPTY,
    }))
  );
}

/**
 * Places ships on the board according to the provided layout
 */
export function placeShipsOnBoard(
  board: BoardCell[][],
  shipLayout: ShipLayout[]
): BoardCell[][] {
  const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

  for (const shipConfig of shipLayout) {
    for (const [x, y] of shipConfig.positions) {
      if (newBoard[y] && newBoard[y][x]) {
        newBoard[y][x].ship = shipConfig.ship;
      }
    }
  }

  return newBoard;
}

/**
 * Creates initial ship states from ship layout configuration
 */
export function createInitialShips(shipLayout: ShipLayout[]): ShipState[] {
  return shipLayout.map((shipConfig) => ({
    ship: shipConfig.ship,
    positions: shipConfig.positions,
    hits: 0,
    sunk: false,
  }));
}

/**
 * Checks if a ship is sunk based on hits and positions
 */
export function isShipSunk(ship: ShipState): boolean {
  return ship.hits >= ship.positions.length;
}

/**
 * Updates ship state after a hit
 */
export function updateShipAfterHit(ship: ShipState): ShipState {
  const updatedShip = { ...ship, hits: ship.hits + 1 };
  updatedShip.sunk = isShipSunk(updatedShip);
  return updatedShip;
}

/**
 * Checks if the game is over (all ships sunk)
 */
export function isGameOver(ships: ShipState[]): boolean {
  return ships.every((ship) => ship.sunk);
}

/**
 * Validates if coordinates are within board bounds
 */
export function isValidCoordinate(
  x: number,
  y: number,
  size = GAME_CONSTANTS.BOARD_SIZE
): boolean {
  return x >= 0 && x < size && y >= 0 && y < size;
}

/**
 * Gets all ship positions that should be marked as sunk
 */
export function getSunkPositions(ships: ShipState[]): Array<[number, number]> {
  return ships.filter((ship) => ship.sunk).flatMap((ship) => ship.positions);
}
