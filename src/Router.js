import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navigate } from "react-router-dom";

// redux state management
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

// mui  comp
import { Grid, Box } from "@mui/material";

// routes components
import { Header } from "./Header";
import { Footer } from "./Footer";
import { NavBar } from "./components/NavBar"
import { Home } from "./routes/Home";
import { Login } from "./routes/Login";
import { Signin } from "./routes/Signin";

export const Router = () => {
    const user = useSelector(selectUser);
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />}/>
                <Route path="/log-in" element={user ? <Navigate to="/" /> : <Login />} /> 
                <Route path="/sign-in" element={user ? <Navigate to="/" /> : <Signin />}/>
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}
