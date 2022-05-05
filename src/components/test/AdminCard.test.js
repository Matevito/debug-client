import { MemoryRouter } from "react-router-dom";
// testing comps
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'

// tested component
import { AdminCard } from "../AdminCard";

describe("AdminCard component", () => {
    test("comp deals with blank array", () => {
        render(<AdminCard projects={[]}/>, {wrapper: MemoryRouter})
        expect(screen.getByText("There are currently 0 projects on db.")).toBeInTheDocument()
        expect(screen.getByText("There are no projects currently on db. Why not create one?")).toBeInTheDocument()
        expect(screen.getByText("create a project")).toBeInTheDocument()
    });
    test("comp renders correct card", () => {
        const projectList = [
            {
                _id: "1",
                title: "proj1",
                team: [],
                teamLeader: "adminUser",
                issues: 0,
                solvedIssues: 0
            }
        ]
        render(<AdminCard projects={projectList}/>, {wrapper: MemoryRouter})
        expect(screen.getByText("There are currently 1 projects on db.")).toBeInTheDocument()
        expect(screen.getByText("PROJECTS ON APP")).toBeInTheDocument()
        expect(screen.getByText("create a project")).toBeInTheDocument()
    })
})