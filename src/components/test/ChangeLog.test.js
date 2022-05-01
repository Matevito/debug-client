import React from "react"

// testing comp
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'

// test comp
import { ChangeLog } from "../ChangeLog";

describe("ChangeLog component", () => {
    test("changeLog handles empty log", () => {
        render(<ChangeLog changeLog={[]}/>);
        expect(screen.getByText("TICKET CHANGELOG!")).toBeInTheDocument();
        expect(screen.getByText("No changes been made yet to the ticket!")).toBeInTheDocument();
    });
    test("changeLog handles usual properties", () => {
        const testLog = [
            {
                property: "description",
                user: { username: "testUser1" },
                oldValue: "an old description",
                newValue: "a new description",
                date: "2022-04-30T23:46:10.765Z"
            },
            {
                property: "status",
                user: { username: "adminUser"},
                oldValue: "open",
                newValue: "under review",
                date: "2022-04-30T23:46:10.765Z"
            },
            {
                property: "priority",
                user: { username: "adminUser"},
                oldValue: "Low",
                newValue: "high",
                date: "2022-04-30T23:46:10.765Z"
            },
            {
                property: "type",
                user: { username: "adminUser"},
                oldValue: "bugg-err",
                newValue: "feature req",
                date: "2022-04-30T23:46:10.765Z"
            }
        ];
        const { container } = render(<ChangeLog changeLog={testLog} />);
        expect(container).toMatchSnapshot();
    });
    test("handles changes of team", () => {
        const testLog = [
            {
                property: "handlingTeam",
                user: { username: "testUser1" },
                oldValue: [],
                newValue: ["userId"],
                date: "2022-04-30T23:46:10.765Z"
            },
            {
                property: "handlingTeam",
                user: { username: "testUser2" },
                oldValue: ["userId"],
                newValue: [],
                date: "2022-04-30T23:46:10.765Z"
            },
        ]
        render(<ChangeLog changeLog={testLog} />);
        expect(screen.getByText("testUser1 has joined the team!")).toBeInTheDocument();
        expect(screen.getByText("testUser2 has leaved the team!")).toBeInTheDocument();
    })
})