import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'


import Home from './Components/Public/Home.jsx'
import Error from './Components/Error.jsx'
import Bigman from './Components/Bigman/Bigman.jsx'
import BigmanLogin from './Components/Public/BigmanLogin.jsx';


import TutorHome from'./Components/Tutors/TutorHome.jsx'
import StudentHome from'./Components/Students/StudentHome.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />
  },
  {
    path: "/bigmanlogin",
    element: <BigmanLogin />,
    errorElement: <Error />
  },
  {
    path: "/bigman",
    element: <Bigman />,
    errorElement: <Error />
  },
  {
    path: '/tutor',
    element: <TutorHome />,
    errorElement: <Error />,
  },
  {
    path: '/student',
    element: <StudentHome />,
    errorElement: <Error />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
