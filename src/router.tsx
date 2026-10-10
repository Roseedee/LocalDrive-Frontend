import { createBrowserRouter, Navigate } from "react-router-dom";

import AppLayout from "./shared/layout/AppLayout";
import AuthLayout from "./shared/layout/AuthLayout";

import ProtectedLayout from "./modules/auth/components/ProtectedLayout";

import LogoutPage from "./modules/auth/pages/LogoutPage";

import { authRoutes } from "./modules/auth/routes";
import { filesRoutes } from "./modules/files/routes";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      ...authRoutes
    ]
  },

  {
    element: <ProtectedLayout />,
    children: [
      {
      path: "/",
      element: <Navigate to="/files" replace />
    },
      {
        
        element: <AppLayout />,
        children: [
          ...filesRoutes,
        ]
      },

      {
        path: "/logout",
        element: <LogoutPage />
      }
    ]
  }
]);
