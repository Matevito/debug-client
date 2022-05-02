import React, { useState } from 'react'

// mui comp
import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Chip,
    CircularProgress,
    Alert,
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
import SendIcon from '@mui/icons-material/Send';
import UploadIcon from '@mui/icons-material/Upload'

// app components
import { detailedDate } from "../features/dateFormatter";

const CommentForm = ({ handleSubmit }) => {
    const [message, setMessage] = useState("")
    const [screenshots, setScreenshots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)

    const handleForm = async(e) => {
        setError(false);
        // make form data
        e.preventDefault()
        const formData = new FormData();
        formData.append("message", message);
        screenshots.forEach((image) => {
            formData.append("screenshots", image)
        });
    
        setLoading(true);

        // call the rest-api
        const ApiRes = await handleSubmit(formData);

        // shut down loading animation
        setLoading(false)

        // if false set-up error;
        if(ApiRes === true ){
            setMessage("")
            setScreenshots([]);
        } else {
            setError(true)
        }; 
    };

    const hadleFileUploader = (e) => {
        const newFile = e.target.files[0]
        setScreenshots([...screenshots, newFile])
    };
    const handleFileDeleter = (fileIndex) => {
        const updatedScreenshots = screenshots.filter((file, index) => index !== fileIndex);
        setScreenshots(updatedScreenshots);
    }
    return (
        <>
            <Box sx={{display: "flex", flexDirection: "column", alignItems:"center"}} fullWidth>
                {loading ? 
                    <CircularProgress color="success" />
                    : <></>
                }
                {error ? 
                    <Alert severity="error">Error saving message. Try again later!</Alert>
                    : <></>
                }
            </Box>
            <Box textAlign="center" sx={{ m: 0.5 , diplay: "flex", flexDirection:"column"}}>
                {screenshots.map((image, index) => {
                    return( 
                            <Chip
                                key={index}
                                variant="outlined"
                                label={image.name}
                                value={index}
                                onDelete={() => handleFileDeleter(index)}
                            />
                    )
                })}
                
            </Box>
            <form action="#" onSubmit={handleForm}>
                    <Box
                        fullWidth
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            marginLeft: "30px",
                            marginRight: "30px",
                        }}
                    >       
                            <TextField 
                                fullWidth
                                variant="filled"
                                label="Message"
                                value={message}
                                onChange={(e) => { setMessage(e.target.value )}}
                            />
                            <Button variant="contained" color="success" size="small" type="file" component="label">
                                <input type="file" hidden onChange={hadleFileUploader}/>
                                <UploadIcon />
                            </Button>

                            <Button variant="contained" size="small" type="submit">
                                <SendIcon />
                            </Button>
                    </Box>
            </form>
        </>
    )
}

const Row = ({ comment }) => {
    return (
        <TableRow sx={{ '& > *': { borderBottom: 'unset'}, }} >
            <TableCell component="th" scope="row">
                <Typography>{comment.user.username}</Typography>
            </TableCell>
            <TableCell align="left" colSpan={4}>
                <Typography>{comment.message}</Typography>
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
            
            <TableContainer component={Paper} raised={true}
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
                                <Typography><b>Images</b></Typography>
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
