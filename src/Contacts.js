
// eslint-disable-next-line
import React, { Component } from 'react';
import axios from "axios";
import './Contacts.css';

class Contacts extends Component {
    state = {
        name: "",
        pnumero: "",
        osoite: "",
        names: [],
        pnumerot: [],
        osoiteet: []
      };
    
      onNameChange = e => {
        this.setState({
            name: e.target.value
        });
      };

      onPnumeroChange = e => {
        this.setState({
            pnumero: e.target.value
        });
      };

      
    
      onOsoiteChange = e => {
        this.setState({
            osoite: e.target.value
        });
      };

      handleSubmit = e => {
        e.preventDefault();
        const data = {
            name: this.state.name,
            pnumero: this.state.pnumero,
            osoite: this.state.osoite
        };
        axios
          .post("http://localhost:3000/contacts", data)
          .then(res => console.log(res))
          .catch(err => console.log(err));
      };
    

      componentDidMount() {
        axios.get("http://localhost:3000/contacts")
          .then(res => {
            const names = res.data;
            const pnumerot = res.data;
            const osoiteet = res.data;
            this.setState({ names })
            this.setState({ pnumerot })
            this.setState({ osoiteet });
          })
      }


      render() {
  return (
<div className="contacts-main">


        <h2 className="otsake">Osoitekirja</h2>  

        <div className="posti">
<form onSubmit={this.handleSubmit}>
  <div>
  <label>
    Nimi:
    <input className="kentta" placeholder="Title" type="text" value={this.state.name}
            onChange={this.onNameChange} required />
  </label>
  </div> 
    <div>
  <label>
    puhelin:
    <input className="kentta" type="number" value={this.state.pnumero}
            onChange={this.onPnumeroChange} required />
  </label>
    </div> 
  <div>
  <label>
    Osoite:
    <input className="kentta" type="text" value={this.state.osoite}
            onChange={this.onOsoiteChange} required />
  </label>
  </div> 
  <input className="submitti" type="submit" value="Submit" />
</form>
</div>


<div className="getti">
<table>
<tr>
    <th>Nimi</th>
    <th>Numero</th> 
    <th>Osoite</th>
</tr>


<tr>
  <td>    { this.state.names.map(name => <p className="taulukko">{name.name}</p>)} </td>
  <td>    { this.state.pnumerot.map(pnumero => <p className="taulukko">{pnumero.pnumero}</p>)} </td>
  <td>    { this.state.osoiteet.map(osoite => <p className="taulukko">{osoite.osoite}</p>)} </td>
</tr>

      </table>
</div>




</div>

  );
}

}

export default Contacts;
