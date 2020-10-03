import React, { useEffect, useState } from 'react';
import axios from "axios";
import "../css/velat.css"

const Velka = (props) => {

    const [velat, setVelat] = useState([])
    const [velkaFiltteri, setFiltteri] = useState("")

    const [velallinen, setVelallinen] = useState("")
    const [määrä, setMäärä] = useState("")
    const [velkaYhteensä, setVelkaYhteensä] = useState(0)

    const velallinenMuutos = (event) => {
        if (event.target.value.length > 80) {
            return
        }
        setVelallinen(event.target.value)
    }

    const laskeVelkaYhteensä = (velat) => {
        const yht = velat.reduce((total, velka) => {
            total = total + Number(velka.määrä)
            return total
        }, 0)

        setVelkaYhteensä(yht)
        console.log("velkaa:" + velkaYhteensä)
        return velkaYhteensä
    }

    const määräMuutos = (event) => {
        if (Number(event.target.value) < 1) {
            setMäärä("")
            alert("Velka ei voi olla negatiivinen.")
        }
        setMäärä(event.target.value)
    }

    const haeVelka = (event) => {
        setFiltteri(event.target.value)
    }

    const filtteröidytVelat =
        velat.filter((velka) => {
            return velka.velallinen.toLowerCase().includes(velkaFiltteri.toLowerCase())
        })

    useEffect(() => {
        axios.get("http://localhost:4000/velka").then(response => {
            setVelat(response.data)
            laskeVelkaYhteensä(response.data)
        })
    }, []
    )

    const päivitäVelat = () => {
        axios.get("http://localhost:4000/velka").then(response => {
            setVelat(response.data)
            laskeVelkaYhteensä(response.data)
        })
    }

    const lisääVelka = (event) => {
        event.preventDefault()
        if (isNaN(määrä)) {
            setMäärä("")
            alert("Määrän pitää olla numero")
            return
        }

        const velka = {
            velallinen: velallinen,
            määrä: Number(määrä),
            maksettu: false
        }

        axios.post("http://localhost:4000/velka", velka).then(response => {
            setVelat(velat.concat(response.data))
        })

        setMäärä("")
        setVelallinen("")
    }

    const poistaVelka = (velka) => {
        console.log(velka._id)
        fetch("http://localhost:4000/velka", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(velka),
            method: 'delete'
        }).then(res => {
            päivitäVelat()
        })
    }


    return (
        <div class="velat-main">
            <div class="velka-inner">
                <h1 class="otsikko">Velat</h1>
                <span class="velkaa-yht">Velkaa karhuamatta: {velkaYhteensä} €</span>
                <div class="velka-input">
                    <h2>Haku</h2>
            Velallinen: <input type="text" value={velkaFiltteri} onChange={haeVelka} />
                    <h2>Lisää velka</h2>
                    <form onSubmit={lisääVelka}>
                        Velallinen:
                <input type="text" name="velallinen" value={velallinen} onChange={velallinenMuutos} />
                        <br />
                Velan määrä:
                <input type="text" name="velka" value={määrä} onChange={määräMuutos} />
                        <button type="submit" value="Submit" onClick={lisääVelka} >Lisää</button>
                    </form>
                </div>
                <br />
                <div class="lista">
                    Uusimmat 10 velkaa:
                {filtteröidytVelat.reverse().slice(0, 10).map((velka) =>
                    <div key={velka._id} class="velka"> Velallinen: {velka.velallinen} <br /> Määrä: {velka.määrä} €
                        <button class="poista-button" type="submit" value="Submit" onClick={() => poistaVelka(velka)}>Poista</button>
                    </div>
                )}
                </div>
            </div>
        </div>
    )

}

export default Velka;