import FilesPage from "./pages/FilesPage";

export const filesRoutes = {
    path: "files",
    children: [
        {
            index: true,
            element: <FilesPage />
        }
    ]
}