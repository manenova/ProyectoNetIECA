using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ProyectoNetIECA.Server.Models;

public partial class IecaContext : DbContext
{
    public IecaContext()
    {
    }

    public IecaContext(DbContextOptions<IecaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Alumno> Alumnos { get; set; }

    public virtual DbSet<Calificacion> Calificacions { get; set; }

    public virtual DbSet<Materium> Materia { get; set; }

    public virtual DbSet<Profesor> Profesors { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB; DataBase=IECA;Integrated Security=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Alumno>(entity =>
        {
            entity.HasKey(e => e.AlumnoId).HasName("PK__Alumno__90A6AA1329FA3DA9");

            entity.ToTable("Alumno", tb => tb.HasTrigger("EliminarCalificacionesAlumno"));

            entity.Property(e => e.Apellido).HasMaxLength(100);
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.Grado).HasMaxLength(100);
            entity.Property(e => e.Nombre).HasMaxLength(100);
        });

        modelBuilder.Entity<Calificacion>(entity =>
        {
            entity.HasKey(e => new { e.AlumnoId, e.MateriaId, e.ProfesorId }).HasName("PK__Califica__593B403DF8EBA3AA");

            entity.ToTable("Calificacion");

            entity.Property(e => e.Calificacion1)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("Calificacion");
        });

        modelBuilder.Entity<Materium>(entity =>
        {
            entity.HasKey(e => e.MateriaId).HasName("PK__Materia__0D019DE111147BD2");

            entity.ToTable(tb =>
                {
                    tb.HasTrigger("ActualizarCalificacion");
                    tb.HasTrigger("EliminarCalificacionesMaterias");
                });

            entity.Property(e => e.Descripcion).HasMaxLength(255);
            entity.Property(e => e.Nombre).HasMaxLength(100);
        });

        modelBuilder.Entity<Profesor>(entity =>
        {
            entity.HasKey(e => e.ProfesorId).HasName("PK__Profesor__4DF3F0C813A42EFA");

            entity.ToTable("Profesor", tb =>
                {
                    tb.HasTrigger("EliminarCalificacionesProfesores");
                    tb.HasTrigger("EliminarMateriasPorProfesor");
                });

            entity.Property(e => e.Apellido).HasMaxLength(100);
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.Nombre).HasMaxLength(100);
            entity.Property(e => e.Perfil).HasMaxLength(100);
            entity.Property(e => e.Puesto).HasMaxLength(100);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
