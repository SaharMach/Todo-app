import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { taskService } from "../services/task.service"
import { TaskForm } from "../cmps/TaskForm"
import { utilService } from "../services/util.service";
import toast from "react-hot-toast"


export function TaskDetails() {
    const [task, setTask] = useState({
        title: '',
        desc: '',
        status: 'To do',
        dueDate: ''
    });
    const [editMode, setEditMode] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetchTaskById()
    }, [])

    async function fetchTaskById() {
        try {
            let res = await taskService.getById(id)
            setTask(res)
        } catch (err) {
            console.log('couldnt fetch task by id', err)
        }
    }

    async function handleSave(updatedTask) {
        try {
            await taskService.update(id, updatedTask)
            fetchTaskById()
            setEditMode(!editMode)
            toast.success('Successfully updated!')
        } catch (err) {
            console.log('couldnt update/save task', err)
        }
    }
    if(!task) return <div>Loading...</div>
    return (
        <div className="task-details-container">
            {!editMode && (
                <section className="task-details">
                    <span className="task-details-backbtn" onClick={() => navigate('/tasks')}>
                        <span class="material-symbols-outlined" >
                            arrow_back
                        </span>
                    </span>
                    <span className="task-details-title">{task.title}</span>
                    <span className="task-details-desc">{task.desc}</span>
                    <span className={`task-details-status ${task.status.toLowerCase().replace(/\s+/g, '-')}`}>
                                    {task.status}
                    </span>
                    <span className="task-details-due-date">{utilService.formatDate(task.dueDate)}</span>
                    <button
                        onClick={() => setEditMode(!editMode)}
                        className="task-details-button edit"
                    >
                        Edit
                    </button>
                </section>
            )}
            {editMode && (
                <section className="task-details-edit">
                    <TaskForm task={task} onSave={handleSave} />
                    <button
                        onClick={() => setEditMode(!editMode)}
                        className="task-details-button disable-edit"
                    >
                        Discard
                    </button>
                </section>
            )}
        </div>
    );
}