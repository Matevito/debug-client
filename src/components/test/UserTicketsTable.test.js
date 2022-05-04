import { MemoryRouter } from "react-router-dom";
// testing comps
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'

// tested component
import { UserTicketsTable } from "../UserTicketsTable";

describe("UserTicketsTable component", () => {
    
    test("renders a correct table", () => {
        const testIssues = [
            {
                project: "project1",
                title: "issue 1",
                priority: "low",
                type: "feature req",
                _id: "1"
            },
            {
                project: "project1",
                title: "issue 2",
                priority: "high",
                type: "feature req",
                _id: "2"
            }, 
            {
                project: "project2",
                title: "issue 3",
                priority: "mid",
                type: "documentation req",
                _id: "3"
            },
            {
                project: "project1",
                title: "issue 4",
                priority: "mid",
                type: "feature req",
                _id: "4"
            }
        ];
        const TestProjects = [
            {
                _id: "project1",
                title: "project 1"
            },
            {
                _id: "project2",
                title: "project 2"
            }
        ];
        const {container } = render(<UserTicketsTable issues={testIssues} projects={TestProjects} />, {wrapper: MemoryRouter})
        expect(container).toMatchSnapshot()
    })
})