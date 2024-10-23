import "./Login.css";

import { Form } from "react-bootstrap";
import { verifyUser } from "../../data/users";
import { useRef } from "react";
function Login({ setToken, setRole }) {
  const UsernameRef = useRef();
  const passwordRef = useRef();
  return (
    <div className="Login-container">
      <h1
        style={{
          textAlign: "center",
          fontSize: "2rem",
          background: "linear-gradient(to right, #f44336, #e91e63)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Login
      </h1>
      <Form.Label htmlFor="Username">Username</Form.Label>
      <Form.Control
        type="text"
        id="Username"
        placeholder="user"
        ref={UsernameRef}
      />
      <Form.Label htmlFor="password">password</Form.Label>
      <Form.Control
        type="password"
        id="password"
        placeholder="user123"
        ref={passwordRef}
      />
      <div className="Login-button-container">
        <button className="btn btn-warning mt-3">
          <a
            href="/register"
            style={{ textDecoration: "none", color: "white" }}
          >
            Register
          </a>
        </button>
        <button
          className="btn btn-success mt-3"
          onClick={() => {
            const Username = UsernameRef.current.value.trim();
            const password = passwordRef.current.value.trim();
            const userFound = verifyUser(Username, password);
            UsernameRef.current.value = "";
            passwordRef.current.value = "";
            if (userFound == null) {
              alert("User not found or invalid password/Username try user:user password:user123");
              UsernameRef.current.focus();
            } else {
              setToken(userFound.token);
              setRole(userFound.role);
            }
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
