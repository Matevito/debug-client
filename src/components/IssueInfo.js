import React, { useState } from 'react'

// mui components
import {
    Card,
    CardContent,
    Typography,
    Grid,
} from "@mui/material";

// app components
import { simpleDate } from "../features/dateFormatter";

export const IssueInfo = ({ issue }) => {

    
    const [team, setTeam] = useState([]);

    return (
        <Card
            xs={{ 
                maxHeight: 345,
            }}
            raised={true}
        >
            <CardContent 
                sx={{ 
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "#dbd7cc"
                }}
                >
                <Typography variant="h6">Ticket information</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Typography variant="h7"><b>Title</b></Typography>
                        <Typography>{issue.title}</Typography>

                        <Typography variant="h7"><b>Description</b></Typography>
                        <Typography>{issue.description}</Typography>
                        
                        <Typography variant="h7"><b>Date of creation</b></Typography>
                        <Typography>{simpleDate(issue.date)}</Typography>

                    </Grid>
                    
                    <Grid item xs={6}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Typography variant="h7"><b>Priority</b></Typography>
                        <Typography>{issue.priority}</Typography>

                        <Typography variant="h7"><b>Type</b></Typography>
                        <Typography>{issue.type}</Typography>

                        <Typography variant="h7"><b>Status</b></Typography>
                        <Typography>{issue.status}</Typography>

                        <Typography variant="h7"><b>Team</b></Typography>
                    </Grid>
                </Grid>
                {issue.screenshots.length ? 
                    <>
                    <Typography variant="h7">
                    <b>Screenshots</b>
                    </Typography>
                    
                    </>
                    : <></>
                }
            </CardContent>
        </Card>
    )
}
