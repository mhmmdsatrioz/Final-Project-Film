import React,{useState, useContext, useEffect} from 'react';
import './register.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './register.css';
import { UserContext } from '../Global/UseContext';

import Cookies from 'js-cookie';
// ANT DESIGN
import { Alert } from 'antd';

const Register = () => {
  const {successRegis, setSuccessRegis} = useContext(UserContext);
  let history = useHistory()
  const [wrong, setWrong] = useState(null)

  const [input , setInput ] = useState({
    name: '',email: '', password:''
  })

  // HANDLE CHANGE
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInput({
      ...input,[name]: value
    })
}



  const handleSubmit = (e) => {
    e.preventDefault();
    let err = Error()
    if(input.password.length <= 7){
      setWrong(true)
    }
    if(input.password.length >=7){
    
    // const checkUser = userLists.find(x=> x.username === input.username && x.password === input.password)
    axios.post("https://backendexample.sanbersy.com/api/register", {
      name: input.name,
      email: input.email,
      password: input.password
    })
    .then((res) => {
    setWrong(null)
    console.log(res.data)
    setSuccessRegis(true)
    
    history.push('/login')
    // Cookies.remove('username')
    // Cookies.remove('token')
    // Cookies.remove('email')
  })
  .catch(err => console.log(err))
}


  }



  return (
    <>

      <h1 style={{textAlign:'center'}}>Create Account</h1>
    <div className="top">

      <form onSubmit={handleSubmit}  id="login-form" className="login-form"  role="main">
      {wrong &&  <Alert message="Panjang Password minimal 8 karakter" type="warning" showIcon closable /> }
  <h1 className="a11y-hidden">Login Form</h1>
  <div>
  <label className="label-email">
      <input onChange={handleChange} value={input.name} type="name" className="text" name="name" placeholder="Username"  />
      <span className="required">Username</span>
    </label>
    <label className="label-email">
      <input onChange={handleChange} value={input.email} type="email" className="text" name="email" placeholder="Email"  />
      <span className="required">Email</span>
    </label>
  </div>
 
  <div>
    <label className="label-password">
      <input type="text" value={input.password} onChange={handleChange} className="text" name="password" placeholder="Password" />
      <span className="required">Password</span>
    </label>
  </div>
  <input type="submit" />
  
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
    {/* <div className='layout' >
      <div className='bg'>
      <form onSubmit={handleSubmit}>
                    <label style={{paddingLeft:'10px',color:'white'}} >Name: </label>
                    <input style={{marginLeft:'55px'}} type="text" name="name" onChange={handleChange} value={input.name} />
                    <br />
                    <br />
                    <label  style={{paddingLeft:'10px',color:'white'}} >Email: </label>
                    <input  style={{marginLeft:'55px'}}  type="email" name="email" onChange={handleChange} value={input.email} />
                    <br />
                    <br />
                    <label  style={{paddingLeft:'10px',color:'white'}}>Password: </label>
                    <input  style={{marginLeft:'30px'}} type="password" name="password" onChange={handleChange} value={input.password} />
                    <br />
                    <br />
                    <button>Register</button>
                </form>
    </div>
    </div> */}
    </>
  )
}

export default Register