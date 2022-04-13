import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import { Button, Typography } from "@mui/material";

export const DemoLinks= ({ handleDemo }) => {
    const handleDev = () => {
        const url = '/demo/developer';
        handleDemo(url);
    };
    const handleTeamL = () => {
        const url = '/demo/teamLeader';
        handleDemo(url);
    };
    const handleAdmin = () => {
        const url = '/demo/developer';
        handleDemo(url);
    }
    return (
        <>
        <Typography component="h5" variant="h5" align="center">
            Demo links
        </Typography>
        <Button 
            variant="contained"
            type="submit"
            fullWidth
            color="warning"
            onClick={handleDev}
        >
            <PersonIcon />
            Developer demo
        </Button>
        <p></p>
        <Button 
            variant="contained"
            type="submit"
            fullWidth
            color="warning"
            onClick={handleTeamL}
        >
            <PersonIcon />
            Team Leader demo
        </Button>
        <p></p>
        <Button 
            variant="contained"
            type="submit"
            fullWidth
            color="warning"
            onClick={handleAdmin}
        >
            <PersonIcon />
            Admin Demo
        </Button>
        </>
    )
}
