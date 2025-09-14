import { render, screen } from "@testing-library/react";
import { Board } from "../components/Board";
import { useBattleshipStore } from "../hooks/useBattleshipStore";
import { describe, it, expect, beforeEach } from "vitest";

beforeEach(() => {
  useBattleshipStore.getState().reset();
});

describe("Board", () => {
  it("renders a 10x10 grid of cells", () => {
    render(<Board disabled={false} />);
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(10);
    const cells = screen.getAllByRole("gridcell");
    expect(cells.length).toBe(100);
  });

  it("disables all cells when disabled", () => {
    render(<Board disabled={true} />);
    const cells = screen.getAllByRole("gridcell");
    for (const cell of cells) {
      expect(cell).toBeDisabled();
    }
  });
});
