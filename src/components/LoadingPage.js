import React from 'react'

// mui comp
import {
    Box,
    CircularProgress
} from "@mui/material";

export const LoadingPage = () => {

    return (
        <Box
            sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
            fullWidth
        >
            <CircularProgress 
                color="success"
                size={350}
                
            />
        </Box>
    )
}
