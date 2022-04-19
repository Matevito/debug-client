import React from 'react'
import { useNavigate } from "react-router-dom";
// redux state management
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

// app components

export const ProjectCreate = () => {
    const user = useSelector(selectUser);
    let navigate = useNavigate();
    if (!user) {
        // nvigate to /home
        navigate("/")
    } else if (user.user.role !== "Admin") {
        //navigate to "/protected-route"
        navigate("/protected-route")
    } else {
        return (
            <div>
                project form
            </div>
        )
}
}
