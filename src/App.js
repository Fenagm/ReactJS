import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

function obtenerPersonaje(nombre){
  const rpp = require("request-promise");
  var personaje ={
      uri: "https://rickandmortyapi.com/api/character/?name="+nombre,
      json:true
  }

  return rpp(personaje);
}


class App extends Component {
  
  state = {
    
    response: [],
    estado: null,
    ej:"Ingrese Personaje",
    count:0,
  };


  handlerText(e){
    var campoTexto = e.target.value;
    this.setState({value : campoTexto});
    //console.log(campoTexto)
  }  

  handlerButton = () => {
    console.log(this.state.value==null);
    if(this.state.value==null){
      var personaje='';
    }else{
    var personaje = this.state.value;
    

    obtenerPersonaje(personaje).then(response => {
      console.log(response.results);
      this.setState({lists: response.results,count:response.info.count, response: response.results,  estado: true})
    })
    }
  }
  
  
  
  render(){
    
    
    if(this.state.estado !== true){
      return (
        
        <div className="App">
        <div id="bannerimage"></div>
          <header className="App-header">
          <div>
          <form>
            <label>
              <p>Ingrese Personaje:</p>
              <input type="text" placeholder={this.state.ej} name="name" onChange={this.handlerText.bind(this)}/>
            </label>
            <input class="button" type="button" value="Buscar" onClick={this.handlerButton.bind(this)}/>
          </form>
          </div>
          </header>
        </div>
      );
    }else{
      return (
        <div className="App">
          <header className="App-header">
          <div id="bannerimage"></div>
          <div>
          <form>
            <label>
            <p>Ingrese Personaje:</p>
              <input type="text" placeholder={this.state.ej} name="name" onChange={this.handlerText.bind(this)}/>
            </label>
            <input type="button" value="Buscar" onClick={this.handlerButton.bind(this)}/>
          </form>
          </div>
          <div className="App-box">
      <h2>Resultados {this.state.count} coincidencia(s)</h2>
            <table>
            <tr>
    <th></th>
    <th>Nombre</th>
    <th>Estado</th>
    <th>Especie</th>
  </tr>
            {this.state.lists.map((state, index) => (
              
              <tr data-index={index}>
                <td><img src={state.image} alt="test" height="100" width="100"></img></td>
                <td>{state.name}</td>
                <td>{state.status}</td>
                <td>{state.species}</td>

              </tr>
            ))}
            </table>

  
 
</div>

          </header>
        </div>
      );
    
        }
      }
    }
    export default App;