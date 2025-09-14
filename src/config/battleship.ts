import type { GameConfig } from "../types/battleship";
import { ShipType } from "../types/battleship";

export const BATTLESHIP_CONFIG: GameConfig = {
  shipTypes: {
    [ShipType.CARRIER]: { size: 5, count: 1 },
    [ShipType.BATTLESHIP]: { size: 4, count: 1 },
    [ShipType.CRUISER]: { size: 3, count: 1 },
    [ShipType.SUBMARINE]: { size: 3, count: 1 },
    [ShipType.DESTROYER]: { size: 2, count: 1 },
  },
  layout: [
    {
      ship: ShipType.CARRIER,
      positions: [
        [2, 9],
        [3, 9],
        [4, 9],
        [5, 9],
        [6, 9],
      ],
    },
    {
      ship: ShipType.BATTLESHIP,
      positions: [
        [5, 2],
        [5, 3],
        [5, 4],
        [5, 5],
      ],
    },
    {
      ship: ShipType.CRUISER,
      positions: [
        [8, 1],
        [8, 2],
        [8, 3],
      ],
    },
    {
      ship: ShipType.SUBMARINE,
      positions: [
        [3, 0],
        [3, 1],
        [3, 2],
      ],
    },
    {
      ship: ShipType.DESTROYER,
      positions: [
        [0, 0],
        [1, 0],
      ],
    },
  ],
};
