import React, { useState, useContext } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserContext } from "../Global/UseContext";
import Cookies from "js-cookie"
import { useHistory,Link } from "react-router-dom";
import axios from 'axios';
import './login.css';
import swal from 'sweetalert';

// ANT DESIGN
import { message } from 'antd';


const Login = () => {
  const { setLoginStatus,setSuccessRegis,successRegis ,userLists} = useContext(UserContext);
  const history = useHistory()

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
      let name = e.target.name
      let value = e.target.value
      setSuccessRegis(false)
        setInput({
            ...input,[name]: value
        })
  }

  const handleSubmit = (e) => {
      e.preventDefault();

      let API = 'https://backendexample.sanbersy.com/api/user-login '
      axios.post(API, {
        email: input.email,
        password: input.password
        ,
    }).then(
        (res) => {
            var user = res.data.user
            var token = res.data.token
            Cookies.set('username', user.name, {expires: 1})
            Cookies.set('email', user.email, {expires: 1})
            Cookies.set('token', token, {expires: 1})
            history.push('/')
            setLoginStatus(true)
        }
    ).catch((err) => {
        swal({
            title: " Ups!",
            text: "Email atau Password salah",
            icon: "error",
        })
    })
  }

  // const success = () => {
  //   message.success('Registrasi berhasil, silahkan login');
  // };

  return (
    <>
    {/* {success()} */}
      <h1 style={{ textAlign: "center" }}>Login Account</h1>
      {successRegis ? message.success('Registrasi berhasil, silahkan login',4) : null}
    <div className="top">
      <form onSubmit={handleSubmit}  id="login-form" className="login-form"  role="main">
  <h1 className="a11y-hidden">Login Form</h1>
  <div>
    <label className="label-email">
      <input onChange={handleChange} value={input.email} type="email" className="text" name="email" placeholder="Email"  />
      <span className="required">Email</span>
    </label>
  </div>
  <input type="checkbox" value={input.password} onChange={handleChange} name="show-password" className="show-password a11y-hidden" id="show-password"  />
  <label className="label-show-password" for="show-password">
    <span>Show Password</span>
  </label>
  <div>
    <label className="label-password">
      <input type="text" value={input.password} onChange={handleChange} className="text" name="password" placeholder="Password" />
      <span className="required">Password</span>
    </label>
  </div>
  <input type="submit" value="Log In" />
  <div className="email">
    <Link to="/register">Daftar Akun?</Link>
  </div>
  <figure aria-hidden="true">
    <div className="person-body"></div>
    <div className="neck skin"></div>
    <div className="head skin">
      <div className="eyes"></div>
      <div className="mouth"></div>
    </div>
    <div className="hair"></div>
    <div className="ears"></div>
    <div className="shirt-1"></div>
    <div className="shirt-2"></div>
  </figure>
</form>
</div>
      {/* <div className="layout">
        <div className="bg">
          <form onSubmit={handleSubmit}>
            <label style={{ paddingLeft: "10px", color: "white" }}>
              Email:{" "}
            </label>
            <input
              style={{ marginLeft: "55px" }}
              type="email"
              name="email"
              onChange={handleChange}
              value={input.email}
            />
            <br />
            <br />
            <label style={{ paddingLeft: "10px", color: "white" }}>
              Password:{" "}
            </label>
            <input
              style={{ marginLeft: "30px" }}
              type="password"
              name="password"
              onChange={handleChange}
              value={input.password}
            />
            <br />
            <br />
            <button>Submit</button>
          </form>
        </div>
      </div> */}
    </>
  );
};

export default Login;
