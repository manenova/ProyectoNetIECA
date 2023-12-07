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
        private readonly IecaContext _context;

        public CalificacionesController(IecaContext context)
        {
            _context = context;
        }

        // GET: Calificaciones
        public async Task<IActionResult> Index()
        {
            List<Calificacion> lista = await _context.Calificacions.OrderByDescending(a => a.AlumnoId).ToListAsync();
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
        [Route("delete")]
        public async Task<IActionResult> Delete(int alumnoId, int materiaId, int profesorId)
        {
            var calificacion = await _context.Calificacions.FindAsync(alumnoId, materiaId, profesorId);

            if (calificacion == null)
            {
                return NotFound(); // Retorna un 404 si no se encuentra la calificación
            }

            _context.Calificacions.Remove(calificacion);
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");

        }


        // GET: Alumnos/Details/5
        [HttpGet]
        [Route("details")]
        public async Task<IActionResult> Detail()
        {
            var query = from calificacion in _context.Calificacions
                        join alumno in _context.Alumnos on calificacion.AlumnoId equals alumno.AlumnoId
                        join materia in _context.Materia on calificacion.MateriaId equals materia.MateriaId
                        join profesor in _context.Profesors on calificacion.ProfesorId equals profesor.ProfesorId
                        select new
                        {
                            calificacion.AlumnoId,
                            calificacion.MateriaId,
                            calificacion.ProfesorId,
                            NombreAlumno = alumno.Nombre + " " + alumno.Apellido,
                            EmailAlumno = alumno.Email,
                            NombreMateria = materia.Nombre,
                            calificacion.Calificacion1,
                            NombreProfesor = profesor.Nombre + " " + profesor.Apellido,
                            EmailProfesor = profesor.Email
                        };

            var result = query.ToList();

            return Ok(result);
        }


        [HttpGet]
        [Route("detail/{id:int}")]
        public async Task<IActionResult> Details(int? id)
        {
            var query = from calificacion in _context.Calificacions
                        join alumno in _context.Alumnos on calificacion.AlumnoId equals alumno.AlumnoId
                        join materia in _context.Materia on calificacion.MateriaId equals materia.MateriaId
                        join profesor in _context.Profesors on calificacion.ProfesorId equals profesor.ProfesorId
                        where calificacion.AlumnoId == id
                        select new
                        {
                            calificacion.AlumnoId,
                            calificacion.MateriaId,
                            calificacion.ProfesorId,
                            NombreAlumno = alumno.Nombre + " " + alumno.Apellido,
                            EmailAlumno = alumno.Email,
                            NombreMateria = materia.Nombre,
                            calificacion.Calificacion1,
                            NombreProfesor = profesor.Nombre + " " + profesor.Apellido,
                            EmailProfesor = profesor.Email
                        };

            var result = query.ToList();

            return Ok(result);
        }




        private bool CalificacionExists(int id)
        {
            return _context.Calificacions.Any(e => e.AlumnoId == id);
        }
    }
}
