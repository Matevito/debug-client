import React from "react";

// testing comp
import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'

// test comp
import { IssueComments } from "../IssueComments";

describe("IssueComments component", () => {
    const noComments = []
    let comments;
    beforeEach(() => {
        jest.resetAllMocks();
        comments = [
            {
                _id: "uno",
                message: "the first message",
                screenshots: [],
                user: { _id: "1", username: "testUser1"},
                date: "2022-05-02T19:37:35.307Z",
            },
            {
                _id: "does",
                message: "second one",
                screenshots: [],
                user: { _id: "2", username: "adminUser"},
                date: "2022-05-02T19:37:35.307Z",
            },
            {
                _id: "tres",
                message: "you get it...",
                screenshots: [],
                user: { _id: "1", username: "testUser1"},
                date: "2022-05-02T19:37:35.307Z",
            }
        ]
    })
    test("comp handles blank comments array", () => {
        const { container } = render(<IssueComments comments={[]} />)
        expect(container).toMatchSnapshot();
    });
    test("comp renders basic comments", () => {
        render(<IssueComments comments={comments} />)

        // renders header
        expect(screen.getByText("Issue Comments")).toBeInTheDocument()
        expect(screen.getByText("User")).toBeInTheDocument()
        expect(screen.getByText("Comment")).toBeInTheDocument()
        expect(screen.getByText("Images")).toBeInTheDocument()
        expect(screen.getByText("Created")).toBeInTheDocument()

        // renders body
        expect(screen.getByText("adminUser")).toBeInTheDocument()
        expect(screen.getByText("you get it...")).toBeInTheDocument()
        expect(screen.getByText("second one")).toBeInTheDocument()
        expect(screen.getAllByText("None").length).toBe(3)
        expect(screen.getAllByText("testUser1").length).toBe(2)
        expect(screen.getAllByText("May 2, 2022, 2:37:35 PM GMT-5").length).toBe(3)
    });
    test("comp handles comments with screenshots", () => {
        comments[0].screenshots = ["testUrl1", "testUrl2"];
        render(<IssueComments comments={comments} />)

        expect(screen.getByText("1")).toBeInTheDocument()
        expect(screen.getByText("2")).toBeInTheDocument()
    });
    test.todo("renders correct form");
});