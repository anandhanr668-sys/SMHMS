// src/tests/components.test.tsx

import { render, screen } from "@testing-library/react";
import { Button, Card } from "@/shared/components";
import { describe, it, expect } from "vitest";

describe("Shared Components", () => {
  it("renders button text", () => {
    render(<Button>Save</Button>);
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("renders card content", () => {
    render(
      <Card>
        <span>Content</span>
      </Card>
    );

    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});
