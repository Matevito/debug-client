import React from 'react';

// mui components
import {
    Stack,
    Alert,
    AlertTitle
} from "@mui/material";

const ErrorMsg = ({ data }) => {
    return (
        <Stack sx={{ width: '100%'}} >
            <Alert severity="error">
            <AlertTitle>{data.param} error</AlertTitle>
                {data.msg}
            </Alert>
        </Stack>
    )
}

// exported component
export const AuthError = ({ error }) => {
    if (!error) {
        return (
            <>
            </>
        )
    }
    else if (!Array.isArray(error)) {
        return (
            <>
            <Stack sx={{ width: '100%'}} >
                    <Alert severity="error">
                        {error}
                    </Alert>
            </Stack>
            <p></p>
            </>
        )
    } else {
        return (
            <>
            {error.map((msg, i) => {
                return <ErrorMsg key={i} data={msg} />
            })}
            <p></p>
            </>
        )
    }
}
