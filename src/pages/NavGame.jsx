import React,{useContext,useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Cookies from "js-cookie";
import { UserContext } from '../Global/UseContext';

import {Input,Space} from 'antd';
import './navgame.css';
import {SearchOutlined} from '@ant-design/icons';
import axios from 'axios';

const NavGame = () => {
  const {setDataGame,dataGame,setLoading} = useContext(UserContext)

  const {Search} = Input;
  const [name, setName] = useState('')

  const dataBase = () => {
    let api = 'https://backendexample.sanbersy.com/api/data-game'
    axios.get(api) 
    .then((res) => {  
    setLoading(true)
        setDataGame(res.data)
    })
}

useEffect(() => {
  dataBase()
},[])

  const handleSearch = (e) => {
    let key =e.target.value
    setName(key)
    let data = dataGame.filter((item) => {
      return item.name.toLowerCase().includes(name.toLowerCase())
    })
      if(key === ''){
        return dataBase()
      }
      else {
        return setDataGame(data)
      }
  }

  const [search, setSearch] = React.useState(null);

  if(Cookies.get('token') === undefined) {
    return null
  }
  else if (Cookies.get('token') !== undefined) {
    return(

      <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <div style={{width:'97%',display:'flex',justifyContent:'space-between',alignItems:'center',borderRadius:'5px',padding:'0 10px',height:'45px',marginTop:'5px',backgroundColor:'#ECECED', display:'flex'}}>
            <ul style={{margin:'auto 0'}}>
              <Link className='babel' style={{color:'#333'}} to="/creategame/game">Create Tabel Game</Link>
              <span style={{padding:'0 10px',}}>/</span>
            </ul>
        <input size="small" value={name} onChange={handleSearch} placeholder="🔍 Search Game" className='a' />

            <div>
           
            </div>
          </div>
      </div>
    )
  }

    

}

export default NavGame