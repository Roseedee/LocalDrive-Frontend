import FilesPage from "./pages/FilesPage";

export const filesRoutes = {
    path: "*",
    children: [
        {
            index: true,
            element: <FilesPage />
        }
    ]
}