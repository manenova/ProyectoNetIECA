using System;
using System.Collections.Generic;

namespace ProyectoNetIECA.Server.Models;

public partial class Materium
{
    public int MateriaId { get; set; }

    public string? Nombre { get; set; }

    public string? Descripcion { get; set; }

    public int? ProfesorId { get; set; }
}
