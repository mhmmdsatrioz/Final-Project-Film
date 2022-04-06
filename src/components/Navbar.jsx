import React, { useContext ,useState} from "react";
import { Link } from "react-router-dom";
import Logo from "../img/logo.png";
import { UserContext } from "../Global/UseContext";
import Cookies from "js-cookie";
import "./navbar.css";
import {FaBars,FaTimes} from 'react-icons/fa';
import {SettingOutlined} from '@ant-design/icons';

// ANT DESIGN
import {DownOutlined,PoweroffOutlined} from '@ant-design/icons';

const Navbar = () => {
  const { loginStatus } = useContext(UserContext);
  const [bar,setBar] = useState(false);

  const token = Cookies.get('token')

  const handleBars = () => {
    setBar(!bar);
  }

  return (
    <div>
      <nav>
        <Link to="/" style={{color:'#fff',fontSize:'1rem'}} >
        <span style={{color:'#333',fontSize:'1.4rem'}}>S</span>at
        </Link>
    
       
        <ul className={bar ? 'nav-mobile': 'desktop'}>
          <li>
            <Link className="link" onClick={() => setBar(false)} to="/">Home</Link>
          </li>
          <li>
            <Link className="link" onClick={() => setBar(false)} to="/movie">Data Movie</Link>
          </li>
          <li>
            <Link className="link" onClick={() => setBar(false)} to="/games">Data Game</Link>
          </li>
          {Cookies.get("username") !== undefined ? null : (
            <li>
              <Link className="link" onClick={() => setBar(false)} to="/register">Register</Link>
            </li>
          )}

          <li>
            {Cookies.get("username") !== undefined ? (
              <div className="dropdown">
                <p style={{fontWeight:'bold',fontSize:'14px',color:'#fff'}} className="dropbtn">{Cookies.get("email")} <DownOutlined style={{fontSize:'11px'}}/></p>
                <div className="dropdown-content">
                  <Link to={`/changepassword`} style={{fontSize:'15px'}} onClick={() => setBar(false)} >Change Password <SettingOutlined /></Link>
                  <a style={{fontSize:'15px'}}
                    onClick={(e) => {
                      e.preventDefault();
                      setBar(false)
                      Cookies.remove("username");
                      Cookies.remove("password");
                      Cookies.remove("email");
                      Cookies.remove("token");
                      window.location = "/";
                    }}
                  > 
                    Logout <PoweroffOutlined/>
                  </a>
                </div>
              </div>
            ) : (
              <Link className="link" onClick={() => setBar(false)} to="/login">Login</Link>
            )}
          </li>
        </ul>
      
       
        <div id="toggle" onClick={handleBars}>
        {bar ?  <FaTimes />:<FaBars />}
        </div>
      </nav>

    
    </div>
  );
};

export default Navbar;
