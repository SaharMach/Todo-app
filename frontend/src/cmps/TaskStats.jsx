
export function TaskStats({ tasks }) {
    const todoCount = tasks.filter(task => task.status === "To do").length
    const inProgressCount = tasks.filter(task => task.status === "In progress").length
    const doneCount = tasks.filter(task => task.status === "Done").length

    return (
        <div className="task-stats">
            <div className="stat-item">
                <span className="stat-count">{todoCount}</span>
                <span className="stat-label"> To Do</span>
            </div>
            <div className="stat-item">
                <span className="stat-count">{inProgressCount}</span>
                <span className="stat-label"> In Progress</span>
            </div>
            <div className="stat-item">
                <span className="stat-count">{doneCount}</span>
                <span className="stat-label"> Done</span>
            </div>
        </div>
    );
}
