import React from 'react'
import { useNavigate } from "react-router-dom";

// redux comp
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";



export const UserInfo = () => {
    const user = useSelector(selectUser);
    let navigate = useNavigate();

    if (!user) {
        navigate("/")
    } else {
        return (
            <>todo...</>
        )
    }
}
