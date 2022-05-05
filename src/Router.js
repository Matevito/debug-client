import React from 'react'
import { HashRouter , Routes, Route } from 'react-router-dom'
import { Navigate } from "react-router-dom";

// redux state management
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

// routes components
import { Header } from "./Header";
import { Protected } from "./routes/Protected";
import { Code404 } from "./routes/Code404"

import { Home } from "./routes/Home";
import { Login } from "./routes/Login";
import { Signin } from "./routes/Signin";

import { ProjectCreate } from "./routes/ProjectCreate";
import { ProjectGet } from "./routes/ProjectGet";
import { ProjectEdit } from "./routes/ProjectEdit";

import { IssueCreate } from "./routes/IssueCreate";
import { IssueGet } from "./routes/IssueGet";
import { IssueEdit } from "./routes/IssueEdit";

import { UserDetails } from "./routes/UserDetails";
import { UserInfo } from "./routes/UserInfo";

export const Router = () => {
    const user = useSelector(selectUser);
    return (
        <HashRouter 
            basename="/debug-client/"
        >
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />}/>

                <Route path="/log-in" element={user ? <Navigate to="/" /> : <Login />} /> 
                <Route path="/sign-in" element={user ? <Navigate to="/" /> : <Signin />}/>

                <Route path="/user/info" element={<UserInfo />} />
                <Route path="/user/:id" element={<UserDetails />} />

                <Route path="/project/create" element={<ProjectCreate />}/>
                <Route path="/project/:id" element={<ProjectGet />} />
                <Route path="/project/:id/edit" element={<ProjectEdit />} />
                
                <Route path="/project/:id/issue/create" element={<IssueCreate />} />
                <Route path="/issue/:id" element={<IssueGet />} />
                <Route path="/issue/:id/edit" element={<IssueEdit />} />

                <Route path="/404" element={user ? <Code404 /> : <Navigate to="/" />} />
                <Route path="/protected-route" element={user ? <Protected /> : <Navigate to="/" /> } />
                <Route path="*" element={<Code404 />} />
            </Routes>
        </HashRouter >
    )
}
