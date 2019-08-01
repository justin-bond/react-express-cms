import React, { useState } from 'react'

const AddTask = () => {
  const [addTaskState, setAddTaskState] = useState({
    taskName: ''
  });

  const handleChange = (e) => {
    addTaskState[e.target.name] = e.target.value;

    setAddTaskState((prevState) => {
      return { ...prevState };
    });
  };

  const submitForm = (event) => {
    event.preventDefault();
    
    const data = {
      name: addTaskState.taskName
    };

    fetch('/api/tasks', {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('JWT')}`
      }),
    }).then(
      res => res.json()
    )
    .catch(
      error => console.error('Error:', error)
    )
    .then(
      response => {
        console.log('Success:', response);
        if (response['unauthorized']){
          alert(response['message'])
        } else if (response['errors']){
          alert(response['errors']['name']['message'])
        } else {
          
        }
      }
    );
  }

  console.log(addTaskState)

  return (
    <form onSubmit={(e) => { submitForm(e); }}>
      <p>
        <label>Name:</label>
        <input onChange={(e) => { handleChange(e); }} type={'text'} name={'taskName'} id={'name'} required/>
      </p>
      <p><button type={'submit'}>Add Task</button></p>
    </form>
  )
}

export default AddTask;