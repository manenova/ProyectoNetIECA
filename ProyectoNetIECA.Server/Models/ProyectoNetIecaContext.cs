using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ProyectoNetIECA.Server.Models;

public partial class ProyectoNetIecaContext : DbContext
{
    public ProyectoNetIecaContext()
    {
    }

    public ProyectoNetIecaContext(DbContextOptions<ProyectoNetIecaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Alumno> Alumnos { get; set; }

    public virtual DbSet<Calificacion> Calificacions { get; set; }

    public virtual DbSet<Materium> Materia { get; set; }

    public virtual DbSet<Profesor> Profesors { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB; DataBase=ProyectoNetIECA;Integrated Security=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Alumno>(entity =>
        {
            entity.HasKey(e => e.AlumnoId).HasName("PK__Alumno__90A6AA13D219BFE9");

            entity.ToTable("Alumno");

            entity.Property(e => e.Apellido).HasMaxLength(100);
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.Grado).HasMaxLength(100);
            entity.Property(e => e.Nombre).HasMaxLength(100);
        });

        modelBuilder.Entity<Calificacion>(entity =>
        {
            entity.HasKey(e => e.CalificacionId).HasName("PK__Califica__4CF54ADEF4ACC688");

            entity.ToTable("Calificacion");

            entity.Property(e => e.Calificacion1)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("Calificacion");

            entity.HasOne(d => d.Alumno).WithMany(p => p.Calificacions)
                .HasForeignKey(d => d.AlumnoId)
                .HasConstraintName("FK__Calificac__Alumn__2B3F6F97");

            entity.HasOne(d => d.Materia).WithMany(p => p.Calificacions)
                .HasForeignKey(d => d.MateriaId)
                .HasConstraintName("FK__Calificac__Mater__2C3393D0");

            entity.HasOne(d => d.Profesor).WithMany(p => p.Calificacions)
                .HasForeignKey(d => d.ProfesorId)
                .HasConstraintName("FK__Calificac__Profe__2D27B809");
        });

        modelBuilder.Entity<Materium>(entity =>
        {
            entity.HasKey(e => e.MateriaId).HasName("PK__Materia__0D019DE13B3793E9");

            entity.Property(e => e.Descripcion).HasMaxLength(255);
            entity.Property(e => e.Nombre).HasMaxLength(100);

            entity.HasOne(d => d.Profesor).WithMany(p => p.Materia)
                .HasForeignKey(d => d.ProfesorId)
                .HasConstraintName("FK__Materia__Profeso__267ABA7A");
        });

        modelBuilder.Entity<Profesor>(entity =>
        {
            entity.HasKey(e => e.ProfesorId).HasName("PK__Profesor__4DF3F0C8D8EC45E5");

            entity.ToTable("Profesor");

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
