import React, { useState } from 'react'
import {v4 as uuidv4} from 'uuid'

const App = () => {
  const [userInput,setUserInput] = useState('')
  const [tasks,setTasks] = useState([])
  const [editText,setEditText] = useState('')
  const [editTaskId,setEditTaskId] = useState(null)

  const onAddButton = () => {
    const newTask = {
      text: userInput,
      id : uuidv4(),
    }
    setTasks(prevTask => [...prevTask,newTask])
    setUserInput('')
  }

  const onDelete = (taskToDelete) => {
    const filteredResults = tasks.filter(task => 
      task.id != taskToDelete.id
    )
    setTasks(filteredResults)
  }

  const onEdit = (task) => {
    setEditTaskId(task.id)
    setEditText(task.text)
  }

  const onSave = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? {...task,text:editText} : task 
    )
    setTasks(updatedTasks)
    setEditText('')
    setEditTaskId(null)
  }

  return (
    <div>
      <h1> My Task </h1>
      <input type="text" placeholder='Enter your task' onChange={(event) => setUserInput(event.target.value)} value={userInput}/>
      <button type='button' onClick={onAddButton}> Add </button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {editTaskId === task.id ? (
              <>
                <input type='text' onChange={(event) => setEditText(event.target.value)} value={editText}/>
                <button type='button' onClick={() => onSave(task.id)}> Save </button>
              </>            
            ): (
              <>
                {task.text}
                <button type='button' onClick={() => onDelete(task)}> Delete </button>
                <button type='button' onClick={() => onEdit(task)}> Edit </button>
              </>
            )} 
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App









