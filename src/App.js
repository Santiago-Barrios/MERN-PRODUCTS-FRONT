import React, {useState,useEffect} from 'react';
import {BrowserRouter, Switch, Router, Route} from 'react-router-dom';
import Axios from 'axios';
import Header from './componets/layout/header'; 

import CreateProduct from './componets/pages/CreateProduct';
import ListProducts from './componets/pages/ListProducts';
import EditProducts from './componets/pages/EditProducts';
import CreateTypes from './componets/pages/CreateType';
import ListTypes from './componets/pages/ListTypes';
import EditTypes from './componets/pages/EditType';

import Login from './componets/auth/Login';
import Register from './componets/auth/Register';

import UserContext from './context/UserContext';

import './style.css';


export default function App(){

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect( () => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");

      if(token === null){
        localStorage.setItem('auth-token', '');
        token = '';
      }

      const tokenRes = await Axios.post(
        'http://localhost:5000/users/tokenIsValid', 
        null, 
        { headers: {'x-api-key': token} }
      );
      if(tokenRes.data){
        const userRes = await Axios.get('http://localhost:5000/users/', 
        {headers: {'x-api-key': token},
      });
      setUserData({
        token,
        user: userRes.data,
      })
      }
    }

    checkLoggedIn();
  }, []);

  return(
    <>
    <BrowserRouter>
      <UserContext.Provider value={{userData, setUserData}}>
        <Header></Header>
        <div className="container">
        <Switch>
            <Route exact path="/" component={ListProducts} />
            <Route path="/createProducts" component={CreateProduct} />
            <Route path="/editProducts" component={EditProducts} />
            <Route path="/createTypes" component={CreateTypes} />
            <Route path="/listTypes" component={ListTypes} />
            <Route path="/editTypes" component={EditTypes} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
        </Switch>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
    </>
  )
}