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

    const handleTeamBoxes = (position) => {
        // update chekbox value
        const updatedTeamState = teamState.map((item, index) => {
            return index === position ? !item : item
        });
        setTeamState(updatedTeamState);

        // change team state
        const selectedUser = {
            user: usersList[position],
            value: !teamState[position]
        };
        
        if (team.length === 0 && selectedUser.value === true) {
            // if there are no team users assigned yet.
            setTeam([selectedUser.user.id]);
        } else {
            if ( selectedUser.value === true) {
                // add users to team
                const newTeam = [ ...team, selectedUser.user.id];
                setTeam(newTeam)
            } else {
                // remove user from team
                const newTeam = team.filter((id) => {
                    if (id !== selectedUser.user.id) return id
                });
                setTeam(newTeam);
            }
        };

        // if there's no team, a teamLeader cannot be selected
        if (team.length === 0) {
            setTeamLeader("");
        }

        // if a team leader is removed from team, set teamLeader as null
        if (selectedUser.value === false && teamLeader === selectedUser.user.id){
            setTeamLeader("");
        }
    };
    const handleMultipleSelect = (e) => {

    };
    const handleForm = (e) => {
        e.preventDefault();
        const formObject = {
            title,
            description,
            team,
            teamLeader
        };
        handleSubmit(formObject);
    }
    return (
        <>
            <form action="#" onSubmit={handleForm}>
                <AuthError error={errors} />
                <TextField 
                    fullWidth
                    label="Title"
                    value={title}
                    onChange={(e) => { setTitle(e.target.value) }}
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

                <Typography>
                    Team members
                </Typography>
                <FormGroup
                    row={true}
                >
                    {usersList.map((user, index) => {
                        // check value to true if user is in the team
                        return (
                            <FormControlLabel
                                key={index}
                                label={user.username}
                                control={
                                    <Checkbox 
                                        value={user.id}
                                        checked={team.includes(user.id) ? true : false}
                                        onChange={() => {
                                            handleTeamBoxes(index)
                                        }}
                                    />
                                }
                            />
                        )
                    })}
                </FormGroup>
            </form>
        </>
    )
}
