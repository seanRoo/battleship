import { useBattleshipStore } from "../hooks/useBattleshipStore";
import {
  SHIP_DISPLAY_DATA,
  GAME_MESSAGES,
  ARIA_LABELS,
} from "../constants/game";
import "./ShipLegend.less";

export const ShipLegend = () => {
  const ships = useBattleshipStore((state) => state.ships);

  return (
    <div
      className="ship-legend"
      role="region"
      aria-label={GAME_MESSAGES.YOUR_FLEET}
    >
      <h3>{GAME_MESSAGES.YOUR_FLEET}</h3>
      <div className="ship-legend-list">
        {SHIP_DISPLAY_DATA.map((shipData) => {
          const shipState = ships.find((s) => s.ship === shipData.type);
          const isSunk = shipState?.sunk || false;

          return (
            <div
              key={shipData.type}
              className={`ship-legend-item ${isSunk ? "sunk" : ""}`}
              role="listitem"
              aria-label={ARIA_LABELS.SHIP_STATUS(
                shipData.name,
                isSunk ? "sunk" : "active"
              )}
            >
              <img
                src={shipData.image}
                alt={shipData.name}
                className="ship-image"
              />
              <div className="ship-details">
                <span className="ship-name">{shipData.name}</span>
                <span className="ship-size">({shipData.size} cells)</span>
              </div>
              {isSunk && (
                <span className="sunk-badge">{GAME_MESSAGES.SUNK}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
