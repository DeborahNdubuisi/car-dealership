import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen relative">
      {/* Navbar visible on all pages */}
      <Navbar />
      {/* Page content goes here */}
      <main className="">
        <Outlet />
      </main>
      {/* small footer to fill visual space */}
      <Footer />
    </div>
  );
}
