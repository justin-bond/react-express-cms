import React, { useEffect, useState } from 'react'

import AddTask from '../components/AddTask'

const ns = 'dashboard'

const Dashboard = () => {

  const [tasksState, setTasksState] = useState()

  useEffect(() => {
    getTasks()
  }, [])

  const getTasks = () => {
    fetch('/api/tasks', {
      method: "GET",
    }).then(
      res => res.json()
    )
    .catch(
      error => console.error('Error:', error)
    )
    .then(
      response => {
        console.log('Success:', response);
        setTasksState(response);
      }
    );
  }

  return (
    <div className={`${ns}`}>
      <h2>Dashboard</h2>
      {tasksState &&
        tasksState.map((task, index) => {
          return <div key={index}>{task.name}</div>
        })
      }
      <AddTask />
    </div>
  )
}

export default Dashboard;