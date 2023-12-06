using System;
using System.Collections.Generic;

namespace ProyectoNetIECA.Server.Models;

public partial class Calificacion
{
    public int AlumnoId { get; set; }

    public int MateriaId { get; set; }

    public int ProfesorId { get; set; }

    public decimal? Calificacion1 { get; set; }
}
