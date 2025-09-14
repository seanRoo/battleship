import { describe, it, expect, beforeEach } from "vitest";
import {
  useBattleshipStore,
  type BattleshipStore,
} from "../hooks/useBattleshipStore";
import { BATTLESHIP_CONFIG } from "../config/battleship";
import { CellStatus } from "../types/battleship";

const getState = () => useBattleshipStore.getState() as BattleshipStore;

describe("battleship store", () => {
  beforeEach(() => {
    getState().reset();
  });

  it("fires a miss updates lastShot and board", () => {
    const { fire } = getState();
    fire(9, 9);
    const s = getState();
    expect(s.lastShot).toEqual({ x: 9, y: 9, result: CellStatus.MISS });
    expect(s.board[9][9].status).toBe(CellStatus.MISS);
  });

  it("hits a known ship position and can sink it", () => {
    const { fire } = getState();
    const carrier = BATTLESHIP_CONFIG.layout.find(
      (l) => l.ship && l.positions.length === 5
    )!;
    for (const [x, y] of carrier.positions) {
      fire(x, y);
    }
    const s = getState();
    expect(s.lastShot?.result).toBe(CellStatus.SUNK);
    for (const [x, y] of carrier.positions) {
      expect(s.board[y][x].status).toBe(CellStatus.SUNK);
    }
  });
});
