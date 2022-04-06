import React,{useState,useContext, useEffect} from 'react';
import axios from 'axios';
import {UserContext} from '../Global/UseContext';
// css
import './detailmovie.css';
import Loading from './Loading';
// ant design
import {Rate,  Card } from 'antd';



const DetailMovie = () => {
  const {loading,setLoading} = useContext(UserContext);

  // STATE
  const [data, setData] = useState([]);

  const getById = () => {
    let id = window.location.pathname.split('/')[3]
    axios.get(`https://backendexample.sanbersy.com/api/data-movie/${id}`)
    .then((res) => {
      setData(res.data)
      setLoading(true)
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    getById()
  },[])


  return (
    <div style={{height:'auto'}}>
      {loading ? null : <Loading/>}
    <div className='detailTop'>
    <div className='layout'>
      <img  className='img' src={data.image_url} alt=""/>
      <div>
        <h1 >{data.title}</h1>
        <p>{data.description}</p>
   
    <div className='show-info'>
    <Card className='card' style={{backgroundColor:'#EFEFE7' }}>
     <h1>Show Info</h1>
     <p> <span style={{fontWeight:'bold'}}>Rating :</span>
    <Rate defaultValue={1} count={1} />
    <span className="ant-rate-text" style={{color:'#333'}}> {data.rating}/10</span></p>
        <p><span style={{fontWeight:'bold'}}> Duration :</span> <span style={{paddingLeft:'5px'}}> {data.duration}</span> min</p>
      <p><span style={{fontWeight:'bold'}}> Year :</span>  <span style={{paddingLeft:'5px'}}> {data.year}</span></p>
      <p><span style={{fontWeight:'bold'}}> Genres :</span>  <span style={{paddingLeft:'5px'}}> {data.genre}</span></p>
      <p><span style={{fontWeight:'bold'}}> Review :</span>  <span style={{paddingLeft:'5px'}}> {data.review}</span></p>
    
  </Card>,
   
    </div>
    </div>
        </div>
    </div>
    </div>
  )
}

export default DetailMovie;