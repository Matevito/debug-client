import React, { useState, useEffect } from 'react'

// redux state management
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

// mui comp
import {
    Box,
    Card,
    TextField,
    Button,
    Stack
} from "@mui/material"
import SendIcon from '@mui/icons-material/Send';

// app components
import { detailedDate } from "../features/dateFormatter";
import { AuthError } from "../features/dateFormatter";

// api com
import api from "../features/api";

const CommentForm = ({ handleSubmit }) => {
    const [message, setMessage] = useState("")

    const handleForm = async(e) => {
        e.preventDefault()
        const sendForm = { message };
        //todo: set loading animation

        const ApiRes = await handleSubmit(sendForm);

        // if false set-up error;
        if(ApiRes === true ){
            setMessage("")
        }
    }
    return (
        <form action="#" onSubmit={handleForm}>
            <Box
                sx={{
                    marginBottom: "50px",
                    marginLeft: "30px",
                    marginRight: "30px",
                    display: "flex",
                    flexDirection: "row"
                }}
            >   
                    <TextField 
                        fullWidth
                        variant="filled"
                        label="Message"
                        value={message}
                        onChange={(e) => { setMessage(e.target.value )}}
                    />
                    <Button variant="contained" size="small" type="submit">
                        <SendIcon />
                    </Button>
            </Box>
        </form>
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
                    return (
                        <div key={index}>{comment.message}</div>
                    )
                })}

            </div>
        </Card>
    )
}
