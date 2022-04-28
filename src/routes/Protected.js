import React from 'react'

// mui components
import { 
    Box,
    Typography
} from "@mui/material"
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';

export const Protected = () => {
    return (
        <Box
        fullWidth
            sx={{
                margin: "30px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <SecurityRoundedIcon fontSize="large" />
            <Typography variant="h1">Protected route</Typography>
            <Typography variant="span">
                You don't have the credentials or the user role to access this site.
                Check with an admin if you think you do!
            </Typography>
        </Box>
    )
}
