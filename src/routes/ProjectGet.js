import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";

// redux state management
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";

// mui components
import {
    Box,
    Grid,
    Button 
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// app components
import { IssuesTable } from "../components/IssuesTable";
import { ProjectInfo } from "../components/ProjectInfo";
import { LoadingPage } from "../components/LoadingPage";

// api comp
import api from "../features/api";
import get_userInfo from '../features/get_userInfo';

const AdminButtons = ({ handleDelete, role, projectId}) => {
    if (role === "Admin") {
        return (
            <Box 
            sx={{marginBottom: "5px" ,
                display: "flex",
                flexDirection: "row",
                marginLeft: "auto"
                }}
            >
                <Button
                    variant="contained"
                    color="warning"
                    size="small"
                    component={Link}
                    to={`/project/${projectId}/edit`}
                >
                    <EditIcon />
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={handleDelete}
                    data-testid="deleteBtn"
                >
                    <DeleteIcon />
                    
                </Button>
            </Box>
        )
    } else if (role === "Team leader") {
        return (
            <Box
                sx={{marginBottom: "5px" ,
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: "auto"
                    }}
            >
                <Button
                    variant="contained"
                    color="warning"
                    size="small"
                    component={Link}
                    to={`/project/${projectId}/edit`}
                >
                    <EditIcon />
                </Button>
            </Box>
        )
    } else {
        return(<></>)
    }
}

export const ProjectGet = () => {
    const projectId = useParams().id;
    const user = useSelector(selectUser);
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const [authorized, setAuthorized] = useState(null);
    const [projectInfo, setProjectInfo] = useState({});
    // data: {projectinfo}; issues: [array proj issues];
    
    useEffect(() => {
        async function getProjectInfo() {
            // get project info...
            const config = {
                headers: {
                    "auth-token": user.token
                }
            }
            try {
                const projectRes = await api.get(`/project/${projectId}`, config);
                setProjectInfo(projectRes.data)
                setAuthorized(true);
            } catch (err) {
                setAuthorized(false);
            }
            
        };
        if (user) {
            getProjectInfo();
        }
    }, [user, projectId])

    const handleDelete = async() => {
        const url = `/project/${projectId}`
        const config = {
            headers: {"auth-token": user.token}
        };
        try {
            // delete proj and update user dta
            await api.delete(url, config);
            const userData = await get_userInfo(user.token);
            dispatch(login(userData))
            // navigate home
            navigate("/")

        } catch(err) {
            if (err.response.status === 401 || err.status === 401) {
                setAuthorized(false)
            } else {
                navigate("/protected-route")
            }
        }
    };

    if (!user) {
        navigate("/");
    } else if (authorized === null) {
        return (
            <LoadingPage />
        )
    }  else if (authorized === false ) {
        navigate("/404");
    } else {
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
                
                <AdminButtons
                    role={user.user.role}
                    projectId={projectId}
                    handleDelete={handleDelete}
                />
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <ProjectInfo projectData={projectInfo}/>
                    </Grid>
                    <Grid item xs={8}>
                        <IssuesTable issues={projectInfo.issues} />
                        <Button
                            fullWidth
                            variant="contained"
                            color="success"
                            sx={{marginTop: "10px", marginBottom: "10px"}}
                        >
                            <Link 
                            to={`/project/${projectId}/issue/create`} 
                            style={{ color: "inherit", textDecoration: 'none' }}>
                                Create new issue!
                            </Link>
                        </Button>
                    </Grid>
                </Grid>
            </Box>

        )
    }
}
