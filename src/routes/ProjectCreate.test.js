import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

// testing com
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'

// test component
import { ProjectCreate } from "./ProjectCreate";

// mock functs
import { getData } from "../features/mockedUserStores";

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

import mockAxios from "jest-mock-axios";

describe("ProjectCreate component", () => {
    let noLoggedUser;
    let devStore;
    let teamLstore;
    let adminStore;
    let resUsers;
    beforeEach(() => {
        const usersData = getData();

        noLoggedUser = usersData[0];
        devStore = usersData[1];
        teamLstore = usersData[2];
        adminStore = usersData[3];

        resUsers = {
            data: {
                data:  [
                    {
                        username: "developer",
                        id: "1"
                    },
                    {
                        username: "teaml",
                        id: "2"
                    },
                    {
                        username: "admin",
                        id: "3"
                    }
                ]
            }
        }
        mockAxios.reset();
    })
    test("handles no logged user", () => {
        
        const { container } = render(<Provider store={noLoggedUser}><ProjectCreate /></Provider>, {wrapper: MemoryRouter});
        // does no renders anything;
        expect(container).toMatchSnapshot();
        expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
    })
    test("handles developer user", () => {
        // developer user
        const { devContainer } = render(<Provider store={devStore}><ProjectCreate /></Provider>, {wrapper: MemoryRouter});
        expect(devContainer).toMatchSnapshot();
        expect(mockedUsedNavigate).toHaveBeenCalledWith("/protected-route");
    });
    test("handles team leader user", () => {
        const { teamContainer } = render(<Provider store={teamLstore}><ProjectCreate /></Provider>, {wrapper: MemoryRouter});
        expect(teamContainer).toMatchSnapshot();
        expect(mockedUsedNavigate).toHaveBeenCalledWith("/protected-route");
    })
    test("renders form", () => {
        // console.log(adminStore.getState().user.user.user)
        // mockAxios.get.mockResolvedValueOnce(resUsers)
        render(<Provider store={adminStore}><ProjectCreate /></Provider>, {wrapper: MemoryRouter})
        
        //todo:
    });
}) 