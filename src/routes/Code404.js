import React from 'react'

// mui components
import { 
    Box,
    Typography
} from "@mui/material"
import ReportGmailerrorredRoundedIcon from '@mui/icons-material/ReportGmailerrorredRounded';

export const Code404 = () => {
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
            <ReportGmailerrorredRoundedIcon fontSize="large"/>
            <Typography variant="h1">404 ERROR!</Typography>
            <Typography variant="span">
                The page you are searching does not exist! If you think it should, comunicate with an admin or refresh the page.
            </Typography>
        </Box>
    )
}
