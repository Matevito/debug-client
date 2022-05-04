import React from 'react'
import { useNavigate } from "react-router-dom";

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
    Stack
} from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import GroupsIcon from '@mui/icons-material/Groups';
import BugReportIcon from '@mui/icons-material/BugReport';

export const UserInfo = () => {
    const user = useSelector(selectUser);
    let navigate = useNavigate();

    if (!user) {
        navigate("/")
    } else {
        return (
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
                        <Typography variant="h4">{user.user.username.toUpperCase()}</Typography>
                        <Grid container spacing={3} sx={{m:3}}>
                            <Grid 
                                item xs={6}
                                sx={{ display:"flex", flexDirection: "column"}}
                            >
                                <Stack direction="row" alignItems="center" gap={2}>
                                    <BadgeIcon size="large"/>
                                    <Typography variant="h6"><b>User role</b></Typography>
                                </Stack>
                                <Typography>{user.user.role}</Typography>

                                <Stack direction="row" alignItems="center" gap={2}>
                                    <EmailIcon size="large"/>
                                    <Typography variant="h6"><b>Contact email</b></Typography>
                                </Stack>
                                <Typography>{user.user.email}</Typography>
                            </Grid>
                            <Grid 
                                item xs={6}
                                sx={{ display:"flex", flexDirection: "column"}}
                            >
                                <Stack direction="row" alignItems="center" gap={3}>
                                    <GroupsIcon size="large"/>
                                    <Typography variant="h6"><b>Projects user is part </b></Typography>
                                    <Typography variant="h5">{user.projects.number}</Typography>
                                </Stack>
                                
                                <Stack direction="row" alignItems="center" gap={3}>
                                    <BugReportIcon size="large"/>
                                    <Typography variant="h6"><b>Tickets taken</b></Typography>
                                    <Typography variant="h5">{user.issues.number}</Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        )
    }
}
