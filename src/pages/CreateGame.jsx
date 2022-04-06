import React,{useContext, useState,useEffect} from 'react';
import axios from 'axios';
import './createGame.css';
import Cookies from "js-cookie"
import { UserContext } from '../Global/UseContext';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';

const CreateGame = () => {
  const {dataGame, setDataGame} = useContext(UserContext);
  const history = useHistory();
  const [Edit, setEdit] = useState(false);
  const [Update, setUpdate] = useState(false);

  const [input, setInput] = useState({
    name:'',
    genre:'',
    singlePlayer:0,
    multiplayer:0,
    release: 2000,
    image_url: '',
    platform:''});

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
      let api = `https://backendexample.sanbersy.com/api/data-game/${id}`
      let token = Cookies.get('token')
      axios.get(api,{
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then((res) => {
        setInput({
          name:res.data.name,
          genre:res.data.genre,
          singlePlayer:res.data.singlePlayer,
          multiplayer:res.data.multiplayer,
          release: res.data.release,
          image_url: res.data.image_url,
          platform: res.data.platform
        })
        setEdit(true)
        setUpdate(true)
      })
      .catch(err => console.log(err))
    },[])

    const handleSubmit = (e) => {
      e.preventDefault();
      if(Edit !== true){
      let api = 'https://backendexample.sanbersy.com/api/data-game'
      let token = Cookies.get('token')
      let data = {
        name:input.name,
        genre:input.genre,
        singlePlayer:input.singlePlayer,
        multiplayer:input.multiplayer,
        release: input.release,
        token:token,
        image_url: input.image_url,
        platform: input.platform
      }
      axios.post(api,data)
      .then((res) => {
        setDataGame([...dataGame,res.data])
        history.push('/games')
        swal({
          title: "Success!",
          text: "Data Berhasil Ditambah!",
          icon: "success",
        })
      })
      .catch(err => console.log(err))
    }
    else {
       let token = Cookies.get('token')
        let id = window.location.pathname.split('/')[3]
        let data = {
          name:input.name,
          genre:input.genre,
          singlePlayer:input.singlePlayer,
          multiplayer:input.multiplayer,
          release: input.release,
          image_url: input.image_url,
          platform: input.platform,
          token:token
        }
        let api =  'https://backendexample.sanbersy.com/api/data-game/' + id
        axios.put(api,data,{
          headers: {
            'Authorization': 'Bearer ' + token
          }})
          .then((res) => {
            history.push('/games')
            swal({
              title: "Success!",
              text: "Data Berhasil Diupdate!",
              icon: "success",
            })
            setUpdate(false)
          })
          .catch(err => console.log(err))
      }

    }

  return (
     <>
<form onSubmit={handleSubmit}>
  <div className="container">
    {Edit ? <h1>Edit Game</h1> : <h1>Create Game</h1>}
    <hr/>

    <label ><b>Nama</b></label>
    <input onChange={handleChange} value={input.name} type="text" placeholder="Nama " name="name"  />

    <label ><b>Genre</b></label>
    <input type="text" value={input.genre}  onChange={handleChange} placeholder="Genre" name="genre" id="psw" />

    <label ><b>Gambar</b></label>
    <input  onChange={handleChange} value={input.image_url} type="url" placeholder="Url Gambar" name="image_url" id="psw" />

    <label ><b>Single Player</b></label>
    <input onChange={handleChange} value={input.singlePlayer} type="number" min='0' max='1' placeholder="Boolean" name="singleplayer" id="psw" />

    <label ><b>Multi Player</b></label>
    <input value={input.multiplayer}  onChange={handleChange} type="number" min='0' max='1' placeholder=" Boolean" name="multiplayer" id="psw" />


    <label><b>Release</b></label>
    <input value={input.release} onChange={handleChange} type='number' max='2021' min='2000' placeholder="release" name="release" id="psw" />

   

    <label ><b>Platform</b></label>
    <input value={input.platform} onChange={handleChange} type="text" placeholder="platform" name="platform" id="psw-repeat" />
    <hr/>

    <input type='submit'  className="registerbtn"/>
    </div>
</form>
</>
  )
}

export default CreateGame