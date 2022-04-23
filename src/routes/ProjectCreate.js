import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

// redux state management
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";

// mui components
import {
    Box,
    Typography
} from "@mui/material"
import AssignmentIcon from '@mui/icons-material/Assignment';

// app components
import { ProjectForm } from "../components/ProjectForm";

// api comp
import api from "../features/api";
import get_userInfo from "../features/get_userInfo";

export const ProjectCreate = () => {
    const user = useSelector(selectUser);
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const [usersList, setUsersList] = useState([]);
    const [errors, setErrors] = useState(null)

    useEffect(() => {
        async function getUsersList(){
            if(user.user.role === "Admin") {
                const config = {
                    headers: {
                        "auth-token": user.token
                    }
                };
                
                const apiRes = await api.get("/user/list", config);
                if (apiRes.status === 200) {
                    setUsersList(apiRes.data.data)
                }
            }
        };
        if (user) {
            getUsersList()
        }
    },[user]);

    const handleSubmit = async (form) => {
        /* if it fails set errors, if succed navigate to '/' */
        const url = '/project/';
        const config = {
            headers: {
                "auth-token": user.token
            }
        }
        console.log(config)
        try {
            await api.post(url, form, config);
            
            // if the req succeds, refresh user data and navigate to '/'
            const userData = await get_userInfo(user.token);
            dispatch(login(userData));
            navigate("/");
        } catch (err) {
            setErrors(err.response.data.error)
            console.log(err.response.data)
        }
    }
    if (!user) {
        // nvigate to /home
        navigate("/")
    } else if (user.user.role !== "Admin") {
        //navigate to "/protected-route"
        navigate("/protected-route")
    } else {
        return (
            <Box
                sx={{
                    marginTop: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: 'center',
                }}
                fullWidth
            >
                <AssignmentIcon />
                <Typography component="h1" variant="h5">
                    Create Project
                </Typography>
                <p></p>
                <ProjectForm  
                    usersList={usersList}
                    errors={errors}
                    handleSubmit={handleSubmit}
                />
            </Box>
        )
}
}
