import { instance } from 'services/AxiosInstance';

const TaskService = {
  handleGetAll: async () => { 
    return new Promise(async (resolve, reject) => {
      await instance.get('task/get-all')
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });  
    })
  },
  
  handleAdd: async (contents) => { 
    return new Promise(async (resolve, reject) => {
      const body = { contents };

      await instance.post('task/add', body)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });  
    })
  },

  handleDelete: async (uuid) => { 
    return new Promise(async (resolve, reject) => {
      const body = { uuid };

      await instance.post('task/delete', body)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });  
    })
  },
}

export default TaskService; 
