import React,{useContext,useState} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import swal from 'sweetalert';
import sweetalert from 'sweetalert';

// PAGES
import Home from '../pages/Home';
import './App.css';
import DetailMovie from '../pages/DetailMovie';
import DetailGame from '../pages/DetailGame';
import CreateGame from '../pages/CreateGame';
import Login from '../pages/Login';
import Navbar from '../components/Navbar';
import Register from '../pages/Register';
import GameList from '../Data/GameList';
import DataMovie from '../Data/DataMovie';
import ChangePw from '../components/ChangePw';
import CreateMovie from '../pages/CreateMovie';
// cookies
import Cookies from "js-cookie"



// STATE CONTEXT
import {UserContext} from '../Global/UseContext';

const Routes = () => {
  // const {loginStatus} = useContext(UserContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  
  const LoginRoute = ({ ...props }) => { 
    if(Cookies.get('username') === undefined) { return (  <Route {...props} /> )}
    else if( Cookies.get('username') !== undefined ) { return <Redirect to="/" /> } 
   }

   const CreateTable = ({...props}) => {
     if(Cookies.get('token') !== undefined) { return (  <Route {...props} /> )}
     else if (Cookies.get('token') === undefined) { 
      swal("Ups!", "Login dahulu ya", "warning");
      return <Redirect to="/games" /> }
    }

    const Movie = ({...props}) => {
      if(Cookies.get('token') !== undefined) {return ( <Route {...props} /> )}
      else if (Cookies.get('token') === undefined) {
        swal("Ups!", "Login dahulu ya", "warning");
        return <Redirect to="/movie" /> }
    }




  const Review = ({ ...props }) => {
    if(Cookies.get('token') === undefined) {
      swal("Ups!", "Login dahulu ya", "warning");
      return(
        <Redirect to="/" />
      )
    }
    else if( Cookies.get('token') !== undefined ) { return <Route {...props} /> 
  }
      }

  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Review exact path="/detail/movie/:id" component={DetailMovie}/>
        <Review exact path="/detail/game/:id" component={DetailGame}/>
        <Route exact path="/games" component={GameList}/>
        <Route exact path="/movie" component={DataMovie}/>
        <LoginRoute exact path="/login" component={Login}/>
        {/* <Route exact path="/movie" component={MovieList}/> */}
        <Route exact path="/register" component={Register}/>
        {/* route get tokken */}
        
        <CreateTable exact path={'/creategame/game/:id?'} component={ CreateGame}/>
        <Movie exact path={'/createmovie/movie/:id?'} component={ CreateMovie}/>
        <Route exact path={`/changepassword`} component={ ChangePw}/>
        </Switch>
    </Router>
  )
}

export default Routes