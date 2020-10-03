const { Todo, Contacts, Velka } = require('./database')
const jwt_decode = require('jwt-decode');

module.exports = function (app) {
  app.get("/foo", (req, res) => {
    res.send("<h1>hello</h1>")
  })

  app.get("/", (req, res) => {
    res.send("<h1>404</h1>")
  })

  app.post("/foo", (req, res) => {
    console.log("got post")
    console.log(req)
    res.end()
  })


  app.post("/contacts", async (req, res) => {
    if (!("name" in req.body)) return res.status(400).send("Missing name")
    if (!("pnumero" in req.body)) return res.status(400).send("Missing pnumero")
    if (!("osoite" in req.body)) return res.status(400).send("Missing osoite")
    if (typeof req.body.name !== "string") return res.status(400).send("name must be string")
    if (typeof req.body.pnumero !== "number") return res.status(400).send("name must be number")
    if (typeof req.body.osoite !== "string") return res.status(400).send("done must be string")
    const contacts = new Contacts({ name: req.body.name, pnumero: req.body.pnumero, osoite: req.body.osoite })
    try {
      await contacts.save()
      res.json(await Contacts.find({}))
    } catch (error) {
      console.error(error)
      res.status(500).send("failed to save")
    }
  })

  app.get("/contacts", async (req, res) => {
    try {
      res.json(await Contacts.find({}))
    } catch (error) {
      console.error(error)
      res.status(500).send("failed to get contacts")
    }
  })



  app.post("/todo", async (req, res) => {
    if (!("authorization" in req.headers)) return res.status(401).send("not authorized")
    const token = req.headers.authorization.replace("Bearer ", "")
    const decoded = jwt_decode(token);

    if (!("name" in req.body)) return res.status(400).send("Missing name")
    if (!("done" in req.body)) return res.status(400).send("Missing done")
    if (typeof req.body.name !== "string") return res.status(400).send("name must be string")
    if (typeof req.body.done !== "boolean") return res.status(400).send("done must be boolean")
    const todo = new Todo({ name: req.body.name, done: req.body.done, owner: decoded.preferred_username })
    try {
      await todo.save()
      res.json(await Todo.find({ owner: decoded.preferred_username }))
    } catch (error) {
      console.error(error)
      res.status(500).send("failed to save")
    }
  })

  app.put("/todo", async (req, res) => {
    if (!("authorization" in req.headers)) return res.status(401).send("not authorized")
    const token = req.headers.authorization.replace("Bearer ", "")
    const decoded = jwt_decode(token);

    if (!("id" in req.body)) return res.status(400).send("Missing id")
    if (typeof req.body.id !== "string") return res.status(400).send("id must be string")
    if ("name" in req.body && typeof req.body.name !== "string") return res.status(400).send("name must be string")
    if ("done" in req.body && typeof req.body.done !== "boolean") return res.status(400).send("done must be boolean")
    try {
      const todo = await Todo.findById(req.body.id)
      if (!todo) return res.status(404).send("no todo found by that id")
      if (todo.owner !== decoded.preferred_username) return res.status(401).send("not authorized")

      if ("name" in req.body) {
        todo.name = req.body.name
      }

      if ("done" in req.body) {
        todo.done = req.body.done
      }

      await todo.save()
      return res.status(200).json(todo)
    } catch (error) {
      console.error(error)
      return res.status(500).send("failed to update todo")
    }
  })


  // Example:
  // curl -X POST -d '{"name": "test2", "done": true}' -H "Content-type: application/json"  localhost:4000/todo
  // curl -X POST -d '{"name": "test2", "pnumero": 324534534, "osoite": "makkyla"}' -H "Content-type: application/json"  localhost:4000/contacts

  app.get("/todo", async (req, res) => {
    if (!("authorization" in req.headers)) return res.status(401).send("not authorized")
    const token = req.headers.authorization.replace("Bearer ", "")
    const decoded = jwt_decode(token);

    try {
      res.json(await Todo.find({ owner: decoded.preferred_username }))
    } catch (error) {
      console.error(error)
      res.status(500).send("failed to get todos")
    }
  })


  app.post("/velka", async (req, res) => {
    if (!("velallinen" in req.body)) return res.status(400).send("Missing velallinen")
    if (!("määrä" in req.body)) return res.status(400).send("Missing määrä")
    if (!("maksettu" in req.body)) return res.status(400).send("Missing maksettu")
    if ((req.body.velallinen.length > 80)) return res.status(400).send("Liian pitkä nimi")
    if ((Number(req.body.määrä) < 0)) return res.status(400).send("Velka ei voi olla negatiivinen")
    if (typeof req.body.velallinen !== "string") return res.status(400).send("velallinen must be string")
    if (typeof req.body.määrä !== "number") return res.status(400).send("määrä must be number")
    if (typeof req.body.maksettu !== "boolean") return res.status(400).send("maksettu must be boolean")
    const velka = new Velka({ velallinen: req.body.velallinen, määrä: req.body.määrä, maksettu: req.body.maksettu })
    try {
      await velka.save()
      res.json(velka)
    } catch (error) {
      console.error(error)
      res.status(500).send("failed to save")
    }
  })

  app.delete("/velka", async (req, res) => {
    await Velka.findByIdAndDelete(req.body._id)
    res.status(200).send(await Velka.find({}))
    /*const velka = await Velka.findById(req.body.velka._id)
    try {
      await velka.remove()
    } catch (error) {
      console.error(error)
      res.status(500).send("failed to remove")
    }*/
  })


  // Example:
  // curl -X POST -d '{"velallinen": "Aku Ankka", "määrä": 9000, "maksettu": false}' -H "Content-type: application/json"  localhost:4000/velka


  app.get("/velka", async (req, res) => {
    try {
      res.json(await Velka.find({}))
    } catch (error) {
      console.error(error)
      res.status(500).send("failed to get velat")
    }
  })

  app.post("/reseptit", async (req, res) => {
    if (!("nimi" in req.body)) return res.status(400).send("Missing resepti nimi");
    if (!("ainekset" in req.body)) return res.status(400).send("Missing reseptin ainekset");
    if (!("aika" in req.body)) return res.status(400).send("Missing reseptin aika");
    if (!("ohje" in req.body)) return res.status(400).send("Missing reseptin ohje");
    if (!("vaikeustaso" in req.body)) return res.status(400).send("Missing reseptin vaikeustaso");
    if (typeof req.body.nimi !== "string") return res.status(400).send("Must be string");
    if (typeof req.body.ainekset !== "string") return res.status(400).send("Must be string");
    if (typeof req.body.aika !== "number") return res.status(400).send("Must be number");
    if (typeof req.body.ohje !== "string") return res.status(400).send("Must be string");
    if (typeof req.body.vaikeustaso !== "number") return res.status(400).send("Must be number");
    const resepti = new Resepti({
      nimi: req.body.nimi,
      ainekset: req.body.ainekset,
      aika: req.body.aika,
      ohje: req.body.ohje,
      vaikeustaso: req.body.vaikeustaso
    });
    try {
      await resepti.save();
      res.json(resepti);
    } catch (error) {
      console.error(error);
      res.status(500).send("failed to save");
    }
  })

  app.get("/resptit", async (req, res) => {
    try {
      res.json(await Resepti.find({}));
    } catch {
      console.error(error);
      res.status(500).send("failed to get reseptit")
    }
  })
}