/* eslint-disable testing-library/prefer-find-by */
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";

// testing com
import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom'

// test comp
import { ProjectGet } from "./ProjectGet";

// mock Functs;
import { getData } from "../features/mockedUserStores";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
    rest.get("https://pure-falls-26749.herokuapp.com/apiv1/project/testProject1",
    (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({
            
                data:{
                    _id: "testProject1",
                    title: "test title",
                    description: "a description",
                    team: [
                        {_id: "one", username:"user1"},
                        {_id:"two", username:"user2"}
                    ],
                    teamLeader: {
                        _id: "one", username:"user1"
                    }
                },
                issues: [
                    {
                        _id: "1",
                        title: "issue1",
                        description:" a simple description",
                        handlingTeam: [],
                        status: "open",
                        date: "2022-04-23T22:56:09.627Z",
                        screenshots: []
                    },
                    {
                        _id: "2",
                        title: "issue2",
                        description: "a more complicated descirption",
                        handlingTeam: [{_id:"two", username:"user2"}],
                        status: "in progress",
                        date: "2022-04-23T22:56:09.627Z",
                        screenshots: []
                    }
                ]
            
        }))
    })
);

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
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close())

    test("handles no logged user", () => {
        const url = "/project/testProject1"
        renderComponent(url, noLoggedUser);
        expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
    });

    test("handles user not part of the project", async() => {
        server.use(
            rest.get("https://pure-falls-26749.herokuapp.com/apiv1/project/testProject1", (req, res, ctx) => {
                return res(ctx.status(401))
            })
        )
        // test
        const url = "/project/testProject1";
        renderComponent(url, userOutsideTeam);
        await waitFor(() => mockedUsedNavigate.mock.lastCall[0] === "/protected-route");
        expect(mockedUsedNavigate).toHaveBeenCalledWith("/protected-route")
    });

    test("handles user part of the project", async () => {
        const url = "/project/testProject1";
        renderComponent(url, devStore);

        await waitFor(() => screen.getByText("test title"))

        const projTitle = screen.getByText("test title");
        expect(projTitle).toBeInTheDocument()
        expect(screen.getByText("Create new issue!")).toBeInTheDocument()
    });
    test.todo("edit btn if user is team leader");
    test.todo("erase-edit btns if user is an admin")
})