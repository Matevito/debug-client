import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom" 

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
import EditIcon from '@mui/icons-material/Edit';

// app components
import { ProjectEditForm } from '../components/ProjectEditForm';
import { LoadingPage } from "../components/LoadingPage";

// api comp
import api from "../features/api";
import getUsersData from "../features/getUsersData";
import get_userInfo from "../features/get_userInfo";

export const ProjectEdit = () => {
    const user = useSelector(selectUser);
    const projectId = useParams().id;
    let navigate = useNavigate();
    const dispatch = useDispatch()

    const [authorized, setAuthorized] = useState(null)
    const [usersList, setUsersList] = useState([])
    const [projectInfo, setProjectInfo] = useState(null)
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        async function getProjectInfo() {
            if (user.user.role === "Developer") {
                setAuthorized(false)
            } else {
                const config = {
                    headers: { "auth-token": user.token}
                }
                try {
                    // set project info
                    const projectRes = await api.get(`/project/${projectId}`, config);
                    setProjectInfo(projectRes.data);

                    // set userlist info
                    const userListRes = await getUsersData(user.token);
                    if (userListRes) {
                        setUsersList(userListRes)
                        // render the comp
                        setAuthorized(true)
                    } else {
                        navigate("/404")
                    }
                } catch (err) {
                    navigate("/404")
                }
            }
        };
        if (user) {
            getProjectInfo();
        };
    }, [user, projectId, navigate])

    const handleEdit = async(form) => {
        const url = `/project/${projectId}`
        const config = {
            headers: { "auth-token" : user.token }
        };
        try {
            await api.put(url, form, config);
            
            const userData = await get_userInfo(user.token);
            dispatch(login(userData))
            navigate(`/project/${projectId}`)
        } catch (err) {
            setErrors(err.response.data.error);
        }
    }
    if (!user) {
        navigate("/")
    } else if (authorized === null) {
        return (
            <LoadingPage />
        )
    } else if (authorized === false ){ 
        navigate("/protected-route")
    } else if (authorized === true) {
        return (
            <Box
                sx={{
                    marginTop: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
                fullWidth
            >
                <EditIcon fontSize="large"/>
                <Typography component="h1" variant="h5">
                    Edit Project: <i>{projectInfo.data.title}</i>
                </Typography>
                <p></p>
                <ProjectEditForm
                    usersList={usersList}
                    errors={errors}
                    handleSubmit={handleEdit}
                    project={projectInfo}
                />
            </Box>
        )
    }
}
