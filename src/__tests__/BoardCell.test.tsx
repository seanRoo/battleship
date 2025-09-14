import { render, screen, fireEvent } from "@testing-library/react";
import { BoardCellComponent } from "../components/BoardCell";
import { useBattleshipStore } from "../hooks/useBattleshipStore";
import { describe, it, expect, beforeEach } from "vitest";

beforeEach(() => {
  useBattleshipStore.getState().reset();
});

describe("BoardCellComponent", () => {
  it("renders as a button and fires on click", () => {
    render(<BoardCellComponent x={0} y={0} disabled={false} />);
    const btn = screen.getByRole("gridcell");
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    const state = useBattleshipStore.getState();
    expect(state.board[0][0].status).not.toBe("");
  });

  it("is disabled when prop is set", () => {
    render(<BoardCellComponent x={0} y={0} disabled={true} />);
    const btn = screen.getByRole("gridcell");
    expect(btn).toBeDisabled();
  });
});
