import { useEffect, useState } from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";

import Layout from "./Layout/Layout";
import Home from "./pages/Home/Home";
import Todo from "./pages/Todo/Todo";
import Components from "./pages/Components/Components";
import Calculator from "./pages/Calculator/Calculator";
import Products from "./pages/Products/Products";
import Carts from "./pages/Carts/Carts";
import Login from "./pages/Login/Login";
import Animation from "./pages/Animation/Animation";

import { fetchproducths } from "./data/producths";

import "./App.css";
function App() {
  const [producths, setProducths] = useState([]);
  const [carts, setCarts] = useState([]);

  const [token, setToken] = useState("x");
  const [role, setRole] = useState("");

  useEffect(() => {
    setProducths(fetchproducths());
  }, []);

  useEffect(() => {
    console.log(producths);
    console.log(carts);
  }, [producths]);

  if (token === "") {
    return <Login setToken={setToken} setRole={setRole} />;
  } else {
    return (
      <div className="Main-container">
        <HashRouter>
          <Routes>
            <Route
              element={
                <Layout
                  producths={producths}
                  carts={carts}
                  setToken={setToken}
                  role={role}
                />
              }
            >
              <Route path="/" element={<Home />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/Animation" element={<Animation />}></Route>
              <Route path="/Calculator" element={<Calculator />} />
              <Route path="/Components" element={<Components />} />
              <Route path="/Todo" element={<Todo />} />
              <Route
                path="/Products"
                element={
                  <Products
                    producths={producths}
                    carts={carts}
                    setCarts={setCarts}
                  />
                }
              />
              <Route
                path="/Carts"
                element={<Carts carts={carts} setCarts={setCarts} />}
              />
            </Route>
          </Routes>
        </HashRouter>
      </div>
    );
  }
}

export default App;
