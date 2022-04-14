import React, { useState } from 'react'

export const Signin = () => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [repPassword, setrepPassword] = useState("");
    const [email, setemail] = useState("");

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

    // error and api res functions
    
    return (
        <div>
            signin
        </div>
    )
}
