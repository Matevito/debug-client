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
    const [data, setData] = useState([])

    useEffect(() => {
        if (projectData) {
            setProject(projectData.data);
            setIssues(projectData.issues);
            const openTicket = projectData.issues.filter((issue) => issue.status === "open");
            const infoNedTicket =  projectData.issues.filter((issue) => issue.status === "aditional info needed");
            const progressTicket =  projectData.issues.filter((issue) => issue.status === "in progress");
            const underReTicket =  projectData.issues.filter((issue) => issue.status === "under review");
            const solvedTicket = projectData.issues.filter((issue) => issue.status === "solved");
            const dataPrototype = [
                {type: "open", tickets: openTicket.length},
                {type: "info needed", tickets: infoNedTicket.length},
                {type: "in pŕogress", tickets: progressTicket.length},
                {type: "under review", tickets: underReTicket.length},
                {type: "solved", tickets: solvedTicket.length},
            ]
            setData(dataPrototype)
        }
    }, [projectData])

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
