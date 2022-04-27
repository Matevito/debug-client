import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

// mui comp
import {
    Box,
    Typography,
    Stack
} from "@mui/material"
import PersonIcon from '@mui/icons-material/Person';

export const ProjectInfo = ({ projectData }) => {
    const [project, setProject] = useState(null)
    const [issues, setIssues] = useState([])

    useEffect(() => {
        if (projectData) {
            setProject(projectData.data);
            setIssues(projectData.issues);
        }
    }, [])
    if (!project){
        return (
            <></>
        )
    } else  {
        return (
            <>
            <Box
            padding={2}
            sx={{
                display: "flex",
                flexDirection: "column",
                
            }}
            >
                <Typography variant="h6"><b>Project description</b></Typography>
                <Typography variant="div">{project.description}</Typography>

                <Typography variant="h6"><b>Team Leader</b></Typography>
                <Typography >
                    <Link to={`/user/${project.teamLeader._id}}`} style={{ color: "inherit"}} >
                        <Stack direction="row" alignItems="center" gap={1}>
                            <PersonIcon color="error"/>
                            {project.teamLeader.username}
                        </Stack>
                    </Link>
                </Typography>

                <Typography variant="h6"><b>Team members</b></Typography>
                {project.team.map((user) => {
                    return(
                        <Typography key={user._id}>
                            <Link to={`/user/${user._id}`} style={{ color: "inherit"}}>
                                <Stack direction="row" alignItems="center" gap={1}>
                                    <PersonIcon color="success"/>
                                    {user.username}
                                </Stack>
                            </Link>
                        </Typography>
                    )
                })}
            </Box>
            
            </>
        )
    }
    
}
