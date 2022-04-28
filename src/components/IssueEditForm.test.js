import React from "react";

// testing utilites
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// test comp
import { IssueEditForm } from "./IssueEditForm";

describe("IssueEditForm component" , () => {
        let issueInfo;
        beforeEach(() => {
            issueInfo={
                issue: {
                    _id:"issueId",
                    title: "test title",
                    description: "a test description",
                    priority: "low",
                    status: "under review",
                    type: "feature req"
                }
            }
        })
    test("renders correct form", () => {
        const { container } = render(
            <IssueEditForm 
                issue={issueInfo}
            />
        )
        expect(container).toMatchSnapshot();
    })
    test("handles submit", () => {
        const mockSubmit = jest.fn();
        render(
            <IssueEditForm 
                issue={issueInfo}
                handleSubmit={mockSubmit}
            />
        );

        const btn = screen.getByText("Edit ticket!");
        fireEvent.click(btn)
        const formRes = mockSubmit.mock.lastCall[0];
        
        expect(formRes.description).toBe("a test description");
        expect(formRes.status).toBe("under review");
        expect(formRes.type).toBe("feature req")
    })
})