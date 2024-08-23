using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using backend.Models; 
using backend.Services;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/tasks")]
    public class TasksController : ControllerBase
    {
        private readonly TaskService _taskService;

        public TasksController(TaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet]
        public ActionResult<List<Models.Task>> Get() =>
            _taskService.Get();

        [HttpGet("{id:length(24)}", Name = "GetTask")]
        public ActionResult<Models.Task> Get(string id)
        {
            var task = _taskService.Get(id);

            if (task == null)
            {
                return NotFound();
            }

            return task;
        }

        [HttpPost]
        public ActionResult<Models.Task> Create(Models.Task task)
        {
            _taskService.Create(task);

            return CreatedAtRoute("GetTask", new { id = task.Id.ToString() }, task);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Models.Task t)
        {
            var existingTask = _taskService.Get(id);

            if (existingTask == null)
            {
                return NotFound();
            }

            if (!string.IsNullOrEmpty(t.title))
            {
                existingTask.title = t.title;
            }

            if (!string.IsNullOrEmpty(t.desc))
            {
                existingTask.desc = t.desc;
            }

            if (!string.IsNullOrEmpty(t.status))
            {
                existingTask.status = t.status;
            }

            if (t.dueDate != default(DateTime))
            {
                existingTask.dueDate = t.dueDate;
            }

            _taskService.Update(id, existingTask);

            return NoContent();
        }


        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var task = _taskService.Get(id);

            if (task == null)
            {
                return NotFound();
            }

            _taskService.Remove(id);

            return NoContent();
        }
    }
}
