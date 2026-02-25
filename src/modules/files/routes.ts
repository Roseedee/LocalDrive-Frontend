import React from "react";
import FilesPage from "./pages/FilesPage";

export const filesRoutes = {
    path: "files",
    children: [
        {
            index: true,
            element: React.createElement(FilesPage)
        }
    ]
}