import React from 'react'

// redux state management
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

export const Home = () => {
    const user = useSelector(selectUser);

    if (!user) {
        return(
            <div>
                not loged-in
            </div>
        )
    } else {
        return( 
            <div>
                Loged-in home page
            </div>
        );
    }
}
