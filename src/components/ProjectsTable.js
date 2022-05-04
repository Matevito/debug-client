import React from 'react'

import { Link } from "react-router-dom";
import {
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BuildIcon from '@mui/icons-material/Build';

const Row = ({project}) => {
    
    return(
        <TableRow>
            <TableCell colSpan={2}>{project.title}</TableCell>
            <TableCell align="center">
                <Link 
                    to={`/user/${project.teamLeader}`}
                    style={{ color: "inherit", textDecoration: "none"}}
                >
                    <AccountCircleIcon />
                </Link>
            </TableCell>
            <TableCell align="center">{project.issues}</TableCell>
            <TableCell align="center">{project.solvedIssues}</TableCell>
            <TableCell align="center">
                <Link
                    to={`/project/${project._id}`}
                    style={{ color: "inherit"}} underline="hover"
                >
                    <BuildIcon/>
                </Link>
            </TableCell>
        </TableRow>
    )
}
export const ProjectsTable = ({ projects, title }) => {
    return (
        <TableContainer sx={{height: 350, backgroundColor: "#FFE4B5"}}>
            <Table sx={{ backgroundColor: "#FFE4B5"}}>
                <TableHead sx={{backgroundColor: "#F4A460"}}>
                    <TableRow>
                        <TableCell align="center" colSpan={6}>
                            {title}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left" colSpan={2}>PROJECT</TableCell>
                        <TableCell align="left">TEAM LEADER</TableCell>
                        <TableCell align="left">ISSUES</TableCell>
                        <TableCell align="left">ISSUES SOLVED</TableCell>
                        <TableCell align="left">LINK</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{ backgroundColor: "#FFE4B5"}}>
                    {projects.map((project, index) => {
                        return (
                            <Row key={index} project={project} />
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
