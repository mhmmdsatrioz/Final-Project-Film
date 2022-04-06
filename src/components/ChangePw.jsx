import React,{useEffect, useContext,useState} from 'react'
import { UserContext } from '../Global/UseContext';
// COOKIES
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';
import axios from 'axios';

import './changepw.css';

// ANT DESIGN
import { Alert,message } from 'antd';
import { Form, Input } from 'antd';
import { UserOutlined, LockOutlined, } from '@ant-design/icons';

// CSS

const ChangePw = () => {
    const history = useHistory();
    // STATE
    const [wrong, setWrong] = useState(false);
    const [mess, setMess] = useState(false);
    const [btn, setBtn] = useState('')
    const {setLoginStatus, userLists} = useContext(UserContext)
    const [input, setInput] = useState({
        current_password: '',
        new_password:'',
        new_confirm_password: ''
    });

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setInput({
            ...input,[name]: value
        })
    };

  
    const ChangePass = () => {

        let Token = Cookies.get('token')
        if(input.new_password.length <= 8 )  {
          setMess(true)
        }
        if(input.new_password !== input.new_confirm_password) {
        setWrong(true)
        }
        if (input.new_password.length >= 8 && input.new_password === input.new_confirm_password) {
            
            setMess(null)
            setWrong(null)
            let API = 'https://backendexample.sanbersy.com/api/change-password'
            axios.post(API,{
                current_password: input.current_password,
                new_password: input.new_password,
                token:Token,
                new_confirm_password: input.new_confirm_password})
               
    
                .then((res) => {
                    swal("Success!", "Password Berhasil Diubah", "success");
                console.log('BERHASIL')
                    setLoginStatus(true)
                    history.push('/')
                    
                })
                .catch((err) => {
                  swal({
                    title: "Failed!",
                    text: "Password Lama Salah",
                    icon: "error",
                    button: "OK",
                  });
                  })
              }
    };

  

  return (
      <div className="background">
  <div className="container">
    <div className="screen">
      <div className="screen-header">
        <div className="screen-header-left">
          <div className="screen-header-button close"></div>
          <div className="screen-header-button maximize"></div>
          <div className="screen-header-button minimize"></div>
        </div>
        <div className="screen-header-right">
          <div className="screen-header-ellipsis"></div>
          <div className="screen-header-ellipsis"></div>
          <div className="screen-header-ellipsis"></div>
        </div>
      </div>
      {mess &&  <Alert  closable
     message="Password minimal 8 karakter" type="error" showIcon />}
      {wrong ?     <Alert  closable
       message="Password Baru dan Konfirmasi Password Tidak Sama!" type="error" showIcon />:null}
      <div className="screen-body">
        <div className="screen-body-item left">
          <div className="app-title">
            <span>Change Password</span>
          </div>
        </div>
        <div className="screen-body-item">
          <div className="app-form">
            <div className="app-form-group">
              <input style={{color:'#fff',fontSize:'1.1rem'}} className="app-form-control useername" placeholder="NAME" value={Cookies.get('username')}/>
            </div>
            <div className="app-form-group">
              <input onChange={handleChange} className="app-form-control" name='current_password' type='password'  value={input.current_password} placeholder="Masukan Pasword Lama"/>
            </div>
            <div className="app-form-group">
              <input onChange={handleChange} name='new_password' type='password'  value={input.new_password} className="app-form-control" placeholder="Masukan Password Baru"/>
            </div>
            <div className="app-form-group message">
              <input onChange={handleChange} type='password' value={input.new_confirm_password} name='new_confirm_password' className="app-form-control" placeholder="masukan Verifikasi Password"/>
            </div>
            <div className="app-form-group buttons">
              <button className="app-form-button" onClick={ChangePass}>SEND</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</div>
  )
}

export default ChangePw