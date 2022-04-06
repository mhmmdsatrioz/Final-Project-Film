import React,{useState, useEffect} from 'react';
import axios from 'axios';

// css
import './detailmovie.css';

// ant design
import {Rate,  Card } from 'antd';



const DetailGame = () => {
  const [data, setData] = useState([]);

  const getById = () => {
    let id = window.location.pathname.split('/')[3]
    axios.get(`https://backendexample.sanbersy.com/api/data-game/${id}`)
    .then((res) => {
      setData(res.data)

    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    getById()
  },[])


  return (
    <div style={{height:'auto'}}>
    <div className='detailTop'>
    <div className='layout'>
      <img  className='img' src={data.image_url} alt=""/>
      <div>
        <h1 >{data.name}</h1>
   
    <div className='show-info'>
    <Card className='card' style={{backgroundColor:'#EFEFE7' }}>
     <h1>Show Info</h1>
     <p> <span style={{fontWeight:'bold'}}>Rating :</span>
    <Rate defaultValue={1} count={1} />
    <span className="ant-rate-text" style={{color:'#333'}}> {data.rating}/10</span></p>
        <p><span style={{fontWeight:'bold'}}> Genre :</span> <span style={{paddingLeft:'5px'}}> {data.genre}</span> min</p>
      <p><span style={{fontWeight:'bold'}}> Single Player :</span>  <span style={{paddingLeft:'5px'}}> {data.singlePlayer}</span></p>
      <p><span style={{fontWeight:'bold'}}> Multi Player :</span>  <span style={{paddingLeft:'5px'}}> {data.multiplayer}</span></p>
      <p><span style={{fontWeight:'bold'}}> Platform :</span>  <span style={{paddingLeft:'5px'}}> {data.platform}</span></p>
      <p><span style={{fontWeight:'bold'}}> Release :</span>  <span style={{paddingLeft:'5px'}}> {data.release}</span></p>
    
  </Card>,
   
    </div>
    </div>
        </div>
    </div>
    </div>
  )
}

export default DetailGame;