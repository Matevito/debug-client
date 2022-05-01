import React from "react"
import { MemoryRouter } from "react-router-dom"

// testing com
import { render} from "@testing-library/react";
import '@testing-library/jest-dom'

// test comp
import { ProjectInfo } from "../ProjectInfo"

describe("ProjectInfo component", () => {
    test("handles no props", () => {
        const { container } = render(<ProjectInfo projectData={null}/>)
        expect(container).toMatchSnapshot();
    });
    test("renders basic proj components", () => {
        const projData = {
            data:{
                _id: "testProject1",
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
            issues: [
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
        }
        const { container } = render(<ProjectInfo projectData={projData} />, {wrapper: MemoryRouter})
        expect(container).toMatchSnapshot();
    });
})