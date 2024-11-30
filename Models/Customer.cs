using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AfterSalesService.Models
{
    public class Customer
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [Phone]
        public string Phone { get; set; }

        public string Password { get; set; }
        
        public virtual ICollection<Complaint> Complaints { get; set; }
    }
}