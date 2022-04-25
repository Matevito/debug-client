import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";

// redux state management
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

// mui components

// app components

// api comp
import api from "../features/api";

export const ProjectGet = () => {
    const projectId = useParams().id;
    const user = useSelector(selectUser);
    let navigate = useNavigate();

    const [authorized, setAuthorized] = useState(null);
    const [projectInfo, setProjectInfo] = useState({});
    // data: {projectinfo}; issues: [array proj issues];
    
    useEffect(() => {
        async function getProjectInfo() {
            // get project info...
            const config = {
                headers: {
                    "auth-token": user.token
                }
            }
            try {
                const projectRes = await api.get(`/project/${projectId}`, config);
                setProjectInfo(projectRes.data)
                setAuthorized(true);
            } catch (err) {
                setAuthorized(false);
            }
            
        };
        if (user) {
            getProjectInfo();
        }
    }, [user, projectId])
    if (!user) {
        navigate("/");
    } else if (authorized === null) {
        return (
            <>loading...</>
        )
    }  else if (authorized === false ) {
        navigate("/protected-route");
    } else {
        return (
            <div>  {projectInfo.data.title}</div>
        )
    }
}
