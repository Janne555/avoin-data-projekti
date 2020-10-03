import React, { Component, useState, useEffect } from 'react';
import axios from "axios";

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
    }, []
    )

    return(
        <div>
            <form onSubmit={lisääResepti}>
                <label>
                    Nimi:
                    <input type="text" name="nimi" requiered />
                </label>
                <br />
                <label>
                    Ainekset:
                    <input type="text" name="ainekset" requiered />
                </label>
                <br />
                <label>
                    Valmistus aika:
                    <input type="number" name="aika" requiered />
                </label>
                <br />
                <label>
                    Ohje:
                    <input type="text" name="ohje" requiered />
                </label>
                <br />
                <label>
                    Vaikeustaso:
                    <input type="number" name="vaikeustaso" requiered />
                </label>
                <br />
                <input type="submit" value="Lisää" />
            </form>
        </div>
    )
}

export default Resepti;