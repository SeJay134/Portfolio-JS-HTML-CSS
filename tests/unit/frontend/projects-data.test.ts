import { describe, expect, it } from "vitest";
import { projects } from "../../../src/data/projects";

describe("reviewed project data", () => {
  it("contains the four reviewed portfolio projects with unique ids", () => {
    expect(projects).toHaveLength(4);
    expect(new Set(projects.map((project) => project.id)).size).toBe(4);
  });

  it("keeps repository and demo URLs on the reviewed public hosts", () => {
    for (const project of projects) {
      expect(project.repository).toMatch(/^https:\/\/github\.com\/SeJay134\//);
      if (project.demo) expect(new URL(project.demo).protocol).toBe("https:");
    }
  });

  it("preserves the expected category split", () => {
    expect(projects.filter((project) => project.category === "AI")).toHaveLength(1);
    expect(projects.filter((project) => project.category === "Web")).toHaveLength(1);
    expect(projects.filter((project) => project.category === "Data")).toHaveLength(2);
  });
});
