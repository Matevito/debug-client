import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes, BrowserRouter } from "react-router-dom";

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

const renderComponent = (url, store) => {
    render(
        <Provider store={store}>
                <MemoryRouter initialEntries={[url]}>
                    <Routes>
                        <Route 
                            path="/project/:id/issue/create"
                            element={<IssueCreate />}
                        />
                    </Routes>
                </MemoryRouter>
        </Provider>
    )
}
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
    });
    
    test("handles no logged user", () => {
        const url = '/project/testProject1/issue/create'

        renderComponent(url, noLoggedUser)
        expect(mockedUsedNavigate).toHaveBeenCalledWith("/");

    });
    test("handles user not part of the project team", () => {
        const url = '/project/testProject1/issue/create'
        renderComponent(url, userOutsideTeam)

        expect(mockedUsedNavigate).toHaveBeenCalledWith("/protected-route");
    });
    test("handles admin user", () => {
        const url = '/project/testProject1/issue/create'
        renderComponent(url, adminStore)

        expect(screen.getByText("Create Issue-Ticket")).toBeInTheDocument()
    })
    test("handles user part of the project team", () => {
        const url = '/project/testProject1/issue/create'
        renderComponent(url, devStore)
        
        expect(screen.getByText("Create Issue-Ticket")).toBeInTheDocument()
    })
})