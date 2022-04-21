import api from "./api";

const get_userInfo = async (token) => {
    // setting up headers for calls
    const config = {
        headers: {
            "auth-token": token
        }
    };
    // fetch api data
    const userData = await api.get("/whoami", config);
    if (!userData) {
        return false;
    }
    const userId = userData.data.data.id;
    const userRelatedData = await api.get(`/user/${userId}`, config);
    if (!userRelatedData) {
        return false;
    };

    const userNotifications = [];

    // structure res and send it
    const dataRes = {
        loggedIn: true,
        token: token,
        user: {
            username: userData.data.data.username,
            email: userData.data.data.email,
            role: userData.data.data.role,
            id: userData.data.data.id
        },
        projects: userRelatedData.data.data.projects,
        issues: userRelatedData.data.data.issues,
        notifications: {
            list: userNotifications,
            number: userNotifications.length
        }
    };
    return dataRes;
}

export default get_userInfo;