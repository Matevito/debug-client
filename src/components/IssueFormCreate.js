import React, { useState } from 'react'

// mui components

// app components
import { AuthError } from "./AuthError";

export const IssueFormCreate = ({ errors, projectId, handleSubmit }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [type, setType] = useState("");
    const [screenshots, setScreenshots] = useState([]);

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
        <div>
            issue form
        </div>
    )
}
