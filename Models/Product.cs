using System;
using System.ComponentModel.DataAnnotations;

namespace AfterSalesService.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        public string SerialNumber { get; set; }

        [Required]
        public DateTime WarrantyExpiryDate { get; set; }

        public virtual ICollection<Complaint> Complaints { get; set; }
    }
}