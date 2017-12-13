using System;
using System.ComponentModel.DataAnnotations;

namespace DAROVAapp.Models
{
    public class ScheduleItemModel
    {
        [Key]
        public int Id { get; set; }
        public string UserId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime FinishTime { get; set; }
        public DateTime StartDate { get; set; }
        public string SubjectName { get; set; }
        public string Professor { get; set; }
        public string Place { get; set; }
        public string Type { get; set; }
        public int Duration { get; set; }
    }
}