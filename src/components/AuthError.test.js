import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'

//tested comp
import { AuthError } from "./AuthError";

describe("AuthError component", () => {
    test("handles no prop errors", () => {
        const { container} = render(<AuthError error={null}/>);
        expect(container).toMatchSnapshot();
    });

    test("handles errors props as an array", () => {
        const testErrors = [
            {
                param: "first",
                msg: "1"
            },
            {
                param: "second",
                msg: "2"
            },
            {
                param: "third",
                msg: "3"
            }
        ];
        render(<AuthError error={testErrors} />);
        expect(screen.getAllByRole("alert").length).toBe(3)
        expect(screen.getByText("first error")).toBeInTheDocument();
        expect(screen.getByText("second error")).toBeInTheDocument();
        expect(screen.getByText("third error")).toBeInTheDocument();
        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
        expect(screen.getByText("3")).toBeInTheDocument();
    });

    test("handles errors props as a string", () => {
        const errorMsg = "silly mistake!"
        render(<AuthError error={errorMsg} />);

        const displayedError = screen.getByText(errorMsg);
        expect(displayedError).toBeInTheDocument();
    });
})