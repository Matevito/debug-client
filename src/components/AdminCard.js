import React from 'react'
import { Link } from "react-router-dom"
// mui comp
import {
    Card, 
    CardContent,
    Typography,
    Grid,
    Button,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

// Home components
import { ProjectsTable } from "../components/ProjectsTable";


export const AdminCard = ({ projects }) => {
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
                        <Typography variant="h5">There are currently {projects.length} projects on db.</Typography>
                        <Typography variant="h6" align="center">
                            Users have solved a total of {projects.reduce((total, proj) => {
                                return total + proj.solvedIssues
                            }, 0)} tickets in all projects.
                            There are currently {projects.reduce((total, proj) => {
                                const projLeftIssues = proj.issues - proj.solvedIssues;
                                return total + projLeftIssues
                            }, 0)} That need to be handled!
                        </Typography>
                    </Grid>
                    <Grid item xs={6} 
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        {projects.length > 0 ? 
                            <ProjectsTable title="PROJECTS ON APP" projects={projects} />
                            :
                            <Typography variant="h5">There are no projects currently on db. Why not create one?</Typography>
                        }
                            <Button 
                                align="center"
                                color="warning"
                                variant="contained"
                                size="large"
                                sx={{marginTop: "10px"}}
                                component={Link}
                                to={"/project/create"}
                                startIcon={<AddIcon />}
                            >
                                create a project
                            </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
};