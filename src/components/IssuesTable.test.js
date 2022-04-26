import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

// testing com
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'

// test component
import { IssuesTable } from "./IssuesTable"

// mock functs
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

describe("IssuesTable component", () => {
    let noIssues;
    let issuesList
    beforeEach(() => {
        jest.resetAllMocks();

        noIssues = []
        issuesList = []
    })
    test("handles blank issues array", () => {
        render (<IssuesTable issues={noIssues} />);
        
        const msg = screen.getByText("No issues yet!");
        expect(msg).toBeInTheDocument()
    });
    test.todo("renders issue table");
    test.todo("handles issues btns");
})