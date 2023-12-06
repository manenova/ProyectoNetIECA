using System;
using System.Collections.Generic;

namespace ProyectoNetIECA.Server.Models;

public partial class Profesor
{
    public int ProfesorId { get; set; }

    public string? Nombre { get; set; }

    public string? Apellido { get; set; }

    public string? Email { get; set; }

    public string? Perfil { get; set; }

    public string? Puesto { get; set; }
}
