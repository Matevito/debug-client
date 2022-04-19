import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
// redux state management
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

// app components
import { ProjectForm } from "../components/ProjectForm";

// api comp
import api from "../features/api";

export const ProjectCreate = () => {
    const user = useSelector(selectUser);
    let navigate = useNavigate();
    const [usersList, setUsersList] = useState([]);
    useEffect(() => {
        async function getUsersList(){
            if(user && user.user.role === "Admin") {
                const config = {
                    headers: {
                        "auth-token": user.token
                    }
                };
                const apiRes = await api.get("/user/list", config);
                if (apiRes.status === 200) {
                    setUsersList(apiRes.data.data)
                }
            }
        };
        getUsersList();
    }, []);

    const handleSubmit = (form) => {
        //test.todo:
        console.log(form);
    }
    if (!user) {
        // nvigate to /home
        navigate("/")
    } else if (user.user.role !== "Admin") {
        //navigate to "/protected-route"
        navigate("/protected-route")
    } else {
        return (
            <div>
                <ProjectForm  
                    usersList={usersList}
                    handleSubmit={handleSubmit}
                />
            </div>
        )
}
}
