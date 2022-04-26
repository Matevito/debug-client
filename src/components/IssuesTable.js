import React, { useState } from 'react'

import {
    TableHead,
    TableContainer,
    Table,
    Paper,
    TableBody,
    TableRow,
    TableCell,
    IconButton,
    Collapse,
    Typography
} from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

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
                {issue.priority}
            </TableCell>
            <TableCell align="left" sx={{backgroundColor: issue.status === "open" ? colorBlue : colorOrange}}>
                <Typography>{issue.status}</Typography>
            </TableCell>
            <TableCell align="left" >
                <Typography>{issue.type}</Typography>
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <div>todo...</div>
                </Collapse>
            </TableCell>
        </TableRow>   
        </>
    )
}

export const IssuesTable = ({ issues }) => {
    
    return(
        <>
        <TableContainer component={Paper} > 
            <Table >
                <TableHead sx={{ backgroundColor:"#c4c1c1"}}>
                    <TableRow>
                        <TableCell align="center" colSpan={5}>
                            Project Issues
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell />
                        <TableCell align="left">Title</TableCell>
                        <TableCell align="left">Priority</TableCell>
                        <TableCell align="left">Status</TableCell>
                        <TableCell align="left">Type</TableCell>
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
