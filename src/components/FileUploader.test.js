import React from "react";

// testing utilities
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// test component
import { FileUploader } from "./FileUploader";

describe("FileUploader component", () => {
    
    test("renders upload btn", () => {
        render(
            <FileUploader 
                screenshots={[]}

            />
        )
        expect(screen.getByText("Upload")).toBeInTheDocument();
    })
    test("comp renders screenshots names", () => {
        const mock_screenshots = [
            {
                name: "first_image.jpeg"
            },
            {
                name: "second_image.div"
            },
            {
                name: "third_image.png"
            }
        ];
        render(
            <FileUploader 
                screenshots={mock_screenshots}
            />
        );
        expect(screen.getByText("first_image.jpeg")).toBeInTheDocument();
        expect(screen.getByText("second_image.div")).toBeInTheDocument()
        expect(screen.getByText("third_image.png")).toBeInTheDocument()
    });
    //test.todo comp handles deleteFile function
})