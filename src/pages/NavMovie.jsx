import React,{useContext,useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Cookies from "js-cookie";
import { UserContext } from '../Global/UseContext';

import {Input,Space} from 'antd';
import axios from 'axios';

const NavMovie = () => {
  const {dataFilm, setDataFilm,setLoading} = useContext(UserContext)

  const {Search} = Input;
  const [name, setName] = useState('')

  const handleSearch = (e) => {
    let key =e.target.value
    setName(key)
    let data = dataFilm.filter((item) => {
      return item.title.toLowerCase().includes(key.toLowerCase())
    })

      if(key === ''){
         dataBase()
      }
      else {
         setDataFilm(data)
      }
      
  }

  const dataBase = () => {
    let api = 'https://backendexample.sanbersy.com/api/data-movie'
    axios.get(api) 
    .then((res) => {  
    setLoading(true)
    setDataFilm(res.data)
    })
}

useEffect(() => {
  dataBase()
},[])


  const [search, setSearch] = React.useState(null);

  if(Cookies.get('token') === undefined) {
    return null
  }
  else if (Cookies.get('token') !== undefined) {
    return(

      <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <div style={{width:'97%',display:'flex',justifyContent:'space-between',alignItems:'center',borderRadius:'5px',padding:'0 10px',height:'45px',marginTop:'5px',backgroundColor:'#ECECED', display:'flex'}}>
            <ul style={{margin:'auto 0'}}>
              <Link className='babel' style={{color:'#333'}} to="/createmovie/movie">Create Tabel Movie</Link>
              <span style={{padding:'0 10px',}}>/</span>
            </ul>
        <input size="small" value={name} onChange={handleSearch} placeholder="🔍 Search Movie" className='a' />

            <div>
           
            </div>
          </div>
      </div>
    )
  }

    

}

export default NavMovie