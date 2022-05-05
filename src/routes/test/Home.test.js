import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";

// testing comps
import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom'

// test component
import { Home } from "../Home";

// mock functions
import { getData } from "../../features/mockedUserStores";
import { rest } from "msw";
import { setupServer } from "msw/node";

const rootAPI = "https://pure-falls-26749.herokuapp.com/apiv1";

const server = setupServer(
    rest.get("*", (req, res, ctx) => {
        return res(ctx.status(400), ctx.json({ error: "error fetching data"}))
    })
);
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

const renderComponent = (store) => {
    return render(
        <Provider store={store}>
            <MemoryRouter initialEntries={["/"]}>
                <Routes>
                    <Route 
                        path="/"
                        element={<Home />}
                    />
                </Routes>
            </MemoryRouter>
        </Provider>
    )
}
describe("Home component", () => {
    let noLoggedUser;
    let devStore;
    let teamLeaderStore;
    let adminStore;

    beforeEach(() => {
        const usersData = getData();
        noLoggedUser = usersData[0];
        devStore = usersData[1];
        adminStore = usersData[3];
    })
    // required to mock rest-api server
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers());
    afterAll(() => {
        server.close()
        jest.clearAllMocks();
    })

    // auth tests
    test.todo("handles user not logged-in");
    test("handles error fetching admin user", async() => {
        renderComponent(adminStore);
        await waitFor(() => mockedUsedNavigate.mock.lastCall[0]);
        expect(mockedUsedNavigate).toHaveBeenCalledWith("/protected-route")
    });

    // functional tests
    test("handles developer", async() => {
        const { container } = renderComponent(devStore);
        await screen.findByText("Logged as Developer");
        expect(container).toMatchSnapshot()
    });
    test.todo("render team leader table");
    test.todo("renders admin user tables");
})