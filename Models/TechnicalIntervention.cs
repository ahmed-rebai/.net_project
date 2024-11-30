using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AfterSalesService.Models
{
    public class TechnicalIntervention
    {
        public int Id { get; set; }

        [Required]
        public int ComplaintId { get; set; }

        public DateTime DateScheduled { get; set; }

        public InterventionStatus Status { get; set; } = InterventionStatus.Scheduled;

        public bool IsWarranty { get; set; }

        [Range(0, double.MaxValue)]
        public decimal LaborCost { get; set; }

        public decimal TotalCost { get; set; }

        public virtual Complaint Complaint { get; set; }
        public virtual ICollection<InterventionSparePart> UsedSpareParts { get; set; }
    }

    public enum InterventionStatus
    {
        Scheduled,
        InProgress,
        Completed
    }
}