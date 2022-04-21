import React, { useEffect, useState} from 'react'
import { useNavigate, useParams } from "react-router-dom";

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
import FeedSharpIcon from '@mui/icons-material/FeedSharp';

// app comp
import { IssueFormCreate } from "../components/IssueFormCreate";

// api comp
import api from "../features/api";
import get_userInfo from "../features/get_userInfo";

export const IssueCreate = () => {
    const projectId = useParams().id;
    const user = useSelector(selectUser);

    let navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [authorized, setAuthorized] = useState(null)
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        // handle authorization
        if (user) {
            if (user.user.role === "Admin") {
                setAuthorized(true)
            } else {
                // check if the user is part of the project
                const userProjects = user.projects.list.map((proj) => proj._id);
                if (userProjects.includes(projectId)) {
                    setAuthorized(true)
                } else {
                    setAuthorized(false)
                }
            }
        }
    }, [user]);

    if (!user) {
        navigate("/")
    } else if (authorized === false) {
        navigate("/protected-route");
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
                <FeedSharpIcon />
                <Typography component="h1" variant="h5">
                    Create Issue-Ticket
                </Typography>
                <p></p>
                <IssueFormCreate
                    errors={errors}
                />
            </Box>
        )
    }
}
