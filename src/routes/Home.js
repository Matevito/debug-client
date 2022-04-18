import React from 'react'

// redux state management
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

// mui comp
import {
    Grid
} from "@mui/material";

// Home components
import { Welcome } from "../components/Welcome";
import { NavBar } from '../components/NavBar';

export const Home = () => {
    const user = useSelector(selectUser);

    if (!user) {
        return(
            <Welcome />
        )
    } else {
        return( 
            
            <Grid container spacing={2} >
                <Grid item xs={3}>
                    <NavBar user={user}/>
                </Grid>
                <Grid item xs={8}>
                    <span>todo...</span>
                </Grid>
            </Grid>
        );
    }
}
