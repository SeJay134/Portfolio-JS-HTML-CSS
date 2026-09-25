import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Projects } from "../../../src/components/Projects";
import { it, expect } from "vitest";
it("filters local project content without requiring a network request", async () => {
  const user = userEvent.setup();
  render(<Projects />);
  expect(screen.getAllByRole("article")).toHaveLength(4);
  await user.click(screen.getByRole("button", { name: /^AI/ }));
  expect(screen.getAllByRole("article")).toHaveLength(1);
  expect(
    screen.getByRole("heading", { name: "Portfolio & AI assistant" }),
  ).toBeVisible();
  expect(location.search).toContain("category=AI");
  await user.click(screen.getByRole("button", { name: /^All/ }));
  expect(screen.getAllByRole("article")).toHaveLength(4);
});
