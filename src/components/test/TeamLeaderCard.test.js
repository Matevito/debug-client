import { MemoryRouter } from "react-router-dom";
// testing comps
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'

// tested component
import { TeamLeaderCard } from "../TeamLeaderCard";

describe("TeamLeaderCard component", () => {
    test("comp deals with blank array", () => {
        render(<TeamLeaderCard projects={[]}/>, {wrapper: MemoryRouter})
        expect(screen.getByText("Projects you are leading: 0")).toBeInTheDocument()
        const noProjectsMsg = "You're not leading currently any proyects. Communicate with an admin to take the lead of a project.";
        expect(screen.getByText(noProjectsMsg)).toBeInTheDocument();
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
        ];
        render(<TeamLeaderCard projects={projectList}/>, {wrapper: MemoryRouter})
        expect(screen.getByText("PROJECTS YOU'RE LEADING!")).toBeInTheDocument();
        expect(screen.getByText("Projects you are leading: 1")).toBeInTheDocument();
    })
})