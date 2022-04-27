import React, { useState } from 'react'

import { Link } from "react-router-dom"
import {
    TableHead,
    Box,
    TableContainer,
    Table,
    Paper,
    TableBody,
    TableRow,
    TableCell,
    IconButton,
    Collapse,
    Typography,
    Button
} from "@mui/material"

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

// app comp
import { simpleDate } from "../features/dateFormatter";

// css color variables
const colorBlue = "#a3baf2";
const colorOrange = "#fedca5";
const colorHigh = "#cf6d5b";
const colorMid = "#dad473";
const colorLow = "#befb8f";


const Row = ({issue}) => {
    const [open, setOpen] = useState(false)
    let issueColor;
    if (issue.priority === "low"){
        issueColor = colorLow
    } else if (issue.priority === "mid"){
        issueColor = colorMid
    } else if (issue.priority === "high"){
        issueColor = colorHigh
    }
    return(
        <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset'}, }}  >
            <TableCell>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
                <Typography>{issue.title}</Typography>
            </TableCell>
            <TableCell
                align="left"
                sx={{backgroundColor: issueColor}}
            >
                <Typography>{issue.priority.toUpperCase()}</Typography>
            </TableCell>
            <TableCell align="left" sx={{backgroundColor: issue.status === "open" ? colorBlue : colorOrange}}>
                <Typography>{issue.status.toUpperCase()}</Typography>
            </TableCell>
            <TableCell align="left" >
                <Typography>{issue.type}</Typography>
            </TableCell>
        </TableRow>
        <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ m: 1}}>
                        <Typography variant="h6" gutterBottom component="div">
                            <i>{issue.title.toUpperCase()}</i>
                        </Typography>

                        <Table size="small">
                            <TableBody>
                                <TableRow>
                                    <TableCell><b>Date of Creation</b></TableCell>
                                    <TableCell>{simpleDate(issue.date)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>Handling Team</b></TableCell>
                                    {issue.handlingTeam.length <= 0 ? 
                                        <TableCell> No users assigned</TableCell> :
                                        issue.handlingTeam.map((issue) => {
                                            return <TableCell key={issue._id}>{issue.username}</TableCell>
                                        })
                                    }
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>Screenshots</b></TableCell>
                                    <TableCell align="left">
                                        {issue.screenshots.length > 0 ? 
                                        <>Yes</>:
                                        <>No</>
                                        }
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        
                        <Button
                            variant="contained"
                            color="warning"
                            size="small"
                            component={Link}
                            to={`/issue/${issue._id}/edit`}
                        >
                            <EditIcon /> edit ticket
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            component={Link}
                            to={`/issue/${issue._id}`}
                        >
                            <LibraryBooksIcon/> ticket details
                        </Button>
                        
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>   
        </>
    )
}

export const IssuesTable = ({ issues }) => {
    
    if (!issues.length) {
        return (
            <>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Typography variant="h5"> No issues yet!</Typography>
                </Box>
            </>
        )
    } else {
        return(
            <>
            <TableContainer component={Paper} > 
                <Table >
                    <TableHead sx={{ backgroundColor:"#c4c1c1"}}>
                        <TableRow>
                            <TableCell align="center" colSpan={5}>
                                PROJECT ISSUES
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell />
                            <TableCell align="left">TITLE</TableCell>
                            <TableCell align="left">PRIORITY</TableCell>
                            <TableCell align="left">STATUS</TableCell>
                            <TableCell align="left">TYPE</TableCell>
                        </TableRow>
                        
                    </TableHead>
                    <TableBody sx={{backgroundColor: "#d2d2d2"}}>
                        {issues.map((issue) => {
                            return <Row key={issue._id} issue={issue} />
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            </>
        )
    }
}
