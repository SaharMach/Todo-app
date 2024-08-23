using MongoDB.Driver;
using System.Collections.Generic;
using TaskModel = backend.Models.Task;

namespace backend.Services
{
    public class TaskService
    {
    private readonly IMongoCollection<TaskModel> _tasks;

        public TaskService(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("TodoListDb"));
            var database = client.GetDatabase("todo_db");
            _tasks = database.GetCollection<TaskModel>("todo");
        }

        public List<TaskModel> Get() =>
        _tasks.Find(task => true).ToList();

        public TaskModel Get(string id) =>
            _tasks.Find<TaskModel>(task => task.Id.ToString() == id).FirstOrDefault();

        public TaskModel Create(TaskModel task)
        {
            _tasks.InsertOne(task);
            return task;
        }

        public void Update(string id, TaskModel t) =>
            _tasks.ReplaceOne(task => task.Id.ToString() == id, t);

        public void Remove(string id) =>
            _tasks.DeleteOne(task => task.Id.ToString() == id);
    }
}
