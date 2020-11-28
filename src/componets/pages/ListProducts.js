import React, {Component} from 'react';
import Axios from 'axios';

export default class ListProducts extends Component{

  state = {
    products: [],
    busqueda: '',
  }

  async componentDidMount() {
    let token = localStorage.getItem('auth-token');
    if(!token){
      window.location.href = "/login";
    }
    this.getProducts();
  }

  async getProducts() {
    let token = localStorage.getItem('auth-token');
    const res = await Axios.get('http://localhost:5000/products/all', 
   {headers: {'x-api-key': token}}
   );
   this.setState({products: res.data});
  }

  deleteProduct = async (id)=>{
    let token = localStorage.getItem('auth-token');
    await Axios.delete(`http://localhost:5000/products/${id}`, 
    {headers: {'x-api-key': token}});
    this.getProducts();
}

editProduct = async(id)=>{
  let token = localStorage.getItem('auth-token');
  const res = await Axios.get(`http://localhost:5000/products/${id}`,
  {headers: {'x-api-key': token}});
  localStorage.setItem('idedit',res.data._id);
  console.log(res);
  window.location.href='./editProducts'
}

handleChange = async (e) => {
  await this.setState({
    [e.target.name]: e.target.value,
  });
  // this.filterProducts();
};

filterProducts = () => {
  const Productfind = [];
  const busqueda = this.state.busqueda;
  const [productos] = [this.state.products];
  // console.log(Productosfind[0].nombre);

  for (let i = 0; i < this.state.products.length; i ++){

    if (busqueda === ''){
      this.getProducts();
      } else if ( productos[i].nombre === busqueda ){
      Productfind[i] = this.state.products[i];
      this.setState({products : Productfind} );
      console.log('encontrado');
    } else if (productos[i].tipo === busqueda){
      Productfind[i] = this.state.products[i];
      this.setState({products : Productfind} );
      console.log('encontrado')
    }else if (productos[i].precio.toString() === busqueda){
      Productfind[i] = this.state.products[i];
      this.setState({products : Productfind} );
      console.log('encontrado')
    }else {
      // this.getProducts();
      console.log('no encontrado');
    }
  }
} 

reload = () => {
  this.getProducts();
}

  render() {
    return(
      <div className="page">
  
        <h3 className="center" > List of Products </h3>


        <div className="center" id="search_div">
            <input 
                  id="search" 
                  placeholder="Search by name, type or price ..."
                  name="busqueda"
                  onChange={this.handleChange}
                  />
            <button 
            className="btn grey darken-4 waves-effect waves-light"
             onClick={this.filterProducts} 
             >Search</button>
             <button id="reload" 
             className="btn grey darken-4 waves-effect waves-light"
             onClick={this.reload}
             >Reload list</button>
        </div>

  
        <div className="container" className="center" >
          <div className="col s10" >
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Tipo</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                  {this.state.products.map(products => {
                    return (
                      <tr key={products._id}>
                        <td> {products.nombre} </td>
                        <td> {products.tipo} </td>
                        <td> {products.precio} </td>
                        <td> {products.cantidad} </td>
                        <td>
                          <button onClick={() => this.editProduct(products._id)}
                            className="btn grey darken-4 waves-effect waves-light">
                            <i className="material-icons" >edit</i>
                          </button>

                          <button onClick={ () => this.deleteProduct(products._id)}
                            className="btn grey darken-4 waves-effect waves-light" 
                            style={{margin: '3px'}}>
                            <i className="material-icons" >delete</i>
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
            </table>
          </div>
        </div>
  
      </div>
    )

  }
}