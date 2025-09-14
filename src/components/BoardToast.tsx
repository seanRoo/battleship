import { useEffect, useState } from "react";
import * as Toast from "@radix-ui/react-toast";
import clsx from "clsx";
import { useBattleshipStore } from "../hooks/useBattleshipStore";
import { CellStatus } from "../types/battleship";
import { SHIP_DISPLAY_DATA, GAME_MESSAGES } from "../constants/game";
import { ShipType } from "../types/battleship";

const TOAST_TYPE = {
  HIT: "hit",
  MISS: "miss",
  GAMEOVER: "gameover",
} as const;
type ToastType = (typeof TOAST_TYPE)[keyof typeof TOAST_TYPE];

const TOAST = {
  swipeDirection: "right" as const,
  clearDelay: 50,
  durations: {
    hit: 1000,
    miss: 1000,
    sunk: 1000,
    gameover: 1000,
  },
} as const;

const TOAST_MESSAGES = {
  hit: "Hit!",
  miss: "Miss",
} as const;

const BoardToast = () => {
  const lastShot = useBattleshipStore((s) => s.lastShot);
  const gameOver = useBattleshipStore((s) => s.gameOver);

  const [toast, setToast] = useState<null | {
    message: string;
    type: ToastType;
    duration: number;
  }>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (gameOver) {
      setToast({
        message: GAME_MESSAGES.GAME_OVER,
        type: TOAST_TYPE.GAMEOVER,
        duration: TOAST.durations.gameover,
      });
      setOpen(true);
      return;
    }

    if (!lastShot) return;

    const result = lastShot.result;
    if (result === CellStatus.HIT || result === CellStatus.SUNK) {
      if (result === CellStatus.SUNK && lastShot?.ship) {
        const shipType: ShipType = lastShot.ship as ShipType;
        const def = SHIP_DISPLAY_DATA.find((s) => s.type === shipType);
        const name = def ? def.name : "ship";
        setToast({
          message: `You sunk the ${name}!`,
          type: TOAST_TYPE.HIT,
          duration: TOAST.durations.sunk,
        });
        setOpen(true);
        return;
      }

      setToast({
        message: TOAST_MESSAGES.hit,
        type: TOAST_TYPE.HIT,
        duration: TOAST.durations.hit,
      });
      setOpen(true);
      return;
    }

    if (result === CellStatus.MISS) {
      setToast({
        message: TOAST_MESSAGES.miss,
        type: TOAST_TYPE.MISS,
        duration: TOAST.durations.miss,
      });
      setOpen(true);
      return;
    }
  }, [lastShot, gameOver]);

  // Failsafe: ensure the toast auto-closes after its duration
  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setOpen(false), toast.duration);
    return () => clearTimeout(id);
  }, [toast]);

  return (
    <Toast.Provider swipeDirection={TOAST.swipeDirection} duration={1000}>
      {toast && (
        <Toast.Root
          open={open}
          onOpenChange={(v: boolean) => {
            setOpen(v);
            if (!v) setTimeout(() => setToast(null), TOAST.clearDelay);
          }}
          duration={toast.duration}
          asChild
        >
          <div className="board-toast-inner">{toast.message}</div>
        </Toast.Root>
      )}
      <Toast.Viewport className={clsx("board-toast", toast?.type)} />
    </Toast.Provider>
  );
};

export default BoardToast;
