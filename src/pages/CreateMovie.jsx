import React,{useContext, useState,useEffect,use} from 'react';
import axios from 'axios';
import './createGame.css';
import Cookies from "js-cookie"
import { UserContext } from '../Global/UseContext';
import swal from 'sweetalert';
import Loading from '../pages/Loading';
import { useHistory } from 'react-router-dom';

const CreateMovie = () => {
  const {dataFilm,loading,setLoading, setDataFilm} = useContext(UserContext);
  const history = useHistory();
  const [Update, setUpdate] = useState(false);

  const [input, setInput] = useState({
    title:'',
    description:'',
    year:1980,
    duration:0,
    genre: '',
    image_url: '',
    review: '',
    rating:''});

    const handleChange = (e) => {
      let name = e.target.name
      let value = e.target.value
      setInput({
        ...input,
        [name]:value
      });
    };

    useEffect(() => {
      let id = window.location.pathname.split('/')[3]

      let api = `https://backendexample.sanbersy.com/api/data-movie/${id}`
      let token = Cookies.get('token')
      axios.get(api,{
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then((res) => {
        setInput({
          title:res.data.title,
          description:res.data.description,
          year:res.data.year,
          duration:res.data.duration,
          genre: res.data.genre,
          image_url: res.data.image_url,
          review: res.data.review,
          rating: res.data.rating
        })
        setUpdate(true)
      })
      .catch(err => console.log(err))

    },[])

    const handleSubmit = (e) => {
      e.preventDefault();
      if(Update !== true){
      let api = 'https://backendexample.sanbersy.com/api/data-movie'
      let token = Cookies.get('token')
      let data = {
        title:input.title,
        description:input.description,
        year:input.year,
        duration:input.duration,
        token:token,
        genre: input.genre,
        image_url: input.image_url,
        review: input.review,
        rating: input.rating
      }
      axios.post(api,data)
      .then((res) => {
        setDataFilm([...dataFilm,res.data])
        history.push('/movie')
        setLoading(true)
        swal("Data Berhasil Ditambah", {
          icon: "success",
      });
      })
      .catch(err => console.log(err))
    }
      else {
        let token = Cookies.get('token')
         let id = window.location.pathname.split('/')[3]
         axios.put(`https://backendexample.sanbersy.com/api/data-movie/${id}`,{
          title:input.title,
          description:input.description,
          year:input.year,
          duration:input.duration,
          token:token,
          genre: input.genre,
          image_url: input.image_url,
          review: input.review,
          rating: input.rating
         })
           .then((res) => {
             history.push('/movie')
        setLoading(true)
        setUpdate(false)
             swal("Data Berhasil Diupdate", {
              icon: "success",
          });
           })
           .catch(err => console.log(err))
       }
    };

  return (
     <>
<form onSubmit={handleSubmit}>
  <div className="container">
    {Update ? <h1>Edit Movie</h1> : <h1>Create Movie</h1>}
    {loading ? null : <Loading/>}
    <hr/>

    <label ><b>Nama</b></label>
    <input onChange={handleChange} value={input.title} type="text" placeholder="Nama " name="title"  />

    <label ><b>Deskripsi</b></label>
    <input type="text" value={input.description}  onChange={handleChange} placeholder="Deskripsi" name="description" id="psw" />

    <label ><b>Gambar</b></label>
    <input  onChange={handleChange} value={input.image_url} type="url" placeholder="Url Gambar" name="image_url" id="psw" />

    <label ><b>Tahun</b></label>
    <input onChange={handleChange} value={input.year} type="number" min={1980} max={2021} placeholder="Tahun" name="year" id="psw" />

    <label ><b> Durasi</b></label>
    <input value={input.duration}  onChange={handleChange} type="number"  placeholder=" Duration" name="duration" id="psw" />


    <label><b>Genre</b></label>
    <input value={input.genre} onChange={handleChange} type='text'  placeholder="Genre" name="genre" id="psw" />

    <label><b>Rating</b></label>
    <input value={input.rating} onChange={handleChange} type='number' min={0} max={10} placeholder="Rating" name="rating" id="psw" />

    <label><b>Review</b></label>
    <input value={input.review} onChange={handleChange} type='text' placeholder="Review" name="review" id="psw" />

  
    <hr/>

    <input type='submit'  className="registerbtn"/>
    </div>
</form>
</>
  )
}

export default CreateMovie;