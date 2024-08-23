import { TaskForm } from "../cmps/TaskForm"
import { taskService } from "../services/task.service"
import toast from "react-hot-toast"

export function CreateTask({ tasks, setTasks, setToggleCreate, toggleCreate }) {

    async function handleSaveNewTask(taskData) {
        try {
            console.log('taskdata: ', taskData)
            const newTask = await taskService.add(taskData)
            setTasks([...tasks, newTask])
            setToggleCreate(!toggleCreate)
            toast.success('Successfully created!')

        }catch (err) {
            console.log('cant create task', err)
        }
        
    }

    return (
        <div className={`create-task-container ${toggleCreate ? 'open' : ''}`}>
            <button className="create-task-close-button" onClick={() => setToggleCreate(!toggleCreate)}>×</button>
            <h1 className="create-task-header">Create New Task</h1>
            <div className="create-task-content">
                <TaskForm onSave={handleSaveNewTask} />
            </div>
        </div>
    );
}