import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { VictoryPie } from 'victory';

// redux state management
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

// mui comp
import {
    Box,
    Card, 
    CardContent,
    Typography,
    Grid,
    Button,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

// Home components
import { Welcome } from "../components/Welcome";
import { LoadingPage } from "../components/LoadingPage";
import { ProjectsTable } from "../components/ProjectsTable";
import { UserTicketsTable } from '../components/UserTicketsTable';

import setUpIssueTable from "../features/setUpIssueTable";

// api comp
import api from "../features/api";

export const Home = () => {
    const user = useSelector(selectUser);
    let navigate = useNavigate();

    const [authorized, setAuthorized] = useState(null);
    const [projectList, setProjectList] = useState([]);

    useEffect(() => {
        async function getProjectList() {
            const config = {
                headers: { "auth-token": user.token }
            };
            const url = "/project/list";

            try {
                const listRes = await api.get(url, config);
                setProjectList(listRes.data.data);
                setAuthorized(true);
            } catch(err) {
                setAuthorized(false);
                navigate("/protected-route");
            }
        };

        if (user){
            // set-up data;
            if (user.user.role !== "Admin"){
                setAuthorized(true)
            } else {
                // fetch projectList info for admin view!
                getProjectList()
            }
        }
    }, [user, navigate])

    if (!user) {
        return(
            <Welcome />
        )
    } else if (authorized === false){
        return (
            <LoadingPage />
        )
    } else if (authorized === true) {
        return (
            <>
            <Card sx={{ width: "100%"}}>
                    <CardContent sx={{ backgroundColor: "#A9A9A9"}}>
                        <Typography variant="h6">Logged as {user.user.role}</Typography>
                    </CardContent>
            </Card>
            <Box
                fullWidth
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    hieght: "100vh",
                    m: 2
                }}
            >
                {user.user.role === "Admin" ? 
                    <AdminCard projects={projectList} />
                    :
                    <></>
                }
                {user.user.role !== "Developer" ? 
                    <TeamLeaderCard projects={user.projects.list.filter(proj => proj.teamLeader === user.user.id)}/>
                    :
                    <></>
                }
                <Card raised={true} sx={{width: "1200px", marginBottom: "20px"}}>
                    <CardContent
                        sx={{
                            backgroundColor:"#C0C0C0"
                        }}
                    >
                        <Grid container spacing={2} sx={{m:2}}>
                            <Grid item xs={6} 
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                {user.projects.number > 0 ? 
                                    <ProjectsTable  projects={user.projects.list} title={"USER PROJECTS"}/>
                                    : 
                                    <Typography variant="h5">You are not currently assigned to a project. Comunicate with an admin to be assigned to a project!</Typography>
                                }
                                
                            </Grid>
                            <Grid item xs={6} 
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <Typography variant="h4"> User projects: {user.projects.number}</Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                <Card raised={true} sx={{width: "1200px", marginBottom: "20px"}}>
                    <CardContent
                        sx={{
                            backgroundColor:"#C0C0C0"
                        }}
                    >
                        <Grid container spacing={2} sx={{m:2}}>
                            <Grid item xs={5}>
                                <Typography variant="h4">Assigned tickets: {user.issues.list.filter(i => i.status !== "solved").length}</Typography>
                                <Typography variant="h4">Solved tickets: {user.issues.list.filter(i => i.status === "solved").length}</Typography>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    m: 2
                                }}>
                                    {user.issues.number > 0 ? 
                                        <VictoryPie
                                            innerRadius={50}
                                            data={setUpIssueTable(user.issues.list)}
                                        />
                                    : <></>
                                    }
                                </Box>
                            </Grid>
                            <Grid item xs={6} sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                {user.issues.list.filter(i => i.status !== "solved").length > 0 ?
                                    <UserTicketsTable issues={user.issues.list} projects={user.projects.list}/>
                                    :
                                    <Typography variant="h5">You don't have tickets assigned. Take one from one of the projects you're into.</Typography>
                                }
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
            </>
        )
    }
};

const AdminCard = ({ projects }) => {
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

const TeamLeaderCard = ({ projects }) => {
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