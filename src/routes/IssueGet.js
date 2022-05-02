import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

// redux state management
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";

// mui components
import {
    Box,
    Grid,
    Button
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// app components
import { LoadingPage } from "../components/LoadingPage";
import { IssueInfo } from "../components/IssueInfo";
import { ChangeLog } from "../components/ChangeLog";
import { IssueComments } from "../components/IssueComments";

// api comp
import  api from "../features/api";
import get_userInfo from '../features/get_userInfo';

export const IssueGet = () => {
    const user = useSelector(selectUser);
    const issueId = useParams().id;
    let navigate = useNavigate()
    const dispatch = useDispatch();
    
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
    }, [user, issueId, navigate])

    const handlingTake = async() => {
        const url = `/issue/${issueId}/take-issue`;
        const config = {
            headers: { "auth-token" : user.token }
        };
        try {
            // take issue
            await api.put(url, {}, config);

            // refresh issueInfo
            const issueRes = await api.get(`/issue/${issueId}`, config);
            setIssueInfo(issueRes.data.data);
        } catch (err) {
            console.log(err)
        }
    };

    const handlingLeave = async() => {
        const url = `/issue/${issueId}/leave-issue`
        const config = {
            headers: { "auth-token" : user.token }
        };
        try {
            // leave issue
            await api.put(url, {}, config);

            // refresh issueInfo
            const issueRes = await api.get(`/issue/${issueId}`, config);
            setIssueInfo(issueRes.data.data);
        } catch (err) {
            console.log(err)
        }
    };

    const handleDelete = async() => {
        const url = `/issue/${issueId}`;
        const config = {
            headers: { "auth-token" : user.token }
        };
        
        try {
            // delete issue
            await api.delete(url, config);

            // return to project route
            const projectUrl = `/project/${issueInfo.issue.project}`;
            const userData = await get_userInfo(user.token);
            dispatch(login(userData))
            navigate(projectUrl)
        } catch (err) {
            navigate("/protected-route")
        }
    };

    const handleSubmitComments = async(form) => {
        const url = `/issue/${issueId}/comment`;
        const config = {
            headers: { 
                "auth-token" : user.token,
                'Content-Type': 'multipart/form-data',
            }
        };

        try {
            // save comment
            const commentRes = await api.post(url, form, config);
            const newCommentList = commentRes.data.data.commentList

            // set-up comments value
            let newIssueInfo = { ...issueInfo}
            newIssueInfo.comments = newCommentList;
            setIssueInfo(newIssueInfo)

            // send form render-handler
            return true
        } catch (err) {
            // send form render-hanlder
            return false
        }
    }
    if (!user) {
        navigate("/")
    } else if (authorized === null) {
        return (
            <LoadingPage />
        )
    } else if (authorized === true) {
        return (
            <Box
                fullWidth
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh",
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Box sx={{m:2}}>
                            <IssueInfo 
                                issue={issueInfo.issue}
                                handlingTake={handlingTake}
                                handlingLeave={handlingLeave}
                                userId={user.user.id}
                            />
                            <ChangeLog changeLog={issueInfo.changeLog}/>
                        </Box>
                    </Grid>
                    <Grid item xs={6} >
                        <Box
                            justifyContent="flex-end"
                            sx={{
                                marginTop: "3px",
                                marginRight: "3px",
                                display: "flex",
                                flexDirection: "row"
                            }}
                        >
                            <Button
                                variant="contained"
                                color="warning"
                                size="small"
                                component={Link}
                                to={`/issue/${issueInfo.issue._id}/edit`}
                            >
                                <EditIcon />
                            </Button>

                            {user.user.role === "Admin" ?
                                <Button
                                    variant="contained"
                                    color="error"
                                    size="small"
                                    onClick={handleDelete}
                                >
                                    <DeleteIcon />
                                </Button>
                                :
                                <></>
                            }
                        </Box>
                        <IssueComments 
                            comments={issueInfo.comments}
                            handleSubmit={handleSubmitComments}
                        />
                    </Grid>
                </Grid>
            </Box>
        )
    }
}
