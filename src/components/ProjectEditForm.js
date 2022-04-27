import React, { useState, useEffect } from 'react'

// mui components
import {
    Button,
    TextField,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Typography,
    Select,
    MenuItem
} from "@mui/material"

// app components
import { AuthError } from "./AuthError"

export const ProjectEditForm = ({usersList, handleSubmit, project, errors}) => {
    // form state values;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [team, setTeam] = useState([]);
    const [teamLeader, setTeamLeader] = useState("");
    
    // chekBox states
    const [teamState, setTeamState] = useState([]);

    useEffect(() => {
        if (project && usersList) {
            // set up project values;
            setTitle(project.data.title);
            setDescription(project.data.description);
            setTeamLeader(project.data.teamLeader._id)

            // set up team values;
            const teamIds = project.data.team.map((user) => user._id)
            setTeamState(
                usersList.map((user) => {
                    const userId = user.id;
                    console.log(userId)
                    if (teamIds.includes(userId)){
                        return true
                    } else {
                        return false
                    }
                })
            )
            setTeam(teamIds)
        }
        
    }, [project, usersList])
    return (
        <div>
            form todo...
        </div>
    )
}
