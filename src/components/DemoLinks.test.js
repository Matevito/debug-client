import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

//testing comp
import '@testing-library/jest-dom'

//tested comp
import { DemoLinks } from "./DemoLinks";

describe("DemoLinks componen", () => {
    test("It renders 3 btns", () => {
        render(<DemoLinks />)
        expect(screen.getAllByRole("button").length).toBe(3)
        expect(screen.getByText("Demo preview")).toBeInTheDocument();
        expect(screen.getByText("Developer demo")).toBeInTheDocument();
        expect(screen.getByText("Team Leader demo")).toBeInTheDocument();
        expect(screen.getByText("Admin Demo")).toBeInTheDocument();
    });

    test("handles 'handleDemo' with all the buttons", () => {
        const mockFunction = jest.fn();
        render(<DemoLinks handleDemo={mockFunction} />);

        //admin btn
        const adminBtn = screen.getByTestId("admin_demo")
        fireEvent.click(adminBtn);
        expect(mockFunction).toHaveBeenCalledTimes(1)
        expect(mockFunction.mock.lastCall[0]).toBe("/demo/admin");

        //team leader btn
        const teamBtn = screen.getByTestId("team_l");
        fireEvent.click(teamBtn);
        expect(mockFunction).toHaveBeenCalledTimes(2);
        expect(mockFunction.mock.lastCall[0]).toBe("/demo/teamLeader")

        // developer btn
        const devBtn = screen.getByTestId("developer");
        fireEvent.click(devBtn);
        expect(mockFunction).toHaveBeenCalledTimes(3);
        expect(mockFunction.mock.lastCall[0]).toBe("/demo/developer")
    });
})