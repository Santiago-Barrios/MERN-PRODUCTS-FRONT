import React, {Component} from 'react';
import Axios from 'axios';

export default class EditType extends Component{

  state = {
    typeName :'',
  }

  async componentDidMount() {
    let token = localStorage.getItem('auth-token');
    if(!token && !localStorage.getItem('id-edit-type')){
      window.location.href = "/login";
    }
    const id = localStorage.getItem('id-edit-type');
    const res = await Axios.get(`http://localhost:5000/types/${id}`,
    {headers: {'x-api-key': token}});
    this.setState({
      typeName:res.data.typeName,
     })

     console.log(res);
  }

  save = async(e)=>{

    const id = localStorage.getItem('id-edit-type');
    let token = localStorage.getItem('auth-token');
    const { typeName } = this.state
    const res = await Axios.put(`http://localhost:5000/types/${id}`,
    {typeName},
    {headers: {'x-api-key': token}});
    console.log(res);
    window.location.href='/listTypes'
}

  handleChange = async (e) => {
    await this.setState({
      [e.target.name]: e.target.value,
    });
  };


  render(){
    return(
      <div className="page" >
       <h3 className="center" > Edit the type of your product </h3>
        <div className="container">
          
  
         <div className="row" className="center">
          <div className="col s8">
            <div className="card">
              <div className="card-content card-panel grey lighten-3">
              
                <form > 
  
                  <div className="row">
                      <div className="input-field col s12"> 
                      <input type="text" placeholder="Actualiza tu tipo de producto" 
                       id="type-nombre"
                       value={this.state.typeName}
                       name="typeName"
                       onChange={this.handleChange}
                       />
                    </div>
                  </div>
   
  
                  <button type="submit"
                   className="btn grey darken-4 waves-effect waves-light container large"
                   onClick={this.save}>
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