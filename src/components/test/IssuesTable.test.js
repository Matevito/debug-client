import React from "react";
import { MemoryRouter } from "react-router-dom";

// testing com
import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'

// test component
import { IssuesTable } from "../IssuesTable"


describe("IssuesTable component", () => {
    let noIssues;
    let issuesList
    beforeEach(() => {
        jest.resetAllMocks();

        noIssues = []
        issuesList = [
            {
                _id: "1",
                title: "issue1",
                priority: "low",
                description:" a simple description",
                handlingTeam: [],
                status: "open",
                date: "2022-04-23T22:56:09.627Z",
                screenshots: []
            },
            {
                _id: "2",
                title: "issue2",
                priority: "low",
                description: "a more complicated descirption",
                handlingTeam: [{_id:"two", username:"user2"}],
                status: "in progress",
                date: "2022-04-23T22:56:09.627Z",
                screenshots: []
            }
        ]
    })
    test("handles blank issues array", () => {
        render (<IssuesTable issues={noIssues} />);
        
        const msg = screen.getByText("No issues yet!");
        expect(msg).toBeInTheDocument()
    });
    test("renders issue table", () => {
        render(<IssuesTable issues={issuesList}/>)
        //screen.debug()
        expect(screen.getByText("PROJECT ISSUES")).toBeInTheDocument()
        expect(screen.getByText("TITLE")).toBeInTheDocument()
        expect(screen.getByText("PRIORITY")).toBeInTheDocument()
        expect(screen.getByText("STATUS")).toBeInTheDocument()
        expect(screen.getByText("TYPE")).toBeInTheDocument()

        expect(screen.getByText("issue1")).toBeInTheDocument()
        expect(screen.getByText("issue2")).toBeInTheDocument()

    });
    test("handles colapse info", () => {
        // take only the first issue
        const issue = issuesList[0];
        const issueForTest = [issue]

        render(
            <MemoryRouter >
                <IssuesTable issues={issueForTest}/>
            </MemoryRouter>
        )

        const arrowBtn = screen.getByRole("button")
        fireEvent.click(arrowBtn);
        //render test
        expect(screen.getByText("Date of Creation")).toBeInTheDocument()
        expect(screen.getByText("Handling Team")).toBeInTheDocument()
        expect(screen.getByText("No users assigned")).toBeInTheDocument();
        expect(screen.getByText("Screenshots")).toBeInTheDocument()
        expect(screen.getByText("No")).toBeInTheDocument();

        //btn test
        const editBtn = screen.getByText("edit ticket")
        const deleteBtn = screen.getByText("ticket details")
        expect(editBtn).toBeInTheDocument();
        expect(deleteBtn).toBeInTheDocument();
    });
})