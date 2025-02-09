import { Box, Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


export default function TaskElement({ task, deleteTask, isEven }) {
  return (
    <Box className={`task-box
    w-full p-1
    transition-all duration-300
    grid grid-cols-[1fr_max-content]
    text-neutral-200
    rounded border-solid border-2 border-transparent hover:border-[#1976d2] shadow-md
    ${isEven ? 'bg-black/20' : 'bg-[#1976d240]'}`}>

      <Box className='w-full p-2 
      break-all whitespace-pre-wrap'>
        {task.contents}
      </Box>

      <Box className='my-auto'>
        <IconButton className='task-delete-button'
        onClick={() => deleteTask(task)}>
          <DeleteIcon/>
        </IconButton>
      </Box>
    </Box>
  );
}
  