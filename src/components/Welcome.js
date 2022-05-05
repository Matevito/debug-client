import React from 'react'
import { Link } from "react-router-dom";

import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography
} from "@mui/material";

export const Welcome = () => {
    return (
        <Box
            fullWidth
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#FFE4C4"
            }}
        >
            <Typography variant="h3"
                sx={{ marginBottom: "20px", marginTop: "10px"}}
            >
                Wellcome to<Typography variant="i" sx={{color: "green"}}>Tickets!</Typography>
            </Typography>
            <Typography variant="h6">Tickets is an app where you and your team can keep track of the developing of your project and assign tasks to your team members.</Typography>
            <Box>
                <Typography variant="h6">
                    <Link to="/sign-in" style={{ color: "orange", textDecoration: 'none' }}>Create </Link>
                    an account,
                    <Link to="/log-in" style={{ color: "orange", textDecoration: 'none' }}> login </Link>
                    or just take a look with one of our
                    <Link to="/log-in" style={{ color: "orange", textDecoration: 'none' }}> demo access!</Link>
                </Typography>
            </Box>
            <Grid container spacing={2} sx={{m:2}}>
                <Grid item xs={6}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                </Grid>
                <Grid item xs={6}>
                    
                </Grid>
            </Grid>
        </Box>
    )
}
