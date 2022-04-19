import React, { useState, useEffect } from 'react'

export const ProjectForm = ({ usersList, project, handleSubmit }) => {
    // form state values;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [team, setTeam] = useState([]);
    const [teamLeader, setTeamLeader] = useState("");
    const [usersDB, setusersDB] = useState(usersList)
    
    useEffect(() => {
        if (project) {
            setTitle(project.title);
            setDescription(project.setDescription);
            setTeam(project.team);
            setTeamLeader(project.teamLeader);
        }
    },[])

    return (
        <div>
            project form
        </div>
    )
}
