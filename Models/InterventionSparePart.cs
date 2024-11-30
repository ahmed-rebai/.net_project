namespace AfterSalesService.Models
{
    public class InterventionSparePart
    {
        public int InterventionId { get; set; }
        public int SparePartId { get; set; }
        public int Quantity { get; set; }
        
        public virtual TechnicalIntervention Intervention { get; set; }
        public virtual SparePart SparePart { get; set; }
    }
}