import React, { useState, useEffect } from 'react'

// mui comp
import {
    Box,
    Card,
    TextField,
    Button,
    Chip
} from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import UploadIcon from '@mui/icons-material/Upload'

// app components
import { detailedDate } from "../features/dateFormatter";

// api com
import api from "../features/api";

const CommentForm = ({ handleSubmit }) => {
    const [message, setMessage] = useState("")
    const [screenshots, setScreenshots] = useState([]);

    const handleForm = async(e) => {
        e.preventDefault()
        const sendForm = { message };

        //todo: set loading animation

        const ApiRes = await handleSubmit(sendForm);
        // shut down loading animation
        
        // if false set-up error;
        if(ApiRes === true ){
            setMessage("")
        } else {

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
            <Box
                textAlign="center"
                sx={{ m: 0.5 , diplay: "flex", flexDirection:"column"}}
            >
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
                            marginBottom: "50px",
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
                            <Button 
                                variant="contained" color="success" size="small"
                                type="file" component="label"
                            >
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

export const IssueComments = ({ comments, handleSubmit }) => {
    return (
        <Card
            sx={{
                marginTop: "30px",
            }}
        >
            <CommentForm handleSubmit={handleSubmit}/>

            <div>
                {comments.slice(0).reverse().map((comment, index) => {
                    const msg = comment.message
                    return (
                        <div key={index}>{msg}</div>
                    )
                })}

            </div>
        </Card>
    )
}
