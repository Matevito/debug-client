import React from 'react'

// mui comp
import { 
    Card,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Box,
    Typography,
} from '@mui/material'

// app comp
import { detailedDate } from "../features/dateFormatter";

const Row = ({ log }) => {
    //  conditional if team is changed
    if (log.property === "handlingTeam") {
        return (
            <TableRow sx={{ '& > *': { borderBottom: 'unset'}, }}>
                <TableCell component="th" scope="row">
                    <Typography>Team</Typography>
                </TableCell>

                {log.oldValue.length < log.newValue.length ? 
                    <TableCell align="center" colSpan={3}>
                        <Typography>{log.user.username} has joined the team!</Typography>
                    </TableCell>
                    :
                    <TableCell align="center" colSpan={3}>
                        <Typography>{log.user.username} has leaved the team!</Typography>
                    </TableCell>
                }

                <TableCell align="left">
                    <Typography>{detailedDate(log.date)}</Typography>
                </TableCell>
            </TableRow>
        )
    } else {
        return (
            <TableRow sx={{ '& > *': { borderBottom: 'unset'}, }} >
                <TableCell component="th" scope="row">
                    <Typography>{log.property}</Typography>
                </TableCell>
    
                <TableCell align="left">
                    <Typography>{log.user.username}</Typography>
                </TableCell>
    
                <TableCell align="left">
                    <Typography>{log.oldValue}</Typography>
                </TableCell>
    
                <TableCell align="left">
                    <Typography>{log.newValue}</Typography>
                </TableCell>
    
                <TableCell align="left">
                    <Typography>{detailedDate(log.date)}</Typography>
                </TableCell>
            </TableRow>
        )
    }
}

export const ChangeLog = ({ changeLog }) => {
    return (

        <TableContainer 
            
            component={Paper}
            sx={{ 
                marginTop: "10px"
                ,height: 400,
                width: '100%'}}>
            <Table>
                <TableHead sx={{ backgroundColor:"#c4c1c1"}}>
                    <TableRow>
                        <TableCell align="center" colSpan={5}>
                            TICKET CHANGELOG!
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Property</TableCell>
                        <TableCell>User</TableCell>
                        <TableCell>Old value</TableCell>
                        <TableCell>New value</TableCell>
                        <TableCell>Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{ backgroundColor:"#c4c1c1" }}>
                    {changeLog.slice(0).reverse().map((log, index) => {
                        return <Row key={index} log={log} />
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
