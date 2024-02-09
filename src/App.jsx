import { useState } from 'react'

// import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './Components/Login-new';
import Protected from './Components/Protected';

import Signup from './Components/Signup';
import Profile from './Components/Profile';
import Analytics from './Components/Analytics';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signup/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
  {
    path: "/protected",
    element: <Protected/>,
  },
  {
    path: "/profile",
    element: <Profile/>,
  },
  {
    path: "/analytics/:id",
    element: <Analytics/>,
  },
]);
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
