import React from 'react'
import { Link } from "react-router-dom"

// mui components
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Stack,
    Button,
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

// app components
import { simpleDate } from "../features/dateFormatter";

export const IssueInfo = ({ issue, handlingTake, handlingLeave, userId }) => {
    
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
                {issue.handlingTeam.map(user => user._id).includes(userId) ?
                    <Button color="error"
                        onClick={handlingLeave}
                    >
                        Leave ticket!
                    </Button>
                    :
                    <Button
                        onClick={handlingTake}
                    >
                        Take ticket!
                    </Button>
                }
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
                        
                        <Typography variant="h7"><b>Created</b></Typography>
                        <Typography>{simpleDate(issue.date)}</Typography>
                        
                        {issue.screenshots.length ?
                            <Typography variant="h7">
                            <b>Screenshots</b>
                            </Typography>
                            :
                            <Typography variant="h7">
                                <b>No screenshots</b>
                            </Typography>
                        }
                        <Box sx={{ display: "flex", flexDirection:"row"}}>
                        {issue.screenshots.map((urlLink, index) => {
                            return(
                                <Link 
                                    to={urlLink}
                                    key={index}
                                    href={urlLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ color: "inherit"}} underline="hover"
                                >
                                    <Button >
                                        Screenshot {index + 1}
                                    </Button>
                                </Link>
                                
                            )
                        })}
                        </Box>
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

                        {issue.handlingTeam.length ? 
                            <Typography variant="h7"><b>Team</b></Typography>
                        : 
                            <Typography variant="h7"><b>No users assigned yet!</b></Typography>
                        }
                    
                        {issue.handlingTeam.map((user) => {
                            return(
                                <Link key={user._id} to={`/user/${user._id}`} style={{ color: "inherit", textDecoration: "inherit"}}>
                                    <Typography  component={'span'}>
                                        
                                            <Stack direction="row" alignItems="center" gap={1}>
                                                <PersonIcon color="success"/>
                                                {user.username}
                                            </Stack>
                                    </Typography>
                                </Link>
                            )
                        })}
                        
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
