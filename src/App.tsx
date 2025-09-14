import { motion } from "framer-motion";

import { Board } from "./components/Board";
import {
  useBattleshipStore,
  type BattleshipStore,
} from "./hooks/useBattleshipStore";
import { useShallow } from "zustand/react/shallow";
import { ShipLegend } from "./components/ShipLegend";
import BoardToast from "./components/BoardToast";
import {
  fadeInUp,
  fadeInScale,
  interactive,
  containerVariants,
  TRANSITIONS,
} from "./config/animations";

import { FaUndo, FaBomb } from "react-icons/fa";

const App = () => {
  const { reset, gameOver, shotsFired } = useBattleshipStore(
    useShallow((s: BattleshipStore) => ({
      reset: s.reset,
      gameOver: s.gameOver,
      shotsFired: s.shotsFired,
    }))
  );

  return (
    <motion.main
      className="battleship-app-main"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="battleship-header-row">
        <motion.h1 variants={fadeInScale}>Battleship</motion.h1>

        <motion.div
          className="battleship-info"
          variants={fadeInUp}
          transition={TRANSITIONS.panel}
        >
          <strong>
            <FaBomb />
          </strong>{" "}
          {shotsFired}
        </motion.div>

        <motion.button
          className="battleship-restart-icon"
          onClick={reset}
          variants={fadeInUp}
          {...interactive}
          aria-label="Restart Game"
        >
          <FaUndo />
        </motion.button>
      </div>

      <motion.div
        className="battleship-board-area"
        variants={fadeInScale}
        transition={TRANSITIONS.panel}
      >
        <div className="battleship-board-wrapper">
          <Board disabled={gameOver} />
          <BoardToast />
        </div>
        <ShipLegend />
      </motion.div>

      <motion.button
        className="battleship-restart"
        onClick={reset}
        variants={fadeInUp}
        {...interactive}
      >
        Restart Game
      </motion.button>
    </motion.main>
  );
};

export default App;
