import React, { useState, useEffect } from "react";
import "./Login.scss";
import publicAxios from "../config/publicAxios";
import axios from "axios";
import { Alert, Space } from "antd";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [alert, setAlert] = useState({
    type: "success",
    message: "",
  });
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const login = async() => {
    console.log(user);
    try {
       await publicAxios.post("/login", user).then((res) => {
        console.log(res.data.message);
        localStorage.setItem("token", res.data.token);
        setAlert({
          type: res.data.type,
          message: res.data.message,
        });
        setTimeout(() => {
          navigate("/todolists");
        }, 2000);
      });
    } catch (error) {
      console.log(error)
      setAlert({
        type: error.response.data.type,
        message: error.response.data.message,
      });
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setAlert({
        type: "success",
        message: "",
      });
    }, 2000);
  }, [alert]);
  return (
    <>
      <div className="body">
        <Alert
          message={alert.message}
          type={alert.type}
          showIcon
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            width: "300px",
            visibility: alert.message ? "visible" : "hidden",
          }}
        />
        <div className="wrapper">
          <div action="">
            <h1>Login</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                required=""
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              <i className="bx bxs-user" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="password"
                required=""
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <i className="bx bxs-lock-alt" />
            </div>
            <div className="remember-forgot">
              <label>
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#">Forgot password?</a>
            </div>
            <button className="btn" onClick={login}>
              Login
            </button>
            <div className="register-link">
              <p>
                Dont't have an account? <a href="#">Register</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
