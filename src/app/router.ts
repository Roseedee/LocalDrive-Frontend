import React from "react";
import { createBrowserRouter } from "react-router-dom";

import AppLayout from "../shared/layout/AppLayout";
import AuthLayout from "../shared/layout/AuthLayout";

import { filesRoutes } from "../modules/files/routes";

import AuthGate from "../modules/auth/AuthGate";
import RegisterPage from "../modules/auth/pages/RegisterPage";
import LogoutPage from "../modules/auth/pages/LogoutPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: React.createElement(AuthGate)
    },
    {
        element: React.createElement(AuthLayout),
        path: "/register",
        children: [
            {
                index: true,
                element: React.createElement(RegisterPage)
            }
        ]
    },
    {
        element: React.createElement(AppLayout),
        path: "/",
        children: [filesRoutes]
    },
    {
        path: '/logout',
        element: React.createElement(LogoutPage)
    }
]);
