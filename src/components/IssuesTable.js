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
    Collapse
} from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Row = ({issue}) => {
    const [open, setOpen] = useState(false);

    return(
        <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">{issue.title}</TableCell>
            <TableCell
                align="left"
            >
                {issue.priority}
            </TableCell>
            <TableCell align="left" >{issue.status}</TableCell>
            <TableCell align="left" >{issue.type}</TableCell>
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
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
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
                <TableBody>
                    {issues.map((issue) => {
                        return <Row key={issue._id} issue={issue} />
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    )
}
