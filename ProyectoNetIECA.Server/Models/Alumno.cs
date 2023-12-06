using System;
using System.Collections.Generic;

namespace ProyectoNetIECA.Server.Models;

public partial class Alumno
{
    public int AlumnoId { get; set; }

    public string? Nombre { get; set; }

    public string? Apellido { get; set; }

    public string? Email { get; set; }

    public string? Grado { get; set; }
}
