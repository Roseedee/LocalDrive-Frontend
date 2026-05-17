import { createBrowserRouter, Navigate } from "react-router-dom";

import AppLayout from "./shared/layout/AppLayout";
import AuthLayout from "./shared/layout/AuthLayout";

import ProtectedLayout from "./modules/auth/components/ProtectedLayout";

import InitPage from "./modules/auth/pages/InitPage";
import LogoutPage from "./modules/auth/pages/LogoutPage";

import { filesRoutes } from "./modules/files/routes";

export const router = createBrowserRouter([
  {
    path: "/init",
    element: <AuthLayout />,
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