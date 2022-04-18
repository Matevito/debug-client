import React from 'react'

// redux state management
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

// mui comp
import {
    Grid,
    Box
} from "@mui/material";

// Home components
import { Welcome } from "../components/Welcome";
import { NavBar } from '../components/NavBar';

const CreateProjectLink = () => {
    return (
        <div>create project</div>
    )
};

export const Home = () => {
    const user = useSelector(selectUser);

    if (!user) {
        return(
            <Welcome />
        )
    } else {
        return( 
            <span> loged as{user.user.role}</span>
        );
    }
}
