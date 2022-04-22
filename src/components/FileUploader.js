import React from 'react'

export const FileUploader = ({ fileHandler }) => {
    const fileSelectHandler = e => {
        e.preventDefault();
        fileHandler(e.target.files[0])
    };

    return (
        <div>
            <input type="file" onChange={fileSelectHandler} /> 
        </div>
    )
}
