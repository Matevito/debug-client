import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// redux comp
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
// mui comp
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
import get_userInfo from "../features/get_userInfo";

export const Login = () => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [error, seterror] = useState(null);

    const dispatch = useDispatch();
    
    // component functions
    const handleUsername = (e) => {
        setusername(e.target.value);
    };
    const handlePassword = (e) => {
        setpassword(e.target.value)
    };
    const cleanForm = () => {
        setusername("");
        setpassword("");
        // set error to null
    };

    // auth functions
    const handleLogin = async (e) => {
        e.preventDefault();
        const reqBody = {
            username: username,
            password: password,
        };
        const url = '/log-in';
        // calling the rest-api
        
        try {
            const apiRes = await api.post(url, reqBody);
            const token = apiRes.data.token;
            const userData = await get_userInfo(token);

            if (userData) {
                cleanForm();

                // store user
                localStorage.setItem("deb-token", token);
                dispatch(login(userData));
            }
        } catch (err) {
            seterror(err.response.data.error)
            console.log(err.response.data)
        }
    };
    const handleDemo = async(url) => {
        try {
            const demoAccess = await api.post(url);
            const token = demoAccess.data.token;
            const userData = await get_userInfo(token);

            // if the res of api was 200
            if (userData) {
                cleanForm();
                // store token browser
                // store userData on app
                localStorage.setItem("deb-token", token);
                dispatch(login(userData))
            }
        } catch (error) {
            console.log(error)
        }
    }

    // render obj
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
