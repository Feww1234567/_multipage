import { Outlet } from "react-router";

import Footer from "../Layout/Footer/Footer";
import Header from "../Layout/Header/Header";
import Navbar from "../Layout/Navbar/Navbar";

import "./Layout.css";

function Layout({ producths, carts, setToken, role }) {
  return (
    <div className="layout-container">
      <div className="Header-container-layout">
        <Header />
      </div>
      <div className="Navbar-container-layout">
        <Navbar
          producths={producths}
          carts={carts}
          setToken={setToken}
          role={role}
        />
      </div>
      <div className="Outlet-container-layout">
        <Outlet />
      </div>
      <div className="Footer-container-layout"></div>
      <Footer />
    </div>
  );
}

export default Layout;
