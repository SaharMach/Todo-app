import { httpService } from './http.service.js'


export const taskService = {
    query,
    getById,
    update,
    remove,
    add
}


// const todos = [
//     {taskId: "123", title: "HEY", desc: "check 1 1", status: "To do", dueDate: "2024-08-14"},
//     {taskId: "124", title: "HEY2", desc: "check22", status: "Done", dueDate: "2024-09-22"}
// ]

async function query() {
    return httpService.get(`tasks`)
    // return todos
}


async function getById(id) {
    return httpService.get(`tasks/${id}`)
    // return todos.find(t => t.taskId === id)
}


function remove(id) {
    return httpService.delete(`tasks/${id}`)
}

async function update(id, task) {
    console.log(task);
    return httpService.put(`tasks/${id}`, task)
}


function add(task) {
    return httpService.post('tasks', task)
  }








