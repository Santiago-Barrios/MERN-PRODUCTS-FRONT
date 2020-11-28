import React, {Component} from 'react';
import Axios from 'axios';


export default class EditProduct extends Component{

  state = {
    nombre:'',
    tipo:'',
    precio:'',
    cantidad:'',
    type:[],
  }

  async componentDidMount() {
    let token = localStorage.getItem('auth-token');
    if(!token && !localStorage.getItem('idedit')){
      window.location.href = "/login";
    }

    const id = localStorage.getItem('idedit');
    const res = await Axios.get(`http://localhost:5000/products/${id}`,
    {headers: {'x-api-key': token}});
    this.setState({
      nombre:res.data.nombre,
      tipo:res.data.tipo,
      precio:res.data.precio,
      cantidad:res.data.cantidad,
     })
     console.log(res);
    this.getTypes();
  }

  async getTypes() {
    let token = localStorage.getItem('auth-token');
    const res = await Axios.get('http://localhost:5000/types/all', 
   {headers: {'x-api-key': token}}
   );
   this.setState({type:res.data});
   console.log(res);
  }

  handleChange = async (e) => {
    await this.setState({
      [e.target.name]: e.target.value,
    });
  };

  save = async(e)=>{

    const id = localStorage.getItem('idedit');
    let token = localStorage.getItem('auth-token');
    const { nombre, tipo, precio, cantidad }=this.state
    const res = await Axios.put(`http://localhost:5000/products/${id}`,
    {nombre, tipo, precio, cantidad},
    {headers: {'x-api-key': token}});
    console.log(res);
    window.location.href='/'
}

  render(){


    return(
      <div className="page" >
      <h3 className="center" > Edit your Product </h3>
       <div className="container">
          
  
        <div className="row" className="center">
          <div className="col s8">
            <div className="card">
              <div className="card-content card-panel grey lighten-3">
  
                <form>
  
                  <div className="row">
                      <div className="input-field col s12"> 
                      <input type="text" placeholder={this.state.nombre} 
                       id="product-nombre"
                       name="nombre"
                       onChange={this.handleChange}
                       value={this.state.nombre}
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
                      <input type="Number" placeholder={this.state.precio} 
                      id="product-precio"
                      name="precio"
                      value={this.state.precio}
                      onChange={this.handleChange}
                      />
                    </div>
                  </div>
  
                  <div className="row">
                    <div className="input-field col s12">
                      <input type="Number" placeholder={this.state.cantidad}
                      id="product-cantidad"
                      name="cantidad"
                      value={this.state.cantidad}
                      onChange={this.handleChange}
                      />
                    </div>
                  </div>
  
                  <button type="submit" 
                          className="btn grey darken-4 waves-effect waves-light container large"
                          onClick={this.save}>
                    Editar
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