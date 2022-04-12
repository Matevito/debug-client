import React, { useState } from 'react'

import LoginSharpIcon from '@mui/icons-material/LoginSharp';
import MenuIcon from '@mui/icons-material/Menu';
import { 
    Container,
    Box,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem
    } from "@mui/material";

// redux state management
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

// Using Inline Styling


export const Header = ({ title }) => {
    const user = useSelector(selectUser);

    const [anchorNav, setAnchorNav] = useState(null)

    const handleOpenMenu = (e) => {
        setAnchorNav(e.currentTarget);
    };
    const handleCloseMenu = (e) => {
        setAnchorNav(null);
    }
    if (!user) {
        return(
            <AppBar position="static" color="success">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {title}
                    </Typography>

                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorNav}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            open={Boolean(anchorNav)}
                            onClose={handleCloseMenu}
                        >
                            <MenuItem onClick={handleCloseMenu}>
                                <Typography textAlign="center">
                                    <LoginSharpIcon color="success"/>Log in    
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseMenu}>
                                <Typography textAlign="center">
                                    <LoginSharpIcon color="success"/>Sign in    
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box >
                    </Toolbar>
                </Container>
            </AppBar>
        )
    } else {
        return (
            <div>logedin</div>
        )
    }
}
