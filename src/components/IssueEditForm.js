import React, { useState, useEffect } from 'react'

// mui components
import {
    Select,
    TextField,
    Typography,
    MenuItem,
    Button
} from "@mui/material";

// app components
import { AuthError } from "./AuthError";


export const IssueEditForm = ({ issue, handleSubmit, errors }) => {
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");
    const [type, setType] = useState("");

    // app variables;
    const statusValues = ["open", "aditional info needed", "in progress", "under review", "solved"];
    const priorityValues = ["low", "mid", "high"];
    const typeValues = ["bugg-error", "feature req", "documentation req"];

    useEffect(() => {
        if(issue) {
            setDescription(issue.issue.description)
            setStatus(issue.issue.status)
            setPriority(issue.issue.priority)
            setType(issue.issue.type)
        }
    }, [issue])
    const handleForm = (e) =>{
        e.preventDefault()

        const formData = {
            description,
            status,
            priority,
            type
        };

        handleSubmit(formData)
    }
    return (
        <>
        <form action="#" onSubmit={handleForm} >
            <AuthError error={errors} />
            <TextField
                fullWidth
                label="Title"
                value={issue.issue.title}
                disabled={true}
                variant="standard"
                margin="dense"
            />
            <TextField 
                fullWidth
                label="Description"
                value={description}
                onChange={(e) => { setDescription(e.target.value)}}
                variant="standard"
                multiline
                margin="dense"
            />
            <Typography sx={{marginTop: "3px"}}>
                Status
            </Typography>
            <Select
                value={status}
                fullWidth
                onChange={(e) => setStatus(e.target.value)}
            >
                {statusValues.map((value, index) => {
                    return(
                        <MenuItem key={index} value={value}>
                            {value}
                        </MenuItem>
                    )
                })}
            </Select>

            <Typography sx={{ marginTop: "3px"}}>
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
                })}
            </Select>

            <Typography sx={{ marginTop: "3px"}}>
                Type
            </Typography>
            <Select
                value={type}
                fullWidth
                onChange={(e) => setType(e.target.value)}
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
                })}
            </Select>

            <Button
                variant="contained"
                type="submit"
                fullWidth
                color="success"
                sx={{marginTop: "10px"}}
            >
                Edit ticket!
            </Button>
        </form>
        </>
    )
}
