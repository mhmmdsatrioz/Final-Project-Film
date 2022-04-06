import React,{useEffect,useContext, useState} from 'react';
import axios from 'axios';
import { UserContext } from '../Global/UseContext';
import MovieList from './MovieList';
import DataGame from './DataGame';
import Cookies from "js-cookie";
import Loading from './Loading';
import Footer from './Footer';


import {Col,BackTop,Button,Row} from 'antd'
import {ArrowUpOutlined,} from '@ant-design/icons';

const Home = () => {
    const {dataFilm, setDataFilm,dataGame,loading,setLoading, setDataGame} = useContext(UserContext)
    const [welcome, setWelcome] = useState('')

    // DATA GAMES
    const getDataGames =() => {
        let api = 'https://backendexample.sanbersy.com/api/data-game'
        axios.get(api)
        .then(res => {
            setLoading(true)
            setDataGame(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    
    }
    
    // DATA FILM
    const getDateFilm = () => {
        const date = new Date()
        if(date.getHours() > 0 && date.getHours() < 12){
            setWelcome(' Selamat Pagi')
        }
        else if(date.getHours() >= 12 && date.getHours() < 15){
            setWelcome(' Selamat Siang')
        }
        else if(date.getHours() >= 15 && date.getHours() < 18){
            setWelcome(' Selamat Sore')
        }
        else if(date.getHours() >= 18 && date.getHours() < 24){
            setWelcome(' Selamat Malam')
        }
        axios.get('https://backendexample.sanbersy.com/api/data-movie')
        .then((res) => {
            setLoading(true)
            let short = res.data.sort(function (a,b) {
                return a.rating < b.rating ? 1 :
                b.rating < a.rating ? -1 :0
            })
            setDataFilm(short)
        })
        .catch(err => console.log(err))

    }
   

    useEffect(() => {
        getDateFilm()
        getDataGames()
    },[])


const style = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: 4,
    backgroundColor: '#1088e9',
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  };

  return (
    <div>
        <div>
        {loading ? null : <Loading/>}
        </div>
            <Col>
        {Cookies.get('username') ? <p style={{textAlign:'center',fontSize:'1.3rem'}}>{welcome} { Cookies.get('username').length >=10 ? Cookies.get('username')?.substring(0,9)+ '👋'+'..' : Cookies.get('username')}👋</p> : null}
          
                <h2 style={{padding:'0 20px'}}>Top Movie</h2>
        <div style={{display:'flex', justifyContent:'center', flexDirection:'row',}}>
            <Row justify='center'>
        {dataFilm.map((item,idx) => {
            return (
                    
                 <MovieList 
                 item={item} key={idx}/>
                 )
                })}
                </Row>
    </div>
    <BackTop>
    <div style={style}><ArrowUpOutlined /></div>
    </BackTop>
    
    <h2 style={{padding:'0 20px'}}>New Release Game</h2>

    <div style={{display:'flex', justifyContent:'center', flexDirection:'row',}}>
        <Row justify='center'>
    {dataGame.map((item,idx) => (
        <DataGame item={item} key={idx} />
    ))}
    </Row>
    </div>
            </Col>
            <Footer/>
    </div>
  )
}

export default Home