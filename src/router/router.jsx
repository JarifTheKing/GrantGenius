import React from "react";
import { createBrowserRouter } from "react-router";

import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../Error/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminRoute from "./AdminRoute";
import ModeratorRoute from "./ModeratorRoute";

const Home = React.lazy(() => import("../Pages/Home/Home"));
const LogIn = React.lazy(() => import("../Pages/Auth/Login"));
const Register = React.lazy(() => import("../Pages/Auth/Register"));
const Profile = React.lazy(() => import("../Pages/MyProfile/Profile"));
const AllScholarships = React.lazy(() => import("../Pages/AllScholarships/AllScholarships"));
const DetailsScholarship = React.lazy(() => import("../Pages/AllScholarships/DetailScholarship/DetailsScholarship"));
const About = React.lazy(() => import("../Pages/About/About"));
const AddScholarship = React.lazy(() => import("../Pages/Dashboard-Pages/AddScholarship"));
const MyScholarships = React.lazy(() => import("../Pages/Dashboard-Pages/MyScholarships"));
const UpdateScholarship = React.lazy(() => import("../Pages/Dashboard-Pages/UpdateScholarship"));
const HowItWorks = React.lazy(() => import("../Pages/How-It-Works/HowItWorks"));
const Blogs = React.lazy(() => import("../Pages/Home/Blogs/Blogs"));
const ContactUs = React.lazy(() => import("../Pages/Home/Contact/ContactUs"));
const DashboardHome = React.lazy(() => import("../Pages/Dashboard-Pages/DashboardHome"));
const MyApplications = React.lazy(() => import("../Pages/Dashboard-Pages/MyApplications/MyApplications"));
const PaymentHistory = React.lazy(() => import("../Pages/Dashboard-Pages/PaymentHistory/PaymentHistory"));
const PaymentSuccess = React.lazy(() => import("../Pages/Dashboard-Pages/PaymentSuccess/PaymentSuccess"));
const PaymentCancel = React.lazy(() => import("../Pages/Dashboard-Pages/PaymentCancel/PaymentCancel"));
const BeAModerator = React.lazy(() => import("../Pages/ModeratorPages/BeModerator/BeAModerator"));
const ApproveModerator = React.lazy(() => import("../Pages/AdminPages/ApproveModerator/ApproveModerator"));
const UsersManagement = React.lazy(() => import("../Pages/Dashboard-Pages/UsersManagement/UsersManagement"));
const AllReviews = React.lazy(() => import("../Pages/ModeratorPages/AllReviews/AllReviews"));
const ManageApplications = React.lazy(() => import("../Pages/ModeratorPages/ManageApplications/ManageApplications"));
const AddReview = React.lazy(() => import("../Pages/Dashboard-Pages/AddReview/AddReview"));
// const ApplicationDetails = React.lazy(() => import("../Pages/ModeratorPages/ApplicationDetails/ApplicationDetails"));
const Analytics = React.lazy(() => import("../Pages/AdminPages/Analytics/Analytics"));
const ApplicationReview = React.lazy(() => import("../Pages/ModeratorPages/ApplicationReview/ApplicationReview"));
const MyReviews = React.lazy(() => import("../Pages/Dashboard-Pages/MyReviews/MyReviews"));

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
          fetch(
            `https://grant-genius-server-one.vercel.app/all-scholarship/${params.id}`
          ),
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

  // DashBoard
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "dashboard-home",
        element: (
          <PrivateRoute>
            <DashboardHome></DashboardHome>
          </PrivateRoute>
        ),
      },
      {
        path: "my-applications",
        element: (
          <PrivateRoute>
            <MyApplications />
          </PrivateRoute>
        ),
      },

      {
        path: "approve-moderator",
        element: (
          <PrivateRoute>
            <ApproveModerator />,
          </PrivateRoute>
        ),
      },

      {
        path: "users-management",
        element: (
          <PrivateRoute>
            <UsersManagement />,
          </PrivateRoute>
        ),
      },

      // {
      //   path: "add-scholarship",
      //   element: (
      //     <PrivateRoute>
      //       <AddScholarship></AddScholarship>
      //     </PrivateRoute>
      //   ),
      // },
      {
        path: "be-moderator",
        element: (
          <PrivateRoute>
            <BeAModerator />
          </PrivateRoute>
        ),
      },

      {
        path: "payment-history",
        element: (
          <PrivateRoute>
            <PaymentHistory></PaymentHistory>
          </PrivateRoute>
        ),
      },

      {
        path: "payment-success/:id",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: "payment-cancel/:id",
        element: (
          <PrivateRoute>
            <PaymentCancel />
          </PrivateRoute>
        ),
      },

      {
        path: "add-scholarship",
        element: (
          <PrivateRoute>
            <AddScholarship></AddScholarship>
          </PrivateRoute>
        ),
      },
      {
        path: "my-scholarship",
        element: (
          <PrivateRoute>
            <MyScholarships></MyScholarships>
          </PrivateRoute>
        ),
      },
      {
        path: "update-scholarship/:id",
        element: (
          <PrivateRoute>
            <UpdateScholarship></UpdateScholarship>
          </PrivateRoute>
        ),
      },

      {
        path: "my-reviews",
        element: (
          <PrivateRoute>
            <MyReviews></MyReviews>
          </PrivateRoute>
        ),
      },

      {
        path: "all-reviews",
        element: (
          <ModeratorRoute>
            <AllReviews />
          </ModeratorRoute>
        ),
      },
      {
        path: "manage-applications",
        element: (
          <ModeratorRoute>
            <ManageApplications />
          </ModeratorRoute>
        ),
      },
      {
        path: "add-review/:id",
        element: (
          <PrivateRoute>
            <AddReview />
          </PrivateRoute>
        ),
      },

      // {
      //   path: "application-details/:id",
      //   element: (
      //     <ModeratorRoute>
      //       <ApplicationDetails />
      //     </ModeratorRoute>
      //   ),
      // },
      {
        path: "application-review/:id",
        element: (
          <ModeratorRoute>
            <ApplicationReview />
          </ModeratorRoute>
        ),
      },
      {
        path: "analytics",
        element: (
          <AdminRoute>
            <Analytics />
          </AdminRoute>
        ),
      },
    ],
  },
]);
