import { render, screen } from "@testing-library/react";
import Hero from "@/components/Hero";

// Mock PropertySearchForm
jest.mock("../../components/PropertySearchForm", () => {
  return () => <div data-testid='mocked-property-search-form'></div>;
});

describe("Test Hero Component", () => {
  test("Heading should be in the document", () => {
    render(<Hero />);

    const heading = screen.getByRole("heading", {
      level: 1,
      name: /Find the perfect rental/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
