import { useState, useEffect } from 'react';
import { utilService } from '../services/util.service';

export function TaskForm({ task, onSave }) {
    const [formData, setFormData] = useState({
        title: '',
        desc: '',
        status: 'To do',
        dueDate: ''
    });

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title,
                desc: task.desc,
                status: task.status,
                dueDate: task.dueDate
            })
        }
    }, [task])

    function handleChange(e) {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    };

    function handleSubmit(e) {
        e.preventDefault()
        const today = new Date().setHours(0, 0, 0, 0)
        const dueDate = new Date(formData.dueDate).setHours(0, 0, 0, 0)
        if (dueDate < today) {
            alert('Due Date cannot be in the past.');
            return;
        }
        onSave(formData)
    };
    function formatDateForInput(dateString) {
        const date = new Date(dateString)
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <label>
                <textarea
                    name="desc"
                    value={formData.desc}
                    onChange={handleChange}
                />
            </label>
            <br />

            <label>
                <input
                    type="date"
                    name="dueDate"
                    value={formatDateForInput(formData.dueDate)}
                    onChange={handleChange}
                />
            </label>
            <br />

            <label>
                <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="To do">To do</option>
                    <option value="In progress">In progress</option>
                    <option value="Done">Done</option>
                </select>
            </label>
            <br />

            <button type="submit" className="task-form-submit">Save</button>
        </form>
    );
}


