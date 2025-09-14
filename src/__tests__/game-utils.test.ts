import { describe, it, expect } from "vitest";
import {
  createEmptyBoard,
  placeShipsOnBoard,
  createInitialShips,
  updateShipAfterHit,
  isGameOver,
} from "../utils/game";
import { GAME_CONSTANTS } from "../constants/game";
import { BATTLESHIP_CONFIG } from "../config/battleship";
import { CellStatus, ShipType } from "../types/battleship";

describe("game utils", () => {
  it("creates an empty board", () => {
    const board = createEmptyBoard();
    expect(board).toHaveLength(GAME_CONSTANTS.BOARD_SIZE);
    expect(board[0]).toHaveLength(GAME_CONSTANTS.BOARD_SIZE);
    expect(board[0][0].status).toBe(CellStatus.EMPTY);
  });

  it("places ships deterministically from layout", () => {
    const base = createEmptyBoard(GAME_CONSTANTS.BOARD_SIZE);
    const board = placeShipsOnBoard(base, BATTLESHIP_CONFIG.layout);
    for (const layout of BATTLESHIP_CONFIG.layout) {
      for (const [x, y] of layout.positions) {
        expect(board[y][x].ship).toBe(layout.ship);
      }
    }
  });

  it("updates ship after hit and detects sunk", () => {
    const ships = createInitialShips(BATTLESHIP_CONFIG.layout);
    const carrier = ships.find((s) => s.ship === ShipType.CARRIER)!;
    const after1 = updateShipAfterHit(carrier);
    expect(after1.hits).toBe(1);
    const fullySunk = {
      ...carrier,
      hits: carrier.positions.length,
      sunk: true,
    };
    expect(isGameOver([fullySunk])).toBe(true);
  });
});
