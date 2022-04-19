import configureStore from "redux-mock-store";

// todo: set project an issues values
const usersStoreValues = [
    {
        user: {} 
    },
    {
        user: {
            loggedIn: true,
            token : "a token?",
            user: {
                username: "devUser",
                email:"dev@email.com",
                role: "Developer",
                id: "1"
            },
            projects: {
                number: 0,
                list: []
            },
            issues: {
                number: 0,
                list: []
            }
        }
    },
    {

        user: {
            loggedIn: true,
            token : "a token?",
            user: {
                username: "TeamLeaderUser",
                email:"team@email.com",
                role: "Team leader",
                id: "2"
            },
            projects: {
                number: 0,
                list: []
            },
            issues: {
                number: 0,
                list: []
            }
        }
    },
    {

        user: {
            loggedIn: true,
            token : "admintoken?",
            user: {
                username: "adminUser",
                email:"admin@email.com",
                role: "Admin",
                id: "3"
            },
            projects: {
                number: 0,
                list: []
            },
            issues: {
                number: 0,
                list: []
            }
        }
    }
];

exports.getData = () => {
    const mockedUsers = usersStoreValues.map((user, i) => {
        const mockStore = configureStore([]);
        if (i === 0) {
            return mockStore(user)
        }
        return mockStore({user: {
            user: {
                user
            }
        }})
    });

    return mockedUsers;
}