using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Task
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        // [BsonElement("title")]
        public string? title { get; set; }
        // [BsonElement("desc")]
        public string? desc { get; set; }
        // [BsonElement("status")]
        public string? status { get; set; } 
        // [BsonElement("dueDate")]
        [DataType(DataType.Date)]
        public DateTime? dueDate { get; set; }
    }
}
