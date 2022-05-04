import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

// redux state management
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

// mui comp
import {
    Box,
    Card, 
    CardContent,
    Typography,
    Button,

} from "@mui/material";

// Home components
import { Welcome } from "../components/Welcome";
import { LoadingPage } from "../components/LoadingPage";

// api comp
import api from "../features/api";

export const Home = () => {
    const user = useSelector(selectUser);
    let navigate = useNavigate();

    const [authorized, setAuthorized] = useState(null);
    const [projectList, setProjectList] = useState([]);

    useEffect(() => {
        async function getProjectList() {
            const config = {
                headers: { "auth-token": user.token }
            };
            const url = "/project/list";

            try {
                const listRes = await api.get(url, config);
                setProjectList(listRes.data.data);
                setAuthorized(true);
            } catch(err) {
                setAuthorized(false);
                navigate("/protected-route");
            }
        };

        if (user){
            if (user.user.role !== "Admin"){
                setAuthorized(true)
            } else {
                // fetch projectList info for admin view!
                getProjectList()
            }
        }
    }, [user, navigate])

    if (!user) {
        return(
            <Welcome />
        )
    } else if (authorized === false){
        return (
            <LoadingPage />
        )
    } else if (authorized === true) {
        return (
            <>
            <Card sx={{ width: "100%"}}>
                    <CardContent sx={{ backgroundColor: "#A9A9A9"}}>
                        <Typography variant="h6">Logged as {user.user.role}</Typography>
                    </CardContent>
            </Card>
            <Box
                fullWidth
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    hieght: "100vh",
                    m: 3
                }}
            >
                {user.user.role === "Admin" ? <>only admin</> : <></>}
                {user.user.role !== "Developer" ? <>team leader and admin</> : <></>}
            </Box>
            </>
        )
    }
}
