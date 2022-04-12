import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// redux state management
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

// routes components
import { Home } from "./routes/Home";
import { Login } from "./routes/Login";
import { Signin } from "./routes/Signin";

export const Router = () => {
    const user = useSelector(selectUser);
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />}/>
                <Route path="/log-in" element={<Login />}/>
                <Route path="/sign-in" element={<Signin />}/>
            </Routes>
        </BrowserRouter>
    )
}
