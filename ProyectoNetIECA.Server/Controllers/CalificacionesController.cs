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
    public class CalificacionesController : ControllerBase
    {
        private readonly ProyectoNetIecaContext _context;

        public CalificacionesController(ProyectoNetIecaContext context)
        {
            _context = context;
        }

        // GET: Calificaciones
        public async Task<IActionResult> Index()
        {
            List<Calificacion> lista = await _context.Calificacions.OrderByDescending(a => a.CalificacionId).ToListAsync();
            return StatusCode(StatusCodes.Status200OK, lista);
        }


        [HttpPost]
        [Route("save")]
        public async Task<IActionResult> Create([FromBody] Calificacion calificacion)
        {
            await _context.AddAsync(calificacion);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, calificacion);

        }

        [HttpPut]
        [Route("edit")]
        public async Task<IActionResult> Edit([FromBody] Calificacion calificacion)
        {
            _context.Update(calificacion);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, calificacion);

        }

        [HttpDelete]
        [Route("delete/{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (CalificacionExists(id))
            {
                Calificacion calificacion = _context.Calificacions.Find(id);
                _context.Remove(calificacion);
                return StatusCode(StatusCodes.Status200OK, "ok");
            }
            else
            {
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

            var calificacion = await _context.Calificacions
                .FirstOrDefaultAsync(m => m.CalificacionId == id);
            if (calificacion == null)
            {
                return NotFound();
            }

            return StatusCode(StatusCodes.Status200OK, calificacion);
        }


        //// GET: Calificaciones/Details/5
        //public async Task<IActionResult> Details(int? id)
        //{
        //    if (id == null)
        //    {
        //        return NotFound();
        //    }

        //    var calificacion = await _context.Calificacions
        //        .Include(c => c.Alumno)
        //        .Include(c => c.Materia)
        //        .Include(c => c.Profesor)
        //        .FirstOrDefaultAsync(m => m.CalificacionId == id);
        //    if (calificacion == null)
        //    {
        //        return NotFound();
        //    }

        //    return View(calificacion);
        //}

        //// GET: Calificaciones/Create
        //public IActionResult Create()
        //{
        //    ViewData["AlumnoId"] = new SelectList(_context.Alumnos, "AlumnoId", "AlumnoId");
        //    ViewData["MateriaId"] = new SelectList(_context.Materia, "MateriaId", "MateriaId");
        //    ViewData["ProfesorId"] = new SelectList(_context.Profesors, "ProfesorId", "ProfesorId");
        //    return View();
        //}

        //// POST: Calificaciones/Create
        //// To protect from overposting attacks, enable the specific properties you want to bind to.
        //// For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> Create([Bind("CalificacionId,AlumnoId,MateriaId,ProfesorId,Calificacion1")] Calificacion calificacion)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        _context.Add(calificacion);
        //        await _context.SaveChangesAsync();
        //        return RedirectToAction(nameof(Index));
        //    }
        //    ViewData["AlumnoId"] = new SelectList(_context.Alumnos, "AlumnoId", "AlumnoId", calificacion.AlumnoId);
        //    ViewData["MateriaId"] = new SelectList(_context.Materia, "MateriaId", "MateriaId", calificacion.MateriaId);
        //    ViewData["ProfesorId"] = new SelectList(_context.Profesors, "ProfesorId", "ProfesorId", calificacion.ProfesorId);
        //    return View(calificacion);
        //}

        //// GET: Calificaciones/Edit/5
        //public async Task<IActionResult> Edit(int? id)
        //{
        //    if (id == null)
        //    {
        //        return NotFound();
        //    }

        //    var calificacion = await _context.Calificacions.FindAsync(id);
        //    if (calificacion == null)
        //    {
        //        return NotFound();
        //    }
        //    ViewData["AlumnoId"] = new SelectList(_context.Alumnos, "AlumnoId", "AlumnoId", calificacion.AlumnoId);
        //    ViewData["MateriaId"] = new SelectList(_context.Materia, "MateriaId", "MateriaId", calificacion.MateriaId);
        //    ViewData["ProfesorId"] = new SelectList(_context.Profesors, "ProfesorId", "ProfesorId", calificacion.ProfesorId);
        //    return View(calificacion);
        //}

        //// POST: Calificaciones/Edit/5
        //// To protect from overposting attacks, enable the specific properties you want to bind to.
        //// For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> Edit(int id, [Bind("CalificacionId,AlumnoId,MateriaId,ProfesorId,Calificacion1")] Calificacion calificacion)
        //{
        //    if (id != calificacion.CalificacionId)
        //    {
        //        return NotFound();
        //    }

        //    if (ModelState.IsValid)
        //    {
        //        try
        //        {
        //            _context.Update(calificacion);
        //            await _context.SaveChangesAsync();
        //        }
        //        catch (DbUpdateConcurrencyException)
        //        {
        //            if (!CalificacionExists(calificacion.CalificacionId))
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
        //    ViewData["AlumnoId"] = new SelectList(_context.Alumnos, "AlumnoId", "AlumnoId", calificacion.AlumnoId);
        //    ViewData["MateriaId"] = new SelectList(_context.Materia, "MateriaId", "MateriaId", calificacion.MateriaId);
        //    ViewData["ProfesorId"] = new SelectList(_context.Profesors, "ProfesorId", "ProfesorId", calificacion.ProfesorId);
        //    return View(calificacion);
        //}

        //// GET: Calificaciones/Delete/5
        //public async Task<IActionResult> Delete(int? id)
        //{
        //    if (id == null)
        //    {
        //        return NotFound();
        //    }

        //    var calificacion = await _context.Calificacions
        //        .Include(c => c.Alumno)
        //        .Include(c => c.Materia)
        //        .Include(c => c.Profesor)
        //        .FirstOrDefaultAsync(m => m.CalificacionId == id);
        //    if (calificacion == null)
        //    {
        //        return NotFound();
        //    }

        //    return View(calificacion);
        //}

        //// POST: Calificaciones/Delete/5
        //[HttpPost, ActionName("Delete")]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> DeleteConfirmed(int id)
        //{
        //    var calificacion = await _context.Calificacions.FindAsync(id);
        //    if (calificacion != null)
        //    {
        //        _context.Calificacions.Remove(calificacion);
        //    }

        //    await _context.SaveChangesAsync();
        //    return RedirectToAction(nameof(Index));
        //}

        private bool CalificacionExists(int id)
        {
            return _context.Calificacions.Any(e => e.CalificacionId == id);
        }
    }
}
