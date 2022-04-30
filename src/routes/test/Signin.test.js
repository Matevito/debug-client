import React from "react";
import { MemoryRouter } from "react-router-dom"

//testing comp
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'

// test comp
import { Signin } from "../Signin";

describe("Signin component", () =>  {
    test("component renders correct form", () => {
        render(<Signin />, {wrapper: MemoryRouter});
        
        const inputText = screen.getAllByRole("textbox");  

        expect(screen.getByText("Sign-in")).toBeInTheDocument();      
        expect(inputText.length).toBe(2)
        expect(screen.getByLabelText("Username")).toBeInTheDocument();
        expect(screen.getByLabelText("email")).toBeInTheDocument();
        expect(screen.getByTestId("password")).toBeInTheDocument();
        expect(screen.getByTestId("repPassword")).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
    });
    test.todo("form handles input"/*, () => {
        render(<Signin />, {wrapper: MemoryRouter});
        // get input fields
        const username = screen.getByRole("textbox", {name: "Username"})
        const password = screen.getByTestId("password");

        // use input fields
        userEvent.type(username, "test-user");
        userEvent.type(password, "testPassword");
        // check changes on input fields
        screen.debug();
    }*/);
})