import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom"

//testing comp
import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import configureStore from "redux-mock-store";


//test comp
import { Header } from "./Header";

const mockStore_1 = configureStore([]);
const mockStore_2 = configureStore([]);

describe("Header component", () => {
    let userSet;
    let not_userSet;
    beforeEach(() => {
        not_userSet = mockStore_1({
            user: {},
        });
        userSet = mockStore_2({
            user: {
                loggedIn: "true",
                token: "a token?",
                user: {
                    username:"test user",
                    email: "email@test.com",
                    role: "admin",
                    id: "1"
                },
                projects: {
                    number: 0,
                    list: []
                },
                issues: {
                    number: 0,
                    list: []
                }
            }
        });
        userSet.dispatch = jest.fn();
    });
    
    test("renders if user is not set", () => {
        render(<Provider store={not_userSet}><Header /> </Provider>, {wrapper: MemoryRouter});

        expect(screen.getByText("Log in")).toBeInTheDocument();
        expect(screen.getByText("Sign in")).toBeInTheDocument();
    });
    test("renders if user is set", () => {
        render(<Provider store={userSet}><Header /></Provider>,{wrapper: MemoryRouter})

        expect(screen.getByText("Log out")).toBeInTheDocument();
    });
    test("comp handles 'log-out' functionality", () => {
        render(<Provider store={userSet}><Header /></Provider>,{wrapper: MemoryRouter})

        const logOutBtn = screen.getByText("Log out");
        fireEvent.click(logOutBtn);
        expect(userSet.dispatch.mock.lastCall[0].type).toBe("user/logout")
        // user/logout userslicer function was called
    })
})