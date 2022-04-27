import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";

// redux state management
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

// mui components
import {
    Box,
    Grid,
    Typography,
    Button 
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// app components
import { IssuesTable } from "../components/IssuesTable";
import { ProjectInfo } from "../components/ProjectInfo";

// api comp
import api from "../features/api";

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
        /*
        const config = {
            headers: {"auth-token": user.token}
        };
        */
        // mock delete resp
        //todo: delete call to rest-api
        navigate("/")
    };

    if (!user) {
        navigate("/");
    } else if (authorized === null) {
        return (
            <>loading...</>
        )
    }  else if (authorized === false ) {
        navigate("/protected-route");
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
                    </Grid>
                </Grid>
                
                <Button 
                    variant="contained"
                    color="success"
                    sx={{marginTop: "10px"}}
                >
                    <Link 
                    to={`/project/${projectId}/issue/create`} 
                    style={{ color: "inherit", textDecoration: 'none' }}>
                        Create new issue!
                    </Link>
                </Button>
            </Box>

        )
    }
}
