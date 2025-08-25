import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import SideLayout from "./components/Sidebar";
import Productlayout from "./components/Product";
import ReviewLayout from "./components/rating";
import CardLayout from "./components/cards";
import AuthLayout from "./pages/Auth/Authlayout";
import LoginPage from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/SignUp";
import Navbar from "./components/Navbar/Navbar";
import HomeContainer from "./components/Homelayout/HomeContainer";
import ComponnetsLayout from "./components/ComponnetsLayout";
import ComponentList from "./components/ComponentList";
import AuthList from "./components/AuthList";
import ButtonLayout from "./components/Button/ButtonLayout";
import SliderLayout from "./components/Slider/SliderLayout";

export const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,  // default route ("/")
        element: <Home />,
      },
      {
        path: "components",   // ❌ "/components" না দিয়ে শুধু "components"
        element: <ComponnetsLayout />,
        children: [
          {
            path: "auth",
            element: <AuthLayout />,
            children: [
              {
                path: "login",   // → /components/auth/login
                element: <LoginPage />,
              },
              {
                path: "signup",  // → /components/auth/signup
                element: <RegisterPage />,
              },
            ],
          },
          {
            path: "sidebar",
            element: <SideLayout />,
          },
          {
            
              path: "slider",
              element: <SliderLayout />,
            
          },
          {
            path: "product",
            element: <Productlayout />,
          },
          {
            path: "rating",
            element: <ReviewLayout />,
          },
          {
            path: "card",
            element: <CardLayout />,
          },
          {
            path: "navbar",
            element: <Navbar />,
          },
          {
            path: "home",
            element: <HomeContainer />,
          },
          {
            path: "button",
            element: <ButtonLayout />,
          },
        ],
      },
      {
        path:"/ComponentList",
        element: <ComponentList/>
      },
      {
        path:"/authList",
        element: <AuthList/>
      }
    ],
  },
]);
