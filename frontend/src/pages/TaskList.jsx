import { useEffect, useState } from "react"
import { taskService } from "../services/task.service"
import { Link } from "react-router-dom"
import { CreateTask } from "./CreateTask"
import { utilService } from "../services/util.service"
import { TaskStats } from "../cmps/TaskStats"
import toast from "react-hot-toast"

export function TaskList() {
    const [tasks, setTasks] = useState([])
    const [filterBy, setFilterBy] = useState('')
    const [toggleCreate, setToggleCreate] = useState(false)
    const [sortOrder, setSortOrder] = useState('asc')
    const [sortBy, setSortBy] = useState('title')
    const [currentPage, setCurrentPage] = useState(1)
    const tasksPerPage = 6

    useEffect(() => {
        fetchTasks()
    }, [])


    async function fetchTasks() {
        try {
            const res = await taskService.query()
            console.log(res);
            setTasks(res)
            filteredTasks(tasks, filterBy)
        } catch (err) {
            console.log('unabled to fetch tasks', err)
        }
    }

    async function onDeleteTask(taskId) {
        try {
            await taskService.remove(taskId)
            fetchTasks()
            toast.success('Successfully deleted!')
        } catch (err) {
            console.log('cant delete task', err)
            toast.error(`Can't delete task`)

        }
    }

    function handleSearchChange(event) {
        setFilterBy(event.target.value)
        setCurrentPage(1)
    }

    function handleSortChange(sortField) {
        if (sortBy === sortField) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(sortField)
            setSortOrder('asc')
        }
    }

    function filteredTasks(tasks, filterBy) {
        let filtered = tasks.filter(task =>
            task.title.toLowerCase().includes(filterBy.toLowerCase()) ||
            task.desc.toLowerCase().includes(filterBy.toLowerCase())
        )
        return sortTasks(filtered)

    }


    function sortTasks(tasks) {
        return tasks.sort((a, b) => {
            let fieldA = a[sortBy]
            let fieldB = b[sortBy]

            if (sortBy === 'dueDate') {
                fieldA = new Date(fieldA)
                fieldB = new Date(fieldB)
            } else {
                fieldA = fieldA.toLowerCase()
                fieldB = fieldB.toLowerCase()
            }

            if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1
            if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1
            return 0
        });
    }
    
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = filteredTasks(tasks, filterBy).slice(indexOfFirstTask, indexOfLastTask);

    function paginate(direction) {
        if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        } else if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const totalPages = Math.ceil(filteredTasks(tasks, filterBy).length / tasksPerPage)


    if (!tasks) return <div>Loading...</div>
    return (
        <div className="task-list-container">
             <TaskStats tasks={tasks} />
            <input
                type="text"
                placeholder="Search tasks by title/description..."
                value={filterBy}
                onChange={handleSearchChange}
                className="task-search-input"
            />
            <div className="sort-options">
                <button onClick={() => handleSortChange('title')}>
                    Sort by Title {sortBy === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
                <button onClick={() => setToggleCreate(!toggleCreate)} className="task-create-toggle">+</button>

                <button onClick={() => handleSortChange('dueDate')}>
                    Sort by Date {sortBy === 'dueDate' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
            </div>
            <ul className="task-list">
                {currentTasks.map((task) => {
                    return (
                        <li key={task.id} className="task-item">
                            <Link to={`/tasks/${task.id}`} className="task-item-link">
                                <span className="task-item-title">{task.title}</span>
                                <span className="task-item-desc">{task.desc}</span>
                                <span className={`task-item-status ${task.status.toLowerCase().replace(/\s+/g, '-')}`}>
                                    {task.status}
                                </span>
                                <span className="task-item-due-date">{utilService.formatDate(task.dueDate)}</span>
                            </Link>
                            
                            <button onClick={() => onDeleteTask(task.id)} className="task-delete-button">
                                <span class="material-symbols-outlined">
                                    delete
                                </span>
                            </button>
                        </li>
                    )
                })}
            </ul>
            <div className="pagination">
                <button
                    onClick={() => paginate('prev')}
                    className={`pagination-arrow ${currentPage === 1 ? 'disabled' : ''}`}
                >
                    &larr;
                </button>
                <button
                    onClick={() => paginate('next')}
                    className={`pagination-arrow ${currentPage === totalPages ? 'disabled' : ''}`}
                >
                    &rarr;
                </button>
            </div>
            
            {toggleCreate && <CreateTask tasks={tasks} setTasks={setTasks} setToggleCreate={setToggleCreate} toggleCreate={toggleCreate}/>}
        </div>
    )
}