import React from 'react'

// redux state management
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

export const Home = () => {
    const user = useSelector(selectUser);

    if (!user) {
        return(
            <div>
                <h1>Home</h1>
                not loged-in
            </div>
        )
    } else {
        return( 
            <div>
                <h1>Home</h1>
                Loged-in home page
            </div>
        );
    }
}
