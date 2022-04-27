import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom" 

// redux state management
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
//import { useDispatch } from "react-redux";
//import { login } from "../features/userSlice";

// mui components

// app components
import { ProjectForm } from '../components/ProjectForm';

// api comp
import api from "../features/api";
// import get_userInfo from "../features/get_userInfo";

export const ProjectEdit = () => {
    const user = useSelector(selectUser);
    const projectId = useParams().id;
    let navigate = useNavigate();

    const [projectInfo, setProjectInfo] = useState(null)
    const [authorized, setAuthorized] = useState(null)
    //const [erros, setErrors] = useState(null);

    useEffect(() => {
        async function getProjectInfo() {
            if (user.user.role === "Developer") {
                setAuthorized(false)
            } else {
                const config = {
                    headers: { "auth-token": user.token}
                }
                try {
                    const projectRes = await api.get(`/project/${projectId}`, config);
                    setProjectInfo(projectRes.data);
                    setAuthorized(true)
                } catch (err) {
                    console.log(err)
                }
            }
        }
        if (user) {
            getProjectInfo();
        };
    }, [user, projectId])
    if (!user) {
        navigate("/")
    } else if (authorized === null) {
        return (
            <>loading...</>
        )
    } else if (authorized === false ){ 
        navigate("/protected-route")
    } else if (authorized === true) {
        return (
            <>todo... project edit {projectId}</>
        )
    }
}
