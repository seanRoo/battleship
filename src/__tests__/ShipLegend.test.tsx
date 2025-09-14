import { render, screen } from "@testing-library/react";
import { ShipLegend } from "../components/ShipLegend";
import { useBattleshipStore } from "../hooks/useBattleshipStore";
import { describe, it, expect, beforeEach } from "vitest";

beforeEach(() => {
  useBattleshipStore.getState().reset();
});

describe("ShipLegend", () => {
  it("renders all ships with correct names", () => {
    render(<ShipLegend />);
    expect(screen.getByRole("region", { name: /fleet/i })).toBeInTheDocument();
    expect(screen.getByText(/Carrier/i)).toBeInTheDocument();
    expect(screen.getByText(/Battleship/i)).toBeInTheDocument();
    expect(screen.getByText(/Cruiser/i)).toBeInTheDocument();
    expect(screen.getByText(/Submarine/i)).toBeInTheDocument();
    expect(screen.getByText(/Destroyer/i)).toBeInTheDocument();
  });

  it("shows sunk class when a ship is sunk", () => {
    const store = useBattleshipStore.getState();
    const updatedShips = store.ships.map((s) =>
      s.ship === "carrier" ? { ...s, sunk: true } : s
    );
    useBattleshipStore.setState({ ships: updatedShips });

    render(<ShipLegend />);
    const sunkEls = screen
      .getAllByText(/Carrier/i)
      .filter((el) => el.closest(".sunk"));
    expect(sunkEls.length).toBeGreaterThan(0);
  });
});
