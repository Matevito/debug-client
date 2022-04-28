import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom" 

// redux state management
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";

// mui components
import { Box, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

// app components
import { IssueEditForm } from "../components/IssueEditForm";

// api comp
import api from "../features/api";
import get_userInfo from "../features/get_userInfo";

export const IssueEdit = () => {
    const user = useSelector(selectUser);
    const issueId = useParams().id;
    let navigate = useNavigate();
    const dispatch = useDispatch()

    const [authorized, setAuthorized] = useState(null);
    const [issueInfo, setIssueInfo] = useState(null);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        async function getIssueInfo() {
            const config = {
                headers: { "auth-token" : user.token}
            };
            try {
                const issueRes = await api.get(`/issue/${issueId}`, config);
                setIssueInfo(issueRes.data.data)
                setAuthorized(true)
            } catch (err) {
                if (err.response.status === 401 || err.status === 401) {
                    navigate("/protected-route")
                } else {
                    navigate("/404")
                }
            }
        };
        if (user) {
            getIssueInfo()
        }
    }, [user, issueId, navigate]);

    const handleEdit = async (form) => {
        const url = `/issue/${issueId}`;
        const config = {
            headers: { "auth-token" : user.token }
        };

        try {
            await api.put(url, form, config);
            
            const userData = await get_userInfo(user.token);
            dispatch(login(userData))
            navigate(`/issue/${issueId}`)
        } catch(err) {
            setErrors(err.response.data.error);
        }
    }
    if (!user) {
        navigate("/");
    } else if (authorized === null) {
        return (
            <>loading...</>
        )
    } else if (authorized === true) {
        return(
            <Box
                sx={{
                    marginTop: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: 'center',
                }}
                fullWidth
            >
                <EditIcon fontSize="large"/>
                <Typography component="h1" variant="h5">
                    Edit Issue-Ticket
                </Typography>
                <p></p>
                <form></form>
                <IssueEditForm
                    issue={issueInfo}
                    handleSubmit={handleEdit}
                    errors={errors}
                />
            </Box>
        )
    }
}
