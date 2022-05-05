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
export const ProjectForm = ({ usersList, errors, handleSubmit,  project }) => {
    // form state values;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [team, setTeam] = useState([]);
    const [teamLeader, setTeamLeader] = useState("");
    
    // chekBox states
    const [teamState, setTeamState] = useState([]);
    
    // set teamState values
    useEffect(() => {
        if(!project) {
            setTeamState(
                new Array(usersList.length).fill(false)
            )
        }
    }, [usersList, project]);

    const handleTeamBoxes = (position) => {
        // change checkbox state
        const updatedTeamState = teamState.map((item, index) => {
            return index === position ? !item : item
        });

        setTeamState(updatedTeamState);

        // change team-form state
        const selectedUser = {
            user: usersList[position],
            value: !teamState[position]
        };
        if (team.length === 0 && selectedUser.value === true){
            setTeam([selectedUser.user.id])
        } else {
            // add team members
            if (selectedUser.value === true) {
                // check array if the user is already there
                
                // add user to the array
                const newTeam = [ ...team, selectedUser.user.id];
                setTeam(newTeam)
                
            } else {
                // remove team members from project
                const newTeam = team.filter(id =>  id !== selectedUser.user.id );
                // check if user is in the array
                // remove user from the array
                setTeam(newTeam);
            }
        }
        // if theres no team a leader cannot be selected
        if (team.length === 0) {
            setTeamLeader("");
        };
        // if a user is removed from the team and is a leader, is removed it's value there too
        if (selectedUser.value === false && teamLeader === selectedUser.user.id){
            setTeamLeader("");
        }
    }
    const handleMultipleSelect = (e) => {
        const selectedUserId = e.target.value
        if (!team.includes(selectedUserId)){
            setTeamLeader("")
        } else {
            setTeamLeader(e.target.value);
        }
    }
    const handleForm = (e) => {
        e.preventDefault();
        const formObject = {
            title: title,
            description: description,
            team: team,
            teamLeader: teamLeader
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
                        Team members
                </Typography>
                <FormGroup
                    row={true}
                >
                    {usersList.map((user, index) => {
                        return (
                            <FormControlLabel 
                            key={index}
                            label={user.username}
                            control={
                                <Checkbox 
                                value={user.id}
                                onChange={() => handleTeamBoxes(index)} 
                                />
                                }
                            />
                        )
                    })}
                </FormGroup>
                <Typography >
                    Team Leader
                </Typography>
                
                <Select
                    onChange={handleMultipleSelect}
                    fullWidth
                    value={teamLeader}
                >
                    {
                        team.map((id, index) => {
                            const userData = usersList.find((user) => user.id === id);
                            return (
                                <MenuItem
                                    key={id}
                                    value={id}
                                >
                                    {userData.username}
                                </MenuItem>
                            )
                        })
                    }
                </Select>
                <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    color="success"
                >
                    Submit
                </Button>
            </form>
        </>
    )
}
