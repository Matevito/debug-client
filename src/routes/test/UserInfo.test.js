import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";

// testing comps
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'

//test component
import { UserInfo } from "../UserInfo";

// mock functs
import { getData } from "../../features/mockedUserStores";

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
                        path="/user/info"
                        element={<UserInfo />}
                    />
                </Routes>
            </MemoryRouter>
        </Provider>
    )
}
describe("UserInfo component", () => {
    let noLoggedUser;
    let devStore;
    beforeEach(() => {
        const usersData = getData();
        noLoggedUser = usersData[0];
        devStore = usersData[1];
    });
    afterAll(() => {
        jest.clearAllMocks();
    })
    test("handles no logged user", () => {
        renderComponent("/user/info", noLoggedUser)
        expect(mockedUsedNavigate).toHaveBeenCalledWith("/")
});
    test("renders user info card", () => {
        const { container } = renderComponent("/user/info", devStore);
        expect(container).toMatchSnapshot();
    });
})