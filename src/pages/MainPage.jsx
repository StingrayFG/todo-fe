import { useEffect, useState, useRef } from 'react';
import { Box, Button, TextareaAutosize, TextField } from '@mui/material';

import TaskService from 'services/TaskService';
import TaskElement from 'elements/TaskElement';


export default function MainPage() {

  const topRef = useRef(null);

  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('')
  

  useEffect(() => {
    getTasks();
  }, [])

  useEffect(() => {
    topRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [tasks])


  const handleOnInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleOnInputKeyDown = (e) => {
    if ((e.code === 'Enter') && (!e.shiftKey)) {
      e.preventDefault();
      addTask();
    }
  }


  const getTasks = async () => {
    await TaskService.handleGetAll()
    .then(res => {
      setTasks(res);
    })
    .catch(err => {
      console.log(err)
    })
  }

  const addTask = () => {
    if (inputValue) {
      TaskService.handleAdd(inputValue)
      .then(res => {
        setTasks([ res, ...tasks ])
        setInputValue('');
      })
      .catch(err => {
        console.log(err)
        alert('Could not create the task')
      })
    }
  }

  const updateTaskIsComplete = (task) => {
    TaskService.handleUpdateTaskIsComplete(task.uuid, task.isComplete)
    .then(res => {
      let newTasks = [...tasks];
      newTasks.find(t => {
        if (t.uuid === res.uuid) {
          t.isComplete = res.isComplete;
        }
      })
      setTasks(newTasks);
    })
    .catch(err => {
      console.log(err)
      alert('Could not update the task')
    })
  }


  const deleteTask = (task) => {
    TaskService.handleDelete(task.uuid)
    .then(res => {
      setTasks(tasks.filter(f => (f.uuid != res.uuid))) 
    })
    .catch(err => {
      console.log(err)
      alert('Could not delete the task')
    })
  }


  return (
    <Box className='w-full h-full 
    grid place-items-center'>
      <Box className='w-[600px] max-w-full h-screen p-4
      grid grid-rows-[1fr_max-content] gap-4'>
        <Box className='w-[600px] max-w-full h-full 
        overflow-y-scroll
        rounded bg-black/20 shadow-md'>
          <Box ref={topRef}/>
          
          {tasks.map((task, i) => 
            <TaskElement 
            task={task} 
            deleteTask={deleteTask} 
            updateTaskIsComplete={updateTaskIsComplete}
            isEven={(i % 2) === 0}/>
          )}

          {(tasks.length === 0) && 
            <Box className='w-full h-full pt-[40vh]
            text-center text-neutral-200'>
              {'Nothing here yet'}
            </Box>
          }
          
        </Box>

        <Box className='w-full min-h-full
        grid grid-cols-[1fr_max-content] gap-4
        rounded bg-black/0'>
          <Box className='mt-[1px] h-full p-2
          bg-black/40 shadow-md rounded'>
            <TextareaAutosize className='w-full
            transition-all duration-300
            bg-transparent 
            select-none outline-none resize-none
            text-neutral-200'
            value={inputValue}
            onKeyDown={handleOnInputKeyDown}
            onChange={handleOnInputChange} 
            spellCheck={false}
            placeholder='Task name...'/>
          </Box>
          
          <Button
          onClick={addTask}
          variant='contained'>
            {'Add'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
  