import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { VictoryPie, VictoryTheme } from "victory"

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
            let dataPrototype = [
                {label: "open", x: 1, y:openTicket.length},
                {label: "info needed", x: 2, y:infoNedTicket.length},
                {label: "in progress", x: 3, y:progressTicket.length},
                {label: "under review", x: 4, y:underReTicket.length},
                {label: "solved", x: 5, y:solvedTicket.length},
            ]
            dataPrototype = dataPrototype.filter((data) => data.y > 0)
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
                sx={{
                    m:2,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Typography variant="h4"><b>{project.title}</b></Typography>
                <Typography variant="h6" ><b>Description</b></Typography>
                <Typography component={'span'}>{project.description}</Typography>

                <Typography variant="h6"><b>Team Leader</b></Typography>
                <Typography  component={'span'}>
                    <Link to={`/user/${project.teamLeader._id}}`} style={{ color: "inherit", textDecoration: "inherit"}} >
                        <Stack direction="row" alignItems="center" gap={1}>
                            <PersonIcon color="error"/>
                            {project.teamLeader.username}
                        </Stack>
                    </Link>
                </Typography>

                <Typography variant="h6"><b>Team members</b></Typography>
                {project.team.filter(user => user._id !== project.teamLeader._id).map((user) => {
                    return(
                        <Typography key={user._id} component={'span'}>
                            <Link to={`/user/${user._id}`} style={{ color: "inherit", textDecoration: "inherit" }}>
                                <Stack direction="row" alignItems="center" gap={1}>
                                    <PersonIcon color="success"/>
                                    {user.username}
                                </Stack>
                            </Link>
                        </Typography>
                    )
                })}
                <Typography variant="h6"><b>Total tickets: </b>{issues.length}</Typography>
                {issues.length ? 
                    <VictoryPie 
                        data={data}
                        innerRadius={50}
                        theme={VictoryTheme.material}
                    /> : 
                    <></>
                }
            </Box>
            </>
        )
    }
    
}
