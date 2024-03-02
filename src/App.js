import React from "react";
import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import Cart from "./components/Cart/Cart";
import Wishlist from "./components/Wishlist/Wishlist";
import Signup from "./components/Signup/Signup";
import Signin from "./components/Signin/Signin";
import AuthLayout from "./Layouts/AuthLayout";
import NotFound from "./components/NotFound/NotFound";
import { Offline } from "react-detect-offline";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import StoreContextProvider from "./context/storeContext";
import { ToastContainer, toast } from "react-toastify";
import Address from "./components/Address/Address";
import Allorder from "./components/Allorder/Allorder";
export default function App() {
  let routes = createHashRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <ProtectedRoutes>{<Home />}</ProtectedRoutes> },
        {
          path: "home",
          element: <ProtectedRoutes>{<Home />}</ProtectedRoutes>,
        },
        {
          path: "products",
          element: <ProtectedRoutes>{<Products />}</ProtectedRoutes>,
        },
        {
          path: "categories",
          element: <ProtectedRoutes>{<Categories />}</ProtectedRoutes>,
        },
        {
          path: "brands",
          element: <ProtectedRoutes>{<Brands />}</ProtectedRoutes>,
        },
        {
          path: "cart",
          element: <ProtectedRoutes>{<Cart />}</ProtectedRoutes>,
        },
        {
          path: "wishlist",
          element: <ProtectedRoutes>{<Wishlist />}</ProtectedRoutes>,
        },
        {
          path: "product-details/:id",
          element: <ProtectedRoutes>{<ProductDetails />}</ProtectedRoutes>,
        },
        {
          path: "address/:id",
          element: <ProtectedRoutes>{<Address />}</ProtectedRoutes>,
        },
        {
          path: "allorders",
          element: <ProtectedRoutes>{<Allorder />}</ProtectedRoutes>,
        },
        { path: "*", element: <NotFound /> },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { path: "signup", element: <Signup /> },
        { path: "signin", element: <Signin /> },
      ],
    },
  ]);

  return (
    <>
      <Offline>
        <div className="offline">You are offline Now!</div>
      </Offline>

      <StoreContextProvider>
        <RouterProvider router={routes} />
      </StoreContextProvider>
      <ToastContainer theme="colored" autoClose={700} />
    </>
  );
}
