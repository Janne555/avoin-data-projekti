import React, { useState, useEffect } from 'react';
import axios from "axios";
import "../css/resepti.css"

const Resepti = (props) =>{

    const [reseptit, setResepti] = useState([])
    
    const lisääResepti = async (e) =>{

        e.preventDefault();
        
        const resepti = {
            nimi: e.target.elements.nimi.value,
            ainekset: e.target.elements.ainekset.value,
            aika: Number(e.target.elements.aika.value),
            ohje: e.target.elements.ohje.value,
            vaikeustaso: Number(e.target.elements.vaikeustaso.value)
        }
        
        try{
            const response = await axios.post("http://localhost:4000/reseptit", resepti)
            setResepti(reseptit.concat(response.data));
            //listaaReseptit(); 
        }catch(error){
            console.log(error)
        }
           
    }

    const listaaReseptit = () => {
        axios.get("http://localhost:4000/reseptit")
          .then(res => {
           setResepti(res.data);
          })
    }

    useEffect( () => {
        axios.get("http://localhost:4000/reseptit", reseptit)
            .then(response => {
                setResepti(response.data);
            })
            .catch(console.error)
    }, []
    )

    return(
        <div className="resepti-main">
            <h1>Reseptit</h1>
            <div className="one">
            <h3>Lisää uusi resepti:</h3>
            <form onSubmit={lisääResepti}>
                <label>Nimi: </label>
                <input className="nimiKenttä" type="text" name="nimi" requiered />
                <br />
                <label>Ainekset: </label>
                <input className="aineksetKenttä" type="text" name="ainekset" requiered />
                <br />
                <label>Valmistus aika(h): </label>
                <input className="aikaKenttä" type="number" name="aika" requiered />
                <br />
                <label>Ohje: </label>
                <input className="ohjeKenttä" type="text" name="ohje" requiered />
                <br />
                <label>Vaikeustaso: </label>
                <input className="tasoKenttä" type="number" min="1" max="5" name="vaikeustaso" requiered />
                <br />
                <input className="submitButton" type="submit" value="Lisää resepti" />
            </form>
            </div>
            <div className="two">
                <h3 className="listaOtsikko">Kaikki reseptit:</h3>
                <div className="reseptit">
                    <ul>
                    {reseptit.map(resepti => (
                    <li key={resepti.nimi} className="listaResepti">
                        <div>Resepti: {resepti.nimi}</div>
                        <div>Ainekset: {resepti.ainekset}</div>
                        <div>Aika: {resepti.aika} tunti(a)</div>
                        <div>Ohje: {resepti.ohje}</div>
                        <div>Vaikeustaso: {resepti.vaikeustaso}</div>
                     </li>
                ))}
            </ul></div>
            </div>
        </div>
    )
}

export default Resepti;