import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navigate } from "react-router-dom";

// redux state management
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

// routes components
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Protected } from "./routes/Protected";

import { Home } from "./routes/Home";
import { Login } from "./routes/Login";
import { Signin } from "./routes/Signin";
import { ProjectCreate } from "./routes/ProjectCreate";
import { ProjectGet } from "./routes/ProjectGet";
import { ProjectEdit } from "./routes/ProjectEdit";

import { IssueCreate } from "./routes/IssueCreate";


export const Router = () => {
    const user = useSelector(selectUser);
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />}/>
                <Route path="/log-in" element={user ? <Navigate to="/" /> : <Login />} /> 
                <Route path="/sign-in" element={user ? <Navigate to="/" /> : <Signin />}/>

                <Route path="/project/create" element={<ProjectCreate />}/>
                <Route path="/project/:id" element={<ProjectGet />} />
                <Route path="/project/:id/edit" element={<ProjectEdit />} />
                
                <Route path="/project/:id/issue/create" element={<IssueCreate />} />
                

                <Route path="/protected-route" element={user ? <Protected /> : <Navigate to="/" /> } />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}
