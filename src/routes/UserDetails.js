import React, { useState, useEffect} from 'react'
import { useParams, useNavigate } from "react-router-dom";

// redux comp
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

// mui comp
import {
    Box,
    Grid,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    Stack
} from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import GroupsIcon from '@mui/icons-material/Groups';
import BugReportIcon from '@mui/icons-material/BugReport';
import EngineeringIcon from '@mui/icons-material/Engineering';

// app comp
import { LoadingPage } from "../components/LoadingPage";

// api comp
import api from "../features/api";


export const UserDetails = () => {
    const user = useSelector(selectUser);
    const userId = useParams().id;
    let navigate = useNavigate();

    // state values;
    const [userInfo, setUserInfo] = useState(null);
    const [authorized, setAuthorized] = useState(null)

    // set-up user info
    useEffect(() => {
        async function getUserInfo () {
            const config = {
                headers: { "auth-token" : user.token }
            };
            try {
                const userRes = await api.get(`/user/${userId}`, config)
                setUserInfo(userRes.data.data);
                setAuthorized(true)
            } catch(err) {
                setAuthorized(false);
                navigate("/protected-route")
            }
        } 
        if (user) {
            if (user.user.id === userId) {
                navigate("/user/info");
            } else {
                getUserInfo()
            }
        }
    }, [user, userId, navigate]);

    // make user admin;

    if (!user) {
        navigate("/");
    } else if (authorized === null) {
        return(
            <LoadingPage />
        )
    } else if (authorized === true) {
        return(
            <Box
                fullWidth
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "100vh",
                    m: 5
                }}
            >
                <Card raised={true} 
                    sx={{
                        width: "1000px"
                    }}
                >
                    <CardContent
                        sx={{ 
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            backgroundColor: "#c4c1c1",
                        }}
                    >
                        <AccountBoxIcon size="large"/>
                        <Typography variant="h3">{userInfo.user.username.toUpperCase()}</Typography>
                        <Grid container spacing={3} sx={{m:3}}>
                            <Grid 
                                item xs={6}
                                sx={{ display:"flex", flexDirection: "column"}}
                            >
                                <Stack direction="row" alignItems="center" gap={2}>
                                    <BadgeIcon size="large"/>
                                    <Typography variant="h6"><b>User role</b></Typography>
                                </Stack>
                                <Typography>{userInfo.user.role}</Typography>
                                
                                <Stack direction="row" alignItems="center" gap={2}>
                                    <EmailIcon size="large"/>
                                    <Typography variant="h6"><b>Contact email</b></Typography>
                                </Stack>
                                <Typography>{userInfo.user.email}</Typography>
                            </Grid>

                            <Grid 
                                item xs={6} 
                                sx={{ display:"flex", flexDirection: "column"}}
                            >
                                <Stack direction="row" alignItems="center" gap={3}>
                                    <GroupsIcon size="large"/>
                                    <Typography variant="h6"><b>Project user is part </b></Typography>
                                    <Typography variant="h5">{userInfo.projects.number}</Typography>
                                </Stack>
                                

                                <Stack direction="row" alignItems="center" gap={3}>
                                    <BugReportIcon size="large"/>
                                    <Typography variant="h6"><b>Tickets taken</b></Typography>
                                    <Typography variant="h5">{userInfo.issues.number}</Typography>
                                </Stack>

                            </Grid>
                        </Grid>
                    </CardContent>
                    {(userInfo.user.role !== "Admin" && user.user.role === "Admin") ? 
                        <CardActions sx={{ backgroundColor: "#838383", display:"flex", flexDirection:"column", alignItem:"center"}}>
                            <Button 
                                color="warning"
                                size="large"
                                variant="contained"
                                startIcon={<EngineeringIcon />}
                            >
                                make admin
                            </Button>
                        </CardActions>
                    : <></>
                    }
                </Card>
            </Box>
        )
    }
}
