import React from 'react'
import { Link } from "react-router-dom";

// redux state management
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

// mui comp
import {
    Grid,
    Box,
    Button
} from "@mui/material";

// Home components
import { Welcome } from "../components/Welcome";

const CreateProjectLink = () => {
    return (
        <Link to="project/create" style={{ color: "inherit", textDecoration: 'none' }}>
            <Button color="warning">
                    Create project
            </Button>
        </Link>
    )
};

export const Home = () => {
    const user = useSelector(selectUser);
    if (!user) {
        return(
            <Welcome />
        )
    } else if (user.user.role === "Admin"){
        return(
            <>
            <span> loged as{user.user.role}</span>
            <CreateProjectLink />
            </>
        );
    } else {
        return (
            <span>no admin</span>
        )
    }
}
