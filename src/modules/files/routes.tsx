import FilesPage from "./pages/FilesPage";

export const filesRoutes = [
  {
    path: "/files",
    element: <FilesPage />
  },
  {
    path: "/files/:id",
    element: <FilesPage />
  }
];