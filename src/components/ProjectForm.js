import React, { useState, useEffect } from 'react'

// mui components
import {
    Button,
    TextField,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Typography
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
    const [LeaderBoxesState, set] = useState([]);
    
    // set teamState values
    useEffect(() => {
        if(!project) {
            setTeamState(
                new Array(usersList.length).fill(false)
            )
        }
    }, [usersList]);

    useEffect(() => {
        if (project) {
            setTitle(project.title);
            setDescription(project.setDescription);
            setTeam(project.team);
            setTeamLeader(project.teamLeader);
            // set values of teamState and teamLState
        }
    },[])

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
                const newTeam = team.filter((id) => {
                    if (id !== selectedUser.user.id){
                        return id
                    }
                });
                // check if user is in the array
                // remove user from the array
                setTeam(newTeam);
            }
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
                <FormGroup
                row={true}
                >
                    {team.map((id, index) => {
                        const userData = usersList.find((user) => user.id === id);
                        return <div key={index}>{userData.username}</div>
                    })}
                </FormGroup>
                <Button
                    variant="contained"
                    type="sybmit"
                    fullWidth
                    color="success"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </form>
        </>
    )
}
