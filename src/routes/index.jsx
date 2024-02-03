import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Home from "../pages/home"
import Login from "../pages/auth"
import Profile from "../pages/profile"
import Favorites from "../pages/favorites"
import MyContents from "../pages/my-contents";
import Update from "../pages/update";

const Routes = () => {

  const routesForPublic = [
    {
      path: "/login",
      element: <Login/>,
    }
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <Home/>,
        },
        {
            path: "/home",
            element: <Home/>,
        },
        {
            path: "/profile",
            element: <Profile/>,
        },
        {
            path: "/favorites",
            element: <Favorites/>,
        },
        {
          path: "/my-contents",
          element: <MyContents/>
        },
        {
          path : "/update",
          element: <Update/>
        },
      ],
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;