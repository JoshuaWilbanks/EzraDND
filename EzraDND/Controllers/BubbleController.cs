using EzraDND.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EzraDND.Controllers
{


    [ApiController]
    [Route("[controller]/[Action]")]
    public class BubbleController : Controller
    {

        private readonly EzraDBContext _context;

        public BubbleController(EzraDBContext context)
        {
            _context = context;
        }

        //get all
        // Bubble/Index
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bubble>>> Index()
        {
            return await _context.Bubble.ToListAsync();
        }

        //get all without html
        // Bubble/GetBrief
        [HttpGet, ActionName("GetBrief")]
        public ActionResult<IEnumerable<BubbleBrief>> GetBrief()
        {
            return _context.Bubble.Select(bub => new BubbleBrief
            {
             Name = bub.Name,
             FormId = bub.FormId,
             RecordId = bub.RecordId
            }).ToList();
        }


        //get by recordId
        [HttpGet("{id}"), ActionName("Details")]
        public async Task<ActionResult<Bubble>> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var bubble = await _context.Bubble
                .FirstOrDefaultAsync(m => m.RecordId == id);
            if (bubble == null)
            {
                return NotFound();
            }

            return bubble;
        }



        [HttpGet("{id}"), ActionName("Exists")]
        public async Task<bool> Exists(int id)
        {

            var bubble = await _context.Bubble
                .FirstOrDefaultAsync(m => m.RecordId == id);
            if (bubble == null)
            {
                return false;
            }

            return true;
        }


        // Form/Create
        [HttpPost, ActionName("Create")]
        public async Task<ActionResult<Bubble>> Create([Bind("Data,Name,Html,Image")] Bubble bubble)
        {

            if (ModelState.IsValid)
            {
                Bubble bubbleTwo = new Bubble();
                bubbleTwo.FormId = bubble.FormId;
                bubbleTwo.Name = bubble.Name;
                bubbleTwo.Html = bubble.Html;
                bubbleTwo.Image = bubble.Image;
                _context.Add(bubbleTwo);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            else return bubble;
        }


        // Form/Edit
        [HttpPost, ActionName("Edit")]
        public async Task<ActionResult<Bubble>> Edit([Bind("RecordId,FormId,Html,Name,Image")] Bubble bubble)
        {


            if (ModelState.IsValid)
            {
                try
                {
                    var bubblePull = _context.Bubble.FirstOrDefault(m => m.RecordId == bubble.RecordId);

                    if (bubblePull != null)
                    {
                        bubblePull.Html = bubble.Html;
                        bubblePull.FormId = bubble.FormId;
                        bubblePull.Name = bubble.Name;
                        bubblePull.Image = bubble.Image;
                        bubblePull.UseImage = bubble.UseImage;
                        await _context.SaveChangesAsync();

                    }

                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!BubbleExists(bubble.FormId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return bubble;
        }

        // Bubble/Delete
        [HttpPost("{id}"), ActionName("Delete")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var bubble = await _context.Bubble.FindAsync(id);
            _context.Bubble.Remove(bubble);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }


        private bool BubbleExists(int id)
        {
            return _context.Bubble.Any(e => e.RecordId == id);
        }
    }
}
