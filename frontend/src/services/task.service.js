import { httpService } from './http.service.js'


export const taskService = {
    query,
    getById,
    update,
    remove,
    add
}

async function query() {
    return httpService.get(`tasks`)
}

async function getById(id) {
    return httpService.get(`tasks/${id}`)
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








