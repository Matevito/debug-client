import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

//testing com
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'

// test comp
import { ProjectCreate } from "./ProjectCreate";

// mock functs
import { getData } from "../features/mockedUserStores";

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

describe("ProjectCreate component", () => {
    let noLoggedUser;
    let devStore;
    let teamLstore;
    let adminStore;

    beforeEach(() => {
        const usersData = getData();

        noLoggedUser = usersData[0];
        devStore = usersData[1];
        teamLstore = usersData[2];
        adminStore = usersData[3];
    })
    test("handles no logged user", () => {
        render(<Provider store={noLoggedUser}><ProjectCreate /></Provider>, {wrapper: MemoryRouter});
        
    })
    test.todo("handles no admin user");
    test.todo("renders complete form");
}) 