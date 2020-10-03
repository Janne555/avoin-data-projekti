import React, { useState, useMemo } from 'react'
import { useQuery, useMutation, useQueryCache } from 'react-query'
import axios from "axios";

const getTodos = async () => {
  const res = await axios.get("http://localhost:4000/todo")
  return res.data
}

// [123, 32, 312].reduce((previous, current, index, list) => {
//   previous += current
//   return previous
// }, 0, muuttuja)

const postTodo = async (name) => axios.post("http://localhost:4000/todo", { name, done: false })

const putTodo = async ({ done, id }) => axios.put("http://localhost:4000/todo", { id, done })

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
    <div className="todos">
      {todosQuery.isLoading && <span>lataa</span>}
      <div>
        <label htmlFor="undone-radio">Show undone</label>
        <input onChange={() => setMode("undone")} type="radio" name="filter" value="undone" checked={mode === "undone"} />
        <label htmlFor="all-radio">Show all</label>
        <input onChange={() => setMode("all")} type="radio" name="filter" value="all" checked={mode === "all"} />
      </div>

      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <span>{todo.name}</span>
            <button disabled={updateTodoMutation.isLoading} onClick={() => updateTodo({ done: !todo.done, id: todo._id })} >{todo.done ? "done" : "not done"}</button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <div>
          <label>name</label>
          <input name="name" required />
        </div>
        <button>Save</button>
      </form>
      {todosMutation.isError && <span>Failed to save todo</span>}
    </div>
  )
}


export default Todos