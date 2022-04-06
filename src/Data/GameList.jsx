import React,{useEffect,useContext,useState} from 'react';
import axios from 'axios';
import { UserContext } from '../Global/UseContext';
import Loading from '../pages/Loading';
import {useHistory} from 'react-router-dom';
import NavGame from '../pages/NavGame';
import './datamovie.css';

import {Table, Card ,Button,Row,Col, Popconfirm, message } from 'antd';
import {EditOutlined,DeleteOutlined} from '@ant-design/icons';
import Cookies from "js-cookie";

const GameList = () => {
  const history = useHistory();
    const {Meta} = Card;
    const [name, setName] = useState(null)
    const {loading,loginStatus,setLoading,dataGame, setDataGame} = useContext(UserContext);

    const [items, setItems] = useState([]);

    const dataBase = () => {
        let api = 'https://backendexample.sanbersy.com/api/data-game'
        axios.get(api) 
        .then((res) => {
        setLoading(true)
            setDataGame(res.data)
        })
    }

    function confirm(e) {
      console.log(e);
    }
    
    function cancel(e) {
      console.log(e);
      message.error('Data gagal dihapus');
    }

    const handleDelete = (id) => {
      let api = 'https://backendexample.sanbersy.com/api/data-game/'+id
      let token = Cookies.get('token')
      
      axios.delete(api,  {headers: {"Authorization" : "Bearer "+ token}})
      .then((res) => {
      message.success(' Berhasil Dihapus')
      setLoading(true)
            dataBase()
      })
      .catch(err => console.log(err))
    }


  

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


    function onChange(pagination, filters, sorter, extra) {
      // console.log('params', pagination, filters, sorter, extra);
    }

    // DATA COLUMN UTK TABEL
    const Columns = [
      {title: 'Name',
      key:'name',
      dataIndex: 'name',
      filters: [
        { text: 'C', value: 'C' },
        { text: 'A', value: 'A' },
        { text: 'B', value: 'B' },
        { text: 'D', value: 'D' },
        { text: 'E', value: 'E' },
      ],
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      filterSearching: true,
      sorter : {
        compare : (a,b) => {
          if(a.name < b.name) return -1
          if(a.name > b.name) return 1
          return 0
        }
      }
    },
        {
          title: 'Genre', 
          key:'genre',
          dataIndex: 'genre',
          filters: [
            {text: 'FPS', value: 'FPS'},
            {text: 'MOBA', value: 'MOBA'},
            {text: 'RPG', value: 'RPG'},
            {text: 'RTS', value: 'RTS'},
            {text: 'Simulation', value: 'Simulation'},
            {text: 'Sports', value: 'Sports'},
            {text: 'Strategy', value: 'Strategy'},
            {text: 'Survival', value: 'Survival'},
            {text: 'Adventure', value: 'Adventure'},
            {text: 'War', value: 'War'},
            {text: 'Shooter', value: 'Shooter'},
          ],
          onFilter: (value, record) => record.genre.indexOf(value) === 0,
          filterSearch: true,
          sorter: {
            compare: (a, b) => {
              if (a.genre < b.genre) return -1;
              if (a.genre > b.genre) return 1;
              return 0;
            }
          }
        },
        {
          title: 'Image', 
          key:'image',
          dataIndex: 'image_url',
          render: (image) => {
          return(
            <div style={{width:'300px'}}>
              <img style={{width:'45%'}} src={image} />
            </div>
              )
            },
        },
        {
          title: 'Single Player',
          key:'singlePlayer',
          dataIndex:'singlePlayer',
          sorter : {
            compare : (a,b) => {
              if(a.singlePlayer < b.singlePlayer) return -1
              if(a.singlePlayer > b.singlePlayer) return 1
              return 0
            }
          },
          render: (singlePlayer) => {
            let single = singlePlayer  === 0 ? <p>No</p>   : <p>Yes</p>
         return(
           <>
           {single}
           </>
            )
      },
        },
        {
          title: 'Multi Player',
          key:'multiplayer',
          dataIndex:'multiplayer',
          render: (multiplayer) => {
              let mult = multiplayer  === 0 ? <p>No</p>   : <p>Yes</p>
           return(
             <>
             {mult}
             </>
              )
          }
        },
        {
          title: ' Platform',
          key:'platform',
          dataIndex:'platform',
          filters:[
            {text: 'PC', value: 'PC'},
            {text: 'PS4', value: 'PS4'},
            {text: 'XBOX', value: 'XBOX'},
            {text: 'Switch', value: 'Switch'},
            {text: 'Mobile', value: 'Mobile'},
          ],
          onFilter: (value, record) => record.platform.indexOf(value) === 0,
          filterSearch: true,
        },
        {
          title:'Action',
          key:'action',
          render: (res,index) => (
            <div>
              {Cookies.get('token')  ? 
               <Button onClick={() => history.push(`/creategame/game/${res.id}`)} type='primary' style={{backgroundColor:'#4781ec',color:'#fff',textAlign:'left'}}>
               <EditOutlined />
               </Button> : null
               }
              {Cookies.get('token') ? 
              <Popconfirm
              title="Apa kamu yakin ingin menghapus data ini?"
              onConfirm={() => handleDelete(res.id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
           <Button  value={res.id}  type='primary' danger style={{textAlign:''}}> <DeleteOutlined/> </Button>
           </Popconfirm>
   :null }
            </div>
          )
        }
    ]



      useEffect(() => {
        dataBase()
    },[])

  return (
    <div>
        {loading ? null : <Loading/>}
        <NavGame  />

            <Col >
        <Row justify='center'>
<Table className='tabel' onChange={onChange} columns={Columns}  dataSource={dataGame}  />
        </Row>

        </Col>
    </div>
  )
}

export default GameList