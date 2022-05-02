import React, { useState } from 'react'

// mui comp
import {
    Box,

    TextField,
    Button,
    Chip,
    CircularProgress,
    Alert,
} from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import UploadIcon from '@mui/icons-material/Upload'


export const CommentForm = ({ handleSubmit }) => {
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