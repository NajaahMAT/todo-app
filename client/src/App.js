import React from "react";
import Register from "./components/register";
import SnackbarProvider from "react-simple-snackbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import CreateTask from "./components/CreateTask";
import Navbar from "./components/Navbar";
import TaskDetail from "./components/TaskDetail";
import ViewTasks from "./components/ViewTasks";
import EditTask from "./components/EditTask";
function App() {
  return (
    <div className="">
      <SnackbarProvider>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/create" element={<CreateTask />} />
          <Route exact path="/view" element={<ViewTasks />} />
          <Route exact path="/detail/:id" element={<TaskDetail />} />
          <Route exact path="/edit/:id" element={<EditTask />} />
          {/* <Route exact path="/delete/:id" element={<EditTask />} /> */}
        </Routes>
      </SnackbarProvider>
    </div>
  );
}

export default App;
