import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Home/Home";
import Login from "../Components/LoginRegister/Login";
import Register from "../Components/LoginRegister/Register";
import Main from "../Layout/Main";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <PrivateRoute><Home /></PrivateRoute>
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            }
        ]
    }
])