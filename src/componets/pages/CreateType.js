import React, {useContext, useEffect, useState} from 'react';
import Axios from 'axios';
import {useHistory} from 'react-router-dom';
import UserContext from '../../context/UserContext';

export default function CreateType() {
  const {userData} = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if(!userData.user){
      history.push('/login');
    }
  })

  //State
  const [typeName, setTypeName] = useState();

  const submit = async (e) => {
    e.preventDefault();
    
    let token = localStorage.getItem("auth-token");
    
    const newType = {typeName};
    await Axios.post(
      'http://localhost:5000/types',
      newType, 
      {headers: {'x-api-key': token}}
      )
      .then ( data => {
        console.log(data.data.description);
        setTypeName('');
      })
    history.push('/listTypes');
  }

  return (
 
  <div className="page" >
    <h3 className="center" > Create your Type </h3>
     <div className="container">
        

      <div className="row" className="center">
        <div className="col s8">
          <div className="card">
            <div className="card-content card-panel grey lighten-3">

              <form onSubmit={submit}> 

                <div className="row">
                    <div className="input-field col s12"> 
                    <input type="text" placeholder="Nombre del Producto" 
                     id="product-nombre"
                     onChange= {(e) => setTypeName(e.target.value) } 
                     />
                  </div>
                </div>
 

                <button type="submit" className="btn grey darken-4 waves-effect waves-light container large">
                  send
                  <i className="material-icons right">send</i>
                </button>

              </form>
            </div>
          </div>

        </div>
 
  
      </div>
  
    </div>
  </div>
  )
}