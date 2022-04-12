import  { createSlice } from "@reduxjs/toolkit";

/* User object structure
user:{
    loggedIn: 'boolean',
    user: {
        username,
        email,
        role,
        id
    },
    projects: [{
        id,
        title
    }],
    issues: [{
        id,
        title
    }],
    todo on it's own slice:?
    notifications: [array of id's] // under development*
}
*/
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
        }
    }
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer