import React from 'react'

// mui
import {
    Button,
    Box
} from "@mui/material"

export const FileUploader = ({ fileHandler }) => {
    const fileSelectHandler = e => {
        e.preventDefault();
        fileHandler(e.target.files[0])
    };

    return (
        <>
        <Box
            textAlign='center'
            sx={{ m: 0.5 }}
        >
            <label htmlFor="contained-button-file">
                <input 
                    type="file" 
                    id="contained-button-file"
                    onChange={fileSelectHandler}
                    style={{"display":"none"}}
                />
                <Button
                    variant="contained"
                    component="span"
                    color="success"
                >
                    Upload
                </Button>
            </label>
        </Box>
        </>
    )
}
