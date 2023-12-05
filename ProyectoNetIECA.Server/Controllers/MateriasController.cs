using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ProyectoNetIECA.Server.Models;

namespace ProyectoNetIECA.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MateriasController : ControllerBase
    {
        private readonly ProyectoNetIecaContext _context;

        public MateriasController(ProyectoNetIecaContext context)
        {
            _context = context;
        }

        // GET: Materias
        public async Task<IActionResult> Index()
        {
            List<Materium> lista = await _context.Materia.OrderByDescending(a => a.MateriaId).ToListAsync();
            return StatusCode(StatusCodes.Status200OK, lista);
        }


        [HttpPost]
        [Route("save")]
        public async Task<IActionResult> Create([FromBody] Materium materia)
        {
            await _context.AddAsync(materia);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, materia);

        }

        [HttpPut]
        [Route("edit")]
        public async Task<IActionResult> Edit([FromBody] Materium materia)
        {
            _context.Update(materia);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, materia);

        }

        [HttpDelete]
        [Route("delete/{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (MateriumExists(id)){
                Materium materia = _context.Materia.Find(id);
                _context.Remove(materia);
                return StatusCode(StatusCodes.Status200OK, "ok");
            }
            else{
                return NotFound();
            }

        }


        // GET: Alumnos/Details/5

        [HttpGet]
        [Route("details/{id:int}")]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var materia = await _context.Materia
                .FirstOrDefaultAsync(m => m.MateriaId== id);
            if (materia == null)
            {
                return NotFound();
            }

            return StatusCode(StatusCodes.Status200OK, materia);
        }


        //// GET: Materias
        //public async Task<IActionResult> Index()
        //{
        //    var proyectoNetIecaContext = _context.Materia.Include(m => m.Profesor);
        //    return View(await proyectoNetIecaContext.ToListAsync());
        //}

        //// GET: Materias/Details/5
        //public async Task<IActionResult> Details(int? id)
        //{
        //    if (id == null)
        //    {
        //        return NotFound();
        //    }

        //    var materium = await _context.Materia
        //        .Include(m => m.Profesor)
        //        .FirstOrDefaultAsync(m => m.MateriaId == id);
        //    if (materium == null)
        //    {
        //        return NotFound();
        //    }

        //    return View(materium);
        //}

        //// GET: Materias/Create
        //public IActionResult Create()
        //{
        //    ViewData["ProfesorId"] = new SelectList(_context.Profesors, "ProfesorId", "ProfesorId");
        //    return View();
        //}

        //// POST: Materias/Create
        //// To protect from overposting attacks, enable the specific properties you want to bind to.
        //// For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> Create([Bind("MateriaId,Nombre,Descripcion,ProfesorId")] Materium materium)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        _context.Add(materium);
        //        await _context.SaveChangesAsync();
        //        return RedirectToAction(nameof(Index));
        //    }
        //    ViewData["ProfesorId"] = new SelectList(_context.Profesors, "ProfesorId", "ProfesorId", materium.ProfesorId);
        //    return View(materium);
        //}

        //// GET: Materias/Edit/5
        //public async Task<IActionResult> Edit(int? id)
        //{
        //    if (id == null)
        //    {
        //        return NotFound();
        //    }

        //    var materium = await _context.Materia.FindAsync(id);
        //    if (materium == null)
        //    {
        //        return NotFound();
        //    }
        //    ViewData["ProfesorId"] = new SelectList(_context.Profesors, "ProfesorId", "ProfesorId", materium.ProfesorId);
        //    return View(materium);
        //}

        //// POST: Materias/Edit/5
        //// To protect from overposting attacks, enable the specific properties you want to bind to.
        //// For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> Edit(int id, [Bind("MateriaId,Nombre,Descripcion,ProfesorId")] Materium materium)
        //{
        //    if (id != materium.MateriaId)
        //    {
        //        return NotFound();
        //    }

        //    if (ModelState.IsValid)
        //    {
        //        try
        //        {
        //            _context.Update(materium);
        //            await _context.SaveChangesAsync();
        //        }
        //        catch (DbUpdateConcurrencyException)
        //        {
        //            if (!MateriumExists(materium.MateriaId))
        //            {
        //                return NotFound();
        //            }
        //            else
        //            {
        //                throw;
        //            }
        //        }
        //        return RedirectToAction(nameof(Index));
        //    }
        //    ViewData["ProfesorId"] = new SelectList(_context.Profesors, "ProfesorId", "ProfesorId", materium.ProfesorId);
        //    return View(materium);
        //}

        //// GET: Materias/Delete/5
        //public async Task<IActionResult> Delete(int? id)
        //{
        //    if (id == null)
        //    {
        //        return NotFound();
        //    }

        //    var materium = await _context.Materia
        //        .Include(m => m.Profesor)
        //        .FirstOrDefaultAsync(m => m.MateriaId == id);
        //    if (materium == null)
        //    {
        //        return NotFound();
        //    }

        //    return View(materium);
        //}

        //// POST: Materias/Delete/5
        //[HttpPost, ActionName("Delete")]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> DeleteConfirmed(int id)
        //{
        //    var materium = await _context.Materia.FindAsync(id);
        //    if (materium != null)
        //    {
        //        _context.Materia.Remove(materium);
        //    }

        //    await _context.SaveChangesAsync();
        //    return RedirectToAction(nameof(Index));
        //}

        private bool MateriumExists(int id)
        {
            return _context.Materia.Any(e => e.MateriaId == id);
        }
    }
}
