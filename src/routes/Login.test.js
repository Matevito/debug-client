import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

//testing com
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import configureStore from "redux-mock-store";

// test comp
import { Login } from "./Login";

const mockStore = configureStore([]);

describe("Login component", () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            user: {}
        })
    });

    test("component renders correct form", () => {
        render(<Provider store={store}><Login /></Provider>, {wrapper: MemoryRouter});

        //screen.debug()
        
        expect(screen.getByText("Log-in")).toBeInTheDocument();
        expect(screen.getAllByRole("textbox").length).toBe(1)
        expect(screen.getByLabelText("Username")).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
        expect(screen.getByText("Submit")).toBeInTheDocument();
    });
    test.todo("form handles input")
})