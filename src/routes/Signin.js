import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

// mui components
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import {
    Grid,
    Box,
    Typography,
    TextField,
    Button
} from "@mui/material"

// components
import { AuthError } from "../components/AuthError";

//rest api axios
import api from "../features/api";

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
        
        // handle api-rest call
        try {
            const apiRes = await api.post(url, reqBody);
            console.log(apiRes)
            cleanForm();
            navigate("/");
        } catch (err) {
            seterror(err.response.data.error);
            console.log(err.response.data);
        }
    }
    return (
        <Grid container justifyContent="center">
            <Grid item xs={6}>
                <Box
                    sx={{
                        marginTop: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <AppRegistrationIcon />
                    <Typography component="h1" variant="h5">
                        Sign-in
                    </Typography>

                    
                    
                    <p></p>
                    <form action="#" onSubmit={handleRegister}>
                        <AuthError error={error} />
                        <TextField fullWidth label="Username" defaultValue={username} onChange={handleUsername}></TextField>
                        <TextField fullWidth label="email" defaultValue={email} onChange={handleEmail}></TextField>
                        <TextField fullWidth label="Password"  type="password" defaultValue={password} onChange={handlePassword} data-testid="password"></TextField>
                        <TextField fullWidth label="Repeat Password" type="password" defaultValue={repPassword} onChange={handleRepPassword} data-testid="repPassword"></TextField>
                        
                        <Button
                            variant= "contained"
                            type="submit"
                            fullWidth
                            color="success"
                        >
                            Submit
                        </Button>
                    </form>
                </Box>
            </Grid>
        </Grid>
    )
}
