import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { BATTLESHIP_CONFIG } from "../config/battleship";
import type { GameState } from "../types/battleship";
import { CellStatus } from "../types/battleship";
import {
  createEmptyBoard,
  placeShipsOnBoard,
  createInitialShips,
  updateShipAfterHit,
  isGameOver,
} from "../utils/game";

export interface BattleshipStore extends GameState {
  fire: (x: number, y: number) => void;
  reset: () => void;
  resetId: number;
}

export const useBattleshipStore = create(
  immer<BattleshipStore>((set) => {
    type InitialState = Omit<BattleshipStore, "fire" | "reset" | "resetId">;

    const createInitialState = (): InitialState => {
      const ships = createInitialShips(BATTLESHIP_CONFIG.layout);
      const board = placeShipsOnBoard(
        createEmptyBoard(),
        BATTLESHIP_CONFIG.layout
      );
      return {
        board,
        ships,
        shotsFired: 0,
        gameOver: false,
        lastShot: undefined,
        sunkShips: [],
      };
    };

    const initial = createInitialState();

    return {
      ...initial,
      resetId: 0,
      fire: (x: number, y) => {
        set((state) => {
          if (state.gameOver) return;

          const cell = state.board[y][x];
          if (cell.status !== CellStatus.EMPTY) return;

          state.shotsFired++;

          if (cell.ship) {
            cell.status = CellStatus.HIT;
            const shipIndex = state.ships.findIndex(
              (s) => s.ship === cell.ship
            )!;
            state.ships[shipIndex] = updateShipAfterHit(state.ships[shipIndex]);
            const ship = state.ships[shipIndex];

            if (ship.sunk) {
              state.sunkShips.push(ship.ship);

              for (const [sx, sy] of ship.positions) {
                state.board[sy][sx].status = CellStatus.SUNK;
              }
            }

            state.lastShot = {
              x,
              y,
              result: ship.sunk ? CellStatus.SUNK : CellStatus.HIT,
              ship: cell.ship,
            };
          } else {
            cell.status = CellStatus.MISS;
            state.lastShot = { x, y, result: CellStatus.MISS };
          }

          state.gameOver = isGameOver(state.ships);
        });
      },
      reset: () => {
        set((state) => {
          const fresh = createInitialState();
          Object.assign(state, fresh);
          state.resetId = (state.resetId || 0) + 1;
        });
      },
    };
  })
);
