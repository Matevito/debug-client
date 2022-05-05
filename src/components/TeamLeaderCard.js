import React from 'react'

// mui comp
import {
    Card, 
    CardContent,
    Typography,
    Grid,
} from "@mui/material";

// Home components
import { ProjectsTable } from "../components/ProjectsTable";


export const TeamLeaderCard = ({ projects }) => {
    return(
        <Card raised={true} sx={{width: "1200px", marginBottom: "20px"}}>
            <CardContent sx={{ backgroundColor:"#C0C0C0" }}
            >
                <Grid container spacing={2} sx={{m:2}}>
                    <Grid item xs={5} 
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Typography variant="h4">
                            Projects you are leading: {projects.length}
                        </Typography>
                        <Typography variant="h6" align="center">
                            Your teams have solved {projects.reduce((total, proj) => {
                                return total + proj.solvedIssues
                            }, 0)} tickets.
                            There are currently {projects.reduce((total, proj) => {
                                const projLeftIssues = proj.issues - proj.solvedIssues;
                                return total + projLeftIssues
                            }, 0)} left to solve. Good luck!
                        </Typography>
                    </Grid>
                    <Grid item xs={6} 
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            
                        }}
                    >
                        {projects.length > 0 ? 
                            <ProjectsTable 
                                title={"PROJECTS YOU'RE LEADING!"}
                                projects={projects}
                            />
                            :
                            <Typography variant="h5">You're not leading currently any proyects. Communicate with an admin to take the lead of a project.</Typography>
                        }
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}