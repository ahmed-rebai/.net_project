using Microsoft.EntityFrameworkCore;
using AfterSalesService.Models;

namespace AfterSalesService.Data
{
    public class AfterSalesDbContext : DbContext
    {
        public AfterSalesDbContext(DbContextOptions<AfterSalesDbContext> options)
            : base(options)
        {
        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Complaint> Complaints { get; set; }
        public DbSet<SparePart> SpareParts { get; set; }
        public DbSet<TechnicalIntervention> TechnicalInterventions { get; set; }
        public DbSet<InterventionSparePart> InterventionSpareParts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<InterventionSparePart>()
                .HasKey(isp => new { isp.InterventionId, isp.SparePartId });

            modelBuilder.Entity<InterventionSparePart>()
                .HasOne(isp => isp.Intervention)
                .WithMany(i => i.UsedSpareParts)
                .HasForeignKey(isp => isp.InterventionId);

            modelBuilder.Entity<InterventionSparePart>()
                .HasOne(isp => isp.SparePart)
                .WithMany()
                .HasForeignKey(isp => isp.SparePartId);
        }
    }
}