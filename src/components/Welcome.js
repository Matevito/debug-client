import React from 'react'
import { Link } from "react-router-dom";

// mui comp
import {
    Link as LinkMui,
    Box,
    Stack,
    Grid,
    Typography
} from "@mui/material";
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LocalSeeIcon from '@mui/icons-material/LocalSee';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import SecurityIcon from '@mui/icons-material/Security';
import GitHubIcon from '@mui/icons-material/GitHub';

import WelcomeImage from "../images/welcomeImage.png";

export const Welcome = () => {
    return (
        <Box
            fullWidth
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                backgroundColor: "#FFE4C4"
            }}
        >
            <Typography variant="h3"
                sx={{ marginBottom: "20px", marginTop: "20px"}}
            >
                Wellcome to<Typography variant="i" sx={{color: "green"}}>Tickets!</Typography>
            </Typography>
            <Typography variant="h6" align="center">In Tickets you and your team can keep track of the developing phases of your project and assign tasks to your team members.</Typography>
            <Box>
                <Typography variant="h6">
                    <Link to="/sign-in" style={{ color: "orange", textDecoration: 'none' }}>Create </Link>
                    an account,
                    <Link to="/log-in" style={{ color: "orange", textDecoration: 'none' }}> login </Link>
                    or just take a look with one of our
                    <Link to="/log-in" style={{ color: "orange", textDecoration: 'none' }}> demo access!</Link>
                </Typography>
            </Box>

            <Grid container spacing={2} sx={{m:3}}>
                <Grid item xs={5}
                    sx={{
                        m:2,
                        marginLeft: "85px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "left",
                        justifyContent: "center"
                    }}
                >
                    <Stack direction="row" alignItems="center" gap={1}>
                        <KeyboardVoiceIcon color="success"/>
                        <Typography>...Create a place to communicate with your team.</Typography>
                    </Stack>
                    
                    <Stack direction="row" alignItems="center" gap={1}>
                        <ListAltIcon color="warning"/>
                        <Typography>...Keep a clear track of the developing of a task.</Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" gap={1}>
                        <ChatBubbleIcon color="primary"/>
                        <Typography>...Use the chat option on the issues page to communicate with your teammates.</Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" gap={1}>
                        <LocalSeeIcon color="secondary"/>
                        <Typography>...Or send images on the chat to have an enriched communication experience!</Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" gap={1}>
                        <LiveHelpIcon color="success"/>
                        <Typography>...Maybe ask for better instructions or clarification on a task?</Typography>
                    </Stack>
                    
                    <Stack direction="row" alignItems="center" gap={1}>
                        <SecurityIcon color="warning"/>
                        <Typography>...All of this and more by keeping some functionalities protected by roles!</Typography>
                    </Stack>
                    
                </Grid>
                <Grid item xs={5}>
                    <img 
                        className="welcomeImage"
                        src={WelcomeImage}
                        alt="app component.."
                        style={{
                            height:"100%",
                            width: "100%",
                            objectFit: "contain"
                        }}
                    />
                </Grid>
            </Grid>
            <LinkMui
                href={"https://github.com/Matevito/debug-client"}
                target="_blank"
                rel="nonreferrer"
                style={{ color: "inherit"}} underline="hover"
                sx={{ marginTop: "80px"}}
            >
                <GitHubIcon color="success" size="large"/>
            </LinkMui>
        </Box>
    )
}
