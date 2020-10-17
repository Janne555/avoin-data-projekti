Projekti tehty yhdessä samalla koneella, jonka vuoksi git commiteissa ei näy kaikilta kontribuutioita
```
GET /contacts
response:
[
  {
    _id: string
    name: string
    pnumero: number
    osoite: string
  }
]

POST /contacts
payload:
{
  name: string
  pnumer: number
  osoite: string
}
response:
same as GET /contacts

GET /todo
response:
[
  {
    _id: string
    name: string
    done: boolean
    owner: string
  }
]

POST /todo
payload:
{
  name: string
  done: string
}
response:
same as GET /todo

PUT /todo
payload:
{
  id: string
  name: string <optional>
  done: string <optional>
}
response:
updated version of the todo object
  
GET /velka
response:
[
  {
    _id: string
    velallinen: string
    määrä: number
    maksettu: boolean
   }
]

POST /velka
payload:
{
  velallinen: string
  määrä: number
  maksettu: boolean
}
response:
{
  _id: string
  velallinen: string
  määrä: number
  maksettu: boolean
}

DELETE /velka
payload:
{
  _id: string
}

GET /reseptit
response:
[
  {
    _id: string
    nimi: string
    ainekset: string
    aika: number
    ohje: string
    vaikeustaso: number
  }
]

POST /reseptit
payload:
{
    nimi: string
    ainekset: string
    aika: number
    ohje: string
    vaikeustaso: number
}
response:
same as GET /reseptit
```
