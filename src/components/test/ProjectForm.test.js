import React from "react";

// testing utilities
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// test component
import { ProjectForm } from "../ProjectForm";


describe("ProjectForm component", () => {
    let project;
    let usersList;
    let errors;
    beforeEach(() => {
        usersList = [
            {
                username:"admin",
                id: "1"
            },
            {
                username: "developer1",
                id:"2"
            },
            {
                username: "developer2",
                id: "3"
            }
        ];
        project = {
            team: ["1","2"],
            teamLeader: ["2"],
            title: "test_project",
            description: "project description"
        };
        // todo: errors
    })
    test("renders default form", () => {
        render(<ProjectForm usersList={usersList}/>);

        //screen.debug()
        expect(screen.getByLabelText("Title")).toBeInTheDocument();
        expect(screen.getByLabelText("Description")).toBeInTheDocument();
        expect(screen.getByText("Team members")).toBeInTheDocument();
        expect(screen.getByText("admin")).toBeInTheDocument();
        expect(screen.getByText("developer1")).toBeInTheDocument();
        expect(screen.getByText("developer2")).toBeInTheDocument();
        expect(screen.getByText("Submit")).toBeInTheDocument();
        expect(screen.getByText("Team Leader")).toBeInTheDocument();
    });
    
    test("component handles submit", () => {
        const mockSubmit = jest.fn();
        render(
            <ProjectForm
                usersList={usersList}
                handleSubmit={mockSubmit}
            />
        ); 

        // 1. test
        const btn = screen.getByText("Submit");
        fireEvent.click(btn);
        const formRes = mockSubmit.mock.lastCall[0];
        expect(formRes.title).toBe("");
        expect(formRes.description).toBe("");
        expect(formRes.team).toEqual([]);
        expect(formRes.teamLeader).toBe("")

        // 2. test
        // todo: handles some input
    });
})