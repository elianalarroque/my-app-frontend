import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Profile from "./pages/ProfilePage";
import Layout from "./components/Layout/Layout";
import StudentsPage from "./pages/StudentsPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import UsersPage from "./pages/UsersPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/profile" replace /> },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "students",
        element: <StudentsPage />,
      },
    ],
  },
]);

export default router;
