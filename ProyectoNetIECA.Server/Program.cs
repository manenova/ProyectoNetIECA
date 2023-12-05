using Microsoft.AspNetCore.Cors.Infrastructure;
using ProyectoNetIECA.Server.Models;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader()
        );

    options.AddPolicy("signalr",
        builder => builder
        .AllowAnyMethod()
        .AllowAnyHeader()

        .AllowCredentials()
        .SetIsOriginAllowed(hostName => true));
});

builder.Services.AddControllers();
builder.Services.AddDbContext<ProyectoNetIecaContext>();
builder.Services.AddMvcCore();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
