import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

// redux state management
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

// mui components

// app components
import { LoadingPage } from "../components/LoadingPage";

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
            <div>
                issue get!!!
            </div>
        )
    }
}
