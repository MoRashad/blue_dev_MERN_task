import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import AuthPage from "./screens/AuthPage";
import { useSelector } from "react-redux";
import { AuthState } from "./state/state";
import TasksPage from "./screens/TasksPage";
import SingleTaskPage from "./screens/SingleTaskPage";
function App() {
  const isAuthinticated: boolean = Boolean(
    useSelector((state: AuthState) => state.accessToken)
  );
  console.log(isAuthinticated);
  return (
    <div>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route
            path="/tasks"
            element={isAuthinticated ? <TasksPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/task/:id"
            element={
              isAuthinticated ? <SingleTaskPage /> : <Navigate to={"/"} />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
