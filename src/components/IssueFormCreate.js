import React, { useState } from 'react'

// mui components
import {
    TextField,
    Button,
    Typography,
    Select,
    MenuItem
} from "@mui/material"

// app components
import { AuthError } from "./AuthError";
import { FileUploader } from "./FileUploader";

export const IssueFormCreate = ({ errors, projectId, handleSubmit }) => {
    // comp state values
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [type, setType] = useState("");
    const [screenshots, setScreenshots] = useState([]);

    // app variables
    const priorityValues = ["low", "mid", "high"];
    const typeValues = ["bugg-error", "feature req", "documentation req"];

    // comp funct
    const handleFileUploader = (file) => {
        
        setScreenshots([...screenshots, file])
    }
    const handleForm = (e) => {
        e.preventDefault()
        const formObject = {
            title,
            description,
            priority,
            type,
            screenshots,
            project: projectId
        };
        handleSubmit(formObject)
    }
    return (
        <>
        <form action="#" onSubmit={handleForm}>
            <AuthError error={errors} />
            <TextField 
                fullWidth
                label="Title"
                defaultValue={title}
                onChange={(e) => { setTitle(e.target.value )}}
                variant="standard"
                margin="dense"
            />
            <TextField 
                    fullWidth
                    label="Description"
                    defaultValue={description}
                    onChange={(e) => { setDescription(e.target.value)}}
                    variant="standard"
                    multiline
                    margin="dense"
            />
            <Typography >
                Priority
            </Typography>
            <Select
                value={priority}
                fullWidth
                onChange={(e) => setPriority(e.target.value)}
            >
                {priorityValues.map((value, index) => {
                        return(
                            <MenuItem
                                key={index}
                                value={value}
                            >
                                {value}
                            </MenuItem>
                        )
                    })
                }
            </Select>
            <Typography>
                Type
            </Typography>
            <Select
                value={type}
                fullWidth
                onChange={(e) => {setType(e.target.value)}}
            >
                {typeValues.map((value, index) => {
                        return(
                            <MenuItem
                                key={index}
                                value={value}
                            >
                                {value}
                            </MenuItem>
                        )
                    })
                }
            </Select>
            <div>screenshots</div>
            <FileUploader 
                fileHandler={handleFileUploader}
            />
            <Button
                    variant="contained"
                    type="sybmit"
                    fullWidth
                    color="success"
            >
                Submit
            </Button>
        </form>
        </>
    )
}
