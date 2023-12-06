using System;
using System.Collections.Generic;
using System.Drawing.Drawing2D;
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
        private readonly IecaContext _context;

        public MateriasController(IecaContext context)
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
            if (MateriumExists(id))
            {
                Materium materia = _context.Materia.Find(id);
                _context.Remove(materia);
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

            var materia = await _context.Materia
                .FirstOrDefaultAsync(m => m.MateriaId == id);
            if (materia == null)
            {
                return NotFound();
            }

            return StatusCode(StatusCodes.Status200OK, materia);
        }


        [HttpGet]
        [Route("mismaterias/{alumnoId:int}")]
        public async Task<List<Materium>> ObtenerMateriasPorAlumno(int alumnoId)
        {
           
                var materiaIds = await _context.Calificacions
                    .Where(c => _context.Alumnos.Any(a => a.AlumnoId == alumnoId && a.AlumnoId == c.AlumnoId))
                    .Select(c => c.MateriaId)
                    .ToListAsync();
               
                var materias = await _context.Materia
                    .Where(m => materiaIds.Contains(m.MateriaId))
                    .ToListAsync();

                return materias;
            
        }


        private bool MateriumExists(int id)
        {
            return _context.Materia.Any(e => e.MateriaId == id);
        }
    }
}
