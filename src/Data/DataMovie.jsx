import React,{useState,useEffect,useContext} from 'react';
import Cookies from "js-cookie";
import {UserContext} from '../Global/UseContext';
import axios from 'axios';
import Loading from '../pages/Loading';
import {useHistory} from 'react-router-dom';
import NavMovie from '../pages/NavMovie';
import './datamovie.css';


import {Rate, Card,BackTop,Table, Space ,Button,Row,Col} from 'antd';
import {ArrowRightOutlined,EditOutlined,DeleteOutlined} from '@ant-design/icons';
import swal from 'sweetalert';

const DataMovie = () => {
    // HISTORY
    const history = useHistory();
    const [del, setDel] = useState(null)


    const {dataFilm, setDataFilm,loading,setLoading} = useContext(UserContext)
    const {Meta} = Card;

    
    setLoading(true)

    const handleDeleted = (id) => {
        let api = 'https://backendexample.sanbersy.com/api/data-movie/'+id
        let token = Cookies.get('token')
        axios.delete(api,  {headers: {"Authorization" : "Bearer "+ token}})
        .then((res) => {
            getDataFilm()
            swal("Data Berhasil Dihapus", {
                icon: "success",
            });
            setLoading(true)
        })
        .catch(err => console.log(err))
    }


    const getDataFilm = async () => {
        try {
            const res = await axios.get('https://backendexample.sanbersy.com/api/data-movie')
            let short = res.data.sort(function (a,b) {
                return a.rating < b.rating ? 1 :
                b.rating < a.rating ? -1 :0
            })
            setDataFilm(res.data)
    setLoading(true)


        }
        catch(err) {
            console.log(err)
        }
}



    useEffect(() => {
        getDataFilm()
    },[])

  

function onChange(pagination, filters, sorter, extra) {
  // console.log('params', pagination, filters, sorter, extra);
}


     // DATA COLUMN UTK TABEL
     const Columns = [
        {title: 'Title',
        key:'title',
        dataIndex: 'title',
        filters: [
          {text:'A', value: 'A'},
          {text:'B', value: 'B'},
          {text:'C', value: 'C'},
          {text:'D', value: 'D'},
          {text:'E', value: 'E'},
          {text:'F', value: 'F'},
          {text:'G', value: 'G'},
          {text:'H', value: 'H'},
          {text:'I', value: 'I'},
          {text:'T', value: 'T'},
        ],
        onFilter: (value, record) => record.title.indexOf(value) === 0,
        filterSearch: true,
        sorter : {
            compare : (a,b) => {
              if(a.title < b.title) return -1
              if(a.title > b.title) return 1
              return 0
            }
          }
      },
          {
            title: 'Description',
            key:'description',
            dataIndex: 'description',
            filters: [
              {text: 'A', value: 'A'},
              {text: 'B', value: 'B'},
              {text: 'C', value: 'C'},
            ],
            onFilter: (value, record) => record.description.indexOf(value) === 0,
            filterSearch: true,
            sorter : {
                compare : (a,b) => {
                  if(a.description < b.description) return -1
                  if(a.description > b.description) return 1
                  return 0
                },
              },
            render: (description) => {
                return <p style={{width:'250px'}}>{description}</p>
            }
          },
          {
            title: 'Image', 
            key:'image',
            dataIndex: 'image_url',
            render: (image) => {
            return(
              <div style={{width:'260px'}}>
                <img style={{width:'45%'}} src={image} />
              </div>
                )
              },
          },
          {
            title: 'Rating',
            key:'rating',
            dataIndex:'rating',
            sorter: {
                compare: (a, b) => a.rating - b.rating,
                // multiple: 1,
            },
            render: (rating) => {
           return(
             <>
             <p ><Rate  defaultValue={1} count={1} /><span>{rating}/10</span></p>
             </>
              )
        },
          },
          
          {
            title: 'Genre',
            key:'genre',
            dataIndex:'genre',
            filters: [
                { text: 'Action', value: 'Action' },
                { text: 'Adventure', value: 'Adventure' },
                { text: 'Comedy', value: 'Comedy' },
                { text: 'Drama', value: 'Drama' },
                { text: 'Fantasy', value: 'Fantasy' },
                { text: 'Horror', value: 'Horror' },
                { text: 'Romance', value: 'Romance' },
                { text: 'Animation', value: 'Animation' },
                { text: 'Mystery', value: 'Mystery' },
                { text: 'Crime', value: 'Crime' },
                { text: 'Documentary', value: 'Documentary' },
                { text: 'History', value: 'History' },
                { text: 'War', value: 'War' },
                { text: 'Music', value: 'Music' },
                { text: 'Sport', value: 'Sport' },
                { text: 'Others', value: 'Others' },
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.genre.indexOf(value) === 0,
          },
          {
            title: ' Year',
            key:'year',
            dataIndex:'year',
            sorter:{
                compare: (a, b) => a.year - b.year,
            }
          },
          {
            title:'Action',
            key:'action',
            render: (res,index) => (
              <div>
                 {Cookies.get('token') ? 
                 <Button onClick={() => history.push(`/createmovie/movie/${res.id}`)}type='primary'> <EditOutlined /> </Button>
                 : null }
                {Cookies.get('token') ? 
             <Button onClick={() => handleDeleted(res.id)} value={res.id}  type='primary' danger style={{textAlign:'right'}}><DeleteOutlined/> </Button>
     :null }
              </div>
            )
          }
      ]


  return (
    <div>
        <NavMovie  />

            <Col >
        <Row className='rowMovie' justify='center'>
           {loading ? null : <Loading/>}
<Table className='tabel' style={{justifyContent:'center'}} onChange={onChange} columns={Columns}  dataSource={dataFilm}  />
        </Row>

        </Col>
    </div>
  )
}

export default DataMovie