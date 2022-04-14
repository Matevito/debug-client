import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

//rest api axios
import api from "../features/api";
import get_userInfo from "../features/get_userInfo";

export const Signin = () => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [repPassword, setrepPassword] = useState("");
    const [email, setemail] = useState("");

    const [error, seterror] = useState(null);

    let navigate = useNavigate();

    // component functions
    const handleUsername = (e) => {
        setusername(e.target.value)
    };
    const handlePassword = (e) => {
        setpassword(e.target.value)
    };
    const handleRepPassword = (e) => {
        setrepPassword(e.target.value)
    };
    const handleEmail = (e) => {
        setemail(e.target.value)
    };
    const cleanForm = () => {
        setusername("");
        setpassword("");
        setrepPassword("");
        setemail("");
        seterror(null);
    };

    // error and api res functions
    const handleRegister = async(e) => {
        e.preventDefault();
        const reqBody = {
            username: username,
            password: password,
            repeatPassword: repPassword,
            email: email,
        };
        const url  = '/sign-in';
        
        try {
            const apiRes = await api.post(url, reqBody);
            console.log(apiRes.response.data);
        } catch (err) {
            seterror(err.response.data);
            console.log(err.response.data);
        }
    }
    return (
        <div>
            signin
        </div>
    )
}
