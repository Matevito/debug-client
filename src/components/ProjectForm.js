import React, { useState, useEffect } from 'react'

export const ProjectForm = ({ usersList, errors, handleSubmit,  project }) => {
    // form state values;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [team, setTeam] = useState([]);
    const [teamLeader, setTeamLeader] = useState("");
    

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
            {usersList.map((user, i) => {
                return <div key={i}>{user.username}</div>
            })}
        </div>
    )
}
