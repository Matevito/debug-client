import React from 'react'

// redux state management
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

// Home components
import { Welcome } from "../components/Welcome";

export const Home = () => {
    const user = useSelector(selectUser);

    if (!user) {
        return(
            <Welcome />
        )
    } else {
        return( 
            <div>{user.user.role}</div>
        );
    }
}
