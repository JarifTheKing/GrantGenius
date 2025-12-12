import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home/Home";
import LogIn from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import ErrorPage from "../Error/ErrorPage";
import Profile from "../Pages/MyProfile/Profile";
import AllScholarships from "../Pages/AllScholarships/AllScholarships";
import DetailsScholarship from "../Pages/AllScholarships/DetailScholarship/DetailsScholarship";
import About from "../Pages/About/About";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/all-scholarships",
        element: <AllScholarships />,
        loader: () => fetch("/scholarshipsData.json"),
      },
      {
        path: "/details-scholarship/:id",
        element: <DetailsScholarship />,
        loader: async () => {
          const scholarships = await fetch("/scholarshipsData.json").then(
            (res) => res.json()
          );
          const reviews = await fetch("/reviewsData.json").then((res) =>
            res.json()
          );
          return { scholarships, reviews };
        },
      },

      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);
