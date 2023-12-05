using System;
using System.Collections.Generic;

namespace ProyectoNetIECA.Server.Models;

public partial class Calificacion
{
    public int CalificacionId { get; set; }

    public int? AlumnoId { get; set; }

    public int? MateriaId { get; set; }

    public int? ProfesorId { get; set; }

    public decimal? Calificacion1 { get; set; }

    public virtual Alumno? Alumno { get; set; }

    public virtual Materium? Materia { get; set; }

    public virtual Profesor? Profesor { get; set; }
}
