import React from 'react'

// mui components
import {
    Box,
    Container,
    AppBar,
    Toolbar,
    Typography,
    CssBaseline,
    Drawer
} from "@mui/material";

const drawerWidth = 100;

export const NavBar = ({user}) => {
    return (
            <AppBar position="static" color="success" sx={{ heigth: "100%"}} >
                <Container >
                    <Toolbar disableGutters >
                        <Typography variant="h6" component="div">
                            {user.user.username} ({user.user.role})
                        </Typography>
                    </Toolbar>
                    addsakldsa
                </Container>
                <li>sad</li>
                <li>sad</li>
                <li>sad</li>
                <li>sad</li>
                <li>sad</li>
                <li>sad</li>
                <li>sad</li>

            </AppBar>
    )
}
