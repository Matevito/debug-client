import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

// redux state management
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

// mui components
import {
    Box,
    Grid
} from "@mui/material";

// app components
import { LoadingPage } from "../components/LoadingPage";
import { IssueInfo } from "../components/IssueInfo";
import { ChangeLog } from "../components/ChangeLog";
import { IssueComments } from "../components/IssueComments";

// api comp
import  api from "../features/api";

export const IssueGet = () => {
    const user = useSelector(selectUser);
    const issueId = useParams().id;
    let navigate = useNavigate()

    // state values;
    const [issueInfo, setIssueInfo] = useState(null);
    const [authorized, setAuthorized] = useState(null)

    // set up issueInfo state value
    useEffect(() => {
        async function getIssueInfo() {
            const config = {
                headers: { "auth-token" : user.token }
            };

            try {
                const issueRes = await api.get(`/issue/${issueId}`, config);
                setIssueInfo(issueRes.data.data);
                setAuthorized(true)
            } catch (err) {
                setAuthorized(false);
                if (err.status === 401 || err.response.status === 401 ) {
                    navigate("/protected-route")
                } else{ 
                    navigate("/404")
                }
            }
        }
        if (user) {
            getIssueInfo()
        }
    }, [user, issueId])

    if (!user) {
        navigate("/")
    } else if (authorized === null) {
        return (
            <LoadingPage />
        )
    } else if (authorized === true) {
        return (
            <Box
                sx={{
                    marginTop: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh",
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={7} 
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                >
                        <IssueInfo issue={issueInfo.issue}/>
                        <ChangeLog changeLog={issueInfo.changeLog}/>
                    </Grid>
                    <Grid item xs={5} sx={{ backgroundColor: "orange"}}>
                        <IssueComments comments={issueInfo.comments}/>
                    </Grid>
                </Grid>
            </Box>
        )
    }
}
