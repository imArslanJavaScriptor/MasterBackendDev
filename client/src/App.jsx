import React, { useState } from "react";
import axios from "axios";
import Login from "./pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
function App() {
 

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
