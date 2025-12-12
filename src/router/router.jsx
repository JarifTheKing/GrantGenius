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
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AddScholarship from "../Pages/Dashboard-Pages/AddScholarship";
import MyScholarships from "../Pages/Dashboard-Pages/MyScholarships";
import UpdateScholarship from "../Pages/Dashboard-Pages/UpdateScholarship";
import HowItWorks from "../Pages/How-It-Works/HowItWorks";
import Blogs from "../Pages/Home/Blogs/Blogs";
import ContactUs from "../Pages/Home/Contact/ContactUs";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        // loader: () => fetch("/reviewsData.json"),
      },
      {
        path: "/all-scholarships",
        element: <AllScholarships />,
        // loader: () => fetch("/scholarshipsData.json"),
      },
      {
        path: "/details-scholarship/:id",
        element: <DetailsScholarship />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/all-scholarship/${params.id}`),
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
        path: "/how-it-works",
        element: <HowItWorks />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "add-scholarship",
        element: (
          <PrivateRoute>
            <AddScholarship></AddScholarship>,
          </PrivateRoute>
        ),
      },
      {
        path: "my-scholarship",
        element: (
          <PrivateRoute>
            <MyScholarships></MyScholarships>,
          </PrivateRoute>
        ),
      },
      {
        path: "update-scholarship/:id",
        element: (
          <PrivateRoute>
            <UpdateScholarship></UpdateScholarship>,
          </PrivateRoute>
        ),
      },
    ],
  },
]);
