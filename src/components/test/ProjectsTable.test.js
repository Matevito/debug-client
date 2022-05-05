import { MemoryRouter } from "react-router-dom";
// testing comps
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'

//tested component;
import { ProjectsTable } from "../ProjectsTable";

describe("ProjectsTable component", () => {
    let projects;
    beforeEach(() => {
        projects = [
            {
                title: "project1",
                teamLeader: "null",
                issues: 15,
                solvedIssues: 12,
                _id :"project1_id"
            },
            {
                title: "project2",
                teamLeader: "null",
                issues: 14,
                solvedIssues: 8,
                _id :"project2_id"
            },
            {
                title: "project3",
                teamLeader: "null",
                issues: 2,
                solvedIssues: 0,
                _id :"project3_id"
            },
        ];
    })
    test("renders a correct table", () => {
        
        const testTitle = "testing title";

        render(<ProjectsTable projects={projects} title={testTitle}/>,  {wrapper: MemoryRouter})
        expect(screen.getByText("testing title")).toBeInTheDocument()
        expect(screen.getByText("project1")).toBeInTheDocument()
        expect(screen.getByText("project2")).toBeInTheDocument()
        expect(screen.getByText("project3")).toBeInTheDocument()

    });
    test("check snapshot", () => {
        const testTitle = "snapshot test!";
        const { container } = render(<ProjectsTable projects={projects} title={testTitle}/>,  {wrapper: MemoryRouter})
        expect(container).toMatchSnapshot();
    })
});