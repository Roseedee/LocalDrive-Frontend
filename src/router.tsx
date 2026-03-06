import { createBrowserRouter, Navigate } from "react-router-dom";

import AppLayout from "./shared/layout/AppLayout";
import AuthLayout from "./shared/layout/AuthLayout";

import { filesRoutes } from "./modules/files/routes";

import ProtectedLayout from "./modules/auth/components/ProtectedLayout";
import InitPage from "./modules/auth/pages/InitPage";
import LogoutPage from "./modules/auth/pages/LogoutPage";

export const router = createBrowserRouter([
    {
        element: <AuthLayout />,
        path: "/init",
        children: [
            {
                index: true,
                element: <InitPage />
            }
        ]
    },
    {
        element: <ProtectedLayout />,
        children: [
            {
                path: "/",
                element: <AppLayout />,
                children: [
                    {
                        index: true,
                        element: <Navigate to="/files" replace />
                    },
                    filesRoutes
                ]
            }
        ]
    },
    {
        path: '/logout',
        element: <LogoutPage />
    }
]);
