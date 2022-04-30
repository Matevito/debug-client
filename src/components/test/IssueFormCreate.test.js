import React from "react";

// testing utilities
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// test component
import { IssueFormCreate } from "../IssueFormCreate";

describe("IssueFormCreate component", () => {
    test("renders default form", () => {
        render(<IssueFormCreate />)
        //screen.debug()
        expect(screen.getByLabelText("Title")).toBeInTheDocument();
        expect(screen.getByLabelText("Description")).toBeInTheDocument();
        expect(screen.getByText("Priority")).toBeInTheDocument();
        expect(screen.getByText("Type")).toBeInTheDocument();
        expect(screen.getByText("Screenshots")).toBeInTheDocument();
        expect(screen.getByText("Upload")).toBeInTheDocument();
        expect(screen.getByText("Submit")).toBeInTheDocument();

        // todo: test priority and type selectors
    });
    test("component handles submit", () => {
        const mockSubmit = jest.fn();
        render(
            <IssueFormCreate
                projectId={"projectID"}
                handleSubmit={mockSubmit}
            />
        );

        const btn = screen.getByText("Submit");
        fireEvent.click(btn);
        const formRes = mockSubmit.mock.lastCall[0];
        
        expect(formRes.get("title")).toEqual("");
        expect(formRes.get("description")).toEqual("");
        expect(formRes.get("priority")).toEqual("");
        expect(formRes.get("type")).toEqual("");
        expect(formRes.get("project")).toEqual("projectID");
        expect(formRes.getAll("screenshots")).toEqual([])
    });

})