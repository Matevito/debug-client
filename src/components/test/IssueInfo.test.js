import React from "react";

// testing components
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'

// test comp
import { IssueInfo } from "../IssueInfo";

describe("IssueInfo component", () => {
    let issueInfo; 
    let userId;

    beforeEach(() => {
        // set-up vars
        userId = "testUserId"
        issueInfo = {
            _id: "testIssue",
            title: "testing title",
            description: "a simple description of elevating a div",
            date : "2022-04-23T22:56:09.627Z",
            handlingTeam: [],
            priority: "low",
            project: "testProject",
            screenshots: [],
            status: "aditional info needed",
            type: "bugg-error"
        };
    })
    test("renders issue information", () => {
        render(
            <IssueInfo 
                issue={issueInfo}
                userId={userId}
            />
        )
        expect(screen.getByText("Ticket information")).toBeInTheDocument()
        expect(screen.getByText("testing title")).toBeInTheDocument()
        expect(screen.getByText("a simple description of elevating a div")).toBeInTheDocument()
        expect(screen.getByText("low")).toBeInTheDocument()
        expect(screen.getByText("aditional info needed")).toBeInTheDocument()
        expect(screen.getByText("bugg-error")).toBeInTheDocument()
        expect(screen.getByText("Apr 23, 2022")).toBeInTheDocument()
        expect(screen.getByText("Take ticket!")).toBeInTheDocument()
        expect(screen.getByText("No screenshots")).toBeInTheDocument();
    });
    test("handles screenshots conditional", () => {
        issueInfo.screenshots = ["url1", "url2"]; 
        render(
            <IssueInfo 
                issue={issueInfo}
                userId={userId}
            />
        )
        expect(screen.getByText("Screenshots")).toBeInTheDocument();
        expect(screen.getByText("Screenshot 1")).toBeInTheDocument();
        expect(screen.getByText("Screenshot 2")).toBeInTheDocument();
    });
    test("handles issue without team", () => {
        render(
            <IssueInfo 
                issue={issueInfo}
                userId={userId}
            />
        )
        expect(screen.getByText("No users assigned yet!")).toBeInTheDocument();
    });
    test("handles user that has taken the ticket", () => {
        issueInfo.handlingTeam = [{
            _id: userId, username: "testUser1"
        }];
        render(
            <IssueInfo 
                issue={issueInfo}
                userId={userId}
            />
        )
        expect(screen.getByText("Team")).toBeInTheDocument();
        expect(screen.getByText("testUser1")).toBeInTheDocument();
        expect(screen.getByText("Leave ticket!")).toBeInTheDocument();
    });
    test("check snapshot", () => {
        const { container } = render(<IssueInfo issue={issueInfo} userId={userId}/>)
        expect(container).toMatchSnapshot();
    });
})