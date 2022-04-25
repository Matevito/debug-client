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

// app components
import { IssuesTable } from "../components/IssuesTable";
import { ProjectInfo } from "../components/ProjectInfo";

// api comp
import api from "../features/api";

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
                <Typography component="h1" variant="h5">
                Project <i>{projectInfo.data.title}</i>
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <ProjectInfo project={projectInfo}/>
                    </Grid>
                    <Grid item xs={8}>
                        <IssuesTable issues={projectInfo.issues}/>
                    </Grid>
                </Grid>
                
                <Button 
                    variant="contained"
                    color="success"
                    sx={{"margin-top": "10px"}}
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
