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
    test.todo("handles submit")
})