using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AfterSalesService.Data;
using AfterSalesService.Models;

namespace AfterSalesService.Controllers
{
    public class ComplaintsController : Controller
    {
        private readonly AfterSalesDbContext _context;

        public ComplaintsController(AfterSalesDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            var complaints = await _context.Complaints
                .Include(c => c.Customer)
                .Include(c => c.Product)
                .ToListAsync();
            return View(complaints);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ProductId,Description")] Complaint complaint)
        {
            if (ModelState.IsValid)
            {
                // TODO: Set CustomerId from authenticated user
                complaint.DateCreated = DateTime.Now;
                complaint.Status = ComplaintStatus.Pending;
                
                _context.Add(complaint);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(complaint);
        }
    }
}