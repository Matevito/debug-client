import React, { useState, useEffect} from 'react'
import { useParams, useNavigate } from "react-router-dom";

// redux comp
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

// mui comp
import {
    Box,
    Grid,
    Typography,
    Card,
    Button
} from "@mui/material";

// app comp
import { LoadingPage } from "../components/LoadingPage";

// api comp
import api from "../features/api";


export const UserDetails = () => {
    const user = useSelector(selectUser);
    const userId = useParams().id;
    let navigate = useNavigate();

    // state values;
    const [userInfo, setUserInfo] = useState(null);
    const [authorized, setAuthorized] = useState(null)

    // set-up user info
    useEffect(() => {
        async function getUserInfo () {
            const config = {
                headers: { "auth-token" : user.token }
            };
            try {
                const userRes = await api.get(`/user/${userId}`, config)
                setUserInfo(userRes.data.data);
                setAuthorized(true)
            } catch(err) {
                setAuthorized(false);
                navigate("/protected-route")
            }
        } 
        if (user) {
            if (user.user.id === userId) {
                navigate("/user/info");
            } else {
                getUserInfo()
            }
        }
    }, [user, userId, navigate]);

    // make user admin;

    if (!user) {
        navigate("/");
    } else if (authorized === null) {
        return(
            <LoadingPage />
        )
    } else if (authorized === true) {
        <>user displayed info</>
    }
}
