import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
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
} from "@mui/material";

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
                {user.user.role === "Admin" ? <>only admin</> : <></>}
                {user.user.role !== "Developer" ? <>team leader and admin</> : <></>}
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
}
