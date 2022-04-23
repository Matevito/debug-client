import React from 'react'

// mui
import {
    Button,
    Box,
    Chip
} from "@mui/material"

export const FileUploader = ({ screenshots, fileHandler, deleteFile }) => {
    const fileSelectHandler = e => {
        e.preventDefault();
        fileHandler(e.target.files[0])
    };
    const handleDelete = (imageIndex) => {
        deleteFile(imageIndex);
    }
    return (
        <>
        {
            screenshots.map((image, index) => {
                return(
                    <Box
                        textAlign='center'
                        key={index}
                    >
                        <Chip
                        label={image.name}
                        variant="outlined"
                        value={index}
                        onDelete={() => handleDelete(index)}
                    />
                    </Box>
                )
            })
        }
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
