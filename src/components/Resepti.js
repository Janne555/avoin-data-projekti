import React, { Component, useState, useEffect } from 'react';
import axios from "axios";
import "../css/resepti.css"

const Resepti = (props) =>{

    const [reseptit, setResepti] = useState([])
    
    const lisääResepti = (e) =>{

        e.preventDefault();
        
        const resepti = {
            nimi: e.target.elements.nimi.value,
            ainekset: e.target.elements.ainekset.value,
            aika: e.target.elements.aika.value,
            ohje: e.target.elements.ohje.value,
            vaikeustaso: e.target.elements.vaikeustaso.value
        }

        axios.post("http://localhost:4000/reseptit", resepti)
            .then(response => {
                setResepti(reseptit.concat(response.data));
            })
            .catch(error => {
                console.log(error);
            });    
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
            <h3>Lisää resepti:</h3>
            <form onSubmit={lisääResepti}>
                <label>Nimi:</label>
                <input type="text" name="nimi" requiered />
                <br />
                <label>Ainekset:</label>
                <input type="text" name="ainekset" requiered />
                <br />
                <label>Valmistus aika:</label>
                <input type="number" name="aika" requiered />
                <br />
                <label>Ohje:</label>
                <input type="text" name="ohje" requiered />
                <br />
                <label>Vaikeustaso:</label>
                <input type="number" min="1" max="5" name="vaikeustaso" requiered />
                <br />
                <input type="submit" value="Lisää" />
            </form>
            </div>
            <div className="two">
                <h3>Lisätyt reseptit:</h3>
            </div>
        </div>
    )
}

export default Resepti;