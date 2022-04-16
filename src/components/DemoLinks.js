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
        const url = '/demo/admin';
        handleDemo(url);
    }
    return (
        <>
        <p></p>
        <Typography component="h5" variant="h5" align="center" >
            Demo preview
        </Typography>
        <Button 
            variant="contained"
            type="submit"
            fullWidth
            color="warning"
            onClick={handleDev}
            data-testid="developer"
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
            data-testid="team_l"
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
            data-testid="admin_demo"
        >
            <PersonIcon />
            Admin Demo
        </Button>
        </>
    )
}
