import { memo } from "react";
import { BoardCellComponent } from "./BoardCell";
import { useBattleshipStore } from "../hooks/useBattleshipStore";
import { GAME_CONSTANTS } from "../constants/game";
import type { BattleshipStore } from "../hooks/useBattleshipStore";
import "./Board.less";

interface BoardProps {
  disabled: boolean;
}

const BoardComponent = ({ disabled }: BoardProps) => {
  const resetId = useBattleshipStore((s: BattleshipStore) => s.resetId || 0);
  const size = GAME_CONSTANTS.BOARD_SIZE;

  return (
    <div className="board-grid" role="grid" aria-label="Battleship game board">
      {Array.from({ length: size }).map((_, y) => (
        <div className="board-row" key={y} role="row">
          {Array.from({ length: size }).map((__, x) => (
            <BoardCellComponent
              key={`${resetId}-${x},${y}`}
              x={x}
              y={y}
              disabled={disabled}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export const Board = memo(BoardComponent);
