import React from "react";

// testing utilites
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// test comp
import { ProjectEditForm } from "./ProjectEditForm";

describe("ProjectEditForm component", () => {
    let projectData;
    let usersList;
    beforeEach(() => {
        projectData = {
            data:{
                _id: "projectID",
                title: "test title",
                description: "a description",
                team: [
                    {_id: "one", username:"user1"},
                    {_id:"two", username:"user2"}
                ],
                teamLeader: {
                    _id: "one", username:"user1"
                }
            },
            issues: []
        };
        usersList = [
            {id: "one", username:"user1"},
            {id:"two", username:"user2"},
            {id:"tres", username: "user3"}
        ];

    })
    test("renders correct form", () => {
        const { container } = render(<ProjectEditForm usersList={usersList} project={projectData}/>)
        expect(container).toMatchSnapshot();
    });
    test("handles submit", () => {
        const mockSubmit = jest.fn();
        render(
            <ProjectEditForm 
                usersList={usersList}
                project={projectData}
                handleSubmit={mockSubmit}
            />
        )

        const btn = screen.getByText("Edit project!");
        fireEvent.click(btn);
        const formRes = mockSubmit.mock.lastCall[0];

        expect(formRes.title).toBe(projectData.data.title);
        expect(formRes.description).toBe(projectData.data.description);
        expect(formRes.team).toEqual(["one", "two"]);
        expect(formRes.teamLeader).toBe(projectData.data.teamLeader._id);
    });
})