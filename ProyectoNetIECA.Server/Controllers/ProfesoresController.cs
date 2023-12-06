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
    public class ProfesoresController : ControllerBase
    {
        private readonly IecaContext _context;

        public ProfesoresController(IecaContext context)
        {
            _context = context;
        }

        // GET: Alumnos
        public async Task<IActionResult> Index()
        {
            List<Profesor> lista = await _context.Profesors.OrderByDescending(a => a.ProfesorId).ToListAsync();
            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpPost]
        [Route("save")]
        public async Task<IActionResult> Create([FromBody] Profesor profesor)
        {
            await _context.AddAsync(profesor);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, profesor);
        }

        [HttpPut]
        [Route("edit")]
        public async Task<IActionResult> Edit([FromBody] Profesor profesor)
        {
            _context.Update(profesor);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, profesor);
        }

        [HttpDelete]
        [Route("delete/{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (ProfesorExists(id))
            {
                Profesor profesor = _context.Profesors.Find(id);
                _context.Remove(profesor);
                await _context.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, "Ok");
            }
            else
            {
                return NotFound();
            }

        }


        // GET: Profesores/Details/5

        [HttpGet]
        [Route("details/{id:int}")]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var profesor = await _context.Profesors
                .FirstOrDefaultAsync(m => m.ProfesorId == id);
            if (profesor == null)
            {
                return NotFound();
            }

            return StatusCode(StatusCodes.Status200OK, profesor);
        }
        private bool ProfesorExists(int id)
        {
            return _context.Profesors.Any(e => e.ProfesorId == id);
        }
    }
}
