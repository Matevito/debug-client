import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import KeyIcon from '@mui/icons-material/Key';
import {
    Grid,
    Box,
    Typography,
    TextField,
    Button
} from "@mui/material"

//components
import { DemoLinks } from "../components/DemoLinks"

//rest api axios
import api from "../features/api";

export const Login = () => {
    let navigate = useNavigate();
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    //const [error, seterror] = useState(null);

    const handleUsername = (e) => {
        setusername(e.target.value);
    };
    const handlePassword = (e) => {
        setpassword(e.target.value)
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        //todo...
        navigate("/");
    };
    const handleDemo = async(url) => {
        
        try {
            const demoAccess = await api.post(url);
            const token = demoAccess.data.token;
            
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Grid container justifyContent="center">
            <Grid item xs={6}>
                <Box
                    sx={{
                        marginTop:2,
                        display:"flex",
                        flexDirection: "column",
                        alignItems:"center"
                    }}
                >
                    <KeyIcon />
                    <Typography component="h1" variant="h5">
                        Log-in
                    </Typography>
                    <p></p>
                    <form action="#" onSubmit={(e) => { e.preventDefault()}}>
                        <TextField fullWidth label="Username" defaultValue={username} onChange={handleUsername}></TextField>
                        <TextField fullWidth label="Password" type="password" value={password} onChange={handlePassword}/>
                        
                        <Button 
                            variant="contained"
                            type="submit"
                            fullWidth
                            color="success"
                            onClick={handleLogin}
                        >
                        Submit
                        </Button>
                        <DemoLinks handleDemo={handleDemo}/>
                    </form>
                </Box>
            </Grid>
        </Grid>
    )
}
