import InitPage from "./pages/InitPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ConfirmEmailPage from "./pages/ConfirmEmailPage";
import CompareDevicePage from "./pages/CompareDevicePage";

export const authRoutes = [
  {
    path: "/init",
    element: <InitPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/confirm-email",
    element: <ConfirmEmailPage />,
  },
  {
    path: "/compare-device",
    element: <CompareDevicePage />,
  },
];
