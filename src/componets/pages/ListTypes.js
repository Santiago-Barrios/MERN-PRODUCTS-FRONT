import React, {Component} from 'react';
import Axios from 'axios';

export default class ListTypes extends Component{

  state = {
    type: [],
    busqueda: '',
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

  deleteType = async (id)=>{
    let token = localStorage.getItem('auth-token');
    await Axios.delete(`http://localhost:5000/types/${id}`, 
    {headers: {'x-api-key': token}});
    this.getTypes();
}

  editType = async(id)=>{
    let token = localStorage.getItem('auth-token');
    const res = await Axios.get(`http://localhost:5000/types/${id}`,
    {headers: {'x-api-key': token}});
    localStorage.setItem('id-edit-type',res.data._id);
    console.log(res);
    window.location.href='./editTypes'
}

handleChange = async (e) => {
  await this.setState({
    [e.target.name]: e.target.value,
  });
};

filterTypes = () => {
  const Typefind = [];
  const busqueda = this.state.busqueda;
  const [type] = [this.state.type];

  for (let i = 0; i < this.state.type.length; i ++){

    if (busqueda === ''){
      this.getTypes();
      } else if ( type[i].typeName === busqueda ){
      Typefind[i] = this.state.type[i];
      this.setState({type : Typefind} );
      console.log('encontrado');
    }else {
      console.log('no encontrado');
    }
  }
} 

reload = () => {
  this.getTypes();
}


  render(){
    return(
      <div className="page">
  
        <h3 className="center" > List of Types </h3>


        <div className="center" id="search_div">
            <input 
                  id="search" 
                  placeholder="Search by type name ..."
                  name="busqueda"
                  onChange={this.handleChange}
                  />
            <button 
            className="btn grey darken-4 waves-effect waves-light"
             onClick={this.filterTypes} 
             >Search</button>
             <button id="reload" 
             className="btn grey darken-4 waves-effect waves-light"
             onClick={this.reload}
             >Reload list</button>
        </div>

  
        <div className="container" className="center" >
          <div className="col s10">
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                </tr>
              </thead>
              <tbody>
                  {this.state.type.map( type => {
                    return (
                      <tr key={type._id}>
                        <td> {type.typeName} </td>
                        <td>
                          <button 
                            onClick={() => this.editType(type._id)}
                            className="btn grey darken-4 waves-effect waves-light">
                            <i className="material-icons" >edit</i>
                          </button>

                          <button 
                            onClick={ () => this.deleteType(type._id)}
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