import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';

import userContext from '../../context/UserContext';

export default function AuthOptions(){
  const {userData, setUserData} = useContext(userContext);

  const history = useHistory();

  const register = () => {
    history.push('/register');
  }

  const logIn = () => {
    history.push('/login');
  }

  const logout = () =>{
    setUserData({
      token: undefined,
      user: undefined
    });
    localStorage.setItem('auth-token', '');
    localStorage.setItem('idedit', '');
    localStorage.setItem('id-edit-type', '');
    history.push('/login');
  }

  const listProducts = () =>{
    history.push('/');
  }
  
  const createProducts = () =>{
    history.push('/createProducts');
  }

  const createTypes = () =>{
    history.push('/createTypes');
  }

  const listTypes = () =>{
    history.push('/listTypes');
  }

  return(
    <div className="auth-options" >
      {
        userData.user ? (
        <>
        <button onClick={listProducts} >List Products</button>
        <button onClick={createProducts} >Create Product</button>
        <button onClick={listTypes} >List Types</button>
        <button onClick={createTypes} >Create Type</button>
        <button onClick={logout} >Log out</button> 
        </>
      ) : (
        <>
          <button onClick={register} >Register</button>
          <button onClick={logIn} >Log in</button>
        </>
      )}
    </div>
  );
}