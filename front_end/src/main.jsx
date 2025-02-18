import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'


import Home from './Components/Home.jsx'
import Error from './Components/Error.jsx'
import Bigman from './Components/Bigman.jsx'
import Login from './Components/Login.jsx'
import Navbar from'./Components/Navbar.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />
  },
  {
    path: "/bigman",
    element: <Bigman />,
    errorElement: <Error />
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
