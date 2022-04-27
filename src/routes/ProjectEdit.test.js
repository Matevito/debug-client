import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";

// testing comps
import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom'

// test comp
import { ProjectEdit } from "./ProjectEdit";

// mock functions;
import { getData } from "../features/mockedUserStores";
import { rest } from "msw";
import { setupServer } from "msw/node";

const rootAPI = "https://pure-falls-26749.herokuapp.com/apiv1";
const server = setupServer(
    rest.get(`${rootAPI}/user/list`, 
    (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({
            data: [
                {username: "developer", id: "1"},
                {username: "teaml", id: "2"},
                {username: "admin", id: "3"}
            ]
        }))
    }
    ),

    rest.get(`${rootAPI}/project/testProject1`,
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
                        priority: "low",
                        description:" a simple description",
                        handlingTeam: [],
                        status: "open",
                        date: "2022-04-23T22:56:09.627Z",
                        screenshots: []
                    },
                    {
                        _id: "2",
                        title: "issue2",
                        priority: "low",
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
                    path="/project/:id/edit"
                    element={<ProjectEdit />}
                    />
                </Routes>
            </MemoryRouter>
        </Provider>
    )
}

describe("ProjectEdit component", () => {
    let noLoggedUser;
    let devStore;
    let teamLeaderStore;
    let adminStore;
    let componentUrl = "/project/testProject1/edit" 
    beforeEach(() => {
        const usersData = getData();

        noLoggedUser = usersData[0];
        devStore = usersData[1];
        teamLeaderStore = usersData[2];
        adminStore = usersData[3];
    });
    // required to mock rest-api server
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers());
    afterAll(() => {
        server.close()
        jest.clearAllMocks();
    })

    test("handles if user is not set-up", () => {
        renderComponent(componentUrl, noLoggedUser);
        expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
    })
    test("handles if user role is dev", () => {
        renderComponent(componentUrl, devStore);
        expect(mockedUsedNavigate).toHaveBeenCalledWith("/protected-route")
    });
    test("handles if project does not exist", async() => {
        server.use(
            rest.get(`${rootAPI}/project/testProject1`, (req, res, ctx) => {
                return res(ctx.status(401))
            })
        );
        renderComponent(componentUrl, adminStore);
        await waitFor(() => mockedUsedNavigate.mock.lastCall[0] === "/404")
    });
    test("handles if userListRes is false", async() => {
        server.use(
            rest.get(`${rootAPI}/user/list`, (req, res, ctx) => {
                return(ctx.status(401), ctx.json({ error: true}))
            })
        );
        renderComponent(componentUrl, adminStore)
        await waitFor(() => mockedUsedNavigate.mock.lastCall[0] === "/404")
    })
    test.todo("handles if user role is Team Leader");
    test.todo("renders if user role is Admin");
});