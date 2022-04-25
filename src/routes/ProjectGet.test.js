import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";

// testing com
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'

// test comp
import { IssueCreate, ProjectGet } from "./ProjectGet";

// mock Functs;
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
                    path="project/:id"
                    element={<ProjectGet />}
                    />
                </Routes>
            </MemoryRouter>
        </Provider>
    )
}
describe("ProjectGet component", () => {
    let noLoggedUser;
    let userOutsideTeam;
    let devStore;

    // test config data
    beforeEach(() => {
        const usersData = getData();

        noLoggedUser = usersData[0];
        userOutsideTeam = usersData[4];
        devStore = usersData[1];
    })
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("handles no logged user", () => {
        const url = "/project/testProject1";

        renderComponent(url, noLoggedUser);

        expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
    });
    
    test.todo("handles user not part of the project");
    test.todo("handles user part of the project");
    test.todo("renders project correct info");
})