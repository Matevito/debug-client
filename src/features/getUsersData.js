import api from "./api";

const getUserData = async (token) => {
    const config = {
        headers: { "auth-token" : token}
    }; 
    try {
        const apiRes = await api.get("/user/list", config);
        return apiRes.data.data
    } catch(err) {
        return null
    }
}

export default getUserData