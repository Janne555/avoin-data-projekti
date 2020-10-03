import React, { Component, useEffect, useState } from 'react';
import axios from "axios";

const Velka = (props) => {

    const [velat, setVelat] = useState([])

    useEffect(() => {
        axios.get("http://localhost:4000/velka").then(response => {
            setVelat(response.data)
        })
    }, []
    )

    const lisääVelka = (event) => {
        event.preventDefault()
        const velka = {
            velallinen: event.target.elements.velallinen.value,
            määrä: Number(event.target.elements.velka.value),
            maksettu: false
        }

        axios.post("http://localhost:4000/velka", velka).then(response => {
            setVelat(velat.concat(response.data))
        })
    }


    return (
        <div>
            <br /><br />
            <form onSubmit={lisääVelka}>
                Velallinen:
                <input type="text" name="velallinen" />
                <br />
                Velan määrä:
                <input type="text" name="velka" />
                <input type="submit" value="Submit" />
            </form>
            <br />
            {velat.map((velka) => <div key={velka._id}> Velallinen: {velka.velallinen} <br /> Määrä: {velka.määrä} <br /> </div>)}
        </div>
    )

}



export default Velka;