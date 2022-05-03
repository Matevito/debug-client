import React from 'react'

// mui comp
import {
    Box,
    Card,
    CardContent,
    TableContainer,
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    Typography,
    Paper,
    Link
} from "@mui/material"

// app components
import { detailedDate } from "../features/dateFormatter";
import { CommentForm } from "./CommentForm";

const Row = ({ comment }) => {
    return (
        <TableRow sx={{ '& > *': { borderBottom: 'unset'}, }} >
            <TableCell component="th" scope="row">
                <Typography>{comment.user.username}</Typography>
            </TableCell>
            <TableCell align="left" colSpan={4}>
                <Typography><div dangerouslySetInnerHTML={{__html: comment.message}} /></Typography>
            </TableCell>
            <TableCell align="center">
                <Typography>
                    {comment.screenshots.length ? 
                        comment.screenshots.map((url, index) => {
                            return(
                                <Link
                                    key={index}
                                    href={url}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ color: "inherit"}} underline="hover"
                                >
                                    {index+1}
                                </Link>
                            )
                        })
                        :"None"
                    }
                </Typography>
            </TableCell>
            <TableCell align="left">
                <Typography>{detailedDate(comment.date)}</Typography>
            </TableCell>
        </TableRow>
    )
}

export const IssueComments = ({ comments, handleSubmit }) => {
    return (
        <Box sx={{marginTop: "30px" }}>
            
            <TableContainer component={Paper} raised="true"
                sx={{ 
                    height: 455,
                    backgroundColor:"#c4c1c1",
                    Width: "100%"
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={7}>
                                <Typography><b>Issue Comments</b></Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">
                                <Typography><b>User</b></Typography>
                            </TableCell>
                            <TableCell align="left" colSpan={4}> 
                                <Typography><b>Comment</b></Typography>
                            </TableCell>
                            <TableCell align="left">
                                <Typography><b>Images</b></Typography>
                            </TableCell>
                            <TableCell align="left">
                                <Typography><b>Created</b></Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {comments.slice(0).reverse().map((comment, index) => {
                            return (
                                <Row key={index} comment={comment} />
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <Card raised={true} sx={{marginTop: "30px"}}>
                <CardContent sx={{backgroundColor: "#dbd7cc",}}>
                    <CommentForm handleSubmit={handleSubmit}/>
                </CardContent>
            </Card>
        </Box>
    )
}
