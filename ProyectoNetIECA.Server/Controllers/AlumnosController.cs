using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoNetIECA.Server.Models;

namespace ProyectoNetIECA.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AlumnosController : ControllerBase
    {
        private readonly ProyectoNetIecaContext _context;

        public AlumnosController(ProyectoNetIecaContext context)
        {
            _context = context;
        }

        // GET: Alumnos
        public async Task<IActionResult> Index()
        {
            List<Alumno> lista = await _context.Alumnos.OrderByDescending(a => a.AlumnoId).ToListAsync();
            return StatusCode(StatusCodes.Status200OK, lista);
        }


        [HttpPost]
        [Route("save")]
        public async Task<IActionResult> Create([FromBody] Alumno alumno)
        {
            await _context.AddAsync(alumno);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, alumno);

        }

        [HttpPut]
        [Route("edit")]
        public async Task<IActionResult> Edit([FromBody] Alumno alumno)
        {
            _context.Update(alumno);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, alumno);

        }

        [HttpDelete]
        [EnableCors]
        [Route("delete/{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (AlumnoExists(id))
            {
                Alumno alumno = _context.Alumnos.Find(id);
                _context.Remove(alumno);
                await _context.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, "ok");
            }
            else
            {
                return NotFound();
            }
          
        }


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

        // GET: Alumnos/Details/5

        [HttpGet]
        [Route("details/{id:int}")]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var alumno = await _context.Alumnos
                .FirstOrDefaultAsync(m => m.AlumnoId == id);
            if (alumno == null)
            {
                return NotFound();
            }

            return StatusCode(StatusCodes.Status200OK, alumno);
        }

  
        private bool AlumnoExists(int id)
        {
            return _context.Alumnos.Any(e => e.AlumnoId == id);
        }
    }
}
