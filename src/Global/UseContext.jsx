import React, {createContext, useState} from 'react'

export const UserContext = createContext()

export const UseContext = props => {
    // STATE GLOBAL
    const [dataGame, setDataGame] = useState([]);
    const [successRegis, setSuccessRegis] = useState(false);
    const [loading,setLoading] = useState(false);

    const [dataFilm, setDataFilm] = useState([])
    const [loginStatus, setLoginStatus] = useState(false);
    const [userLists, setUserLists] = useState( [
        {username: "", password: ""},
      ]);

    //   ========
  return (
    <UserContext.Provider value={{loading,setLoading,successRegis, setSuccessRegis,dataGame, setDataGame,dataFilm,setDataFilm,loginStatus,setLoginStatus,userLists,setUserLists}}>
        {props.children}
    </UserContext.Provider>
  )
}
