import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";

// testing comps
import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom'

// test comp
import { UserDetails } from "../UserDetails";

// mock functions;
import { getData } from "../../features/mockedUserStores";
import { rest } from "msw";
import { setupServer } from "msw/node";

const rootAPI = "https://pure-falls-26749.herokuapp.com/apiv1";
const UserResponse = {
    data: {
        user: {
            username: "adminUser",
            email: "admin@email.com",
            id: "adminID",
            role: "Admin"
        },
        projects: {list: [], number: 0},
        issues: {list: [{_id: "issueId", title: "testTicket"}], number: 1},
    }
}

const server = setupServer(
    rest.get(`${rootAPI}/user/adminID`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(UserResponse));
    }),
    rest.get(`${rootAPI}/user/devID`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({
            data: {
                user: {
                    username: "developer",
                    email: "developer@email.arg",
                    id: "devID",
                    role:"Developer"
                },
                projects: {list: [], number: 0},
                issues: {list: [{_id: "issueId", title: "testTicket"}], number: 1},
            }
        }))
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
                        path="/user/:id"
                        element={<UserDetails />}
                    />
                </Routes>
            </MemoryRouter>
        </Provider>
    )
}
describe("UserDetails component", () => {
    // test requirements
    let noLoggedUser;
    let devStore;
    let adminStore;
    beforeEach(() => {
        const usersData = getData();
        noLoggedUser = usersData[0];
        devStore = usersData[1];
        adminStore = usersData[3];
    });
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers());
    afterAll(() => {
        server.close()
        jest.clearAllMocks();
    });

    // authentication tests
    test("handles no user set-up", () => {
        const testURL = "/user/testing"
        renderComponent(testURL, noLoggedUser);
        expect(mockedUsedNavigate).toHaveBeenCalledWith("/")
    });
    test("handles if the api response is negative", async() => {
        const testURL = "/user/rejectThis";
        server.use(
            rest.get(`${rootAPI}/user/rejectThis`, (req, res, ctx) => {
                return res(ctx.status(400))
            })
        );
        renderComponent(testURL, devStore);
        await waitFor(() => mockedUsedNavigate.mock.lastCall[0]);
        expect(mockedUsedNavigate).toHaveBeenCalledWith("/protected-route")
    });

    test("handles if the requested user is the one making the call", async() => {
        const testURL = "/user/1";
        renderComponent(testURL, devStore)
        await waitFor(() => mockedUsedNavigate.mock.lastCall[0]);
        expect(mockedUsedNavigate).toHaveBeenCalledWith("/user/info")
    })
    // functional tests;
    test("renders admin page", async() => {
        const testURL = "/user/adminID";
        const { container } = renderComponent(testURL, devStore)
        await screen.findByTestId("GroupsIcon");
        expect(container).toMatchSnapshot();
    });
    test("renders no admin page", async() => {
        const testURL = "/user/devID";
        const { container } = renderComponent(testURL, adminStore)
        await screen.findByTestId("GroupsIcon");
        expect(container).toMatchSnapshot();
    });
    test("handles makeAdmin btn", async() => {
        const testURL = "/user/devID";
        renderComponent(testURL, adminStore)
        await screen.findByTestId("GroupsIcon");
        const adminBtn = screen.getByText("make admin")
        expect(adminBtn).toBeInTheDocument()
    })
})