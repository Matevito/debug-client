import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";

// testing comps
import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom'

// test comp
import { IssueGet } from "./IssueGet";

// mock functions
import { getData } from "../features/mockedUserStores";
import { rest } from "msw";
import { setupServer } from "msw/node";

const rootAPI = "https://pure-falls-26749.herokuapp.com/apiv1";
const issueResponse = {
    data: { issue: {
        _id: "issueTestId",
        title:" issue ticket",
        description: "here goes a long and detailed description...",
        project: "projectTestId",
        status: "open",
        priority: "high",
        type: "feature req",
        handlingTeam: [],
        date: "2022-04-23T22:56:09.627Z",
        screenshots: [],
        v__: 0
    }}
}

const server = setupServer(
    rest.get(`${rootAPI}/issue/issueTestId`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(issueResponse))
    })
);
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

const renderComponent = (url, store) => {
    return render(
        <Provider store={store}>
            <MemoryRouter initialEntries={[url]}>
                <Routes>
                    <Route 
                        path="/issue/:id"
                        element={<IssueGet/>}
                    />
                </Routes>
            </MemoryRouter>
        </Provider>
    )
} 
describe("IssueGet component", () => {
    // test requirements!
    let noLoggedUser;
    let devStore;
    let adminStore;
    let userNotPartOfIssue;
    const componentURL = "/issue/issueTestId";

    beforeEach(() => {
        const usersData = getData();
        noLoggedUser = usersData[0];
        devStore = usersData[1];
        adminStore = usersData[3];
        userNotPartOfIssue = usersData[2];
    })
    // required to mock rest-api server
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers());
    afterAll(() => {
        server.close()
        jest.clearAllMocks();
    })

    //auth tests
    test("handles no user set-up", () => {
        renderComponent(componentURL, noLoggedUser);
        expect(mockedUsedNavigate).toHaveBeenCalledWith("/")
    });
    test("handles if a user does not have access to the page", async() => {
        server.use(
            rest.get(`${rootAPI}/issue/issueTestId`, (req, res, ctx) => {
                return res(ctx.status(401))
            })
        );
        renderComponent(componentURL, userNotPartOfIssue);
        await waitFor(() => mockedUsedNavigate.mock.lastCall[0]);
        expect(mockedUsedNavigate).toHaveBeenCalledWith("/protected-route")

    });
    test("the issue called does not exist", async() => {
        server.use(
            rest.get(`${rootAPI}/issue/issueTestId`, (req, res, ctx) => {
                return res(ctx.status(400))
            })
        );
        renderComponent(componentURL, devStore);
        await waitFor(() => mockedUsedNavigate.mock.lastCall[0]);
        expect(mockedUsedNavigate).toHaveBeenCalledWith("/404")
    });

    //render tests
    test.todo("render component tests")
})