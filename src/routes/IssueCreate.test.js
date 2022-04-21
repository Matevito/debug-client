import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

// testing com
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'

// test component
import { IssueCreate } from "./IssueCreate";

// mock functs
import { getData } from "../features/mockedUserStores";

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));


describe("IssueCreate component", () => {
    let noLoggedUser;
    let userOutsideTeam;
    let adminStore;
    let devStore;

    beforeEach(() => {
        const usersData = getData();
        
        noLoggedUser = usersData[0];
        userOutsideTeam = usersData[4];
        adminStore = usersData[3];
        devStore = usersData[1];
    })
    test("handles no logged user", () => {
        render(
            <Provider store={noLoggedUser}>
                <IssueCreate />
            </Provider>,
            {wrapper: MemoryRouter}
        );

        expect(mockedUsedNavigate).toHaveBeenCalledWith("/");

    });
    test.todo("handles user not part of the project team");
    test.todo("handles admin user")
    test.todo("handles user part of the project team")
})