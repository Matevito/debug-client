import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom" 

// redux state management
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
//import { useDispatch } from "react-redux";
//import { login } from "../features/userSlice";

// mui components

// app components

// api comp
import api from "../features/api";
//import get_userInfo from "../features/get_userInfo";

export const IssueEdit = () => {
    const user = useSelector(selectUser);
    const issueId = useParams().id;
    let navigate = useNavigate();
    //const dispatch = useDispatch()

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
                if (err.response.status === 401) {
                    navigate("/protected-route")
                } else {
                    navigate("/404")
                }
            }
        };
        if (user) {
            getIssueInfo()
        }
    }, [user, issueId]);

    if (!user) {
        navigate("/");
    } else if (authorized === null) {
        return (
            <>loading...</>
        )
    } else if (authorized === true) {
        return(
            <>
                issue {issueId} edit
            </>
        )
    }
}
