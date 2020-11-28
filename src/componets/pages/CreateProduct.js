import React, {Component} from 'react';
import Axios from 'axios';


export default class CreateProduct extends Component {

  state = {
    nombre:'',
    tipo:'',
    precio:'',
    cantidad:'',
    type:[],
  }

  async componentDidMount() {
    let token = localStorage.getItem('auth-token');
    if(!token){
      window.location.href = "/login";
    }
    this.getTypes();
  }

  async getTypes() {
    let token = localStorage.getItem('auth-token');
    const res = await Axios.get('http://localhost:5000/types/all', 
   {headers: {'x-api-key': token}}
   );
   this.setState({type:res.data});
  //  console.log(res);
  }

  handleChange = async (e) => {
    await this.setState({
      [e.target.name]: e.target.value,
    });
  };

  send = async(e)=>{

    let token = localStorage.getItem("auth-token");
    const { nombre, tipo, precio, cantidad } = this.state;
    const res = await Axios.post(
      'http://localhost:5000/products',
      {nombre, tipo, precio, cantidad}, 
      {headers: {'x-api-key': token}}
      )
      .then ( data => {
        console.log(data.data.description);
      })
      window.location.href='/'
}

  render(){

  return (
 
  <div className="page" >
    <h3 className="center" > Create your Product </h3>
     <div className="container">
        

      <div className="row" className="center">
        <div className="col s8">
          <div className="card">
            <div className="card-content card-panel grey lighten-3">

              <form>

                <div className="row">
                    <div className="input-field col s12"> 
                    <input type="text" placeholder="Nombre del Producto" 
                     id="product-nombre"
                     name="nombre"
                     onChange={this.handleChange}
                     />
                  </div>
                </div>
  
                <div className="row">
                 <div className="input-field col s12">
                      <select className="browser-default" 
                      id="product-tipo"
                      name="tipo"
                      onChange={this.handleChange}
                      >
                    <option value="" disabled selected > choose type </option>
                      {this.state.type.map( tipo => {
                        return(
                          <>
                          <option key={tipo._id} value={tipo.typeName}  > {tipo.typeName} </option>
                          </>
                          )
                        })}
                    </select>
                  </div>
                </div>

               <div className="row">
                  <div className="input-field col s12">
                    <input type="Number" placeholder="Precio" 
                    id="product-precio"
                    name="precio"
                    onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <input type="Number" placeholder="Cantidad"
                    id="product-cantidad"
                    name="cantidad"
                    onChange={this.handleChange}
                    />
                  </div>
                </div>

                <button type="submit" 
                        className="btn grey darken-4 waves-effect waves-light container large"
                        onClick={this.send}>
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
}