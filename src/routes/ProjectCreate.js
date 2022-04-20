import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

// redux state management
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

// mui components
import {
    Grid,
    Box,
    Typography
} from "@mui/material"
import AssignmentIcon from '@mui/icons-material/Assignment';

// app components
import { ProjectForm } from "../components/ProjectForm";

// api comp
import api from "../features/api";

export const ProjectCreate = () => {
    const user = useSelector(selectUser);
    let navigate = useNavigate();

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

    const handleSubmit = (form) => {
        /* if it fails set errors, if succed navigate to '/' */
        console.log(form);
    }
    if (!user) {
        // nvigate to /home
        navigate("/")
        return(<></>)
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
