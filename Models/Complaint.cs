using System;
using System.ComponentModel.DataAnnotations;

namespace AfterSalesService.Models
{
    public class Complaint
    {
        public int Id { get; set; }

        [Required]
        public int CustomerId { get; set; }

        [Required]
        public int ProductId { get; set; }

        [Required]
        public string Description { get; set; }

        public DateTime DateCreated { get; set; } = DateTime.Now;

        public ComplaintStatus Status { get; set; } = ComplaintStatus.Pending;

        public virtual Customer Customer { get; set; }
        public virtual Product Product { get; set; }
        public virtual TechnicalIntervention TechnicalIntervention { get; set; }
    }

    public enum ComplaintStatus
    {
        Pending,
        InProgress,
        Resolved
    }
}