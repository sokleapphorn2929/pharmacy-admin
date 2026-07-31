import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import TestingApi from "../pages/TestingApi";
import RootLayout from "../layout/RootLayout";
import Dashboard from "../pages/Dashboard";
import AdminLayout from "../layout/AdminLayout";
import Category from "../pages/Category";
import Brand from "../pages/Brand";
import Product from "../pages/Product";
import Order from "../pages/Order";
import Payment from "../pages/Payment";
import Invoice from "../pages/Invoice";
import AdminProfile from "../pages/AdminProfile";
import About from "../pages/About";
import Contact from "../pages/Contact";
import ProtectRouting from "./ProtectRouting";

export default function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route index path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectRouting>
              <RootLayout />
            </ProtectRouting>
          }
        >
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="category" element={<Category />} />
            <Route path="brand" element={<Brand />} />
            <Route path="product" element={<Product />} />
            <Route path="order" element={<Order />} />
            <Route path="payment" element={<Payment />} />
            <Route path="invoice" element={<Invoice />} />
          </Route>
          <Route path="profile" element={<AdminProfile />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
