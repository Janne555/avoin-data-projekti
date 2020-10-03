const request = require('supertest')
const app = require('./server')
const mongoose = require('mongoose')
const { Todo } = require('./database')

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MDE3NDI5OTcsImV4cCI6MTYzMzI3ODk5NywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXSwicHJlZmVycmVkX3VzZXJuYW1lIjoiZm9vYmFyIn0.whu6M7SHZwaBIkGa9hSqpDd3wSokKMAhc_O_ciHhjLU"

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost/integrationtests', { useNewUrlParser: true })
})

beforeEach(async () => {
  await Todo.remove({})
})

afterAll(async () => {
  await mongoose.disconnect()
})

describe('GET /todo', () => {
  it('returns empty list', done => {
    request(app)
      .get('/todo')
      .set("authorization", `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(response => {
        expect(response.body).toEqual([])
      })
      .end((err, res) => {
        if (err) done(err)
        done()
      })
  })

  it('returns a todo', async done => {
    const todo = new Todo({ name: "test", done: false, owner: 'foobar' })
    await todo.save()

    request(app)
      .get('/todo')
      .set("authorization", `Bearer ${token}`)
      .expect(response => {
        expect(response.body).toEqual([{
          name: todo.name,
          done: todo.done,
          _id: todo.id,
          __v: todo.__v,
          owner: 'foobar'
        }])
      })
      .end((err, res) => {
        if (err) done(err)
        done()
      })
  })
})

describe('POST /todo', () => {
  it('rejects if name missing', done => {
    request(app)
      .post('/todo')
      .set("authorization", `Bearer ${token}`)
      .send({ done: true })
      .expect(400)
      .expect(res => {
        expect(res.text).toEqual("Missing name")
      })
      .end((err, res) => {
        if (err) done(err)
        done()
      })
  })

  it('rejects if done missing', done => {
    request(app)
      .post('/todo')
      .set("authorization", `Bearer ${token}`)
      .send({ name: "post" })
      .expect(400)
      .expect(res => {
        expect(res.text).toEqual("Missing done")
      })
      .end((err, res) => {
        if (err) done(err)
        done()
      })
  })

  it('rejects if name is wrong type', done => {
    request(app)
      .post('/todo')
      .set("authorization", `Bearer ${token}`)
      .send({ name: 123, done: true })
      .expect(400)
      .expect(res => {
        expect(res.text).toEqual("name must be string")
      })
      .end((err, res) => {
        if (err) done(err)
        done()
      })
  })

  it('rejects if done is wrong type', done => {
    request(app)
      .post('/todo')
      .set("authorization", `Bearer ${token}`)
      .send({ name: "123", done: "true" })
      .expect(400)
      .expect(res => {
        expect(res.text).toEqual("done must be boolean")
      })
      .end((err, res) => {
        if (err) done(err)
        done()
      })
  })

  it('creates a todo', done => {
    request(app)
      .post('/todo')
      .set("authorization", `Bearer ${token}`)
      .send({ name: "post", done: true })
      .expect(response => {
        const todo = { ...response.body[0] }
        delete todo.__v
        delete todo._id
        expect(todo).toEqual({ name: "post", done: true, owner: 'foobar' })
      })
      .end((err, res) => {
        if (err) done(err)
        done()
      })
  })

})

describe('PUT /todo', () => {
  it('updates a todo', async done => {
    const todo = new Todo({ name: "test", done: false, owner: 'foobar' })
    await todo.save()

    request(app)
      .put('/todo')
      .set("authorization", `Bearer ${token}`)
      .send({ id: todo._id, done: true })
      .expect(response => {
        const todo = { ...response.body }
        delete todo.__v
        delete todo._id
        expect(todo).toEqual({ name: "test", done: true, owner: 'foobar' })
      })
      .end((err, res) => {
        if (err) done(err)
        done()
      })
  })

  it('rejects if done is wrong type', async done => {
    request(app)
      .put('/todo')
      .set("authorization", `Bearer ${token}`)
      .send({ id: "asd", done: "true" })
      .expect(400)
      .expect(res => {
        expect(res.text).toEqual("done must be boolean")
      })
      .end((err, res) => {
        if (err) done(err)
        done()
      })
  })

  it('rejects if name is wrong type', async done => {
    request(app)
      .put('/todo')
      .set("authorization", `Bearer ${token}`)
      .send({ id: "asd", name: 123 })
      .expect(400)
      .expect(res => {
        expect(res.text).toEqual("name must be string")
      })
      .end((err, res) => {
        if (err) done(err)
        done()
      })
  })

  it('rejects if id is missing', async done => {
    request(app)
      .put('/todo')
      .set("authorization", `Bearer ${token}`)
      .send({ name: "123" })
      .expect(400)
      .expect(res => {
        expect(res.text).toEqual("Missing id")
      })
      .end((err, res) => {
        if (err) done(err)
        done()
      })
  })

  it('rejects if id is wrong', async done => {
    request(app)
      .put('/todo')
      .set("authorization", `Bearer ${token}`)
      .send({ name: "123", id: "5f787d8abca8cb27e911ba18" })
      .expect(404)
      .expect(res => {
        expect(res.text).toEqual("no todo found by that id")
      })
      .end((err, res) => {
        if (err) done(err)
        done()
      })
  })
})