import React, { memo } from "react";
import { useBattleshipStore } from "../hooks/useBattleshipStore";
import { motion } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";
import { CellStatus } from "../types/battleship";
import clsx from "clsx";
import {
  scaleIn,
  sunkExplosion,
  interactive,
  DELAY,
} from "../config/animations";
import { CELL_STATUS_CLASSES, ARIA_LABELS } from "../constants/game";
import "./BoardCell.less";
import hitImg from "../assets/Hit.png";
import missImg from "../assets/Miss.png";

interface BoardCellProps {
  x: number;
  y: number;
  disabled: boolean;
}

const BoardCellComponentInner = ({ x, y, disabled }: BoardCellProps) => {
  const status = useBattleshipStore((s) => s.board[y][x].status);

  const fire = useBattleshipStore((s) => s.fire);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    if (!disabled && status === CellStatus.EMPTY) {
      fire(x, y);
    }
    target?.blur();
  };

  const className = clsx(
    "board-cell",
    status !== CellStatus.EMPTY && CELL_STATUS_CLASSES[status]
  );

  const isInteractive = !disabled && status === CellStatus.EMPTY;

  return (
    <Slot>
      <motion.button
        className={className}
        onClick={handleClick}
        disabled={!isInteractive}
        aria-label={ARIA_LABELS.CELL(x, y, status)}
        role="gridcell"
        {...(isInteractive && interactive)}
        {...(status === CellStatus.SUNK && sunkExplosion)}
      >
        {status === CellStatus.HIT && (
          <motion.span className="hit-anim" {...scaleIn}>
            <img src={hitImg} alt="Hit" className="feedback-icon" />
          </motion.span>
        )}
        {status === CellStatus.MISS && (
          <motion.span className="splash-anim" {...scaleIn}>
            <motion.img
              src={missImg}
              alt="Miss"
              className="feedback-icon"
              {...scaleIn}
              transition={{ ...scaleIn.transition, delay: DELAY.quick }}
            />
          </motion.span>
        )}
        {status === CellStatus.SUNK && (
          <motion.span className="hit-anim" {...scaleIn}>
            <img src={hitImg} alt="Sunk" className="feedback-icon" />
          </motion.span>
        )}
      </motion.button>
    </Slot>
  );
};
function boardCellPropsEqual(
  prev: Readonly<BoardCellProps>,
  next: Readonly<BoardCellProps>
) {
  return (
    prev.x === next.x && prev.y === next.y && prev.disabled === next.disabled
  );
}

export const BoardCellComponent = memo(
  BoardCellComponentInner,
  boardCellPropsEqual
);
