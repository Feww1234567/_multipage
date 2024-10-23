import { Link, HashRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

let initsetTab = "home";

function Navbar({ producths, carts, setToken, role }) {
  const [Tab, setTab] = useState("");

  useEffect(() => {
    setTab(initsetTab);
  }, []); //frist load

  return (
    <div className="navbar-container">
      <Link to={"/Home"} style={{ textDecoration: "none" }}>
        <button
          className={
            "btn " + (Tab === "home" ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab("home")}
        >
          Home
        </button>
      </Link>

      <Link to={"/Animation"} style={{ textDecoration: "none" }}>
        <button
          className={
            "btn " +
            (Tab === "Animation" ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab("Animation")}
        >
          Animations
        </button>
      </Link>

      <Link to={"/calculator"} style={{ textDecoration: "none" }}>
        <button
          className={
            "btn " +
            (Tab === "calculator" ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab("calculator")}
        >
          Calculator
        </button>
      </Link>

      <Link to={"/Components"} style={{ textDecoration: "none" }}>
        <button
          className={
            "btn " +
            (Tab === "components" ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab("components")}
        >
          Component
        </button>
      </Link>

      <Link to={"/Todo"} style={{ textDecoration: "none" }}>
        <button
          className={
            "btn " + (Tab === "todo" ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab("todo")}
        >
          Todo
        </button>
      </Link>

      <Link to={"/Products"} style={{ textDecoration: "none" }}>
        <button
          className={
            "btn " +
            (Tab === "products" ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab("products")}
        >
          Products({producths.length})
        </button>
      </Link>

      <Link to={"/Carts"} style={{ textDecoration: "none" }}>
        <button
          className={
            "position-relative btn " +
            (Tab === "carts" ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab("carts")}
        >
          Carts
          {carts.length > 0 && (
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              ({carts.length < 10 ? carts.length : "9+"})
              <span class="visually-hidden">unread messages</span>
            </span>
          )}
        </button>
      </Link>

      <button className={"btn btn-danger"} onClick={() => setToken("")}>
        Logout&nbsp;<i class="bi bi-box-arrow-right"></i>
      </button>
    </div>
  );
}

export default Navbar;
