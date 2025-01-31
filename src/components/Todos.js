import React, { useState, useMemo } from 'react'
import { useQuery, useMutation, useQueryCache } from 'react-query'
import axios from "axios";

const getTodos = async () => {
  const res = await axios.get("http://localhost:4000/todo", {
    headers: {
      Authorization: `Bearer ${window.sessionStorage.getItem("id_token")}`
    }
  })
  return res.data
}

const postTodo = async (name) => axios.post("http://localhost:4000/todo", { name, done: false }, {
  headers: {
    Authorization: `Bearer ${window.sessionStorage.getItem("id_token")}`
  }
})

const putTodo = async ({ done, id }) => axios.put("http://localhost:4000/todo", { id, done }, {
  headers: {
    Authorization: `Bearer ${window.sessionStorage.getItem("id_token")}`
  }
})

const Todos = () => {
  const [mode, setMode] = useState("all")
  const cache = useQueryCache()
  const todosQuery = useQuery('todos', getTodos)
  const todos = useMemo(() => {
    if (!todosQuery.data) return []
    if (mode === "all") return todosQuery.data
    else return todosQuery.data.filter(todo => !todo.done)
  }, [todosQuery, mode])

  const [addTodo, todosMutation] = useMutation(postTodo, {
    onSuccess: () => {
      cache.invalidateQueries('todos')
    }
  })

  const [updateTodo, updateTodoMutation] = useMutation(putTodo, {
    onSuccess: () => {
      cache.invalidateQueries('todos')
    }
  })

  /**
   * @param event { React.FormEvent<HTMLFormElement> }
   */
  function handleSubmit(event) {
    event.preventDefault()
    event.persist()
    const name = event.target.elements.name.value
    addTodo(name)
  }

  return (
    <div className="todos-wrapper">
      <div className="todos">
        <h2>Todo</h2>
        <div className="todo-form">
          <form onSubmit={handleSubmit}>
            <label>name</label>
            <input placeholder="type name here" name="name" required />
            <button disabled={todosMutation.isLoading}>Save</button>
          </form>
          {todosMutation.isError && <span>Tallentaminen epäonnistui</span>}
        </div>
        <div className="todo-list">
          {todosQuery.isLoading && <span>lataa</span>}
          <label htmlFor="undone-radio">Näytä tekemättömät</label>
          <input onChange={() => setMode("undone")} type="radio" name="filter" value="undone" checked={mode === "undone"} />
          <label htmlFor="all-radio">Näytä kaikki</label>
          <input onChange={() => setMode("all")} type="radio" name="filter" value="all" checked={mode === "all"} />

          <ul>
            {todos.map(todo => (
              <li key={todo._id}>
                <span data-done={todo.done}>{todo.name}</span>
                <button disabled={updateTodoMutation.isLoading} onClick={() => updateTodo({ done: !todo.done, id: todo._id })} >{todo.done ? "done" : "not done"}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}


export default Todos