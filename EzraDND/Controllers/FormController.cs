using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EzraDND.Models;

namespace EzraDND.Controllers
{
    //used to create, delete, and update Form table
    //Form table contains RecordId (key), FormId, EntryId (entry order), and Data (json from react)


    [ApiController]
    [Route("[controller]/[Action]")]
    public class FormController : Controller
    {

        private readonly EzraDBContext _context;

        public FormController(EzraDBContext context)
        {
            _context = context;
        }

        //get all
        // Form/Index
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Form>>> Index()
        {
            return await _context.Form.ToListAsync();
        }

        //get by form id
        // GET: Form/Details
        [HttpGet("{id}"), ActionName("Details")]
        public async Task<ActionResult<Form>> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var form = await _context.Form
                .FirstOrDefaultAsync(m => m.FormId == id);
            if (form == null)
            {
                return NotFound();
            }

            return form;
        }


        [HttpGet("{id}"), ActionName("Exists")]
        public async Task<bool> Exists(int id)
        {

            var form = await _context.Form
                .FirstOrDefaultAsync(m => m.FormId == id);
            if (form == null)
            {
                return false;
            }

            return true;
        }


        // Form/Create
        [HttpPost, ActionName("Create")]
        public async Task<ActionResult<Form>> Create(Form form)
        {

            if (ModelState.IsValid)
            {
                Form formTwo = new Form();
                formTwo.Order = form.Order;
                formTwo.Name = form.Name;

                _context.Add(formTwo);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            else return form;
        }


        // Form/Edit
        [HttpPost, ActionName("Edit")]
        public async Task<ActionResult<Form>> Edit([Bind("RecordId,FormId,Data")] Form form)
        {


            if (ModelState.IsValid)
            {
                try
                {
                    var formPull = _context.Form.FirstOrDefault(m => m.FormId == form.FormId);

                    if (formPull != null)
                    {

                        formPull.Name = form.Name;
                        formPull.Order = form.Order;
                        await _context.SaveChangesAsync();

                    }

                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!FormExists(form.FormId))
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
            return form;
        }

        // Form/Delete
        [HttpPost("{id}"), ActionName("Delete")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var form = await _context.Form.FindAsync(id);
            _context.Form.Remove(form);

            var bubblesList = await _context.Bubble.ToListAsync();

            foreach (var bubble in bubblesList)
            {
                if (bubble.FormId == id) _context.Bubble.Remove(bubble);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }


        private bool FormExists(int id)
        {
            return _context.Form.Any(e => e.FormId == id);
        }
    }
}
