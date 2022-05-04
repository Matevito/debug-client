import React from 'react'

import { Link } from "react-router-dom";
import {
    Box,
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    IconButton,
    Typography,
    Button,
} from "@mui/material";
import BuildIcon from '@mui/icons-material/Build';

const colorHigh = "#cf6d5b";
const colorMid = " #ffc15c";
const colorLow = " #b8f8e7";

const Row = ({ issue, project}) => {
    let issueColor;
    if (issue.priority === "low"){
        issueColor = colorLow
    } else if (issue.priority === "mid"){
        issueColor = colorMid
    } else if (issue.priority === "high"){
        issueColor = colorHigh
    };
    return (
        <TableRow>
            <TableCell>
                {issue.title}
            </TableCell>

            <TableCell sx={{ backgroundColor: issueColor}} align="center">
                <Typography>{issue.priority}</Typography>
            </TableCell>

            <TableCell>{issue.type}</TableCell>

            <TableCell>
                <Link
                    to={`/project/${project._id}`}
                    style={{ color: "inherit", textDecoration: "none"}} 
                >
                    {project.title}
                </Link>
            </TableCell>
            
            <TableCell>
                <Link
                    to={`/issue/${issue._id}`}
                    style={{ color: "inherit"}} underline="hover"
                >
                    <BuildIcon/>
                </Link>
            </TableCell>
        </TableRow>
    )
}

export const UserTicketsTable = ({ issues, projects}) => {
    if(!issues.length) {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Typography variant="h5"> No issues assigned yet!</Typography>
            </Box>
        )
    } else {
        return (
            <TableContainer sx={{height: 350, backgroundColor: "#FFE4B5"}}>
                <Table sx={{ backgroundColor: "#FFE4B5"}}>
                    <TableHead sx={{backgroundColor: "#F4A460"}}>
                        <TableRow>
                            <TableCell align="center" colSpan={5}>
                                USER TICKETS
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">TITLE</TableCell>
                            <TableCell align="left">PRIORITY</TableCell>
                            <TableCell align="left">TYPE</TableCell>
                            <TableCell align="left">PROJECT</TableCell>
                            <TableCell align="left">LINK</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ backgroundColor: "#FFE4B5"}}>
                        {issues.filter(i => i.status !== "solved").map((issue, index) => {
                            const issueProject = projects.find(project => project._id === issue.project);
                            return (
                                <Row key={index} issue={issue} project={issueProject} />
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}
